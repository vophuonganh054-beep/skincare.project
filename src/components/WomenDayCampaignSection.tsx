import { useCopy } from '../i18n/useCopy';
import React, { useState } from 'react';
import {
  Sparkles,
  Gift,
  Copy,
  Check,
  ShoppingBag,
  Zap,
  Heart,
  Tag,
  Clock,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { CAMPAIGN_2010_DATA, CampaignCombo, PromoVoucher } from '../data/campaign2010';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface WomenDayCampaignSectionProps {
  onAddComboToCart: (combo: CampaignCombo) => void;
  onBuyNowCombo: (combo: CampaignCombo) => void;
  onApplyVoucherToCart?: (code: string) => void;
  onShowToast: (message: string) => void;
  isMobileFrame?: boolean;
}

export const WomenDayCampaignSection: React.FC<WomenDayCampaignSectionProps> = ({
  onAddComboToCart,
  onBuyNowCombo,
  onApplyVoucherToCart,
  onShowToast,
  isMobileFrame = false,
}) => {
  const copy = useCopy();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopiedCode(code);
    onShowToast(`Đã chọn mã ${code}! Mã sẽ được áp dụng khi thanh toán.`);
    if (onApplyVoucherToCart) {
      onApplyVoucherToCart(code);
    }
    setTimeout(() => {
      setCopiedCode(null);
    }, 3000);
  };

  return (
    <section
      id="campaign-2010"
      className="py-14 sm:py-20 bg-gradient-to-b from-[#fcf9f4] via-[#f9f4ec] to-[#faf6f0] text-[#1c1c19] relative overflow-hidden border-t border-b border-[#e8ded1]/80"
    >
      {/* Decorative ambient glowing accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#fed8c9]/35 rounded-full blur-3xl pointer-events-none -mt-20" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#e9dfd0]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#fed8c9]/40 via-white to-[#fed8c9]/40 border border-[#e4c9bd] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-[#74584d] uppercase mb-4 shadow-2xs backdrop-blur-xs">
            <span className="text-rose-500 animate-pulse">{"🌸"}</span>
            <span>{copy(CAMPAIGN_2010_DATA.themeTitle)}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-[#1c1c19] leading-snug sm:leading-tight">
            {copy("Nâng Niu Nàng Thơ Với Làn Da Rạng Ngời Thuần Khiết")}</h2>

          <p className="mt-3.5 text-xs sm:text-sm md:text-base text-[#5f5d58] leading-relaxed font-light max-w-2xl mx-auto">
            {copy(CAMPAIGN_2010_DATA.subHeading)}
          </p>

          <div className="mt-4 inline-flex items-center space-x-2 text-xs font-medium text-[#74584d] bg-white/80 border border-[#e8dfd5] px-4 py-2 rounded-2xl shadow-2xs">
            <Gift className="w-4 h-4 text-[#8b5545] shrink-0" />
            <span>{copy(CAMPAIGN_2010_DATA.bannerNote)}</span>
          </div>
        </div>

        {/* 1. INTERACTIVE VOUCHER CENTER */}
        <div className="mb-14 sm:mb-20 bg-white/85 backdrop-blur-md rounded-3xl p-5 sm:p-8 lg:p-10 border border-[#e8dfd5] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-4 border-b border-[#f0ebe3] gap-2">
            <div>
              <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-[#74584d]">
                <Tag className="w-3.5 h-3.5" />
                <span>{copy("TRUNG TÂM MÃ ƯU ĐÃI 20/10")}</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1c1c19] mt-1">
                {copy("Lấy Mã Giảm Giá Đặc Quyền Phái Đẹp")}</h3>
            </div>
            <p className="text-xs text-[#77746f]">
              {copy("Nhấn ")}<strong className="text-[#1c1c19]">{copy("\"Sao Chép Mã\"")}</strong> {copy(" để tự động áp dụng vào giỏ hàng")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CAMPAIGN_2010_DATA.vouchers.map((voucher: PromoVoucher) => {
              const isCopied = copiedCode === voucher.code;
              return (
                <div
                  key={voucher.code}
                  className="relative p-4.5 rounded-2xl bg-gradient-to-br from-[#fcfbf9] to-[#f8f5ee] border border-dashed border-[#d8cbba] hover:border-[#74584d] transition-all hover:shadow-md flex flex-col justify-between group"
                >
                  <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#74584d] text-white shadow-xs">
                    {copy(voucher.badge)}
                  </div>

                  <div>
                    <div className="flex items-center space-x-1.5 text-xs font-semibold text-[#8b5545] mb-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{copy(voucher.title)}</span>
                    </div>

                    <div className="flex items-baseline space-x-1.5 my-1.5">
                      <span className="font-serif text-2xl font-bold text-[#1c1c19]">
                        {voucher.discountFixed ? `${voucher.discountFixed.toLocaleString('vi-VN')}₫` : `${voucher.discountPercent}% OFF`}</span>
                    </div>

                    <p className="text-[11px] text-[#5f5d58] leading-snug">
                      {copy(voucher.description)}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#ebe4d8] flex items-center justify-between">
                    <div className="font-mono text-xs font-bold text-[#1c1c19] bg-white px-2.5 py-1 rounded-lg border border-[#e0d6c7]">
                      {copy(voucher.code)}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyCode(voucher.code)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all flex items-center space-x-1 cursor-pointer ${
                        isCopied
                          ? 'bg-[#8a9a86] text-white'
                          : 'bg-[#1c1c19] hover:bg-[#74584d] text-white shadow-2xs active:scale-95'
                      }`}
                      title={copy(`Sao chép mã ${voucher.code}`)}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>{copy("Đã Lưu!")}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{copy("Lấy Mã")}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. THE 2 EXCLUSIVE 20/10 GIFT COMBOS */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#74584d] block mb-1">
              {copy("PHIÊN BẢN GIỚI HẠN • QUÀ TẶNG TRỌN VẸN")}</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1c1c19]">
              {copy("3 Combo Quà Tặng 20/10 Dành Cho Nàng")}</h3>
            <p className="text-xs sm:text-sm text-[#77746f] mt-2">
              {copy("Mỗi combo đều được tặng kèm Hộp quà độc quyền của ALPS sang trọng phù hợp dành tặng cho phái nữ & thiệp chúc mừng 20/10 viết tay miễn phí.")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6 lg:gap-8">
            {CAMPAIGN_2010_DATA.combos.map((combo: CampaignCombo) => (
              <div
                key={combo.id}
                id={combo.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#ebe5dc] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image and Badge */}
                <div>
                  <div className="relative aspect-4/3 overflow-hidden bg-[#f4f0eb]">
                    <img
                      src={combo.image}
                      alt={copy(combo.name)}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#74584d] shadow-xs border border-[#fed8c9]">
                      {copy(combo.badge)}
                    </div>

                    <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#ba1a1a] text-white shadow-xs">
                      {copy('Giảm 20%')}</div>

                    <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                      <span className="text-[10px] text-amber-200 font-medium block">
                        {copy("DÀNH TẶNG")}</span>
                      <p className="text-xs font-medium text-white/95 line-clamp-1">
                        {copy(combo.recommendedFor)}
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div>
                      <h4 className="font-serif text-lg sm:text-xl font-medium text-[#1c1c19] group-hover:text-[#74584d] transition-colors leading-snug">
                        {copy(combo.name)}
                      </h4>
                      <p className="text-xs text-[#74584d] font-medium mt-1">
                        {copy(combo.subTitle)}
                      </p>
                      <p className="text-xs text-[#5f5d58] mt-2 leading-relaxed font-light line-clamp-2">
                        {copy(combo.description)}
                      </p>
                    </div>

                    {/* Includes Checklist */}
                    <div className="bg-[#fcfbf9] rounded-2xl p-3.5 border border-[#eee8dd] space-y-2">
                      <span className="text-[11px] font-semibold text-[#1c1c19] block">
                        {copy("Sản phẩm trong Combo:")}</span>
                      <ul className="space-y-1.5">
                        {combo.includes.map((item, i) => (
                          <li key={i} className="flex items-start space-x-2 text-xs text-[#464542]">
                            <Check className="w-3.5 h-3.5 text-[#8a9a86] shrink-0 mt-0.5" />
                            <span className="leading-tight">{copy(item)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Free Gifts Highlights */}
                    <div className="bg-[#fcf6f3] rounded-2xl p-3.5 border border-[#fed8c9]/60 space-y-1.5">
                      <div className="flex items-center space-x-1.5 text-[11px] font-bold text-[#8b5545] uppercase">
                        <Gift className="w-3.5 h-3.5 text-rose-500" />
                        <span>{copy("Quà Tặng Kèm 20/10 (0₫):")}</span>
                      </div>
                      <ul className="space-y-1">
                        {combo.freeGifts.map((gift, i) => (
                          <li key={i} className="text-[11px] text-[#5a4841] flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                            <span>{copy(gift)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer Pricing & CTA Actions */}
                <div className="p-5 sm:p-6 pt-0 border-t border-[#f2ede6] mt-2">
                  <div className="flex items-baseline justify-between py-3">
                    <div>
                      <span className="text-[10px] text-[#77746f] block uppercase tracking-wider font-semibold">
                        {copy("Giá Gốc Combo")}</span>
                      <div className="flex items-baseline space-x-1">
                        <span className="font-serif text-2xl font-bold text-[#1c1c19]">
                          {combo.originalPrice.toLocaleString('vi-VN')}{"₫"}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#74584d] font-medium block">
                        {copy('Tự động giảm 20%')}</span>
                      <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                        {copy("Còn ")}{combo.salePrice.toLocaleString('vi-VN')}{"₫"}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#74584d] bg-[#fcf5f1] border border-[#fed8c9] rounded-xl px-2.5 py-1.5 text-center mb-2.5 font-medium flex items-center justify-center space-x-1">
                    <span>{"🌸"}</span>
                    <span>{copy("Giảm 20% toàn sàn • Đã trừ trực tiếp vào giá • Không cần mã")}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => onAddComboToCart(combo)}
                      className="py-2.5 sm:py-3 px-2 sm:px-3 bg-[#f6f2eb] hover:bg-[#ebdccf] text-[#1c1c19] rounded-full text-[11px] sm:text-xs font-semibold tracking-wider flex items-center justify-center space-x-1 sm:space-x-1.5 transition-all shadow-2xs active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#74584d] shrink-0" />
                      <span className="truncate">{copy("Thêm Giỏ Hàng")}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onBuyNowCombo(combo)}
                      className="py-2.5 sm:py-3 px-2 sm:px-3 bg-[#1c1c19] hover:bg-black text-white rounded-full text-[11px] sm:text-xs font-semibold tracking-wider flex items-center justify-center space-x-1 sm:space-x-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                      <span className="truncate">{copy("Mua Ngay")}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. COMPLIMENTARY 20/10 GIFT SERVICES */}
        <div className="bg-gradient-to-r from-[#202022] via-[#2a292d] to-[#1c1c19] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#fed8c9] block mb-1">
                {copy("DỊCH VỤ QUÀ TẶNG CAO CẤP • MIỄN PHÍ 100%")}</span>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
                {copy("Trao Gửi Yêu Thương Trọn Vẹn Ngày 20/10")}</h3>
              <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-xl mx-auto">
                {copy("Alps Skincare đồng hành cùng bạn để mang đến trải nghiệm mở quà tinh tế và xúc động nhất cho người nhận.")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              {CAMPAIGN_2010_DATA.giftServices.map((service, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#fed8c9]/20 text-[#fed8c9] flex items-center justify-center mb-3 mx-auto md:mx-0">
                      {idx === 0 && <Gift className="w-5 h-5" />}
                      {idx === 1 && <Heart className="w-5 h-5" />}
                      {idx === 2 && <Truck className="w-5 h-5" />}
                    </div>
                    <h4 className="font-serif text-sm font-semibold text-white mb-1.5">
                      {copy(service.title)}
                    </h4>
                    <p className="text-xs text-white/70 leading-relaxed font-light">
                      {copy(service.desc)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-white/80">
                {copy("Cần tư vấn chọn quà riêng cho mẹ, người yêu hoặc đặt số lượng lớn cho doanh nghiệp?")}</p>
              <a
                href="https://www.facebook.com/alpspuressence/"
                target="_blank"
                rel="noreferrer"
                className="mt-2.5 inline-flex items-center space-x-2 text-xs font-semibold text-[#fed8c9] hover:text-white underline underline-offset-4 cursor-pointer"
              >
                <span className="w-4 h-4 rounded-full bg-[#1877F2] text-white flex items-center justify-center shrink-0 inline-flex">
                  <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </span>
                <span>{copy("Chat trực tiếp chuyên viên tư vấn quà tặng 20/10 qua Fanpage Facebook")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
