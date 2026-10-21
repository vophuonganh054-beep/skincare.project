import { useCopy } from '../i18n/useCopy';
import { getPromotionDiscount } from '../data/promotions';
import { currentCartProduct } from '../data/cartProducts';
import { auth } from '../firebase';
import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Sparkles, Truck, Tag } from 'lucide-react';
import { CartItem, UserProfile } from '../types';
import { PRODUCTS } from '../data/products';
import { AlpsIcon } from './AlpsLogo';
import { VietQRBadge } from './PaymentBadges';
import { useLanguage } from '../context/LanguageContext';
import { CHECKOUT_I18N } from '../i18n/checkoutTranslations';
import { getLocalizedProduct } from '../i18n/productTranslations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  user?: UserProfile | null;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart?: () => void;
  onOpenCheckout: () => void;
  onExploreProducts: () => void;
  onOpenSupport?: () => void;
  initialVoucher?: string;
  onVoucherApplied?: (code: string | null) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items = [],
  user,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenCheckout,
  onExploreProducts,
  initialVoucher,
  onVoucherApplied,
}) => {
  const copy = useCopy();
  const { t, language } = useLanguage();
  const cData = CHECKOUT_I18N[language]?.cart || CHECKOUT_I18N.vi.cart;

  const [voucherCode, setVoucherCode] = useState(initialVoucher || '');
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(initialVoucher || null);
  const [voucherError, setVoucherError] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialVoucher) {
      setVoucherCode(initialVoucher);
      setAppliedVoucher(initialVoucher);
    }
  }, [initialVoucher]);

  if (!isOpen) return null;

  // Normalize items to ensure resilient rendering even if product data is partial from Firestore
  const safeItems: CartItem[] = (Array.isArray(items) ? items : [])
    .map((item): CartItem | null => {
      if (!item) return null;
      const product = item.product;
      // If product object is present
      if (product && typeof product === 'object' && product.id) {
        return {
          product: currentCartProduct(product),
          quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1,
          selectedSize: item.selectedSize,
        };
      }
      // If product was stored as id or string
      const rawId = (item as unknown as { productId?: string; id?: string }).productId || (item as unknown as { id?: string }).id;
      if (typeof rawId === 'string') {
        const canonical = currentCartProduct({id: rawId} as CartItem['product']);
        const catalogProd = canonical.name ? canonical : PRODUCTS.find((p) => p.id === rawId || p.id.includes(rawId) || rawId.includes(p.id)) || PRODUCTS[0];
        return {
          product: catalogProd,
          quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1,
          selectedSize: item.selectedSize,
        };
      }
      return null;
    })
    .filter((it): it is CartItem => it !== null && !!it.product);

  const totalItemCount = safeItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = safeItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  const promotionItems = safeItems.map(item => ({productId: item.product.id, unitPrice: item.product.price, quantity: item.quantity}));
  const isMember = Boolean(auth.currentUser && !auth.currentUser.isAnonymous);
  const promotion = getPromotionDiscount(appliedVoucher, promotionItems, isMember);
  const discountPercent = promotion.percent;
  const discountAmount = promotion.discountAmount;
  const freeShippingThreshold = 500000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 15000;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyVoucher = (e?: React.FormEvent, directCode?: string) => {
    if (e) e.preventDefault();
    const target = (directCode || voucherCode).trim().toUpperCase();
    const next = getPromotionDiscount(target, promotionItems, isMember);
    if (next.error || !next.percent) {
      setVoucherError(next.error || 'Vui lòng nhập mã ưu đãi.');
      return;
    }
    setAppliedVoucher(next.code);
    setVoucherCode(next.code);
    setVoucherError(null);
    onVoucherApplied?.(next.code);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 w-full sm:w-[460px] max-w-full flex justify-end pointer-events-none">
        <div className="w-full h-full bg-[#fcf9f4] border-l border-[#202022]/10 shadow-2xl flex flex-col pointer-events-auto overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4.5 bg-white border-b border-[#202022]/8 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-[#f6f3ee] text-[#1c1c19] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-[#1c1c19]">
                  {copy(t.cart.title)}
                </h3>
                <p className="text-[11px] text-[#77767b]">
                  {copy(totalItemCount === 0 ? t.cart.emptyTitle : `${totalItemCount} ${totalItemCount === 1 ? 'item' : 'items'}`)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {safeItems.length > 0 && onClearCart && (
                <button
                  onClick={onClearCart}
                  className="text-[11px] text-[#77767b] hover:text-[#ba1a1a] transition-colors px-2 py-1 cursor-pointer"
                  title={copy(t.cart.clearCart)}
                >
                  {copy(t.cart.clearCart)}
                </button>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-[#f6f3ee] text-[#1c1c19] flex items-center justify-center transition-colors cursor-pointer"
                title={copy("Close")}
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-5">
            {safeItems.length === 0 ? (
              /* EMPTY CART STATE */
              <div className="h-full flex flex-col items-center justify-center text-center py-10 px-4">
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-full bg-[#f4eee6] border border-[#d8b4a6]/40 flex items-center justify-center shadow-xs">
                    <ShoppingBag className="w-9 h-9 text-[#74584d] stroke-[1.3]" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white shadow-xs border border-[#ebe8e3] flex items-center justify-center">
                    <AlpsIcon className="w-4 h-4" />
                  </div>
                </div>

                <h4 className="font-serif text-lg sm:text-xl font-normal text-[#1c1c19] mb-2">
                  {copy(t.cart.emptyTitle)}
                </h4>

                <p className="text-xs sm:text-sm text-[#77767b] max-w-xs leading-relaxed mb-6">
                  {copy(t.cart.emptyDesc)}
                </p>

                <button
                  onClick={() => {
                    onClose();
                    onExploreProducts();
                  }}
                  className="w-full max-w-xs py-3 px-6 rounded-full bg-[#1c1c19] hover:bg-black text-white text-xs font-semibold tracking-wider transition-all duration-200 active:scale-98 shadow-sm flex items-center justify-center space-x-2 cursor-pointer uppercase"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#fed8c9]" />
                  <span>{copy(t.cart.continueShopping)}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Swiss Quality Highlights */}
                <div className="mt-10 pt-6 border-t border-[#202022]/6 w-full max-w-xs space-y-3 text-left">
                  <div className="flex items-center space-x-2.5 text-xs text-[#46464a]">
                    <ShieldCheck className="w-4 h-4 text-[#74584d] shrink-0" />
                    <span>{copy(cData.swissOriginalGuarantee)}</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-xs text-[#46464a]">
                    <Truck className="w-4 h-4 text-[#74584d] shrink-0" />
                    <span>{copy(cData.freeShippingBadge)}</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-xs text-[#46464a]">
                    <Sparkles className="w-4 h-4 text-[#74584d] shrink-0" />
                    <span>{copy(cData.giftPrivilegeBadge)}</span>
                  </div>
                </div>
              </div>
            ) : (
              /* FILLED CART ITEMS */
              <div className="space-y-4">
                {/* Free shipping progress bar */}
                <div className="bg-white p-3.5 rounded-2xl border border-[#202022]/6">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[#1c1c19] font-medium flex items-center space-x-1.5">
                      <Truck className="w-3.5 h-3.5 text-[#74584d]" />
                      <span>
                        {copy(remainingForFreeShipping === 0
                          ? cData.freeShippingQualified
                          : cData.addMoreForFreeShipping(remainingForFreeShipping.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')))}
                      </span>
                    </span>
                    <span className="text-[11px] text-[#74584d] font-semibold">
                      {copy(subtotal >= freeShippingThreshold ? '100%' : `${Math.round((subtotal / freeShippingThreshold) * 100)}%`)}
                    </span>
                  </div>
                  <div className="w-full bg-[#f0ede9] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#74584d] h-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="divide-y divide-[#202022]/6 bg-white rounded-2xl border border-[#202022]/6 overflow-hidden">
                  {safeItems.map((item) => {
                    const locProd = getLocalizedProduct(item.product, language);
                    const prodName = locProd?.name || item.product.name;
                    return (
                      <div key={item.product.id} className="p-3.5 flex items-center space-x-3">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#f6f3ee] shrink-0">
                          <img
                            src={item.product.image}
                            alt={copy(prodName)}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = item.product.fallbackImage;
                            }}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h5 className="font-serif text-xs sm:text-sm font-medium text-[#1c1c19] line-clamp-1">
                            {copy(prodName)}
                          </h5>
                          <p className="text-[11px] text-[#77767b] mt-0.5">
                            {copy(item.product.capacity)}
                          </p>
                          <p className="font-serif text-xs font-semibold text-[#1c1c19] mt-1">
                            {item.product.price.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}{"₫"}</p>
                        </div>

                        <div className="flex flex-col items-end space-y-2">
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-[#77767b] hover:text-[#ba1a1a] p-1 transition-colors cursor-pointer"
                            title={copy(cData.removeConfirm)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="flex items-center space-x-1.5 bg-[#f6f3ee] rounded-full px-2 py-0.5 border border-[#202022]/5">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="text-xs text-[#77767b] hover:text-[#1c1c19] px-1 font-light cursor-pointer"
                            >
                              {"-"}</button>
                            <span className="text-[11px] font-medium text-[#1c1c19] w-4 text-center">
                              {copy(item.quantity)}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="text-xs text-[#77767b] hover:text-[#1c1c19] px-1 font-light cursor-pointer"
                            >
                              {"+"}</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Voucher Box */}
                <div className="bg-white p-3.5 rounded-2xl border border-[#202022]/6">
                  <form onSubmit={handleApplyVoucher} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#77767b]" />
                      <input
                        type="text"
                        placeholder={copy(cData.voucherPlaceholder)}
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#fcf9f4] border border-[#202022]/10 rounded-xl focus:outline-hidden focus:border-[#74584d]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-[#f6f3ee] hover:bg-[#ede7df] text-[#1c1c19] text-xs font-medium rounded-xl transition-colors shrink-0 cursor-pointer"
                    >
                      {copy(cData.voucherApplyBtn)}
                    </button>
                  </form>
                  {/* 20/10 Quick Voucher Suggestions */}
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] text-[#74584d] font-semibold flex items-center space-x-1">
                      <span>{copy("🌸 Mã 20/10:")}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleApplyVoucher(undefined, 'PHUNU20')}
                      className={`text-[10px] px-2 py-0.5 rounded-full border transition-all cursor-pointer font-medium ${
                        appliedVoucher === 'PHUNU20'
                          ? 'bg-[#74584d] text-white border-[#74584d]'
                          : 'bg-[#fcf5f1] hover:bg-[#fed8c9]/60 text-[#74584d] border-[#fed8c9]'
                      }`}
                    >
                      {copy("PHUNU20 · Hàng lẻ -20%")}</button>
                    <button
                      type="button"
                      onClick={() => handleApplyVoucher(undefined, 'ALPS2010')}
                      className={`text-[10px] px-2 py-0.5 rounded-full border transition-all cursor-pointer font-medium ${
                        appliedVoucher === 'ALPS2010'
                          ? 'bg-[#74584d] text-white border-[#74584d]'
                          : 'bg-[#f6f3ee] hover:bg-[#ebdccf] text-[#1c1c19] border-[#e2d7c9]'
                      }`}
                    >
                      {copy("ALPS2010 · Combo -15%")}</button>
                  </div>

                  <button type="button" onClick={() => handleApplyVoucher(undefined, 'ALPS2025')} className="mt-2 text-[10px] text-[#74584d] underline">{copy("ALPS2025 · Thành viên -10%")}</button>
                  <p className="text-[10px] text-[#77767b] mt-2">{copy("Mỗi đơn dùng một mã. Mã hàng lẻ/combo chỉ giảm phần hàng phù hợp; mã thành viên yêu cầu đăng nhập.")}</p>
                  {appliedVoucher && !promotion.error && (
                    <p className="text-[11px] text-[#2d4a36] font-medium mt-2 flex items-center space-x-1">
                      <span>{copy("✓ Đã áp dụng mã ")}{copy(appliedVoucher)} {" (-"}{discountPercent}{copy("% phần hàng áp dụng)")}</span>
                    </p>
                  )}
                  {(voucherError || promotion.error) && (
                    <p className="text-[11px] text-[#ba1a1a] mt-1.5">
                      {copy(voucherError || promotion.error)}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer with totals and checkout button (only if has items) */}
          {safeItems.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-[#202022]/8 space-y-3 safe-area-bottom">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#77767b]">
                  <span>{copy(t.cart.subtotal)}</span>
                  <span className="font-serif">{subtotal.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}{"₫"}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#2d4a36]">
                    <span>{copy(cData.voucherDiscountLabel)}</span>
                    <span className="font-serif">{"-"}{discountAmount.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}{"₫"}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#77767b]">
                  <span>{copy(t.cart.shipping)}</span>
                  <span>{copy(shippingFee === 0 ? t.cart.freeShipping : `${shippingFee.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}₫`)}</span>
                </div>
                <div className="pt-2 border-t border-[#202022]/6 flex justify-between items-baseline">
                  <span className="font-serif text-sm font-semibold text-[#1c1c19]">{copy(t.cart.total)}</span>
                  <span className="font-serif text-base font-bold text-[#1c1c19]">
                    {totalAmount.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}{"₫"}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="w-full py-3.5 px-6 rounded-full bg-[#1c1c19] hover:bg-black text-white text-xs font-semibold tracking-wider transition-all duration-200 active:scale-98 shadow-md flex items-center justify-center space-x-2 cursor-pointer uppercase"
              >
                <span>{copy(t.cart.checkoutBtn)}</span>
                <ArrowRight className="w-4 h-4 text-[#fed8c9]" />
              </button>

              {/* Payment badges guarantee */}
              <div className="pt-2 flex flex-col items-center justify-center space-y-1.5 border-t border-[#202022]/6">
                <span className="text-[10px] text-[#77767b]">{copy(cData.securePaymentAccepted)}</span>
                <div className="flex items-center space-x-1.5 flex-wrap justify-center">
                  <VietQRBadge className="h-5" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
