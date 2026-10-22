import { useCopy } from '../i18n/useCopy';
import React from 'react';
import { ArrowUpRight, Gift } from 'lucide-react';
import { Link } from '../context/RouterContext';
import giftSet from '../assets/images/launch-gift-set.webp';

export function GiftEditorial() {
  const copy = useCopy();
  return (
    <section className="alps-gift-editorial" aria-labelledby="gift-editorial-title" data-art-reveal>
      <div className="alps-gift-copy">
        <span className="alps-editorial-label"><span /> {copy(" THE ART OF GIVING • 20/10")}</span>
        <h2 id="gift-editorial-title">{copy("Một chút nâng niu.")}<br /><em>{copy("Một món quà đẹp.")}</em></h2>
        <p>{copy("Gửi trao yêu thương qua những điều nhỏ bé. Khám phá các bộ quà chăm sóc da ALPS dành cho người phụ nữ bạn trân quý.")}</p>
        <div className="alps-editorial-voucher"><Gift size={18} strokeWidth={1.3} /><span>{copy("Ưu đãi ")}<strong>{copy("GIẢM 20%")}</strong> <span aria-hidden="true">{"·"}</span> {copy(" Toàn sàn • Không cần mã")}</span></div>
        <Link to="/uu-dai-20-10" className="alps-editorial-link">{copy("Khám phá quà cho nàng ")}<span><ArrowUpRight size={19} /></span></Link>
        <span className="alps-gift-footnote">{copy("ALPS PURE ESSENCE / GIFT COLLECTION")}</span>
      </div>
      <Link to="/uu-dai-20-10" className="alps-gift-visual" aria-label={copy("Xem bộ quà tặng và voucher ALPS")}>
        <span className="alps-gift-orbit" aria-hidden="true" />
        <span className="alps-gift-watermark" aria-hidden="true">{copy("for her.")}</span>
        <div className="alps-gift-float"><img src={giftSet} alt={copy("Hộp quà ALPS màu hồng với bộ sản phẩm chăm sóc da")} loading="lazy" /></div>
        <span className="alps-gift-seal"><span>{copy("DÀNH CHO")}</span><em>{copy("nàng")}</em><span>{"20 / 10"}</span></span>
      </Link>
    </section>
  );
}

export function BeautyRibbon() {
  const copy = useCopy();
  const words = ['Nâng niu làn da', 'Pure Essence', 'Rạng rỡ theo cách riêng', 'Một khoảng lặng cho bạn'];
  return <div className="alps-beauty-ribbon" aria-label={copy(words.join(' • '))}><div className="alps-ribbon-track" aria-hidden="true">{[0,1].map(repetition => <div className="alps-ribbon-group" key={repetition}>{words.map(word => <React.Fragment key={word}><span>{copy(word)}</span><i>{"✧"}</i></React.Fragment>)}</div>)}</div></div>;
}
