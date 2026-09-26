// sessions.js: carried over unchanged from Courses 5.2 and 5.3. A session is
// a short-lived, in-memory fact ("this bearer token is currently signed in
// as this account"). This lesson gives it a second job beyond the HTTP
// routes it already covered: authenticating the WebSocket upgrade itself
// (see wsAuth.js) — the same session cookie a browser already sends with
// every same-origin request, HTTP or WebSocket, is looked up here exactly
// once, before the connection is allowed to open at all.
//
// A session id is not a password: it is a bearer token — whoever holds it
// is treated as that account for as long as it is valid — so it needs the
// same unguessability a password hash does, from crypto.randomBytes(), not
// Math.random() or an incrementing counter.

import { randomBytes, timingSafeEqual } from 'node:crypto';

const SESSION_ID_BYTES = 32;
const CSRF_TOKEN_BYTES = 32;

export const IDLE_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
export const ABSOLUTE_TIMEOUT_MS = 8 * 60 * 60 * 1000; // 8 hours

const sessions = new Map(); // sessionId -> { userId, csrfToken, createdAt, lastSeenAt }

export function createSession(userId) {
  const sessionId = randomBytes(SESSION_ID_BYTES).toString('hex');
  const csrfToken = randomBytes(CSRF_TOKEN_BYTES).toString('hex');
  const now = Date.now();
  sessions.set(sessionId, { userId, csrfToken, createdAt: now, lastSeenAt: now });
  return { sessionId, csrfToken };
}

export function getSession(sessionId) {
  if (!sessionId) return null;
  const session = sessions.get(sessionId);
  if (!session) return null;

  const now = Date.now();
  if (now - session.createdAt > ABSOLUTE_TIMEOUT_MS || now - session.lastSeenAt > IDLE_TIMEOUT_MS) {
    sessions.delete(sessionId);
    return null;
  }
  session.lastSeenAt = now;
  return session;
}

export function destroySession(sessionId) {
  sessions.delete(sessionId);
}

export function destroyAllSessionsForUser(userId) {
  for (const [id, session] of sessions) {
    if (session.userId === userId) sessions.delete(id);
  }
}

export function verifyCsrfToken(session, tokenFromClient) {
  if (!session || typeof tokenFromClient !== 'string') return false;
  const expected = Buffer.from(session.csrfToken, 'utf8');
  const actual = Buffer.from(tokenFromClient, 'utf8');
  if (expected.length !== actual.length) return false;
  return timingSafeEqual(expected, actual);
}

// Exposed only for server.test.js.
export function _sessionCount() {
  return sessions.size;
}
