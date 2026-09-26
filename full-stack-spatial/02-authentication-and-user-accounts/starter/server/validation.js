// validation.js: everything this API knows about what a valid request body
// looks like, in one place. routes.js will call these before it ever saves
// anything or creates an account. The exhibit settings rules and
// validateSettings() are finished (the same four fields Course 5.1
// introduced) — TODO 3 below adds the rules for usernames and passwords.

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

// Finished: this is the same validateSettings() Course 5.1 built.
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

// No rule about symbols, numbers, or upper case: NIST SP 800-63B recommends
// checking a password's length, not its composition. Finished: nothing to
// change about these three constants.
export const USERNAME_PATTERN = /^[a-z0-9_-]{3,32}$/;
export const MIN_PASSWORD_LENGTH = 10;
export const MAX_PASSWORD_LENGTH = 128;

// TODO 3: finish validateCredentials(body). It should:
//   1. Reject a body that is not a plain object, the same way
//      validateSettings does above.
//   2. Read `username`: only a string counts, and it must be trimmed and
//      lower-cased before checking or returning it (so "Ana" and "ana" are
//      always treated as the same account). Push an error if it does not
//      match USERNAME_PATTERN.
//   3. Read `password`: only a string counts (treat anything else as an
//      empty string). Push an error if its length is outside
//      MIN_PASSWORD_LENGTH..MAX_PASSWORD_LENGTH.
//   4. If there are any errors, return { valid: false, errors, value: null }.
//   5. Otherwise return { valid: true, errors: [], value: { username,
//      password } } — the lower-cased username, and the password exactly
//      as given (it is about to be hashed, not stored as-is).
export function validateCredentials(body) {
  throw new Error('TODO 3: validateCredentials is not implemented yet');
}
