import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

test('public search files, bookings, and admin access', async () => {
  const dataDir = await mkdtemp(path.join(tmpdir(), 'care-site-test-'));
  const port = 30000 + Math.floor(Math.random() * 20000);
  const origin = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, ['server.js'], {
    cwd: process.cwd(),
    env: {
      ...process.env, PORT: String(port), NODE_ENV: 'production', DATA_DIR: dataDir,
      BUSINESS_EMAIL: '', RESEND_API_KEY: '', DATABASE_URL: '', EMAIL_SERVICE: '',
      ADMIN_USERNAME: 'test-admin', ADMIN_PASSWORD: 'test-secret-only-for-tests',
    },
    stdio: 'ignore',
  });

  try {
    let ready = false;
    for (let i = 0; i < 50; i += 1) {
      if (child.exitCode !== null) throw new Error(`Server exited with ${child.exitCode}`);
      try { const response = await fetch(origin); ready = response.ok; if (ready) break; } catch { /* waiting for server */ }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    assert.ok(ready, 'server should start');

    const robots = await fetch(`${origin}/robots.txt`);
    assert.equal(robots.status, 200);
    assert.match(await robots.text(), /Sitemap: https:\/\/www\.carerefrigeration\.com\/sitemap\.xml/);
    const sitemap = await fetch(`${origin}/sitemap.xml`);
    assert.equal(sitemap.status, 200);
    assert.match(await sitemap.text(), /ac-repair-andheri-west/);
    const acPage = await fetch(`${origin}/ac-repair-andheri-west/`);
    assert.equal(acPage.status, 200);
    assert.match(await acPage.text(), /<h1>AC Repair in Andheri West/);
    assert.equal((await fetch(`${origin}/no-such-page`)).status, 404);
    assert.match((await fetch(`${origin}/admin`)).headers.get('x-robots-tag') || '', /noindex/);

    assert.equal((await fetch(`${origin}/api/gallery/reset`, { method: 'POST' })).status, 401);
    const login = await fetch(`${origin}/api/admin/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'test-admin', password: 'test-secret-only-for-tests' }),
    });
    assert.equal(login.status, 200);
    const cookie = (login.headers.get('set-cookie') || '').split(';')[0];
    assert.ok(cookie.startsWith('care_admin='));
    const session = await fetch(`${origin}/api/admin/session`, { headers: { Cookie: cookie } });
    assert.equal((await session.json()).authenticated, true);
    const uploadForm = new FormData();
    uploadForm.set('title', 'Test repair photo');
    uploadForm.set('alt', 'Local test image');
    uploadForm.set('image', new Blob([Buffer.from('89504e470d0a1a0a', 'hex')], { type: 'image/png' }), 'test.png');
    const upload = await fetch(`${origin}/api/gallery/upload`, {
      method: 'POST', headers: { Cookie: cookie }, body: uploadForm,
    });
    assert.equal(upload.status, 200);
    const images = await (await fetch(`${origin}/api/gallery`)).json();
    assert.equal(images.images[0].title, 'Test repair photo');
    const deleted = await fetch(`${origin}/api/gallery/0`, { method: 'DELETE', headers: { Cookie: cookie } });
    assert.equal(deleted.status, 200);
    await fetch(`${origin}/api/admin/logout`, { method: 'POST', headers: { Cookie: cookie } });
    const afterLogout = await fetch(`${origin}/api/admin/session`, { headers: { Cookie: cookie } });
    assert.equal((await afterLogout.json()).authenticated, false);

    const missingContact = await fetch(`${origin}/api/booking`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test Customer', area: 'Andheri West', appliance: 'Air Conditioner Repair', issue: 'AC is not cooling' }),
    });
    assert.equal(missingContact.status, 400);
    const noDelivery = await fetch(`${origin}/api/booking`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test Customer', phone: '9876543210', area: 'Andheri West', appliance: 'Air Conditioner Repair', issue: 'AC is not cooling' }),
    });
    assert.equal(noDelivery.status, 503);
    assert.equal((await noDelivery.json()).success, undefined);
  } finally {
    child.kill();
    const root = path.resolve(tmpdir()) + path.sep;
    if (path.resolve(dataDir).startsWith(root)) await rm(dataDir, { recursive: true, force: true });
  }
});
