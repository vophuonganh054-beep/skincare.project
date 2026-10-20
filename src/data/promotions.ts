// One set of rules for the storefront and the server. Discounts never stack.
export const PROMOTIONS = {
  PHUNU20: { percent: 20, scope: 'retail', label: 'Hàng lẻ giảm 20%' },
  ALPS2010: { percent: 15, scope: 'combo', label: 'Combo giảm 15%' },
  ALPS2025: { percent: 10, scope: 'member', label: 'Thành viên giảm 10%' },
} as const;
const retailIds = new Set(['cleanser-gentle-purifying', 'toner-botanical', 'serum-radiance', 'cream-regenerating', 'mask-hydro-lifting']);
const comboIds = new Set(['combo-serum-kem-duong', 'combo-toner-mat-na', 'combo-toan-dien']);
export type PromotionItem = { productId: string; quantity: number; unitPrice: number };
export function getPromotionDiscount(input: string | null | undefined, items: PromotionItem[], isMember = false) {
  const code = String(input || '').trim().toUpperCase();
  const empty = { code, percent: 0, eligibleSubtotal: 0, discountAmount: 0, error: '' };
  if (!code) return empty;
  if (!Object.hasOwn(PROMOTIONS, code)) return { ...empty, error: 'Mã không hợp lệ. Chỉ áp dụng PHUNU20, ALPS2010 hoặc ALPS2025.' };
  const rule = PROMOTIONS[code as keyof typeof PROMOTIONS];
  if (rule.scope === 'member' && !isMember) return { ...empty, error: 'Vui lòng đăng nhập tài khoản thành viên để dùng mã ALPS2025.' };
  const eligibleSubtotal = items.reduce((sum, item) => {
    const eligible = rule.scope === 'retail' ? retailIds.has(item.productId) : rule.scope === 'combo' ? comboIds.has(item.productId) : retailIds.has(item.productId) || comboIds.has(item.productId);
    return sum + (eligible ? item.unitPrice * item.quantity : 0);
  }, 0);
  if (!eligibleSubtotal) return { ...empty, error: rule.scope === 'retail' ? 'PHUNU20 chỉ giảm 20% sản phẩm bán lẻ, không áp dụng combo.' : rule.scope === 'combo' ? 'ALPS2010 chỉ giảm 15% sản phẩm combo.' : 'Giỏ hàng chưa có sản phẩm áp dụng.' };
  return { code, percent: rule.percent, eligibleSubtotal, discountAmount: Math.round(eligibleSubtotal * rule.percent / 100), error: '' };
}
