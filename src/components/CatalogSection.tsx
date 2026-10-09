import React, { useState } from 'react';
import { CATEGORIES as DEFAULT_CATEGORIES } from '../data/products';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { AlpsIcon } from './AlpsLogo';
import { useLanguage } from '../context/LanguageContext';

interface CatalogSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart?: (product: Product, e: React.MouseEvent) => void;
  onBuyNow?: (product: Product, e: React.MouseEvent) => void;
  searchQuery?: string;
  isMobileFrame?: boolean;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
  searchQuery = '',
  isMobileFrame = false,
}) => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const CATEGORIES = [
    { id: 'all', label: t.catalog.all },
    { id: 'cleanser', label: t.catalog.cleanser },
    { id: 'toner', label: t.catalog.toner },
    { id: 'serum', label: t.catalog.serum },
    { id: 'cream', label: t.catalog.cream },
    { id: 'mask', label: t.catalog.mask },
  ];

  const sortOptions = {
    vi: [
      { value: 'featured', label: 'Nổi bật nhất' },
      { value: 'price-asc', label: 'Giá: Thấp đến Cao' },
      { value: 'price-desc', label: 'Giá: Cao đến Thấp' },
      { value: 'rating', label: 'Bán chạy nhất' },
    ],
    en: [
      { value: 'featured', label: 'Featured' },
      { value: 'price-asc', label: 'Price: Low to High' },
      { value: 'price-desc', label: 'Price: High to Low' },
      { value: 'rating', label: 'Best Selling' },
    ],
    de: [
      { value: 'featured', label: 'Empfohlen' },
      { value: 'price-asc', label: 'Preis: Aufsteigend' },
      { value: 'price-desc', label: 'Preis: Absteigend' },
      { value: 'rating', label: 'Bestseller' },
    ],
    es: [
      { value: 'featured', label: 'Destacados' },
      { value: 'price-asc', label: 'Precio: Menor a Mayor' },
      { value: 'price-desc', label: 'Precio: Mayor a Menor' },
      { value: 'rating', label: 'Más Vendidos' },
    ],
    zh: [
      { value: 'featured', label: '精选推荐' },
      { value: 'price-asc', label: '价格：由低到高' },
      { value: 'price-desc', label: '价格：由高到低' },
      { value: 'rating', label: '热销榜单' },
    ],
  }[language] || [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Best Selling' },
  ];

  const sortLabel = {
    vi: 'Sắp xếp:',
    en: 'Sort by:',
    de: 'Sortieren:',
    es: 'Ordenar:',
    zh: '排序：',
  }[language] || 'Sort by:';

  // Filter products by category and search query
  let filteredProducts = products.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <section className={`w-full ${isMobileFrame ? 'px-3 pt-5' : 'max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12'}`}>
      {/* Title & Count & Sort */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3 sm:mb-4">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-[#1c1c19] tracking-tight">
            {t.catalog.title}
          </h2>
          <p className="inline-flex items-center space-x-1.5 text-[11px] sm:text-xs text-[#77767b] font-light mt-0.5">
            <AlpsIcon className="w-3 h-3 text-[#74584d]" color="#74584d" />
            <span>{t.catalog.subtitle}</span>
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="text-[11px] font-semibold tracking-wider text-[#77767b] uppercase whitespace-nowrap">
            {language === 'vi'
              ? `${filteredProducts.length} SẢN PHẨM`
              : language === 'de'
              ? `${filteredProducts.length} PRODUKTE`
              : language === 'es'
              ? `${filteredProducts.length} PRODUCTOS`
              : language === 'zh'
              ? `${filteredProducts.length} 件产品`
              : `${filteredProducts.length} PRODUCTS`}
          </span>
          <span className="text-[#c7c6ca]">|</span>
          <div className="flex items-center space-x-1 text-[11px] text-[#46464a]">
            <span className="text-[#77767b] hidden sm:inline">{sortLabel}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label={sortLabel}
              className="bg-transparent border border-[#202022]/10 rounded-lg px-2 py-1 text-xs text-[#1c1c19] focus:outline-none cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills (horizontally scrollable on mobile as in screenshot) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1 mb-4 sm:mb-6">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs tracking-wider font-medium whitespace-nowrap transition-all shadow-xs ${
                isActive
                  ? 'bg-[#08080a] text-white shadow-xs'
                  : 'bg-[#f0ede9] text-[#46464a] hover:text-[#1c1c19] hover:bg-[#ebe8e3]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Products Grid: 2 columns on mobile (exactly like Image 1), 4 columns on large screen */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-[#202022]/6">
          <p className="font-serif text-base text-[#1c1c19]">
            {language === 'vi'
              ? 'Không tìm thấy sản phẩm phù hợp'
              : language === 'de'
              ? 'Keine passenden Produkte gefunden'
              : language === 'es'
              ? 'No se encontraron productos coincidentes'
              : language === 'zh'
              ? '未找到匹配的产品'
              : 'No matching products found'}
          </p>
          <p className="text-xs text-[#77767b] mt-1">
            {language === 'vi'
              ? 'Vui lòng thử tìm kiếm bằng từ khóa khác hoặc chọn danh mục khác.'
              : language === 'de'
              ? 'Bitte versuchen Sie eine andere Suche oder wählen Sie eine andere Kategorie.'
              : language === 'es'
              ? 'Intente buscar con otras palabras clave o elija otra categoría.'
              : language === 'zh'
              ? '请尝试其他搜索关键词或选择不同的分类。'
              : 'Please try searching with different keywords or select another category.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      )}
    </section>
  );
};
