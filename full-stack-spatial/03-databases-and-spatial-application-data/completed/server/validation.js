// validation.js: everything this API knows about what a valid request body
// looks like, in one place. routes.js calls these before it ever runs a
// query. validateCredentials is carried over from Course 5.2 unchanged; the
// scene, scene-object, and annotation validators below are new.

// --- Accounts (carried over from Course 5.2) --------------------------------

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

// --- Scenes ------------------------------------------------------------------

export const KNOWN_EXHIBITS = ['clay-pot', 'basket-ring', 'jade-stone'];
export const MAX_SCENE_NAME_LENGTH = 60;
// A generous, deliberately round box: nothing in this lesson's exhibit
// needs to travel further than this, and rejecting far-out values here (in
// one place) is simpler than every reader of the scene later having to
// wonder whether an object could be anywhere at all.
const MAX_COORDINATE = 50;

function isFiniteNumberWithin(value, max) {
  return typeof value === 'number' && Number.isFinite(value) && Math.abs(value) <= max;
}

// Returns { valid, errors, value }. `value` holds exactly `name` (trimmed)
// and `isPublic` (a real boolean) — never anything else a client might add.
export function validateSceneMeta(body) {
  const errors = [];
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return { valid: false, errors: ['The request body must be a JSON object.'], value: null };
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (name.length === 0 || name.length > MAX_SCENE_NAME_LENGTH) {
    errors.push(`name must be 1-${MAX_SCENE_NAME_LENGTH} characters.`);
  }
  if (typeof body.isPublic !== 'boolean') {
    errors.push('isPublic must be true or false.');
  }

  if (errors.length > 0) return { valid: false, errors, value: null };
  return { valid: true, errors: [], value: { name, isPublic: body.isPublic } };
}

// Validates the whole `objects` array in one PUT /api/scenes/:id request:
// one entry per exhibit, each with a numeric position and rotation. Every
// number is checked with Number.isFinite before it ever reaches a prepared
// statement — SQLite would happily store the string "DROP TABLE scenes" in
// a REAL column no differently from any other string, so the protection
// here is not "stop SQL injection" (parameter binding already did that) but
// "stop a scene from silently saving NaN or a value from a form field that
// forgot type="number"".
export function validateSceneObjects(objects) {
  const errors = [];
  if (!Array.isArray(objects) || objects.length === 0) {
    return { valid: false, errors: ['objects must be a non-empty array.'], value: null };
  }

  const seenExhibits = new Set();
  const value = [];
  for (const [index, object] of objects.entries()) {
    const where = `objects[${index}]`;
    if (typeof object !== 'object' || object === null) {
      errors.push(`${where} must be an object.`);
      continue;
    }
    if (!KNOWN_EXHIBITS.includes(object.exhibitId)) {
      errors.push(`${where}.exhibitId must be one of: ${KNOWN_EXHIBITS.join(', ')}.`);
      continue;
    }
    if (seenExhibits.has(object.exhibitId)) {
      errors.push(`${where}.exhibitId "${object.exhibitId}" is repeated; each exhibit may appear once.`);
      continue;
    }
    seenExhibits.add(object.exhibitId);

    const position = object.position ?? {};
    const positionOk = ['x', 'y', 'z'].every((axis) => isFiniteNumberWithin(position[axis], MAX_COORDINATE));
    if (!positionOk) {
      errors.push(`${where}.position must have finite numeric x, y, and z, each within ±${MAX_COORDINATE}.`);
    }
    if (!isFiniteNumberWithin(object.rotationY, 360)) {
      errors.push(`${where}.rotationY must be a finite number of degrees, within ±360.`);
    }
    if (positionOk && isFiniteNumberWithin(object.rotationY, 360)) {
      value.push({
        exhibitId: object.exhibitId,
        position: { x: position.x, y: position.y, z: position.z },
        rotationY: object.rotationY,
      });
    }
  }

  if (errors.length > 0) return { valid: false, errors, value: null };
  return { valid: true, errors: [], value };
}

// --- Annotations ---------------------------------------------------------

export const MAX_ANNOTATION_LENGTH = 280;

export function validateAnnotation(body) {
  const errors = [];
  if (typeof body !== 'object' || body === null) {
    return { valid: false, errors: ['The request body must be a JSON object.'], value: null };
  }

  if (!KNOWN_EXHIBITS.includes(body.exhibitId)) {
    errors.push(`exhibitId must be one of: ${KNOWN_EXHIBITS.join(', ')}.`);
  }
  const text = typeof body.text === 'string' ? body.text.trim() : '';
  if (text.length === 0 || text.length > MAX_ANNOTATION_LENGTH) {
    errors.push(`text must be 1-${MAX_ANNOTATION_LENGTH} characters.`);
  }

  if (errors.length > 0) return { valid: false, errors, value: null };
  return { valid: true, errors: [], value: { exhibitId: body.exhibitId, text } };
}
