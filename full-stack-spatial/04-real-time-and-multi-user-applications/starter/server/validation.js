// validation.js: everything this server knows about what a valid request or
// message looks like, in one place — routes.js and realtime.js call these
// before they ever act on a value. validateCredentials is carried over from
// Courses 5.2/5.3 unchanged; validateChatText, validatePosition, and
// validateReport are new for the WebSocket messages this lesson adds.

// --- Accounts (carried over unchanged) --------------------------------------

export const USERNAME_PATTERN = /^[a-z0-9_-]{3,32}$/;
export const MIN_PASSWORD_LENGTH = 10;
export const MAX_PASSWORD_LENGTH = 128;

export function validateCredentials(body) {
  const errors = [];
  if (typeof body !== 'object' || body === null) {
    return { valid: false, errors: ['The request body must be a JSON object.'] };
  }

  const username = typeof body.username === 'string' ? body.username.trim().toLowerCase() : '';
  if (!USERNAME_PATTERN.test(username)) {
    errors.push('username must be 3-32 characters: lowercase letters, numbers, "_" or "-".');
  }

  const password = typeof body.password === 'string' ? body.password : '';
  if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
    errors.push(`password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters.`);
  }

  if (errors.length > 0) return { valid: false, errors, value: null };
  return { valid: true, errors: [], value: { username, password } };
}

// --- Position sync -----------------------------------------------------------
// A generous, deliberately round box, the same idea Course 5.3 used for
// scene-object coordinates: rejecting far-out values here, once, is simpler
// than every reader of a position later having to wonder whether an avatar
// could be anywhere at all — including "anywhere" a client sends on purpose.
export const MAX_COORDINATE = 20;

function isFiniteNumberWithin(value, max) {
  return typeof value === 'number' && Number.isFinite(value) && Math.abs(value) <= max;
}

// TODO 2a: validatePosition(message). Return { valid: false, value: null }
// unless `message` is an object whose x, y, z, and rotationY are all finite
// numbers — x/y/z within ±MAX_COORDINATE (use isFiniteNumberWithin above),
// rotationY within ±360. On success, return { valid: true, value: { x, y,
// z, rotationY } } — nothing else, even if the message carries extra
// fields (a userId or username the client should never be trusted to set;
// see server/realtime.js and the README's "What never to trust").
export function validatePosition(message) {
  throw new Error('validatePosition is not implemented yet — see TODO 2a');
}

// --- Chat --------------------------------------------------------------------

export const MAX_CHAT_LENGTH = 280;

// TODO 2b: validateChatText(message). Return { valid: false, errors: [...],
// value: null } unless `message` is an object whose `text` is a string
// that, once trimmed, is between 1 and MAX_CHAT_LENGTH characters. On
// success, return { valid: true, errors: [], value: { text } } with the
// trimmed text — sanitizing it is sanitize.js's separate job (TODO 3), not
// this function's.
export function validateChatText(message) {
  throw new Error('validateChatText is not implemented yet — see TODO 2b');
}

// --- Reports -------------------------------------------------------------

export const REPORT_REASONS = ['harassment', 'spam', 'inappropriate-content', 'other'];
export const MAX_REPORT_EXCERPT_LENGTH = 280;

// TODO 2c: validateReport(message). Check that `targetUserId` is a
// non-empty string and `reason` is one of REPORT_REASONS; collect errors
// for each problem the way validateCredentials above does. `messageExcerpt`
// is optional — if present, trim it and truncate it to
// MAX_REPORT_EXCERPT_LENGTH rather than rejecting it outright (a report
// should still go through even if someone pastes a very long message).
// Return { valid, errors, value: { targetUserId, reason, messageExcerpt } }.
export function validateReport(message) {
  throw new Error('validateReport is not implemented yet — see TODO 2c');
}
