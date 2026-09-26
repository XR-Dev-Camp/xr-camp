// validation.js: everything the API knows about a valid settings object,
// in one place. routes.js calls validateSettings() before it ever saves
// anything; the client's js/main.js repeats the same lists so it can show a
// helpful error before it even sends the request. Small projects like this
// one keep the two copies in sync by hand; a shared module or a build step
// would remove the duplication, at the cost of the "no dependencies, no
// build step" rule this course keeps until Course 6.1.

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
// name first) if it fails. Keeping every message in this shape lets
// routes.js send the whole list back as one JSON array, and lets the client
// show them next to the right field.
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

// Returns { valid, errors, value }. `value` is only meaningful when `valid`
// is true: it is a plain object holding exactly the four known fields, so a
// client cannot smuggle extra properties into the saved file.
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
