import { useCopy } from '../i18n/useCopy';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  User,
  Award,
  Clock,
  LogOut,
  Package,
  CheckCircle2,
  Truck,
  RotateCcw,
  Mail,
  Lock,
  Phone,
  MapPin,
  Edit3,
  Check,
  Headphones,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { UserProfile, Order, Product } from '../types';

interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  orders: Order[];
  onLogin: (name: string, email: string, phone?: string, address?: string) => void;
  onLogout: () => void;
  onGoogleLogin?: () => Promise<void>;
  onUpdateProfile?: (updated: { name: string; phone: string; address: string }) => void;
  onUpdateOrderAddress?: (orderId: string, newAddress: string, newPhone?: string, newName?: string) => void;
  onSelectProduct: (product: Product) => void;
  onReorder: (order: Order) => void;
  onOpenSupport?: () => void;
  initialTab?: 'orders' | 'profile';
  onAddToCart?: (product: Product, quantity?: number) => void;
}

export const AccountDrawer: React.FC<AccountDrawerProps> = ({
  isOpen,
  onClose,
  user,
  orders,
  onLogin,
  onLogout,
  onGoogleLogin,
  onUpdateProfile,
  onUpdateOrderAddress,
  onSelectProduct,
  onReorder,
  onOpenSupport,
  initialTab = 'orders',
  onAddToCart,
}) => {
  const copy = useCopy();
  const [activeSubTab, setActiveSubTab] = useState<'orders' | 'profile'>(initialTab);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  // UI state
  const [authError, setAuthError] = useState('');
  const [showForgotTip, setShowForgotTip] = useState(false);
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'processing' | 'shipping' | 'delivered'>('all');
  const [ordersSubView, setOrdersSubView] = useState<'orders' | 'products'>('orders');

  // Extract unique purchased products across this account's orders
  const purchasedProducts = React.useMemo(() => {
    const map = new Map<
      string,
      {
        product: Product;
        totalQuantity: number;
        timesPurchased: number;
        lastPurchasedAt: string;
      }
    >();

    (orders || []).forEach((order) => {
      if (!Array.isArray(order?.items)) return;
      order.items.forEach((item) => {
        if (!item?.product?.id) return;
        const prodId = item.product.id;
        const existing = map.get(prodId);
        if (existing) {
          existing.totalQuantity += item.quantity || 1;
          existing.timesPurchased += 1;
          if ((order.createdAt || '') > existing.lastPurchasedAt) {
            existing.lastPurchasedAt = order.createdAt || '';
          }
        } else {
          map.set(prodId, {
            product: item.product,
            totalQuantity: item.quantity || 1,
            timesPurchased: 1,
            lastPurchasedAt: order.createdAt || '',
          });
        }
      });
    });

    return Array.from(map.values());
  }, [orders]);

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Order Address Edit State (for pending/processing orders)
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [orderNewAddress, setOrderNewAddress] = useState('');
  const [orderNewPhone, setOrderNewPhone] = useState('');
  const [orderNewName, setOrderNewName] = useState('');

  // Sync state whenever user changes or modal opens
  useEffect(() => {
    if (user && user.isLoggedIn) {
      let currentName = user.name || '';
      let currentPhone = user.phone || '';
      let currentAddress = user.address || '';
      if (user.uid) {
        try {
          const raw = localStorage.getItem(`alps_shipping_${user.uid}`);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed.buyerName) currentName = parsed.buyerName;
            if (parsed.phone) currentPhone = parsed.phone;
            if (parsed.address) currentAddress = parsed.address;
          }
        } catch {}
      }
      setEditName(currentName);
      setEditPhone(currentPhone);
      setEditAddress(currentAddress);
    } else {
      setEditName('');
      setEditPhone('');
      setEditAddress('');
      setIsEditingProfile(false);
      setLoginIdentifier('');
      setLoginPassword('');
      setRegisterName('');
      setRegisterPhone('');
      setRegisterEmail('');
      setRegisterPassword('');
      setAuthError('');
      setSaveSuccessMsg('');
    }
  }, [user, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLoginFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const identifier = loginIdentifier.trim();
    if (!identifier) {
      setAuthError('Vui lòng nhập email hoặc số điện thoại của bạn.');
      return;
    }
    if (!loginPassword.trim()) {
      setAuthError('Vui lòng nhập mật khẩu tài khoản.');
      return;
    }

    // Check if there is a saved account registry in localStorage
    let storedName = '';
    let storedEmail = identifier.includes('@') ? identifier : '';
    let storedPhone = !identifier.includes('@') ? identifier : '';
    let storedAddress = '';

    try {
      const accountsJson = localStorage.getItem('alps_registered_accounts');
      if (accountsJson) {
        const accounts: Array<{ name: string; email: string; phone?: string; address?: string }> = JSON.parse(accountsJson);
        const matched = accounts.find(
          (acc) =>
            (acc.email && acc.email.toLowerCase() === identifier.toLowerCase()) ||
            (acc.phone && acc.phone === identifier)
        );
        if (matched) {
          storedName = matched.name;
          storedEmail = matched.email;
          storedPhone = matched.phone || '';
          storedAddress = matched.address || '';
        }
      }
    } catch {}

    const rawKey = (storedEmail || storedPhone || identifier || 'user').toLowerCase().trim();
    const derivedUid = 'usr_' + btoa(encodeURIComponent(rawKey)).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 28);
    try {
      const shipJson = localStorage.getItem(`alps_shipping_${derivedUid}`);
      if (shipJson) {
        const parsedShip = JSON.parse(shipJson);
        if (parsedShip.address) storedAddress = parsedShip.address;
        if (parsedShip.phone) storedPhone = parsedShip.phone;
        if (parsedShip.buyerName) storedName = parsedShip.buyerName;
      }
    } catch {}

    if (!storedName) {
      // Derive a polite display name from the email or phone if first-time sign-in
      if (identifier.includes('@')) {
        const localPart = identifier.split('@')[0];
        storedName = localPart.charAt(0).toUpperCase() + localPart.slice(1);
      } else {
        storedName = `Khách hàng (${identifier.slice(-4)})`;
      }
    }

    onLogin(storedName, storedEmail || `${identifier}@khachhang.alps.vn`, storedPhone, storedAddress);
    setLoginIdentifier('');
    setLoginPassword('');
    setAuthError('');
  };

  const handleRegisterFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const name = registerName.trim();
    const phone = registerPhone.trim();
    const email = registerEmail.trim();
    const password = registerPassword.trim();

    if (!name) {
      setAuthError('Vui lòng nhập họ và tên của bạn.');
      return;
    }
    if (!email && !phone) {
      setAuthError('Vui lòng nhập số điện thoại hoặc email liên hệ.');
      return;
    }
    if (password.length < 6) {
      setAuthError('Mật khẩu cần tối thiểu 6 ký tự để bảo vệ tài khoản.');
      return;
    }

    // Save newly registered account to local registry for subsequent sign-ins
    try {
      const accountsJson = localStorage.getItem('alps_registered_accounts');
      const accounts = accountsJson ? JSON.parse(accountsJson) : [];
      const filtered = accounts.filter(
        (acc: any) =>
          (!email || acc.email?.toLowerCase() !== email.toLowerCase()) &&
          (!phone || acc.phone !== phone)
      );
      filtered.push({ name, email, phone, address: '' });
      localStorage.setItem('alps_registered_accounts', JSON.stringify(filtered));
    } catch {}

    onLogin(name, email || `${phone}@khachhang.alps.vn`, phone, '');
    setRegisterName('');
    setRegisterPhone('');
    setRegisterEmail('');
    setRegisterPassword('');
    setAuthError('');
  };

  const handleSaveProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      alert('Vui lòng nhập họ tên người mua');
      return;
    }

    if (onUpdateProfile) {
      onUpdateProfile({
        name: editName.trim(),
        phone: editPhone.trim(),
        address: editAddress.trim(),
      });
    }

    if (user?.uid) {
      try {
        const existing = localStorage.getItem(`alps_shipping_${user.uid}`);
        const parsed = existing ? JSON.parse(existing) : {};
        const updatedShip = {
          ...parsed,
          buyerName: editName.trim(),
          phone: editPhone.trim(),
          email: user.email || '',
          address: editAddress.trim(),
        };
        localStorage.setItem(`alps_shipping_${user.uid}`, JSON.stringify(updatedShip));
      } catch {}

      try {
        const accountsJson = localStorage.getItem('alps_registered_accounts');
        if (accountsJson) {
          const accounts = JSON.parse(accountsJson);
          const newAccounts = accounts.map((acc: any) => {
            if (
              (user.email && acc.email?.toLowerCase() === user.email.toLowerCase()) ||
              (user.phone && acc.phone === user.phone)
            ) {
              return {
                ...acc,
                name: editName.trim(),
                phone: editPhone.trim(),
                address: editAddress.trim(),
              };
            }
            return acc;
          });
          localStorage.setItem('alps_registered_accounts', JSON.stringify(newAccounts));
        }
      } catch {}
    }

    setIsEditingProfile(false);
    setSaveSuccessMsg('Đã cập nhật thông tin và địa chỉ giao hàng thành công!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handleLogoutAction = () => {
    setEditName('');
    setEditPhone('');
    setEditAddress('');
    setIsEditingProfile(false);
    setLoginIdentifier('');
    setLoginPassword('');
    setRegisterName('');
    setRegisterPhone('');
    setRegisterEmail('');
    setRegisterPassword('');
    setAuthError('');
    setSaveSuccessMsg('');
    setOrdersSubView('orders');
    setOrderStatusFilter('all');
    onLogout();
  };

  const handleSaveOrderAddress = (orderId: string) => {
    if (!orderNewAddress.trim()) {
      alert('Vui lòng nhập địa chỉ giao hàng mới');
      return;
    }
    if (onUpdateOrderAddress) {
      onUpdateOrderAddress(
        orderId,
        orderNewAddress.trim(),
        orderNewPhone.trim() || undefined,
        orderNewName.trim() || undefined
      );
    }
    setEditingOrderId(null);
  };

  const filteredOrders = orders.filter((order) => {
    if (orderStatusFilter === 'all') return true;
    return order.status === orderStatusFilter;
  });

  return createPortal(
    <div className={`account-overlay bg-black/60 backdrop-blur-xs ${user ? 'account-overlay--drawer' : ''}`}>
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div role="dialog" aria-modal="true" aria-labelledby="alps-account-title" className="account-panel relative bg-[#fcf9f4] shadow-2xl flex flex-col z-10">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#202022]/10 flex items-center justify-between gap-3 bg-white shrink-0">
          <div className="flex items-center space-x-2 min-w-0">
            <span className="text-xs text-[#74584d]">{"✦"}</span>
            <h3 id="alps-account-title" className="font-serif text-base sm:text-lg font-normal text-[#1c1c19] min-w-0">
              {copy(user ? 'Tài Khoản Thành Viên ALPS' : 'Tài Khoản ALPS Pure Essence')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#77767b] hover:text-[#1c1c19] rounded-full hover:bg-[#f0ede9] transition-colors shrink-0"
            title={copy("Đóng")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation when logged in */}
        {user ? (
          <div className="bg-white px-4 pt-2 border-b border-[#202022]/8 flex space-x-6 overflow-x-auto scrollbar-none">
            <button
              onClick={() => {
                setActiveSubTab('orders');
                setIsEditingProfile(false);
              }}
              className={`pb-3 text-xs font-medium tracking-wider uppercase transition-all relative whitespace-nowrap shrink-0 flex items-center ${
                activeSubTab === 'orders'
                  ? 'text-[#1c1c19] font-semibold'
                  : 'text-[#77767b] hover:text-[#1c1c19]'
              }`}
            >
              <span className="whitespace-nowrap">{copy("Danh Mục Đã Mua")}</span>
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-[#f0ede9] text-[#1c1c19] whitespace-nowrap font-medium">
                {copy(orders.length)}
              </span>
              {activeSubTab === 'orders' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#74584d]" />
              )}
            </button>

            <button
              onClick={() => setActiveSubTab('profile')}
              className={`pb-3 text-xs font-medium tracking-wider uppercase transition-all relative whitespace-nowrap shrink-0 flex items-center ${
                activeSubTab === 'profile'
                  ? 'text-[#1c1c19] font-semibold'
                  : 'text-[#77767b] hover:text-[#1c1c19]'
              }`}
            >
              <span className="whitespace-nowrap">{copy("Hồ Sơ & Địa Chỉ Nhận Hàng")}</span>
              {activeSubTab === 'profile' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#74584d]" />
              )}
            </button>
          </div>
        ) : null}

        {/* Body Container */}
        <div className="account-body flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden p-3 sm:p-5 space-y-4">
          {saveSuccessMsg && (
            <div className="bg-[#8a9a86]/20 border border-[#8a9a86]/40 text-[#2f4a2b] px-4 py-2.5 rounded-2xl text-xs flex items-center space-x-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#3d5a39]" />
              <span>{copy(saveSuccessMsg)}</span>
            </div>
          )}

          {!user ? (
            /* --- LOGGED OUT STATE: CLEAN AUTHENTICATION --- */
            <div className="space-y-4">
              {/* Brand Privilege Intro */}
              <div className="bg-white rounded-3xl p-5 border border-[#202022]/6 shadow-xs text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#f6f3ee] text-[#74584d] flex items-center justify-center mx-auto mb-2 border border-[#ebe8e3]">
                  <User className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h4 className="font-serif text-lg font-normal text-[#1c1c19]">
                  {copy("Đăng Nhập Khách Hàng")}</h4>
                <p className="text-xs text-[#77767b] max-w-xs mx-auto">
                  {copy("Đăng nhập tài khoản để theo dõi đơn hàng, quản lý địa chỉ nhận hàng và nhận ưu đãi độc quyền chuẩn Thụy Sĩ.")}</p>

                {/* Auth Mode Switcher */}
                <div className="flex bg-[#f6f3ee] rounded-full p-1 border border-[#ebe8e3] mt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setAuthError('');
                    }}
                    className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all flex items-center justify-center space-x-1.5 ${
                      authMode === 'login'
                        ? 'bg-white text-[#1c1c19] shadow-xs'
                        : 'text-[#77767b] hover:text-[#1c1c19]'
                    }`}
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>{copy("Đăng nhập")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('register');
                      setAuthError('');
                    }}
                    className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all flex items-center justify-center space-x-1.5 ${
                      authMode === 'register'
                        ? 'bg-white text-[#1c1c19] shadow-xs'
                        : 'text-[#77767b] hover:text-[#1c1c19]'
                    }`}
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>{copy("Tạo tài khoản")}</span>
                  </button>
                </div>

                {/* Firebase Google Auth Button */}
                {onGoogleLogin && (
                  <div className="pt-3">
                    <button
                      type="button"
                      disabled={isGoogleLoading}
                      onClick={async () => {
                        setIsGoogleLoading(true);
                        setAuthError('');
                        try {
                          await onGoogleLogin();
                        } catch (err: unknown) {
                          const msg = err instanceof Error ? err.message : String(err);
                          if (!msg.includes('đã đóng') && !msg.includes('đã được đóng') && !msg.includes('đã hủy')) {
                            setAuthError(msg || 'Đăng nhập Google thất bại');
                          }
                        } finally {
                          setIsGoogleLoading(false);
                        }
                      }}
                      className="w-full py-3 px-4 bg-[#fcf9f4] hover:bg-[#f6f3ee] text-[#1c1c19] border border-[#ebe8e3] rounded-full text-xs font-semibold tracking-wider flex items-center justify-center space-x-2.5 transition-all shadow-2xs hover:shadow-xs active:scale-98 cursor-pointer disabled:opacity-60"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z" />
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.13C3.25 21.37 7.34 24 12 24z" />
                        <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.26C.46 8.17 0 9.97 0 12s.46 3.83 1.26 5.42l4.02-3.13z" />
                        <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.58 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.63 1.26 6.58l4.02 3.13c.95-2.83 3.6-4.94 6.72-4.94z" />
                      </svg>
                      <span>
                        {copy(isGoogleLoading ? 'ĐANG KẾT NỐI GOOGLE...' : 'ĐĂNG NHẬP VỚI GOOGLE')}
                      </span>
                    </button>
                    <div className="relative flex py-2.5 items-center">
                      <div className="flex-grow border-t border-[#ebe8e3]"></div>
                      <span className="flex-shrink mx-2 text-[10px] text-[#77767b] tracking-wider uppercase font-medium">{copy("hoặc dùng email / số điện thoại")}</span>
                      <div className="flex-grow border-t border-[#ebe8e3]"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Login Form */}
              {authMode === 'login' ? (
                <form
                  onSubmit={handleLoginFormSubmit}
                  className="bg-white rounded-3xl p-5 border border-[#202022]/6 shadow-xs space-y-3.5"
                >
                  <div>
                    <label className="text-xs font-medium text-[#1c1c19] block mb-1">
                      {copy("Email hoặc Số điện thoại ")}<span className="text-[#ba1a1a]">{"*"}</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#77767b] absolute left-3 top-3" />
                      <input
                        type="text"
                        value={loginIdentifier}
                        onChange={(e) => {
                          setLoginIdentifier(e.target.value);
                          if (authError) setAuthError('');
                        }}
                        placeholder={copy("Nhập email hoặc số điện thoại của bạn")}
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19]"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-[#1c1c19]">
                        {copy("Mật khẩu ")}<span className="text-[#ba1a1a]">{"*"}</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowForgotTip(!showForgotTip)}
                        className="text-[11px] text-[#74584d] hover:underline"
                      >
                        {copy("Quên mật khẩu?")}</button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#77767b] absolute left-3 top-3" />
                      <input
                        type={showLoginPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => {
                          setLoginPassword(e.target.value);
                          if (authError) setAuthError('');
                        }}
                        placeholder={copy("Nhập mật khẩu")}
                        className="w-full text-xs pl-9 pr-9 py-2.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-2.5 text-[#77767b] hover:text-[#1c1c19]"
                        title={copy(showLoginPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu')}
                      >
                        {showLoginPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {showForgotTip && (
                    <div className="p-3 bg-[#f6f3ee] border border-[#ebe8e3] rounded-xl text-[11px] text-[#74584d] flex items-start space-x-2 animate-fadeIn">
                      <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        {copy("Để bảo vệ an toàn thông tin khách hàng, vui lòng liên hệ hotline chăm sóc khách hàng ")}<strong>{"0772 770 134"}</strong> {copy(" hoặc gửi yêu cầu tới ")}<strong>{copy("pure@alps.vn")}</strong> {copy(" để đặt lại mật khẩu tức thì.")}</div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs pt-0.5">
                    <label className="flex items-center space-x-2 text-[#46464a] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-[#ebe8e3] text-[#74584d] focus:ring-[#74584d]"
                      />
                      <span>{copy("Ghi nhớ đăng nhập")}</span>
                    </label>
                  </div>

                  {authError && (
                    <div className="p-2.5 bg-red-50 border border-red-200 text-[#ba1a1a] rounded-xl text-[11px] flex items-center space-x-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{copy(authError)}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#202022] hover:bg-black text-white text-xs font-semibold tracking-wider rounded-full shadow-md transition-all active:scale-98 mt-2"
                  >
                    {copy("ĐĂNG NHẬP")}</button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('register');
                        setAuthError('');
                      }}
                      className="text-xs text-[#74584d] hover:underline"
                    >
                      {copy("Chưa có tài khoản? Đăng ký ngay")}</button>
                  </div>
                </form>
              ) : (
                /* Register Form */
                <form
                  onSubmit={handleRegisterFormSubmit}
                  className="bg-white rounded-3xl p-5 border border-[#202022]/6 shadow-xs space-y-3.5"
                >
                  <div>
                    <label className="text-xs font-medium text-[#1c1c19] block mb-1">
                      {copy("Họ và tên của bạn ")}<span className="text-[#ba1a1a]">{"*"}</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#77767b] absolute left-3 top-3" />
                      <input
                        type="text"
                        value={registerName}
                        onChange={(e) => {
                          setRegisterName(e.target.value);
                          if (authError) setAuthError('');
                        }}
                        placeholder={copy("Nhập họ và tên đầy đủ")}
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19]"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#1c1c19] block mb-1">
                      {copy("Số điện thoại nhận hàng ")}<span className="text-[#ba1a1a]">{"*"}</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#77767b] absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={registerPhone}
                        onChange={(e) => {
                          setRegisterPhone(e.target.value);
                          if (authError) setAuthError('');
                        }}
                        placeholder={copy("Nhập số điện thoại của bạn")}
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#1c1c19] block mb-1">
                      {copy("Địa chỉ Email")}</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#77767b] absolute left-3 top-3" />
                      <input
                        type="email"
                        value={registerEmail}
                        onChange={(e) => {
                          setRegisterEmail(e.target.value);
                          if (authError) setAuthError('');
                        }}
                        placeholder={copy("Nhập địa chỉ email của bạn")}
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#1c1c19] block mb-1">
                      {copy("Mật khẩu ")}<span className="text-[#ba1a1a]">{"*"}</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#77767b] absolute left-3 top-3" />
                      <input
                        type={showRegisterPassword ? 'text' : 'password'}
                        value={registerPassword}
                        onChange={(e) => {
                          setRegisterPassword(e.target.value);
                          if (authError) setAuthError('');
                        }}
                        placeholder={copy("Tạo mật khẩu (tối thiểu 6 ký tự)")}
                        className="w-full text-xs pl-9 pr-9 py-2.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                        className="absolute right-3 top-2.5 text-[#77767b] hover:text-[#1c1c19]"
                        title={copy(showRegisterPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu')}
                      >
                        {showRegisterPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {authError && (
                    <div className="p-2.5 bg-red-50 border border-red-200 text-[#ba1a1a] rounded-xl text-[11px] flex items-center space-x-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{copy(authError)}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#202022] hover:bg-black text-white text-xs font-semibold tracking-wider rounded-full shadow-md transition-all active:scale-98 mt-2"
                  >
                    {copy("TẠO TÀI KHOẢN MỚI")}</button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('login');
                        setAuthError('');
                      }}
                      className="text-xs text-[#74584d] hover:underline"
                    >
                      {copy("Đã có tài khoản? Đăng nhập ngay")}</button>
                  </div>
                </form>
              )}
            </div>
          ) : activeSubTab === 'orders' ? (
            /* --- TAB 1: DANH MỤC ĐÃ MUA (ORDER HISTORY & PURCHASED CATALOG) --- */
            <div className="space-y-3.5">
              {/* Account Context Badge */}
              {user && (
                <div className="bg-[#fcf9f4] border border-[#ebe8e3] rounded-2xl p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#74584d] text-white flex items-center justify-center text-xs font-semibold shrink-0">
                      {user.avatarInitials || (user.name ? user.name[0].toUpperCase() : 'AL')}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-[#1c1c19] truncate text-xs">
                        {copy("Tài khoản: ")}{user.name}
                      </div>
                      <div className="text-[10px] text-[#77767b] truncate">
                        {user.email || user.phone || 'Lịch sử mua hàng riêng biệt'}
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-[#74584d] font-semibold bg-white px-2.5 py-1 rounded-full border border-[#ebe8e3] shrink-0">
                    {copy(orders.length)} {copy(" đơn hàng")}</div>
                </div>
              )}

              {/* Sub-view Toggle: Theo đơn hàng vs Sản phẩm đã mua */}
              <div className="grid grid-cols-2 gap-1.5 bg-[#f0ede9] p-1 rounded-2xl text-xs">
                <button
                  type="button"
                  onClick={() => setOrdersSubView('orders')}
                  className={`py-2 px-2.5 rounded-xl font-medium transition-all text-center whitespace-nowrap flex items-center justify-center space-x-1 ${
                    ordersSubView === 'orders'
                      ? 'bg-white text-[#1c1c19] shadow-2xs font-semibold'
                      : 'text-[#77767b] hover:text-[#1c1c19]'
                  }`}
                >
                  <span className="whitespace-nowrap">{copy("Theo đơn hàng")}</span>
                  <span className="text-[11px] opacity-75 shrink-0">{"("}{copy(orders.length)}{")"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrdersSubView('products')}
                  className={`py-2 px-2.5 rounded-xl font-medium transition-all text-center whitespace-nowrap flex items-center justify-center space-x-1 ${
                    ordersSubView === 'products'
                      ? 'bg-white text-[#1c1c19] shadow-2xs font-semibold'
                      : 'text-[#77767b] hover:text-[#1c1c19]'
                  }`}
                >
                  <span className="whitespace-nowrap">{copy("Sản phẩm đã mua")}</span>
                  <span className="text-[11px] opacity-75 shrink-0">{"("}{copy(purchasedProducts.length)}{")"}</span>
                </button>
              </div>

              {ordersSubView === 'products' ? (
                /* --- SUB-VIEW: DANH MỤC SẢN PHẨM ĐÃ MUA --- */
                <div className="space-y-3">
                  {purchasedProducts.length === 0 ? (
                    <div className="bg-white rounded-3xl p-8 text-center space-y-3 border border-[#202022]/6">
                      <div className="w-12 h-12 rounded-full bg-[#f6f3ee] text-[#74584d] flex items-center justify-center mx-auto">
                        <Package className="w-6 h-6 stroke-[1.5]" />
                      </div>
                      <h4 className="font-serif text-base font-normal text-[#1c1c19] text-balance">
                        {copy("Tài khoản chưa có sản phẩm đã mua")}</h4>
                      <p className="text-xs text-[#77767b] max-w-xs mx-auto leading-relaxed text-pretty">
                        {copy("Dữ liệu mua sắm được lưu riêng biệt cho từng tài khoản. Khám phá các tinh chất Thụy Sĩ và mua sắm ngay!")}</p>
                      <button
                        onClick={onClose}
                        className="mt-2 px-5 py-2 bg-[#202022] text-white text-xs font-semibold rounded-full hover:bg-black transition-colors whitespace-nowrap"
                      >
                        {copy("Khám phá sản phẩm ALPS")}</button>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {purchasedProducts.map(({ product, totalQuantity, timesPurchased, lastPurchasedAt }) => (
                        <div
                          key={product.id}
                          className="bg-white rounded-3xl p-3.5 sm:p-4 border border-[#202022]/6 shadow-xs flex items-center space-x-3.5 hover:shadow-md transition-shadow"
                        >
                          <div
                            onClick={() => {
                              onSelectProduct(product);
                              onClose();
                            }}
                            className="w-16 h-16 rounded-2xl bg-[#f6f3ee] overflow-hidden shrink-0 border border-[#202022]/8 cursor-pointer group"
                          >
                            <img
                              src={product.image}
                              alt={copy(product.name)}
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = product.fallbackImage;
                              }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="min-w-0 flex-grow pr-1">
                            <div className="text-[10px] uppercase tracking-wider text-[#74584d] font-semibold truncate whitespace-nowrap">
                              {copy(product.categoryLabel || 'Alps Pure Essence')}
                            </div>
                            <h5
                              onClick={() => {
                                onSelectProduct(product);
                                onClose();
                              }}
                              className="font-sans text-xs font-semibold text-[#1c1c19] truncate hover:text-[#74584d] cursor-pointer transition-colors leading-snug"
                            >
                              {copy(product.name)}
                            </h5>
                            <div className="text-[11px] text-[#77767b] mt-0.5 whitespace-nowrap flex items-center space-x-1.5">
                              <span>{copy(product.capacity)}</span>
                              <span>{"•"}</span>
                              <span className="font-semibold text-[#1c1c19] tabular-nums">{product.price.toLocaleString('vi-VN')}{"₫"}</span>
                            </div>
                            <div className="text-[10px] text-[#8a9a86] font-medium mt-1 flex items-center space-x-1.5 flex-wrap">
                              <span className="whitespace-nowrap bg-[#8a9a86]/10 px-1.5 py-0.5 rounded-md">{copy("Đã mua x")}{copy(totalQuantity)}</span>
                              <span className="whitespace-nowrap">{"• "}{copy(timesPurchased)} {copy(" lần đặt")}</span>
                              {lastPurchasedAt && <span className="whitespace-nowrap">{copy("• Gần nhất: ")}{copy(lastPurchasedAt)}</span>}
                            </div>
                          </div>
                          <div className="shrink-0 flex flex-col space-y-1.5">
                            <button
                              onClick={() => {
                                if (onAddToCart) {
                                  onAddToCart(product, 1);
                                } else {
                                  onSelectProduct(product);
                                  onClose();
                                }
                              }}
                              className="px-3.5 py-1.5 bg-[#202022] hover:bg-black text-white text-[11px] font-semibold rounded-full transition-colors whitespace-nowrap active:scale-95 shadow-2xs"
                            >
                              {copy("Mua lại")}</button>
                            <button
                              onClick={() => {
                                onSelectProduct(product);
                                onClose();
                              }}
                              className="px-3 py-1 bg-white hover:bg-[#f6f3ee] text-[#1c1c19] text-[10px] font-medium rounded-full border border-[#ebe8e3] transition-colors whitespace-nowrap"
                            >
                              {copy("Xem lại")}</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* --- SUB-VIEW: THEO ĐƠN HÀNG (EXISTING ORDER LIST) --- */
                <>
                  {/* Order Status Filters */}
                  <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
                    <button
                      onClick={() => setOrderStatusFilter('all')}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                        orderStatusFilter === 'all'
                          ? 'bg-[#202022] text-white'
                          : 'bg-white text-[#77767b] hover:text-[#1c1c19] border border-[#202022]/10'
                      }`}
                    >
                      {copy("Tất cả (")}{copy(orders.length)}{")"}</button>
                    <button
                      onClick={() => setOrderStatusFilter('processing')}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                        orderStatusFilter === 'processing'
                          ? 'bg-[#202022] text-white'
                          : 'bg-white text-[#77767b] hover:text-[#1c1c19] border border-[#202022]/10'
                      }`}
                    >
                      {copy("Đang chuẩn bị (")}{copy(orders.filter((o) => o.status === 'processing').length)}{")"}</button>
                    <button
                      onClick={() => setOrderStatusFilter('shipping')}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                        orderStatusFilter === 'shipping'
                          ? 'bg-[#202022] text-white'
                          : 'bg-white text-[#77767b] hover:text-[#1c1c19] border border-[#202022]/10'
                      }`}
                    >
                      {copy("Đang giao (")}{copy(orders.filter((o) => o.status === 'shipping').length)}{")"}</button>
                    <button
                      onClick={() => setOrderStatusFilter('delivered')}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                        orderStatusFilter === 'delivered'
                          ? 'bg-[#202022] text-white'
                          : 'bg-white text-[#77767b] hover:text-[#1c1c19] border border-[#202022]/10'
                      }`}
                    >
                      {copy("Đã nhận hàng (")}{copy(orders.filter((o) => o.status === 'delivered' || o.status === 'completed').length)}{")"}</button>
                  </div>

              {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 text-center space-y-3 border border-[#202022]/6">
                  <div className="w-12 h-12 rounded-full bg-[#f6f3ee] text-[#74584d] flex items-center justify-center mx-auto">
                    <Package className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h4 className="font-serif text-base font-normal text-[#1c1c19]">
                    {copy("Chưa có đơn hàng nào")}</h4>
                  <p className="text-xs text-[#77767b] max-w-xs mx-auto">
                    {copy("Khám phá ngay bộ sưu tập chăm sóc da cao cấp của ALPS.")}</p>
                  <button
                    onClick={onClose}
                    className="mt-2 px-5 py-2 bg-[#202022] text-white text-xs font-semibold rounded-full hover:bg-black transition-colors"
                  >
                    {copy("Xem sản phẩm")}</button>
                </div>
              ) : (
                filteredOrders.map((order) => {
                  const isDelivered = order.status === 'delivered' || order.status === 'completed';
                  const isShipping = order.status === 'shipping';
                  const isProcessing = order.status === 'processing';
                  const isEditingThisOrder = editingOrderId === order.id;

                  const currentRecipientName = order.buyerName || user?.name || 'Khách hàng ALPS';
                  const currentPhone = order.phone || user?.phone || '';
                  const currentAddress = order.shippingAddress || user?.address || '';

                  return (
                    <div
                      key={order.id}
                      className="bg-white rounded-3xl p-4 sm:p-5 border border-[#202022]/6 shadow-xs space-y-3 hover:shadow-md transition-shadow"
                    >
                      {/* Order Header */}
                      <div className="flex items-center justify-between border-b border-[#f0ede9] pb-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-serif text-sm font-semibold text-[#1c1c19]">
                              {"#"}{copy(order.orderNumber)}
                            </span>
                            <span className="text-[10px] text-[#77767b]">
                              {"• "}{copy(order.createdAt)}
                            </span>
                          </div>
                        </div>

                        {/* Status badge */}
                        <div
                          className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wider ${
                            isDelivered
                              ? 'bg-[#8a9a86]/15 text-[#3d5a39]'
                              : isShipping
                              ? 'bg-[#4a6b82]/15 text-[#2c4a60]'
                              : 'bg-[#d4974f]/15 text-[#855418]'
                          }`}
                        >
                          {isDelivered ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : isShipping ? (
                            <Truck className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          <span>{copy(order.statusLabel)}</span>
                        </div>
                      </div>

                      {/* Items in this order */}
                      <div className="space-y-2.5">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              onSelectProduct(item.product);
                              onClose();
                            }}
                            className="flex items-center space-x-3 cursor-pointer group hover:bg-[#fcf9f4] p-1.5 rounded-xl transition-colors"
                          >
                            <div className="w-12 h-12 rounded-xl bg-[#f6f3ee] overflow-hidden shrink-0 border border-[#202022]/8">
                              <img
                                src={item.product.image}
                                alt={copy(item.product.name)}
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = item.product.fallbackImage;
                                }}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <div className="min-w-0 flex-grow">
                              <h5 className="font-serif text-xs font-normal text-[#1c1c19] truncate group-hover:text-[#74584d] transition-colors">
                                {copy(item.product.name)}
                              </h5>
                              <div className="text-[10px] text-[#77767b] flex items-center space-x-2 mt-0.5">
                                <span>{copy(item.product.capacity)}</span>
                                <span>{copy("• SL: x")}{copy(item.quantity)}</span>
                              </div>
                            </div>
                            <div className="text-xs font-medium text-[#1c1c19] shrink-0 text-right">
                              {(item.unitPrice * item.quantity).toLocaleString('vi-VN')}{"₫"}</div>
                          </div>
                        ))}
                      </div>

                      {/* Shipping & Recipient Details on each order */}
                      {(currentAddress || currentRecipientName) && (
                        <div className="bg-[#fcf9f4] rounded-2xl p-3 border border-[#ebe8e3] text-xs space-y-1.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1.5 text-[#1c1c19] font-medium text-[11px]">
                              <MapPin className="w-3.5 h-3.5 text-[#74584d]" />
                              <span>
                                {copy(currentRecipientName)} {copy(currentPhone ? `• ${currentPhone}` : '')}
                              </span>
                            </div>

                            {/* Allow changing delivery info for processing orders */}
                            {isProcessing && onUpdateOrderAddress && (
                              <button
                                onClick={() => {
                                  if (isEditingThisOrder) {
                                    setEditingOrderId(null);
                                  } else {
                                    setEditingOrderId(order.id);
                                    setOrderNewName(currentRecipientName);
                                    setOrderNewPhone(currentPhone);
                                    setOrderNewAddress(currentAddress);
                                  }
                                }}
                                className="text-[10px] text-[#74584d] font-semibold hover:underline flex items-center space-x-1"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>{copy(isEditingThisOrder ? 'Đóng' : 'Đổi địa chỉ')}</span>
                              </button>
                            )}
                          </div>

                          {!isEditingThisOrder ? (
                            currentAddress ? (
                              <p className="text-[11px] text-[#77767b] pl-5 leading-relaxed">
                                {copy(currentAddress)}
                              </p>
                            ) : null
                          ) : (
                            /* Inline Edit for Pending Order Delivery Info */
                            <div className="pt-2 border-t border-[#ebe8e3] space-y-2 mt-2">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                  <label className="text-[10px] font-medium text-[#77767b] block mb-0.5">
                                    {copy("Tên người nhận")}</label>
                                  <input
                                    type="text"
                                    value={orderNewName}
                                    onChange={(e) => setOrderNewName(e.target.value)}
                                    placeholder={copy("Nhập họ và tên người nhận")}
                                    className="w-full text-xs px-2.5 py-1.5 bg-white rounded-lg border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d]"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] font-medium text-[#77767b] block mb-0.5">
                                    {copy("Số điện thoại")}</label>
                                  <input
                                    type="text"
                                    value={orderNewPhone}
                                    onChange={(e) => setOrderNewPhone(e.target.value)}
                                    placeholder={copy("Nhập số điện thoại")}
                                    className="w-full text-xs px-2.5 py-1.5 bg-white rounded-lg border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d]"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="text-[10px] font-medium text-[#77767b] block mb-0.5">
                                  {copy("Địa chỉ giao hàng mới")}</label>
                                <textarea
                                  rows={2}
                                  value={orderNewAddress}
                                  onChange={(e) => setOrderNewAddress(e.target.value)}
                                  placeholder={copy("Nhập địa chỉ giao hàng chi tiết")}
                                  className="w-full text-xs px-2.5 py-1.5 bg-white rounded-lg border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d]"
                                />
                              </div>
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => setEditingOrderId(null)}
                                  className="px-3 py-1 bg-white text-[#77767b] border border-[#ebe8e3] rounded-full text-[11px]"
                                >
                                  {copy("Hủy")}</button>
                                <button
                                  onClick={() => handleSaveOrderAddress(order.id)}
                                  className="px-3 py-1 bg-[#202022] text-white rounded-full text-[11px] font-medium hover:bg-black"
                                >
                                  {copy("Lưu địa chỉ đơn này")}</button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Order Footer & Action */}
                      <div className="pt-3 border-t border-[#f0ede9] flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[11px] text-[#77767b] block">{copy("Tổng thanh toán")}</span>
                          <span className="font-serif text-base font-semibold text-[#1c1c19]">
                            {order.totalAmount.toLocaleString('vi-VN')}{"₫"}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onReorder(order)}
                            className="inline-flex items-center space-x-1.5 bg-[#f6f3ee] hover:bg-[#f0ede9] text-[#1c1c19] px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors"
                            title={copy("Đặt mua lại các sản phẩm này ngay")}
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-[#74584d]" />
                            <span>{copy("Mua lại")}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </>
          )}

              {/* Customer Care Banner in Orders Tab */}
              {onOpenSupport && (
                <div className="bg-[#fcf9f4] rounded-2xl p-4 border border-[#ebe8e3] text-xs space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 font-semibold text-[#74584d]">
                      <Headphones className="w-4 h-4" />
                      <span>{copy("Cần hỗ trợ tra cứu hoặc đổi thông tin đơn hàng?")}</span>
                    </div>
                    <span className="text-[10px] text-[#8a9a86] font-medium">{"0772 770 134"}</span>
                  </div>
                  <p className="text-[11px] text-[#77767b] leading-relaxed">
                    {copy("Bạn có thể liên hệ trực tiếp với bộ phận Chăm Sóc Khách Hàng 24/7 để được hỗ trợ điều hướng vận chuyển, đổi địa chỉ hoặc tư vấn phác đồ sử dụng.")}</p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenSupport();
                    }}
                    className="w-full py-2 bg-white hover:bg-[#f6f3ee] text-[#1c1c19] text-xs font-semibold rounded-full border border-[#ebe8e3] transition-colors flex items-center justify-center space-x-1.5 shadow-2xs"
                  >
                    <Headphones className="w-3.5 h-3.5 text-[#74584d]" />
                    <span>{copy("LIÊN HỆ CHĂM SÓC KHÁCH HÀNG")}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* --- TAB 2: HỒ SƠ & ĐẶC QUYỀN (PROFILE & EDIT FORM) --- */
            <div className="space-y-4">
              {/* User Profile Card */}
              <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#202022]/6 flex items-center justify-between shadow-xs">
                <div className="flex items-center space-x-3 min-w-0">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={copy(user.name)}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border border-[#ebe8e3] shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#74584d] font-serif text-lg border border-[#ebe8e3] shrink-0 font-medium">
                      {user.avatarInitials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="font-serif text-base font-normal text-[#1c1c19] truncate">
                      {user.name}
                    </h4>
                    <p className="text-xs text-[#77767b] truncate">{user.email}</p>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                      <div className="inline-flex items-center space-x-1 text-[10px] text-[#74584d] bg-[#fed8c9]/40 px-2 py-0.5 rounded-full font-medium">
                        <Award className="w-3 h-3" />
                        <span>{user.tier}</span>
                      </div>
                      {user.uid && (
                        <div className="inline-flex items-center space-x-1 text-[9px] text-[#2c4a60] bg-[#4a6b82]/10 px-2 py-0.5 rounded-full font-medium" title={copy("Dữ liệu được lưu trữ và đồng bộ hóa thời gian thực qua Cloud Firestore")}>
                          <span>{copy("✦ Firebase Cloud Sync")}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="p-2 text-[#74584d] hover:bg-[#f6f3ee] rounded-full transition-colors shrink-0"
                    title={copy("Chỉnh sửa thông tin")}
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Edit Mode vs Display Mode for Buyer Info & Shipping Address */}
              {isEditingProfile ? (
                <form
                  onSubmit={handleSaveProfileSubmit}
                  className="bg-white rounded-3xl p-5 border-2 border-[#74584d]/30 shadow-md space-y-4 animate-fadeIn"
                >
                  <div className="flex items-center justify-between border-b border-[#f0ede9] pb-3">
                    <div className="flex items-center space-x-2">
                      <Edit3 className="w-4 h-4 text-[#74584d]" />
                      <h5 className="font-serif text-sm font-semibold text-[#1c1c19]">
                        {copy("Thay Đổi Thông Tin Giao Hàng & Người Mua")}</h5>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="text-xs text-[#77767b] hover:text-[#1c1c19]"
                    >
                      {copy("Hủy")}</button>
                  </div>

                  {/* Buyer Name Input */}
                  <div>
                    <label className="text-xs font-medium text-[#1c1c19] block mb-1">
                      {copy("Họ và tên người mua / nhận hàng ")}<span className="text-[#ba1a1a]">{"*"}</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#77767b] absolute left-3 top-3" />
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder={copy("Nhập họ và tên người mua")}
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19] font-medium"
                      />
                    </div>
                  </div>

                  {/* Phone Number Input */}
                  <div>
                    <label className="text-xs font-medium text-[#1c1c19] block mb-1">
                      {copy("Số điện thoại nhận hàng")}</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#77767b] absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        placeholder={copy("Nhập số điện thoại nhận hàng")}
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19] font-medium"
                      />
                    </div>
                  </div>

                  {/* Shipping Address Textarea */}
                  <div>
                    <label className="text-xs font-medium text-[#1c1c19] block mb-1">
                      {copy("Địa chỉ nhận hàng chi tiết")}</label>
                    <div className="relative">
                      <textarea
                        rows={3}
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        placeholder={copy("Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố")}
                        className="w-full text-xs p-3 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19] leading-relaxed font-medium"
                      />
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="flex-1 py-2.5 bg-[#f6f3ee] text-[#1c1c19] rounded-full text-xs font-medium hover:bg-[#ebe8e3] transition-colors"
                    >
                      {copy("HỦY BỎ")}</button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-[#202022] hover:bg-black text-white rounded-full text-xs font-semibold tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center space-x-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>{copy("LƯU THÔNG TIN")}</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Saved Shipping Info Display Card with Edit Button */
                <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#202022]/6 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#f0ede9]">
                    <div className="flex items-center space-x-2 text-[#1c1c19] font-medium text-xs min-w-0">
                      <MapPin className="w-4 h-4 text-[#74584d] shrink-0" />
                      <span className="truncate whitespace-nowrap">{copy("Thông Tin Người Nhận & Địa Chỉ Mặc Định")}</span>
                    </div>
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="inline-flex items-center space-x-1 text-xs text-[#74584d] font-semibold hover:underline bg-[#fed8c9]/25 px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 ml-2"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{copy("Thay đổi")}</span>
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-start justify-between">
                      <span className="text-[#77767b] text-[11px] w-24 shrink-0 whitespace-nowrap">{copy("Họ và tên:")}</span>
                      <span className="text-[#1c1c19] font-semibold text-right break-words">{user.name}</span>
                    </div>

                    <div className="flex items-start justify-between">
                      <span className="text-[#77767b] text-[11px] w-24 shrink-0 whitespace-nowrap">{copy("Số điện thoại:")}</span>
                      <span className="text-[#1c1c19] font-medium text-right tabular-nums whitespace-nowrap">
                        {user.phone || <span className="text-[#77767b] font-normal italic">{copy("Chưa cập nhật")}</span>}
                      </span>
                    </div>

                    <div className="flex items-start justify-between">
                      <span className="text-[#77767b] text-[11px] w-24 shrink-0 whitespace-nowrap">{copy("Địa chỉ giao:")}</span>
                      <span className="text-[#46464a] text-right max-w-[260px] leading-relaxed break-words">
                        {user.address || <span className="text-[#77767b] font-normal italic">{copy("Chưa cập nhật địa chỉ")}</span>}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-2xl p-3 border border-[#202022]/6 text-center">
                  <span className="text-[10px] text-[#77767b] uppercase tracking-wider block">
                    {copy("ĐIỂM TÍCH LŨY")}</span>
                  <span className="font-serif text-xl text-[#1c1c19] font-medium mt-0.5 block">
                    {user.points.toLocaleString('vi-VN')}
                  </span>
                  <span className="text-[10px] text-[#8a9a86]">
                    {copy("Đổi ")}{(user.points * 100).toLocaleString('vi-VN')}{copy("₫ ưu đãi")}</span>
                </div>
                <div className="bg-white rounded-2xl p-3 border border-[#202022]/6 text-center">
                  <span className="text-[10px] text-[#77767b] uppercase tracking-wider block">
                    {copy("ĐƠN ĐÃ HOÀN TẤT")}</span>
                  <span className="font-serif text-xl text-[#74584d] font-medium mt-0.5 block">
                    {copy(orders.length)} {copy(" đơn")}</span>
                  <span className="text-[10px] text-[#77767b]">{copy("Thành viên VIP")}</span>
                </div>
              </div>

              {/* Quality Guarantee note */}
              <div className="bg-[#f0ede9] rounded-2xl p-4 text-xs text-[#46464a] leading-relaxed border border-[#ebe8e3]">
                <p className="font-serif font-medium text-[#1c1c19] mb-1">
                  {copy("Cam kết giao hàng & bảo chứng Thụy Sĩ:")}</p>
                {copy("Đơn hàng sẽ được chuyển tới đúng địa chỉ của bạn trong 24-48 giờ với quy chuẩn vận chuyển bảo mật, miễn phí đổi trả trong 30 ngày nếu phát hiện bất kỳ kích ứng nào.")}</div>

              {/* Customer Care Banner */}
              {onOpenSupport && (
                <div className="bg-white rounded-2xl p-4 border border-[#202022]/8 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 font-semibold text-[#74584d] text-xs">
                      <Headphones className="w-4 h-4" />
                      <span>{copy("Hỗ Trợ & Tư Vấn Da Liễu 24/7")}</span>
                    </div>
                    <span className="text-[10px] text-[#8a9a86] font-medium">{"0772 770 134"}</span>
                  </div>
                  <p className="text-[11px] text-[#77767b] leading-relaxed">
                    {copy("Đội ngũ chuyên viên tư vấn da Alps luôn sẵn sàng hỗ trợ phác đồ sử dụng hoặc chính sách đổi trả hàng 30 ngày.")}</p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenSupport();
                    }}
                    className="w-full py-2 bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#1c1c19] text-xs font-semibold rounded-full border border-[#ebe8e3] transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <Headphones className="w-3.5 h-3.5 text-[#74584d]" />
                    <span>{copy("MỞ TRUNG TÂM CHĂM SÓC KHÁCH HÀNG")}</span>
                  </button>
                </div>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogoutAction}
                className="w-full py-3 bg-white hover:bg-[#fff5f5] text-[#ba1a1a] border border-[#ba1a1a]/20 rounded-full text-xs font-semibold tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-2xs"
              >
                <LogOut className="w-4 h-4" />
                <span>{copy("ĐĂNG XUẤT TÀI KHOẢN")}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
