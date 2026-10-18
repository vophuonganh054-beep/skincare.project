import React from 'react';
import { Link } from '../context/RouterContext';
import { ArrowRight, Sparkles, Mountain, Leaf, Droplets, ShieldCheck, Heart } from 'lucide-react';
import { AlpsLogo } from './AlpsLogo';
import originStreamImg from '../assets/images/alps_origin_stream_1790660755043.jpg';
import edelweissImg from '../assets/images/alps_edelweiss_bloom_1790660771955.jpg';

interface HomeBrandStorySectionProps {
  isMobileFrame?: boolean;
}

export const HomeBrandStorySection: React.FC<HomeBrandStorySectionProps> = ({ isMobileFrame = false }) => {
  const pillars = [
    { letter: 'A', word: 'Authentic', desc: 'Chân thật & Tự nhiên' },
    { letter: 'L', word: 'Luminous', desc: 'Rạng rỡ sương mai' },
    { letter: 'P', word: 'Pure', desc: 'Tinh khiết lành tính' },
    { letter: 'S', word: 'Skin', desc: 'Nuôi dưỡng màng ẩm' },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#faf8f5] text-[#1c1c19] border-t border-[#ebe6df] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Imagery with quiet luxury frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-[#202022] shadow-xl border border-[#202022]/10 group">
              <img
                src={originStreamImg}
                alt="Alps Pure Essence Brand Heritage"
                className="w-full h-full object-cover opacity-90 group-hover:scale-103 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5 sm:p-7">
                <div className="text-white space-y-1">
                  <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#fed8c9] uppercase block">
                    ✦ ZURICH SWITZERLAND
                  </span>
                  <p className="font-serif text-base sm:text-lg text-[#fcf9f4]">
                    Nguồn cội sông băng ngàn năm & Hoa tuyết Edelweiss
                  </p>
                </div>
              </div>
            </div>

            {/* Overlapping small accent badge */}
            <div className="hidden sm:flex absolute -bottom-5 -right-5 bg-white p-3.5 rounded-2xl border border-[#202022]/10 shadow-lg items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#f4ede4] flex items-center justify-center text-[#74584d]">
                <Mountain className="w-5 h-5" />
              </div>
              <div className="text-left pr-2">
                <p className="text-[10px] uppercase tracking-wider text-[#77767b] font-semibold">Khởi sinh</p>
                <p className="text-xs font-bold text-[#1c1c19]">Độ cao 3.000m</p>
              </div>
            </div>
          </div>

          {/* Right: Concise, punchy editorial story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-[#202022]/10 text-[#74584d] text-[11px] font-semibold tracking-widest uppercase shadow-2xs">
                <Sparkles className="w-3 h-3 text-[#74584d]" />
                <span>CÂU CHUYỆN THƯƠNG HIỆU</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif text-[#1c1c19] tracking-tight leading-snug">
                Khi Vẻ Đẹp Bắt Đầu Từ Sự Tinh Khiết
              </h2>

              <p className="text-xs sm:text-sm text-[#5a595e] font-light leading-relaxed">
                Lấy cảm hứng từ sự tĩnh lặng và kiên cường của đỉnh núi Alps Thụy Sĩ. Chúng tôi tin rằng chăm sóc da không phải cuộc chạy đua tiêu chuẩn ồn ào — mà là khoảng thời gian để bạn lắng nghe và nuôi dưỡng cơ thể bằng những hoạt chất sinh học thuần khiết nhất.
              </p>
            </div>

            {/* 4 Pillars of ALPS (A-L-P-S) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {pillars.map((item) => (
                <div
                  key={item.letter}
                  className="p-3 bg-white rounded-2xl border border-[#202022]/8 text-center space-y-1 hover:border-[#74584d] transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-[#f4ede4] text-[#74584d] text-xs font-serif font-bold inline-flex items-center justify-center">
                    {item.letter}
                  </span>
                  <p className="text-xs font-semibold text-[#1c1c19]">{item.word}</p>
                  <p className="text-[10px] text-[#77767b] leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Call to action to read the full story on /ve-alps */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link
                to="/ve-alps"
                className="w-full sm:w-auto px-6 py-3 bg-[#202022] hover:bg-[#74584d] text-white text-xs font-semibold rounded-full flex items-center justify-center space-x-2 transition-all shadow-md active:scale-98 group cursor-pointer"
              >
                <span>XEM TOÀN BỘ CÂU CHUYỆN & TRIẾT LÝ ALPS</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/san-pham"
                className="w-full sm:w-auto px-5 py-3 text-xs font-medium text-[#74584d] hover:text-[#1c1c19] text-center"
              >
                Khám phá 5 sản phẩm →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
