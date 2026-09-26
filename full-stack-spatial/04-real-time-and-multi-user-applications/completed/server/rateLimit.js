// rateLimit.js: carried over unchanged from Courses 5.2 and 5.3, and still
// used the same way here — for login attempts (routes.js). Chat has its own,
// smaller and faster limiter in realtime.js: this one's 15-minute window is
// the right shape for slowing down password guessing, but far too slow to
// keep a chat room usable, so it is not reused for that (see realtime.js's
// comment on CHAT_WINDOW_MS for the reasoning).
//
// A simple in-memory failed-attempt counter, keyed by a string the caller
// chooses, so restarting the server clears it and this alone is not a
// complete defense — a production service also rate-limits per IP address
// and stores counters somewhere shared across every server process.

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
