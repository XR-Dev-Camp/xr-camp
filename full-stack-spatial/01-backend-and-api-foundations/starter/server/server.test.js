// server.test.js: node:test, built into Node, needs no dependency to
// install. Run it with `npm test` (or `node --test`) from this folder.
//
// DATA_FILE is set before server.js (and the store.js it imports) ever
// loads, so these tests read and write a throwaway file, never your real
// data/settings.json. listen(0) asks the operating system for any free
// port, so the tests never clash with a copy of the server you left
// running yourself. This setup is finished; TODO 13 is below.

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

// TODO 13: write the assertions for each test below (the request is
// already made for you; add at least one assert.equal or assert.deepEqual
// per test, using the `res` you get back). Run `node --test` after each
// one: a failing assertion tells you exactly what the server sent instead
// of what you expected, which is the fastest way to find a bug in your own
// TODOs 1-9.

test('GET /api/settings returns the defaults on a fresh install', async () => {
  const res = await fetch(`${baseUrl}/api/settings`);
  const body = await res.json();
  // Check res.status is 200, and body.visibleExhibits is
  // ['clay-pot', 'basket-ring', 'jade-stone'].
});

test('PUT /api/settings saves valid settings, and GET then returns them', async () => {
  const next = { visibleExhibits: ['jade-stone'], cameraStart: 'close', language: 'es-419', reducedMotion: true };
  const put = await fetch(`${baseUrl}/api/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(next),
  });
  // Check put.status is 200, and that a later GET /api/settings returns
  // the same object as `next` (assert.deepEqual).
});

test('PUT /api/settings rejects an unknown exhibit id with 400 and details', async () => {
  const bad = { visibleExhibits: ['not-a-real-exhibit'], cameraStart: 'front', language: 'en', reducedMotion: false };
  const res = await fetch(`${baseUrl}/api/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bad),
  });
  // Check res.status is 400, and the response body's `details` array is
  // not empty.
});

test('PUT /api/settings rejects a request that is not JSON with 415', async () => {
  const res = await fetch(`${baseUrl}/api/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'text/plain' },
    body: 'cameraStart=front',
  });
  // Check res.status is 415.
});

test('DELETE /api/settings resets to the defaults', async () => {
  await fetch(`${baseUrl}/api/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ visibleExhibits: ['jade-stone'], cameraStart: 'left', language: 'zh-Hans', reducedMotion: true }),
  });
  const del = await fetch(`${baseUrl}/api/settings`, { method: 'DELETE' });
  // Check del.status is 204, and that a later GET /api/settings shows
  // visibleExhibits back to all three defaults.
});

test('an unknown API route returns a JSON 404, not a crash', async () => {
  const res = await fetch(`${baseUrl}/api/not-a-route`);
  // Check res.status is 404.
});
