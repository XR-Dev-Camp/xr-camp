// routes.js: adapted from Courses 5.2/5.3, trimmed to just enough account
// handling for this lesson's WebSocket rooms to have someone to authenticate
// — register, log in, log out, "who am I". No recovery flow, no scenes: this
// lesson is not re-teaching accounts (Course 5.2) or a relational schema
// (Course 5.3), only reusing the session cookie they already established.

import { hashSecret, verifySecret } from './auth.js';
import { createSession, destroySession, getSession, verifyCsrfToken } from './sessions.js';
import { clearAttempts, isRateLimited, recordFailedAttempt } from './rateLimit.js';
import { findUserById, findUserByUsername, insertUser } from './db.js';
import { validateCredentials } from './validation.js';

const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60; // matches sessions.js's absolute timeout

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

export function readJsonBody(req, { maxBytes = 100_000 } = {}) {
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

function publicUser(user) {
  const { id, username, createdAt } = user;
  return { id, username, createdAt };
}

function isHttps(req) {
  return req.socket?.encrypted === true || req.headers['x-forwarded-proto'] === 'https';
}

export function setSessionCookie(res, req, sessionId) {
  const attributes = [
    `sid=${sessionId}`, 'HttpOnly', 'SameSite=Lax', 'Path=/', `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
  ];
  if (isHttps(req)) attributes.push('Secure');
  res.setHeader('Set-Cookie', attributes.join('; '));
}

function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', 'sid=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0');
}

export async function requireAuth(req) {
  const session = getSession(req.cookies?.sid);
  if (!session) return null;
  const user = findUserById(session.userId);
  if (!user) return null;
  return { session, user };
}

function requireCsrf(req, session, res) {
  if (!verifyCsrfToken(session, req.headers['x-csrf-token'])) {
    sendJson(res, 403, { error: 'Missing or invalid CSRF token.' });
    return false;
  }
  return true;
}

export async function register(req, res) {
  const body = await readBodyOr400(req, res);
  if (body === undefined) return;

  const { valid, errors, value } = validateCredentials(body);
  if (!valid) return sendJson(res, 400, { error: 'Invalid registration', details: errors });

  if (findUserByUsername(value.username)) {
    return sendJson(res, 409, { error: 'That username is already taken.' });
  }

  const user = insertUser({ username: value.username, passwordHash: await hashSecret(value.password) });
  sendJson(res, 201, { account: publicUser(user) });
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

  const user = findUserByUsername(username);
  const passwordOk = user ? await verifySecret(password, user.passwordHash) : false;

  if (!user || !passwordOk) {
    recordFailedAttempt(rateLimitKey);
    return sendJson(res, 401, { error: 'Invalid username or password.' });
  }
  clearAttempts(rateLimitKey);

  const { sessionId, csrfToken } = createSession(user.id);
  setSessionCookie(res, req, sessionId);
  sendJson(res, 200, { account: publicUser(user), csrfToken });
}

export function logout(req, res, auth) {
  if (!requireCsrf(req, auth.session, res)) return;
  destroySession(req.cookies.sid);
  clearSessionCookie(res);
  sendNoContent(res);
}

export function me(req, res, auth) {
  sendJson(res, 200, { account: publicUser(auth.user), csrfToken: auth.session.csrfToken });
}
