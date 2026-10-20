import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCT_CATALOG } from '../src/data/productCatalog.ts';
import { quote } from '../server/payment-core.ts';
import { CAMPAIGN_2010_DATA } from '../src/data/campaignCatalog.ts';

test('serum and cream gift combo discounts by 15% and includes mask plus mini toner', () => {
  const combo = CAMPAIGN_2010_DATA.combos.find(c => c.id === 'combo-serum-kem-duong')!;
  assert.deepEqual(combo.productIds, ['serum-radiance', 'cream-regenerating']);
  assert.equal(combo.salePrice, 840000);
  assert.ok(combo.freeGifts.some(g => g.includes('1 miếng')));
  const order = quote({items: [{productId: combo.id, quantity: 1, unitPrice: 1}], carrierId: 'ghtk', promoCode: 'ALPS2010'});
  assert.equal(order.items[0].unitPrice, combo.salePrice);
  assert.equal(order.amount, 714000);
  const two = quote({items: [{productId: combo.id, quantity: 2}], carrierId: 'ghtk', promoCode: 'ALPS2010'});
  assert.equal(two.amount, 1428000);
});

test('poster prices are applied exactly once by PHUNU20 at checkout',()=>{
  const expected: Record<string,[number,number]>={
    'cleanser-gentle-purifying':[250000,200000],
    'toner-botanical':[220000,176000],
    'serum-radiance':[390000,312000],
    'cream-regenerating':[450000,360000],
    'mask-hydro-lifting':[280000,224000],
  };
  for(const [id,[original,offer]] of Object.entries(expected)){
    const product=PRODUCT_CATALOG.find(p=>p.id===id)!;
    assert.equal(product.price,original);
    assert.equal(product.originalPrice,original);
    assert.equal(product.promoPrice,offer);
    assert.equal(product.promoCode,'PHUNU20');
    const result=quote({items:[{productId:id,quantity:1}],carrierId:'ghtk',promoCode:'PHUNU20'});
    assert.equal(result.amount,offer+15000);
  }
});
