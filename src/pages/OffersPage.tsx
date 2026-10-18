import React from 'react';
import { Link } from '../context/RouterContext';
import { WomenDayCampaignSection } from '../components/WomenDayCampaignSection';
import type { CampaignCombo } from '../data/campaign2010';

interface OffersPageProps {
  onAddComboToCart: (combo: CampaignCombo) => void;
  onBuyNowCombo: (combo: CampaignCombo) => void;
  onApplyVoucherToCart: (code: string) => void;
  onShowToast: (message: string) => void;
}
export const OffersPage: React.FC<OffersPageProps> = props => (
  <div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-wrap items-center justify-between gap-3">
      <nav aria-label="Đường dẫn" className="text-xs text-[#74584d] flex items-center gap-2">
        <Link to="/" className="hover:underline">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <h1 className="font-semibold">Ưu đãi 20/10</h1>
      </nav>
      <Link to="/san-pham" className="text-xs font-semibold rounded-full bg-[#1c1c19] text-white px-5 py-2.5">Mua sắm với voucher</Link>
    </div>
    <WomenDayCampaignSection {...props} />
  </div>
);
