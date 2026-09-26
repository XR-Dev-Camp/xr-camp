// validation.js: everything this API knows about what a valid request body
// looks like. routes.js calls these before a query or an AI call ever runs.
// validateSceneMeta and validateSceneObjects are carried over from Course
// 5.3's shape unchanged (minus the account fields this lesson does not
// have); validateSearchQuery and validateDescriptionSave are new, and exist
// for the same two reasons every validator in this course exists: reject
// nonsense before it reaches a database column or a paid API call, and give
// a person a clear reason why.

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

// --- AI request bodies -------------------------------------------------------

export const MAX_QUERY_LENGTH = 200;

// A learner typing a very long "query" is more likely to be pasting a whole
// paragraph by accident than asking a focused question, and every extra
// character is more of the prompt this lesson has to pay a real provider to
// read (see ai.js's cost notes). Rejecting it here, before ai.js ever builds
// a prompt, is cheaper than rejecting it after a network round trip.
export function validateSearchQuery(body) {
  const errors = [];
  const query = typeof body?.query === 'string' ? body.query.trim() : '';
  if (query.length === 0 || query.length > MAX_QUERY_LENGTH) {
    errors.push(`query must be 1-${MAX_QUERY_LENGTH} characters.`);
  }
  if (errors.length > 0) return { valid: false, errors, value: null };
  return { valid: true, errors: [], value: { query } };
}

export const MAX_DESCRIPTION_LENGTH = 500;

// The body PUT /api/scenes/:id/description accepts once a person has read
// and, if needed, edited an AI-generated draft. This validator does not
// know or care whether the text ever passed through ai.js at all — a person
// could type a description entirely by hand, and that must work exactly the
// same way, because a human-reviewed description is not a special case.
export function validateDescriptionSave(body) {
  const errors = [];
  const description = typeof body?.description === 'string' ? body.description.trim() : '';
  if (description.length === 0 || description.length > MAX_DESCRIPTION_LENGTH) {
    errors.push(`description must be 1-${MAX_DESCRIPTION_LENGTH} characters.`);
  }
  if (errors.length > 0) return { valid: false, errors, value: null };
  return { valid: true, errors: [], value: { description } };
}
