// server.test.js: node:test, built into Node, needs no dependency to
// install. Run it with `npm test` (or `node --test`) from this folder.
//
// fetch() (undici, built into Node) is not a browser: it does not store or
// resend cookies for you. sessionCookieFrom() and registerAndLogIn() below
// are finished helpers that read the Set-Cookie header from a login
// response and hand it back so a test can resend it as a Cookie header.
//
// TODO 21: every test below already makes its request(s); add the
// assertions (assert.equal / assert.deepEqual / assert.ok / assert.match)
// that check the response is what this lesson's README says it should be.
// Run `node --test` after each one you finish: a failing assertion tells
// you exactly what the server sent instead of what you expected, which is
// the fastest way to find a bug in TODOs 1-16.

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

// Finished: a fresh username per test, so tests never depend on each
// other's data.
function freshUsername(prefix = 'learner') {
  nextUsername += 1;
  return `${prefix}-${nextUsername}`;
}

// Finished.
function sessionCookieFrom(res) {
  const setCookie = res.headers.get('set-cookie');
  return setCookie ? setCookie.split(';')[0] : null;
}

// Finished: registers a fresh account and signs in, returning its session
// cookie, CSRF token, and public account object for a test to use.
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
  const body = await res.json();
  // Check res.status is 201, body.account.username matches, body.account.role
  // is 'visitor', body.recoveryCode is a string, and body.account has no
  // passwordHash property.
});

test('POST /api/auth/register rejects a password shorter than 10 characters', async () => {
  const res = await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: freshUsername(), password: 'short' }),
  });
  const body = await res.json();
  // Check res.status is 400, and body.details is a non-empty array.
});

test('POST /api/auth/register rejects a username that is already taken', async () => {
  const username = freshUsername();
  const attempt = () => fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'a-very-good-password' }),
  });
  const first = await attempt();
  const second = await attempt();
  // Check first.status is 201 and second.status is 409.
});

test('POST /api/auth/login sets a session cookie and a CSRF token on success', async () => {
  const { cookie, csrfToken } = await registerAndLogIn(freshUsername());
  // Check cookie starts with 'sid=', and csrfToken is a string at least 32
  // characters long.
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
  // Check setCookie matches /HttpOnly/ and /SameSite=Lax/, and does NOT
  // match /Secure/ (this test talks to the server over plain HTTP).
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
  // Check both responses have status 401, and (using assert.deepEqual on
  // their parsed JSON bodies) the exact same message.
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
  // Check the 6th response (`last`) has status 429.
});

test('GET /api/settings without a session returns 401', async () => {
  const res = await fetch(`${baseUrl}/api/settings`);
  // Check res.status is 401.
});

test('a signed-in account can read and save its own settings', async () => {
  const { cookie, csrfToken } = await registerAndLogIn(freshUsername());
  const next = { visibleExhibits: ['jade-stone'], cameraStart: 'close', language: 'es-419', reducedMotion: true };
  const put = await fetch(`${baseUrl}/api/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: cookie, 'X-CSRF-Token': csrfToken },
    body: JSON.stringify(next),
  });
  const get = await fetch(`${baseUrl}/api/settings`, { headers: { Cookie: cookie } });
  // Check put.status is 200 and its JSON body deepEquals `next`, and a
  // later GET (with the same cookie) also deepEquals `next`.
});

test('PUT /api/settings without a valid CSRF token is rejected with 403', async () => {
  const { cookie } = await registerAndLogIn(freshUsername());
  const res = await fetch(`${baseUrl}/api/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: cookie, 'X-CSRF-Token': 'not-the-real-token' },
    body: JSON.stringify({ visibleExhibits: ['jade-stone'], cameraStart: 'front', language: 'en', reducedMotion: false }),
  });
  // Check res.status is 403.
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
  // Check bobsSettings.visibleExhibits is NOT ['clay-pot'] (assert.notDeepEqual):
  // Alice's save must never reach Bob's account.
});

test('a visitor cannot edit the curator note, but a curator can', async () => {
  const visitor = await registerAndLogIn(freshUsername('visitor'));
  const curator = await registerAndLogIn('curator-jane', 'a-very-good-password');

  const asVisitor = await fetch(`${baseUrl}/api/curator/note`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: visitor.cookie, 'X-CSRF-Token': visitor.csrfToken },
    body: JSON.stringify({ text: 'Visitors should not be able to write this.' }),
  });
  const asCurator = await fetch(`${baseUrl}/api/curator/note`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: curator.cookie, 'X-CSRF-Token': curator.csrfToken },
    body: JSON.stringify({ text: 'Welcome! Look closely at the jade stone.' }),
  });
  const publicNote = await fetch(`${baseUrl}/api/curator/note`);
  const note = await publicNote.json();
  // Check asVisitor.status is 403, asCurator.status is 200, and the public
  // note's text and updatedBy match what curator-jane just saved.
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
  // Check `shared` includes an entry for sharer.account.username, and does
  // NOT include one for private_.account.username.
});

test('GET /api/account/export returns account data with no password hash', async () => {
  const { cookie } = await registerAndLogIn(freshUsername());
  const res = await fetch(`${baseUrl}/api/account/export`, { headers: { Cookie: cookie } });
  const body = await res.json();
  // Check res.status is 200, body has no passwordHash or recoveryCodeHash
  // property, and body.settings exists.
});

test('DELETE /api/account requires the correct password, then removes the account', async () => {
  const { cookie, csrfToken } = await registerAndLogIn(freshUsername());

  const wrongPassword = await fetch(`${baseUrl}/api/account`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Cookie: cookie, 'X-CSRF-Token': csrfToken },
    body: JSON.stringify({ password: 'not-the-right-one' }),
  });
  const correct = await fetch(`${baseUrl}/api/account`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Cookie: cookie, 'X-CSRF-Token': csrfToken },
    body: JSON.stringify({ password: 'a-very-good-password' }),
  });
  const afterDelete = await fetch(`${baseUrl}/api/settings`, { headers: { Cookie: cookie } });
  // Check wrongPassword.status is 401, correct.status is 204, and
  // afterDelete.status is 401 (the session no longer refers to any account).
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
  const recoverBody = await recoverRes.json();

  const staleSession = await fetch(`${baseUrl}/api/settings`, { headers: { Cookie: oldCookie } });
  const oldPasswordLogin = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'a-very-good-password' }),
  });
  const newPasswordLogin = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'a-brand-new-password' }),
  });
  // Check recoverRes.status is 200 and recoverBody.recoveryCode is a
  // different string from `recoveryCode`; staleSession.status is 401;
  // oldPasswordLogin.status is 401; newPasswordLogin.status is 200.
});

test('logout clears the session, and a later request is no longer authenticated', async () => {
  const { cookie, csrfToken } = await registerAndLogIn(freshUsername());
  const logoutRes = await fetch(`${baseUrl}/api/auth/logout`, {
    method: 'POST',
    headers: { Cookie: cookie, 'X-CSRF-Token': csrfToken },
  });
  const after_ = await fetch(`${baseUrl}/api/settings`, { headers: { Cookie: cookie } });
  // Check logoutRes.status is 204 and after_.status is 401.
});

test('the client page is served as a static file, and CORS allows the configured origin with credentials', async () => {
  const res = await fetch(`${baseUrl}/`);
  // Check res.status is 200, its content-type header matches /text\/html/,
  // and its access-control-allow-credentials header is 'true'.
});
