import test from 'node:test';
import assert from 'node:assert/strict';
import { quote } from '../server/payment-core.ts';
import { PROMOTIONS, getPromotionDiscount } from '../src/data/promotions.ts';
import { CAMPAIGN_2010_DATA } from '../src/data/campaignCatalog.ts';

const items = [{productId: 'serum-radiance', quantity: 1}, {productId: 'combo-serum-kem-duong', quantity: 1}];
const basket = {items, carrierId: 'ghtk'};
test('only the three published codes are accepted; old aliases cannot discount orders', () => {
  assert.deepEqual(CAMPAIGN_2010_DATA.vouchers.map(v => v.code), Object.keys(PROMOTIONS));
  for (const promoCode of ['COMBO20', 'WOMEN20', 'ALPS10', 'BEAUTY10', 'VIP20', 'VEGAN20', '__proto__']) {
    assert.throws(() => quote({...basket, promoCode}));
  }
});
test('mixed carts discount only the eligible lines, never the other category or shipping', () => {
  assert.equal(quote({...basket, promoCode: 'PHUNU20'}).amount, 312000 + 840000);
  assert.equal(quote({...basket, promoCode: ' alps2010 '}).amount, 390000 + 714000);
  assert.throws(() => quote({...basket, items: [items[1]], promoCode: 'PHUNU20'}), /không áp dụng combo/);
  assert.throws(() => quote({...basket, items: [items[0]], promoCode: 'ALPS2010'}), /chỉ giảm 15%/);
});
test('member discount is 10% once and cannot be enabled by client flags', () => {
  assert.throws(() => quote({...basket, promoCode: 'ALPS2025', isMember: true}), /đăng nhập/);
  assert.equal(quote({...basket, promoCode: 'ALPS2025'}, {isMember: true}).amount, 1107000);
  assert.equal(quote({...basket, promoCode: 'PHUNU20', discountPercent: 99, discountAmount: 999999}).amount, 1152000);
});
test('all three combo totals and gifts match the revised campaign, including quantities', () => {
  const expected = {
    'combo-serum-kem-duong': {amount: 714000, gifts: ['Hộp quà', '1 miếng', 'toner ALPS 10 ml']},
    'combo-toner-mat-na': {amount: 425000, gifts: ['Hộp quà', 'sữa rửa mặt ALPS 20 ml']},
    'combo-toan-dien': {amount: 1351500, gifts: ['Hộp quà', 'sữa rửa mặt ALPS 20 ml', 'toner ALPS 20 ml']},
  };
  for (const combo of CAMPAIGN_2010_DATA.combos) {
    const value = expected[combo.id as keyof typeof expected];
    const order = quote({items: [{productId: combo.id, quantity: 2, freeGifts: ['fake gift']}], carrierId: 'ghtk', promoCode: 'ALPS2010'});
    assert.equal(order.amount, value.amount * 2);
    assert.equal(combo.freeGifts.length, value.gifts.length);
    for (const gift of value.gifts) assert.ok(combo.freeGifts.some(g => g.includes(gift)), gift);
    assert.deepEqual(order.items[0].freeGifts, combo.freeGifts);
  }
});
test('storefront and server agree on mixed baskets with multiple units and every carrier', () => {
  const lines = [{productId: 'serum-radiance', quantity: 3, unitPrice: 390000}, {productId: 'combo-toan-dien', quantity: 2, unitPrice: 1590000}];
  for (const code of Object.keys(PROMOTIONS)) {
    const discount = getPromotionDiscount(code, lines, true);
    assert.equal(discount.error, '');
    for (const [carrierId, shipping] of Object.entries({ghtk: 0, ghn: 25000, express: 45000, viettel: 20000})) {
      assert.equal(quote({items: lines, carrierId, promoCode: code}, {isMember: true}).amount, 4350000 - discount.discountAmount + shipping);
    }
  }
});
