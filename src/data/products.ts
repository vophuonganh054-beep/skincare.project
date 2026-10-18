import { Product } from '../types';
import glowSerumImg from '../assets/images/alps_radiance_glow_serum_exclusive.jpg';
import faceCreamImg from '../assets/images/alps_cream_champagne_1789839152375.jpg';
import botanicalTonerImg from '../assets/images/alps_toner_champagne_1789839113008.jpg';
import hydroMaskImg from '../assets/images/alps_mask_champagne_1789839165550.jpg';
import cleanserImg from '../assets/images/alps_cleanser_white_official_1792002235984.jpg';

import { PRODUCT_CATALOG } from './productCatalog.ts';

const productImages: Record<string, string> = {
  'cleanser-gentle-purifying': cleanserImg,
  'toner-botanical': botanicalTonerImg,
  'serum-radiance': glowSerumImg,
  'cream-regenerating': faceCreamImg,
  'mask-hydro-lifting': hydroMaskImg,
};
export const PRODUCTS: Product[] = PRODUCT_CATALOG.map(product => ({...product, image: productImages[product.id]}));

export const CATEGORIES = [
  { id: 'all', label: 'TẤT CẢ' },
  { id: 'cleanser', label: 'SỮA RỬA MẶT' },
  { id: 'toner', label: 'NƯỚC CÂN BẰNG' },
  { id: 'serum', label: 'SERUM TÁI SINH' },
  { id: 'cream', label: 'KEM DƯỠNG' },
  { id: 'mask', label: 'MẶT NẠ' },
];

export const ROUTINE_STEPS = [
  {
    step: 1,
    title: 'Làm sạch & Thanh lọc',
    productId: 'cleanser-gentle-purifying',
    name: 'Alps Gentle Purifying Cleanser',
    product: 'Sữa Rửa Mặt Bọt Mịn Dịu Nhẹ',
    time: 'Sáng & Tối',
    desc: 'Làm sạch sâu bụi mịn PM2.5, bã nhờn dư thừa với lớp bọt micro-foam siêu mịn, giữ nguyên màng ẩm tự nhiên pH 5.5.',
    image: cleanserImg,
  },
  {
    step: 2,
    title: 'Cân bằng & Cấp ẩm',
    productId: 'toner-botanical',
    name: 'Alps Botanical Balancing Toner',
    product: 'Nước Cân Bằng Thảo Mộc',
    time: 'Sáng & Tối',
    desc: 'Phục hồi độ pH sinh học chuẩn 5.5, làm dịu da tức thì và se khít lỗ chân lông với nước khoáng sông băng Thụy Sĩ.',
    image: botanicalTonerImg,
  },
  {
    step: 3,
    title: 'Tái sinh & Dưỡng sáng',
    productId: 'serum-radiance',
    name: 'Alps Radiance Glow Serum',
    product: 'Serum Dưỡng Sáng Mờ Thâm',
    time: 'Sáng & Tối',
    desc: 'Đều màu da sau 14 ngày với chiết xuất bột ngọc trai hữu cơ, 10% Niacinamide tinh khiết và Tremella Mushroom + Hyaluronic Acid đa tầng.',
    image: glowSerumImg,
  },
  {
    step: 4,
    title: 'Khóa ẩm & Phục hồi',
    productId: 'cream-regenerating',
    name: 'Alps Regenerating Face Cream',
    product: 'Kem Dưỡng Tái Sinh 72H',
    time: 'Sáng & Tối',
    desc: 'Khóa chặt dưỡng chất với Ceramide Complex 3-6-9 sinh học và bơ hạt mỡ, bảo vệ và khóa ẩm liên tục 72 giờ.',
    image: faceCreamImg,
  },
  {
    step: 5,
    title: 'Nâng cơ chuyên sâu',
    productId: 'mask-hydro-lifting',
    name: 'Alps Hydro-Lifting Sheet Mask',
    product: 'Mặt Nạ Thạch Sinh Học',
    time: '2 - 3 lần/tuần',
    desc: 'Bổ sung dồi dào Tremella Mushroom + Hyaluronic Acid với mặt nạ thạch Premium Hydrogel, đem lại hiệu ứng căng mọng ngậm nước tức thì.',
    image: hydroMaskImg,
  },
];
