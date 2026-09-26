// rateLimit.js: carried over unchanged from Course 5.2.
// a simple in-memory failed-attempt counter, used by login
// (Step 8) and account recovery (Step 6) to slow down guessing. It is keyed
// by a string the caller chooses (routes.js uses "login:<username>" and
// "recover:<username>") rather than by IP address alone: a shared office or
// campus network can put many honest learners behind one IP, and a
// determined attacker can rotate IPs freely, so the username is the more
// meaningful thing to protect here for a learning prototype.
//
// This is a real, working limit, and also a real, documented limitation:
// it lives in one process's memory, so restarting the server clears it,
// and it does nothing to stop an attacker who tries many different
// usernames instead of many passwords for one username. A production
// service combines this with per-IP limits, and often a CAPTCHA, and
// stores the counters somewhere shared across every server process
// (Course 5.8). It also means anyone who knows a username can lock its
// owner out for the window below, simply by failing its password
// on purpose — a trade-off worth knowing about, not hiding.

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

const attempts = new Map(); // key -> { count, firstAttemptAt }

export function isRateLimited(key) {
  const entry = attempts.get(key);
  if (!entry) return false;
  if (Date.now() - entry.firstAttemptAt > WINDOW_MS) {
    attempts.delete(key);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

export function recordFailedAttempt(key) {
  const entry = attempts.get(key);
  if (!entry || Date.now() - entry.firstAttemptAt > WINDOW_MS) {
    attempts.set(key, { count: 1, firstAttemptAt: Date.now() });
    return;
  }
  entry.count += 1;
}

export function clearAttempts(key) {
  attempts.delete(key);
}
