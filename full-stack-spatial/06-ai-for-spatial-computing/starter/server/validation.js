// validation.js: everything this API knows about what a valid request body
// looks like. routes.js calls these before a query or an AI call ever runs.
// validateSceneMeta, validateSceneObjects, and validateAnnotation are
// finished for you, carried over from Course 5.3's shape (minus the account
// fields this lesson does not have) — TODO 3, below, is new.

import { EXHIBIT_IDS } from './exhibits.js';

export const MAX_SCENE_NAME_LENGTH = 60;
const MAX_COORDINATE = 50;

function isFiniteNumberWithin(value, max) {
  return typeof value === 'number' && Number.isFinite(value) && Math.abs(value) <= max;
}

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

export function validateSceneObjects(objects) {
  const errors = [];
  if (!Array.isArray(objects) || objects.length === 0) {
    return { valid: false, errors: ['objects must be a non-empty array.'], value: null };
  }
  const seen = new Set();
  const value = [];
  for (const [index, object] of objects.entries()) {
    const where = `objects[${index}]`;
    if (typeof object !== 'object' || object === null) { errors.push(`${where} must be an object.`); continue; }
    if (!EXHIBIT_IDS.includes(object.exhibitId)) {
      errors.push(`${where}.exhibitId must be one of: ${EXHIBIT_IDS.join(', ')}.`);
      continue;
    }
    if (seen.has(object.exhibitId)) { errors.push(`${where}.exhibitId "${object.exhibitId}" is repeated.`); continue; }
    seen.add(object.exhibitId);

    const position = object.position ?? {};
    const positionOk = ['x', 'y', 'z'].every((axis) => isFiniteNumberWithin(position[axis], MAX_COORDINATE));
    if (!positionOk) errors.push(`${where}.position must have finite numeric x, y, and z, each within ±${MAX_COORDINATE}.`);
    if (!isFiniteNumberWithin(object.rotationY, 360)) errors.push(`${where}.rotationY must be a finite number of degrees, within ±360.`);
    if (positionOk && isFiniteNumberWithin(object.rotationY, 360)) {
      value.push({ exhibitId: object.exhibitId, position: { x: position.x, y: position.y, z: position.z }, rotationY: object.rotationY });
    }
  }
  if (errors.length > 0) return { valid: false, errors, value: null };
  return { valid: true, errors: [], value };
}

export const MAX_ANNOTATION_LENGTH = 280;

export function validateAnnotation(body) {
  const errors = [];
  if (typeof body !== 'object' || body === null) return { valid: false, errors: ['The request body must be a JSON object.'], value: null };
  if (!EXHIBIT_IDS.includes(body.exhibitId)) errors.push(`exhibitId must be one of: ${EXHIBIT_IDS.join(', ')}.`);
  const text = typeof body.text === 'string' ? body.text.trim() : '';
  if (text.length === 0 || text.length > MAX_ANNOTATION_LENGTH) errors.push(`text must be 1-${MAX_ANNOTATION_LENGTH} characters.`);
  if (errors.length > 0) return { valid: false, errors, value: null };
  return { valid: true, errors: [], value: { exhibitId: body.exhibitId, text } };
}

// --- TODO 3: AI request bodies -----------------------------------------------
// Every character a learner types into either AI feature is about to become
// part of a prompt this project may pay a real provider to read (see ai.js).
// Reject a request that is too large *before* it ever reaches ai.js — that
// is cheaper, for everyone, than rejecting it after a network round trip.

export const MAX_QUERY_LENGTH = 200;

// validateSearchQuery(body) should:
//   - Read body.query as a trimmed string (empty string if it is not one).
//   - Push an error if it is empty or longer than MAX_QUERY_LENGTH.
//   - Return { valid: false, errors, value: null } on failure, or
//     { valid: true, errors: [], value: { query } } on success — the same
//     shape every other validator in this file returns.
export function validateSearchQuery(body) {
  throw new Error('TODO 3: validateSearchQuery is not implemented yet');
}

export const MAX_DESCRIPTION_LENGTH = 500;

// validateDescriptionSave(body) checks the body PUT /api/scenes/:id/description
// accepts once a person has read (and, if needed, edited) an AI-generated
// draft. It does not know or care whether the text passed through ai.js at
// all — a person could type a description entirely by hand, and that must
// work exactly the same way, because a human-reviewed description is not a
// special case. Same shape as validateSearchQuery above, checking
// body.description against MAX_DESCRIPTION_LENGTH instead.
export function validateDescriptionSave(body) {
  throw new Error('TODO 3: validateDescriptionSave is not implemented yet');
}
