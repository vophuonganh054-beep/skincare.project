# Bật thanh toán trên web ALPS (GitHub → Vercel)

Giao diện, ảnh và tên miền hiện có giữ nguyên. Bản sửa thêm API chạy cùng web trên Vercel; không cần tạo website khác.

## Sau khi kiểm tra và merge pull request

1. Vercel → dự án đang gắn `alps.id.vn` → Settings → Environment Variables. Thêm cho Production:

| Tên | Giá trị |
| --- | --- |
| PAYMENTS_ENABLED | true |
| SEPAY_ACCOUNT_NUMBER | Số tài khoản MB chính xác đã liên kết SePay |
| SEPAY_ACCOUNT_NAME | Tên chủ tài khoản thật |
| SEPAY_WEBHOOK_TOKEN | API Key xác thực của webhook SePay |
| FIREBASE_SERVICE_ACCOUNT_JSON | Toàn bộ JSON tài khoản dịch vụ của Firebase dùng phía máy chủ |

Giữ các biến hiện có, gồm `GEMINI_API_KEY` nếu đã dùng chat. Để `VITE_API_BASE_URL` trống hoặc xóa nếu nó đang trỏ sang backend cũ; các API nay cùng tên miền. Không đặt khóa bí mật trong mã nguồn hay biến có tiền tố VITE_. Không gửi khóa trong chat hoặc ảnh chụp.

Vercel ngoài Google Cloud không tự có tài khoản dịch vụ Firebase. Tạo/cấu hình tài khoản dịch vụ thuộc đúng dự án Firebase, có quyền đọc ghi Firestore (ví dụ Cloud Datastore User phù hợp); nếu dùng khóa JSON, nhập nó vào biến bí mật ở Vercel. Mặc định mã nguồn dùng dự án `affable-shadow-9smzh` và database `ai-studio-alpsskincarepure-c626102d-74cc-4d1b-8d5b-1b1da414820b`. Chỉ đổi `FIREBASE_PROJECT_ID` và `FIRESTORE_DATABASE_ID` nếu bạn thực sự dùng dự án/database khác.

Nếu bạn không có quyền quản trị dự án Firebase do AI Studio tạo, cần nhờ quản trị viên cấp quyền máy chủ hoặc dùng một database Firestore bạn quản lý, rồi cấu hình hai biến trên. Không mở Firestore rules public để vượt lỗi quyền. Hai collection `paymentSessions`, `paymentTransactions` phải chỉ cho backend ghi; rules hiện có mặc định từ chối client.

2. Redeploy sau khi thêm biến. Repo có `vercel.json`: Vite, `npm ci`, `npm run build`, output `dist`, `/api/*` vào `api/index.ts`. Nếu dashboard có override cũ, đối chiếu với các giá trị này. Không đổi tên miền, không bật thanh toán trong Preview nếu chưa có backend và credentials đúng.

3. Trong SePay, sửa/tạo webhook: sự kiện **Có tiền vào**, tài khoản đúng MB đã liên kết, dữ liệu JSON/POST. URL là `https://alps.id.vn/api/sepay/webhook` **chỉ khi domain đó trỏ tới bản triển khai này**. Nếu đang kiểm tra bằng domain Production khác, dùng domain đó thêm `/api/sepay/webhook`. Chọn xác thực **API Key**, nhập cùng giá trị `SEPAY_WEBHOOK_TOKEN` (khác token REST API của SePay). Endpoint phải truy cập công khai được từ SePay, không bị trang đăng nhập hoặc Deployment Protection chặn; điều chỉnh phạm vi bảo vệ API cụ thể khi cần, không tắt rộng toàn bộ biện pháp bảo vệ.

4. Kiểm tra `/api/sepay/config`: phải ra JSON `paymentsEnabled: true`. Mở checkout: QR chỉ hiện khi đăng ký phiên vào Firestore thành công. Nếu không hiện QR, kiểm tra Vercel Functions Logs và quyền Firestore.

5. Thử một đơn thật, xác nhận số tài khoản/tên người nhận trong ứng dụng ngân hàng trước khi chuyển. SePay nhận thông báo xong, trang tự kiểm tra khoảng 3,5 giây/lần và mở nút **Đã thanh toán • Đặt hàng**. Thời gian thực tế phụ thuộc ngân hàng và SePay. Bấm nút để hoàn tất đơn như luồng hiện tại. Kiểm tra nhật ký webhook nếu chậm; không chuyển lại khi chưa rõ giao dịch cũ.

## Những việc bản này thực hiện

- Đối chiếu số tiền theo bảng giá máy chủ, mã đơn đầy đủ và tài khoản nhận.
- API Key webhook bắt buộc, không có mô phỏng thành công.
- Firestore transaction lưu phiên và mã giao dịch một lần, không dùng ổ đĩa tạm Vercel.
- Không công khai dữ liệu ngân hàng hoặc thông tin người mua qua API kiểm tra trạng thái; phiên khách phải có token riêng.
- Khi đổi giỏ/voucher/vận chuyển, mã thanh toán mới được tạo; thanh toán cũ không mở khóa giỏ mới.
- Giữ các phương thức trên giao diện. Chuyển khoản SePay và COD có thể dùng thật sau cấu hình. Thẻ Visa trong bản gốc chưa nối cổng thẻ, nên xác nhận giả bằng bộ đếm giờ đã bị chặn.

## Giới hạn cần biết

Khách vẫn bấm xác nhận đặt hàng sau khi trả tiền. Phiên thanh toán và thông tin người mua đã nhập được lưu trước đó để chủ shop đối soát nếu khách đóng trang. Chưa có trang quản trị mới. Chuyển thiếu nhiều lần không tự cộng dồn; chủ shop xử lý đối soát/hoàn tiền riêng. Đừng chuyển sang phương thức khác hoặc sửa giỏ sau khi đã chuyển tiền; liên hệ shop nếu cần điều chỉnh.

Build, TypeScript và kiểm thử tự động không thay thế việc thử webhook với Firestore thật và giao dịch ngân hàng thật. Chưa có chứng nhận đã chạy thanh toán Production cho đến khi hoàn tất các bước trên.
