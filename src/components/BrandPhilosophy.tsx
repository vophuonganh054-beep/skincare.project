import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize2, Compass, Droplets, Leaf, 
  FlaskConical, Sparkles, BookOpen, ArrowRight, Quote, Clock, ShieldCheck, 
  Heart, Eye, CheckCircle2, Award, Mountain, Layers, HelpCircle
} from 'lucide-react';
import { AlpsIcon } from './AlpsLogo';
import { useLanguage } from '../context/LanguageContext';
import { SupportedLanguage } from '../i18n/translations';

// Editorial heritage images
import originStreamImg from '../assets/images/alps_origin_stream_1790660755043.jpg';
import edelweissImg from '../assets/images/alps_edelweiss_bloom_1790660771955.jpg';
import labCraftImg from '../assets/images/alps_lab_craft_1790660791492.jpg';
import champagneImg from '../assets/images/alps_banner_champagne_1789839179884.jpg';

interface BrandPhilosophyProps {
  isMobileFrame?: boolean;
  onOpenStoryModal?: () => void;
  onExploreCollection?: () => void;
}

type StoryTier = 'story' | 'philosophy' | 'commitments';

// 5-Language Translations for Brand Story, Philosophy & Commitments
const STORY_I18N: Record<SupportedLanguage, {
  badge: string;
  title: string;
  slogan: string;
  desc: string;
  alpsMeaning: { letter: string; word: string; meaning: string }[];
  tier1Tab: string;
  tier2Tab: string;
  tier3Tab: string;
  tier1Badge: string;
  tier2Badge: string;
  tier3Badge: string;
  // Tier 1 Story
  storyTitle: string;
  storyP1: string;
  storyP2: string;
  storyP3: string;
  approachTitle: string;
  approachPillars: string[];
  approachNote: string;
  originTitle: string;
  originAlpsTitle: string;
  originAlpsDesc: string;
  originPureTitle: string;
  originPureDesc: string;
  questionTitle: string;
  questionQuote: string;
  questionDesc: string;
  historyTitle: string;
  historyStages: { stage: string; title: string; desc: string }[];
  // Tier 2 Philosophy
  philosophyTitle: string;
  philosophySubtitle: string;
  pillars: { num: number; title: string; desc: string }[];
  missionTitle: string;
  missionDesc: string;
  visionTitle: string;
  visionDesc: string;
  visionHighlights?: { title: string; desc: string }[];
  valuesTitle: string;
  values: { title: string; desc: string }[];
  // Tier 3 Commitments
  commitmentsTitle: string;
  commitmentsSubtitle: string;
  commitmentsList: { num: string; title: string; desc: string }[];
  beliefTitle: string;
  beliefQuote: string;
  beliefFooter: string;
}> = {
  vi: {
    badge: 'ALPS PURE ESSENCE • NGUỒN CẢM HỨNG THỤY SĨ',
    title: 'Pure Essence. Timeless Beauty.',
    slogan: '“Renew Your Skin. Reveal Your Radiance. — Vẻ đẹp tinh khiết từ thiên nhiên.”',
    desc: 'Lấy cảm hứng từ dãy núi Alps tĩnh lặng, nơi thiên nhiên hiện diện trong sự thuần khiết và bền bỉ qua thời gian. Không phô trương, không vội vã.',
    alpsMeaning: [
      { letter: 'A', word: 'Authentic', meaning: 'Chân thật, tự nhiên' },
      { letter: 'L', word: 'Luminous', meaning: 'Làn da rạng rỡ, tươi sáng' },
      { letter: 'P', word: 'Pure', meaning: 'Tinh khiết, lành tính' },
      { letter: 'S', word: 'Skin', meaning: 'Nuôi dưỡng & chăm sóc da' },
    ],
    tier1Tab: 'Brand Story • Câu Chuyện',
    tier2Tab: 'Brand Philosophy • Triết Lý',
    tier3Tab: 'Commitments • Cam Kết & Hành Động',
    tier1Badge: 'TẦNG 1 • BRAND STORY',
    tier2Badge: 'TẦNG 2 • BRAND PHILOSOPHY',
    tier3Badge: 'TẦNG 3 • COMMITMENTS & ACTIONS',
    storyTitle: 'Khi Vẻ Đẹp Bắt Đầu Từ Sự Tinh Khiết',
    storyP1: 'Có những vẻ đẹp không cần lên tiếng.',
    storyP2: 'Đó là vẻ đẹp của những đỉnh núi phủ tuyết giữa dãy Alps, nơi thiên nhiên hiện diện trong sự tĩnh lặng, thuần khiết và bền bỉ qua thời gian. Những vùng núi cao, những dòng nước trong lành và những khoảng không rộng lớn của Alps gợi lên một cảm giác đặc biệt: sự tinh khiết không cần phô trương vẫn có thể trở nên đầy sức hút.',
    storyP3: 'Alps Pure Essence được xây dựng từ một niềm tin rằng chăm sóc da không đơn thuần là một hành động làm đẹp. Đó là một hình thức quan tâm đến chính mình — một khoảng thời gian mà mỗi người có thể tạm rời khỏi nhịp sống vội vã để lắng nghe và chăm sóc cơ thể của mình.',
    approachTitle: 'CÁCH TIẾP CẬN CỦA ALPS PURE ESSENCE',
    approachPillars: ['Ít ồn ào hơn', 'Có chủ đích hơn', 'Tinh tế hơn', 'Chân thật hơn'],
    approachNote: 'Không biến skincare thành cuộc chạy đua tiêu chuẩn không thực tế, mà đưa về bản chất: hiểu làn da, lựa chọn phù hợp và chăm sóc nhất quán.',
    originTitle: 'II. NGUỒN GỐC TÊN GỌI',
    originAlpsTitle: 'ALPS',
    originAlpsDesc: 'Đại diện cho dãy núi Alps hùng vĩ — biểu tượng của sự thanh sạch giữa thế giới hiện đại, sức mạnh hình thành qua thời gian và vẻ đẹp không phụ thuộc vào xu hướng.',
    originPureTitle: 'PURE ESSENCE',
    originPureDesc: 'Bản chất tinh túy nhất. Giá trị nằm ở công thức, trải nghiệm và niềm tin — không phải ở sự cầu kỳ của bao bì hay những lời quảng cáo lớn.',
    questionTitle: 'III. SỰ RA ĐỜI BẮT ĐẦU TỪ MỘT CÂU HỎI',
    questionQuote: '“Một thương hiệu skincare thực sự có giá trị cần mang lại điều gì cho khách hàng?”',
    questionDesc: 'Nằm ở việc tạo ra một trải nghiệm khiến khách hàng cảm thấy mình có thể tin tưởng, dựa trên 3 nền tảng: Tinh khiết trong lựa chọn • Minh bạch trong giao tiếp • Trách nhiệm trong hành động.',
    historyTitle: 'IV. LỊCH SỬ THƯƠNG HIỆU (2026 — KHỞI NGUỒN)',
    historyStages: [
      { stage: 'Giai đoạn 1', title: 'Hình Thành Ý Tưởng', desc: 'Quan sát hành vi người tiêu dùng hiện đại, tập trung vào kiến thức, độ phù hợp, trải nghiệm và niềm tin.' },
      { stage: 'Giai đoạn 2', title: 'Xác Lập Bản Sắc', desc: 'Thanh lịch không phô trương, cao cấp không xa cách, tối giản nhưng không đơn điệu theo tinh thần Quiet Luxury.' },
      { stage: 'Giai đoạn 3', title: 'Phát Triển Sản Phẩm', desc: 'Mỗi sản phẩm trả lời 3 câu hỏi: Tạo ra để làm gì? Phù hợp với ai? Sử dụng thế nào để có trải nghiệm tốt nhất?' },
      { stage: 'Giai đoạn 4', title: 'Trải Nghiệm Số', desc: 'Website là Digital Flagship Store kể câu chuyện thương hiệu; sàn TMĐT tạo sự thuận tiện cho khách hàng.' },
    ],
    philosophyTitle: '“Purity Is The Beginning Of Beauty.”',
    philosophySubtitle: 'Tinh khiết không chỉ là đến từ thiên nhiên. Tinh khiết là một cách tư duy, một cách lựa chọn và một lời cam kết.',
    pillars: [
      { num: 1, title: 'Tinh Khiết Trong Lựa Chọn', desc: 'Mỗi thành phần đều có lý do để xuất hiện. Không lấy số lượng thành phần làm thước đo, mà ưu tiên sự phù hợp và cân bằng công thức.' },
      { num: 2, title: 'Trung Thực Trong Thông Tin', desc: 'Khách hàng cần biết sản phẩm làm được gì và không thể làm được điều gì. Không xây dựng giá trị bằng lời hứa thiếu cơ sở.' },
      { num: 3, title: 'Tinh Tế Trong Trải Nghiệm', desc: 'Sự sang trọng bắt đầu từ những điều nhỏ: thiết kế tiện dụng, thông tin rõ ràng, bao bì chỉn chu và tư vấn đúng nhu cầu.' },
      { num: 4, title: 'Vẻ Đẹp Vượt Thời Gian', desc: 'Không chạy theo xu hướng nhất thời. Hướng đến vẻ đẹp có tính bền vững: tự nhiên, cân bằng và phù hợp với từng cá nhân.' },
    ],
    missionTitle: 'Sứ Mệnh (Mission)',
    missionDesc: 'Đồng hành cùng khách hàng trong hành trình xây dựng thói quen chăm sóc da lành mạnh, tinh tế và bền vững thông qua những sản phẩm chất lượng cao, 100% không động vật và lành tính an toàn chuẩn da liễu Thụy Sĩ.',
    visionTitle: 'Tầm Nhìn (Vision)',
    visionDesc: 'Trở thành biểu tượng dược mỹ phẩm hàng đầu hướng về chất lượng vượt trội dành cho khách hàng. Alps Pure Essence kiên định chuẩn mực 100% thuần chay không động vật, tuyệt đối không thử nghiệm trên động vật (Cruelty-Free), cam kết công thức lành tính tối đa, an toàn dịu nhẹ và nâng niu trọn vẹn cả những làn da nhạy cảm nhất.',
    visionHighlights: [
      { title: 'Chất Lượng Vượt Trội Dành Cho Khách Hàng', desc: 'Hiệu quả da liễu rõ rệt, tận tâm phụng sự trải nghiệm và sự an tâm tuyệt đối của khách hàng' },
      { title: '100% Không Động Vật & Cruelty-Free', desc: 'Tuyệt đối không sử dụng thành phần động vật và không bao giờ thử nghiệm trên động vật' },
      { title: 'Lành Tính Tuyệt Đối Chuẩn Y Khoa', desc: 'Công thức tinh khiết từ thảo mộc Alps & tế bào gốc sông băng, êm dịu cho cả da nhạy cảm nhất' },
    ],
    valuesTitle: '5 Giá Trị Cốt Lõi',
    values: [
      { title: 'Tinh khiết (Purity)', desc: 'Trong tư duy, lựa chọn thành phần và cách vận hành thương hiệu.' },
      { title: 'Chân thật (Authenticity)', desc: 'Giao tiếp minh bạch, sản phẩm thực tế, tôn trọng sự thật.' },
      { title: 'Tinh tế (Refinement)', desc: 'Chú ý đến từng chi tiết trong thiết kế, bao bì và trải nghiệm.' },
      { title: 'Bền vững (Endurance)', desc: 'Xây dựng giá trị lâu dài thay vì chạy theo kết quả ngắn hạn.' },
      { title: 'Tôn trọng (Respect)', desc: 'Tôn trọng làn da, khách hàng, muôn loài và môi trường sống.' },
    ],
    commitmentsTitle: 'Bảy Cam Kết & Lời Hứa Hành Động',
    commitmentsSubtitle: 'Những nguyên tắc đạo đức và hành động thực tế được Alps Pure Essence duy trì mỗi ngày.',
    commitmentsList: [
      { num: '01', title: '100% Không Động Vật & Lành Tính Chuẩn Y Khoa', desc: 'Cam kết 100% thuần chay, không thử nghiệm trên động vật; thành phần lành tính an toàn da liễu, 0% paraben, 0% hương liệu nhân tạo.' },
      { num: '02', title: 'Minh Bạch & Trung Thực Tuyệt Đối', desc: 'Công khai thông tin thành phần, công dụng và hướng dẫn; nêu rõ những gì sản phẩm không làm được.' },
      { num: '03', title: 'Chất Lượng Cải Tiến Liên Tục Cho Khách Hàng', desc: 'Kiểm soát nghiêm ngặt từ nguồn nguyên liệu đến thành phẩm; đặt sự an tâm và hiệu quả thực chất của khách hàng lên hàng đầu.' },
      { num: '04', title: 'Tôn Trọng Vẻ Đẹp Chân Thật', desc: 'Không cổ vũ tiêu chuẩn sắc đẹp phi thực tế; không dùng thông điệp gây mặc cảm; tôn trọng giá trị vốn có của làn da.' },
      { num: '05', title: 'Trách Nhiệm Môi Trường', desc: 'Tối giản bao bì, nghiên cứu vật liệu tái chế, giảm lớp đóng gói dùng một lần; cải thiện từng bước có trách nhiệm.' },
      { num: '06', title: 'Đồng Hành Cùng Khách Hàng', desc: 'Đồng hành trước - trong - sau mua hàng; coi phản hồi khách hàng là nguồn lực quý giá nhất để hoàn thiện.' },
      { num: '07', title: 'Không Đánh Đổi Niềm Tin Lấy Doanh Số', desc: 'Nếu khách hàng không cần, sẵn sàng tư vấn rằng họ không nhất thiết phải mua. Một giao dịch tạo doanh thu, sự tin tưởng mới tạo ra thương hiệu.' },
    ],
    beliefTitle: 'Lời Hứa Của Alps Pure Essence — Our Belief',
    beliefQuote: '“Chúng tôi không hứa về một vẻ đẹp hoàn hảo. Chúng tôi hứa về một hành trình chăm sóc được xây dựng bằng sự tinh tế, hiểu biết và trách nhiệm.”',
    beliefFooter: 'Tinh túy trong lựa chọn • Tinh tế trong trải nghiệm • Chân thành trong cam kết • Bền vững theo thời gian.',
  },

  en: {
    badge: 'ALPS PURE ESSENCE • SWISS INSPIRED HERITAGE',
    title: 'Pure Essence. Timeless Beauty.',
    slogan: '“Renew Your Skin. Reveal Your Radiance. — Pure beauty from nature.”',
    desc: 'Inspired by the quiet Swiss Alps, where nature exists in profound stillness, purity, and timeless endurance. Without ostentation, without haste.',
    alpsMeaning: [
      { letter: 'A', word: 'Authentic', meaning: 'Genuine, honest & natural' },
      { letter: 'L', word: 'Luminous', meaning: 'Luminous, healthy & radiant skin' },
      { letter: 'P', word: 'Pure', meaning: 'Pure, safe & gentle dermocosmetics' },
      { letter: 'S', word: 'Skin', meaning: 'Dedicated cellular skin nourishment' },
    ],
    tier1Tab: 'Brand Story • Genesis',
    tier2Tab: 'Brand Philosophy • Principles',
    tier3Tab: 'Commitments • Actions & Promises',
    tier1Badge: 'TIER 1 • BRAND STORY',
    tier2Badge: 'TIER 2 • BRAND PHILOSOPHY',
    tier3Badge: 'TIER 3 • COMMITMENTS & ACTIONS',
    storyTitle: 'When Beauty Begins With Purity',
    storyP1: 'There is a beauty that does not need to shout.',
    storyP2: 'It is the beauty of snow-crowned summits in the Swiss Alps, where nature endures in quiet majesty, crystal purity, and unhurried grace. The high peaks, pure glacial streams, and vast alpine expanses evoke a singular truth: purity without pretense carries the deepest resonance.',
    storyP3: 'Alps Pure Essence was born from the conviction that skincare is not merely cosmetic. It is an intentional act of self-care — a quiet daily ritual to step away from modern rush, listen to your body, and tenderly nurture your skin.',
    approachTitle: 'THE ALPS PURE ESSENCE APPROACH',
    approachPillars: ['Less noise', 'More intention', 'Refined nuance', 'Authentic truth'],
    approachNote: 'We reject unattainable beauty standards. Skincare returns to its essence: understanding your skin, choosing mindfully, and caring consistently.',
    originTitle: 'II. THE ORIGIN OF OUR NAME',
    originAlpsTitle: 'ALPS',
    originAlpsDesc: 'Named after the legendary Swiss Alps — a timeless beacon of clean air, enduring strength carved by millennia, and beauty unbound by passing trends.',
    originPureTitle: 'PURE ESSENCE',
    originPureDesc: 'The essential core of value. Excellence resides in clean chemistry, sensory joy, and earned trust — never in extravagant packaging or inflated claims.',
    questionTitle: 'III. BORN FROM A FUNDAMENTAL QUESTION',
    questionQuote: '“What should a truly valuable skincare brand bring to its customers?”',
    questionDesc: 'It lies in creating an experience of unshakeable trust, anchored in 3 pillars: Purity in choice • Transparency in communication • Responsibility in action.',
    historyTitle: 'IV. BRAND HISTORY (2026 — GENESIS)',
    historyStages: [
      { stage: 'Phase 1', title: 'Conceptual Genesis', desc: 'Observing evolving consumer awareness, prioritizing scientific knowledge, suitability, and trust.' },
      { stage: 'Phase 2', title: 'Identity Architecture', desc: 'Elegant without pretense, premium yet accessible, minimalist yet soulful quiet luxury.' },
      { stage: 'Phase 3', title: 'Formulation Craft', desc: 'Each formula answers 3 questions: What is its purpose? Who is it for? How to experience it best?' },
      { stage: 'Phase 4', title: 'Digital Flagship', desc: 'The website serves as an editorial sanctuary of brand stories; marketplaces provide swift accessibility.' },
    ],
    philosophyTitle: '“Purity Is The Beginning Of Beauty.”',
    philosophySubtitle: 'Purity is more than natural ingredients. It is a mindset, a discipline of curation, and a solemn commitment.',
    pillars: [
      { num: 1, title: 'Purity In Selection', desc: 'Every botanical ingredient has a purpose. We measure excellence by harmonious biological balance, not ingredient count.' },
      { num: 2, title: 'Honesty In Disclosure', desc: 'Full transparency on what formulas achieve and what they cannot. We never manufacture value with unfounded promises.' },
      { num: 3, title: 'Refinement In Experience', desc: 'True luxury lives in subtle details: tactile frosted glass, non-slip caps, intuitive dispensers, and mindful guidance.' },
      { num: 4, title: 'Timeless Beauty', desc: 'Rejecting fleeting fads to cultivate sustainable, vibrant skin health that honors each person’s innate grace.' },
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
    valuesTitle: '5 Core Brand Values',
    values: [
      { title: 'Purity', desc: 'In thought, active botanical sourcing, and ethical business conduct.' },
      { title: 'Authenticity', desc: 'Radical honesty, clinical validation, and transparent dialogue.' },
      { title: 'Refinement', desc: 'Meticulous attention to sensory textures, ergonomics, and glasscraft.' },
      { title: 'Endurance', desc: 'Fostering long-term skin barrier resilience and sustainable practices.' },
      { title: 'Respect', desc: 'Honoring natural biology, individual skin diversity, and the planet.' },
    ],
    commitmentsTitle: 'Seven Solemn Commitments & Actions',
    commitmentsSubtitle: 'The ethical principles and tangible actions upheld by Alps Pure Essence every single day.',
    commitmentsList: [
      { num: '01', title: 'Medical-Grade Clean Vegan Formulas', desc: 'Clean, certified vegan actives. 0% parabens, 0% artificial fragrances, 0% animal testing.' },
      { num: '02', title: 'Uncompromising Transparency', desc: 'Full INCI disclosure and realistic benefits; clear guidance on ideal skin types and usage.' },
      { num: '03', title: 'Continuous Quality Enhancement', desc: 'Meticulous cold-bio extraction, monitored temperature storage, and batch-by-batch QA.' },
      { num: '04', title: 'Celebrating Authentic Skin', desc: 'Zero unretouched skin-shaming imagery; respecting the natural biological skin barrier.' },
      { num: '05', title: 'Environmental Stewardship', desc: 'UV-blocking sandblasted glass, soy inks, minimal plastic, and biodegradable outer cartons.' },
      { num: '06', title: 'Lifelong Client Dialogue', desc: 'Comprehensive support before, during, and after purchase; client feedback drives our laboratory.' },
      { num: '07', title: 'Never Trading Trust For Sales', desc: 'If a product is not right for you, we will counsel you not to buy it. Transactions create revenue; trust creates a legacy.' },
    ],
    beliefTitle: 'The Alps Pure Essence Belief',
    beliefQuote: '“We do not promise artificial perfection. We promise a refined self-care journey built on scientific knowledge, subtlety, and deep responsibility.”',
    beliefFooter: 'Purity in choice • Refinement in experience • Sincerity in commitment • Timeless in endurance.',
  },

  de: {
    badge: 'ALPS PURE ESSENCE • SCHWEIZER INSPIRATION',
    title: 'Pure Essence. Timeless Beauty.',
    slogan: '“Renew Your Skin. Reveal Your Radiance. — Reine Schönheit aus der Natur.”',
    desc: 'Inspiriert von den stillen Schweizer Alpen, wo die Natur in zeitloser Reinheit und Beständigkeit ruht. Unaufdringlich, achtsam und rein.',
    alpsMeaning: [
      { letter: 'A', word: 'Authentic', meaning: 'Ehrlich, wahrhaftig & natürlich' },
      { letter: 'L', word: 'Luminous', meaning: 'Strahlend schöne, vitale Haut' },
      { letter: 'P', word: 'Pure', meaning: 'Rein, sanft & dermatologisch sicher' },
      { letter: 'S', word: 'Skin', meaning: 'Gezielte Pflege & Zellerneuerung' },
    ],
    tier1Tab: 'Brand Story • Entstehung',
    tier2Tab: 'Brand Philosophy • Philosophie',
    tier3Tab: 'Commitments • Taten & Verpflichtungen',
    tier1Badge: 'STUFE 1 • BRAND STORY',
    tier2Badge: 'STUFE 2 • BRAND PHILOSOPHY',
    tier3Badge: 'STUFE 3 • COMMITMENTS & ACTIONS',
    storyTitle: 'Wenn Schönheit Aus Reinheit Entsteht',
    storyP1: 'Es gibt eine Schönheit, die keine lauten Worte braucht.',
    storyP2: 'Es ist die stille Erhabenheit der schneebedeckten Alpengipfel, wo die Natur in unberührter Reinheit und ewiger Ruhe verweilt. Kristallklares Gletscherwasser und weite Bergräume vermitteln: Wahre Reinheit besticht ohne jede Prahlerei.',
    storyP3: 'Alps Pure Essence gründet auf der Überzeugung, dass Hautpflege mehr ist als Kosmetik. Es ist ein achtsames Innehalten — ein Moment, um dem Alltag zu entfliehen und der eigenen Haut mit Respekt zu begegnen.',
    approachTitle: 'DER ANSATZ VON ALPS PURE ESSENCE',
    approachPillars: ['Weniger Lärm', 'Mehr Absicht', 'Mehr Feingefühl', 'Mehr Ehrlichkeit'],
    approachNote: 'Kein Nachjagen unrealistischer Ideale, sondern Rückbesinnung auf das Wesentliche: Haut verstehen, bewusst wählen, stetig pflegen.',
    originTitle: 'II. HERKUNFT DES NAMENS',
    originAlpsTitle: 'ALPS',
    originAlpsDesc: 'Sinnbild der Schweizer Alpen — ewige Reinheit, über Jahrtausende gewachsene Kraft und Eleganz fernab kurzlebiger Trends.',
    originPureTitle: 'PURE ESSENCE',
    originPureDesc: 'Das reinste Wesentliche. Wertvoll durch fundierte Rezepturen, sinnliche Texturen und verdientes Vertrauen.',
    questionTitle: 'III. EINE GRUNDLEGENDE FRAGE',
    questionQuote: '„Was muss eine wahrhaft wertvolle Pflegemarke ihren Kunden schenken?“',
    questionDesc: 'Sie muss ein tiefes Gefühl des Vertrauens schaffen, getragen von drei Säulen: Reinheit bei der Auswahl • Transparenz im Dialog • Verantwortung im Handeln.',
    historyTitle: 'IV. MARKENHISTORIE (2026 — URSPRUNG)',
    historyStages: [
      { stage: 'Phase 1', title: 'Ideenfindung', desc: 'Verbraucherbedürfnisse analysieren, Fokus auf Aufklärung, Verträglichkeit und Vertrauen.' },
      { stage: 'Phase 2', title: 'Identitätsbildung', desc: 'Edel ohne Prunk, hochwertig ohne Distanz, minimalistischer Quiet Luxury Stil.' },
      { stage: 'Phase 3', title: 'Rezepturentwicklung', desc: 'Jedes Produkt beantwortet 3 Fragen: Wozu dient es? Für wen ist es ideal? Wie wendet man es optimal an?' },
      { stage: 'Phase 4', title: 'Digitales Erlebnis', desc: 'Die Website als Marken-Heimat; E-Commerce für bequeme und zuverlässige Versorgung.' },
    ],
    philosophyTitle: '„Purity Is The Beginning Of Beauty.“',
    philosophySubtitle: 'Reinheit ist mehr als natürliche Herkunft. Reinheit ist eine Geisteshaltung, ein bewusster Maßstab und ein Versprechen.',
    pillars: [
      { num: 1, title: 'Reinheit In Der Auswahl', desc: 'Jeder Inhaltsstoff erfüllt eine Funktion. Wir messen Qualität nicht an Mengen, sondern an biologischer Synergie.' },
      { num: 2, title: 'Ehrlichkeit Im Dialog', desc: 'Klarheit darüber, was Rezepturen leisten können und was nicht. Keine leeren Marketingversprechen.' },
      { num: 3, title: 'Raffinierte Haptik', desc: 'Luxus liegt im Detail: mattiertes Schutzglas, rutschfeste Verschlüsse und angenehme Texturen.' },
      { num: 4, title: 'Zeitlose Leuchtkraft', desc: 'Kein Hype, sondern nachhaltige Hautgesundheit, die Ihre natürliche Schönheit zum Strahlen bringt.' },
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
    valuesTitle: '5 Grundwerte',
    values: [
      { title: 'Reinheit', desc: 'In Formulierung, Philosophie und unternehmerischem Handeln.' },
      { title: 'Authentizität', desc: 'Wissenschaftlich belegt, transparent und ehrlich.' },
      { title: 'Raffinesse', desc: 'Aufmerksamkeit für Sensorik, Glasverarbeitung und Ergonomie.' },
      { title: 'Beständigkeit', desc: 'Nachhaltige Hautbarriere-Stärkung statt schneller Scheineffekte.' },
      { title: 'Respekt', desc: 'Achtung vor Hautphysiologie, Kunden und Natur.' },
    ],
    commitmentsTitle: 'Sieben Feste Verpflichtungen',
    commitmentsSubtitle: 'Ethische Grundsätze und konkrete Handlungen, die Alps Pure Essence täglich lebt.',
    commitmentsList: [
      { num: '01', title: 'Medizinisch Zertifiziert Vegane Formeln', desc: '0% Tierversuche, 0% Parabene, 0% künstliche Duftstoffe; höchste Hautverträglichkeit.' },
      { num: '02', title: 'Vollständige Transparenz', desc: 'Offenlegung aller Inhaltsstoffe und physiologischer pH-Wert (5.5 - 6.8).' },
      { num: '03', title: 'Kontinuierliche Qualitätsprüfung', desc: 'Schonende Kaltextraktion, zertifizierte Schweizer Labore und strenge Kontrollen.' },
      { num: '04', title: 'Echte, Unverfälschte Schönheit', desc: 'Keine retuschierten Scheinbilder; Wertschätzung für jedes Hautbild.' },
      { num: '05', title: 'Ökologische Verantwortung', desc: 'Recycelbares Mattglas, Schutz vor UV-Licht und biologisch abbaubare Verpackungen.' },
      { num: '06', title: 'Zuverlässiger Kundenservice', desc: 'Fachkundige Beratung vor und nach dem Kauf; 30 Tage Rückgaberecht.' },
      { num: '07', title: 'Vertrauen Steht Über Umsatz', desc: 'Wenn ein Produkt nicht zu Ihrer Haut passt, raten wir vom Kauf ab. Vertrauen schafft bleibende Werte.' },
    ],
    beliefTitle: 'Das Alps Pure Essence Gelöbnis',
    beliefQuote: '„Wir versprechen keine künstliche Perfektion. Wir versprechen eine achtsame Pflege, getragen von Wissen, Feingefühl und Verantwortung.“',
    beliefFooter: 'Reinheit in der Wahl • Raffinesse im Erlebnis • Aufrichtigkeit im Gelöbnis • Zeitlose Beständigkeit.',
  },

  es: {
    badge: 'ALPS PURE ESSENCE • INSPIRACIÓN SUIZA',
    title: 'Pure Essence. Timeless Beauty.',
    slogan: '“Renew Your Skin. Reveal Your Radiance. — Belleza pura de la naturaleza.”',
    desc: 'Inspirado en la serenidad de los Alpes suizos, donde la naturaleza existe en pureza y resiliencia atemporal. Sin ostentación, sin prisas.',
    alpsMeaning: [
      { letter: 'A', word: 'Authentic', meaning: 'Auténtico, honesto y natural' },
      { letter: 'L', word: 'Luminous', meaning: 'Piel luminosa, radiante y viva' },
      { letter: 'P', word: 'Pure', meaning: 'Puro, seguro y dermatológico' },
      { letter: 'S', word: 'Skin', meaning: 'Cuidado y nutrición celular' },
    ],
    tier1Tab: 'Brand Story • Orígenes',
    tier2Tab: 'Brand Philosophy • Filosofía',
    tier3Tab: 'Commitments • Compromisos y Acciones',
    tier1Badge: 'NIVEL 1 • BRAND STORY',
    tier2Badge: 'NIVEL 2 • BRAND PHILOSOPHY',
    tier3Badge: 'NIVEL 3 • COMMITMENTS & ACTIONS',
    storyTitle: 'Cuando La Belleza Nace De La Pureza',
    storyP1: 'Hay bellezas que no necesitan alzar la voz.',
    storyP2: 'Es la belleza de las cumbres nevadas de los Alpes suizos, donde la naturaleza perdura en silencio, pureza y paciencia milenaria. Los torrentes glaciares cristalinos y los espacios abiertos demuestran que la pureza sin artificios es la más cautivadora.',
    storyP3: 'Alps Pure Essence nació del convencimiento de que el cuidado facial es más que cosmética. Es un acto íntimo de bienestar: un momento para detenerse, escuchar al cuerpo y cuidar la piel con serenidad.',
    approachTitle: 'EL ENFOQUE DE ALPS PURE ESSENCE',
    approachPillars: ['Menos ruido', 'Más propósito', 'Más sutileza', 'Más autenticidad'],
    approachNote: 'No convertimos el skincare en una carrera de estándares irreales, sino en un retorno a lo esencial: comprender la piel, elegir con acierto y cuidar con constancia.',
    originTitle: 'II. EL ORIGEN DE NUESTRO NOMBRE',
    originAlpsTitle: 'ALPS',
    originAlpsDesc: 'Homenaje a los Alpes: emblema de aire puro, fortaleza forjada por el tiempo y una elegancia ajena a modas pasajeras.',
    originPureTitle: 'PURE ESSENCE',
    originPureDesc: 'La esencia más valiosa. El verdadero lujo reside en fórmulas científicas limpias, placer sensorial y confianza mutua.',
    questionTitle: 'III. TODO COMIENZA CON UNA PREGUNTA',
    questionQuote: '“¿Qué debe aportar una marca de skincare verdaderamente valiosa a sus clientes?”',
    questionDesc: 'Ofrecer una experiencia de absoluta confianza basada en tres pilares: Pureza en la selección • Transparencia en la información • Responsabilidad en cada acción.',
    historyTitle: 'IV. HISTORIA DE LA MARCA (2026 — GÉNESIS)',
    historyStages: [
      { stage: 'Fase 1', title: 'Génesis de la Idea', desc: 'Atención a la demanda de cosmética informada, basada en ciencia botánica y confianza.' },
      { stage: 'Fase 2', title: 'Definición de Identidad', desc: 'Elegancia sobria, lujo silencioso y minimalismo armónico con la naturaleza.' },
      { stage: 'Fase 3', title: 'Desarrollo Formular', desc: 'Cada producto responde a 3 preguntas: ¿Para qué sirve? ¿Para quién es ideal? ¿Cómo aplicarlo mejor?' },
      { stage: 'Fase 4', title: 'Experiencia Digital', desc: 'Sitio web como santuario editorial de la marca y canales de distribución ágiles.' },
    ],
    philosophyTitle: '“Purity Is The Beginning Of Beauty.”',
    philosophySubtitle: 'La pureza va más allá de los ingredientes naturales. Es una forma de pensar, de elegir y de comprometerse.',
    pillars: [
      { num: 1, title: 'Pureza En La Elección', desc: 'Cada botánico tiene una función precisa. Priorizamos la armonía cutánea antes que largas listas de reclamos.' },
      { num: 2, title: 'Transparencia Absoluta', desc: 'Explicamos con honestidad lo que nuestras fórmulas logran y lo que no. Sin falsas ilusiones.' },
      { num: 3, title: 'Experiencia Refinada', desc: 'El lujo reside en los detalles: frascos esmerilados, dosificadores precisos y texturas sedosas.' },
      { num: 4, title: 'Belleza Atemporal', desc: 'Sin modas efímeras. Cultivamos una vitalidad duradera que resalta la belleza genuina de cada persona.' },
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
    valuesTitle: '5 Valores Fundamentales',
    values: [
      { title: 'Pureza', desc: 'En fórmulas, principios activos y ética de empresa.' },
      { title: 'Autenticidad', desc: 'Comunicación honesta y eficacia dermatológica real.' },
      { title: 'Sofisticación', desc: 'Cuidado meticuloso del diseño en cristal y textura sensorial.' },
      { title: 'Sostenibilidad', desc: 'Soluciones duraderas para la barrera cutánea y el entorno.' },
      { title: 'Respeto', desc: 'Hacia la biología de la piel, nuestros clientes y el planeta.' },
    ],
    commitmentsTitle: 'Siete Compromisos y Acciones',
    commitmentsSubtitle: 'Los principios éticos y acciones tangibles que Alps Pure Essence defiende día a día.',
    commitmentsList: [
      { num: '01', title: 'Fórmulas Veganas de Grado Médico', desc: '100% libre de derivados animales, sin parabenos ni perfumes sintéticos irritantes.' },
      { num: '02', title: 'Transparencia de Ingredientes (INCI)', desc: 'Listado público completo de activos, pH fisiológico equilibrado y modo de uso.' },
      { num: '03', title: 'Control Continuo de Calidad', desc: 'Bioextracción en frío en Suiza, conservación óptima y lotes rigurosamente probados.' },
      { num: '04', title: 'Honrar la Belleza Real', desc: 'Sin imágenes retocadas con falsas promesas; respeto a la individualidad de la piel.' },
      { num: '05', title: 'Compromiso Ecológico', desc: 'Vidrio esmerilado protector de rayos UV, tintas vegetales y embalaje biodegradable.' },
      { num: '06', title: 'Atención al Cliente Dedicada', desc: 'Asesoramiento personalizado 24/7 y 30 días de garantía de devolución.' },
      { num: '07', title: 'La Confianza Antes Que la Venta', desc: 'Si un producto no se adecúa a tu piel, te aconsejaremos no adquirirlo. La confianza construye una marca duradera.' },
    ],
    beliefTitle: 'El Manifiesto de Alps Pure Essence',
    beliefQuote: '“No prometemos una perfección artificial. Prometemos un ritual de cuidado guiado por la ciencia, la sutileza y la responsabilidad.”',
    beliefFooter: 'Pureza en la elección • Sutileza en la experiencia • Sinceridad en el compromiso • Belleza atemporal.',
  },

  zh: {
    badge: 'ALPS PURE ESSENCE • 瑞士灵感典藏',
    title: 'Pure Essence. Timeless Beauty.',
    slogan: '“Renew Your Skin. Reveal Your Radiance. — 源自大自然的纯净之美。”',
    desc: '源自静谧沉稳的瑞士阿尔卑斯山脉，大自然在万年时光中诠释着纯净与坚韧。不喧哗，不浮躁，以本真润泽肌肤。',
    alpsMeaning: [
      { letter: 'A', word: 'Authentic', meaning: '真实本真，崇尚自然' },
      { letter: 'L', word: 'Luminous', meaning: '通透光采，自然焕亮' },
      { letter: 'P', word: 'Pure', meaning: '纯净温和，至臻温润' },
      { letter: 'S', word: 'Skin', meaning: '专研养护，赋活肌肤' },
    ],
    tier1Tab: '品牌故事 • 本源',
    tier2Tab: '品牌哲学 • 理念',
    tier3Tab: '庄严承诺 • 行动',
    tier1Badge: '第一层 • 品牌故事 (BRAND STORY)',
    tier2Badge: '第二层 • 品牌哲学 (BRAND PHILOSOPHY)',
    tier3Badge: '第三层 • 庄严承诺 (COMMITMENTS & ACTIONS)',
    storyTitle: '当美丽始于至纯本真',
    storyP1: '有些美丽，从来无需喧嚣自夸。',
    storyP2: '那是阿尔卑斯雪峰的静谧之美——大自然以万年冰川与亘古坚石，诠释着纯澈、沉静与持久的生命力。高山溪流的清冽与苍茫雪原的广阔启示我们：无需刻意修饰的纯粹，蕴含着最深沉动人的力量。',
    storyP3: 'Alps Pure Essence 的诞生源于一个坚定的信念：护肤绝不仅是一项外在打扮，而是一场温润内心的自我对话。在匆忙浮躁的生活中，留出属于自己的片刻宁静，倾听肌肤最真实的渴望。',
    approachTitle: 'ALPS PURE ESSENCE 的专研理念',
    approachPillars: ['少一点喧嚣', '多一份专注', '更细腻克制', '更本真诚恳'],
    approachNote: '不追逐不切实际的审美标准，回归护肤本源：读懂肌肤生理需求，科学温和配伍，持之以恒呵护。',
    originTitle: '二、品牌名称的由来',
    originAlpsTitle: 'ALPS（阿尔卑斯）',
    originAlpsDesc: '象征着雄伟的阿尔卑斯山脉——现代喧嚣世界中的纯净圣地，凝聚时光历练的坚韧底蕴，以及超越潮流周期的经典之美。',
    originPureTitle: 'PURE ESSENCE（纯净精粹）',
    originPureDesc: '最纯粹的本质价值。卓越蕴含于配方的安全有效、使用时的舒缓体验与彼此间的信任，而非华而不实的包装或夸大的宣称。',
    questionTitle: '三、始于一个质朴的发问',
    questionQuote: '“一个真正有价值的护肤品牌，究竟该为顾客带来什么？”',
    questionDesc: '答案在于创造一种让人安心信任的体验，立足于三大基石：精研成分之纯净 • 沟通信息之透明 • 品牌行为之担当。',
    historyTitle: '四、品牌纪实与发展脉络 (2026 — 启航)',
    historyStages: [
      { stage: '第一阶段', title: '灵感孕育', desc: '洞察现代消费者对成分真实性、肤质适配度与信任感的深度追求。' },
      { stage: '第二阶段', title: '确立风格', desc: '优雅而不张扬，高端而不疏离，极简而不单调的静奢（Quiet Luxury）美学。' },
      { stage: '第三阶段', title: '产品研发', desc: '每款产品回答三个根本问题：为何而生？适合何人？如何获得最佳体验？' },
      { stage: '第四阶段', title: '数字体验', desc: '官方网站作为讲述品牌文化的数字旗舰殿堂；电商平台提供便捷的购物服务。' },
    ],
    philosophyTitle: '“Purity Is The Beginning Of Beauty.”',
    philosophySubtitle: '纯净不仅指来自天然，更是一种思维方式、选择标准与庄严承诺。',
    pillars: [
      { num: 1, title: '严苛精选之纯', desc: '每一种植物成分的添加皆有其科学理由。我们注重配方各成分间的协同平衡，而非堆砌成分数量。' },
      { num: 2, title: '信息沟通之诚', desc: '坦诚告知消费者产品的真实功效与能力边界，坚决不以虚假承诺博取关注。' },
      { num: 3, title: '感官体验之精', desc: '奢华体现在细微之处：避光磨砂玻璃的触感、微铣防滑瓶盖、舒适无负担的亲肤质地。' },
      { num: 4, title: '恒久耐读之美', desc: '不盲从瞬息万变的快餐潮流，专注构建健康稳定的肌肤屏障，绽放自然生动的本色之美。' },
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
    valuesTitle: '五大核心价值观',
    values: [
      { title: '纯净 (Purity)', desc: '贯穿于原料甄选、配方逻辑与品牌运营的始终。' },
      { title: '真实 (Authenticity)', desc: '坦诚透明，基于临床验证，尊崇科学事实。' },
      { title: '精湛 (Refinement)', desc: '在质地、包材、触感及服务细节上追求至臻。' },
      { title: '恒久 (Endurance)', desc: '深耕长远健康价值，拒绝急功近利的短期效应。' },
      { title: '尊重 (Respect)', desc: '尊重皮肤生理节律、顾客切身感受与自然生态。' },
    ],
    commitmentsTitle: '七项庄严承诺与行动指南',
    commitmentsSubtitle: 'Alps Pure Essence 团队在日常运营与产品研发中每日恪守的行为准则。',
    commitmentsList: [
      { num: '01', title: '医药级纯净纯素配方', desc: '经皮肤科严苛测试，0% 动物来源、0% 苯甲酸酯防腐剂、0% 人工香精，温和亲肤。' },
      { num: '02', title: '百分之百成分透明公开', desc: '全成分公开披露，精准标注 pH 5.5 - 6.8 弱酸弱碱度，明确适用场景。' },
      { num: '03', title: '瑞士实验室持续品质把控', desc: '采尔马特冰川水与雪绒花干细胞低温萃取，恒温仓储运输，批批质检。' },
      { num: '04', title: '尊崇真实自然的肌肤之美', desc: '拒绝利用过度修图制造容貌焦虑，赞美肌肤本身的健康光泽。' },
      { num: '05', title: '践行生态环保责任', desc: '精简包装，选用可阻挡 99% 紫外线的避光磨砂玻璃，大豆油墨印刷，减少一次性塑料。' },
      { num: '06', title: '售前售中售后全流程关怀', desc: '提供专业 24/7 护肤咨询，尊享 30 天无忧退换，认真对待每一条顾客反馈。' },
      { num: '07', title: '绝不为销售额牺牲顾客信任', desc: '如果某款产品并不适合您的肤质，我们将诚恳建议您无需购买。交易带来营收，信任铸就品牌。' },
    ],
    beliefTitle: 'Alps Pure Essence 的信念与承诺',
    beliefQuote: '“我们不夸口虚幻的速效奇迹。我们承诺陪伴您展开一场基于科学、细腻品味与高度责任感的护肤之旅。”',
    beliefFooter: '精萃于选择 • 细腻于体验 • 诚挚于承诺 • 恒久于时光。',
  },
};

export const BrandPhilosophy: React.FC<BrandPhilosophyProps> = ({ 
  isMobileFrame = false,
  onOpenStoryModal,
  onExploreCollection,
}) => {
  const { t, language } = useLanguage();
  const currentText = STORY_I18N[language] || STORY_I18N.vi;

  // 3-Tier Navigation State: Brand Story → Brand Philosophy → Brand Commitments & Actions
  const [activeTier, setActiveTier] = useState<StoryTier>('story');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Synthesize soft ambient mountain stream & alpine breeze sound (Sulwhasoo-grade calming audio)
  const toggleAudio = () => {
    if (isMuted) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;

        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
          b6 = white * 0.115926;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 450;
        filter.Q.value = 1.2;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        noise.start(0);

        setIsMuted(false);
      } catch (e) {
        console.warn('Audio synthesis not supported or blocked by browser policy:', e);
        setIsMuted(true);
      }
    } else {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
      setIsMuted(true);
    }
  };

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <section 
      id="brand-story" 
      className={`w-full ${isMobileFrame ? 'px-3 py-8' : 'max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-24'}`}
    >
      {/* Brand Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs font-semibold tracking-[0.32em] text-[#74584d] uppercase">
          <AlpsIcon className="w-5 h-4 text-[#74584d]" color="#74584d" />
          <span>{currentText.badge}</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal text-[#1c1c19] tracking-tight leading-tight">
          {currentText.title}
        </h2>

        <p className="font-serif italic text-sm sm:text-base text-[#74584d]">
          &ldquo;{currentText.slogan}&rdquo;
        </p>

        <p className="text-xs sm:text-sm text-[#5c5b5f] font-light leading-relaxed max-w-2xl mx-auto">
          {currentText.desc}
        </p>
      </div>

      {/* Meaning of A-L-P-S and Logo Anatomy Accordion / Badges */}
      <div className="mt-8 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
        {currentText.alpsMeaning.map((item) => (
          <div key={item.letter} className="bg-[#f6f3ee] p-3.5 sm:p-4 rounded-2xl border border-[#202022]/6 text-center">
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#74584d] block">{item.letter}</span>
            <span className="text-[11px] font-bold text-[#1c1c19] uppercase tracking-wider block mt-0.5">{item.word}</span>
            <span className="text-[10px] text-[#77767b] block mt-1">{item.meaning}</span>
          </div>
        ))}
      </div>

      {/* Cinematic Film & Documentary Reel (Sulwhasoo Pacing) */}
      <div 
        ref={videoContainerRef}
        className="mt-8 sm:mt-12 relative rounded-3xl overflow-hidden shadow-md border border-[#202022]/10 bg-[#141416]"
      >
        <div className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] overflow-hidden select-none">
          <img
            src={
              activeTier === 'story' ? originStreamImg :
              activeTier === 'philosophy' ? edelweissImg : labCraftImg
            }
            alt="Thước phim di sản Alps Pure Essence"
            className={`w-full h-full object-cover transition-all duration-1000 ease-out transform ${
              isPlaying ? 'scale-105' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f]/95 via-[#0d0d0f]/45 to-[#0d0d0f]/20 pointer-events-none" />

          {/* Top Bar with Audio & Ambient Mode */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-20 text-white">
            <div className="flex items-center space-x-2 text-[11px] sm:text-xs font-medium tracking-widest text-[#fed8c9]/90 bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              <Compass className="w-3.5 h-3.5 text-[#fed8c9]" />
              <span>
                {activeTier === 'story' && currentText.tier1Badge}
                {activeTier === 'philosophy' && currentText.tier2Badge}
                {activeTier === 'commitments' && currentText.tier3Badge}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleAudio}
                className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-black/45 backdrop-blur-md hover:bg-black/60 transition-colors text-xs flex items-center space-x-1.5 border border-white/10 text-white cursor-pointer"
                title={isMuted ? t.brandStory.natureSound : t.brandStory.playingSound}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#fed8c9]" />}
                <span className="hidden sm:inline text-[11px]">
                  {isMuted ? t.brandStory.natureSound : t.brandStory.playingSound}
                </span>
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-full bg-black/45 backdrop-blur-md hover:bg-black/60 transition-colors text-white border border-white/10 cursor-pointer"
                title={isPlaying ? 'Dừng chuyển động' : 'Phát chuyển động'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Bottom Captions Overlay */}
          <div className="absolute bottom-6 left-5 right-5 sm:left-10 sm:right-10 z-20 text-white max-w-3xl space-y-2">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#fed8c9] font-medium block">
              Zermatt 45°58&apos;N 7°44&apos;E • 1,608M High Alpine Elevation
            </span>
            <h3 className="font-serif text-lg sm:text-2xl md:text-3xl font-normal leading-snug">
              {activeTier === 'story' && currentText.storyTitle}
              {activeTier === 'philosophy' && currentText.philosophyTitle}
              {activeTier === 'commitments' && currentText.commitmentsTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#e5e5ea] font-light max-w-2xl line-clamp-2 sm:line-clamp-none">
              {activeTier === 'story' && currentText.storyP2}
              {activeTier === 'philosophy' && currentText.philosophySubtitle}
              {activeTier === 'commitments' && currentText.commitmentsSubtitle}
            </p>
          </div>
        </div>

        {/* 3-Tier Switcher Bar */}
        <div className="bg-[#1c1c1f] p-2 sm:p-3 border-t border-white/10 grid grid-cols-3 gap-2">
          <button
            onClick={() => setActiveTier('story')}
            className={`text-left px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTier === 'story'
                ? 'bg-white/12 text-white border border-white/20'
                : 'text-white/50 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            <span className="text-[9px] uppercase tracking-widest font-semibold block text-[#fed8c9]">
              {language === 'vi' ? 'TẦNG 1' : 'TIER 1'}
            </span>
            <span className="text-xs font-serif truncate block text-white/95 mt-0.5">
              {currentText.tier1Tab}
            </span>
          </button>

          <button
            onClick={() => setActiveTier('philosophy')}
            className={`text-left px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTier === 'philosophy'
                ? 'bg-white/12 text-white border border-white/20'
                : 'text-white/50 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            <span className="text-[9px] uppercase tracking-widest font-semibold block text-[#fed8c9]">
              {language === 'vi' ? 'TẦNG 2' : 'TIER 2'}
            </span>
            <span className="text-xs font-serif truncate block text-white/95 mt-0.5">
              {currentText.tier2Tab}
            </span>
          </button>

          <button
            onClick={() => setActiveTier('commitments')}
            className={`text-left px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTier === 'commitments'
                ? 'bg-white/12 text-white border border-white/20'
                : 'text-white/50 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            <span className="text-[9px] uppercase tracking-widest font-semibold block text-[#fed8c9]">
              {language === 'vi' ? 'TẦNG 3' : 'TIER 3'}
            </span>
            <span className="text-xs font-serif truncate block text-white/95 mt-0.5">
              {currentText.tier3Tab}
            </span>
          </button>
        </div>
      </div>

      {/* Deep Content Display for Active Tier (Authentic, Grounded, Anti-Phông Bạt) */}
      <div className="mt-12 sm:mt-16">
        {/* TẦNG 1: BRAND STORY */}
        {activeTier === 'story' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* Story Genesis */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm md:text-base text-[#46464a] font-light leading-relaxed">
                <div className="space-y-1 border-b border-[#202022]/8 pb-3">
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#74584d]">
                    I. {language === 'vi' ? 'CÂU CHUYỆN THƯƠNG HIỆU' : 'BRAND STORY'}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1c1c19]">
                    {currentText.storyTitle}
                  </h3>
                </div>

                <p>{currentText.storyP1}</p>
                <p>{currentText.storyP2}</p>
                <p>{currentText.storyP3}</p>

                <div className="p-5 bg-[#f6f3ee] rounded-2xl border border-[#202022]/8 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-[#74584d] tracking-wider block">
                    {currentText.approachTitle}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-serif text-xs text-[#1c1c19]">
                    {currentText.approachPillars.map((p, idx) => (
                      <div key={idx} className="p-2 bg-white rounded-lg text-center font-medium shadow-2xs">
                        {p}
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-[#77767b] pt-1">
                    {currentText.approachNote}
                  </p>
                </div>
              </div>

              {/* Right Column: Name Origin & Timeline */}
              <div className="lg:col-span-5 space-y-5">
                <div className="bg-[#fcf9f4] p-6 rounded-2xl border border-[#202022]/8 shadow-2xs space-y-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#74584d] block">
                    {currentText.originTitle}
                  </span>
                  <div className="space-y-3 text-xs text-[#46464a]">
                    <div className="pb-3 border-b border-[#202022]/6">
                      <strong className="text-[#1c1c19] text-sm font-serif block">{currentText.originAlpsTitle}</strong>
                      <p className="mt-1 font-light leading-relaxed">
                        {currentText.originAlpsDesc}
                      </p>
                    </div>
                    <div>
                      <strong className="text-[#1c1c19] text-sm font-serif block">{currentText.originPureTitle}</strong>
                      <p className="mt-1 font-light leading-relaxed">
                        {currentText.originPureDesc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Question & Origin Foundation */}
                <div className="p-5 bg-[#f6f3ee] rounded-2xl border border-[#202022]/8 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-[#74584d] tracking-wider block">
                    {currentText.questionTitle}
                  </span>
                  <p className="font-serif italic text-xs text-[#1c1c19]">
                    &ldquo;{currentText.questionQuote}&rdquo;
                  </p>
                  <p className="text-xs text-[#46464a] font-light leading-relaxed">
                    {currentText.questionDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Historical Stages (2026 Origin) */}
            <div className="pt-6 border-t border-[#202022]/8 space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#74584d] block text-center">
                {currentText.historyTitle}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentText.historyStages.map((stage, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-2xl border border-[#202022]/8 space-y-1.5 shadow-2xs">
                    <span className="text-xs font-bold text-[#74584d]">{stage.stage}</span>
                    <h4 className="font-serif text-sm text-[#1c1c19]">{stage.title}</h4>
                    <p className="text-[11px] text-[#77767b] leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TẦNG 2: BRAND PHILOSOPHY */}
        {activeTier === 'philosophy' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* 4 Pillars of Purity */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#74584d]">
                {language === 'vi' ? 'V. TRIẾT LÝ THƯƠNG HIỆU' : 'V. BRAND PHILOSOPHY'}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1c1c19]">
                {currentText.philosophyTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#5c5b5f] font-light">
                {currentText.philosophySubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentText.pillars.map((pillar) => (
                <div key={pillar.num} className="p-5 bg-white rounded-2xl border border-[#202022]/8 space-y-2 shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-[#fed8c9]/40 text-[#74584d] flex items-center justify-center font-serif text-sm font-bold">
                    {pillar.num}
                  </div>
                  <h4 className="font-serif text-base text-[#1c1c19]">{pillar.title}</h4>
                  <p className="text-xs text-[#5c5b5f] font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Mission, Vision & 5 Core Values */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 border-t border-[#202022]/8">
              <div className="md:col-span-5 space-y-4">
                <div className="p-5 bg-[#f6f3ee] rounded-2xl border border-[#202022]/8 space-y-2">
                  <h4 className="font-serif text-base text-[#1c1c19] flex items-center space-x-2">
                    <Compass className="w-4 h-4 text-[#74584d]" />
                    <span>{currentText.missionTitle}</span>
                  </h4>
                  <p className="text-xs text-[#46464a] font-light leading-relaxed">
                    {currentText.missionDesc}
                  </p>
                </div>

                <div className="p-5 sm:p-6 bg-[#f6f3ee] rounded-2xl border border-[#202022]/8 space-y-3 shadow-2xs">
                  <h4 className="font-serif text-base text-[#1c1c19] flex items-center space-x-2 font-medium">
                    <Eye className="w-4 h-4 text-[#74584d]" />
                    <span>{currentText.visionTitle}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[#46464a] font-light leading-relaxed">
                    {currentText.visionDesc}
                  </p>
                  {currentText.visionHighlights && (
                    <div className="pt-2 space-y-2">
                      {currentText.visionHighlights.map((vh, idx) => (
                        <div key={idx} className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-white/70 border border-[#202022]/6">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#74584d] mt-0.5 shrink-0" />
                          <div className="text-xs">
                            <strong className="text-[#1c1c19] block">{vh.title}</strong>
                            <span className="text-[11px] text-[#77767b] leading-tight block mt-0.5">{vh.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-7 bg-[#fcf9f4] p-6 rounded-2xl border border-[#202022]/8 shadow-2xs space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#74584d] block">
                  {currentText.valuesTitle}
                </span>
                <div className="space-y-2.5">
                  {currentText.values.map((val, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#74584d] mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-[#1c1c19]">{val.title}:</strong>{' '}
                        <span className="text-[#5c5b5f] font-light">{val.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TẦNG 3: COMMITMENTS & ACTIONS */}
        {activeTier === 'commitments' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* 7 Commitments Table */}
            <div className="space-y-4">
              <div className="text-center max-w-2xl mx-auto space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#74584d]">
                  {language === 'vi' ? 'VI. CAM KẾT HÀNH ĐỘNG' : 'VI. ACTIONS & PLEDGES'}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1c1c19]">
                  {currentText.commitmentsTitle}
                </h3>
                <p className="text-xs text-[#5c5b5f] font-light">
                  {currentText.commitmentsSubtitle}
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-[#202022]/8 overflow-hidden shadow-2xs divide-y divide-[#202022]/6 text-xs sm:text-sm">
                {currentText.commitmentsList.map((item) => (
                  <div 
                    key={item.num} 
                    className={`p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-3 items-center ${
                      item.num === '07' ? 'bg-[#fdfaf5]' : ''
                    }`}
                  >
                    <div className={`md:col-span-4 font-semibold flex items-center space-x-2 ${
                      item.num === '07' ? 'text-[#74584d]' : 'text-[#1c1c19]'
                    }`}>
                      {item.num === '07' ? (
                        <ShieldCheck className="w-4 h-4 text-[#74584d] shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-[#74584d] shrink-0" />
                      )}
                      <span>{item.num}. {item.title}</span>
                    </div>
                    <div className={`md:col-span-8 font-light ${
                      item.num === '07' ? 'text-[#1c1c19] font-medium' : 'text-[#5c5b5f]'
                    }`}>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Belief Box */}
            <div className="p-6 sm:p-8 bg-[#f6f3ee] rounded-3xl border border-[#202022]/8 text-center max-w-3xl mx-auto space-y-3">
              <Quote className="w-8 h-8 text-[#74584d]/20 mx-auto" />
              <h4 className="font-serif text-lg sm:text-xl text-[#1c1c19]">
                {currentText.beliefTitle}
              </h4>
              <p className="font-serif italic text-xs sm:text-sm text-[#46464a] leading-relaxed max-w-xl mx-auto">
                &ldquo;{currentText.beliefQuote}&rdquo;
              </p>
              <div className="pt-2 text-[11px] text-[#74584d] font-semibold uppercase tracking-wider">
                {currentText.beliefFooter}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Footer Call to Action */}
      <div className="mt-12 sm:mt-16 pt-8 border-t border-[#202022]/8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        {onOpenStoryModal && (
          <button
            onClick={onOpenStoryModal}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#202022] hover:bg-[#32362f] text-white text-xs sm:text-sm font-medium flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#fed8c9]" />
            <span>{t.brandStory.readMoreBtn}</span>
          </button>
        )}

        {onExploreCollection && (
          <button
            onClick={onExploreCollection}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-white hover:bg-[#f6f3ee] text-[#1c1c19] border border-[#202022]/15 text-xs sm:text-sm font-medium flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <span>{t.brandStory.exploreCollectionBtn}</span>
            <ArrowRight className="w-4 h-4 text-[#74584d]" />
          </button>
        )}
      </div>
    </section>
  );
};
