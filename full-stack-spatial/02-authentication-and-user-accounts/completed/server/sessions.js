// sessions.js: an in-memory session store — a Map from a session id to who
// it belongs to. Nothing here is written to disk, so restarting the server
// signs everyone out; that is a real limitation of this lesson's scope, not
// a shortcut you should copy into a multi-instance production service
// (Course 5.8 revisits it once more than one server process is involved).
//
// A session id is not a password: it is a bearer token — whoever holds it
// is treated as that account for as long as it is valid — so it needs the
// same unguessability a password hash does, from crypto.randomBytes(), not
// Math.random() or an incrementing counter.

import { randomBytes, timingSafeEqual } from 'node:crypto';

// OWASP's Session Management Cheat Sheet asks for at least 64 bits of
// entropy in a session id. 32 random bytes is 256 bits — far above that
// minimum, and cheap to generate.
const SESSION_ID_BYTES = 32;
const CSRF_TOKEN_BYTES = 32;

// Two timeouts, both enforced here, on the server — never trusting a
// client's clock or a cookie's own expiry to end a session on time (OWASP
// Session Management Cheat Sheet):
// - "idle": how long a session may sit unused before it stops working.
// - "absolute": the longest a session may live at all, even in constant
//   use, so a forgotten signed-in tab does not stay valid forever.
export const IDLE_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
export const ABSOLUTE_TIMEOUT_MS = 8 * 60 * 60 * 1000; // 8 hours

const sessions = new Map(); // sessionId -> { userId, csrfToken, createdAt, lastSeenAt }

// Creates a brand new session for an account that just proved who it is
// (Step 8's login route). A fresh, random id here — never reusing or
// upgrading an id that existed before login — is what prevents "session
// fixation": an attacker cannot hand a victim a session id in advance and
// have it become a signed-in session once the victim logs in.
export function createSession(userId) {
  const sessionId = randomBytes(SESSION_ID_BYTES).toString('hex');
  const csrfToken = randomBytes(CSRF_TOKEN_BYTES).toString('hex');
  const now = Date.now();
  sessions.set(sessionId, { userId, csrfToken, createdAt: now, lastSeenAt: now });
  return { sessionId, csrfToken };
}

// Looks up a session by id, and enforces both timeouts before returning
// it. A session that has expired either way is deleted here, on first use
// past its limit, rather than left to expire "on its own" — nothing here
// depends on a timer running in the background.
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

// Logout (Step 9): removes exactly one session. The cookie that named it is
// cleared by the caller; removing the session here is what actually makes
// that cookie's value useless even if a copy of it survives somewhere else
// (browser history, a proxy log, a shared computer).
export function destroySession(sessionId) {
  sessions.delete(sessionId);
}

// Used after a password change or an account deletion (Steps 6 and 7): a
// change to who can act as this account, or to whether the account exists
// at all, invalidates every session for it, not just the one that made the
// change — OWASP calls this "renewing" or "revoking" sessions on a
// privilege or credential change.
export function destroyAllSessionsForUser(userId) {
  for (const [id, session] of sessions) {
    if (session.userId === userId) sessions.delete(id);
  }
}

// Compares a CSRF token the client sent against the one stored with this
// session, in constant time (see auth.js's verifySecret for why `===`
// would leak information). The length check first avoids ever calling
// timingSafeEqual on two differently sized buffers, which throws.
export function verifyCsrfToken(session, tokenFromClient) {
  if (!session || typeof tokenFromClient !== 'string') return false;
  const expected = Buffer.from(session.csrfToken, 'utf8');
  const actual = Buffer.from(tokenFromClient, 'utf8');
  if (expected.length !== actual.length) return false;
  return timingSafeEqual(expected, actual);
}

// Exposed only for server.test.js, to check timeout behaviour without
// waiting 30 real minutes.
export function _sessionCount() {
  return sessions.size;
}
