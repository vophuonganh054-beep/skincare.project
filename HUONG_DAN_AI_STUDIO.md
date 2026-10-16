# HƯỚNG DẪN TÍCH HỢP CHAT TƯ VẤN & THANH TOÁN MB BANK QUA SEPAY

Tài liệu hướng dẫn cấu trúc tệp, cơ chế hoạt động và các bước kết nối cổng thanh toán tự động SePay (MB Bank) cùng Chatbot Tư vấn Da liễu AI cho dự án Alps Skincare.

---

## 1. DANH SÁCH ĐƯỜNG DẪN CÁC FILE CẬP NHẬT

| STT | Tệp tin / Đường dẫn | Mô tả vai trò |
|---|---|---|
| 1 | `server.ts` | Backend Express xử lý webhook SePay (`/api/sepay/webhook`), API kiểm tra trạng thái giao dịch (`/api/sepay/payment-status/:orderNumber`), khởi tạo (`/api/sepay/initiate`), mô phỏng test (`/api/sepay/simulate-success`), cấu hình an toàn (`/api/sepay/config`) và AI Chat tư vấn da liễu (`/api/chat`). |
| 2 | `src/components/VietQRCard.tsx` | Thành phần hiển thị thẻ chuyển khoản VietQR chuẩn Napas 247 cho MB Bank; tích hợp tự động polling kiểm tra số dư qua SePay mỗi 3.5s; chế độ thử nghiệm có nút mô phỏng thanh toán thành công tức thì khi `PAYMENTS_ENABLED=false`. |
| 3 | `src/components/CheckoutModal.tsx` | Quy trình đặt hàng và thanh toán trực tiếp; tự động đồng bộ trạng thái thanh toán từ SePay MB Bank và mở khóa nút đặt hàng khi nhận tiền. |
| 4 | `src/components/AICustomerSupportChat.tsx` | Khung chat tư vấn chuyên gia da liễu Thụy Sĩ (Zurich Dermatology AI); tư vấn phác đồ da, thành phần thảo dược tuyết Alps, giải đáp cách thanh toán VietQR MB Bank và kiểm tra đơn hàng. |
| 5 | `src/components/CustomerSupportModal.tsx` | Hộp thoại CSKH đa kênh (Chat AI 24/7, Gửi phiếu hỗ trợ, Kênh liên hệ, FAQ). |
| 6 | `.env.example` | Mẫu biến môi trường đầy đủ cho Gemini AI và SePay MB Bank. |
| 7 | `HUONG_DAN_AI_STUDIO.md` | Tài liệu đặc tả và hướng dẫn cấu hình chi tiết (tệp này). |

---

## 2. TRẠNG THÁI HIỆN TẠI (CHẾ ĐỘ THỬ NGHIỆM)

- Biến môi trường hiện tại được đặt mặc định:
  ```env
  PAYMENTS_ENABLED="false"
  ```
- **Hành vi khi thử nghiệm:**
  - Khách hàng chọn phương thức thanh toán **VietQR MB Bank** tại bước Checkout.
  - Mã QR thanh toán hiển thị đúng thông tin MB Bank và số tiền đơn hàng.
  - Thẻ hiển thị huy hiệu: `Thử nghiệm: PAYMENTS_ENABLED=false`.
  - Có nút **"⚡ Mô phỏng đã TT"** (Simulate Success): Cho phép người dùng bấm để hệ thống chuyển ngay sang trạng thái "ĐÃ NHẬN TIỀN" mà không cần chuyển khoản thật, phục vụ việc kiểm thử luồng đặt hàng.
  - Nút **"Xác nhận đặt hàng ngay"** lập tức được kích hoạt.

---

## 3. CÁC CẤU HÌNH CẦN THIẾT ĐỂ KẾT NỐI THẬT (PRODUCTION)

Khi bạn sẵn sàng kết nối nhận tiền thật về tài khoản MB Bank tự động qua SePay, hãy cấu hình các thông số sau trong phần Environment Variables / Secrets:

### Bước 1: Đăng ký và cấu hình trên SePay
1. Đăng ký/Đăng nhập tại [https://my.sepay.vn](https://my.sepay.vn).
2. Vào mục **Ngân hàng kết nối** > Thêm tài khoản ngân hàng **MB Bank (Ngân hàng Quân Đội)**.
3. Liên kết ứng dụng MB Bank theo hướng dẫn của SePay để SePay có thể đọc biến động số dư.
4. Vào mục **Tích hợp Webhook**:
   - Tại mục **Cấu hình Webhook**, điền Webhook URL:
     ```
     https://<tên-miền-website-của-bạn>/api/sepay/webhook
     ```
   - Phương thức: `POST` (dạng JSON).

### Bước 2: Thiết lập Biến Môi Trường (Environment Variables)

```env
# 1. Bật tính năng thanh toán thực tế (Chỉ đổi khi đã sẵn sàng nhận tiền thật)
PAYMENTS_ENABLED="true"

# 2. Số tài khoản MB Bank đã liên kết trên SePay (BẮT BUỘC để tạo mã VietQR đúng tài khoản)
SEPAY_ACCOUNT_NUMBER="Số tài khoản MB Bank thật của bạn"

# 3. Tên ngân hàng & Tên chủ tài khoản MB Bank (hiển thị trên mã VietQR)
SEPAY_BANK_NAME="MB"
SEPAY_ACCOUNT_NAME="TÊN CHỦ TÀI KHOẢN MB BANK"

# 4. Khóa bí mật xác thực Webhook (TÙY CHỌN - khuyên dùng để tránh người ngoài giả mạo gọi webhook)
SEPAY_WEBHOOK_TOKEN="KHÓA_BÍ_MẬT_BẠN_ĐẶT"

# 5. SEPAY_API_KEY (KHÔNG BẮT BUỘC cho việc nhận thanh toán qua Webhook)
# Khi nhận thanh toán, SePay tự động gửi HTTP POST Webhook đến server của bạn.
# Bạn CHỈ CẦN SEPAY_API_KEY nếu website của bạn chủ động gọi API SePay (ví dụ lấy danh sách lịch sử giao dịch).
SEPAY_API_KEY=""
```

---

## 4. BẢO TOÀN GIAO DIỆN MOBILE & TÍNH NĂNG ĐÃ TỐI ƯU
Toàn bộ các cải tiến giao diện mobile mới nhất đã được giữ nguyên 100%:
- Header responsive, logo Alps tỷ lệ chuẩn trên màn hình nhỏ.
- Bottom navigation hỗ trợ iOS `safe-area-bottom` và không bị che khuất.
- Nút chat/tư vấn nổi (`SupportFloatingButton`) tự động căn chỉnh vị trí an toàn trên thanh điều hướng mobile (`bottom-20 right-3.5`).
- Thẻ sản phẩm Catalog bố cục 2 cột không bị tràn số tiền và nút bấm.
- Toàn bộ tính năng giỏ hàng, soi da Skin Quiz, phân tích phác đồ da, xem đánh giá và các trang triết lý thương hiệu đều hoạt động trơn tru.

---

## 5. KIỂM TRA BẢN BUILD & TYPESCRIPT
- Chạy kiểm tra TypeScript: `npm run lint` (`tsc --noEmit`)
- Chạy kiểm tra đóng gói: `npm run build`
