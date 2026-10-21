import test from 'node:test';
import assert from 'node:assert/strict';
import {quote, CARRIERS} from '../server/payment-core.ts';
import {PROMOTIONS, getPromotionDiscount, mergePromotionCodes} from '../src/data/promotions.ts';
import {CAMPAIGN_2010_DATA} from '../src/data/campaignCatalog.ts';
const line = (unitPrice: number) => [{productId:'serum-radiance',quantity:1,unitPrice}];

test('published coupons match rules and all four retired codes are rejected', () => {
  assert.deepEqual(CAMPAIGN_2010_DATA.vouchers.map(v=>v.code),Object.keys(PROMOTIONS));
  for (const promoCode of ['PHUNU20','ALPS2010','ALPS2025','ALPSCOMBO','COMBO20','__proto__']) assert.throws(()=>quote({items:[{productId:'combo-toan-dien',quantity:1}],carrierId:'ghtk',promoCode}));
});
test('each new coupon requires its exact merchandise minimum and caps savings per order',()=>{
  for (const [code,min,cap] of [['ALPS25K',200000,25000],['ALPS75K',800000,75000],['ALPS100K',1000000,100000]] as const) {
    assert.ok(getPromotionDiscount(code,line(min-1),false,45000).error);
    const at = getPromotionDiscount(code,line(min));
    assert.equal(at.error,''); assert.equal(at.discountAmount,Math.min(Math.round(min*.2),cap));
    assert.equal(getPromotionDiscount(code,line(min*10)).discountAmount,cap);
    assert.equal(getPromotionDiscount(code,line(min)).shippingDiscountAmount,0);
  }
});
test('new capped coupons apply to retail, combos and mixed carts without trusting client amounts',()=>{
  assert.equal(quote({items:[{productId:'serum-radiance',quantity:1,unitPrice:1}],carrierId:'ghtk',promoCode:'alps25k',discountAmount:999999}).amount,380000);
  assert.equal(quote({items:[{productId:'combo-serum-kem-duong',quantity:1}],carrierId:'ghtk',promoCode:'ALPS75K'}).amount,765000);
  assert.equal(quote({items:[{productId:'combo-toan-dien',quantity:2}],carrierId:'ghtk',promoCode:'ALPS100K'}).amount,3080000);
  assert.throws(()=>quote({items:[{productId:'serum-radiance',quantity:2}],carrierId:'express',promoCode:'ALPS75K',subtotal:800000}),/800.000/);
});
test('shipping stacks with exactly one merchandise voucher in either order and remains capped by actual freight',()=>{
  for(const [carrierId,fee] of Object.entries(CARRIERS)) {
    const actual = carrierId==='ghtk'?0:fee;
    for(const promoCode of ['ALPS75K + ALPSFREESHIP','alpsfreeship+alps75k']) {
      const result=quote({items:[{productId:'combo-serum-kem-duong',quantity:1}],carrierId,promoCode});
      assert.equal(result.amount,840000-75000+actual-Math.min(actual,30000));
      assert.equal(result.promoCode,'ALPS75K + ALPSFREESHIP');
    }
  }
  const p=getPromotionDiscount('ALPS25K + ALPSFREESHIP',line(499000),false,15000);
  assert.equal(p.discountAmount,25000); assert.equal(p.shippingDiscountAmount,15000);
  assert.ok(getPromotionDiscount('ALPS25K + ALPSFREESHIP',line(498999),false,45000).error);
});
test('duplicate codes, two merchandise vouchers, unknown codes and excess stacking are rejected',()=>{
  for(const code of ['ALPS25K + ALPS75K','ALPS25K + ALPSMEMBER','ALPSFREESHIP + ALPSFREESHIP','ALPS25K + ALPSFREESHIP + ALPS100K','ALPS25K + __proto__']) {
    assert.ok(getPromotionDiscount(code,line(2000000),true,45000).error);
    assert.throws(()=>quote({items:[{productId:'combo-toan-dien',quantity:1}],carrierId:'express',promoCode:code},{isMember:true}));
  }
});
test('UI selection replaces merchandise code while keeping freight; shipping can be selected first',()=>{
  assert.equal(mergePromotionCodes('ALPS25K + ALPSFREESHIP','ALPS75K'),'ALPS75K + ALPSFREESHIP');
  assert.equal(mergePromotionCodes('ALPSFREESHIP','ALPS100K'),'ALPS100K + ALPSFREESHIP');
  assert.equal(mergePromotionCodes('ALPS25K','ALPSFREESHIP'),'ALPS25K + ALPSFREESHIP');
  assert.equal(mergePromotionCodes('ALPS25K + ALPSFREESHIP','ALPSFREESHIP'),'ALPS25K + ALPSFREESHIP');
});
test('member voucher still requires verified membership when stacked and excludes marked-down lines',()=>{
  const items=[{productId:'serum-radiance',quantity:1,unitPrice:390000,originalUnitPrice:390000},{productId:'cream-regenerating',quantity:1,unitPrice:400000,originalUnitPrice:450000}];
  assert.ok(getPromotionDiscount('ALPSMEMBER + ALPSFREESHIP',items,false,45000).error.includes('đăng nhập'));
  const p=getPromotionDiscount('ALPSMEMBER + ALPSFREESHIP',items,true,45000);
  assert.equal(p.discountAmount,39000); assert.equal(p.shippingDiscountAmount,30000);
  assert.throws(()=>quote({items:[{productId:'combo-toan-dien',quantity:1}],carrierId:'express',promoCode:'ALPSFREESHIP + ALPSMEMBER',isMember:true}),/đăng nhập/);
});
test('storefront/server agree for all current codes, supported stacks, carriers and multiple quantities',()=>{
  const items=[{productId:'serum-radiance',quantity:3,unitPrice:390000},{productId:'combo-toan-dien',quantity:2,unitPrice:1590000}];
  for(const code of [...Object.keys(PROMOTIONS),'ALPS25K + ALPSFREESHIP','ALPS75K + ALPSFREESHIP','ALPS100K + ALPSFREESHIP','ALPSMEMBER + ALPSFREESHIP']) for(const [carrierId,fee] of Object.entries(CARRIERS)) {
    const shipping=carrierId==='ghtk'?0:fee;
    const p=getPromotionDiscount(code,items,true,shipping);
    assert.equal(p.error,'');
    const q=quote({items,carrierId,promoCode:code},{isMember:true});
    assert.equal(q.amount,4350000-p.discountAmount+shipping-p.shippingDiscountAmount);
    assert.deepEqual(q.items[1].freeGifts,CAMPAIGN_2010_DATA.combos.find(c=>c.id==='combo-toan-dien')!.freeGifts);
  }
});
