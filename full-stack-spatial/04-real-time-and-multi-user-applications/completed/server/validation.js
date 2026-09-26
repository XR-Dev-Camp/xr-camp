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

// Returns { valid, value }. Never trusts anything else the message might
// carry (a userId, a username, a server timestamp): realtime.js supplies
// all of that itself. See the README's "What never to trust from a client"
// table.
export function validatePosition(message) {
  if (typeof message !== 'object' || message === null) return { valid: false, value: null };
  const { x, y, z, rotationY } = message;
  const positionOk = [x, y, z].every((n) => isFiniteNumberWithin(n, MAX_COORDINATE));
  const rotationOk = isFiniteNumberWithin(rotationY, 360);
  if (!positionOk || !rotationOk) return { valid: false, value: null };
  return { valid: true, value: { x, y, z, rotationY } };
}

// --- Chat --------------------------------------------------------------------

export const MAX_CHAT_LENGTH = 280;

// Returns { valid, errors, value }. The text is trimmed but not yet
// sanitised — that is sanitize.js's job, done separately so this function
// can stay a pure "is this shaped right" check.
export function validateChatText(message) {
  if (typeof message !== 'object' || message === null) {
    return { valid: false, errors: ['message must be an object.'], value: null };
  }
  const text = typeof message.text === 'string' ? message.text.trim() : '';
  if (text.length === 0 || text.length > MAX_CHAT_LENGTH) {
    return { valid: false, errors: [`text must be 1-${MAX_CHAT_LENGTH} characters.`], value: null };
  }
  return { valid: true, errors: [], value: { text } };
}

// --- Reports -------------------------------------------------------------

export const REPORT_REASONS = ['harassment', 'spam', 'inappropriate-content', 'other'];
export const MAX_REPORT_EXCERPT_LENGTH = 280;

export function validateReport(message) {
  const errors = [];
  if (typeof message !== 'object' || message === null) {
    return { valid: false, errors: ['message must be an object.'], value: null };
  }
  const targetUserId = typeof message.targetUserId === 'string' ? message.targetUserId : '';
  if (targetUserId.length === 0) errors.push('targetUserId is required.');

  const reason = typeof message.reason === 'string' ? message.reason : '';
  if (!REPORT_REASONS.includes(reason)) {
    errors.push(`reason must be one of: ${REPORT_REASONS.join(', ')}.`);
  }

  let messageExcerpt = typeof message.messageExcerpt === 'string' ? message.messageExcerpt.trim() : '';
  if (messageExcerpt.length > MAX_REPORT_EXCERPT_LENGTH) {
    messageExcerpt = messageExcerpt.slice(0, MAX_REPORT_EXCERPT_LENGTH);
  }

  if (errors.length > 0) return { valid: false, errors, value: null };
  return { valid: true, errors: [], value: { targetUserId, reason, messageExcerpt } };
}
