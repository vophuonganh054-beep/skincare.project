import { SupportedLanguage } from './translations';

export interface ReviewsTranslations {
  sectionTitle: string;
  sectionSubtitle: string;
  verifiedBuyerBadge: string;
  writeReviewBtn: string;
  closeFormBtn: string;
  formTitle: string;
  ratingLabel: string;
  nameLabel: string;
  namePlaceholder: string;
  skinTypeLabel: string;
  skinTypes: string[];
  commentLabel: string;
  commentPlaceholder: string;
  submitBtn: string;
  validationError: string;
  submitSuccessToast: string;
  noReviewsTitle: string;
  noReviewsDesc: string;
  filterAll: string;
  filterStars: (stars: number) => string;
  helpfulBtn: string;
}

export const REVIEWS_I18N: Record<SupportedLanguage, ReviewsTranslations> = {
  vi: {
    sectionTitle: 'Đánh Giá & Trải Nghiệm Khách Hàng',
    sectionSubtitle: 'Những cảm nhận chân thật từ khách hàng đã trải nghiệm sản phẩm Alps Pure Essence.',
    verifiedBuyerBadge: 'Đã mua hàng chính hãng',
    writeReviewBtn: 'Viết Đánh Giá',
    closeFormBtn: 'Đóng biểu mẫu',
    formTitle: 'Chia Sẻ Trải Nghiệm Của Bạn',
    ratingLabel: 'Đánh giá của bạn về sản phẩm:',
    nameLabel: 'Họ và tên của bạn:',
    namePlaceholder: 'Nhập tên của bạn...',
    skinTypeLabel: 'Loại da của bạn:',
    skinTypes: [
      'Da nhạy cảm, dễ kích ứng',
      'Da hỗn hợp thiên dầu',
      'Da khô thiếu nước',
      'Da dầu mụn',
      'Da lão hóa, nếp nhăn',
      'Da thường cân bằng',
    ],
    commentLabel: 'Cảm nhận chi tiết:',
    commentPlaceholder: 'Chia sẻ cảm nhận về kết cấu, mùi hương và hiệu quả trên da...',
    submitBtn: 'Gửi Đánh Giá',
    validationError: 'Vui lòng nhập họ tên và nội dung đánh giá.',
    submitSuccessToast: '✓ Cảm ơn bạn! Đánh giá đã được lưu và hiển thị công khai.',
    noReviewsTitle: 'Chưa có đánh giá nào cho sản phẩm này',
    noReviewsDesc: 'Hãy là người đầu tiên trải nghiệm và chia sẻ cảm nhận chân thật về công thức thuần chay Thụy Sĩ này!',
    filterAll: 'Tất cả',
    filterStars: (s) => `${s} Sao`,
    helpfulBtn: 'Hữu ích',
  },

  en: {
    sectionTitle: 'Client Testimonials & Feedback',
    sectionSubtitle: 'Authentic reviews from verified clients experiencing Alps Pure Essence skincare rituals.',
    verifiedBuyerBadge: 'Verified Purchase',
    writeReviewBtn: 'Write a Review',
    closeFormBtn: 'Close form',
    formTitle: 'Share Your Experience',
    ratingLabel: 'Your rating for this formulation:',
    nameLabel: 'Your full name:',
    namePlaceholder: 'Enter your name...',
    skinTypeLabel: 'Your biometric skin type:',
    skinTypes: [
      'Sensitive & reactive skin',
      'Combination oily skin',
      'Dry & dehydrated skin',
      'Oily & blemish-prone skin',
      'Aging & fine-line prone',
      'Normal balanced skin',
    ],
    commentLabel: 'Detailed experience:',
    commentPlaceholder: 'Describe texture absorption, botanical scent, and observable skin results...',
    submitBtn: 'Submit Review',
    validationError: 'Please provide both your name and review comments.',
    submitSuccessToast: '✓ Thank you! Your review has been saved and published.',
    noReviewsTitle: 'No reviews yet for this product',
    noReviewsDesc: 'Be the first to experience this Swiss cellular formulation and share your authentic impression!',
    filterAll: 'All',
    filterStars: (s) => `${s} Stars`,
    helpfulBtn: 'Helpful',
  },

  de: {
    sectionTitle: 'Kundenstimmen & Erfahrungen',
    sectionSubtitle: 'Authentische Rückmeldungen von Kunden, die das Alps Pflegeritual erlebt haben.',
    verifiedBuyerBadge: 'Verifizierter Kauf',
    writeReviewBtn: 'Bewertung schreiben',
    closeFormBtn: 'Formular schließen',
    formTitle: 'Teilen Sie Ihre Erfahrung',
    ratingLabel: 'Ihre Bewertung für dieses Produkt:',
    nameLabel: 'Ihr vollständiger Name:',
    namePlaceholder: 'Name eingeben...',
    skinTypeLabel: 'Ihr Hauttyp:',
    skinTypes: [
      'Empfindliche & reaktive Haut',
      'Ölige Mischhaut',
      'Trockene, feuchtigkeitsarme Haut',
      'Ölige, zu Unreinheiten neigende Haut',
      'Reife Haut & Fältchen',
      'Normale, ausgeglichene Haut',
    ],
    commentLabel: 'Ihre persönliche Erfahrung:',
    commentPlaceholder: 'Beschreiben Sie Textur, Duft und spürbare Pflegeergebnisse...',
    submitBtn: 'Bewertung absenden',
    validationError: 'Bitte geben Sie Ihren Namen und einen Bewertungstext ein.',
    submitSuccessToast: '✓ Vielen Dank! Ihre Bewertung wurde erfolgreich veröffentlicht.',
    noReviewsTitle: 'Noch keine Bewertungen für dieses Produkt',
    noReviewsDesc: 'Seien Sie der Erste, der diese Schweizer Rezeptur ausprobiert und seine Meinung teilt!',
    filterAll: 'Alle',
    filterStars: (s) => `${s} Sterne`,
    helpfulBtn: 'Hilfreich',
  },

  es: {
    sectionTitle: 'Opiniones y Valoraciones',
    sectionSubtitle: 'Comentarios auténticos de clientes tras probar las fórmulas botánicas de Alps Pure Essence.',
    verifiedBuyerBadge: 'Compra Verificada',
    writeReviewBtn: 'Escribir Opinión',
    closeFormBtn: 'Cerrar formulario',
    formTitle: 'Comparta su Experiencia',
    ratingLabel: 'Su puntuación del producto:',
    nameLabel: 'Nombre completo:',
    namePlaceholder: 'Introduzca su nombre...',
    skinTypeLabel: 'Su tipo de piel:',
    skinTypes: [
      'Piel sensible o reactiva',
      'Piel mixta con tendencia grasa',
      'Piel seca o deshidratada',
      'Piel grasa o con imperfecciones',
      'Piel con signos de la edad',
      'Piel normal equilibrada',
    ],
    commentLabel: 'Detalles de su experiencia:',
    commentPlaceholder: 'Comente la absorción de la textura, el aroma natural y los resultados visibles...',
    submitBtn: 'Publicar Opinión',
    validationError: 'Por favor, rellene su nombre y los comentarios de su opinión.',
    submitSuccessToast: '✓ ¡Gracias! Su opinión ha sido guardada y publicada.',
    noReviewsTitle: 'Aún no hay opiniones para este producto',
    noReviewsDesc: '¡Sea la primera persona en probar esta fórmula celular suiza y compartir su testimonio!',
    filterAll: 'Todas',
    filterStars: (s) => `${s} Estrellas`,
    helpfulBtn: 'Útil',
  },

  zh: {
    sectionTitle: '用户挚爱评价与心声',
    sectionSubtitle: '来自真实用户在体验瑞士 Alps Pure Essence 纯素美肌礼仪后的真实反馈。',
    verifiedBuyerBadge: '官方核验购买',
    writeReviewBtn: '撰写体验评价',
    closeFormBtn: '收起评价表单',
    formTitle: '分享您的真实使用体验',
    ratingLabel: '您对该产品的满意度评分:',
    nameLabel: '您的姓名或称呼:',
    namePlaceholder: '输入您的称谓...',
    skinTypeLabel: '您的肤质类型:',
    skinTypes: [
      '敏弱肌 / 易泛红脆弱',
      '混合偏油性肤质',
      '干燥缺水性肤质',
      '油痘肌 / 毛孔粗大',
      '初老细纹 / 弹力流失',
      '中性健康平衡肤质',
    ],
    commentLabel: '详细使用感受:',
    commentPlaceholder: '分享产品的吸收质地、天然植萃香调以及在肌肤上的改变...',
    submitBtn: '提交我的评价',
    validationError: '请完整填写您的姓名与评价感受。',
    submitSuccessToast: '✓ 感谢您的宝贵分享！您的评价已正式发布呈现。',
    noReviewsTitle: '本产品暂无公开评价',
    noReviewsDesc: '快来成为第一位亲身体验这款瑞士冰川干细胞配方并留下心得的贵宾吧！',
    filterAll: '全部',
    filterStars: (s) => `${s} 星`,
    helpfulBtn: '有帮助',
  },
};
