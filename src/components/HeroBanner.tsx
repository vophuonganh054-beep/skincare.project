import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import collectionBannerImg from '../assets/images/alps_banner_champagne_1789839179884.jpg';
import glowSerumImg from '../assets/images/alps-serum-stone.jpg';
import faceCreamImg from '../assets/images/alps_cream_champagne_1789839152375.jpg';
import hydroMaskImg from '../assets/images/alps_mask_champagne_1789839165550.jpg';
import cleanserImg from '../assets/images/alps-cleanser-stone.jpg';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { HERO_I18N } from '../i18n/heroTranslations';

interface HeroBannerProps {
  onExploreClick: () => void;
  onSelectProduct?: (product: Product) => void;
  onOpenSkinQuiz?: () => void;
  isMobileFrame?: boolean;
  motionPaused?: boolean;
}

interface BannerSlide {
  id: string;
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  image: string;
  fallbackImage: string;
  productId?: string;
  buttonText: string;
  secondaryNote: string;
}

const SLIDE_IMAGE_MAP: Record<string, { image: string; fallbackImage: string }> = {
  collection: {
    image: collectionBannerImg,
    fallbackImage: '/images/alps_banner.jpg',
  },
  'serum-glow': {
    image: glowSerumImg,
    fallbackImage: '/glow serum.jpg',
  },
  'face-cream': {
    image: faceCreamImg,
    fallbackImage: '/face cream.jpg',
  },
  'cleanser-purifying': {
    image: cleanserImg,
    fallbackImage: '/cleanser.jpg',
  },
  'hydro-mask': {
    image: hydroMaskImg,
    fallbackImage: '/facemask.jpg',
  },
};

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreClick,
  onSelectProduct,
  onOpenSkinQuiz,
  isMobileFrame = false,
  motionPaused = false,
}) => {
  const { language } = useLanguage();
  const heroData = HERO_I18N[language] || HERO_I18N.vi;

  const slides: BannerSlide[] = heroData.slides.map((s) => ({
    ...s,
    image: SLIDE_IMAGE_MAP[s.id]?.image || collectionBannerImg,
    fallbackImage: SLIDE_IMAGE_MAP[s.id]?.fallbackImage || '/images/alps_banner.jpg',
  }));

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto slide rotation every 5.5 seconds unless user is hovering/interacting
  useEffect(() => {
    if (isPaused || motionPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, motionPaused, slides.length]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleSlideClick = (slide: BannerSlide) => {
    if (slide.productId && onSelectProduct) {
      const targetProd = PRODUCTS.find((p) => p.id === slide.productId);
      if (targetProd) {
        onSelectProduct(targetProd);
        return;
      }
    }
    onExploreClick();
  };

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      // Swiped left -> next
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> prev
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const slide = slides[currentSlide];

  return (
    <div className={`w-full ${isMobileFrame ? 'px-3 pt-2' : 'max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6'}`}>
      <div
        id="hero-banner-slider"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative group overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] shadow-md bg-[#1c1c19] text-[#fcf9f4] min-h-[360px] sm:min-h-0 aspect-[4/4.5] xs:aspect-[4/3.4] sm:aspect-[21/9] md:aspect-[2.3/1] select-none"
      >
        {/* All Slides Container with Smooth Sliding Effect */}
        <div
          className="w-full h-full flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((s, idx) => (
            <div key={s.id} className="w-full h-full shrink-0 relative">
              <img
                src={s.image}
                alt={s.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = s.fallbackImage;
                }}
                className={`w-full h-full object-cover object-center scale-105${idx === currentSlide ? ' alps-hero-active-photo' : ''}`}
              />
              {/* High contrast gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/15 to-transparent hidden sm:block" />
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-4 sm:p-7 md:p-8 pl-4.5 sm:pl-12 md:pl-14 pointer-events-none">
          <div className="pointer-events-auto max-w-xl">
            {/* Top Row: Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
              <div className="inline-flex items-center space-x-1.5 bg-white/95 backdrop-blur-md text-[#1c1c19] px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase shadow-xs">
                <Sparkles className="w-3 h-3 text-[#74584d]" />
                <span>{slide.badge}</span>
              </div>
            </div>

            {/* Slide Heading with Anti-Drop text-pretty and balanced proportions */}
            <h2 className="font-serif text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-normal text-white tracking-tight leading-snug drop-shadow-sm transition-all text-pretty max-w-xl">
              {slide.title}
            </h2>

            {/* Highlight & Subtitle */}
            <p className="text-amber-200/90 text-[11px] sm:text-sm font-medium mt-1 sm:mt-1.5">
              ✦ {slide.highlight}
            </p>
            <p className="text-white/85 text-[11px] sm:text-sm md:text-base font-light mt-0.5 sm:mt-1 max-w-lg leading-relaxed line-clamp-2 sm:line-clamp-none text-pretty">
              {slide.subtitle}
            </p>

            {/* Bottom Action Bar */}
            <div className="mt-3 sm:mt-5 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <button
                  id="hero-explore-btn"
                  onClick={() => handleSlideClick(slide)}
                  className="group inline-flex items-center space-x-1.5 sm:space-x-2 bg-white text-[#1c1c19] hover:bg-[#fcf9f4] px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-semibold tracking-wider transition-all transform active:scale-98 shadow-md cursor-pointer whitespace-nowrap"
                >
                  <span>{slide.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1 text-[#74584d]" />
                </button>

                {onOpenSkinQuiz && (
                  <button
                    onClick={onOpenSkinQuiz}
                    className="inline-flex items-center space-x-1.5 bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs border border-white/40 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider transition-all transform active:scale-98 cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#fed8c9]" />
                    <span>{heroData.quizBtn}</span>
                  </button>
                )}

                <div className="hidden lg:flex items-center space-x-1.5 text-xs text-white/70 whitespace-nowrap">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{heroData.dermatologyBadge}</span>
                </div>
              </div>

              {/* Slide Counter & Next Product Preview */}
              <div className="flex items-center space-x-2 sm:space-x-3 text-right">
                <div className="text-white/80 text-[10px] sm:text-xs font-serif tracking-wide hidden sm:block">
                  <span className="font-mono font-bold text-white">0{currentSlide + 1}</span> / 0{slides.length}
                </div>

                {/* Clickable Indicator Bars */}
                <div className="flex items-center space-x-1.5">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === currentSlide
                          ? 'w-5 sm:w-8 bg-white'
                          : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Left / Right Slide Navigation Arrows (Desktop / Tablet only; mobile uses smooth touch gestures) */}
        <button
          id="hero-prev-slide-btn"
          onClick={handlePrev}
          aria-label={heroData.prevSlideLabel}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 hidden sm:flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          id="hero-next-slide-btn"
          onClick={handleNext}
          aria-label={heroData.nextSlideLabel}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 hidden sm:flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Top-Right Next Slide Peek Chip */}
        <button
          onClick={handleNext}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 hidden xs:inline-flex items-center space-x-1.5 bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[11px] text-white/90 transition-all hover:scale-102 cursor-pointer"
        >
          <span className="text-white/60">{heroData.nextPeek}</span>
          <span className="font-medium text-amber-200 truncate max-w-[130px]">
            {slides[(currentSlide + 1) % slides.length].title.replace('Alps ', '')}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-white/80" />
        </button>
      </div>
    </div>
  );
};
