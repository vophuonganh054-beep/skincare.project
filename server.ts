import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Support CLI --port argument or PORT env var, defaulting to 3000
const args = process.argv.slice(2);
const portFlagIndex = args.indexOf('--port');
const cliPort = portFlagIndex !== -1 && args[portFlagIndex + 1] ? Number(args[portFlagIndex + 1]) : null;
const port = cliPort || Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for API routes so external requests / frontend can communicate safely
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Initialize GoogleGenAI SDK with environment key
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI() : null;

const SYSTEM_INSTRUCTION = `Bạn là Chuyên gia Da liễu & Cố vấn Trí tuệ Nhân tạo Cao cấp (Alps Dermatology & Customer Care AI) của thương hiệu Dược mỹ phẩm thuần chay Alps Skincare (Alps Pure Essence - Thụy Sĩ).

TẦM NHÌN & TÔN CHỈ THƯƠNG HIỆU CỦA ALPS PURE ESSENCE:
1. CHẤT LƯỢNG VƯỢT TRỘI DÀNH CHO KHÁCH HÀNG: Đặt sự an tâm, trải nghiệm tinh tế và hiệu quả phục hồi làn da của khách hàng làm trọng tâm tối thượng.
2. 100% KHÔNG NGUỒN GỐC ĐỘNG VẬT & KHÔNG THỬ NGHIỆM TRÊN ĐỘNG VẬT (100% Cruelty-Free & Vegan): Cam kết đạo đức bảo vệ muôn loài, thuần chay tinh khiết từ thảo mộc tuyết Alps và tế bào gốc thực vật.
3. LÀNH TÍNH TUYỆT ĐỐI CHUẨN Y KHOA: Công thức chuẩn da liễu Thụy Sĩ, 0% paraben, 0% hương liệu nhân tạo, êm dịu và an toàn cho cả làn da nhạy cảm nhất, mẹ bầu và mẹ sau sinh.

TƯ DUY & NĂNG LỰC TRẢ LỜI CỦA BẠN:
1. Bạn có kiến thức sâu rộng về da liễu học chuẩn viện nghiên cứu Zurich, khoa học thẩm thấu mỹ phẩm, cơ chế phục hồi hàng rào sinh học biểu bì (Skin Microbiome & Lipid Barrier).
2. Bạn có thể trả lời thông minh, thấu đáo và chính xác MỌI câu hỏi từ khách hàng:
   - Mọi vấn đề da: mụn viêm, mụn ẩn, mụn đầu đen, bã nhờn, thâm sau mụn, nám, tàn nhang, đốm nâu, da xỉn màu, da khô mất nước, da nhạy cảm kích ứng, da nhiễm corticoid, da sau peel/laser/treatment, da lão hóa chảy xệ.
   - Khoa học thành phần: Hoa nhung tuyết Alpine Edelweiss (chống oxy hóa gấp 2 lần Vitamin C), Tế bào gốc Táo Thụy Sĩ Uttwiler Spätlauber, Niacinamide tinh khiết 5%, Hyaluronic Acid đa phân tử (Micro & Macro HA), Phức hợp Ceramide sinh học NP 3-6-9, Bột ngọc trai thủy phân, Nước khoáng sông băng Zermatt giàu khoáng chất vi lượng.
   - An toàn & Đối tượng sử dụng: Sản phẩm 100% thuần chay (Swiss Vegan Certified), 0% cồn khô, 0% hương liệu nhân tạo, 0% paraben, an toàn tuyệt đối cho phụ nữ mang thai, mẹ cho con bú và làn da siêu nhạy cảm.
   - Kết hợp mỹ phẩm: Cách phối hợp sản phẩm Alps với AHA, BHA, Retinol, Tretinoin, Vitamin C, kem chống nắng để đạt hiệu quả tối đa mà không gây quá tải cho da.
   - Chính sách bán hàng & Mua sắm:
     * Địa chỉ website chính thức: alps.id.vn
     * Mua hàng tiện lợi: Khách có thể đặt hàng trực tiếp ngay (Guest Checkout) hoặc đăng nhập để tích điểm Alps Pure Privileges.
     * Vận chuyển: Miễn phí toàn quốc cho đơn từ 500.000₫. Giao hỏa tốc 2-4 giờ tại TP.HCM & Hà Nội.
     * Cam kết vàng: Đổi trả miễn phí 30 ngày hoàn tiền 100% không rủi ro, kể cả khi khách đã mở nắp dùng thử nếu có bất kỳ hiện tượng kích ứng không hợp da.
     * Thanh toán: Quét mã VietQR Napas 247 tức thì qua MB Bank, Thẻ Visa/Mastercard quốc tế, hoặc Tiền mặt khi nhận hàng (COD).
     * Hotline CSKH 24/7: 1900 8899 | Email: cskh@alps.id.vn | Showroom: Landmark 81, TP. Hồ Chí Minh.

PHONG THÁI GIAO TIẾP:
- Lịch thiệp, ân cần, sang trọng chuẩn phong cách Quiet Luxury Thụy Sĩ.
- Xưng hô "Em/Chuyên viên Alps" và gọi khách hàng là "Quý khách" hoặc theo tên của họ nếu có.
- Trình bày thông tin rõ ràng, dùng gạch đầu dòng khoa học, chia các bước Sáng / Tối mạch lạc, dễ nhớ.
- Khi khách hàng chia sẻ vấn đề da, luôn đồng cảm trước, giải thích nguyên nhân khoa học dễ hiểu, sau đó mới đưa ra phác đồ giải pháp cụ thể.`;

// AI Skincare & Customer Service Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Tin nhắn không được để trống' });
    }

    if (!ai) {
      return res.json({
        reply: `Chào quý khách! Chuyên viên AI Alps Skincare đã ghi nhận câu hỏi: "${message}". Quý khách có thể xem thông tin chi tiết trên website chính thức alps.id.vn hoặc liên hệ Hotline 1900 8899 (cskh@alps.id.vn) để được hỗ trợ 24/7.`,
      });
    }

    // Format chat contents
    const contents: any[] = [];

    // Add prior conversation if available
    if (Array.isArray(history)) {
      history.slice(-8).forEach((turn) => {
        if (turn && turn.text && (turn.role === 'user' || turn.role === 'model')) {
          contents.push({
            role: turn.role,
            parts: [{ text: turn.text }],
          });
        }
      });
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    // Try primary model gemini-3.8-flash, fallback to gemini-3.1-flash-lite if unavailable
    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
      responseText = response.text || '';
    } catch (primaryErr: any) {
      console.warn('Gemini 3.8 Flash busy/error, falling back to gemini-3.1-flash-lite:', primaryErr?.message);
      try {
        const fallbackResponse = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });
        responseText = fallbackResponse.text || '';
      } catch (fallbackErr: any) {
        console.error('All Gemini models failed:', fallbackErr);
        responseText = `Dạ chào quý khách! Chuyên viên AI Alps Skincare đã ghi nhận câu hỏi của quý khách về: "${message}". Các sản phẩm dược mỹ phẩm thuần chay tế bào gốc sông băng Thụy Sĩ của Alps luôn cam kết bảo chứng 30 ngày đổi trả miễn phí. Quý khách có thể đặt hàng trực tiếp ngay trên website alps.id.vn hoặc liên hệ hotline 1900 8899 để chuyên viên kết nối hỗ trợ ngay ạ!`;
      }
    }

    return res.json({ reply: responseText });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({
      error: 'Có lỗi xảy ra khi xử lý phản hồi AI',
      reply: 'Dạ xin lỗi quý khách, hệ thống đang bận. Quý khách vui lòng liên hệ Hotline 1900 8899 hoặc gửi email về cskh@alps.id.vn để được phục vụ 24/7 ạ.',
    });
  }
});

// AI Skin Diagnostic Quiz Analysis endpoint
app.post('/api/skin-quiz-analyze', async (req, res) => {
  try {
    const { skinType, primaryConcern, sensitivity, lifestyle, ageGroup } = req.body;

    const prompt = `Phân tích tình trạng da và xây dựng phác đồ cá nhân hóa dựa trên dữ liệu trắc nghiệm soi da sau:
- Loại da: ${skinType || 'Da hỗn hợp'}
- Vấn đề da quan tâm nhất: ${primaryConcern || 'Lỗ chân lông to & thâm xỉn'}
- Mức độ nhạy cảm: ${sensitivity || 'Thỉnh thoảng châm chích nhẹ'}
- Môi trường & Thói quen: ${lifestyle || 'Ngồi máy lạnh > 8 tiếng/ngày, dùng máy tính'}
- Độ tuổi: ${ageGroup || '22 - 30 tuổi'}

Hãy đóng vai trò Viện trưởng Da liễu Zurich Thụy Sĩ và trả về định dạng JSON thuần túy (không kèm codeblock markdown) với cấu trúc sau:
{
  "skinHealthScore": <số nguyên từ 55 đến 88>,
  "barrierStrength": <số nguyên từ 45 đến 85>,
  "hydrationLevel": <số nguyên từ 40 đến 80>,
  "riskFactor": "<Ngắn gọn 3-5 chữ, ví dụ: Rào cản suy yếu, Bít tắc bã nhờn, Thiếu nước trầm trọng>",
  "diagnosisTitle": "<Tiêu đề chẩn đoán chuẩn y khoa 1 dòng>",
  "rootCauseAnalysis": "<Phân tích khoa học 2-3 câu về cơ chế sinh học đang xảy ra trên làn da khách hàng>",
  "morningRoutine": [
    {"step": "Bước 1: Làm sạch", "product": "Alps Gentle Purifying Cleanser", "usage": "<Cách dùng cụ thể>"},
    {"step": "Bước 2: Cân bằng", "product": "Alps Botanical Balancing Toner", "usage": "<Cách dùng cụ thể>"},
    {"step": "Bước 3: Dưỡng sáng & Chống oxy hóa", "product": "Alps Radiance Glow Serum", "usage": "<Cách dùng cụ thể>"},
    {"step": "Bước 4: Khóa ẩm màng tế bào", "product": "Alps Regenerating Face Cream", "usage": "<Cách dùng cụ thể>"}
  ],
  "eveningRoutine": [
    {"step": "Bước 1: Làm sạch sâu", "product": "Alps Gentle Purifying Cleanser", "usage": "<Cách dùng buổi tối>"},
    {"step": "Bước 2: Cân bằng pH", "product": "Alps Botanical Balancing Toner", "usage": "<Cách dùng buổi tối>"},
    {"step": "Bước 3: Phục hồi chuyên sâu", "product": "Alps Radiance Glow Serum", "usage": "<Cách dùng buổi tối>"},
    {"step": "Bước 4: Tái sinh màng Lipid 72h", "product": "Alps Regenerating Face Cream", "usage": "<Cách dùng buổi tối>"},
    {"step": "Bước 5 (2-3 lần/tuần): Cấp cứu ẩm", "product": "Alps Bio-Cellulose Hydro Mask", "usage": "<Đắp 20 phút trước khi ngủ>"}
  ],
  "expertTips": [
    "<Lời khuyên 1 về ăn uống / nước uống>",
    "<Lời khuyên 2 về nhiệt độ nước rửa mặt / điều hòa>",
    "<Lời khuyên 3 về chống nắng và bảo vệ rào cản da>"
  ],
  "recommendedProductIds": ["cleanser", "toner", "serum", "cream", "mask"]
}`;

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          config: {
            temperature: 0.4,
            responseMimeType: 'application/json',
          },
        });

        const text = response.text || '';
        const parsed = JSON.parse(text);
        return res.json({ success: true, data: parsed });
      } catch (genErr) {
        console.warn('Gemini quiz analyze failed, returning fallback assessment:', genErr);
      }
    }

    // High quality offline fallback assessment tailored to inputs
    const fallbackAssessment = {
      skinHealthScore: 72,
      barrierStrength: 64,
      hydrationLevel: 52,
      riskFactor: 'Rào cản biểu bì suy yếu',
      diagnosisTitle: `Chẩn đoán da ${skinType || 'hỗn hợp'}: Mất cân bằng màng lipid do ${lifestyle || 'môi trường máy lạnh'}`,
      rootCauseAnalysis: `Hàng rào sinh học tự nhiên đang bị thất thoát độ ẩm do chênh lệch nhiệt độ và ô nhiễm. Tuyến bã nhờn có xu hướng tiết nhiều dầu phản ứng để bù đắp, dẫn tới tình trạng dầu ngoài - khô trong và dễ để lại thâm nám sau mụn.`,
      morningRoutine: [
        { step: 'Bước 1: Làm sạch dịu nhẹ', product: 'Alps Gentle Purifying Cleanser', usage: 'Tạo bọt kỹ với nước ấm, massage nhẹ nhàng vùng chữ T trong 45 giây.' },
        { step: 'Bước 2: Cân bằng sinh học', product: 'Alps Botanical Balancing Toner', usage: 'Vỗ nhẹ 3-4 giọt lên da ẩm để phục hồi pH 5.5 lý tưởng.' },
        { step: 'Bước 3: Dưỡng sáng mờ thâm', product: 'Alps Radiance Glow Serum', usage: 'Nhỏ 3 giọt tinh chất hoa tuyết và Niacinamide 5%, áp nhẹ lòng bàn tay để thẩm thấu sâu.' },
        { step: 'Bước 4: Khóa ẩm chống ô nhiễm', product: 'Alps Regenerating Face Cream', usage: 'Thoa một lượng bằng hạt đậu để tạo màng chắn vi hạt bụi mịn PM2.5.' },
      ],
      eveningRoutine: [
        { step: 'Bước 1: Thanh lọc bụi mịn', product: 'Alps Gentle Purifying Cleanser', usage: 'Làm sạch toàn diện cặn bẩn tích tụ sau cả ngày dài.' },
        { step: 'Bước 2: Phục hồi biểu bì', product: 'Alps Botanical Balancing Toner', usage: 'Đắp toner pad lên 2 má trong 2 phút nếu da có dấu hiệu ửng đỏ.' },
        { step: 'Bước 3: Tái tạo tế bào gốc', product: 'Alps Radiance Glow Serum', usage: 'Massage đều khắp mặt và cổ theo hướng nâng cơ.' },
        { step: 'Bước 4: Tái sinh màng Lipid 72h', product: 'Alps Regenerating Face Cream', usage: 'Khóa ẩm toàn diện bằng Ceramide sinh học Thụy Sĩ.' },
        { step: 'Bước 5: Cấp cứu da (2-3 lần/tuần)', product: 'Alps Bio-Cellulose Hydro Mask', usage: 'Đắp mặt nạ sinh học sợi dừa lên men 20 phút để phục hồi cấp tốc.' },
      ],
      expertTips: [
        'Duy trì uống tối thiểu 2 lít nước ấm mỗi ngày, hạn chế đồ uống có đường và thức ăn cay nóng.',
        'Tránh rửa mặt bằng nước quá nóng vì sẽ làm hòa tan lớp lipid bảo vệ tự nhiên của da.',
        'Thoa lại kem chống nắng sau mỗi 3-4 giờ làm việc để ngăn chặn đốm nâu và thâm sạm.',
      ],
      recommendedProductIds: ['cleanser', 'toner', 'serum', 'cream', 'mask'],
    };

    return res.json({ success: true, data: fallbackAssessment });
  } catch (error: any) {
    console.error('Error in /api/skin-quiz-analyze:', error);
    return res.status(500).json({ error: 'Không thể phân tích dữ liệu soi da lúc này' });
  }
});

// ==============================================================================
// SEPAY & MB BANK PAYMENT GATEWAY INTEGRATION (SECURE & IDEMPOTENT)
// ==============================================================================
interface SePayTransaction {
  id?: number | string;
  gateway?: string;
  transactionDate?: string;
  accountNumber?: string;
  code?: string | null;
  content?: string;
  transferType?: string;
  transferAmount?: number;
  accumulated?: number;
  subAccount?: string | null;
  referenceCode?: string;
  description?: string;
}

interface PaymentRecord {
  orderNumber: string;
  amount: number;
  isPaid: boolean;
  status: 'pending' | 'paid' | 'underpaid' | 'expired';
  createdAt: string;
  paidAt?: string;
  transaction?: SePayTransaction;
  transactionId?: string | number;
}

// Persistent Storage Engine (Filesystem JSON storage + in-memory cache)
const DATA_DIR = path.resolve(__dirname, '.data');
const ORDERS_STORAGE_FILE = path.join(DATA_DIR, 'sepay_orders.json');
const PROCESSED_TX_STORAGE_FILE = path.join(DATA_DIR, 'sepay_processed_tx.json');

try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (e) {
  console.warn('Could not initialize .data directory:', e);
}

function loadOrdersFromDisk(): Map<string, PaymentRecord> {
  const map = new Map<string, PaymentRecord>();
  try {
    if (fs.existsSync(ORDERS_STORAGE_FILE)) {
      const raw = fs.readFileSync(ORDERS_STORAGE_FILE, 'utf-8');
      const list = JSON.parse(raw);
      if (Array.isArray(list)) {
        list.forEach((rec) => {
          if (rec && rec.orderNumber) map.set(rec.orderNumber, rec);
        });
      }
    }
  } catch (err) {
    console.warn('Failed reading persistent orders file, initializing fresh store:', err);
  }
  return map;
}

function saveOrdersToDisk(map: Map<string, PaymentRecord>) {
  try {
    const list = Array.from(map.values());
    fs.writeFileSync(ORDERS_STORAGE_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed writing persistent orders file:', err);
  }
}

function loadProcessedTxFromDisk(): Set<string> {
  const set = new Set<string>();
  try {
    if (fs.existsSync(PROCESSED_TX_STORAGE_FILE)) {
      const raw = fs.readFileSync(PROCESSED_TX_STORAGE_FILE, 'utf-8');
      const list = JSON.parse(raw);
      if (Array.isArray(list)) {
        list.forEach((id) => set.add(String(id)));
      }
    }
  } catch (err) {
    console.warn('Failed reading persistent tx file, initializing fresh store:', err);
  }
  return set;
}

function saveProcessedTxToDisk(set: Set<string>) {
  try {
    const list = Array.from(set.values());
    fs.writeFileSync(PROCESSED_TX_STORAGE_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed writing persistent tx file:', err);
  }
}

// In-memory cache synced with persistent disk storage
const paymentRecords = loadOrdersFromDisk();
const processedTxSet = loadProcessedTxFromDisk();

// Environment configurations
const PAYMENTS_ENABLED = process.env.PAYMENTS_ENABLED === 'true';
// MB Bank account number: Strictly preserve leading 0, no whitespace
const SEPAY_ACCOUNT_NUMBER = (process.env.SEPAY_ACCOUNT_NUMBER || '0772770134').replace(/\s/g, '');
const SEPAY_BANK_NAME = process.env.SEPAY_BANK_NAME || 'MB';
const SEPAY_ACCOUNT_NAME = process.env.SEPAY_ACCOUNT_NAME || 'ALPS';
const SEPAY_WEBHOOK_TOKEN = process.env.SEPAY_WEBHOOK_TOKEN || '';

// Synchronous helper: Generate clean transfer memo without duplicating ALPS prefix
function formatTransferDes(orderNumber: string): string {
  const clean = (orderNumber || '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  if (clean.startsWith('ALPS')) {
    return clean;
  }
  return `ALPS${clean}`;
}

// 1. Get SePay Configuration Status (Public safe config, never leaks secrets)
app.get('/api/sepay/config', (_req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const missingConfigs: string[] = [];
  if (!PAYMENTS_ENABLED) {
    missingConfigs.push('PAYMENTS_ENABLED="false" (Đang ở Chế độ Thử nghiệm / Sandbox Mode)');
  }
  if (!process.env.SEPAY_ACCOUNT_NUMBER) {
    missingConfigs.push('SEPAY_ACCOUNT_NUMBER (Đang dùng mặc định 0772770134)');
  }

  return res.json({
    paymentsEnabled: PAYMENTS_ENABLED,
    isProduction,
    bankName: SEPAY_BANK_NAME,
    bankCode: 'MB',
    accountNumber: SEPAY_ACCOUNT_NUMBER, // 0772770134
    accountName: SEPAY_ACCOUNT_NAME,
    hasWebhookToken: Boolean(SEPAY_WEBHOOK_TOKEN),
    missingConfigs,
    webhookEndpoint: '/api/sepay/webhook',
  });
});

// 2. Initiate Payment Record for Order (Persisted to disk)
app.post('/api/sepay/initiate', (req, res) => {
  try {
    const { orderNumber, amount } = req.body;
    if (!orderNumber || typeof orderNumber !== 'string') {
      return res.status(400).json({ error: 'Mã đơn hàng không hợp lệ' });
    }

    const numAmount = Math.round(Number(amount)) || 0;
    const transferDes = formatTransferDes(orderNumber);

    let existing = paymentRecords.get(orderNumber);
    if (existing) {
      if (numAmount > 0) {
        existing.amount = numAmount;
        saveOrdersToDisk(paymentRecords);
      }
      return res.json({
        success: true,
        payment: existing,
        orderNumber,
        des: transferDes,
        transferCode: transferDes,
        bank: 'MB',
        bankCode: 'MB',
        acc: SEPAY_ACCOUNT_NUMBER,
        accountNumber: SEPAY_ACCOUNT_NUMBER,
        accountName: SEPAY_ACCOUNT_NAME,
        amount: numAmount,
      });
    }

    const newRecord: PaymentRecord = {
      orderNumber,
      amount: numAmount,
      isPaid: false,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    paymentRecords.set(orderNumber, newRecord);
    saveOrdersToDisk(paymentRecords);

    return res.json({
      success: true,
      payment: newRecord,
      orderNumber,
      des: transferDes,
      transferCode: transferDes,
      bank: 'MB',
      bankCode: 'MB',
      acc: SEPAY_ACCOUNT_NUMBER,
      accountNumber: SEPAY_ACCOUNT_NUMBER,
      accountName: SEPAY_ACCOUNT_NAME,
      amount: numAmount,
    });
  } catch (err: any) {
    console.error('Error in /api/sepay/initiate:', err);
    return res.status(500).json({ error: 'Không thể khởi tạo phiên thanh toán' });
  }
});

// 3. Check Payment Status for Order
app.get('/api/sepay/payment-status/:orderNumber', (req, res) => {
  try {
    const { orderNumber } = req.params;
    const record = paymentRecords.get(orderNumber);

    return res.json({
      success: true,
      orderNumber,
      isPaid: record ? record.isPaid : false,
      status: record ? record.status : 'pending',
      paymentsEnabled: PAYMENTS_ENABLED,
      transaction: record?.transaction || null,
      paidAt: record?.paidAt || null,
    });
  } catch (err: any) {
    console.error('Error in /api/sepay/payment-status:', err);
    return res.status(500).json({ error: 'Lỗi kiểm tra trạng thái thanh toán' });
  }
});

// 4. Simulate Payment Success (Đã vô hiệu hóa hoàn toàn theo yêu cầu)
app.all('/api/sepay/simulate-success', (_req, res) => {
  return res.status(403).json({
    success: false,
    error: 'Chức năng mô phỏng thanh toán đã bị vô hiệu hóa hoàn toàn. Hệ thống chỉ xác nhận khi nhận được thanh toán thực tế qua SePay Webhook.',
  });
});

// 5. SePay Webhook Endpoint (Strict Authentication, Full 4-Step Validation & Idempotency)
app.post('/api/sepay/webhook', (req, res) => {
  try {
    // KHI PAYMENTS_ENABLED=true: BẮT BUỘC có SEPAY_WEBHOOK_TOKEN và từ chối nếu thiếu hoặc sai Authorization
    if (PAYMENTS_ENABLED) {
      if (!SEPAY_WEBHOOK_TOKEN) {
        console.error('[SePay Webhook] PAYMENTS_ENABLED=true nhưng SEPAY_WEBHOOK_TOKEN chưa được cấu hình!');
        return res.status(500).json({
          success: false,
          error: 'Cấu hình bảo mật chưa hoàn tất: Bắt buộc cấu hình SEPAY_WEBHOOK_TOKEN khi bật thanh toán.',
        });
      }

      const authHeader = req.headers['authorization'];
      const tokenHeader = req.headers['x-sepay-token'] || req.query.token;

      let extractedToken = '';
      if (typeof authHeader === 'string' && authHeader.trim()) {
        const parts = authHeader.trim().split(/\s+/);
        // Hỗ trợ "Apikey <token>" hoặc "Bearer <token>" hoặc token nguyên bản
        if (parts.length >= 2 && (parts[0].toLowerCase() === 'apikey' || parts[0].toLowerCase() === 'bearer')) {
          extractedToken = parts.slice(1).join(' ').trim();
        } else {
          extractedToken = authHeader.trim();
        }
      } else if (typeof tokenHeader === 'string') {
        extractedToken = tokenHeader.trim();
      }

      // Tuyệt đối không cho phép bỏ qua xác thực
      if (!extractedToken || extractedToken !== SEPAY_WEBHOOK_TOKEN) {
        console.warn('[SePay Webhook] Từ chối request: Thiếu hoặc sai Authorization: Apikey <token>');
        return res.status(401).json({
          success: false,
          error: 'Unauthorized: Webhook token không hợp lệ hoặc bị thiếu.',
        });
      }
    }

    const data: SePayTransaction = req.body;
    console.log('[SePay Webhook] Nhận dữ liệu giao dịch webhook:', data);

    const { content, transferAmount, transferType, referenceCode, id, accountNumber } = data;

    // KIỂM TRA 1: Tiền vào (transferType === 'in')
    if (transferType !== 'in') {
      console.log('[SePay Webhook] Bỏ qua giao dịch không phải tiền vào (transferType !== "in"):', transferType);
      return res.json({ success: true, message: 'Bỏ qua giao dịch không phải tiền vào' });
    }

    // KIỂM TRA 2: Đúng tài khoản ngân hàng nhận tiền
    const cleanWebhookAccount = String(accountNumber || '').replace(/\s/g, '').toUpperCase();
    const cleanConfigAccount = String(SEPAY_ACCOUNT_NUMBER || '').replace(/\s/g, '').toUpperCase();
    if (cleanWebhookAccount !== cleanConfigAccount) {
      console.warn(`[SePay Webhook] Sai tài khoản nhận: nhận ${cleanWebhookAccount}, kỳ vọng ${cleanConfigAccount}`);
      return res.status(400).json({
        success: false,
        error: `Số tài khoản nhận tiền không khớp với cấu hình hệ thống (nhận: ${cleanWebhookAccount}).`,
      });
    }

    // KIỂM TRA CHỐNG XỬ LÝ TRÙNG LẶP (IDEMPOTENCY)
    const txId = String(id || referenceCode || `${cleanWebhookAccount}_${transferAmount}_${content}`);
    if (processedTxSet.has(txId)) {
      console.log(`[SePay Webhook] Giao dịch ID ${txId} đã được xử lý trước đó. Bỏ qua để chống trùng lặp.`);
      return res.json({
        success: true,
        message: 'Giao dịch đã được ghi nhận trước đó (Idempotent ignore)',
      });
    }

    // KIỂM TRA 3: Đúng mã đơn hàng trong nội dung chuyển khoản
    const rawContent = (content || '').toUpperCase();
    const cleanRawContent = rawContent.replace(/[^A-Z0-9]/g, '');
    let matchedOrder: PaymentRecord | null = null;

    // Tìm kiếm trong danh sách đơn hàng đã lưu bền vững (so sánh chuỗi chuẩn hóa)
    for (const [orderNum, record] of paymentRecords.entries()) {
      const cleanNum = orderNum.replace(/[^A-Z0-9]/g, '').toUpperCase();
      if (cleanNum && cleanRawContent.includes(cleanNum)) {
        matchedOrder = record;
        break;
      }
    }

    // Fallback: Tìm mã số tự sinh dạng số hoặc ALPS/ORD
    if (!matchedOrder) {
      for (const [orderNum, record] of paymentRecords.entries()) {
        const digitsOnly = orderNum.replace(/[^0-9]/g, '');
        if (digitsOnly.length >= 4 && cleanRawContent.includes(digitsOnly)) {
          matchedOrder = record;
          break;
        }
      }
    }

    if (!matchedOrder) {
      console.warn(`[SePay Webhook] Không tìm thấy mã đơn hàng hợp lệ trong nội dung chuyển khoản: "${content}"`);
      return res.status(404).json({
        success: false,
        error: 'Không tìm thấy đơn hàng tương ứng với nội dung chuyển khoản trong hệ thống.',
      });
    }

    // KIỂM TRA 4: Đúng số tiền do server tính
    const receivedAmount = Number(transferAmount) || 0;
    const expectedAmount = Number(matchedOrder.amount) || 0;

    if (expectedAmount > 0 && receivedAmount < expectedAmount) {
      console.warn(
        `[SePay Webhook] Số tiền chuyển khoản (${receivedAmount}₫) nhỏ hơn số tiền cần thanh toán (${expectedAmount}₫) cho đơn ${matchedOrder.orderNumber}`
      );
      matchedOrder.status = 'underpaid';
      saveOrdersToDisk(paymentRecords);
      return res.status(400).json({
        success: false,
        error: `Số tiền thanh toán (${receivedAmount}₫) không đủ so với giá trị đơn hàng (${expectedAmount}₫).`,
      });
    }

    // TẤT CẢ 4 KIỂM TRA ĐỀU HỢP LỆ -> XÁC NHẬN THANH TOÁN VÀ LƯU BỀN VỮNG
    matchedOrder.isPaid = true;
    matchedOrder.status = 'paid';
    matchedOrder.paidAt = new Date().toISOString();
    matchedOrder.transaction = data;
    matchedOrder.transactionId = txId;

    // Đánh dấu ID giao dịch đã xử lý (chống trùng lặp)
    processedTxSet.add(txId);

    // Ghi tức thì vào đĩa cứng (Persistent Storage)
    saveProcessedTxToDisk(processedTxSet);
    saveOrdersToDisk(paymentRecords);

    console.log(
      `[SePay Webhook] ✓ XÁC NHẬN THANH TOÁN THÀNH CÔNG cho đơn hàng ${matchedOrder.orderNumber} (Đã nhận: ${receivedAmount}₫, TxId: ${txId})`
    );

    return res.json({
      success: true,
      message: `Đơn hàng ${matchedOrder.orderNumber} đã được xác nhận thanh toán thành công`,
      orderNumber: matchedOrder.orderNumber,
      transactionId: txId,
    });
  } catch (error: any) {
    console.error('Error processing SePay webhook:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// BẮT BUỘC: Mọi endpoint /api/* không tồn tại PHẢI trả về JSON 404, không bao giờ fallback về HTML index.html
app.all('/api/*', (req, res) => {
  return res.status(404).json({
    success: false,
    error: `API endpoint '${req.method} ${req.path}' không tồn tại trên máy chủ.`,
  });
});

// Vite Middleware for Dev, Static Files for Prod
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === 'true' ? false : undefined,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Explicit fallback for dev server: Guarantee any direct subroute access serves transformed index.html
    app.get('*', async (req, res, next) => {
      if (req.path.startsWith('/api/')) return next();
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`[ALPS SERVER] Listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
