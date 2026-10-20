import React from 'react';
import { ArrowUpRight, MoveDown } from 'lucide-react';
import { Link } from '../context/RouterContext';
import serum from '../assets/images/alps-serum-stone.jpg';
import flower from '../assets/images/alps_edelweiss_bloom_1790660771955.jpg';

export function SensoryEditorial({ onOpenSkinQuiz }: { onOpenSkinQuiz: () => void }) {
  return <section className="alps-sensory" aria-labelledby="sensory-title" data-art-reveal>
    <div className="alps-sensory-copy">
      <p className="alps-editorial-label"><span /> A MOMENT, JUST FOR YOU</p>
      <h2 id="sensory-title">Chậm lại<br />một <em>nhịp.</em></h2>
      <p className="alps-sensory-description">Một giọt tinh chất. Một chạm dịu dàng.<br />Dành một khoảng lặng để chăm sóc làn da và yêu thương chính mình.</p>
      <Link className="alps-editorial-link" to="/san-pham/serum-radiance-glow">Chạm vào sự rạng rỡ <span><ArrowUpRight size={19} /></span></Link>
      <button className="alps-sensory-quiz" onClick={onOpenSkinQuiz}>Tìm nghi thức dành riêng cho bạn <ArrowUpRight size={15} /></button>
      <div className="alps-sensory-index" aria-hidden="true"><span>01 / PURE ESSENCE</span><MoveDown size={30} strokeWidth={1} /></div>
    </div>
    <div className="alps-sensory-visual">
      <span className="alps-sensory-halo" aria-hidden="true" />
      <Link className="alps-sensory-photo" to="/san-pham/serum-radiance-glow" aria-label="Khám phá serum ALPS Radiance Glow">
        <img src={serum} alt="Tinh chất ALPS Radiance Glow trên nền đá tự nhiên" loading="lazy" data-art-parallax />
        <span className="alps-sensory-caption">RADIANCE GLOW SERUM <ArrowUpRight size={19} /></span>
      </Link>
      <div className="alps-sensory-flower"><img src={flower} alt="Hoa tuyết Edelweiss" loading="lazy" /><span>inspired by nature</span></div>
      <span className="alps-sensory-signature" aria-hidden="true">a little ritual.</span>
    </div>
  </section>;
}
