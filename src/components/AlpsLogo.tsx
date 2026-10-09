import React from 'react';

interface AlpsIconProps {
  className?: string;
  size?: number;
  color?: string;
  iconColor?: string;
  isDarkBackground?: boolean;
}

/**
 * Biểu tượng dãy núi Alps thiết kế "Nhọn & Đơn giản" (Sharp & Minimalist):
 * - Đỉnh nhọn sắc sảo (Sharp acute angles, miter joints)
 * - Tối giản thanh lịch (Zero clutter: không vẽ cây thông, không mầm cây rườm rà)
 * - Đỉnh chính vươn cao với đường sống núi sắc bén
 * - Đỉnh vàng kim sang trọng phía sau tạo chiều sâu 3D
 * - 1 đường chân núi phẳng và 1 gợn sóng hồ băng thanh mảnh
 */
export const AlpsIcon: React.FC<AlpsIconProps> = ({
  className = 'w-12 h-6 sm:w-14 sm:h-7',
  color,
  iconColor,
  isDarkBackground = false,
}) => {
  const customColor = iconColor || color;
  const isLight = isDarkBackground || customColor === '#fed8c9' || customColor === 'white' || customColor === '#ffffff';
  
  // Màu sắc thích ứng sắc nét:
  const strokeColor = isLight ? '#fcf9f4' : (customColor || '#1c1c19');
  const goldColor = isLight ? '#fed8c9' : '#c5a059';

  return (
    <svg
      viewBox="0 0 120 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`object-contain inline-block select-none ${className}`}
    >
      {/* 1. Đỉnh núi vàng kim nhọn & thanh mảnh phía sau */}
      <g stroke={goldColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="miter" strokeMiterlimit="10" opacity="0.9">
        <path d="M16 43 L32 18 L46 43" />
        <path d="M32 18 L37 43" strokeWidth="0.8" opacity="0.75" />
        <path d="M74 43 L88 18 L104 43" />
        <path d="M88 18 L83 43" strokeWidth="0.8" opacity="0.75" />
      </g>

      {/* 2. Đỉnh phụ nhọn bên trái */}
      <path
        d="M20 43 L38 16 L54 43"
        stroke={strokeColor}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
      />

      {/* 3. Đỉnh phụ nhọn bên phải */}
      <path
        d="M66 43 L82 16 L100 43"
        stroke={strokeColor}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
      />

      {/* 4. Đỉnh núi trung tâm vút cao kiêu hãnh (Cực kỳ nhọn & sắc lẹm) */}
      <path
        d="M40 43 L60 5 L80 43"
        stroke={strokeColor}
        strokeWidth="2.0"
        strokeLinecap="round"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
      />

      {/* 5. Đường sống núi sắc sảo phân tách đỉnh băng hà */}
      <path
        d="M60 5 L58 19 L62 31 L60 43"
        stroke={strokeColor}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 6. Đường chân núi ngang sắc nét và tối giản */}
      <line
        x1="12"
        y1="43"
        x2="108"
        y2="43"
        stroke={strokeColor}
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* 7. Một gợn sóng thanh mảnh tinh tế duy nhất dưới chân núi */}
      <path
        d="M34 48 C48 50 72 50 86 48"
        stroke={goldColor}
        strokeWidth="1.0"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
};

export interface AlpsLogoProps {
  variant?: 'full' | 'icon' | 'text-only';
  className?: string;
  textColor?: string;
  iconColor?: string;
  subtitle?: string;
  showIcon?: boolean;
  isDarkBackground?: boolean;
}

/**
 * Logo ALPS thiết kế Nhọn & Đơn Giản:
 * - Biểu tượng đỉnh núi nhọn hoắt, thanh lịch, tinh xảo
 * - Chữ thương hiệu ALPS serif quý phái
 * - Phụ đề PURE ESSENCE dãn cách rộng sang trọng
 */
export const AlpsLogo: React.FC<AlpsLogoProps> = ({
  variant = 'full',
  className = '',
  textColor = 'text-[#1c1c19]',
  iconColor,
  subtitle = 'PURE ESSENCE',
  showIcon = false,
  isDarkBackground = false,
}) => {
  const isLight = isDarkBackground || textColor.includes('text-white') || textColor.includes('text-[#fed8c9]');

  if (variant === 'icon') {
    return (
      <AlpsIcon 
        className={className || 'w-12 h-6'} 
        color={iconColor} 
        isDarkBackground={isLight} 
      />
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center select-none text-center ${className}`}>
      {showIcon && variant !== 'text-only' && (
        <AlpsIcon
          className="w-11 h-6 sm:w-13 sm:h-7 mb-0.5 transition-transform duration-300 group-hover:scale-105"
          color={iconColor}
          isDarkBackground={isLight}
        />
      )}
      <span
        className={`font-serif tracking-[0.34em] text-xl sm:text-2xl font-bold uppercase transition-colors ${
          isLight ? 'text-white' : textColor
        } leading-tight`}
        style={{ letterSpacing: '0.36em' }}
      >
        ALPS
      </span>
      {subtitle && (
        <span
          className={`text-[9px] sm:text-[10px] font-semibold uppercase mt-0.5 tracking-[0.4em] transition-colors ${
            isLight ? 'text-[#fed8c9]' : 'text-[#5a5750]'
          }`}
          style={{ letterSpacing: '0.4em' }}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
};
