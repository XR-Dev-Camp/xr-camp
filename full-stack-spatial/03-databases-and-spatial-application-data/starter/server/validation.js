// validation.js: everything this API knows about what a valid request body
// looks like, in one place. routes.js calls these before it ever runs a
// query. validateCredentials is carried over from Course 5.2, finished for
// you; TODO 7 below adds the rules for scenes, scene objects, and
// annotations.

// --- Accounts (carried over from Course 5.2) --------------------------------

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

// --- Scenes ------------------------------------------------------------------

export const KNOWN_EXHIBITS = ['clay-pot', 'basket-ring', 'jade-stone'];
export const MAX_SCENE_NAME_LENGTH = 60;
const MAX_COORDINATE = 50;

function isFiniteNumberWithin(value, max) {
  return typeof value === 'number' && Number.isFinite(value) && Math.abs(value) <= max;
}

// TODO 7: finish validateSceneMeta(body), validateSceneObjects(objects),
// and validateAnnotation(body). Each should return { valid, errors, value }
// the same way validateCredentials above does.
//
// validateSceneMeta(body): check body.name is a non-empty, trimmed string
// of at most MAX_SCENE_NAME_LENGTH characters, and body.isPublic is exactly
// `true` or `false` (typeof body.isPublic !== 'boolean' is invalid). value
// should hold exactly { name, isPublic }.
//
// validateSceneObjects(objects): objects must be a non-empty array. For
// each entry, check: exhibitId is one of KNOWN_EXHIBITS and not repeated
// within the array; position is an object whose x, y, and z each pass
// isFiniteNumberWithin(value, MAX_COORDINATE); rotationY passes
// isFiniteNumberWithin(value, 360). Collect one error message per problem
// found (see validateSceneMeta's shape once you have written it, or
// completed/server/validation.js, for the message wording this project
// uses) and only build `value` from entries that passed every check.
//
// validateAnnotation(body): check body.exhibitId is one of KNOWN_EXHIBITS
// and body.text is a non-empty, trimmed string of at most
// MAX_ANNOTATION_LENGTH characters. value should hold exactly
// { exhibitId, text }.
export function validateSceneMeta(body) {
  throw new Error('TODO 7: validateSceneMeta is not implemented yet');
}

export function validateSceneObjects(objects) {
  throw new Error('TODO 7: validateSceneObjects is not implemented yet');
}

// --- Annotations ---------------------------------------------------------

export const MAX_ANNOTATION_LENGTH = 280;

export function validateAnnotation(body) {
  throw new Error('TODO 7: validateAnnotation is not implemented yet');
}
