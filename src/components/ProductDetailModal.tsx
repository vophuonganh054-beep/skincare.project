import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Droplets,
  ArrowRight,
  Check,
  ShoppingBag,
  ShieldCheck,
  Clock,
  HelpCircle,
  Lightbulb,
  AlertCircle,
  Star,
  MessageSquare,
} from 'lucide-react';
import { Product, UserProfile } from '../types';
import { ProductReviewsSection } from './ProductReviewsSection';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedProduct } from '../i18n/productTranslations';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart?: (product: Product, quantity: number) => void;
  onBuyNow?: (product: Product, quantity: number) => void;
  user?: UserProfile | null;
  onShowToast?: (msg: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  user,
  onShowToast,
}) => {
  const { t, language } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'usage' | 'benefits' | 'ingredients' | 'reviews'>('usage');
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) return null;

  const localized = getLocalizedProduct(product, language);
  const displayName = localized?.name || product.name;
  const displayTag = localized?.tag || product.tag;
  const displaySubtitle = localized?.subtitle || product.subtitle;
  const displayDescription = localized?.description || product.description;
  const displayIngredients = localized?.keyIngredients || product.keyIngredients;
  const displayBenefits = localized?.benefits || product.benefits;
  const displayUsage = localized?.usage || product.usage;
  const displayRoutineStep = localized?.routineStepTitle || product.routineStepTitle;
  const displayStock = localized?.stockStatus || (product.inStock ? t.productDetail.inStock : t.productDetail.outOfStock);
  const displayTip = localized?.expertTip || product.detailedUsage?.expertTip;
  const displayDetailedUsage = localized?.detailedUsage || product.detailedUsage;

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
      setAddedAnimation(true);
      setTimeout(() => setAddedAnimation(false), 1500);
    }
  };

  const handleOpenReviews = () => {
    setActiveTab('reviews');
    const tabsElement = document.getElementById('product-detail-tabs');
    if (tabsElement) {
      tabsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#fcf9f4] rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden z-10 border border-[#202022]/10 max-h-[92vh] flex flex-col">
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-[#1c1c19] hover:bg-white flex items-center justify-center shadow-xs transition-transform active:scale-95 cursor-pointer"
          title={t.productDetail.close}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-8 md:p-10 flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
            {/* Left: Product Image Showcase */}
            <div className="space-y-3">
              <div className="relative aspect-square w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-xs border border-[#202022]/6 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = product.fallbackImage;
                  }}
                  className="w-full h-full object-cover object-center"
                />

                {/* Badge on photo */}
                <div className="absolute top-3 left-3">
                  <span className="bg-[#1c1c19] text-white text-[11px] px-3 py-1 rounded-full font-medium tracking-wider uppercase shadow-sm">
                    {displayTag}
                  </span>
                </div>
              </div>

              {/* Ritual Step callout badge */}
              <div className="bg-[#f0ede9] rounded-2xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-[#74584d] text-white flex items-center justify-center font-serif text-[11px]">
                    0{product.routineStepNumber}
                  </span>
                  <div>
                    <span className="text-[#77767b] text-[10px] uppercase tracking-wider block">{t.productDetail.routineStepLabel}</span>
                    <span className="font-medium text-[#1c1c19]">{displayRoutineStep}</span>
                  </div>
                </div>
                <span className="text-[#8a9a86] font-medium text-[11px] flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Alps Pure Essence</span>
                </span>
              </div>
            </div>

            {/* Right: Product Details & Purchase Form */}
            <div className="flex flex-col justify-between space-y-5">
              <div>
                {/* Brand & Volume */}
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#74584d] font-semibold">
                    ALPS • {product.capacity}
                  </span>
                  <span className="text-xs text-[#8a9a86] font-medium bg-[#8a9a86]/10 px-2.5 py-0.5 rounded-full">
                    {displayStock}
                  </span>
                </div>

                {/* Name */}
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1c1c19] tracking-tight mt-1">
                  {displayName}
                </h2>

                {/* Rating trigger */}
                <button
                  type="button"
                  onClick={handleOpenReviews}
                  className="flex items-center space-x-2 mt-2 group text-left cursor-pointer focus:outline-none"
                  title={t.productDetail.writeFirstReview}
                >
                  <div className="flex items-center text-[#d6d4cf]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3.5 h-3.5 text-[#d6d4cf]" />
                    ))}
                  </div>
                  <span className="text-xs text-[#77767b] group-hover:text-[#74584d] transition-colors">
                    {t.productDetail.noReviewsYet}
                  </span>
                  <span className="text-[10px] text-[#74584d] bg-[#fed8c9]/40 px-2 py-0.5 rounded-full font-medium hidden sm:inline-block">
                    {t.productDetail.writeFirstReview}
                  </span>
                </button>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-[#77767b] font-light mt-2">
                  {displaySubtitle}
                </p>

                {/* Pricing Box */}
                <div className="mt-3.5 p-4 rounded-2xl bg-white border border-[#202022]/6 flex items-baseline justify-between">
                  <div>
                    <div className="flex items-baseline space-x-2">
                      <span className="font-serif text-2xl sm:text-3xl font-normal text-[#1c1c19]">
                        {product.price.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}₫
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-xs sm:text-sm text-[#77767b] line-through">
                          {product.originalPrice.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}₫
                        </span>
                      )}
                    </div>
                    {product.note && (
                      <p className="text-xs text-[#8a9a86] font-medium mt-0.5">
                        ✦ {t.productDetail.privilege} {product.note}
                      </p>
                    )}
                  </div>
                  <div className="text-[11px] text-[#77767b] text-right">
                    {t.productDetail.vatIncluded}<br />{t.productDetail.fastDelivery}
                  </div>
                </div>

                {/* Description paragraph */}
                <p className="text-xs sm:text-sm text-[#46464a] leading-relaxed mt-4 font-light">
                  {displayDescription}
                </p>

                {/* Quick Key Highlights preview */}
                <div className="mt-4 pt-4 border-t border-[#202022]/6 space-y-1.5">
                  <span className="text-[11px] uppercase tracking-wider text-[#74584d] font-semibold block">
                    {t.productDetail.tabIngredients}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {displayIngredients.slice(0, 3).map((ing, i) => (
                      <span key={i} className="text-[11px] bg-white px-2.5 py-1 rounded-lg border border-[#202022]/5 text-[#46464a]">
                        • {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quantity Selector & Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-[#202022]/15 rounded-full bg-white px-3 py-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-base text-[#77767b] hover:text-[#1c1c19] px-2 py-0.5 transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-semibold text-xs px-2 text-[#1c1c19]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-base text-[#77767b] hover:text-[#1c1c19] px-2 py-0.5 transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-[#77767b]">
                    {t.cart.total} <strong className="text-[#1c1c19] font-serif text-sm">{(product.price * quantity).toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}₫</strong>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={handleAdd}
                    className={`py-3 px-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all border flex items-center justify-center space-x-1.5 cursor-pointer ${
                      addedAnimation
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white hover:bg-[#f6f3ee] text-[#1c1c19] border-[#202022]/20 active:scale-98 shadow-xs'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t.catalog.addToCart}</span>
                  </button>

                  <button
                    onClick={() => onBuyNow && onBuyNow(product, quantity)}
                    className="py-3 px-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all bg-[#1c1c19] hover:bg-black text-white active:scale-98 shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>{t.catalog.buyNow}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#fed8c9]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Tabs: Detailed Usage & Clinical Benefits & Reviews */}
          <div id="product-detail-tabs" className="mt-8 pt-6 border-t border-[#202022]/8">
            <div className="flex border-b border-[#202022]/10 space-x-2 sm:space-x-6 text-xs tracking-wider overflow-x-auto pb-1">
              <button
                onClick={() => setActiveTab('usage')}
                className={`pb-2.5 font-medium transition-colors whitespace-nowrap flex items-center space-x-1.5 cursor-pointer ${
                  activeTab === 'usage'
                    ? 'border-b-2 border-[#74584d] text-[#74584d] font-bold'
                    : 'text-[#77767b] hover:text-[#1c1c19]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.productDetail.tabUsage}</span>
              </button>

              <button
                onClick={() => setActiveTab('benefits')}
                className={`pb-2.5 font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'benefits'
                    ? 'border-b-2 border-[#1c1c19] text-[#1c1c19] font-bold'
                    : 'text-[#77767b] hover:text-[#1c1c19]'
                }`}
              >
                {t.productDetail.tabBenefits}
              </button>

              <button
                onClick={() => setActiveTab('ingredients')}
                className={`pb-2.5 font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'ingredients'
                    ? 'border-b-2 border-[#1c1c19] text-[#1c1c19] font-bold'
                    : 'text-[#77767b] hover:text-[#1c1c19]'
                }`}
              >
                {t.productDetail.tabIngredients}
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2.5 font-medium transition-colors whitespace-nowrap flex items-center space-x-1.5 cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-[#1c1c19] text-[#1c1c19] font-bold'
                    : 'text-[#77767b] hover:text-[#1c1c19]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t.productDetail.tabReviews}</span>
                <span className="text-[10px] bg-[#f0ede9] text-[#77767b] px-2 py-0.5 rounded-full font-semibold">
                  0
                </span>
              </button>
            </div>

            <div className="py-5 text-xs sm:text-sm text-[#46464a]">
              {/* TAB 1: DETAILED USAGE INSTRUCTIONS */}
              {activeTab === 'usage' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="bg-white p-4 rounded-2xl border border-[#202022]/6 space-y-2">
                    <p className="text-xs text-[#1c1c19] leading-relaxed">
                      {displayUsage}
                    </p>
                  </div>

                  {displayDetailedUsage && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                      {displayDetailedUsage.timing && (
                        <div className="p-3 bg-[#f6f3ee] rounded-xl border border-[#202022]/6">
                          <span className="text-[10px] uppercase font-bold text-[#74584d] tracking-wider block">
                            {language === 'vi' ? 'Thời Điểm' : language === 'de' ? 'Anwendung' : language === 'es' ? 'Momento' : language === 'zh' ? '使用时段' : 'Timing'}
                          </span>
                          <span className="text-xs text-[#1c1c19] font-medium mt-0.5 block">{displayDetailedUsage.timing}</span>
                        </div>
                      )}
                      {displayDetailedUsage.amount && (
                        <div className="p-3 bg-[#f6f3ee] rounded-xl border border-[#202022]/6">
                          <span className="text-[10px] uppercase font-bold text-[#74584d] tracking-wider block">
                            {language === 'vi' ? 'Liều Lượng' : language === 'de' ? 'Menge' : language === 'es' ? 'Cantidad' : language === 'zh' ? '建议用量' : 'Amount'}
                          </span>
                          <span className="text-xs text-[#1c1c19] font-medium mt-0.5 block">{displayDetailedUsage.amount}</span>
                        </div>
                      )}
                      {displayDetailedUsage.suitableFor && (
                        <div className="p-3 bg-[#f6f3ee] rounded-xl border border-[#202022]/6 sm:col-span-1">
                          <span className="text-[10px] uppercase font-bold text-[#74584d] tracking-wider block">
                            {language === 'vi' ? 'Phù Hợp' : language === 'de' ? 'Geeignet für' : language === 'es' ? 'Apto para' : language === 'zh' ? '适用肤质' : 'Suitable For'}
                          </span>
                          <span className="text-xs text-[#1c1c19] font-medium mt-0.5 block">{displayDetailedUsage.suitableFor}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {displayDetailedUsage?.steps && displayDetailedUsage.steps.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-semibold text-[#1c1c19] uppercase tracking-wider block">
                        {language === 'vi' ? 'Các Bước Thực Hiện' : language === 'de' ? 'Anwendungsschritte' : language === 'es' ? 'Pasos de Aplicación' : language === 'zh' ? '护理步骤' : 'Step-by-Step Ritual'}
                      </span>
                      <div className="space-y-2">
                        {displayDetailedUsage.steps.map((st) => (
                          <div key={st.step} className="p-3 bg-white rounded-xl border border-[#202022]/6 text-xs flex items-start space-x-3">
                            <span className="w-5 h-5 rounded-full bg-[#74584d] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                              {st.step}
                            </span>
                            <div>
                              <strong className="text-[#1c1c19] block">{st.title}</strong>
                              <p className="text-[#5c5b5f] text-[11px] leading-relaxed mt-0.5 font-light">{st.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Expert Advice Box */}
                  {displayTip && (
                    <div className="p-4 rounded-2xl bg-[#f7f2ee] border border-[#ecdcd0] space-y-1.5 text-xs text-[#74584d]">
                      <div className="flex items-center space-x-2 font-semibold">
                        <Lightbulb className="w-4 h-4 text-[#74584d]" />
                        <span>{t.productDetail.expertTip}</span>
                      </div>
                      <p className="text-xs text-[#584137] leading-relaxed pl-6 font-light">
                        {displayTip}
                      </p>
                    </div>
                  )}

                  {/* Precautions Box */}
                  {(displayDetailedUsage?.precautions || product.detailedUsage?.precautions) && (
                    <div className="p-3.5 rounded-xl bg-white border border-[#202022]/6 text-xs text-[#77767b] flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-[#8a9a86] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        <strong>{t.productDetail.precautions}</strong> {displayDetailedUsage?.precautions || product.detailedUsage?.precautions}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: CLINICAL BENEFITS */}
              {activeTab === 'benefits' && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {displayBenefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start space-x-2 bg-white p-3 rounded-xl border border-[#202022]/5">
                        <Check className="w-4 h-4 text-[#8a9a86] shrink-0 mt-0.5" />
                        <span className="text-xs text-[#1c1c19]">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: KEY INGREDIENTS */}
              {activeTab === 'ingredients' && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {displayIngredients.map((ing, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-xl border border-[#202022]/5">
                        <div className="text-[10px] text-[#74584d] uppercase font-semibold">#{idx + 1}</div>
                        <div className="text-xs font-medium text-[#1c1c19] mt-0.5">{ing}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: REVIEWS */}
              {activeTab === 'reviews' && (
                <div className="animate-fadeIn">
                  <ProductReviewsSection
                    product={product}
                    user={user || null}
                    onShowToast={onShowToast}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
