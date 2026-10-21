import type { SupportedLanguage } from './translations';
import catalogue from './siteCopyData.json';
import templateCatalogue from './siteCopyTemplates.json';

const languages = ['en', 'de', 'es', 'zh'] as const;
const normalize = (text: string) => text.normalize('NFC').replace(/\s+/g, ' ').trim().toLocaleLowerCase('vi');
const entries = new Map(Object.entries(catalogue).map(([source, values]) => [normalize(source), values]));
const escapePattern = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const templates = Object.entries(templateCatalogue).map(([source, values]) => ({
  pattern: new RegExp('^' + source.split(/\{\d+\}/).map(escapePattern).join('(.+?)') + '$', 'iu'),
  values,
}));

/** React-rendered storefront copy only; never changes identifiers, prices or input values. */
export function translateCopy(text: string, language: SupportedLanguage): string {
  if (language === 'vi') return text;
  // Resource files contain example phone numbers; never translate actual contact data.
  if (/^[\d\s.,+()%₫đ–-]+$/u.test(text) || /^(?:https?:\/\/|mailto:|tel:)/i.test(text) || /^[^\s@]+@[^\s@]+$/.test(text)) return text;
  const index = languages.indexOf(language);
  if (index < 0) return text;
  const translated = entries.get(normalize(text))?.[index];
  if (translated) {
    return (text.match(/^\s*/)?.[0] || '') + translated + (text.match(/\s*$/)?.[0] || '');
  }
  const compact = text.normalize('NFC').replace(/\s+/g, ' ').trim();
  for (const { pattern, values } of templates) {
    const match = compact.match(pattern);
    if (match) return values[index].replace(/\{(\d+)\}/g, (_, position) => match[Number(position) + 1]);
  }
  // Editorial ribbons and labels compose independently translated phrases.
  if (text.includes(' • ')) return text.split(' • ').map(part => translateCopy(part, language)).join(' • ');
  return text;
}
