import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Volume2, VolumeX, Compass, Droplets, Leaf, FlaskConical, 
  Sparkles, Heart, Quote, ArrowRight, Clock, ShieldCheck, CheckCircle2, 
  Layers, Bookmark, Eye, Globe 
} from 'lucide-react';
import { AlpsIcon } from './AlpsLogo';
import { useLanguage } from '../context/LanguageContext';
import { STORY_MODAL_I18N } from '../i18n/storyModalTranslations';

import originStreamImg from '../assets/images/alps_origin_stream_1790660755043.jpg';
import edelweissImg from '../assets/images/alps_edelweiss_bloom_1790660771955.jpg';
import labCraftImg from '../assets/images/alps_lab_craft_1790660791492.jpg';
import champagneImg from '../assets/images/alps_banner_champagne_1789839179884.jpg';

interface BrandStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreCollection?: () => void;
  onOpenRitual?: () => void;
}

export const BrandStoryModal: React.FC<BrandStoryModalProps> = ({
  isOpen,
  onClose,
  onExploreCollection,
  onOpenRitual,
}) => {
  const { language } = useLanguage();
  const doc = STORY_MODAL_I18N[language] || STORY_MODAL_I18N.vi;

  const [activeTierTab, setActiveTierTab] = useState<'tier1' | 'tier2' | 'tier3'>('tier1');
  const [isAudioActive, setIsAudioActive] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Synthesize soft ambient mountain stream & alpine breeze sound
  const toggleAudio = () => {
    if (!isAudioActive) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;

        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
          b6 = white * 0.115926;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 450;
        filter.Q.value = 1.2;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        noise.start(0);

        setIsAudioActive(true);
      } catch (e) {
        console.warn('Audio synthesis failed:', e);
        setIsAudioActive(false);
      }
    } else {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
      setIsAudioActive(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#fcf9f4] rounded-[2rem] shadow-2xl border border-[#202022]/10 overflow-hidden max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-30 bg-[#fcf9f4]/95 backdrop-blur-md px-5 sm:px-8 py-3.5 sm:py-4 border-b border-[#202022]/8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlpsIcon className="w-8 h-5 text-[#74584d]" color="#74584d" />
            <div>
              <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-[#74584d] block">
                {doc.headerTag}
              </span>
              <h2 className="font-serif text-base sm:text-lg font-normal text-[#1c1c19]">
                {doc.modalTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Nature Audio Synthesizer */}
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-full text-xs transition-colors flex items-center space-x-1.5 cursor-pointer ${
                isAudioActive
                  ? 'bg-[#74584d] text-white shadow-xs'
                  : 'bg-[#f0ede9] text-[#46464a] hover:bg-[#ebe8e3]'
              }`}
              title={isAudioActive ? 'Tắt âm thanh' : 'Bật âm thanh suối nguồn & gió núi'}
            >
              {isAudioActive ? <Volume2 className="w-4 h-4 text-white" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden md:inline text-[11px] font-medium pr-1">
                {isAudioActive ? doc.audioActive : doc.audioInactive}
              </span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#202022]/5 text-[#46464a] hover:text-[#1c1c19] transition-colors cursor-pointer"
              aria-label={doc.closeBtn}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3-Tier Switcher Bar */}
        <div className="bg-[#f6f3ee] px-4 sm:px-8 border-b border-[#202022]/6 flex items-center space-x-2 sm:space-x-6 overflow-x-auto scrollbar-none text-xs font-medium">
          <button
            onClick={() => setActiveTierTab('tier1')}
            className={`py-3 px-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTierTab === 'tier1'
                ? 'border-[#74584d] text-[#1c1c19] font-bold'
                : 'border-transparent text-[#77767b] hover:text-[#1c1c19]'
            }`}
          >
            {doc.tab1}
          </button>
          <button
            onClick={() => setActiveTierTab('tier2')}
            className={`py-3 px-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTierTab === 'tier2'
                ? 'border-[#74584d] text-[#1c1c19] font-bold'
                : 'border-transparent text-[#77767b] hover:text-[#1c1c19]'
            }`}
          >
            {doc.tab2}
          </button>
          <button
            onClick={() => setActiveTierTab('tier3')}
            className={`py-3 px-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTierTab === 'tier3'
                ? 'border-[#74584d] text-[#1c1c19] font-bold'
                : 'border-transparent text-[#77767b] hover:text-[#1c1c19]'
            }`}
          >
            {doc.tab3}
          </button>
        </div>

        {/* Scrollable Story Document */}
        <div className="overflow-y-auto p-5 sm:p-8 md:p-10 space-y-12 leading-relaxed scrollbar-thin text-[#202022]">
          {/* Top Brand Identity Banner */}
          <div className="p-6 bg-[#f6f3ee] rounded-2xl border border-[#202022]/8 space-y-3 text-center">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1c1c19]">
              ALPS PURE ESSENCE
            </h1>
            <p className="font-serif tracking-[0.2em] text-sm text-[#74584d] font-semibold uppercase">
              PURE ESSENCE. TIMELESS BEAUTY.
            </p>
            <p className="text-xs text-[#5c5b5f] font-light max-w-xl mx-auto">
              {doc.slogan}
            </p>

            {/* A-L-P-S Letters */}
            <div className="pt-4 border-t border-[#202022]/8 text-left text-xs space-y-2 text-[#46464a]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                {doc.alpsLetters.map((l) => (
                  <div key={l.letter} className="p-2 bg-white rounded-lg shadow-2xs">
                    <strong>{l.letter}</strong> – {l.word}: {l.meaning}
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-[#77767b] pt-1">
                {doc.logoDescription}
              </p>
            </div>
          </div>

          {/* TẦNG 1: BRAND STORY */}
          {activeTierTab === 'tier1' && (
            <div className="space-y-10 animate-in fade-in duration-300">
              {/* Visual Reel Banner */}
              <div className="relative rounded-2xl overflow-hidden shadow-sm bg-[#1c1c19]">
                <img
                  src={originStreamImg}
                  alt="Dòng suối sông băng Alps Zermatt"
                  className="w-full h-56 sm:h-72 object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#fed8c9] font-medium mb-1">
                    {doc.tier1ChapterTitle}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-[#fcf9f4]">
                    {doc.tier1Heading}
                  </h3>
                </div>
              </div>

              {/* I. Câu chuyện */}
              <div className="space-y-4 text-xs sm:text-sm text-[#46464a] font-light leading-relaxed">
                <h3 className="font-serif text-lg font-bold text-[#1c1c19]">
                  I. {doc.tier1Heading}
                </h3>
                <p>{doc.storyP1}</p>
                <p>{doc.storyP2}</p>
                <p>{doc.storyP3}</p>
                <p>{doc.storyP4}</p>

                <div className="p-5 bg-[#f6f3ee] rounded-2xl border border-[#202022]/8 space-y-2 mt-4">
                  <span className="text-[10px] uppercase font-bold text-[#74584d] tracking-wider block">
                    {doc.approachTitle}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-serif text-xs text-[#1c1c19]">
                    {doc.approachPillars.map((p, idx) => (
                      <div key={idx} className="p-2 bg-white rounded-lg text-center font-medium shadow-2xs">
                        {p}
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-[#77767b] pt-1">
                    {doc.approachNote}
                  </p>
                </div>
              </div>

              {/* II. Nguồn gốc tên */}
              <div className="p-6 bg-[#f6f3ee] rounded-2xl border border-[#202022]/8 space-y-4 text-xs sm:text-sm text-[#46464a]">
                <h3 className="font-serif text-lg font-bold text-[#1c1c19]">
                  {doc.nameOriginTitle}
                </h3>
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-[#1c1c19]">{doc.alpsSymbolTitle}</h4>
                  <p className="font-light">{doc.alpsSymbolDesc}</p>
                </div>
                <div className="space-y-2 pt-2 border-t border-[#202022]/8">
                  <h4 className="font-serif font-bold text-[#1c1c19]">{doc.pureEssenceTitle}</h4>
                  <p className="font-light">{doc.pureEssenceDesc}</p>
                  <blockquote className="font-serif italic text-[#74584d] pt-1">
                    &ldquo;{doc.nameConclusion}&rdquo;
                  </blockquote>
                </div>
              </div>

              {/* III & IV: Sự ra đời & Lịch sử 4 giai đoạn */}
              <div className="space-y-4 text-xs sm:text-sm text-[#46464a] font-light leading-relaxed">
                <h3 className="font-serif text-lg font-bold text-[#1c1c19]">
                  {doc.questionHeading}
                </h3>
                <blockquote className="p-4 bg-[#f0ede9] rounded-xl font-serif text-[#1c1c19] text-sm">
                  &ldquo;{doc.questionQuote}&rdquo;
                </blockquote>
                <div className="space-y-1">
                  <strong className="text-[#1c1c19]">{doc.questionFoundationTitle}</strong>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {doc.questionFoundations.map((f, i) => (
                      <span key={i} className="bg-white px-3 py-1 rounded-full border border-[#202022]/8 text-xs font-medium text-[#74584d]">
                        • {f}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="pt-2 text-xs text-[#77767b]">
                  {doc.questionFooter}
                </p>

                <h3 className="font-serif text-lg font-bold text-[#1c1c19] pt-6">
                  {doc.historyHeading}
                </h3>
                <p>{doc.historyOriginText}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  {doc.phases.map((ph, idx) => (
                    <div key={idx} className="p-3.5 bg-white rounded-xl border border-[#202022]/8 shadow-2xs">
                      <strong className="block text-[#1c1c19] font-serif">{ph.phase} — {ph.title}</strong>
                      <span className="text-[#77767b] mt-0.5 block">{ph.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TẦNG 2: BRAND PHILOSOPHY */}
          {activeTierTab === 'tier2' && (
            <div className="space-y-10 animate-in fade-in duration-300">
              <div className="relative rounded-2xl overflow-hidden shadow-sm bg-[#1c1c19]">
                <img
                  src={edelweissImg}
                  alt="Hoa tuyết nhung rạng rỡ"
                  className="w-full h-56 sm:h-72 object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#fed8c9] font-medium mb-1">
                    CHAPTER II • PHILOSOPHY
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-[#fcf9f4]">
                    “Purity Is The Beginning Of Beauty.”
                  </h3>
                </div>
              </div>

              {/* V. Triết lý */}
              <div className="space-y-4 text-xs sm:text-sm text-[#46464a] font-light leading-relaxed">
                <h3 className="font-serif text-lg font-bold text-[#1c1c19]">
                  {doc.tier2Heading}
                </h3>
                <p>{doc.purityConcept}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {doc.fourPillars.map((p, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-xl border border-[#202022]/8 space-y-1 shadow-2xs">
                      <strong className="text-[#1c1c19] font-serif block">{idx + 1}. {p.title}</strong>
                      <p className="text-xs text-[#5c5b5f]">{p.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Sứ mệnh & Tầm nhìn */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-[#f6f3ee] rounded-xl border border-[#202022]/8 space-y-1.5">
                    <h4 className="font-serif font-bold text-[#1c1c19] flex items-center space-x-1.5">
                      <Compass className="w-4 h-4 text-[#74584d]" />
                      <span>{doc.missionTitle}</span>
                    </h4>
                    <p className="text-xs text-[#46464a] leading-relaxed">
                      {doc.missionDesc}
                    </p>
                  </div>
                  <div className="p-4 sm:p-5 bg-[#f6f3ee] rounded-xl border border-[#202022]/8 space-y-2">
                    <h4 className="font-serif font-bold text-[#1c1c19] flex items-center space-x-1.5">
                      <Eye className="w-4 h-4 text-[#74584d]" />
                      <span>{doc.visionTitle}</span>
                    </h4>
                    <p className="text-xs text-[#46464a] leading-relaxed">
                      {doc.visionDesc}
                    </p>
                    {doc.visionHighlights && (
                      <div className="pt-1.5 space-y-1.5">
                        {doc.visionHighlights.map((vh, idx) => (
                          <div key={idx} className="flex items-start space-x-2 p-2 rounded-lg bg-white/80 border border-[#202022]/6 text-xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#74584d] shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-[#1c1c19] block text-[11px] sm:text-xs">{vh.title}</strong>
                              <span className="text-[#77767b] text-[10px] sm:text-[11px] block">{vh.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 5 Giá trị cốt lõi */}
                <div className="p-5 bg-white rounded-2xl border border-[#202022]/8 space-y-3 mt-4">
                  <h4 className="font-serif font-bold text-[#1c1c19] text-sm">
                    {doc.coreValuesTitle}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {doc.coreValues.map((v, idx) => (
                      <div key={idx} className="p-2.5 bg-[#fcf9f4] rounded-lg border border-[#f0ede9]">
                        <strong className="text-[#74584d]">{v.title}:</strong> {v.desc}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phong cách Quiet Luxury */}
                <div className="p-5 bg-[#fcf9f4] rounded-2xl border border-[#202022]/8 space-y-3 mt-4">
                  <h4 className="font-serif font-bold text-[#1c1c19] text-sm">
                    {doc.luxuryTitle}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    {doc.luxuryPoints.map((lp, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-xl border border-[#202022]/6">
                        <strong className="block text-[#1c1c19] font-serif">{lp.title}</strong>
                        <span className="text-[#77767b] mt-0.5 block">{lp.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trải nghiệm đa giác quan */}
                <div className="p-5 bg-white rounded-2xl border border-[#202022]/8 space-y-3 mt-4">
                  <h4 className="font-serif font-bold text-[#1c1c19] text-sm">
                    {doc.sensoryTitle}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    {doc.sensoryItems.map((si, idx) => (
                      <div key={idx} className="p-3 bg-[#f6f3ee] rounded-xl">
                        <strong className="block text-[#1c1c19] font-serif">{si.title}</strong>
                        <span className="text-[#5c5b5f] mt-0.5 block">{si.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TẦNG 3: COMMITMENTS & ACTIONS */}
          {activeTierTab === 'tier3' && (
            <div className="space-y-10 animate-in fade-in duration-300">
              <div className="relative rounded-2xl overflow-hidden shadow-sm bg-[#1c1c19]">
                <img
                  src={labCraftImg}
                  alt="Nghiên cứu da liễu Thụy Sĩ"
                  className="w-full h-56 sm:h-72 object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#fed8c9] font-medium mb-1">
                    CHAPTER III • COMMITMENTS & ACTIONS
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-[#fcf9f4]">
                    {doc.commitmentsHeading}
                  </h3>
                </div>
              </div>

              {/* VI. Bảy cam kết hành động */}
              <div className="space-y-4 text-xs sm:text-sm text-[#46464a] font-light leading-relaxed">
                <h3 className="font-serif text-lg font-bold text-[#1c1c19]">
                  {doc.commitmentsHeading}
                </h3>
                <p>{doc.commitmentsDesc}</p>

                <div className="bg-white rounded-2xl border border-[#202022]/8 divide-y divide-[#202022]/6 overflow-hidden">
                  {doc.commitmentsList.map((item) => (
                    <div 
                      key={item.num} 
                      className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 ${
                        item.num === '07' ? 'bg-[#fdfaf5]' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-2 font-bold text-[#1c1c19] sm:w-1/3 shrink-0">
                        {item.num === '07' ? (
                          <ShieldCheck className="w-4 h-4 text-[#74584d] shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-[#74584d] shrink-0" />
                        )}
                        <span>{item.num}. {item.title}</span>
                      </div>
                      <div className="text-xs text-[#5c5b5f] sm:w-2/3 leading-relaxed">
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Our Belief Box */}
                <div className="p-6 bg-[#f6f3ee] rounded-2xl border border-[#202022]/8 text-center space-y-3 mt-6">
                  <Quote className="w-6 h-6 text-[#74584d]/40 mx-auto" />
                  <h4 className="font-serif text-base font-bold text-[#1c1c19]">
                    {doc.beliefHeading}
                  </h4>
                  <p className="font-serif italic text-sm text-[#46464a] max-w-xl mx-auto">
                    &ldquo;{doc.beliefQuote}&rdquo;
                  </p>
                  <div className="pt-2 flex flex-wrap justify-center gap-2 text-[10px] text-[#74584d] uppercase font-semibold tracking-wider">
                    {doc.beliefPillars.map((bp, i) => (
                      <span key={i} className="bg-white px-3 py-1 rounded-full border border-[#202022]/6">
                        • {bp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="sticky bottom-0 z-30 bg-[#fcf9f4]/95 backdrop-blur-md px-5 sm:px-8 py-3.5 border-t border-[#202022]/8 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full border border-[#202022]/20 hover:bg-white text-xs font-medium text-[#46464a] hover:text-[#1c1c19] transition-colors cursor-pointer"
          >
            {doc.closeBtn}
          </button>

          {onExploreCollection && (
            <button
              onClick={() => {
                onClose();
                onExploreCollection();
              }}
              className="px-6 py-2 rounded-full bg-[#202022] hover:bg-[#32362f] text-white text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <span>{doc.exploreBtn}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#fed8c9]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
