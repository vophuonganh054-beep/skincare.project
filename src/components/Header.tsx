import { useCopy } from '../i18n/useCopy';
import React, { useState } from 'react';
import { Search, Bell, ShoppingBag, Sparkles, X, User, Headphones, Type } from 'lucide-react';
import headerLogo from '../assets/images/alps-header-logo.png';
import { ViewMode, ActiveTab, UserProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { useRouter, Link } from '../context/RouterContext';

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  cartCount?: number;
  onOpenCart?: () => void;
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isMobileFrame?: boolean;
  user?: UserProfile | null;
  onOpenAccount?: () => void;
  onOpenSupport?: () => void;
  onOpenPolicies?: (tab?: 'returns' | 'privacy' | 'shipping') => void;
  onOpenFontSwitcher?: () => void;
  onOpenSkinQuiz?: () => void;
  onOpenBrandStory?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  onViewModeChange,
  cartCount = 0,
  onOpenCart,
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  isMobileFrame = false,
  user,
  onOpenAccount,
  onOpenSupport,
  onOpenPolicies,
  onOpenFontSwitcher,
  onOpenSkinQuiz,
  onOpenBrandStory,
}) => {
  const copy = useCopy();
  const { t, language } = useLanguage();
  const { pathname, navigate } = useRouter();
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const headerI18n = {
    vi: {
      desktopView: 'Máy tính',
      mobileView: 'Điện thoại',
      desktopTitle: 'Xem giao diện máy tính',
      mobileTitle: 'Xem giao diện điện thoại mô phỏng',
      searchTitle: 'Tìm kiếm sản phẩm',
      closeSearch: 'Đóng tìm kiếm',
      fontTitle: 'Tùy chọn phong cách font chữ',
      supportTitle: 'Chăm sóc khách hàng & Tư vấn da liễu 24/7',
      bellTitle: 'Thông báo',
      notifTitle: 'Thông báo thương hiệu',
      notif1Title: '✦ Ra mắt BST Pure Radiance 2026',
      notif1Desc: 'Tặng kèm thìa bạc cao cấp cho mọi đơn hàng có Alps Regenerating Cream.',
      notif2Title: 'Ưu đãi mã ALPSMEMBER',
      notif2Desc: 'Thành viên đăng nhập dùng ALPSMEMBER giảm 10% giá gốc cho sản phẩm chưa giảm giá; cộng được ALPSFREESHIP.',
      accountLogin: 'Đăng nhập / Đăng ký',
      cartTitle: 'Giỏ hàng của bạn',
    },
    en: {
      desktopView: 'Desktop',
      mobileView: 'Mobile',
      desktopTitle: 'View desktop interface',
      mobileTitle: 'View simulated mobile interface',
      searchTitle: 'Search products',
      closeSearch: 'Close search',
      fontTitle: 'Typography style switcher',
      supportTitle: 'Customer Care & 24/7 Skin Consultation',
      bellTitle: 'Notifications',
      notifTitle: 'Brand Notifications',
      notif1Title: '✦ Launching Pure Radiance 2026',
      notif1Desc: 'Complimentary luxury silver applicator spoon with every Alps Cream order.',
      notif2Title: 'Privilege Code ALPSMEMBER',
      notif2Desc: 'Thành viên đăng nhập dùng ALPSMEMBER giảm 10% giá gốc cho sản phẩm chưa giảm giá; cộng được ALPSFREESHIP.',
      accountLogin: 'Sign In / Register',
      cartTitle: 'Your Shopping Bag',
    },
    de: {
      desktopView: 'Desktop',
      mobileView: 'Mobil',
      desktopTitle: 'Desktop-Ansicht',
      mobileTitle: 'Mobile Simulation',
      searchTitle: 'Produkte suchen',
      closeSearch: 'Suche schließen',
      fontTitle: 'Typografie-Einstellungen',
      supportTitle: 'Kundenservice & 24/7 Hautberatung',
      bellTitle: 'Benachrichtigungen',
      notifTitle: 'Marken-Mitteilungen',
      notif1Title: '✦ Kollektion Pure Radiance 2026',
      notif1Desc: 'Inklusive Schweizer Silber-Spatel bei jeder Gesichtscreme-Bestellung.',
      notif2Title: 'Gutscheincode ALPSMEMBER',
      notif2Desc: 'Thành viên đăng nhập dùng ALPSMEMBER giảm 10% giá gốc cho sản phẩm chưa giảm giá; cộng được ALPSFREESHIP.',
      accountLogin: 'Anmelden / Registrieren',
      cartTitle: 'Ihr Warenkorb',
    },
    es: {
      desktopView: 'Escritorio',
      mobileView: 'Móvil',
      desktopTitle: 'Vista escritorio',
      mobileTitle: 'Vista móvil simulada',
      searchTitle: 'Buscar productos',
      closeSearch: 'Cerrar búsqueda',
      fontTitle: 'Estilo tipográfico',
      supportTitle: 'Atención al Cliente y Consulta Facial 24/7',
      bellTitle: 'Notificaciones',
      notifTitle: 'Avisos de la Marca',
      notif1Title: '✦ Colección Pure Radiance 2026',
      notif1Desc: 'Espátula de plata suiza de regalo con cada Alps Face Cream.',
      notif2Title: 'Código ALPSMEMBER',
      notif2Desc: 'Thành viên đăng nhập dùng ALPSMEMBER giảm 10% giá gốc cho sản phẩm chưa giảm giá; cộng được ALPSFREESHIP.',
      accountLogin: 'Iniciar Sesión / Registro',
      cartTitle: 'Tu Bolsa de Compras',
    },
    zh: {
      desktopView: '电脑端',
      mobileView: '手机端',
      desktopTitle: '桌面全屏视图',
      mobileTitle: '手机模拟视图',
      searchTitle: '搜索产品',
      closeSearch: '关闭搜索',
      fontTitle: '字体排版风格切换',
      supportTitle: '客户服务与 24/7 皮肤科咨询',
      bellTitle: '通知提醒',
      notifTitle: '品牌最新资讯',
      notif1Title: '✦ 2026 纯净焕彩新系列发布',
      notif1Desc: '随单赠送瑞士定制奢华银质面霜勺。',
      notif2Title: '尊享礼券 ALPSMEMBER',
      notif2Desc: 'Thành viên đăng nhập dùng ALPSMEMBER giảm 10% giá gốc cho sản phẩm chưa giảm giá; cộng được ALPSFREESHIP.',
      accountLogin: '登录 / 注册会员',
      cartTitle: '您的专属购物袋',
    },
  }[language] || {
    desktopView: 'Desktop',
    mobileView: 'Mobile',
    desktopTitle: 'View desktop interface',
    mobileTitle: 'View simulated mobile interface',
    searchTitle: 'Search products',
    closeSearch: 'Close search',
    fontTitle: 'Typography style switcher',
    supportTitle: 'Customer Care & 24/7 Skin Consultation',
    bellTitle: 'Notifications',
    notifTitle: 'Brand Notifications',
    notif1Title: '✦ Launching Pure Radiance 2026',
    notif1Desc: 'Complimentary luxury silver applicator spoon with every Alps Cream order.',
    notif2Title: 'Privilege Code ALPSMEMBER',
    notif2Desc: 'Thành viên đăng nhập dùng ALPSMEMBER giảm 10% giá gốc cho sản phẩm chưa giảm giá; cộng được ALPSFREESHIP.',
    accountLogin: 'Sign In / Register',
    cartTitle: 'Your Shopping Bag',
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fcf9f4]/90 backdrop-blur-md border-b border-[#202022]/5">
      {/* Top Announcement Bar - visible in desktop or wide view */}
      {!isMobileFrame && (
        <div className="bg-[#202022] text-[#fcf9f4] text-xs py-1.5 px-4 hidden md:flex items-center justify-between tracking-wider font-light">
          <div className="flex items-center space-x-2 text-[11px] mx-auto overflow-hidden text-ellipsis whitespace-nowrap px-2">
            <span className="text-[#fed8c9] shrink-0">{"✦"}</span>
            <span className="truncate max-w-[550px]">{copy(t.announcement)}</span>
            <span className="text-[#fed8c9] shrink-0">{"✦"}</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] shrink-0 whitespace-nowrap">
            <a
              href="https://www.facebook.com/alpspuressence/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#fed8c9] hover:underline flex items-center space-x-1.5 transition-colors"
              title={copy("Chat Fanpage Facebook với Tư Vấn Viên Alps")}
            >
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>{copy("Fanpage Tư Vấn")}</span>
            </a>
            {onOpenSupport && (
              <button
                onClick={onOpenSupport}
                className="text-[#fed8c9] hover:underline flex items-center space-x-1"
              >
                <Headphones className="w-3 h-3" />
                <span>{copy(t.csHotline)}</span>
              </button>
            )}
            <span className="opacity-75">{copy(t.zurichHQ)}</span>
            <LanguageSelector variant="topbar" />
          </div>
        </div>
      )}

      {/* Main Bar */}
      <div className={`px-3 sm:px-6 ${isMobileFrame ? 'py-2' : 'py-2.5 sm:py-3 max-w-[1536px] mx-auto'} flex flex-nowrap items-center justify-between gap-2 lg:gap-5 w-full`}>
        {/* Left: Brand Logo (Anchored, never squished) */}
        <Link
          to="/"
          className="cursor-pointer select-none group flex items-center justify-center flex-shrink-0 w-[76px]"
          title={copy("Alps Skincare • Pure Essence")}
        >
          <svg viewBox="187 261 847 659" role="img" aria-label={copy("ALPS Pure Essence")} className="block w-[76px] h-[59px] shrink-0">
            <image href={headerLogo} width="1242" height="1242" />
          </svg>
        </Link>

        {/* Center: Desktop Navigation Links */}
        {!isMobileFrame && (
          <nav className="hidden lg:flex flex-1 min-w-0 flex-nowrap overflow-x-auto scrollbar-none gap-x-2 xl:gap-x-3 items-center justify-evenly text-[10px] xl:text-xs font-semibold tracking-normal text-[#46464a] whitespace-nowrap py-1 px-1 [&>*]:shrink-0 [&>*]:min-h-8 [&>*]:flex [&>*]:items-center [&>*]:justify-center">
            <Link
              to="/"
              className={`transition-colors hover:text-[#1c1c19] py-1.5 whitespace-nowrap cursor-pointer ${
                pathname === '/'
                  ? 'text-[#1c1c19] font-bold underline underline-offset-4 decoration-[#74584d]'
                  : ''
              }`}
            >
              {copy(t.nav.home)}
            </Link>
            <Link
              to="/san-pham"
              className={`transition-colors hover:text-[#1c1c19] py-1.5 whitespace-nowrap cursor-pointer ${
                pathname.startsWith('/san-pham')
                  ? 'text-[#1c1c19] font-bold underline underline-offset-4 decoration-[#74584d]'
                  : ''
              }`}
            >
              {copy(t.nav.catalog)}
            </Link>
            <Link
              to="/ve-alps"
              className={`transition-colors hover:text-[#1c1c19] py-1.5 whitespace-nowrap cursor-pointer ${
                pathname === '/ve-alps'
                  ? 'text-[#1c1c19] font-bold underline underline-offset-4 decoration-[#74584d]'
                  : ''
              }`}
            >
              {copy("VỀ ALPS")}</Link>
            <Link
              to="/lien-he"
              className={`transition-colors hover:text-[#1c1c19] py-1.5 whitespace-nowrap cursor-pointer ${
                pathname === '/lien-he'
                  ? 'text-[#1c1c19] font-bold underline underline-offset-4 decoration-[#74584d]'
                  : ''
              }`}
            >
              {copy("LIÊN HỆ")}</Link>
            <button
              onClick={() => onSelectTab('routine')}
              className={`transition-colors hover:text-[#1c1c19] py-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'routine'
                  ? 'text-[#1c1c19] font-bold underline underline-offset-4 decoration-[#74584d]'
                  : ''
              }`}
            >
              {copy(t.nav.routine)}
            </button>
            <button
              onClick={() => {
                if (onOpenAccount) onOpenAccount();
                else onSelectTab('account');
              }}
              className={`transition-colors hover:text-[#1c1c19] py-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'account'
                  ? 'text-[#1c1c19] font-bold underline underline-offset-4 decoration-[#74584d]'
                  : ''
              }`}
            >
              {copy(t.nav.orders)}
            </button>
            <button
              onClick={() => navigate('/uu-dai-20-10')}
              className="transition-all hover:text-[#ba1a1a] text-[#8b5545] font-semibold py-1.5 px-2 rounded-full bg-[#fcf5f1] border border-[#fed8c9] hover:bg-[#fed8c9]/60 flex items-center space-x-1.5 whitespace-nowrap cursor-pointer shadow-xs text-[10px] xl:text-xs"
            >
              <span>{"🌸"}</span>
              <span>{copy("Ưu Đãi 20/10")}</span>
            </button>
            {onOpenSkinQuiz && (
              <button
                onClick={onOpenSkinQuiz}
                className="transition-all hover:scale-105 active:scale-95 px-2 py-1.5 rounded-full bg-[#f4ede4] hover:bg-[#ebdccf] text-[#74584d] font-semibold flex items-center space-x-1.5 border border-[#fed8c9]/80 shadow-xs cursor-pointer whitespace-nowrap text-[10px] xl:text-xs"
              >
                <Sparkles className="w-4 h-4 text-[#74584d] shrink-0" />
                <span>{copy(t.nav.quiz)}</span>
              </button>
            )}
          </nav>
        )}

        {/* Right Side Controls - Anchored & Overflow Proof */}
        <div className="flex min-w-0 max-w-full flex-wrap sm:flex-nowrap gap-1 sm:gap-1.5 md:gap-2 items-center justify-end shrink-0 [&>button]:h-8 [&>button]:w-8 [&>button]:p-1.5">
          {/* Search Toggle / Input */}
          {showSearchInput ? (
            <div className="relative flex items-center shrink-0">
              <Search className="w-3.5 h-3.5 text-[#77767b] absolute left-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={copy(t.searchPlaceholder)}
                className="pl-8 pr-7 py-1 text-xs bg-[#f0ede9] rounded-full focus:outline-none focus:ring-1 focus:ring-[#74584d] w-24 sm:w-36 md:w-44 transition-all text-[#1c1c19]"
                autoFocus
              />
              <button
                onClick={() => {
                  setShowSearchInput(false);
                  onSearchChange('');
                }}
                className="absolute right-2 text-[#77767b] hover:text-[#1c1c19] cursor-pointer"
                title={copy(headerI18n.closeSearch)}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              id="header-search-btn"
              onClick={() => setShowSearchInput(true)}
              className="p-1.5 text-[#1c1c19] hover:bg-[#f0ede9] rounded-full transition-colors shrink-0 cursor-pointer"
              title={copy(headerI18n.searchTitle)}
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
            </button>
          )}

          {/* Multi-language Selector (EN, VI, DE, ES, ZH) */}
          <LanguageSelector variant="header" className="flex items-center [&>button]:h-8" />

          {/* Brand Typography Preset Switcher */}
          {onOpenFontSwitcher && (
            <button
              id="header-font-btn"
              onClick={onOpenFontSwitcher}
              className="p-1.5 text-[#1c1c19] hover:bg-[#f0ede9] rounded-full transition-colors hidden sm:flex items-center space-x-1 shrink-0 cursor-pointer"
              title={copy(headerI18n.fontTitle)}
            >
              <Type className="w-4 h-4 text-[#74584d]" />
            </button>
          )}

          {/* Customer Support Button (Desktop/Tablet) */}
          {onOpenSupport && (
            <button
              id="header-support-btn"
              onClick={onOpenSupport}
              className="p-1.5 text-[#1c1c19] hover:bg-[#f0ede9] rounded-full transition-colors relative hidden sm:block shrink-0 cursor-pointer"
              title={copy(headerI18n.supportTitle)}
            >
              <Headphones className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#8a9a86] rounded-full ring-2 ring-[#fcf9f4]" />
            </button>
          )}

          {/* Notifications button with indicator dot */}
          <div className="relative hidden sm:flex sm:items-center">
            <button
              id="header-bell-btn"
              onClick={() => setShowNotification(!showNotification)}
              className="p-1.5 text-[#1c1c19] hover:bg-[#f0ede9] rounded-full transition-colors relative"
              title={copy(headerI18n.bellTitle)}
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#ba1a1a] rounded-full ring-2 ring-[#fcf9f4]" />
            </button>

            {showNotification && (
              <div className="absolute right-0 mt-2 w-72 bg-[#ffffff] border border-[#ebe8e3] rounded-2xl shadow-xl p-3.5 z-50 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#f0ede9]">
                  <span className="font-medium text-[#1c1c19]">{copy(headerI18n.notifTitle)}</span>
                  <button
                    onClick={() => setShowNotification(false)}
                    className="text-[#77767b] hover:text-[#1c1c19]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="py-2.5 space-y-2">
                  <div className="p-2 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3]/60">
                    <p className="font-medium text-[#74584d]">{copy(headerI18n.notif1Title)}</p>
                    <p className="text-[#46464a] text-[11px] mt-0.5">
                      {copy(headerI18n.notif1Desc)}
                    </p>
                  </div>
                  <div className="p-2 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3]/60">
                    <p className="font-medium text-[#1c1c19]">{copy(headerI18n.notif2Title)}</p>
                    <p className="text-[#46464a] text-[11px] mt-0.5">
                      {copy(headerI18n.notif2Desc)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Account / Order History Button */}
          {onOpenAccount && (
            <button
              id="header-account-btn"
              onClick={onOpenAccount}
              className="p-1.5 text-[#1c1c19] hover:bg-[#f0ede9] rounded-full transition-colors flex items-center space-x-1"
              title={copy(user ? `${user.name} - ${t.nav.orders}` : headerI18n.accountLogin)}
            >
              {user ? (
                <div className="w-6 h-6 rounded-full bg-[#74584d] text-white text-[10px] font-medium flex items-center justify-center shadow-xs">
                  {user.avatarInitials}
                </div>
              ) : (
                <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              )}
            </button>
          )}

          {/* Shopping Bag Button (No badge when empty) */}
          {onOpenCart && (
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="p-1.5 text-[#1c1c19] hover:bg-[#f0ede9] rounded-full transition-colors relative shrink-0 cursor-pointer"
              title={copy(headerI18n.cartTitle)}
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 bg-[#1c1c19] text-white text-[10px] font-semibold rounded-full flex items-center justify-center pointer-events-none">
                  {copy(cartCount)}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* 20/10 Campaign Banner Strip across all devices */}
      <div className="bg-gradient-to-r from-[#8b5545] via-[#9e6353] to-[#74584d] text-white text-[10px] sm:text-xs py-1.5 px-2 sm:px-3 flex items-center justify-center space-x-1.5 sm:space-x-2 tracking-wide font-medium shadow-xs overflow-hidden max-w-full">
        <span className="text-amber-200 animate-pulse text-xs shrink-0">{"🌸"}</span>
        <button
          type="button"
          onClick={() => navigate('/uu-dai-20-10')}
          className="hover:underline cursor-pointer flex items-center space-x-1.5 truncate max-w-full min-w-0"
        >
          <span className="font-bold text-amber-200 uppercase tracking-wider text-[8.5px] sm:text-[10px] bg-black/25 px-1.5 sm:px-2 py-0.5 rounded-full shrink-0">
            {copy("20/10 TRI ÂN")}</span>
          <span className="truncate text-white/95 text-[10px] sm:text-xs">
            {copy("Nhập mã ")}<strong className="text-amber-200 underline font-bold">{copy("ALPS25K")}</strong> {copy(" giảm 20%, tối đa 25.000đ • Đơn từ 200.000đ • Cộng được ALPSFREESHIP")}</span>
          <span className="text-amber-200 underline underline-offset-2 ml-1 hidden md:inline shrink-0 font-bold">
            {copy("Voucher & 3 Combo →")}</span>
        </button>
        <span className="text-amber-200 animate-pulse text-xs shrink-0">{"🌸"}</span>
      </div>
    </header>
  );
};
