import React from 'react';
import { Home, LayoutGrid, ShoppingBag, Sparkles, User, Info, Headphones } from 'lucide-react';
import { ActiveTab } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useRouter, Link } from '../context/RouterContext';

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
  const { pathname } = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#ffffff]/95 backdrop-blur-lg border-t border-[#202022]/8 py-1.5 px-1 xs:px-2 safe-area-bottom shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around gap-0.5">
        {/* Trang chủ */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center flex-1 min-w-0 py-1 transition-colors cursor-pointer ${
            pathname === '/' ? 'text-[#1c1c19]' : 'text-[#77767b] hover:text-[#1c1c19]'
          }`}
        >
          <Home className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${pathname === '/' ? 'stroke-[2.25] text-[#1c1c19]' : 'stroke-[1.5]'}`} />
          <span className="text-[8.5px] xs:text-[9.5px] tracking-tight mt-0.5 font-medium uppercase truncate max-w-full px-0.5">
            {t.nav.home}
          </span>
        </Link>

        {/* Sản phẩm */}
        <Link
          to="/san-pham"
          className={`flex flex-col items-center justify-center flex-1 min-w-0 py-1 transition-colors cursor-pointer ${
            pathname.startsWith('/san-pham') ? 'text-[#1c1c19]' : 'text-[#77767b] hover:text-[#1c1c19]'
          }`}
        >
          <LayoutGrid className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${pathname.startsWith('/san-pham') ? 'stroke-[2.25] text-[#1c1c19]' : 'stroke-[1.5]'}`} />
          <span className="text-[8.5px] xs:text-[9.5px] tracking-tight mt-0.5 font-medium uppercase truncate max-w-full px-0.5">
            {t.nav.catalog}
          </span>
        </Link>

        {/* Giỏ hàng (chỉ hiện huy hiệu số lượng khi có sản phẩm > 0) */}
        {onOpenCart && (
          <button
            id="bottom-nav-cart-btn"
            onClick={onOpenCart}
            className="flex flex-col items-center justify-center flex-1 min-w-0 py-1 transition-colors relative cursor-pointer text-[#77767b] hover:text-[#1c1c19]"
          >
            <div className="relative">
              <ShoppingBag className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 min-w-[14px] h-[14px] px-0.5 bg-[#08080a] text-white text-[9px] font-bold rounded-full flex items-center justify-center pointer-events-none">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[8.5px] xs:text-[9.5px] tracking-tight mt-0.5 font-medium uppercase truncate max-w-full px-0.5">
              {t.nav.cart}
            </span>
          </button>
        )}

        {/* Về Alps */}
        <Link
          to="/ve-alps"
          className={`flex flex-col items-center justify-center flex-1 min-w-0 py-1 transition-colors cursor-pointer ${
            pathname === '/ve-alps' ? 'text-[#1c1c19]' : 'text-[#77767b] hover:text-[#1c1c19]'
          }`}
        >
          <Info className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${pathname === '/ve-alps' ? 'stroke-[2.25] text-[#74584d]' : 'stroke-[1.5]'}`} />
          <span className="text-[8.5px] xs:text-[9.5px] tracking-tight mt-0.5 font-medium uppercase truncate max-w-full px-0.5">
            Về Alps
          </span>
        </Link>

        {/* Liên hệ */}
        <Link
          to="/lien-he"
          className={`flex flex-col items-center justify-center flex-1 min-w-0 py-1 transition-colors cursor-pointer ${
            pathname === '/lien-he' ? 'text-[#1c1c19]' : 'text-[#77767b] hover:text-[#1c1c19]'
          }`}
        >
          <Headphones className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${pathname === '/lien-he' ? 'stroke-[2.25] text-[#74584d]' : 'stroke-[1.5]'}`} />
          <span className="text-[8.5px] xs:text-[9.5px] tracking-tight mt-0.5 font-medium uppercase truncate max-w-full px-0.5">
            Liên hệ
          </span>
        </Link>
      </div>
    </nav>
  );
};
