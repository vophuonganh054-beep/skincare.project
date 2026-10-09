import { SupportedLanguage } from './translations';

export interface LocalizedHeroSlide {
  id: string;
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  buttonText: string;
  secondaryNote: string;
  productId?: string;
}

export interface HeroTranslations {
  quizBtn: string;
  dermatologyBadge: string;
  nextSlideLabel: string;
  prevSlideLabel: string;
  nextPeek: string;
  slides: LocalizedHeroSlide[];
}

export const HERO_I18N: Record<SupportedLanguage, HeroTranslations> = {
  vi: {
    quizBtn: 'SOI DA AI (1 PHÚT)',
    dermatologyBadge: 'Dược Mỹ Phẩm Cao Cấp Alps',
    nextSlideLabel: 'Slide tiếp theo',
    prevSlideLabel: 'Slide trước',
    nextPeek: 'Tiếp:',
    slides: [
      {
        id: 'collection',
        badge: 'DƯỢC MỸ PHẨM TẾ BÀO GỐC SÔNG BĂNG THỤY SĨ',
        title: 'Sự Thuần Khiết Tột Cùng, Đánh Thức Làn Da Tỏa Sáng.',
        highlight: 'Pure Essence. Timeless Beauty. — Renew Your Skin. Reveal Your Radiance.',
        subtitle: 'Chắt lọc từ nguồn nước khoáng sông băng Matterhorn cổ đại và thảo mộc tuyết Alps, chuẩn mực dưỡng sáng thanh khiết vượt thời gian.',
        buttonText: 'Khám Phá Bộ Sưu Tập',
        secondaryNote: 'Tuyệt tác Thụy Sĩ',
      },
      {
        id: 'serum-glow',
        badge: 'BEST-SELLER • TINH CHẤT DƯỠNG SÁNG',
        title: 'Alps Radiance Glow Serum',
        highlight: '10% Niacinamide & Hoa Nhung Tuyết Alpine',
        subtitle: 'Mờ thâm sạm sau 14 ngày, mang lại hiệu ứng làn da căng bóng trong veo chuẩn pha lê.',
        buttonText: 'XEM SERUM DƯỠNG SÁNG',
        secondaryNote: 'Hiệu quả sau 14 ngày',
        productId: 'serum-radiance',
      },
      {
        id: 'face-cream',
        badge: 'CẤP ẨM 72H • TẾ BÀO GỐC THỤY SĨ',
        title: 'Alps Regenerating Face Cream',
        highlight: 'Phức Hợp Ceramide Sinh Học 3-6-9',
        subtitle: 'Chất kem nhung mềm mại khóa chặt dưỡng chất, phục hồi rào cản biểu bì và lưu giữ nét thanh xuân.',
        buttonText: 'XEM KEM DƯỠNG TÁI SINH',
        secondaryNote: 'Chất kem nhung mềm',
        productId: 'cream-regenerating',
      },
      {
        id: 'cleanser-purifying',
        badge: 'LÀM SẠCH SÂU • DỊU NHẸ pH 5.5',
        title: 'Alps Gentle Purifying Cleanser',
        highlight: 'Micro-Foam Bọt Mây & Nước Khoáng Sông Băng',
        subtitle: 'Làm sạch sâu bụi mịn PM2.5, cân bằng pH 5.5, mềm mịn màng ẩm tự nhiên mà không khô căng.',
        buttonText: 'XEM SỮA RỬA MẶT',
        secondaryNote: 'Amino Acid dịu nhẹ',
        productId: 'cleanser-gentle-purifying',
      },
      {
        id: 'hydro-mask',
        badge: 'NÂNG CƠ SPA TẠI GIA',
        title: 'Alps Hydro-Lifting Sheet Mask',
        highlight: 'Màng Thạch Bio-Cellulose & Tảo Tuyết Đỏ Thụy Sĩ',
        subtitle: 'Dồi dào Tremella Mushroom + Hyaluronic Acid hạ nhiệt tức thì -4.5°C, ôm khít gương mặt nâng cơ săn chắc.',
        buttonText: 'XEM MẶT NẠ SINH HỌC',
        secondaryNote: 'Hộp 5 miếng x 29g',
        productId: 'mask-hydro-lifting',
      },
    ],
  },

  en: {
    quizBtn: 'AI SKIN DIAGNOSTIC (1 MIN)',
    dermatologyBadge: 'Swiss Luxury Dermocosmetics',
    nextSlideLabel: 'Next slide',
    prevSlideLabel: 'Previous slide',
    nextPeek: 'Next:',
    slides: [
      {
        id: 'collection',
        badge: 'SWISS GLACIAL STEM CELL DERMOCOSMETICS',
        title: 'Ultimate Purity, Awakening Your Luminous Radiance.',
        highlight: 'Pure Essence. Timeless Beauty. — Renew Your Skin. Reveal Your Radiance.',
        subtitle: 'Distilled from ancient Matterhorn glacier spring water and alpine edelweiss, delivering timeless botanical radiance.',
        buttonText: 'Explore Collection',
        secondaryNote: 'Swiss Masterpiece',
      },
      {
        id: 'serum-glow',
        badge: 'BEST-SELLER • RADIANCE ESSENCE',
        title: 'Alps Radiance Glow Serum',
        highlight: '10% Niacinamide & Alpine Edelweiss Stem Cells',
        subtitle: 'Clinically evens skin tone in 14 days, revealing crystal glass-skin translucency with zero sticky residue.',
        buttonText: 'DISCOVER GLOW SERUM',
        secondaryNote: '14-Day Proven Efficacy',
        productId: 'serum-radiance',
      },
      {
        id: 'face-cream',
        badge: '72H HYDRATION • CELLULAR STEM CELLS',
        title: 'Alps Regenerating Face Cream',
        highlight: 'Bio-Ceramide Complex 3-6-9',
        subtitle: 'Silky velvet cream restores skin barrier resilience and seals hydration for 72 continuous hours.',
        buttonText: 'DISCOVER FACE CREAM',
        secondaryNote: 'Velvet Soft Finish',
        productId: 'cream-regenerating',
      },
      {
        id: 'cleanser-purifying',
        badge: 'DEEP CLEANSING • GENTLE pH 5.5',
        title: 'Alps Gentle Purifying Cleanser',
        highlight: 'Botanical Micro-Foam & Glacial Spring Water',
        subtitle: 'Deeply clears PM2.5 pollutants and oil while respecting skin’s lipid barrier with zero tightness.',
        buttonText: 'DISCOVER CLEANSER',
        secondaryNote: 'Organic Apple Amino Acid',
        productId: 'cleanser-gentle-purifying',
      },
      {
        id: 'hydro-mask',
        badge: 'HOME SPA CELLULAR LIFT',
        title: 'Alps Hydro-Lifting Sheet Mask',
        highlight: 'Bio-Cellulose Membrane & Swiss Red Snow Algae',
        subtitle: 'Infuses 28ml of Tremella Mushroom + Hyaluronic Acid, cools skin by -4.5°C and visibly lifts facial contours.',
        buttonText: 'DISCOVER SHEET MASK',
        secondaryNote: '5-Piece Luxury Box',
        productId: 'mask-hydro-lifting',
      },
    ],
  },

  de: {
    quizBtn: 'AI-HAUTANALYSE (1 MIN.)',
    dermatologyBadge: 'Schweizer Luxus-Dermokosmetik',
    nextSlideLabel: 'Nächste Folie',
    prevSlideLabel: 'Vorherige Folie',
    nextPeek: 'Weiter:',
    slides: [
      {
        id: 'collection',
        badge: 'SCHWEIZER GLETSCHER-STAMMZELLEN DERMOKOSMETIK',
        title: 'Reine Vollkommenheit, Die Ihre Haut Zum Strahlen Bringt.',
        highlight: 'Pure Essence. Timeless Beauty. — Renew Your Skin. Reveal Your Radiance.',
        subtitle: 'Gewonnen aus uraltem Matterhorn-Gletscherwasser und Alpen-Edelweiss für zeitlose Reinheit.',
        buttonText: 'Kollektion Entdecken',
        secondaryNote: 'Schweizer Meisterwerk',
      },
      {
        id: 'serum-glow',
        badge: 'BESTSELLER • LEUCHTKRAFT-SERUM',
        title: 'Alps Radiance Glow Serum',
        highlight: '10% Niacinamid & Alpen-Edelweiss',
        subtitle: 'Sichtbare Milderung von Pigmentflecken nach 14 Tagen für einen ebenmäßigen, kristallklaren Teint.',
        buttonText: 'SERUM ENTDECKEN',
        secondaryNote: 'Sichtbar nach 14 Tagen',
        productId: 'serum-radiance',
      },
      {
        id: 'face-cream',
        badge: '72H HYDRATISIERUNG • ZELLULÄRE REGENERATION',
        title: 'Alps Regenerating Face Cream',
        highlight: 'Biomimetischer Ceramid-Komplex 3-6-9',
        subtitle: 'Samtige Creme stärkt die Hautbarriere und schützt die Haut nachhaltig über 72 Stunden.',
        buttonText: 'CREME ENTDECKEN',
        secondaryNote: 'Samtweiches Finish',
        productId: 'cream-regenerating',
      },
      {
        id: 'cleanser-purifying',
        badge: 'TIEFENREINIGUNG • SANFTER pH 5.5',
        title: 'Alps Gentle Purifying Cleanser',
        highlight: 'Mikroschaum & Schweizer Gletscherwasser',
        subtitle: 'Entfernt Feinstaub und überschüssigen Talg schonend ohne Spannungsgefühl nach der Reinigung.',
        buttonText: 'REINIGER ENTDECKEN',
        secondaryNote: 'Milde Aminosäuren',
        productId: 'cleanser-gentle-purifying',
      },
      {
        id: 'hydro-mask',
        badge: 'LIFTING-SPA FÜR ZUHAUSE',
        title: 'Alps Hydro-Lifting Sheet Mask',
        highlight: 'Bio-Cellulose & Schweizer Rotalgen',
        subtitle: 'Kühlt um -4.5°C und spendet intensive Feuchtigkeit für straffe, frische Gesichtskonturen.',
        buttonText: 'MASKE ENTDECKEN',
        secondaryNote: 'Box mit 5 Stück à 29g',
        productId: 'mask-hydro-lifting',
      },
    ],
  },

  es: {
    quizBtn: 'DIAGNÓSTICO FACIAL AI (1 MIN)',
    dermatologyBadge: 'Dermocosmética Suiza de Lujo',
    nextSlideLabel: 'Siguiente diapositiva',
    prevSlideLabel: 'Diapositiva anterior',
    nextPeek: 'Sig:',
    slides: [
      {
        id: 'collection',
        badge: 'DERMOCOSMÉTICA DE CÉLULAS MADRE GLACIARES SUIZAS',
        title: 'La Pureza Suprema Que Despierta La Luminosidad De Su Piel.',
        highlight: 'Pure Essence. Timeless Beauty. — Renew Your Skin. Reveal Your Radiance.',
        subtitle: 'Elaborada con agua de glaciares del Cervino y edelweiss alpino para un brillo botánico atemporal.',
        buttonText: 'Explorar Colección',
        secondaryNote: 'Obra Maestra Suiza',
      },
      {
        id: 'serum-glow',
        badge: 'MÁS VENDIDO • SÉRUM ILUMINADOR',
        title: 'Alps Radiance Glow Serum',
        highlight: '10% Niacinamida & Edelweiss Alpino',
        subtitle: 'Atenúa manchas en 14 días para una piel translúcida y radiante con acabado cero pegajoso.',
        buttonText: 'VER SÉRUM ILUMINADOR',
        secondaryNote: 'Eficacia en 14 días',
        productId: 'serum-radiance',
      },
      {
        id: 'face-cream',
        badge: 'HIDRATACIÓN 72H • CÉLULAS MADRE VEGETALES',
        title: 'Alps Regenerating Face Cream',
        highlight: 'Complejo de Ceramidas Biológicas 3-6-9',
        subtitle: 'Crema aterciopelada que recupera la barrera cutánea y sella la humedad durante 72 horas.',
        buttonText: 'VER CREMA FACIAL',
        secondaryNote: 'Tacto Aterciopelado',
        productId: 'cream-regenerating',
      },
      {
        id: 'cleanser-purifying',
        badge: 'LIMPIEZA PROFUNDA • SUAVIDAD pH 5.5',
        title: 'Alps Gentle Purifying Cleanser',
        highlight: 'Microespuma Botánica & Agua Glacial',
        subtitle: 'Limpia la polución PM2.5 y el exceso de grasa protegiendo el manto hidrolipídico sin tirantez.',
        buttonText: 'VER LIMPIADOR FACIAL',
        secondaryNote: 'Aminoácidos Suaves',
        productId: 'cleanser-gentle-purifying',
      },
      {
        id: 'hydro-mask',
        badge: 'SPA FACIAL TENSOR EN CASA',
        title: 'Alps Hydro-Lifting Sheet Mask',
        highlight: 'Bio-Celulosa & Algas Rojas Suizas',
        subtitle: 'Ácido hialurónico concentrado que refresca -4.5°C y aporta un efecto lifting visible.',
        buttonText: 'VER MASCARILLA BIO-CELULOSA',
        secondaryNote: 'Caja 5 uds x 29g',
        productId: 'mask-hydro-lifting',
      },
    ],
  },

  zh: {
    quizBtn: 'AI 智能测肤 (仅需1分钟)',
    dermatologyBadge: '瑞士高定纯素药妆',
    nextSlideLabel: '下一张',
    prevSlideLabel: '上一张',
    nextPeek: '下款:',
    slides: [
      {
        id: 'collection',
        badge: '瑞士冰川雪山干细胞先锋药妆',
        title: '纯净至简，唤醒肌肤无瑕晶透之光。',
        highlight: 'Pure Essence. Timeless Beauty. — Renew Your Skin. Reveal Your Radiance.',
        subtitle: '凝练马特洪峰万年冰川活泉与阿尔卑斯高山雪绒花，缔造超越时光的澄澈水润肌理。',
        buttonText: '探索全线典藏系列',
        secondaryNote: '瑞士至臻工艺',
      },
      {
        id: 'serum-glow',
        badge: '断货王 • 晶透水光焕亮精华',
        title: 'Alps Radiance Glow Serum',
        highlight: '10% 医药级高纯烟酰胺 & 雪绒花干细胞',
        subtitle: '14天显著淡褪痘印与暗沉黄气，呈现清透琉璃水光肌，清爽吸收不粘腻。',
        buttonText: '探索水光焕亮精华',
        secondaryNote: '14天见证通透改善',
        productId: 'serum-radiance',
      },
      {
        id: 'face-cream',
        badge: '72小时锁水充盈 • 冰川植物干细胞',
        title: 'Alps Regenerating Face Cream',
        highlight: '瑞士仿生神经酰胺复合物 3-6-9',
        subtitle: '如丝绒般轻覆肌理，深度封存活性滋养，筑起长达72小时强韧屏障。',
        buttonText: '探索高能修复面霜',
        secondaryNote: '丝绒触感哑光柔护',
        productId: 'cream-regenerating',
      },
      {
        id: 'cleanser-purifying',
        badge: '微米级深层净澈 • 弱酸 pH 5.5',
        title: 'Alps Gentle Purifying Cleanser',
        highlight: '云朵密泡 & 古老冰川活泉水',
        subtitle: '深入毛孔洗净 PM2.5 微细颗粒与过剩皮脂，洗后水润弹嫩不假滑不紧绷。',
        buttonText: '探索温和洁面慕斯',
        secondaryNote: '有机苹果氨基酸表活',
        productId: 'cleanser-gentle-purifying',
      },
      {
        id: 'hydro-mask',
        badge: '院线级居家冰感提拉 SPA',
        title: 'Alps Hydro-Lifting Sheet Mask',
        highlight: '天然椰汁生物纤维 & 瑞士红雪藻',
        subtitle: '整整 28ml 浓缩安瓶注入，瞬间降低表皮温度 -4.5°C，饱满充盈下颌紧致轮廓。',
        buttonText: '探索生物纤维面膜',
        secondaryNote: '独立奢宠装 5片 x 29g',
        productId: 'mask-hydro-lifting',
      },
    ],
  },
};
