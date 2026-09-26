// server.test.js: node:test, built into Node, needs no dependency to
// install. Run it with `npm test` (or `node --test`) from this folder.
//
// fetch() (undici, built into Node) is not a browser: it does not store or
// resend cookies for you. Every test that needs to stay "logged in" reads
// the Set-Cookie header from the login response itself and sends it back
// as a Cookie header on later requests — sessionCookieFrom() below does
// that once, so every test can reuse it.

import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const tempDir = await mkdtemp(join(tmpdir(), 'xrcamp-fss-02-'));
process.env.ACCOUNTS_FILE = join(tempDir, 'accounts.test.json');
process.env.CURATOR_NOTE_FILE = join(tempDir, 'curator-note.test.json');
process.env.CURATOR_USERNAMES = 'curator-jane';

const { server } = await import('./server.js');

let baseUrl;
let nextUsername = 0;

before(async () => {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await rm(tempDir, { recursive: true, force: true });
});

// A fresh username per test, so tests never depend on each other's data
// or trip over "username already taken".
function freshUsername(prefix = 'learner') {
  nextUsername += 1;
  return `${prefix}-${nextUsername}`;
}

function sessionCookieFrom(res) {
  const setCookie = res.headers.get('set-cookie');
  return setCookie ? setCookie.split(';')[0] : null;
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
  const cookie = sessionCookieFrom(res);
  const body = await res.json();
  return { cookie, csrfToken: body.csrfToken, account: body.account };
}

test('POST /api/auth/register creates an account and returns a one-time recovery code', async () => {
  const username = freshUsername();
  const res = await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'a-very-good-password' }),
  });
  assert.equal(res.status, 201);
  const body = await res.json();
  assert.equal(body.account.username, username);
  assert.equal(body.account.role, 'visitor');
  assert.equal(typeof body.recoveryCode, 'string');
  assert.equal(body.account.passwordHash, undefined);
});

test('POST /api/auth/register rejects a password shorter than 10 characters', async () => {
  const res = await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: freshUsername(), password: 'short' }),
  });
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.ok(Array.isArray(body.details) && body.details.length > 0);
});

test('POST /api/auth/register rejects a username that is already taken', async () => {
  const username = freshUsername();
  const attempt = () => fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'a-very-good-password' }),
  });
  assert.equal((await attempt()).status, 201);
  assert.equal((await attempt()).status, 409);
});

test('POST /api/auth/login sets a session cookie and a CSRF token on success', async () => {
  const username = freshUsername();
  const { cookie, csrfToken } = await registerAndLogIn(username);
  assert.ok(cookie && cookie.startsWith('sid='));
  assert.equal(typeof csrfToken, 'string');
  assert.ok(csrfToken.length >= 32);
});

test('the session cookie is HttpOnly and SameSite=Lax, and Secure is absent over plain HTTP', async () => {
  const username = freshUsername();
  await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'a-very-good-password' }),
  });
  const res = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'a-very-good-password' }),
  });
  const setCookie = res.headers.get('set-cookie');
  assert.match(setCookie, /HttpOnly/);
  assert.match(setCookie, /SameSite=Lax/);
  // This test talks to the server over plain http://127.0.0.1, so Secure
  // must not be set — a browser would otherwise discard the cookie outright.
  assert.doesNotMatch(setCookie, /Secure/);
});

test('a wrong password and an unknown username get the exact same status and message', async () => {
  const username = freshUsername();
  await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'a-very-good-password' }),
  });

  const wrongPassword = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'totally-the-wrong-one' }),
  });
  const noSuchUser = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'no-such-learner-at-all', password: 'totally-the-wrong-one' }),
  });

  assert.equal(wrongPassword.status, 401);
  assert.equal(noSuchUser.status, 401);
  assert.deepEqual(await wrongPassword.json(), await noSuchUser.json());
});

test('five failed logins for the same username are rate-limited with 429', async () => {
  const username = freshUsername();
  await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'a-very-good-password' }),
  });

  let last;
  for (let i = 0; i < 6; i += 1) {
    last = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password: 'wrong-every-time' }),
    });
  }
  assert.equal(last.status, 429);
});

test('GET /api/settings without a session returns 401', async () => {
  const res = await fetch(`${baseUrl}/api/settings`);
  assert.equal(res.status, 401);
});

test('a signed-in account can read and save its own settings', async () => {
  const username = freshUsername();
  const { cookie, csrfToken } = await registerAndLogIn(username);

  const next = { visibleExhibits: ['jade-stone'], cameraStart: 'close', language: 'es-419', reducedMotion: true };
  const put = await fetch(`${baseUrl}/api/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: cookie, 'X-CSRF-Token': csrfToken },
    body: JSON.stringify(next),
  });
  assert.equal(put.status, 200);
  assert.deepEqual(await put.json(), next);

  const get = await fetch(`${baseUrl}/api/settings`, { headers: { Cookie: cookie } });
  assert.deepEqual(await get.json(), next);
});

test('PUT /api/settings without a valid CSRF token is rejected with 403', async () => {
  const username = freshUsername();
  const { cookie } = await registerAndLogIn(username);

  const res = await fetch(`${baseUrl}/api/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: cookie, 'X-CSRF-Token': 'not-the-real-token' },
    body: JSON.stringify({ visibleExhibits: ['jade-stone'], cameraStart: 'front', language: 'en', reducedMotion: false }),
  });
  assert.equal(res.status, 403);
});

test('one account can never read or change another account\'s settings', async () => {
  const alice = await registerAndLogIn(freshUsername('alice'));
  const bob = await registerAndLogIn(freshUsername('bob'));

  await fetch(`${baseUrl}/api/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: alice.cookie, 'X-CSRF-Token': alice.csrfToken },
    body: JSON.stringify({ visibleExhibits: ['clay-pot'], cameraStart: 'left', language: 'en', reducedMotion: false }),
  });

  const bobsView = await fetch(`${baseUrl}/api/settings`, { headers: { Cookie: bob.cookie } });
  const bobsSettings = await bobsView.json();
  assert.notDeepEqual(bobsSettings.visibleExhibits, ['clay-pot']);
});

test('a visitor cannot edit the curator note, but a curator can', async () => {
  const visitor = await registerAndLogIn(freshUsername('visitor'));
  const curator = await registerAndLogIn('curator-jane', 'a-very-good-password');

  const asVisitor = await fetch(`${baseUrl}/api/curator/note`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: visitor.cookie, 'X-CSRF-Token': visitor.csrfToken },
    body: JSON.stringify({ text: 'Visitors should not be able to write this.' }),
  });
  assert.equal(asVisitor.status, 403);

  const asCurator = await fetch(`${baseUrl}/api/curator/note`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: curator.cookie, 'X-CSRF-Token': curator.csrfToken },
    body: JSON.stringify({ text: 'Welcome! Look closely at the jade stone.' }),
  });
  assert.equal(asCurator.status, 200);

  const publicNote = await fetch(`${baseUrl}/api/curator/note`);
  const note = await publicNote.json();
  assert.equal(note.text, 'Welcome! Look closely at the jade stone.');
  assert.equal(note.updatedBy, 'curator-jane');
});

test('only accounts that opted in appear in the curator\'s shared-settings list', async () => {
  const sharer = await registerAndLogIn(freshUsername('sharer'));
  const private_ = await registerAndLogIn(freshUsername('private'));
  const curator = await registerAndLogIn('curator-jane', 'a-very-good-password');

  await fetch(`${baseUrl}/api/account/privacy`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: sharer.cookie, 'X-CSRF-Token': sharer.csrfToken },
    body: JSON.stringify({ privacySharesSettings: true }),
  });

  const list = await fetch(`${baseUrl}/api/curator/accounts`, { headers: { Cookie: curator.cookie } });
  const shared = await list.json();
  assert.ok(shared.some((entry) => entry.username === sharer.account.username));
  assert.ok(!shared.some((entry) => entry.username === private_.account.username));
});

test('GET /api/account/export returns account data with no password hash', async () => {
  const { cookie } = await registerAndLogIn(freshUsername());
  const res = await fetch(`${baseUrl}/api/account/export`, { headers: { Cookie: cookie } });
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.passwordHash, undefined);
  assert.equal(body.recoveryCodeHash, undefined);
  assert.ok(body.settings);
});

test('DELETE /api/account requires the correct password, then removes the account', async () => {
  const username = freshUsername();
  const { cookie, csrfToken } = await registerAndLogIn(username);

  const wrongPassword = await fetch(`${baseUrl}/api/account`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Cookie: cookie, 'X-CSRF-Token': csrfToken },
    body: JSON.stringify({ password: 'not-the-right-one' }),
  });
  assert.equal(wrongPassword.status, 401);

  const correct = await fetch(`${baseUrl}/api/account`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Cookie: cookie, 'X-CSRF-Token': csrfToken },
    body: JSON.stringify({ password: 'a-very-good-password' }),
  });
  assert.equal(correct.status, 204);

  const afterDelete = await fetch(`${baseUrl}/api/settings`, { headers: { Cookie: cookie } });
  assert.equal(afterDelete.status, 401);
});

test('account recovery replaces the password and revokes existing sessions', async () => {
  const username = freshUsername();
  const registerRes = await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'a-very-good-password' }),
  });
  const { recoveryCode } = await registerRes.json();

  const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'a-very-good-password' }),
  });
  const oldCookie = sessionCookieFrom(loginRes);

  const recoverRes = await fetch(`${baseUrl}/api/auth/recover`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, recoveryCode, newPassword: 'a-brand-new-password' }),
  });
  assert.equal(recoverRes.status, 200);
  const recoverBody = await recoverRes.json();
  assert.equal(typeof recoverBody.recoveryCode, 'string');
  assert.notEqual(recoverBody.recoveryCode, recoveryCode);

  // The session from before the password change no longer works.
  const staleSession = await fetch(`${baseUrl}/api/settings`, { headers: { Cookie: oldCookie } });
  assert.equal(staleSession.status, 401);

  // The old password no longer works; the new one does.
  const oldPasswordLogin = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'a-very-good-password' }),
  });
  assert.equal(oldPasswordLogin.status, 401);

  const newPasswordLogin = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'a-brand-new-password' }),
  });
  assert.equal(newPasswordLogin.status, 200);
});

test('logout clears the session, and a later request is no longer authenticated', async () => {
  const { cookie, csrfToken } = await registerAndLogIn(freshUsername());
  const logoutRes = await fetch(`${baseUrl}/api/auth/logout`, {
    method: 'POST',
    headers: { Cookie: cookie, 'X-CSRF-Token': csrfToken },
  });
  assert.equal(logoutRes.status, 204);

  const after_ = await fetch(`${baseUrl}/api/settings`, { headers: { Cookie: cookie } });
  assert.equal(after_.status, 401);
});

test('the client page is served as a static file, and CORS allows the configured origin with credentials', async () => {
  const res = await fetch(`${baseUrl}/`);
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type'), /text\/html/);
  assert.equal(res.headers.get('access-control-allow-credentials'), 'true');
});
