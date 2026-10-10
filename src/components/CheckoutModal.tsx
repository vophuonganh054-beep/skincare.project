import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  MapPin,
  Phone,
  User,
  ArrowRight,
  CheckCircle2,
  Lock,
  RefreshCw,
  Sparkles,
  Building,
  Tag,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { CartItem, Product, UserProfile, Order, PaymentMethodType, ShippingCarrier } from '../types';
import { SHIPPING_CARRIERS } from '../data/shippingCarriers';
import { VietQRCard } from './VietQRCard';
import { PolicyTabType } from './PoliciesModal';
import { useLanguage } from '../context/LanguageContext';
import { CHECKOUT_I18N } from '../i18n/checkoutTranslations';
import { getLocalizedProduct } from '../i18n/productTranslations';
import {
  VisaBadge,
  VisaDebitBadge,
  VisaSecureBadge,
  RealisticCardVisual,
  MastercardBadge,
  JcbBadge,
  NapasBadge,
  VietQRBadge,
  PaymentBadgesGroup,
} from './PaymentBadges';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  user?: UserProfile | null;
  onCompleteOrder: (order: Order) => void;
  onShowToast: (message: string) => void;
  onOpenPolicies?: (tab: PolicyTabType) => void;
  onOpenLogin?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  user,
  onCompleteOrder,
  onShowToast,
  onOpenPolicies,
  onOpenLogin,
}) => {
  const { language } = useLanguage();
  const cData = CHECKOUT_I18N[language]?.checkout || CHECKOUT_I18N.vi.checkout;

  // Recipient info - dynamically bound to logged in user and strictly isolated per account
  const [buyerName, setBuyerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');

  // Shipping Carrier selection
  const [selectedCarrierId, setSelectedCarrierId] = useState<'ghtk' | 'ghn' | 'express' | 'viettel'>('ghtk');
  const [isCarrierSelectorOpen, setIsCarrierSelectorOpen] = useState(false);

  // Payment Method selection: COD, VietQR, Bank Transfer
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('vietqr');

  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  // Form error
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Payment reception verification state (for VietQR & Bank transfer)
  const [paymentReceived, setPaymentReceived] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);

  // Card payment details (Visa, Mastercard, JCB)
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardAuthSuccess, setCardAuthSuccess] = useState(false);
  const [isAuthorizingCard, setIsAuthorizingCard] = useState(false);

  // Sync recipient information strictly per account
  useEffect(() => {
    if (!isOpen) return;

    if (user && user.isLoggedIn) {
      const uid = user.uid || (user.email ? 'usr_' + btoa(encodeURIComponent(user.email.toLowerCase())) : '');
      let savedShipping: { buyerName?: string; phone?: string; email?: string; address?: string; note?: string } | null = null;
      if (uid) {
        try {
          const raw = localStorage.getItem(`alps_shipping_${uid}`);
          if (raw) savedShipping = JSON.parse(raw);
        } catch {}
      }

      setBuyerName(savedShipping?.buyerName ?? user.name ?? '');
      setPhone(savedShipping?.phone ?? user.phone ?? '');
      setEmail(savedShipping?.email ?? user.email ?? '');
      setAddress(savedShipping?.address ?? user.address ?? '');
      setNote(savedShipping?.note ?? '');
      setCardHolder(user.name ? user.name.toUpperCase() : '');
    } else {
      // Logged out / guest: completely blank out so no previous user info remains
      setBuyerName('');
      setPhone('');
      setEmail('');
      setAddress('');
      setNote('');
      setCardNumber('');
      setCardHolder('');
      setCardExpiry('');
      setCardCvv('');
      setCardAuthSuccess(false);
      setPaymentReceived(false);
      setFormError(null);
    }
  }, [user?.uid, user?.name, user?.email, user?.phone, user?.address, user?.isLoggedIn, isOpen]);

  // Persist recipient changes to current user's dedicated store
  const persistShippingField = (field: 'buyerName' | 'phone' | 'email' | 'address' | 'note', value: string) => {
    if (!user || !user.isLoggedIn) return;
    const uid = user.uid || (user.email ? 'usr_' + btoa(encodeURIComponent(user.email.toLowerCase())) : '');
    if (!uid) return;
    try {
      const existing = localStorage.getItem(`alps_shipping_${uid}`);
      const current = existing ? JSON.parse(existing) : {
        buyerName,
        phone,
        email,
        address,
        note,
      };
      current[field] = value;
      localStorage.setItem(`alps_shipping_${uid}`, JSON.stringify(current));
    } catch {}
  };

  const handleClearSavedShipping = () => {
    setBuyerName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setNote('');
    const uid = user?.uid || (user?.email ? 'usr_' + btoa(encodeURIComponent(user.email.toLowerCase())) : '');
    if (uid) {
      try {
        localStorage.removeItem(`alps_shipping_${uid}`);
      } catch {}
    }
    if (onShowToast) {
      onShowToast('Đã làm trống thông tin nhận hàng của tài khoản này');
    }
  };

  // Generate order number for this session
  const [orderNumber] = useState(() => `ALPS-${Math.floor(10000 + Math.random() * 90000)}`);

  if (!isOpen) return null;

  // Pricing calculations
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const selectedCarrier = SHIPPING_CARRIERS.find((c) => c.id === selectedCarrierId) || SHIPPING_CARRIERS[0];
  
  // Free shipping check (if subtotal >= freeThreshold)
  const isFreeShipping = selectedCarrier.freeThreshold ? subtotal >= selectedCarrier.freeThreshold : false;
  const shippingFee = isFreeShipping ? 0 : selectedCarrier.price;

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleAuthorizeCard = () => {
    const cleanNum = cardNumber.replace(/\s/g, '');
    if (cleanNum.length < 15) {
      setFormError('Vui lòng nhập số thẻ Visa / Mastercard hợp lệ (tối thiểu 15-16 số).');
      return;
    }
    if (!cardHolder.trim()) {
      setFormError('Vui lòng nhập tên in trên thẻ (không dấu).');
      return;
    }
    if (cardExpiry.length < 4) {
      setFormError('Vui lòng nhập thời hạn thẻ (MM/YY).');
      return;
    }
    if (cardCvv.length < 3) {
      setFormError('Vui lòng nhập mã bảo mật CVV/CVC (3 chữ số ở mặt sau thẻ).');
      return;
    }
    setFormError(null);
    setIsAuthorizingCard(true);
    if (onShowToast) {
      onShowToast('Đang kết nối cổng thanh toán thẻ Visa Secure 3D OTP...');
    }
    setTimeout(() => {
      setIsAuthorizingCard(false);
      setCardAuthSuccess(true);
      setPaymentReceived(true);
      if (onShowToast) {
        onShowToast(`✓ Đã xác thực thẻ Visa/Mastercard (•••• ${cleanNum.slice(-4)}) thành công! Nút đặt hàng đã mở.`);
      }
    }, 1400);
  };

  const handleCheckPayment = () => {
    setIsVerifyingPayment(true);
    setFormError(null);
    if (onShowToast) {
      onShowToast('Đang kết nối Napas 247 & MB Bank kiểm tra biến động số dư...');
    }
    setTimeout(() => {
      setIsVerifyingPayment(false);
      setPaymentReceived(true);
      if (onShowToast) {
        onShowToast(`✓ Đã nhận ${totalAmount.toLocaleString('vi-VN')}₫ thành công! Nút đặt hàng đã được kích hoạt.`);
      }
    }, 1800);
  };

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'ALPS10' || code === 'ALPS2025') {
      setDiscountPercent(10);
      setPromoApplied(true);
      onShowToast(`Đã áp dụng mã ưu đãi ${code}: Giảm 10%`);
    } else if (code === 'VIP20' || code === 'VEGAN20') {
      setDiscountPercent(20);
      setPromoApplied(true);
      onShowToast('Đã áp dụng mã đặc quyền VIP: Giảm 20%');
    } else {
      onShowToast('Mã ưu đãi không hợp lệ hoặc đã hết lượt dùng');
    }
  };

  const handleSubmitOrder = (e?: React.SyntheticEvent) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    setFormError(null);

    const finalName = buyerName.trim() || user?.name || 'Khách Hàng Thân Thiết';
    const finalPhone = phone.trim() || user?.phone || '0901234567';
    const finalAddress = address.trim() || user?.address || 'Giao tận nơi (Nhân viên ALPS liên hệ giao hàng)';

    if (items.length === 0) {
      const err = 'Đơn hàng không có sản phẩm nào.';
      setFormError(err);
      if (onShowToast) onShowToast(err);
      return;
    }

    setIsSubmitting(true);

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber: orderNumber,
      userId: user?.uid,
      createdAt: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      items: items.map((it) => ({
        product: it.product,
        quantity: it.quantity,
        unitPrice: it.product.price,
      })),
      totalAmount: totalAmount,
      status: 'processing',
      statusLabel: 'Đang chuẩn bị hàng tại phòng sạch',
      buyerName: finalName,
      phone: finalPhone,
      shippingAddress: finalAddress,
      paymentMethod:
        paymentMethod === 'vietqr'
          ? 'VietQR MB Bank (Quét mã tức thì)'
          : paymentMethod === 'card'
          ? `Thẻ Visa / Mastercard Quốc Tế (•••• ${cardNumber.replace(/\s/g, '').slice(-4) || '8899'})`
          : paymentMethod === 'bank_transfer'
          ? 'Chuyển khoản ngân hàng ALPS'
          : 'Thanh toán khi nhận hàng (COD)',
      paymentMethodType: paymentMethod,
      shippingCarrier: selectedCarrier.fullName,
      shippingFee: shippingFee,
      discountAmount: discountAmount,
      note: note.trim() || undefined,
    };

    const uid = user?.uid || (user?.email ? 'usr_' + btoa(encodeURIComponent(user.email.toLowerCase())) : '');
    if (uid) {
      try {
        localStorage.setItem(
          `alps_shipping_${uid}`,
          JSON.stringify({
            buyerName: finalName,
            phone: finalPhone,
            email: email.trim() || user?.email || '',
            address: finalAddress,
            note: note.trim(),
          })
        );
      } catch {}
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onCompleteOrder(newOrder);
      onClose();
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Container */}
      <div className="relative w-full max-w-5xl bg-[#fcf9f4] rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden z-10 border border-[#202022]/10 max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#202022]/10 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-[#1c1c19] text-white flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#74584d] font-semibold">
                {cData.sslSecureText}
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-normal text-[#1c1c19] tracking-tight">
                {cData.modalTitle} ({orderNumber})
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#1c1c19] flex items-center justify-center transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 flex-grow">
          {(!user || !user.isLoggedIn) && (
            <div className="mb-4 p-3 bg-[#fcf9f4] border border-[#e4dfd7] rounded-2xl flex items-center justify-between text-xs text-[#5f5d58]">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#74584d] shrink-0" />
                <span>
                  {cData.recipientHeader}
                </span>
              </div>
              {onOpenLogin && (
                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="px-3 py-1 bg-[#1c1c19] text-white text-[11px] font-semibold rounded-full hover:bg-black transition-all shrink-0 ml-2 cursor-pointer"
                >
                  {language === 'vi' ? 'Đăng nhập' : language === 'de' ? 'Anmelden' : language === 'es' ? 'Iniciar sesión' : language === 'zh' ? '登录' : 'Sign in'}
                </button>
              )}
            </div>
          )}

          {formError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-[#ba1a1a] rounded-xl text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* LEFT COLUMN: Customer Info, Shipping Carriers, Payment Methods (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. THÔNG TIN NGƯỜI NHẬN */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#202022]/8 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#202022]/6">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-[#1c1c19] uppercase tracking-wider whitespace-nowrap">
                    <User className="w-4 h-4 text-[#74584d] shrink-0" />
                    <span>{cData.step1Title}</span>
                  </div>
                  <span className="text-[10px] text-[#8a9a86] font-medium flex items-center space-x-1 whitespace-nowrap shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{cData.sslSecureText}</span>
                  </span>
                </div>

                {/* Account Isolation Notice & Reset Button */}
                {user && user.isLoggedIn ? (
                  <div className="bg-[#fcf9f4] border border-[#ebe8e3] rounded-xl p-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 min-w-0">
                      <div className="w-6 h-6 rounded-full bg-[#74584d] text-white flex items-center justify-center text-[10px] font-semibold shrink-0">
                        {user.avatarInitials || (user.name ? user.name[0].toUpperCase() : 'AL')}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-[#1c1c19] truncate text-[11px] whitespace-nowrap">
                          Tài khoản: {user.name}
                        </div>
                        <div className="text-[10px] text-[#77767b] truncate whitespace-nowrap">
                          Thông tin nhận hàng lưu riêng theo tài khoản này
                        </div>
                      </div>
                    </div>
                    {(buyerName || address || phone) && (
                      <button
                        type="button"
                        onClick={handleClearSavedShipping}
                        className="text-[10.5px] text-[#74584d] hover:text-[#ba1a1a] hover:underline shrink-0 ml-2 font-medium whitespace-nowrap"
                        title="Xóa sạch thông tin đã điền của tài khoản này"
                      >
                        Xóa thông tin
                      </button>
                    )}
                  </div>
                ) : null}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-medium text-[#77767b] mb-1">
                      {cData.nameLabel} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => {
                        setBuyerName(e.target.value);
                        persistShippingField('buyerName', e.target.value);
                      }}
                      placeholder={cData.namePlaceholder}
                      className="w-full px-3 py-2 rounded-xl bg-[#fcf9f4] border border-[#ebe8e3] text-xs focus:outline-none focus:border-[#74584d]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#77767b] mb-1">
                      {cData.phoneLabel} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        persistShippingField('phone', e.target.value);
                      }}
                      placeholder={cData.phonePlaceholder}
                      className="w-full px-3 py-2 rounded-xl bg-[#fcf9f4] border border-[#ebe8e3] text-xs focus:outline-none focus:border-[#74584d]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#77767b] mb-1">
                    {cData.emailLabel}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      persistShippingField('email', e.target.value);
                    }}
                    placeholder={cData.emailPlaceholder}
                    className="w-full px-3 py-2 rounded-xl bg-[#fcf9f4] border border-[#ebe8e3] text-xs focus:outline-none focus:border-[#74584d]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#77767b] mb-1">
                    {cData.addressLabel} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      persistShippingField('address', e.target.value);
                    }}
                    placeholder={cData.addressPlaceholder}
                    className="w-full px-3 py-2 rounded-xl bg-[#fcf9f4] border border-[#ebe8e3] text-xs focus:outline-none focus:border-[#74584d] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#77767b] mb-1">
                    {cData.noteLabel}
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => {
                      setNote(e.target.value);
                      persistShippingField('note', e.target.value);
                    }}
                    placeholder={cData.notePlaceholder}
                    className="w-full px-3 py-2 rounded-xl bg-[#fcf9f4] border border-[#ebe8e3] text-xs focus:outline-none focus:border-[#74584d]"
                  />
                </div>
              </div>

              {/* 2. ĐƠN VỊ VẬN CHUYỂN */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#202022]/8 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#202022]/6">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-[#1c1c19] uppercase tracking-wider">
                    <Truck className="w-4 h-4 text-[#74584d]" />
                    <span>{cData.step2Title}</span>
                  </div>
                  {onOpenPolicies && (
                    <button
                      type="button"
                      onClick={() => onOpenPolicies('shipping')}
                      className="text-[11px] text-[#74584d] hover:underline"
                    >
                      Chính sách giao nhận
                    </button>
                  )}
                </div>

                {/* Compact Selected Carrier Row (Collapsed by default, click to expand) */}
                <div
                  onClick={() => setIsCarrierSelectorOpen(!isCarrierSelectorOpen)}
                  className="cursor-pointer p-3 sm:p-3.5 rounded-xl border border-[#d8c3b5] bg-[#fbf9f6] hover:bg-[#f6f2ec] transition-all flex items-center justify-between group"
                  title={isCarrierSelectorOpen ? 'Bấm để thu gọn' : 'Bấm để đổi đơn vị vận chuyển'}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#202022]/8 flex items-center justify-center text-[#74584d] shrink-0 shadow-2xs">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-xs sm:text-sm text-[#1c1c19] truncate">
                          {selectedCarrier.name}
                        </span>
                        {isFreeShipping ? (
                          <span className="text-[9.5px] font-bold text-[#8a9a86] bg-[#8a9a86]/10 px-1.5 py-0.2 rounded">
                            Miễn phí
                          </span>
                        ) : (
                          <span className="text-[10.5px] font-bold text-[#1c1c19]">
                            {selectedCarrier.price.toLocaleString('vi-VN')}₫
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#77767b] block mt-0.5">
                        Dự kiến: {selectedCarrier.estimatedTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 text-[#74584d] group-hover:text-[#5a3a30] text-xs font-medium shrink-0 ml-2">
                    <span className="hidden xs:inline">{isCarrierSelectorOpen ? 'Thu gọn' : 'Đổi đơn vị'}</span>
                    {isCarrierSelectorOpen ? (
                      <ChevronUp className="w-4 h-4 transition-transform" />
                    ) : (
                      <ChevronDown className="w-4 h-4 transition-transform" />
                    )}
                  </div>
                </div>

                {/* Collapsible Carrier Selection List */}
                {isCarrierSelectorOpen && (
                  <div className="pt-2 space-y-2.5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-[11px] text-[#77767b] px-0.5">
                      <span>Chọn đơn vị vận chuyển giao hàng:</span>
                      <button
                        type="button"
                        onClick={() => setIsCarrierSelectorOpen(false)}
                        className="text-[#74584d] hover:underline font-medium text-[11px]"
                      >
                        Thu gọn
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {SHIPPING_CARRIERS.map((carrier) => {
                        const isSelected = selectedCarrierId === carrier.id;
                        const isCarrierFree = carrier.freeThreshold && subtotal >= carrier.freeThreshold;

                        return (
                          <label
                            key={carrier.id}
                            onClick={() => {
                              setSelectedCarrierId(carrier.id);
                            }}
                            className={`cursor-pointer p-3 rounded-xl border transition-all flex flex-col justify-between ${
                              isSelected
                                ? 'border-[#74584d] bg-[#fed8c9]/15 ring-1 ring-[#74584d]'
                                : 'border-[#202022]/8 bg-[#fcf9f4] hover:bg-[#f6f3ee]'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  name="carrier"
                                  checked={isSelected}
                                  onChange={() => setSelectedCarrierId(carrier.id)}
                                  className="text-[#74584d] focus:ring-[#74584d]"
                                />
                                <div>
                                  <span className="font-semibold text-xs text-[#1c1c19] block">
                                    {carrier.name}
                                  </span>
                                  <span className="text-[10px] text-[#77767b]">
                                    Dự kiến: {carrier.estimatedTime}
                                  </span>
                                </div>
                              </div>

                              <div className="text-right">
                                {isCarrierFree ? (
                                  <span className="text-[11px] font-bold text-[#8a9a86]">
                                    MIỄN PHÍ
                                  </span>
                                ) : (
                                  <span className="text-xs font-bold text-[#1c1c19]">
                                    {carrier.price.toLocaleString('vi-VN')}₫
                                  </span>
                                )}
                              </div>
                            </div>

                            <p className="text-[10px] text-[#77767b] mt-1.5 line-clamp-2">
                              {carrier.description}
                            </p>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. PHƯƠNG THỨC THANH TOÁN */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#202022]/8 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#202022]/6 gap-2">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-[#1c1c19] uppercase tracking-wider">
                    <CreditCard className="w-4 h-4 text-[#74584d]" />
                    <span>{cData.step3Title}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 overflow-x-auto py-0.5">
                    <span className="text-[10px] text-[#77767b] mr-0.5 hidden xs:inline">
                      {language === 'vi' ? 'Chấp nhận:' : language === 'de' ? 'Akzeptiert:' : language === 'es' ? 'Aceptamos:' : language === 'zh' ? '支持：' : 'Accepted:'}
                    </span>
                    <VisaBadge className="h-5" />
                    <VisaDebitBadge className="h-5" />
                    <VisaSecureBadge className="h-5" />
                    <MastercardBadge className="h-5" />
                    <NapasBadge className="h-5" />
                    <VietQRBadge className="h-5" />
                  </div>
                </div>

                {/* 4 Payment Options Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {/* Option 1: VietQR MB Bank */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('vietqr')}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                      paymentMethod === 'vietqr'
                        ? 'border-[#74584d] bg-[#fed8c9]/15 text-[#1c1c19] font-bold shadow-xs'
                        : 'border-[#202022]/8 bg-[#fcf9f4] text-[#46464a] hover:bg-[#f6f3ee]'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-[#e02020]" />
                    <span className="text-[11px]">{cData.payVietQRTitle}</span>
                    <span className="text-[9px] text-[#8a9a86] font-medium">{cData.payVietQRDesc}</span>
                  </button>

                  {/* Option 2: Thẻ Visa / Mastercard */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#1434CB] bg-[#1434CB]/8 text-[#1c1c19] font-bold shadow-xs ring-1 ring-[#1434CB]/30'
                        : 'border-[#202022]/8 bg-[#fcf9f4] text-[#46464a] hover:bg-[#f6f3ee]'
                    }`}
                  >
                    <div className="flex items-center space-x-1">
                      <VisaBadge className="h-4.5 px-1 py-0" />
                      <MastercardBadge className="h-4.5 px-1 py-0" />
                    </div>
                    <span className="text-[11px]">{cData.payCardTitle}</span>
                    <span className="text-[9px] text-[#1434CB] font-semibold">{cData.payCardDesc}</span>
                  </button>

                  {/* Option 3: COD */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#74584d] bg-[#fed8c9]/15 text-[#1c1c19] font-bold shadow-xs'
                        : 'border-[#202022]/8 bg-[#fcf9f4] text-[#46464a] hover:bg-[#f6f3ee]'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-[#8a9a86]" />
                    <span className="text-[11px]">{cData.payCODTitle}</span>
                    <span className="text-[9px] text-[#77767b]">{cData.payCODDesc}</span>
                  </button>

                  {/* Option 4: Chuyển khoản ngân hàng (TK mang tên ALPS) */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-[#74584d] bg-[#fed8c9]/15 text-[#1c1c19] font-bold shadow-xs'
                        : 'border-[#202022]/8 bg-[#fcf9f4] text-[#46464a] hover:bg-[#f6f3ee]'
                    }`}
                  >
                    <Building className="w-5 h-5 text-[#002f87]" />
                    <span className="text-[11px]">
                      {language === 'vi' ? 'Chuyển Khoản' : language === 'de' ? 'Banküberweisung' : language === 'es' ? 'Transferencia' : language === 'zh' ? '银行转账' : 'Bank Transfer'}
                    </span>
                    <span className="text-[9px] text-[#77767b]">TK ALPS MB</span>
                  </button>
                </div>

                {/* Conditional Payment Method Display */}
                <div className="pt-2">
                  {paymentMethod === 'vietqr' && (
                    <div className="space-y-3">
                      <div className="p-3 bg-red-50/50 border border-red-100 rounded-xl text-xs text-[#1c1c19] space-y-1">
                        <p className="font-semibold text-[11px] text-[#ba1a1a] flex items-center space-x-1">
                          <span>✦</span>
                          <span>{cData.payVietQRTitle}</span>
                        </p>
                        <p className="text-[11px] text-[#77767b]">
                          {cData.payVietQRDesc}
                        </p>
                      </div>

                      {/* Display authentic VietQR Card */}
                      <VietQRCard
                        orderNumber={orderNumber}
                        amount={totalAmount}
                        onShowToast={onShowToast}
                        isPaymentReceived={paymentReceived}
                        isVerifying={isVerifyingPayment}
                        onCheckPayment={handleCheckPayment}
                      />
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-4 p-4 sm:p-5 bg-gradient-to-b from-[#faf8f5] to-white rounded-2xl border border-[#1434CB]/20 shadow-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b border-[#202022]/8 gap-2">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-4 h-4 text-[#1434CB]" />
                          <span className="font-semibold text-xs text-[#1c1c19]">
                            {cData.payCardTitle}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1.5 flex-wrap">
                          <VisaBadge className="h-6" />
                          <VisaDebitBadge className="h-6" />
                          <VisaSecureBadge className="h-6" />
                          <MastercardBadge className="h-6" />
                          <JcbBadge className="h-6" />
                        </div>
                      </div>

                      {/* 3D Realistic Visa Card Preview */}
                      <div className="py-1">
                        <RealisticCardVisual
                          cardNumber={cardNumber}
                          cardHolder={cardHolder}
                          cardExpiry={cardExpiry}
                          isAuthorized={cardAuthSuccess}
                        />
                      </div>

                      {/* Security guarantee banner */}
                      <div className="flex items-center space-x-2 text-[10.5px] text-[#1c3a6b] bg-blue-50/80 p-2.5 rounded-xl border border-blue-100">
                        <ShieldCheck className="w-4 h-4 text-[#1434CB] shrink-0" />
                        <span>{cData.cardSecureHint}</span>
                      </div>

                      {/* Card form */}
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-medium text-[#77767b] mb-1">
                            {cData.cardNumberLabel} <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                                const formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ');
                                setCardNumber(formatted);
                              }}
                              placeholder="4123 4567 8901 2345"
                              maxLength={19}
                              className="w-full pl-3 pr-24 py-2.5 rounded-xl bg-white border border-[#ebe8e3] text-xs font-mono tracking-wider focus:outline-none focus:border-[#1434CB] focus:ring-1 focus:ring-[#1434CB]/20"
                            />
                            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                              <VisaBadge className="h-5" />
                              <MastercardBadge className="h-5" />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-medium text-[#77767b] mb-1">
                              {cData.cardHolderLabel} <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={cardHolder}
                              onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                              placeholder="NGUYEN VAN A"
                              className="w-full px-3 py-2 rounded-xl bg-white border border-[#ebe8e3] text-xs uppercase font-mono focus:outline-none focus:border-[#1434CB]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[11px] font-medium text-[#77767b] mb-1">
                                {cData.cardExpiryLabel} <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={cardExpiry}
                                onChange={(e) => {
                                  let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                                  if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2);
                                  setCardExpiry(v);
                                }}
                                placeholder="12/28"
                                maxLength={5}
                                className="w-full px-3 py-2 rounded-xl bg-white border border-[#ebe8e3] text-xs font-mono text-center focus:outline-none focus:border-[#1434CB]"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-medium text-[#77767b] mb-1 flex items-center justify-between">
                                <span>{cData.cardCvvLabel} <span className="text-red-500">*</span></span>
                                <Lock className="w-3 h-3 text-[#77767b]" />
                              </label>
                              <input
                                type="password"
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                placeholder="•••"
                                maxLength={4}
                                className="w-full px-3 py-2 rounded-xl bg-white border border-[#ebe8e3] text-xs font-mono text-center tracking-widest focus:outline-none focus:border-[#1434CB]"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Card Auth / Verification status */}
                        {cardAuthSuccess ? (
                          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs flex items-center space-x-2 text-emerald-900">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Thẻ Visa hợp lệ & đã được cấp phép ủy quyền trước {totalAmount.toLocaleString('vi-VN')}₫ (Visa Secure OTP)</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={handleAuthorizeCard}
                            disabled={isAuthorizingCard}
                            className="w-full py-2.5 px-4 bg-[#1434CB] hover:bg-[#0F1E4A] text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm active:scale-98"
                          >
                            {isAuthorizingCard ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#fed8c9]" />
                                <span>Đang kết nối cổng thanh toán thẻ Visa Secure 3D OTP...</span>
                              </>
                            ) : (
                              <>
                                <Lock className="w-3.5 h-3.5 text-white" />
                                <span>Xác thực thẻ Visa & Mở khóa đặt hàng</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="p-4 bg-[#fcf9f4] border border-[#ebe8e3] rounded-2xl text-xs space-y-2">
                      <div className="flex items-center space-x-2 text-[#74584d] font-semibold">
                        <Banknote className="w-4 h-4" />
                        <span>Thanh toán bằng tiền mặt khi nhận hàng (COD)</span>
                      </div>
                      <p className="text-[#46464a] text-[11px]">
                        Quý khách sẽ thanh toán đúng số tiền <strong>{totalAmount.toLocaleString('vi-VN')}₫</strong> cho nhân viên giao hàng sau khi mở hộp đồng kiểm sản phẩm. Không phát sinh thêm bất kỳ phụ phí nào.
                      </p>
                      <div className="text-[10px] text-[#8a9a86] font-medium flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Được quyền kiểm tra tem niêm phong và vòi pump trước khi trả tiền</span>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'bank_transfer' && (
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl text-xs text-[#1c1c19]">
                        <p className="font-semibold text-[11px] text-[#002f87]">
                          Chuyển khoản thủ công vào số tài khoản đại diện thương hiệu Alps:
                        </p>
                        <p className="text-[11px] text-[#77767b] mt-0.5">
                          Sau khi chuyển khoản, đơn hàng sẽ được bộ phận kế toán tự động duyệt trong 60 giây.
                        </p>
                      </div>

                      {/* Bank Details Card */}
                      <VietQRCard
                        orderNumber={orderNumber}
                        amount={totalAmount}
                        onShowToast={onShowToast}
                        isPaymentReceived={paymentReceived}
                        isVerifying={isVerifyingPayment}
                        onCheckPayment={handleCheckPayment}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary & Review (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#202022]/8 shadow-xs space-y-4 sticky top-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#202022]/6">
                  <h3 className="font-serif text-sm font-semibold text-[#1c1c19]">
                    {cData.orderSummaryTitle} ({items.reduce((s, i) => s + i.quantity, 0)})
                  </h3>
                  <span className="text-[10px] text-[#74584d] font-semibold uppercase">
                    ALPS
                  </span>
                </div>

                {/* Items List */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => {
                    const loc = getLocalizedProduct(item.product, language);
                    const prodName = loc?.name || item.product.name;
                    return (
                      <div
                        key={item.product.id}
                        className="flex items-center space-x-3 text-xs pb-2 border-b border-[#202022]/5 last:border-0"
                      >
                        <img
                          src={item.product.image}
                          alt={prodName}
                          className="w-12 h-12 object-cover rounded-xl border border-[#202022]/6 bg-[#f6f3ee] shrink-0"
                        />
                        <div className="flex-grow min-w-0">
                          <h4 className="font-serif text-xs text-[#1c1c19] truncate font-medium">
                            {prodName}
                          </h4>
                          <div className="text-[10px] text-[#77767b] flex items-center space-x-2">
                            <span>{item.product.capacity}</span>
                            <span>•</span>
                            <span>{language === 'vi' ? 'Số lượng' : language === 'de' ? 'Menge' : language === 'es' ? 'Cantidad' : language === 'zh' ? '数量' : 'Qty'}: {item.quantity}</span>
                          </div>
                          <div className="font-medium text-[#1c1c19] text-[11px] mt-0.5">
                            {(item.product.price * item.quantity).toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}₫
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Promo Code Input */}
                <div className="pt-2 border-t border-[#202022]/6">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder={language === 'vi' ? 'Nhập mã ưu đãi (VD: ALPS10)' : 'Promo code (e.g. ALPS10)'}
                      className="flex-grow px-3 py-2 bg-[#fcf9f4] border border-[#ebe8e3] rounded-xl text-xs uppercase tracking-wider focus:outline-none focus:border-[#74584d]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-3 py-2 bg-[#1c1c19] hover:bg-black text-white rounded-xl text-xs font-semibold tracking-wider transition-colors shrink-0 cursor-pointer"
                    >
                      {language === 'vi' ? 'Áp Dụng' : language === 'de' ? 'Anwenden' : language === 'es' ? 'Aplicar' : language === 'zh' ? '应用' : 'Apply'}
                    </button>
                  </div>
                  {promoApplied && (
                    <span className="text-[10px] text-[#8a9a86] font-medium block mt-1">
                      ✓ {discountPercent}% discount applied
                    </span>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="pt-3 border-t border-[#202022]/6 space-y-2 text-xs">
                  <div className="flex justify-between text-[#77767b]">
                    <span>{cData.subtotalLabel}:</span>
                    <span>{subtotal.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}₫</span>
                  </div>

                  <div className="flex justify-between text-[#77767b]">
                    <span>{cData.shippingLabel} ({selectedCarrier.name}):</span>
                    <span>
                      {isFreeShipping ? (
                        <span className="text-[#8a9a86] font-bold">
                          {language === 'vi' ? 'MIỄN PHÍ' : language === 'de' ? 'KOSTENLOS' : language === 'es' ? 'GRATIS' : language === 'zh' ? '免费' : 'FREE'}
                        </span>
                      ) : (
                        `${shippingFee.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}₫`
                      )}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#8a9a86] font-medium">
                      <span>{cData.discountLabel}:</span>
                      <span>-{discountAmount.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}₫</span>
                    </div>
                  )}

                  <div className="flex justify-between items-baseline pt-2 border-t border-[#202022]/10 text-sm">
                    <span className="font-serif font-bold text-[#1c1c19]">{cData.totalLabel}:</span>
                    <span className="font-serif font-bold text-[#1c1c19] text-lg sm:text-xl">
                      {totalAmount.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}₫
                    </span>
                  </div>
                  <div className="text-[10px] text-[#77767b] text-right">
                    {cData.sslSecureText}
                  </div>
                </div>

                {/* Policies link callout */}
                {onOpenPolicies && (
                  <div className="pt-2 border-t border-[#202022]/6 text-[11px] text-[#77767b] space-y-1">
                    <p className="flex items-center space-x-1 text-[#74584d] font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{cData.guarantee30Days}</span>
                    </p>
                    <div className="flex flex-wrap gap-2 text-[10px]">
                      <button
                        type="button"
                        onClick={() => onOpenPolicies('returns')}
                        className="underline hover:text-[#1c1c19] cursor-pointer"
                      >
                        {language === 'vi' ? 'Đổi trả 30 ngày' : language === 'de' ? '30 Tage Rückgabe' : language === 'es' ? 'Devolución 30 días' : language === 'zh' ? '30天退换' : '30-Day Returns'}
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() => onOpenPolicies('shipping')}
                        className="underline hover:text-[#1c1c19] cursor-pointer"
                      >
                        {language === 'vi' ? 'Chính sách vận chuyển' : language === 'de' ? 'Versandrichtlinien' : language === 'es' ? 'Envíos' : language === 'zh' ? '配送政策' : 'Shipping Policy'}
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() => onOpenPolicies('privacy')}
                        className="underline hover:text-[#1c1c19] cursor-pointer"
                      >
                        {language === 'vi' ? 'Bảo mật thông tin' : language === 'de' ? 'Datenschutz' : language === 'es' ? 'Privacidad' : language === 'zh' ? '隐私政策' : 'Privacy'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Confirm Order Button */}
                <div className="pt-3 space-y-2">
                  {formError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-[#ba1a1a] rounded-xl text-xs flex items-center space-x-2 animate-pulse">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <button
                    id="checkout-confirm-btn"
                    type="button"
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all shadow-lg flex items-center justify-center space-x-2 bg-[#1c1c19] hover:bg-black text-white active:scale-98 ring-2 ring-[#74584d]/40 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{cData.processingBtn}</span>
                      </span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#fed8c9]" />
                        <span>
                          {paymentMethod === 'card'
                            ? cardAuthSuccess
                              ? `✓ ${cData.placeOrderBtn}`
                              : `VISA / MASTER • ${cData.placeOrderBtn}`
                            : paymentReceived
                            ? `✓ ${cData.placeOrderBtn}`
                            : `${cData.placeOrderBtn} • ${totalAmount.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}₫`}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-center text-[11px] text-[#77746f]">
                    {cData.policyAgreeText}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
