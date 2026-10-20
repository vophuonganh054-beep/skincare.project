import type { Product } from '../types';
import { PRODUCTS } from './products';
import { CAMPAIGN_2010_DATA, type CampaignCombo } from './campaign2010';

export const createComboProduct = (combo: CampaignCombo): Product => ({
    id: combo.id,
    name: combo.name,
    shortName: combo.name,
    capacity: 'Hộp Quà Cao Cấp 20/10',
    category: 'all',
    categoryLabel: 'Set Quà Tặng 20/10',
    tag: combo.badge,
    tagType: 'bestseller',
    subtitle: combo.subTitle,
    description: `${combo.description} (Quà tặng kèm: ${combo.freeGifts.join(' + ')})`,
    rating: 5.0,
    reviewCount: 48,
    soldCount: '250+ set',
    price: combo.salePrice,
    originalPrice: combo.originalPrice,
    image: combo.image,
    fallbackImage: combo.image,
    keyIngredients: [
      'Chiết xuất tuyết nhung Alps',
      'Tế bào gốc táo Thụy Sĩ',
      'Nước khoáng sông băng Matterhorn',
    ],
    benefits: combo.includes,
    usage: 'Sử dụng trọn vẹn quy trình theo các bước ghi trên từng sản phẩm trong set.',
    routineStepNumber: 1,
    routineStepTitle: 'Đại Nghi Thức Dưỡng Da 20/10',
    inStock: true,
    isFeatured: true,
  });

export function currentCartProduct(product: Product): Product {
  const combo = CAMPAIGN_2010_DATA.combos.find(c => c.id === product.id);
  return combo ? createComboProduct(combo) : PRODUCTS.find(p => p.id === product.id) || product;
}
