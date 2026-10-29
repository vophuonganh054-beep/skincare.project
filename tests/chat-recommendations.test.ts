import test from 'node:test';
import assert from 'node:assert/strict';
import {parseAdvisorResponse} from '../server/advisor.ts';
import {CHAT_PRODUCT_IDS,sanitizeRecommendationIds} from '../src/data/chatRecommendations.ts';

test('recommendations are limited to five unique products or combos in their recommended order',()=>{
  assert.deepEqual(sanitizeRecommendationIds(['unknown',...CHAT_PRODUCT_IDS,...CHAT_PRODUCT_IDS]),CHAT_PRODUCT_IDS.slice(0,5));
  assert.deepEqual(sanitizeRecommendationIds('serum-radiance'),[]);
  assert.deepEqual(sanitizeRecommendationIds([null,{},12,'__proto__','https://example.com']),[]);
  assert.deepEqual(sanitizeRecommendationIds(['combo-toan-dien','serum-radiance']),['combo-toan-dien','serum-radiance']);
});
test('plain legacy answers and fenced JSON are readable; broken or empty structured answers are rejected',()=>{
  assert.deepEqual(parseAdvisorResponse('Chào bạn!'),{reply:'Chào bạn!',recommendedProductIds:[]});
  assert.deepEqual(parseAdvisorResponse('```json\n{"reply":"Serum bên dưới nhé.","recommendedProductIds":["serum-radiance"]}\n```'),{reply:'Serum bên dưới nhé.',recommendedProductIds:['serum-radiance']});
  for(const text of ['{"reply":""}','{"reply":12}','null','[]','{"reply":','```json\n{bad}\n```'])assert.throws(()=>parseAdvisorResponse(text));
});
