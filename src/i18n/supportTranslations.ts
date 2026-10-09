import { SupportedLanguage } from './translations';

export interface SupportI18n {
  modalTitle: string;
  modalSubtitle: string;
  tabs: {
    aiChat: string;
    contact: string;
    ticket: string;
    faq: string;
  };
  floatingBtn: {
    skinQuizLabel: string;
    oneMin: string;
    chatLabel: string;
    tag247: string;
    sublabel: string;
    mobileQuiz: string;
    mobileChat: string;
  };
  aiChat: {
    title: string;
    aiSubtitle: string;
    online247: string;
    officialWebsite: string;
    resetChat: string;
    resetConfirm: string;
    quizBannerText: string;
    quizBannerBold: string;
    quizBannerBtn: string;
    thinking: string;
    inputPlaceholder: string;
    welcomeMessage: (name?: string) => string;
    quickPrompts: string[];
    fallbackDefault: string;
    fallbackGuestCheckout: string;
    fallbackReturns: string;
    fallbackSerum: string;
    fallbackOilyAcne: string;
  };
  contact: {
    hotlineTitle: string;
    hotlineDesc: string;
    hotlineFree: string;
    emailTitle: string;
    emailAddress: string;
    emailDesc: string;
    zurichTitle: string;
    zurichAddress: string;
    zurichDesc: string;
    hcmTitle: string;
    hcmAddress: string;
    hcmDesc: string;
    hanoiTitle: string;
    hanoiAddress: string;
    hanoiDesc: string;
    workingHoursTitle: string;
    workingHoursDesc: string;
    workingHoursTime: string;
    callNowBtn: string;
  };
  ticket: {
    title: string;
    subtitle: string;
    nameLabel: string;
    phoneLabel: string;
    emailLabel: string;
    orderCodeLabel: string;
    orderCodePlaceholder: string;
    topicLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    topics: string[];
    validationError: string;
    successTitle: string;
    successDesc: (id: string) => string;
    newTicketBtn: string;
    ticketIdLabel: string;
    timeLabel: string;
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
}

export const SUPPORT_I18N: Record<SupportedLanguage, SupportI18n> = {
  vi: {
    modalTitle: 'Trung Tâm Trợ Giúp & Chăm Sóc Khách Hàng',
    modalSubtitle: 'Alps Pure Essence Customer Care • Zurich & Vietnam',
    tabs: {
      aiChat: 'Trợ Lý AI (24/7)',
      contact: 'Kênh Liên Hệ',
      ticket: 'Gửi Yêu Cầu',
      faq: 'Hỏi & Đáp (FAQ)',
    },
    floatingBtn: {
      skinQuizLabel: 'Trắc Nghiệm Soi Da AI',
      oneMin: '1 PHÚT',
      chatLabel: 'Chat AI & CSKH',
      tag247: '24/7',
      sublabel: 'Tư vấn mọi câu hỏi • Hotline 1900 8899',
      mobileQuiz: 'Soi Da AI',
      mobileChat: 'Chat AI • CSKH',
    },
    aiChat: {
      title: 'Chuyên Gia Da Liễu AI Alps',
      aiSubtitle: 'Trí Tuệ Nhân Tạo 24/7',
      online247: 'Trực tuyến 24/7',
      officialWebsite: 'Website chính thức: alps.id.vn • Hotline: 1900 8899',
      resetChat: 'Làm mới cuộc trò chuyện',
      resetConfirm: 'Dạ em đã làm mới cuộc trò chuyện. Quý khách cần chuyên viên tư vấn về vấn đề da hay câu hỏi nào về Alps Skincare ạ?',
      quizBannerText: 'Chưa biết nền da của mình? Hãy làm',
      quizBannerBold: 'Bài Soi Da AI (1 phút)',
      quizBannerBtn: 'Soi da ngay',
      thinking: 'Chuyên gia AI đang phân tích và soạn câu trả lời...',
      inputPlaceholder: 'Hỏi AI bất kỳ điều gì: cách trị mụn, thành phần, đặt hàng, đổi trả...',
      welcomeMessage: (name) =>
        `Dạ kính chào ${name || 'quý khách'}! Em là Chuyên viên Tư vấn Da liễu & CSKH Trí Tuệ Nhân Tạo (AI) của Alps Skincare Thụy Sĩ (alps.id.vn).\n\nEm được trang bị toàn bộ cơ sở dữ liệu y khoa từ Viện nghiên cứu Zurich và sẵn sàng giải đáp thông minh mọi câu hỏi của quý khách:\n• Chẩn đoán tình trạng da & lên phác đồ điều trị cá nhân hóa\n• Giải đáp thành phần dược mỹ phẩm tế bào gốc sông băng thuần chay\n• Hướng dẫn đặt hàng nhanh, tra cứu vận chuyển & thanh toán VietQR Napas 247\n• Chính sách bảo chứng đổi trả 30 ngày hoàn tiền 100% không rủi ro\n\nQuý khách đang quan tâm hoặc cần tư vấn về vấn đề gì hôm nay ạ?`,
      quickPrompts: [
        'Kiểm tra tình trạng da & thiết lập phác đồ cá nhân hóa',
        'Da dầu mụn, bít tắc lỗ chân lông nên dùng sản phẩm nào?',
        'Serum Radiance Glow mờ thâm sáng da có dùng được cho mẹ bầu không?',
        'Chính sách đổi trả 30 ngày hoàn tiền 100% của Alps hoạt động thế nào?',
        'Tôi muốn đặt hàng trực tiếp không cần đăng nhập có được không?',
        'Da hay bị đỏ rát khi ngồi máy lạnh, phục hồi màng lipid ra sao?',
      ],
      fallbackDefault:
        'Dạ cảm ơn quý khách. Hệ thống đang bảo trì đường truyền AI ngắn hạn. Quý khách vui lòng gọi Hotline 1900 8899 hoặc gửi email cskh@alps.id.vn để chuyên viên tư vấn ngay 24/7 ạ!',
      fallbackGuestCheckout:
        'Dạ kính thưa quý khách, tại website chính thức alps.id.vn, quý khách có thể:\n1. Đặt hàng trực tiếp ngay (Guest Checkout) mà không bắt buộc phải đăng nhập.\n2. Hoặc đăng nhập tài khoản để tích lũy điểm hội viên Alps Pure Privileges và lưu địa chỉ nhận hàng tự động.\nMọi đơn hàng đều được cam kết đổi trả 30 ngày hoàn tiền 100% ạ!',
      fallbackReturns:
        'Dạ chính sách giao nhận & bảo chứng của Alps Skincare:\n• Đổi trả & hoàn tiền 100% trong vòng 30 ngày kể cả khi quý khách đã mở nắp dùng thử nếu có bất kỳ hiện tượng kích ứng.\n• Miễn phí vận chuyển toàn quốc cho đơn hàng từ 500.000₫.\n• Giao hỏa tốc 2-4h tại nội thành TP.HCM và Hà Nội.',
      fallbackSerum:
        'Dạ Serum Alps Radiance Glow chứa tế bào gốc hoa tuyết Alpine kết hợp 5% Niacinamide tinh khiết và HA đa tầng. Sản phẩm giúp mờ thâm sau 14 ngày, dưỡng sáng đều màu da và mang lại hiệu ứng căng bóng ngậm nước tự nhiên mà không gây bết dính. Đặc biệt đạt chuẩn thuần chay Thụy Sĩ, an toàn tuyệt đối cho mẹ bầu và da nhạy cảm ạ.',
      fallbackOilyAcne:
        'Dạ với làn da dầu mụn và lỗ chân lông to, chuyên gia da liễu Thụy Sĩ khuyên dùng chu trình 3 bước cốt lõi:\n1. Sữa rửa mặt Alps Gentle Purifying Cleanser (pH 5.5, làm sạch sâu bã nhờn mà không gây khô căng).\n2. Nước cân bằng Alps Botanical Balancing Toner (se khít lỗ chân lông, cấp ẩm sinh học).\n3. Serum Alps Radiance Glow (Niacinamide 5% kiềm dầu, kháng viêm mụn và mờ thâm).\nQuý khách có thể bấm vào bài Trắc Nghiệm Soi Da AI ở trên để nhận phác đồ chi tiết hơn nhé!',
    },
    contact: {
      hotlineTitle: 'Tổng Đài Miễn Cước 24/7',
      hotlineDesc: 'Hỗ trợ tư vấn da liễu, đặt hàng & xử lý khiếu nại',
      hotlineFree: '1900 8899 (Miễn cước toàn quốc)',
      emailTitle: 'Hộp Thư Điện Tử CSKH',
      emailAddress: 'cskh@alps.id.vn',
      emailDesc: 'Phản hồi trong vòng 60 phút',
      zurichTitle: 'Trụ Sở Thụy Sĩ (Zurich HQ)',
      zurichAddress: 'Bahnhofstrasse 45, 8001 Zürich, Switzerland',
      zurichDesc: 'Viện nghiên cứu dược mỹ phẩm & kiểm định lâm sàng',
      hcmTitle: 'Showroom & Chi Nhánh TP.HCM',
      hcmAddress: '30 D. Trịnh Đình Thảo, P. Hòa Thạnh, Q. Tân Phú, TP. Hồ Chí Minh',
      hcmDesc: 'Trải nghiệm trực tiếp & nhận tư vấn soi da chuyên sâu',
      hanoiTitle: 'Chi Nhánh Hà Nội',
      hanoiAddress: 'Tầng 2, Tràng Tiền Plaza, 24 Hai Bà Trưng, Hoàn Kiếm, Hà Nội',
      hanoiDesc: 'Trung tâm phân phối miền Bắc & dịch vụ khách hàng',
      workingHoursTitle: 'Thời Gian Hoạt Động',
      workingHoursDesc: 'Tổng đài & Tư vấn AI trực tuyến: 24/7 xuyên suốt',
      workingHoursTime: 'Showroom: 08:30 - 21:30 hàng ngày (kể cả Lễ, Tết)',
      callNowBtn: 'Gọi 1900 8899',
    },
    ticket: {
      title: 'Gửi Phiếu Hỗ Trợ Khách Hàng',
      subtitle: 'Đội ngũ chuyên viên Alps sẽ liên hệ lại qua điện thoại hoặc email trong 15 phút.',
      nameLabel: 'Họ và tên của bạn *',
      phoneLabel: 'Số điện thoại liên hệ *',
      emailLabel: 'Địa chỉ Email (nếu có)',
      orderCodeLabel: 'Mã đơn hàng liên quan (nếu có)',
      orderCodePlaceholder: 'Ví dụ: ALPS-89421',
      topicLabel: 'Chủ đề cần hỗ trợ *',
      messageLabel: 'Chi tiết câu hỏi hoặc vấn đề cần xử lý *',
      messagePlaceholder: 'Mô tả chi tiết tình trạng da, thắc mắc đơn hàng hoặc yêu cầu của bạn...',
      submitBtn: 'Gửi Phiếu Yêu Cầu Hỗ Trợ',
      submittingBtn: 'Đang gửi...',
      topics: [
        'Tư vấn chăm sóc da & chọn sản phẩm',
        'Tra cứu tình trạng vận chuyển đơn hàng',
        'Yêu cầu đổi trả & hoàn tiền 30 ngày',
        'Hỗ trợ thanh toán VietQR / Thẻ tín dụng',
        'Góp ý nâng cao chất lượng dịch vụ',
      ],
      validationError: 'Vui lòng điền đủ họ tên, số điện thoại và nội dung cần hỗ trợ',
      successTitle: 'Đã Tiếp Nhận Phiếu Yêu Cầu Thành Công!',
      successDesc: (id) => `Mã số phiếu của bạn là #${id}. Chuyên viên Alps đã tiếp nhận và sẽ chủ động gọi điện hỗ trợ bạn trong vòng 15 phút tới.`,
      newTicketBtn: 'Gửi phiếu yêu cầu khác',
      ticketIdLabel: 'Mã phiếu hỗ trợ:',
      timeLabel: 'Thời gian tiếp nhận:',
    },
    faq: {
      title: 'Câu Hỏi Thường Gặp (FAQ)',
      items: [
        {
          question: 'Chính sách đổi trả 30 ngày của Alps hoạt động như thế nào?',
          answer:
            'Alps cam kết đổi trả miễn phí hoặc hoàn tiền 100% trong vòng 30 ngày kể từ ngày nhận hàng, ngay cả khi quý khách đã mở nắp và trải nghiệm sản phẩm nếu xảy ra bất kỳ hiện tượng kích ứng hay không tương thích da nào.',
        },
        {
          question: 'Tôi có thể mua hàng trực tiếp mà không cần đăng nhập tài khoản không?',
          answer:
            'Hoàn toàn được! Tại website alps.id.vn, bạn có thể mua ngay lập tức với tính năng Mua Nhanh (Guest Checkout) chỉ với họ tên, số điện thoại và địa chỉ nhận hàng. Tuy nhiên, khi tạo tài khoản, bạn sẽ nhận thêm điểm tích lũy Alps Pure Privileges.',
        },
        {
          question: 'Thời gian giao hàng tiêu chuẩn là bao lâu?',
          answer:
            'Tại khu vực nội thành TP. Hồ Chí Minh và Hà Nội: Hỗ trợ giao hỏa tốc trong 2-4 giờ hoặc trong ngày. Đối với các tỉnh thành khác: Giao hàng từ 24 - 48 giờ với thùng bảo ôn đạt chuẩn phòng sạch Zurich.',
        },
        {
          question: 'Sản phẩm Alps có an toàn cho phụ nữ mang thai và da nhạy cảm?',
          answer:
            'Tất cả sản phẩm Alps đều đạt chứng nhận Swiss Vegan Certified. 100% không cồn khô, không paraben, không hương liệu nhân tạo, tuyệt đối an toàn cho phụ nữ mang thai, mẹ bỉm sữa và làn da nhạy cảm nhất.',
        },
        {
          question: 'Làm thế nào để được chuyên gia Alps lên phác đồ dưỡng da 1:1?',
          answer:
            'Bạn có thể bấm vào nút "Soi Da AI" trên website để hoàn thành bài trắc nghiệm 1 phút, hoặc chat trực tiếp với Trợ Lý Da Liễu AI 24/7 để nhận phác đồ cá nhân hóa ngay lập tức.',
        },
        {
          question: 'Thanh toán qua quét mã VietQR Napas 247 được xác nhận như thế nào?',
          answer:
            'Khi bạn quét mã VietQR bằng ứng dụng ngân hàng, hệ thống Napas 247 sẽ tự động điền sẵn số tiền và nội dung đơn hàng. Ngay sau khi chuyển khoản thành công, hệ thống Alps sẽ tự động nhận diện và cập nhật trạng thái đơn hàng trong 3-5 giây.',
        },
      ],
    },
  },

  en: {
    modalTitle: 'Help Center & Client Services',
    modalSubtitle: 'Alps Pure Essence Customer Care • Zurich & International',
    tabs: {
      aiChat: 'AI Care (24/7)',
      contact: 'Contact Channels',
      ticket: 'Submit Ticket',
      faq: 'FAQ & Inquiries',
    },
    floatingBtn: {
      skinQuizLabel: 'AI Skin Diagnostic',
      oneMin: '1 MIN',
      chatLabel: 'AI Care & Support',
      tag247: '24/7',
      sublabel: 'Immediate assistance • Hotline 1900 8899',
      mobileQuiz: 'Skin Diagnostic',
      mobileChat: 'AI Support 24/7',
    },
    aiChat: {
      title: 'Alps AI Dermatology Advisor',
      aiSubtitle: 'Artificial Intelligence 24/7',
      online247: 'Live 24/7',
      officialWebsite: 'Official Boutique: alps.id.vn • Hotline: +41 44 211 8899',
      resetChat: 'Reset Conversation',
      resetConfirm: 'Conversation refreshed. How may our Swiss dermatology advisor assist your skincare regimen today?',
      quizBannerText: 'Unsure of your biometric skin profile? Take the',
      quizBannerBold: 'AI Skin Diagnostic (1 min)',
      quizBannerBtn: 'Analyze Now',
      thinking: 'AI Dermatology Advisor is evaluating your inquiry...',
      inputPlaceholder: 'Ask anything: acne healing, INCI ingredients, orders, 30-day returns...',
      welcomeMessage: (name) =>
        `Welcome ${name || 'esteemed guest'}! I am the AI Dermatology & Client Care Specialist for Alps Skincare Switzerland (alps.id.vn).\n\nPowered by clinical data from our Zurich research institute, I am prepared to assist you with:\n• Biometric skin diagnosis & bespoke regimen building\n• Swiss glacial stem cell and vegan INCI science\n• Express shipping, order tracking & seamless payments\n• 30-day risk-free 100% money-back guarantee\n\nHow may I care for your skin today?`,
      quickPrompts: [
        'Analyze my skin & establish a personalized ritual',
        'Which Alps routine best treats oily, congested acne-prone skin?',
        'Is the Radiance Glow Serum safe for pregnancy & nursing mothers?',
        'How does Alps 30-day 100% money-back guarantee work?',
        'Can I place an order directly without creating an account?',
        'How do I restore my lipid moisture barrier in air-conditioned environments?',
      ],
      fallbackDefault:
        'Thank you for reaching out. Our AI network is briefly refreshing. Please call our 24/7 hotline 1900 8899 or email cskh@alps.id.vn for instant specialist support.',
      fallbackGuestCheckout:
        'At alps.id.vn, you may:\n1. Check out immediately as a guest without creating an account.\n2. Or sign in to accumulate Alps Pure Privileges tier rewards and save delivery addresses.\nEvery order includes our 30-day 100% money-back guarantee.',
      fallbackReturns:
        'Alps Delivery & Guarantee Policy:\n• 100% return & refund within 30 days even if opened and sampled, should any irritation occur.\n• Complimentary shipping on orders above 500,000₫ / $50.\n• Express dispatch in 24 hours.',
      fallbackSerum:
        'Alps Radiance Glow Serum pairs Alpine edelweiss stem cells with 5% pure Niacinamide and multi-weight HA. Clinically softens hyperpigmentation in 14 days, creating glass-skin radiance without greasy residue. 100% Swiss vegan certified, safe for pregnancy and sensitive skin.',
      fallbackOilyAcne:
        'For oily, acne-prone skin with enlarged pores, Zurich dermatologists recommend a 3-step core ritual:\n1. Gentle Purifying Cleanser (pH 5.5, purges excess sebum without stripping).\n2. Botanical Balancing Toner (tightens pores & restores biological pH).\n3. Radiance Glow Serum (5% Niacinamide controls sebum & calms breakouts).\nTake our 1-minute AI Skin Quiz for a complete tailored routine.',
    },
    contact: {
      hotlineTitle: '24/7 Toll-Free Client Hotline',
      hotlineDesc: 'Skin consultations, orders & dedicated support',
      hotlineFree: '1900 8899 / +41 44 211 8899',
      emailTitle: 'Customer Care Inbox',
      emailAddress: 'cskh@alps.id.vn',
      emailDesc: 'Direct specialist reply within 60 minutes',
      zurichTitle: 'Zurich Global Headquarters',
      zurichAddress: 'Bahnhofstrasse 45, 8001 Zürich, Switzerland',
      zurichDesc: 'Dermatological research laboratory & clinical trials',
      hcmTitle: 'HCMC Boutique Showroom',
      hcmAddress: '30 Trinh Dinh Thao, Tan Phu District, Ho Chi Minh City',
      hcmDesc: 'Bespoke skincare experience & biometric skin testing',
      hanoiTitle: 'Hanoi Branch Boutique',
      hanoiAddress: 'Tràng Tiền Plaza, 24 Hai Bà Trưng, Hoàn Kiếm, Hanoi',
      hanoiDesc: 'Northern distribution hub & client services',
      workingHoursTitle: 'Service Hours',
      workingHoursDesc: 'Client Care & AI Chat: 24 Hours / 7 Days',
      workingHoursTime: 'Showrooms: 08:30 - 21:30 Daily (including Holidays)',
      callNowBtn: 'Call Hotline',
    },
    ticket: {
      title: 'Submit Client Service Ticket',
      subtitle: 'Our Swiss skincare specialists will contact you via phone or email within 15 minutes.',
      nameLabel: 'Full Name *',
      phoneLabel: 'Contact Phone Number *',
      emailLabel: 'Email Address (optional)',
      orderCodeLabel: 'Related Order Code (if applicable)',
      orderCodePlaceholder: 'e.g., ALPS-89421',
      topicLabel: 'Support Category *',
      messageLabel: 'Detailed Request / Inquiry *',
      messagePlaceholder: 'Please describe your skin concerns, order status, or specific request...',
      submitBtn: 'Submit Support Ticket',
      submittingBtn: 'Submitting...',
      topics: [
        'Skin Consultation & Product Selection',
        'Order Tracking & Delivery Inquiries',
        '30-Day Return & Refund Guarantee',
        'VietQR & Card Payment Assistance',
        'Quality Feedback & Recommendations',
      ],
      validationError: 'Please provide your name, phone number, and inquiry details.',
      successTitle: 'Support Ticket Received!',
      successDesc: (id) => `Your ticket ID is #${id}. An Alps senior advisor has received your request and will contact you within 15 minutes.`,
      newTicketBtn: 'Submit Another Ticket',
      ticketIdLabel: 'Ticket ID:',
      timeLabel: 'Received At:',
    },
    faq: {
      title: 'Frequently Asked Questions (FAQ)',
      items: [
        {
          question: 'How does Alps 30-Day Money-Back Guarantee work?',
          answer:
            'We provide complimentary returns or a full 100% refund within 30 days of delivery, even if the bottle has been opened and experienced, should your skin experience any incompatibility.',
        },
        {
          question: 'Can I purchase directly without creating an account?',
          answer:
            'Yes! With Guest Checkout on alps.id.vn, you only need your name, phone, and delivery address. Creating an account is optional and offers Alps Pure Privileges rewards.',
        },
        {
          question: 'What is the standard delivery timeframe?',
          answer:
            'Urban centers receive express 2-4 hour or same-day dispatch. Other regions arrive in 24-48 hours packed in thermal-insulated cleanroom cartons.',
        },
        {
          question: 'Are Alps formulations safe for sensitive skin and pregnancy?',
          answer:
            'Every formulation holds Swiss Vegan Certification. 100% free of drying alcohol, parabens, and artificial fragrances, perfectly suited for sensitive skin and expectant mothers.',
        },
        {
          question: 'How can I receive a 1-on-1 personalized skincare prescription?',
          answer:
            'Take our 1-minute AI Skin Diagnostic on the website, or start a live conversation with our 24/7 AI Dermatology Advisor.',
        },
        {
          question: 'How are digital VietQR / card payments verified?',
          answer:
            'Payments via VietQR Napas 247 or international cards (Visa/Mastercard) are validated with bank-grade encryption in 3-5 seconds.',
        },
      ],
    },
  },

  de: {
    modalTitle: 'Hilfe-Center & Kundenservice',
    modalSubtitle: 'Alps Pure Essence Kundenservice • Zürich & International',
    tabs: {
      aiChat: 'AI-Beratung (24/7)',
      contact: 'Kontaktkanäle',
      ticket: 'Anfrage senden',
      faq: 'Häufige Fragen (FAQ)',
    },
    floatingBtn: {
      skinQuizLabel: 'AI-Hautanalyse',
      oneMin: '1 MIN',
      chatLabel: 'AI-Chat & Support',
      tag247: '24/7',
      sublabel: 'Rund um die Uhr • Hotline 1900 8899',
      mobileQuiz: 'Hautanalyse',
      mobileChat: 'AI-Support 24/7',
    },
    aiChat: {
      title: 'Alps AI-Dermatologieberater',
      aiSubtitle: 'Künstliche Intelligenz 24/7',
      online247: 'Online 24/7',
      officialWebsite: 'Offizielle Boutique: alps.id.vn • Hotline: +41 44 211 8899',
      resetChat: 'Gespräch zurücksetzen',
      resetConfirm: 'Unterhaltung aktualisiert. Wie darf unser Schweizer Experte Ihnen heute helfen?',
      quizBannerText: 'Kennen Sie Ihr biometrisches Hautprofil? Machen Sie die',
      quizBannerBold: 'AI-Hautanalyse (1 Min.)',
      quizBannerBtn: 'Jetzt analysieren',
      thinking: 'AI-Dermatologe analysiert Ihre Anfrage...',
      inputPlaceholder: 'Fragen Sie nach Hautpflege, Inhaltsstoffen, Bestellungen, Rückgabe...',
      welcomeMessage: (name) =>
        `Herzlich willkommen ${name || 'geschätzter Gast'}! Ich bin Ihr persönlicher AI-Dermatologieberater von Alps Skincare Schweiz (alps.id.vn).\n\nBasierend auf den klinischen Daten unseres Zürcher Instituts beantworte ich gerne Ihre Fragen zu:\n• Biometrischer Hautdiagnose & Pflegeritualen\n• Schweizer Gletscherstammzellen & tierfreien Rezepturen\n• Express-Versand & sicherer Bezahlung\n• Unserer 30-tägigen 100% Geld-zurück-Garantie\n\nWie kann ich Ihre Haut heute unterstützen?`,
      quickPrompts: [
        'Hautzustand analysieren & individuelles Ritual erstellen',
        'Welche Pflege eignet sich für ölige, unreine Haut?',
        'Ist das Radiance Glow Serum während der Schwangerschaft sicher?',
        'Wie funktioniert die 30-Tage Geld-zurück-Garantie?',
        'Kann ich direkt als Gast ohne Registrierung bestellen?',
        'Hautbarriere bei trockener Büroluft nachhaltig stärken',
      ],
      fallbackDefault:
        'Vielen Dank für Ihre Nachricht. Unser AI-Netzwerk wird kurz aktualisiert. Bitte rufen Sie unsere Hotline 1900 8899 an oder schreiben Sie an cskh@alps.id.vn.',
      fallbackGuestCheckout:
        'Bei alps.id.vn können Sie direkt ohne Login als Gast bestellen oder ein Kundenkonto für Treuepunkte anlegen. Alle Bestellungen genießen 30 Tage Rückgaberecht.',
      fallbackReturns:
        'Alps Garantie: 100% Rückgabe innerhalb von 30 Tagen, kostenloser Versand ab 500.000₫ / 50€, Express-Zustellung.',
      fallbackSerum:
        'Alps Radiance Glow Serum kombiniert Alpen-Edelweiss-Stammzellen mit 5% Niacinamid und Hyaluronsäure für ebenmäßige Leuchtkraft. 100% vegan und hypoallergen.',
      fallbackOilyAcne:
        'Für unreine, ölige Haut empfehlen Zürcher Dermatologen: 1. Purifying Cleanser (pH 5.5), 2. Balancing Toner, 3. Radiance Glow Serum. Machen Sie gerne unseren Hauttest!',
    },
    contact: {
      hotlineTitle: 'Gebührenfreie 24/7 Hotline',
      hotlineDesc: 'Hautberatung, Bestellungen & Reklamationen',
      hotlineFree: '+41 44 211 8899 / 1900 8899',
      emailTitle: 'Kundenservice E-Mail',
      emailAddress: 'cskh@alps.id.vn',
      emailDesc: 'Antwort innerhalb von 60 Minuten',
      zurichTitle: 'Hauptsitz Zürich (Schweiz)',
      zurichAddress: 'Bahnhofstrasse 45, 8001 Zürich, Schweiz',
      zurichDesc: 'Dermatologisches Forschungsinstitut & Labor',
      hcmTitle: 'Boutique & Showroom HCMC',
      hcmAddress: '30 Trinh Dinh Thao, Tan Phu, Ho-Chi-Minh-Stadt',
      hcmDesc: 'Persönliche Hautberatung & Produkterlebnis',
      hanoiTitle: 'Niederlassung Hanoi',
      hanoiAddress: 'Tràng Tiền Plaza, 24 Hai Bà Trưng, Hoàn Kiếm, Hanoi',
      hanoiDesc: 'Logistikzentrum Nord & Kundenservice',
      workingHoursTitle: 'Öffnungszeiten',
      workingHoursDesc: 'Kundenservice & AI-Chat: 24 Stunden / 7 Tage',
      workingHoursTime: 'Boutiquen: 08:30 - 21:30 täglich (auch feiertags)',
      callNowBtn: 'Jetzt anrufen',
    },
    ticket: {
      title: 'Kundenservice-Ticket erstellen',
      subtitle: 'Unsere Schweizer Pflegeexperten melden sich innerhalb von 15 Minuten bei Ihnen.',
      nameLabel: 'Vollständiger Name *',
      phoneLabel: 'Telefonnummer *',
      emailLabel: 'E-Mail-Adresse (optional)',
      orderCodeLabel: 'Bestellnummer (falls vorhanden)',
      orderCodePlaceholder: 'z.B. ALPS-89421',
      topicLabel: 'Themenbereich *',
      messageLabel: 'Ihre Nachricht / Details *',
      messagePlaceholder: 'Beschreiben Sie Ihr Anliegen, Ihren Hautzustand oder Ihre Frage...',
      submitBtn: 'Anfrage absenden',
      submittingBtn: 'Wird gesendet...',
      topics: [
        'Hautberatung & Produktauswahl',
        'Lieferstatus & Sendungsverfolgung',
        '30-Tage Rückgabe & Erstattung',
        'Zahlungsunterstützung (Karte/VietQR)',
        'Qualitätsfeedback & Anregungen',
      ],
      validationError: 'Bitte füllen Sie Name, Telefonnummer und Ihre Nachricht aus.',
      successTitle: 'Ticket erfolgreich eingereicht!',
      successDesc: (id) => `Ihre Ticket-Nummer lautet #${id}. Ein Alps-Berater wird sich innerhalb von 15 Minuten bei Ihnen melden.`,
      newTicketBtn: 'Weiteres Ticket erstellen',
      ticketIdLabel: 'Ticket-Nr:',
      timeLabel: 'Eingegangen um:',
    },
    faq: {
      title: 'Häufig gestellte Fragen (FAQ)',
      items: [
        {
          question: 'Wie funktioniert die 30-tägige Geld-zurück-Garantie?',
          answer:
            'Wir garantieren eine vollständige Rückerstattung innerhalb von 30 Tagen nach Erhalt, selbst wenn das Produkt bereits geöffnet und ausprobiert wurde.',
        },
        {
          question: 'Kann ich ohne Registrierung als Gast bestellen?',
          answer:
            'Ja, auf alps.id.vn können Sie bequem ohne Kundenkonto mit wenigen Klicks als Gast bestellen.',
        },
        {
          question: 'Wie lange dauert der Standardversand?',
          answer:
            'In Metropolen erfolgt die Zustellung in 2-4 Stunden oder am selben Tag. Alle weiteren Regionen erhalten die Lieferung in 24-48 Stunden.',
        },
        {
          question: 'Sind Alps Produkte für sensible Haut und Schwangere geeignet?',
          answer:
            'Ja, alle Produkte sind Schweizer bio-vegan zertifiziert, 100% frei von Alkohol, Parabenen und synthetischen Duftstoffen.',
        },
        {
          question: 'Wie erhalte ich ein individuelles Pflegeritual?',
          answer:
            'Nutzen Sie unsere 1-minütige AI-Hautanalyse oder chatten Sie rund um die Uhr mit unserem AI-Dermatologieberater.',
        },
        {
          question: 'Wie sicher sind die Zahlungsmethoden?',
          answer:
            'Alle Transaktionen werden über 256-Bit-SSL und modernste Bankstandards verschlüsselt.',
        },
      ],
    },
  },

  es: {
    modalTitle: 'Centro de Ayuda y Atención al Cliente',
    modalSubtitle: 'Alps Pure Essence Customer Care • Zúrich e Internacional',
    tabs: {
      aiChat: 'Asistente AI (24/7)',
      contact: 'Canales de Contacto',
      ticket: 'Enviar Solicitud',
      faq: 'Preguntas Frecuentes',
    },
    floatingBtn: {
      skinQuizLabel: 'Diagnóstico Facial AI',
      oneMin: '1 MIN',
      chatLabel: 'Chat AI y Soporte',
      tag247: '24/7',
      sublabel: 'Atención inmediata • Línea 1900 8899',
      mobileQuiz: 'Diagnóstico AI',
      mobileChat: 'Soporte AI 24/7',
    },
    aiChat: {
      title: 'Especialista en Dermatología AI Alps',
      aiSubtitle: 'Inteligencia Artificial 24/7',
      online247: 'En línea 24/7',
      officialWebsite: 'Boutique Oficial: alps.id.vn • Línea: +41 44 211 8899',
      resetChat: 'Reiniciar conversación',
      resetConfirm: 'Conversación actualizada. ¿En qué podemos ayudarle hoy con su rutina de cuidado?',
      quizBannerText: '¿Aún no conoce su perfil dérmico? Realice el',
      quizBannerBold: 'Diagnóstico Facial AI (1 min)',
      quizBannerBtn: 'Analizar ahora',
      thinking: 'El especialista AI está analizando su consulta...',
      inputPlaceholder: 'Pregunte lo que desee: acné, ingredientes INCI, pedidos, devoluciones...',
      welcomeMessage: (name) =>
        `¡Bienvenido ${name || 'estimado cliente'}! Soy el Asistente Dermatológico AI de Alps Skincare Suiza (alps.id.vn).\n\nCon el respaldo científico de nuestro instituto en Zúrich, estoy listo para responder sobre:\n• Diagnóstico biológico y rutinas personalizadas\n• Ciencia de células madre de glaciares suizos y fórmulas 100% veganas\n• Seguimiento de envíos rápidos y pagos seguros\n• Garantía de 30 días con reembolso del 100%\n\n¿En qué podemos asistirle hoy?`,
      quickPrompts: [
        'Analizar mi piel y diseñar una rutina personalizada',
        '¿Qué productos son ideales para piel grasa o con tendencia al acné?',
        '¿Es seguro el Serum Radiance Glow durante el embarazo?',
        '¿Cómo funciona la garantía de devolución de 30 días?',
        '¿Puedo comprar directamente sin crear una cuenta?',
        'Cómo restaurar la barrera de hidratación en ambientes con aire acondicionado',
      ],
      fallbackDefault:
        'Gracias por escribirnos. Nuestro servicio AI está en mantenimiento breve. Por favor llame al 1900 8899 o escriba a cskh@alps.id.vn.',
      fallbackGuestCheckout:
        'En alps.id.vn puede comprar directamente como invitado sin registrarse, o crear una cuenta para acumular puntos Alps Pure Privileges.',
      fallbackReturns:
        'Política Alps: 100% de devolución en 30 días incluso si abrió el frasco, envío gratis a partir de 500.000₫ / $50 y despacho rápido.',
      fallbackSerum:
        'Alps Radiance Glow Serum une células madre de edelweiss alpino, 5% de niacinamida y ácido hialurónico para una piel luminosa sin sensación grasa.',
      fallbackOilyAcne:
        'Para piel grasa con poros visibles, dermatólogos suizos aconsejan: 1. Purifying Cleanser (pH 5.5), 2. Balancing Toner, 3. Radiance Glow Serum. ¡Haga nuestro test facial!',
    },
    contact: {
      hotlineTitle: 'Línea Gratuita 24/7',
      hotlineDesc: 'Consultas dermatológicas, pedidos y atención inmediata',
      hotlineFree: '+41 44 211 8899 / 1900 8899',
      emailTitle: 'Correo de Atención al Cliente',
      emailAddress: 'cskh@alps.id.vn',
      emailDesc: 'Respuesta de especialistas en menos de 60 minutos',
      zurichTitle: 'Sede Central en Zúrich (Suiza)',
      zurichAddress: 'Bahnhofstrasse 45, 8001 Zürich, Suiza',
      zurichDesc: 'Laboratorio de investigación dermocosmética y ensayos',
      hcmTitle: 'Boutique Showroom HCMC',
      hcmAddress: '30 Trinh Dinh Thao, Tan Phu, Ciudad Ho Chi Minh',
      hcmDesc: 'Experiencia sensorial y diagnóstico facial en vivo',
      hanoiTitle: 'Boutique Sucursal Hanói',
      hanoiAddress: 'Tràng Tiền Plaza, 24 Hai Bà Trưng, Hoàn Kiếm, Hanói',
      hanoiDesc: 'Centro logístico del norte y atención al cliente',
      workingHoursTitle: 'Horarios de Atención',
      workingHoursDesc: 'Atención al Cliente y Chat AI: 24 Horas / 7 Días',
      workingHoursTime: 'Boutiques: 08:30 - 21:30 todos los días (festivos incluidos)',
      callNowBtn: 'Llamar ahora',
    },
    ticket: {
      title: 'Crear Ticket de Soporte',
      subtitle: 'Nuestros especialistas suizos se comunicarán con usted en menos de 15 minutos.',
      nameLabel: 'Nombre completo *',
      phoneLabel: 'Número de teléfono *',
      emailLabel: 'Correo electrónico (opcional)',
      orderCodeLabel: 'Código de pedido (si aplica)',
      orderCodePlaceholder: 'Ej: ALPS-89421',
      topicLabel: 'Categoría de consulta *',
      messageLabel: 'Detalles de su solicitud *',
      messagePlaceholder: 'Describa su consulta, estado de su piel o inquietud...',
      submitBtn: 'Enviar Solicitud',
      submittingBtn: 'Enviando...',
      topics: [
        'Consulta dermatológica y elección de productos',
        'Estado de envío y entrega',
        'Garantía de devolución de 30 días',
        'Soporte con pagos con tarjeta o VietQR',
        'Sugerencias y comentarios de calidad',
      ],
      validationError: 'Por favor complete su nombre, teléfono y el detalle de su consulta.',
      successTitle: '¡Ticket recibido con éxito!',
      successDesc: (id) => `Su número de ticket es #${id}. Un asesor de Alps se pondrá en contacto con usted en 15 minutos.`,
      newTicketBtn: 'Enviar otra solicitud',
      ticketIdLabel: 'Nº de Ticket:',
      timeLabel: 'Recibido a las:',
    },
    faq: {
      title: 'Preguntas Frecuentes (FAQ)',
      items: [
        {
          question: '¿Cómo funciona la garantía de devolución de 30 días?',
          answer:
            'Garantizamos el reembolso completo del 100% durante 30 días tras la entrega, incluso si ha probado el producto y no se adapta a su piel.',
        },
        {
          question: '¿Puedo comprar sin registrarme?',
          answer:
            'Sí, puede realizar su compra rápidamente como invitado sin necesidad de registrarse en alps.id.vn.',
        },
        {
          question: '¿Cuánto tarda el envío?',
          answer:
            'En zonas urbanas entregamos en 2-4 horas o el mismo día. En el resto del país, entre 24 y 48 horas en empaques térmicos protegidos.',
        },
        {
          question: '¿Son aptos los productos para piel sensible y embarazadas?',
          answer:
            'Sí, todas las fórmulas cuentan con certificación bio-vegana suiza, 100% libres de alcohol secante, parabenos y perfumes sintéticos.',
        },
        {
          question: '¿Cómo obtener una recomendación de cuidado 1 a 1?',
          answer:
            'Complete nuestro diagnóstico facial AI de 1 minuto o chatee en directo con nuestro Asistente Dermatológico AI 24/7.',
        },
        {
          question: '¿Qué tan seguros son los métodos de pago?',
          answer:
            'Todas las transacciones están protegidas con cifrado bancario SSL de 256 bits.',
        },
      ],
    },
  },

  zh: {
    modalTitle: '帮助中心与尊享客服',
    modalSubtitle: 'Alps Pure Essence Customer Care • 瑞士苏黎世与全球',
    tabs: {
      aiChat: 'AI 护肤专家 (24/7)',
      contact: '联系渠道',
      ticket: '提交工单',
      faq: '常见疑问 (FAQ)',
    },
    floatingBtn: {
      skinQuizLabel: 'AI 智能测肤',
      oneMin: '1分钟',
      chatLabel: 'AI 咨询与客服',
      tag247: '24/7',
      sublabel: '全天候智能守护 • 服务热线 1900 8899',
      mobileQuiz: 'AI 测肤',
      mobileChat: 'AI 客服 24/7',
    },
    aiChat: {
      title: 'Alps 瑞士 AI 皮肤科顾问',
      aiSubtitle: '全天候人工智能 24/7',
      online247: '24小时实时在线',
      officialWebsite: '官方旗舰网站: alps.id.vn • 国际热线: +41 44 211 8899',
      resetChat: '重新开始对话',
      resetConfirm: '对话已刷新。请问瑞士皮肤科专家今天能为您解答哪些护肤疑问？',
      quizBannerText: '尚未了解自己的肌肤分型？立即体验',
      quizBannerBold: 'AI 智能测肤 (仅需1分钟)',
      quizBannerBtn: '立即测肤',
      thinking: 'AI 皮肤科顾问正在为您分析与撰写答复...',
      inputPlaceholder: '向 AI 咨询任何问题：控油祛痘、INCI成分、订单物流、30天退换...',
      welcomeMessage: (name) =>
        `尊贵的${name || '贵宾'}，您好！我是瑞士 Alps Skincare (alps.id.vn) 的人工智能皮肤专研顾问。\n\n依托苏黎世皮肤科研所的海量临床数据库，我随时准备为您解答：\n• 智能测肤分析与定制护肤方案\n• 瑞士雪山植物干细胞与纯素活性成分解析\n• 闪电配送进度查询与便捷支付\n• 30天安心试用 100% 退款保证\n\n请问您今天最关注哪些肌肤护理需求？`,
      quickPrompts: [
        '分析我的皮肤状态并定制专属护肤步骤',
        '油痘肌与毛孔粗大最推荐使用哪款产品？',
        '雪花干细胞焕亮精华孕妇与哺乳期可用吗？',
        'Alps 30天 100% 全额退款保障具体如何运作？',
        '可以直接免注册免登录下单购买吗？',
        '长期身处空调房，如何科学修复皮脂水润屏障？',
      ],
      fallbackDefault:
        '感谢您的咨询。AI系统网络短暂维护中，您可以拨打热线 1900 8899 或发送邮件至 cskh@alps.id.vn 获取即时人工支持。',
      fallbackGuestCheckout:
        '在官网 alps.id.vn 您可以直接免注册极速下单；亦可登录账户累积 Alps 会员积分。全线订单均尊享30天无忧退换保障。',
      fallbackReturns:
        'Alps 售后与配送政策：\n• 签收后30天内若有任何不适，即使已开封使用亦支持 100% 退换款。\n• 订单满 500,000₫ / $50 全程包邮。\n• 极速顺丰保价发货。',
      fallbackSerum:
        'Alps 雪花干细胞焕亮精华含高山雪绒花干细胞提取物、5%高纯烟酰胺与多重透明质酸，14天淡化痘印斑点，透出水光通透肌。瑞士纯素认证，温和无刺激。',
      fallbackOilyAcne:
        '针对出油长痘与粗大毛孔，苏黎世专家推荐经典三步法：1. 净颜洁面慕斯 (pH 5.5温和净澈)，2. 植萃平衡水 (收缩毛孔)，3. 焕亮精华 (控油褪红)。欢迎点击上方进行智能测肤！',
    },
    contact: {
      hotlineTitle: '24/7 全天候免费服务热线',
      hotlineDesc: '皮肤科咨询、尊贵下单与售后处理',
      hotlineFree: '+41 44 211 8899 / 1900 8899',
      emailTitle: '官方专属客服邮箱',
      emailAddress: 'cskh@alps.id.vn',
      emailDesc: '专业护肤顾问将在60分钟内回复',
      zurichTitle: '瑞士苏黎世全球总部',
      zurichAddress: 'Bahnhofstrasse 45, 8001 Zürich, 瑞士',
      zurichDesc: '皮肤药妆科研实验室与临床测试中心',
      hcmTitle: '胡志明市体验专柜',
      hcmAddress: '30 Trinh Dinh Thao, Tan Phu, 胡志明市',
      hcmDesc: '尊享线下试用体验与一对一专业测肤',
      hanoiTitle: '河内分部专柜',
      hanoiAddress: 'Tràng Tiền Plaza, 24 Hai Bà Trưng, Hoàn Kiếm, 河内',
      hanoiDesc: '北部极速配送中心与贵宾服务专区',
      workingHoursTitle: '营业与服务时间',
      workingHoursDesc: '客服热线与 AI 顾问：全天 24 小时无休',
      workingHoursTime: '实体专柜：每日 08:30 - 21:30 (节假日无休)',
      callNowBtn: '立即致电',
    },
    ticket: {
      title: '提交专属服务工单',
      subtitle: '我们的瑞士护肤顾问将在 15 分钟内通过电话或邮件与您取得联系。',
      nameLabel: '您的姓名 *',
      phoneLabel: '联系电话 *',
      emailLabel: '电子邮箱 (选填)',
      orderCodeLabel: '关联订单编号 (如有)',
      orderCodePlaceholder: '例如：ALPS-89421',
      topicLabel: '咨询类型 *',
      messageLabel: '详细问题或需求描述 *',
      messagePlaceholder: '请详细描述您的肌肤状况、订单疑问或希望协助的事项...',
      submitBtn: '提交服务工单',
      submittingBtn: '提交中...',
      topics: [
        '护肤咨询与产品选购建议',
        '订单配送状态查询与跟踪',
        '30天无忧退换货与退款申请',
        '信用卡 / VietQR 支付疑问',
        '产品品质建议与意见反馈',
      ],
      validationError: '请完整填写姓名、电话及咨询内容。',
      successTitle: '工单已成功提交！',
      successDesc: (id) => `您的工单编号为 #${id}。Alps 高级顾问已受理，将在 15 分钟内主动与您联系。`,
      newTicketBtn: '提交新工单',
      ticketIdLabel: '工单编号:',
      timeLabel: '受理时间:',
    },
    faq: {
      title: '常见疑问与解答 (FAQ)',
      items: [
        {
          question: 'Alps 30天全额退款保障具体如何运作？',
          answer:
            '自签收之日起30天内，若您的肌肤对产品产生任何不适，即使已开封使用，我们依然承诺为您免费退换或 100% 全额退款。',
        },
        {
          question: '我可以在不注册登录的情况下直接购买吗？',
          answer:
            '完全可以！在 alps.id.vn 官网您可以使用快捷访客结算，只需输入姓名、电话与收货地址即可一键下单。',
        },
        {
          question: '下单后预计多久可以送达？',
          answer:
            '核心市区支持 2-4 小时特快或当天达；全国其他地区 24-48 小时保价空运送达，采用瑞士洁净室级保温防震包材。',
        },
        {
          question: '敏感肌和孕期女性可以安心使用吗？',
          answer:
            '所有产品均获得瑞士纯素认证 (Swiss Vegan Certified)。100% 无干性酒精、无对羟基苯甲酸酯、无人工合成香精，娇嫩敏感肌与孕期准妈妈皆可安心使用。',
        },
        {
          question: '如何获取 1 对 1 定制专属护肤方案？',
          answer:
            '您可以点击官网的“AI 智能测肤”完成 1 分钟测验，或随时与 24/7 在线的 AI 皮肤科顾问展开互动咨询。',
        },
        {
          question: '在线支付与银行扫码安全吗？',
          answer:
            '所有交易均受 256 位 SSL 银行级数据加密保护，支持 VietQR 极速秒级对账与国际主流信用卡支付。',
        },
      ],
    },
  },
};
