import { SupportedLanguage } from './translations';

export interface LocalizedQuizQuestion {
  title: string;
  subtitle: string;
  options: { label: string; desc: string }[];
}

export interface QuizRoutineStep {
  step: string;
  product: string;
  usage: string;
}

export interface FallbackDiagnosis {
  diagnosisTitle: string;
  rootCauseAnalysis: string;
  riskFactor: string;
  morningSteps: QuizRoutineStep[];
  eveningSteps: QuizRoutineStep[];
  expertTips: string[];
}

export interface QuizI18n {
  modalTitle: string;
  stepIndicator: (step: number, total: number) => string;
  backBtn: string;
  nextBtn: string;
  finishBtn: string;
  retakeBtn: string;
  addToCartRoutine: string;
  consultDoctor: string;
  diagnosticResultTitle: string;
  diagnosticBadge: string;
  skinScoreLabel: string;
  clinicalResultHeader: string;
  barrierStrengthLabel: string;
  hydrationLevelLabel: string;
  riskFactorLabel: string;
  personalizedRoutineTitle: string;
  swissProductsCount: string;
  morningRoutineTitle: string;
  eveningRoutineTitle: string;
  doctorAdviceTitle: string;
  analyzingTitle: string;
  analyzingDesc: string;
  questions: LocalizedQuizQuestion[];
  fallbackDiagnosis: FallbackDiagnosis;
}

export const QUIZ_I18N: Record<SupportedLanguage, QuizI18n> = {
  vi: {
    modalTitle: 'Chẩn Đoán Làn Da AI Sinh Học • Skin Diagnostic',
    stepIndicator: (step, total) => `Câu hỏi ${step}/${total}`,
    backBtn: 'Quay lại',
    nextBtn: 'Tiếp theo',
    finishBtn: 'Xem Kết Quả Chẩn Đoán',
    retakeBtn: 'Làm lại bài kiểm tra',
    addToCartRoutine: 'Thêm trọn bộ chu trình vào giỏ',
    consultDoctor: 'Tư vấn da liễu 24/7',
    diagnosticResultTitle: 'Phác Đồ Dưỡng Da Cá Nhân Hóa',
    diagnosticBadge: 'CHẨN ĐOÁN HOÀN TẤT',
    skinScoreLabel: 'Điểm Sức Khỏe Da',
    clinicalResultHeader: 'KẾT QUẢ CHẨN ĐOÁN LÂM SÀNG',
    barrierStrengthLabel: 'Rào cản',
    hydrationLevelLabel: 'Độ ẩm',
    riskFactorLabel: 'Cảnh báo',
    personalizedRoutineTitle: 'Phác Đồ Chăm Sóc Da Cá Nhân Hóa Chuẩn Alps',
    swissProductsCount: '5 Sản phẩm tinh hoa Thụy Sĩ',
    morningRoutineTitle: 'CHU TRÌNH BUỔI SÁNG (BẢO VỆ & DƯỠNG SÁNG)',
    eveningRoutineTitle: 'CHU TRÌNH BUỔI TỐI (TÁI SINH & PHỤC HỒI 72H)',
    doctorAdviceTitle: 'Lời khuyên từ Bác Sĩ Da Liễu Zurich',
    analyzingTitle: 'Viện Nghiên Cứu Zurich Đang Phân Tích Làn Da...',
    analyzingDesc: 'Mô phỏng sinh học tế bào, phân tích độ dày màng lipid và thiết lập phác đồ tương thích riêng biệt.',
    questions: [
      {
        title: 'Hiện tại bạn cảm nhận nền da của mình như thế nào?',
        subtitle: 'Bước 1/5 • Xác định phân loại da sinh học',
        options: [
          { label: 'Da Dầu', desc: 'Bóng dầu toàn mặt, lỗ chân lông to ở vùng chữ T, dễ sinh mụn' },
          { label: 'Da Hỗn Hợp Thiên Dầu', desc: 'Đổ dầu nhiều ở vùng trán mũi cằm, hai bên má khô hoặc bình thường' },
          { label: 'Da Khô', desc: 'Thường xuyên căng rát sau rửa mặt, bề mặt sần sùi hoặc bong tróc' },
          { label: 'Da Hỗn Hợp Thiên Khô', desc: 'Khô căng nhiều vùng, chỉ tiết dầu nhẹ vào cuối ngày' },
          { label: 'Da Nhạy Cảm', desc: 'Dễ ửng đỏ, ngứa ngáy hoặc châm chích khi đổi thời tiết' },
          { label: 'Da Thường Cân Bằng', desc: 'Lỗ chân lông mịn, độ ẩm tự nhiên tốt, ít khuyết điểm' },
        ],
      },
      {
        title: 'Vấn đề nào của làn da khiến bạn muốn cải thiện nhất?',
        subtitle: 'Bước 2/5 • Mục tiêu phục hồi ưu tiên',
        options: [
          { label: 'Sạm Nám & Vết Thâm', desc: 'Muốn làm sáng da, mờ đốm nâu sau mụn và đều màu da' },
          { label: 'Lỗ Chân Lông & Mụn', desc: 'Muốn làm sạch sâu, kiềm dầu và se khít lỗ chân lông' },
          { label: 'Khô Căng & Bong Tróc', desc: 'Muốn cấp ẩm sâu tầng, phục hồi màng ẩm căng bóng' },
          { label: 'Lão Hóa & Nếp Nhăn', desc: 'Muốn nâng cơ, săn chắc và làm mờ rãnh nhăn li ti' },
          { label: 'Kích Ứng & Ửng Đỏ', desc: 'Muốn làm dịu tức thì và củng cố hàng rào bảo vệ da' },
        ],
      },
      {
        title: 'Môi trường sống và làm việc thường ngày của bạn?',
        subtitle: 'Bước 3/5 • Tác nhân môi trường',
        options: [
          { label: 'Phòng Điều Hòa Liên Tục', desc: 'Ngồi máy lạnh >8 tiếng/ngày, da dễ mất nước tầng sâu' },
          { label: 'Ngoài Trời & Nắng Nóng', desc: 'Thường xuyên tiếp xúc ánh nắng, tia UV và khói bụi' },
          { label: 'Thời Tiết Lạnh Khô', desc: 'Khí hậu mùa đông hanh khô khiến hàng rào lipid suy yếu' },
          { label: 'Môi Trường Ô Nhiễm Bụi', desc: 'Giao thông đô thị nhiều bụi mịn PM2.5' },
        ],
      },
      {
        title: 'Chu trình chăm sóc da hiện tại của bạn gồm bao nhiêu bước?',
        subtitle: 'Bước 4/5 • Mức độ tương thích dưỡng da',
        options: [
          { label: 'Tối Giản (1-2 bước)', desc: 'Chỉ rửa mặt và thoa kem dưỡng cơ bản' },
          { label: 'Tiêu Chuẩn (3-4 bước)', desc: 'Rửa mặt, toner, serum và kem dưỡng' },
          { label: 'Chuyên Sâu (5+ bước)', desc: 'Đầy đủ chu trình với mặt nạ, tinh chất và kem mắt' },
        ],
      },
      {
        title: 'Mức độ nhạy cảm của da với thành phần mới?',
        subtitle: 'Bước 5/5 • An toàn biểu bì',
        options: [
          { label: 'Rất Lành Tính', desc: 'Hiếm khi bị dị ứng với các loại mỹ phẩm mới' },
          { label: 'Thỉnh Thoảng Châm Chích', desc: 'Có thể hơi đỏ nhẹ với nồng độ hoạt chất cao' },
          { label: 'Cực Kỳ Nhạy Cảm', desc: 'Dễ kích ứng, chỉ dùng được các sản phẩm dịu nhẹ chuẩn y khoa' },
        ],
      },
    ],
    fallbackDiagnosis: {
      diagnosisTitle: 'Tổn Thương Màng Lipid Biểu Bì Do Mất Nước Tầng Sâu',
      rootCauseAnalysis: 'Hàng rào sinh học tự nhiên bị suy giảm khả năng giữ nước do tác động của máy lạnh và môi trường đô thị. Tuyến bã nhờn phản ứng bù trừ dẫn đến tình trạng da vừa bóng nhờn bên ngoài vừa khô căng bên trong, dễ sinh mụn và thâm sạm.',
      riskFactor: 'Thất thoát màng ẩm sinh học',
      morningSteps: [
        { step: 'Bước 1', product: 'Alps Gentle Purifying Cleanser', usage: 'Rửa mặt nhẹ nhàng trong 60 giây bằng nước mát.' },
        { step: 'Bước 2', product: 'Alps Botanical Balancing Toner', usage: 'Vỗ 3-4 giọt cấp ẩm tức thì, cân bằng pH 5.5.' },
        { step: 'Bước 3', product: 'Alps Radiance Glow Serum', usage: 'Thoa 3 giọt phục hồi tế bào, làm mờ thâm nám.' },
        { step: 'Bước 4', product: 'Alps Regenerating Face Cream', usage: 'Khóa ẩm mỏng nhẹ, bảo vệ màng lipid cả ngày.' },
      ],
      eveningSteps: [
        { step: 'Bước 1', product: 'Alps Gentle Purifying Cleanser', usage: 'Làm sạch sâu bụi mịn PM2.5 và bã nhờn tích tụ.' },
        { step: 'Bước 2', product: 'Alps Botanical Balancing Toner', usage: 'Vỗ 2 lớp toner cấp ẩm sâu và làm dịu da.' },
        { step: 'Bước 3', product: 'Alps Radiance Glow Serum', usage: 'Kích hoạt tái tạo collagen ban đêm.' },
        { step: 'Bước 4', product: 'Alps Regenerating Face Cream', usage: 'Khóa ẩm 24h với phức hợp Ceramide 3-6-9.' },
        { step: 'Bước 5', product: 'Alps Bio-Cellulose Hydro Mask', usage: 'Đắp 20 phút (2-3 lần/tuần) để phục hồi cấp tốc.' },
      ],
      expertTips: [
        'Uống đủ 2 lít nước ấm mỗi ngày để giữ nước tế bào từ bên trong.',
        'Tránh rửa mặt bằng nước quá nóng làm tan rã màng dầu bảo vệ tự nhiên.',
        'Sử dụng kem chống nắng phổ rộng khi ra ngoài trời.',
      ],
    },
  },

  en: {
    modalTitle: 'Biometric AI Skin Diagnostic • Alps Pure Essence',
    stepIndicator: (step, total) => `Question ${step} of ${total}`,
    backBtn: 'Back',
    nextBtn: 'Next',
    finishBtn: 'View Personalized Prescription',
    retakeBtn: 'Retake Diagnostic',
    addToCartRoutine: 'Add Full Prescribed Ritual to Bag',
    consultDoctor: 'Consult Dermal Specialist 24/7',
    diagnosticResultTitle: 'Personalized Cellular Skin Protocol',
    diagnosticBadge: 'DIAGNOSTIC COMPLETED',
    skinScoreLabel: 'Skin Health Score',
    clinicalResultHeader: 'CLINICAL ASSESSMENT RESULT',
    barrierStrengthLabel: 'Barrier',
    hydrationLevelLabel: 'Hydration',
    riskFactorLabel: 'Alert',
    personalizedRoutineTitle: 'Personalized Alps Skin Prescription',
    swissProductsCount: '5 Swiss Masterpiece Formulations',
    morningRoutineTitle: 'MORNING RITUAL (PROTECTION & RADIANCE)',
    eveningRoutineTitle: 'EVENING RITUAL (REGENERATION & 72H REPAIR)',
    doctorAdviceTitle: 'Zurich Dermatology Clinical Advice',
    analyzingTitle: 'Zurich Research Institute is Analyzing Your Skin...',
    analyzingDesc: 'Simulating cellular lipid matrix, evaluating moisture barrier integrity, and tailoring your biomimetic ritual.',
    questions: [
      {
        title: 'How does your skin feel throughout the day?',
        subtitle: 'Step 1/5 • Biological Skin Typing',
        options: [
          { label: 'Oily Skin', desc: 'Excess shine across face, enlarged T-zone pores, prone to blemishes' },
          { label: 'Combination Oily', desc: 'Oily forehead, nose, and chin; cheeks feel normal or dry' },
          { label: 'Dry Skin', desc: 'Tight after cleansing, flaky or rough patches during cold seasons' },
          { label: 'Combination Dry', desc: 'Predominantly dry, slight shine only on nose tip by day-end' },
          { label: 'Sensitive Skin', desc: 'Flushes easily, stings or itches with climate changes or actives' },
          { label: 'Normal Balanced Skin', desc: 'Smooth pore texture, balanced hydration, minimal blemishes' },
        ],
      },
      {
        title: 'What is your primary skin improvement priority?',
        subtitle: 'Step 2/5 • Cellular Treatment Target',
        options: [
          { label: 'Hyperpigmentation & Dark Spots', desc: 'Desire crystal radiance, fading post-acne marks and sun spots' },
          { label: 'Congested Pores & Oiliness', desc: 'Desire deep pore clarification and gentle sebum regulation' },
          { label: 'Dehydration & Barrier Tightness', desc: 'Desire deep trans-epidermal moisture infusion and suppleness' },
          { label: 'Premature Aging & Fine Lines', desc: 'Desire lifting firmness, density renewal, and smoothing wrinkles' },
          { label: 'Redness & Irritation', desc: 'Desire instant barrier calm and restorative soothing care' },
        ],
      },
      {
        title: 'What is your typical daily environment?',
        subtitle: 'Step 3/5 • External Stress Factors',
        options: [
          { label: 'Constant Air Conditioning', desc: 'Enclosed office air >8 hours daily, depletes skin water reserves' },
          { label: 'Sun & Outdoor Exposure', desc: 'Frequent UV exposure, environmental heat, and urban elements' },
          { label: 'Cold & Arid Seasons', desc: 'Low humidity weakens lipid ceramides and causes flaking' },
          { label: 'Urban Pollution & Smog', desc: 'Micro-dust PM2.5 triggers free-radical oxidative stress' },
        ],
      },
      {
        title: 'How extensive is your current skincare regimen?',
        subtitle: 'Step 4/5 • Lifestyle Routine Compatibility',
        options: [
          { label: 'Minimalist (1-2 steps)', desc: 'Only gentle face wash and basic moisturizer' },
          { label: 'Standard (3-4 steps)', desc: 'Cleanser, balancing toner, active serum, and cream' },
          { label: 'Comprehensive (5+ steps)', desc: 'Full multi-step ritual including sheet masks and treatments' },
        ],
      },
      {
        title: 'How does your skin react to new cosmetic ingredients?',
        subtitle: 'Step 5/5 • Epidermal Tolerance Level',
        options: [
          { label: 'Highly Resilient', desc: 'Rarely experiences irritation with new active formulations' },
          { label: 'Occasional Sensitivity', desc: 'Slight temporary warmth with concentrated clinical actives' },
          { label: 'Extremely Sensitive', desc: 'Prone to reactions; requires medical-grade hypoallergenic clean formulas' },
        ],
      },
    ],
    fallbackDiagnosis: {
      diagnosisTitle: 'Compromised Epidermal Lipid Barrier with Dehydration',
      rootCauseAnalysis: 'Chronic indoor air conditioning and air pollutants have thinned the intercellular ceramide layer. Compensatory sebum overproduction causes surface greasiness over an arid dehydrated base.',
      riskFactor: 'Moisture Barrier Depletion',
      morningSteps: [
        { step: 'Step 1', product: 'Alps Gentle Purifying Cleanser', usage: 'Cleanse with room-temperature water for 60 seconds.' },
        { step: 'Step 2', product: 'Alps Botanical Balancing Toner', usage: 'Pat 3-4 drops to restore biomimetic pH 5.5 balance.' },
        { step: 'Step 3', product: 'Alps Radiance Glow Serum', usage: 'Press 3 drops to awaken cellular antioxidant luminosity.' },
        { step: 'Step 4', product: 'Alps Regenerating Face Cream', usage: 'Seal in hydration with lightweight Ceramide protection.' },
      ],
      eveningSteps: [
        { step: 'Step 1', product: 'Alps Gentle Purifying Cleanser', usage: 'Thoroughly purge PM2.5 urban dust and daily sebum.' },
        { step: 'Step 2', product: 'Alps Botanical Balancing Toner', usage: 'Pat 2 layers for intensive deep cellular quenching.' },
        { step: 'Step 3', product: 'Alps Radiance Glow Serum', usage: 'Stimulate nocturnal collagen repair.' },
        { step: 'Step 4', product: 'Alps Regenerating Face Cream', usage: 'Infuse 5 biomimetic Ceramides for overnight restoration.' },
        { step: 'Step 5', product: 'Alps Bio-Cellulose Hydro Mask', usage: 'Apply 20 minutes (2-3x weekly) for instant cryo-spa recovery.' },
      ],
      expertTips: [
        'Maintain internal hydration by drinking at least 2 liters of warm water daily.',
        'Avoid scalding hot water which melts essential natural lipid enzymes.',
        'Always protect your delicate barrier with broad-spectrum sunscreen outdoors.',
      ],
    },
  },

  de: {
    modalTitle: 'Biometrische AI-Hautanalyse • Alps Pure Essence',
    stepIndicator: (step, total) => `Frage ${step} von ${total}`,
    backBtn: 'Zurück',
    nextBtn: 'Weiter',
    finishBtn: 'Individuelle Pflegeempfehlung Ansehen',
    retakeBtn: 'Test wiederholen',
    addToCartRoutine: 'Empfohlenes Pflegeritual in den Warenkorb',
    consultDoctor: '24/7 Schweizer Hautberatung',
    diagnosticResultTitle: 'Personalisiertes Pflegeritual',
    diagnosticBadge: 'ANALYSE ABGESCHLOSSEN',
    skinScoreLabel: 'Hautgesundheit',
    clinicalResultHeader: 'KLINISCHE DIAGNOSE-ERGEBNISSE',
    barrierStrengthLabel: 'Schutzbarriere',
    hydrationLevelLabel: 'Feuchtigkeit',
    riskFactorLabel: 'Warnung',
    personalizedRoutineTitle: 'Individuelles Alps Pflegeritual',
    swissProductsCount: '5 Schweizer Meisterwerke',
    morningRoutineTitle: 'MORGEN-RITUAL (SCHUTZ & LEUCHTKRAFT)',
    eveningRoutineTitle: 'ABEND-RITUAL (REGENERATION & 72H REPARATUR)',
    doctorAdviceTitle: 'Dermatologischer Expertenrat aus Zürich',
    analyzingTitle: 'Das Zürcher Institut Analysiert Ihre Haut...',
    analyzingDesc: 'Zelluläre Modellierung der Lipidbarriere und Berechnung der idealen Schweizer Rezepturen.',
    questions: [
      {
        title: 'Wie fühlt sich Ihre Haut im Laufe des Tages an?',
        subtitle: 'Schritt 1/5 • Bestimmung des Hauttyps',
        options: [
          { label: 'Ölige Haut', desc: 'Glanz im gesamten Gesicht, vergrößerte Poren, Neigung zu Unreinheiten' },
          { label: 'Mischhaut (Ölig)', desc: 'Glänzende T-Zone (Stirn, Nase, Kinn), Wangen normal oder trocken' },
          { label: 'Trockene Haut', desc: 'Spannungsgefühl nach dem Waschen, raue Stellen bei Kälte' },
          { label: 'Mischhaut (Trocken)', desc: 'Überwiegend trocken, nur minimaler Glanz an der Nasenspitze' },
          { label: 'Sensible Haut', desc: 'Rötet sich leicht, brennt oder juckt bei Wetterumschwüngen' },
          { label: 'Ausgeglichene Normalhaut', desc: 'Feines Porenbild, gleichmäßige Hydratation, unempfindlich' },
        ],
      },
      {
        title: 'Welches Hautbedürfnis möchten Sie vorrangig behandeln?',
        subtitle: 'Schritt 2/5 • Ziel der Pflege',
        options: [
          { label: 'Pigmentflecken & Ebenmäßigkeit', desc: 'Fokus auf ebenmäßigen, strahlenden Teint ohne Flecken' },
          { label: 'Porenverfeinerung & Klärung', desc: 'Fokus auf sanfte Porenreinigung und Talgkontrolle' },
          { label: 'Tiefenfeuchtigkeit & Spannkraft', desc: 'Fokus auf Feuchtigkeitsdepots und Regeneration' },
          { label: 'Anti-Aging & Festigkeit', desc: 'Fokus auf Glättung feiner Linien und Straffung' },
          { label: 'Beruhigung & Rötungsminderung', desc: 'Fokus auf sofortige Linderung von Hautirritationen' },
        ],
      },
      {
        title: 'Wie sieht Ihr alltägliches Lebensumfeld aus?',
        subtitle: 'Schritt 3/5 • Äußere Einflussfaktoren',
        options: [
          { label: 'Klimatisierte Räume', desc: 'Tägliche Büroluft entzieht der Haut stetig Feuchtigkeit' },
          { label: 'Viel im Freien & Sonne', desc: 'Häufige UV-Strahlung und Temperaturwechsel' },
          { label: 'Kaltes, trockenes Klima', desc: 'Niedrige Luftfeuchtigkeit schwächt die Barrierefunktion' },
          { label: 'Städtische Feinstaubbelastung', desc: 'Urbane Umweltpartikel belasten die Hauterneuerung' },
        ],
      },
      {
        title: 'Aus wie vielen Schritten besteht Ihre aktuelle Routine?',
        subtitle: 'Schritt 4/5 • Gewohnheiten',
        options: [
          { label: 'Minimalistisch (1-2 Schritte)', desc: 'Nur Reinigung und eine Basiscreme' },
          { label: 'Standard (3-4 Schritte)', desc: 'Reinigung, Toner, Serum und Pflegecreme' },
          { label: 'Umfassend (5+ Schritte)', desc: 'Vollständiges Ritual mit Tuchmasken und Augenpflege' },
        ],
      },
      {
        title: 'Wie reagiert Ihre Haut auf neue Pflegeprodukte?',
        subtitle: 'Schritt 5/5 • Hauttoleranz',
        options: [
          { label: 'Sehr unempfindlich', desc: 'Reagiert selten gereizt auf neue Aktivstoffe' },
          { label: 'Gelegentlich leichtes Kribbeln', desc: 'Kurzzeitige Rötung bei hochkonzentrierten Formeln' },
          { label: 'Extrem sensibel', desc: 'Benötigt hypoallergene, reinste Schweizer Dermokosmetik' },
        ],
      },
    ],
    fallbackDiagnosis: {
      diagnosisTitle: 'Geschwächte Lipidbarriere durch Umwelt-Trockenheit',
      rootCauseAnalysis: 'Büroluft und Feinstaub führen zu transepidermalem Wasserverlust. Die Haut reagiert mit kompensatorischer Talgüberproduktion bei gleichzeitiger Dehydrierung der tieferen Schichten.',
      riskFactor: 'Verlust der Feuchtigkeitsbarriere',
      morningSteps: [
        { step: 'Schritt 1', product: 'Alps Gentle Purifying Cleanser', usage: '60 Sekunden sanft mit lauwarmem Wasser reinigen.' },
        { step: 'Schritt 2', product: 'Alps Botanical Balancing Toner', usage: '3-4 Tropfen einklopfen für pH 5.5 Balance.' },
        { step: 'Schritt 3', product: 'Alps Radiance Glow Serum', usage: '3 Tropfen sanft verteilen für antioxidativen Schutz.' },
        { step: 'Schritt 4', product: 'Alps Regenerating Face Cream', usage: 'Feuchtigkeit mit Ceramiden zuverlässig versiegeln.' },
      ],
      eveningSteps: [
        { step: 'Schritt 1', product: 'Alps Gentle Purifying Cleanser', usage: 'Feinstaub und Talg gründlich abwaschen.' },
        { step: 'Schritt 2', product: 'Alps Botanical Balancing Toner', usage: 'Zwei Schichten sanft einklopfen.' },
        { step: 'Schritt 3', product: 'Alps Radiance Glow Serum', usage: 'Nacht-Zellerneuerung aktivieren.' },
        { step: 'Schritt 4', product: 'Alps Regenerating Face Cream', usage: '24-Stunden-Regeneration mit Ceramiden 3-6-9.' },
        { step: 'Schritt 5', product: 'Alps Bio-Cellulose Hydro Mask', usage: '20 Minuten auflegen (2-3x pro Woche).' },
      ],
      expertTips: [
        'Mindestens 2 Liter Wasser täglich trinken.',
        'Zu heißes Wasser beim Waschen vermeiden.',
        'Tagsüber immer Sonnenschutz verwenden.',
      ],
    },
  },

  es: {
    modalTitle: 'Diagnóstico Facial AI • Alps Pure Essence',
    stepIndicator: (step, total) => `Pregunta ${step} de ${total}`,
    backBtn: 'Atrás',
    nextBtn: 'Siguiente',
    finishBtn: 'Ver Diagnóstico Personalizado',
    retakeBtn: 'Repetir test',
    addToCartRoutine: 'Añadir Ritual Recomendado al Carrito',
    consultDoctor: 'Atención Dermatológica 24/7',
    diagnosticResultTitle: 'Protocolo Celular Personalizado',
    diagnosticBadge: 'DIAGNÓSTICO FINALIZADO',
    skinScoreLabel: 'Puntuación Cutánea',
    clinicalResultHeader: 'RESULTADO DEL DIAGNÓSTICO CLÍNICO',
    barrierStrengthLabel: 'Barrera',
    hydrationLevelLabel: 'Hidratación',
    riskFactorLabel: 'Alerta',
    personalizedRoutineTitle: 'Prescripción Personalizada Alps',
    swissProductsCount: '5 Fórmulas Magistrales Suizas',
    morningRoutineTitle: 'RITUAL DE MAÑANA (PROTECCIÓN Y LUZ)',
    eveningRoutineTitle: 'RITUAL DE NOCHE (REGENERACIÓN 72H)',
    doctorAdviceTitle: 'Consejo Clínico de Dermatología de Zúrich',
    analyzingTitle: 'El Instituto de Zúrich está Analizando su Piel...',
    analyzingDesc: 'Simulación de la matriz lipídica y diseño del tratamiento dermocosmético celular suizo.',
    questions: [
      {
        title: '¿Cómo sientes tu piel a lo largo del día?',
        subtitle: 'Paso 1/5 • Clasificación Biológica',
        options: [
          { label: 'Piel Grasa', desc: 'Brillo en todo el rostro, poros dilatados, propensa a imperfecciones' },
          { label: 'Mixta Grasa', desc: 'Zona T brillante (frente, nariz, barbilla); mejillas normales o secas' },
          { label: 'Piel Seca', desc: 'Tirantez tras lavar, descamación o asperezas con el frío' },
          { label: 'Mixta Seca', desc: 'Predominio de sequedad, brillo leve sólo en la nariz' },
          { label: 'Piel Sensible', desc: 'Se enrojece con facilidad, pica o reacciona ante cambios de clima' },
          { label: 'Piel Normal Equilibrada', desc: 'Textura suave, poros finos, hidratación uniforme' },
        ],
      },
      {
        title: '¿Cuál es tu prioridad principal de mejora?',
        subtitle: 'Paso 2/5 • Objetivo de Tratamiento',
        options: [
          { label: 'Manchas y Tono Desigual', desc: 'Deseo luminosidad cristalina y difuminar manchas y marcas' },
          { label: 'Poros Dilatados y Grasa', desc: 'Deseo purificación profunda y regulación del sebo' },
          { label: 'Deshidratación y Tirantez', desc: 'Deseo hidratación celular profunda y elasticidad' },
          { label: 'Signos de la Edad y Líneas', desc: 'Deseo efecto tensor, firmeza y suavizar líneas' },
          { label: 'Rojeces e Irritación', desc: 'Deseo alivio inmediato y fortalecimiento de barrera' },
        ],
      },
      {
        title: '¿Cuál es tu entorno habitual diario?',
        subtitle: 'Paso 3/5 • Factores de Estrés Ambiental',
        options: [
          { label: 'Aire Acondicionado Constante', desc: 'Oficina cerrada >8 horas al día deshidrata profundamente' },
          { label: 'Exposición Solar y Aire Libre', desc: 'Contacto frecuente con radiación UV y cambios térmicos' },
          { label: 'Clima Frío y Seco', desc: 'Baja humedad debilita las ceramidas protectoras' },
          { label: 'Contaminación Urbana', desc: 'Micropartículas PM2.5 oxidan las células epidérmicas' },
        ],
      },
      {
        title: '¿Cuántos pasos tiene tu rutina actual?',
        subtitle: 'Paso 4/5 • Hábitos Cotidianos',
        options: [
          { label: 'Minimalista (1-2 pasos)', desc: 'Sólo limpiador y crema hidratante básica' },
          { label: 'Estándar (3-4 pasos)', desc: 'Limpiador, tónico, sérum y crema' },
          { label: 'Completa (5+ pasos)', desc: 'Ritual integral con mascarillas y tratamientos' },
        ],
      },
      {
        title: '¿Cómo reacciona tu piel a productos nuevos?',
        subtitle: 'Paso 5/5 • Nivel de Tolerancia',
        options: [
          { label: 'Muy Resistente', desc: 'Raras veces sufre irritación con nuevos activos' },
          { label: 'Sensibilidad Ocasional', desc: 'Ligero ardor pasajero con activos muy concentrados' },
          { label: 'Extremadamente Sensible', desc: 'Requiere dermocosmética pura hipoalergénica médica' },
        ],
      },
    ],
    fallbackDiagnosis: {
      diagnosisTitle: 'Barrera Lipídica Debilitada por Deshidratación Profunda',
      rootCauseAnalysis: 'El aire acondicionado y la polución han mermado la capa de ceramidas naturales. La piel compensa produciendo sebo en superficie mientras el interior permanece deshidratado y vulnerable.',
      riskFactor: 'Pérdida de Hidratación Esencial',
      morningSteps: [
        { step: 'Paso 1', product: 'Alps Gentle Purifying Cleanser', usage: 'Lavar con agua templada durante 60 segundos.' },
        { step: 'Paso 2', product: 'Alps Botanical Balancing Toner', usage: 'Aplicar 3-4 gotas para restaurar el pH 5.5.' },
        { step: 'Paso 3', product: 'Alps Radiance Glow Serum', usage: '3 gotas para despertar la luminosidad antioxidante.' },
        { step: 'Paso 4', product: 'Alps Regenerating Face Cream', usage: 'Sellar con ceramidas para proteger todo el día.' },
      ],
      eveningSteps: [
        { step: 'Paso 1', product: 'Alps Gentle Purifying Cleanser', usage: 'Eliminar polución y exceso de sebo acumulado.' },
        { step: 'Paso 2', product: 'Alps Botanical Balancing Toner', usage: '2 capas para una hidratación profunda.' },
        { step: 'Paso 3', product: 'Alps Radiance Glow Serum', usage: 'Estimular la regeneración nocturna de colágeno.' },
        { step: 'Paso 4', product: 'Alps Regenerating Face Cream', usage: 'Nutrición 24h con Ceramidas 3-6-9.' },
        { step: 'Paso 5', product: 'Alps Bio-Cellulose Hydro Mask', usage: 'Dejar 20 minutos (2-3 veces por semana).' },
      ],
      expertTips: [
        'Beber 2 litros de agua templada al día.',
        'Evitar el agua demasiado caliente en el rostro.',
        'Aplicar fotoprotección solar a diario.',
      ],
    },
  },

  zh: {
    modalTitle: 'AI 仿生测肤诊断 • Alps Pure Essence',
    stepIndicator: (step, total) => `第 ${step} 题 / 共 ${total} 题`,
    backBtn: '返回上一步',
    nextBtn: '下一题',
    finishBtn: '查看专属护肤处方',
    retakeBtn: '重新测肤',
    addToCartRoutine: '一键将全套定制护理加入购物车',
    consultDoctor: '24/7 瑞士专席咨询',
    diagnosticResultTitle: '个性化细胞级护肤处方',
    diagnosticBadge: '诊断报告已生成',
    skinScoreLabel: '肌肤健康评分',
    clinicalResultHeader: '苏黎世临床检测结果',
    barrierStrengthLabel: '屏障韧性',
    hydrationLevelLabel: '水润储备',
    riskFactorLabel: '风险预警',
    personalizedRoutineTitle: 'Alps 专属定制护肤流程',
    swissProductsCount: '全套 5 款瑞士极地精粹',
    morningRoutineTitle: '晨间焕活流程（日间防护与透亮）',
    eveningRoutineTitle: '夜间深修流程（72小时屏障再造）',
    doctorAdviceTitle: '瑞士苏黎世皮肤科医师建议',
    analyzingTitle: '瑞士科研中心正在解析您的肌肤切片...',
    analyzingDesc: '正在模拟细胞间脂质完整度、评估天然皮脂膜耐受性并匹配最佳植萃配方。',
    questions: [
      {
        title: '在一天日常中，您最直观的肤感体验是？',
        subtitle: '第 1/5 步 • 判定肌肤生物生理分型',
        options: [
          { label: '油性肌肤', desc: '全脸容易泛油光，T区毛孔粗大，易发粉刺闭口' },
          { label: '混油肌肤', desc: 'T区（额头、鼻翼、下巴）出油较多，两颊干燥或正常' },
          { label: '干性肌肤', desc: '洁面后紧绷干燥，秋冬换季容易起皮甚至微痒' },
          { label: '混干肌肤', desc: '大面积干燥，仅傍晚鼻翼轻微泛光' },
          { label: '敏感脆弱', desc: '换季易泛红、发烫刺痛，耐受力较低' },
          { label: '健康中性', desc: '毛孔细腻，水油平衡，无明显瑕疵困扰' },
        ],
      },
      {
        title: '现阶段您最迫切希望改善的肌肤诉求是？',
        subtitle: '第 2/5 步 • 确立核心修护靶标',
        options: [
          { label: '暗沉发黄与痘印色斑', desc: '追求通透如雪光感，淡化新生痘印与日晒暗沉' },
          { label: '毛孔粗糙与油脂分泌', desc: '深层疏通毛孔，温和调节油脂代谢' },
          { label: '干燥紧绷与屏障起皮', desc: '深层渗透补水，修护表皮角质层锁水能力' },
          { label: '松弛细纹与初老迹象', desc: '紧致提拉下颌线，充盈眼周法令纹' },
          { label: '泛红刺痛与屏障受损', desc: '快速降温退红，加固皮脂膜防御力' },
        ],
      },
      {
        title: '您日常典型的生活与工作环境是？',
        subtitle: '第 3/5 步 • 评估外界压力源',
        options: [
          { label: '长期处于空调室内', desc: '每天超8小时吹空调，加速表皮深层水分散失' },
          { label: '经常户外暴晒通勤', desc: '紫外线较强，外界温差大且伴随风尘' },
          { label: '干燥寒冷气候环境', desc: '湿度低，天然神经酰胺合成能力变弱' },
          { label: '都市微尘雾霾环境', desc: 'PM2.5粉尘附着容易诱发微炎症氧化' },
        ],
      },
      {
        title: '您目前日常的护肤步数大致是？',
        subtitle: '第 4/5 步 • 习惯适配度',
        options: [
          { label: '极简流程 (1-2 步)', desc: '仅简单洁面后涂抹单一基础保湿霜' },
          { label: '标准流程 (3-4 步)', desc: '洁面、水、精华液与面霜循序渐进' },
          { label: '进阶流程 (5 步以上)', desc: '水乳、精华、周期性敷面膜与安瓶修护' },
        ],
      },
      {
        title: '您的肌肤对新成分的耐受程度是？',
        subtitle: '第 5/5 步 • 安全考量',
        options: [
          { label: '非常耐受', desc: '使用新护肤品极少发生不适反应' },
          { label: '偶有微刺感', desc: '高浓度活性成分初期可能短时间微红' },
          { label: '高度敏感', desc: '极易过敏，必须使用医研级无酒精纯净配方' },
        ],
      },
    ],
    fallbackDiagnosis: {
      diagnosisTitle: '表皮微水脂膜受损伴随深层干燥脱水',
      rootCauseAnalysis: '空调抽湿与环境氧化导致细胞间神经酰胺层流失。皮脂腺代偿性过度分泌油脂，形成典型的“外油内干”表象，使屏障愈发脆弱敏感。',
      riskFactor: '生物水分阻隔层受损',
      morningSteps: [
        { step: '第 1 步', product: 'Alps Gentle Purifying Cleanser', usage: '以温水温和轻揉60秒净澈油脂。' },
        { step: '第 2 步', product: 'Alps Botanical Balancing Toner', usage: '轻拍3-4滴平衡水，迅速调回弱酸性 pH 5.5。' },
        { step: '第 3 步', product: 'Alps Radiance Glow Serum', usage: '点涂3滴抗氧精华，注入全天透亮生机。' },
        { step: '第 4 步', product: 'Alps Regenerating Face Cream', usage: '薄涂修护面霜，长效锁水抵御外界侵袭。' },
      ],
      eveningSteps: [
        { step: '第 1 步', product: 'Alps Gentle Purifying Cleanser', usage: '深层净澈全天PM2.5微尘与多余油脂。' },
        { step: '第 2 步', product: 'Alps Botanical Balancing Toner', usage: '连续轻拍两遍，深度浸润角质深层。' },
        { step: '第 3 步', product: 'Alps Radiance Glow Serum', usage: '夜间密集修护，促进自体胶原合成。' },
        { step: '第 4 步', product: 'Alps Regenerating Face Cream', usage: '厚涂奢润面霜，5重神经酰胺修护一整夜。' },
        { step: '第 5 步', product: 'Alps Bio-Cellulose Hydro Mask', usage: '每周敷贴2-3次，享20分钟冰川水疗密集补水。' },
      ],
      expertTips: [
        '每天保证饮用足量2升温开水，由内促进细胞水循环。',
        '切忌使用过热热水洁面，避免洗去宝贵的天然皮脂膜。',
        '日间外出请务必做好温和防晒保护。',
      ],
    },
  },
};
