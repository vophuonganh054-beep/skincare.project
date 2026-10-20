import React, { useEffect, useRef } from 'react';
import { BeautyRibbon, GiftEditorial } from '../components/GiftEditorial';
import '../components/ArtfulStorefront.css';
import { HeroBanner } from '../components/HeroBanner';
import { WomenDayCampaignSection } from '../components/WomenDayCampaignSection';
import { RitualCallout } from '../components/RitualCallout';
import { CatalogSection } from '../components/CatalogSection';
import { MinimalistPackagingDesign } from '../components/MinimalistPackagingDesign';
import { HomeBrandStorySection } from '../components/HomeBrandStorySection';
import { Product } from '../types';
import { CampaignCombo } from '../data/campaign2010';
import { PRODUCTS } from '../data/products';
import { useRouter, Link } from '../context/RouterContext';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HomePageProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number, event?: React.MouseEvent) => void;
  onBuyNow: (product: Product, quantity?: number, event?: React.MouseEvent) => void;
  onAddComboToCart: (combo: CampaignCombo) => void;
  onBuyNowCombo: (combo: CampaignCombo) => void;
  onAddDuoToCart: () => void;
  onApplyVoucherToCart: (code: string) => void;
  onOpenRitualModal: () => void;
  onOpenSkinQuiz: () => void;
  onOpenBrandStory: () => void;
  onShowToast: (msg: string) => void;
  searchQuery: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProduct,
  onAddToCart,
  onBuyNow,
  onAddComboToCart,
  onBuyNowCombo,
  onAddDuoToCart,
  onApplyVoucherToCart,
  onOpenRitualModal,
  onOpenSkinQuiz,
  onOpenBrandStory,
  onShowToast,
  searchQuery,
}) => {
  const { navigate } = useRouter();
  const storefront = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = storefront.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    root.querySelectorAll('[data-art-reveal]').forEach(section => observer.observe(section));
    root.classList.add('art-ready');
    return () => { observer.disconnect(); root.classList.remove('art-ready'); };
  }, []);

  const handleExploreProducts = () => {
    navigate('/san-pham');
  };

  return (
    <div className="w-full alps-art-store" ref={storefront}>
      {/* Hero Banner */}
      <HeroBanner
        onExploreClick={handleExploreProducts}
        onOpenSkinQuiz={onOpenSkinQuiz}
        isMobileFrame={false}
      />

      <BeautyRibbon />
      <GiftEditorial />

      {/* 5-Step Ritual Callout */}
      <RitualCallout
        onOpenRitual={onOpenRitualModal}
        isMobileFrame={false}
      />

      {/* Featured Catalog Section */}
      <div id="desktop-catalog" className="relative" data-art-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#202022]/5 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-[11px] uppercase tracking-widest text-[#74584d] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tuyển tập Tinh Hoa</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-[#1c1c19] mt-1">
              Bộ Sưu Tập Tế Bào Gốc Sông Băng Thụy Sĩ
            </h2>
          </div>
          <Link
            to="/san-pham"
            className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider text-[#74584d] hover:text-[#1c1c19] transition-colors group cursor-pointer"
          >
            <span>XEM TẤT CẢ SẢN PHẨM TRÊN TRANG RIÊNG</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <CatalogSection
          products={PRODUCTS}
          onSelectProduct={onSelectProduct}
          onAddToCart={(p, e) => onAddToCart(p, 1, e)}
          onBuyNow={(p, e) => onBuyNow(p, 1, e)}
          searchQuery={searchQuery}
          isMobileFrame={false}
        />
      </div>

      {/* Minimalist Packaging Design Spotlight */}
      <MinimalistPackagingDesign
        onOpenCollection={handleExploreProducts}
        onAddDuoToCart={onAddDuoToCart}
        isMobileFrame={false}
      />

      {/* Concise Brand Story Spotlight (Full story is on /ve-alps) */}
      <HomeBrandStorySection isMobileFrame={false} />
    </div>
  );
};
