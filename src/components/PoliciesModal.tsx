import React, { useState } from 'react';
import { X, ShieldCheck, RefreshCw, Truck, Check, Lock, AlertCircle, FileText, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { POLICIES_I18N } from '../i18n/policiesTranslations';

export type PolicyTabType = 'returns' | 'privacy' | 'shipping';

interface PoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: PolicyTabType;
  onOpenSupport?: () => void;
}

export const PoliciesModal: React.FC<PoliciesModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'returns',
  onOpenSupport,
}) => {
  const { language } = useLanguage();
  const pData = POLICIES_I18N[language] || POLICIES_I18N.vi;
  const [activeTab, setActiveTab] = useState<PolicyTabType>(initialTab);

  if (!isOpen) return null;

  const currentPolicy =
    activeTab === 'returns'
      ? pData.returnsPolicy
      : activeTab === 'shipping'
      ? pData.shippingPolicy
      : pData.privacyPolicy;

  const IconComp = activeTab === 'returns' ? RefreshCw : activeTab === 'shipping' ? Truck : Lock;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#fcf9f4] rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden z-10 border border-[#202022]/10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#202022]/10 bg-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#f6f3ee] flex items-center justify-center text-[#74584d]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#74584d] font-semibold">
                {pData.brandTag}
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-normal text-[#1c1c19] tracking-tight">
                {pData.modalTitle}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#1c1c19] flex items-center justify-center transition-colors cursor-pointer"
            title={pData.closeBtn}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#202022]/8 bg-[#f6f3ee]/60 px-4 sm:px-6 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('returns')}
            className={`py-3 px-4 text-xs font-semibold tracking-wider flex items-center space-x-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'returns'
                ? 'border-[#74584d] text-[#1c1c19] bg-white rounded-t-xl'
                : 'border-transparent text-[#77767b] hover:text-[#1c1c19]'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{pData.tabs.returns}</span>
          </button>

          <button
            onClick={() => setActiveTab('shipping')}
            className={`py-3 px-4 text-xs font-semibold tracking-wider flex items-center space-x-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'shipping'
                ? 'border-[#74584d] text-[#1c1c19] bg-white rounded-t-xl'
                : 'border-transparent text-[#77767b] hover:text-[#1c1c19]'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>{pData.tabs.shipping}</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-3 px-4 text-xs font-semibold tracking-wider flex items-center space-x-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'privacy'
                ? 'border-[#74584d] text-[#1c1c19] bg-white rounded-t-xl'
                : 'border-transparent text-[#77767b] hover:text-[#1c1c19]'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{pData.tabs.privacy}</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-grow space-y-6 text-[#1c1c19] text-xs leading-relaxed">
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Highlight Banner */}
            <div className="bg-gradient-to-r from-[#fed8c9]/30 to-[#f6f3ee] border border-[#fed8c9] rounded-2xl p-4 flex items-start space-x-3">
              <IconComp className="w-6 h-6 text-[#74584d] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#74584d] block">
                  {currentPolicy.badge}
                </span>
                <h4 className="font-semibold text-sm sm:text-base text-[#1c1c19] mt-0.5">
                  {currentPolicy.title}
                </h4>
              </div>
            </div>

            {/* Points List */}
            <div className="space-y-3.5">
              {currentPolicy.points.map((pt, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-4 border border-[#202022]/6 space-y-1.5 shadow-xs">
                  <h5 className="font-semibold text-xs text-[#74584d] uppercase tracking-wider flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-[#8a9a86] shrink-0" />
                    <span>{idx + 1}. {pt.title}</span>
                  </h5>
                  <p className="text-[#46464a] text-xs leading-relaxed pl-5 font-light">
                    {pt.desc}
                  </p>
                </div>
              ))}
            </div>

            {currentPolicy.note && (
              <div className="p-3.5 bg-[#f0ede9] rounded-xl text-[11px] text-[#77767b] flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-[#74584d] shrink-0" />
                <span>{currentPolicy.note}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer info & CSKH shortcut */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#202022]/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-[#77767b]">
            <Phone className="w-3.5 h-3.5 text-[#74584d]" />
            <span>{pData.supportHelpText} <strong className="text-[#1c1c19]">1900 8899</strong></span>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {onOpenSupport && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSupport();
                }}
                className="flex-1 sm:flex-none py-2 px-4 rounded-full text-xs font-semibold bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#1c1c19] transition-colors cursor-pointer"
              >
                {pData.openSupportBtn}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none py-2 px-6 rounded-full text-xs font-semibold bg-[#1c1c19] text-white hover:bg-black transition-colors cursor-pointer"
            >
              {pData.closeBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
