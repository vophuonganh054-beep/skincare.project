import React from 'react';
import { HeroBanner } from '../components/HeroBanner';
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

  const handleExploreProducts = () => {
    navigate('/san-pham');
  };

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <HeroBanner
        onExploreClick={handleExploreProducts}
        onOpenSkinQuiz={onOpenSkinQuiz}
        isMobileFrame={false}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <Link to="/uu-dai-20-10" className="flex items-center justify-between gap-4 rounded-2xl border border-[#e4c9bd] bg-[#f9f1eb] px-5 py-4 text-[#74584d]">
          <div className="min-w-0">
            <p className="font-serif text-lg sm:text-xl">Ưu đãi 20/10</p>
            <p className="text-xs sm:text-sm mt-1">Lấy voucher và khám phá các combo quà tặng ALPS.</p>
          </div>
          <ArrowRight className="w-5 h-5 shrink-0" />
        </Link>
      </section>

      {/* 5-Step Ritual Callout */}
      <RitualCallout
        onOpenRitual={onOpenRitualModal}
        isMobileFrame={false}
      />

      {/* Featured Catalog Section */}
      <div id="desktop-catalog" className="relative">
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
