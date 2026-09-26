// routes.js: one function per route, the same shape Course 5.1 used. Every
// handler below only knows about requests, responses, sessions, the store,
// and validation — never about sockets or URL parsing, which server.js
// handles.

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
// visitor. Finished: nothing to change here.
const CURATOR_USERNAMES = (process.env.CURATOR_USERNAMES ?? '')
  .split(',')
  .map((name) => name.trim().toLowerCase())
  .filter(Boolean);

const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60; // matches sessions.js's absolute timeout

// --- Small shared helpers (finished) ---------------------------------------

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

// Never sends passwordHash or recoveryCodeHash to a client. Finished.
function publicAccount(account) {
  const { id, username, role, privacySharesSettings, createdAt } = account;
  return { id, username, role, privacySharesSettings, createdAt };
}

function isHttps(req) {
  return req.socket?.encrypted === true || req.headers['x-forwarded-proto'] === 'https';
}

// TODO 8: finish setSessionCookie, clearSessionCookie, requireAuth, and
// requireCsrf.
//
// setSessionCookie(res, req, sessionId) should build a Set-Cookie header
// with these attributes, in order: `sid=${sessionId}`, `HttpOnly`,
// `SameSite=Lax`, `Path=/`, `Max-Age=${SESSION_MAX_AGE_SECONDS}` — then, if
// isHttps(req) is true, also append `Secure`. Join them with '; ' and call
// res.setHeader('Set-Cookie', ...). (A plain http://127.0.0.1 dev server
// cannot satisfy "only ever send this over HTTPS", so Secure is only added
// when the request actually arrived over HTTPS.)
//
// clearSessionCookie(res) should set the same cookie name with an empty
// value and Max-Age=0, so the browser deletes it immediately:
// res.setHeader('Set-Cookie', 'sid=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0').
//
// requireAuth(req) should:
//   1. Call getSession(req.cookies?.sid) (server.js will have already
//      parsed req.cookies before any route runs).
//   2. Return null if there is no valid session.
//   3. Otherwise look up findAccountById(session.userId); return null if no
//      account is found (its account may have been deleted since).
//   4. Otherwise return { session, account }.
//
// requireCsrf(req, session, res) should call verifyCsrfToken(session,
// req.headers['x-csrf-token']). If it returns false, respond
// sendJson(res, 403, { error: 'Missing or invalid CSRF token.' }) and
// return false. Otherwise return true, without sending a response — the
// caller keeps going.
function setSessionCookie(res, req, sessionId) {
  throw new Error('TODO 8: setSessionCookie is not implemented yet');
}

function clearSessionCookie(res) {
  throw new Error('TODO 8: clearSessionCookie is not implemented yet');
}

export async function requireAuth(req) {
  throw new Error('TODO 8: requireAuth is not implemented yet');
}

function requireCsrf(req, session, res) {
  throw new Error('TODO 8: requireCsrf is not implemented yet');
}

// --- Registration, login, logout, recovery --------------------------------

// TODO 9: finish register(req, res). It should:
//   1. Read the body with readBodyOr400(req, res); return if it is
//      undefined (readBodyOr400 already sent an error response).
//   2. Call validateCredentials(body). If invalid, sendJson(res, 400,
//      { error: 'Invalid registration', details: errors }).
//   3. If findAccountByUsername(value.username) already finds one,
//      sendJson(res, 409, { error: 'That username is already taken.' }).
//   4. Otherwise, build an account object: id: randomUUID(), the username,
//      passwordHash: await hashSecret(value.password), a
//      recoveryCodeHash: await hashSecret(recoveryCode) for a
//      const recoveryCode = generateRecoveryCode(), role: 'curator' if
//      CURATOR_USERNAMES.includes(value.username), else 'visitor',
//      privacySharesSettings: false, settings:
//      structuredClone(DEFAULT_SETTINGS), createdAt: new Date().toISOString().
//   5. await insertAccount(account).
//   6. sendJson(res, 201, { account: publicAccount(account), recoveryCode })
//      — the recovery code is returned exactly once, here.
export async function register(req, res) {
  throw new Error('TODO 9: register is not implemented yet');
}

// TODO 10: finish login(req, res). It should:
//   1. Read the body; return early if undefined.
//   2. Read username (trimmed, lower-cased) and password as strings (empty
//      string if either is missing or the wrong type).
//   3. Build rateLimitKey = `login:${username}`, and if isRateLimited(key)
//      is true, sendJson(res, 429, { error: 'Too many attempts. Wait a
//      while before trying again.' }).
//   4. Look up the account with findAccountByUsername(username). Whether or
//      not one was found, decide passwordOk: only check verifySecret if an
//      account exists (never call it with an undefined hash).
//   5. If there is no account, OR passwordOk is false: call
//      recordFailedAttempt(rateLimitKey), then sendJson(res, 401,
//      { error: 'Invalid username or password.' }) — the exact same
//      message and status whether the username does not exist or the
//      password is wrong. Telling those two apart is exactly how an
//      attacker builds a list of valid usernames.
//   6. Otherwise: clearAttempts(rateLimitKey), createSession(account.id),
//      setSessionCookie(res, req, sessionId), and sendJson(res, 200,
//      { account: publicAccount(account), csrfToken }).
export async function login(req, res) {
  throw new Error('TODO 10: login is not implemented yet');
}

// TODO 11: finish logout(req, res, auth) and me(req, res, auth).
//
// logout should: call requireCsrf(req, auth.session, res); return if it
// returned false. Otherwise destroySession(req.cookies.sid),
// clearSessionCookie(res), and sendNoContent(res).
//
// me should simply sendJson(res, 200, { account: publicAccount(auth.account),
// csrfToken: auth.session.csrfToken }) — a signed-in page uses this on load
// to recover its own CSRF token after a refresh.
export function logout(req, res, auth) {
  throw new Error('TODO 11: logout is not implemented yet');
}

export function me(req, res, auth) {
  throw new Error('TODO 11: me is not implemented yet');
}

// TODO 14: finish recover(req, res) — account recovery for a learner who
// forgot their password and has no email service to fall back to (there
// is none in this course). The one-time recovery code from registration
// stands in for it.
//   1. Read the body; return early if undefined.
//   2. Read username (trimmed, lower-cased) and recoveryCode (trimmed) as
//      strings.
//   3. Call validateCredentials({ username, password: body.newPassword })
//      to reuse the same length rules a new password must follow.
//   4. rateLimitKey = `recover:${username}`; if isRateLimited(rateLimitKey),
//      sendJson(res, 429, { error: 'Too many attempts. Wait a while before
//      trying again.' }).
//   5. Look up the account; if found, check
//      await verifySecret(recoveryCode, account.recoveryCodeHash).
//   6. If there is no account, OR the code does not match, OR the new
//      password failed validation: recordFailedAttempt(rateLimitKey), then
//      sendJson(res, 400, { error: 'Invalid username, recovery code, or new
//      password.', details: (the validateCredentials errors, if that was
//      the failure) }).
//   7. Otherwise: clearAttempts(rateLimitKey); generate
//      const newRecoveryCode = generateRecoveryCode(); await
//      updateAccount(account.id, { passwordHash: await
//      hashSecret(value.password), recoveryCodeHash: await
//      hashSecret(newRecoveryCode) }); then
//      destroyAllSessionsForUser(account.id) — a password change revokes
//      every existing session, including one an attacker might be holding.
//   8. sendJson(res, 200, { message: 'Password changed. Save your new
//      recovery code below; it will not be shown again.', recoveryCode:
//      newRecoveryCode }).
export async function recover(req, res) {
  throw new Error('TODO 14: recover is not implemented yet');
}

// --- Settings, owned per account -------------------------------------------

// TODO 12: finish getSettings, putSettings, and resetSettings.
//
// getSettings(req, res, auth) should sendJson(res, 200, auth.account.settings).
//
// putSettings(req, res, auth) should:
//   1. requireCsrf(req, auth.session, res); return if false.
//   2. Check req.headers['content-type'] includes 'application/json'; if
//      not, sendJson(res, 415, { error: 'Content-Type must be
//      application/json' }).
//   3. Read the body with readBodyOr400; return early if undefined.
//   4. validateSettings(body); if invalid, sendJson(res, 400, { error:
//      'Invalid settings', details: errors }).
//   5. Otherwise, await updateAccount(auth.account.id, { settings: value })
//      — auth.account.id, never anything from the request body, decides
//      whose row is updated — then sendJson(res, 200, updated.settings).
//
// resetSettings(req, res, auth) should: requireCsrf; return if false.
// Otherwise await updateAccount(auth.account.id, { settings:
// structuredClone(DEFAULT_SETTINGS) }), then sendNoContent(res).
export async function getSettings(req, res, auth) {
  throw new Error('TODO 12: getSettings is not implemented yet');
}

export async function putSettings(req, res, auth) {
  throw new Error('TODO 12: putSettings is not implemented yet');
}

export async function resetSettings(req, res, auth) {
  throw new Error('TODO 12: resetSettings is not implemented yet');
}

// --- Roles: a curator's shared note, and a shared-data dashboard ----------

// TODO 13: finish getCuratorNote, putCuratorNote, and listSharedAccounts.
//
// getCuratorNote(req, res) should sendJson(res, 200, await loadCuratorNote()).
// It needs no auth: the note is public.
//
// putCuratorNote(req, res, auth) should:
//   1. If auth.account.role !== 'curator', sendJson(res, 403, { error:
//      'Only a curator can edit this note.' }) — a role check answers a
//      different question than requireAuth's "are you signed in?": "are
//      you allowed to do this, specifically?".
//   2. requireCsrf; return if false.
//   3. Read the body; return early if undefined.
//   4. Read text = a trimmed string, sliced to 500 characters (or '' if
//      body.text is not a string). If it is empty, sendJson(res, 400,
//      { error: 'text must be a non-empty string (up to 500 characters).' }).
//   5. Otherwise build note = { text, updatedBy: auth.account.username,
//      updatedAt: new Date().toISOString() }, await saveCuratorNote(note),
//      sendJson(res, 200, note).
//
// listSharedAccounts(req, res, auth) should:
//   1. Role-check the same way as putCuratorNote (403 if not curator).
//   2. Load every account with loadAccounts(), filter to only
//      account.privacySharesSettings === true, map each to
//      { username, settings } (never send a passwordHash), and
//      sendJson(res, 200, that array).
export async function getCuratorNote(req, res) {
  throw new Error('TODO 13: getCuratorNote is not implemented yet');
}

export async function putCuratorNote(req, res, auth) {
  throw new Error('TODO 13: putCuratorNote is not implemented yet');
}

export async function listSharedAccounts(req, res, auth) {
  throw new Error('TODO 13: listSharedAccounts is not implemented yet');
}

// --- Privacy, export, and deletion ------------------------------------------

// TODO 15: finish updatePrivacy, exportAccount, and removeAccount.
//
// updatePrivacy(req, res, auth) should: requireCsrf; return if false. Read
// the body; return early if undefined. If typeof
// body.privacySharesSettings !== 'boolean', sendJson(res, 400, { error:
// 'privacySharesSettings must be true or false.' }). Otherwise await
// updateAccount(auth.account.id, { privacySharesSettings:
// body.privacySharesSettings }), then sendJson(res, 200,
// publicAccount(updated)).
//
// exportAccount(req, res, auth) should sendJson(res, 200, {
// ...publicAccount(auth.account), settings: auth.account.settings,
// exportedAt: new Date().toISOString() }) — everything this account owns,
// with no secret in it, not even a hash.
//
// removeAccount(req, res, auth) should:
//   1. requireCsrf; return if false.
//   2. Read the body; return early if undefined.
//   3. Read password as a string (or '' if missing). Check it against
//      auth.account.passwordHash with verifySecret — re-checking the
//      password even though the session already proves who is asking
//      protects against a stolen or shared session silently deleting the
//      real owner's account. If it does not match, sendJson(res, 401,
//      { error: 'Incorrect password.' }).
//   4. Otherwise: await deleteAccount(auth.account.id),
//      destroyAllSessionsForUser(auth.account.id), clearSessionCookie(res),
//      sendNoContent(res).
export async function updatePrivacy(req, res, auth) {
  throw new Error('TODO 15: updatePrivacy is not implemented yet');
}

export async function exportAccount(req, res, auth) {
  throw new Error('TODO 15: exportAccount is not implemented yet');
}

export async function removeAccount(req, res, auth) {
  throw new Error('TODO 15: removeAccount is not implemented yet');
}
