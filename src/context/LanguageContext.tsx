import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, LANGUAGES, TRANSLATIONS, LanguageOption } from '../i18n/translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  languages: LanguageOption[];
  currentLangOption: LanguageOption;
  t: typeof TRANSLATIONS['vi'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem('alps_preferred_language') as SupportedLanguage;
      if (saved && ['vi', 'en', 'de', 'es', 'zh'].includes(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'vi';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('alps_preferred_language', lang);
    } catch {
      // ignore
    }
  };

  const currentLangOption = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  const t = TRANSLATIONS[language] || TRANSLATIONS.vi;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        languages: LANGUAGES,
        currentLangOption,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
