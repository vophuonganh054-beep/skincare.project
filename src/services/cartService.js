/**
 * Alps Skincare Pure Essence - Personalized Cart & Firebase Auth Service
 * 
 * Tích hợp Firebase Authentication & Cloud Firestore cho tính năng giỏ hàng cá nhân hóa:
 * - Collection: "carts"
 * - Document ID: user.uid (doc(db, 'carts', user.uid))
 * - Data format: { items: [...], updatedAt: string }
 * - Event: onAuthStateChanged (Khôi phục giỏ hàng khi login, xóa sạch khi logout)
 */

import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase';

/**
 * Đăng nhập người dùng bằng tài khoản Google (Firebase Auth)
 * @returns {Promise<import('firebase/auth').User>}
 */
export async function login() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

/**
 * Đăng xuất người dùng hiện tại (Firebase Auth)
 * @returns {Promise<void>}
 */
export async function logout() {
  await signOut(auth);
}

/**
 * Lưu giỏ hàng của người dùng vào Firestore
 * Document path: carts/{userId}
 * Schema: { items: [...], updatedAt: string }
 * 
 * @param {string} userId - UID của người dùng đang đăng nhập (user.uid)
 * @param {Array} items - Danh sách các sản phẩm trong giỏ hàng
 * @returns {Promise<void>}
 */
export async function saveCart(userId, items) {
  if (!userId) {
    console.warn('[CartService] Không có userId, bỏ qua lưu giỏ hàng vào Firestore.');
    return;
  }

  const cartDocRef = doc(db, 'carts', userId);
  const payload = {
    items: Array.isArray(items) ? items : [],
    updatedAt: new Date().toISOString(),
  };

  await setDoc(cartDocRef, payload);
}

/**
 * Truy vấn giỏ hàng của người dùng từ Firestore
 * Document path: carts/{userId}
 * 
 * @param {string} userId - UID của người dùng
 * @returns {Promise<Array>} Danh sách items trong giỏ hàng, hoặc [] nếu trống
 */
export async function getCart(userId) {
  if (!userId) return [];

  const cartDocRef = doc(db, 'carts', userId);
  const docSnap = await getDoc(cartDocRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return Array.isArray(data.items) ? data.items : [];
  }

  return [];
}

/**
 * Lắng nghe thay đổi thời gian thực của giỏ hàng người dùng
 * 
 * @param {string} userId - UID của người dùng
 * @param {function(Array): void} callback - Hàm callback nhận danh sách items mới
 * @returns {function(): void} Unsubscribe function
 */
export function subscribeCart(userId, callback) {
  if (!userId) {
    callback([]);
    return () => {};
  }

  const cartDocRef = doc(db, 'carts', userId);
  return onSnapshot(cartDocRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      callback(Array.isArray(data.items) ? data.items : []);
    } else {
      callback([]);
    }
  }, (err) => {
    console.error('[CartService] Lỗi khi lắng nghe carts/' + userId + ':', err);
    callback([]);
  });
}

/**
 * Khởi tạo listener onAuthStateChanged theo yêu cầu kiểm thử:
 * 1. Khi người dùng đăng nhập: Tự động truy vấn carts/{user.uid} và cập nhật giao diện
 * 2. Khi người dùng đăng xuất: Tự động xóa sạch giao diện giỏ hàng (đưa về mảng rỗng [])
 * 
 * @param {object} handlers
 * @param {function(Array): void} handlers.onCartUpdate - Callback cập nhật giỏ hàng lên state/giao diện
 * @param {function(import('firebase/auth').User|null): void} [handlers.onUserChange] - Callback cập nhật thông tin user
 * @returns {function(): void} Unsubscribe listener
 */
export function initCartAuthListener({ onCartUpdate, onUserChange }) {
  let unsubscribeCart = null;

  return onAuthStateChanged(auth, async (user) => {
    // Hủy listener giỏ hàng của tài khoản cũ (nếu có)
    if (unsubscribeCart) {
      unsubscribeCart();
      unsubscribeCart = null;
    }

    if (user) {
      // Người dùng đã đăng nhập thành công
      if (typeof onUserChange === 'function') {
        onUserChange(user);
      }

      // Tự động lắng nghe & truy vấn tài liệu carts/{user.uid} từ Firestore
      unsubscribeCart = subscribeCart(user.uid, (items) => {
        onCartUpdate(items);
      });
    } else {
      // Người dùng đã đăng xuất:
      // Yêu cầu: Tự động xóa sạch giỏ hàng hiển thị trên giao diện (đưa về trống)
      if (typeof onUserChange === 'function') {
        onUserChange(null);
      }
      onCartUpdate([]);
    }
  });
}
