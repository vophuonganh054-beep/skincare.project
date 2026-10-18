import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCT_CATALOG } from '../src/data/productCatalog.ts';
import { quote } from '../server/payment-core.ts';

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
