// Canonical shared rules: one merchandise voucher plus optional shipping voucher.
type PromotionRule = { percent: number; scope: 'order' | 'shipping' | 'member-original'; label: string; maxDiscount?: number; minSubtotal?: number };
export const PROMOTIONS = {
  ALPS25K: {percent: 20, scope: 'order', minSubtotal: 200000, maxDiscount: 25000, label: 'Giảm 20%, tối đa 25.000đ, đơn từ 200.000đ'},
  ALPS75K: {percent: 20, scope: 'order', minSubtotal: 800000, maxDiscount: 75000, label: 'Giảm 20%, tối đa 75.000đ, đơn từ 800.000đ'},
  ALPS100K: {percent: 20, scope: 'order', minSubtotal: 1000000, maxDiscount: 100000, label: 'Giảm 20%, tối đa 100.000đ, đơn từ 1.000.000đ'},
  ALPSFREESHIP: {percent: 0, scope: 'shipping', maxDiscount: 30000, minSubtotal: 499000, label: 'Hỗ trợ phí ship tối đa 30.000đ, đơn từ 499.000đ'},
  ALPSMEMBER: {percent: 10, scope: 'member-original', label: 'Thành viên giảm 10% sản phẩm nguyên giá'},
} as const satisfies Record<string, PromotionRule>;
export const PROMOTION_CODES = Object.keys(PROMOTIONS) as (keyof typeof PROMOTIONS)[];
export const MEMBER_PROMOTION_CODES = ['ALPSMEMBER'] as const;
export const splitPromotionCodes = (input: string | null | undefined) => String(input || '').trim().toUpperCase().split(/\s*\+\s*/).filter(Boolean);
// A new merchandise code replaces the previous one; shipping remains selected.
export function mergePromotionCodes(current: string | null | undefined, next: string) {
  const incoming = splitPromotionCodes(next);
  if (incoming.length !== 1 || !Object.hasOwn(PROMOTIONS, incoming[0])) return next;
  const previous = splitPromotionCodes(current).filter(c => Object.hasOwn(PROMOTIONS, c));
  return [...previous.filter(c => (c === 'ALPSFREESHIP') !== (incoming[0] === 'ALPSFREESHIP')), incoming[0]].sort((a,b) => Number(a === 'ALPSFREESHIP') - Number(b === 'ALPSFREESHIP')).join(' + ');
}
const knownIds = new Set(['cleanser-gentle-purifying','toner-botanical','serum-radiance','cream-regenerating','mask-hydro-lifting','combo-serum-kem-duong','combo-toner-mat-na','combo-toan-dien']);
export type PromotionItem = {productId: string; quantity: number; unitPrice: number; originalUnitPrice?: number};
export function getPromotionDiscount(input: string | null | undefined, items: PromotionItem[], isMember = false, shippingFee = 0) {
  const codes = splitPromotionCodes(input);
  const empty = {code: codes.join(' + '), scope: '' as string, percent: 0, eligibleSubtotal: 0, discountAmount: 0, shippingDiscountAmount: 0, error: ''};
  if (!codes.length) return empty;
  if (codes.some(c => !Object.hasOwn(PROMOTIONS,c))) return {...empty,error: 'Mã không hợp lệ. Vui lòng chọn mã ưu đãi ALPS hiện hành.'};
  if (new Set(codes).size !== codes.length || codes.filter(c => c !== 'ALPSFREESHIP').length > 1 || codes.length > 2) return {...empty,error: 'Chỉ dùng một mã giảm tiền hàng và một mã ALPSFREESHIP mỗi đơn.'};
  const known = items.filter(i => knownIds.has(i.productId));
  const subtotal = known.reduce((s,i) => s+i.unitPrice*i.quantity,0);
  let discountAmount = 0, shippingDiscountAmount = 0, percent = 0, eligibleSubtotal = 0;
  for (const code of codes) {
    const rule: PromotionRule = PROMOTIONS[code as keyof typeof PROMOTIONS];
    if (subtotal < (rule.minSubtotal ?? 0)) return {...empty,error: `${code} áp dụng cho đơn từ ${(rule.minSubtotal!).toLocaleString('vi-VN')}đ tiền hàng, chưa gồm phí ship.`};
    if (rule.scope === 'shipping') { shippingDiscountAmount = Math.min(Math.max(0,shippingFee),rule.maxDiscount!); continue; }
    if (rule.scope === 'member-original' && !isMember) return {...empty,error: `Vui lòng đăng nhập tài khoản thành viên để dùng mã ${code}.`};
    eligibleSubtotal = known.reduce((s,i) => s + (rule.scope !== 'member-original' || i.unitPrice >= (i.originalUnitPrice ?? i.unitPrice) ? (rule.scope === 'member-original' ? (i.originalUnitPrice ?? i.unitPrice) : i.unitPrice)*i.quantity : 0),0);
    if (!eligibleSubtotal) return {...empty,error: 'Giỏ hàng chưa có sản phẩm chưa giảm giá phù hợp với mã thành viên.'};
    percent = rule.percent;
    discountAmount = Math.min(Math.round(eligibleSubtotal*percent/100),rule.maxDiscount ?? Infinity);
  }
  const canonical = [...codes].sort((a,b) => Number(a === 'ALPSFREESHIP')-Number(b === 'ALPSFREESHIP')).join(' + ');
  return {...empty,code: canonical,scope: codes.length > 1 ? 'combined' : codes[0] === 'ALPSFREESHIP' ? 'shipping' : 'order',percent,eligibleSubtotal,discountAmount,shippingDiscountAmount};
}
export function getComboVoucher(price: number) { return price >= 1000000 ? 'ALPS100K' : price >= 800000 ? 'ALPS75K' : 'ALPS25K'; }
