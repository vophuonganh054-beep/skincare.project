import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedProduct } from '../i18n/productTranslations';
import { useRouter, Link } from '../context/RouterContext';
import { getProductPath } from '../utils/slugUtils';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart?: (product: Product, e: React.MouseEvent) => void;
  onBuyNow?: (product: Product, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  onBuyNow,
}) => {
  const { t, language } = useLanguage();
  const localized = getLocalizedProduct(product, language);
  const displayName = localized?.name || product.name;
  const displayTag = localized?.tag || product.tag;
  const displaySubtitle = localized?.subtitle || product.subtitle;
  const displayNote = localized?.note || product.note;
  const { navigate } = useRouter();
  const productUrl = getProductPath(product);

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;
    navigate(productUrl);
    if (onSelect) onSelect(product);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      className="alps-product-tile group relative cursor-pointer bg-white rounded-2xl sm:rounded-3xl border border-[#202022]/6 p-2.5 sm:p-3.5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between"
    >
      {/* Top Image Container */}
      <Link
        to={productUrl}
        className="alps-tile-photo relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#f6f3ee] flex items-center justify-center block"
      >
        {/* Top Tag */}
        <div className="alps-tile-image-label absolute top-2 left-2 z-10">
          <span className="inline-block bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium tracking-wider text-[#1c1c19] border border-[#202022]/5 shadow-xs whitespace-nowrap">
            {displayTag}
          </span>
        </div>

        {/* Product Photo */}
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = product.fallbackImage;
          }}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </Link>

      {/* Product Information */}
      <div className="alps-tile-body pt-2.5 sm:pt-3 flex flex-col flex-grow justify-between">
        <div>
          {/* Brand & Volume/Capacity */}
          <div className="alps-tile-secondary flex items-center justify-between text-xs uppercase tracking-wider text-[#77767b] font-medium">
            <span>ALPS • {product.capacity}</span>
            <span className="text-[10px] font-semibold text-[#74584d] tracking-normal bg-[#f7f2ee] px-2 py-0.5 rounded border border-[#74584d]/20">
              Pure Alps
            </span>
          </div>

          {/* Product Title */}
          <Link
            to={productUrl}
            className="alps-tile-title block font-serif text-base sm:text-lg font-semibold text-[#1c1c19] tracking-tight mt-1 line-clamp-2 group-hover:text-[#74584d] transition-colors text-pretty leading-snug"
          >
            {displayName}
          </Link>
          <p className="alps-tile-capacity sm:hidden">{product.capacity}</p>

          {/* Subtitle / Key Ingredient */}
          <p className="alps-tile-secondary text-xs sm:text-sm text-[#5a595e] font-normal mt-1 line-clamp-1">
            {displaySubtitle}
          </p>
        </div>

        {/* Bottom Pricing & Actions */}
        <div className="alps-tile-bottom mt-3 pt-2.5 sm:pt-3 border-t border-[#202022]/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-1.5">
          <div className="min-w-0">
            <div className="alps-tile-price-row flex items-baseline space-x-2 flex-wrap">
              <span className="alps-tile-current-price font-serif text-base sm:text-lg font-bold text-[#1c1c19] tabular-nums">
                {(product.promoPrice ?? product.price).toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}₫
              </span>
              {product.originalPrice && product.originalPrice > (product.promoPrice ?? product.price) && (
                <span className="alps-tile-old-price text-xs sm:text-sm text-[#77767b] line-through tabular-nums">
                  {product.originalPrice.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}₫
                </span>
              )}
                    {product.promoCode && <span className="alps-tile-voucher block w-full text-[10px] text-[#74584d] font-medium mt-1">Sau mã {product.promoCode}</span>}
            </div>
            {displayNote && (
              <span className="alps-tile-secondary block text-xs text-[#8a9a86] font-medium tracking-wide truncate mt-0.5">
                {displayNote}
              </span>
            )}
          </div>

          {/* Action Buttons: Mua ngay & Thêm vào giỏ */}
          <div className="alps-tile-actions flex items-center space-x-1.5 shrink-0 w-full sm:w-auto justify-between sm:justify-end pt-1 sm:pt-0">
            {onBuyNow && (
              <button
                id={`buy-now-btn-${product.id}`}
                onClick={(e) => onBuyNow(product, e)}
                className="alps-tile-buy flex-1 sm:flex-none px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold tracking-wider bg-[#202022] hover:bg-black text-white active:scale-95 transition-all text-center whitespace-nowrap shadow-xs uppercase cursor-pointer"
                title={t.catalog.buyNow}
              >
                {t.catalog.buyNow}
              </button>
            )}

            {onAddToCart && (
              <button
                id={`add-cart-btn-${product.id}`}
                onClick={(e) => onAddToCart(product, e)}
                className="alps-tile-add w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#f6f3ee] hover:bg-[#ede7df] text-[#1c1c19] flex items-center justify-center active:scale-95 transition-all border border-[#202022]/8 shrink-0 cursor-pointer"
                title={t.catalog.addToCart}
                aria-label={`${t.catalog.addToCart}: ${displayName}`}
              >
                <ShoppingBag className="w-4 h-4 stroke-[1.6]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
