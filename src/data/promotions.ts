// Shared storefront/server rules. One code per order, with separate merchandise and shipping savings.
type PromotionRule = {
  percent: number;
  scope: 'retail' | 'combo' | 'member' | 'shipping' | 'member-original';
  label: string;
  maxDiscount?: number;
  minSubtotal?: number;
};
export const PROMOTIONS = {
  PHUNU20: { percent: 20, scope: 'retail', label: 'Hàng lẻ giảm 20%' },
  ALPS2010: { percent: 15, scope: 'combo', label: 'Combo giảm 15%' },
  ALPS2025: { percent: 10, scope: 'member', label: 'Thành viên giảm 10%' },
  ALPSCOMBO: { percent: 5, scope: 'combo', maxDiscount: 50000, label: 'Combo giảm 5%, tối đa 50.000đ' },
  ALPSFREESHIP: { percent: 0, scope: 'shipping', maxDiscount: 30000, minSubtotal: 499000, label: 'Hỗ trợ phí ship tối đa 30.000đ, đơn từ 499.000đ' },
  ALPSMEMBER: { percent: 10, scope: 'member-original', label: 'Thành viên giảm 10% sản phẩm nguyên giá' },
} as const satisfies Record<string, PromotionRule>;
export const PROMOTION_CODES = Object.keys(PROMOTIONS) as (keyof typeof PROMOTIONS)[];
export const MEMBER_PROMOTION_CODES = ['ALPS2025', 'ALPSMEMBER'] as const;
const retailIds = new Set(['cleanser-gentle-purifying', 'toner-botanical', 'serum-radiance', 'cream-regenerating', 'mask-hydro-lifting']);
const comboIds = new Set(['combo-serum-kem-duong', 'combo-toner-mat-na', 'combo-toan-dien']);
export type PromotionItem = { productId: string; quantity: number; unitPrice: number; originalUnitPrice?: number };
export function getPromotionDiscount(input: string | null | undefined, items: PromotionItem[], isMember = false, shippingFee = 0) {
  const code = String(input || '').trim().toUpperCase();
  const empty = { code, scope: '' as string, percent: 0, eligibleSubtotal: 0, discountAmount: 0, shippingDiscountAmount: 0, error: '' };
  if (!code) return empty;
  if (!Object.hasOwn(PROMOTIONS, code)) return { ...empty, error: 'Mã không hợp lệ. Vui lòng chọn một trong 6 mã ưu đãi ALPS.' };
  const rule: PromotionRule = PROMOTIONS[code as keyof typeof PROMOTIONS];
  if ((rule.scope === 'member' || rule.scope === 'member-original') && !isMember) {
    return { ...empty, error: `Vui lòng đăng nhập tài khoản thành viên để dùng mã ${code}.` };
  }
  const knownItems = items.filter(item => retailIds.has(item.productId) || comboIds.has(item.productId));
  const subtotal = knownItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  if (rule.scope === 'shipping') {
    if (subtotal < rule.minSubtotal!) return { ...empty, error: 'ALPSFREESHIP áp dụng cho đơn từ 499.000đ tiền hàng, chưa gồm phí ship.' };
    return { ...empty, scope: rule.scope, eligibleSubtotal: subtotal, shippingDiscountAmount: Math.min(Math.max(0, shippingFee), rule.maxDiscount!) };
  }
  const eligibleSubtotal = knownItems.reduce((sum, item) => {
    const originalPrice = item.originalUnitPrice ?? item.unitPrice;
    const eligible = rule.scope === 'retail' ? retailIds.has(item.productId)
      : rule.scope === 'combo' ? comboIds.has(item.productId)
      : rule.scope === 'member-original' ? item.unitPrice >= originalPrice : true;
    return sum + (eligible ? (rule.scope === 'member-original' ? originalPrice : item.unitPrice) * item.quantity : 0);
  }, 0);
  if (!eligibleSubtotal) return { ...empty, error: rule.scope === 'retail' ? 'PHUNU20 chỉ giảm 20% sản phẩm bán lẻ, không áp dụng combo.'
    : rule.scope === 'combo' ? `${code} chỉ giảm ${rule.percent}% sản phẩm combo.`
    : rule.scope === 'member-original' ? 'ALPSMEMBER chỉ áp dụng sản phẩm chưa giảm giá; giỏ hàng chưa có sản phẩm phù hợp.'
    : 'Giỏ hàng chưa có sản phẩm áp dụng.' };
  return { ...empty, scope: rule.scope, percent: rule.percent, eligibleSubtotal,
    discountAmount: Math.min(Math.round(eligibleSubtotal * rule.percent / 100), rule.maxDiscount ?? Infinity) };
}
