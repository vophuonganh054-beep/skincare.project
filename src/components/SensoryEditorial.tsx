import { useCopy } from '../i18n/useCopy';
import React from 'react';
import { ArrowUpRight, MoveDown } from 'lucide-react';
import { Link } from '../context/RouterContext';
import serum from '../assets/images/alps-serum-stone.jpg';
import flower from '../assets/images/alps_edelweiss_bloom_1790660771955.jpg';

export function SensoryEditorial({ onOpenSkinQuiz }: { onOpenSkinQuiz: () => void }) {
  const copy = useCopy();
  return <section className="alps-sensory" aria-labelledby="sensory-title" data-art-reveal>
    <div className="alps-sensory-copy">
      <p className="alps-editorial-label"><span /> {copy(" A MOMENT, JUST FOR YOU")}</p>
      <h2 id="sensory-title">{copy("Chậm lại")}<br />{copy("một ")}<em>{copy("nhịp.")}</em></h2>
      <p className="alps-sensory-description">{copy("Một giọt tinh chất. Một chạm dịu dàng.")}<br />{copy("Dành một khoảng lặng để chăm sóc làn da và yêu thương chính mình.")}</p>
      <Link className="alps-editorial-link" to="/san-pham/serum-radiance-glow">{copy("Chạm vào sự rạng rỡ ")}<span><ArrowUpRight size={19} /></span></Link>
      <button className="alps-sensory-quiz" onClick={onOpenSkinQuiz}>{copy("Tìm nghi thức dành riêng cho bạn ")}<ArrowUpRight size={15} /></button>
      <div className="alps-sensory-index" aria-hidden="true"><span>{copy("01 / PURE ESSENCE")}</span><MoveDown size={30} strokeWidth={1} /></div>
    </div>
    <div className="alps-sensory-visual">
      <span className="alps-sensory-halo" aria-hidden="true" />
      <Link className="alps-sensory-photo" to="/san-pham/serum-radiance-glow" aria-label={copy("Khám phá serum ALPS Radiance Glow")}>
        <img src={serum} alt={copy("Tinh chất ALPS Radiance Glow trên nền đá tự nhiên")} loading="lazy" data-art-parallax />
        <span className="alps-sensory-caption">{copy("RADIANCE GLOW SERUM ")}<ArrowUpRight size={19} /></span>
      </Link>
      <div className="alps-sensory-flower"><img src={flower} alt={copy("Hoa tuyết Edelweiss")} loading="lazy" /><span>{copy("inspired by nature")}</span></div>
      <span className="alps-sensory-signature" aria-hidden="true">{copy("a little ritual.")}</span>
    </div>
  </section>;
}
