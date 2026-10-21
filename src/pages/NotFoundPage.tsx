import { useCopy } from '../i18n/useCopy';
import React from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { Compass, ArrowLeft, Home, ShoppingBag } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const copy = useCopy();
  const { pathname } = useRouter();

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#fcf9f4]">
      <div className="bg-white rounded-3xl border border-[#202022]/10 p-8 sm:p-12 max-w-md w-full text-center shadow-lg space-y-5">
        <div className="w-16 h-16 rounded-full bg-[#fed8c9]/50 text-[#74584d] flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <span className="text-4xl sm:text-5xl font-serif font-bold text-[#1c1c19]">{"404"}</span>
          <h1 className="text-lg sm:text-xl font-serif text-[#1c1c19]">{copy("Trang Không Tồn Tại")}</h1>
          <p className="text-xs text-[#77767b] leading-relaxed pt-1">
            {copy("Đường dẫn \"")}<span className="font-mono text-[#1c1c19]">{pathname}</span>{copy("\" không có trên hệ thống hoặc đã được di chuyển.")}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
          <Link
            to="/"
            className="px-5 py-2.5 bg-[#202022] hover:bg-[#74584d] text-white text-xs font-semibold rounded-xl flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{copy("Về Trang Chủ")}</span>
          </Link>
          <Link
            to="/san-pham"
            className="px-5 py-2.5 bg-[#f4ede4] hover:bg-[#ebdccf] text-[#74584d] text-xs font-semibold rounded-xl flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{copy("Xem Sản Phẩm")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
