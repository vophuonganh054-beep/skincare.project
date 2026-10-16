import { PRODUCTS } from '../data/products';
import { Product } from '../types';

export interface ProductSlugInfo {
  id: string;
  canonicalSlug: string;
  aliases: string[];
}

export const PRODUCT_SLUG_MAP: Record<string, ProductSlugInfo> = {
  'cleanser-gentle-purifying': {
    id: 'cleanser-gentle-purifying',
    canonicalSlug: 'sua-rua-mat-gentle-purifying',
    aliases: ['cleanser-gentle-purifying', 'alps-gentle-purifying-cleanser', 'sua-rua-mat', 'cleanser'],
  },
  'toner-botanical': {
    id: 'toner-botanical',
    canonicalSlug: 'nuoc-can-bang-botanical',
    aliases: ['toner-botanical', 'alps-botanical-balancing-toner', 'nuoc-can-bang', 'toner'],
  },
  'serum-radiance': {
    id: 'serum-radiance',
    canonicalSlug: 'serum-radiance-glow',
    aliases: ['serum-radiance', 'alps-radiance-glow-serum', 'serum-duong-sang', 'serum', 'radiance-serum'],
  },
  'cream-regenerating': {
    id: 'cream-regenerating',
    canonicalSlug: 'kem-duong-regenerating',
    aliases: ['cream-regenerating', 'alps-regenerating-face-cream', 'kem-duong-da', 'kem-duong', 'face-cream'],
  },
  'mask-hydro-lifting': {
    id: 'mask-hydro-lifting',
    canonicalSlug: 'mat-na-hydro-lifting',
    aliases: ['mask-hydro-lifting', 'alps-hydro-lifting-sheet-mask', 'mat-na-sinh-hoc', 'mat-na', 'sheet-mask'],
  },
};

/**
 * Returns canonical slug for a product, e.g. "sua-rua-mat-gentle-purifying"
 */
export function getProductSlug(product: Product): string {
  const mapping = PRODUCT_SLUG_MAP[product.id];
  if (mapping) return mapping.canonicalSlug;
  // Fallback: slugify name
  return product.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Returns full path for a product, e.g. "/san-pham/sua-rua-mat-gentle-purifying"
 */
export function getProductPath(product: Product): string {
  return `/san-pham/${getProductSlug(product)}`;
}

/**
 * Finds product by slug (checks canonical slug, aliases, and id)
 */
export function findProductBySlug(slug: string): Product | undefined {
  if (!slug) return undefined;
  const cleanSlug = decodeURIComponent(slug).trim().toLowerCase();

  // 1. Direct ID match
  const byId = PRODUCTS.find((p) => p.id.toLowerCase() === cleanSlug);
  if (byId) return byId;

  // 2. Check slug mapping table
  for (const [productId, info] of Object.entries(PRODUCT_SLUG_MAP)) {
    if (
      info.canonicalSlug.toLowerCase() === cleanSlug ||
      info.aliases.some((a) => a.toLowerCase() === cleanSlug)
    ) {
      return PRODUCTS.find((p) => p.id === productId);
    }
  }

  // 3. Fallback: match by generated slug
  return PRODUCTS.find((p) => getProductSlug(p) === cleanSlug);
}
