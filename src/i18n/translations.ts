export type SupportedLanguage = 'vi' | 'en' | 'de' | 'es' | 'zh';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  shortLabel: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'vi', name: 'Tiếng Việt', nativeName: 'Tiếng Việt', flag: '🇻🇳', shortLabel: 'VI' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', shortLabel: 'EN' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', shortLabel: 'DE' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', shortLabel: 'ES' },
  { code: 'zh', name: 'Chinese', nativeName: '简体中文', flag: '🇨🇳', shortLabel: 'ZH' },
];

export interface AppTranslations {
  announcement: string;
  csHotline: string;
  zurichHQ: string;
  searchPlaceholder: string;
  nav: {
    home: string;
    catalog: string;
    routine: string;
    story: string;
    packaging: string;
    orders: string;
    cart: string;
    quiz: string;
    support: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    exploreBtn: string;
    quizBtn: string;
    statPurity: string;
    statPurityLabel: string;
    statCycle: string;
    statCycleLabel: string;
    statVegan: string;
    statVeganLabel: string;
  };
  ritual: {
    badge: string;
    title: string;
    desc: string;
    viewRitualBtn: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
  };
  catalog: {
    badge: string;
    title: string;
    subtitle: string;
    all: string;
    cleanser: string;
    toner: string;
    serum: string;
    cream: string;
    mask: string;
    addToCart: string;
    buyNow: string;
    detail: string;
    sold: string;
    reviews: string;
  };
  brandStory: {
    badge: string;
    title: string;
    slogan: string;
    subtitle: string;
    tier1: string;
    tier2: string;
    tier3: string;
    readMoreBtn: string;
    exploreCollectionBtn: string;
    natureSound: string;
    playingSound: string;
  };
  packaging: {
    badge: string;
    title: string;
    subtitle: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    exploreBtn: string;
    duoBtn: string;
  };
  cart: {
    title: string;
    emptyTitle: string;
    emptyDesc: string;
    continueShopping: string;
    subtotal: string;
    shipping: string;
    freeShipping: string;
    total: string;
    checkoutBtn: string;
    clearCart: string;
  };
  productDetail: {
    inStock: string;
    outOfStock: string;
    routineStepLabel: string;
    noReviewsYet: string;
    writeFirstReview: string;
    vatIncluded: string;
    fastDelivery: string;
    quantityLabel: string;
    tabUsage: string;
    tabBenefits: string;
    tabIngredients: string;
    tabReviews: string;
    expertTip: string;
    precautions: string;
    close: string;
    privilege: string;
  };
  reviews: {
    sectionTitle: string;
    sectionSubtitle: string;
    verifiedBadge: string;
    writeReviewBtn: string;
    noReviewsMessage: string;
    ratingPrompt: string;
    nameLabel: string;
    namePlaceholder: string;
    commentLabel: string;
    commentPlaceholder: string;
    submitBtn: string;
    thankYou: string;
  };
  footer: {
    brandDesc: string;
    branchLabel: string;
    branchAddress: string;
    acceptPayment: string;
    collectionTitle: string;
    supportTitle: string;
    hotlineLabel: string;
    emailLabel: string;
    websiteLabel: string;
    returnPolicy: string;
    shippingPolicy: string;
    fontSwitcher: string;
    brandStoryLink: string;
    allRightsReserved: string;
    disclaimer: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, AppTranslations> = {
  // VIETNAMESE
  vi: {
    announcement: 'BỘ SƯU TẬP MỚI 2026: MIỄN PHÍ GIAO HÀNG TOÀN QUỐC ĐƠN TỪ 500.000₫ • TẶNG THÌA BẠC CAO CẤP',
    csHotline: 'Hotline: 0772 770 134',
    zurichHQ: 'Thụy Sĩ • Zurich',
    searchPlaceholder: 'Tìm serum, kem dưỡng, toner...',
    nav: {
      home: 'TRANG CHỦ',
      catalog: 'DANH MỤC',
      routine: 'NGHI THỨC',
      story: 'CÂU CHUYỆN',
      packaging: 'BAO BÌ',
      orders: 'ĐƠN HÀNG',
      cart: 'GIỎ HÀNG',
      quiz: 'SOI DA',
      support: 'CSKH 24/7',
    },
    hero: {
      badge: 'DƯỢC MỸ PHẨM TẾ BÀO GỐC SÔNG BĂNG THỤY SĨ',
      title1: 'Sự Thuần Khiết Tột Cùng,',
      title2: 'Đánh Thức Làn Da Tỏa Sáng.',
      subtitle: 'Chắt lọc từ nguồn nước khoáng sông băng Matterhorn cổ đại và thảo mộc đỉnh tuyết Alps, mang đến chuẩn mực dưỡng sáng thanh khiết vượt thời gian.',
      exploreBtn: 'Khám Phá Bộ Sưu Tập',
      quizBtn: 'Chẩn Đoán Làn Da (Quiz)',
      statPurity: '99.4%',
      statPurityLabel: 'Tự Nhiên Nguyên Bản',
      statCycle: '28 Ngày',
      statCycleLabel: 'Chu Kỳ Tái Sinh Da',
      statVegan: '100%',
      statVeganLabel: 'Thuần Chay Chuẩn Y Khoa',
    },
    ritual: {
      badge: 'NGHI THỨC DƯỠNG SÁNG 5 BƯỚC',
      title: 'Nghi Thức Dưỡng Nhan Quiet Luxury',
      desc: 'Mỗi buổi sáng và tối là khoảng lặng để bạn kết nối, vỗ về và đánh thức năng lượng tinh khôi cho làn da.',
      viewRitualBtn: 'Xem Chi Tiết 5 Bước Dưỡng',
      step1: 'Làm Sạch Dịu Nhẹ',
      step2: 'Cân Bằng Thảo Mộc',
      step3: 'Serum Tinh Chất Sáng',
      step4: 'Tái Sinh & Khóa Ẩm',
      step5: 'Mặt Nạ Nâng Cơ Phục Hồi',
    },
    catalog: {
      badge: 'BỘ SƯU TẬP 5 TUYỆT TÁC DƯỠNG DA',
      title: 'Bộ Sưu Tập Alps Pure Essence',
      subtitle: 'Công thức dược mỹ phẩm thuần chay điều chế từ nước băng tuyết Zermatt và tế bào gốc thực vật.',
      all: 'TẤT CẢ',
      cleanser: 'SỮA RỬA MẶT',
      toner: 'TONER NƯỚC HOA HỒNG',
      serum: 'SERUM TINH CHẤT',
      cream: 'KEM DƯỠNG DA',
      mask: 'MẶT NẠ NÂNG CƠ',
      addToCart: 'Thêm vào giỏ',
      buyNow: 'Mua ngay',
      detail: 'Xem chi tiết',
      sold: 'Đã bán',
      reviews: 'Đánh giá',
    },
    brandStory: {
      badge: 'HÀNH TRÌNH NGUỒN CỘI • ALPS PURE ESSENCE',
      title: 'Nơi Thời Gian Lắng Đọng, Nơi Thiên Nhiên Tinh Khiết',
      slogan: 'Pure Essence. Timeless Beauty. — Renew Your Skin. Reveal Your Radiance.',
      subtitle: 'Không ồn ào khoa trương. Chúng tôi tìm về rặng núi Alps để học lòng kiên nhẫn của tuyết vĩnh cửu.',
      tier1: 'Tầng 1 • Brand Story',
      tier2: 'Tầng 2 • Brand Philosophy',
      tier3: 'Tầng 3 • Commitments & Actions',
      readMoreBtn: 'Brand Story',
      exploreCollectionBtn: 'Khám Phá Bộ Sưu Tập',
      natureSound: 'Âm thanh tự nhiên',
      playingSound: 'Tiếng suối băng đang phát',
    },
    packaging: {
      badge: 'THIẾT KẾ BAO BÌ TỐI GIẢN CHÂU ÂU',
      title: 'Vẻ Đẹp Tinh Tế Của Thủy Tinh Mờ & Vàng Champagne',
      subtitle: 'Chai thủy tinh mờ mạ cát thanh lịch, bảo vệ hoạt chất tế bào gốc khỏi ánh sáng mặt trời.',
      feature1Title: 'Thủy Tinh Mờ Cát',
      feature1Desc: 'Cản 99% tia UV phá hủy dưỡng chất, lưu giữ độ tươi nguyên.',
      feature2Title: 'Nắp Mạ Vàng Cát',
      feature2Desc: 'Gia công tinh xảo, chống trơn trượt khi sử dụng với tay ướt.',
      feature3Title: '100% Tái Chế Được',
      feature3Desc: 'Vật liệu thân thiện môi trường, mực in từ dầu đậu nành sinh học.',
      exploreBtn: 'Khám Phá Trọn Bộ 5 Món',
      duoBtn: 'Thêm Bộ Đôi (Toner & Mặt Nạ) Vào Giỏ',
    },
    cart: {
      title: 'Giỏ Hàng Của Bạn',
      emptyTitle: 'Giỏ hàng đang trống',
      emptyDesc: 'Khám phá các tuyệt tác dưỡng da thuần chay Alps để bắt đầu chu trình chăm sóc bản thân.',
      continueShopping: 'Tiếp Tục Khám Phá',
      subtotal: 'Tạm tính:',
      shipping: 'Phí vận chuyển:',
      freeShipping: 'Miễn phí giao hàng',
      total: 'Tổng cộng:',
      checkoutBtn: 'Tiến Hành Đặt Hàng',
      clearCart: 'Làm trống giỏ hàng',
    },
    productDetail: {
      inStock: 'Còn hàng',
      outOfStock: 'Hết hàng',
      routineStepLabel: 'BƯỚC RITUAL',
      noReviewsYet: 'Chưa có đánh giá nào (0)',
      writeFirstReview: 'Viết nhận xét đầu tiên ↓',
      vatIncluded: 'Đã gồm thuế VAT',
      fastDelivery: 'Giao nhanh 24h',
      quantityLabel: 'Số lượng:',
      tabUsage: 'HƯỚNG DẪN SỬ DỤNG',
      tabBenefits: 'HIỆU QUẢ VƯỢT TRỘI',
      tabIngredients: 'THÀNH PHẦN TOÀN BỘ',
      tabReviews: 'ĐÁNH GIÁ TỪ KHÁCH HÀNG',
      expertTip: 'Lời khuyên từ chuyên gia da liễu:',
      precautions: 'Lưu ý sử dụng an toàn:',
      close: 'Đóng',
      privilege: 'Đặc quyền:',
    },
    reviews: {
      sectionTitle: 'Đánh Giá & Trải Nghiệm Khách Hàng',
      sectionSubtitle: 'Những cảm nhận chân thật từ khách hàng đã trải nghiệm sản phẩm Alps Pure Essence.',
      verifiedBadge: 'Đã mua hàng chính hãng',
      writeReviewBtn: 'Viết Đánh Giá',
      noReviewsMessage: 'Chưa có đánh giá nào. Hãy là người đầu tiên chia sẻ cảm nhận của bạn về sản phẩm này!',
      ratingPrompt: 'Đánh giá của bạn về sản phẩm:',
      nameLabel: 'Họ và tên của bạn:',
      namePlaceholder: 'Nhập tên của bạn...',
      commentLabel: 'Cảm nhận chi tiết:',
      commentPlaceholder: 'Chia sẻ cảm nhận về kết cấu, mùi hương và hiệu quả trên da...',
      submitBtn: 'Gửi Đánh Giá',
      thankYou: 'Cảm ơn bạn đã gửi đánh giá! Nhận xét sẽ xuất hiện sau khi được duyệt.',
    },
    footer: {
      brandDesc: 'Thương hiệu dược mỹ phẩm thuần chay tiên phong chưng cất tại Zurich, Thụy Sĩ. Đánh thức vẻ rạng ngời thuần khiết của làn da.',
      branchLabel: 'Trụ sở TP.HCM:',
      branchAddress: '30 D. Trịnh Đình Thảo, Tân Phú, Hồ Chí Minh',
      acceptPayment: 'Chuyển khoản ngân hàng & COD:',
      collectionTitle: 'BỘ SƯU TẬP',
      supportTitle: 'CHĂM SÓC KHÁCH HÀNG',
      hotlineLabel: 'Hotline 24/7:',
      emailLabel: 'Email CSKH:',
      websiteLabel: 'Website:',
      returnPolicy: 'Đổi trả & Hoàn tiền 30 ngày',
      shippingPolicy: 'Chính sách giao nhận & đồng kiểm',
      fontSwitcher: 'Tùy chọn phong cách font chữ',
      brandStoryLink: 'Đọc câu chuyện thương hiệu Alps',
      allRightsReserved: 'Bản quyền thuộc về Alps Skincare Pure Essence Thụy Sĩ.',
      disclaimer: 'Sản phẩm thuần chay 100%, không chứa paraben, không thử nghiệm trên động vật.',
    },
  },

  // ENGLISH
  en: {
    announcement: 'NEW 2026 COLLECTION: COMPLIMENTARY NATIONWIDE SHIPPING ON ORDERS FROM 500,000₫ • FREE SILVER SPATULA',
    csHotline: 'Support: 0772 770 134',
    zurichHQ: 'Switzerland • Zurich',
    searchPlaceholder: 'Search serums, creams, toners...',
    nav: {
      home: 'HOME',
      catalog: 'COLLECTION',
      routine: 'RITUAL',
      story: 'STORY',
      packaging: 'PACKAGING',
      orders: 'ORDERS',
      cart: 'BAG',
      quiz: 'SKIN QUIZ',
      support: 'CARE 24/7',
    },
    hero: {
      badge: 'SWISS GLACIAL STEM CELL DERMOCOSMETICS',
      title1: 'Ultimate Purity,',
      title2: 'Awakening Your Luminous Radiance.',
      subtitle: 'Distilled from ancient Matterhorn glacier water and high-alpine edelweiss, delivering timeless botanical radiance.',
      exploreBtn: 'Explore Collection',
      quizBtn: 'Take Skin Diagnostic Quiz',
      statPurity: '99.4%',
      statPurityLabel: 'Natural Origin',
      statCycle: '28 Days',
      statCycleLabel: 'Cell Renewal Cycle',
      statVegan: '100%',
      statVeganLabel: 'Medical-Grade Vegan',
    },
    ritual: {
      badge: '5-STEP RADIANCE RITUAL',
      title: 'Quiet Luxury Skincare Ritual',
      desc: 'Morning and evening moments of stillness to connect, comfort, and re-awaken your skin’s innate vitality.',
      viewRitualBtn: 'Discover 5-Step Routine',
      step1: 'Gentle Purifying',
      step2: 'Botanical Balancing',
      step3: 'Radiance Glow Serum',
      step4: 'Regenerating Cream',
      step5: 'Hydro-Lifting Mask',
    },
    catalog: {
      badge: '5 ICONIC SKINCARE MASTERPIECES',
      title: 'Alps Pure Essence Collection',
      subtitle: 'Clean vegan dermocosmetics formulated with Zermatt glacial spring water and bio-active botanical stem cells.',
      all: 'ALL PRODUCTS',
      cleanser: 'CLEANSER',
      toner: 'BALANCING TONER',
      serum: 'ESSENCE SERUM',
      cream: 'FACE CREAM',
      mask: 'SHEET MASK',
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      detail: 'Details',
      sold: 'Sold',
      reviews: 'Reviews',
    },
    brandStory: {
      badge: 'HERITAGE & ORIGIN • ALPS PURE ESSENCE',
      title: 'Where Time Rests, Where Nature Remains Pure',
      slogan: 'Pure Essence. Timeless Beauty. — Renew Your Skin. Reveal Your Radiance.',
      subtitle: 'Quiet luxury without loud claims. We turned to the Swiss Alps to learn the eternal patience of snow and stone.',
      tier1: 'Tier 1 • Brand Story',
      tier2: 'Tier 2 • Brand Philosophy',
      tier3: 'Tier 3 • Commitments & Actions',
      readMoreBtn: 'Brand Story',
      exploreCollectionBtn: 'Explore Collection',
      natureSound: 'Nature Ambiance',
      playingSound: 'Glacial Stream Audio Playing',
    },
    packaging: {
      badge: 'EUROPEAN MINIMALIST DESIGN',
      title: 'The Refined Elegance of Frosted Glass & Champagne Gold',
      subtitle: 'Sandblasted amber-frosted glass vessels shield bio-cellular actives from UV degradation.',
      feature1Title: 'Frosted Glass Flacon',
      feature1Desc: 'Shields 99% of UV rays to preserve pristine formula freshness.',
      feature2Title: 'Brushed Champagne Cap',
      feature2Desc: 'Precision micro-milled finish offering non-slip ergonomics.',
      feature3Title: '100% Recyclable',
      feature3Desc: 'Eco-conscious materials printed with biodegradable soy-based ink.',
      exploreBtn: 'Explore The Full Set',
      duoBtn: 'Add Essential Duo (Toner & Mask) to Cart',
    },
    cart: {
      title: 'Your Shopping Bag',
      emptyTitle: 'Your bag is empty',
      emptyDesc: 'Discover our Swiss vegan skincare masterworks to begin your refined self-care ritual.',
      continueShopping: 'Continue Shopping',
      subtotal: 'Subtotal:',
      shipping: 'Shipping:',
      freeShipping: 'Complimentary shipping',
      total: 'Total:',
      checkoutBtn: 'Proceed to Checkout',
      clearCart: 'Empty bag',
    },
    productDetail: {
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      routineStepLabel: 'RITUAL STEP',
      noReviewsYet: 'No reviews yet (0)',
      writeFirstReview: 'Write the first review ↓',
      vatIncluded: 'VAT Included',
      fastDelivery: 'Fast 24H Dispatch',
      quantityLabel: 'Quantity:',
      tabUsage: 'USAGE INSTRUCTIONS',
      tabBenefits: 'KEY BENEFITS',
      tabIngredients: 'FULL INGREDIENTS (INCI)',
      tabReviews: 'CLIENT REVIEWS',
      expertTip: 'Dermatologist Tip:',
      precautions: 'Safety Precautions:',
      close: 'Close',
      privilege: 'Privilege:',
    },
    reviews: {
      sectionTitle: 'Client Testimonials & Feedback',
      sectionSubtitle: 'Authentic reviews from verified clients experiencing Alps Pure Essence skincare rituals.',
      verifiedBadge: 'Verified Purchase',
      writeReviewBtn: 'Write a Review',
      noReviewsMessage: 'There are no reviews yet. Be the first to share your experience with this formulation!',
      ratingPrompt: 'Your rating for this product:',
      nameLabel: 'Your full name:',
      namePlaceholder: 'Enter your name...',
      commentLabel: 'Detailed feedback:',
      commentPlaceholder: 'Describe texture, fragrance, and noticeable results on your skin...',
      submitBtn: 'Submit Review',
      thankYou: 'Thank you for your review! It will be displayed after review verification.',
    },
    footer: {
      brandDesc: 'Pioneering vegan dermocosmetics distilled in Zurich, Switzerland. Awakening the innate, crystal-clear luminosity of your skin.',
      branchLabel: 'Flagship Boutique:',
      branchAddress: '30 Trinh Dinh Thao, Tan Phu, Ho Chi Minh City',
      acceptPayment: 'Bank transfer & cash on delivery:',
      collectionTitle: 'COLLECTION',
      supportTitle: 'CLIENT SERVICES',
      hotlineLabel: 'Support 24/7:',
      emailLabel: 'Inquiries:',
      websiteLabel: 'Website:',
      returnPolicy: '30-Day Complimentary Returns',
      shippingPolicy: 'Inspected Delivery & Tracking',
      fontSwitcher: 'Typography Style Settings',
      brandStoryLink: 'Read The Alps Heritage Story',
      allRightsReserved: 'All rights reserved by Alps Skincare Pure Essence Switzerland.',
      disclaimer: '100% Vegan, Paraben-Free, Cruelty-Free certified formulation.',
    },
  },

  // GERMAN (DEUTSCH - SWISS GERMAN)
  de: {
    announcement: 'NEUE KOLLEKTION 2026: LANDESWEITER GRATISVERSAND AB 500.000₫ • INKLUSIVE SILBERNER SPATEL',
    csHotline: 'Kundendienst: 0772 770 134',
    zurichHQ: 'Schweiz • Zürich',
    searchPlaceholder: 'Serum, Creme, Toner suchen...',
    nav: {
      home: 'STARTSEITE',
      catalog: 'KOLLEKTION',
      routine: 'RITUAL',
      story: 'STORY',
      packaging: 'PACKAGING',
      orders: 'BESTELLUNGEN',
      cart: 'WARENKORB',
      quiz: 'HAUTANALYSE',
      support: 'KUNDENSERVICE',
    },
    hero: {
      badge: 'SCHWEIZER GLETSCHER-STAMMZELLEN-DERMOKOSMETIK',
      title1: 'Höchste Reinheit,',
      title2: 'Erwecke die natürliche Strahlkraft.',
      subtitle: 'Aus unberührtem Zermatter Gletscherquellwasser und Alpen-Edelweiß destilliert. Zeitlose Leuchtkraft für Ihre Haut.',
      exploreBtn: 'Kollektion Entdecken',
      quizBtn: 'Haut-Quiz Starten',
      statPurity: '99.4%',
      statPurityLabel: 'Natürlichen Ursprungs',
      statCycle: '28 Tage',
      statCycleLabel: 'Zellerneuerungszyklus',
      statVegan: '100%',
      statVeganLabel: 'Medizinisch Zertifiziert Vegan',
    },
    ritual: {
      badge: '5-STUFIGES STRAHLKRAFT-RITUAL',
      title: 'Das Quiet-Luxury Pflegeritual',
      desc: 'Morgendliche und abendliche Momente der Stille, um innezuhalten und Ihre Haut sanft zu beleben.',
      viewRitualBtn: '5-Schritte-Ritual Entdecken',
      step1: 'Sanfte Gesichtsreinigung',
      step2: 'Botanischer Balance-Toner',
      step3: 'Leuchtkraft-Aktivserum',
      step4: 'Regenerierende Gesichtscreme',
      step5: 'Hydro-Lifting Tuchmaske',
    },
    catalog: {
      badge: '5 SCHWEIZER PFLEGE-MEISTERWERKE',
      title: 'Alps Pure Essence Kollektion',
      subtitle: 'Vegane Dermokosmetik mit Zermatter Gletscherwasser und Schweizer Pflanzenstammzellen.',
      all: 'ALLE PRODUKTE',
      cleanser: 'REINIGUNG',
      toner: 'TONER & GESICHTSWASSER',
      serum: 'SERUM & ESSENZ',
      cream: 'GESICHTSCREME',
      mask: 'TUCHMASKE',
      addToCart: 'In den Warenkorb',
      buyNow: 'Sofort Kaufen',
      detail: 'Details',
      sold: 'Verkauft',
      reviews: 'Bewertungen',
    },
    brandStory: {
      badge: 'HERKUNFT & DIALOG • ALPS PURE ESSENCE',
      title: 'Wo die Zeit ruht, wo die Natur rein bleibt',
      slogan: 'Pure Essence. Timeless Beauty. — Erneuern Sie Ihre Haut.',
      subtitle: 'Quiet Luxury ohne laute Versprechen. Wir lernten von den Alpen die unendliche Geduld des ewigen Eises.',
      tier1: 'Stufe 1 • Brand Story',
      tier2: 'Stufe 2 • Brand Philosophy',
      tier3: 'Stufe 3 • Commitments & Actions',
      readMoreBtn: 'Brand Story',
      exploreCollectionBtn: 'Kollektion Entdecken',
      natureSound: 'Naturklang',
      playingSound: 'Gletscherbach-Audio Aktiv',
    },
    packaging: {
      badge: 'EUROPÄISCHES MINIMALISTISCHES DESIGN',
      title: 'Die Eleganz von Mattglas und Champagnergold',
      subtitle: 'Satiniertes Glas schützt die hochwirksamen Zellwirkstoffe vor schädlichem UV-Licht.',
      feature1Title: 'Satiniertes Flakonglas',
      feature1Desc: 'Blockiert 99% UV-Licht für maximale Frische der Formel.',
      feature2Title: 'Champagnergoldene Kappe',
      feature2Desc: 'Präzisionsgefräste Oberfläche für rutschfeste Haptik.',
      feature3Title: '100% Recycelbar',
      feature3Desc: 'Umweltfreundliche Materialien bedruckt mit biologischer Sojatinte.',
      exploreBtn: 'Das Komplette Set Entdecken',
      duoBtn: 'Duo-Set (Toner & Maske) In Den Warenkorb',
    },
    cart: {
      title: 'Ihr Warenkorb',
      emptyTitle: 'Ihr Warenkorb ist leer',
      emptyDesc: 'Entdecken Sie unsere Schweizer veganen Pflegemeisterwerke für Ihr tägliches Pflegeritual.',
      continueShopping: 'Weiter Einkaufen',
      subtotal: 'Zwischensumme:',
      shipping: 'Versandkosten:',
      freeShipping: 'Kostenlose Lieferung',
      total: 'Gesamtsumme:',
      checkoutBtn: 'Zur Kasse Gehen',
      clearCart: 'Warenkorb leeren',
    },
    productDetail: {
      inStock: 'Auf Lager',
      outOfStock: 'Ausverkauft',
      routineStepLabel: 'RITUAL-SCHRITT',
      noReviewsYet: 'Noch keine Bewertungen (0)',
      writeFirstReview: 'Erste Bewertung abgeben ↓',
      vatIncluded: 'Inkl. MwSt.',
      fastDelivery: 'Schnellversand 24H',
      quantityLabel: 'Menge:',
      tabUsage: 'ANWENDUNGSHINWEISE',
      tabBenefits: 'WIRKUNG & VORTEILE',
      tabIngredients: 'INHALTSSTOFFE (INCI)',
      tabReviews: 'KUNDENMEINUNGEN',
      expertTip: 'Dermatologen-Tipp:',
      precautions: 'Sicherheitshinweise:',
      close: 'Schließen',
      privilege: 'Besonderheit:',
    },
    reviews: {
      sectionTitle: 'Kundenbewertungen & Erfahrungen',
      sectionSubtitle: 'Echte Erfahrungsberichte unserer Kundinnen und Kunden zu den Alps Pure Essence Formeln.',
      verifiedBadge: 'Verifizierter Kauf',
      writeReviewBtn: 'Bewertung Schreiben',
      noReviewsMessage: 'Bislang liegen keine Bewertungen vor. Teilen Sie als Erste/r Ihre Erfahrungen mit diesem Produkt!',
      ratingPrompt: 'Ihre Bewertung für dieses Produkt:',
      nameLabel: 'Ihr vollständiger Name:',
      namePlaceholder: 'Namen eingeben...',
      commentLabel: 'Ausführliche Erfahrung:',
      commentPlaceholder: 'Beschreiben Sie Textur, Duft und spürbare Wirkung auf Ihre Haut...',
      submitBtn: 'Bewertung Absenden',
      thankYou: 'Vielen Dank für Ihre Bewertung! Sie wird nach redaktioneller Prüfung freigeschaltet.',
    },
    footer: {
      brandDesc: 'Pionierarbeit in veganer Dermokosmetik, destilliert in Zürich, Schweiz. Bringt die reine, kristallklare Leuchtkraft Ihrer Haut zur Geltung.',
      branchLabel: 'Filiale HCMC:',
      branchAddress: '30 Trinh Dinh Thao, Tan Phu, Ho Chi Minh Stadt',
      acceptPayment: 'Banküberweisung & Nachnahme:',
      collectionTitle: 'KOLLEKTION',
      supportTitle: 'KUNDENSERVICE',
      hotlineLabel: 'Hotline 24/7:',
      emailLabel: 'E-Mail:',
      websiteLabel: 'Webseite:',
      returnPolicy: '30 Tage Kostenlose Rückgabe',
      shippingPolicy: 'Versicherter Versand mit Tracking',
      fontSwitcher: 'Typografie-Einstellungen',
      brandStoryLink: 'Die Alps Schweizer Markengeschichte',
      allRightsReserved: 'Alle Rechte vorbehalten von Alps Skincare Pure Essence Schweiz.',
      disclaimer: '100% Vegan, frei von Parabenen und ohne Tierversuche zertifiziert.',
    },
  },

  // SPANISH (ESPAÑOL)
  es: {
    announcement: 'NUEVA COLECCIÓN 2026: ENVÍO NACIONAL GRATUITO EN PEDIDOS DESDE 500.000₫ • ESPÁTULA DE PLATA DE REGALO',
    csHotline: 'Atención: 0772 770 134',
    zurichHQ: 'Suiza • Zúrich',
    searchPlaceholder: 'Buscar sérum, crema, tónico...',
    nav: {
      home: 'INICIO',
      catalog: 'COLECCIÓN',
      routine: 'RITUAL',
      story: 'HISTORIA',
      packaging: 'DISEÑO',
      orders: 'PEDIDOS',
      cart: 'BOLSA',
      quiz: 'DIAGNÓSTICO',
      support: 'SOPORTE',
    },
    hero: {
      badge: 'DERMOCOSMÉTICA CELULAR DE GLACIAR SUIZO',
      title1: 'Pureza Absoluta,',
      title2: 'Despierta la Luminosidad de tu Piel.',
      subtitle: 'Destilada de aguas glaciales milenarias de Zermatt y flor de las nieves alpina. Luminosidad atemporal sin artificios.',
      exploreBtn: 'Descubrir Colección',
      quizBtn: 'Test de Diagnóstico Facial',
      statPurity: '99.4%',
      statPurityLabel: 'Origen Natural',
      statCycle: '28 Días',
      statCycleLabel: 'Ciclo de Renovación',
      statVegan: '100%',
      statVeganLabel: 'Vegano Grado Médico',
    },
    ritual: {
      badge: 'RITUAL DE LUMINOSIDAD EN 5 PASOS',
      title: 'El Ritual de Belleza Quiet Luxury',
      desc: 'Momentos de serenidad matutina y nocturna para conectar, reconfortar y revivir la vitalidad natural de tu piel.',
      viewRitualBtn: 'Ver Ritual Completo',
      step1: 'Limpieza Purificante',
      step2: 'Tónico Equilibrante',
      step3: 'Sérum Iluminador',
      step4: 'Crema Regeneradora',
      step5: 'Mascarilla Hidrolifting',
    },
    catalog: {
      badge: '5 OBRAS MAESTRAS DEL CUIDADO FACIAL',
      title: 'Colección Alps Pure Essence',
      subtitle: 'Dermocosmética vegana formulada con agua glacial de Zermatt y células madre botánicas.',
      all: 'TODOS',
      cleanser: 'LIMPIADOR',
      toner: 'TÓNICO FACIAL',
      serum: 'SÉRUM ESENCIA',
      cream: 'CREMA HIDRATANTE',
      mask: 'MASCARILLA',
      addToCart: 'Añadir al Carrito',
      buyNow: 'Comprar Ya',
      detail: 'Detalles',
      sold: 'Vendidos',
      reviews: 'Reseñas',
    },
    brandStory: {
      badge: 'ORÍGENES Y HERENCIA • ALPS PURE ESSENCE',
      title: 'Donde el Tiempo Reposa, Donde la Naturaleza Permanece Pura',
      slogan: 'Pure Essence. Timeless Beauty. — Renueva tu Piel.',
      subtitle: 'Lujo silencioso sin exageraciones. Aprendimos de los Alpes la paciencia eterna del hielo y la roca.',
      tier1: 'Nivel 1 • Brand Story',
      tier2: 'Nivel 2 • Brand Philosophy',
      tier3: 'Nivel 3 • Commitments & Actions',
      readMoreBtn: 'Brand Story',
      exploreCollectionBtn: 'Explorar Colección',
      natureSound: 'Sonido Natural',
      playingSound: 'Sonido de Arroyo Glacial Activo',
    },
    packaging: {
      badge: 'DISEÑO MINIMALISTA EUROPEO',
      title: 'La Elegancia del Cristal Esmerilado y Oro Champán',
      subtitle: 'Frascos de vidrio esmerilado que protegen los principios bio-activos contra los rayos UV.',
      feature1Title: 'Cristal Esmerilado',
      feature1Desc: 'Bloquea el 99% de los rayos UV preservando la frescura pura.',
      feature2Title: 'Tapón Oro Champán',
      feature2Desc: 'Acabado micro-fresado antideslizante con textura prémium.',
      feature3Title: '100% Reciclable',
      feature3Desc: 'Materiales ecológicos con tintas de soja biodegradables.',
      exploreBtn: 'Descubrir Set Completo',
      duoBtn: 'Añadir Dúo Esencial al Carrito',
    },
    cart: {
      title: 'Tu Cesta de Compra',
      emptyTitle: 'Tu cesta está vacía',
      emptyDesc: 'Descubre las creaciones dermocosméticas suizas de Alps para iniciar tu ritual de cuidado personal.',
      continueShopping: 'Seguir Comprando',
      subtotal: 'Subtotal:',
      shipping: 'Envío:',
      freeShipping: 'Envío gratuito',
      total: 'Total:',
      checkoutBtn: 'Tramitar Pedido',
      clearCart: 'Vaciar cesta',
    },
    productDetail: {
      inStock: 'En Stock',
      outOfStock: 'Agotado',
      routineStepLabel: 'PASO DEL RITUAL',
      noReviewsYet: 'Sin reseñas aún (0)',
      writeFirstReview: 'Escribe la primera reseña ↓',
      vatIncluded: 'IVA incluido',
      fastDelivery: 'Envío exprés 24h',
      quantityLabel: 'Cantidad:',
      tabUsage: 'MODO DE EMPLEO',
      tabBenefits: 'BENEFICIOS CLAVE',
      tabIngredients: 'INGREDIENTES COMPLETOS (INCI)',
      tabReviews: 'OPINIONES DE CLIENTES',
      expertTip: 'Consejo Dermatológico:',
      precautions: 'Precauciones de uso:',
      close: 'Cerrar',
      privilege: 'Distinción:',
    },
    reviews: {
      sectionTitle: 'Testimonios y Valoraciones de Clientes',
      sectionSubtitle: 'Experiencias auténticas de clientes que disfrutan del ritual dermocosmético Alps Pure Essence.',
      verifiedBadge: 'Compra Verificada',
      writeReviewBtn: 'Escribir Reseña',
      noReviewsMessage: 'Aún no hay reseñas para este producto. ¡Sé el primero en compartir tu experiencia cutánea!',
      ratingPrompt: 'Tu puntuación para este producto:',
      nameLabel: 'Nombre completo:',
      namePlaceholder: 'Introduce tu nombre...',
      commentLabel: 'Comentario detallado:',
      commentPlaceholder: 'Describe la textura, el aroma y los resultados observados en tu piel...',
      submitBtn: 'Publicar Reseña',
      thankYou: '¡Gracias por compartir tu opinión! Será visible tras su validación.',
    },
    footer: {
      brandDesc: 'Dermocosmética vegana pionera destilada en Zúrich, Suiza. Despierta la luminosidad cristalina y pura de tu piel.',
      branchLabel: 'Sucursal HCMC:',
      branchAddress: '30 Trinh Dinh Thao, Tan Phu, Ciudad Ho Chi Minh',
      acceptPayment: 'Transferencia bancaria y contra reembolso:',
      collectionTitle: 'COLECCIÓN',
      supportTitle: 'ATENCIÓN AL CLIENTE',
      hotlineLabel: 'Línea 24/7:',
      emailLabel: 'Correo:',
      websiteLabel: 'Sitio Web:',
      returnPolicy: 'Devoluciones gratuitas en 30 días',
      shippingPolicy: 'Envío asegurado con seguimiento',
      fontSwitcher: 'Ajustes de Tipografía',
      brandStoryLink: 'Leer la Historia de la Marca Alps',
      allRightsReserved: 'Todos los derechos reservados por Alps Skincare Pure Essence Suiza.',
      disclaimer: 'Formulación 100% vegana, sin parabenos y libre de crueldad animal.',
    },
  },

  // CHINESE (SIMPLIFIED CHINESE - 简体中文)
  zh: {
    announcement: '2026全新系列：全国订单满 500,000₫ 包邮 • 尊享赠送纯银高定护肤勺',
    csHotline: '贵宾热线: 0772 770 134',
    zurichHQ: '瑞士 • 苏黎世',
    searchPlaceholder: '搜索精华、面霜、平衡水...',
    nav: {
      home: '首页',
      catalog: '产品系列',
      routine: '护肤礼仪',
      story: '品牌故事',
      packaging: '包装美学',
      orders: '我的订单',
      cart: '购物袋',
      quiz: '测肤',
      support: '客服热线',
    },
    hero: {
      badge: '瑞士冰川干细胞纯素药妆',
      title1: '纯粹至臻，',
      title2: '唤醒肌肤本源透亮光采。',
      subtitle: '汲取采尔马特千年冰川深层活水与阿尔卑斯高山雪绒花精萃，倾献超越时光的静谧奢华护肤体验。',
      exploreBtn: '探索全系列',
      quizBtn: '开启智能肤质诊断',
      statPurity: '99.4%',
      statPurityLabel: '本源天然成分',
      statCycle: '28天',
      statCycleLabel: '细胞焕新周期',
      statVegan: '100%',
      statVeganLabel: '医药级纯素认证',
    },
    ritual: {
      badge: '五步焕彩护肤礼仪',
      title: '静奢雅致护肤礼仪',
      desc: '晨昏片刻的宁静时光，倾听内心，温柔抚慰并唤醒肌肤的内在新生能量。',
      viewRitualBtn: '查看五步礼仪详情',
      step1: '温和纯净洁面',
      step2: '植萃平衡水',
      step3: '光采焕活精华',
      step4: '新生锁水面霜',
      step5: '水光提拉面膜',
    },
    catalog: {
      badge: '五款瑞士护肤典范之作',
      title: 'Alps Pure Essence 臻选系列',
      subtitle: '融合采尔马特纯净冰川泉水与高山活性植物干细胞的纯素药妆。',
      all: '全部产品',
      cleanser: '温和洁面乳',
      toner: '植萃平衡水',
      serum: '焕彩精华液',
      cream: '新生修护面霜',
      mask: '水光提拉面膜',
      addToCart: '加入购物车',
      buyNow: '立即购买',
      detail: '查看详情',
      sold: '已售',
      reviews: '条评价',
    },
    brandStory: {
      badge: '本源与传承 • ALPS PURE ESSENCE',
      title: '静候时光沉淀，重归纯净本真',
      slogan: 'Pure Essence. Timeless Beauty. — 焕新肌肤，绽放光采。',
      subtitle: '不喧哗，不夸大。我们向阿尔卑斯山脉学习万年冰雪与苍劲岩石的持久坚守。',
      tier1: '第一层 • 品牌故事 (Brand Story)',
      tier2: '第二层 • 品牌哲学 (Brand Philosophy)',
      tier3: '第三层 • 庄严承诺 (Commitments & Actions)',
      readMoreBtn: 'Brand Story',
      exploreCollectionBtn: '探索产品系列',
      natureSound: '自然之声',
      playingSound: '冰川溪流声正在播放',
    },
    packaging: {
      badge: '欧洲极简美学设计',
      title: '磨砂琉璃与香槟金沙的优雅交融',
      subtitle: '哑光磨砂玻璃瓶身，抵御紫外线侵害，封存植物活性细胞的初生鲜活。',
      feature1Title: '沙光磨砂玻璃',
      feature1Desc: '阻隔99%紫外线辐射，持久锁留纯净活性。',
      feature2Title: '香槟金拉丝瓶盖',
      feature2Desc: '瑞士精工微铣工艺，湿手使用依然优雅防滑。',
      feature3Title: '100% 可回收环保',
      feature3Desc: '严选环保生态材质，大豆生物环保油墨印制。',
      exploreBtn: '探索全套五件礼盒',
      duoBtn: '将核心双萃（水+面膜）加入购物车',
    },
    cart: {
      title: '您的专属购物袋',
      emptyTitle: '购物袋空空如也',
      emptyDesc: '探索瑞士阿尔卑斯纯素护肤佳作，开启您的奢润焕采之旅。',
      continueShopping: '继续挑选',
      subtotal: '商品小计:',
      shipping: '配送费用:',
      freeShipping: '尊享包邮',
      total: '合计总额:',
      checkoutBtn: '前往结算',
      clearCart: '清空购物袋',
    },
    productDetail: {
      inStock: '现货发售',
      outOfStock: '暂时售罄',
      routineStepLabel: '礼仪步骤',
      noReviewsYet: '暂无评价 (0)',
      writeFirstReview: '撰写首条评价 ↓',
      vatIncluded: '含增值税',
      fastDelivery: '24小时顺丰特快',
      quantityLabel: '选购数量:',
      tabUsage: '使用礼仪与手法',
      tabBenefits: '核心卓越功效',
      tabIngredients: '全成分列表 (INCI)',
      tabReviews: '用户挚爱评价',
      expertTip: '皮肤科专家建议:',
      precautions: '安全使用注意事项:',
      close: '关闭',
      privilege: '专属礼遇:',
    },
    reviews: {
      sectionTitle: '用户挚爱评价与体验',
      sectionSubtitle: '来自真实用户体验 Alps Pure Essence 瑞士纯素护肤礼仪后的心声分享。',
      verifiedBadge: '官方已核验购买',
      writeReviewBtn: '撰写评价',
      noReviewsMessage: '暂无评价。快来成为第一位分享使用体验的贵宾吧！',
      ratingPrompt: '您对该产品的评分:',
      nameLabel: '您的姓名:',
      namePlaceholder: '输入您的称呼...',
      commentLabel: '详细使用感受:',
      commentPlaceholder: '分享产品的触感质地、天然香气及肌肤上的改变...',
      submitBtn: '提交评价',
      thankYou: '非常感谢您的宝贵评价！审核通过后将正式呈现。',
    },
    footer: {
      brandDesc: '诞生于瑞士苏黎世的先锋纯素药妆品牌，唤醒肌肤深层清透水润光泽。',
      branchLabel: '胡志明市旗舰店:',
      branchAddress: '30 Trinh Dinh Thao, Tan Phu, 胡志明市',
      acceptPayment: '银行转账和货到付款：',
      collectionTitle: '典藏系列',
      supportTitle: '尊享服务',
      hotlineLabel: '客服热线 24/7:',
      emailLabel: '服务邮箱:',
      websiteLabel: '官方网站:',
      returnPolicy: '30天无忧退换货保障',
      shippingPolicy: '全程保价配送与开箱验货',
      fontSwitcher: '字体美学切换',
      brandStoryLink: '阅读瑞士阿尔卑斯品牌故事',
      allRightsReserved: '版权所有 © 瑞士 Alps Skincare Pure Essence。',
      disclaimer: '100% 纯素配方，无防腐剂，坚决拒绝动物实验。',
    },
  },
};
