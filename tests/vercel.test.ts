import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

test('Vercel handler loads with payments disabled and no Gemini credentials', async () => {
  process.env.VERCEL = '1';
  process.env.PAYMENTS_ENABLED = 'false';
  delete process.env.GEMINI_API_KEY;
  const {default: app} = await import('../api/index.ts');
  const server = app.listen(0, '127.0.0.1');
  await new Promise<void>(resolve => server.once('listening', resolve));
  try {
    const base = 'http://127.0.0.1:' + (server.address() as any).port;
    const response = await fetch(base + '/api/sepay/config');
    assert.equal(response.status, 200);
    assert.equal((await response.json()).paymentsEnabled, false);
    const missing = await fetch(base + '/api/does-not-exist');
    assert.equal(missing.status, 404);
    assert.match(missing.headers.get('content-type') || '', /application\/json/);
  } finally {server.close();}
});
test('API rewrite precedes SPA fallback on Vercel', () => {
  const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
  assert.equal(config.framework, 'vite');
  assert.equal(config.rewrites[0].source, '/api/:path*');
  assert.equal(config.rewrites[0].destination, '/api/index');
  assert.equal(config.rewrites.at(-1).destination, '/index.html');
});
