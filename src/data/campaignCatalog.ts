// Shared campaign data for the storefront and advisor.
export interface CampaignCombo {
  id: string;
  name: string;
  subTitle: string;
  badge: string;
  originalPrice: number;
  salePrice: number;
  savings: number;
  image: string;
  description: string;
  includes: string[];
  freeGifts: string[];
  productIds: string[];
  recommendedFor: string;
}

export interface PromoVoucher {
  code: string;
  discountPercent: number;
  discountFixed?: number;
  title: string;
  description: string;
  minOrder: number;
  badge: string;
  expiry: string;
}

export const CAMPAIGN_2010_DATA = {
  themeTitle: 'CHIẾN DỊCH TRI ÂN 20/10 • TÔN VINH VẺ ĐẸP PHỤ NỮ VIỆT NAM',
  subHeading: 'Dành tặng người phụ nữ bạn yêu thương vẻ rạng ngời thuần khiết từ đỉnh tuyết Alps, Thụy Sĩ.',
  bannerNote: '3 mã giảm 20% có giới hạn • Cộng thêm ALPSFREESHIP • Đặc quyền ALPSMEMBER',
  eventDate: 'Áp dụng từ 10/10 đến hết ngày 22/10/2026',
  
  vouchers: [
    {code: 'ALPS25K', discountPercent: 20, title: 'Giảm tối đa 25.000đ', description: 'Giảm 20% tiền hàng, tối đa 25.000đ, đơn từ 200.000đ. Áp dụng hàng lẻ và combo; cộng được ALPSFREESHIP.', minOrder: 200000, badge: 'ĐƠN TỪ 200.000đ', expiry: 'Ưu đãi hiện hành'},
    {code: 'ALPS75K', discountPercent: 20, title: 'Giảm tối đa 75.000đ', description: 'Giảm 20% tiền hàng, tối đa 75.000đ, đơn từ 800.000đ. Áp dụng hàng lẻ và combo; cộng được ALPSFREESHIP.', minOrder: 800000, badge: 'ĐƠN TỪ 800.000đ', expiry: 'Ưu đãi hiện hành'},
    {code: 'ALPS100K', discountPercent: 20, title: 'Giảm tối đa 100.000đ', description: 'Giảm 20% tiền hàng, tối đa 100.000đ, đơn từ 1.000.000đ. Áp dụng hàng lẻ và combo; cộng được ALPSFREESHIP.', minOrder: 1000000, badge: 'ĐƠN TỪ 1.000.000đ', expiry: 'Ưu đãi hiện hành'},
    {code: 'ALPSFREESHIP', discountPercent: 0, discountFixed: 30000, title: 'Hỗ trợ phí vận chuyển', description: 'Hỗ trợ phí ship thực tế tối đa 30.000đ, đơn từ 499.000đ tiền hàng trước giảm giá. Cộng được một mã giảm tiền hàng; không quy đổi phần dư thành tiền.', minOrder: 499000, badge: 'CỘNG ĐƯỢC MÃ GIẢM GIÁ', expiry: 'Ưu đãi hiện hành'},
    {code: 'ALPSMEMBER', discountPercent: 10, title: 'Đặc quyền sản phẩm nguyên giá', description: 'Thành viên đã đăng nhập giảm 10% trên giá gốc của sản phẩm chưa giảm giá. Cộng được ALPSFREESHIP; không cộng mã giảm tiền hàng khác.', minOrder: 0, badge: 'CHỈ HÀNG NGUYÊN GIÁ', expiry: 'Ưu đãi hiện hành'},
  ] as PromoVoucher[],

  combos: [
    {
      id: 'combo-serum-kem-duong',
      name: 'Combo 20/10: Serum & Kem Dưỡng Rạng Ngời',
      subTitle: 'Bộ đôi dưỡng sáng & khóa ẩm • Tặng hộp quà, 1 miếng mặt nạ và toner 10 ml',
      badge: 'COMBO MỚI 20/10',
      originalPrice: 840000,
      salePrice: 840000,
      savings: 0,
      image: '',
      description: 'Kết hợp serum dưỡng sáng và kem dưỡng khóa ẩm trong set quà dành tặng nàng. Áp mã ALPS75K còn 765.000₫, kèm hộp quà ALPS, 1 miếng mặt nạ và 1 toner 10 ml miễn phí.',
      includes: [
        'Alps Radiance Glow Serum (30ml) - Trị giá 390.000₫',
        'Alps Regenerating Face Cream (50g) - Trị giá 450.000₫',
      ],
      freeGifts: ['Hộp quà độc quyền ALPS (0₫)', '1 miếng Alps Hydro-Lifting Sheet Mask (0₫)', '1 toner ALPS 10 ml (0₫)'],
      productIds: ['serum-radiance', 'cream-regenerating'],
      recommendedFor: 'Người yêu thích bộ đôi dưỡng sáng và khóa ẩm',
    },
    {
      id: 'combo-toner-mat-na',
      name: 'Combo 20/10: Toner Thảo Mộc & Mặt Nạ Sinh Học',
      subTitle: 'Bộ đôi Nước hoa hồng cân bằng pH 5.5 & Mặt nạ thạch nâng cơ',
      badge: 'BÁN CHẠY NHẤT 20/10',
      originalPrice: 500000,
      salePrice: 500000,
      savings: 0,
      image: '',
      description:
        'Bộ đôi kết hợp cấp ẩm cân bằng độ pH chuẩn 5.5 và mặt nạ thạch sinh học nuôi dưỡng làn da căng mọng, mềm mịn chuẩn glass-skin.',
      includes: [
        'Alps Botanical Balancing Toner (100ml) - Trị giá 220,000₫',
        'Alps Hydro-Lifting Sheet Mask (Hộp 5 miếng 29g) - Trị giá 280,000₫',
      ],
      freeGifts: [
        'Hộp quà ALPS (0₫)',
        '1 sữa rửa mặt ALPS 20 ml (0₫)',
      ],
      productIds: ['toner-botanical', 'mask-hydro-lifting'],
      recommendedFor: 'Tặng Vợ, Bạn Gái, Phụ nữ yêu thích làn da căng mọng, mềm mượt',
    },
    {
      id: 'combo-toan-dien',
      name: 'Combo Toàn Diện: Nghi Thức Hoàng Gia Alps',
      subTitle: 'Trọn bộ 5 bước chăm sóc & tái sinh làn da chuẩn hoàng gia Thụy Sĩ',
      badge: 'ĐẲNG CẤP HOÀNG GIA',
      originalPrice: 1590000,
      salePrice: 1590000,
      savings: 0,
      image: '',
      description:
        'Liệu trình chăm sóc và trẻ hóa da toàn diện 5 bước khép kín từ làm sạch sâu, cân bằng khoáng chất, huyết thanh tái sinh, kem khóa ẩm 72H đến mặt nạ thạch sinh học nâng cơ.',
      includes: [
        'Alps Gentle Purifying Cleanser (120ml) - Trị giá 250,000₫',
        'Alps Botanical Balancing Toner (100ml) - Trị giá 220,000₫',
        'Alps Radiance Glow Serum (30ml) - Trị giá 390,000₫',
        'Alps Regenerating Face Cream (50g) - Trị giá 450,000₫',
        'Alps Hydro-Lifting Sheet Mask (Hộp 5 miếng 29g) - Trị giá 280,000₫',
      ],
      freeGifts: [
        'Hộp quà ALPS (0₫)',
        '1 sữa rửa mặt ALPS 20 ml (0₫)',
        '1 toner ALPS 20 ml (0₫)',
      ],
      productIds: [
        'cleanser-gentle-purifying',
        'toner-botanical',
        'serum-radiance',
        'cream-regenerating',
        'mask-hydro-lifting',
      ],
      recommendedFor: 'Món quà trọn vẹn dành tặng Mẹ, Vợ, Đối tác hoặc Người phụ nữ bạn trân quý nhất',
    },
  ] as CampaignCombo[],

  giftServices: [
    {
      title: 'Hộp Quà Độc Quyền ALPS Sang Trọng',
      desc: 'Mỗi đơn hàng combo đều được trao gửi trong Hộp quà độc quyền của ALPS sang trọng, lót giấy lụa thơm và thắt nơ tinh tế dành tặng phái nữ.',
    },
    {
      title: 'Viết Thiệp Chúc Mừng Theo Yêu Cầu',
      desc: 'Nhân viên Alps nắn nót viết tay từng lời nhắn yêu thương bạn gửi tới người nhận.',
    },
    {
      title: 'Giao Hỏa Tốc Đúng Ngày 20/10',
      desc: 'Hỗ trợ hẹn giờ giao quà tận tay người nhận với sự chu đáo và bảo mật tuyệt đối.',
    },
  ],
};
