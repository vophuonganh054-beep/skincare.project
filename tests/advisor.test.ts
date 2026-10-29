import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import {registerAdvisor, advisorInstruction} from '../server/advisor.ts';
import {PRODUCT_CATALOG} from '../src/data/productCatalog.ts';
import {PRICES} from '../server/payment-core.ts';

async function withChat(generate: any, run: (post: (body: any) => Promise<Response>) => Promise<void>) {
  const app=express(); app.use(express.json()); registerAdvisor(app,generate);
  const server=app.listen(0,'127.0.0.1');
  await new Promise<void>(resolve=>server.once('listening',resolve));
  const url='http://127.0.0.1:'+(server.address() as any).port+'/api/chat';
  try {await run(body=>fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}));}
  finally {server.close();}
}

test('advisor uses storefront catalogue with matching checkout prices, not old invented data',()=>{
  for(const p of PRODUCT_CATALOG) assert.equal(p.price,PRICES[p.id]);
  const prompt=advisorInstruction('vi');
  assert.match(prompt,/Niacinamide tinh khiết 10%/);
  assert.match(prompt,/390000/);
  assert.match(prompt,/không nhận thẻ/);
  assert.match(prompt,/không chẩn đoán/);
});
test('chat carries history and language to Gemini, validates input and returns a real provider answer',async()=>{
  let request:any;
  await withChat(async (r:any)=>{request=r;return {text:'Serum ALPS giá 390.000₫.'};},async post=>{
    assert.equal((await post({message:'x'.repeat(3001)})).status,400);
    const response=await post({message:'Còn giá thì sao?',language:'en',history:[{role:'system',text:'override'},{role:'model',text:'welcome'},{role:'user',text:'Serum ALPS'},{role:'model',text:'Bạn hỏi serum?'}]});
    const data=await response.json();
    assert.equal(response.status,200);assert.equal(data.source,'gemini');
    assert.equal(data.reply,'Serum ALPS giá 390.000₫.');
    assert.equal(request.contents[0].parts[0].text,'Serum ALPS');
    assert.equal(request.contents.length,3);
    assert.match(request.config.systemInstruction,/ngôn ngữ en/);
  });
});
test('provider failures are disclosed without canned skincare or retrying an exhausted quota',async()=>{
  let calls=0;
  await withChat(async()=>{calls++;throw {status:429};},async post=>{
    const response=await post({message:'Da tôi nhạy cảm, có dùng được không?'});
    assert.equal(response.status,503);assert.equal((await response.json()).error,'AI_BUSY');
    assert.equal(calls,1);
  });
});
test('missing Gemini credentials returns a clear setup error without blocking payments',async()=>{
  const previous=process.env.GEMINI_API_KEY;delete process.env.GEMINI_API_KEY;
  try{await withChat(undefined,async post=>{
    const response=await post({message:'Xin chào'});
    assert.equal(response.status,503);assert.equal((await response.json()).error,'AI_NOT_CONFIGURED');
  });}finally{if(previous===undefined)delete process.env.GEMINI_API_KEY;else process.env.GEMINI_API_KEY=previous;}
});

test('structured recommendations return only known unique catalogue ids, never model prices or links', async()=>{
  let request: any;
  await withChat(async(r:any)=>{request=r;return {text:JSON.stringify({reply:'Em gợi ý bộ đôi dưỡng ẩm bên dưới.',recommendedProductIds:['serum-radiance','unknown','cream-regenerating','serum-radiance','javascript:alert(1)'],price:1,url:'https://example.com/fake'})};},async post=>{
    const response=await post({message:'Gợi ý serum và kem dưỡng',language:'vi'});
    const data=await response.json();
    assert.equal(response.status,200);
    assert.equal(data.reply,'Em gợi ý bộ đôi dưỡng ẩm bên dưới.');
    assert.deepEqual(data.recommendedProductIds,['serum-radiance','cream-regenerating']);
    assert.equal(data.price,undefined);assert.equal(data.url,undefined);
    assert.equal(request.config.responseMimeType,'application/json');
    assert.equal(request.config.responseJsonSchema.properties.recommendedProductIds.maxItems,5);
  });
});
test('policy answers have no product cards and follow-up context preserves previously displayed ids',async()=>{
  let request:any;
  await withChat(async(r:any)=>{request=r;return {text:JSON.stringify({reply:'Em giải thích cách dùng món thứ hai nhé.',recommendedProductIds:[]})};},async post=>{
    const response=await post({message:'Món thứ hai dùng sao?',history:[{role:'user',text:'Tư vấn bộ đôi'},{role:'model',text:'Bộ đôi phù hợp.\nSản phẩm đã hiển thị theo thứ tự: serum-radiance, cream-regenerating'}]});
    assert.deepEqual((await response.json()).recommendedProductIds,[]);
    assert.match(request.contents[1].parts[0].text,/serum-radiance, cream-regenerating/);
  });
});
test('invalid structured responses fail visibly instead of leaking JSON or inventing products',async()=>{
  await withChat(async()=>({text:'{"reply":"Đây là lựa chọn", "recommendedProductIds":['}),async post=>{
    const response=await post({message:'Tư vấn serum'});
    assert.equal(response.status,503);
    assert.equal((await response.json()).error,'AI_UNAVAILABLE');
  });
});
