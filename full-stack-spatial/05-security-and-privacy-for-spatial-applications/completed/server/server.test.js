// server.test.js: one test per vulnerability this lesson reviews. Run with
// `npm test` (or `node --test`) from this folder. In starter/, this same
// file is expected to FAIL -- that is not a bug in the test, it is the
// review sprint: your job is to make every one of these pass by fixing the
// server code the failing assertion points at. In completed/, every test
// passes.
//
// A fixed APP_SECRET is set before server.js (and therefore config.js) is
// ever imported, so this file never depends on a real .env existing on
// disk, and never needs to know the value the starter's config.js still
// hardcodes.

import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { WebSocket } from 'ws';

const tempDir = await mkdtemp(join(tmpdir(), 'xrcamp-fss-05-'));
process.env.DB_FILE = join(tempDir, 'spatial.test.sqlite');
process.env.APP_SECRET = 'a-test-only-secret-never-reused-elsewhere';

const { server } = await import('./server.js');
const { formatServerError } = await import('./routes.js');

let baseUrl;
let wsUrl;
let nextUsername = 0;

before(async () => {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
  wsUrl = `ws://127.0.0.1:${port}/ws`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await rm(tempDir, { recursive: true, force: true });
});

function freshUsername(prefix = 'learner') {
  nextUsername += 1;
  return `${prefix}-${nextUsername}`;
}

async function registerAndLogIn(username, password = 'a-very-good-password') {
  await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const res = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const setCookie = res.headers.get('set-cookie');
  const cookie = setCookie ? setCookie.split(';')[0] : null;
  const body = await res.json();
  return { cookie, account: body.account, csrfToken: body.csrfToken };
}

function connectWs(cookie, room = 'review-room') {
  return new WebSocket(`${wsUrl}?room=${room}`, { headers: { Cookie: cookie } });
}

function waitForOpen(ws) {
  return new Promise((resolve, reject) => {
    ws.once('open', resolve);
    ws.once('error', reject);
  });
}

function collectMessages(ws, count) {
  const messages = [];
  return new Promise((resolve) => {
    function onMessage(raw) {
      messages.push(JSON.parse(raw.toString()));
      if (messages.length >= count) finish();
    }
    function finish() {
      clearTimeout(timer);
      ws.off('message', onMessage);
      resolve(messages);
    }
    const timer = setTimeout(finish, 2000);
    ws.on('message', onMessage);
  });
}

// --- TODO 1: stored XSS in annotations ---------------------------------------

test('an annotation containing a script tag is stored as plain text, never markup', async () => {
  const alice = await registerAndLogIn(freshUsername('alice'));
  const sceneRes = await fetch(`${baseUrl}/api/scenes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: alice.cookie, 'X-CSRF-Token': alice.csrfToken },
    body: JSON.stringify({ name: 'A test scene', isPublic: false }),
  });
  const { scene } = await sceneRes.json();

  await fetch(`${baseUrl}/api/scenes/${scene.id}/annotations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: alice.cookie, 'X-CSRF-Token': alice.csrfToken },
    body: JSON.stringify({ text: '<script>alert(document.cookie)</script>hello' }),
  });

  const readRes = await fetch(`${baseUrl}/api/scenes/${scene.id}`, { headers: { Cookie: alice.cookie } });
  const { annotations } = await readRes.json();

  assert.ok(!annotations[0].text.includes('<'), `stored annotation text still contains markup: ${annotations[0].text}`);
  assert.equal(annotations[0].text, 'alert(document.cookie)hello');
});

// --- TODO 2: stored XSS in chat -----------------------------------------------

test('a chat message containing a script tag is relayed as plain text, never markup', { timeout: 10_000 }, async () => {
  const alice = await registerAndLogIn(freshUsername('alice'));
  const bob = await registerAndLogIn(freshUsername('bob'));
  const aliceWs = connectWs(alice.cookie);
  const bobWs = connectWs(bob.cookie);
  // try/finally: this assertion is expected to fail against the starter's
  // vulnerable code, and a WebSocket left open after a failed assertion
  // would otherwise keep node:test's process alive indefinitely.
  try {
    const bobJoined = collectMessages(bobWs, 1); // attached before 'open': see 5.4's note on this race
    await Promise.all([waitForOpen(aliceWs), waitForOpen(bobWs)]);
    await bobJoined;

    const chatPromise = collectMessages(bobWs, 1);
    aliceWs.send(JSON.stringify({ type: 'chat', text: '<img src=x onerror=alert(1)>hi there' }));
    const [chat] = await chatPromise;

    assert.ok(!chat.text.includes('<'), `relayed chat text still contains markup: ${chat.text}`);
    assert.equal(chat.text, 'hi there');
  } finally {
    aliceWs.close();
    bobWs.close();
  }
});

// --- TODO 3: missing Content Security Policy ---------------------------------

test('every response sets a Content-Security-Policy with no unsafe-inline in script-src', async () => {
  const res = await fetch(`${baseUrl}/`);
  const csp = res.headers.get('content-security-policy');
  assert.ok(csp, 'no Content-Security-Policy header was set at all');
  const scriptSrc = csp.split(';').map((d) => d.trim()).find((d) => d.startsWith('script-src'));
  assert.ok(scriptSrc, 'the policy has no script-src directive');
  assert.ok(!scriptSrc.includes('unsafe-inline'), `script-src still allows 'unsafe-inline': ${scriptSrc}`);
});

// --- TODO 4: a secret committed in code ---------------------------------------

test('the admin endpoint accepts only the secret from the environment, not a hardcoded literal', async () => {
  const withEnvSecret = await fetch(`${baseUrl}/api/admin/stats`, {
    headers: { 'X-Admin-Token': process.env.APP_SECRET },
  });
  assert.equal(withEnvSecret.status, 200, 'the token from the environment should be accepted');

  const withOldHardcodedValue = await fetch(`${baseUrl}/api/admin/stats`, {
    headers: { 'X-Admin-Token': 'not-a-real-secret-change-me' },
  });
  assert.equal(
    withOldHardcodedValue.status,
    401,
    'the previously hardcoded secret still grants access -- config.js is not reading APP_SECRET from the environment',
  );
});

// --- TODO 5: IDOR on the scene endpoint ---------------------------------------

test('a private scene cannot be read by an account that does not own it', async () => {
  const alice = await registerAndLogIn(freshUsername('alice'));
  const bob = await registerAndLogIn(freshUsername('bob'));

  const sceneRes = await fetch(`${baseUrl}/api/scenes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: alice.cookie, 'X-CSRF-Token': alice.csrfToken },
    body: JSON.stringify({ name: "Alice's private scene", isPublic: false }),
  });
  const { scene } = await sceneRes.json();

  const asOwner = await fetch(`${baseUrl}/api/scenes/${scene.id}`, { headers: { Cookie: alice.cookie } });
  assert.equal(asOwner.status, 200, 'the owner should still be able to read their own scene');

  const asStranger = await fetch(`${baseUrl}/api/scenes/${scene.id}`, { headers: { Cookie: bob.cookie } });
  assert.equal(asStranger.status, 404, 'a private scene must not be readable by an account that does not own it');
});

test('a public scene can be read by any signed-in account', async () => {
  const alice = await registerAndLogIn(freshUsername('alice'));
  const bob = await registerAndLogIn(freshUsername('bob'));

  const sceneRes = await fetch(`${baseUrl}/api/scenes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: alice.cookie, 'X-CSRF-Token': alice.csrfToken },
    body: JSON.stringify({ name: "Alice's public scene", isPublic: true }),
  });
  const { scene } = await sceneRes.json();

  const asStranger = await fetch(`${baseUrl}/api/scenes/${scene.id}`, { headers: { Cookie: bob.cookie } });
  assert.equal(asStranger.status, 200);
});

// --- TODO 6: verbose error messages -------------------------------------------

test('formatServerError never reveals the error message or stack trace', () => {
  const error = new Error('/Users/learner/xrcamp/server/db.js:123 SQLITE_ERROR: no such column: nope');
  const body = formatServerError(error);
  assert.ok(!('stack' in body), 'the response body must never include a stack trace');
  assert.notEqual(body.error, error.message, 'the response body must never repeat the raw error message');
});

// --- TODO 7: precise location stored without need -----------------------------

test('a scene location is never stored with more precision than about 11 km', async () => {
  const alice = await registerAndLogIn(freshUsername('alice'));
  const preciseLat = 51.507351; // an exact street-level coordinate
  const preciseLng = -0.127758;

  const sceneRes = await fetch(`${baseUrl}/api/scenes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: alice.cookie, 'X-CSRF-Token': alice.csrfToken },
    body: JSON.stringify({
      name: 'A located scene', isPublic: false, locationLat: preciseLat, locationLng: preciseLng,
    }),
  });
  const { scene } = await sceneRes.json();

  assert.notEqual(scene.locationLat, preciseLat, 'the exact latitude was stored unchanged');
  assert.notEqual(scene.locationLng, preciseLng, 'the exact longitude was stored unchanged');
  // Rounded to 1 decimal degree (about 11 km): never more than 0.05 away
  // from a value rounded to that grid.
  const nearestTenth = Math.round(preciseLat * 10) / 10;
  assert.ok(Math.abs(scene.locationLat - nearestTenth) < 1e-9, `latitude ${scene.locationLat} is not rounded to 0.1`);
});
