// server.test.js: node:test, built into Node, needs no dependency to
// install. Run it with `npm test` (or `node --test`) from this folder.
//
// DATA_FILE is set before server.js (and the store.js it imports) ever
// loads, so these tests read and write a throwaway file, never your real
// data/settings.json. listen(0) asks the operating system for any free
// port, so the tests never clash with a copy of the server you left
// running yourself.

import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const tempDir = await mkdtemp(join(tmpdir(), 'xrcamp-fss-01-'));
process.env.DATA_FILE = join(tempDir, 'settings.test.json');

const { server } = await import('./server.js');

let baseUrl;

before(async () => {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await rm(tempDir, { recursive: true, force: true });
});

test('GET /api/settings returns the defaults on a fresh install', async () => {
  const res = await fetch(`${baseUrl}/api/settings`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.deepEqual(body.visibleExhibits, ['clay-pot', 'basket-ring', 'jade-stone']);
  assert.equal(body.cameraStart, 'front');
  assert.equal(body.language, 'en');
  assert.equal(body.reducedMotion, false);
});

test('PUT /api/settings saves valid settings, and GET then returns them', async () => {
  const next = { visibleExhibits: ['jade-stone'], cameraStart: 'close', language: 'es-419', reducedMotion: true };
  const put = await fetch(`${baseUrl}/api/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(next),
  });
  assert.equal(put.status, 200);
  assert.deepEqual(await put.json(), next);

  const get = await fetch(`${baseUrl}/api/settings`);
  assert.deepEqual(await get.json(), next);
});

test('PUT /api/settings rejects an unknown exhibit id with 400 and details', async () => {
  const bad = { visibleExhibits: ['not-a-real-exhibit'], cameraStart: 'front', language: 'en', reducedMotion: false };
  const res = await fetch(`${baseUrl}/api/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bad),
  });
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.ok(Array.isArray(body.details) && body.details.length > 0);
});

test('PUT /api/settings rejects a request that is not JSON with 415', async () => {
  const res = await fetch(`${baseUrl}/api/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'text/plain' },
    body: 'cameraStart=front',
  });
  assert.equal(res.status, 415);
});

test('DELETE /api/settings resets to the defaults', async () => {
  await fetch(`${baseUrl}/api/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ visibleExhibits: ['jade-stone'], cameraStart: 'left', language: 'zh-Hans', reducedMotion: true }),
  });

  const del = await fetch(`${baseUrl}/api/settings`, { method: 'DELETE' });
  assert.equal(del.status, 204);

  const get = await fetch(`${baseUrl}/api/settings`);
  const body = await get.json();
  assert.deepEqual(body.visibleExhibits, ['clay-pot', 'basket-ring', 'jade-stone']);
  assert.equal(body.cameraStart, 'front');
});

test('an unknown API route returns a JSON 404, not a crash', async () => {
  const res = await fetch(`${baseUrl}/api/not-a-route`);
  assert.equal(res.status, 404);
  assert.equal(res.headers.get('content-type'), 'application/json; charset=utf-8');
});

test('CORS headers are present, so a page on another origin can call this API', async () => {
  const res = await fetch(`${baseUrl}/api/settings`);
  assert.ok(res.headers.get('access-control-allow-origin'));
});

test('the client page is served as a static file', async () => {
  const res = await fetch(`${baseUrl}/`);
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type'), /text\/html/);
  assert.match(await res.text(), /<html/);
});
