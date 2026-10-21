import { useCopy } from '../i18n/useCopy';
import React, { useState } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Sparkles,
  Headphones,
  CheckCircle2,
  ShieldCheck,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';

interface ContactPageProps {
  onOpenSupportModal: () => void;
  onOpenSkinQuiz: () => void;
  onOpenPolicies?: (tab?: 'returns' | 'privacy' | 'shipping') => void;
  onShowToast: (msg: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onOpenSupportModal,
  onOpenSkinQuiz,
  onOpenPolicies,
  onShowToast,
}) => {
  const copy = useCopy();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('skin-consultation');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      onShowToast('Vui lòng nhập Họ tên và Số điện thoại để chuyên viên liên hệ');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onShowToast('Cảm ơn bạn! Chuyên viên da liễu Alps sẽ liên hệ trong vòng 30 phút.');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#fcf9f4] pb-24">
      {/* Breadcrumb Bar */}
      <div className="bg-[#f4ede4]/70 border-b border-[#202022]/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center space-x-2 text-xs text-[#74584d]">
            <Link to="/" className="hover:text-[#1c1c19] transition-colors">
              {copy("Trang chủ")}</Link>
            <span className="text-[#a8a6ad]">{"/"}</span>
            <span className="text-[#1c1c19] font-semibold">{copy("Liên hệ")}</span>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-8 text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#fed8c9]/50 border border-[#fed8c9] text-[#74584d] text-xs font-semibold tracking-widest uppercase">
          <Headphones className="w-3.5 h-3.5" />
          <span>{copy("ALPS CLIENT CONCIERGE & DERMATOLOGY CARE")}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif text-[#1c1c19] tracking-tight">
          {copy("Liên Hệ & Tư Vấn Da Liễu 24/7")}</h1>
        <p className="text-xs sm:text-sm text-[#5a595e] font-light max-w-2xl mx-auto leading-relaxed">
          {copy("Đội ngũ chuyên viên và bác sĩ da liễu ALPS luôn sẵn sàng đồng hành, giải đáp mọi thắc mắc về phác đồ chăm sóc da và đơn hàng của bạn.")}</p>
      </section>

      {/* Main Grid: Info + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Headquarters Card */}
            <div className="p-6 bg-white rounded-3xl border border-[#202022]/6 space-y-4 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-[#fed8c9] flex items-center justify-center text-[#74584d] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#1c1c19]">{copy("Địa Điểm & Chi Nhánh")}</h3>
                  <div className="text-sm text-[#5a595e] space-y-2 mt-2 leading-relaxed">
                    <p>
                      <strong className="text-[#1c1c19]">{copy("Địa chỉ liên hệ:")}</strong><br />
                      {copy("30 Trịnh Đình Thảo, Tân Phú, Thành Phố Hồ Chí Minh")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotline & Email Card */}
            <div className="p-6 bg-white rounded-3xl border border-[#202022]/6 space-y-4 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-[#fed8c9] flex items-center justify-center text-[#74584d] shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#1c1c19]">{copy("Hotline & Email Trực Tuyến")}</h3>
                  <div className="text-sm text-[#5a595e] space-y-2 mt-2 leading-relaxed">
                    <p>
                      <span className="text-[#77767b]">{copy("Hotline CSKH / Đặt hàng:")}</span><br />
                      <a href="tel:0772770134" className="font-bold text-lg text-[#1c1c19] hover:text-[#74584d]">
                        {"0772 770 134"}</a>
                    </p>
                    <p>
                      <span className="text-[#77767b]">{copy("Email hỗ trợ khách hàng:")}</span><br />
                      <a href="mailto:pure@alps.vn" className="font-semibold text-base text-[#74584d] hover:underline">
                        {copy("pure@alps.vn")}</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours & Socials */}
            <div className="p-6 bg-white rounded-3xl border border-[#202022]/6 space-y-4 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-[#fed8c9] flex items-center justify-center text-[#74584d] shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-semibold text-[#1c1c19]">{copy("Thời Gian Hoạt Động")}</h3>
                  <p className="text-xs text-[#5a595e] mt-1 leading-relaxed">
                    {copy("Từ 8:00 đến 22:00 tất cả các ngày trong tuần (bao gồm cả Thứ 7, Chủ Nhật & ngày Lễ).")}</p>
                  <div className="pt-3">
                    <a
                      href="https://www.facebook.com/alpspuressence/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-[#1877f2] text-white text-xs font-semibold rounded-xl hover:bg-[#166fe5] transition-colors shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{copy("Nhắn Tin Fanpage Facebook")}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Request Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-[#202022]/6 p-6 sm:p-10 shadow-sm">
              <div className="mb-6">
                <div className="inline-flex items-center space-x-1.5 text-xs text-[#74584d] font-semibold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{copy("Đăng Ký Tư Vấn Cá Nhân Hóa")}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif text-[#1c1c19]">
                  {copy("Gửi Yêu Cầu Hỗ Trợ & Thăm Khám Da")}</h2>
                <p className="text-xs text-[#77767b] mt-1">
                  {copy("Điền thông tin bên dưới, chuyên viên da liễu Thụy Sĩ sẽ phân tích và phản hồi riêng cho bạn.")}</p>
              </div>

              {isSubmitted ? (
                <div className="p-8 bg-[#fcf9f4] rounded-2xl border border-[#fed8c9] text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#0d8459] text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#1c1c19]">
                    {copy("Gửi Yêu Cầu Thành Công!")}</h3>
                  <p className="text-xs text-[#5a595e] leading-relaxed max-w-sm mx-auto">
                    {copy("Chuyên viên da liễu Alps Skincare đã nhận được thông tin và sẽ liên hệ hỗ trợ bạn qua số điện thoại ")}<strong>{phone}</strong> {copy(" trong thời gian sớm nhất.")}</p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessage('');
                    }}
                    className="mt-2 px-4 py-2 text-xs font-semibold text-[#74584d] hover:underline cursor-pointer"
                  >
                    {copy("Gửi yêu cầu khác")}</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#1c1c19] mb-1.5">
                        {copy("Họ và tên của bạn ")}<span className="text-red-500">{"*"}</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={copy("Họ và tên của bạn")}
                        className="w-full px-4 py-3 text-sm bg-[#fcf9f4] border border-[#202022]/15 rounded-xl focus:outline-none focus:border-[#74584d] focus:bg-white transition-all text-[#1c1c19]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1c1c19] mb-1.5">
                        {copy("Số điện thoại / Zalo ")}<span className="text-red-500">{"*"}</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={"0772 770 134"}
                        className="w-full px-4 py-3 text-sm bg-[#fcf9f4] border border-[#202022]/15 rounded-xl focus:outline-none focus:border-[#74584d] focus:bg-white transition-all text-[#1c1c19]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#1c1c19] mb-1.5">
                        {copy("Địa chỉ Email (tùy chọn)")}</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={copy("pure@alps.vn")}
                        className="w-full px-4 py-3 text-sm bg-[#fcf9f4] border border-[#202022]/15 rounded-xl focus:outline-none focus:border-[#74584d] focus:bg-white transition-all text-[#1c1c19]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1c1c19] mb-1.5">
                        {copy("Chủ đề cần tư vấn")}</label>
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full px-4 py-3 text-sm bg-[#fcf9f4] border border-[#202022]/15 rounded-xl focus:outline-none focus:border-[#74584d] focus:bg-white transition-all cursor-pointer text-[#1c1c19]"
                      >
                        <option value="skin-consultation">{copy("Tư vấn chọn sản phẩm theo loại da")}</option>
                        <option value="routine-guide">{copy("Hướng dẫn xây dựng chu trình 5 bước")}</option>
                        <option value="order-support">{copy("Kiểm tra thông tin đơn hàng / vận chuyển")}</option>
                        <option value="return-exchange">{copy("Chính sách đổi trả / kích ứng da")}</option>
                        <option value="partnership">{copy("Hợp tác phân phối đại lý / Spa")}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1c1c19] mb-1.5">
                      {copy("Mô tả tình trạng da hoặc câu hỏi của bạn")}</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={copy("Mô tả tình trạng da hoặc câu hỏi của bạn...")}
                      className="w-full px-4 py-3 text-sm bg-[#fcf9f4] border border-[#202022]/15 rounded-xl focus:outline-none focus:border-[#74584d] focus:bg-white transition-all resize-none text-[#1c1c19]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-5 bg-[#202022] hover:bg-[#74584d] text-white text-sm font-bold rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{copy(isSubmitting ? 'ĐANG GỬI YÊU CẦU...' : 'GỬI YÊU CẦU TƯ VẤN MIỄN PHÍ')}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-16">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold text-[#74584d] tracking-widest uppercase">
            {copy("✦ CÂU HỎI THƯỜNG GẶP")}</span>
          <h2 className="text-xl sm:text-2xl font-serif text-[#1c1c19] mt-1">
            {copy("Giải Đáp Thắc Mắc Phổ Biến")}</h2>
        </div>

        <div className="space-y-3">
          <div className="p-5 bg-white rounded-2xl border border-[#202022]/6">
            <h4 className="text-xs sm:text-sm font-semibold text-[#1c1c19]">
              {copy("1. Đặt hàng thì bao lâu tôi sẽ nhận được sản phẩm?")}</h4>
            <p className="text-xs text-[#5a595e] leading-relaxed mt-1.5">
              {copy("Đơn hàng tại khu vực nội thành TP. Hồ Chí Minh và Hà Nội được giao trong vòng 24 - 48 giờ. Các tỉnh thành khác thường nhận hàng từ 2 - 3 ngày làm việc thông qua đơn vị vận chuyển GHTK / Viettel Post.")}</p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#202022]/6">
            <h4 className="text-xs sm:text-sm font-semibold text-[#1c1c19]">
              {copy("2. Da nhạy cảm và phụ nữ mang thai có dùng được không?")}</h4>
            <p className="text-xs text-[#5a595e] leading-relaxed mt-1.5">
              {copy("Có. Toàn bộ dòng sản phẩm ALPS đều 100% thuần chay, đạt kiểm nghiệm da liễu khắt khe tại Zurich Thụy Sĩ, không chứa paraben, cồn khô hay hóa chất tẩy rửa mạnh, an toàn cho cả mẹ bầu và làn da đang phục hồi.")}</p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#202022]/6">
            <h4 className="text-xs sm:text-sm font-semibold text-[#1c1c19]">
              {copy("3. Tôi có được kiểm tra hàng trước khi thanh toán không?")}</h4>
            <p className="text-xs text-[#5a595e] leading-relaxed mt-1.5">
              {copy("ALPS áp dụng chính sách ")}<strong>{copy("Đồng kiểm 100%")}</strong>{copy(": Quý khách được quyền mở hộp kiểm tra tem mác, số lượng và tình trạng nguyên vẹn của sản phẩm trước khi thanh toán cho nhân viên giao hàng.")}</p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#202022]/6">
            <h4 className="text-xs sm:text-sm font-semibold text-[#1c1c19]">
              {copy("4. Chính sách bảo hành và đổi trả như thế nào?")}</h4>
            <p className="text-xs text-[#5a595e] leading-relaxed mt-1.5">
              {copy("Quý khách được đổi trả miễn phí trong vòng 7 ngày kể từ khi nhận hàng nếu phát hiện lỗi nhà sản xuất hoặc có dấu hiệu kích ứng da. Chuyên viên sẽ hỗ trợ hoàn tiền hoặc đổi sản phẩm thay thế phù hợp.")}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
