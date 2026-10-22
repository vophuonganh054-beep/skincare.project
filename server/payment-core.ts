import { timingSafeEqual } from 'node:crypto';
import { getPromotionDiscount } from '../src/data/promotions.ts';
import { PRODUCT_CATALOG } from '../src/data/productCatalog.ts';
import { CAMPAIGN_2010_DATA } from '../src/data/campaignCatalog.ts';

// Shared by the server and storefront: prices are never accepted from the browser.
export const PRICES: Record<string, number> = Object.fromEntries([
  ...PRODUCT_CATALOG.map(p => [p.id, p.price]),
  ...CAMPAIGN_2010_DATA.combos.map(c => [c.id, c.salePrice]),
]);
export const CARRIERS: Record<string, number> = { ghtk: 15000, ghn: 25000, express: 45000, viettel: 20000 };
export function quote(body: any, context: { isMember?: boolean } = {}) {
  if (!Array.isArray(body.items) || !body.items.length || body.items.length > 50) throw new Error('Giỏ hàng không hợp lệ');
  const items = body.items.map((item: any) => {
    if (!Object.hasOwn(PRICES, item.productId) || !Number.isSafeInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) throw new Error('Sản phẩm hoặc số lượng không hợp lệ');
    const combo = CAMPAIGN_2010_DATA.combos.find(c => c.id === item.productId);
    return { productId: item.productId, quantity: item.quantity, unitPrice: PRICES[item.productId], ...(combo ? { freeGifts: combo.freeGifts } : {}) };
  });
  if (!Object.hasOwn(CARRIERS, body.carrierId)) throw new Error('Đơn vị vận chuyển không hợp lệ');
  const code = String(body.promoCode || '').trim().toUpperCase();
  const subtotal = items.reduce((sum: number, i: any) => sum + i.quantity * i.unitPrice, 0);
  const shippingFee = body.carrierId === 'ghtk' && subtotal >= 500000 ? 0 : CARRIERS[body.carrierId];
  const promotionItems = items.map((item: any) => ({ ...item,
    originalUnitPrice: CAMPAIGN_2010_DATA.combos.find(c => c.id === item.productId)?.originalPrice
      ?? PRODUCT_CATALOG.find(p => p.id === item.productId)?.originalPrice ?? item.unitPrice,
  }));
  const promotion = getPromotionDiscount(code, promotionItems, context.isMember, shippingFee);
  if (promotion.error) throw new Error(promotion.error);
  return { items, carrierId: body.carrierId, promoCode: promotion.code, amount: subtotal - promotion.discountAmount + shippingFee - promotion.shippingDiscountAmount };
}
export function equalSecret(a: string, b: string) {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}
export function validateTransaction(data: any, account: string, amount: number) {
  if (data.transferType !== 'in') return 'ignored';
  if (String(data.accountNumber || '').replace(/\s/g, '') !== account) throw new Error('Sai tài khoản nhận tiền');
  if (!Number.isSafeInteger(Number(data.transferAmount)) || Number(data.transferAmount) <= 0 || data.id == null) throw new Error('Giao dịch không hợp lệ');
  return Number(data.transferAmount) >= amount ? 'paid' : 'underpaid';
}
export function extractOrder(data: any): string | null {
  const codes: string[] = String(data.content || '').toUpperCase().match(/ALPS[A-F0-9]{24}(?![A-Z0-9])/g) || [];
  if (data.code && /^ALPS[A-F0-9]{24}$/.test(String(data.code).toUpperCase())) codes.push(String(data.code).toUpperCase());
  const unique = [...new Set(codes)];
  return unique.length === 1 ? unique[0] : null;
}
