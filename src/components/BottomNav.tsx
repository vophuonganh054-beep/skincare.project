import React from 'react';
import { Home, LayoutGrid, ShoppingBag, Sparkles, User } from 'lucide-react';
import { ActiveTab } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface BottomNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  cartCount = 0,
  onOpenCart,
}) => {
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#ffffff]/95 backdrop-blur-lg border-t border-[#202022]/8 py-2 px-3 safe-area-bottom shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* Trang chủ */}
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeTab === 'home' ? 'text-[#1c1c19]' : 'text-[#77767b] hover:text-[#1c1c19]'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.25]' : 'stroke-[1.5]'}`} />
          <span className="text-[10px] tracking-wider mt-1 font-medium uppercase whitespace-nowrap">
            {t.nav.home}
          </span>
        </button>

        {/* Danh mục */}
        <button
          onClick={() => onSelectTab('catalog')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeTab === 'catalog' ? 'text-[#1c1c19]' : 'text-[#77767b] hover:text-[#1c1c19]'
          }`}
        >
          <LayoutGrid className={`w-5 h-5 ${activeTab === 'catalog' ? 'stroke-[2.25]' : 'stroke-[1.5]'}`} />
          <span className="text-[10px] tracking-wider mt-1 font-medium uppercase whitespace-nowrap">
            {t.nav.catalog}
          </span>
        </button>

        {/* Ưu Đãi 20/10 */}
        <button
          onClick={() => {
            const el = document.getElementById('campaign-2010');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center justify-center flex-1 py-1 text-[#8b5545] hover:text-[#ba1a1a] transition-colors cursor-pointer"
          title="Chiến dịch 20/10"
        >
          <span className="text-base leading-none">🌸</span>
          <span className="text-[9.5px] tracking-wider mt-0.5 font-bold uppercase whitespace-nowrap text-[#8b5545]">
            20/10
          </span>
        </button>

        {/* Giỏ hàng (chỉ hiện huy hiệu số lượng khi có sản phẩm > 0) */}
        {onOpenCart && (
          <button
            id="bottom-nav-cart-btn"
            onClick={onOpenCart}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors relative cursor-pointer ${
              activeTab === 'cart' ? 'text-[#1c1c19]' : 'text-[#77767b] hover:text-[#1c1c19]'
            }`}
          >
            <div className="relative">
              <ShoppingBag className={`w-5 h-5 ${activeTab === 'cart' ? 'stroke-[2.25]' : 'stroke-[1.5]'}`} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 min-w-[14px] h-[14px] px-0.5 bg-[#08080a] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-wider mt-1 font-medium uppercase whitespace-nowrap">
              {t.nav.cart}
            </span>
          </button>
        )}

        {/* Nghi thức Alps */}
        <button
          onClick={() => onSelectTab('routine')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeTab === 'routine' ? 'text-[#1c1c19]' : 'text-[#77767b] hover:text-[#1c1c19]'
          }`}
        >
          <Sparkles className={`w-5 h-5 ${activeTab === 'routine' ? 'stroke-[2.25] text-[#74584d]' : 'stroke-[1.5]'}`} />
          <span className="text-[10px] tracking-wider mt-1 font-medium uppercase whitespace-nowrap">
            {t.nav.routine}
          </span>
        </button>

        {/* Tài khoản / Đã mua */}
        <button
          onClick={() => onSelectTab('account')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeTab === 'account' ? 'text-[#1c1c19]' : 'text-[#77767b] hover:text-[#1c1c19]'
          }`}
          title={t.nav.orders}
        >
          <User className={`w-5 h-5 ${activeTab === 'account' ? 'stroke-[2.25]' : 'stroke-[1.5]'}`} />
          <span className="text-[9.5px] sm:text-[10px] tracking-wider mt-1 font-medium uppercase whitespace-nowrap">
            {t.nav.orders === 'DANH MỤC ĐÃ MUA' ? 'ĐÃ MUA' : t.nav.orders}
          </span>
        </button>
      </div>
    </nav>
  );
};
