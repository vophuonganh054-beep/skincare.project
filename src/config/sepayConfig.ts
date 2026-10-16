/**
 * CẤU HÌNH CỔNG THANH TOÁN SEPAY & NGÂN HÀNG MB BANK
 * 
 * Bạn có thể chỉnh sửa trực tiếp các thông số dưới đây
 * hoặc gửi thông tin vào chat để AI cập nhật giúp bạn.
 */

export const SEPAY_CONFIG = {
  // 1. Trạng thái bật thanh toán:
  // - false: Chế độ Thử nghiệm (Mặc định). Cho phép test thanh toán mô phỏng an toàn, không cần tiền thật.
  // - true: Bật thanh toán thật qua SePay & MB Bank.
  paymentsEnabled: false,

  // 2. Số tài khoản MB Bank của bạn (dùng để tạo mã VietQR):
  accountNumber: '9999ALPS88',

  // 3. Tên chủ tài khoản MB Bank:
  accountName: 'ALPS',

  // 4. Mã và tên ngân hàng:
  bankCode: 'MB',
  bankName: 'MB Bank',

  // 5. Khóa bí mật Webhook (Chuỗi bảo mật bạn tự đặt trên SePay Webhook Settings để server đối chiếu):
  webhookToken: '',

  // 6. API Key từ SePay (Tùy chọn - chỉ dùng nếu bạn muốn gọi REST API SePay):
  apiKey: '',
};
