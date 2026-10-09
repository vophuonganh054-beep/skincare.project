import React, { useState, useEffect } from 'react';
import { Type, Check, Sparkles, X } from 'lucide-react';

export type FontPreset = 'alps_luxury' | 'fraunces' | 'playfair' | 'modern' | 'alps_id_vn' | 'cormorant';

interface FontOption {
  id: FontPreset;
  name: string;
  subtitle: string;
  serifFont: string;
  sansFont: string;
  previewHeading: string;
  previewBody: string;
  description: string;
  tag: string;
}

const FONT_OPTIONS: FontOption[] = [
  {
    id: 'alps_luxury',
    name: 'Alps Quiet Luxury (Khuyên dùng)',
    subtitle: 'Lora & Be Vietnam Pro',
    serifFont: '"Lora", Georgia, serif',
    sansFont: '"Be Vietnam Pro", sans-serif',
    previewHeading: 'Alps Gentle Purifying Cleanser',
    previewBody: 'Purifying Foaming Wash - Bọt mịn dịu nhẹ, sạch sâu.',
    description: 'Phong cách Quiet Luxury cao cấp: Nét chữ Lora kiêu sa, uyển chuyển kết hợp Be Vietnam Pro chuẩn xác 100% dấu tiếng Việt, không bao giờ bị rớt chữ hay đứt đoạn.',
    tag: 'HOÀN HẢO • THẨM MỸ CAO CẤP',
  },
  {
    id: 'fraunces',
    name: 'Swiss Haute Couture',
    subtitle: 'Fraunces & Be Vietnam Pro',
    serifFont: '"Fraunces", Georgia, serif',
    sansFont: '"Be Vietnam Pro", sans-serif',
    previewHeading: 'Tinh Hoa Tế Bào Gốc Sông Băng Thụy Sĩ',
    previewBody: 'Phục hồi rào cản sinh học, nuôi dưỡng làn da căng bóng thuần khiết.',
    description: 'Font chữ nghệ thuật mang đường cong mềm mại, độc bản, đậm dấu ấn thẩm mỹ của các thương hiệu làm đẹp quốc tế cao cấp.',
    tag: 'NGHỆ THUẬT ĐỘC BẢN',
  },
  {
    id: 'playfair',
    name: 'Parisian Vogue Editorial',
    subtitle: 'Playfair Display & Be Vietnam Pro',
    serifFont: '"Playfair Display", Georgia, serif',
    sansFont: '"Be Vietnam Pro", sans-serif',
    previewHeading: 'Nghi Thức Dưỡng Sáng Đẳng Cấp Vogue',
    previewBody: 'Đậm nét cổ điển quý phái như các tạp chí thời trang Paris danh tiếng.',
    description: 'Tương phản nét thanh nét đậm ấn tượng, quý phái và đậm chất tạp chí thời trang thượng lưu.',
    tag: 'CỔ ĐIỂN QUÝ PHÁI',
  },
  {
    id: 'modern',
    name: 'Nordic Clean Minimalist',
    subtitle: 'Be Vietnam Pro Toàn Diện',
    serifFont: '"Be Vietnam Pro", sans-serif',
    sansFont: '"Be Vietnam Pro", sans-serif',
    previewHeading: 'Khoa Học Dược Mỹ Phẩm Tối Giản',
    previewBody: 'Được thiết kế tối ưu hóa hình khối hiện đại tinh tế, thanh lịch và sắc sảo.',
    description: 'Phong cách phòng lab Bắc Âu: Đường nét hình học dứt khoát, hiện đại, tuyệt đối không dùng chân serif, cực kỳ dễ đọc.',
    tag: 'HIỆN ĐẠI TỐI GIẢN',
  },
];

interface FontSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const FontSwitcherModal: React.FC<FontSwitcherModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [currentFont, setCurrentFont] = useState<FontPreset>('alps_luxury');

  useEffect(() => {
    const saved = (localStorage.getItem('alps_font_preset') as FontPreset) || 'alps_luxury';
    setCurrentFont(saved === 'alps_id_vn' ? 'alps_luxury' : saved);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectFont = (fontId: FontPreset) => {
    setCurrentFont(fontId);
    localStorage.setItem('alps_font_preset', fontId);
    document.documentElement.setAttribute('data-font', fontId);
    const chosen = FONT_OPTIONS.find((f) => f.id === fontId);
    onShowToast(`Đã đổi sang giao diện: ${chosen?.name || fontId}`);
    setTimeout(() => {
      onClose();
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-[#fcf9f4] border border-[#e4dfd7] w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#ece6dc] flex items-center justify-between bg-white">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-[#f4ece3] flex items-center justify-center text-[#74584d]">
              <Type className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-medium text-[#1c1c19]">
                Tùy Chọn Kiểu Chữ (Typography)
              </h3>
              <p className="text-xs text-[#77746f]">
                Lựa chọn font chữ thể hiện bản sắc thẩm mỹ thương hiệu ALPS
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#f0ede9] text-[#77746f] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {FONT_OPTIONS.map((opt) => {
            const isSelected = currentFont === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => handleSelectFont(opt.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'border-[#74584d] bg-white ring-1 ring-[#74584d] shadow-sm'
                    : 'border-[#e4dfd7] bg-[#fbf9f6] hover:bg-white hover:border-[#74584d]/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm text-[#1c1c19]">
                        {opt.name}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f0eae3] text-[#74584d] font-semibold">
                        {opt.tag}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#77746f] mt-0.5">
                      {opt.subtitle}
                    </div>

                    {/* Live Preview Box */}
                    <div
                      className="mt-3 p-3 rounded-lg bg-[#faf8f5] border border-[#ece7e0]"
                      style={{
                        fontFamily: opt.sansFont,
                      }}
                    >
                      <h4
                        className="text-base text-[#1c1c19] tracking-tight leading-snug"
                        style={{ fontFamily: opt.serifFont }}
                      >
                        {opt.previewHeading}
                      </h4>
                      <p className="text-xs text-[#5f5d58] mt-1 leading-relaxed">
                        {opt.previewBody}
                      </p>
                    </div>

                    <p className="text-[11px] text-[#77746f] mt-2 italic">
                      {opt.description}
                    </p>
                  </div>

                  <div className="mt-1">
                    {isSelected ? (
                      <div className="w-6 h-6 rounded-full bg-[#74584d] text-white flex items-center justify-center shadow-xs">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border border-[#d3cdc3] bg-white" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#ece6dc] flex items-center justify-between text-xs text-[#77746f]">
          <div className="flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#74584d]" />
            <span>Font chữ được lưu tự động trên trình duyệt của bạn</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#74584d] text-white rounded-lg text-xs font-medium hover:bg-[#5e453c] transition-colors"
          >
            Hoàn tất
          </button>
        </div>
      </div>
    </div>
  );
};
