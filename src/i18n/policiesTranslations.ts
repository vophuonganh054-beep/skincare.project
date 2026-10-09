import { SupportedLanguage } from './translations';

export interface PolicySection {
  title: string;
  badge?: string;
  points: { title: string; desc: string }[];
  note?: string;
}

export interface PoliciesI18n {
  modalTitle: string;
  modalSubtitle?: string;
  brandTag?: string;
  tabs: {
    returns: string;
    shipping: string;
    privacy: string;
  };
  returnsPolicy: PolicySection;
  shippingPolicy: PolicySection;
  privacyPolicy: PolicySection;
  closeBtn: string;
  supportHelpText: string;
  openSupportBtn: string;
}

export const POLICIES_I18N: Record<SupportedLanguage, PoliciesI18n> = {
  vi: {
    modalTitle: 'Chính Sách & Cam Kết Dịch Vụ',
    brandTag: 'ALPS PURE ESSENCE • ZURICH & VIETNAM',
    tabs: {
      returns: 'ĐỔI TRẢ & HOÀN TIỀN (30 NGÀY)',
      shipping: 'VẬN CHUYỂN & GIAO NHẬN',
      privacy: 'BẢO MẬT & QUYỀN RIÊNG TƯ',
    },
    returnsPolicy: {
      title: 'Cam Kết Vàng: 30 Ngày Đổi Trả Miễn Phí Hoàn Tiền 100%',
      badge: 'BẢO CHỨNG Y KHOA KHÔNG RỦI RO',
      points: [
        {
          title: 'Đổi trả ngay cả khi đã mở nắp dùng thử',
          desc: 'Alps thấu hiểu làn da của mỗi người là độc bản. Nếu trong 30 ngày sử dụng có bất kỳ hiện tượng kích ứng hoặc không phù hợp, bạn được hoàn tiền 100% hoặc đổi sản phẩm khác mà không phải chịu bất kỳ chi phí phát sinh nào.',
        },
        {
          title: 'Quy trình hoàn tiền siêu tốc trong 24 giờ',
          desc: 'Ngay khi tiếp nhận yêu cầu qua Hotline 1900 8899 hoặc Chat CSKH, chuyên viên sẽ cử nhân viên bưu tá đến tận nhà thu hồi sản phẩm và hoàn tiền trực tiếp qua chuyển khoản ngân hàng trong vòng 24 giờ làm việc.',
        },
        {
          title: 'Hỗ trợ 1:1 từ Bác sĩ Da liễu Zurich',
          desc: 'Quý khách được chuyên viên da liễu theo dõi sát sao, tư vấn phác đồ phục hồi hàng rào ẩm và gửi tặng mẫu thử tương thích hoàn toàn miễn phí.',
        },
      ],
      note: 'Áp dụng cho mọi đơn hàng đặt trực tiếp trên website chính thức alps.id.vn hoặc các showroom chính hãng.',
    },
    shippingPolicy: {
      title: 'Chính Sách Giao Hàng Chuẩn Phòng Sạch Zurich',
      badge: 'ĐỒNG KIỂM & GIAO TẬN TAY',
      points: [
        {
          title: 'Miễn phí vận chuyển toàn quốc đơn từ 500.000₫',
          desc: 'Áp dụng cho tất cả các tỉnh thành trên toàn lãnh thổ Việt Nam. Đơn hàng dưới 500.000₫ áp dụng mức phí đồng giá ưu đãi chỉ 30.000₫.',
        },
        {
          title: 'Giao hỏa tốc 2 - 4 giờ tại TP.HCM & Hà Nội',
          desc: 'Đội ngũ giao nhận Alps Express bảo quản sản phẩm trong thùng giữ nhiệt chuyên dụng, chống sốc và chống tia cực tím để giữ trọn hoạt tính tế bào gốc sông băng.',
        },
        {
          title: 'Quyền lợi đồng kiểm trước khi nhận hàng',
          desc: 'Quý khách hoàn toàn được quyền mở thùng kiểm tra tem chống hàng giả, seal niêm phong và sản phẩm trước khi thanh toán cho shipper.',
        },
      ],
      note: 'Thời gian giao hàng: Nội thành 2 - 4 giờ; Các tỉnh thành khác 24 - 48 giờ.',
    },
    privacyPolicy: {
      title: 'Chính Sách Bảo Mật Chuẩn Ngân Hàng Quốc Tế',
      badge: 'MÃ HÓA SSL 256-BIT • TUÂN THỦ GDPR',
      points: [
        {
          title: 'Bảo mật thông tin thanh toán tuyệt đối',
          desc: 'Alps không lưu trữ thông tin thẻ ngân hàng của quý khách. Mọi giao dịch qua VietQR Napas 247 và thẻ Visa/Mastercard đều được mã hóa theo tiêu chuẩn quốc tế PCI-DSS Level 1.',
        },
        {
          title: 'Cam kết không chia sẻ dữ liệu cho bên thứ ba',
          desc: 'Thông tin cá nhân, số điện thoại, địa chỉ và lịch sử soi da chỉ được dùng để chăm sóc khách hàng và giao nhận đơn hàng của chính quý khách.',
        },
        {
          title: 'Quyền xóa dữ liệu cá nhân bất kỳ lúc nào',
          desc: 'Quý khách có toàn quyền yêu cầu xóa toàn bộ thông tin tài khoản hoặc lịch sử đơn hàng khỏi hệ thống bằng cách liên hệ cskh@alps.id.vn.',
        },
      ],
      note: 'Tuân thủ nghiêm ngặt Luật An toàn thông tin mạng Việt Nam và Quy định bảo vệ dữ liệu châu Âu (GDPR).',
    },
    closeBtn: 'Đóng',
    supportHelpText: 'Bạn cần hỗ trợ thêm về chính sách hoặc có câu hỏi riêng biệt?',
    openSupportBtn: 'Mở Trung Tâm CSKH 24/7',
  },

  en: {
    modalTitle: 'Policies & Client Commitments',
    modalSubtitle: 'ALPS PURE ESSENCE • ZURICH & INTERNATIONAL',
    tabs: {
      returns: '30-DAY COMPLIMENTARY RETURNS',
      shipping: 'SHIPPING & INSIGHTFUL DELIVERY',
      privacy: 'PRIVACY & DATA PROTECTION',
    },
    returnsPolicy: {
      title: 'Our Golden Commitment: 30-Day 100% Money-Back Guarantee',
      badge: 'RISK-FREE MEDICAL ASSURANCE',
      points: [
        {
          title: 'Eligible even if opened and sampled',
          desc: 'We recognize that every skin profile is unique. If during 30 days of use you experience any incompatibility or lack of visible improvement, we will issue a 100% refund with zero return fees.',
        },
        {
          title: 'Rapid 24-hour refund processing',
          desc: 'Upon receiving your request via phone or 24/7 AI chat, our courier will collect the product from your doorstep and wire funds back within 24 business hours.',
        },
        {
          title: 'Dedicated Swiss dermatologist consultation',
          desc: 'Receive 1-on-1 skin barrier recovery guidance and personalized samples curated by our Zurich dermatological team.',
        },
      ],
      note: 'Valid on all purchases completed through alps.id.vn and official flagship boutiques.',
    },
    shippingPolicy: {
      title: 'Zurich Cleanroom Inspected Shipping Standard',
      badge: 'OPEN-BOX INSPECTION GUARANTEED',
      points: [
        {
          title: 'Complimentary shipping on orders over $50 / 500,000₫',
          desc: 'Enjoy insured delivery nationwide and internationally. Flat fee of 30,000₫ on minor orders under the threshold.',
        },
        {
          title: 'Express 2-4 hour metro dispatch',
          desc: 'Packed in UV-blocking thermal insulated cleanroom boxes to safeguard fresh glacial stem cells from ambient heat.',
        },
        {
          title: 'Open-box inspection upon delivery',
          desc: 'You are welcome to inspect tamper-evident seals and product aesthetics prior to signing or completing cash on delivery.',
        },
      ],
      note: 'Delivery timeframe: Metro areas 2-4 hours; National 24-48 hours.',
    },
    privacyPolicy: {
      title: 'Bank-Grade Data Privacy & Confidentiality',
      badge: '256-BIT SSL ENCRYPTION • GDPR COMPLIANT',
      points: [
        {
          title: 'Zero storage of payment credentials',
          desc: 'Alps never retains credit card numbers. All payments through VietQR Napas and Visa/Mastercard are processed under PCI-DSS Level 1 certification.',
        },
        {
          title: 'Strict anti-disclosure pledge',
          desc: 'Your skin diagnostic history, phone number, and address are strictly used for delivery and dedicated client care.',
        },
        {
          title: 'Right to data erasure at any time',
          desc: 'You hold full control to modify or delete your account records upon written request to cskh@alps.id.vn.',
        },
      ],
      note: 'Strictly aligned with European General Data Protection Regulation (GDPR) standards.',
    },
    closeBtn: 'Close',
    supportHelpText: 'Have a specific inquiry regarding our terms or custom delivery?',
    openSupportBtn: 'Open 24/7 Client Center',
  },

  de: {
    modalTitle: 'Richtlinien & Kundenversprechen',
    modalSubtitle: 'ALPS PURE ESSENCE • ZÜRICH & INTERNATIONAL',
    tabs: {
      returns: '30 TAGE RÜCKGABEGARANTIE',
      shipping: 'VERSAND & ZUSTELLUNG',
      privacy: 'DATENSCHUTZ & SICHERHEIT',
    },
    returnsPolicy: {
      title: 'Unser Qualitätsversprechen: 30 Tage 100% Geld-zurück-Garantie',
      badge: 'RISIKOLOSE SCHWEIZER GARANTIE',
      points: [
        {
          title: 'Gültig auch bei geöffnetem und getestetem Produkt',
          desc: 'Jede Haut ist einzigartig. Sollte ein Produkt Ihre Haut reizen oder nicht Ihren Erwartungen entsprechen, erstatten wir Ihnen innerhalb von 30 Tagen 100% des Kaufpreises.',
        },
        {
          title: 'Express-Rückerstattung innerhalb von 24 Stunden',
          desc: 'Nach Ihrer Anfrage veranlassen wir die Abholung bei Ihnen zu Hause und überweisen den Betrag innerhalb von 24 Arbeitsstunden.',
        },
        {
          title: 'Persönliche dermatologische Beratung aus Zürich',
          desc: 'Unsere Spezialisten begleiten Sie auf Wunsch mit alternativen Schweizer Pflegeempfehlungen.',
        },
      ],
      note: 'Gültig für alle Einkäufe über die offizielle Website alps.id.vn.',
    },
    shippingPolicy: {
      title: 'Geprüfter Versand nach Schweizer Reinraum-Standards',
      badge: 'VERSIEGELTE LIEFERUNG',
      points: [
        {
          title: 'Kostenloser Versand ab 500.000₫ / ca. 50€',
          desc: 'Zuverlässige, versicherte Lieferung direkt an Ihre Wunschadresse.',
        },
        {
          title: 'Thermisch isolierte Schutzverpackung',
          desc: 'Schützt die empfindlichen Alpen-Wirkstoffe vor UV-Strahlung und Temperaturschwankungen.',
        },
        {
          title: 'Prüfung vor Annahme gestattet',
          desc: 'Sie dürfen die Unversehrtheit des Siegels vor Bezahlung oder Unterschrift persönlich prüfen.',
        },
      ],
      note: 'Lieferzeiten: Metropolen 2-4 Stunden; National 24-48 Stunden.',
    },
    privacyPolicy: {
      title: 'Datenschutz auf Schweizer Bankenniveau',
      badge: '256-BIT SSL • DSGVO-KONFORM',
      points: [
        {
          title: 'Keine Speicherung sensibler Zahlungsdaten',
          desc: 'Zahlungen erfolgen über zertifizierte PCI-DSS Level 1 Gateways mit 3D-Secure-Verschlüsselung.',
        },
        {
          title: 'Keine Weitergabe an Dritte',
          desc: 'Ihre Hautanalysen und Kontaktdaten werden vertraulich und ausschließlich für Ihre Betreuung genutzt.',
        },
        {
          title: 'Recht auf vollständige Löschung',
          desc: 'Sie können die Löschung Ihres Kundenkontos jederzeit per E-Mail an cskh@alps.id.vn veranlassen.',
        },
      ],
      note: 'Vollständig konform mit den Richtlinien der europäischen Datenschutz-Grundverordnung (DSGVO).',
    },
    closeBtn: 'Schließen',
    supportHelpText: 'Benötigen Sie weitere Informationen zu unseren Richtlinien?',
    openSupportBtn: '24/7 Kundenservice öffnen',
  },

  es: {
    modalTitle: 'Políticas y Compromisos de Servicio',
    modalSubtitle: 'ALPS PURE ESSENCE • ZÚRICH E INTERNACIONAL',
    tabs: {
      returns: 'DEVOLUCIONES EN 30 DÍAS',
      shipping: 'ENVÍOS Y ENTREGAS',
      privacy: 'PRIVACIDAD Y SEGURIDAD',
    },
    returnsPolicy: {
      title: 'Compromiso de Excelencia: 30 Días de Reembolso del 100%',
      badge: 'GARANTÍA MÉDICA SIN RIESGO',
      points: [
        {
          title: 'Válido incluso tras haber probado el producto',
          desc: 'Si durante los primeros 30 días el producto no se adapta perfectamente a su piel, le reembolsaremos el 100% de su dinero sin gastos de devolución.',
        },
        {
          title: 'Reembolso rápido en 24 horas laborables',
          desc: 'Tras contactar con nuestro equipo, gestionamos la recogida a domicilio y procesamos la devolución del importe de inmediato.',
        },
        {
          title: 'Seguimiento con dermatólogos de Zúrich',
          desc: 'Ponemos a su disposición asesoramiento clínico gratuito para encontrar la rutina ideal para su barrera cutánea.',
        },
      ],
      note: 'Válido para compras en el sitio web oficial alps.id.vn.',
    },
    shippingPolicy: {
      title: 'Estándar de Envío Protegido de Sala Limpia Zúrich',
      badge: 'INSPECCIÓN EN LA ENTREGA',
      points: [
        {
          title: 'Envío gratuito a partir de 500.000₫ / $50',
          desc: 'Disfrute de entregas aseguradas en todo el territorio con tarifa reducida para pedidos menores.',
        },
        {
          title: 'Embalaje térmico aislante contra rayos UV',
          desc: 'Protege las células madre glaciares y principios botánicos para que lleguen con su máxima bioactividad.',
        },
        {
          title: 'Derecho a comprobar el paquete antes de pagar',
          desc: 'Puede revisar el precinto de seguridad del envase antes de confirmar la recepción.',
        },
      ],
      note: 'Plazo: Centros urbanos 2-4 horas; Resto de destinos 24-48 horas.',
    },
    privacyPolicy: {
      title: 'Privacidad y Protección de Datos Bancaria',
      badge: 'CIFRADO SSL DE 256 BITS • CONFORME A RGPD',
      points: [
        {
          title: 'No almacenamos sus datos bancarios',
          desc: 'Todas las transacciones se realizan bajo los estándares internacionales PCI-DSS Nivel 1.',
        },
        {
          title: 'Confidencialidad absoluta de su historial',
          desc: 'Sus datos de diagnóstico dérmico y contacto nunca se comparten con terceros.',
        },
        {
          title: 'Derecho de supresión cuando lo solicite',
          desc: 'Puede solicitar la eliminación total de sus datos escribiendo a cskh@alps.id.vn.',
        },
      ],
      note: 'En estricto cumplimiento con el Reglamento General de Protección de Datos (RGPD) europeo.',
    },
    closeBtn: 'Cerrar',
    supportHelpText: '¿Tiene alguna pregunta específica sobre nuestras condiciones?',
    openSupportBtn: 'Abrir Soporte 24/7',
  },

  zh: {
    modalTitle: '服务政策与无忧承诺',
    modalSubtitle: 'ALPS PURE ESSENCE • 瑞士苏黎世与全球',
    tabs: {
      returns: '30 天无忧退换货保障',
      shipping: '保价配送与开箱验货',
      privacy: '数据安全与隐私政策',
    },
    returnsPolicy: {
      title: '黄金承诺：30天安心试用 100% 全额退款保证',
      badge: '医研级零风险安心保证',
      points: [
        {
          title: '即使已开封使用，依然尊享退换特权',
          desc: 'Alps 深知每一位用户的肌肤都是独一无二的。签收后 30 天内，若使用过程中出现任何不适或不耐受现象，我们均支持 100% 全额退款或免费更换产品，无需您承担额外运费。',
        },
        {
          title: '24 小时内极速原路返还款项',
          desc: '通过热线 1900 8899 或在线 AI 客服提交需求后，顺丰小哥将上门取件，款项将在 24 个工作小时内核实并原路退回。',
        },
        {
          title: '苏黎世皮肤专研团队 1 对 1 指导',
          desc: '资深护肤顾问将全程关注您的皮脂膜修复状态，并免费提供更适宜您肤质的瑞士纯素体验装。',
        },
      ],
      note: '适用于在官方旗舰网站 alps.id.vn 及授权专柜购买的所有订单。',
    },
    shippingPolicy: {
      title: '瑞士苏黎世洁净室级保价冷链配送标准',
      badge: '支持开箱验货 • 顺丰特快',
      points: [
        {
          title: '全场实付满 500,000₫ / $50 尊享包邮',
          desc: '全国各大省市顺丰特快直达，不满包邮门槛仅收取 30,000₫ 优惠运费。',
        },
        {
          title: '核心城市 2 - 4 小时极速达',
          desc: '定制专用防震保温铝箔纸箱，阻隔 99.8% 紫外线与外界高温，完整封存冰川干细胞鲜活营养。',
        },
        {
          title: '尊享签收前开箱验货权益',
          desc: '您可在快递员派送时开箱核对防伪标识、瓶身封签，确认无误后再行签收。',
        },
      ],
      note: '配送时效：核心市区 2 - 4 小时；全国其他地区 24 - 48 小时。',
    },
    privacyPolicy: {
      title: '国际金融机构级数据安全与隐私防护',
      badge: '256 位 SSL 强加密 • 严格遵循 GDPR',
      points: [
        {
          title: '严禁保存任何银行卡敏感信息',
          desc: 'Alps 绝不在本地服务器储存用户支付卡号。所有 VietQR 与国际信用卡结算均通过 PCI-DSS Level 1 认证通道。',
        },
        {
          title: '绝不对外泄露用户隐私与测肤档案',
          desc: '您的姓名、电话、收货地址与 AI 智能测肤健康档案仅供为您提供专享服务使用。',
        },
        {
          title: '支持随时自主注销与删除个人数据',
          desc: '您拥有完全的数据自主权，随时可通过发送邮件至 cskh@alps.id.vn 申请注销档案。',
        },
      ],
      note: '严格遵循欧盟通用数据保护条例 (GDPR) 与各国数据合规法规。',
    },
    closeBtn: '关闭',
    supportHelpText: '若您对以上条款有任何个性化疑问，欢迎随时垂询：',
    openSupportBtn: '打开 24/7 客户支持中心',
  },
};
