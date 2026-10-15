import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  Unsubscribe,
} from 'firebase/firestore';
import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signOut,
  OperationType,
  handleFirestoreError,
} from '../firebase';
import { UserProfile, Order, ProductReview, CartItem } from '../types';

let isWriteQuotaExhausted = false;

export function checkIsQuotaExhausted(): boolean {
  return isWriteQuotaExhausted;
}

export function markQuotaExhausted(): void {
  if (!isWriteQuotaExhausted) {
    isWriteQuotaExhausted = true;
    console.warn(
      'Firestore write quota reached for today (Spark free tier limit). Operating in offline fallback mode with localStorage. Quota resets tomorrow. Info: https://firebase.google.com/pricing#cloud-firestore'
    );
  }
}

/**
 * Sign in using Google Provider popup
 */
export async function loginWithGoogle(): Promise<UserProfile> {
  try {
    const credential = await signInWithPopup(auth, googleProvider);
    const user = credential.user;
    const uid = user.uid;
    const email = user.email || '';
    const displayName = user.displayName || email.split('@')[0] || 'Khách hàng Alps';
    const photoURL = user.photoURL || undefined;

    // Check if user profile already exists in Firestore
    const userDocRef = doc(db, 'users', uid);
    const initials = getInitials(displayName);
    let profileData: UserProfile = {
      name: displayName,
      email,
      uid,
      photoURL,
      phone: '',
      address: '',
      tier: 'Hội Viên Alps Pure Privileges',
      points: 100,
      avatarInitials: initials,
      isLoggedIn: true,
    };

    try {
      const snap = await getDoc(userDocRef);
      if (snap.exists()) {
        const data = snap.data();
        profileData = {
          name: data.name || displayName,
          email: data.email || email,
          uid,
          photoURL: data.photoURL || photoURL,
          phone: data.phone || '',
          address: data.address || '',
          tier: data.tier || 'Hội Viên Alps Pure Privileges',
          points: typeof data.points === 'number' ? data.points : 100,
          avatarInitials: data.avatarInitials || initials,
          isLoggedIn: true,
        };
      } else {
        const createPayload: Record<string, unknown> = {
          userId: uid,
          name: displayName,
          email,
          phone: '',
          address: '',
          tier: 'Hội Viên Alps Pure Privileges',
          points: 100,
          avatarInitials: initials,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        if (photoURL) {
          createPayload.photoURL = photoURL;
        }

        try {
          await setDoc(userDocRef, createPayload);
        } catch (setErr: unknown) {
          const msg = setErr instanceof Error ? setErr.message : String(setErr);
          const code = (setErr as { code?: string })?.code;
          if (code === 'resource-exhausted' || msg.includes('Quota') || msg.includes('resource-exhausted')) {
            markQuotaExhausted();
          } else {
            console.warn(`Could not save new user profile to users/${uid}:`, setErr);
          }
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      const code = (err as { code?: string })?.code;
      if (code === 'resource-exhausted' || msg.includes('Quota') || msg.includes('resource-exhausted')) {
        markQuotaExhausted();
      } else {
        console.warn(`Firestore profile read warning for users/${uid}:`, err);
      }
    }

    return profileData;
  } catch (error) {
    if ((error as { code?: string })?.code === 'auth/popup-closed-by-user') {
      throw new Error('Cửa sổ đăng nhập đã đóng.');
    }
    throw error;
  }
}

/**
 * Sign out user from Firebase Auth
 */
export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

/**
 * Update user profile in Firestore
 */
export async function updateUserProfileDoc(
  uid: string,
  updates: { name: string; phone?: string; address?: string }
): Promise<void> {
  if (isWriteQuotaExhausted) {
    return;
  }
  const path = `users/${uid}`;
  try {
    const userDocRef = doc(db, 'users', uid);
    const updatePayload: Record<string, unknown> = {
      name: updates.name,
      phone: updates.phone || '',
      address: updates.address || '',
      updatedAt: new Date().toISOString(),
    };
    await updateDoc(userDocRef, updatePayload);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    const code = (error as { code?: string })?.code;
    if (code === 'resource-exhausted' || msg.includes('Quota') || msg.includes('resource-exhausted')) {
      markQuotaExhausted();
      return;
    }
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

/**
 * Subscribe to real-time changes of the user profile document
 */
export function subscribeUserProfile(
  uid: string,
  onProfileChange: (profile: UserProfile | null) => void
): Unsubscribe {
  const path = `users/${uid}`;
  const userDocRef = doc(db, 'users', uid);

  return onSnapshot(
    userDocRef,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        onProfileChange({
          name: data.name || '',
          email: data.email || '',
          uid,
          photoURL: data.photoURL || undefined,
          phone: data.phone || '',
          address: data.address || '',
          tier: data.tier || 'Hội Viên Alps Pure Privileges',
          points: typeof data.points === 'number' ? data.points : 0,
          avatarInitials: data.avatarInitials || getInitials(data.name || 'AL'),
          isLoggedIn: true,
        });
      } else {
        onProfileChange(null);
      }
    },
    (error) => {
      const msg = error?.message || String(error);
      if (msg.includes('Quota') || msg.includes('resource-exhausted')) {
        markQuotaExhausted();
      }
      console.warn(`Firestore subscribeUserProfile warning for ${path}:`, msg);
    }
  );
}

/**
 * Subscribe to real-time user orders
 */
export function subscribeUserOrders(
  uid: string,
  onOrdersChange: (orders: Order[]) => void
): Unsubscribe {
  const path = `users/${uid}/orders`;
  const ordersCol = collection(db, 'users', uid, 'orders');

  return onSnapshot(
    ordersCol,
    (snapshot) => {
      const orders: Order[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        orders.push({
          id: docSnap.id,
          orderNumber: data.orderNumber || docSnap.id,
          createdAt: data.createdAt || '',
          items: data.items || [],
          totalAmount: data.totalAmount || 0,
          status: data.status || 'processing',
          statusLabel: data.statusLabel || 'Đang chuẩn bị',
          userId: data.userId || uid,
          buyerName: data.buyerName,
          phone: data.phone,
          shippingAddress: data.shippingAddress,
          paymentMethod: data.paymentMethod,
          paymentMethodType: data.paymentMethodType,
          shippingCarrier: data.shippingCarrier,
          shippingFee: data.shippingFee,
          discountAmount: data.discountAmount,
          note: data.note,
        });
      });
      // Sort newest first
      orders.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      onOrdersChange(orders);
    },
    (error) => {
      console.warn(`Firestore subscribeUserOrders warning for ${path}:`, error?.message);
    }
  );
}

/**
 * Fetch user orders from Firestore collection: users/{userId}/orders
 */
export async function getUserOrdersFromFirestore(uid: string): Promise<Order[]> {
  const path = `users/${uid}/orders`;
  try {
    const ordersCol = collection(db, 'users', uid, 'orders');
    const snapshot = await getDocs(ordersCol);
    const orders: Order[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      orders.push({
        id: docSnap.id,
        orderNumber: data.orderNumber || docSnap.id,
        createdAt: data.createdAt || '',
        items: data.items || [],
        totalAmount: data.totalAmount || 0,
        status: data.status || 'processing',
        statusLabel: data.statusLabel || 'Đang chuẩn bị',
        userId: data.userId || uid,
        buyerName: data.buyerName,
        phone: data.phone,
        shippingAddress: data.shippingAddress,
        paymentMethod: data.paymentMethod,
        paymentMethodType: data.paymentMethodType,
        shippingCarrier: data.shippingCarrier,
        shippingFee: data.shippingFee,
        discountAmount: data.discountAmount,
        note: data.note,
      });
    });
    orders.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    return orders;
  } catch (error) {
    console.warn(`Could not fetch orders from ${path}:`, error);
    return [];
  }
}

/**
 * Save newly placed order to Firestore under users/{uid}/orders/{orderId}
 */
export async function saveOrderToFirestore(uid: string, order: Order): Promise<void> {
  if (isWriteQuotaExhausted) {
    return;
  }
  const path = `users/${uid}/orders/${order.id}`;
  try {
    const orderDocRef = doc(db, 'users', uid, 'orders', order.id);
    const orderPayload = {
      id: order.id,
      orderNumber: order.orderNumber,
      userId: uid,
      createdAt: order.createdAt,
      totalAmount: order.totalAmount,
      status: order.status,
      statusLabel: order.statusLabel,
      items: order.items.map((item) => ({
        product: {
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          image: item.product.image,
          fallbackImage: item.product.fallbackImage,
          capacity: item.product.capacity,
        },
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
      buyerName: order.buyerName || '',
      phone: order.phone || '',
      shippingAddress: order.shippingAddress || '',
      paymentMethod: order.paymentMethod || 'Thanh toán khi nhận hàng (COD)',
      paymentMethodType: order.paymentMethodType || 'cod',
      shippingCarrier: order.shippingCarrier || 'Giao Hàng Tiết Kiệm (GHTK)',
      shippingFee: order.shippingFee || 0,
      discountAmount: order.discountAmount || 0,
      note: order.note || '',
    };

    await setDoc(orderDocRef, orderPayload);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    const code = (error as { code?: string })?.code;
    if (code === 'resource-exhausted' || msg.includes('Quota') || msg.includes('resource-exhausted')) {
      markQuotaExhausted();
      return;
    }
    console.warn(`Could not save order to ${path}:`, error);
  }
}

/**
 * Update delivery information for an order in Firestore
 */
export async function updateOrderAddressInFirestore(
  uid: string,
  orderId: string,
  updates: { buyerName?: string; phone?: string; shippingAddress: string }
): Promise<void> {
  if (isWriteQuotaExhausted) {
    return;
  }
  const path = `users/${uid}/orders/${orderId}`;
  try {
    const orderDocRef = doc(db, 'users', uid, 'orders', orderId);
    const payload: Record<string, unknown> = {
      shippingAddress: updates.shippingAddress,
      updatedAt: new Date().toISOString(),
    };
    if (updates.buyerName) payload.buyerName = updates.buyerName;
    if (updates.phone) payload.phone = updates.phone;

    await updateDoc(orderDocRef, payload);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    const code = (error as { code?: string })?.code;
    if (code === 'resource-exhausted' || msg.includes('Quota') || msg.includes('resource-exhausted')) {
      markQuotaExhausted();
      return;
    }
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

/**
 * Subscribe to product reviews in Firestore
 */
export function subscribeProductReviews(
  productId: string,
  onReviewsChange: (reviews: ProductReview[]) => void
): Unsubscribe {
  const path = 'reviews';
  const reviewsCol = collection(db, 'reviews');
  const q = query(reviewsCol, where('productId', '==', productId));

  return onSnapshot(
    q,
    (snapshot) => {
      const result: ProductReview[] = [];
      snapshot.forEach((docSnap) => {
        const d = docSnap.data();
        result.push({
          id: docSnap.id,
          productId: d.productId || productId,
          userId: d.userId,
          authorName: d.authorName || 'Khách hàng',
          rating: d.rating || 5,
          date: d.date || '',
          isVerifiedBuyer: !!d.isVerifiedBuyer,
          skinType: d.skinType || '',
          title: d.title || '',
          comment: d.comment || '',
          helpfulCount: d.helpfulCount || 0,
        });
      });
      // Sort newest first
      result.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
      onReviewsChange(result);
    },
    (error) => {
      const msg = error?.message || String(error);
      if (msg.includes('Quota') || msg.includes('resource-exhausted')) {
        markQuotaExhausted();
      }
      console.warn(`Firestore subscribeProductReviews warning for ${path}:`, msg);
    }
  );
}

/**
 * Add a new product review to Firestore
 */
export async function addProductReviewToFirestore(review: ProductReview): Promise<void> {
  if (isWriteQuotaExhausted) {
    return;
  }
  const path = `reviews/${review.id}`;
  try {
    const reviewDocRef = doc(db, 'reviews', review.id);
    const payload = {
      id: review.id,
      productId: review.productId,
      userId: review.userId || auth.currentUser?.uid || 'anonymous',
      authorName: review.authorName,
      rating: review.rating,
      comment: review.comment,
      date: review.date,
      skinType: review.skinType || '',
      title: review.title || '',
      isVerifiedBuyer: review.isVerifiedBuyer ?? true,
      helpfulCount: review.helpfulCount || 0,
    };
    await setDoc(reviewDocRef, payload);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    const code = (error as { code?: string })?.code;
    if (code === 'resource-exhausted' || msg.includes('Quota') || msg.includes('resource-exhausted')) {
      markQuotaExhausted();
      return;
    }
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Vote helpful for a product review in Firestore
 */
export async function voteReviewHelpfulInFirestore(
  reviewId: string,
  newCount: number
): Promise<void> {
  if (isWriteQuotaExhausted) {
    return;
  }
  const path = `reviews/${reviewId}`;
  try {
    const reviewDocRef = doc(db, 'reviews', reviewId);
    await updateDoc(reviewDocRef, {
      helpfulCount: newCount,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    const code = (error as { code?: string })?.code;
    if (code === 'resource-exhausted' || msg.includes('Quota') || msg.includes('resource-exhausted')) {
      markQuotaExhausted();
      return;
    }
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

/**
 * Utility helper for initials
 */
export function getInitials(name: string): string {
  return (
    name
      .trim()
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(-2)
      .toUpperCase() || 'AL'
  );
}

/**
 * Save user shopping cart to Firestore document: carts/{userId}
 * Data schema: { items: [...], updatedAt: string }
 */
export async function saveCartToFirestore(uid: string, items: CartItem[]): Promise<void> {
  if (isWriteQuotaExhausted) {
    return;
  }
  const path = `carts/${uid}`;
  try {
    const cartDocRef = doc(db, 'carts', uid);
    const sanitizedItems = items.map((it) => {
      const itemPayload: Record<string, unknown> = {
        product: {
          id: it.product.id,
          name: it.product.name,
          price: it.product.price,
          image: it.product.image,
          fallbackImage: it.product.fallbackImage,
          capacity: it.product.capacity,
          subtitle: it.product.subtitle,
        },
        quantity: it.quantity,
      };
      if (it.selectedSize) {
        itemPayload.selectedSize = it.selectedSize;
      }
      return itemPayload;
    });

    await setDoc(cartDocRef, {
      items: sanitizedItems,
      updatedAt: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    const code = (error as { code?: string })?.code;
    if (code === 'resource-exhausted' || msg.includes('Quota') || msg.includes('resource-exhausted')) {
      markQuotaExhausted();
      return;
    }
    console.warn(`Could not save cart to ${path}:`, error);
  }
}

/**
 * Fetch user shopping cart from Firestore document: carts/{userId}
 */
export async function getCartFromFirestore(uid: string): Promise<CartItem[]> {
  const path = `carts/${uid}`;
  try {
    const cartDocRef = doc(db, 'carts', uid);
    const snap = await getDoc(cartDocRef);
    if (snap.exists()) {
      const data = snap.data();
      if (Array.isArray(data.items)) {
        return data.items as CartItem[];
      }
    }
    return [];
  } catch (error) {
    console.warn(`Could not fetch cart from ${path}:`, error);
    return [];
  }
}

/**
 * Subscribe to real-time changes of the user's cart in Firestore
 */
export function subscribeUserCart(
  uid: string,
  onCartChange: (items: CartItem[]) => void
): Unsubscribe {
  const path = `carts/${uid}`;
  const cartDocRef = doc(db, 'carts', uid);

  return onSnapshot(
    cartDocRef,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (Array.isArray(data.items)) {
          onCartChange(data.items as CartItem[]);
          return;
        }
      }
      onCartChange([]);
    },
    (error) => {
      console.warn(`Firestore subscribeUserCart warning for ${path}:`, error?.message);
    }
  );
}

/**
 * Clear shopping cart in Firestore
 */
export async function clearCartInFirestore(uid: string): Promise<void> {
  await saveCartToFirestore(uid, []);
}

