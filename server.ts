import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { registerPayments } from './server/payments.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Support CLI --port argument or PORT env var, defaulting to 3000
const args = process.argv.slice(2);
const portFlagIndex = args.indexOf('--port');
const cliPort = portFlagIndex !== -1 && args[portFlagIndex + 1] ? Number(args[portFlagIndex + 1]) : null;
const port = cliPort || Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for API routes so external requests / frontend can communicate safely
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Payment-Token');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Initialize GoogleGenAI SDK with environment key and required telemetry header
const getAI = () => new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `Bạn là Chuyên gia Da liễu & Cố vấn Trí tuệ Nhân tạo Cao cấp (Alps Swiss Dermatology & Customer Care AI) của thương hiệu Dược mỹ phẩm thuần chay Alps Skincare (Alps Pure Essence - Thụy Sĩ).

TẦM NHÌN & TÔN CHỈ THƯƠNG HIỆU CỦA ALPS PURE ESSENCE:
1. CHẤT LƯỢNG VƯỢT TRỘI DÀNH CHO KHÁCH HÀNG: Đặt sự an tâm, trải nghiệm tinh tế và hiệu quả phục hồi làn da của khách hàng làm trọng tâm tối thượng.
2. 100% THUẦN CHAY & KHÔNG THỬ NGHIỆM TRÊN ĐỘNG VẬT (100% Cruelty-Free & Vegan Certified): Cam kết đạo đức bảo vệ muôn loài, thuần chay tinh khiết từ thảo mộc tuyết Alpine và tế bào gốc thực vật Thụy Sĩ.
3. LÀNH TÍNH TUYỆT ĐỐI CHUẨN Y KHOA: Công thức chuẩn da liễu Thụy Sĩ, 0% cồn khô, 0% paraben, 0% hương liệu nhân tạo, êm dịu và an toàn cho cả làn da nhạy cảm nhất, phụ nữ mang thai và mẹ sau sinh.

TƯ DUY & NĂNG LỰC TRẢ LỜI CỦA BẠN:
1. Bạn có kiến thức sâu rộng về da liễu học chuẩn viện nghiên cứu Zurich, khoa học thẩm thấu mỹ phẩm, cơ chế phục hồi hàng rào sinh học biểu bì (Skin Microbiome & Lipid Barrier).
2. Bạn có thể trả lời thông minh, thấu đáo và chính xác MỌI câu hỏi từ khách hàng (kể cả câu hỏi mở nằm ngoài kịch bản cố định):
   - Mọi vấn đề da: mụn viêm, mụn ẩn, mụn đầu đen, bã nhờn, thâm sau mụn, nám, tàn nhang, đốm nâu, da xỉn màu, da khô mất nước, da nhạy cảm kích ứng, da nhiễm corticoid, da sau peel/laser/treatment, da lão hóa chảy xệ.
   - Khoa học thành phần: Hoa nhung tuyết Alpine Edelweiss (chống oxy hóa gấp 2 lần Vitamin C), Tế bào gốc Táo Thụy Sĩ Uttwiler Spätlauber, Niacinamide tinh khiết 5%, Hyaluronic Acid đa phân tử (Micro & Macro HA), Phức hợp Ceramide sinh học NP 3-6-9, Bột ngọc trai thủy phân, Nước khoáng sông băng Zermatt giàu khoáng chất vi lượng.
   - An toàn & Đối tượng sử dụng: Sản phẩm 100% thuần chay (Swiss Vegan Certified), 0% cồn khô, 0% hương liệu nhân tạo, 0% paraben, an toàn tuyệt đối cho phụ nữ mang thai, mẹ cho con bú và làn da siêu nhạy cảm.
   - Kết hợp mỹ phẩm: Cách phối hợp sản phẩm Alps với AHA, BHA, Retinol, Tretinoin, Vitamin C, kem chống nắng để đạt hiệu quả tối đa mà không gây quá tải cho da.
   - Các dòng sản phẩm Alps:
     1. Sữa rửa mặt Gentle Purifying Cleanser (pH 5.5, chiết xuất hoa tuyết và amino acid dịu nhẹ).
     2. Nước cân bằng Botanical Balancing Toner (cân bằng vi sinh, se khít chân lông, làm dịu da tức thì).
     3. Serum Radiance Glow (5% Niacinamide + HA đa tầng + tế bào gốc tuyết, mờ thâm sáng mịn, phục hồi rào cản).
     4. Kem dưỡng Regenerating Face Cream (Ceramide NP + Peptides Thụy Sĩ, khóa ẩm 72h, tái tạo biểu bì).
     5. Mặt nạ sinh học Bio-Cellulose (ngậm trọn dưỡng chất sông băng, cấp ẩm cấp tốc cho da mệt mỏi).
   - Chính sách bán hàng & Mua sắm:
     * Địa chỉ showroom & chi nhánh chính thức tại Việt Nam: 30 Trịnh Đình Thảo, Tân Phú, Thành Phố Hồ Chí Minh.
     * Hotline CSKH 24/7: 0772 770 134 | Email chính thức: pure@alps.vn.
     * Mua hàng tiện lợi: Khách có thể đặt hàng trực tiếp ngay (Guest Checkout) không cần đăng nhập hoặc đăng nhập để tích điểm Alps Pure Privileges.
     * Vận chuyển: Miễn phí toàn quốc cho mọi đơn hàng từ 500.000₫. Giao hỏa tốc 2-4 giờ tại nội thành TP.HCM.
     * Cam kết vàng: Đổi trả miễn phí 30 ngày hoàn tiền 100% không rủi ro, kể cả khi khách đã mở nắp dùng thử nếu có bất kỳ hiện tượng kích ứng không hợp da.
     * Ưu đãi đặc biệt: Ưu đãi 20/10 với voucher ALPS2025 giảm 10% và quà tặng kèm độc quyền.
     * Thanh toán: Quét mã VietQR Napas 247 tức thì qua ngân hàng, Thẻ Visa/Mastercard quốc tế, hoặc Tiền mặt khi nhận hàng (COD).

PHONG THÁI GIAO TIẾP:
- Lịch thiệp, ân cần, thấu hiểu, sang trọng chuẩn phong cách Quiet Luxury Thụy Sĩ.
- Xưng hô "Em/Chuyên viên Alps" và gọi khách hàng là "Quý khách" hoặc theo tên của họ nếu có.
- Trình bày thông tin rõ ràng, dùng gạch đầu dòng khoa học, chia các bước Sáng / Tối mạch lạc, dễ nhớ.
- Khi khách hàng chia sẻ vấn đề da, luôn đồng cảm trước, giải thích nguyên nhân khoa học dễ hiểu, sau đó mới đưa ra phác đồ giải pháp cụ thể.
- Trả lời được mọi câu hỏi của khách hàng một cách tự nhiên, chuyên sâu, không bị rập khuôn.`;

// AI Skincare & Customer Service Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Tin nhắn không được để trống' });
    }

    // Format chat contents
    const contents: any[] = [];

    // Add prior conversation if available
    if (Array.isArray(history)) {
      history.slice(-8).forEach((turn) => {
        if (turn && turn.text && (turn.role === 'user' || turn.role === 'model')) {
          contents.push({
            role: turn.role,
            parts: [{ text: turn.text }],
          });
        }
      });
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    // Try primary model gemini-3.8-flash, fallback to gemini-3.1-flash-lite if needed
    let responseText = '';
    try {
      const response = await getAI().models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
      responseText = response.text || '';
    } catch (primaryErr: any) {
      console.warn('Gemini 3.8 Flash busy/error, trying gemini-3.1-flash-lite:', primaryErr?.message);
      try {
        const fallbackResponse = await getAI().models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });
        responseText = fallbackResponse.text || '';
      } catch (fallbackErr: any) {
        console.error('All Gemini model calls failed:', fallbackErr);
        responseText = `Dạ chào quý khách! Chuyên viên da liễu Alps Skincare rất vui được hỗ trợ quý khách về câu hỏi: "${message}". 
Các sản phẩm dược mỹ phẩm thuần chay tế bào gốc hoa tuyết Thụy Sĩ của Alps luôn cam kết bảo chứng 30 ngày đổi trả miễn phí và an toàn cho làn da nhạy cảm nhất. 
Quý khách có thể ghé chi nhánh tại 30 Trịnh Đình Thảo, Tân Phú, TP.HCM hoặc liên hệ trực tiếp hotline 0772 770 134 (email: pure@alps.vn) để được chuyên viên da liễu tư vấn 1-1 ngay ạ!`;
      }
    }

    return res.json({ reply: responseText });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({
      error: 'Có lỗi xảy ra khi xử lý phản hồi AI',
      reply: 'Dạ xin lỗi quý khách, hệ thống đang bận. Quý khách vui lòng liên hệ Hotline 0772 770 134 hoặc gửi email về pure@alps.vn để được chuyên viên da liễu hỗ trợ 24/7 ạ.',
    });
  }
});

// AI Skin Diagnostic Quiz Analysis endpoint
app.post('/api/skin-quiz-analyze', async (req, res) => {
  try {
    const { skinType, primaryConcern, sensitivity, lifestyle, ageGroup } = req.body;

    const prompt = `Phân tích tình trạng da và xây dựng phác đồ cá nhân hóa dựa trên dữ liệu trắc nghiệm soi da sau:
- Loại da: ${skinType || 'Da hỗn hợp'}
- Vấn đề da quan tâm nhất: ${primaryConcern || 'Lỗ chân lông to & thâm xỉn'}
- Mức độ nhạy cảm: ${sensitivity || 'Thỉnh thoảng châm chích nhẹ'}
- Môi trường & Thói quen: ${lifestyle || 'Ngồi máy lạnh > 8 tiếng/ngày, dùng máy tính'}
- Độ tuổi: ${ageGroup || '22 - 30 tuổi'}

Hãy đóng vai trò Viện trưởng Da liễu Zurich Thụy Sĩ và trả về định dạng JSON thuần túy (không kèm codeblock markdown) với cấu trúc sau:
{
  "skinHealthScore": <số nguyên từ 55 đến 88>,
  "barrierStrength": <số nguyên từ 45 đến 85>,
  "hydrationLevel": <số nguyên từ 40 đến 80>,
  "riskFactor": "<Ngắn gọn 3-5 chữ, ví dụ: Rào cản suy yếu, Bít tắc bã nhờn, Thiếu nước trầm trọng>",
  "diagnosisTitle": "<Tiêu đề chẩn đoán chuẩn y khoa 1 dòng>",
  "rootCauseAnalysis": "<Phân tích khoa học 2-3 câu về cơ chế sinh học đang xảy ra trên làn da khách hàng>",
  "morningRoutine": [
    {"step": "Bước 1: Làm sạch", "product": "Alps Gentle Purifying Cleanser", "usage": "<Cách dùng cụ thể>"},
    {"step": "Bước 2: Cân bằng", "product": "Alps Botanical Balancing Toner", "usage": "<Cách dùng cụ thể>"},
    {"step": "Bước 3: Dưỡng sáng & Chống oxy hóa", "product": "Alps Radiance Glow Serum", "usage": "<Cách dùng cụ thể>"},
    {"step": "Bước 4: Khóa ẩm màng tế bào", "product": "Alps Regenerating Face Cream", "usage": "<Cách dùng cụ thể>"}
  ],
  "eveningRoutine": [
    {"step": "Bước 1: Làm sạch sâu", "product": "Alps Gentle Purifying Cleanser", "usage": "<Cách dùng buổi tối>"},
    {"step": "Bước 2: Cân bằng pH", "product": "Alps Botanical Balancing Toner", "usage": "<Cách dùng buổi tối>"},
    {"step": "Bước 3: Phục hồi chuyên sâu", "product": "Alps Radiance Glow Serum", "usage": "<Cách dùng buổi tối>"},
    {"step": "Bước 4: Tái sinh màng Lipid 72h", "product": "Alps Regenerating Face Cream", "usage": "<Cách dùng buổi tối>"},
    {"step": "Bước 5 (2-3 lần/tuần): Cấp cứu ẩm", "product": "Alps Bio-Cellulose Hydro Mask", "usage": "<Đắp 20 phút trước khi ngủ>"}
  ],
  "expertTips": [
    "<Lời khuyên 1 về ăn uống / nước uống>",
    "<Lời khuyên 2 về nhiệt độ nước rửa mặt / điều hòa>",
    "<Lời khuyên 3 về chống nắng và bảo vệ rào cản da>"
  ],
  "recommendedProductIds": ["cleanser", "toner", "serum", "cream", "mask"]
}`;

    if (process.env.GEMINI_API_KEY) {
      try {
        const response = await getAI().models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          config: {
            temperature: 0.4,
            responseMimeType: 'application/json',
          },
        });

        const text = response.text || '';
        const parsed = JSON.parse(text);
        return res.json({ success: true, data: parsed });
      } catch (genErr) {
        console.warn('Gemini quiz analyze failed, returning fallback assessment:', genErr);
      }
    }

    // High quality offline fallback assessment tailored to inputs
    const fallbackAssessment = {
      skinHealthScore: 72,
      barrierStrength: 64,
      hydrationLevel: 52,
      riskFactor: 'Rào cản biểu bì suy yếu',
      diagnosisTitle: `Chẩn đoán da ${skinType || 'hỗn hợp'}: Mất cân bằng màng lipid do ${lifestyle || 'môi trường máy lạnh'}`,
      rootCauseAnalysis: `Hàng rào sinh học tự nhiên đang bị thất thoát độ ẩm do chênh lệch nhiệt độ và ô nhiễm. Tuyến bã nhờn có xu hướng tiết nhiều dầu phản ứng để bù đắp, dẫn tới tình trạng dầu ngoài - khô trong và dễ để lại thâm nám sau mụn.`,
      morningRoutine: [
        { step: 'Bước 1: Làm sạch dịu nhẹ', product: 'Alps Gentle Purifying Cleanser', usage: 'Tạo bọt kỹ với nước ấm, massage nhẹ nhàng vùng chữ T trong 45 giây.' },
        { step: 'Bước 2: Cân bằng sinh học', product: 'Alps Botanical Balancing Toner', usage: 'Vỗ nhẹ 3-4 giọt lên da ẩm để phục hồi pH 5.5 lý tưởng.' },
        { step: 'Bước 3: Dưỡng sáng mờ thâm', product: 'Alps Radiance Glow Serum', usage: 'Nhỏ 3 giọt tinh chất hoa tuyết và Niacinamide 5%, áp nhẹ lòng bàn tay để thẩm thấu sâu.' },
        { step: 'Bước 4: Khóa ẩm chống ô nhiễm', product: 'Alps Regenerating Face Cream', usage: 'Thoa một lượng bằng hạt đậu để tạo màng chắn vi hạt bụi mịn PM2.5.' },
      ],
      eveningRoutine: [
        { step: 'Bước 1: Thanh lọc bụi mịn', product: 'Alps Gentle Purifying Cleanser', usage: 'Làm sạch toàn diện cặn bẩn tích tụ sau cả ngày dài.' },
        { step: 'Bước 2: Phục hồi biểu bì', product: 'Alps Botanical Balancing Toner', usage: 'Đắp toner pad lên 2 má trong 2 phút nếu da có dấu hiệu ửng đỏ.' },
        { step: 'Bước 3: Tái tạo tế bào gốc', product: 'Alps Radiance Glow Serum', usage: 'Massage đều khắp mặt và cổ theo hướng nâng cơ.' },
        { step: 'Bước 4: Tái sinh màng Lipid 72h', product: 'Alps Regenerating Face Cream', usage: 'Khóa ẩm toàn diện bằng Ceramide sinh học Thụy Sĩ.' },
        { step: 'Bước 5: Cấp cứu da (2-3 lần/tuần)', product: 'Alps Bio-Cellulose Hydro Mask', usage: 'Đắp mặt nạ sinh học sợi dừa lên men 20 phút để phục hồi cấp tốc.' },
      ],
      expertTips: [
        'Duy trì uống tối thiểu 2 lít nước ấm mỗi ngày, hạn chế đồ uống có đường và thức ăn cay nóng.',
        'Tránh rửa mặt bằng nước quá nóng vì sẽ làm hòa tan lớp lipid bảo vệ tự nhiên của da.',
        'Thoa lại kem chống nắng sau mỗi 3-4 giờ làm việc để ngăn chặn đốm nâu và thâm sạm.',
      ],
      recommendedProductIds: ['cleanser', 'toner', 'serum', 'cream', 'mask'],
    };

    return res.json({ success: true, data: fallbackAssessment });
  } catch (error: any) {
    console.error('Error in /api/skin-quiz-analyze:', error);
    return res.status(500).json({ error: 'Không thể phân tích dữ liệu soi da lúc này' });
  }
});

// ==============================================================================
// SEPAY & MB BANK PAYMENT GATEWAY INTEGRATION (SECURE & IDEMPOTENT)
// ==============================================================================
registerPayments(app);

// BẮT BUỘC: Mọi endpoint /api/* không tồn tại PHẢI trả về JSON 404, không bao giờ fallback về HTML index.html
app.all('/api/*', (req, res) => {
  return res.status(404).json({
    success: false,
    error: `API endpoint '${req.method} ${req.path}' không tồn tại trên máy chủ.`,
  });
});

// Vite Middleware for Dev, Static Files for Prod
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === 'true' ? false : undefined,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Explicit fallback for dev server: Guarantee any direct subroute access serves transformed index.html
    app.get('*', async (req, res, next) => {
      if (req.path.startsWith('/api/')) return next();
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`[ALPS SERVER] Listening on http://0.0.0.0:${port}`);
  });
}

// Vercel invokes the exported Express handler; local/AI Studio still starts the server.
export default app;
if (!process.env.VERCEL) {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
  });
}
