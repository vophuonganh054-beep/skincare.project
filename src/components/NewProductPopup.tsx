import { useCopy } from '../i18n/useCopy';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import popupAd from '../assets/images/alps-voucher-popup.webp';
import './NewProductPopup.css';

const VISIT_KEY = 'alps_voucher_ad_2010_v5';

export function NewProductPopup({ enabled, onExplore }: { enabled: boolean; onExplore: () => void }) {
  const copy = useCopy();
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
    <dialog ref={dialog} className="alps-launch" aria-label={copy("Ưu đãi đặc biệt ALPS")}
      onClose={dismiss} onCancel={dismiss} onClick={event => { if (event.target === event.currentTarget) dismiss(); }}>
      <div className="alps-launch-ad">
        <button className="alps-launch-close" aria-label={copy("Đóng quảng cáo")} onClick={dismiss} autoFocus><X size={20} /></button>
        <button className="alps-launch-image-link" aria-label={copy("Xem voucher ưu đãi ALPS")} onClick={() => { dismiss(); onExplore(); }}>
          <img src={popupAd} alt={copy("ALPS giảm 20% toàn sàn, tự động áp dụng không cần mã. Nhấn để xem ưu đãi.")} />
        </button>
        <p className="alps-launch-note">{copy("Ưu đãi tặng kèm quà số lượng có hạn")}</p>
      </div>
    </dialog>, document.body
  );
}
