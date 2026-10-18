import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Link, useRouter } from '../context/RouterContext';
import { getProductPath } from '../utils/slugUtils';
import { SafeImage } from '../components/SafeImage';
import {
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Search,
  Filter,
  ArrowRight,
  Eye,
} from 'lucide-react';

interface ProductsPageProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number, event?: React.MouseEvent) => void;
  onBuyNow: (product: Product, quantity?: number, event?: React.MouseEvent) => void;
  onOpenRitualModal: () => void;
  onOpenSkinQuiz: () => void;
  onShowToast: (msg: string) => void;
}

type CategoryFilter = 'all' | 'cleanser' | 'toner' | 'serum' | 'cream' | 'mask';
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'bestseller';

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onSelectProduct,
  onAddToCart,
  onBuyNow,
  onOpenRitualModal,
  onOpenSkinQuiz,
  onShowToast,
}) => {
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [localSearch, setLocalSearch] = useState('');

  const categories: { id: CategoryFilter; label: string; count: number }[] = [
    { id: 'all', label: 'Tất cả sản phẩm', count: PRODUCTS.length },
    { id: 'cleanser', label: 'Sữa rửa mặt', count: PRODUCTS.filter((p) => p.category === 'cleanser').length },
    { id: 'toner', label: 'Nước cân bằng', count: PRODUCTS.filter((p) => p.category === 'toner').length },
    { id: 'serum', label: 'Serum dưỡng sáng', count: PRODUCTS.filter((p) => p.category === 'serum').length },
    { id: 'cream', label: 'Kem dưỡng ẩm', count: PRODUCTS.filter((p) => p.category === 'cream').length },
    { id: 'mask', label: 'Mặt nạ sinh học', count: PRODUCTS.filter((p) => p.category === 'mask').length },
  ];

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (localSearch.trim()) {
      const q = localSearch.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'bestseller':
        list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
      default:
        list.sort((a, b) => (a.routineStepNumber || 99) - (b.routineStepNumber || 99));
        break;
    }

    return list;
  }, [selectedCategory, localSearch, sortBy]);

  return (
    <div className="min-h-screen bg-[#fcf9f4] pb-24">
      {/* Breadcrumb Header */}
      <div className="bg-[#f4ede4]/70 border-b border-[#202022]/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center space-x-2 text-xs text-[#74584d]">
            <Link to="/" className="hover:text-[#1c1c19] transition-colors">
              Trang chủ
            </Link>
            <span className="text-[#a8a6ad]">/</span>
            <span className="text-[#1c1c19] font-semibold">Sản phẩm</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#f4ede4] border border-[#fed8c9] text-[#74584d] text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ALPS SWISS ESSENCE COLLECTION</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif text-[#1c1c19] tracking-tight">
            Bộ Sưu Tập Dược Mỹ Phẩm Tế Bào Gốc Sông Băng
          </h1>
          <p className="text-xs sm:text-sm text-[#5a595e] font-light leading-relaxed">
            Tuyển chọn 5 tuyệt tác sinh học phân tử chứa chiết xuất hoa nhung tuyết Edelweiss và nước khoáng sông băng Thụy Sĩ.
            Được bào chế chuẩn y khoa, thuần chay 100%, bảo vệ trọn vẹn rào cản biểu bì làn da Châu Á.
          </p>
        </div>

        {/* Filter Pills and Search/Sort Bar */}
        <div className="mt-8 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 py-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#202022] text-[#fcf9f4] shadow-sm'
                    : 'bg-[#ffffff] text-[#5a595e] border border-[#202022]/10 hover:border-[#74584d] hover:text-[#1c1c19]'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>

          {/* Search + Sort Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#77767b]" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Tìm kiếm theo tên sản phẩm, thành phần..."
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-xl border border-[#202022]/15 focus:outline-none focus:border-[#74584d] transition-colors"
              />
              {localSearch && (
                <button
                  onClick={() => setLocalSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#77767b] hover:text-[#1c1c19]"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <span className="text-xs sm:text-sm text-[#77767b] shrink-0 font-medium">Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sắp xếp sản phẩm"
                className="text-xs sm:text-sm bg-white border border-[#202022]/15 rounded-xl px-3.5 py-2 text-[#1c1c19] focus:outline-none focus:border-[#74584d] cursor-pointer"
              >
                <option value="default">Theo thứ tự chu trình 5 bước</option>
                <option value="bestseller">Sản phẩm nổi bật / Bán chạy</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#202022]/5 p-8 max-w-md mx-auto">
            <p className="text-sm text-[#5a595e]">Không tìm thấy sản phẩm nào khớp với tìm kiếm của bạn.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setLocalSearch('');
              }}
              className="mt-4 px-4 py-2 bg-[#202022] text-white text-xs font-semibold rounded-lg hover:bg-[#74584d] transition-colors cursor-pointer"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const productUrl = getProductPath(product);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-[#202022]/6 overflow-hidden flex flex-col hover:shadow-xl hover:border-[#fed8c9] transition-all duration-300 group"
                >
                  {/* Image Container with clickable link */}
                  <Link
                    to={productUrl}
                    className="product-image-frame relative block aspect-square bg-[#f9f6f0] overflow-hidden cursor-pointer"
                  >
                    <SafeImage
                      src={product.image}
                      fallbackSrc={product.fallbackImage}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Step Badge */}
                    <div className="absolute top-3 left-3 bg-[#202022]/85 backdrop-blur-md text-[#fed8c9] text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full flex items-center space-x-1">
                      <span>Bước {product.routineStepNumber || 1}</span>
                      <span className="text-white/60">•</span>
                      <span className="text-white">{product.categoryLabel}</span>
                    </div>

                    {/* Tag badge */}
                    {product.tag && (
                      <div className="absolute top-3 right-3 bg-[#e85338] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                        {product.tag}
                      </div>
                    )}

                    {/* Quick view overlay button */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="bg-white/95 text-[#1c1c19] text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center space-x-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="w-3.5 h-3.5 text-[#74584d]" />
                        <span>Xem chi tiết</span>
                      </span>
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Brand tag & Sold count */}
                      <div className="flex items-center justify-between text-xs text-[#77767b] mb-2">
                        <span className="text-[11px] uppercase tracking-wider text-[#74584d] font-bold bg-[#f7f2ee] px-2.5 py-0.5 rounded-full border border-[#74584d]/15">
                          ALPS • Pure Essence
                        </span>
                        <span className="font-medium">Đã bán {product.soldCount}</span>
                      </div>

                      {/* Product Name with Link */}
                      <Link
                        to={productUrl}
                        className="block font-serif text-base sm:text-lg font-semibold text-[#1c1c19] tracking-tight group-hover:text-[#74584d] transition-colors text-pretty leading-snug"
                      >
                        {product.name}
                      </Link>

                      <p className="text-xs text-[#74584d] font-semibold mt-1">{product.capacity}</p>

                      <p className="text-xs sm:text-sm text-[#5a595e] font-normal line-clamp-2 mt-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Key ingredient bullet */}
                      {product.keyIngredients && product.keyIngredients[0] && (
                        <div className="mt-2.5 text-xs text-[#77767b] flex items-start space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#74584d] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{product.keyIngredients[0]}</span>
                        </div>
                      )}
                    </div>

                    {/* Price and Action Buttons */}
                    <div className="pt-3 border-t border-[#202022]/5">
                      <div className="flex items-baseline justify-between gap-2 mb-3">
                        <div>
                          <span className="font-serif text-base sm:text-lg font-bold text-[#1c1c19] tabular-nums">
                            {(product.promoPrice ?? product.price).toLocaleString('vi-VN')}₫
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs sm:text-sm text-[#77767b] line-through ml-2 tabular-nums">
                              {product.originalPrice.toLocaleString('vi-VN')}₫
                            </span>
                          )}
                    {product.promoCode && <span className="block w-full text-[10px] text-[#74584d] font-medium mt-1">Sau mã {product.promoCode}</span>}
                        </div>
                        {product.originalPrice && (
                          <span className="text-xs font-bold text-[#e85338] bg-[#feeceb] px-2.5 py-0.5 rounded-full">
                            -{Math.round(((product.originalPrice - (product.promoPrice ?? product.price)) / product.originalPrice) * 100)}%
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          onClick={(e) => onAddToCart(product, 1, e)}
                          className="w-full py-3 px-2 bg-[#f4ede4] hover:bg-[#ebdccf] text-[#74584d] text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>Thêm vào giỏ</span>
                        </button>
                        <button
                          onClick={(e) => onBuyNow(product, 1, e)}
                          className="w-full py-3 px-2 bg-[#202022] hover:bg-[#74584d] text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                        >
                          <span>Mua ngay</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Routine Banner Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <div className="bg-gradient-to-r from-[#202022] to-[#3a3532] text-[#fcf9f4] rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs text-[#fed8c9] font-semibold tracking-widest uppercase">
              ✦ CHU TRÌNH ĐỒNG BỘ 5 BƯỚC ALPS
            </span>
            <h3 className="text-xl sm:text-2xl font-serif">
              Tối Đa Hóa Hiệu Quả Với Trọn Bộ Nghi Thức Sông Băng
            </h3>
            <p className="text-xs sm:text-sm text-[#c7c6ca] font-light leading-relaxed">
              Các hoạt chất sinh học được thiết kế tương thích hoàn hảo theo thứ tự: Sữa rửa mặt → Toner → Serum → Kem dưỡng → Mặt nạ. Giúp da ngậm nước 72h và tái sinh màng lipid tự nhiên.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onOpenRitualModal}
              className="px-5 py-3 rounded-full bg-[#fed8c9] text-[#1c1c19] text-xs font-semibold hover:bg-white transition-colors cursor-pointer shadow-md whitespace-nowrap"
            >
              Xem Chi Tiết 5 Bước
            </button>
            <button
              onClick={onOpenSkinQuiz}
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 transition-colors cursor-pointer whitespace-nowrap"
            >
              Trắc Nghiệm Soi Da AI
            </button>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-[#202022]/8">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-7 h-7 text-[#74584d] shrink-0" />
            <div>
              <p className="text-xs font-semibold text-[#1c1c19]">100% Chính Hãng Thụy Sĩ</p>
              <p className="text-[11px] text-[#77767b]">Tế bào gốc tuyết & nước sông băng</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Truck className="w-7 h-7 text-[#74584d] shrink-0" />
            <div>
              <p className="text-xs font-semibold text-[#1c1c19]">Miễn Phí Vận Chuyển</p>
              <p className="text-[11px] text-[#77767b]">Giao nhanh toàn quốc từ 500k</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <RotateCcw className="w-7 h-7 text-[#74584d] shrink-0" />
            <div>
              <p className="text-xs font-semibold text-[#1c1c19]">Đổi Trả 7 Ngày</p>
              <p className="text-[11px] text-[#77767b]">Hoàn tiền nếu có dấu hiệu kích ứng</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-7 h-7 text-[#74584d] shrink-0" />
            <div>
              <p className="text-xs font-semibold text-[#1c1c19]">Đồng Kiểm Khi Nhận</p>
              <p className="text-[11px] text-[#77767b]">Mở hộp kiểm tra trước khi thanh toán</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
