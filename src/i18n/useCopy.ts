import { useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translateCopy } from './siteCopy';

// Render through React so language switches never replace DOM nodes or disturb forms.
export function useCopy() {
  const { language } = useLanguage();
  return useCallback(<T,>(value: T): T =>
    typeof value === 'string' ? translateCopy(value, language) as T : value,
  [language]);
}
