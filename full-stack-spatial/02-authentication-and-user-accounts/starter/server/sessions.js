// sessions.js: an in-memory session store — a Map from a session id to who
// it belongs to. Nothing here is written to disk, so restarting the server
// signs everyone out; that is a real limitation of this lesson's scope
// (Course 5.8 revisits it once more than one server process is involved).
//
// A session id is not a password: it is a bearer token — whoever holds it
// is treated as that account for as long as it is valid — so it needs the
// same unguessability a password hash does, from crypto.randomBytes(), not
// Math.random() or an incrementing counter.

import { randomBytes, timingSafeEqual } from 'node:crypto';

// OWASP's Session Management Cheat Sheet asks for at least 64 bits of
// entropy in a session id. Finished: nothing to change here.
const SESSION_ID_BYTES = 32; // 256 bits
const CSRF_TOKEN_BYTES = 32;

// Two timeouts, enforced on the server — never trusting a client's clock or
// a cookie's own expiry to end a session on time (OWASP Session Management
// Cheat Sheet). Finished: nothing to change here.
export const IDLE_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
export const ABSOLUTE_TIMEOUT_MS = 8 * 60 * 60 * 1000; // 8 hours

const sessions = new Map(); // sessionId -> { userId, csrfToken, createdAt, lastSeenAt }

// TODO 4: finish createSession(userId) and getSession(sessionId).
//
// createSession(userId) should:
//   1. Generate sessionId = randomBytes(SESSION_ID_BYTES).toString('hex')
//      and csrfToken = randomBytes(CSRF_TOKEN_BYTES).toString('hex'). A
//      fresh, random id here — never reusing or upgrading an id that
//      existed before login — is what prevents "session fixation": an
//      attacker cannot hand a victim a session id in advance and have it
//      become a signed-in session once the victim logs in.
//   2. Store { userId, csrfToken, createdAt: Date.now(), lastSeenAt:
//      Date.now() } in the `sessions` Map, keyed by sessionId.
//   3. Return { sessionId, csrfToken }.
//
// getSession(sessionId) should:
//   1. Return null if sessionId is falsy, or if it is not in `sessions`.
//   2. Otherwise, check both timeouts against Date.now(): if the session is
//      older than ABSOLUTE_TIMEOUT_MS, or has been idle longer than
//      IDLE_TIMEOUT_MS, delete it from the Map and return null.
//   3. Otherwise, update its lastSeenAt to Date.now() (a valid request
//      extends the idle timer — the "sliding window" OWASP describes) and
//      return the session object.
export function createSession(userId) {
  throw new Error('TODO 4: createSession is not implemented yet');
}

export function getSession(sessionId) {
  throw new Error('TODO 4: getSession is not implemented yet');
}

// Logout: removes exactly one session. Finished.
export function destroySession(sessionId) {
  sessions.delete(sessionId);
}

// Used after a password change or an account deletion: a change to who can
// act as this account invalidates every session for it, not just the one
// that made the change. Finished.
export function destroyAllSessionsForUser(userId) {
  for (const [id, session] of sessions) {
    if (session.userId === userId) sessions.delete(id);
  }
}

// TODO 5: finish verifyCsrfToken(session, tokenFromClient). It should:
//   1. Return false if `session` is missing, or `tokenFromClient` is not a
//      string.
//   2. Build two Buffers: Buffer.from(session.csrfToken, 'utf8') and
//      Buffer.from(tokenFromClient, 'utf8').
//   3. Return false immediately if their lengths differ (timingSafeEqual
//      throws on mismatched lengths, so this check must come first).
//   4. Otherwise, return crypto.timingSafeEqual(expected, actual) — never
//      `===`, for the same timing-side-channel reason auth.js's
//      verifySecret avoids it.
export function verifyCsrfToken(session, tokenFromClient) {
  throw new Error('TODO 5: verifyCsrfToken is not implemented yet');
}
