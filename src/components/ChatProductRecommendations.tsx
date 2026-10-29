import React from 'react';
import { PRODUCTS } from '../data/products';
import { CAMPAIGN_2010_DATA } from '../data/campaign2010';
import { sanitizeRecommendationIds } from '../data/chatRecommendations';
import { useLanguage } from '../context/LanguageContext';
import { useCopy } from '../i18n/useCopy';
import { getLocalizedProduct } from '../i18n/productTranslations';
import { getProductPath } from '../utils/slugUtils';
import { SafeImage } from './SafeImage';

export const ChatProductRecommendations: React.FC<{ productIds?: string[] }> = ({ productIds }) => {
  const { language } = useLanguage();
  const copy = useCopy();
  const ids = sanitizeRecommendationIds(productIds);
  if (!ids.length) return null;
  const locale = {vi:'vi-VN',en:'en-GB',de:'de-DE',es:'es-ES',zh:'zh-CN'}[language];
  return (
    <section aria-label={copy('Sản phẩm gợi ý')} className="mt-3 space-y-2 min-w-0" data-testid="chat-product-recommendations">
      <p className="text-[10px] uppercase tracking-wide text-[#74584d] font-semibold">{copy('Sản phẩm gợi ý')}</p>
      {ids.map(id => {
        const product = PRODUCTS.find(p => p.id === id);
        const combo = CAMPAIGN_2010_DATA.combos.find(c => c.id === id);
        if (!product && !combo) return null;
        const name = product ? (getLocalizedProduct(product, language)?.name || product.name) : combo!.name;
        const price = product?.price ?? combo!.salePrice;
        const originalPrice = product?.originalPrice ?? combo?.originalPrice;
        const image = product?.image ?? combo!.image;
        const path = product ? getProductPath(product) : `/uu-dai-20-10#${id}`;
        return (
          <a key={id} href={path} target="_blank" rel="noopener noreferrer"
            aria-label={`${copy('Xem sản phẩm')}: ${copy(name)}`}
            className="flex gap-2.5 rounded-xl border border-[#e5ded5] bg-[#fcf9f4] p-2 text-inherit no-underline hover:border-[#74584d] focus-visible:outline-2 focus-visible:outline-[#74584d] transition-colors min-w-0">
            <SafeImage src={image} fallbackSrc={product?.fallbackImage} alt={copy(name)} className="w-16 h-20 shrink-0 rounded-lg" loading="lazy" />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] sm:text-xs font-semibold leading-snug break-words">{copy(name)}</p>
              {product && <p className="mt-0.5 text-[10px] text-[#77767b]">{copy(product.capacity)}</p>}
              <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="text-xs font-bold text-[#74584d]">{price.toLocaleString(locale)}₫</span>
                {originalPrice && originalPrice > price ? <del className="text-[10px] text-[#77767b]">{originalPrice.toLocaleString(locale)}₫</del> : null}
              </div>
              <span className="mt-1 inline-block text-[10px] font-semibold text-[#2d4a36]">{copy('Xem sản phẩm')} →</span>
            </div>
          </a>
        );
      })}
    </section>
  );
};
