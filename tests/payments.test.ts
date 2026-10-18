import test from 'node:test';
import assert from 'node:assert/strict';
import {quote, equalSecret, extractOrder, validateTransaction} from '../server/payment-core.ts';
const body = {items: [{productId: 'serum-radiance', quantity: 1}], carrierId: 'ghtk', promoCode: 'PHUNU20'};
test('server prices include shipping and discount, ignoring client prices', () => {
  assert.equal(quote({...body, amount: 1}).amount, 327000);
  assert.equal(quote({...body, items: [{productId: 'combo-toan-dien', quantity: 1}]}).amount, 1272000);
});
test('rejects tampered baskets and unsupported coupons', () => {
  for (const input of [{...body, items: []}, {...body, items: [{productId: 'nope', quantity: 1}]}, {...body, items: [{productId: 'serum-radiance', quantity: -1}]}, {...body, promoCode: '__proto__'}, {...body, carrierId: 'constructor'}]) assert.throws(() => quote(input));
});
test('requires one complete unique payment code, never a digit substring', () => {
  const id = 'ALPS0123456789ABCDEF01234567';
  assert.equal(extractOrder({content: 'MB ' + id + ' thanh toan'}), id);
  assert.equal(extractOrder({content: id + '8'}), null);
  assert.equal(extractOrder({content: '12345'}), null);
  assert.equal(extractOrder({content: id + ' ALPSFFFFFFFFFFFFFFFFFFFFFFFF'}), null);
});
test('only incoming valid transfers to configured account can pay', () => {
  const tx = {id: 1, accountNumber: '0772770134', transferType: 'in', transferAmount: 327000};
  assert.equal(validateTransaction(tx, tx.accountNumber, 327000), 'paid');
  assert.equal(validateTransaction({...tx, transferAmount: 10}, tx.accountNumber, 327000), 'underpaid');
  assert.equal(validateTransaction({...tx, transferType: 'out'}, tx.accountNumber, 327000), 'ignored');
  assert.throws(() => validateTransaction(tx, 'different', 1));
  assert.throws(() => validateTransaction({...tx, transferAmount: 'NaN'}, tx.accountNumber, 1));
});
test('constant-time secret comparison rejects missing and incorrect token', () => {
  assert.equal(equalSecret('test', 'test'), true);
  assert.equal(equalSecret('', 'test'), false);
  assert.equal(equalSecret('nope', 'test'), false);
});
