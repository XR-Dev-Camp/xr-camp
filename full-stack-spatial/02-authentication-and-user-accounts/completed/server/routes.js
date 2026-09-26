// routes.js: one function per route, the same shape Course 5.1 used. Every
// handler below only knows about requests, responses, sessions, the store,
// and validation — never about sockets or URL parsing, which server.js
// handles. Two small helpers, requireCsrf() and setSessionCookie() /
// clearSessionCookie(), are shared by several routes and defined once here.

import { randomUUID } from 'node:crypto';
import { generateRecoveryCode, hashSecret, verifySecret } from './auth.js';
import {
  createSession, destroyAllSessionsForUser, destroySession, getSession, verifyCsrfToken,
} from './sessions.js';
import { clearAttempts, isRateLimited, recordFailedAttempt } from './rateLimit.js';
import {
  DEFAULT_SETTINGS, deleteAccount, findAccountByUsername, findAccountById,
  insertAccount, loadAccounts, loadCuratorNote, saveCuratorNote, updateAccount,
} from './store.js';
import { validateCredentials, validateSettings } from './validation.js';

// Registering under one of these usernames becomes a curator instead of a
// visitor. A real project would manage roles with an admin screen and an
// audit log (Course 5.8); for this prototype, one environment variable
// (never a value a client can send) is the entire access-control decision.
const CURATOR_USERNAMES = (process.env.CURATOR_USERNAMES ?? '')
  .split(',')
  .map((name) => name.trim().toLowerCase())
  .filter(Boolean);

const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60; // matches sessions.js's absolute timeout

// --- Small shared helpers ------------------------------------------------

export function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function sendNoContent(res) {
  res.writeHead(204);
  res.end();
}

export function readJsonBody(req, { maxBytes = 1_000_000 } = {}) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > maxBytes) {
        reject(new Error('Request body too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      const text = Buffer.concat(chunks).toString('utf8') || '{}';
      try {
        resolve(JSON.parse(text));
      } catch {
        reject(new Error('Request body is not valid JSON'));
      }
    });
    req.on('error', reject);
  });
}

async function readBodyOr400(req, res) {
  try {
    return await readJsonBody(req);
  } catch (error) {
    sendJson(res, error.message.includes('too large') ? 413 : 400, { error: error.message });
    return undefined;
  }
}

// Never sends passwordHash or recoveryCodeHash to a client: they are
// secrets even though they are already hashed. A leaked hash can still be
// attacked offline (tried against a huge list of common passwords, with no
// rate limit to stop it) — see "Key code explained" in the README.
function publicAccount(account) {
  const { id, username, role, privacySharesSettings, createdAt } = account;
  return { id, username, role, privacySharesSettings, createdAt };
}

function isHttps(req) {
  return req.socket?.encrypted === true || req.headers['x-forwarded-proto'] === 'https';
}

// Sets the session cookie. HttpOnly stops any JavaScript (this page's own
// code, or an attacker's, if it ever got a script running here) from
// reading it — see the README's "Key code explained" for why that is not
// the same protection CSRF tokens give. SameSite=Lax stops the browser
// sending it along with most cross-site requests, as one layer among
// several against CSRF. Secure is only added when the request actually
// arrived over HTTPS, or through a TLS-terminating proxy that says so
// (x-forwarded-proto): a plain http://127.0.0.1 dev server cannot satisfy
// "only ever send this over HTTPS", and a browser silently drops a cookie
// marked Secure that arrived over plain HTTP. The README explains what
// changes in production, where HTTPS — and therefore Secure — is not
// optional.
function setSessionCookie(res, req, sessionId) {
  const attributes = [
    `sid=${sessionId}`, 'HttpOnly', 'SameSite=Lax', 'Path=/', `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
  ];
  if (isHttps(req)) attributes.push('Secure');
  res.setHeader('Set-Cookie', attributes.join('; '));
}

function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', 'sid=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0');
}

// Reads the "sid" cookie server.js already parsed into req.cookies, looks
// up the session, and loads the account it belongs to. Returns null if any
// step fails, so every protected route only needs one check:
// `const auth = await requireAuth(req); if (!auth) return 401...`.
export async function requireAuth(req) {
  const session = getSession(req.cookies?.sid);
  if (!session) return null;
  const account = await findAccountById(session.userId);
  if (!account) return null;
  return { session, account };
}

// The synchronizer-token pattern (OWASP's Cross-Site Request Forgery
// Prevention Cheat Sheet): the server handed this session a random token
// at login (session.csrfToken); the client must send it back, on every
// state-changing request, in a custom header a cross-site <form> submission
// cannot add on its own. A cookie alone cannot prove this: browsers attach
// cookies automatically to a forged cross-site request too, which is
// exactly the attack CSRF protection exists to stop.
function requireCsrf(req, session, res) {
  if (!verifyCsrfToken(session, req.headers['x-csrf-token'])) {
    sendJson(res, 403, { error: 'Missing or invalid CSRF token.' });
    return false;
  }
  return true;
}

// --- Registration, login, logout, recovery --------------------------------

export async function register(req, res) {
  const body = await readBodyOr400(req, res);
  if (body === undefined) return;

  const { valid, errors, value } = validateCredentials(body);
  if (!valid) return sendJson(res, 400, { error: 'Invalid registration', details: errors });

  if (await findAccountByUsername(value.username)) {
    // Confirming that a username is taken is a normal, accepted trade-off
    // for a registration form (unlike login, below, which never confirms
    // whether an account exists) — it reveals nothing about any password.
    return sendJson(res, 409, { error: 'That username is already taken.' });
  }

  const recoveryCode = generateRecoveryCode();
  const account = {
    id: randomUUID(),
    username: value.username,
    passwordHash: await hashSecret(value.password),
    recoveryCodeHash: await hashSecret(recoveryCode),
    role: CURATOR_USERNAMES.includes(value.username) ? 'curator' : 'visitor',
    privacySharesSettings: false,
    settings: structuredClone(DEFAULT_SETTINGS),
    createdAt: new Date().toISOString(),
  };
  await insertAccount(account);

  // The recovery code is returned exactly once, here, and only its hash is
  // ever stored — the same rule the password follows. Registering does not
  // sign you in: Step 8's login is a separate, deliberate step.
  sendJson(res, 201, { account: publicAccount(account), recoveryCode });
}

export async function login(req, res) {
  const body = await readBodyOr400(req, res);
  if (body === undefined) return;

  const username = typeof body.username === 'string' ? body.username.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  const rateLimitKey = `login:${username}`;

  if (isRateLimited(rateLimitKey)) {
    return sendJson(res, 429, { error: 'Too many attempts. Wait a while before trying again.' });
  }

  const account = await findAccountByUsername(username);
  const passwordOk = account ? await verifySecret(password, account.passwordHash) : false;

  // The same message, and the same status code, whether the username does
  // not exist or the password is wrong: telling them apart is exactly how
  // an attacker builds a list of valid usernames one guess at a time.
  if (!account || !passwordOk) {
    recordFailedAttempt(rateLimitKey);
    return sendJson(res, 401, { error: 'Invalid username or password.' });
  }
  clearAttempts(rateLimitKey);

  const { sessionId, csrfToken } = createSession(account.id);
  setSessionCookie(res, req, sessionId);
  sendJson(res, 200, { account: publicAccount(account), csrfToken });
}

export function logout(req, res, auth) {
  if (!requireCsrf(req, auth.session, res)) return;
  destroySession(req.cookies.sid);
  clearSessionCookie(res);
  sendNoContent(res);
}

export function me(req, res, auth) {
  sendJson(res, 200, { account: publicAccount(auth.account), csrfToken: auth.session.csrfToken });
}

// Account recovery (Step 6), for a learner who forgot their password and
// has no way to receive an email from this course (there is no mail
// server here, and adding a real one is out of scope). The one-time
// recovery code shown at registration stands in for it: whoever can prove
// they hold that code may set a new password. Losing both the password and
// the recovery code means the account cannot be recovered — a real trade-
// off this design accepts, and says so in the README.
export async function recover(req, res) {
  const body = await readBodyOr400(req, res);
  if (body === undefined) return;

  const username = typeof body.username === 'string' ? body.username.trim().toLowerCase() : '';
  const recoveryCode = typeof body.recoveryCode === 'string' ? body.recoveryCode.trim() : '';
  const { valid: passwordValid, errors: passwordErrors, value } = validateCredentials({
    username, password: body.newPassword,
  });

  const rateLimitKey = `recover:${username}`;
  if (isRateLimited(rateLimitKey)) {
    return sendJson(res, 429, { error: 'Too many attempts. Wait a while before trying again.' });
  }

  const account = await findAccountByUsername(username);
  const codeOk = account ? await verifySecret(recoveryCode, account.recoveryCodeHash) : false;

  if (!account || !codeOk || !passwordValid) {
    recordFailedAttempt(rateLimitKey);
    return sendJson(res, 400, {
      error: 'Invalid username, recovery code, or new password.',
      details: passwordValid ? undefined : passwordErrors,
    });
  }
  clearAttempts(rateLimitKey);

  const newRecoveryCode = generateRecoveryCode();
  await updateAccount(account.id, {
    passwordHash: await hashSecret(value.password),
    recoveryCodeHash: await hashSecret(newRecoveryCode),
  });
  // A password change is a credential change: every existing session for
  // this account is revoked, including one an attacker might already be
  // holding (OWASP Session Management Cheat Sheet).
  destroyAllSessionsForUser(account.id);

  sendJson(res, 200, {
    message: 'Password changed. Save your new recovery code below; it will not be shown again.',
    recoveryCode: newRecoveryCode,
  });
}

// --- Settings, owned per account -------------------------------------------

export async function getSettings(req, res, auth) {
  sendJson(res, 200, auth.account.settings);
}

export async function putSettings(req, res, auth) {
  if (!requireCsrf(req, auth.session, res)) return;

  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('application/json')) {
    return sendJson(res, 415, { error: 'Content-Type must be application/json' });
  }

  const body = await readBodyOr400(req, res);
  if (body === undefined) return;

  const { valid, errors, value } = validateSettings(body);
  if (!valid) return sendJson(res, 400, { error: 'Invalid settings', details: errors });

  // auth.account.id, never anything from the request body, decides whose
  // row is updated: the session is the only source of truth for "who is
  // asking" (Course 5.3 calls this "permissions per row").
  const updated = await updateAccount(auth.account.id, { settings: value });
  sendJson(res, 200, updated.settings);
}

export async function resetSettings(req, res, auth) {
  if (!requireCsrf(req, auth.session, res)) return;
  await updateAccount(auth.account.id, { settings: structuredClone(DEFAULT_SETTINGS) });
  sendNoContent(res);
}

// --- Roles: a curator's shared note, and a shared-data dashboard ----------

export async function getCuratorNote(req, res) {
  sendJson(res, 200, await loadCuratorNote());
}

export async function putCuratorNote(req, res, auth) {
  // Ownership (checked above, in requireAuth) answers "are you signed in?".
  // A role check answers a different question: "are you allowed to do
  // this, specifically?" — both are needed, and neither one replaces the
  // other.
  if (auth.account.role !== 'curator') {
    return sendJson(res, 403, { error: 'Only a curator can edit this note.' });
  }
  if (!requireCsrf(req, auth.session, res)) return;

  const body = await readBodyOr400(req, res);
  if (body === undefined) return;

  const text = typeof body.text === 'string' ? body.text.trim().slice(0, 500) : '';
  if (!text) return sendJson(res, 400, { error: 'text must be a non-empty string (up to 500 characters).' });

  const note = { text, updatedBy: auth.account.username, updatedAt: new Date().toISOString() };
  await saveCuratorNote(note);
  sendJson(res, 200, note);
}

// A curator-only view of every account that opted in to sharing (Step 10's
// privacy toggle). An account that never turned sharing on never appears
// here, in any form — this route filters by privacySharesSettings before
// it ever builds its response, not after.
export async function listSharedAccounts(req, res, auth) {
  if (auth.account.role !== 'curator') return sendJson(res, 403, { error: 'Curators only.' });
  const accounts = await loadAccounts();
  const shared = accounts
    .filter((account) => account.privacySharesSettings)
    .map((account) => ({ username: account.username, settings: account.settings }));
  sendJson(res, 200, shared);
}

// --- Privacy, export, and deletion ------------------------------------------

export async function updatePrivacy(req, res, auth) {
  if (!requireCsrf(req, auth.session, res)) return;

  const body = await readBodyOr400(req, res);
  if (body === undefined) return;

  if (typeof body.privacySharesSettings !== 'boolean') {
    return sendJson(res, 400, { error: 'privacySharesSettings must be true or false.' });
  }
  const updated = await updateAccount(auth.account.id, { privacySharesSettings: body.privacySharesSettings });
  sendJson(res, 200, publicAccount(updated));
}

// Data export: everything this account owns, in one JSON document a
// learner can download and keep, with no secret in it — not even a hash.
export async function exportAccount(req, res, auth) {
  sendJson(res, 200, publicAccount(auth.account) === null ? {} : {
    ...publicAccount(auth.account),
    settings: auth.account.settings,
    exportedAt: new Date().toISOString(),
  });
}

// Account deletion asks for the current password again, even though the
// session already proves who is asking: a stolen or shared session (a
// laptop left unlocked, for example) can still read this page, but should
// not be able to silently delete the real owner's account.
export async function removeAccount(req, res, auth) {
  if (!requireCsrf(req, auth.session, res)) return;

  const body = await readBodyOr400(req, res);
  if (body === undefined) return;

  const password = typeof body.password === 'string' ? body.password : '';
  if (!(await verifySecret(password, auth.account.passwordHash))) {
    return sendJson(res, 401, { error: 'Incorrect password.' });
  }

  await deleteAccount(auth.account.id);
  destroyAllSessionsForUser(auth.account.id);
  clearSessionCookie(res);
  sendNoContent(res);
}
