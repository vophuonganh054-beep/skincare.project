import { useCopy } from '../i18n/useCopy';
import React from 'react';
import { Sparkles, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SUPPORT_I18N } from '../i18n/supportTranslations';

interface SupportFloatingButtonProps {
  onOpenSupport: () => void;
  onOpenSkinQuiz?: () => void;
  isMobileFrame?: boolean;
}

export const SupportFloatingButton: React.FC<SupportFloatingButtonProps> = ({
  onOpenSupport,
  onOpenSkinQuiz,
  isMobileFrame = false,
}) => {
  const copy = useCopy();
  const { language } = useLanguage();
  const btnTexts = SUPPORT_I18N[language]?.floatingBtn || SUPPORT_I18N.vi.floatingBtn;

  if (isMobileFrame) {
    // In simulated mobile screen, position nicely above bottom nav
    return (
      <div className="absolute bottom-16 right-3 z-40 flex flex-col items-end space-y-1.5">
        {onOpenSkinQuiz && (
          <button
            onClick={onOpenSkinQuiz}
            className="bg-[#fcf9f4] text-[#74584d] hover:bg-white px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5 border border-[#fed8c9] text-xs transition-all active:scale-95 cursor-pointer"
            title={copy(btnTexts.skinQuizLabel)}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[10px] font-bold">{copy(btnTexts.mobileQuiz)}</span>
          </button>
        )}

        {/* Nút Chat Fanpage Tư Vấn Viên 24/7 */}
        <a
          href="https://www.facebook.com/alpspuressence/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1877F2] hover:bg-[#166fe5] text-white px-3.5 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5 text-xs transition-all active:scale-95 cursor-pointer border border-white/25"
          title={copy("Chat Messenger Fanpage với tư vấn viên")}
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span className="text-[11px] font-bold tracking-wide">{copy("Chat Fanpage")}</span>
        </a>

        <button
          id="mobile-floating-support-btn"
          onClick={onOpenSupport}
          className="bg-[#1c1c19] hover:bg-black text-white px-3.5 py-2 rounded-full shadow-xl flex items-center space-x-1.5 border border-[#fed8c9]/40 active:scale-95 transition-all text-xs group cursor-pointer"
          title={copy(btnTexts.chatLabel)}
        >
          <div className="relative">
            <Sparkles className="w-3.5 h-3.5 text-[#fed8c9] animate-spin-slow" />
            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <span className="text-[11px] font-medium tracking-wide">{copy(btnTexts.mobileChat)}</span>
        </button>
      </div>
    );
  }

  // Responsive layout: on mobile screens (< 640px), position above BottomNav (bottom-20 right-3)
  // On desktop / tablet (sm:), position nicely at bottom-6 right-6 with full descriptions
  return (
    <div className="fixed bottom-20 right-3 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end space-y-1.5 sm:space-y-2 pointer-events-auto">
      {onOpenSkinQuiz && (
        <button
          onClick={onOpenSkinQuiz}
          className="bg-white/95 hover:bg-white text-[#74584d] hover:text-[#584137] px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full shadow-lg flex items-center space-x-1.5 sm:space-x-2 border border-[#fed8c9] hover:scale-105 active:scale-95 transition-all text-xs cursor-pointer group"
          title={copy(btnTexts.skinQuizLabel)}
        >
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#f4ece3] flex items-center justify-center text-emerald-700 shrink-0">
            <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
          </div>
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-wide">{copy(btnTexts.skinQuizLabel)}</span>
          <span className="text-[8px] sm:text-[9px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded-full hidden xs:inline-block">
            {copy(btnTexts.oneMin)}
          </span>
        </button>
      )}

      {/* Nút Chat Trực Tiếp Với Tư Vấn Viên Qua Facebook Fanpage */}
      <a
        href="https://www.facebook.com/alpspuressence/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#1877F2] hover:bg-[#166fe5] text-white px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-full shadow-2xl flex items-center space-x-2 border border-white/30 hover:scale-105 active:scale-95 transition-all group cursor-pointer"
        title={copy("Chat trực tiếp với tư vấn viên qua Facebook Fanpage")}
      >
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white text-[#1877F2] flex items-center justify-center shrink-0 shadow-xs">
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </div>
        <div className="text-left">
          <div className="flex items-center space-x-1">
            <span className="block text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-white leading-tight">
              {copy("Tư Vấn Fanpage")}</span>
            <span className="text-[7.5px] sm:text-[8px] bg-white text-[#1877F2] px-1 rounded-xs font-black leading-tight">
              {"24/7"}</span>
          </div>
          <span className="hidden sm:block text-[9px] text-blue-100 font-medium leading-tight">
            {copy("Messenger 1-1 • Hỗ trợ ngay")}</span>
        </div>
      </a>

      {/* Nút Tư Vấn Viên ALPS & CSKH */}
      <button
        id="desktop-floating-support-btn"
        onClick={onOpenSupport}
        className="bg-[#1c1c19] hover:bg-black text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-xl flex items-center space-x-2 border border-[#fed8c9]/50 hover:scale-105 active:scale-95 transition-all group cursor-pointer"
        title={copy(btnTexts.sublabel)}
      >
        <div className="relative flex items-center justify-center shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-[#fed8c9] group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-emerald-400 rounded-full ring-1 ring-[#1c1c19] animate-pulse" />
        </div>
        <div className="text-left">
          <span className="block text-[10px] sm:text-[11px] font-semibold tracking-wider text-white leading-tight">
            {copy("Tư Vấn Viên ALPS & CSKH")}</span>
          <span className="hidden sm:block text-[9px] text-[#fed8c9] font-light leading-tight">
            {copy("Giải đáp tự động 24/7")}</span>
        </div>
      </button>
    </div>
  );
};
