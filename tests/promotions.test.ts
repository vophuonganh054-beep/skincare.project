import test from 'node:test';
import assert from 'node:assert/strict';
import {quote,CARRIERS,PRICES} from '../server/payment-core.ts';
import {PROMOTIONS,getPromotionDiscount} from '../src/data/promotions.ts';
import {CAMPAIGN_2010_DATA} from '../src/data/campaignCatalog.ts';
import {PRODUCT_CATALOG} from '../src/data/productCatalog.ts';
test('only shipping and member codes remain; every retired discount code is rejected',()=>{
  assert.deepEqual(Object.keys(PROMOTIONS),['ALPSFREESHIP','ALPSMEMBER']);
  assert.deepEqual(CAMPAIGN_2010_DATA.vouchers.map(v=>v.code),Object.keys(PROMOTIONS));
  for(const promoCode of ['ALPS25K','ALPS75K','ALPS100K','PHUNU20','ALPS2010','ALPS2025','ALPSCOMBO','__proto__']) assert.throws(()=>quote({items:[{productId:'combo-toan-dien',quantity:1}],carrierId:'ghtk',promoCode}));
});
test('automatic sale has no minimum basket, no discount cap and is not applied twice',()=>{
  assert.equal(quote({items:[{productId:'toner-botanical',quantity:1}],carrierId:'ghtk'}).amount,191000);
  assert.equal(quote({items:[{productId:'combo-toan-dien',quantity:99}],carrierId:'ghtk'}).amount,1272000*99);
  const result=getPromotionDiscount('',[{productId:'serum-radiance',unitPrice:312000,quantity:2}]);
  assert.equal(result.discountAmount,0);assert.equal(result.error,'');
});
test('shipping voucher applies on top of reduced sale prices and never exceeds actual shipping',()=>{
  for(const [carrierId,fee] of Object.entries(CARRIERS)){
    const raw=carrierId==='ghtk'?0:fee;
    assert.equal(quote({items:[{productId:'combo-serum-kem-duong',quantity:1}],carrierId,promoCode:'ALPSFREESHIP'}).amount,672000+raw-Math.min(raw,30000));
  }
  assert.throws(()=>quote({items:[{productId:'combo-toner-mat-na',quantity:1}],carrierId:'express',promoCode:'ALPSFREESHIP'}),/499.000/);
  const item={productId:'serum-radiance',unitPrice:499000,quantity:1};
  assert.equal(getPromotionDiscount('ALPSFREESHIP',[item],false,15000).shippingDiscountAmount,15000);
  assert.ok(getPromotionDiscount('ALPSFREESHIP',[{...item,unitPrice:498999}],false,45000).error);
});
test('member voucher cannot stack another merchandise discount on sale products even for verified members',()=>{
  for(const productId of Object.keys(PRICES)){
    assert.throws(()=>quote({items:[{productId,quantity:1}],carrierId:'ghtk',promoCode:'ALPSMEMBER'},{isMember:true}),/chưa giảm giá/);
  }
  const p=getPromotionDiscount('ALPSMEMBER',[{productId:'serum-radiance',unitPrice:390000,originalUnitPrice:390000,quantity:1}],true);
  assert.equal(p.discountAmount,39000);
});
test('mixed baskets agree between storefront and server for every carrier and multiple quantities',()=>{
  const items=[...PRODUCT_CATALOG.map(p=>({productId:p.id,unitPrice:p.price,originalUnitPrice:p.originalPrice,quantity:2})),...CAMPAIGN_2010_DATA.combos.map(c=>({productId:c.id,unitPrice:c.salePrice,originalUnitPrice:c.originalPrice,quantity:3}))];
  const subtotal=items.reduce((s,i)=>s+i.unitPrice*i.quantity,0);
  for(const code of ['', 'ALPSFREESHIP'])for(const [carrierId,fee] of Object.entries(CARRIERS)){
    const shipping=carrierId==='ghtk'?0:fee;
    const p=getPromotionDiscount(code,items,false,shipping);
    assert.equal(p.error,'');assert.equal(p.discountAmount,0);
    assert.equal(quote({items,carrierId,promoCode:code,amount:1,discountAmount:999999}).amount,subtotal+shipping-p.shippingDiscountAmount);
  }
});
