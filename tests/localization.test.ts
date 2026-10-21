import { TRANSLATIONS } from '../src/i18n/translations.ts';
import { CHECKOUT_I18N } from '../src/i18n/checkoutTranslations.ts';
import test from 'node:test';
import assert from 'node:assert/strict';
import { translateCopy } from '../src/i18n/siteCopy.ts';
import { PRODUCT_TRANSLATIONS } from '../src/i18n/productTranslations.ts';
import catalogue from '../src/i18n/siteCopyData.json';
import templates from '../src/i18n/siteCopyTemplates.json';

const languages = ['en', 'de', 'es', 'zh'] as const;

test('all storefront and dynamic-copy entries have four nonempty translations', () => {
  for (const [source, values] of Object.entries({...catalogue, ...templates})) {
    assert.equal(values.length, 4, source);
    values.forEach(value => assert.ok(value.trim(), source));
    const placeholders = source.match(/\{\d+\}/g)?.sort() || [];
    if (placeholders.length) values.forEach(value => assert.deepEqual(value.match(/\{\d+\}/g)?.sort(), placeholders, source));
  }
});

test('new page, account, offer and bank-payment copy responds to every supported locale', () => {
  const labels = ['Trang chủ', 'Công Dụng Vượt Trội', 'Sữa rửa mặt', 'Ưu đãi tặng kèm quà số lượng có hạn', 'ĐĂNG NHẬP VỚI GOOGLE', 'SỐ TIỀN CẦN THANH TOÁN', 'Liên Hệ & Tư Vấn Da Liễu 24/7'];
  for (const language of languages) for (const label of labels) {
    assert.notEqual(translateCopy(label, language), label, `${language}: ${label}`);
  }
  assert.equal(translateCopy('  TRANG CHỦ ', 'en'), '  Home ');
  assert.equal(translateCopy('Ưu đãi tặng kèm quà số lượng có hạn', 'vi'), 'Ưu đãi tặng kèm quà số lượng có hạn');
});

test('translated notifications preserve product names, payment references, values and coupon rules', () => {
  assert.equal(translateCopy('Đã thêm "ALPS Serum" vào giỏ hàng', 'en'), 'Added "ALPS Serum" to your cart');
  assert.equal(translateCopy('Chuyển đến thanh toán cho 3 sản phẩm từ đơn #ALPS123', 'en'), 'Checkout for 3 products from order #ALPS123');
  for (const language of languages) {
    const result = translateCopy('Hàng lẻ giảm 20% với PHUNU20 • Combo giảm 15% với ALPS2010 • Thành viên giảm 10% với ALPS2025 • Mỗi đơn dùng một mã', language);
    for (const token of ['20%', '15%', '10%', 'PHUNU20', 'ALPS2010', 'ALPS2025']) assert.ok(result.includes(token), token);
    for (const value of ['ALPS123456', '0772 770 134', '200.000₫', 'https://alps.id.vn/san-pham', 'My own message']) assert.equal(translateCopy(value, language), value);
  }
});

test('all five products include full descriptions, benefits, ingredients and usage in every locale', () => {
  const ids = ['cleanser-gentle-purifying', 'toner-botanical', 'serum-radiance', 'cream-regenerating', 'mask-hydro-lifting'];
  for (const id of ids) for (const language of ['vi', ...languages] as const) {
    const content = PRODUCT_TRANSLATIONS[id][language];
    assert.ok(content.description && content.usage && content.subtitle);
    assert.ok(content.benefits.length && content.keyIngredients.length);
  }
});


test('changing language preserves the actual support hotline and Vietnamese shipping threshold', () => {
  for (const language of ['vi', ...languages] as const) {
    assert.ok(TRANSLATIONS[language].csHotline.includes('0772 770 134'));
    assert.match(TRANSLATIONS[language].announcement, /500[.,]000₫/);
    assert.match(CHECKOUT_I18N[language].cart.freeShippingBadge, /500[.,]000₫/);
    assert.doesNotMatch(CHECKOUT_I18N[language].cart.freeShippingBadge, /\$50|50€/);
  }
});
