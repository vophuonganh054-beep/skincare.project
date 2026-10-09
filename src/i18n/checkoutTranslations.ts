import { SupportedLanguage } from './translations';

export interface CheckoutTranslations {
  cart: {
    freeShippingQualified: string;
    addMoreForFreeShipping: (amount: string) => string;
    swissOriginalGuarantee: string;
    freeShippingBadge: string;
    giftPrivilegeBadge: string;
    voucherPlaceholder: string;
    voucherApplyBtn: string;
    voucherApplied: (code: string) => string;
    voucherInvalid: string;
    voucherDiscountLabel: string;
    securePaymentAccepted: string;
    removeConfirm: string;
  };
  checkout: {
    modalTitle: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    recipientHeader: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    addressLabel: string;
    addressPlaceholder: string;
    noteLabel: string;
    notePlaceholder: string;
    carrierHeader: string;
    carrierStandard: string;
    carrierFast: string;
    carrierExpress: string;
    paymentHeader: string;
    payVietQRTitle: string;
    payVietQRDesc: string;
    payCardTitle: string;
    payCardDesc: string;
    payCODTitle: string;
    payCODDesc: string;
    cardNumberLabel: string;
    cardHolderLabel: string;
    cardExpiryLabel: string;
    cardCvvLabel: string;
    cardSecureHint: string;
    orderSummaryTitle: string;
    subtotalLabel: string;
    shippingLabel: string;
    discountLabel: string;
    totalLabel: string;
    placeOrderBtn: string;
    processingBtn: string;
    validationError: string;
    policyAgreeText: string;
    guarantee30Days: string;
    sslSecureText: string;
  };
  success: {
    title: string;
    subtitle: string;
    orderCodeLabel: string;
    recipientInfoTitle: string;
    nameLabel: string;
    phoneLabel: string;
    addressLabel: string;
    shippingCarrierLabel: string;
    paymentMethodLabel: string;
    totalPaidLabel: string;
    trackingNoticeTitle: string;
    trackingNoticeDesc: string;
    viewOrdersBtn: string;
    continueShoppingBtn: string;
    needHelpBtn: string;
  };
  account: {
    drawerTitle: string;
    guestGreeting: string;
    guestDesc: string;
    tabOrders: string;
    tabProfile: string;
    tabLogin: string;
    tabRegister: string;
    filterAll: string;
    filterProcessing: string;
    filterShipping: string;
    filterDelivered: string;
    emptyOrdersTitle: string;
    emptyOrdersDesc: string;
    orderCodePrefix: string;
    orderDatePrefix: string;
    orderStatusProcessing: string;
    orderStatusShipping: string;
    orderStatusDelivered: string;
    reorderBtn: string;
    editAddressBtn: string;
    saveAddressBtn: string;
    cancelBtn: string;
    logoutBtn: string;
    loginIdentifierLabel: string;
    loginIdentifierPlaceholder: string;
    loginPasswordLabel: string;
    loginPasswordPlaceholder: string;
    rememberMe: string;
    forgotPassword: string;
    forgotPasswordTip: string;
    loginBtn: string;
    registerBtn: string;
    switchRegisterText: string;
    switchRegisterLink: string;
    switchLoginText: string;
    switchLoginLink: string;
    pointsLabel: string;
    tierLabel: string;
    profileSavedSuccess: string;
    addressUpdatedSuccess: string;
  };
}

export const CHECKOUT_I18N: Record<SupportedLanguage, CheckoutTranslations> = {
  vi: {
    cart: {
      freeShippingQualified: 'Đã đủ điều kiện Miễn phí vận chuyển!',
      addMoreForFreeShipping: (amount) => `Mua thêm ${amount}₫ để FREESHIP`,
      swissOriginalGuarantee: '100% Chính hãng Alps • Công thức hữu cơ lành tính',
      freeShippingBadge: 'Miễn phí giao hàng toàn quốc từ 500.000₫',
      giftPrivilegeBadge: 'Tặng kèm quà đặc quyền cho mỗi đơn hàng',
      voucherPlaceholder: 'Mã giảm giá (ví dụ: ALPS2025)',
      voucherApplyBtn: 'Áp dụng',
      voucherApplied: (code) => `✓ Đã áp dụng mã ${code} (-10%)`,
      voucherInvalid: 'Mã không hợp lệ. Hãy thử mã ALPS2025',
      voucherDiscountLabel: 'Giảm giá voucher',
      securePaymentAccepted: 'Chấp nhận thanh toán bảo mật:',
      removeConfirm: 'Xóa khỏi giỏ',
    },
    checkout: {
      modalTitle: 'Thanh Toán & Đặt Hàng Bảo Mật',
      step1Title: 'Thông tin nhận hàng',
      step2Title: 'Đơn vị vận chuyển',
      step3Title: 'Phương thức thanh toán',
      recipientHeader: 'Thông tin người nhận',
      nameLabel: 'Họ và tên *',
      namePlaceholder: 'Ví dụ: Nguyễn Phương Anh',
      phoneLabel: 'Số điện thoại *',
      phonePlaceholder: 'Ví dụ: 0908 123 489',
      emailLabel: 'Địa chỉ Email (nhận hóa đơn điện tử)',
      emailPlaceholder: 'email@domain.com',
      addressLabel: 'Địa chỉ giao hàng chi tiết *',
      addressPlaceholder: 'Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành',
      noteLabel: 'Ghi chú giao hàng (tùy chọn)',
      notePlaceholder: 'Giao giờ hành chính, gọi trước khi đến...',
      carrierHeader: 'Đơn vị vận chuyển uy tín',
      carrierStandard: 'Giao Hàng Tiết Kiệm (GHTK) • 24 - 48h',
      carrierFast: 'Giao Hàng Nhanh (GHN) • 24 - 36h',
      carrierExpress: 'Hỏa Tốc Nội Thành Alps Express • 2 - 4h',
      paymentHeader: 'Chọn phương thức thanh toán an toàn',
      payVietQRTitle: 'Quét mã VietQR Napas 247 (Khuyên dùng)',
      payVietQRDesc: 'Thanh toán tức thì qua MB Bank hoặc bất kỳ ứng dụng ngân hàng nào. Tự động xác nhận trong 3 giây.',
      payCardTitle: 'Thẻ Quốc Tế (Visa / Mastercard / JCB)',
      payCardDesc: 'Thanh toán trực tuyến mã hóa SSL 256-bit chuẩn 3D Secure quốc tế.',
      payCODTitle: 'Thanh toán khi nhận hàng (COD)',
      payCODDesc: 'Được kiểm tra hàng trước khi thanh toán. Tiền mặt cho nhân viên giao hàng.',
      cardNumberLabel: 'Số thẻ thanh toán',
      cardHolderLabel: 'Tên in trên thẻ (không dấu)',
      cardExpiryLabel: 'Hạn dùng (MM/YY)',
      cardCvvLabel: 'Mã CVV',
      cardSecureHint: 'Giao dịch được bảo vệ bởi công nghệ mã hóa ngân hàng 3D Secure.',
      orderSummaryTitle: 'Tóm tắt đơn hàng',
      subtotalLabel: 'Tạm tính:',
      shippingLabel: 'Phí vận chuyển:',
      discountLabel: 'Giảm giá voucher:',
      totalLabel: 'Tổng thanh toán:',
      placeOrderBtn: 'Xác Nhận Đặt Hàng Ngay',
      processingBtn: 'Đang xử lý đặt hàng...',
      validationError: 'Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ giao hàng.',
      policyAgreeText: 'Bằng việc đặt hàng, bạn đồng ý với Điều khoản & Chính sách đổi trả 30 ngày của Alps.',
      guarantee30Days: 'Cam kết 30 ngày hoàn tiền 100% không rủi ro',
      sslSecureText: 'Bảo mật SSL 256-bit chuẩn PCI-DSS',
    },
    success: {
      title: 'Đặt Hàng Thành Công!',
      subtitle: 'Cảm ơn quý khách đã tin tưởng lựa chọn dược mỹ phẩm thuần chay Thụy Sĩ Alps Pure Essence.',
      orderCodeLabel: 'Mã Đơn Hàng:',
      recipientInfoTitle: 'Thông tin giao nhận',
      nameLabel: 'Người nhận:',
      phoneLabel: 'Số điện thoại:',
      addressLabel: 'Địa chỉ nhận:',
      shippingCarrierLabel: 'Vận chuyển qua:',
      paymentMethodLabel: 'Hình thức thanh toán:',
      totalPaidLabel: 'Tổng tiền thanh toán:',
      trackingNoticeTitle: 'Theo dõi hành trình',
      trackingNoticeDesc: 'Hệ thống đã gửi email xác nhận. Đơn hàng đang được đóng gói trong thùng bảo ôn chuẩn phòng sạch Zurich.',
      viewOrdersBtn: 'Xem Danh Mục Đã Mua',
      continueShoppingBtn: 'Tiếp Tục Mua Sắm',
      needHelpBtn: 'Cần hỗ trợ? Gọi 1900 8899',
    },
    account: {
      drawerTitle: 'Tài Khoản & Lịch Sử Mua Hàng',
      guestGreeting: 'Chào mừng quý khách đến với Alps Pure Essence',
      guestDesc: 'Đăng nhập để tích lũy điểm Alps Privileges hoặc theo dõi đơn hàng đã mua.',
      tabOrders: 'Đơn Hàng Đã Mua',
      tabProfile: 'Thông Tin Cá Nhân',
      tabLogin: 'Đăng Nhập',
      tabRegister: 'Đăng Ký',
      filterAll: 'Tất cả',
      filterProcessing: 'Đang chuẩn bị',
      filterShipping: 'Đang vận chuyển',
      filterDelivered: 'Đã giao thành công',
      emptyOrdersTitle: 'Chưa có đơn hàng nào',
      emptyOrdersDesc: 'Khi bạn đặt hàng trên website alps.id.vn, thông tin đơn hàng và mã vận đơn sẽ hiển thị tại đây.',
      orderCodePrefix: 'Đơn hàng #',
      orderDatePrefix: 'Ngày đặt:',
      orderStatusProcessing: 'Đang chuẩn bị hàng',
      orderStatusShipping: 'Đang giao hàng',
      orderStatusDelivered: 'Giao thành công',
      reorderBtn: 'Mua lại đơn này',
      editAddressBtn: 'Đổi địa chỉ nhận',
      saveAddressBtn: 'Lưu thay đổi',
      cancelBtn: 'Hủy',
      logoutBtn: 'Đăng xuất tài khoản',
      loginIdentifierLabel: 'Email hoặc Số điện thoại',
      loginIdentifierPlaceholder: 'Nhập email hoặc SĐT...',
      loginPasswordLabel: 'Mật khẩu',
      loginPasswordPlaceholder: 'Nhập mật khẩu...',
      rememberMe: 'Ghi nhớ đăng nhập',
      forgotPassword: 'Quên mật khẩu?',
      forgotPasswordTip: 'Vui lòng liên hệ Hotline 1900 8899 để chuyên viên cấp lại mật khẩu an toàn.',
      loginBtn: 'Đăng Nhập Ngay',
      registerBtn: 'Tạo Tài Khoản Mới',
      switchRegisterText: 'Chưa có tài khoản?',
      switchRegisterLink: 'Đăng ký nhận 100 điểm thưởng',
      switchLoginText: 'Đã có tài khoản?',
      switchLoginLink: 'Đăng nhập',
      pointsLabel: 'Điểm tích lũy:',
      tierLabel: 'Hạng thành viên:',
      profileSavedSuccess: 'Đã lưu thông tin người nhận và địa chỉ thành công!',
      addressUpdatedSuccess: 'Đã cập nhật địa chỉ giao hàng thành công!',
    },
  },

  en: {
    cart: {
      freeShippingQualified: 'Free Shipping unlocked!',
      addMoreForFreeShipping: (amount) => `Add ${amount}₫ more for FREE SHIPPING`,
      swissOriginalGuarantee: '100% Authentic Alps • Clean bio-organic formulations',
      freeShippingBadge: 'Free shipping on orders over 500,000₫ / $50',
      giftPrivilegeBadge: 'Complimentary luxury gift with every purchase',
      voucherPlaceholder: 'Promo code (e.g. ALPS2025)',
      voucherApplyBtn: 'Apply',
      voucherApplied: (code) => `✓ Promo code ${code} applied (-10%)`,
      voucherInvalid: 'Invalid code. Try ALPS2025',
      voucherDiscountLabel: 'Promo discount',
      securePaymentAccepted: 'Secure payments guaranteed:',
      removeConfirm: 'Remove item',
    },
    checkout: {
      modalTitle: 'Secure Checkout & Payment',
      step1Title: 'Delivery Details',
      step2Title: 'Shipping Carrier',
      step3Title: 'Payment Method',
      recipientHeader: 'Recipient Information',
      nameLabel: 'Full Name *',
      namePlaceholder: 'e.g. Eleanor Vance',
      phoneLabel: 'Phone Number *',
      phonePlaceholder: 'e.g. +1 555 019 2834',
      emailLabel: 'Email Address (for e-receipt)',
      emailPlaceholder: 'client@example.com',
      addressLabel: 'Full Shipping Address *',
      addressPlaceholder: 'Street address, apartment, city, state/province, postal code',
      noteLabel: 'Delivery Note (optional)',
      notePlaceholder: 'Leave at front desk, call upon arrival...',
      carrierHeader: 'Select Delivery Carrier',
      carrierStandard: 'Standard Inspected Delivery • 24 - 48h',
      carrierFast: 'Priority Air Express • 24 - 36h',
      carrierExpress: 'Alps Metro Same-Day Express • 2 - 4h',
      paymentHeader: 'Select Payment Method',
      payVietQRTitle: 'VietQR / Direct Bank Transfer',
      payVietQRDesc: 'Instant domestic bank QR code. Auto-verified in seconds.',
      payCardTitle: 'International Credit / Debit Card',
      payCardDesc: 'Visa, Mastercard, JCB with 256-bit SSL and 3D Secure encryption.',
      payCODTitle: 'Cash on Delivery (COD)',
      payCODDesc: 'Inspect products upon arrival before payment in cash.',
      cardNumberLabel: 'Card Number',
      cardHolderLabel: 'Cardholder Name',
      cardExpiryLabel: 'Expiry (MM/YY)',
      cardCvvLabel: 'CVV Security Code',
      cardSecureHint: 'Protected by PCI-DSS Level 1 bank-grade encryption.',
      orderSummaryTitle: 'Order Summary',
      subtotalLabel: 'Subtotal:',
      shippingLabel: 'Shipping:',
      discountLabel: 'Voucher Discount:',
      totalLabel: 'Total Amount:',
      placeOrderBtn: 'Place Order Now',
      processingBtn: 'Processing Order...',
      validationError: 'Please provide full name, phone number, and delivery address.',
      policyAgreeText: 'By placing this order, you agree to Alps Terms and 30-Day Return Guarantee.',
      guarantee30Days: 'Risk-free 30-day 100% money-back guarantee',
      sslSecureText: '256-bit SSL encrypted & PCI-DSS compliant',
    },
    success: {
      title: 'Order Confirmed!',
      subtitle: 'Thank you for choosing Alps Pure Essence Swiss vegan dermocosmetics.',
      orderCodeLabel: 'Order Code:',
      recipientInfoTitle: 'Delivery Details',
      nameLabel: 'Recipient:',
      phoneLabel: 'Phone:',
      addressLabel: 'Address:',
      shippingCarrierLabel: 'Carrier:',
      paymentMethodLabel: 'Payment:',
      totalPaidLabel: 'Total Paid:',
      trackingNoticeTitle: 'Order Fulfillment Tracking',
      trackingNoticeDesc: 'Confirmation email sent. Your items are being packed in cleanroom-certified thermal cartons.',
      viewOrdersBtn: 'View Purchases',
      continueShoppingBtn: 'Continue Shopping',
      needHelpBtn: 'Need Assistance? Call 1900 8899',
    },
    account: {
      drawerTitle: 'Client Account & Order History',
      guestGreeting: 'Welcome to Alps Pure Essence',
      guestDesc: 'Sign in to access tier privileges or review previous purchases.',
      tabOrders: 'Purchased Orders',
      tabProfile: 'Profile Information',
      tabLogin: 'Sign In',
      tabRegister: 'Create Account',
      filterAll: 'All',
      filterProcessing: 'Processing',
      filterShipping: 'In Transit',
      filterDelivered: 'Delivered',
      emptyOrdersTitle: 'No orders yet',
      emptyOrdersDesc: 'Your purchased items and real-time tracking numbers will appear here.',
      orderCodePrefix: 'Order #',
      orderDatePrefix: 'Placed on:',
      orderStatusProcessing: 'Processing at Zurich Lab',
      orderStatusShipping: 'Dispatched in Transit',
      orderStatusDelivered: 'Delivered Successfully',
      reorderBtn: 'Reorder this item',
      editAddressBtn: 'Update Address',
      saveAddressBtn: 'Save Changes',
      cancelBtn: 'Cancel',
      logoutBtn: 'Sign Out',
      loginIdentifierLabel: 'Email or Phone Number',
      loginIdentifierPlaceholder: 'Enter email or phone...',
      loginPasswordLabel: 'Password',
      loginPasswordPlaceholder: 'Enter password...',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      forgotPasswordTip: 'Contact hotline 1900 8899 for instant credential recovery.',
      loginBtn: 'Sign In',
      registerBtn: 'Create Account',
      switchRegisterText: 'Don’t have an account?',
      switchRegisterLink: 'Register for 100 welcome points',
      switchLoginText: 'Already registered?',
      switchLoginLink: 'Sign in here',
      pointsLabel: 'Reward Points:',
      tierLabel: 'Member Tier:',
      profileSavedSuccess: 'Profile and delivery address updated successfully!',
      addressUpdatedSuccess: 'Shipping address updated for this order!',
    },
  },

  de: {
    cart: {
      freeShippingQualified: 'Kostenloser Versand freigeschaltet!',
      addMoreForFreeShipping: (amount) => `Noch ${amount}₫ für KOSTENLOSEN VERSAND`,
      swissOriginalGuarantee: '100% Original Alps • Schweizer Bio-Rezepturen',
      freeShippingBadge: 'Kostenloser Versand ab 500.000₫ / 50€',
      giftPrivilegeBadge: 'Exklusives Geschenk bei jeder Bestellung',
      voucherPlaceholder: 'Gutscheincode (z.B. ALPS2025)',
      voucherApplyBtn: 'Einlösen',
      voucherApplied: (code) => `✓ Gutschein ${code} eingelöst (-10%)`,
      voucherInvalid: 'Ungültiger Code. Probieren Sie ALPS2025',
      voucherDiscountLabel: 'Gutschein-Rabatt',
      securePaymentAccepted: 'Sichere Zahlungsmethoden:',
      removeConfirm: 'Entfernen',
    },
    checkout: {
      modalTitle: 'Sichere Kasse & Bezahlung',
      step1Title: 'Lieferadresse',
      step2Title: 'Versandart',
      step3Title: 'Zahlungsweise',
      recipientHeader: 'Empfängerangaben',
      nameLabel: 'Vollständiger Name *',
      namePlaceholder: 'z.B. Maximilian Weber',
      phoneLabel: 'Telefonnummer *',
      phonePlaceholder: 'z.B. +41 44 211 8899',
      emailLabel: 'E-Mail-Adresse (für Beleg)',
      emailPlaceholder: 'kunde@beispiel.ch',
      addressLabel: 'Vollständige Lieferanschrift *',
      addressPlaceholder: 'Straße, Hausnummer, PLZ, Ort, Land',
      noteLabel: 'Lieferhinweis (optional)',
      notePlaceholder: 'Vor Ankunft anrufen, beim Nachbarn abgeben...',
      carrierHeader: 'Versandpartner wählen',
      carrierStandard: 'Standard-Versand versichert • 24 - 48h',
      carrierFast: 'Express-Luftfracht • 24 - 36h',
      carrierExpress: 'Alps Gleichtag-Kurier • 2 - 4h',
      paymentHeader: 'Zahlungsart auswählen',
      payVietQRTitle: 'VietQR / Banküberweisung',
      payVietQRDesc: 'Sekundenschnelle Bestätigung per Bank-QR-Code.',
      payCardTitle: 'Kredit- / Debitkarte (Visa / Mastercard / JCB)',
      payCardDesc: '3D-Secure und 256-Bit SSL-Verschlüsselung nach Bankenstandard.',
      payCODTitle: 'Zahlung bei Lieferung (Nachnahme)',
      payCODDesc: 'Vor Ort prüfen und bar beim Zusteller bezahlen.',
      cardNumberLabel: 'Kartennummer',
      cardHolderLabel: 'Karteninhaber',
      cardExpiryLabel: 'Gültig bis (MM/JJ)',
      cardCvvLabel: 'CVV-Code',
      cardSecureHint: 'Geschützt durch 3D Secure und PCI-DSS Level 1.',
      orderSummaryTitle: 'Bestellübersicht',
      subtotalLabel: 'Zwischensumme:',
      shippingLabel: 'Versand:',
      discountLabel: 'Rabatt:',
      totalLabel: 'Gesamtsumme:',
      placeOrderBtn: 'Kostenpflichtig bestellen',
      processingBtn: 'Bestellung wird übermittelt...',
      validationError: 'Bitte füllen Sie Name, Telefon und Adresse vollständig aus.',
      policyAgreeText: 'Mit Ihrer Bestellung akzeptieren Sie die AGB und die 30-Tage-Rückgabegarantie.',
      guarantee30Days: 'Risikolose 30-Tage 100% Geld-zurück-Garantie',
      sslSecureText: '256-Bit SSL-verschlüsselt nach PCI-DSS',
    },
    success: {
      title: 'Bestellung erfolgreich eingegangen!',
      subtitle: 'Vielen Dank für Ihr Vertrauen in Schweizer Dermokosmetik von Alps Pure Essence.',
      orderCodeLabel: 'Bestellnummer:',
      recipientInfoTitle: 'Lieferdetails',
      nameLabel: 'Empfänger:',
      phoneLabel: 'Telefon:',
      addressLabel: 'Lieferadresse:',
      shippingCarrierLabel: 'Versandpartner:',
      paymentMethodLabel: 'Zahlungsart:',
      totalPaidLabel: 'Bezahlter Betrag:',
      trackingNoticeTitle: 'Sendungsverfolgung',
      trackingNoticeDesc: 'Bestätigungs-E-Mail wurde versendet. Ihre Produkte werden in Reinraum-Thermokartons verpackt.',
      viewOrdersBtn: 'Bestellungen ansehen',
      continueShoppingBtn: 'Weiter einkaufen',
      needHelpBtn: 'Fragen? Kundenservice anrufen',
    },
    account: {
      drawerTitle: 'Kundenkonto & Bestellverlauf',
      guestGreeting: 'Willkommen bei Alps Pure Essence',
      guestDesc: 'Melden Sie sich an, um Treuevorteile zu nutzen oder Bestellungen zu verfolgen.',
      tabOrders: 'Meine Bestellungen',
      tabProfile: 'Persönliche Daten',
      tabLogin: 'Anmelden',
      tabRegister: 'Registrieren',
      filterAll: 'Alle',
      filterProcessing: 'In Vorbereitung',
      filterShipping: 'Unterwegs',
      filterDelivered: 'Zugestellt',
      emptyOrdersTitle: 'Bisher keine Bestellungen',
      emptyOrdersDesc: 'Ihre Einkäufe und Sendungsnummern werden nach der Bestellung hier angezeigt.',
      orderCodePrefix: 'Bestellung #',
      orderDatePrefix: 'Bestelldatum:',
      orderStatusProcessing: 'Wird vorbereitet',
      orderStatusShipping: 'Unterwegs zur Zustellung',
      orderStatusDelivered: 'Erfolgreich zugestellt',
      reorderBtn: 'Erneut bestellen',
      editAddressBtn: 'Adresse ändern',
      saveAddressBtn: 'Speichern',
      cancelBtn: 'Abbrechen',
      logoutBtn: 'Abmelden',
      loginIdentifierLabel: 'E-Mail oder Telefon',
      loginIdentifierPlaceholder: 'E-Mail eingeben...',
      loginPasswordLabel: 'Passwort',
      loginPasswordPlaceholder: 'Passwort eingeben...',
      rememberMe: 'Angemeldet bleiben',
      forgotPassword: 'Passwort vergessen?',
      forgotPasswordTip: 'Kontaktieren Sie unseren Kundenservice zur sicheren Rücksetzung.',
      loginBtn: 'Jetzt anmelden',
      registerBtn: 'Konto erstellen',
      switchRegisterText: 'Noch kein Konto?',
      switchRegisterLink: 'Registrieren für 100 Willkommenspunkte',
      switchLoginText: 'Bereits registriert?',
      switchLoginLink: 'Hier anmelden',
      pointsLabel: 'Treuepunkte:',
      tierLabel: 'Mitgliedschaft:',
      profileSavedSuccess: 'Persönliche Daten erfolgreich aktualisiert!',
      addressUpdatedSuccess: 'Lieferadresse für diese Bestellung geändert!',
    },
  },

  es: {
    cart: {
      freeShippingQualified: '¡Envío gratuito desbloqueado!',
      addMoreForFreeShipping: (amount) => `Añada ${amount}₫ más para ENVÍO GRATIS`,
      swissOriginalGuarantee: '100% Original Alps • Fórmulas bio-orgánicas suizas',
      freeShippingBadge: 'Envío gratuito a partir de 500.000₫ / $50',
      giftPrivilegeBadge: 'Regalo exclusivo de cortesía en cada pedido',
      voucherPlaceholder: 'Código promocional (ej. ALPS2025)',
      voucherApplyBtn: 'Aplicar',
      voucherApplied: (code) => `✓ Código ${code} aplicado (-10%)`,
      voucherInvalid: 'Código inválido. Pruebe ALPS2025',
      voucherDiscountLabel: 'Descuento cupón',
      securePaymentAccepted: 'Pagos protegidos y garantizados:',
      removeConfirm: 'Eliminar',
    },
    checkout: {
      modalTitle: 'Pago Seguro y Confirmación',
      step1Title: 'Datos de Entrega',
      step2Title: 'Empresa de Transporte',
      step3Title: 'Método de Pago',
      recipientHeader: 'Información del Destinatario',
      nameLabel: 'Nombre y Apellidos *',
      namePlaceholder: 'Ej. Carmen García',
      phoneLabel: 'Número de Teléfono *',
      phonePlaceholder: 'Ej. +34 600 123 456',
      emailLabel: 'Correo Electrónico (para comprobante)',
      emailPlaceholder: 'cliente@ejemplo.com',
      addressLabel: 'Dirección de Entrega Completa *',
      addressPlaceholder: 'Calle, número, piso/puerta, código postal, ciudad',
      noteLabel: 'Notas de Entrega (opcional)',
      notePlaceholder: 'Llamar antes de entregar, dejar en conserjería...',
      carrierHeader: 'Seleccionar Envío',
      carrierStandard: 'Envío Estándar Protegido • 24 - 48h',
      carrierFast: 'Transporte Aéreo Prioritario • 24 - 36h',
      carrierExpress: 'Entrega Express en el Día • 2 - 4h',
      paymentHeader: 'Seleccionar Forma de Pago',
      payVietQRTitle: 'VietQR / Transferencia Bancaria',
      payVietQRDesc: 'Verificación instantánea automática mediante código QR.',
      payCardTitle: 'Tarjeta de Crédito / Débito (Visa / Mastercard)',
      payCardDesc: 'Pasarela encriptada SSL de 256 bits y protocolo 3D Secure.',
      payCODTitle: 'Pago Contra Reembolso (Efectivo)',
      payCODDesc: 'Inspeccione sus productos antes de abonar al repartidor.',
      cardNumberLabel: 'Número de Tarjeta',
      cardHolderLabel: 'Titular de la Tarjeta',
      cardExpiryLabel: 'Vencimiento (MM/AA)',
      cardCvvLabel: 'Código CVV',
      cardSecureHint: 'Transacción protegida con certificación bancaria PCI-DSS.',
      orderSummaryTitle: 'Resumen del Pedido',
      subtotalLabel: 'Subtotal:',
      shippingLabel: 'Envío:',
      discountLabel: 'Descuento cupón:',
      totalLabel: 'Total a Pagar:',
      placeOrderBtn: 'Confirmar y Pagar Ahora',
      processingBtn: 'Procesando pedido...',
      validationError: 'Por favor complete su nombre, teléfono y dirección de entrega.',
      policyAgreeText: 'Al cursar el pedido acepta los Términos y la Garantía de 30 días de Alps.',
      guarantee30Days: 'Garantía 100% de devolución sin riesgo en 30 días',
      sslSecureText: 'Cifrado SSL de 256 bits y cumplimiento PCI-DSS',
    },
    success: {
      title: '¡Pedido Realizado con Éxito!',
      subtitle: 'Gracias por confiar en la cosmética vegana suiza de Alps Pure Essence.',
      orderCodeLabel: 'Código de Pedido:',
      recipientInfoTitle: 'Datos de Envío',
      nameLabel: 'Destinatario:',
      phoneLabel: 'Teléfono:',
      addressLabel: 'Dirección:',
      shippingCarrierLabel: 'Transporte:',
      paymentMethodLabel: 'Forma de Pago:',
      totalPaidLabel: 'Total Abonado:',
      trackingNoticeTitle: 'Seguimiento del Envío',
      trackingNoticeDesc: 'Le hemos enviado un correo de confirmación. Sus productos se empaquetan en salas limpias.',
      viewOrdersBtn: 'Ver Mis Pedidos',
      continueShoppingBtn: 'Seguir Comprando',
      needHelpBtn: '¿Ayuda? Llame al 1900 8899',
    },
    account: {
      drawerTitle: 'Mi Cuenta y Pedidos Realizados',
      guestGreeting: 'Bienvenido a Alps Pure Essence',
      guestDesc: 'Inicie sesión para acceder a beneficios exclusivos o ver sus pedidos.',
      tabOrders: 'Mis Pedidos',
      tabProfile: 'Datos Personales',
      tabLogin: 'Iniciar Sesión',
      tabRegister: 'Registrarse',
      filterAll: 'Todos',
      filterProcessing: 'En Preparación',
      filterShipping: 'En Reparto',
      filterDelivered: 'Entregados',
      emptyOrdersTitle: 'Aún no tiene pedidos',
      emptyOrdersDesc: 'Sus compras y números de seguimiento aparecerán reflejados aquí.',
      orderCodePrefix: 'Pedido #',
      orderDatePrefix: 'Fecha:',
      orderStatusProcessing: 'En preparación en laboratorio',
      orderStatusShipping: 'En camino con mensajería',
      orderStatusDelivered: 'Entregado con éxito',
      reorderBtn: 'Volver a pedir',
      editAddressBtn: 'Cambiar dirección',
      saveAddressBtn: 'Guardar cambios',
      cancelBtn: 'Cancelar',
      logoutBtn: 'Cerrar sesión',
      loginIdentifierLabel: 'Correo o Teléfono',
      loginIdentifierPlaceholder: 'Introduzca correo o teléfono...',
      loginPasswordLabel: 'Contraseña',
      loginPasswordPlaceholder: 'Introduzca contraseña...',
      rememberMe: 'Recordarme',
      forgotPassword: '¿Olvidó su contraseña?',
      forgotPasswordTip: 'Contacte con atención al cliente para restablecer su clave de forma segura.',
      loginBtn: 'Entrar',
      registerBtn: 'Crear Cuenta',
      switchRegisterText: '¿No tiene cuenta?',
      switchRegisterLink: 'Regístrese y reciba 100 puntos de bienvenida',
      switchLoginText: '¿Ya registrado?',
      switchLoginLink: 'Inicie sesión',
      pointsLabel: 'Puntos acumulados:',
      tierLabel: 'Nivel de socio:',
      profileSavedSuccess: '¡Datos y dirección actualizados correctamente!',
      addressUpdatedSuccess: '¡Dirección de entrega actualizada para este pedido!',
    },
  },

  zh: {
    cart: {
      freeShippingQualified: '已达成全场免运费特权！',
      addMoreForFreeShipping: (amount) => `再选购 ${amount}₫ 即可享受包邮特权`,
      swissOriginalGuarantee: '100% 瑞士阿尔卑斯原装正品 • 医研纯素',
      freeShippingBadge: '全场实付满 500,000₫ / $50 尊享顺丰包邮',
      giftPrivilegeBadge: '随单附赠品牌专属高定试用礼遇',
      voucherPlaceholder: '优惠券代码 (如: ALPS2025)',
      voucherApplyBtn: '兑换使用',
      voucherApplied: (code) => `✓ 已成功应用优惠代码 ${code} (享 9 折)`,
      voucherInvalid: '优惠券无效，请尝试输入 ALPS2025',
      voucherDiscountLabel: '专属礼遇折减',
      securePaymentAccepted: '银行级安全加密支付保障：',
      removeConfirm: '从购物袋移除',
    },
    checkout: {
      modalTitle: '安全结算与订单确认',
      step1Title: '收货地址',
      step2Title: '保价快递',
      step3Title: '支付方式',
      recipientHeader: '收件人身份信息',
      nameLabel: '收件人姓名 *',
      namePlaceholder: '例如：李诗韵',
      phoneLabel: '联系电话 *',
      phonePlaceholder: '例如：0908 123 489',
      emailLabel: '电子邮箱 (用于接收电子发票与物流通告)',
      emailPlaceholder: 'client@domain.com',
      addressLabel: '详细收货地址 *',
      addressPlaceholder: '省份、城市、区县、街道门牌号及楼层',
      noteLabel: '配送备注 (选填)',
      notePlaceholder: '工作日送达、送达前电话联系等...',
      carrierHeader: '精选高品质配送物流',
      carrierStandard: '顺丰保价特快 • 24 - 48小时内送达',
      carrierFast: '航空冷链优先达 • 24 - 36小时送达',
      carrierExpress: '瑞士 Alps 专属同城尊享直达 • 2 - 4小时送达',
      paymentHeader: '选择安全支付渠道',
      payVietQRTitle: 'VietQR Napas 247 极速扫码 (推荐)',
      payVietQRDesc: '支持 MB Bank 及所有主流银行 APP 手机扫码，系统 3 秒内秒级自动确认入账。',
      payCardTitle: '国际主流信用卡 (Visa / Mastercard / JCB)',
      payCardDesc: '全程采用 256 位银行级 SSL 加密，全面支持 3D Secure 动态安全验证。',
      payCODTitle: '货到付款 (现金签收)',
      payCODDesc: '先开箱验货再行付款，现金交付配送人员。',
      cardNumberLabel: '卡号',
      cardHolderLabel: '持卡人姓名 (拼音)',
      cardExpiryLabel: '有效期 (月/年)',
      cardCvvLabel: 'CVV 安全码',
      cardSecureHint: '支付全程受 PCI-DSS Level 1 国际金融安全认证保护。',
      orderSummaryTitle: '费用结算明细',
      subtotalLabel: '商品总额:',
      shippingLabel: '配送运费:',
      discountLabel: '礼遇折减:',
      totalLabel: '应付总计:',
      placeOrderBtn: '立即确认并支付',
      processingBtn: '订单提交中，请稍候...',
      validationError: '请完整准确填写收件人姓名、联系电话与收货地址。',
      policyAgreeText: '提交订单即代表您已阅读并同意 Alps 购买条款与 30 天无忧退换政策。',
      guarantee30Days: '30 天无忧退换货 100% 全额退款保障',
      sslSecureText: '256 位 SSL 金融级加密与 PCI-DSS 认证',
    },
    success: {
      title: '订单提交成功！',
      subtitle: '衷心感谢您对瑞士 Alps Pure Essence 纯素药妆的信任与青睐。',
      orderCodeLabel: '专属订单号:',
      recipientInfoTitle: '收货配送明细',
      nameLabel: '收件人:',
      phoneLabel: '联系电话:',
      addressLabel: '收货地址:',
      shippingCarrierLabel: '配送渠道:',
      paymentMethodLabel: '支付方式:',
      totalPaidLabel: '实付总额:',
      trackingNoticeTitle: '订单发货与物流跟踪',
      trackingNoticeDesc: '系统已将确认邮件送达您的邮箱。产品正于苏黎世洁净室级保温防震箱内精心打包出库。',
      viewOrdersBtn: '查看已购订单',
      continueShoppingBtn: '继续浏览选购',
      needHelpBtn: '需要专属服务？致电 1900 8899',
    },
    account: {
      drawerTitle: '会员中心与订单历史',
      guestGreeting: '尊贵的贵宾，欢迎莅临 Alps Pure Essence',
      guestDesc: '登录账户即可尊享会员积分累积，或轻松追踪已购订单的实时物流动态。',
      tabOrders: '已购订单',
      tabProfile: '个人信息',
      tabLogin: '账号登录',
      tabRegister: '新客注册',
      filterAll: '全部订单',
      filterProcessing: '备货中',
      filterShipping: '配送中',
      filterDelivered: '已送达',
      emptyOrdersTitle: '暂无历史订单',
      emptyOrdersDesc: '当您在 alps.id.vn 下单后，所有订单详情与快递单号都将实时呈现在此处。',
      orderCodePrefix: '订单 #',
      orderDatePrefix: '下单时间:',
      orderStatusProcessing: '瑞士实验室备货打包中',
      orderStatusShipping: '顺丰航空物流运输中',
      orderStatusDelivered: '已签收送达',
      reorderBtn: '一键再次选购',
      editAddressBtn: '修改收货地址',
      saveAddressBtn: '保存修改',
      cancelBtn: '取消',
      logoutBtn: '安全退出登录',
      loginIdentifierLabel: '电子邮箱或手机号码',
      loginIdentifierPlaceholder: '请输入登录邮箱或手机号...',
      loginPasswordLabel: '账户密码',
      loginPasswordPlaceholder: '请输入密码...',
      rememberMe: '记住我的登录状态',
      forgotPassword: '忘记密码？',
      forgotPasswordTip: '请致电官方客服热线 1900 8899，专席客服将协助您安全找回密码。',
      loginBtn: '立即安全登录',
      registerBtn: '注册尊享账户',
      switchRegisterText: '尚未拥有 Alps 账户？',
      switchRegisterLink: '立即注册，即赠 100 迎新积分',
      switchLoginText: '已有尊贵账户？',
      switchLoginLink: '直接登录',
      pointsLabel: '会员积分:',
      tierLabel: '会员尊贵等级:',
      profileSavedSuccess: '个人信息及默认地址已成功更新！',
      addressUpdatedSuccess: '本订单收货地址已成功更新！',
    },
  },
};
