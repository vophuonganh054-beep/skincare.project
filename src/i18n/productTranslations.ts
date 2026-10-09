import { SupportedLanguage } from './translations';

export interface DetailedUsageStepTranslation {
  step: number;
  title: string;
  description: string;
}

export interface DetailedUsageTranslation {
  timing: string;
  amount: string;
  suitableFor: string;
  steps: DetailedUsageStepTranslation[];
  expertTip: string;
  precautions?: string;
}

export interface LocalizedProductData {
  name: string;
  shortName: string;
  categoryLabel: string;
  tag: string;
  subtitle: string;
  description: string;
  keyIngredients: string[];
  benefits: string[];
  usage: string;
  routineStepTitle: string;
  stockStatus: string;
  expertTip: string;
  note?: string;
  detailedUsage?: DetailedUsageTranslation;
}

const CLEANSER_DATA: Record<SupportedLanguage, LocalizedProductData> = {
  vi: {
    name: 'Alps Gentle Purifying Cleanser',
    shortName: 'Gentle Purifying Cleanser',
    categoryLabel: 'SỮA RỬA MẶT',
    tag: 'LÀM SẠCH SÂU',
    subtitle: 'Purifying Foaming Wash - Bọt mịn dịu nhẹ, sạch sâu',
    description: 'Sữa rửa mặt tạo bọt dịu nhẹ Alps Gentle Purifying Cleanser với lớp bọt bông micro-foam siêu mịn, giúp làm sạch sâu bụi mịn PM2.5, bã nhờn và cặn trang điểm mà vẫn duy trì độ ẩm tự nhiên, không gây cảm giác khô căng sau khi rửa.',
    keyIngredients: [
      'Hệ chất hoạt động bề mặt Amino Acid gốc táo hữu cơ',
      'Nước khoáng sông băng Alpine Thụy Sĩ giàu khoáng chất vi lượng',
      'Chiết xuất hoa nhung tuyết Edelweiss Thụy Sĩ',
      'Phức hợp Tremella Mushroom + Hyaluronic Acid bảo toàn độ ẩm sinh học',
    ],
    benefits: [
      'Làm sạch sâu bụi mịn và bã nhờn mà không phá vỡ màng ẩm sinh học',
      'Độ pH 5.5 cân bằng lý tưởng cho mọi loại da, kể cả da nhạy cảm',
      'Bọt mịn xốp như mây, giảm tối đa ma sát tổn thương bề mặt da',
      'Bảo toàn độ ẩm tự nhiên, không gây cảm giác khô căng sau khi rửa',
    ],
    usage: 'Lấy lượng cỡ hạt đậu ra lòng bàn tay ướt, xoa tạo bọt dày mịn. Massage nhẹ nhàng toàn mặt trong 60 giây và rửa sạch lại với nước ấm.',
    routineStepTitle: 'Làm Sạch Thuần Khiết',
    stockStatus: 'Còn hàng',
    expertTip: 'Rửa mặt đúng 60 giây là thời gian vàng để hoạt chất amino acid phát huy tối đa công năng làm sạch mà không gây khô da.',
    note: 'Purifying Foaming Wash',
    detailedUsage: {
      timing: 'Buổi Sáng & Buổi Tối hàng ngày',
      amount: 'Khoảng 1 hạt đậu lớn hoặc 1 - 2 lần nhấn vòi',
      suitableFor: 'Mọi loại da, bao gồm da dầu mụn, da khô mất nước, da nhạy cảm và mẹ bầu',
      steps: [
        {
          step: 1,
          title: 'Làm ướt & Đánh bọt',
          description: 'Rửa sạch hai bàn tay. Làm ướt khuôn mặt bằng nước ấm nhẹ. Lấy lượng vừa đủ ra lòng bàn tay ướt, xoa đều 15-20 giây để kích hoạt lớp bọt micro-foam bồng bềnh.',
        },
        {
          step: 2,
          title: 'Massage làm sạch vùng chữ T',
          description: 'Áp lớp bọt mịn lên mặt, massage nhẹ nhàng vùng chữ T (trán, mũi, cằm) theo hình xoắn ốc trong 30 giây để cuốn trôi bụi mịn PM2.5 và bã nhờn.',
        },
        {
          step: 3,
          title: 'Làm sạch vùng má & cổ',
          description: 'Lướt nhẹ bọt sang hai bên má và vùng cổ theo chiều nâng cơ trong 20 giây. Không chà xát mạnh để bảo vệ lớp màng lipid.',
        },
        {
          step: 4,
          title: 'Rửa sạch & Thấm khô',
          description: 'Xả sạch với nước mát hoặc nước ấm nhẹ. Dùng khăn bông mềm thấm nhẹ, để da ẩm tự nhiên sẵn sàng cho bước toner.',
        },
      ],
      expertTip: 'Tránh dùng nước quá nóng. Rửa mặt đúng 60 giây là thời gian vàng để amino acid làm sạch dịu nhẹ tối ưu.',
      precautions: 'Tránh để bọt dính trực tiếp vào mắt. Nếu dính vào mắt, hãy rửa kỹ bằng nước sạch.',
    },
  },
  en: {
    name: 'Alps Gentle Purifying Cleanser',
    shortName: 'Gentle Purifying Cleanser',
    categoryLabel: 'CLEANSER',
    tag: 'DEEP CLEANSING',
    subtitle: 'Purifying Foaming Wash - Micro-dense cloud foam, gentle deep clean',
    description: 'Alps Gentle Purifying Cleanser creates an ultra-dense botanical micro-foam that deeply purges PM2.5 pollutants, excess sebum, and light cosmetics while safeguarding your skin’s delicate lipid barrier with zero tightness.',
    keyIngredients: [
      'Organic Apple-derived Amino Acid surfactant complex',
      'Ancient Swiss Alpine glacial mineral water rich in trace minerals',
      'Bio-active Swiss Edelweiss flower stem cell extract',
      'Tremella Fuciformis (Snow Mushroom) + Dual Hyaluronic hydration matrix',
    ],
    benefits: [
      'Deeply cleanses pores and impurities without stripping vital moisture',
      'Biomimetic pH 5.5 balance, perfectly suitable for sensitive and sensitized skin',
      'Silky cloud-foam cushioning minimizes mechanical friction during washing',
      'Preserves cellular moisture, leaving skin supple, fresh, and luminous',
    ],
    usage: 'Dispense a pea-sized amount onto wet palms, lather into rich micro-foam, massage gently across face for 60 seconds, and rinse with lukewarm water.',
    routineStepTitle: 'Gentle Purifying',
    stockStatus: 'In Stock',
    expertTip: '60 seconds of gentle circular massage allows apple amino acids to naturally solubilize sebum without disrupting moisture barrier proteins.',
    note: 'Purifying Foaming Wash',
    detailedUsage: {
      timing: 'Every Morning & Evening',
      amount: 'About a large pea-sized amount or 1-2 pumps',
      suitableFor: 'All skin types, including acne-prone, dehydrated, ultra-sensitive skin, and pregnancy-safe',
      steps: [
        {
          step: 1,
          title: 'Wet & Lather',
          description: 'Wash hands thoroughly. Wet face with lukewarm water. Dispense into wet palms and work into a rich micro-foam cloud for 15-20 seconds.',
        },
        {
          step: 2,
          title: 'T-Zone Cleansing',
          description: 'Apply foam to face, gently massage the T-zone (forehead, nose, chin) in circular motions for 30 seconds to dislodge PM2.5 impurities and sebum.',
        },
        {
          step: 3,
          title: 'Cheeks & Neck',
          description: 'Glide foam outward over cheeks and neck in upward lifting motions for 20 seconds. Avoid aggressive tugging to protect the lipid mantle.',
        },
        {
          step: 4,
          title: 'Rinse & Pat Dry',
          description: 'Rinse completely with room-temperature or lukewarm water. Gently pat with a soft towel, leaving skin damp for toner application.',
        },
      ],
      expertTip: 'Avoid excessively hot water. 60 seconds of gentle washing is the golden window for optimal amino acid efficacy.',
      precautions: 'Avoid direct contact with eyes. In case of contact, rinse thoroughly with clear water.',
    },
  },
  de: {
    name: 'Alps Gentle Purifying Cleanser',
    shortName: 'Sanfter Reinigungsschaum',
    categoryLabel: 'GESICHTSREINIGER',
    tag: 'SANFTE TIEFENREINIGUNG',
    subtitle: 'Purifying Foaming Wash - Sanfter Mikroschaum, porentief rein',
    description: 'Der Alps Gentle Purifying Cleanser erzeugt einen samtigen Mikroschaum, der Feinstaub PM2.5, Talg und Make-up-Rückstände sanft löst, ohne den Säureschutzmantel der Haut anzugreifen.',
    keyIngredients: [
      'Milde Aminosäuretenside aus Bio-Äpfeln',
      'Schweizer Gletscherquellwasser mit natürlichen Mineralien',
      'Schweizer Edelweiß-Stammzellenextrakt',
      'Silberohr-Pilz (Tremella) + Hyaluronsäure-Hydratationskomplex',
    ],
    benefits: [
      'Klärt Poren gründlich ohne Austrocknung oder Spannungsgefühl',
      'Hautneutraler pH-Wert 5.5, ideal für sensible Hautbilder',
      'Feinporiger Cremeschaum schützt vor Reibung beim Waschen',
      'Bewahrt die natürliche Feuchtigkeit für ein geschmeidiges Hautgefühl',
    ],
    usage: 'Eine haselnussgroße Menge in den feuchten Händen aufschäumen, 60 Sekunden sanft einmassieren und mit lauwarmem Wasser abspülen.',
    routineStepTitle: 'Sanfte Gesichtsreinigung',
    stockStatus: 'Auf Lager',
    expertTip: 'Eine 60-sekündige Reinigungsphase gibt den Aminosäuren genügend Zeit, Talg schonend zu binden.',
    note: 'Milder Tiefenreiniger',
    detailedUsage: {
      timing: 'Täglich morgens und abends',
      amount: 'Etwa haselnussgroße Menge',
      suitableFor: 'Alle Hauttypen, auch empfindliche und zu Unreinheiten neigende Haut',
      steps: [
        {
          step: 1,
          title: 'Anfeuchten & Aufschäumen',
          description: 'Hände waschen, Gesicht mit lauwarmem Wasser befeuchten. Produkt in den Händen zu feinem Schaum aufschlagen.',
        },
        {
          step: 2,
          title: 'T-Zone Reinigen',
          description: 'Schaum sanft in kreisenden Bewegungen 30 Sekunden auf Stirn, Nase und Kinn einmassieren.',
        },
        {
          step: 3,
          title: 'Wangen & Hals',
          description: 'Schaum 20 Sekunden sanft über Wangen und Hals verteilen ohne starken Druck.',
        },
        {
          step: 4,
          title: 'Abspülen',
          description: 'Gründlich mit lauwarmem Wasser abspülen und sanft trocken tupfen.',
        },
      ],
      expertTip: 'Kein zu heißes Wasser verwenden, um den hauteigenen Schutzfilm zu schonen.',
      precautions: 'Augenkontakt vermeiden. Bei Kontakt sofort mit klarem Wasser ausspülen.',
    },
  },
  es: {
    name: 'Alps Gentle Purifying Cleanser',
    shortName: 'Limpiador Purificante',
    categoryLabel: 'LIMPIADOR',
    tag: 'LIMPIEZA PURIFICANTE',
    subtitle: 'Purifying Foaming Wash - Espuma microdensa y ultra suave',
    description: 'El limpiador Alps Gentle Purifying Cleanser genera una microespuma sedosa que elimina eficazmente polución PM2.5, exceso de sebo y maquillaje ligero sin alterar la barrera lipídica cutánea.',
    keyIngredients: [
      'Tensoactivos de aminoácidos de manzana orgánica',
      'Agua glacial de los Alpes suizos rica en oligoelementos',
      'Extracto de células madre de Edelweiss alpino',
      'Complejo hidratante de Tremella y Ácido Hialurónico',
    ],
    benefits: [
      'Limpia en profundidad respetando el manto hidrolipídico',
      'pH 5.5 fisiológico respetuoso con pieles sensibles y reactivas',
      'Espuma acolchada que previene la fricción mecánica sobre la dermis',
      'Deja la piel suave, fresca y libre de tirantez tras el aclarado',
    ],
    usage: 'Emulsionar una pequeña cantidad en las palmas húmedas, masajear el rostro durante 60 segundos y aclarar con agua tibia.',
    routineStepTitle: 'Limpieza Purificante',
    stockStatus: 'En Stock',
    expertTip: '60 segundos de suave masaje circular permiten que los aminoácidos limpien los poros sin deshidratar.',
    note: 'Espuma Purificante Suave',
    detailedUsage: {
      timing: 'Mañana y noche diariamente',
      amount: 'Cantidad del tamaño de un guisante',
      suitableFor: 'Todo tipo de piel, incluso piel sensible, deshidratada y mujeres embarazadas',
      steps: [
        {
          step: 1,
          title: 'Humedecer y Emulsionar',
          description: 'Lavar las manos, humedecer el rostro con agua tibia y frotar hasta generar una espuma densa durante 15-20 segundos.',
        },
        {
          step: 2,
          title: 'Limpieza Zona T',
          description: 'Masajear suavemente frente, nariz y barbilla en círculos durante 30 segundos para purificar poros.',
        },
        {
          step: 3,
          title: 'Mejillas y Cuello',
          description: 'Deslizar la espuma hacia mejillas y cuello con movimientos ascendentes suaves.',
        },
        {
          step: 4,
          title: 'Aclarar y Secar',
          description: 'Aclarar con abundante agua templada y secar a toques suaves con una toalla limpia.',
        },
      ],
      expertTip: 'Evita el agua demasiado caliente para preservar la barrera hidrolipídica natural.',
      precautions: 'Evitar el contacto directo con los ojos. En caso de contacto, aclarar con agua limpia.',
    },
  },
  zh: {
    name: 'Alps Gentle Purifying Cleanser',
    shortName: '极简净澈洁面乳',
    categoryLabel: '温和洁面',
    tag: '温和深层净澈',
    subtitle: 'Purifying Foaming Wash - 绵密雪绒微气泡，洗后水润不紧绷',
    description: 'Alps 极简净澈泡沫洁面乳，倾注瑞士采尔马特冰川水与雪绒花干细胞精萃。丰盈微米级细腻云朵泡沫，深入净澈PM2.5粉尘、油脂与淡妆，守护角质屏障，洗后柔润舒缓。',
    keyIngredients: [
      '天然有机苹果氨基酸表面活性剂体系',
      '瑞士阿尔卑斯古冰川深层活矿泉水',
      '瑞士高山雪绒花活性干细胞提取物',
      '白木耳银耳多糖 + 双重玻尿酸锁水基底',
    ],
    benefits: [
      '温和深层溶出毛孔污垢，不伤皮脂膜天然屏障',
      '弱酸性 pH 5.5 亲肤配方，敏感肌及孕期皆可安心使用',
      '如云朵般轻盈包裹，避免手部摩擦损伤娇嫩表皮',
      '洗后水润通透，全无拔干假滑感',
    ],
    usage: '湿手取黄豆大小膏体，揉搓出绵密微泡，全脸打圈轻柔按摩60秒，温水洗净即可。',
    routineStepTitle: '温和纯净洁面',
    stockStatus: '现货发售',
    expertTip: '轻柔按摩60秒是苹果氨基酸温和乳化多余油脂的最佳黄金时间。',
    note: '植萃水润云朵泡',
    detailedUsage: {
      timing: '每日早晚各一次',
      amount: '约黄豆大小膏体',
      suitableFor: '所有肤质，包括油痘肌、屏障受损脆弱肌、敏感肌及孕产期人群',
      steps: [
        {
          step: 1,
          title: '温水湿面与起泡',
          description: '洗净双手，温水湿润面部，取适量于湿润掌心打圈揉搓15-20秒起泡。',
        },
        {
          step: 2,
          title: 'T区打圈净澈',
          description: '将绵密泡沫敷上全脸，在额头、鼻翼、下巴重点打圈30秒溶出污垢。',
        },
        {
          step: 3,
          title: '两颊轻柔带过',
          description: '将泡沫轻柔带至两颊和颈部，动作轻盈，避免拉扯表皮屏障。',
        },
        {
          step: 4,
          title: '温水冲净',
          description: '以室温或微温清水彻底冲净，用棉柔巾轻轻蘸干多余水珠。',
        },
      ],
      expertTip: '水温切忌过烫，60秒洁面为温和清洁的最佳时段。',
      precautions: '若不慎入眼，请立即用大量清水彻底冲洗。',
    },
  },
};

const TONER_DATA: Record<SupportedLanguage, LocalizedProductData> = {
  vi: {
    name: 'Alps Botanical Balancing Toner',
    shortName: 'Botanical Balancing Toner',
    categoryLabel: 'NƯỚC CÂN BẰNG',
    tag: 'CÂN BẰNG PHỤC HỒI',
    subtitle: 'Hydrating Essence Toner - Cấp ẩm tầng sâu, se khít lỗ chân lông',
    description: 'Nước hoa hồng cân bằng Alps Botanical Balancing Toner chắt lọc 92% nước khoáng băng hà Thụy Sĩ kết hợp tinh chất hoa nhung tuyết Edelweiss và chiết xuất vỏ thông tuyết, giúp cân bằng độ pH tức thì và mở đường dẫn cho các bước dưỡng tiếp theo.',
    keyIngredients: [
      '92% Nước khoáng sông băng tinh khiết Zermatt Thụy Sĩ',
      'Chiết xuất hoa tuyết nhung Edelweiss hữu cơ',
      'Niacinamide 2% tinh khiết đạt chuẩn Dược phẩm',
      'Ectoin đa tầng bảo vệ tế bào khỏi stress môi trường',
    ],
    benefits: [
      'Cân bằng độ ẩm và độ pH chuẩn 5.5 ngay sau bước rửa mặt',
      'Làm dịu tức thì các vùng da ửng đỏ, nhạy cảm hoặc kích ứng nhẹ',
      'Hỗ trợ thu nhỏ lỗ chân lông và làm đều màu bề mặt da',
      'Tăng khả năng hấp thụ dưỡng chất của serum và kem dưỡng lên 2.5 lần',
    ],
    usage: 'Sau khi làm sạch mặt, đổ 3-5 giọt ra lòng bàn tay hoặc bông cotton hữu cơ, vỗ nhẹ nhàng đều khắp mặt và cổ theo chiều nâng cơ cho đến khi thẩm thấu hoàn toàn.',
    routineStepTitle: 'Cân Bằng Thảo Mộc',
    stockStatus: 'Còn hàng',
    expertTip: 'Thực hiện phương pháp 3-Skin (vỗ 3 lớp mỏng liên tiếp) vào mùa khô để cấp ẩm sâu như vừa đắp mặt nạ.',
    note: 'Hydrating Botanical',
    detailedUsage: {
      timing: 'Buổi Sáng & Buổi Tối ngay sau bước sữa rửa mặt',
      amount: 'Khoảng 3 - 4 giọt hoặc 2 lần nhấn vòi pump',
      suitableFor: 'Mọi loại da, đặc biệt là da dầu thiếu nước, da dễ kích ứng và da sau treatment',
      steps: [
        {
          step: 1,
          title: 'Chuẩn bị nền da ẩm',
          description: 'Sử dụng toner trong vòng 60 giây sau khi rửa mặt khi bề mặt da vẫn còn độ ẩm nhẹ tự nhiên.',
        },
        {
          step: 2,
          title: 'Thấm bông cotton làm sạch sâu',
          description: 'Nhấn 2 lần ra miếng bông mỏng, lau nhẹ nhàng từ cánh mũi ra thái dương để loại bỏ hoàn toàn cặn nước và cân bằng pH tức thì.',
        },
        {
          step: 3,
          title: 'Vỗ trực tiếp dưỡng ẩm sâu',
          description: 'Nhỏ 3-4 giọt ra lòng bàn tay sạch, áp đều lên má, trán, cằm và cổ, vỗ nhẹ nhàng cho dưỡng chất thẩm thấu sâu.',
        },
        {
          step: 4,
          title: 'Lotion Mask hạ nhiệt cấp cứu (Tùy chọn)',
          description: 'Vào những ngày da bị đỏ rát hoặc khô hanh, thấm đẫm 3 miếng bông đắp lên trán và 2 má trong 3 phút.',
        },
      ],
      expertTip: 'Áp nhẹ lòng bàn tay ấm lên mặt trong 5 giây cuối cùng để nhiệt độ cơ thể giúp khoáng chất thẩm thấu trọn vẹn.',
      precautions: 'Bảo quản nơi thoáng mát, tránh ánh nắng trực tiếp.',
    },
  },
  en: {
    name: 'Alps Botanical Balancing Toner',
    shortName: 'Botanical Balancing Toner',
    categoryLabel: 'ESSENCE TONER',
    tag: 'HYDRATION BALANCE',
    subtitle: 'Hydrating Essence Toner - Deep moisture infusion & pore refining',
    description: 'Alps Botanical Balancing Toner combines 92% pure Swiss glacial spring water with high-altitude alpine Edelweiss and maritime pine bark, instantly rebalancing skin pH and priming skin channels for subsequent actives.',
    keyIngredients: [
      '92% Pristine Zermatt Glacial Mineral Water',
      'Organic High-Alpine Edelweiss Flower Extract',
      '2% Ultra-pure Clinical Grade Niacinamide',
      'Multi-cellular Extremolyte Ectoin for environmental stress defense',
    ],
    benefits: [
      'Instantly rebalances cellular hydration and optimal skin pH 5.5',
      'Rapidly calms micro-redness, post-wash warmth, and sensitizations',
      'Refines pore texture and visibly smooths skin grain',
      'Boosts the absorption rate of subsequent serum actives by 2.5x',
    ],
    usage: 'After cleansing, dispense 3-5 drops onto palms or a soft cotton pad. Gently pat upward across face and neck until fully absorbed.',
    routineStepTitle: 'Botanical Balancing',
    stockStatus: 'In Stock',
    expertTip: 'Try the 3-Layer Pat method during seasonal changes for intensive glass-skin hydration without heaviness.',
    note: 'Hydrating Botanical',
    detailedUsage: {
      timing: 'Morning and evening right after cleansing',
      amount: '3-4 drops or 2 pump presses',
      suitableFor: 'All skin types, especially dehydrated, sensitized, or post-treatment skin',
      steps: [
        {
          step: 1,
          title: 'Prime Damp Skin',
          description: 'Apply toner within 60 seconds of cleansing while skin retains natural ambient moisture.',
        },
        {
          step: 2,
          title: 'Cotton Pad Clarifying',
          description: 'Dispense 2 pumps onto a thin pad, sweep outward from center of face to remove tap water minerals.',
        },
        {
          step: 3,
          title: 'Direct Patting Infusion',
          description: 'Pour 3-4 drops into palms, press gently into cheeks, forehead, chin, and neck with upward lifting motions.',
        },
        {
          step: 4,
          title: 'Rescue Lotion Pack (Optional)',
          description: 'Saturate thin cotton pads and leave on cheeks and forehead for 3 minutes on overheated days.',
        },
      ],
      expertTip: 'Press warm palms over face for 5 seconds to boost micro-circulation and active absorption.',
      precautions: 'Store in a cool dry place away from direct sunlight.',
    },
  },
  de: {
    name: 'Alps Botanical Balancing Toner',
    shortName: 'Botanischer Balance-Toner',
    categoryLabel: 'GESICHTSWASSER',
    tag: 'FEUCHTIGKEITS-BALANCE',
    subtitle: 'Hydrating Essence Toner - Tiefenhydratisierung & Porenverfeinerung',
    description: 'Der Alps Botanical Balancing Toner vereint 92% Schweizer Zermatter Gletscherwasser mit Edelweißextrakt zur sofortigen Wiederherstellung des pH-Gleichgewichts und zur optimalen Vorbereitung auf Folgeschritte.',
    keyIngredients: [
      '92% Reines Zermatter Gletscherquellwasser',
      'Bio-Edelweißblütenextrakt aus kontrolliertem Alpenanbau',
      '2% Pharmazeutisches Niacinamid',
      'Ectoin-Zellschutzkomplex gegen Umweltstress',
    ],
    benefits: [
      'Stellt den idealen pH-Wert 5.5 sofort nach der Reinigung wieder her',
      'Beruhigt Rötungen und Irritationen spürbar',
      'Verfeinert das Porenbild und glättet die Hautstruktur',
      'Steigert die Aufnahmefähigkeit für Seren und Cremes um das 2.5-fache',
    ],
    usage: 'Nach der Reinigung 3-5 Tropfen in die Handflächen geben und sanft auf Gesicht und Hals einklopfen.',
    routineStepTitle: 'Botanischer Balance-Toner',
    stockStatus: 'Auf Lager',
    expertTip: 'Für trockene Tage: Drei dünne Schichten nacheinander auftragen (3-Skin-Methode).',
    note: 'Botanische Balance',
    detailedUsage: {
      timing: 'Morgens und abends direkt nach der Reinigung',
      amount: '3-4 Tropfen',
      suitableFor: 'Alle Hauttypen, insbesondere feuchtigkeitsarme und empfindliche Haut',
      steps: [
        {
          step: 1,
          title: 'Auf die feuchte Haut auftragen',
          description: 'Innerhalb von 60 Sekunden nach dem Waschen anwenden.',
        },
        {
          step: 2,
          title: 'Sanft einklopfen',
          description: 'In die Handflächen geben und mit sanften Klopfbewegungen in Gesicht und Hals einarbeiten.',
        },
      ],
      expertTip: 'Handflächen 5 Sekunden auf die Wangen legen, um die Aufnahme durch Körperwärme zu intensivieren.',
      precautions: 'Kühl und lichtgeschützt lagern.',
    },
  },
  es: {
    name: 'Alps Botanical Balancing Toner',
    shortName: 'Tónico Equilibrante',
    categoryLabel: 'TÓNICO FACIAL',
    tag: 'EQUILIBRIO BOTÁNICO',
    subtitle: 'Hydrating Essence Toner - Hidratación profunda y reducción de poros',
    description: 'El tónico Alps Botanical Balancing Toner contiene un 92% de agua glacial de Zermatt y flor de las nieves alpina, equilibrando instantáneamente el pH y multiplicando la absorción de los tratamientos posteriores.',
    keyIngredients: [
      '92% de Agua Glacial pura de Zermatt, Suiza',
      'Extracto de flor de Edelweiss orgánico de altura',
      'Niacinamida pura al 2% grado dermatológico',
      'Ectoína biomimética de protección celular',
    ],
    benefits: [
      'Equilibra de inmediato la hidratación y el pH óptimo 5.5',
      'Alivia rojeces y calma la sensación de tirantez al instante',
      'Minimiza visiblemente la apariencia de los poros dilatados',
      'Multiplica por 2.5 la absorción de los principios activos del sérum',
    ],
    usage: 'Verter de 3 a 5 gotas en la palma de las manos o en un disco de algodón y presionar suavemente sobre rostro y cuello.',
    routineStepTitle: 'Tónico Equilibrante',
    stockStatus: 'En Stock',
    expertTip: 'Aplica 3 capas ligeras consecutivas en noches secas para un efecto de hidratación intensiva.',
    note: 'Equilibrio Botánico',
    detailedUsage: {
      timing: 'Mañana y noche tras la limpieza',
      amount: '3 a 4 gotas',
      suitableFor: 'Todo tipo de piel, especialmente piel deshidratada o sensibilizada',
      steps: [
        {
          step: 1,
          title: 'Preparación',
          description: 'Aplicar durante el primer minuto tras secar el rostro.',
        },
        {
          step: 2,
          title: 'Aplicación suave',
          description: 'Presionar suavemente con las palmas sobre mejillas, frente y cuello hasta absorción.',
        },
      ],
      expertTip: 'Coloca las palmas tibias sobre el rostro durante 5 segundos para potenciar la absorción.',
      precautions: 'Conservar en un lugar fresco protegido de la luz solar.',
    },
  },
  zh: {
    name: 'Alps Botanical Balancing Toner',
    shortName: '植萃平衡水',
    categoryLabel: '冰川高机能水',
    tag: '植萃水润平衡',
    subtitle: 'Hydrating Essence Toner - 深层水活渗透，细致毛孔调理',
    description: 'Alps 植萃冰川平衡水，蕴含高达 92% 采尔马特纯净冰川泉水与高山雪绒花、高纯烟酰胺。瞬间调节洁面后失衡的 pH 值，舒缓泛红，打通肌肤养分吸收隧道。',
    keyIngredients: [
      '92% 瑞士采尔马特深层古冰川矿泉活水',
      '阿尔卑斯有机高山雪绒花活性萃取',
      '2% 医药级超纯烟酰胺（维他命B3）',
      '多重依克多因 (Ectoin) 细胞级抗逆修护因子',
    ],
    benefits: [
      '秒级调节肌肤至最佳弱酸性 pH 5.5 平衡状态',
      '快速平抚换季泛红、干痒与不适反应',
      '细化毛孔粗糙纹理，焕现水光细腻触感',
      '使后续精华液与面霜活性成分吸收率提升达2.5倍',
    ],
    usage: '洁面后取3-5滴于手心或化妆棉，由内而外轻拍于面部及颈部直至彻底吸收。',
    routineStepTitle: '植萃平衡水',
    stockStatus: '现货发售',
    expertTip: '秋冬干燥时推荐“三层拍水法”，连续轻拍三遍，媲美敷完水疗水光面膜。',
    note: '植萃水活调理',
    detailedUsage: {
      timing: '早晚洁面后第一步',
      amount: '约3-5滴或2次泵头',
      suitableFor: '所有肤质，特别适合外油内干、脆弱易泛红及换季不适肌肤',
      steps: [
        {
          step: 1,
          title: '黄金润肤期',
          description: '洁面后60秒内，趁表皮仍有微润感时即刻拍入平衡水。',
        },
        {
          step: 2,
          title: '轻拍渗透',
          description: '取适量于掌心，温热按压于面颊、额头、下巴，轻弹拍打至水液沁入肌底。',
        },
        {
          step: 3,
          title: '湿敷急救 (可选)',
          description: '日晒或泛红时，可用化妆棉湿敷3分钟，快速降温舒缓屏障。',
        },
      ],
      expertTip: '双手温热捂脸5秒，借助掌心体温促进冰川微量元素深澈吸收。',
      precautions: '避光阴凉处存放。',
    },
  },
};

const SERUM_DATA: Record<SupportedLanguage, LocalizedProductData> = {
  vi: {
    name: 'Alps Radiance Glow Serum',
    shortName: 'Radiance Glow Serum',
    categoryLabel: 'SERUM TÁI SINH',
    tag: 'SÁNG MỜ THÂM',
    subtitle: 'Cellular Illuminating Serum - Đánh thức làn da trong trẻo, mờ sạm nám',
    description: 'Tuyệt tác tinh chất Alps Radiance Glow Serum ứng dụng công nghệ Tế bào gốc thực vật Alpine Plant Stem Cells kết hợp phức hợp làm sáng sinh học Alpha Arbutin 2% và Glutathione hữu cơ, tái sinh làn da rạng ngời từ tầng tế bào mà không gây kích ứng.',
    keyIngredients: [
      'Tế bào gốc thực vật sông băng Thụy Sĩ (Swiss Glacial Plant Stem Cells)',
      'Alpha Arbutin 2% tinh khiết làm sáng chuẩn y khoa',
      'Glutathione hữu cơ chống oxy hóa tế bào đỉnh cao',
      'Hyaluronic Acid đa phân tử 5D cấp ẩm căng bóng đa tầng',
    ],
    benefits: [
      'Làm mờ rõ rệt các đốm nâu, sạm nám và vết thâm mụn sau 14-28 ngày',
      'Đánh thức vẻ sáng trong, căng bóng tự nhiên theo phong cách Quiet Luxury',
      'Tăng sinh collagen tự thân, cải thiện độ đàn hồi và săn chắc cho da',
      'Kết cấu tinh chất mỏng nhẹ tựa giọt sương, thẩm thấu ngay sau 10 giây',
    ],
    usage: 'Bóp vòi lấy 1 ống dropper (khoảng 3-4 giọt), chấm đều 5 điểm trên mặt và vỗ nhẹ cho tinh chất thẩm thấu sâu trước khi thoa kem dưỡng.',
    routineStepTitle: 'Serum Tinh Chất Sáng',
    stockStatus: 'Còn hàng',
    expertTip: 'Khóa ẩm ngay bằng Alps Regenerating Cream để giữ nguyên vẹn các hạt hoạt chất tế bào gốc trong màng tế bào suốt đêm.',
    note: 'Ngọc trai & Niacinamide',
    detailedUsage: {
      timing: 'Buổi Sáng & Buổi Tối sau bước nước cân bằng toner',
      amount: 'Khoảng 1 ống bóp dropper (3 - 4 giọt)',
      suitableFor: 'Mọi loại da, da xỉn màu mệt mỏi, da có vết thâm mụn, nám tàn nhang nhẹ',
      steps: [
        {
          step: 1,
          title: 'Lấy tinh chất',
          description: 'Bóp nhẹ đầu cao su ống hút dropper, lấy 3-4 giọt tinh chất ra đầu ngón tay sạch.',
        },
        {
          step: 2,
          title: 'Chấm 5 điểm & Thoa đều',
          description: 'Chấm đều lên trán, hai má, mũi và cằm. Nhẹ nhàng thoa đều theo chiều từ trong ra ngoài.',
        },
        {
          step: 3,
          title: 'Vỗ nhẹ thẩm thấu',
          description: 'Dùng các đầu ngón tay vỗ dồn dập nhẹ nhàng trong 15 giây để kích hoạt tế bào gốc sông băng thẩm thấu.',
        },
      ],
      expertTip: 'Luôn khóa ẩm bằng Alps Cream để bảo toàn tinh chất tế bào gốc suốt đêm.',
      precautions: 'Bảo quản nơi thoáng mát, vặn chặt nắp sau khi dùng.',
    },
  },
  en: {
    name: 'Alps Radiance Glow Serum',
    shortName: 'Radiance Glow Serum',
    categoryLabel: 'CELLULAR SERUM',
    tag: 'CELLULAR RADIANCE',
    subtitle: 'Cellular Illuminating Serum - Awakening crystalline clarity and fade dark spots',
    description: 'Our crown jewel formulation: Alps Radiance Glow Serum synergizes Swiss Alpine Plant Stem Cells with 2% Alpha Arbutin and bio-active Glutathione, igniting cellular clarity and fading dark spots without photo-sensitivity.',
    keyIngredients: [
      'Patented Swiss Glacial Plant Stem Cell Culture',
      '2% Clinical Grade Pure Alpha Arbutin',
      'Bio-fermented Reduced Glutathione antioxidant complex',
      '5D Multi-molecular Hyaluronic Acid for trans-epidermal glow',
    ],
    benefits: [
      'Clinically proven to fade post-acne marks and UV hyperpigmentation within 28 days',
      'Restores translucent, luminous glass radiance without artificial glitters',
      'Stimulates endogenous collagen synthesis and boosts skin elasticity',
      'Featherweight dewdrop texture that absorbs within 10 seconds without residue',
    ],
    usage: 'Press pipette dropper to release 3-4 drops directly onto cleansed and toned face. Press and pat gently into skin until fully absorbed.',
    routineStepTitle: 'Radiance Glow Serum',
    stockStatus: 'In Stock',
    expertTip: 'Always seal with Alps Regenerating Cream to lock active stem cells inside the lipid matrix overnight.',
    note: 'Pearl & Niacinamide',
    detailedUsage: {
      timing: 'Morning and evening after toner',
      amount: '1 full pipette dropper (3-4 drops)',
      suitableFor: 'All skin types, especially dull, uneven tone, post-blemish pigmentation',
      steps: [
        {
          step: 1,
          title: 'Dispense',
          description: 'Squeeze dropper pipette to release 3-4 drops onto clean fingertips.',
        },
        {
          step: 2,
          title: 'Distribute & Smooth',
          description: 'Dab across forehead, cheeks, nose, and chin. Smooth outward along facial contours.',
        },
        {
          step: 3,
          title: 'Micro-Patting',
          description: 'Gently pat with fingertips for 15 seconds to accelerate cellular uptake.',
        },
      ],
      expertTip: 'Seal with Alps Cream to lock in vital active stem cell nutrients.',
      precautions: 'Tighten cap securely after use. Store away from heat and direct sunlight.',
    },
  },
  de: {
    name: 'Alps Radiance Glow Serum',
    shortName: 'Leuchtkraft-Aktivserum',
    categoryLabel: 'ZELL-AKTIVSERUM',
    tag: 'LEUCHTKRAFT-AKTIV',
    subtitle: 'Cellular Illuminating Serum - Kristallklare Strahlkraft gegen Pigmentflecken',
    description: 'Das Meisterwerk der Schweizer Zellforschung: Alps Radiance Glow Serum vereint alpine Stammzellen mit 2% Alpha-Arbutin und Glutathion für einen ebenmäßigen, strahlenden Teint ohne Hautreizung.',
    keyIngredients: [
      'Schweizer Gletscherpflanzen-Stammzellenextrakt',
      '2% Reines Alpha-Arbutin in medizinischer Qualität',
      'Biologisches Glutathion für intensiven Zellschutz',
      '5D Multimolekulare Hyaluronsäure für Tiefenvolumen',
    ],
    benefits: [
      'Mindert Pigmentflecken und Aknemale sichtbar innerhalb von 28 Tagen',
      'Verleiht der Haut eine natürliche, transluzente Leuchtkraft',
      'Unterstützt die körpereigene Kollagenbildung und Straffheit',
      'Federleichte Textur zieht in 10 Sekunden rückstandsfrei ein',
    ],
    usage: '3-4 Tropfen mit der Pipette entnehmen, auf Stirn und Wangen verteilen und sanft einklopfen.',
    routineStepTitle: 'Leuchtkraft-Aktivserum',
    stockStatus: 'Auf Lager',
    expertTip: 'Anschließend mit der Alps Regenerating Face Cream versiegeln, um die Wirkstoffe optimal einzuschließen.',
    note: 'Perlenextrakt & Niacinamid',
    detailedUsage: {
      timing: 'Morgens und abends nach dem Toner',
      amount: '3-4 Tropfen',
      suitableFor: 'Alle Hauttypen, ideal bei müdem, unruhigem Teint und Pigmentflecken',
      steps: [
        {
          step: 1,
          title: 'Auftragen',
          description: 'Mit der Pipette 3-4 Tropfen auf die gereinigte Haut geben.',
        },
        {
          step: 2,
          title: 'Sanft einklopfen',
          description: 'Von der Gesichtsmitte nach außen sanft einklopfen bis zur vollständigen Aufnahme.',
        },
      ],
      expertTip: 'Mit der Alps Creme versiegeln für optimale Langzeitwirkung.',
      precautions: 'Nach Gebrauch fest verschließen.',
    },
  },
  es: {
    name: 'Alps Radiance Glow Serum',
    shortName: 'Sérum Iluminador',
    categoryLabel: 'SÉRUM CELULAR',
    tag: 'LUMINOSIDAD CELULAR',
    subtitle: 'Cellular Illuminating Serum - Despierta la claridad pura y difumina manchas',
    description: 'La obra maestra de la colección: Alps Radiance Glow Serum combina células madre de plantas glaciares suizas con Alfa Arbutina pura al 2% y Glutatión, devolviendo a la piel su luz cristalina natural.',
    keyIngredients: [
      'Células madre de flora glacial suiza patentadas',
      '2% de Alfa Arbutina pura de alta eficacia despigmentante',
      'Glutatión biológico potente antioxidante celular',
      'Ácido Hialurónico 5D multi-peso molecular',
    ],
    benefits: [
      'Atenúa visiblemente manchas solares y marcas de acné en 28 días',
      'Aporta luminosidad saludable y efecto piel de cristal natural',
      'Estimula la síntesis de colágeno mejorando la firmeza dérmica',
      'Textura sedosa ultraligera que se absorbe en 10 segundos sin residuo graso',
    ],
    usage: 'Aplicar 3 o 4 gotas con el gotero dosificador sobre rostro y cuello limpios, presionando suavemente con las yemas.',
    routineStepTitle: 'Sérum Iluminador',
    stockStatus: 'En Stock',
    expertTip: 'Sella siempre con la crema Alps Regenerating Face Cream para fijar los activos en la piel.',
    note: 'Perla y Niacinamida',
    detailedUsage: {
      timing: 'Mañana y noche tras el tónico',
      amount: '3 a 4 gotas con el cuentagotas',
      suitableFor: 'Todo tipo de piel, piel apagada con manchas o marcas de acné',
      steps: [
        {
          step: 1,
          title: 'Dosificar',
          description: 'Verter 3-4 gotas directamente sobre las yemas de los dedos limpios.',
        },
        {
          step: 2,
          title: 'Distribuir y Masajear',
          description: 'Extender de dentro hacia afuera y realizar suaves toques con las yemas durante 15 segundos.',
        },
      ],
      expertTip: 'Sella con la crema Alps para retener los activos toda la noche.',
      precautions: 'Cerrar bien el envase tras cada uso.',
    },
  },
  zh: {
    name: 'Alps Radiance Glow Serum',
    shortName: '光采焕白精华',
    categoryLabel: '细胞焕活精华',
    tag: '光采焕白淡斑',
    subtitle: 'Cellular Illuminating Serum - 细胞级透亮，淡化暗沉色斑',
    description: 'Alps 核心典藏杰作：焕彩透亮精华液。汇聚瑞士阿尔卑斯冰川干细胞科技、2% 医药级高纯熊果苷与谷胱甘肽抗氧因子，由内而外击退色素沉着，赋活通透如冰雪般的静奢光泽。',
    keyIngredients: [
      '瑞士采尔马特极地冰川植物活性干细胞提取物',
      '2% 医药级超纯 α-熊果苷（温和击退色素）',
      '高活性发酵还原型谷胱甘肽细胞抗氧基底',
      '5D 多重分子量立体玻尿酸水光充盈网络',
    ],
    benefits: [
      '连续使用28天，显著淡化痘印斑点与日晒暗沉',
      '唤醒宛如天生的通透澄净光泽，杜绝假亮反光',
      '促进胶原自体充盈，提升下颌线条紧致饱满度',
      '水感露珠质地，触肤10秒瞬息渗透，清爽无负担',
    ],
    usage: '滴取3-4滴精华液点涂于面部五处，顺着肌肉纹理轻按拍打至彻底吸收。',
    routineStepTitle: '光采焕活精华',
    stockStatus: '现货发售',
    expertTip: '随后涂抹 Alps 面霜加以封包，锁住细胞干细胞鲜活能量达一整夜。',
    note: '珍珠微晶与高纯烟酰胺',
    detailedUsage: {
      timing: '每日早晚爽肤水后使用',
      amount: '约3-4滴（一整吸管）',
      suitableFor: '所有肤质，尤其适合暗沉发黄、痘印色斑及需要提亮紧致者',
      steps: [
        {
          step: 1,
          title: '精准取量',
          description: '轻捏滴管顶部，取3-4滴于指尖。',
        },
        {
          step: 2,
          title: '点涂抹开',
          description: '点于额头、两颊、鼻尖与下巴，自内向外顺滑抹开。',
        },
        {
          step: 3,
          title: '弹琴指吸收',
          description: '用指腹轻弹面部15秒，激活冰川干细胞迅速深透。',
        },
      ],
      expertTip: '后续立即衔接 Alps 面霜封锁水分与营养。',
      precautions: '用后旋紧瓶盖，避免高温直晒。',
    },
  },
};

const CREAM_DATA: Record<SupportedLanguage, LocalizedProductData> = {
  vi: {
    name: 'Alps Regenerating Face Cream',
    shortName: 'Regenerating Face Cream',
    categoryLabel: 'KEM DƯỠNG DA',
    tag: 'TÁI SINH PHỤC HỒI',
    subtitle: 'Barrier Repair Velvet Cream - Khóa ẩm chuyên sâu, phục hồi màng lipid',
    description: 'Kem dưỡng phục hồi chuyên sâu Alps Regenerating Face Cream với kết cấu nhung mịn màng (Velvet Texture), kết hợp phức hợp 5 loại Ceramide sinh học, bơ hạt mỡ hữu cơ và tế bào gốc Alpine, tạo màng chắn bảo vệ da bền vững suốt 24 giờ.',
    keyIngredients: [
      'Phức hợp 5 loại Ceramide sinh học (EOP, NP, AP, AS, NS)',
      'Chiết xuất tế bào gốc thực vật tuyết nhung Edelweiss',
      'Bơ hạt mỡ hữu cơ tinh chế chuẩn Dược phẩm',
      'Peptide sinh học Biomimetic kích thích tăng sinh biểu bì',
    ],
    benefits: [
      'Phục hồi và củng cố hàng rào lipid bảo vệ da tổn thương trong 7 ngày',
      'Khóa ẩm sâu liên tục suốt 24 giờ, ngăn ngừa thoát nước qua biểu bì',
      'Làm mờ nếp nhăn li ti, tăng cường độ săn chắc đàn hồi',
      'Chất kem mướt mịn như lụa, thấm ráo không gây bí tắc chân lông',
    ],
    usage: 'Dùng muỗng bạc lấy lượng kem cỡ hạt bắp, làm ấm nhẹ giữa các đầu ngón tay và áp nhẹ đều khắp mặt và vùng cổ vào buổi sáng và tối.',
    routineStepTitle: 'Tái Sinh & Khóa Ẩm',
    stockStatus: 'Còn hàng',
    expertTip: 'Massage nâng cơ theo chiều từ cằm lên thái dương trong 30 giây để dưỡng chất thẩm thấu sâu và định hình đường nét khuôn mặt.',
    note: 'Ceramide Complex 3-6-9',
    detailedUsage: {
      timing: 'Buổi Sáng & Buổi Tối là bước khóa ẩm cuối cùng',
      amount: 'Khoảng 1 hạt bắp (dùng muỗng thìa bạc cao cấp đi kèm)',
      suitableFor: 'Mọi loại da, đặc biệt là da khô ráp, da sau điều trị thẩm mỹ, da tổn thương màng bảo vệ',
      steps: [
        {
          step: 1,
          title: 'Lấy kem bằng thìa bạc',
          description: 'Dùng thìa bạc chuyên dụng lấy một lượng kem vừa đủ, đảm bảo vệ sinh vô trùng tuyệt đối cho hũ kem.',
        },
        {
          step: 2,
          title: 'Kích hoạt nhiệt độ',
          description: 'Làm ấm nhẹ kem giữa các đầu ngón tay trong 3 giây để chất kem nhung nhũ tương hóa, tan chảy mượt mà.',
        },
        {
          step: 3,
          title: 'Áp nhẹ & Nâng cơ',
          description: 'Nhẹ nhàng áp đều lên hai má, trán, cằm và cổ. Vuốt nhẹ theo chiều từ dưới lên trên, từ trong ra ngoài.',
        },
      ],
      expertTip: 'Massage theo viền hàm lên thái dương để nâng cơ định hình đường nét gương mặt.',
      precautions: 'Vệ sinh sạch thìa bạc sau mỗi lần lấy kem.',
    },
  },
  en: {
    name: 'Alps Regenerating Face Cream',
    shortName: 'Regenerating Face Cream',
    categoryLabel: 'FACE CREAM',
    tag: 'BARRIER REPAIR',
    subtitle: 'Barrier Repair Velvet Cream - 24H deep lipid cocoon & anti-aging',
    description: 'Alps Regenerating Face Cream wraps skin in a weightless velvet cocoon. Featuring 5 essential skin-identical Ceramides, organic shea butter, and alpine stem cells, it restores the lipid barrier within 7 days.',
    keyIngredients: [
      '5 Essential Biomimetic Ceramides (EOP, NP, AP, AS, NS)',
      'Alpine Edelweiss Cellular Plant Extract',
      'Cold-pressed Organic Shea Butter Lipids',
      'Signal Biomimetic Peptides for epidermal collagen renewal',
    ],
    benefits: [
      'Repairs damaged epidermal barrier and micro-cracks within 7 days',
      'Provides 24-hour continuous non-greasy lipid hydration',
      'Smooths fine dehydration lines and reinforces structural density',
      'Silky velvet finish that sinks in effortlessly without clogging pores',
    ],
    usage: 'Use the silver spatula to scoop a pea-sized amount. Warm between fingertips and press gently into face and neck morning and evening.',
    routineStepTitle: 'Regenerating Cream',
    stockStatus: 'In Stock',
    expertTip: 'Gently glide fingers from jawline upwards to temples for 30 seconds to stimulate lymphatic drainage and firm facial contours.',
    note: 'Ceramide Complex 3-6-9',
    detailedUsage: {
      timing: 'Morning and evening as the final nourishing step',
      amount: 'A corn-kernel-sized amount with the silver spatula',
      suitableFor: 'All skin types, especially compromised barriers, dry skin, and aging concerns',
      steps: [
        {
          step: 1,
          title: 'Scoop Hygienically',
          description: 'Use the complimentary silver spatula to scoop a pea-sized portion, keeping the jar pure.',
        },
        {
          step: 2,
          title: 'Warm & Emulsify',
          description: 'Gently warm between fingertips for 3 seconds to melt the rich velvet texture into a silky balm.',
        },
        {
          step: 3,
          title: 'Press & Contour',
          description: 'Press upward and outward across cheeks, forehead, jawline, and neck until fully absorbed.',
        },
      ],
      expertTip: 'Glide from chin to temples for 30 seconds to lift facial contours and drain puffiness.',
      precautions: 'Clean the silver spatula after each application.',
    },
  },
  de: {
    name: 'Alps Regenerating Face Cream',
    shortName: 'Regenerierende Gesichtscreme',
    categoryLabel: 'GESICHTSCREME',
    tag: 'BARRIERE-REPARATUR',
    subtitle: 'Barrier Repair Velvet Cream - 24H Tiefenpflege & Zellregeneration',
    description: 'Die Alps Regenerating Face Cream umhüllt die Haut wie ein seidiger Samtkokon. 5 bioidentische Ceramide stärken die Hautschutzbarriere und schützen vor Feuchtigkeitsverlust.',
    keyIngredients: [
      '5 Bioidentische Ceramide (EOP, NP, AP, AS, NS)',
      'Schweizer Edelweiß-Stammzellenextrakt',
      'Kaltgepresste Bio-Sheabutter',
      'Biomimetische Signal-Peptide für die Kollagensynthese',
    ],
    benefits: [
      'Repariert und stärkt geschwächte Hautbarrieren in nur 7 Tagen',
      '24 Stunden durchgehende Feuchtigkeitsspeicherung ohne Fettfilm',
      'Mindert feine Trockenheitsfältchen spürbar',
      'Zieht seidig-matt ein, ohne die Poren zu verstopfen',
    ],
    usage: 'Mit dem Silberspatel eine erbsengroße Menge entnehmen, kurz anwärmen und sanft auf Gesicht und Hals auftragen.',
    routineStepTitle: 'Regenerierende Gesichtscreme',
    stockStatus: 'Auf Lager',
    expertTip: '30 Sekunden in sanften Aufwärtsbewegungen einmassieren, um die Gesichtskonturen zu festigen.',
    note: 'Ceramid-Komplex 3-6-9',
    detailedUsage: {
      timing: 'Morgens und abends als abschließende Pflege',
      amount: 'Erbsengroße Menge mit dem Silberspatel',
      suitableFor: 'Alle Hauttypen, besonders bei Trockenheit und geschwächter Barriere',
      steps: [
        {
          step: 1,
          title: 'Entnehmen',
          description: 'Mit dem beiliegenden Spatel hygienisch entnehmen.',
        },
        {
          step: 2,
          title: 'Anwärmen & Auftragen',
          description: 'Kurz zwischen den Fingern erwärmen und sanft in Aufwärtsbewegungen auftragen.',
        },
      ],
      expertTip: 'In Aufwärtsbewegungen einmassieren, um die Konturen zu straffen.',
      precautions: 'Spatel nach Gebrauch reinigen.',
    },
  },
  es: {
    name: 'Alps Regenerating Face Cream',
    shortName: 'Crema Regeneradora',
    categoryLabel: 'CREMA FACIAL',
    tag: 'REPARACIÓN INTENSIVA',
    subtitle: 'Barrier Repair Velvet Cream - Nutrición lipídica 24H y firmeza',
    description: 'Alps Regenerating Face Cream ofrece un acabado aterciopelado inigualable. Formulada con 5 Ceramidas bioidénticas y células madre alpinas, repara la barrera cutánea en 7 días.',
    keyIngredients: [
      'Complejo de 5 Ceramidas idénticas a la piel (EOP, NP, AP, AS, NS)',
      'Células madre de flor de Edelweiss alpina',
      'Manteca de karité ecológica prensada en frío',
      'Péptidos bioactivos de soporte dérmico',
    ],
    benefits: [
      'Restaura la barrera cutánea debilitada en 7 días de aplicación',
      'Nutre e hidrata profundamente durante 24 horas sin aportar brillo graso',
      'Difumina líneas de expresión y mejora la densidad del rostro',
      'Textura de terciopelo sedosa de rápida absorción que no obstruye poros',
    ],
    usage: 'Tomar la cantidad de una avellana con la espátula de plata, templar entre los dedos y extender suavemente sobre rostro y cuello.',
    routineStepTitle: 'Crema Regeneradora',
    stockStatus: 'En Stock',
    expertTip: 'Masajear desde el mentón hacia las sienes con movimientos ascendentes para favorecer el drenaje y la tonicidad.',
    note: 'Complejo Ceramidas 3-6-9',
    detailedUsage: {
      timing: 'Mañana y noche como paso final hidratante',
      amount: 'Tamaño de un grano de maíz con la espátula',
      suitableFor: 'Todo tipo de piel, en especial piel desvitalizada, seca o madura',
      steps: [
        {
          step: 1,
          title: 'Extraer con Espátula',
          description: 'Tomar la porción con la espátula higiénica de plata.',
        },
        {
          step: 2,
          title: 'Templar y Aplicar',
          description: 'Templar en las yemas y extender con movimientos ascendentes sobre rostro y cuello.',
        },
      ],
      expertTip: 'Masajea hacia las sienes para estilizar el óvalo facial.',
      precautions: 'Limpiar la espátula tras cada uso.',
    },
  },
  zh: {
    name: 'Alps Regenerating Face Cream',
    shortName: '新生修护面霜',
    categoryLabel: '奢润修护面霜',
    tag: '屏障修护锁水',
    subtitle: 'Barrier Repair Velvet Cream - 24小时奢润脂质修护，丰盈抚纹',
    description: 'Alps 新生修护面霜，丝缎般轻盈绒雾质地（Velvet Texture）。倾注5重仿生神经酰胺、高山雪绒花干细胞与冷压有机乳木果脂，7天筑牢皮脂屏障，24小时持续深层锁水。',
    keyIngredients: [
      '5重天然同源仿生神经酰胺复合群 (EOP, NP, AP, AS, NS)',
      '阿尔卑斯高山雪绒花活性细胞萃取液',
      '高纯度有机冷压乳木果活性脂质',
      '信号仿生胶原肽修护复合物',
    ],
    benefits: [
      '7天深度修护受损脆弱皮脂膜与微小泛红损伤',
      '24小时长效牢固锁水，切断表皮水分流失通道',
      '淡化干燥细纹，增强面部轮廓回弹与紧实感',
      '如丝绒般轻盈融肤，滋润却不堵塞毛孔',
    ],
    usage: '用随附纯银挖勺取黄豆大小，指尖轻揉温热后，自下而上轻按贴合于面部及颈部。',
    routineStepTitle: '新生修护面霜',
    stockStatus: '现货发售',
    expertTip: '顺着下颌线向太阳穴轻推提升按摩30秒，紧致立体轮廓并加速修护吸收。',
    note: '5重神经酰胺修护矩阵',
    detailedUsage: {
      timing: '每日早晚作为锁水滋润最后一步',
      amount: '约一颗玉米粒大小（附赠银质挖勺取用）',
      suitableFor: '所有肤质，特别适合屏障受损、干涩泛红、熬夜垮脸及抗初老需求',
      steps: [
        {
          step: 1,
          title: '银勺取量',
          description: '用随附纯银挖勺取适量，确保罐内膏体持久纯净。',
        },
        {
          step: 2,
          title: '指尖乳化',
          description: '在指腹轻揉3秒，由绒雾凝霜化为丝滑乳质。',
        },
        {
          step: 3,
          title: '按压提拉',
          description: '轻压于面颊与颈部，顺着下颌线向上推拉至太阳穴。',
        },
      ],
      expertTip: '向上提拉按摩30秒，紧致下颌线并消退晨起浮肿。',
      precautions: '使用后擦拭清洁纯银挖勺。',
    },
  },
};

const MASK_DATA: Record<SupportedLanguage, LocalizedProductData> = {
  vi: {
    name: 'Alps Hydro-Lifting Sheet Mask',
    shortName: 'Hydro-Lifting Sheet Mask',
    categoryLabel: 'MẶT NẠ NÂNG CƠ',
    tag: 'NÂNG CƠ CẤP TỐC',
    subtitle: 'Bio-Cellulose Lifting Mask - Liệu trình Spa băng tuyết tại gia',
    description: 'Mặt nạ sinh học Alps Hydro-Lifting Sheet Mask dệt từ sợi Bio-Cellulose lên men tự nhiên siêu mỏng 0.2mm, ôm khít 100% đường cong gương mặt, truyền dẫn 28ml tinh chất tế bào gốc sông băng chỉ sau 15-20 phút đắp.',
    keyIngredients: [
      'Sợi màng sinh học Bio-Cellulose lên men từ nước dừa tươi',
      '28ml Tinh chất tế bào gốc sông băng đậm đặc trong mỗi gói',
      'Chiết xuất tảo băng Swiss Snow Algae chịu lạnh cực hạn',
      'Peptide Hexapeptide-8 (Argireline) làm mờ nếp nhăn biểu cảm',
    ],
    benefits: [
      'Cấp ẩm căng mọng tức thì sau 15 phút, hạ nhiệt độ da xuống 3°C',
      'Nâng cơ và cải thiện độ săn chắc cho viền hàm rõ nét',
      'Làm dịu làn da mệt mỏi, cháy nắng hoặc sau điều trị thẩm mỹ',
      'Màng mặt nạ ôm sát như làn da thứ hai, không rơi tuột khi di chuyển',
    ],
    usage: 'Gỡ 2 lớp màng bảo vệ, đắp lớp màng Bio-Cellulose ở giữa lên mặt đã rửa sạch. Thư giãn 15-20 phút, gỡ mặt nạ và massage cho tinh chất còn lại thấm hết mà không cần rửa lại.',
    routineStepTitle: 'Mặt Nạ Nâng Cơ Phục Hồi',
    stockStatus: 'Còn hàng',
    expertTip: 'Để trong ngăn mát tủ lạnh 10 phút trước khi dùng để tăng hiệu quả se khít lỗ chân lông và hạ nhiệt da tức thì.',
    note: 'Bio-Cellulose & Argireline',
    detailedUsage: {
      timing: '2 - 3 lần mỗi tuần hoặc bất cứ khi nào da cần phục hồi cấp tốc',
      amount: '1 miếng mặt nạ 29g (chứa trọn 28ml ampoule đậm đặc)',
      suitableFor: 'Mọi loại da, da thiếu ẩm khẩn cấp, da chuẩn bị dự tiệc cần căng bóng tức thì',
      steps: [
        {
          step: 1,
          title: 'Làm sạch da & Mở bao bì',
          description: 'Rửa sạch mặt và thoa toner. Lấy mặt nạ ra khỏi gói, trải phẳng trên tay.',
        },
        {
          step: 2,
          title: 'Gỡ lớp màng lưới bảo vệ',
          description: 'Mặt nạ có 3 lớp. Gỡ bỏ lớp lưới thứ nhất, đặt lớp thạch dừa Bio-Cellulose ở giữa áp lên mặt.',
        },
        {
          step: 3,
          title: 'Căn chỉnh & Gỡ lớp ngoài',
          description: 'Gỡ nốt lớp màng bảo vệ bên ngoài, miết nhẹ cho mặt nạ ôm khít 100% đường cong gương mặt.',
        },
        {
          step: 4,
          title: 'Thư giãn 15-20 phút',
          description: 'Gỡ mặt nạ ra, dùng tay massage nhẹ lượng tinh chất còn lại khắp mặt và cổ. Không cần rửa lại.',
        },
      ],
      expertTip: 'Để ngăn mát tủ lạnh 10 phút trước khi đắp để tận hưởng cảm giác mát lạnh Cryo-Spa Thụy Sĩ.',
      precautions: 'Không dùng trên vết thương hở.',
    },
  },
  en: {
    name: 'Alps Hydro-Lifting Sheet Mask',
    shortName: 'Hydro-Lifting Sheet Mask',
    categoryLabel: 'BIOMIMETIC MASK',
    tag: 'INSTANT LIFTING',
    subtitle: 'Bio-Cellulose Lifting Mask - In-home Swiss alpine cryo-spa ritual',
    description: 'Woven from ultra-fine 0.2mm natural bio-cellulose, Alps Hydro-Lifting Sheet Mask contours seamlessly like a second skin, infusing 28ml of concentrated glacial stem cell serum within 15-20 minutes.',
    keyIngredients: [
      'Ultra-fine 0.2mm Fermented Bio-Cellulose membrane',
      '28ml Concentrated Swiss Glacial Stem Cell Ampoule in every sachet',
      'Swiss Snow Algae extract adapted to sub-zero alpine survival',
      'Acetyl Hexapeptide-8 (Argireline) peptide for expression lines',
    ],
    benefits: [
      'Instant deep plumping hydration in 15 minutes, cools skin by 3°C',
      'Visibly firms and contours jawline and cheek elasticity',
      'Instantly soothes sun-exposed, travel-fatigued, or post-treatment skin',
      'Second-skin adherence allows complete freedom of movement',
    ],
    usage: 'Remove outer mesh layers, align the middle bio-cellulose sheet onto face. Relax for 15-20 minutes, discard mask, and pat remaining serum into skin without rinsing.',
    routineStepTitle: 'Hydro-Lifting Mask',
    stockStatus: 'In Stock',
    expertTip: 'Chill in the refrigerator for 10 minutes prior to use for an invigorating cryo-tightening sensation.',
    note: 'Bio-Cellulose & Argireline',
    detailedUsage: {
      timing: '2-3 times weekly or prior to special events',
      amount: '1 sachet (28ml concentrated ampoule)',
      suitableFor: 'All skin types, tired skin, jet-lagged or dehydrated complexions',
      steps: [
        {
          step: 1,
          title: 'Unfold',
          description: 'Cleanse and tone skin. Unfold the 3-layer mask structure.',
        },
        {
          step: 2,
          title: 'Apply Bio-Cellulose',
          description: 'Peel off the first protective mesh, place the middle gel sheet directly onto facial contours.',
        },
        {
          step: 3,
          title: 'Remove Outer Layer',
          description: 'Peel off the outer protective mesh and smooth sheet to eliminate air pockets.',
        },
        {
          step: 4,
          title: 'Relax 15-20 Minutes',
          description: 'Remove mask and pat remaining essence into face and neck without rinsing.',
        },
      ],
      expertTip: 'Refrigerate for 10 minutes beforehand for an instant cryo-spa depuffing sensation.',
      precautions: 'Do not use on open wounds.',
    },
  },
  de: {
    name: 'Alps Hydro-Lifting Sheet Mask',
    shortName: 'Hydro-Lifting Tuchmaske',
    categoryLabel: 'TUCHMASKE',
    tag: 'SOFORT-LIFTING',
    subtitle: 'Bio-Cellulose Lifting Mask - Schweizer Alpen-Spa für zu Hause',
    description: 'Aus 0.2 mm feiner fermentierter Bio-Cellulose gewebt, schmiegt sich die Alps Hydro-Lifting Tuchmaske wie eine zweite Haut an und schleust 28ml reines Gletscher-Stammzellenserum tief ein.',
    keyIngredients: [
      'Hochfeine Bio-Cellulose-Membran (0.2 mm)',
      '28ml Hochkonzentriertes Gletscher-Wirkstoffserum pro Maske',
      'Schweizer Schneealgen-Extrakt für zelluläre Langlebigkeit',
      'Hexapeptid-8 Glättungskomplex gegen Mimikfältchen',
    ],
    benefits: [
      'Intensive Aufpolsterung in 15 Minuten und spürbare Kühlung um 3°C',
      'Strafft Gesichtskonturen und verbessert die Hautelastizität',
      'Beruhigt sonnenstrapazierte und gestresste Haut sofort',
      'Vollkommene Passform ohne Verrutschen bei alltäglicher Bewegung',
    ],
    usage: 'Schutznetze entfernen, Maske auf das gereinigte Gesicht auflegen, 15-20 Minuten entspannen und Reste sanft einklopfen.',
    routineStepTitle: 'Hydro-Lifting Tuchmaske',
    stockStatus: 'Auf Lager',
    expertTip: 'Vor der Anwendung 10 Minuten in den Kühlschrank legen für einen kühlenden Cryo-Effekt.',
    note: 'Bio-Cellulose & Argireline',
    detailedUsage: {
      timing: '2-3 Mal wöchentlich',
      amount: '1 Tuchmaske (28ml Serum)',
      suitableFor: 'Alle Hauttypen, ideal bei Feuchtigkeitsmangel und vor Anlässen',
      steps: [
        {
          step: 1,
          title: 'Auflegen',
          description: 'Schutznetz entfernen, die mittlere Bio-Cellulose-Maske auf das gereinigte Gesicht legen.',
        },
        {
          step: 2,
          title: 'Entspannen',
          description: '15-20 Minuten einwirken lassen, Maske abnehmen und Reste sanft einklopfen.',
        },
      ],
      expertTip: '10 Minuten vor Gebrauch kühlen für einen belebenden Kühleffekt.',
      precautions: 'Nicht auf verletzter Haut anwenden.',
    },
  },
  es: {
    name: 'Alps Hydro-Lifting Sheet Mask',
    shortName: 'Mascarilla Hidrolifting',
    categoryLabel: 'MASCARILLA',
    tag: 'EFECTO TENSOR',
    subtitle: 'Bio-Cellulose Lifting Mask - Experiencia de spa alpino en casa',
    description: 'Tejida en bio-celulosa ultrafina de 0.2 mm, Alps Hydro-Lifting Sheet Mask se adapta como una segunda piel e infunde 28ml de sérum concentrado de células madre glaciares en 15-20 minutos.',
    keyIngredients: [
      'Membrana de bio-celulosa fermentada ultrafina de 0.2 mm',
      '28ml de sérum concentrado de células madre glaciares por sobre',
      'Extracto de alga de las nieves suiza resistente al frío extremo',
      'Hexapéptido-8 tensor suavizante de líneas de expresión',
    ],
    benefits: [
      'Efecto relleno e hidratación profunda en 15 minutos, reduciendo 3°C la temperatura cutánea',
      'Efecto tensor visible que redefine el óvalo facial',
      'Calma al instante la piel fatigada, deshidratada o expuesta al sol',
      'Adherencia total segunda piel que permite moverse con total libertad',
    ],
    usage: 'Retirar las capas protectoras y colocar la máscara de bio-celulosa sobre el rostro. Dejar actuar 15-20 minutos y masajear el sérum restante sin aclarar.',
    routineStepTitle: 'Mascarilla Hidrolifting',
    stockStatus: 'En Stock',
    expertTip: 'Enfríala en la nevera durante 10 minutos antes de usar para un efecto desinflamante criogénico.',
    note: 'Bio-Celulosa y Argireline',
    detailedUsage: {
      timing: '2 a 3 veces por semana',
      amount: '1 sobre (28ml de ampolla concentrada)',
      suitableFor: 'Todo tipo de piel, piel deshidratada o antes de eventos',
      steps: [
        {
          step: 1,
          title: 'Colocar',
          description: 'Retirar la primera malla protectora y colocar la capa de gel en el rostro.',
        },
        {
          step: 2,
          title: 'Reposo',
          description: 'Dejar actuar 15-20 minutos y masajear el sérum sobrante sin aclarar.',
        },
      ],
      expertTip: 'Refrigerar 10 minutos antes de aplicar para un efecto tensor crio-spa.',
      precautions: 'No utilizar sobre heridas abiertas.',
    },
  },
  zh: {
    name: 'Alps Hydro-Lifting Sheet Mask',
    shortName: '水光提拉面膜',
    categoryLabel: '生物纤维水光膜',
    tag: '紧致提拉修护',
    subtitle: 'Bio-Cellulose Lifting Mask - 居家专享瑞士阿尔卑斯冰川水疗',
    description: 'Alps 水光提拉生物纤维面膜，精选0.2mm超细天然发酵生物纤维膜布，宛若第二层肌肤紧密贴合面部轮廓。每片承载整整 28ml 浓萃冰川干细胞精华，15-20分钟瞬现水光紧致。',
    keyIngredients: [
      '0.2mm 天然椰汁生物发酵超细生物纤维凝胶膜布',
      '每片奢含整整 28ml 高浓缩瑞士冰川干细胞安瓶精华',
      '瑞士极地雪藻 (Snow Algae) 逆境长寿活性精萃',
      '六胜肽 (Argireline) 表情纹紧致淡化多肽',
    ],
    benefits: [
      '15分钟瞬效水光饱满，表皮体感温度立降 3°C',
      '紧致下颌线轮廓，提升两颊回弹与饱满弹力',
      '迅速抚平晒后发红、长途差旅倦容及医美术后干燥',
      '360° 无缝贴合，敷贴时自由走动毫无滑落顾虑',
    ],
    usage: '揭开外层两层保护网膜，将中间生物纤维膜敷于洁净面部，静享15-20分钟，取下后按摩剩余精华至吸收，无需清洗。',
    routineStepTitle: '水光提拉面膜',
    stockStatus: '现货发售',
    expertTip: '使用前置于冰箱冷藏10分钟，体验如置身阿尔卑斯雪山的冰感紧肤SPA。',
    note: '椰汁生物纤维与六胜肽',
    detailedUsage: {
      timing: '每周2-3次或重要约会前急救',
      amount: '单片独立装（含整整28ml高定浓缩安瓶）',
      suitableFor: '所有肤质，特别适合急需补水、松弛垮脸与医美术后泛红干燥',
      steps: [
        {
          step: 1,
          title: '净颜展开',
          description: '洁面爽肤后展开面膜。本品共三层，取下第一层白色网膜。',
        },
        {
          step: 2,
          title: '贴合面部',
          description: '将中间半透明生物纤维面膜顺着面部轮廓轻抚贴合。',
        },
        {
          step: 3,
          title: '取下外网',
          description: '揭下外层保护网，抚平气泡，使其如第二层肌肤无缝紧贴。',
        },
        {
          step: 4,
          title: '静享水疗',
          description: '敷贴15-20分钟后揭下，指腹轻按至剩余浓缩精华被完全吸收。',
        },
      ],
      expertTip: '敷前面膜冷藏10分钟，尽享阿尔卑斯雪山水疗冰敷紧肤感。',
      precautions: '皮肤有破损伤口处请勿直接敷贴。',
    },
  },
};

export const PRODUCT_TRANSLATIONS: Record<string, Record<SupportedLanguage, LocalizedProductData>> = {
  'cleanser-gentle-purifying': CLEANSER_DATA,
  'cleanser': CLEANSER_DATA,

  'toner-botanical': TONER_DATA,
  'toner-botanical-balancing': TONER_DATA,
  'toner': TONER_DATA,

  'serum-radiance': SERUM_DATA,
  'serum-radiance-glow': SERUM_DATA,
  'serum': SERUM_DATA,

  'cream-regenerating': CREAM_DATA,
  'cream-regenerating-nourish': CREAM_DATA,
  'cream': CREAM_DATA,

  'mask-hydro-lifting': MASK_DATA,
  'mask': MASK_DATA,
};

export function getLocalizedProduct(product: { id: string }, language: SupportedLanguage): LocalizedProductData | undefined {
  return PRODUCT_TRANSLATIONS[product.id]?.[language] ||
         PRODUCT_TRANSLATIONS[product.id.split('-')[0]]?.[language];
}
