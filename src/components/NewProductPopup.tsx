import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import popupAd from '../assets/images/alps-voucher-popup.webp';
import './NewProductPopup.css';

const VISIT_KEY = 'alps_voucher_ad_2010_v4';

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
    }, 600);
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
    <dialog ref={dialog} className="alps-launch" aria-label="Ưu đãi đặc biệt ALPS"
      onClose={dismiss} onCancel={dismiss} onClick={event => { if (event.target === event.currentTarget) dismiss(); }}>
      <div className="alps-launch-ad">
        <button className="alps-launch-close" aria-label="Đóng quảng cáo" onClick={dismiss} autoFocus><X size={20} /></button>
        <button className="alps-launch-image-link" aria-label="Xem voucher ưu đãi ALPS" onClick={() => { dismiss(); onExplore(); }}>
          <span className="alps-launch-art"><img src={popupAd} alt="Bộ quà tặng ALPS màu hồng" /></span>
          <span className="alps-launch-offers">
            <span className="alps-launch-offers-title">ƯU ĐÃI DÀNH CHO NÀNG</span>
            <span className="alps-launch-rates">
              <span><strong>20%</strong><span>Hàng lẻ</span><small>PHUNU20</small></span>
              <span><strong>15%</strong><span>Combo</span><small>ALPS2010</small></span>
              <span><strong>10%</strong><span>Thành viên</span><small>ALPS2025</small></span>
            </span>
            <span className="alps-launch-terms">Mỗi đơn một mã • Thành viên cần đăng nhập</span>
            <span className="alps-launch-cta">XEM VOUCHER</span>
          </span>
        </button>
      </div>
    </dialog>, document.body
  );
}
