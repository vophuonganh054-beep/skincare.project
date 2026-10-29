import { PRODUCT_CATALOG } from './productCatalog.ts';
import { CAMPAIGN_2010_DATA } from './campaignCatalog.ts';

export const CHAT_PRODUCT_IDS = [
  ...PRODUCT_CATALOG.map(product => product.id),
  ...CAMPAIGN_2010_DATA.combos.map(combo => combo.id),
];
const knownIds = new Set(CHAT_PRODUCT_IDS);

// Accept catalogue identifiers only. Names, prices, images and links always come
// from the storefront catalogue, never from model-generated fields or URLs.
export function sanitizeRecommendationIds(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((id): id is string => typeof id === 'string' && knownIds.has(id)))].slice(0, 5);
}
