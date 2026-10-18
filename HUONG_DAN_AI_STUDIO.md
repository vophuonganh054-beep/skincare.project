# Bật thanh toán SePay trên web ALPS hiện tại

Bản sửa giữ nguyên CSS, bố cục, ảnh, giỏ hàng, QR và COD. Khi nhận đủ tiền hợp lệ, phần QR hiển thị trạng thái thành công và nút đặt hàng hiện “✓ Đã thanh toán”. Nút xác nhận vẫn dùng để hoàn thành đơn như trước.

## 1. Cập nhật đúng dự án AI Studio đang dùng

Sao lưu dự án trước. Đưa các tệp sau vào ĐÚNG dự án hiện tại, giữ đường dẫn:
- `server.ts`
- thư mục mới `server/` (gồm `payments.ts`, `payment-core.ts`)
- `src/components/CheckoutModal.tsx`
- `src/components/VietQRCard.tsx`
- `package.json` và `package-lock.json` nếu có.

Có thể giải nén ZIP và thay nội dung từng tệp trong trình sửa mã AI Studio. Không tạo dự án mới, không yêu cầu AI vẽ lại giao diện. Các tệp khác trong ZIP giữ nội dung gốc, ngoại trừ tài liệu cấu hình và kiểm thử. Nếu nền tảng hỗ trợ nhập cả dự án thì nhập mã vào dự án hiện tại theo tính năng của nền tảng; không giả định có nút nhập ZIP.

Lệnh kiểm tra: `npm install`, `npm run lint`, `npm run build`, `npm run test:payments`.
Ứng dụng phải chạy backend bằng `npm start` với `NODE_ENV=production` sau khi build, và lắng nghe cổng `PORT` của nơi triển khai. Chỉ tải thư mục `dist` lên hosting tĩnh sẽ KHÔNG có API nhận webhook.

## 2. Đặt cấu hình ở máy chủ

Dùng phần cấu hình biến môi trường / Secrets của nơi triển khai, không dán khóa vào chat, mã React hoặc biến có tiền tố `VITE_`:

```
PAYMENTS_ENABLED=true
SEPAY_ACCOUNT_NUMBER=<số tài khoản MB đã liên kết SePay>
SEPAY_ACCOUNT_NAME=<tên chủ tài khoản thật>
SEPAY_WEBHOOK_TOKEN=<khóa xác thực webhook>
```

`SEPAY_WEBHOOK_TOKEN` là API Key xác thực của webhook đã đặt trong SePay; không phải token REST API dùng để đọc lịch sử giao dịch. Bản này nhận webhook nên không cần token REST API.

Hệ thống dùng Firestore hiện có trong `firebase-applet-config.json`. Backend Google Cloud dùng tài khoản dịch vụ của runtime (Application Default Credentials). Tài khoản đó phải được cấp quyền đọc/ghi Firestore của dự án và database đã chọn, ví dụ vai trò Cloud Datastore User trong phạm vi phù hợp. Nếu gặp lỗi quyền, quản trị viên dự án cần cấu hình IAM; KHÔNG mở public Firestore rules để xử lý lỗi này. Nếu dùng backend ngoài Google Cloud, cấu hình thông tin dịch vụ qua secret `FIREBASE_SERVICE_ACCOUNT_JSON` hoặc ADC được hỗ trợ.

Hai collection mới `paymentSessions` và `paymentTransactions` chỉ cho backend truy cập; bộ rules hiện tại mặc định từ chối client, không cần mở quyền. Không lưu khóa vào frontend. Dữ liệu thanh toán không còn phụ thuộc file `.data` tạm của máy chủ.

## 3. Cấu hình webhook trong SePay

Trong tài khoản SePay đã liên kết ngân hàng, thêm/sửa webhook:
- Sự kiện: Có tiền vào.
- Tài khoản: đúng tài khoản MB đã đặt ở backend.
- URL: địa chỉ HTTPS CÔNG KHAI của backend, thêm `/api/sepay/webhook`.
- Phương thức: POST, dữ liệu JSON.
- Xác thực: API Key; dùng cùng giá trị `SEPAY_WEBHOOK_TOKEN`.
- Nếu lọc mã thanh toán, phải cho phép mã dạng `ALPS` + 24 ký tự hex. Để tránh lọc mất giao dịch, có thể tắt lọc mã và để backend tự đối soát.

KHÔNG dùng URL trang chỉnh sửa `ai.studio/apps/...` làm webhook. Dùng URL ứng dụng đã triển khai chạy backend và không yêu cầu đăng nhập Google. Link editor có thể vẫn dùng xem thử, nhưng webhook cần backend công khai. Nếu web `alps.id.vn` đang được phục vụ từ cùng backend, dùng domain đó. Nếu domain ở hosting tĩnh, phải trỏ API tới backend bằng `VITE_API_BASE_URL` rồi build lại, hoặc cấu hình proxy phù hợp.

Kiểm tra `/api/sepay/config` trên host ứng dụng: phải trả JSON với `paymentsEnabled: true`. Nếu trả HTML/404 thì domain đó chưa có backend. Chỉ nên bật nhận tiền sau khi mở checkout và QR hiện ra: điều này chứng tỏ backend đã tạo được phiên trong Firestore.

## 4. Kiểm tra thật trước khi mở bán

Tạo một đơn, ghi lại số tiền/nội dung QR và chuyển đúng từ tài khoản khác. Chỉ chuyển khoản khi chắc chắn số tài khoản và tên người nhận trong ứng dụng ngân hàng là của bạn. Trang sẽ kiểm tra mỗi khoảng 3,5 giây; thời điểm xác nhận còn phụ thuộc SePay/ngân hàng. Kiểm tra nhật ký webhook nếu chậm.

Sau thành công, bấm xác nhận đặt hàng để hoàn tất bước đặt đơn hiện có. Nếu khách đóng trang trước bước này, phiên thanh toán và thông tin người mua đã nhập vẫn được lưu trong `paymentSessions` để chủ shop đối soát; bản này chưa có màn hình quản trị xử lý đơn bỏ dở.

Không cộng dồn nhiều lần chuyển thiếu: giao dịch riêng lẻ phải đủ số tiền; trường hợp chuyển thiếu/thừa/sai nội dung cần chủ shop đối soát. Không yêu cầu khách chuyển lại toàn bộ khi chưa rõ giao dịch trước. Gửi lại cùng webhook không tạo thanh toán trùng. Khi đổi giỏ hàng, mã ưu đãi hoặc vận chuyển, hệ thống tạo mã thanh toán mới và không dùng xác nhận của giỏ cũ.

Thanh toán thẻ Visa/Mastercard trong bản gốc chỉ dùng bộ đếm giờ giả thành công, chưa có ngân hàng xử lý. Bản sửa giữ phần giao diện nhưng vô hiệu hóa xác nhận giả. Hiện hỗ trợ thực tế: chuyển khoản SePay và COD; thẻ cần tích hợp cổng thẻ riêng.

## Phạm vi kiểm tra

Các bài kiểm thử trong `tests/` kiểm tra tính giá, đối soát và tuyến API bằng kho dữ liệu giả lập. Đó không phải chứng nhận đã nhận tiền thật. Cần hoàn tất cấu hình, triển khai và thử giao dịch thật trên tài khoản của bạn để xác nhận hoạt động đầy đủ.
