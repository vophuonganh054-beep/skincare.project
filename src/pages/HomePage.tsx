import React, { useEffect, useRef, useState } from 'react';
import { SensoryEditorial } from '../components/SensoryEditorial';
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
import { ArrowRight, Sparkles, Pause, Play } from 'lucide-react';

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
  const [motionPaused, setMotionPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setMotionPaused(preference.matches);
    preference.addEventListener('change', change);
    return () => preference.removeEventListener('change', change);
  }, []);

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
    root.querySelectorAll('[id^="product-card-"]').forEach((card, index) => {
      card.setAttribute('data-art-reveal', '');
      (card as HTMLElement).style.setProperty('--art-delay', `${(index % 3) * 90}ms`);
    });
    root.querySelectorAll('[data-art-reveal]').forEach(section => observer.observe(section));
    root.classList.add('art-ready');
    return () => { observer.disconnect(); root.classList.remove('art-ready'); };
  }, []);

  useEffect(() => {
    const root = storefront.current;
    if (!root || motionPaused) return;
    const images = Array.from(root.querySelectorAll<HTMLElement>('[data-art-parallax]'));
    let frame = 0;
    const update = () => {
      frame = 0;
      images.forEach(image => {
        const rect = image.parentElement!.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          const offset = Math.max(-20, Math.min(20, (window.innerHeight / 2 - rect.top - rect.height / 2) * 0.06));
          image.style.setProperty('--art-offset', `${offset}px`);
        }
      });
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', scroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', scroll);
      cancelAnimationFrame(frame);
      images.forEach(image => image.style.removeProperty('--art-offset'));
    };
  }, [motionPaused]);

  const handleExploreProducts = () => {
    navigate('/san-pham');
  };

  return (
    <div className={`w-full alps-art-store${motionPaused ? ' art-motion-paused' : ''}`} ref={storefront}>
      {/* Hero Banner */}
      <HeroBanner
        onExploreClick={handleExploreProducts}
        onOpenSkinQuiz={onOpenSkinQuiz}
        isMobileFrame={false}
        motionPaused={motionPaused}
      />

      <div className="alps-motion-toolbar"><span>THE ALPS EDIT / VẺ ĐẸP CỦA NHỮNG KHOẢNG LẶNG</span><button onClick={() => setMotionPaused(value => !value)} aria-pressed={motionPaused}>{motionPaused ? <Play size={13} /> : <Pause size={13} />}{motionPaused ? 'Bật hiệu ứng' : 'Tạm dừng hiệu ứng'}</button></div>
      <BeautyRibbon />
      <GiftEditorial />

      {/* 5-Step Ritual Callout */}
      <RitualCallout
        onOpenRitual={onOpenRitualModal}
        isMobileFrame={false}
      />

      <SensoryEditorial onOpenSkinQuiz={onOpenSkinQuiz} />

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
