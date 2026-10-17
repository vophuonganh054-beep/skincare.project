import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  Minimize2,
  Maximize2,
  RefreshCw,
  Activity,
  CheckCircle2,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { AlpsIcon } from './AlpsLogo';
import { UserProfile } from '../types';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface FloatingAIChatWidgetProps {
  user?: UserProfile | null;
  onOpenSkinQuiz?: () => void;
  onOpenSupportModal?: () => void;
}

const QUICK_PROMPTS = [
  'Da dầu mụn, bít tắc chân lông nên dùng bước nào?',
  'Serum Radiance Glow có dùng được cho mẹ bầu không?',
  'Tế bào gốc hoa tuyết Alpine phục hồi da ra sao?',
  'Chính sách đổi trả 30 ngày & Freeship của Alps?',
  'Tôi muốn đặt hàng nhanh không cần đăng nhập',
  'Cách phối hợp kem dưỡng Alps với Retinol / BHA?',
];

export const FloatingAIChatWidget: React.FC<FloatingAIChatWidgetProps> = ({
  user,
  onOpenSkinQuiz,
  onOpenSupportModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);

  const getGreeting = () => {
    const customer = user?.name ? `quý khách ${user.name}` : 'quý khách';
    return `Dạ kính chào ${customer}! Em là Chuyên viên Da liễu Thụy Sĩ & Cố vấn Trí tuệ Nhân tạo của thương hiệu Dược mỹ phẩm thuần chay Alps Skincare (alps.vn).\n\nEm được tích hợp công nghệ Gemini 3.8 Flash kết nối trực tiếp với cơ sở dữ liệu y khoa từ Viện nghiên cứu Zurich. Em có thể giải đáp thông minh và toàn diện MỌI câu hỏi của quý khách:\n• Chẩn đoán tình trạng da (mụn, thâm, nám, lão hóa, da nhạy cảm kích ứng)\n• Lên phác đồ phục hồi hàng rào sinh học & phối hợp sản phẩm khoa học\n• Giải đáp thành phần Tế bào gốc hoa tuyết Alpine, Niacinamide 5%, Ceramide\n• An toàn cho mẹ bầu, phụ nữ sau sinh & làn da treatment\n• Hướng dẫn đặt hàng nhanh không cần đăng nhập, chính sách đổi trả 30 ngày hoàn tiền 100%.\n\nQuý khách đang quan tâm hoặc cần chuyên viên tư vấn vấn đề gì cho làn da hôm nay ạ?`;
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      text: getGreeting(),
      timestamp: new Date().toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isMinimized, isLoading]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setShowNotificationBadge(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text: 'Dạ em đã làm mới cuộc trò chuyện. Em là Chuyên viên Da liễu Thụy Sĩ của Alps, quý khách muốn tìm hiểu thêm về tình trạng da hay sản phẩm nào ạ?',
        timestamp: new Date().toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const apiBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
      const res = await fetch(`${apiBase}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history,
          language: 'vi',
        }),
      });

      if (!res.ok) {
        throw new Error('Network error');
      }

      const data = await res.json();
      const aiReply =
        data.reply ||
        'Dạ cảm ơn quý khách đã gửi câu hỏi. Chuyên viên da liễu Alps Skincare luôn sẵn sàng hỗ trợ trực tiếp qua Hotline 0772 770 134 hoặc email pure@alps.vn ạ!';

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: 'model',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: Message = {
        id: `fallback-${Date.now()}`,
        role: 'model',
        text: 'Dạ xin lỗi quý khách, kết nối AI tạm thời gián đoạn. Quý khách có thể liên hệ trực tiếp chuyên viên qua Hotline 0772 770 134 hoặc ghé chi nhánh 30 Trịnh Đình Thảo, Tân Phú, TP.HCM để được thăm khám da trực tiếp 1-1 miễn phí ạ!',
        timestamp: new Date().toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormattedText = (content: string) => {
    return content.split('\n').map((line, idx) => {
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        const item = line.trim().replace(/^[•\-]\s*/, '');
        return (
          <li key={idx} className="ml-3.5 list-disc text-pretty my-0.5">
            {formatBold(item)}
          </li>
        );
      }
      if (/^\d+\./.test(line.trim())) {
        return (
          <p key={idx} className="font-medium text-pretty my-1">
            {formatBold(line)}
          </p>
        );
      }
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }
      return (
        <p key={idx} className="text-pretty my-0.5">
          {formatBold(line)}
        </p>
      );
    });
  };

  const formatBold = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-[#1c1c19]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* 1. FLOATING ACTION LAUNCHER (When closed or minimized) */}
      {!isOpen && (
        <div className="fixed bottom-20 right-3.5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end space-y-2 pointer-events-auto">
          {/* Quick Skin Quiz Chip */}
          {onOpenSkinQuiz && (
            <button
              onClick={onOpenSkinQuiz}
              className="bg-white/95 hover:bg-white text-[#74584d] hover:text-[#584137] px-3.5 py-2 rounded-full shadow-lg flex items-center space-x-2 border border-[#fed8c9] hover:scale-105 active:scale-95 transition-all text-xs font-semibold cursor-pointer group"
              title="Làm trắc nghiệm soi da y khoa (1 phút)"
            >
              <div className="w-5 h-5 rounded-full bg-[#f4ece3] flex items-center justify-center text-emerald-700 shrink-0">
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <span className="text-xs font-semibold tracking-wide">Soi Da AI</span>
              <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded-full">
                1 PHÚT
              </span>
            </button>
          )}

          {/* Quick Fanpage Messenger Chip */}
          <a
            href="https://www.facebook.com/profile.php?id=61595372038444"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1877F2] hover:bg-[#166fe5] text-white px-3.5 py-2 rounded-full shadow-xl flex items-center space-x-2 border border-white/20 hover:scale-105 active:scale-95 transition-all text-xs font-semibold cursor-pointer group"
            title="Chat trực tiếp với tư vấn viên qua Messenger Facebook"
          >
            <div className="w-5 h-5 rounded-full bg-white text-[#1877F2] flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <span className="text-xs font-semibold">Tư Vấn Fanpage</span>
            <span className="text-[9px] bg-white text-[#1877F2] px-1 py-0.2 rounded-xs font-bold">24/7</span>
          </a>

          {/* MAIN FLOATING CHAT BUTTON (Bong bóng chat Chuyên Viên Da Liễu Thụy Sĩ) */}
          <button
            id="floating-ai-dermatologist-btn"
            onClick={handleOpen}
            className="relative bg-[#202022] hover:bg-[#08080a] text-white pl-4 pr-5 py-2.5 sm:py-3 rounded-full shadow-2xl flex items-center space-x-3 border border-[#fed8c9]/60 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            title="Chat ngay với Chuyên viên Da liễu Thụy Sĩ AI"
          >
            <div className="relative flex items-center justify-center shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#353337] flex items-center justify-center border border-[#fed8c9]/40 group-hover:bg-[#74584d] transition-colors">
                <Sparkles className="w-4 h-4 text-[#fed8c9] animate-pulse" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#202022] animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#202022]" />
            </div>

            <div className="text-left">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs sm:text-sm font-bold tracking-wide text-white uppercase leading-tight">
                  Chuyên Viên Da Liễu AI
                </span>
                <span className="text-[10px] bg-[#fed8c9] text-[#1c1c19] px-1.5 py-0.2 rounded-full font-bold">
                  Thụy Sĩ
                </span>
              </div>
              <span className="text-[11px] text-[#fed8c9]/90 font-light block leading-tight mt-0.5">
                Tư vấn mọi vấn đề da • Gemini 24/7
              </span>
            </div>

            {showNotificationBadge && (
              <span className="absolute -top-1.5 -left-1.5 bg-[#ba1a1a] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md animate-bounce">
                Hỏi AI 1-1
              </span>
            )}
          </button>
        </div>
      )}

      {/* 2. EXPANDED FLOATING CHAT WINDOW */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ease-out ${
            isMinimized
              ? 'bottom-20 right-3.5 sm:bottom-6 sm:right-6 w-72 sm:w-80'
              : 'bottom-20 right-2 left-2 sm:left-auto sm:right-6 sm:bottom-6 w-auto sm:w-[410px] max-w-full'
          }`}
        >
          <div className="bg-[#ffffff] rounded-3xl shadow-2xl border border-[#202022]/15 overflow-hidden flex flex-col transition-all duration-200">
            {/* Header bar */}
            <div className="bg-[#202022] text-[#fcf9f4] p-4 flex items-center justify-between border-b border-[#353337] relative">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#353337] border border-[#fed8c9]/50 flex items-center justify-center">
                    <AlpsIcon className="w-5 h-5 text-[#fed8c9]" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#202022]" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <h3 className="font-serif text-sm sm:text-base font-semibold text-white truncate">
                      Chuyên Viên Da Liễu Thụy Sĩ AI
                    </h3>
                  </div>
                  <p className="text-[11px] text-[#fed8c9] truncate font-light">
                    Alps Pure Essence • Gemini 3.8 Flash 24/7
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-1 shrink-0 ml-2">
                <button
                  onClick={handleResetChat}
                  className="p-1.5 text-[#c7c6ca] hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  title="Làm mới cuộc trò chuyện"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 text-[#c7c6ca] hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  title={isMinimized ? 'Mở rộng' : 'Thu nhỏ'}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleClose}
                  className="p-1.5 text-[#c7c6ca] hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  title="Đóng cửa sổ chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* If not minimized, show full chat content */}
            {!isMinimized && (
              <>
                {/* Chat Message History */}
                <div className="h-[360px] sm:h-[410px] overflow-y-auto p-3.5 sm:p-4 bg-[#fcf9f4] space-y-3.5 text-xs sm:text-sm">
                  {/* Clinic Banner */}
                  <div className="bg-gradient-to-r from-[#fed8c9]/30 to-[#f0ede9] p-3 rounded-2xl border border-[#fed8c9]/60 text-xs text-[#5a595e] flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-[#74584d] shrink-0" />
                      <span>
                        <strong className="text-[#1c1c19]">Tiêu chuẩn Zurich:</strong> Giải đáp tự do mọi câu hỏi về da liễu & mỹ phẩm
                      </span>
                    </div>
                    {onOpenSkinQuiz && (
                      <button
                        onClick={onOpenSkinQuiz}
                        className="px-2.5 py-1 bg-[#202022] text-white text-[11px] font-semibold rounded-full hover:bg-black whitespace-nowrap cursor-pointer shrink-0"
                      >
                        Soi Da AI
                      </button>
                    )}
                  </div>

                  {/* Messages list */}
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-start gap-2 max-w-[88%] sm:max-w-[85%]">
                        {msg.role === 'model' && (
                          <div className="w-7 h-7 rounded-full bg-[#202022] text-[#fed8c9] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                            <Sparkles className="w-3.5 h-3.5" />
                          </div>
                        )}

                        <div
                          className={`p-3.5 rounded-2xl leading-relaxed ${
                            msg.role === 'user'
                              ? 'bg-[#202022] text-[#fcf9f4] rounded-tr-xs'
                              : 'bg-white text-[#1c1c19] border border-[#202022]/10 shadow-xs rounded-tl-xs'
                          }`}
                        >
                          <div className="text-xs sm:text-[13.5px]">
                            {msg.role === 'model' ? renderFormattedText(msg.text) : msg.text}
                          </div>
                          <span
                            className={`block text-[10px] mt-1.5 ${
                              msg.role === 'user' ? 'text-[#c7c6ca] text-right' : 'text-[#77767b]'
                            }`}
                          >
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex items-start gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#202022] text-[#fed8c9] flex items-center justify-center shrink-0">
                        <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                      </div>
                      <div className="bg-white p-3 rounded-2xl border border-[#202022]/10 text-xs text-[#74584d] flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <span className="w-2 h-2 bg-[#74584d] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-[#74584d] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-[#74584d] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-[11.5px] font-medium">Chuyên viên da liễu đang phân tích...</span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts Carousel */}
                <div className="px-3 py-2 bg-[#f0ede9] border-t border-[#202022]/5 overflow-x-auto scrollbar-none flex items-center space-x-1.5">
                  <span className="text-[11px] font-bold text-[#74584d] whitespace-nowrap shrink-0 flex items-center space-x-1">
                    <span>Gợi ý:</span>
                  </span>
                  {QUICK_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(prompt)}
                      className="px-2.5 py-1 bg-white hover:bg-[#fed8c9]/40 text-[#46464a] hover:text-[#1c1c19] text-[11px] rounded-full border border-[#202022]/10 whitespace-nowrap transition-colors cursor-pointer shrink-0"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="p-3 bg-white border-t border-[#202022]/10 flex items-center space-x-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Hỏi chuyên viên da liễu bất kỳ câu hỏi nào..."
                    className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-[#fcf9f4] border border-[#202022]/15 rounded-xl focus:outline-none focus:border-[#74584d] focus:bg-white text-[#1c1c19] transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="p-2.5 bg-[#202022] hover:bg-[#08080a] disabled:bg-[#dcdad5] text-white rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed shrink-0"
                    title="Gửi câu hỏi"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* Bottom Footer Details */}
                <div className="px-3 py-1.5 bg-[#fcf9f4] border-t border-[#202022]/5 flex items-center justify-between text-[10px] text-[#77767b]">
                  <span className="flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Dược mỹ phẩm thuần chay Thụy Sĩ</span>
                  </span>
                  <a
                    href="tel:0772770134"
                    className="hover:text-[#1c1c19] font-medium flex items-center space-x-0.5"
                  >
                    <Phone className="w-2.5 h-2.5" />
                    <span>0772 770 134</span>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
