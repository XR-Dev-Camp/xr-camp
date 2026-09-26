// rateLimit.js: a simple in-memory failed-attempt counter, used by login
// and account recovery to slow down guessing. It is a real, working limit,
// and also a real, documented limitation: it lives in one process's
// memory, so restarting the server clears it, and it says nothing about
// per-IP limits or CAPTCHAs, which a production service would add
// alongside it (Course 5.8).

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

const attempts = new Map(); // key -> { count, firstAttemptAt }

// TODO 6: finish isRateLimited(key), recordFailedAttempt(key), and
// clearAttempts(key).
//
// isRateLimited(key) should:
//   1. Look up `key` in `attempts`. If there is no entry, return false.
//   2. If the entry's firstAttemptAt is more than WINDOW_MS ago, delete it
//      (the window has passed) and return false.
//   3. Otherwise, return whether entry.count is already at or above
//      MAX_ATTEMPTS.
//
// recordFailedAttempt(key) should:
//   1. If there is no entry for `key`, or its window has passed (same
//      check as above), set a fresh entry: { count: 1, firstAttemptAt:
//      Date.now() }.
//   2. Otherwise, increment the existing entry's count.
//
// clearAttempts(key) should simply delete `key` from `attempts` (called
// after a successful login, so a real user is never punished for someone
// else's earlier failed guesses once they get it right).
export function isRateLimited(key) {
  throw new Error('TODO 6: isRateLimited is not implemented yet');
}

export function recordFailedAttempt(key) {
  throw new Error('TODO 6: recordFailedAttempt is not implemented yet');
}

export function clearAttempts(key) {
  throw new Error('TODO 6: clearAttempts is not implemented yet');
}
