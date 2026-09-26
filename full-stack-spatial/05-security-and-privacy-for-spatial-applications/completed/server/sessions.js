// sessions.js: carried over unchanged from Courses 5.2-5.4. A session is a
// short-lived, in-memory fact ("this bearer token is currently signed in as
// this account"). A session id is not a password: it is a bearer token, so
// it needs crypto.randomBytes()'s unguessability, not Math.random() or an
// incrementing counter.
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
  sessions.set(sessionId, {
    userId, csrfToken, createdAt: now, lastSeenAt: now,
  });
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
