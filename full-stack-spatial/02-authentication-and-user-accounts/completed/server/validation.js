// validation.js: everything this API knows about what a valid request body
// looks like, in one place. routes.js calls these before it ever saves
// anything or creates an account. The exhibit settings rules are the same
// four fields Course 5.1 introduced; this lesson adds the rules for
// usernames and passwords next to them.

export const KNOWN_EXHIBITS = ['clay-pot', 'basket-ring', 'jade-stone'];
export const CAMERA_PRESETS = ['front', 'left', 'right', 'close'];
export const LANGUAGES = ['en', 'es-419', 'zh-Hans'];

export const DEFAULT_SETTINGS = {
  visibleExhibits: [...KNOWN_EXHIBITS],
  cameraStart: 'front',
  language: 'en',
  reducedMotion: false,
};

function checkArrayField(errors, body, key, allowed) {
  const value = body[key];
  if (!Array.isArray(value) || value.length === 0) {
    errors.push(`${key} must be a non-empty array.`);
    return;
  }
  const unknown = value.filter((item) => !allowed.includes(item));
  if (unknown.length > 0) {
    errors.push(`${key} contains unknown value(s): ${unknown.join(', ')}.`);
  }
  if (new Set(value).size !== value.length) {
    errors.push(`${key} must not repeat a value.`);
  }
}

function checkEnumField(errors, body, key, allowed) {
  if (!allowed.includes(body[key])) {
    errors.push(`${key} must be one of: ${allowed.join(', ')}.`);
  }
}

function checkBooleanField(errors, body, key) {
  if (typeof body[key] !== 'boolean') {
    errors.push(`${key} must be true or false.`);
  }
}

// Returns { valid, errors, value }. `value` holds exactly the four known
// fields, so a client can never smuggle an extra property into a saved
// account (see store.js: settings are saved as part of an account record).
export function validateSettings(body) {
  const errors = [];

  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return { valid: false, errors: ['The request body must be a JSON object.'], value: null };
  }

  checkArrayField(errors, body, 'visibleExhibits', KNOWN_EXHIBITS);
  checkEnumField(errors, body, 'cameraStart', CAMERA_PRESETS);
  checkEnumField(errors, body, 'language', LANGUAGES);
  checkBooleanField(errors, body, 'reducedMotion');

  if (errors.length > 0) return { valid: false, errors, value: null };

  return {
    valid: true,
    errors: [],
    value: {
      visibleExhibits: [...body.visibleExhibits],
      cameraStart: body.cameraStart,
      language: body.language,
      reducedMotion: body.reducedMotion,
    },
  };
}

// --- Accounts ----------------------------------------------------------------

// No rule about symbols, numbers, or upper case: NIST SP 800-63B (section
// 5.1.1.2, "Memorized Secrets") recommends checking a password's length,
// not its composition, and dropping forced periodic rotation. The minimum
// below (10) is a deliberately conservative floor for a course; NIST's own
// minimum is 8.
export const USERNAME_PATTERN = /^[a-z0-9_-]{3,32}$/;
export const MIN_PASSWORD_LENGTH = 10;
export const MAX_PASSWORD_LENGTH = 128;

// Returns { valid, errors, value }. Usernames are lower-cased and trimmed
// before every check and every lookup, so "Ana" and "ana" are the same
// account — never two.
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
