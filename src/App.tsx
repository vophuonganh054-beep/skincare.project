import { useCopy } from './i18n/useCopy';
import './components/MobileCatalog.css';
import { createComboProduct } from './data/cartProducts';
import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from './data/products';
import { INITIAL_ORDERS } from './data/initialOrders';
import { Product, CartItem, ActiveTab, ViewMode, Order, UserProfile } from './types';
import { NewProductPopup } from './components/NewProductPopup';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { RitualCallout } from './components/RitualCallout';
import { CatalogSection } from './components/CatalogSection';
import { MinimalistPackagingDesign } from './components/MinimalistPackagingDesign';
import { BrandPhilosophy } from './components/BrandPhilosophy';
import { BottomNav } from './components/BottomNav';
import { ProductDetailModal } from './components/ProductDetailModal';
import { RitualModal } from './components/RitualModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutSuccessModal } from './components/CheckoutSuccessModal';
import { AccountDrawer } from './components/AccountDrawer';
import { CustomerSupportModal } from './components/CustomerSupportModal';
import { FloatingAIChatWidget } from './components/FloatingAIChatWidget';
import { CheckoutModal } from './components/CheckoutModal';
import { PoliciesModal, PolicyTabType } from './components/PoliciesModal';
import { Footer } from './components/Footer';
import { FontSwitcherModal } from './components/FontSwitcherModal';
import { SkinQuizModal } from './components/SkinQuizModal';
import { BrandStoryModal } from './components/BrandStoryModal';
import { WomenDayCampaignSection } from './components/WomenDayCampaignSection';
import { CampaignCombo } from './data/campaign2010';
import { Sparkles, Type } from 'lucide-react';
import { useRouter } from './context/RouterContext';
import { OffersPage } from './pages/OffersPage';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { auth, onAuthStateChanged } from './firebase';
import {
  loginWithGoogle,
  logoutUser,
  updateUserProfileDoc,
  subscribeUserProfile,
  subscribeUserOrders,
  subscribeUserCart,
  getCartFromFirestore,
  getUserOrdersFromFirestore,
  saveOrderToFirestore,
  updateOrderAddressInFirestore,
  saveCartToFirestore,
  clearCartInFirestore,
} from './services/firebaseService';

export default function App() {
  const copy = useCopy();
  const { route, pathname, navigate } = useRouter();

  // Device view mode: 'desktop' | 'mobile' | 'responsive'
  const [viewMode, setViewMode] = useState<ViewMode>('responsive');

  // Navigation tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  useEffect(() => {
    if (route === 'home') setActiveTab('home');
    else if (route === 'products' || route === 'product-detail') setActiveTab('catalog');
    else if (route === 'about') setActiveTab('routine');
  }, [route]);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Track initial auth check to avoid wiping guest cart on first load
  const isInitialAuthRef = useRef(true);
  const isRemoteCartUpdateRef = useRef(false);
  const lastSavedCartJsonRef = useRef('');

  // Dynamic User Profile State (Logged out by default, sanitized of demo users)
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('alps_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.isLoggedIn && parsed?.name) return parsed;
      }
    } catch {}
    return null;
  });

  // Dynamic Shopping Cart State: Starts strictly with NO PRODUCTS (Empty: 0 items)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('alps_active_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return []; // Empty cart by default
  });

  // Save Cart state to Firestore & local storage with loop prevention
  useEffect(() => {
    try {
      const currentCartJson = JSON.stringify(cart);
      const uid = auth.currentUser?.uid || user?.uid;
      if (uid) {
        localStorage.setItem(`alps_cart_${uid}`, currentCartJson);
        // Prevent infinite ping-pong loop when state was updated from Firestore snapshot
        if (isRemoteCartUpdateRef.current) {
          isRemoteCartUpdateRef.current = false;
          lastSavedCartJsonRef.current = currentCartJson;
          return;
        }
        // Only trigger Firestore write if contents actually changed
        if (currentCartJson === lastSavedCartJsonRef.current) {
          return;
        }
        lastSavedCartJsonRef.current = currentCartJson;
        saveCartToFirestore(uid, cart).catch((err) => {
          console.warn('Could not save cart to Firestore:', err);
        });
      } else {
        localStorage.setItem('alps_active_cart', currentCartJson);
      }
    } catch {}
  }, [cart, user?.uid]);

  // Pending purchase action when customer is prompted to log in before purchasing
  const [pendingPurchaseAction, setPendingPurchaseAction] = useState<{
    type: 'buy_now' | 'full_set';
    product?: Product;
    quantity?: number;
  } | null>(null);

  // Dynamic Order History State (Strictly isolated per account, no cross-account overlap)
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const activeUser = localStorage.getItem('alps_user_profile');
      if (activeUser) {
        const parsedUser = JSON.parse(activeUser);
        if (parsedUser?.uid) {
          const userSaved = localStorage.getItem(`alps_orders_${parsedUser.uid}`);
          if (userSaved) {
            const parsed = JSON.parse(userSaved);
            if (Array.isArray(parsed)) return parsed;
          }
        }
      }
    } catch {}
    return [];
  });

  // Persist User Profile
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('alps_user_profile', JSON.stringify(user));
      } else {
        localStorage.removeItem('alps_user_profile');
      }
    } catch {}
  }, [user]);

  // Persist Orders strictly per account (alps_orders_{uid})
  useEffect(() => {
    try {
      const uid = user?.uid || auth.currentUser?.uid;
      if (uid) {
        localStorage.setItem(`alps_orders_${uid}`, JSON.stringify(orders));
      }
    } catch {}
  }, [orders, user?.uid]);

  // Real-time synchronization with Firebase Authentication and Cloud Firestore
  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;
    let unsubscribeOrders: (() => void) | null = null;
    let unsubscribeCart: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (unsubscribeProfile) {
        unsubscribeProfile();
        unsubscribeProfile = null;
      }
      if (unsubscribeOrders) {
        unsubscribeOrders();
        unsubscribeOrders = null;
      }
      if (unsubscribeCart) {
        unsubscribeCart();
        unsubscribeCart = null;
      }

      if (firebaseUser) {
        isInitialAuthRef.current = false;
        const uid = firebaseUser.uid;

        // 1. Subscribe to user profile document in Cloud Firestore
        unsubscribeProfile = subscribeUserProfile(uid, (profile) => {
          if (profile) {
            setUser(profile);
            setLatestRecipient({
              name: profile.name,
              phone: profile.phone || '',
              address: profile.address || '',
            });
          }
        });

        // 2. Subscribe to user orders in Cloud Firestore
        unsubscribeOrders = subscribeUserOrders(uid, (remoteOrders) => {
          if (Array.isArray(remoteOrders)) {
            setOrders(remoteOrders);
          }
        });

        // 3. Subscribe to user personalized cart in Cloud Firestore (carts/{user.uid})
        unsubscribeCart = subscribeUserCart(uid, (remoteCartItems) => {
          if (Array.isArray(remoteCartItems)) {
            const remoteJson = JSON.stringify(remoteCartItems);
            if (remoteJson !== lastSavedCartJsonRef.current) {
              isRemoteCartUpdateRef.current = true;
              lastSavedCartJsonRef.current = remoteJson;
              setCart(remoteCartItems);
            }
          }
        });
      } else {
        // Only clear if previous state was an active authenticated session
        if (!isInitialAuthRef.current) {
          setCart([]);
          setOrders([]);
          try {
            localStorage.removeItem('alps_active_cart');
          } catch {}
        }
        isInitialAuthRef.current = false;
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
      if (unsubscribeOrders) unsubscribeOrders();
      if (unsubscribeCart) unsubscribeCart();
    };
  }, []);

  // Modals and Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeVoucherCode, setActiveVoucherCode] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isRitualModalOpen, setIsRitualModalOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [accountInitialTab, setAccountInitialTab] = useState<'orders' | 'profile'>('orders');
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);
  const [policiesInitialTab, setPoliciesInitialTab] = useState<PolicyTabType>('returns');
  const [isFontSwitcherOpen, setIsFontSwitcherOpen] = useState(false);
  const [isSkinQuizOpen, setIsSkinQuizOpen] = useState(false);
  const [isBrandStoryOpen, setIsBrandStoryOpen] = useState(false);
  const [supportInitialPrompt, setSupportInitialPrompt] = useState<string | undefined>(undefined);
  const [isCheckoutSuccessOpen, setIsCheckoutSuccessOpen] = useState(false);
  const [latestOrderNumber, setLatestOrderNumber] = useState('ALPS-89421');
  const [latestRecipient, setLatestRecipient] = useState<{
    name: string;
    phone: string;
    address: string;
  }>({
    name: '',
    phone: '',
    address: '',
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart total items
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Toast notification helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleOpenSupportWithPrompt = (promptText: string) => {
    setSupportInitialPrompt(promptText);
    setIsSupportOpen(true);
  };

  // User Actions: Login, Logout, Update Profile
  const handleLogin = (name: string, email: string, phone?: string, address?: string) => {
    // Generate deterministic UID for this specific user account
    const rawKey = (email || name || 'user').toLowerCase().trim();
    const uid = 'usr_' + btoa(encodeURIComponent(rawKey)).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 28);

    let effectiveName = name;
    let effectivePhone = phone || '';
    let effectiveAddress = address || '';

    // Check if there is saved recipient / shipping info for this specific account
    try {
      const savedShip = localStorage.getItem(`alps_shipping_${uid}`);
      if (savedShip) {
        const parsed = JSON.parse(savedShip);
        if (parsed.buyerName) effectiveName = parsed.buyerName;
        if (parsed.phone) effectivePhone = parsed.phone;
        if (parsed.address) effectiveAddress = parsed.address;
      }
    } catch {}

    const initials =
      effectiveName
        .trim()
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0])
        .join('')
        .slice(-2)
        .toUpperCase() || 'AL';

    const updatedUser: UserProfile = {
      uid,
      name: effectiveName,
      email,
      phone: effectivePhone,
      address: effectiveAddress,
      tier: 'Hội Viên Alps Pure Privileges',
      points: 100,
      avatarInitials: initials,
      isLoggedIn: true,
    };
    setUser(updatedUser);
    setLatestRecipient({
      name: effectiveName,
      phone: effectivePhone,
      address: effectiveAddress,
    });

    // 1. Restore personalized cart for this user from local account store or Firestore
    try {
      const userSavedCart = localStorage.getItem(`alps_cart_${uid}`);
      if (userSavedCart) {
        const parsed = JSON.parse(userSavedCart);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        } else {
          setCart([]);
        }
      } else {
        setCart([]);
      }
    } catch {
      setCart([]);
    }

    // 2. Restore personalized orders ("danh mục đã mua") for this specific account
    try {
      const userSavedOrders = localStorage.getItem(`alps_orders_${uid}`);
      if (userSavedOrders) {
        const parsed = JSON.parse(userSavedOrders);
        setOrders(Array.isArray(parsed) ? parsed : []);
      } else {
        setOrders([]);
      }
    } catch {
      setOrders([]);
    }

    // Also query Firestore carts/{user.uid} and users/{uid}/orders
    getCartFromFirestore(uid).then((remoteItems) => {
      if (remoteItems && remoteItems.length > 0) {
        setCart(remoteItems);
      }
    }).catch(() => {});

    getUserOrdersFromFirestore(uid).then((remoteOrders) => {
      if (Array.isArray(remoteOrders) && remoteOrders.length > 0) {
        setOrders(remoteOrders);
      }
    }).catch(() => {});

    setIsAccountOpen(false);
    showToast(`Đăng nhập thành công! Chào mừng ${effectiveName}`);

    // If customer clicked Buy Now prior to logging in, resume it immediately
    if (pendingPurchaseAction) {
      if (pendingPurchaseAction.type === 'buy_now' && pendingPurchaseAction.product) {
        setCheckoutItems([
          { product: pendingPurchaseAction.product, quantity: pendingPurchaseAction.quantity || 1 },
        ]);
        setIsCheckoutOpen(true);
      } else if (pendingPurchaseAction.type === 'full_set') {
        setCheckoutItems(PRODUCTS.map((product) => ({ product, quantity: 1 })));
        setIsCheckoutOpen(true);
      }
      setPendingPurchaseAction(null);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const profile = await loginWithGoogle();

      let effectiveName = profile.name;
      let effectivePhone = profile.phone || '';
      let effectiveAddress = profile.address || '';
      try {
        const savedShip = localStorage.getItem(`alps_shipping_${profile.uid}`);
        if (savedShip) {
          const parsed = JSON.parse(savedShip);
          if (parsed.buyerName) effectiveName = parsed.buyerName;
          if (parsed.phone) effectivePhone = parsed.phone;
          if (parsed.address) effectiveAddress = parsed.address;
        }
      } catch {}

      const updatedProfile: UserProfile = {
        ...profile,
        name: effectiveName,
        phone: effectivePhone,
        address: effectiveAddress,
      };
      setUser(updatedProfile);
      setLatestRecipient({
        name: effectiveName,
        phone: effectivePhone,
        address: effectiveAddress,
      });

      // Restore cart & orders for this Google user
      try {
        const userSavedCart = localStorage.getItem(`alps_cart_${profile.uid}`);
        setCart(userSavedCart ? JSON.parse(userSavedCart) : []);
      } catch {
        setCart([]);
      }
      try {
        const userSavedOrders = localStorage.getItem(`alps_orders_${profile.uid}`);
        setOrders(userSavedOrders ? JSON.parse(userSavedOrders) : []);
      } catch {
        setOrders([]);
      }

      setIsAccountOpen(false);
      showToast(`Đăng nhập Google thành công! Chào mừng ${effectiveName}`);

      if (pendingPurchaseAction) {
        if (pendingPurchaseAction.type === 'buy_now' && pendingPurchaseAction.product) {
          setCheckoutItems([
            { product: pendingPurchaseAction.product, quantity: pendingPurchaseAction.quantity || 1 },
          ]);
          setIsCheckoutOpen(true);
        } else if (pendingPurchaseAction.type === 'full_set') {
          setCheckoutItems(PRODUCTS.map((product) => ({ product, quantity: 1 })));
          setIsCheckoutOpen(true);
        }
        setPendingPurchaseAction(null);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (!msg.includes('đã đóng') && !msg.includes('đã được đóng') && !msg.includes('đã hủy')) {
        showToast(msg || 'Đăng nhập Google không thành công.');
      }
      throw err;
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {
      console.warn('Logout error:', e);
    }
    setUser(null);
    setCart([]);
    setOrders([]);
    setLatestRecipient({
      name: '',
      phone: '',
      address: '',
    });
    setLatestOrderNumber('');
    try {
      localStorage.removeItem('alps_user_profile');
      localStorage.removeItem('alps_active_cart');
      localStorage.removeItem('alps_purchased_orders');
    } catch {}
    showToast('Đã đăng xuất tài khoản thành công');
  };

  const handleUpdateProfile = (updated: { name: string; phone: string; address: string }) => {
    setUser((prev) => {
      const initials =
        updated.name
          .trim()
          .split(' ')
          .filter(Boolean)
          .map((part) => part[0])
          .join('')
          .slice(-2)
          .toUpperCase() || (prev ? prev.avatarInitials : 'AL');

      return {
        ...(prev || {
          email: '',
          tier: 'Hội Viên Alps Pure Privileges',
          points: 100,
          isLoggedIn: true,
        }),
        name: updated.name,
        phone: updated.phone,
        address: updated.address,
        avatarInitials: initials,
      };
    });
    setLatestRecipient({
      name: updated.name,
      phone: updated.phone,
      address: updated.address,
    });

    const uid = user?.uid || auth.currentUser?.uid;
    if (uid) {
      try {
        const existing = localStorage.getItem(`alps_shipping_${uid}`);
        const parsed = existing ? JSON.parse(existing) : {};
        const newShip = {
          ...parsed,
          buyerName: updated.name,
          phone: updated.phone,
          address: updated.address,
          email: user?.email || '',
        };
        localStorage.setItem(`alps_shipping_${uid}`, JSON.stringify(newShip));
      } catch {}

      try {
        const accountsJson = localStorage.getItem('alps_registered_accounts');
        if (accountsJson) {
          const accounts = JSON.parse(accountsJson);
          const newAccounts = accounts.map((acc: any) => {
            if (
              (user?.email && acc.email?.toLowerCase() === user.email.toLowerCase()) ||
              (user?.phone && acc.phone === user.phone)
            ) {
              return {
                ...acc,
                name: updated.name,
                phone: updated.phone,
                address: updated.address,
              };
            }
            return acc;
          });
          localStorage.setItem('alps_registered_accounts', JSON.stringify(newAccounts));
        }
      } catch {}

      updateUserProfileDoc(uid, updated).catch((err) => {
        console.warn('Could not update profile in Firestore:', err);
      });
    }

    showToast('Đã lưu thông tin người nhận và địa chỉ giao hàng!');
  };

  const handleUpdateOrderAddress = (orderId: string, newAddress: string, newPhone?: string, newName?: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            shippingAddress: newAddress,
            ...(newPhone ? { phone: newPhone } : {}),
            ...(newName ? { buyerName: newName } : {}),
          };
        }
        return order;
      })
    );

    const uid = user?.uid || auth.currentUser?.uid;
    if (uid) {
      updateOrderAddressInFirestore(uid, orderId, {
        shippingAddress: newAddress,
        phone: newPhone,
        buyerName: newName,
      }).catch((err) => {
        console.warn('Could not update order address in Firestore:', err);
      });
    }

    showToast('Đã cập nhật thông tin giao hàng cho đơn hàng thành công!');
  };

  // CART HANDLERS
  const handleAddToCart = (product: Product, quantity = 1, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Đã thêm "${product.name}" vào giỏ hàng`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const handleClearCart = () => {
    setCart([]);
    const uid = auth.currentUser?.uid || user?.uid;
    if (uid) {
      clearCartInFirestore(uid).catch(() => {});
    }
    showToast('Đã làm trống giỏ hàng');
  };

  const handleAddFullSetToCart = () => {
    setCart(PRODUCTS.map((product) => ({ product, quantity: 1 })));
    setIsCartOpen(true);
    showToast('Đã thêm trọn bộ 5 sản phẩm vào giỏ hàng');
  };

  const handleAddDuoToCart = () => {
    const cleanser = PRODUCTS.find((p) => p.id === 'cleanser-gentle-purifying');
    const mask = PRODUCTS.find((p) => p.id === 'mask-hydro-lifting');
    if (cleanser && mask) {
      setCart((prev) => {
        let updated = [...prev];
        const hasCleanser = updated.some((i) => i.product.id === cleanser.id);
        if (hasCleanser) {
          updated = updated.map((i) =>
            i.product.id === cleanser.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          updated.push({ product: cleanser, quantity: 1 });
        }
        const hasMask = updated.some((i) => i.product.id === mask.id);
        if (hasMask) {
          updated = updated.map((i) =>
            i.product.id === mask.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          updated.push({ product: mask, quantity: 1 });
        }
        return updated;
      });
      setIsCartOpen(true);
      showToast('Đã thêm Bộ Đôi Sữa Rửa Mặt & Mặt Nạ Sinh Học ALPS vào giỏ hàng');
    }
  };

  // Convert CampaignCombo to Product representation for cart & checkout


  const handleAddComboToCart = (combo: CampaignCombo) => {
    const comboProduct = createComboProduct(combo);
    setActiveVoucherCode('ALPS2010');
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.product.id === comboProduct.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...prev, { product: comboProduct, quantity: 1 }];
    });
    setIsCartOpen(true);
    showToast(`🌸 Đã thêm "${combo.name}" vào giỏ hàng!`);
  };

  const handleBuyNowCombo = (combo: CampaignCombo) => {
    const comboProduct = createComboProduct(combo);
    setActiveVoucherCode('ALPS2010');
    setCheckoutItems([{ product: comboProduct, quantity: 1 }]);
    setIsCheckoutOpen(true);
    showToast(`🌸 Đang mở thanh toán 20/10 cho "${combo.name}"`);
  };

  const handleApplyVoucherToCart = (code: string) => {
    setActiveVoucherCode(code);
    showToast(`🌸 Đã lưu mã ưu đãi ${code}! Giảm giá áp dụng ngay khi đặt hàng.`);
  };

  const handleOpenCheckoutFromCart = () => {
    if (cart.length === 0) {
      showToast('Giỏ hàng của bạn đang trống');
      return;
    }
    setCheckoutItems(cart);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // BUY NOW Action: Direct Checkout
  const handleBuyNow = (product: Product, quantity = 1, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCheckoutItems([{ product, quantity }]);
    setIsCheckoutOpen(true);
    showToast(`Chuyển đến thanh toán: ${product.name}`);
  };

  // BUY FULL SET RITUAL (5 STEPS)
  const handleBuyFullSet = () => {
    setCheckoutItems(PRODUCTS.map((product) => ({ product, quantity: 1 })));
    setIsCheckoutOpen(true);
    showToast('Chuyển sang thanh toán trọn bộ Nghi thức 5 bước Alps');
  };

  // Re-order past purchased order
  const handleReorder = (order: Order) => {
    setCheckoutItems(
      order.items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      }))
    );
    setIsAccountOpen(false);
    setIsCheckoutOpen(true);
    showToast(`Chuyển đến thanh toán cho ${order.items.length} sản phẩm từ đơn #${order.orderNumber}`);
  };

  // Open Policies Modal
  const handleOpenPolicies = (tab: PolicyTabType = 'returns') => {
    setPoliciesInitialTab(tab);
    setIsPoliciesOpen(true);
  };

  // Checkout and place order dynamically from CheckoutModal
  const handleCompleteOrder = (order: Order) => {
    const uid = user?.uid || auth.currentUser?.uid;
    const finalOrder: Order = {
      ...order,
      userId: uid || undefined,
    };

    setOrders((prev) => {
      const updated = [finalOrder, ...prev];
      if (uid) {
        try {
          localStorage.setItem(`alps_orders_${uid}`, JSON.stringify(updated));
        } catch {}
      }
      return updated;
    });
    setLatestOrderNumber(finalOrder.orderNumber);
    setLatestRecipient({
      name: finalOrder.buyerName || user?.name || 'Khách Hàng',
      phone: finalOrder.phone || user?.phone || '',
      address: finalOrder.shippingAddress || user?.address || '',
    });

    // Save shipping info for this specific account
    if (uid && (finalOrder.buyerName || finalOrder.phone || finalOrder.shippingAddress)) {
      try {
        const shippingData = {
          buyerName: finalOrder.buyerName || user?.name || '',
          phone: finalOrder.phone || user?.phone || '',
          email: user?.email || '',
          address: finalOrder.shippingAddress || user?.address || '',
          note: finalOrder.note || '',
        };
        localStorage.setItem(`alps_shipping_${uid}`, JSON.stringify(shippingData));
      } catch {}

      try {
        const accountsJson = localStorage.getItem('alps_registered_accounts');
        if (accountsJson) {
          const accounts = JSON.parse(accountsJson);
          const newAccounts = accounts.map((acc: any) => {
            if (
              (user?.email && acc.email?.toLowerCase() === user.email.toLowerCase()) ||
              (user?.phone && acc.phone === user.phone)
            ) {
              return {
                ...acc,
                name: finalOrder.buyerName || acc.name,
                phone: finalOrder.phone || acc.phone,
                address: finalOrder.shippingAddress || acc.address,
              };
            }
            return acc;
          });
          localStorage.setItem('alps_registered_accounts', JSON.stringify(newAccounts));
        }
      } catch {}
    }

    // Save to Cloud Firestore if user is authenticated or has account UID
    if (uid) {
      saveOrderToFirestore(uid, finalOrder).catch((err) => {
        console.warn('Could not save order to Firestore:', err);
      });
    }

    // Clear cart if checkout was from cart
    setCart([]);
    if (uid) {
      clearCartInFirestore(uid).catch(() => {});
    }

    setIsCheckoutOpen(false);
    setIsCheckoutSuccessOpen(true);
    showToast(`Đặt hàng #${finalOrder.orderNumber} thành công!`);
  };

  // Tab switcher
  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (tab === 'home') {
      navigate('/');
    } else if (tab === 'catalog') {
      navigate('/san-pham');
    } else if (tab === 'account') {
      setAccountInitialTab('orders');
      setIsAccountOpen(true);
    } else if (tab === 'routine') {
      setIsRitualModalOpen(true);
    } else if (tab === 'cart') {
      setIsCartOpen(true);
    }
  };

  const handleOpenPurchasedCategory = () => {
    setAccountInitialTab('orders');
    setIsAccountOpen(true);
  };

  // Scroll to catalog helper
  const handleScrollToCatalog = () => {
    navigate('/san-pham');
  };

  return (
    <div className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex flex-col font-sans overflow-x-hidden w-full max-w-[100vw]">
      {/* Full Luxury Responsive Layout */}
      <div className="flex-grow flex flex-col">
        <Header
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isMobileFrame={false}
          user={user}
          onOpenAccount={handleOpenPurchasedCategory}
          onOpenSupport={() => setIsSupportOpen(true)}
          onOpenPolicies={handleOpenPolicies}
          onOpenFontSwitcher={() => setIsFontSwitcherOpen(true)}
          onOpenSkinQuiz={() => setIsSkinQuizOpen(true)}
          onOpenBrandStory={() => navigate('/ve-alps')}
        />

        <main className="flex-grow pb-16 sm:pb-0">
          {route === 'home' && (
            <HomePage
              onSelectProduct={(p) => {
                navigate(`/san-pham/${p.id}`);
              }}
              onAddToCart={(p, qty, e) => handleAddToCart(p, qty || 1, e)}
              onBuyNow={(p, qty, e) => handleBuyNow(p, qty || 1, e)}
              onAddComboToCart={handleAddComboToCart}
              onBuyNowCombo={handleBuyNowCombo}
              onAddDuoToCart={handleAddDuoToCart}
              onApplyVoucherToCart={handleApplyVoucherToCart}
              onOpenRitualModal={() => setIsRitualModalOpen(true)}
              onOpenSkinQuiz={() => setIsSkinQuizOpen(true)}
              onOpenBrandStory={() => navigate('/ve-alps')}
              onShowToast={showToast}
              searchQuery={searchQuery}
            />
          )}

          {route === 'offers' && (
            <OffersPage
              onAddComboToCart={handleAddComboToCart}
              onBuyNowCombo={handleBuyNowCombo}
              onApplyVoucherToCart={handleApplyVoucherToCart}
              onShowToast={showToast}
            />
          )}

          {route === 'products' && (
            <ProductsPage
              onSelectProduct={(p) => {
                navigate(`/san-pham/${p.id}`);
              }}
              onAddToCart={(p, qty, e) => handleAddToCart(p, qty || 1, e)}
              onBuyNow={(p, qty, e) => handleBuyNow(p, qty || 1, e)}
              onOpenRitualModal={() => setIsRitualModalOpen(true)}
              onOpenSkinQuiz={() => setIsSkinQuizOpen(true)}
              onShowToast={showToast}
            />
          )}

          {route === 'product-detail' && (
            <ProductDetailPage
              onAddToCart={(p, qty, e) => handleAddToCart(p, qty || 1, e)}
              onBuyNow={(p, qty, e) => handleBuyNow(p, qty || 1, e)}
              onOpenRitualModal={() => setIsRitualModalOpen(true)}
              onOpenSkinQuiz={() => setIsSkinQuizOpen(true)}
              onShowToast={showToast}
              user={user}
            />
          )}

          {route === 'about' && (
            <AboutPage
              onOpenRitualModal={() => setIsRitualModalOpen(true)}
              onOpenSkinQuiz={() => setIsSkinQuizOpen(true)}
            />
          )}

          {route === 'contact' && (
            <ContactPage
              onOpenSupportModal={() => setIsSupportOpen(true)}
              onOpenSkinQuiz={() => setIsSkinQuizOpen(true)}
              onOpenPolicies={handleOpenPolicies}
              onShowToast={showToast}
            />
          )}

          {route === 'not-found' && <NotFoundPage />}
        </main>

        <Footer
          isMobileFrame={false}
          onOpenSupport={() => setIsSupportOpen(true)}
          onOpenPolicies={handleOpenPolicies}
          onOpenFontSwitcher={() => setIsFontSwitcherOpen(true)}
          onOpenBrandStory={() => setIsBrandStoryOpen(true)}
        />

        {/* Bong bóng nổi Chuyên Viên Da Liễu Thụy Sĩ AI (Gemini 3.8 Flash) 24/7 */}
        <FloatingAIChatWidget
          user={user}
          onOpenSkinQuiz={() => setIsSkinQuizOpen(true)}
          onOpenSupportModal={() => setIsSupportOpen(true)}
        />

        {/* Bottom Nav appears on small screens when in responsive mode */}
        <div className="block sm:hidden">
          <BottomNav
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
          />
        </div>
      </div>

      <NewProductPopup
        enabled={route === 'home' && ![isCartOpen, isAccountOpen, isSupportOpen, isCheckoutOpen, isPoliciesOpen, isRitualModalOpen, isFontSwitcherOpen, isSkinQuizOpen, isBrandStoryOpen, isCheckoutSuccessOpen, !!selectedProduct].some(Boolean)}
        onExplore={() => navigate('/uu-dai-20-10')}
      />

      {/* Cart Drawer (Starts completely empty with elegant empty state) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        user={user}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onOpenCheckout={handleOpenCheckoutFromCart}
        onExploreProducts={handleScrollToCatalog}
        onOpenSupport={() => setIsSupportOpen(true)}
        initialVoucher={activeVoucherCode}
        onVoucherApplied={(code) => setActiveVoucherCode(code || '')}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, qty) => handleAddToCart(p, qty)}
        onBuyNow={(p, qty) => handleBuyNow(p, qty)}
        user={user}
        onShowToast={showToast}
      />

      {/* Full Checkout & Payment Modal (COD, VietQR, Bank Transfer) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={checkoutItems}
        user={user}
        onCompleteOrder={handleCompleteOrder}
        onShowToast={showToast}
        onOpenPolicies={handleOpenPolicies}
        onOpenLogin={() => {
          setIsCheckoutOpen(false);
          setAccountInitialTab('profile');
          setIsAccountOpen(true);
        }}
        initialPromoCode={activeVoucherCode}
      />

      {/* Policies Modal (Đổi trả, Bảo mật, Vận chuyển) */}
      <PoliciesModal
        isOpen={isPoliciesOpen}
        onClose={() => setIsPoliciesOpen(false)}
        initialTab={policiesInitialTab}
        onOpenSupport={() => setIsSupportOpen(true)}
      />

      {/* Ritual 5-Step Modal */}
      <RitualModal
        isOpen={isRitualModalOpen}
        onClose={() => setIsRitualModalOpen(false)}
        onSelectProduct={setSelectedProduct}
        onBuyFullSet={handleBuyFullSet}
        onAddFullSetToCart={handleAddFullSetToCart}
      />

      {/* Account Profile Drawer with Dynamic Login/Logout & Purchased Orders */}
      <AccountDrawer
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        user={user}
        orders={orders}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onGoogleLogin={handleGoogleLogin}
        onUpdateProfile={handleUpdateProfile}
        onUpdateOrderAddress={handleUpdateOrderAddress}
        onSelectProduct={setSelectedProduct}
        onReorder={handleReorder}
        onAddToCart={handleAddToCart}
        onOpenSupport={() => setIsSupportOpen(true)}
        initialTab={accountInitialTab}
      />

      {/* Order Confirmation Modal */}
      <CheckoutSuccessModal
        isOpen={isCheckoutSuccessOpen}
        onClose={() => setIsCheckoutSuccessOpen(false)}
        orderNumber={latestOrderNumber}
        recipientName={latestRecipient.name}
        phone={latestRecipient.phone}
        shippingAddress={latestRecipient.address}
        onViewOrders={handleOpenPurchasedCategory}
        onOpenSupport={() => setIsSupportOpen(true)}
      />

      {/* Customer Support Center Modal (CSKH 24/7 & AI) */}
      <CustomerSupportModal
        isOpen={isSupportOpen}
        onClose={() => {
          setIsSupportOpen(false);
          setSupportInitialPrompt(undefined);
        }}
        user={user}
        onShowToast={showToast}
        onOpenLogin={() => {
          setIsSupportOpen(false);
          setAccountInitialTab('profile');
          setIsAccountOpen(true);
        }}
        onOpenSkinQuiz={() => {
          setIsSupportOpen(false);
          setIsSkinQuizOpen(true);
        }}
        initialPrompt={supportInitialPrompt}
      />

      {/* Skin Diagnostic Quiz Modal (Soi Da & Phác Đồ Cá Nhân Hóa) */}
      <SkinQuizModal
        isOpen={isSkinQuizOpen}
        onClose={() => setIsSkinQuizOpen(false)}
        onOpenSupportWithPrompt={handleOpenSupportWithPrompt}
        onAddToCart={(p, qty) => handleAddToCart(p, qty || 1)}
        onShowToast={showToast}
      />

      {/* Brand Typography Preset Modal */}
      <FontSwitcherModal
        isOpen={isFontSwitcherOpen}
        onClose={() => setIsFontSwitcherOpen(false)}
        onShowToast={showToast}
      />

      {/* Brand Story Modal (Câu Chuyện Thương Hiệu & Nguồn Cội) */}
      <BrandStoryModal
        isOpen={isBrandStoryOpen}
        onClose={() => setIsBrandStoryOpen(false)}
        onExploreCollection={handleScrollToCatalog}
        onOpenRitual={() => setIsRitualModalOpen(true)}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-[#202022] text-white text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center space-x-2 animate-fade-in border border-[#46464a]">
          <Sparkles className="w-3.5 h-3.5 text-[#fed8c9] shrink-0" />
          <span>{copy(toastMessage)}</span>
          {toastMessage.toLowerCase().includes('giỏ hàng') && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="ml-2 px-2.5 py-0.5 rounded-full bg-[#fed8c9] text-[#1c1c19] font-semibold text-[11px] hover:bg-white transition-colors cursor-pointer whitespace-nowrap"
            >
              {copy("Xem giỏ hàng")}</button>
          )}
        </div>
      )}
    </div>
  );
}
