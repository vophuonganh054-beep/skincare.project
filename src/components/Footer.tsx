import { useCopy } from '../i18n/useCopy';
import React from 'react';
import { AlpsConnections } from './AlpsConnections';
import { ArrowRight, ShieldCheck, Award, HeartHandshake, Phone, Headphones, Mail, MapPin, Type } from 'lucide-react';
import { AlpsLogo } from './AlpsLogo';
import { PaymentBadgesGroup, VietQRBadge } from './PaymentBadges';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { Link } from '../context/RouterContext';
import { PRODUCTS } from '../data/products';
import { getProductPath } from '../utils/slugUtils';

interface FooterProps {
  isMobileFrame?: boolean;
  onOpenSupport?: () => void;
  onOpenPolicies?: (tab: 'returns' | 'privacy' | 'shipping') => void;
  onOpenFontSwitcher?: () => void;
  onOpenBrandStory?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ isMobileFrame = false, onOpenSupport, onOpenPolicies, onOpenFontSwitcher, onOpenBrandStory }) => {
  const copy = useCopy();
  const { t, language } = useLanguage();

  const footerI18n = {
    vi: {
      openSupportBtn: 'MỞ TRUNG TÂM CSKH',
      newsletterTitle: 'ĐẶC QUYỀN THÀNH VIÊN',
      newsletterDesc: 'Thành viên đăng nhập dùng ALPSMEMBER giảm 10% giá gốc cho sản phẩm chưa giảm giá; cộng được ALPSFREESHIP.',
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
      newsletterDesc: 'Thành viên đăng nhập dùng ALPSMEMBER giảm 10% giá gốc cho sản phẩm chưa giảm giá; cộng được ALPSFREESHIP.',
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
      newsletterDesc: 'Thành viên đăng nhập dùng ALPSMEMBER giảm 10% giá gốc cho sản phẩm chưa giảm giá; cộng được ALPSFREESHIP.',
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
      newsletterDesc: 'Thành viên đăng nhập dùng ALPSMEMBER giảm 10% giá gốc cho sản phẩm chưa giảm giá; cộng được ALPSFREESHIP.',
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
      newsletterDesc: 'Thành viên đăng nhập dùng ALPSMEMBER giảm 10% giá gốc cho sản phẩm chưa giảm giá; cộng được ALPSFREESHIP.',
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
    newsletterDesc: 'Thành viên đăng nhập dùng ALPSMEMBER giảm 10% giá gốc cho sản phẩm chưa giảm giá; cộng được ALPSFREESHIP.',
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
    <footer className={`bg-[#202022] text-[#fcf9f4] border-t border-[#31302d] ${isMobileFrame ? 'pb-24 pt-8 px-4' : 'pt-12 sm:pt-16 pb-24 sm:pb-16 px-4 sm:px-6'}`}>
      <div className={`${isMobileFrame ? 'w-full' : 'max-w-7xl mx-auto'}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#31302d]">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-3">
            <Link to="/" className="inline-block cursor-pointer" title={copy("Alps Skincare • Pure Essence")}>
              <AlpsLogo
                isDarkBackground
                className="items-start text-left"
              />
            </Link>
            <p className="text-xs text-[#c7c6ca] font-light leading-relaxed">
              {copy(t.footer.brandDesc)}
            </p>
            <Link
              to="/ve-alps"
              className="text-[11px] text-[#fed8c9] hover:underline flex items-center space-x-1 font-medium pt-1 cursor-pointer"
            >
              <span>{copy(t.footer.brandStoryLink)}</span>
              <span>{"→"}</span>
            </Link>
            <div className="pt-2 text-[11px] text-[#898789] space-y-1">
              <p><span className="text-[#fed8c9] font-medium">{copy(t.footer.branchLabel)}</span> {copy(t.footer.branchAddress)}</p>
            </div>
            {/* Facebook Fanpage link in Brand column */}
            <div className="pt-1">
              <a
                href="https://www.facebook.com/alpspuressence/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-[11px] text-[#fed8c9] hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-full border border-white/10 transition-colors"
                title={copy("Ghé thăm Fanpage Facebook Alps Skincare")}
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>{copy("Fanpage Facebook")}</span>
                <span className="text-[10px]">{"↗"}</span>
              </a>
            </div>
            {/* Language Selector in Footer */}
            <div className="pt-2">
              <LanguageSelector variant="footer" />
            </div>
            {/* Visa payment images directly under HCM branch */}
            <div className="pt-2.5 space-y-1.5">
              <span className="block text-[10px] text-[#fed8c9] font-medium tracking-wide uppercase">
                {copy(t.footer.acceptPayment)}
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                <VietQRBadge className="h-6" />
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <Link
              to="/san-pham"
              className="text-xs font-semibold tracking-widest text-[#fed8c9] hover:underline uppercase block"
            >
              {copy(t.footer.collectionTitle)} {" →"}</Link>
            <ul className="space-y-2 text-xs text-[#c7c6ca]">
              {PRODUCTS.map((prod) => (
                <li key={prod.id}>
                  <Link
                    to={getProductPath(prod)}
                    className="hover:text-[#fed8c9] transition-colors block py-0.5"
                  >
                    {copy(prod.name)} {" ("}{copy(prod.capacity.split('•')[0].trim())}{")"}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care & Support */}
          <div className="space-y-3">
            <Link
              to="/lien-he"
              className="text-xs font-semibold tracking-widest text-[#fed8c9] hover:underline uppercase flex items-center space-x-1.5"
            >
              <Headphones className="w-3.5 h-3.5 text-[#fed8c9]" />
              <span>{copy(t.footer.supportTitle)} {" →"}</span>
            </Link>
            <ul className="space-y-2 text-xs text-[#c7c6ca]">
              <li className="flex items-start space-x-2">
                <span className="text-[#fed8c9] shrink-0">{copy("Địa chỉ:")}</span>
                <span className="text-white">{copy("30 Trịnh Đình Thảo, Tân Phú, Thành Phố Hồ Chí Minh")}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#fed8c9]">{copy(t.footer.hotlineLabel)}</span>
                <a href="tel:0772770134" className="text-white font-bold hover:text-[#fed8c9] transition-colors">
                  {"0772 770 134"}</a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#fed8c9]">{copy(t.footer.emailLabel)}</span>
                <a href="mailto:pure@alps.vn" className="hover:text-white transition-colors">
                  {copy("pure@alps.vn")}</a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#fed8c9]">{copy(t.footer.websiteLabel)}</span>
                <a href="https://alps.id.vn" target="_blank" rel="noopener noreferrer" className="hover:text-[#fed8c9] text-white font-medium transition-colors">
                  {copy("alps.id.vn")}</a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#fed8c9]">{copy("Fanpage Tư Vấn:")}</span>
                <a
                  href="https://www.facebook.com/alpspuressence/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#fed8c9] text-white font-medium transition-colors flex items-center space-x-1"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>{copy("Chat Messenger 24/7")}</span>
                  <span className="text-[10px] text-[#fed8c9]">{"↗"}</span>
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#fed8c9]">{copy("Facebook:")}</span>
                <a
                  href="https://www.facebook.com/alpspuressence/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#fed8c9] text-white font-medium transition-colors flex items-center space-x-1"
                >
                  <span>{copy("Alps Skincare Official")}</span>
                  <span className="text-[10px] text-[#fed8c9]">{"↗"}</span>
                </a>
              </li>
              <li
                onClick={() => onOpenPolicies ? onOpenPolicies('returns') : undefined}
                className="hover:text-white cursor-pointer transition-colors flex items-center space-x-1"
              >
                <span>{copy(t.footer.returnPolicy)}</span>
                <span className="text-[10px] text-[#fed8c9]">{"↗"}</span>
              </li>
              <li
                onClick={() => onOpenPolicies ? onOpenPolicies('shipping') : undefined}
                className="hover:text-white cursor-pointer transition-colors flex items-center space-x-1"
              >
                <span>{copy(t.footer.shippingPolicy)}</span>
                <span className="text-[10px] text-[#fed8c9]">{"↗"}</span>
              </li>
              {onOpenFontSwitcher && (
                <li
                  onClick={onOpenFontSwitcher}
                  className="hover:text-white cursor-pointer transition-colors flex items-center space-x-1.5 text-[#fed8c9]"
                  title={copy("Thay đổi font chữ website")}
                >
                  <Type className="w-3.5 h-3.5 text-[#fed8c9]" />
                  <span className="underline decoration-dotted">{copy("Tùy chọn phong cách font chữ")}</span>
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
                  <span>{copy(footerI18n.openSupportBtn)}</span>
                </button>
              </div>
            )}
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest text-[#fed8c9] uppercase">
              {copy(footerI18n.newsletterTitle)}
            </h4>
            <p className="text-xs text-[#c7c6ca]">
              {copy(footerI18n.newsletterDesc)}
            </p>
            <div className="flex rounded-full overflow-hidden bg-[#31302d] p-1 border border-[#46464a]">
              <input
                type="email"
                placeholder={copy(footerI18n.emailPlaceholder)}
                className="bg-transparent text-xs text-white px-3 py-1.5 focus:outline-none flex-grow min-w-0"
              />
              <button
                className="bg-white hover:bg-[#fed8c9] text-[#1c1c19] px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center shrink-0 cursor-pointer"
                title={copy(footerI18n.subscribeBtn)}
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="text-[10px] text-[#898789] pt-1">
              {copy(footerI18n.workingHours)}
            </div>
          </div>
        </div>

        <AlpsConnections />

        {/* Accepted Payment Methods Strip (Visa, Mastercard, JCB, Napas, VietQR, MoMo, Apple Pay) */}
        <div className="py-6 border-b border-[#31302d] flex flex-col md:flex-row items-center justify-between gap-4">
          <PaymentBadgesGroup theme="dark" showLabel={true} badgeSize="h-7" />
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] text-[#898789]">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#fed8c9]" />
              <span>{copy(footerI18n.sslSecurity)}</span>
            </div>
            <span className="hidden sm:inline">{"•"}</span>
            <div className="flex items-center space-x-1.5">
              <HeartHandshake className="w-4 h-4 text-[#fed8c9]" />
              <span>{copy(footerI18n.inspectionTrust)}</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#898789] gap-3 text-center sm:text-left">
          <p>{copy("© 2026 Alps Pure Essence. All rights reserved.")}</p>
          <div className="flex flex-wrap items-center justify-center space-x-3 text-[11px]">
            <button
              onClick={() => onOpenPolicies ? onOpenPolicies('privacy') : undefined}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {copy(footerI18n.privacyPolicy)}
            </button>
            <span>{"•"}</span>
            <button
              onClick={() => onOpenPolicies ? onOpenPolicies('returns') : undefined}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {copy(footerI18n.returnsRefunds)}
            </button>
            <span>{"•"}</span>
            <button
              onClick={() => onOpenPolicies ? onOpenPolicies('shipping') : undefined}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {copy(footerI18n.shippingTerms)}
            </button>
            <span>{"•"}</span>
            {onOpenSupport ? (
              <button
                onClick={onOpenSupport}
                className="hover:text-[#fed8c9] text-[#c7c6ca] underline underline-offset-2 transition-colors cursor-pointer"
              >
                {copy(footerI18n.support247)}
              </button>
            ) : (
              <span className="hover:text-white cursor-pointer">{copy("Hotline: 0772 770 134")}</span>
            )}
            <span>{"•"}</span>
            <a href="mailto:pure@alps.vn" className="hover:text-white transition-colors">{copy("pure@alps.vn")}</a>
            <span>{"•"}</span>
            <a href="https://alps.id.vn" target="_blank" rel="noopener noreferrer" className="hover:text-[#fed8c9] text-white font-medium transition-colors">{copy("alps.id.vn")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
