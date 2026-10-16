import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { Product, UserProfile } from '../types';
import { useRouter, Link } from '../context/RouterContext';
import { findProductBySlug, getProductPath } from '../utils/slugUtils';
import { SafeImage } from '../components/SafeImage';
import { ProductReviewsSection } from '../components/ProductReviewsSection';
import {
  Sparkles,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Clock,
  ArrowRight,
  Heart,
  Share2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Droplets,
  Layers,
  Leaf,
  Info,
} from 'lucide-react';

interface ProductDetailPageProps {
  onAddToCart: (product: Product, quantity?: number, event?: React.MouseEvent) => void;
  onBuyNow: (product: Product, quantity?: number, event?: React.MouseEvent) => void;
  onOpenRitualModal: () => void;
  onOpenSkinQuiz: () => void;
  onShowToast: (msg: string) => void;
  user?: UserProfile | null;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  onAddToCart,
  onBuyNow,
  onOpenRitualModal,
  onOpenSkinQuiz,
  onShowToast,
  user,
}) => {
  const { params, navigate } = useRouter();
  const slug = params.slug || '';
  const product = findProductBySlug(slug);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'usage' | 'reviews'>('benefits');
  const [isCopied, setIsCopied] = useState(false);

  // Reset quantity when slug changes
  useEffect(() => {
    setQuantity(1);
    setActiveTab('benefits');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-[#fcf9f4]">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#202022]/10 max-w-md w-full text-center shadow-lg space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#fed8c9]/40 flex items-center justify-center text-[#74584d]">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-xl sm:text-2xl font-serif text-[#1c1c19]">Không Tìm Thấy Sản Phẩm</h1>
          <p className="text-xs text-[#77767b] leading-relaxed">
            Đường dẫn sản phẩm &quot;{slug}&quot; không tồn tại hoặc đã được chuyển sang danh mục khác.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              to="/san-pham"
              className="px-5 py-2.5 bg-[#202022] text-white text-xs font-semibold rounded-xl hover:bg-[#74584d] transition-colors"
            >
              Xem tất cả sản phẩm
            </Link>
            <Link
              to="/"
              className="px-5 py-2.5 bg-[#f4ede4] text-[#74584d] text-xs font-semibold rounded-xl hover:bg-[#ebdccf] transition-colors"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setIsCopied(true);
      onShowToast('Đã sao chép liên kết sản phẩm vào bộ nhớ tạm!');
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Other products for recommendations
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fcf9f4] pb-24">
      {/* Breadcrumb Bar */}
      <div className="bg-[#f4ede4]/70 border-b border-[#202022]/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center space-x-2 text-xs text-[#74584d] overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-[#1c1c19] transition-colors shrink-0">
              Trang chủ
            </Link>
            <span className="text-[#a8a6ad] shrink-0">/</span>
            <Link to="/san-pham" className="hover:text-[#1c1c19] transition-colors shrink-0">
              Sản phẩm
            </Link>
            <span className="text-[#a8a6ad] shrink-0">/</span>
            <span className="text-[#1c1c19] font-semibold truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Product Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square bg-[#f9f6f0] rounded-3xl overflow-hidden border border-[#202022]/8 shadow-sm group">
              <SafeImage
                src={product.image}
                fallbackSrc={product.fallbackImage}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-[#202022]/90 backdrop-blur-md text-[#fed8c9] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center space-x-1">
                  <span>Bước {product.routineStepNumber || 1}</span>
                  <span className="text-white/60">•</span>
                  <span className="text-white">{product.categoryLabel}</span>
                </span>
                {product.isFeatured && (
                  <span className="bg-[#ba1a1a] text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-sm w-fit">
                    BEST SELLER
                  </span>
                )}
              </div>

              {discountPercent > 0 && (
                <div className="absolute top-4 right-4 bg-[#e85338] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Tiết kiệm -{discountPercent}%
                </div>
              )}

              {/* Brand watermark */}
              <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-mono tracking-widest text-[#74584d]">
                ALPS SWISS FORMULA
              </div>
            </div>

            {/* Micro Gallery / Trust Badges under image */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-white rounded-2xl border border-[#202022]/6 text-center">
                <Leaf className="w-4 h-4 mx-auto text-[#74584d] mb-1" />
                <p className="text-[11px] font-semibold text-[#1c1c19]">100% Thuần Chay</p>
                <p className="text-[10px] text-[#77767b]">Không paraben, cồn khô</p>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-[#202022]/6 text-center">
                <Droplets className="w-4 h-4 mx-auto text-[#74584d] mb-1" />
                <p className="text-[11px] font-semibold text-[#1c1c19]">Khoáng Sông Băng</p>
                <p className="text-[10px] text-[#77767b]">Cấp ẩm & dịu da tức thì</p>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-[#202022]/6 text-center">
                <ShieldCheck className="w-4 h-4 mx-auto text-[#74584d] mb-1" />
                <p className="text-[11px] font-semibold text-[#1c1c19]">Chuẩn Y Khoa</p>
                <p className="text-[10px] text-[#77767b]">Kiểm nghiệm viện Zurich</p>
              </div>
            </div>
          </div>

          {/* Right Column: Information, Pricing, Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Routine Tag & Capacity */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center space-x-1.5 text-xs text-[#74584d] font-semibold uppercase tracking-wider bg-[#f4ede4] px-3 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-[#74584d]" />
                  <span>{product.routineStepTitle || product.categoryLabel}</span>
                </div>
                <button
                  onClick={handleShare}
                  className="text-xs text-[#77767b] hover:text-[#1c1c19] flex items-center space-x-1 px-2.5 py-1 rounded-lg border border-[#202022]/10 hover:border-[#74584d] transition-colors cursor-pointer"
                  title="Chia sẻ sản phẩm"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{isCopied ? 'Đã chép link' : 'Chia sẻ'}</span>
                </button>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif text-[#1c1c19] tracking-tight leading-snug">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#74584d] font-medium mt-1">
                  {product.subtitle}
                </p>
                <p className="text-xs text-[#77767b] mt-0.5">Dung tích: <span className="font-semibold text-[#1c1c19]">{product.capacity}</span></p>
              </div>

              {/* Rating and Social Proof */}
              <div className="flex items-center space-x-3 text-xs text-[#77767b] pb-2 border-b border-[#202022]/6">
                <div className="flex items-center text-amber-500 space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="font-bold text-[#1c1c19] ml-1.5">{product.rating}</span>
                </div>
                <span>•</span>
                <span className="font-medium text-[#1c1c19]">Đã bán {product.soldCount}</span>
                <span>•</span>
                <span className="text-[#0d8459] font-medium flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Còn hàng tại kho TP.HCM</span>
                </span>
              </div>

              {/* Price Box */}
              <div className="bg-[#fcf5f1] border border-[#fed8c9] rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline space-x-3">
                    <span className="text-2xl sm:text-3xl font-bold text-[#1c1c19]">
                      {product.price.toLocaleString('vi-VN')}₫
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-[#a8a6ad] line-through">
                        {product.originalPrice.toLocaleString('vi-VN')}₫
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#74584d] mt-1">
                    Đã bao gồm thuế GTGT & Miễn phí vận chuyển cho đơn hàng này
                  </p>
                </div>
                {discountPercent > 0 && (
                  <div className="text-right">
                    <span className="bg-[#e85338] text-white text-xs font-bold px-3 py-1 rounded-full">
                      -{discountPercent}% GIẢM
                    </span>
                  </div>
                )}
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-[#5a595e] font-light leading-relaxed">
                {product.description}
              </p>

              {/* Quantity Selector & Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-4">
                  <span className="text-xs font-medium text-[#1c1c19]">Số lượng:</span>
                  <div className="flex items-center border border-[#202022]/15 rounded-xl bg-white overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3.5 py-1.5 text-sm hover:bg-[#f4ede4] transition-colors cursor-pointer text-[#1c1c19]"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-bold min-w-[36px] text-center text-[#1c1c19]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      className="px-3.5 py-1.5 text-sm hover:bg-[#f4ede4] transition-colors cursor-pointer text-[#1c1c19]"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[11px] text-[#77767b]">
                    Tạm tính: <strong>{(product.price * quantity).toLocaleString('vi-VN')}₫</strong>
                  </span>
                </div>

                {/* Primary CTA Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={(e) => onAddToCart(product, quantity, e)}
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#f4ede4] hover:bg-[#ebdccf] text-[#74584d] font-semibold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-sm active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>THÊM VÀO GIỎ HÀNG</span>
                  </button>

                  <button
                    onClick={(e) => onBuyNow(product, quantity, e)}
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#202022] hover:bg-[#74584d] text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md active:scale-98"
                  >
                    <span>MUA NGAY - GIAO HỎA TỐC</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="bg-white rounded-2xl border border-[#202022]/8 p-4 space-y-2.5 text-xs text-[#5a595e]">
                <div className="flex items-center space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#74584d] shrink-0" />
                  <span>Cam kết 100% chính hãng Thụy Sĩ, đền gấp 10 nếu phát hiện hàng giả</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Truck className="w-4 h-4 text-[#74584d] shrink-0" />
                  <span>Giao hàng hỏa tốc toàn quốc • Đồng kiểm khi nhận hàng</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <RotateCcw className="w-4 h-4 text-[#74584d] shrink-0" />
                  <span>Đổi trả miễn phí 7 ngày nếu sản phẩm gây kích ứng da</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Tabs: Benefits, Ingredients, Usage, Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-14">
        {/* Tab Headers */}
        <div className="border-b border-[#202022]/10 flex items-center justify-start overflow-x-auto no-scrollbar gap-4 sm:gap-8 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('benefits')}
            className={`pb-3.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'benefits'
                ? 'border-[#74584d] text-[#1c1c19]'
                : 'border-transparent text-[#77767b] hover:text-[#1c1c19]'
            }`}
          >
            Công Dụng Vượt Trội
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`pb-3.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'ingredients'
                ? 'border-[#74584d] text-[#1c1c19]'
                : 'border-transparent text-[#77767b] hover:text-[#1c1c19]'
            }`}
          >
            Thành Phần Sinh Học
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`pb-3.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'usage'
                ? 'border-[#74584d] text-[#1c1c19]'
                : 'border-transparent text-[#77767b] hover:text-[#1c1c19]'
            }`}
          >
            Phác Đồ Sử Dụng Chuẩn Y Khoa
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-[#74584d] text-[#1c1c19]'
                : 'border-transparent text-[#77767b] hover:text-[#1c1c19]'
            }`}
          >
            Đánh Giá Khách Hàng
          </button>
        </div>

        {/* Tab Contents */}
        <div className="pt-8">
          {activeTab === 'benefits' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#202022]/6 space-y-6">
              <h3 className="text-lg font-serif text-[#1c1c19]">Hiệu Quả Lâm Sàng Trên Làn Da</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.benefits?.map((benefit, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-4 rounded-2xl bg-[#fcf9f4] border border-[#202022]/5">
                    <CheckCircle2 className="w-5 h-5 text-[#74584d] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm text-[#1c1c19] font-medium leading-relaxed">{benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#202022]/6 space-y-6">
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#74584d] uppercase tracking-wider">
                <Leaf className="w-4 h-4" />
                <span>Thành Phần Cốt Lõi Tinh Khiết</span>
              </div>
              <h3 className="text-lg font-serif text-[#1c1c19]">Công Thức Hoạt Tính Sinh Học Không Cồn, Không Paraben</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.keyIngredients?.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#fcf9f4] border border-[#202022]/5 flex items-start space-x-3">
                    <Sparkles className="w-4 h-4 text-[#74584d] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#1c1c19] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#202022]/6 space-y-6">
              {product.detailedUsage ? (
                <div className="space-y-6">
                  {/* Meta box */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#fcf5f1] border border-[#fed8c9]">
                    <div>
                      <p className="text-[11px] font-semibold text-[#74584d]">Thời điểm sử dụng</p>
                      <p className="text-xs text-[#1c1c19] mt-0.5">{product.detailedUsage.timing}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#74584d]">Liều lượng khuyến nghị</p>
                      <p className="text-xs text-[#1c1c19] mt-0.5">{product.detailedUsage.amount}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#74584d]">Phù hợp cho làn da</p>
                      <p className="text-xs text-[#1c1c19] mt-0.5">{product.detailedUsage.suitableFor}</p>
                    </div>
                  </div>

                  {/* Step by step */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-[#1c1c19] uppercase tracking-wider">Các bước thực hiện chuẩn Thụy Sĩ:</h4>
                    <div className="space-y-3">
                      {product.detailedUsage.steps.map((st) => (
                        <div key={st.step} className="p-4 rounded-2xl bg-[#fcf9f4] border border-[#202022]/5 flex items-start space-x-3.5">
                          <span className="w-6 h-6 rounded-full bg-[#202022] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {st.step}
                          </span>
                          <div>
                            <p className="text-xs sm:text-sm font-semibold text-[#1c1c19]">{st.title}</p>
                            <p className="text-xs text-[#5a595e] leading-relaxed mt-1">{st.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tips */}
                  {product.detailedUsage.expertTip && (
                    <div className="p-4 rounded-2xl bg-[#f4ede4] border border-[#74584d]/20 text-xs text-[#74584d] space-y-1">
                      <p className="font-semibold flex items-center space-x-1.5">
                        <Info className="w-4 h-4" />
                        <span>Lời khuyên từ Viện Trưởng Da Liễu Zurich:</span>
                      </p>
                      <p className="leading-relaxed text-[#1c1c19] font-light">{product.detailedUsage.expertTip}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-[#5a595e] leading-relaxed">{product.usage}</p>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#202022]/6">
              <ProductReviewsSection product={product} user={user || null} onShowToast={onShowToast} />
            </div>
          )}
        </div>
      </section>

      {/* Related Products Recommendation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[11px] font-semibold text-[#74584d] uppercase tracking-wider">
              ✦ GỢI Ý CÙNG CHU TRÌNH
            </span>
            <h3 className="text-xl font-serif text-[#1c1c19] mt-0.5">Sản Phẩm Bổ Trợ Hoàn Hảo</h3>
          </div>
          <Link
            to="/san-pham"
            className="text-xs font-semibold text-[#74584d] hover:text-[#1c1c19] flex items-center space-x-1 transition-colors"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map((rel) => (
            <Link
              key={rel.id}
              to={getProductPath(rel)}
              className="bg-white rounded-2xl border border-[#202022]/6 overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-[4/3] bg-[#f9f6f0] overflow-hidden relative">
                <SafeImage
                  src={rel.image}
                  fallbackSrc={rel.fallbackImage}
                  alt={rel.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 bg-[#202022]/85 text-[#fed8c9] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  Bước {rel.routineStepNumber || 1}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-sm text-[#1c1c19] group-hover:text-[#74584d] transition-colors line-clamp-1">
                    {rel.name}
                  </h4>
                  <p className="text-[11px] text-[#74584d]">{rel.capacity}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#202022]/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1c1c19]">
                    {rel.price.toLocaleString('vi-VN')}₫
                  </span>
                  <span className="text-[11px] text-[#74584d] group-hover:underline">Xem ngay →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
