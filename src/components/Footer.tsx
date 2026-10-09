import React from 'react';
import { ArrowRight, ShieldCheck, Award, HeartHandshake, Phone, Headphones, Mail, MapPin, Type } from 'lucide-react';
import { AlpsLogo } from './AlpsLogo';
import { PaymentBadgesGroup, VisaBadge, VisaDebitBadge, MastercardBadge, NapasBadge, VietQRBadge } from './PaymentBadges';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface FooterProps {
  isMobileFrame?: boolean;
  onOpenSupport?: () => void;
  onOpenPolicies?: (tab: 'returns' | 'privacy' | 'shipping') => void;
  onOpenFontSwitcher?: () => void;
  onOpenBrandStory?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ isMobileFrame = false, onOpenSupport, onOpenPolicies, onOpenFontSwitcher, onOpenBrandStory }) => {
  const { t, language } = useLanguage();

  const footerI18n = {
    vi: {
      openSupportBtn: 'MỞ TRUNG TÂM CSKH',
      newsletterTitle: 'ĐẶC QUYỀN THÀNH VIÊN',
      newsletterDesc: 'Đăng ký để nhận ưu đãi 10% cho đơn hàng đầu tiên và cẩm nang dưỡng da cá nhân hóa.',
      emailPlaceholder: 'Email của bạn...',
      subscribeBtn: 'Đăng ký',
      workingHours: 'Phục vụ từ 8:00 đến 22:00 hàng ngày (kể cả Lễ, Tết).',
      sslSecurity: 'Giao dịch mã hóa SSL 256-bit',
      inspectionTrust: 'Bảo vệ quyền lợi & Đồng kiểm khi nhận',
      privacyPolicy: 'Chính sách bảo mật',
      returnsRefunds: 'Đổi trả & Hoàn tiền',
      shippingTerms: 'Vận chuyển',
      support247: 'Hỗ trợ & CSKH 24/7',
      fontStyle: 'Tùy chọn phong cách font chữ',
    },
    en: {
      openSupportBtn: 'OPEN SUPPORT CENTER',
      newsletterTitle: 'MEMBER PRIVILEGES',
      newsletterDesc: 'Subscribe to receive 10% off your first order and a personalized skin ritual guide.',
      emailPlaceholder: 'Your email address...',
      subscribeBtn: 'Subscribe',
      workingHours: 'Available 8:00 - 22:00 daily (including holidays).',
      sslSecurity: '256-bit SSL encrypted checkout',
      inspectionTrust: 'Inspection upon delivery & buyer protection',
      privacyPolicy: 'Privacy Policy',
      returnsRefunds: 'Returns & Refunds',
      shippingTerms: 'Shipping Terms',
      support247: 'Support & Concierge 24/7',
      fontStyle: 'Typography Style Switcher',
    },
    de: {
      openSupportBtn: 'KUNDENZENTRUM ÖFFNEN',
      newsletterTitle: 'MITGLIEDERVORTEILE',
      newsletterDesc: 'Abonnieren Sie unseren Newsletter für 10% Rabatt und persönliche Hautpflegetipps.',
      emailPlaceholder: 'Ihre E-Mail-Adresse...',
      subscribeBtn: 'Abonnieren',
      workingHours: 'Täglich von 8:00 bis 22:00 Uhr erreichbar.',
      sslSecurity: '256-Bit SSL-verschlüsselte Zahlung',
      inspectionTrust: 'Prüfung bei Lieferung & Käuferschutz',
      privacyPolicy: 'Datenschutz',
      returnsRefunds: 'Rückgabe & Erstattung',
      shippingTerms: 'Versandinformationen',
      support247: 'Support & Concierge 24/7',
      fontStyle: 'Typografie-Einstellungen',
    },
    es: {
      openSupportBtn: 'ABRIR CENTRO DE ATENCIÓN',
      newsletterTitle: 'PRIVILEGIOS EXCLUSIVOS',
      newsletterDesc: 'Suscríbete para recibir un 10% en tu primer pedido y guía personalizada.',
      emailPlaceholder: 'Tu correo electrónico...',
      subscribeBtn: 'Suscribirse',
      workingHours: 'Atención diaria de 8:00 a 22:00 h.',
      sslSecurity: 'Pago cifrado SSL de 256 bits',
      inspectionTrust: 'Revisión en entrega y protección al comprador',
      privacyPolicy: 'Política de Privacidad',
      returnsRefunds: 'Cambios y Reembolsos',
      shippingTerms: 'Condiciones de Envío',
      support247: 'Atención y Soporte 24/7',
      fontStyle: 'Estilo tipográfico',
    },
    zh: {
      openSupportBtn: '打开专属客户中心',
      newsletterTitle: '尊享会员特权',
      newsletterDesc: '订阅获取首单 9 折优惠礼券及瑞士定制美肤方案。',
      emailPlaceholder: '输入您的电子邮箱...',
      subscribeBtn: '订阅',
      workingHours: '每日 8:00 至 22:00 全年无休服务。',
      sslSecurity: '256 位 SSL 全程高强度加密交易',
      inspectionTrust: '开箱验货保障与消费者权益承诺',
      privacyPolicy: '隐私政策',
      returnsRefunds: '退换货与退款',
      shippingTerms: '配送说明',
      support247: '24/7 全天候在线客服',
      fontStyle: '字体排版风格切换',
    },
  }[language] || {
    openSupportBtn: 'OPEN SUPPORT CENTER',
    newsletterTitle: 'MEMBER PRIVILEGES',
    newsletterDesc: 'Subscribe to receive 10% off your first order and a personalized skin ritual guide.',
    emailPlaceholder: 'Your email address...',
    subscribeBtn: 'Subscribe',
    workingHours: 'Available 8:00 - 22:00 daily (including holidays).',
    sslSecurity: '256-bit SSL encrypted checkout',
    inspectionTrust: 'Inspection upon delivery & buyer protection',
    privacyPolicy: 'Privacy Policy',
    returnsRefunds: 'Returns & Refunds',
    shippingTerms: 'Shipping Terms',
    support247: 'Support & Concierge 24/7',
    fontStyle: 'Typography Style Switcher',
  };

  return (
    <footer className={`bg-[#202022] text-[#fcf9f4] border-t border-[#31302d] ${isMobileFrame ? 'pb-24 pt-8 px-4' : 'pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6'}`}>
      <div className={`${isMobileFrame ? 'w-full' : 'max-w-7xl mx-auto'}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#31302d]">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center space-x-2">
              <AlpsLogo
                isDarkBackground
                className="items-start text-left"
              />
            </div>
            <p className="text-xs text-[#c7c6ca] font-light leading-relaxed">
              {t.footer.brandDesc}
            </p>
            {onOpenBrandStory && (
              <button
                onClick={onOpenBrandStory}
                className="text-[11px] text-[#fed8c9] hover:underline flex items-center space-x-1 font-medium pt-1 cursor-pointer"
              >
                <span>{t.footer.brandStoryLink}</span>
                <span>→</span>
              </button>
            )}
            <div className="pt-2 text-[11px] text-[#898789] space-y-1">
              <p><span className="text-[#fed8c9] font-medium">{t.footer.branchLabel}</span> {t.footer.branchAddress}</p>
            </div>
            {/* Language Selector in Footer */}
            <div className="pt-2">
              <LanguageSelector variant="footer" />
            </div>
            {/* Visa payment images directly under HCM branch */}
            <div className="pt-2.5 space-y-1.5">
              <span className="block text-[10px] text-[#fed8c9] font-medium tracking-wide uppercase">
                {t.footer.acceptPayment}
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                <VisaBadge className="h-6" />
                <VisaDebitBadge className="h-6" />
                <MastercardBadge className="h-6" />
                <NapasBadge className="h-6" />
                <VietQRBadge className="h-6" />
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest text-[#fed8c9] uppercase">
              {t.footer.collectionTitle}
            </h4>
            <ul className="space-y-2 text-xs text-[#c7c6ca]">
              <li className="hover:text-white cursor-pointer transition-colors">Alps Gentle Purifying Cleanser (120ml)</li>
              <li className="hover:text-white cursor-pointer transition-colors">Alps Botanical Balancing Toner (100ml)</li>
              <li className="hover:text-white cursor-pointer transition-colors">Alps Radiance Glow Serum (30ml)</li>
              <li className="hover:text-white cursor-pointer transition-colors">Alps Regenerating Face Cream (50g)</li>
              <li className="hover:text-white cursor-pointer transition-colors">Alps Hydro-Lifting Sheet Mask (5x29g)</li>
            </ul>
          </div>

          {/* Customer Care & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest text-[#fed8c9] uppercase flex items-center space-x-1.5">
              <Headphones className="w-3.5 h-3.5 text-[#fed8c9]" />
              <span>{t.footer.supportTitle}</span>
            </h4>
            <ul className="space-y-2 text-xs text-[#c7c6ca]">
              <li className="flex items-center space-x-2">
                <span className="text-[#fed8c9]">{t.footer.hotlineLabel}</span>
                <a href="tel:19008899" className="text-white font-bold hover:text-[#fed8c9] transition-colors">
                  1900 8899 (Miễn cước)
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#fed8c9]">{t.footer.emailLabel}</span>
                <a href="mailto:pure@alps.com" className="hover:text-white transition-colors">
                  pure@alps.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#fed8c9]">{t.footer.websiteLabel}</span>
                <a href="https://alps.id.vn" target="_blank" rel="noopener noreferrer" className="hover:text-[#fed8c9] text-white font-medium transition-colors">
                  alps.id.vn
                </a>
              </li>
              <li
                onClick={() => onOpenPolicies ? onOpenPolicies('returns') : undefined}
                className="hover:text-white cursor-pointer transition-colors flex items-center space-x-1"
              >
                <span>{t.footer.returnPolicy}</span>
                <span className="text-[10px] text-[#fed8c9]">↗</span>
              </li>
              <li
                onClick={() => onOpenPolicies ? onOpenPolicies('shipping') : undefined}
                className="hover:text-white cursor-pointer transition-colors flex items-center space-x-1"
              >
                <span>{t.footer.shippingPolicy}</span>
                <span className="text-[10px] text-[#fed8c9]">↗</span>
              </li>
              {onOpenFontSwitcher && (
                <li
                  onClick={onOpenFontSwitcher}
                  className="hover:text-white cursor-pointer transition-colors flex items-center space-x-1.5 text-[#fed8c9]"
                  title="Thay đổi font chữ website"
                >
                  <Type className="w-3.5 h-3.5 text-[#fed8c9]" />
                  <span className="underline decoration-dotted">Tùy chọn phong cách font chữ</span>
                </li>
              )}
            </ul>

            {onOpenSupport && (
              <div className="pt-2">
                <button
                  onClick={onOpenSupport}
                  className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 text-[#fed8c9] hover:text-white text-xs font-semibold rounded-full border border-white/15 transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>{footerI18n.openSupportBtn}</span>
                </button>
              </div>
            )}
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest text-[#fed8c9] uppercase">
              {footerI18n.newsletterTitle}
            </h4>
            <p className="text-xs text-[#c7c6ca]">
              {footerI18n.newsletterDesc}
            </p>
            <div className="flex rounded-full overflow-hidden bg-[#31302d] p-1 border border-[#46464a]">
              <input
                type="email"
                placeholder={footerI18n.emailPlaceholder}
                className="bg-transparent text-xs text-white px-3 py-1.5 focus:outline-none flex-grow min-w-0"
              />
              <button
                className="bg-white hover:bg-[#fed8c9] text-[#1c1c19] px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center shrink-0 cursor-pointer"
                title={footerI18n.subscribeBtn}
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="text-[10px] text-[#898789] pt-1">
              {footerI18n.workingHours}
            </div>
          </div>
        </div>

        {/* Accepted Payment Methods Strip (Visa, Mastercard, JCB, Napas, VietQR, MoMo, Apple Pay) */}
        <div className="py-6 border-b border-[#31302d] flex flex-col md:flex-row items-center justify-between gap-4">
          <PaymentBadgesGroup theme="dark" showLabel={true} badgeSize="h-7" />
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] text-[#898789]">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#fed8c9]" />
              <span>{footerI18n.sslSecurity}</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center space-x-1.5">
              <HeartHandshake className="w-4 h-4 text-[#fed8c9]" />
              <span>{footerI18n.inspectionTrust}</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#898789] gap-3 text-center sm:text-left">
          <p>© 2026 Alps Pure Essence. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center space-x-3 text-[11px]">
            <button
              onClick={() => onOpenPolicies ? onOpenPolicies('privacy') : undefined}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {footerI18n.privacyPolicy}
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenPolicies ? onOpenPolicies('returns') : undefined}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {footerI18n.returnsRefunds}
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenPolicies ? onOpenPolicies('shipping') : undefined}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {footerI18n.shippingTerms}
            </button>
            <span>•</span>
            {onOpenSupport ? (
              <button
                onClick={onOpenSupport}
                className="hover:text-[#fed8c9] text-[#c7c6ca] underline underline-offset-2 transition-colors cursor-pointer"
              >
                {footerI18n.support247}
              </button>
            ) : (
              <span className="hover:text-white cursor-pointer">Hotline: 1900 8899</span>
            )}
            <span>•</span>
            <a href="mailto:pure@alps.com" className="hover:text-white transition-colors">pure@alps.com</a>
            <span>•</span>
            <a href="https://alps.id.vn" target="_blank" rel="noopener noreferrer" className="hover:text-[#fed8c9] text-white font-medium transition-colors">alps.id.vn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
