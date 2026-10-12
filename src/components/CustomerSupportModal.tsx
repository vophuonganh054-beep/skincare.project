import React, { useState } from 'react';
import {
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Headphones,
  CheckCircle2,
  HelpCircle,
  Send,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { UserProfile } from '../types';
import { AICustomerSupportChat } from './AICustomerSupportChat';
import { useLanguage } from '../context/LanguageContext';
import { SUPPORT_I18N } from '../i18n/supportTranslations';

interface CustomerSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onShowToast: (msg: string) => void;
  onOpenLogin?: () => void;
  onOpenSkinQuiz?: () => void;
  initialPrompt?: string;
  initialTab?: 'ai_chat' | 'contact' | 'ticket' | 'faq';
}

export const CustomerSupportModal: React.FC<CustomerSupportModalProps> = ({
  isOpen,
  onClose,
  user,
  onShowToast,
  onOpenLogin,
  onOpenSkinQuiz,
  initialPrompt,
  initialTab = 'ai_chat',
}) => {
  const { language } = useLanguage();
  const support = SUPPORT_I18N[language] || SUPPORT_I18N.vi;

  const [activeTab, setActiveTab] = useState<'ai_chat' | 'contact' | 'ticket' | 'faq'>(initialTab);

  // Ticket form state
  const [ticketTopic, setTicketTopic] = useState(support.ticket.topics[0] || 'Skin Consultation');
  const [senderName, setSenderName] = useState(user?.name || '');
  const [senderPhone, setSenderPhone] = useState(user?.phone || '0908 123 489');
  const [senderEmail, setSenderEmail] = useState(user?.email || '');
  const [orderCode, setOrderCode] = useState('');
  const [message, setMessage] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<{ id: string; time: string } | null>(null);

  // FAQ collapse state
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  if (!isOpen) return null;

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderPhone.trim() || !message.trim()) {
      onShowToast(support.ticket.validationError);
      return;
    }

    const ticketId = `ALPS-CSKH-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date().toLocaleTimeString(language === 'vi' ? 'vi-VN' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setSubmittedTicket({ id: ticketId, time: now });
    onShowToast(support.ticket.successDesc(ticketId));
  };

  const resetTicketForm = () => {
    setMessage('');
    setSubmittedTicket(null);
  };

  const faqs = support.faq.items;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#ffffff] rounded-[2rem] shadow-2xl overflow-hidden z-10 border border-[#202022]/10 my-4 flex flex-col max-h-[92vh]">
        {/* Header bar */}
        <div className="bg-[#202022] text-[#fcf9f4] p-5 sm:p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#c7c6ca] hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-[#fed8c9] text-xs font-semibold uppercase tracking-[0.2em] mb-1.5">
            <Headphones className="w-4 h-4 text-[#fed8c9]" />
            <span>{support.modalSubtitle}</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
            {support.modalTitle}
          </h3>

          <p className="text-xs text-[#c7c6ca] mt-1.5 leading-relaxed max-w-lg">
            {support.contact.workingHoursDesc}
          </p>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center space-x-1 sm:space-x-2 mt-4 pt-3 border-t border-white/10 text-xs overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('ai_chat')}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'ai_chat'
                  ? 'bg-[#fed8c9] text-[#1c1c19] shadow-xs font-semibold'
                  : 'text-[#fed8c9] hover:text-white bg-white/10 border border-[#fed8c9]/30'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#74584d]" />
              <span>{support.tabs.aiChat}</span>
            </button>

            {onOpenSkinQuiz && (
              <button
                onClick={() => {
                  onClose();
                  onOpenSkinQuiz();
                }}
                className="px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap flex items-center space-x-1.5 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-400/40 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>{support.floatingBtn.skinQuizLabel}</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('contact')}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'contact'
                  ? 'bg-[#ffffff] text-[#1c1c19] shadow-xs'
                  : 'text-[#c7c6ca] hover:text-white bg-white/5'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{support.tabs.contact}</span>
            </button>

            <button
              onClick={() => setActiveTab('ticket')}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'ticket'
                  ? 'bg-[#ffffff] text-[#1c1c19] shadow-xs'
                  : 'text-[#c7c6ca] hover:text-white bg-white/5'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{support.tabs.ticket}</span>
            </button>

            <button
              onClick={() => setActiveTab('faq')}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'faq'
                  ? 'bg-[#ffffff] text-[#1c1c19] shadow-xs'
                  : 'text-[#c7c6ca] hover:text-white bg-white/5'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{support.tabs.faq}</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-5 flex-grow text-[#1c1c19] bg-[#fcf9f4]">
          {/* TAB 0: CHAT AI TƯ VẤN KHÁCH HÀNG 24/7 */}
          {activeTab === 'ai_chat' && (
            <div className="animate-fade-in">
              <AICustomerSupportChat
                user={user}
                onOpenLogin={onOpenLogin}
                onOpenSkinQuiz={onOpenSkinQuiz}
                initialPrompt={initialPrompt}
              />
            </div>
          )}

          {/* TAB 1: LIÊN HỆ TRỰC TIẾP */}
          {activeTab === 'contact' && (
            <div className="space-y-6 animate-fade-in">
              {/* Hotlines Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Hotline 1 */}
                <div className="bg-white rounded-2xl p-4 border border-[#202022]/8 shadow-2xs hover:border-[#74584d]/30 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#74584d] bg-[#fed8c9]/30 px-2 py-0.5 rounded-full">
                        24/7 SUPPORT
                      </span>
                      <span className="flex items-center text-[10px] text-[#8a9a86] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8a9a86] mr-1 animate-pulse" />
                        {support.aiChat.online247}
                      </span>
                    </div>
                    <h4 className="font-serif text-base font-semibold text-[#1c1c19] mt-2">
                      {support.contact.hotlineTitle}
                    </h4>
                    <p className="text-xs text-[#77767b] mt-0.5">
                      {support.contact.hotlineDesc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#f0ede9] flex items-center justify-between">
                    <div>
                      <span className="font-serif text-lg font-bold text-[#1c1c19] tracking-wider block">
                        {support.contact.hotlineFree}
                      </span>
                    </div>
                    <a
                      href="tel:19008899"
                      className="px-3 py-1.5 bg-[#202022] hover:bg-black text-white text-xs font-medium rounded-full shadow-2xs transition-colors shrink-0"
                    >
                      {support.contact.callNowBtn}
                    </a>
                  </div>
                </div>

                {/* Email Box */}
                <div className="bg-white rounded-2xl p-4 border border-[#202022]/8 shadow-2xs hover:border-[#74584d]/30 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#74584d] bg-[#fed8c9]/30 px-2 py-0.5 rounded-full">
                        EMAIL CARE
                      </span>
                      <span className="text-[10px] text-[#77767b]">
                        {support.contact.emailDesc}
                      </span>
                    </div>
                    <h4 className="font-serif text-base font-semibold text-[#1c1c19] mt-2">
                      {support.contact.emailTitle}
                    </h4>
                    <p className="text-xs text-[#77767b] mt-0.5">
                      cskh@alps.id.vn • pure@alps.com
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#f0ede9] flex items-center justify-between">
                    <div>
                      <span className="font-medium text-xs text-[#74584d] block">
                        cskh@alps.id.vn
                      </span>
                    </div>
                    <a
                      href="mailto:cskh@alps.id.vn"
                      className="px-3 py-1.5 bg-[#f6f3ee] hover:bg-[#ede7df] text-[#1c1c19] text-xs font-medium rounded-full border border-[#202022]/10 transition-colors shrink-0"
                    >
                      Email
                    </a>
                  </div>
                </div>

                {/* Facebook Fanpage Box */}
                <div className="bg-white rounded-2xl p-4 border border-[#202022]/8 shadow-2xs hover:border-[#1877F2]/30 transition-all flex flex-col justify-between sm:col-span-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#1877F2] bg-[#1877F2]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          <span>FACEBOOK FANPAGE CHÍNH THỨC</span>
                        </span>
                        <span className="text-[10px] text-[#2e6930] bg-[#eef5ee] px-2 py-0.5 rounded-full font-medium">
                          Phản hồi nhanh
                        </span>
                      </div>
                      <h4 className="font-serif text-base font-semibold text-[#1c1c19]">
                        Kênh Fanpage Tư Vấn & CSKH Trực Tuyến
                      </h4>
                      <p className="text-xs text-[#77767b]">
                        Nhắn tin Messenger trực tiếp với chuyên viên để nhận phác đồ chăm sóc da cá nhân hóa
                      </p>
                    </div>

                    <a
                      href="https://www.facebook.com/profile.php?id=61595372038444"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-1.5 px-4 py-2 bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-semibold rounded-full shadow-xs transition-colors shrink-0"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>Mở Trang Facebook</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Trụ Sở Phân Phối & Văn Phòng Chính Hãng TP.HCM */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#202022]/8 shadow-2xs space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1c1c19] flex items-center space-x-1.5 leading-snug">
                  <MapPin className="w-4 h-4 text-[#74584d] shrink-0" />
                  <span>Trụ Sở & Văn Phòng Phân Phối TP.HCM</span>
                </h4>

                <div className="pt-1 text-xs">
                  {/* Trụ Sở TP.HCM */}
                  <div className="p-3.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#1c1c19]">{support.contact.hcmTitle}</span>
                      <span className="text-[10px] text-[#8a9a86] bg-[#8a9a86]/10 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        TP.HCM
                      </span>
                    </div>
                    <p className="text-[#46464a] leading-relaxed text-[11px] text-pretty">
                      {support.contact.hcmAddress}
                    </p>
                    <p className="text-[11px] text-[#77767b] pt-1 text-pretty">
                      {support.contact.hcmDesc}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-[#77767b] border-t border-[#f0ede9]">
                  <span className="flex items-center space-x-1">
                    <span>✨ {support.contact.workingHoursTime}</span>
                  </span>
                  <span className="text-[#74584d] font-medium hidden sm:inline whitespace-nowrap">ISO 22716 Certified</span>
                </div>
              </div>

              {/* 3 Commitments */}
              <div className="bg-[#f0ede9] rounded-2xl p-4 border border-[#ebe8e3] text-xs space-y-2">
                <div className="flex items-center space-x-1.5 text-[#74584d] font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Alps Skincare Pure Essence</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px] text-[#46464a]">
                  <div className="bg-white/80 rounded-xl p-2.5 border border-[#ebe8e3]">
                    <strong className="text-[#1c1c19] block mb-0.5">✦ 15-Minute Reply</strong>
                    {support.ticket.subtitle}
                  </div>
                  <div className="bg-white/80 rounded-xl p-2.5 border border-[#ebe8e3]">
                    <strong className="text-[#1c1c19] block mb-0.5">✦ 30-Day Guarantee</strong>
                    100% money-back guarantee with zero return fee.
                  </div>
                  <div className="bg-white/80 rounded-xl p-2.5 border border-[#ebe8e3]">
                    <strong className="text-[#1c1c19] block mb-0.5">✦ 1-on-1 Specialist</strong>
                    Personalized Swiss dermatology support throughout your ritual.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GỬI PHIẾU YÊU CẦU CSKH (SUPPORT TICKET FORM) */}
          {activeTab === 'ticket' && (
            <div className="space-y-4 animate-fade-in">
              {submittedTicket ? (
                <div className="bg-white rounded-2xl p-6 border border-[#8a9a86]/30 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#8a9a86]/15 text-[#8a9a86] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-[#1c1c19]">
                    {support.ticket.successTitle}
                  </h4>
                  <p className="text-xs text-[#46464a] max-w-md mx-auto leading-relaxed">
                    {support.ticket.successDesc(submittedTicket.id)}
                  </p>
                  <div className="pt-3">
                    <button
                      onClick={resetTicketForm}
                      className="px-5 py-2.5 bg-[#202022] hover:bg-black text-white text-xs font-semibold rounded-full shadow-xs transition-colors cursor-pointer"
                    >
                      {support.ticket.newTicketBtn}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit} className="bg-white rounded-2xl p-5 border border-[#202022]/8 shadow-2xs space-y-4">
                  <div className="border-b border-[#f0ede9] pb-3">
                    <h4 className="font-serif text-base font-medium text-[#1c1c19]">
                      {support.ticket.title}
                    </h4>
                    <p className="text-xs text-[#77767b] mt-0.5">
                      {support.ticket.subtitle}
                    </p>
                  </div>

                  {/* Topic selection */}
                  <div>
                    <label className="block text-xs font-medium text-[#1c1c19] mb-1.5">
                      {support.ticket.topicLabel}
                    </label>
                    <select
                      value={ticketTopic}
                      onChange={(e) => setTicketTopic(e.target.value)}
                      className="w-full bg-[#fcf9f4] border border-[#ebe8e3] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1c19] focus:outline-none focus:border-[#74584d] cursor-pointer"
                    >
                      {support.ticket.topics.map((t, i) => (
                        <option key={i} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#1c1c19] mb-1">
                        {support.ticket.nameLabel}
                      </label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder={support.ticket.nameLabel}
                        className="w-full bg-[#fcf9f4] border border-[#ebe8e3] rounded-xl px-3 py-2 text-xs text-[#1c1c19] focus:outline-none focus:border-[#74584d]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#1c1c19] mb-1">
                        {support.ticket.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        value={senderPhone}
                        onChange={(e) => setSenderPhone(e.target.value)}
                        placeholder={support.ticket.phoneLabel}
                        className="w-full bg-[#fcf9f4] border border-[#ebe8e3] rounded-xl px-3 py-2 text-xs text-[#1c1c19] focus:outline-none focus:border-[#74584d]"
                        required
                      />
                    </div>
                  </div>

                  {/* Email & Order code */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#1c1c19] mb-1">
                        {support.ticket.emailLabel}
                      </label>
                      <input
                        type="email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="email@domain.com"
                        className="w-full bg-[#fcf9f4] border border-[#ebe8e3] rounded-xl px-3 py-2 text-xs text-[#1c1c19] focus:outline-none focus:border-[#74584d]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#1c1c19] mb-1">
                        {support.ticket.orderCodeLabel}
                      </label>
                      <input
                        type="text"
                        value={orderCode}
                        onChange={(e) => setOrderCode(e.target.value)}
                        placeholder={support.ticket.orderCodePlaceholder}
                        className="w-full bg-[#fcf9f4] border border-[#ebe8e3] rounded-xl px-3 py-2 text-xs text-[#1c1c19] focus:outline-none focus:border-[#74584d]"
                      />
                    </div>
                  </div>

                  {/* Message content */}
                  <div>
                    <label className="block text-xs font-medium text-[#1c1c19] mb-1">
                      {support.ticket.messageLabel}
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={support.ticket.messagePlaceholder}
                      className="w-full bg-[#fcf9f4] border border-[#ebe8e3] rounded-xl p-3 text-xs text-[#1c1c19] focus:outline-none focus:border-[#74584d] resize-none"
                      required
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-[#77767b] flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-[#74584d]" />
                      <span>{support.ticket.subtitle}</span>
                    </span>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#202022] hover:bg-black text-white text-xs font-semibold rounded-full shadow-md transition-all active:scale-98 flex items-center space-x-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{support.ticket.submitBtn}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: CÂU HỎI THƯỜNG GẶP (FAQ) */}
          {activeTab === 'faq' && (
            <div className="space-y-3 animate-fade-in">
              <div className="bg-white rounded-2xl p-4 border border-[#202022]/8 mb-2">
                <h4 className="font-serif text-sm font-semibold text-[#1c1c19]">
                  {support.faq.title}
                </h4>
                <p className="text-xs text-[#77767b] mt-0.5">
                  {support.modalSubtitle}
                </p>
              </div>

              {faqs.map((faq, index) => {
                const isExpanded = expandedFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-[#202022]/8 overflow-hidden transition-all shadow-2xs"
                  >
                    <button
                      onClick={() => setExpandedFaqIndex(isExpanded ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-[#fcf9f4] transition-colors cursor-pointer"
                    >
                      <span className="font-medium text-xs sm:text-sm text-[#1c1c19] pr-3 flex items-center space-x-2">
                        <span className="text-[#74584d] font-semibold">Q{index + 1}.</span>
                        <span>{faq.question}</span>
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#74584d] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#77767b] shrink-0" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 text-xs text-[#46464a] leading-relaxed border-t border-[#f0ede9] bg-[#fcf9f4]/60">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-3 sm:p-4 bg-[#ffffff] border-t border-[#ebe8e3] flex flex-col sm:flex-row items-center justify-between text-xs text-[#77767b] gap-2 shrink-0">
          <div className="flex items-center space-x-2 text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-[#74584d]" />
            <span>Alps Skincare Pure Essence • Swiss Vegan Dermatology</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-1.5 bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#1c1c19] font-medium rounded-full text-xs transition-colors cursor-pointer"
          >
            {language === 'vi' ? 'Đóng cửa sổ' : language === 'de' ? 'Schließen' : language === 'es' ? 'Cerrar' : language === 'zh' ? '关闭窗口' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
