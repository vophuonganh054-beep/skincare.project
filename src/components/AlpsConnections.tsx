import { useCopy } from '../i18n/useCopy';
import React from 'react';
import { Globe, MapPin, ArrowUpRight } from 'lucide-react';
import { SiFacebook, SiShopee, SiTiktok } from 'react-icons/si';

const channels = [
  { label: 'Website', detail: 'alps.id.vn', href: 'https://alps.id.vn/', icon: Globe, color: '#fed8c9' },
  { label: 'Shopee', detail: 'alpsvietnam', href: 'https://shopee.vn/alpsvietnam', icon: SiShopee, color: '#ee4d2d' },
  { label: 'Facebook', detail: 'ALPS Pure Essence', href: 'https://www.facebook.com/alpspuressence/', icon: SiFacebook, color: '#67a5ff' },
  { label: 'TikTok', detail: 'Khám phá ALPS', href: 'https://vt.tiktok.com/ZSgk53dkh/', icon: SiTiktok, color: '#ffffff' },
  { label: 'Đường đi tới', detail: 'Xem trên Google Maps', href: 'https://maps.app.goo.gl/eTypBqPRKdFc6FU28', icon: MapPin, color: '#8dccac' },
];

export function AlpsConnections() {
  const copy = useCopy();
  return (
    <section aria-labelledby="alps-connections-heading" className="py-8 border-b border-[#31302d]">
      <h2 id="alps-connections-heading" className="text-sm font-semibold tracking-wider text-[#fed8c9] mb-4">{copy("KẾT NỐI VỚI ALPS")}</h2>
      <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-5 gap-3">
        {channels.map(({label, detail, href, icon: Icon, color}) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${copy(label)} – ${copy(detail)}`}
            className="group flex items-center gap-3 min-w-0 p-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#fed8c9]/40 transition-colors">
            <span className="w-9 h-9 shrink-0 rounded-full bg-white/5 flex items-center justify-center" style={{color}}><Icon className="w-5 h-5" aria-hidden="true" /></span>
            <span className="flex-1 min-w-0"><span className="block text-xs font-semibold text-white">{copy(label)}</span><span className="block text-[10px] text-[#c7c6ca] mt-0.5 break-words">{copy(detail)}</span></span>
            <ArrowUpRight className="w-3 h-3 shrink-0 text-[#898789] group-hover:text-[#fed8c9]" aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}
