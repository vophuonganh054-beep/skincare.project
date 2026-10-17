# Kế Hoạch Triển Khai: Tăng Kích Thước Chữ Toàn Diện & Trợ Lý AI Da Liễu Thụy Sĩ (Gemini 3.8 Flash) Với Bong Bóng Chat Nổi

Nâng cấp trải nghiệm người dùng website ALPS Skincare theo yêu cầu:
1. **Tăng kích thước chữ toàn diện**: Giúp giao diện dễ nhìn, văn bản rõ ràng, các nút bấm to và dễ chạm thao tác trên cả điện thoại lẫn máy tính.
2. **Trợ lý Chuyên viên Da liễu Thụy Sĩ AI với Gemini**: Tích hợp mô hình `gemini-3.8-flash` vào hệ thống chat tư vấn thông minh, hỗ trợ trả lời mọi câu hỏi (kể cả câu hỏi mở nằm ngoài kịch bản cố định), hiển thị linh hoạt dưới dạng **Bong bóng chat nổi 24/7** ở góc màn hình và tích hợp liền mạch trong popup CSKH.

---

## 1. Chi Tiết Các Thay Đổi Đề Xuất (Proposed Changes)

### A. Tăng kích thước chữ & Tối ưu khả năng thao tác (Readability & Touch Targets)
- **Hệ thống Typography tổng thể**:
  - Tăng cỡ chữ cơ bản của website trong CSS toàn cục và các components.
  - Thay thế các font chữ quá nhỏ (`text-[8.5px]`, `text-[9.5px]`, `text-[10px]`, `text-[11px]`) thành cỡ chữ dễ đọc (`text-xs` 12px, `text-sm` 14px, `text-base` 16px).
- **Header & Navigation**:
  - Tăng kích thước chữ menu `TRANG CHỦ`, `DANH MỤC`, `VỀ ALPS`, `LIÊN HỆ`, `NGHI THỨC` lên `text-xs sm:text-sm font-semibold`.
  - Tăng kích thước và padding nút `🌸 Ưu Đãi 20/10` và `Soi Da AI` để người dùng dễ nhìn thấy và nhấp chuột/chạm tay.
- **Thẻ sản phẩm (ProductCard & ProductsPage)**:
  - Tăng tên sản phẩm từ `text-sm` lên `text-base sm:text-lg`.
  - Tăng giá tiền nổi bật hơn (`text-base sm:text-lg font-bold`).
  - Nút "MUA NGAY" và icon "Thêm vào giỏ" tăng padding và cỡ chữ để đạt chuẩn touch target tối thiểu 44px.
- **Thanh điều hướng Mobile (BottomNav)**:
  - Tăng kích thước icon và nhãn chữ từ `text-[8.5px]` lên `text-xs` (11-12px) rõ ràng, khoảng cách nút rộng rãi.
- **Các trang nội dung (`/san-pham`, `/ve-alps`, `/lien-he`) & Modal**:
  - Toàn bộ đoạn văn mô tả, nhãn form, ô nhập liệu (input, select, textarea) tăng lên tối thiểu `text-sm` (14px) giúp người dùng không bị mỏi mắt và gõ thông tin thuận tiện trên thiết bị di động.

---

### B. Tích hợp Trợ lý AI Chuyên viên Da liễu Thụy Sĩ (Gemini 3.8 Flash)
- **Mở rộng Server Endpoint `/api/chat` (`server.ts`)**:
  - Sử dụng SDK hiện đại `@google/genai` với mô hình chính thức **`gemini-3.8-flash`**.
  - Thiết lập Prompt System Instruction đóng vai chuyên viên da liễu Thụy Sĩ cao cấp của ALPS:
    - Am hiểu tường tận 5 dòng sản phẩm ALPS (Sữa rửa mặt Gentle Purifying, Nước cân bằng Botanical Balancing, Serum Radiance Glow, Kem dưỡng Regenerating Face Cream, Mặt nạ sinh học Bio-Cellulose).
    - Am hiểu khoa học da liễu (phục hồi màng lipid, điều trị mụn, mờ thâm nám, da nhạy cảm, phụ nữ mang thai).
    - Nắm rõ chính sách ALPS: hotline `0772 770 134`, email `pure@alps.vn`, địa chỉ `30 Trịnh Đình Thảo, Tân Phú, TP.HCM`, cam kết đổi trả 30 ngày, freeship từ 500k.
    - Trả lời thông minh, tự nhiên cho bất kỳ câu hỏi nào của người dùng (kể cả câu hỏi ngoài lề, so sánh mỹ phẩm, thành phần sinh học).
- **Tạo Component Bong Bóng Chat Nổi Mới (`FloatingAIChatWidget.tsx`)**:
  - Luôn hiện diện ở góc dưới bên phải màn hình trên tất cả các trang (`/`, `/san-pham`, `/san-pham/:slug`, `/ve-alps`, `/lien-he`).
  - Nút tròn nổi sang trọng phong cách Quiet Luxury với biểu tượng Bác sĩ Da liễu / Sparkles kèm hiệu ứng thông báo "Tư vấn cùng Chuyên viên Da liễu AI".
  - Khi bấm, mở cửa sổ chat nổi dạng floating panel nhỏ gọn, thanh lịch, có thể thu nhỏ hoặc mở rộng.
  - Hỗ trợ lưu trữ lịch sử trò chuyện trong phiên, hiển thị bong bóng chat sinh động, gõ phím nhanh với các câu hỏi mẫu (Quick Prompts).
- **Đồng bộ với Popup CSKH (`CustomerSupportModal.tsx`)**:
  - Tab "Trò Chuyện AI 24/7" trong popup cũng sẽ sử dụng cùng backend Gemini AI, đảm bảo người dùng truy cập ở bất kỳ vị trí nào đều nhận được trải nghiệm nhất quán.

---

## 2. Hệ Thống Thiết Kế & Giao Diện (Design & Aesthetic System)

### Typography Hierarchy (Hệ thống chữ mới)
- **Menu Header**: `text-xs sm:text-sm font-semibold tracking-wider uppercase`
- **Tiêu đề lớn (H1/H2)**: `text-2xl sm:text-4xl md:text-5xl font-serif text-[#1c1c19]`
- **Tên sản phẩm**: `text-base sm:text-lg font-serif text-[#1c1c19]`
- **Giá sản phẩm**: `text-base sm:text-xl font-bold text-[#1c1c19] tabular-nums`
- **Văn bản mô tả body**: `text-sm sm:text-base text-[#5a595e] leading-relaxed`
- **Nhãn form & Input placeholders**: `text-sm font-medium text-[#1c1c19]` (loại bỏ hoàn toàn tình trạng chữ quá bé khi gõ trên mobile)
- **Nút bấm chính (CTA Buttons)**: `text-xs sm:text-sm font-semibold py-2.5 px-5 sm:py-3 sm:px-6`

### Floating Chat Widget Styling
- **Biểu tượng bong bóng**: Hình tròn 56px với nền màu đen sang trọng `#202022`, viền vàng đồng nhạt `#fed8c9`, icon lấp lánh và chấm xanh "Trực tuyến 24/7".
- **Cửa sổ Chat**: Khung bo góc lớn `rounded-3xl` (rộng 380px trên desktop, full-width thông minh trên mobile), nền trắng ngà `#fcf9f4` ấm áp, tin nhắn của Bác sĩ AI nền trắng viền mờ cao cấp, tin nhắn người dùng nền `#202022` chữ trắng.

---

## 3. Kế Hoạch Kiểm Thử & Xác Nhận (Verification Plan)

### Automated Build & Test
- Kiểm tra biên dịch TypeScript toàn bộ dự án (`npm run build`).
- Xác minh không có lỗi cú pháp, thiếu biến hoặc xung đột kiểu dữ liệu.

### Manual Verification Walkthrough
1. **Kiểm tra độ lớn của chữ**:
   - Mở trang chủ `/`, trang danh mục `/san-pham`, trang chi tiết `/san-pham/:slug`, trang `/ve-alps` và `/lien-he`.
   - Xác nhận chữ trên máy tính và điện thoại to, rõ ràng, dễ đọc, không còn các đoạn chữ li ti.
   - Thử chạm các nút menu, nút Mua ngay, các icon trên BottomNav trên mobile viewport.
2. **Kiểm tra Bong bóng Chat AI nổi 24/7**:
   - Quan sát góc dưới màn hình: nút bong bóng xuất hiện mượt mà.
   - Bấm vào bong bóng chat để mở cửa sổ chat.
   - Gửi câu hỏi về phác đồ da mụn, câu hỏi về thành phần tế bào gốc hoa tuyết, hoặc câu hỏi ngẫu nhiên ngoài kịch bản: xác nhận Gemini AI trả lời thông minh, đúng phong thái chuyên gia da liễu Thụy Sĩ ALPS.
   - Thử bấm các câu hỏi gợi ý nhanh (Quick Prompts).
   - Kiểm tra đóng / mở / thu nhỏ cửa sổ chat.
3. **Kiểm tra Chat trong Popup CSKH**:
   - Mở modal CSKH từ Footer hoặc Menu, chuyển sang tab Trò chuyện AI, thử gửi câu hỏi và kiểm tra độ phản hồi.
