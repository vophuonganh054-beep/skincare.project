import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  User,
  RefreshCw,
  ChevronRight,
  Activity,
} from 'lucide-react';
import { AlpsIcon } from './AlpsLogo';
import { UserProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { SUPPORT_I18N } from '../i18n/supportTranslations';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface AICustomerSupportChatProps {
  user: UserProfile | null;
  onOpenLogin?: () => void;
  onOpenSkinQuiz?: () => void;
  initialPrompt?: string;
}

export const AICustomerSupportChat: React.FC<AICustomerSupportChatProps> = ({
  user,
  onOpenLogin,
  onOpenSkinQuiz,
  initialPrompt,
}) => {
  const { language } = useLanguage();
  const supportTexts = SUPPORT_I18N[language]?.aiChat || SUPPORT_I18N.vi.aiChat;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: supportTexts.welcomeMessage(user?.name),
      timestamp: new Date().toLocaleTimeString(language === 'vi' ? 'vi-VN' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasSentInitialPrompt = useRef(false);

  // Update welcome message if user changes language and no prior conversation took place
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [
          {
            id: 'welcome',
            role: 'model',
            text: supportTexts.welcomeMessage(user?.name),
            timestamp: new Date().toLocaleTimeString(language === 'vi' ? 'vi-VN' : 'en-US', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ];
      }
      return prev;
    });
  }, [language, user?.name]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt && !hasSentInitialPrompt.current) {
      hasSentInitialPrompt.current = true;
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString(language === 'vi' ? 'vi-VN' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build history for context
      const history = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history,
          language,
        }),
      });

      if (!res.ok) {
        throw new Error('Network error');
      }

      const data = await res.json();
      const aiReply = data.reply || supportTexts.fallbackDefault;

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: 'model',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString(language === 'vi' ? 'vi-VN' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.warn('Chat API error, using intelligent client fallback:', err);
      // Smart Fallback answers for key topics in current language
      let fallbackText = supportTexts.fallbackDefault;

      const lower = text.toLowerCase();
      if (
        lower.includes('đăng nhập') ||
        lower.includes('tài khoản') ||
        lower.includes('mua') ||
        lower.includes('đặt hàng') ||
        lower.includes('account') ||
        lower.includes('guest') ||
        lower.includes('login') ||
        lower.includes('konto') ||
        lower.includes('cuenta') ||
        lower.includes('登录')
      ) {
        fallbackText = supportTexts.fallbackGuestCheckout;
      } else if (
        lower.includes('đổi trả') ||
        lower.includes('vận chuyển') ||
        lower.includes('ship') ||
        lower.includes('return') ||
        lower.includes('refund') ||
        lower.includes('versand') ||
        lower.includes('rückgabe') ||
        lower.includes('devolución') ||
        lower.includes('退款')
      ) {
        fallbackText = supportTexts.fallbackReturns;
      } else if (
        lower.includes('serum') ||
        lower.includes('sáng da') ||
        lower.includes('thâm') ||
        lower.includes('glow') ||
        lower.includes('pregnant') ||
        lower.includes('niacinamide') ||
        lower.includes('leuchtkraft') ||
        lower.includes('manchas') ||
        lower.includes('美白') ||
        lower.includes('精华')
      ) {
        fallbackText = supportTexts.fallbackSerum;
      } else if (
        lower.includes('da dầu') ||
        lower.includes('mụn') ||
        lower.includes('lỗ chân lông') ||
        lower.includes('oily') ||
        lower.includes('acne') ||
        lower.includes('pore') ||
        lower.includes('unrein') ||
        lower.includes('grasa') ||
        lower.includes('acné') ||
        lower.includes('控油') ||
        lower.includes('痘')
      ) {
        fallbackText = supportTexts.fallbackOilyAcne;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'model',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString(language === 'vi' ? 'vi-VN' : 'en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        text: supportTexts.resetConfirm,
        timestamp: new Date().toLocaleTimeString(language === 'vi' ? 'vi-VN' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[520px] sm:h-[580px] bg-[#fcf9f4] rounded-2xl overflow-hidden border border-[#202022]/8">
      {/* Top status bar */}
      <div className="px-4 py-2.5 bg-white border-b border-[#202022]/8 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#202022] text-[#fed8c9] flex items-center justify-center p-1.5 shadow-2xs">
              <AlpsIcon color="#fed8c9" className="w-5 h-5" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-serif font-semibold text-xs text-[#1c1c19]">
                {supportTexts.title}
              </span>
              <span className="text-[9px] bg-[#fed8c9]/50 text-[#74584d] font-semibold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                {supportTexts.aiSubtitle}
              </span>
            </div>
            <p className="text-[10px] text-[#77767b]">
              {supportTexts.officialWebsite}
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="p-1.5 text-[#77767b] hover:text-[#1c1c19] hover:bg-[#f6f3ee] rounded-full transition-colors cursor-pointer"
          title={supportTexts.resetChat}
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Skin Quiz Callout Banner */}
      {onOpenSkinQuiz && (
        <div className="px-3.5 py-2.5 bg-gradient-to-r from-[#f4ece3] to-[#fcf9f4] border-b border-[#ece6dc] flex items-center justify-between text-xs text-[#74584d] shrink-0 shadow-2xs">
          <div className="flex items-center space-x-2 truncate">
            <Activity className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">
              {supportTexts.quizBannerText} <strong>{supportTexts.quizBannerBold}</strong>
            </span>
          </div>
          <button
            onClick={onOpenSkinQuiz}
            className="text-[11px] font-bold text-white bg-[#74584d] hover:bg-[#5b4339] px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 ml-2 shadow-2xs transition-colors flex items-center space-x-1 cursor-pointer"
          >
            <span>{supportTexts.quizBannerBtn}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2.5 ${
              msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
            }`}
          >
            {/* Avatar */}
            {msg.role === 'user' ? (
              <div className="w-7 h-7 rounded-full bg-[#1c1c19] text-white flex items-center justify-center shrink-0 shadow-2xs text-[11px] font-medium">
                {user?.name ? user.name[0].toUpperCase() : <User className="w-3.5 h-3.5" />}
              </div>
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#202022] text-[#fed8c9] flex items-center justify-center shrink-0 shadow-2xs p-1">
                <AlpsIcon color="#fed8c9" className="w-4 h-4" />
              </div>
            )}

            {/* Bubble */}
            <div
              className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-2xs ${
                msg.role === 'user'
                  ? 'bg-[#1c1c19] text-white rounded-tr-xs'
                  : 'bg-white text-[#1c1c19] border border-[#202022]/8 rounded-tl-xs'
              }`}
            >
              <div className="whitespace-pre-line break-words space-y-1">{msg.text}</div>
              <div
                className={`text-[9px] mt-1.5 text-right ${
                  msg.role === 'user' ? 'text-white/60' : 'text-[#77767b]'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start space-x-2.5">
            <div className="w-7 h-7 rounded-full bg-[#202022] text-[#fed8c9] flex items-center justify-center shrink-0 p-1">
              <AlpsIcon color="#fed8c9" className="w-4 h-4" />
            </div>
            <div className="bg-white text-[#77767b] border border-[#202022]/8 rounded-2xl rounded-tl-xs px-3.5 py-2.5 text-xs flex items-center space-x-2 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#74584d] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#74584d] animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#74584d] animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] text-[#74584d] font-medium ml-1">
                {supportTexts.thinking}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Carousel */}
      <div className="px-3 py-2 bg-white/70 border-t border-[#202022]/5 overflow-x-auto whitespace-nowrap scrollbar-none flex space-x-2 shrink-0">
        {supportTexts.quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            disabled={isLoading}
            className="text-[11px] bg-white border border-[#e4dfd7] hover:border-[#74584d] hover:text-[#74584d] px-3 py-1.5 rounded-full transition-colors shrink-0 text-[#5f5d58] shadow-2xs disabled:opacity-50 cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input box */}
      <div className="p-3 bg-white border-t border-[#202022]/8 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={supportTexts.inputPlaceholder}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-full border border-[#e4dfd7] text-xs focus:outline-none focus:border-[#74584d] focus:ring-1 focus:ring-[#74584d] bg-[#fbf9f6] text-[#1c1c19] placeholder:text-[#9e9a93]"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="w-10 h-10 rounded-full bg-[#1c1c19] hover:bg-black text-white flex items-center justify-center shrink-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
