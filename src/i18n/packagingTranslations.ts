import { SupportedLanguage } from './translations';

export interface PackagingSectionTranslations {
  badge: string;
  title: string;
  subtitle: string;
  imageAlt: string;
  imageBadge: string;
  imageTitle: string;
  imageHighlight: string;
  imageMetric: string;
  philosophyBadge: string;
  duoTitle: string;
  duoDescription: string;
  featuresTitle: string;
  highlights: string[];
  metrics: { value: string; label: string }[];
  buyDuoBtn: string;
  exploreProductsBtn: string;
}

export const PACKAGING_I18N: Record<SupportedLanguage, PackagingSectionTranslations> = {
  vi: {
    badge: 'BỘ ĐÔI THIẾT YẾU • ALPS',
    title: 'Sữa Rửa Mặt & Mặt Nạ Sinh Học ALPS',
    subtitle:
      'Sự kết hợp hoàn hảo giữa bước làm sạch sâu thuần khiết chuẩn pH 5.5 và mặt nạ thạch sinh học Bio-Cellulose Thụy Sĩ. Đánh thức làn da sáng khỏe, thanh khiết và căng mọng sương mai.',
    imageAlt: 'Bộ đôi Sữa Rửa Mặt Dịu Nhẹ và Mặt Nạ Sinh Học ALPS',
    imageBadge: 'ALPS GENTLE CLEANSER & HYDRO-LIFTING MASK',
    imageTitle: 'Bộ Đôi Thiết Yếu: Sữa Rửa Mặt & Mặt Nạ ALPS',
    imageHighlight: 'Sữa Rửa Mặt & Mặt Nạ ALPS',
    imageMetric: 'pH 5.5 & Amino Acid Táo + Bio-Cellulose',
    philosophyBadge: 'TRIẾT LÝ LÀM SẠCH & PHỤC HỒI THỤY SĨ',
    duoTitle: 'Bộ Đôi Chăm Sóc Thiết Yếu ALPS',
    duoDescription:
      'Hai bước cốt lõi đánh thức sức sống làn da: Sữa rửa mặt tạo bọt mịn làm sạch sâu bụi mịn PM2.5, bã nhờn mà vẫn bảo toàn màng ẩm chuẩn pH 5.5; cùng Mặt nạ thạch sinh học Bio-Cellulose dồi dào Tremella Mushroom + Hyaluronic Acid ôm khít khuôn mặt, nâng cơ và phục hồi màng ẩm sinh học sau 20 phút.',
    featuresTitle: 'Đặc Tính Nổi Bật Của Bộ Đôi:',
    highlights: [
      'Sữa Rửa Mặt Dịu Nhẹ ALPS (Gentle Purifying Cleanser 120ml): Hệ làm sạch Amino Acid gốc táo hữu cơ & nước khoáng sông băng Alpine, làm sạch sâu, thông thoáng lỗ chân lông mà không gây khô căng',
      'Mặt Nạ Thạch Sinh Học ALPS (Hydro-Lifting Sheet Mask - Hộp 5 miếng): Màng Bio-Cellulose dồi dào Tremella Mushroom + Hyaluronic Acid & Tảo tuyết đỏ Thụy Sĩ, cấp ẩm sâu gấp 10 lần & nâng cơ săn chắc tức thì',
      'Thủy tinh đúc mờ 2 lớp & sachet màng nhôm bảo quản: Cản 99.8% tia UV, bảo toàn trọn vẹn hoạt tính sinh học tế bào gốc tuyết Thụy Sĩ',
      'Thiết kế tối giản thuần khiết: Tên thương hiệu ALPS và thông tin sản phẩm được dập nhũ vàng champagne ánh kim (Gold Foil) sang trọng trên thân chai thủy tinh mờ và bao bì, giữ trọn thẩm mỹ Quiet Luxury',
    ],
    metrics: [
      { value: 'pH 5.5', label: 'Cân bằng lý tưởng' },
      { value: '10x Ẩm', label: 'Bio-Cellulose' },
      { value: '-4.5°C', label: 'Hạ nhiệt dịu mát' },
    ],
    buyDuoBtn: 'Mua Bộ Đôi (Cleanser + Mask)',
    exploreProductsBtn: 'Khám Phá Sản Phẩm ALPS',
  },

  en: {
    badge: 'ESSENTIAL DUO • ALPS',
    title: 'Alps Gentle Purifying Cleanser & Hydro-Lifting Mask',
    subtitle:
      'The harmonious pairing of biological pH 5.5 purifying cleanse and Swiss Bio-Cellulose hydrogel mask. Deep purifying, instant barrier restoration, and visible contour lift for dewy, glass-like radiance.',
    imageAlt: 'Alps Gentle Purifying Cleanser & Hydro-Lifting Sheet Mask Duo',
    imageBadge: 'ALPS GENTLE CLEANSER & HYDRO-LIFTING MASK',
    imageTitle: 'Essential Duo: Cleanser & Mask Ritual',
    imageHighlight: 'Cleanser & Hydro Mask',
    imageMetric: 'pH 5.5 & Apple Amino Acids + Bio-Cellulose',
    philosophyBadge: 'SWISS PURIFYING & RECOVERY PHILOSOPHY',
    duoTitle: 'Alps Essential Care Duo',
    duoDescription:
      'Two foundational steps to re-awaken skin vitality: our gentle micro-foam cleanser purifies PM2.5 impurities and sebum while preserving the physiological pH 5.5 barrier, followed by the second-skin Bio-Cellulose mask infusing 28ml of concentrated lifting serum in 20 restful minutes.',
    featuresTitle: 'Essential Duo Distinctions:',
    highlights: [
      'Alps Gentle Purifying Cleanser (120ml): Organic apple amino acid micro-foam and Swiss glacial spring water purify pores without tightness or irritation.',
      'Alps Hydro-Lifting Sheet Mask (5-Piece Box): Bio-Cellulose bioculture fermented with Swiss red snow algae, delivering 10x deeper moisture and immediate contour firming.',
      'Double-walled sandblasted frosted glass & light-tight sachets: Deflect 99.8% of damaging UV wavelengths to preserve fresh stem cell efficacy.',
      'Minimalist European quiet luxury: Signature ALPS emblem micro-stamped in brushed champagne gold foil against frosted flacons.',
    ],
    metrics: [
      { value: 'pH 5.5', label: 'Optimal Biological Balance' },
      { value: '10x HA', label: 'Bio-Cellulose Ampoule' },
      { value: '-4.5°C', label: 'Instant Cryo-Calming' },
    ],
    buyDuoBtn: 'Add Essential Duo (Cleanser & Mask) to Cart',
    exploreProductsBtn: 'Explore Alps Collection',
  },

  de: {
    badge: 'ESSENTIELLES DUO • ALPS',
    title: 'Alps Sanfter Reinigungsschaum & Bio-Cellulose Maske',
    subtitle:
      'Die harmonische Verbindung aus porentiefer pH 5.5 Reinigung und Schweizer Bio-Cellulose Tuchmaske. Sanfte Klärung, sofortige Beruhigung und spürbare Straffung für reine Leuchtkraft.',
    imageAlt: 'Alps Sanfter Reinigungsschaum & Hydro-Lifting Maske Duo',
    imageBadge: 'ALPS GENTLE CLEANSER & HYDRO-LIFTING MASK',
    imageTitle: 'Essentielles Duo: Reinigungsschaum & Maske',
    imageHighlight: 'Cleanser & Maske',
    imageMetric: 'pH 5.5 & Apfel-Aminosäuren + Bio-Cellulose',
    philosophyBadge: 'SCHWEIZER REINIGUNGS- & PFLEGEPHILOSOPHIE',
    duoTitle: 'Alps Basispflege-Duo',
    duoDescription:
      'Zwei unverzichtbare Schritte für vitale Haut: Der zarte Mikroschaum-Reiniger befreit die Haut schonend von Partikeln und Talg bei physiologischem pH 5.5; die Bio-Cellulose Maske schmiegt sich wie eine zweite Haut an und festigt die Gesichtskonturen in 20 Minuten.',
    featuresTitle: 'Besondere Eigenschaften des Duos:',
    highlights: [
      'Alps Sanfter Reinigungsschaum (120ml): Bio-Apfel-Aminosäuren und Schweizer Gletscherwasser reinigen gründlich ohne Spannungsgefühl.',
      'Alps Hydro-Lifting Tuchmaske (5 Stück): Bio-Cellulose mit Schweizer Rotalgen-Extrakt liefert 10-fach intensivere Feuchtigkeit und sofortigen Lifting-Effekt.',
      'Sandgestrahltes Doppelwand-Mattglas & UV-Dichte Sachets: Schützen zu 99.8% vor UV-Licht und bewahren die Reinheit der Stammzellen.',
      'Europäisches Minimalistisches Design: Veredelt mit mattem Champagnergold-Heißfolienprägedruck auf samtigem Mattglas.',
    ],
    metrics: [
      { value: 'pH 5.5', label: 'Ideale Balance' },
      { value: '10x Hyaluron', label: 'Bio-Cellulose' },
      { value: '-4.5°C', label: 'Sofortige Kühlung' },
    ],
    buyDuoBtn: 'Duo Kaufen (Cleanser & Maske)',
    exploreProductsBtn: 'Alps Produkte Entdecken',
  },

  es: {
    badge: 'DÚO ESENCIAL • ALPS',
    title: 'Limpiador Purificante y Mascarilla Reafirmante ALPS',
    subtitle:
      'La combinación perfecta entre limpieza profunda equilibrada en pH 5.5 y mascarilla de bio-celulosa suiza. Purificación delicada, alivio instantáneo y contornos reafirmados para un cutis radiante.',
    imageAlt: 'Dúo de Limpiador Facial y Mascarilla Facial ALPS',
    imageBadge: 'ALPS GENTLE CLEANSER & HYDRO-LIFTING MASK',
    imageTitle: 'Dúo Esencial: Limpiador y Mascarilla ALPS',
    imageHighlight: 'Limpiador & Mascarilla',
    imageMetric: 'pH 5.5 y Aminoácidos de Manzana + Bio-Celulosa',
    philosophyBadge: 'FILOSOFÍA SUIZA DE LIMPIEZA Y REPARACIÓN',
    duoTitle: 'Dúo de Cuidado Esencial ALPS',
    duoDescription:
      'Dos pasos clave para revitalizar el rostro: la microespuma limpiadora purifica impurezas y exceso de grasa protegiendo el pH 5.5 fisiológico; la mascarilla de bio-celulosa aporta 28ml de activos tensores en 20 placenteros minutos.',
    featuresTitle: 'Características del Dúo:',
    highlights: [
      'Limpiador Purificante Suave ALPS (120ml): Aminoácidos de manzana orgánica y agua glacial suiza que limpian en profundidad sin sensación tirante.',
      'Mascarilla Hydro-Lifting ALPS (Caja 5 uds): Bio-celulosa fermentada con algas rojas alpinas que aporta 10 veces más hidratación y efecto tensor visible.',
      'Vidrio esmerilado de doble capa y sobres herméticos: Bloquean el 99.8% de los rayos UV protegiendo los bioactivos glaciares.',
      'Diseño minimalista europeo: Tipografía estampada en oro champagne satinado sobre vidrio mate de lujo silencioso.',
    ],
    metrics: [
      { value: 'pH 5.5', label: 'Equilibrio Óptimo' },
      { value: '10x Hialurónico', label: 'Bio-Celulosa' },
      { value: '-4.5°C', label: 'Frescura Calmante' },
    ],
    buyDuoBtn: 'Comprar Dúo (Limpiador + Mascarilla)',
    exploreProductsBtn: 'Explorar Colección ALPS',
  },

  zh: {
    badge: '晨昏净澈修护核心双萃 • ALPS',
    title: '温和氨基酸净透洁面乳与生物纤维冰感紧致面膜',
    subtitle:
      '生理 pH 5.5 温和净透微泡沫与瑞士生物纤维面膜的奢华共鸣。深层洁净毛孔，瞬间抚平脆弱干燥，提拉紧致下颌轮廓，绽现如初雪融汇般的净透水光肌。',
    imageAlt: 'Alps 净透洁面乳与生物纤维冰感紧致面膜礼遇双套',
    imageBadge: 'ALPS GENTLE CLEANSER & HYDRO-LIFTING MASK',
    imageTitle: '核心双萃：净透洁面乳与生物纤维面膜',
    imageHighlight: '净透洁面乳 & 紧致面膜',
    imageMetric: '生理 pH 5.5 & 苹果氨基酸微泡 + 冰感生物纤维',
    philosophyBadge: '瑞士苏黎世精准净澈水润哲学',
    duoTitle: '瑞士 Alps 晨昏核心修护双萃',
    duoDescription:
      '唤醒原生肌理的两个核心步骤：以苹果氨基酸微细云朵泡沫洗净 PM2.5 与油光，呵护弱酸皮脂膜；紧接着敷上如第二层天然皮脂般的生物纤维面膜，整整 28ml 浓缩紧致安瓶在 20 分钟内深度注入肌底。',
    featuresTitle: '核心双萃尊贵配方特质：',
    highlights: [
      'Alps 温和净透洁面乳 (120ml)：有机苹果氨基酸微泡协同古老冰川矿泉水，温和深层清洁毛孔，洗后水润柔滑不紧绷。',
      'Alps 生物纤维冰感紧致面膜 (5片装)：天然椰汁发酵生物纤维膜布，蕴含珍稀瑞士红雪藻与银耳多糖，10倍深层渗透充盈，立现紧塑下颌轮廓。',
      '双层微喷砂哑光厚壁瓶与铝箔避光袋：阻隔 99.8% 紫外光线衰减，完好封存高山雪莲干细胞高生物活性。',
      '瑞士苏黎世极简静奢美学：瓶身采用高级香槟哑金热烫印微雕工艺，雅致耐看，静享低调奢华。',
    ],
    metrics: [
      { value: 'pH 5.5', label: '黄金生理酸碱值' },
      { value: '10x 渗透', label: '生物纤维浓缩安瓶' },
      { value: '-4.5°C', label: '瞬间冰感舒缓降温' },
    ],
    buyDuoBtn: '选购核心双萃组合 (洁面乳 + 面膜)',
    exploreProductsBtn: '探索全线 Alps 典藏产品',
  },
};
