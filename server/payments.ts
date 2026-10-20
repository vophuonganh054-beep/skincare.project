import type { Express, Request } from 'express';
import { createHash } from 'node:crypto';
import { applicationDefault, cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { equalSecret, extractOrder, quote, validateTransaction } from './payment-core.ts';
import firebaseConfig from '../firebase-applet-config.json' with { type: 'json' };

type MemberVerifier = (token: string) => Promise<{ uid: string; firebase?: { sign_in_provider?: string } }>;
export function registerPayments(app: Express, databaseOverride?: ReturnType<typeof getFirestore>, verifyMemberOverride?: MemberVerifier) {
  const enabled = process.env.PAYMENTS_ENABLED === 'true';
  const account = (process.env.SEPAY_ACCOUNT_NUMBER || '').replace(/\s/g, '');
  const name = process.env.SEPAY_ACCOUNT_NAME || '';
  const secret = process.env.SEPAY_WEBHOOK_TOKEN || '';
  const projectId = process.env.FIREBASE_PROJECT_ID || firebaseConfig.projectId;
  const databaseId = process.env.FIRESTORE_DATABASE_ID || firebaseConfig.firestoreDatabaseId;
  let database: ReturnType<typeof getFirestore> | undefined = databaseOverride;
  const db = () => {
    if (!database) {
      const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
      const admin = getApps().find(a => a.name === 'payments') || initializeApp({ projectId, credential: json ? cert(JSON.parse(json)) : applicationDefault() }, 'payments');
      database = getFirestore(admin, databaseId);
    }
    return database;
  };
  const ready = () => enabled && Boolean(account && name && secret);
  const hash = (value: string) => createHash('sha256').update(value).digest('hex');
  const access = (req: Request) => req.get('X-Payment-Token') || '';
  const validId = (value: unknown): value is string => typeof value === 'string' && /^ALPS[A-F0-9]{24}$/.test(value);
  const configuration = () => ({ paymentsEnabled: ready(), bankCode: 'MB', bankName: 'MB', accountNumber: ready() ? account : '', accountName: name, webhookEndpoint: '/api/sepay/webhook' });
  app.get('/api/sepay/config', (_req, res) => res.json(configuration()));
  app.post('/api/sepay/initiate', async (req, res) => {
    if (!ready()) return res.status(503).json({error: 'Chưa hoàn tất cấu hình thanh toán SePay trên máy chủ.'});
    try {
      const orderNumber = req.body.orderNumber;
      const token = access(req);
      if (!validId(orderNumber) || !/^[a-f0-9]{64}$/.test(token)) return res.status(400).json({error: 'Phiên thanh toán không hợp lệ'});
      let memberUid: string | undefined;
      if (String(req.body.promoCode || '').trim().toUpperCase() === 'ALPS2025') {
        const idToken = /^Bearer (.+)$/.exec(req.get('Authorization') || '')?.[1];
        if (!idToken) return res.status(401).json({error: 'Vui lòng đăng nhập thành viên để dùng mã ALPS2025.'});
        try {
          const verify = verifyMemberOverride || (async (value: string) => {
            // Authentication belongs to the original storefront project, not the payments database.
            const authApp = getApps().find(a => a.name === 'storefront-auth') || initializeApp({ projectId: firebaseConfig.projectId }, 'storefront-auth');
            return getAuth(authApp).verifyIdToken(value);
          });
          const member = await verify(idToken);
          if (!member.uid || member.firebase?.sign_in_provider === 'anonymous') throw new Error('Not a member');
          memberUid = member.uid;
        } catch { return res.status(401).json({error: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại để dùng mã thành viên.'}); }
      }
      let pricing: ReturnType<typeof quote>;
      try { pricing = quote(req.body, {isMember: Boolean(memberUid)}); }
      catch (error) { return res.status(400).json({error: error instanceof Error ? error.message : 'Giỏ hàng không hợp lệ'}); }
      if (pricing.amount !== req.body.amount) return res.status(409).json({error: 'Giá trị giỏ hàng đã thay đổi. Vui lòng mở lại thanh toán.'});
      const fingerprint = hash(JSON.stringify({...pricing, ...(memberUid ? {memberUid} : {})}));
      const ref = db().collection('paymentSessions').doc(orderNumber);
      const buyer = Object.fromEntries(['buyerName', 'phone', 'email', 'address', 'note'].map(key => [key, String(req.body.buyer?.[key] || '').slice(0, 500)]));
      const result = await db().runTransaction(async tx => {
        const snapshot = await tx.get(ref);
        if (snapshot.exists) {
          const previous = snapshot.data()!;
          if (!equalSecret(previous.tokenHash, hash(token)) || previous.fingerprint !== fingerprint) throw new Error('Phiên thanh toán đã được khóa cho giỏ hàng khác.');
          if (!previous.isPaid) tx.update(ref, {buyer});
          return {isPaid: previous.isPaid, status: previous.status};
        }
        tx.create(ref, { orderNumber, ...pricing, ...(memberUid ? {memberUid} : {}), buyer, fingerprint, tokenHash: hash(token), isPaid: false, status: 'pending', createdAt: new Date().toISOString() });
        return {isPaid: false, status: 'pending'};
      });
      res.set('Cache-Control', 'no-store').json({success: true, ...configuration(), ...result, amount: pricing.amount, des: orderNumber});
    } catch (error) {
      console.error('[Payment initiate]', error instanceof Error ? error.message : 'Failed');
      res.status(503).json({error: 'Không khởi tạo được thanh toán. Kiểm tra cấu hình Firestore hoặc mở lại giỏ hàng.'});
    }
  });
  app.get('/api/sepay/payment-status/:orderNumber', async (req, res) => {
    res.set('Cache-Control', 'no-store');
    if (!ready()) return res.status(503).json({error: 'Thanh toán chưa được cấu hình'});
    if (!validId(req.params.orderNumber)) return res.status(400).json({error: 'Mã đơn không hợp lệ'});
    try {
      const snapshot = await db().collection('paymentSessions').doc(req.params.orderNumber).get();
      const record = snapshot.data();
      if (!record || !equalSecret(record.tokenHash, hash(access(req)))) return res.status(404).json({error: 'Không tìm thấy phiên thanh toán'});
      res.json({success: true, isPaid: record.isPaid, status: record.status, amount: record.amount, paidAt: record.paidAt || null});
    } catch { res.status(503).json({error: 'Tạm thời chưa kiểm tra được giao dịch'}); }
  });
  app.all('/api/sepay/simulate-success', (_req, res) => res.status(403).json({success: false}));
  app.post('/api/sepay/webhook', async (req, res) => {
    if (!ready()) return res.status(503).json({success: false, error: 'Payments disabled or unconfigured'});
    const token = /^Apikey\s+(.+)$/i.exec(req.get('Authorization') || '')?.[1] || '';
    if (!equalSecret(token, secret)) return res.status(401).json({success: false});
    const data = req.body;
    if (data.transferType !== 'in') return res.json({success: true});
    const orderNumber = extractOrder(data);
    if (!orderNumber) return res.json({success: true, message: 'No unique matching payment code'});
    try {
      const firestore = db();
      const orderRef = firestore.collection('paymentSessions').doc(orderNumber);
      const txRef = firestore.collection('paymentTransactions').doc(hash(String(data.id)));
      await firestore.runTransaction(async tx => {
        const [order, prior] = await Promise.all([tx.get(orderRef), tx.get(txRef)]);
        if (prior.exists) return;
        if (!order.exists) throw new Error('Order not registered yet'); // non-2xx so SePay retries
        const record = order.data()!;
        const status = validateTransaction(data, account, record.amount);
        tx.create(txRef, {orderNumber, transactionId: String(data.id), amount: Number(data.transferAmount), status, receivedAt: new Date().toISOString()});
        // A late duplicate or insufficient transfer must never downgrade an already paid order.
        if (!record.isPaid) tx.update(orderRef, {status, isPaid: status === 'paid', ...(status === 'paid' ? {paidAt: new Date().toISOString(), transactionId: String(data.id)} : {})});
      });
      res.json({success: true});
    } catch (error) {
      console.error('[Payment webhook]', error instanceof Error ? error.message : 'Failed');
      res.status(503).json({success: false, error: 'Transaction not committed'});
    }
  });
}
