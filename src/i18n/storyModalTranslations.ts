import { SupportedLanguage } from './translations';

export interface StoryModalContent {
  headerTag: string;
  modalTitle: string;
  audioActive: string;
  audioInactive: string;
  tab1: string;
  tab2: string;
  tab3: string;
  slogan: string;
  alpsLetters: { letter: string; word: string; meaning: string }[];
  logoDescription: string;
  // Tier 1
  tier1ChapterTitle: string;
  tier1Heading: string;
  storyP1: string;
  storyP2: string;
  storyP3: string;
  storyP4: string;
  approachTitle: string;
  approachPillars: string[];
  approachNote: string;
  nameOriginTitle: string;
  alpsSymbolTitle: string;
  alpsSymbolDesc: string;
  pureEssenceTitle: string;
  pureEssenceDesc: string;
  nameConclusion: string;
  questionHeading: string;
  questionQuote: string;
  questionFoundationTitle: string;
  questionFoundations: string[];
  questionFooter: string;
  historyHeading: string;
  historyOriginText: string;
  phases: { phase: string; title: string; desc: string }[];
  // Tier 2
  tier2Heading: string;
  purityConcept: string;
  fourPillarsTitle: string;
  fourPillars: { title: string; desc: string }[];
  missionTitle: string;
  missionDesc: string;
  visionTitle: string;
  visionDesc: string;
  visionHighlights?: { title: string; desc: string }[];
  coreValuesTitle: string;
  coreValues: { title: string; desc: string }[];
  luxuryTitle: string;
  luxuryPoints: { title: string; desc: string }[];
  sensoryTitle: string;
  sensoryItems: { title: string; desc: string }[];
  // Tier 3
  commitmentsHeading: string;
  commitmentsDesc: string;
  commitmentsList: { num: string; title: string; desc: string }[];
  beliefHeading: string;
  beliefQuote: string;
  beliefPillars: string[];
  closeBtn: string;
  exploreBtn: string;
}

export const STORY_MODAL_I18N: Record<SupportedLanguage, StoryModalContent> = {
  vi: {
    headerTag: 'ALPS PURE ESSENCE • BRAND HERITAGE',
    modalTitle: 'Tuyển Tập Di Sản Thương Hiệu (3 Tầng)',
    audioActive: 'Âm thanh suối băng',
    audioInactive: 'Âm thanh tự nhiên',
    tab1: 'TẦNG 1: BRAND STORY (Nguồn Gốc & Lịch Sử)',
    tab2: 'TẦNG 2: BRAND PHILOSOPHY (Triết Lý & Giá Trị)',
    tab3: 'TẦNG 3: COMMITMENTS & ACTIONS (7 Cam Kết & Lời Hứa)',
    slogan: 'Slogan: “Renew Your Skin. Reveal Your Radiance. — Vẻ đẹp tinh khiết từ thiên nhiên.”',
    alpsLetters: [
      { letter: 'A', word: 'Authentic', meaning: 'Chân thật, tự nhiên' },
      { letter: 'L', word: 'Luminous', meaning: 'Làn da rạng rỡ, tươi sáng' },
      { letter: 'P', word: 'Pure', meaning: 'Tinh khiết, lành tính' },
      { letter: 'S', word: 'Skin', meaning: 'Chăm sóc & nuôi dưỡng làn da' },
    ],
    logoDescription: 'Biểu tượng Logo: Núi tuyết Alps tượng trưng cho tế bào gốc sông băng Thụy Sĩ tinh khiết; dòng nước dưới chân núi gợi khả năng cấp ẩm sâu; mầm cây nhỏ ở giữa biểu tượng cho sự tái sinh và phục hồi; hàng thông xanh nhấn mạnh yếu tố thuần chay tự nhiên; cùng tông nâu vàng thể hiện đẳng cấp dược mỹ phẩm châu Âu.',
    tier1ChapterTitle: 'CHƯƠNG I • SỰ KHỞI SINH',
    tier1Heading: 'Khi Vẻ Đẹp Bắt Đầu Từ Sự Tinh Khiết',
    storyP1: 'Có những vẻ đẹp không cần lên tiếng.',
    storyP2: 'Đó là vẻ đẹp của những đỉnh núi phủ tuyết giữa dãy Alps, nơi thiên nhiên hiện diện trong sự tĩnh lặng, thuần khiết và bền bỉ qua thời gian. Những vùng núi cao, những dòng nước trong lành và những khoảng không rộng lớn của Alps gợi lên một cảm giác đặc biệt: sự tinh khiết không cần phô trương vẫn có thể trở nên đầy sức hút.',
    storyP3: 'Đó chính là nguồn cảm hứng cho sự ra đời của Alps Pure Essence.',
    storyP4: 'Alps Pure Essence được xây dựng từ một niềm tin rằng chăm sóc da không đơn thuần là một hành động làm đẹp. Đó là một hình thức quan tâm đến chính mình — một khoảng thời gian mà mỗi người có thể tạm rời khỏi nhịp sống vội vã để lắng nghe và chăm sóc cơ thể của mình.',
    approachTitle: 'CÁCH TIẾP CẬN CỦA ALPS PURE ESSENCE',
    approachPillars: ['Ít ồn ào hơn', 'Có chủ đích hơn', 'Tinh tế hơn', 'Chân thật hơn'],
    approachNote: 'Không biến skincare thành một cuộc chạy đua tiêu chuẩn không thực tế. Thay vào đó, đưa skincare trở về với bản chất nguyên bản nhất: hiểu làn da, lựa chọn phù hợp và chăm sóc một cách nhất quán.',
    nameOriginTitle: 'II. NGUỒN GỐC CỦA TÊN ALPS PURE ESSENCE',
    alpsSymbolTitle: 'ALPS',
    alpsSymbolDesc: 'Đại diện cho dãy núi Alps — biểu tượng của thiên nhiên hùng vĩ, sự tinh khiết và vẻ đẹp vượt thời gian. Alps là biểu tượng của sự thanh sạch giữa thế giới hiện đại, của sức mạnh được hình thành qua thời gian, và của vẻ đẹp không phụ thuộc vào xu hướng.',
    pureEssenceTitle: 'PURE ESSENCE',
    pureEssenceDesc: 'Bản chất tinh túy nhất. Không phải càng nhiều thành phần càng tốt; không phải bao bì càng cầu kỳ thì sản phẩm càng cao cấp. Giá trị nằm ở bản chất: công thức, thành phần, trải nghiệm và niềm tin mà thương hiệu tạo ra.',
    nameConclusion: '“Tìm kiếm sự tinh túy trong những điều thực sự có giá trị.”',
    questionHeading: 'III. SỰ RA ĐỜI BẮT ĐẦU TỪ MỘT CÂU HỎI',
    questionQuote: '“Một thương hiệu skincare thực sự có giá trị cần mang lại điều gì cho khách hàng?”',
    questionFoundationTitle: 'Ba nền tảng định hướng:',
    questionFoundations: ['Tinh khiết trong lựa chọn', 'Minh bạch trong giao tiếp', 'Trách nhiệm trong hành động'],
    questionFooter: 'Đây trở thành nền tảng để thương hiệu phát triển sản phẩm, hình ảnh, trải nghiệm khách hàng và định hướng kinh doanh.',
    historyHeading: 'IV. LỊCH SỬ THƯƠNG HIỆU (2026 — KHỞI NGUỒN)',
    historyOriginText: 'Alps Pure Essence được hình thành vào năm 2026 với định hướng quiet luxury — sự sang trọng được thể hiện thông qua sự tinh giản, chất lượng, tính nhất quán và sự chú ý đến từng chi tiết.',
    phases: [
      { phase: 'Giai đoạn 1', title: 'Hình Thành Ý Tưởng', desc: 'Quan sát sự thay đổi trong hành vi người tiêu dùng hiện đại: tập trung vào thành phần, công dụng thực tế, độ phù hợp và niềm tin lâu dài.' },
      { phase: 'Giai đoạn 2', title: 'Xác Lập Bản Sắc', desc: 'Thanh lịch nhưng không phô trương, cao cấp nhưng không xa cách, tối giản nhưng không đơn điệu theo cảm hứng tuyết trắng và núi cao Thụy Sĩ.' },
      { phase: 'Giai đoạn 3', title: 'Phát Triển Sản Phẩm', desc: 'Mỗi sản phẩm trả lời 3 câu hỏi: Được tạo ra để làm gì? Phù hợp với ai? Sử dụng thế nào để có trải nghiệm tốt nhất?' },
      { phase: 'Giai đoạn 4', title: 'Trải Nghiệm Đa Kênh', desc: 'Website là không gian kể câu chuyện và kiến thức; sàn TMĐT đóng vai trò tạo sự thuận tiện và tiếp cận nhanh chóng.' },
    ],
    tier2Heading: 'V. TRIẾT LÝ THƯƠNG HIỆU',
    purityConcept: '“Purity is the beginning of beauty.” Tinh khiết không chỉ là đến từ thiên nhiên; tinh khiết là một cách tư duy, một cách lựa chọn và một lời cam kết.',
    fourPillarsTitle: 'Bốn Tầng Giá Trị Của Triết Lý Tinh Khiết',
    fourPillars: [
      { title: 'Tinh khiết trong lựa chọn', desc: 'Mỗi thành phần đều có lý do để xuất hiện. Không lấy số lượng thành phần làm thước đo, mà ưu tiên sự cân bằng sinh học.' },
      { title: 'Minh bạch trong thông tin', desc: 'Khách hàng có quyền biết sản phẩm làm được gì và không thể làm được điều gì. Không thổi phồng kỳ vọng vô căn cứ.' },
      { title: 'Tinh tế trong trải nghiệm', desc: 'Sự sang trọng bắt đầu từ cảm giác dễ chịu khi chạm vào chai lọ, hương thơm thảo mộc tự nhiên và chất kem thẩm thấu.' },
      { title: 'Vẻ đẹp vượt thời gian', desc: 'Không chạy theo trào lưu nhất thời; nuôi dưỡng làn da khỏe mạnh, cân bằng và tràn đầy sức sống tự nhiên.' },
    ],
    missionTitle: 'Sứ Mệnh (Mission)',
    missionDesc: 'Đồng hành cùng khách hàng trong hành trình nuôi dưỡng làn da khỏe mạnh, tinh tế và bền vững thông qua những sản phẩm chất lượng cao, 100% không nguồn gốc động vật và lành tính an toàn chuẩn y khoa Thụy Sĩ.',
    visionTitle: 'Tầm Nhìn (Vision)',
    visionDesc: 'Trở thành biểu tượng dược mỹ phẩm hàng đầu hướng về chất lượng vượt trội dành cho khách hàng. Alps Pure Essence kiên định chuẩn mực 100% thuần chay không động vật, tuyệt đối không thử nghiệm trên động vật (Cruelty-Free), cam kết công thức lành tính tối đa, an toàn dịu nhẹ và nâng niu trọn vẹn cả những làn da nhạy cảm nhất.',
    visionHighlights: [
      { title: 'Chất Lượng Vượt Trội Dành Cho Khách Hàng', desc: 'Hiệu quả da liễu rõ rệt, tận tâm phụng sự trải nghiệm và sự an tâm tuyệt đối của khách hàng' },
      { title: '100% Không Động Vật & Cruelty-Free', desc: 'Tuyệt đối không sử dụng thành phần động vật và không bao giờ thử nghiệm trên động vật' },
      { title: 'Lành Tính Tuyệt Đối Chuẩn Y Khoa', desc: 'Công thức tinh khiết từ thảo mộc Alps & tế bào gốc sông băng, êm dịu cho cả da nhạy cảm nhất' },
    ],
    coreValuesTitle: 'Năm Giá Trị Cốt Lõi',
    coreValues: [
      { title: 'Tinh khiết (Purity)', desc: 'Trong tư duy, lựa chọn và hành động.' },
      { title: 'Chân thật (Authenticity)', desc: 'Tôn trọng sự thật và nói đúng về sản phẩm.' },
      { title: 'Tinh tế (Refinement)', desc: 'Chú ý đến từng chi tiết nhỏ nhất trong trải nghiệm.' },
      { title: 'Bền vững (Endurance)', desc: 'Xây dựng giá trị lâu dài thay vì chạy theo ngắn hạn.' },
      { title: 'Tôn trọng (Respect)', desc: 'Tôn trọng làn da, khách hàng và môi trường tự nhiên.' },
    ],
    luxuryTitle: 'Phong Cách Quiet Luxury Của Alps Pure Essence',
    luxuryPoints: [
      { title: 'Bao bì', desc: 'Tối giản, đường nét rõ ràng, chất liệu thủy tinh mờ cao cấp, hạn chế chi tiết thừa.' },
      { title: 'Ngôn ngữ', desc: 'Điềm đạm, chân thành, tôn trọng người nghe, không dùng từ ngữ gây áp lực tâm lý.' },
      { title: 'Màu sắc', desc: 'Trắng tuyết, xanh thông, xám đá và vàng cát Thụy Sĩ sang trọng.' },
    ],
    sensoryTitle: 'Trải Nghiệm Đa Giác Quan',
    sensoryItems: [
      { title: 'Thị giác', desc: 'Hình ảnh trong lành, ánh sáng tự nhiên dịu nhẹ, bố cục thoáng đãng.' },
      { title: 'Xúc giác', desc: 'Chai thủy tinh nhám mịn, kết cấu sản phẩm mỏng nhẹ, tan nhanh trên da.' },
      { title: 'Khứu giác', desc: 'Hương thơm thảo mộc tự nhiên thoang thoảng, không mùi hương liệu nhân tạo.' },
    ],
    commitmentsHeading: 'VI. BẢY CAM KẾT & LỜI HỨA HÀNH ĐỘNG',
    commitmentsDesc: 'Để triết lý không dừng lại ở lời nói, Alps Pure Essence thiết lập 7 cam kết hành động cụ thể:',
    commitmentsList: [
      { num: '01', title: 'Công Thức Thuần Khiết Chuẩn Y Khoa', desc: 'Ưu tiên thành phần lành tính, an toàn và có kiểm chứng da liễu; loại bỏ hương liệu nhân tạo và chất dễ gây kích ứng.' },
      { num: '02', title: 'Minh Bạch & Trung Thực Tuyệt Đối', desc: 'Công khai toàn bộ bảng thành phần, công dụng và hướng dẫn; nêu rõ những gì sản phẩm không làm được.' },
      { num: '03', title: 'Chất Lượng Cải Tiến Liên Tục', desc: 'Kiểm soát nguyên liệu, bảo quản và vận chuyển; chất lượng là quá trình cải thiện liên tục, không phải khẩu hiệu.' },
      { num: '04', title: 'Tôn Trọng Vẻ Đẹp Chân Thật', desc: 'Không cổ vũ tiêu chuẩn sắc đẹp phi thực tế; không dùng thông điệp gây mặc cảm; tôn trọng giá trị vốn có của làn da.' },
      { num: '05', title: 'Trách Nhiệm Môi Trường', desc: 'Tối giản bao bì, nghiên cứu vật liệu tái chế, giảm lớp đóng gói dùng một lần; cải thiện từng bước có trách nhiệm.' },
      { num: '06', title: 'Đồng Hành Cùng Khách Hàng', desc: 'Đồng hành trước - trong - sau mua hàng; coi phản hồi khách hàng là nguồn lực quý giá nhất để hoàn thiện.' },
      { num: '07', title: 'Không Đánh Đổi Niềm Tin Lấy Doanh Số', desc: 'Nếu khách hàng không cần, sẵn sàng tư vấn rằng họ không nhất thiết phải mua. Một giao dịch tạo doanh thu, sự tin tưởng mới tạo ra thương hiệu.' },
    ],
    beliefHeading: 'LỜI HỨA CỦA ALPS PURE ESSENCE — OUR BELIEF',
    beliefQuote: '“Chúng tôi không hứa về một vẻ đẹp hoàn hảo. Chúng tôi hứa về một hành trình chăm sóc được xây dựng bằng sự tinh tế, hiểu biết và trách nhiệm.”',
    beliefPillars: ['Tinh túy trong lựa chọn', 'Tinh tế trong trải nghiệm', 'Chân thành trong cam kết', 'Bền vững theo thời gian'],
    closeBtn: 'Đóng',
    exploreBtn: 'Khám Phá Bộ Sưu Tập',
  },

  en: {
    headerTag: 'ALPS PURE ESSENCE • BRAND HERITAGE',
    modalTitle: 'Brand Heritage Compendium (3 Tiers)',
    audioActive: 'Glacial Stream Audio',
    audioInactive: 'Nature Audio',
    tab1: 'TIER 1: BRAND STORY (Genesis & Origins)',
    tab2: 'TIER 2: BRAND PHILOSOPHY (Values & Principles)',
    tab3: 'TIER 3: COMMITMENTS & ACTIONS (7 Solemn Pledges)',
    slogan: 'Slogan: “Renew Your Skin. Reveal Your Radiance. — Pure beauty from nature.”',
    alpsLetters: [
      { letter: 'A', word: 'Authentic', meaning: 'Genuine, honest & natural' },
      { letter: 'L', word: 'Luminous', meaning: 'Luminous, healthy & radiant skin' },
      { letter: 'P', word: 'Pure', meaning: 'Pure, safe & gentle dermocosmetics' },
      { letter: 'S', word: 'Skin', meaning: 'Dedicated cellular skin nourishment' },
    ],
    logoDescription: 'Brand Logo Anatomy: The snow-capped Alps symbolize pure Swiss glacial stem cells; the glacial lake water beneath signifies deep cellular hydration; the central botanical sprout represents skin rebirth and resilience; the evergreen pine grove highlights natural vegan origins; and the champagne gold accents express European pharmaceutical elegance.',
    tier1ChapterTitle: 'CHAPTER I • THE GENESIS',
    tier1Heading: 'When Beauty Begins With Purity',
    storyP1: 'There is a beauty that does not need to shout.',
    storyP2: 'It is the beauty of snow-crowned summits in the Swiss Alps, where nature endures in quiet majesty, crystal purity, and unhurried grace. The high peaks, pure glacial streams, and vast alpine expanses evoke a singular truth: purity without pretense carries the deepest resonance.',
    storyP3: 'This is the inspiration behind Alps Pure Essence.',
    storyP4: 'Alps Pure Essence was founded on the belief that skincare is not merely a superficial beauty ritual. It is an intentional act of self-care — a sacred moment to step away from the rush of modern life, listen to your body, and tenderly nurture your skin.',
    approachTitle: 'THE ALPS PURE ESSENCE APPROACH',
    approachPillars: ['Less noise', 'More intention', 'Refined nuance', 'Authentic truth'],
    approachNote: 'We reject unattainable beauty standards. Skincare returns to its essence: understanding your skin, choosing mindfully, and caring consistently.',
    nameOriginTitle: 'II. THE ORIGIN OF OUR NAME',
    alpsSymbolTitle: 'ALPS',
    alpsSymbolDesc: 'Named after the legendary Swiss Alps — a timeless beacon of clean air, enduring strength carved by millennia, and beauty unbound by passing trends.',
    pureEssenceTitle: 'PURE ESSENCE',
    pureEssenceDesc: 'The essential core of value. Excellence resides in clean chemistry, sensory joy, and earned trust — never in extravagant packaging or inflated claims.',
    nameConclusion: '“Seeking the true essence in things that truly matter.”',
    questionHeading: 'III. BORN FROM A FUNDAMENTAL QUESTION',
    questionQuote: '“What should a truly valuable skincare brand bring to its customers?”',
    questionFoundationTitle: 'Three Foundational Pillars:',
    questionFoundations: ['Purity in selection', 'Transparency in communication', 'Responsibility in action'],
    questionFooter: 'These foundations guide our product formulation, brand imagery, customer care, and company growth.',
    historyHeading: 'IV. BRAND HISTORY (2026 — GENESIS)',
    historyOriginText: 'Alps Pure Essence was established in 2026 with a quiet luxury ethos — prestige expressed through minimalism, uncompromised quality, consistency, and obsessive attention to detail.',
    phases: [
      { phase: 'Phase 1', title: 'Conceptual Genesis', desc: 'Observing consumer shifts toward ingredient awareness, clinical performance, and long-term trust.' },
      { phase: 'Phase 2', title: 'Identity Architecture', desc: 'Elegant without pretense, premium yet approachable, minimalist yet deeply connected to Swiss alpine nature.' },
      { phase: 'Phase 3', title: 'Formulation Craft', desc: 'Every product answers three vital questions: What is its purpose? Who is it for? How to experience it best?' },
      { phase: 'Phase 4', title: 'Digital Sanctuary', desc: 'Our website acts as an editorial home for brand storytelling; marketplaces offer swift accessibility.' },
    ],
    tier2Heading: 'V. BRAND PHILOSOPHY',
    purityConcept: '“Purity is the beginning of beauty.” Purity is more than natural ingredients; it is a mindset, a discipline of curation, and a solemn commitment.',
    fourPillarsTitle: 'Four Pillars of the Purity Philosophy',
    fourPillars: [
      { title: 'Purity in selection', desc: 'Every botanical ingredient has a biological purpose. We prioritize formula harmony over ingredient quantity.' },
      { title: 'Honesty in disclosure', desc: 'Full transparency regarding what formulas achieve and what they cannot. We never manufacture false hope.' },
      { title: 'Refinement in experience', desc: 'True luxury lives in subtle details: tactile frosted glass, non-slip caps, intuitive dispensers, and mindful guidance.' },
      { title: 'Timeless beauty', desc: 'Rejecting fleeting fads to cultivate sustainable, vibrant skin health that honors each person’s innate grace.' },
    ],
    missionTitle: 'Our Mission',
    missionDesc: 'To accompany our clients in cultivating mindful, refined, and enduring skin health rituals through customer-centric supreme quality, 100% cruelty-free vegan formulations, and ultra-gentle Swiss dermatological care.',
    visionTitle: 'Our Vision',
    visionDesc: 'To be the leading dermocosmetics benchmark dedicated to uncompromising quality for our customers. Alps Pure Essence is firmly committed to 100% cruelty-free, zero animal-derived ingredients, and exceptionally gentle, hypoallergenic formulations that tenderly protect even the most delicate skin.',
    visionHighlights: [
      { title: 'Customer-Centric Supreme Quality', desc: 'Customer skin health and authentic satisfaction is our ultimate guiding standard' },
      { title: '100% Cruelty-Free & Zero Animal', desc: 'Zero animal-derived ingredients and zero animal testing across all formulations' },
      { title: 'Ultra-Gentle & Hypoallergenic', desc: 'Medical-grade purity formulated to soothe and protect even the most delicate skin' },
    ],
    coreValuesTitle: 'Five Core Brand Values',
    coreValues: [
      { title: 'Purity', desc: 'In thought, active botanical sourcing, and ethical business conduct.' },
      { title: 'Authenticity', desc: 'Radical honesty, clinical validation, and transparent dialogue.' },
      { title: 'Refinement', desc: 'Meticulous attention to sensory textures, ergonomics, and glasscraft.' },
      { title: 'Endurance', desc: 'Fostering long-term skin barrier resilience and sustainable practices.' },
      { title: 'Respect', desc: 'Honoring natural biology, individual skin diversity, and the planet.' },
    ],
    luxuryTitle: 'The Quiet Luxury Aesthetic of Alps Pure Essence',
    luxuryPoints: [
      { title: 'Packaging', desc: 'Minimalist silhouettes, frosted sandblasted glass, and purposeful functional details.' },
      { title: 'Language', desc: 'Calm, respectful, and honest. Free from anxiety-inducing marketing jargon.' },
      { title: 'Palette', desc: 'Snow white, alpine pine green, granite slate, and warm Swiss champagne gold.' },
    ],
    sensoryTitle: 'Multi-Sensory Experience',
    sensoryItems: [
      { title: 'Sight', desc: 'Soft morning light, airy compositions, and serene alpine imagery.' },
      { title: 'Touch', desc: 'Silky frosted glass containers and quick-absorbing velvet textures.' },
      { title: 'Scent', desc: 'Delicate whispers of natural botanicals, 100% free of synthetic perfumes.' },
    ],
    commitmentsHeading: 'VI. SEVEN SOLEMN COMMITMENTS & ACTIONS',
    commitmentsDesc: 'To ensure our philosophy is continually practiced, Alps Pure Essence adheres to seven tangible commitments:',
    commitmentsList: [
      { num: '01', title: 'Medical-Grade Clean Vegan Formulas', desc: 'Clean, certified vegan actives. 0% parabens, 0% artificial fragrances, 0% animal testing.' },
      { num: '02', title: 'Uncompromising Transparency', desc: 'Full INCI disclosure and realistic benefits; clear guidance on ideal skin types and usage.' },
      { num: '03', title: 'Continuous Quality Enhancement', desc: 'Meticulous cold-bio extraction, monitored temperature storage, and batch-by-batch QA.' },
      { num: '04', title: 'Celebrating Authentic Skin', desc: 'Zero unretouched skin-shaming imagery; respecting the natural biological skin barrier.' },
      { num: '05', title: 'Environmental Stewardship', desc: 'UV-blocking sandblasted glass, soy inks, minimal plastic, and biodegradable outer cartons.' },
      { num: '06', title: 'Lifelong Client Dialogue', desc: 'Comprehensive support before, during, and after purchase; client feedback drives our laboratory.' },
      { num: '07', title: 'Never Trading Trust For Sales', desc: 'If a product is not right for you, we will counsel you not to buy it. Transactions create revenue; trust creates a legacy.' },
    ],
    beliefHeading: 'THE ALPS PURE ESSENCE BELIEF — OUR PLEDGE',
    beliefQuote: '“We do not promise artificial perfection. We promise a refined self-care journey built on scientific knowledge, subtlety, and deep responsibility.”',
    beliefPillars: ['Purity in choice', 'Refinement in experience', 'Sincerity in commitment', 'Timeless in endurance'],
    closeBtn: 'Close',
    exploreBtn: 'Explore The Collection',
  },

  de: {
    headerTag: 'ALPS PURE ESSENCE • SCHWEIZER ERBE',
    modalTitle: 'Kompendium des Markenerbes (3 Stufen)',
    audioActive: 'Gletscherbach-Audio Aktiv',
    audioInactive: 'Naturklang',
    tab1: 'STUFE 1: BRAND STORY (Ursprung & Entstehung)',
    tab2: 'STUFE 2: BRAND PHILOSOPHY (Werte & Philosophie)',
    tab3: 'STUFE 3: COMMITMENTS & ACTIONS (7 Feste Zusagen)',
    slogan: 'Slogan: „Renew Your Skin. Reveal Your Radiance. — Reine Schönheit aus der Natur.“',
    alpsLetters: [
      { letter: 'A', word: 'Authentic', meaning: 'Ehrlich, wahrhaftig & natürlich' },
      { letter: 'L', word: 'Luminous', meaning: 'Strahlend schöne, vitale Haut' },
      { letter: 'P', word: 'Pure', meaning: 'Rein, sanft & dermatologisch sicher' },
      { letter: 'S', word: 'Skin', meaning: 'Gezielte Pflege & Zellerneuerung' },
    ],
    logoDescription: 'Anatomie des Markenlogos: Die schneebedeckten Alpengipfel symbolisieren reine Schweizer Gletscher-Stammzellen; das Wasser darunter steht für tiefenwirksame Feuchtigkeit; der zarte Pflanzenspross verkörpert Regeneration; der Kiefernwald betont die vegane Naturreinheit; die Champagnergold-Töne spiegeln europäische Dermo-Eleganz wider.',
    tier1ChapterTitle: 'KAPITEL I • DER URSPRUNG',
    tier1Heading: 'Wenn Schönheit Aus Reinheit Entsteht',
    storyP1: 'Es gibt eine Schönheit, die keine lauten Worte braucht.',
    storyP2: 'Es ist die stille Erhabenheit der schneebedeckten Alpengipfel, wo die Natur in unberührter Reinheit und ewiger Ruhe verweilt. Kristallklares Gletscherwasser und weite Bergräume vermitteln: Wahre Reinheit besticht ohne jede Prahlerei.',
    storyP3: 'Dies ist die Inspiration für Alps Pure Essence.',
    storyP4: 'Alps Pure Essence gründet auf der Überzeugung, dass Hautpflege mehr ist als Kosmetik. Es ist ein achtsames Innehalten — ein Moment, um dem Alltag zu entfliehen und der eigenen Haut mit Respekt zu begegnen.',
    approachTitle: 'DER ANSATZ VON ALPS PURE ESSENCE',
    approachPillars: ['Weniger Lärm', 'Mehr Absicht', 'Mehr Feingefühl', 'Mehr Ehrlichkeit'],
    approachNote: 'Kein Nachjagen unrealistischer Ideale, sondern Rückbesinnung auf das Wesentliche: Haut verstehen, bewusst wählen, stetig pflegen.',
    nameOriginTitle: 'II. HERKUNFT DES NAMENS',
    alpsSymbolTitle: 'ALPS',
    alpsSymbolDesc: 'Sinnbild der Schweizer Alpen — ewige Reinheit, über Jahrtausende gewachsene Kraft und Eleganz fernab kurzlebiger Trends.',
    pureEssenceTitle: 'PURE ESSENCE',
    pureEssenceDesc: 'Das reinste Wesentliche. Wertvoll durch fundierte Rezepturen, sinnliche Texturen und verdientes Vertrauen — nicht durch Prunkverpackungen.',
    nameConclusion: '„Die Suche nach dem Wesentlichen in den Dingen von echtem Wert.“',
    questionHeading: 'III. EINE GRUNDLEGENDE FRAGE',
    questionQuote: '„Was muss eine wahrhaft wertvolle Pflegemarke ihren Kunden schenken?“',
    questionFoundationTitle: 'Drei tragende Säulen:',
    questionFoundations: ['Reinheit bei der Auswahl', 'Transparenz im Dialog', 'Verantwortung im Handeln'],
    questionFooter: 'Dieses Fundament leitet unsere Rezepturentwicklung, Kommunikation und Kundenbetreuung.',
    historyHeading: 'IV. MARKENHISTORIE (2026 — URSPRUNG)',
    historyOriginText: 'Alps Pure Essence entstand 2026 im Geiste des Quiet Luxury — unaufdringlicher Luxus durch kompromisslose Qualität, Beständigkeit und Liebe zum Detail.',
    phases: [
      { phase: 'Phase 1', title: 'Ideenfindung', desc: 'Analyse veränderter Verbraucherbedürfnisse: Wissenschaft, Verträglichkeit und nachhaltiges Vertrauen.' },
      { phase: 'Phase 2', title: 'Identitätsbildung', desc: 'Edel ohne Prunk, hochwertig ohne Distanz, minimalistischer Schweizer Alpen-Stil.' },
      { phase: 'Phase 3', title: 'Rezepturentwicklung', desc: 'Jedes Produkt beantwortet 3 Fragen: Wozu dient es? Für wen ist es ideal? Wie wendet man es optimal an?' },
      { phase: 'Phase 4', title: 'Digitales Flaggschiff', desc: 'Die Website als Heimat unserer Geschichten; Marktplätze für schnellen und zuverlässigen Zugang.' },
    ],
    tier2Heading: 'V. MARKENPHILOSOPHIE',
    purityConcept: '„Purity is the beginning of beauty.“ Reinheit ist mehr als natürliche Herkunft; Reinheit ist eine Geisteshaltung und ein Versprechen.',
    fourPillarsTitle: 'Vier Säulen der Reinheits-Philosophie',
    fourPillars: [
      { title: 'Reinheit in der Auswahl', desc: 'Jeder Inhaltsstoff erfüllt eine Funktion. Wir messen Qualität nicht an Mengen, sondern an biologischer Synergie.' },
      { title: 'Ehrlichkeit im Dialog', desc: 'Klarheit darüber, was Rezepturen leisten können und was nicht. Keine leeren Marketingversprechen.' },
      { title: 'Raffinierte Haptik', desc: 'Luxus liegt im Detail: mattiertes Schutzglas, rutschfeste Verschlüsse und angenehme Texturen.' },
      { title: 'Zeitlose Leuchtkraft', desc: 'Kein Hype, sondern nachhaltige Hautgesundheit, die Ihre natürliche Schönheit zum Strahlen bringt.' },
    ],
    missionTitle: 'Unsere Mission',
    missionDesc: 'Kunden auf dem Weg zu gesunden, eleganten und nachhaltigen Pflegeritualen mit kompromissloser Qualität, 100% tierfreien Rezepturen und reiner Schweizer Dermokosmetik zu begleiten.',
    visionTitle: 'Unsere Vision',
    visionDesc: 'Die führende Marke für Schweizer Dermokosmetik zu sein, die kompromisslose Qualität für Kunden in den Mittelpunkt stellt. Wir verpflichten uns zu 100 % tierversuchsfreien und rein veganen Rezepturen sowie zu absolut reinen, sanften und hypoallergenen Formeln für empfindlichste Haut.',
    visionHighlights: [
      { title: 'Höchste Qualität für Kunden', desc: 'Kundenzufriedenheit und gesunde Hautbarriere als oberster Qualitätsmaßstab' },
      { title: '100 % Tierfrei & Ohne Tierversuche', desc: 'Keine tierischen Inhaltsstoffe und ausnahmslos ohne Tierversuche (Cruelty-Free)' },
      { title: 'Hypoallergen & Höchst Verträglich', desc: 'Reine, sanfte Schweizer Rezepturen für maximalen Schutz empfindlicher Haut' },
    ],
    coreValuesTitle: 'Fünf Grundwerte',
    coreValues: [
      { title: 'Reinheit', desc: 'In Formulierung, Philosophie und unternehmerischem Handeln.' },
      { title: 'Authentizität', desc: 'Wissenschaftlich belegt, transparent und ehrlich.' },
      { title: 'Raffinesse', desc: 'Aufmerksamkeit für Sensorik, Glasverarbeitung und Ergonomie.' },
      { title: 'Beständigkeit', desc: 'Nachhaltige Hautbarriere-Stärkung statt schneller Scheineffekte.' },
      { title: 'Respekt', desc: 'Achtung vor Hautphysiologie, Kunden und Natur.' },
    ],
    luxuryTitle: 'Der Quiet Luxury Stil von Alps Pure Essence',
    luxuryPoints: [
      { title: 'Verpackung', desc: 'Minimalistisch, mattiertes Glas, ergonomisch gefräste Kappen, kein unnötiger Zierrat.' },
      { title: 'Tonalität', desc: 'Besonnen, ehrlich und respektvoll ohne manipulative Verkaufsrhetorik.' },
      { title: 'Farbwelt', desc: 'Schneeweiß, Bergkieferngrün, Felsgrau und edles Schweizer Champagnergold.' },
    ],
    sensoryTitle: 'Multisensorische Erfahrung',
    sensoryItems: [
      { title: 'Sehen', desc: 'Klares Licht, alpine Ruhe und aufgeräumte visuelle Eleganz.' },
      { title: 'Fühlen', desc: 'Samtige Glasflakons und schwerelose Texturen, die rasch einziehen.' },
      { title: 'Riechen', desc: 'Zarter Hauch alpiner Kräuter ohne jeden künstlichen Duftzusatz.' },
    ],
    commitmentsHeading: 'VI. SIEBEN FESTE VERPFLICHTUNGEN',
    commitmentsDesc: 'Um unsere Philosophie täglich mit Leben zu füllen, gelten bei Alps Pure Essence sieben feste Zusagen:',
    commitmentsList: [
      { num: '01', title: 'Medizinisch Zertifiziert Vegane Formeln', desc: '0% Tierversuche, 0% Parabene, 0% künstliche Duftstoffe; höchste Hautverträglichkeit.' },
      { num: '02', title: 'Vollständige Transparenz', desc: 'Offenlegung aller Inhaltsstoffe und physiologischer pH-Wert (5.5 - 6.8).' },
      { num: '03', title: 'Kontinuierliche Qualitätsprüfung', desc: 'Schonende Kaltextraktion, zertifizierte Schweizer Labore und strenge Kontrollen.' },
      { num: '04', title: 'Echte, Unverfälschte Schönheit', desc: 'Keine retuschierten Scheinbilder; Wertschätzung für jedes Hautbild.' },
      { num: '05', title: 'Ökologische Verantwortung', desc: 'Recycelbares Mattglas, Schutz vor UV-Licht und biologisch abbaubare Verpackungen.' },
      { num: '06', title: 'Zuverlässiger Kundenservice', desc: 'Fachkundige Beratung vor und nach dem Kauf; 30 Tage Rückgaberecht.' },
      { num: '07', title: 'Vertrauen Steht Über Umsatz', desc: 'Wenn ein Produkt nicht zu Ihrer Haut passt, raten wir vom Kauf ab. Vertrauen schafft bleibende Werte.' },
    ],
    beliefHeading: 'DAS ALPS PURE ESSENCE GELÖBNIS',
    beliefQuote: '„Wir versprechen keine künstliche Perfektion. Wir versprechen eine achtsame Pflege, getragen von Wissen, Feingefühl und Verantwortung.“',
    beliefPillars: ['Reinheit in der Wahl', 'Raffinesse im Erlebnis', 'Aufrichtigkeit im Gelöbnis', 'Zeitlose Beständigkeit'],
    closeBtn: 'Schließen',
    exploreBtn: 'Kollektion Entdecken',
  },

  es: {
    headerTag: 'ALPS PURE ESSENCE • PATRIMONIO DE MARCA',
    modalTitle: 'Compendio del Patrimonio de Marca (3 Niveles)',
    audioActive: 'Sonido de Arroyo Glacial Activo',
    audioInactive: 'Sonido Natural',
    tab1: 'NIVEL 1: BRAND STORY (Orígenes e Historia)',
    tab2: 'NIVEL 2: BRAND PHILOSOPHY (Filosofía y Valores)',
    tab3: 'NIVEL 3: COMPROMISOS Y ACCIONES (7 Compromisos Éticos)',
    slogan: 'Slogan: “Renew Your Skin. Reveal Your Radiance. — Belleza pura de la naturaleza.”',
    alpsLetters: [
      { letter: 'A', word: 'Auténtico', meaning: 'Honesto, real y natural' },
      { letter: 'L', word: 'Luminoso', meaning: 'Piel radiante, luminosa y viva' },
      { letter: 'P', word: 'Puro', meaning: 'Puro, seguro y dermatológico' },
      { letter: 'S', word: 'Skin (Piel)', meaning: 'Cuidado y nutrición celular' },
    ],
    logoDescription: 'Anatomía del Logo: Las cumbres nevadas de los Alpes simbolizan las células madre glaciares puras suizas; el lago glacial inferior evoca la hidratación dérmica profunda; el brote botánico central simboliza la regeneración cutánea; el pinar verde subraya el origen vegano natural; y el tono dorado champán refleja la alta dermocosmética europea.',
    tier1ChapterTitle: 'CAPÍTULO I • EL ORIGEN',
    tier1Heading: 'Cuando La Belleza Nace De La Pureza',
    storyP1: 'Hay bellezas que no necesitan alzar la voz.',
    storyP2: 'Es la belleza de las cumbres nevadas de los Alpes suizos, donde la naturaleza perdura en silencio, pureza y paciencia milenaria. Los torrentes glaciares cristalinos y los espacios abiertos demuestran que la pureza sin artificios es la más cautivadora.',
    storyP3: 'Esa es la inspiración del nacimiento de Alps Pure Essence.',
    storyP4: 'Alps Pure Essence nació del convencimiento de que el cuidado facial es más que cosmética. Es un acto íntimo de bienestar: un momento para detenerse, escuchar al cuerpo y cuidar la piel con serenidad.',
    approachTitle: 'EL ENFOQUE DE ALPS PURE ESSENCE',
    approachPillars: ['Menos ruido', 'Más propósito', 'Más sutileza', 'Más autenticidad'],
    approachNote: 'No convertimos el skincare en una carrera de estándares irreales, sino en un retorno a lo esencial: comprender la piel, elegir con acierto y cuidar con constancia.',
    nameOriginTitle: 'II. EL ORIGEN DE NUESTRO NOMBRE',
    alpsSymbolTitle: 'ALPS',
    alpsSymbolDesc: 'Homenaje a los Alpes: emblema de aire puro, fortaleza forjada por el tiempo y una elegancia ajena a modas pasajeras.',
    pureEssenceTitle: 'PURE ESSENCE',
    pureEssenceDesc: 'La esencia más valiosa. El verdadero lujo reside en fórmulas científicas limpias, placer sensorial y confianza mutua, no en envases recargados.',
    nameConclusion: '“Buscar la excelencia en lo que verdaderamente tiene valor.”',
    questionHeading: 'III. TODO COMIENZA CON UNA PREGUNTA',
    questionQuote: '“¿Qué debe aportar una marca de skincare verdaderamente valiosa a sus clientes?”',
    questionFoundationTitle: 'Tres pilares fundacionales:',
    questionFoundations: ['Pureza en la selección', 'Transparencia en la información', 'Responsabilidad en cada acción'],
    questionFooter: 'Estos principios son el cimiento de nuestros productos, estética y servicio al cliente.',
    historyHeading: 'IV. HISTORIA DE LA MARCA (2026 — GÉNESIS)',
    historyOriginText: 'Alps Pure Essence se consolidó en 2026 bajo la premisa del quiet luxury: distinción basada en el rigor, la templanza y el perfeccionismo suizo.',
    phases: [
      { phase: 'Fase 1', title: 'Génesis de la Idea', desc: 'Atención a la demanda de cosmética informada, basada en ciencia botánica y confianza.' },
      { phase: 'Fase 2', title: 'Definición de Identidad', desc: 'Elegancia sobria, lujo silencioso y minimalismo armónico con la naturaleza alpina.' },
      { phase: 'Fase 3', title: 'Desarrollo Formular', desc: 'Cada producto responde a 3 preguntas: ¿Para qué sirve? ¿Para quién es ideal? ¿Cómo aplicarlo mejor?' },
      { phase: 'Fase 4', title: 'Experiencia Digital', desc: 'Sitio web como santuario editorial de la marca y canales de distribución ágiles.' },
    ],
    tier2Heading: 'V. FILOSOFÍA DE LA MARCA',
    purityConcept: '“Purity is the beginning of beauty.” La pureza va más allá de los ingredientes naturales; es una forma de pensar, de elegir y de comprometerse.',
    fourPillarsTitle: 'Cuatro Pilares de la Filosofía de Pureza',
    fourPillars: [
      { title: 'Pureza en la elección', desc: 'Cada botánico tiene una función precisa. Priorizamos la armonía cutánea antes que largas listas de reclamos.' },
      { title: 'Transparencia absoluta', desc: 'Explicamos con honestidad lo que nuestras fórmulas logran y lo que no. Sin falsas ilusiones.' },
      { title: 'Experiencia refinada', desc: 'El lujo reside en los detalles: frascos esmerilados, dosificadores precisos y texturas sedosas.' },
      { title: 'Belleza atemporal', desc: 'Sin modas efímeras. Cultivamos una vitalidad duradera que resalta la belleza genuina de cada persona.' },
    ],
    missionTitle: 'Nuestra Misión',
    missionDesc: 'Acompañar a cada persona hacia una rutina de cuidado facial saludable, consciente y duradera con dermocosmética vegana suiza, 100% sin ingredientes animales y de máxima inocuidad cutánea.',
    visionTitle: 'Nuestra Visión',
    visionDesc: 'Convertirnos en el máximo referente de dermocosmética limpia centrada en la calidad superior para nuestros clientes. Asumimos el compromiso inquebrantable de ser 100% libre de derivados animales y sin crueldad (Cruelty-Free), con fórmulas puras, ultra suaves e hipoalergénicas para las pieles más delicadas.',
    visionHighlights: [
      { title: 'Calidad Superior para el Cliente', desc: 'La salud dérmica y satisfacción del cliente son nuestra máxima prioridad' },
      { title: '100% Sin Ingredientes Animales', desc: 'Fórmulas puramente veganas y sin testeo en animales (Cruelty-Free)' },
      { title: 'Hipoalergénico y Ultra Suave', desc: 'Tolerancia dermatológica médica óptima para las pieles más sensibles' },
    ],
    coreValuesTitle: 'Cinco Valores Fundamentales',
    coreValues: [
      { title: 'Pureza', desc: 'En fórmulas, principios activos y ética de empresa.' },
      { title: 'Autenticidad', desc: 'Comunicación honesta y eficacia dermatológica real.' },
      { title: 'Sofisticación', desc: 'Cuidado meticuloso del diseño en cristal y textura sensorial.' },
      { title: 'Sostenibilidad', desc: 'Soluciones duraderas para la barrera cutánea y el entorno.' },
      { title: 'Respeto', desc: 'Hacia la biología de la piel, nuestros clientes y el planeta.' },
    ],
    luxuryTitle: 'El Estilo Quiet Luxury de Alps Pure Essence',
    luxuryPoints: [
      { title: 'Packaging', desc: 'Diseños limpios en cristal esmerilado que protegen de la luz solar sin artificios.' },
      { title: 'Lenguaje', desc: 'Calmado, honesto y riguroso. Sin mensajes alarmistas ni presiones comerciales.' },
      { title: 'Paleta cromática', desc: 'Blanco nieve, verde pino alpino, gris granito y oro champán satinado.' },
    ],
    sensoryTitle: 'Experiencia Multisensorial',
    sensoryItems: [
      { title: 'Visual', desc: 'Espacios luminosos, equilibrio geométrico y naturaleza en calma.' },
      { title: 'Táctil', desc: 'Vidrio satinado antideslizante y texturas aterciopeladas de rápida absorción.' },
      { title: 'Olfativa', desc: 'Frescura botánica sutil, 100% libre de fragancias sintéticas invasivas.' },
    ],
    commitmentsHeading: 'VI. SIETE COMPROMISOS Y ACCIONES',
    commitmentsDesc: 'Nuestros principios se traducen en siete compromisos verificables en cada etapa:',
    commitmentsList: [
      { num: '01', title: 'Fórmulas Veganas de Grado Médico', desc: '100% libre de derivados animales, sin parabenos ni perfumes sintéticos irritantes.' },
      { num: '02', title: 'Transparencia de Ingredientes (INCI)', desc: 'Listado público completo de activos, pH fisiológico equilibrado y modo de uso.' },
      { num: '03', title: 'Control Continuo de Calidad', desc: 'Bioextracción en frío en Suiza, conservación óptima y lotes rigurosamente probados.' },
      { num: '04', title: 'Honrar la Belleza Real', desc: 'Sin imágenes retocadas con falsas promesas; respeto a la individualidad de la piel.' },
      { num: '05', title: 'Compromiso Ecológico', desc: 'Vidrio esmerilado protector de rayos UV, tintas vegetales y embalaje biodegradable.' },
      { num: '06', title: 'Atención al Cliente Dedicada', desc: 'Asesoramiento personalizado 24/7 y 30 días de garantía de devolución.' },
      { num: '07', title: 'La Confianza Antes Que la Venta', desc: 'Si un producto no se adecúa a tu piel, te aconsejaremos no adquirirlo. La confianza construye una marca duradera.' },
    ],
    beliefHeading: 'EL MANIFIESTO DE ALPS PURE ESSENCE',
    beliefQuote: '“No prometemos una perfección artificial. Prometemos un ritual de cuidado guiado por la ciencia, la sutileza y la responsabilidad.”',
    beliefPillars: ['Pureza en la elección', 'Sutileza en la experiencia', 'Sinceridad en el compromiso', 'Belleza atemporal'],
    closeBtn: 'Cerrar',
    exploreBtn: 'Descubrir Colección',
  },

  zh: {
    headerTag: 'ALPS PURE ESSENCE • 瑞士灵感典藏',
    modalTitle: '品牌传承典藏全纪实 (三层体系)',
    audioActive: '冰川溪流声正在播放',
    audioInactive: '自然之声',
    tab1: '第一层：品牌故事 (本源与纪实)',
    tab2: '第二层：品牌哲学 (理念与美学)',
    tab3: '第三层：庄严承诺与行动 (七项行动准则)',
    slogan: '品牌箴言：“Renew Your Skin. Reveal Your Radiance. — 源自大自然的纯净之美。”',
    alpsLetters: [
      { letter: 'A', word: 'Authentic', meaning: '真实本真，崇尚自然' },
      { letter: 'L', word: 'Luminous', meaning: '通透光采，自然焕亮' },
      { letter: 'P', word: 'Pure', meaning: '纯净温和，至臻温润' },
      { letter: 'S', word: 'Skin', meaning: '专研养护，赋活肌肤' },
    ],
    logoDescription: '品牌标志结构解析：雪山峰峦象征瑞士纯净冰川植物干细胞；山脚水流寓意深层活水沁润；中央幼苗寓意肌肤新生与抗逆韧性；两翼针叶松林彰显纯素自然生机；香槟金奢华配色诠释欧洲医药级护肤质感。',
    tier1ChapterTitle: '第一章 • 溯源本初',
    tier1Heading: '当美丽始于至纯本真',
    storyP1: '有些美丽，从来无需喧嚣自夸。',
    storyP2: '那是阿尔卑斯雪峰的静谧之美——大自然以万年冰川与亘古坚石，诠释着纯澈、沉静与持久的生命力。高山溪流的清冽与苍茫雪原的广阔启示我们：无需刻意修饰的纯粹，蕴含着最深沉动人的力量。',
    storyP3: '这正是 Alps Pure Essence 诞生的本源初心。',
    storyP4: 'Alps Pure Essence 坚信：护肤绝不仅是一项外在打扮，而是一场温润内心的自我对话。在匆忙浮躁的生活中，留出属于自己的片刻宁静，倾听肌肤最真实的渴望。',
    approachTitle: 'ALPS PURE ESSENCE 的专研理念',
    approachPillars: ['少一点喧嚣', '多一份专注', '更细腻克制', '更本真诚恳'],
    approachNote: '不追逐不切实际的审美标准，回归护肤本源：读懂肌肤生理需求，科学温和配伍，持之以恒呵护。',
    nameOriginTitle: '二、品牌名称的由来',
    alpsSymbolTitle: 'ALPS（阿尔卑斯）',
    alpsSymbolDesc: '象征着雄伟的阿尔卑斯山脉——现代喧嚣世界中的纯净圣地，凝聚时光历练的坚韧底蕴，以及超越潮流周期的经典之美。',
    pureEssenceTitle: 'PURE ESSENCE（纯净精粹）',
    pureEssenceDesc: '最纯粹的本质价值。卓越蕴含于配方的安全有效、使用时的舒缓体验与彼此间的信任，而非华而不实的包装或夸大的宣称。',
    nameConclusion: '“在真正有价值的事物中，探寻纯粹至臻。”',
    questionHeading: '三、始于一个质朴的发问',
    questionQuote: '“一个真正有价值的护肤品牌，究竟该为顾客带来什么？”',
    questionFoundationTitle: '三大立足基石：',
    questionFoundations: ['精研成分之纯净', '沟通信息之透明', '品牌行为之担当'],
    questionFooter: '这三大基石成为品牌产品配方研发、视觉呈现与客户服务的长久指引。',
    historyHeading: '四、品牌纪实与发展脉络 (2026 — 启航)',
    historyOriginText: 'Alps Pure Essence 于2026年正式确立静奢（Quiet Luxury）定位——奢华源自极简自律、可靠品质与对细微之处的执着打磨。',
    phases: [
      { phase: '第一阶段', title: '灵感孕育', desc: '洞察现代消费者对成分真实性、肤质适配度与信任感的深度追求。' },
      { phase: '第二阶段', title: '确立风格', desc: '优雅而不张扬，高端而不疏离，极简而不单调的静奢美学。' },
      { phase: '第三阶段', title: '产品研发', desc: '每款产品回答三个根本问题：为何而生？适合何人？如何获得最佳体验？' },
      { phase: '第四阶段', title: '数字体验', desc: '官方网站作为讲述品牌文化的数字旗舰殿堂；电商平台提供便捷的购物服务。' },
    ],
    tier2Heading: '五、品牌哲学体系',
    purityConcept: '“Purity is the beginning of beauty.” 纯净不仅指来自天然，更是一种思维方式、选择标准与庄严承诺。',
    fourPillarsTitle: '纯净哲学的四大价值层次',
    fourPillars: [
      { title: '严苛精选之纯', desc: '每一种植物成分的添加皆有其科学理由。我们注重配方各成分间的协同平衡，而非堆砌成分数量。' },
      { title: '信息沟通之诚', desc: '坦诚告知消费者产品的真实功效与能力边界，坚决不以虚假承诺博取关注。' },
      { title: '感官体验之精', desc: '奢华体现在细微之处：避光磨砂玻璃的触感、微铣防滑瓶盖、舒适无负担的亲肤质地。' },
      { title: '恒久耐读之美', desc: '不盲从瞬息万变的快餐潮流，专注构建健康稳定的肌肤屏障，绽放自然生动的本色之美。' },
    ],
    missionTitle: '品牌使命 (Mission)',
    missionDesc: '以顾客至上的高品质标准、100% 零动物成分纯素配方与极其温和亲肤的科研药妆，陪伴用户建立健康、优雅且可持续的科学护肤习惯。',
    visionTitle: '品牌愿景 (Vision)',
    visionDesc: '成为以顾客卓越品质为核心导向的纯素科研药妆卓越典范。Alps Pure Essence 坚守 100% 零动物成分、零动物实验（Cruelty-Free），打造温和纯净、极致安全亲肤的无刺激配方，悉心呵护每一寸敏感娇嫩肌肤。',
    visionHighlights: [
      { title: '顾客至上的至臻品质', desc: '以用户肌肤健康与真实满意度作为衡量品牌价值的最高尺度' },
      { title: '100% 零动物成分与零残忍', desc: '全线拒绝动物来源成分，坚决杜绝任何动物实验（Cruelty-Free）' },
      { title: '极其温和与医研级纯净', desc: '专研低敏亲肤配方，至臻温和呵护最脆弱敏感的屏障' },
    ],
    coreValuesTitle: '五大核心价值观',
    coreValues: [
      { title: '纯净 (Purity)', desc: '贯穿于原料甄选、配方逻辑与品牌运营的始终。' },
      { title: '真实 (Authenticity)', desc: '坦诚透明，基于临床验证，尊崇科学事实。' },
      { title: '精湛 (Refinement)', desc: '在质地、包材、触感及服务细节上追求至臻。' },
      { title: '恒久 (Endurance)', desc: '深耕长远健康价值，拒绝急功近利的短期效应。' },
      { title: '尊重 (Respect)', desc: '尊重皮肤生理节律、顾客切身感受与自然生态。' },
    ],
    luxuryTitle: 'Alps Pure Essence 的静奢美学',
    luxuryPoints: [
      { title: '包装设计', desc: '极简线条，高定沙光磨砂玻璃瓶身，去除冗余修饰。' },
      { title: '沟通语言', desc: '沉稳、内敛、真诚，绝不利用恐慌或焦虑心理营销。' },
      { title: '品牌色调', desc: '雪顶白、冷杉绿、冰川岩灰与瑞士香槟金沙。' },
    ],
    sensoryTitle: '全维度感官体验',
    sensoryItems: [
      { title: '视觉', desc: '晨光微熹般的纯净色泽，舒缓留白的视觉呼吸感。' },
      { title: '触觉', desc: '磨砂琉璃的沉静微凉触感，如初雪消融般瞬息吸收的质地。' },
      { title: '嗅觉', desc: '自然植萃本真的若隐若现清香，绝无刺鼻人工香精添加。' },
    ],
    commitmentsHeading: '六、七项庄严承诺与行动指南',
    commitmentsDesc: '为使品牌理念落实为日常标准，Alps Pure Essence 团队严格履行七项行动法则：',
    commitmentsList: [
      { num: '01', title: '医药级纯净纯素配方', desc: '经皮肤科严苛测试，0% 动物来源、0% 苯甲酸酯防腐剂、0% 人工香精，温和亲肤。' },
      { num: '02', title: '百分之百成分透明公开', desc: '全成分公开披露，精准标注 pH 5.5 - 6.8 弱酸弱碱度，明确适用场景。' },
      { num: '03', title: '瑞士实验室持续品质把控', desc: '采尔马特冰川水与雪绒花干细胞低温萃取，恒温仓储运输，批批质检。' },
      { num: '04', title: '尊崇真实自然的肌肤之美', desc: '拒绝利用过度修图制造容貌焦虑，赞美肌肤本身的健康光泽。' },
      { num: '05', title: '践行生态环保责任', desc: '精简包装，选用可阻挡 99% 紫外线的避光磨砂玻璃，大豆油墨印刷，减少一次性塑料。' },
      { num: '06', title: '售前售中售后全流程关怀', desc: '提供专业 24/7 护肤咨询，尊享 30 天无忧退换，认真对待每一条顾客反馈。' },
      { num: '07', title: '绝不为销售额牺牲顾客信任', desc: '如果某款产品并不适合您的肤质，我们将诚恳建议您无需购买。交易带来营收，信任铸就品牌。' },
    ],
    beliefHeading: 'ALPS PURE ESSENCE 的信念与承诺',
    beliefQuote: '“我们不夸口虚幻的速效奇迹。我们承诺陪伴您展开一场基于科学、细腻品味与高度责任感的护肤之旅。”',
    beliefPillars: ['精萃于选择', '细腻于体验', '诚挚于承诺', '恒久于时光'],
    closeBtn: '关闭',
    exploreBtn: '探索产品系列',
  },
};
