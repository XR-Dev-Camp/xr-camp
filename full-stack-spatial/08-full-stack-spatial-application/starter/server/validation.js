// validation.js: everything this server knows about what a valid request
// looks like. validateCredentials is carried over from Courses 5.2-5.4
// unchanged; validateSceneInput and validateAnnotationText and
// validateChatText are new for this lesson's scenes, annotations, and
// chat. Every validator answers only "is this shaped right", never
// "is this safe to store or display" -- that is sanitize.js's job, and
// "is this caller allowed to see it" -- that is routes.js's job. Keeping
// the three questions separate is what this lesson's review checks.

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

// --- Scenes ----------------------------------------------------------------

export const MAX_SCENE_NAME_LENGTH = 60;

function isFiniteNumberWithin(value, max) {
  return typeof value === 'number' && Number.isFinite(value) && Math.abs(value) <= max;
}

// location is optional: most scenes have none. When present, it must be a
// plausible latitude/longitude pair -- shape only. Whether a *precise* pair
// should ever be stored at all is a separate question sanitize.js's
// roundLocation answers, on purpose (see the README's "Data minimisation").
export function validateSceneInput(body) {
  const errors = [];
  if (typeof body !== 'object' || body === null) {
    return { valid: false, errors: ['The request body must be a JSON object.'], value: null };
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (name.length === 0 || name.length > MAX_SCENE_NAME_LENGTH) {
    errors.push(`name must be 1-${MAX_SCENE_NAME_LENGTH} characters.`);
  }

  const isPublic = body.isPublic === true;

  let location = null;
  if (body.locationLat !== undefined || body.locationLng !== undefined) {
    const latOk = isFiniteNumberWithin(body.locationLat, 90);
    const lngOk = isFiniteNumberWithin(body.locationLng, 180);
    if (!latOk || !lngOk) {
      errors.push('locationLat must be between -90 and 90, and locationLng between -180 and 180.');
    } else {
      location = { lat: body.locationLat, lng: body.locationLng };
    }
  }

  if (errors.length > 0) return { valid: false, errors, value: null };
  return { valid: true, errors: [], value: { name, isPublic, location } };
}

// --- Annotations -------------------------------------------------------------

export const MAX_ANNOTATION_LENGTH = 280;

export function validateAnnotationText(body) {
  if (typeof body !== 'object' || body === null) {
    return { valid: false, errors: ['The request body must be a JSON object.'], value: null };
  }
  const text = typeof body.text === 'string' ? body.text.trim() : '';
  if (text.length === 0 || text.length > MAX_ANNOTATION_LENGTH) {
    return { valid: false, errors: [`text must be 1-${MAX_ANNOTATION_LENGTH} characters.`], value: null };
  }
  return { valid: true, errors: [], value: { text } };
}

// --- Chat --------------------------------------------------------------------

export const MAX_CHAT_LENGTH = 280;

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

// --- AI description drafts (this capstone's own addition) --------------------

export const MAX_DESCRIPTION_LENGTH = 500;

// FIXED (TODO 3): checked with the same shape-only rules as every other
// stored text in this app -- this says nothing about whether the text is
// *true*; ai.js's caller-side review is what that is for (see the README's
// "AI description drafts, with review" section).
export function validateDescription(body) {
  if (typeof body !== 'object' || body === null) {
    return { valid: false, errors: ['The request body must be a JSON object.'], value: null };
  }
  const description = typeof body.description === 'string' ? body.description.trim() : '';
  if (description.length === 0 || description.length > MAX_DESCRIPTION_LENGTH) {
    return { valid: false, errors: [`description must be 1-${MAX_DESCRIPTION_LENGTH} characters.`], value: null };
  }
  return { valid: true, errors: [], value: { description } };
}
