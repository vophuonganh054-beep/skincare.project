import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, Gift, Sparkles, X } from 'lucide-react';
import giftSet from '../assets/images/launch-gift-set.webp';
import giftBag from '../assets/images/launch-gift-bag.webp';
import './NewProductPopup.css';

const VISIT_KEY = 'alps_gift_launch_2010_v1';

export function NewProductPopup({ enabled, onExplore }: { enabled: boolean; onExplore: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const shown = useRef(false);

  useEffect(() => {
    if (!enabled || shown.current) return;
    try { if (sessionStorage.getItem(VISIT_KEY)) return; } catch {}
    const timer = window.setTimeout(() => {
      shown.current = true;
      try { sessionStorage.setItem(VISIT_KEY, '1'); } catch {}
      setOpen(true);
    }, 1400);
    return () => window.clearTimeout(timer);
  }, [enabled]);

  useEffect(() => {
    const node = dialog.current;
    if (!node || !open || !enabled) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      node.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [open, enabled]);

  const dismiss = () => setOpen(false);
  return createPortal(
    <dialog ref={dialog} className="alps-launch" aria-labelledby="alps-launch-title" aria-describedby="alps-launch-description"
      onClose={dismiss} onCancel={dismiss} onClick={event => { if (event.target === event.currentTarget) dismiss(); }}>
      <div className="alps-launch-card">
        <button className="alps-launch-close" aria-label="Đóng giới thiệu sản phẩm mới" onClick={dismiss} autoFocus><X size={20} /></button>
        <div className="alps-launch-copy">
          <span className="alps-launch-eyebrow"><Sparkles size={14} /> ALPS • BỘ QUÀ MỚI 20/10</span>
          <p className="alps-launch-kicker">Một món quà. Ngàn yêu thương.</p>
          <h2 id="alps-launch-title">Dành cho nàng<span>Rạng rỡ<br className="alps-launch-desktop-break" /> theo cách riêng.</span></h2>
          <p id="alps-launch-description" className="alps-launch-description">Khám phá bộ quà chăm sóc da 5 bước trong thiết kế hộp hồng thanh lịch, dành tặng người phụ nữ bạn trân quý.</p>
          <div className="alps-launch-offer">
            <div><span>ƯU ĐÃI</span><strong>20<small>%</small></strong></div>
            <div className="alps-launch-code"><span>NHẬP MÃ</span><b>PHUNU20</b><span>khi thanh toán</span></div>
          </div>
          <p className="alps-launch-gift"><Gift size={16} /> Bộ sản phẩm &amp; hộp quà ALPS</p>
          <button className="alps-launch-cta" onClick={() => { dismiss(); onExplore(); }}>Khám phá quà cho nàng <ArrowRight size={18} /></button>
          <button className="alps-launch-later" onClick={dismiss}>Để mình xem sau</button>
        </div>
        <div className="alps-launch-art">
          <div className="alps-launch-halo" />
          <span className="alps-launch-edition">THE GIFT OF RADIANCE <span>20 / 10</span></span>
          <img className="alps-launch-set" src={giftSet} alt="Bộ quà ALPS với sữa rửa mặt, serum, kem dưỡng, toner và mặt nạ trong hộp hồng" />
          <img className="alps-launch-bag" src={giftBag} alt="Thiết kế túi và thiệp quà tặng ALPS màu hồng" />
          <span className="alps-launch-spark alps-launch-spark-one" aria-hidden="true">✦</span>
          <span className="alps-launch-spark alps-launch-spark-two" aria-hidden="true">✧</span>
          <p className="alps-launch-signature">ALPS <span>PURE ESSENCE</span></p>
        </div>
      </div>
    </dialog>, document.body
  );
}
