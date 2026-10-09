import { SupportedLanguage } from './translations';

export interface LocalizedRoutineStep {
  step: number;
  productId: string;
  name: string;
  categoryName: string;
  time: string;
  desc: string;
}

export interface RitualTranslations {
  modalBadge: string;
  modalTitle: (count: number) => string;
  modalSubtitle: string;
  steps: LocalizedRoutineStep[];
  specialOfferBadge: (count: number) => string;
  savingsBadge: string;
  giftNote: string;
  addFullSetBtn: string;
  buyFullSetBtn: string;
  viewDetailBtn: string;
  freeGifts: string;
}

export const RITUAL_I18N: Record<SupportedLanguage, RitualTranslations> = {
  vi: {
    modalBadge: 'NGHI THỨC ALPS RITUAL',
    modalTitle: (count) => `Nghi Thức Dưỡng Sáng Tự Nhiên ${count} Bước`,
    modalSubtitle:
      'Thiết kế dựa trên nhịp sinh học biểu bì da, kết hợp tinh chất thực vật sông băng và công nghệ tế bào gốc Thụy Sĩ nhằm phục hồi ánh sáng tự nhiên sau 28 ngày chu kỳ tế bào.',
    steps: [
      {
        step: 1,
        productId: 'cleanser-gentle-purifying',
        name: 'Alps Gentle Purifying Cleanser',
        categoryName: 'Sữa Rửa Mặt Bọt Mịn Dịu Nhẹ',
        time: 'Sáng & Tối',
        desc: 'Làm sạch sâu bụi mịn PM2.5, bã nhờn dư thừa với lớp bọt micro-foam siêu mịn, giữ nguyên màng ẩm tự nhiên pH 5.5.',
      },
      {
        step: 2,
        productId: 'toner-botanical',
        name: 'Alps Botanical Balancing Toner',
        categoryName: 'Nước Cân Bằng Thảo Mộc',
        time: 'Sáng & Tối',
        desc: 'Phục hồi độ pH sinh học chuẩn 5.5, làm dịu da tức thì và se khít lỗ chân lông với nước khoáng sông băng Thụy Sĩ.',
      },
      {
        step: 3,
        productId: 'serum-radiance',
        name: 'Alps Radiance Glow Serum',
        categoryName: 'Serum Dưỡng Sáng Mờ Thâm',
        time: 'Sáng & Tối',
        desc: 'Đều màu da sau 14 ngày với chiết xuất hoa tuyết Alpine, 5% Niacinamide tinh khiết và HA đa tầng.',
      },
      {
        step: 4,
        productId: 'cream-regenerating',
        name: 'Alps Regenerating Face Cream',
        categoryName: 'Kem Dưỡng Tái Sinh 72H',
        time: 'Sáng & Tối',
        desc: 'Khóa chặt dưỡng chất với Ceramide Complex 3-6-9 sinh học và bơ hạt mỡ, bảo vệ và khóa ẩm liên tục 72 giờ.',
      },
      {
        step: 5,
        productId: 'mask-hydro-lifting',
        name: 'Alps Hydro-Lifting Sheet Mask',
        categoryName: 'Mặt Nạ Thạch Sinh Học',
        time: '2 - 3 lần/tuần',
        desc: 'Bổ sung dồi dào Tremella Mushroom + Hyaluronic Acid với mặt nạ Bio-Cellulose, nâng cơ săn chắc tức thì.',
      },
    ],
    specialOfferBadge: (count) => `ƯU ĐÃI TRỌN BỘ RITUAL ${count} SẢN PHẨM`,
    savingsBadge: 'Tiết kiệm 200.000₫',
    giftNote: 'Tặng kèm thìa bạc cao cấp & túi nhung Alps độc quyền.',
    addFullSetBtn: 'THÊM TRỌN BỘ VÀO GIỎ',
    buyFullSetBtn: 'MUA NGAY TRỌN BỘ',
    viewDetailBtn: 'Xem chi tiết',
    freeGifts: 'Thìa bạc cao cấp & Túi nhung Alps',
  },

  en: {
    modalBadge: 'THE ALPS RITUAL',
    modalTitle: (count) => `5-Step Botanical Radiance Ritual`,
    modalSubtitle:
      'Engineered around epidermal circadian biorhythms, uniting glacial spring water and Swiss botanical stem cell science to re-awaken your skin’s innate luminosity over a 28-day cellular renewal cycle.',
    steps: [
      {
        step: 1,
        productId: 'cleanser-gentle-purifying',
        name: 'Alps Gentle Purifying Cleanser',
        categoryName: 'Micro-Foam Purifying Wash',
        time: 'Morning & Evening',
        desc: 'Deeply purges PM2.5 pollutants and excess sebum with an ultra-dense botanical cloud foam while safeguarding your skin’s pH 5.5 lipid barrier.',
      },
      {
        step: 2,
        productId: 'toner-botanical',
        name: 'Alps Botanical Balancing Toner',
        categoryName: 'Hydrating Botanical Essence Water',
        time: 'Morning & Evening',
        desc: 'Restores ideal pH 5.5, instantly comforts reactive skin, and refines pores with trace mineral-rich Swiss Alpine glacial water.',
      },
      {
        step: 3,
        productId: 'serum-radiance',
        name: 'Alps Radiance Glow Serum',
        categoryName: 'Cellular Radiance Essence',
        time: 'Morning & Evening',
        desc: 'Clinically evens skin tone in 14 days with Alpine edelweiss stem cells, 5% pharmaceutical-grade Niacinamide, and multi-depth HA.',
      },
      {
        step: 4,
        productId: 'cream-regenerating',
        name: 'Alps Regenerating Face Cream',
        categoryName: '72H Barrier Recovery Cream',
        time: 'Morning & Evening',
        desc: 'Locks in deep nourishment with bio-mimetic Ceramide Complex 3-6-9 and organic shea butter for unbroken 72-hour moisture.',
      },
      {
        step: 5,
        productId: 'mask-hydro-lifting',
        name: 'Alps Hydro-Lifting Sheet Mask',
        categoryName: 'Bio-Cellulose Ampoule Mask',
        time: '2 - 3 Times Weekly',
        desc: 'Infuses 28ml of concentrated cellular ampoule via second-skin Bio-Cellulose to deliver immediate cooling and firming contour lift.',
      },
    ],
    specialOfferBadge: (count) => `SPECIAL ${count}-PIECE RITUAL BUNDLE OFFER`,
    savingsBadge: 'Save 200,000₫ / $8',
    giftNote: 'Includes complimentary custom silver skincare spatula & velvet Alps pouch.',
    addFullSetBtn: 'ADD FULL SET TO BAG',
    buyFullSetBtn: 'BUY FULL SET NOW',
    viewDetailBtn: 'View Details',
    freeGifts: 'Complimentary silver spatula & Alps velvet pouch',
  },

  de: {
    modalBadge: 'DAS ALPS RITUAL',
    modalTitle: (count) => `Natürliches 5-Stufen Leuchtkraft-Ritual`,
    modalSubtitle:
      'Abgestimmt auf die zelluläre Biorhythmik der Haut. Verbindet reines Schweizer Gletscherwasser mit edelster Pflanzenbiotechnologie zur Wiederherstellung natürlicher Strahlkraft in 28 Tagen.',
    steps: [
      {
        step: 1,
        productId: 'cleanser-gentle-purifying',
        name: 'Alps Gentle Purifying Cleanser',
        categoryName: 'Sanfter Reinigender Schaum',
        time: 'Morgens & Abends',
        desc: 'Befreit die Haut sanft von Feinstaub und überschüssigem Talg mit cremigem Mikroschaum bei hautschonendem pH-Wert 5.5.',
      },
      {
        step: 2,
        productId: 'toner-botanical',
        name: 'Alps Botanical Balancing Toner',
        categoryName: 'Botanisches Gesichtswasser',
        time: 'Morgens & Abends',
        desc: 'Stellt den idealen pH-Wert 5.5 wieder her, beruhigt sensible Haut sofort und verfeinert Poren mit Zermatter Gletscherquellwasser.',
      },
      {
        step: 3,
        productId: 'serum-radiance',
        name: 'Alps Radiance Glow Serum',
        categoryName: 'Leuchtkraft-Serum',
        time: 'Morgens & Abends',
        desc: 'Sorgt für einen ebenmäßigen Teint nach 14 Tagen mit Edelweiss-Stammzellen, 5% Niacinamid und multi-molekularer Hyaluronsäure.',
      },
      {
        step: 4,
        productId: 'cream-regenerating',
        name: 'Alps Regenerating Face Cream',
        categoryName: '72H Regenerations-Creme',
        time: 'Morgens & Abends',
        desc: 'Versiegelt Feuchtigkeit mit biomimetischem Ceramid-Komplex 3-6-9 und Bio-Sheabutter für 72 Stunden intensive Tiefenpflege.',
      },
      {
        step: 5,
        productId: 'mask-hydro-lifting',
        name: 'Alps Hydro-Lifting Sheet Mask',
        categoryName: 'Bio-Cellulose Tuchmaske',
        time: '2 - 3 Mal wöchentlich',
        desc: 'Intensive Ampullenpflege mit Bio-Cellulose für spürbare Festigung und sofortige Kühlung um -4.5°C.',
      },
    ],
    specialOfferBadge: (count) => `KOMPLETT-SET VORTEILSANGEBOT (${count} PRODUKTE)`,
    savingsBadge: '200.000₫ / ca. 8€ sparen',
    giftNote: 'Inklusive luxuriösem Silberspatel & Alps Samtetui.',
    addFullSetBtn: 'KOMPLETT-SET IN DEN WARENKORB',
    buyFullSetBtn: 'JETZT IM SET KAUFEN',
    viewDetailBtn: 'Details ansehen',
    freeGifts: 'Kostenloser Silberspatel & Alps Samtetui',
  },

  es: {
    modalBadge: 'EL RITUAL ALPS',
    modalTitle: (count) => `Ritual de Luminosidad Botánica en 5 Pasos`,
    modalSubtitle:
      'Diseñado conforme a los biorritmos celulares de la piel, uniendo agua de glaciares suizos y células madre alpinas para recuperar la luz natural en un ciclo de 28 días.',
    steps: [
      {
        step: 1,
        productId: 'cleanser-gentle-purifying',
        name: 'Alps Gentle Purifying Cleanser',
        categoryName: 'Limpiador Purificante en Espuma',
        time: 'Mañana y Noche',
        desc: 'Purifica profundamente la piel de polución PM2.5 y exceso de sebo sin agredir el manto hidrolipídico con pH 5.5.',
      },
      {
        step: 2,
        productId: 'toner-botanical',
        name: 'Alps Botanical Balancing Toner',
        categoryName: 'Tónico Botánico Equilibrante',
        time: 'Mañana y Noche',
        desc: 'Reequilibra el pH natural 5.5, calma al instante la piel sensible y afina los poros con agua glacial suiza.',
      },
      {
        step: 3,
        productId: 'serum-radiance',
        name: 'Alps Radiance Glow Serum',
        categoryName: 'Sérum Iluminador Celular',
        time: 'Mañana y Noche',
        desc: 'Unifica el tono cutáneo en 14 días gracias a células madre de edelweiss alpino, 5% de niacinamida pura y ácido hialurónico.',
      },
      {
        step: 4,
        productId: 'cream-regenerating',
        name: 'Alps Regenerating Face Cream',
        categoryName: 'Crema Regeneradora 72H',
        time: 'Mañana y Noche',
        desc: 'Sella los activos con Complejo de Ceramidas 3-6-9 y manteca de karité para una protección continua de 72 horas.',
      },
      {
        step: 5,
        productId: 'mask-hydro-lifting',
        name: 'Alps Hydro-Lifting Sheet Mask',
        categoryName: 'Mascarilla Bio-Celulosa Reafirmante',
        time: '2 - 3 veces por semana',
        desc: 'Infundida con 28ml de concentrado para un efecto tensor inmediato y frescura calmante de -4.5°C.',
      },
    ],
    specialOfferBadge: (count) => `OFERTA EXCLUSIVA RITUAL COMPLETO (${count} PRODUCTOS)`,
    savingsBadge: 'Ahorro de 200.000₫',
    giftNote: 'Incluye espátula plateada de precisión y estuche de terciopelo Alps.',
    addFullSetBtn: 'AÑADIR TODO EL RITUAL A LA BOLSA',
    buyFullSetBtn: 'COMPRAR RITUAL COMPLETO',
    viewDetailBtn: 'Ver detalles',
    freeGifts: 'Espátula plateada y estuche de terciopelo Alps',
  },

  zh: {
    modalBadge: 'ALPS 纯素美肌礼仪',
    modalTitle: (count) => `瑞士冰川植萃焕亮 ${count} 步典藏礼仪`,
    modalSubtitle:
      '遵循肌肤生理昼夜节律设计，将古老马特洪峰冰川矿泉水与阿尔卑斯高山雪绒花干细胞科技相融，在28天细胞新生周期内唤醒肌肤无瑕晶透光芒。',
    steps: [
      {
        step: 1,
        productId: 'cleanser-gentle-purifying',
        name: 'Alps Gentle Purifying Cleanser',
        categoryName: '温和净澈洁面慕斯',
        time: '早晚每日使用',
        desc: '微米级丰盈云朵泡沫，深入毛孔净澈 PM2.5 悬浮颗粒与多余油脂，牢牢锁住天然皮脂膜 pH 5.5 水润平衡。',
      },
      {
        step: 2,
        productId: 'toner-botanical',
        name: 'Alps Botanical Balancing Toner',
        categoryName: '高山植萃平衡赋活水',
        time: '早晚每日使用',
        desc: '迅速回归理想生理 pH 5.5，以采自采尔马特的冰川高矿物泉水瞬间安抚泛红干痒，细腻收敛紧致毛孔。',
      },
      {
        step: 3,
        productId: 'serum-radiance',
        name: 'Alps Radiance Glow Serum',
        categoryName: '雪花干细胞水光焕亮精华',
        time: '早晚每日使用',
        desc: '雪绒花干细胞结合 5% 医药级高纯烟酰胺与多重透明质酸，14天淡化痘印色沉，呈现透光清润琉璃肌。',
      },
      {
        step: 4,
        productId: 'cream-regenerating',
        name: 'Alps Regenerating Face Cream',
        categoryName: '72小时高能屏障修复面霜',
        time: '早晚每日使用',
        desc: '仿生神经酰胺复合物 3-6-9 协同有机乳木果油，丝绒触感深度封存营养，构筑持续长达 72 小时的保护屏障。',
      },
      {
        step: 5,
        productId: 'mask-hydro-lifting',
        name: 'Alps Hydro-Lifting Sheet Mask',
        categoryName: '生物纤维冰感紧致面膜',
        time: '每周 2 - 3 次',
        desc: '整整 28ml 浓缩安瓶注入第二层肌肤般服帖的椰汁生物纤维膜，瞬间为肌肤降温 -4.5°C 并充盈饱满轮廓。',
      },
    ],
    specialOfferBadge: (count) => `尊享全套 ${count} 件礼仪典藏特惠`,
    savingsBadge: '立省 200,000₫',
    giftNote: '随单附赠高定银质护肤勺与瑞士 Alps 天鹅绒收纳袋。',
    addFullSetBtn: '整套加入购物袋',
    buyFullSetBtn: '立即选购整套',
    viewDetailBtn: '查看详情',
    freeGifts: '高定银质护肤勺 & Alps 天鹅绒收纳袋',
  },
};
