import React, { useState, useRef, useEffect } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import {
  Sparkles,
  Mountain,
  ShieldCheck,
  Leaf,
  Award,
  FlaskConical,
  Heart,
  Droplets,
  Package,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Clock,
  Compass,
  Volume2,
  VolumeX,
  Quote,
  Layers,
  BookOpen,
} from 'lucide-react';
import originStreamImg from '../assets/images/alps_origin_stream_1790660755043.jpg';
import edelweissImg from '../assets/images/alps_edelweiss_bloom_1790660771955.jpg';
import labCraftImg from '../assets/images/alps_lab_craft_1790660791492.jpg';
import champagneImg from '../assets/images/alps_banner_champagne_1789839179884.jpg';

interface AboutPageProps {
  onOpenRitualModal?: () => void;
  onOpenSkinQuiz?: () => void;
}

type StoryTier = 'story' | 'philosophy' | 'commitments';

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenRitualModal, onOpenSkinQuiz }) => {
  const [activeTier, setActiveTier] = useState<StoryTier>('story');
  const [isAudioActive, setIsAudioActive] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Soft ambient alpine stream & mountain breeze audio generator
  const toggleAudio = () => {
    if (!isAudioActive) {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
          b2 = 0.969 * b2 + white * 0.153852;
          b3 = 0.8665 * b3 + white * 0.3104856;
          b4 = 0.55 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.016898;
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

        setIsAudioActive(true);
      } catch (e) {
        console.warn('Audio synthesis failed:', e);
        setIsAudioActive(false);
      }
    } else {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
      setIsAudioActive(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const alpsAcronym = [
    { letter: 'A', word: 'Authentic', desc: 'Chân thật, tự nhiên — Lắng nghe và tôn trọng cơ chế sinh học nguyên bản của làn da.' },
    { letter: 'L', word: 'Luminous', desc: 'Rạng rỡ, tươi sáng — Hiệu ứng da căng bóng ngậm nước sương mai (Glass skin).' },
    { letter: 'P', word: 'Pure', desc: 'Tinh khiết, lành tính — 100% thuần chay, không cồn khô, không paraben, không hương liệu.' },
    { letter: 'S', word: 'Skin', desc: 'Nuôi dưỡng chuyên sâu — Phục hồi màng ẩm lipid bảo vệ da liên tục suốt 72 giờ.' },
  ];

  const historyStages = [
    {
      stage: 'Giai đoạn 1',
      title: 'Khởi Tạo Ý Tưởng Tại Zurich',
      desc: 'Nghiên cứu cơ chế tự bảo vệ của hoa tuyết Edelweiss Thụy Sĩ trước bức xạ UV khắc nghiệt ở độ cao 3.000 mét.',
    },
    {
      stage: 'Giai đoạn 2',
      title: 'Bản Sắc Tối Giản (Quiet Luxury)',
      desc: 'Định hình phong cách thanh lịch không phô trương: công thức đậm đặc, bao bì thủy tinh tái chế bảo toàn hoạt tính.',
    },
    {
      stage: 'Giai đoạn 3',
      title: 'Phác Đồ Sinh Học 5 Bước',
      desc: 'Hoàn thiện 5 sản phẩm tương thích tương hỗ: Sữa rửa mặt → Toner → Serum → Kem dưỡng → Mặt nạ sinh học.',
    },
    {
      stage: 'Giai đoạn 4',
      title: 'Phân Phối Chính Thức Tại Việt Nam',
      desc: 'Đặt chi nhánh tại 30 Trịnh Đình Thảo, Tân Phú, Thành Phố Hồ Chí Minh, mang tiêu chuẩn da liễu Thụy Sĩ chăm sóc làn da người Việt.',
    },
  ];

  const philosophyPillars = [
    {
      num: 1,
      title: 'Tinh Khiết Trong Lựa Chọn',
      desc: 'Mỗi thành phần đều có lý do sinh học để xuất hiện. Không lấy số lượng thành phần làm thước đo, mà ưu tiên sự cân bằng và khả năng hấp thụ của màng tế bào.',
    },
    {
      num: 2,
      title: 'Trung Thực Trong Thông Tin',
      desc: 'Minh bạch nồng độ hoạt chất, công dụng thực tế và phác đồ sử dụng. Không vẽ ra những lời hứa phi thực tế.',
    },
    {
      num: 3,
      title: 'Tinh Tế Trong Trải Nghiệm',
      desc: 'Sự xa xỉ bắt đầu từ những chi tiết nhỏ: thìa bạc lấy kem vô trùng, đầu pump mượt mà, bao bì thủy tinh chắn sáng bảo toàn dưỡng chất.',
    },
    {
      num: 4,
      title: 'Vẻ Đẹp Vượt Thời Gian',
      desc: 'Không chạy theo xu hướng nhất thời. Hướng đến một làn da khỏe bền vững, có khả năng tự phục hồi và thích nghi trước môi trường.',
    },
  ];

  const commitmentsList = [
    { num: '01', title: '100% Thuần Chay (Clean & Vegan)', desc: 'Không chứa bất kỳ dẫn xuất nào từ động vật, không thử nghiệm trên động vật (Cruelty-Free).' },
    { num: '02', title: 'Nước Khoáng Sông Băng Nguyên Bản', desc: 'Khai thác bền vững từ dòng suối băng tuyết ngàn năm giàu khoáng chất vi lượng Canxi và Magie.' },
    { num: '03', title: 'Không Cồn Khô & Paraben', desc: 'Độ pH 5.5 cân bằng sinh học hoàn hảo, dịu nhẹ cho cả làn da nhạy cảm sau xâm lấn và mẹ bầu.' },
    { num: '04', title: 'Đồng Kiểm 100% Khi Nhận Hàng', desc: 'Khách hàng có quyền mở hộp kiểm tra tem niêm phong và sản phẩm trước khi thanh toán.' },
    { num: '05', title: 'Đổi Trả 7 Ngày Miễn Phí', desc: 'Bảo hành đổi trả và hoàn tiền nếu sản phẩm có bất kỳ dấu hiệu gây kích ứng trên da.' },
    { num: '06', title: 'Tư Vấn Da Liễu 24/7', desc: 'Đội ngũ chuyên viên hỗ trợ phân tích tình trạng da và xây dựng phác đồ cá nhân hóa mọi thời điểm.' },
  ];

  return (
    <div className="min-h-screen bg-[#fcf9f4] pb-24">
      {/* Breadcrumb Bar */}
      <div className="bg-[#f4ede4]/70 border-b border-[#202022]/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <nav className="flex items-center space-x-2 text-xs text-[#74584d]">
            <Link to="/" className="hover:text-[#1c1c19] transition-colors">
              Trang chủ
            </Link>
            <span className="text-[#a8a6ad]">/</span>
            <span className="text-[#1c1c19] font-semibold">Về Alps • Brand Story</span>
          </nav>

          {/* Audio ambience toggle */}
          <button
            onClick={toggleAudio}
            className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
              isAudioActive
                ? 'bg-[#202022] text-[#fed8c9]'
                : 'bg-white border border-[#202022]/10 text-[#77767b] hover:text-[#1c1c19]'
            }`}
            title="Âm thanh tự nhiên dòng suối sông băng Alps"
          >
            {isAudioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="text-[11px] font-medium hidden sm:inline">
              {isAudioActive ? 'Tiếng suối tuyết: Đang bật' : 'Bật âm thanh suối tuyết Alps'}
            </span>
          </button>
        </div>
      </div>

      {/* Hero Cover */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f4ede4] to-[#fcf9f4] pt-12 pb-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#fed8c9]/50 border border-[#fed8c9] text-[#74584d] text-xs font-semibold tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>ALPS PURE ESSENCE • ZURICH SWITZERLAND</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-[#1c1c19] tracking-tight leading-tight">
            Pure Essence. Timeless Beauty.
          </h1>

          <p className="text-xs sm:text-sm text-[#74584d] font-serif italic max-w-xl mx-auto">
            &ldquo;Renew Your Skin. Reveal Your Radiance — Vẻ đẹp tinh khiết từ cội nguồn thiên nhiên.&rdquo;
          </p>

          <p className="text-xs sm:text-sm text-[#5a595e] font-light leading-relaxed max-w-2xl mx-auto">
            Lấy cảm hứng từ dãy núi Alps tĩnh lặng, nơi thiên nhiên hiện diện trong sự thuần khiết và bền bỉ qua thời gian. Không phô trương, không vội vã. Chăm sóc da là khoảng lặng quý giá để bạn lắng nghe và nuôi dưỡng cơ thể.
          </p>
        </div>

        {/* 3 Tier Navigation Tabs */}
        <div className="max-w-3xl mx-auto mt-10">
          <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-[#202022]/10 grid grid-cols-3 gap-1 shadow-sm">
            <button
              onClick={() => setActiveTier('story')}
              className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
                activeTier === 'story'
                  ? 'bg-[#202022] text-[#fcf9f4] shadow-sm'
                  : 'text-[#77767b] hover:text-[#1c1c19]'
              }`}
            >
              1. Brand Story • Câu Chuyện
            </button>
            <button
              onClick={() => setActiveTier('philosophy')}
              className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
                activeTier === 'philosophy'
                  ? 'bg-[#202022] text-[#fcf9f4] shadow-sm'
                  : 'text-[#77767b] hover:text-[#1c1c19]'
              }`}
            >
              2. Brand Philosophy • Triết Lý
            </button>
            <button
              onClick={() => setActiveTier('commitments')}
              className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
                activeTier === 'commitments'
                  ? 'bg-[#202022] text-[#fcf9f4] shadow-sm'
                  : 'text-[#77767b] hover:text-[#1c1c19]'
              }`}
            >
              3. Commitments • Cam Kết
            </button>
          </div>
        </div>
      </section>

      {/* Main Tabbed Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        {/* TAB 1: BRAND STORY */}
        {activeTier === 'story' && (
          <div className="space-y-12 animate-fade-in">
            {/* Story Chapter 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-[#202022]/6 shadow-sm">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-semibold text-[#74584d] tracking-widest uppercase flex items-center space-x-1.5">
                  <Mountain className="w-4 h-4" />
                  <span>I. KHI VẺ ĐẸP BẮT ĐẦU TỪ SỰ TINH KHIẾT</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#1c1c19] leading-snug">
                  Có những vẻ đẹp không cần lên tiếng.
                </h2>
                <p className="text-xs sm:text-sm text-[#5a595e] font-light leading-relaxed">
                  Đó là vẻ đẹp của những đỉnh núi tuyết trắng giữa dãy Alps hùng vĩ, nơi thiên nhiên hiện diện trong sự tĩnh lặng, thuần khiết và kiên cường qua hàng triệu năm.
                </p>
                <p className="text-xs sm:text-sm text-[#5a595e] font-light leading-relaxed">
                  Tại thung lũng tuyết Zermatt, nguồn nước khoáng sông băng tinh khiết và hoa tuyết Edelweiss nở rực rỡ ở độ cao 3.000m gợi lên một cảm giác đặc biệt: <em>Sự thuần khiết không cần phô trương vẫn sở hữu sức hút vượt thời gian.</em>
                </p>
                <p className="text-xs sm:text-sm text-[#5a595e] font-light leading-relaxed">
                  Alps Pure Essence ra đời từ niềm tin rằng chăm sóc da không đơn thuần là làm đẹp, mà là một hình thức quan tâm đến chính mình — khoảng thời gian bạn tạm gác nhịp sống hối hả để tái tạo màng ẩm tự nhiên.
                </p>
              </div>

              <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#202022] shadow-md">
                <img
                  src={originStreamImg}
                  alt="Dòng suối nguồn sông băng Alps"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* A.L.P.S Acronym Definition */}
            <div className="bg-[#fcf5f1] border border-[#fed8c9] rounded-3xl p-6 sm:p-10 space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-xs font-semibold text-[#74584d] tracking-widest uppercase">
                  Ý NGHĨA BIỂU TƯỢNG A • L • P • S
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#1c1c19]">
                  Bốn Giá Trị Cốt Lõi Khởi Tạo Thương Hiệu
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {alpsAcronym.map((item) => (
                  <div key={item.letter} className="p-5 bg-white rounded-2xl border border-[#fed8c9] shadow-xs space-y-2">
                    <span className="w-9 h-9 rounded-xl bg-[#202022] text-[#fed8c9] text-base font-serif font-bold flex items-center justify-center">
                      {item.letter}
                    </span>
                    <h4 className="font-serif text-sm font-semibold text-[#1c1c19]">{item.word}</h4>
                    <p className="text-xs text-[#5a595e] font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* History Stages */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#202022]/6 shadow-sm space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#74584d] tracking-widest uppercase">
                  II. LỊCH SỬ THƯƠNG HIỆU (2026 — KHỞI NGUỒN)
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#1c1c19]">
                  Hành Trình Kiến Tạo Chu Trình Sinh Học Thụy Sĩ
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {historyStages.map((stage, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#fcf9f4] border border-[#202022]/5 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-[#74584d] tracking-wider block">
                      {stage.stage}
                    </span>
                    <h4 className="font-serif text-xs font-semibold text-[#1c1c19]">{stage.title}</h4>
                    <p className="text-[11px] text-[#5a595e] leading-relaxed font-light">{stage.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BRAND PHILOSOPHY */}
        {activeTier === 'philosophy' && (
          <div className="space-y-10 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#202022]/6 shadow-sm text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-semibold text-[#74584d] tracking-widest uppercase">
                TRIẾT LÝ LÀM ĐẸP BỀN VỮNG
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif text-[#1c1c19]">
                &ldquo;Purity Is The Beginning Of Beauty.&rdquo;
              </h2>
              <p className="text-xs sm:text-sm text-[#5a595e] font-light leading-relaxed">
                Tinh khiết không chỉ là nguyên liệu đến từ thiên nhiên. Tinh khiết là một cách tư duy, một cách chọn lọc khoa học và một lời cam kết y đức về sự an toàn dài lâu.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {philosophyPillars.map((pil) => (
                <div key={pil.num} className="p-6 bg-white rounded-3xl border border-[#202022]/6 shadow-sm space-y-3">
                  <span className="w-8 h-8 rounded-full bg-[#f4ede4] text-[#74584d] text-xs font-bold flex items-center justify-center">
                    0{pil.num}
                  </span>
                  <h3 className="font-serif text-base font-semibold text-[#1c1c19]">{pil.title}</h3>
                  <p className="text-xs text-[#5a595e] leading-relaxed font-light">{pil.desc}</p>
                </div>
              ))}
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-[#202022] text-[#fcf9f4] rounded-3xl space-y-3 shadow-md">
                <span className="text-[11px] uppercase tracking-widest text-[#fed8c9] font-semibold">SỨ MỆNH ALPS</span>
                <h3 className="font-serif text-lg text-white">Nuôi Dưỡng Tế Bào Bằng Khoa Học Thuần Khiết</h3>
                <p className="text-xs text-[#c7c6ca] font-light leading-relaxed">
                  Cung cấp giải pháp phục hồi da chuẩn y khoa, an toàn cho mọi loại da nhạy cảm mà không cần sử dụng cồn khô, paraben hay hóa chất gây bào mòn lớp màng bảo vệ biểu bì.
                </p>
              </div>

              <div className="p-8 bg-[#f4ede4] text-[#1c1c19] rounded-3xl space-y-3 border border-[#fed8c9] shadow-sm">
                <span className="text-[11px] uppercase tracking-widest text-[#74584d] font-semibold">TẦM NHÌN DÀI HẠN</span>
                <h3 className="font-serif text-lg text-[#1c1c19]">Biểu Tượng Dược Mỹ Phẩm Sông Băng Châu Á</h3>
                <p className="text-xs text-[#5a595e] font-light leading-relaxed">
                  Trở thành thương hiệu chăm sóc da tinh tế được yêu thích nhất, dẫn đầu về triết lý Quiet Luxury: sản phẩm tối giản nhưng mang đến hiệu quả cấp ẩm và tái sinh da đỉnh cao.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COMMITMENTS */}
        {activeTier === 'commitments' && (
          <div className="space-y-10 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#202022]/6 shadow-sm space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-semibold text-[#74584d] tracking-widest uppercase">
                  CAM KẾT MINH BẠCH & TRÁCH NHIỆM
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#1c1c19]">
                  6 Lời Hứa Bất Biến Từ ALPS
                </h2>
                <p className="text-xs text-[#5a595e] font-light">
                  Chúng tôi đặt trải nghiệm và sự an tâm của khách hàng làm kim chỉ nam trong mọi hoạt động nghiên cứu, đóng gói và phục vụ.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
                {commitmentsList.map((com) => (
                  <div key={com.num} className="p-5 bg-[#fcf9f4] rounded-2xl border border-[#202022]/5 space-y-2">
                    <span className="text-xs font-bold text-[#74584d] font-mono">{com.num}</span>
                    <h4 className="font-serif text-xs font-semibold text-[#1c1c19]">{com.title}</h4>
                    <p className="text-[11px] text-[#5a595e] leading-relaxed font-light">{com.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Certifications */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#202022]/6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3">
                <ShieldCheck className="w-6 h-6 mx-auto text-[#74584d] mb-1.5" />
                <p className="text-xs font-semibold text-[#1c1c19]">Swiss Standard</p>
                <p className="text-[10px] text-[#77767b]">Tiêu chuẩn kiểm định Zurich</p>
              </div>
              <div className="p-3">
                <Leaf className="w-6 h-6 mx-auto text-[#74584d] mb-1.5" />
                <p className="text-xs font-semibold text-[#1c1c19]">100% Vegan</p>
                <p className="text-[10px] text-[#77767b]">Không thử nghiệm động vật</p>
              </div>
              <div className="p-3">
                <Droplets className="w-6 h-6 mx-auto text-[#74584d] mb-1.5" />
                <p className="text-xs font-semibold text-[#1c1c19]">Pure Glacier</p>
                <p className="text-[10px] text-[#77767b]">Khoáng vi lượng sông băng</p>
              </div>
              <div className="p-3">
                <Award className="w-6 h-6 mx-auto text-[#74584d] mb-1.5" />
                <p className="text-xs font-semibold text-[#1c1c19]">Dermatest 5★</p>
                <p className="text-[10px] text-[#77767b]">Chứng nhận da liễu xuất sắc</p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA to explore products */}
        <div className="mt-16 text-center bg-[#202022] text-[#fcf9f4] p-8 sm:p-12 rounded-3xl shadow-xl space-y-4">
          <span className="text-xs text-[#fed8c9] font-semibold tracking-widest uppercase">
            ✦ BẮT ĐẦU HÀNH TRÌNH CHĂM SÓC DA
          </span>
          <h3 className="text-xl sm:text-3xl font-serif">
            Khám Phá Bộ Sưu Tập 5 Sản Phẩm Alps Pure Essence
          </h3>
          <p className="text-xs sm:text-sm text-[#c7c6ca] font-light max-w-lg mx-auto">
            Trọn bộ phác đồ tương thích sinh học giúp phục hồi độ ẩm và dưỡng sáng tự nhiên cho làn da.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/san-pham"
              className="px-6 py-3 rounded-full bg-[#fed8c9] text-[#1c1c19] text-xs font-semibold hover:bg-white transition-colors shadow-md"
            >
              Xem Bộ Sưu Tập Sản Phẩm
            </Link>
            {onOpenSkinQuiz && (
              <button
                onClick={onOpenSkinQuiz}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 transition-colors cursor-pointer"
              >
                Trắc Nghiệm Soi Da AI
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
