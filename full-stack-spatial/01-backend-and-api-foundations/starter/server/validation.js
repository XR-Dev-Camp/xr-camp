// validation.js: everything the API knows about a valid settings object,
// in one place. routes.js will call validateSettings() before it ever
// saves anything.

export const KNOWN_EXHIBITS = ['clay-pot', 'basket-ring', 'jade-stone'];
export const CAMERA_PRESETS = ['front', 'left', 'right', 'close'];
export const LANGUAGES = ['en', 'es-419', 'zh-Hans'];

export const DEFAULT_SETTINGS = {
  visibleExhibits: [...KNOWN_EXHIBITS],
  cameraStart: 'front',
  language: 'en',
  reducedMotion: false,
};

// Checks one field, and pushes a plain-English message (with the field's
// name first) if it fails.
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

// TODO 2: finish validateSettings. It must:
//   1. Reject a body that is not a plain object (not an array, not null),
//      returning early with one error message.
//   2. Call checkArrayField for "visibleExhibits" (allowed: KNOWN_EXHIBITS),
//      checkEnumField for "cameraStart" (allowed: CAMERA_PRESETS) and for
//      "language" (allowed: LANGUAGES), and checkBooleanField for
//      "reducedMotion".
//   3. If `errors` is not empty, return { valid: false, errors, value: null }.
//   4. Otherwise return { valid: true, errors: [], value } where `value` is
//      a NEW plain object with exactly those four fields copied over (never
//      the original `body`: an attacker could add extra properties to it).
// Hint: look at checkArrayField above for the shape each check function
// expects (errors, body, key, allowed).
export function validateSettings(body) {
  throw new Error('TODO 2: validateSettings is not implemented yet');
}
