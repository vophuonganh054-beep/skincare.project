import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SupportedLanguage } from '../i18n/translations';

interface LanguageSelectorProps {
  variant?: 'topbar' | 'header' | 'footer' | 'mobile';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'header',
  className = '',
}) => {
  const { language, setLanguage, languages, currentLangOption } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'topbar') {
    return (
      <div className={`relative inline-block ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1.5 text-[11px] text-[#fed8c9] hover:text-white transition-colors cursor-pointer py-0.5 px-2 rounded-full hover:bg-white/10"
          title="Chọn ngôn ngữ / Select language"
        >
          <span className="text-xs">{currentLangOption.flag}</span>
          <span className="font-semibold uppercase tracking-wider">{currentLangOption.shortLabel}</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-1.5 w-44 bg-[#202022] border border-white/15 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-1 text-[9px] font-bold text-[#fed8c9] uppercase tracking-widest border-b border-white/10 mb-1">
              Ngôn Ngữ / Language
            </div>
            {languages.map((item) => (
              <button
                key={item.code}
                onClick={() => {
                  setLanguage(item.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer ${
                  language === item.code ? 'text-[#fed8c9] font-bold' : 'text-white/80'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{item.flag}</span>
                  <span>{item.nativeName}</span>
                </div>
                {language === item.code && <Check className="w-3.5 h-3.5 text-[#fed8c9]" />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`relative inline-block ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-xs bg-white/5 hover:bg-white/10 border border-white/15 px-3 py-1.5 rounded-full text-white transition-colors cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5 text-[#fed8c9]" />
          <span>{currentLangOption.flag} {currentLangOption.nativeName}</span>
          <ChevronDown className="w-3 h-3 text-white/60" />
        </button>

        {isOpen && (
          <div className="absolute left-0 sm:left-auto sm:right-0 bottom-full mb-2 w-48 bg-[#2a2a2e] border border-white/15 rounded-xl shadow-2xl py-1.5 z-50">
            {languages.map((item) => (
              <button
                key={item.code}
                onClick={() => {
                  setLanguage(item.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer ${
                  language === item.code ? 'text-[#fed8c9] font-bold' : 'text-white/80'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-base">{item.flag}</span>
                  <span>{item.nativeName}</span>
                </div>
                {language === item.code && <Check className="w-3.5 h-3.5 text-[#fed8c9]" />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Header Default variant
  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 px-2.5 py-1 text-xs rounded-full bg-[#f0ede9] hover:bg-[#e7e3dc] text-[#1c1c19] border border-[#202022]/10 transition-all cursor-pointer shadow-2xs"
        title="Ngôn ngữ / Language (VI • EN • DE • ES • ZH)"
      >
        <Globe className="w-3.5 h-3.5 text-[#74584d]" />
        <span className="text-xs">{currentLangOption.flag}</span>
        <span className="font-bold text-[11px] uppercase tracking-wider">{currentLangOption.shortLabel}</span>
        <ChevronDown className={`w-3 h-3 text-[#77767b] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-[#fcf9f4] border border-[#202022]/15 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3.5 py-1 text-[9px] font-bold text-[#74584d] uppercase tracking-widest border-b border-[#202022]/8 mb-1">
            Chọn Ngôn Ngữ • Language
          </div>
          {languages.map((item) => (
            <button
              key={item.code}
              onClick={() => {
                setLanguage(item.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-[#f0ede9] transition-colors cursor-pointer ${
                language === item.code ? 'text-[#74584d] font-bold bg-[#f4ece3]' : 'text-[#202022]'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <span className="text-base">{item.flag}</span>
                <div>
                  <div className="font-medium">{item.nativeName}</div>
                  <div className="text-[10px] text-[#77767b] font-normal">{item.name}</div>
                </div>
              </div>
              {language === item.code && <Check className="w-4 h-4 text-[#74584d]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
