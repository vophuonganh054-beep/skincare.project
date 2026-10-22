import test from 'node:test';
import assert from 'node:assert/strict';
import {PRODUCT_CATALOG} from '../src/data/productCatalog.ts';
import {CAMPAIGN_2010_DATA} from '../src/data/campaignCatalog.ts';
import {quote, PRICES} from '../server/payment-core.ts';
test('all retail products sell at exactly 80% of original price with no voucher required',()=>{
  for(const p of PRODUCT_CATALOG){
    assert.equal(p.price,Math.round(p.originalPrice!*.8));
    assert.equal(PRICES[p.id],p.price);
    assert.equal(p.promoCode,undefined);assert.equal(p.promoPrice,undefined);
    assert.equal(quote({items:[{productId:p.id,quantity:1,unitPrice:1}],carrierId:'ghtk'}).amount,p.price+15000);
  }
});
test('all combos automatically save 20% without an order cap; gift contents are preserved',()=>{
  const expected=[672000,400000,1272000];
  CAMPAIGN_2010_DATA.combos.forEach((c,index)=>{
    assert.equal(c.salePrice,expected[index]);assert.equal(c.savings,c.originalPrice*.2);
    const result=quote({items:[{productId:c.id,quantity:2,freeGifts:['fake']}],carrierId:'ghtk'});
    assert.equal(result.amount,c.salePrice*2);assert.deepEqual(result.items[0].freeGifts,c.freeGifts);
  });
});
