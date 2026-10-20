import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import {registerPayments} from '../server/payments.ts';

// An atomic fake of the exact Firestore interface used by the routes.
// Deliberately fails writes in one test to check safe acknowledgement behavior.
function store() {
  const records = new Map<string, any>();
  let fail = false;
  const database = {
    collection: (name: string) => ({doc: (id: string) => {
      const key = name + '/' + id;
      return {key, get: async () => ({exists: records.has(key), data: () => records.get(key)})};
    }}),
    runTransaction: async (callback: any) => {
      const writes: (() => void)[] = [];
      const result = await callback({
        get: (ref: any) => ref.get(),
        create: (ref: any, value: any) => writes.push(() => records.set(ref.key, value)),
        update: (ref: any, value: any) => writes.push(() => records.set(ref.key, {...records.get(ref.key), ...value})),
      });
      if (fail) throw new Error('Test storage failure');
      writes.forEach(write => write());
      return result;
    },
  };
  return {database, records, setFail: (value: boolean) => {fail = value;}};
}

test('HTTP payment flow: authenticated, immutable, durable, idempotent, fail-closed', async () => {
  process.env.PAYMENTS_ENABLED = 'true';
  process.env.SEPAY_ACCOUNT_NUMBER = '0772770134';
  process.env.SEPAY_ACCOUNT_NAME = 'TEST';
  process.env.SEPAY_WEBHOOK_TOKEN = 'test-webhook-key';
  const storage = store();
  const app = express(); app.use(express.json());
  registerPayments(app, storage.database as any);
  const server = app.listen(0, '127.0.0.1');
  await new Promise<void>(resolve => server.once('listening', resolve));
  const base = 'http://127.0.0.1:' + (server.address() as any).port;
  const id = 'ALPS0123456789ABCDEF01234567';
  const token = 'a'.repeat(64);
  const headers = {'Content-Type': 'application/json', 'X-Payment-Token': token};
  const basket = {orderNumber: id, amount: 265000, carrierId: 'ghtk', items: [{productId: 'cleanser-gentle-purifying', quantity: 1}]};
  const request = (path: string, body: any, h: Record<string, string> = headers) => fetch(base + path, {method: 'POST', headers: h, body: JSON.stringify(body)});
  const webhook = {id: 100, accountNumber: '0772770134', transferType: 'in', transferAmount: 265000, content: 'MB ' + id};
  const auth = {'Content-Type': 'application/json', Authorization: 'Apikey test-webhook-key'};
  try {
    assert.equal((await request('/api/sepay/initiate', {...basket, amount: 1})).status, 409);
    assert.equal((await request('/api/sepay/initiate', basket)).status, 200);
    assert.equal((await request('/api/sepay/initiate', {...basket, items: [{productId: 'toner-botanical', quantity: 1}], amount: 235000})).status, 503);
    assert.equal((await request('/api/sepay/webhook', webhook)).status, 401);
    assert.equal((await fetch(base + '/api/sepay/payment-status/' + id)).status, 404);
    assert.equal((await request('/api/sepay/webhook', {...webhook, transferAmount: 10}, auth)).status, 200);
    let status = await (await fetch(base + '/api/sepay/payment-status/' + id, {headers})).json();
    assert.equal(status.status, 'underpaid'); assert.equal(status.isPaid, false);
    assert.equal((await request('/api/sepay/webhook', {...webhook, id: 101, accountNumber: 'wrong'}, auth)).status, 503);
    storage.setFail(true);
    assert.equal((await request('/api/sepay/webhook', {...webhook, id: 101}, auth)).status, 503);
    storage.setFail(false);
    assert.equal((await request('/api/sepay/webhook', {...webhook, id: 101}, auth)).status, 200);
    assert.equal((await request('/api/sepay/webhook', {...webhook, id: 101}, auth)).status, 200);
    assert.equal((await request('/api/sepay/webhook', {...webhook, id: 102, transferAmount: 1}, auth)).status, 200);
    status = await (await fetch(base + '/api/sepay/payment-status/' + id, {headers})).json();
    assert.equal(status.isPaid, true); assert.equal(status.status, 'paid');
    assert.equal(status.transaction, undefined); assert.equal(status.tokenHash, undefined);
    assert.equal([...storage.records.keys()].filter(k => k.startsWith('paymentTransactions/')).length, 3);
    assert.equal((await request('/api/sepay/simulate-success', {})).status, 403);
    // A second app instance uses the same persisted store, with no in-memory cache.
    const restarted = express(); registerPayments(restarted, storage.database as any);
    const second = restarted.listen(0, '127.0.0.1');
    await new Promise<void>(resolve => second.once('listening', resolve));
    try {
      const response = await fetch('http://127.0.0.1:' + (second.address() as any).port + '/api/sepay/payment-status/' + id, {headers});
      assert.equal((await response.json()).isPaid, true);
    } finally { second.close(); }
  } finally { server.close(); }
});

test('disabled payments reject webhooks even with a matching secret', async () => {
  process.env.PAYMENTS_ENABLED = 'false';
  const app = express(); app.use(express.json()); registerPayments(app, store().database as any);
  const server = app.listen(0, '127.0.0.1');
  await new Promise<void>(resolve => server.once('listening', resolve));
  try {
    const response = await fetch('http://127.0.0.1:' + (server.address() as any).port + '/api/sepay/webhook', {method: 'POST', headers: {Authorization: 'Apikey test-webhook-key'}});
    assert.equal(response.status, 503);
  } finally { server.close(); }
});

test('member code requires verified identity; category rules and gifts are enforced by HTTP', async () => {
  process.env.PAYMENTS_ENABLED = 'true';
  process.env.SEPAY_ACCOUNT_NUMBER = '0772770134';
  process.env.SEPAY_ACCOUNT_NAME = 'TEST';
  process.env.SEPAY_WEBHOOK_TOKEN = 'test-webhook-key';
  const storage = store();
  const app = express(); app.use(express.json());
  registerPayments(app, storage.database as any, async token => {
    if (token === 'valid-member') return {uid: 'member-123'};
    if (token === 'anonymous') return {uid: 'guest', firebase: {sign_in_provider: 'anonymous'}};
    throw new Error('Invalid token');
  });
  const server = app.listen(0, '127.0.0.1');
  await new Promise<void>(resolve => server.once('listening', resolve));
  const url = 'http://127.0.0.1:' + (server.address() as any).port + '/api/sepay/initiate';
  const body = {orderNumber: 'ALPSAAAAAAAAAAAAAAAAAAAAAAAA', items: [{productId: 'combo-serum-kem-duong', quantity: 1}], carrierId: 'ghtk', promoCode: 'ALPS2025', amount: 756000, isMember: true};
  const post = (data: any, token = '') => fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json', 'X-Payment-Token': 'a'.repeat(64), ...(token ? {Authorization: 'Bearer ' + token} : {})}, body: JSON.stringify(data)});
  try {
    for (const token of ['', 'fake', 'anonymous']) assert.equal((await post(body, token)).status, 401);
    assert.equal(storage.records.size, 0);
    assert.equal((await post({...body, promoCode: 'PHUNU20', amount: 672000})).status, 400);
    assert.equal((await post({...body, promoCode: 'COMBO20', amount: 714000})).status, 400);
    assert.equal((await post(body, 'valid-member')).status, 200);
    const record = storage.records.get('paymentSessions/' + body.orderNumber);
    assert.equal(record.memberUid, 'member-123');
    assert.equal(record.amount, 756000);
    assert.ok(record.items[0].freeGifts.some((gift: string) => gift.includes('toner ALPS 10 ml')));
  } finally { server.close(); }
});
