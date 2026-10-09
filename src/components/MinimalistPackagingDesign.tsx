import React from 'react';
import { Sparkles, Droplets, Check, ArrowRight, ShoppingBag } from 'lucide-react';
import duoImg from '../assets/images/alps_tube_mask_duo_1790672888481.jpg';
import { useLanguage } from '../context/LanguageContext';
import { PACKAGING_I18N } from '../i18n/packagingTranslations';

interface MinimalistPackagingDesignProps {
  onOpenCollection?: () => void;
  onAddDuoToCart?: () => void;
  isMobileFrame?: boolean;
}

export const MinimalistPackagingDesign: React.FC<MinimalistPackagingDesignProps> = ({
  onOpenCollection,
  onAddDuoToCart,
  isMobileFrame = false,
}) => {
  const { language } = useLanguage();
  const pkg = PACKAGING_I18N[language] || PACKAGING_I18N.vi;

  return (
    <section
      id="minimalist-packaging"
      className="py-12 sm:py-16 bg-[#faf8f5] text-[#1c1c19] border-t border-[#ebe6df] relative overflow-hidden"
    >
      {/* Ambient decorative blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#eadecc]/30 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#dfd7cc]/25 rounded-full blur-3xl pointer-events-none -ml-32 -mb-32" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 bg-white/80 border border-[#e4ded5] px-3.5 py-1 rounded-full text-[11px] font-medium tracking-[0.2em] text-[#74584d] uppercase mb-3 shadow-2xs backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#8b5545]" />
            <span>{pkg.badge}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-normal tracking-tight text-[#1c1c19] leading-snug">
            {pkg.title}
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-[#5f5d58] leading-relaxed font-light">
            {pkg.subtitle}
          </p>
        </div>

        {/* Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-5 sm:p-8 lg:p-10 border border-[#ebe5dc] shadow-sm">
          {/* Main Visual Image */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-[#f4f0eb] border border-[#e8e1d6] aspect-4/3 sm:aspect-16/10 group shadow-xs">
              <img
                src={duoImg}
                alt={pkg.imageAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent opacity-75" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-300 block">
                    {pkg.imageBadge}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-normal mt-0.5 text-amber-100">
                    {pkg.imageTitle}
                  </h3>
                </div>
                <div className="hidden sm:inline-flex items-center space-x-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[11px] border border-amber-300/30 text-amber-200">
                  <Droplets className="w-3 h-3 text-amber-300" />
                  <span>{pkg.imageMetric}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Design Details & Formula */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8b5545] font-semibold block mb-1">
                {pkg.philosophyBadge}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1c1c19] tracking-tight">
                {pkg.duoTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#5f5d58] mt-2.5 leading-relaxed font-light">
                {pkg.duoDescription}
              </p>
            </div>

            {/* Highlights List */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-[#1c1c19] block tracking-wide">
                {pkg.featuresTitle}
              </span>
              <ul className="space-y-2.5">
                {pkg.highlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 text-xs text-[#464542] leading-snug">
                    <div className="w-4 h-4 rounded-full bg-[#f2eae1] border border-[#dfd2c1] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-[#8b5545]" />
                    </div>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Three Micro Metrics */}
            <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-[#ebe5dc]">
              {pkg.metrics.map((m, idx) => (
                <div key={idx} className="p-2.5 bg-[#fbf9f6] rounded-xl border border-[#efe7dd] text-center">
                  <div className="font-serif text-sm font-semibold text-[#1c1c19]">{m.value}</div>
                  <div className="text-[10px] text-[#77746f] mt-0.5 leading-tight">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              {onAddDuoToCart && (
                <button
                  onClick={onAddDuoToCart}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#74584d] hover:bg-[#5e453c] text-white px-5 py-3 rounded-full text-xs font-medium tracking-wider uppercase transition-all shadow-xs cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{pkg.buyDuoBtn}</span>
                </button>
              )}

              {onOpenCollection && (
                <button
                  onClick={onOpenCollection}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#1c1c19] text-[#f7f5f0] hover:bg-[#323235] px-5 py-3 rounded-full text-xs font-medium tracking-wider uppercase transition-all shadow-xs cursor-pointer"
                >
                  <span>{pkg.exploreProductsBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
