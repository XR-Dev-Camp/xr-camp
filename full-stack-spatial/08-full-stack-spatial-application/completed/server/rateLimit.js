// rateLimit.js: carried over unchanged from Courses 5.2-5.4. A simple
// in-memory failed-attempt counter, keyed by a string the caller chooses --
// restarting the server clears it, and this alone is not a complete
// defense (a production service also rate-limits per IP address and stores
// counters somewhere shared across every server process).
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
