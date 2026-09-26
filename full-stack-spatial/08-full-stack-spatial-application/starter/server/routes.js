// routes.js: account routes adapted unchanged from Course 5.4 (register,
// login, logout, me), plus Course 5.5's review targets: scenes,
// annotations, and one secret-gated debug endpoint. FIXED (Course 5.5):
// TODO 5 (getScene now checks ownership/visibility on every request),
// TODO 7 (a scene's location is rounded before it is ever stored), TODO 1
// (annotation text is sanitized before it is stored). TODO 4's other half
// (the admin endpoint's secret) is fixed in config.js, not here -- this
// file only imports it. This capstone's own addition -- an AI description
// draft -- is TODO 9 and TODO 10, near the bottom of this file.

import { hashSecret, verifySecret } from './auth.js';
import { createSession, destroySession, getSession, verifyCsrfToken } from './sessions.js';
import { clearAttempts, isRateLimited, recordFailedAttempt } from './rateLimit.js';
import {
  countAnnotations, countScenes, countUsers, findSceneById, findUserById, findUserByUsername,
  insertAnnotation, insertScene, insertUser, listAnnotationsForScene, listScenesForOwner,
  updateSceneDescription,
} from './db.js';
import {
  validateAnnotationText, validateCredentials, validateDescription, validateSceneInput,
} from './validation.js';
import { roundLocation, sanitizeText } from './sanitize.js';
import { APP_SECRET } from './config.js';
import { describeScene as buildDescriptionDraft } from './ai.js';

const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;

export function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function sendNoContent(res) {
  res.writeHead(204);
  res.end();
}

export function readJsonBody(req, { maxBytes = 100_000 } = {}) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > maxBytes) {
        reject(new Error('Request body too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      const text = Buffer.concat(chunks).toString('utf8') || '{}';
      try {
        resolve(JSON.parse(text));
      } catch {
        reject(new Error('Request body is not valid JSON'));
      }
    });
    req.on('error', reject);
  });
}

async function readBodyOr400(req, res) {
  try {
    return await readJsonBody(req);
  } catch (error) {
    sendJson(res, error.message.includes('too large') ? 413 : 400, { error: error.message });
    return undefined;
  }
}

function publicUser(user) {
  const { id, username, createdAt } = user;
  return { id, username, createdAt };
}

function isHttps(req) {
  return req.socket?.encrypted === true || req.headers['x-forwarded-proto'] === 'https';
}

export function setSessionCookie(res, req, sessionId) {
  const attributes = [
    `sid=${sessionId}`, 'HttpOnly', 'SameSite=Lax', 'Path=/', `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
  ];
  if (isHttps(req)) attributes.push('Secure');
  res.setHeader('Set-Cookie', attributes.join('; '));
}

function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', 'sid=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0');
}

export async function requireAuth(req) {
  const session = getSession(req.cookies?.sid);
  if (!session) return null;
  const user = findUserById(session.userId);
  if (!user) return null;
  return { session, user };
}

function requireCsrf(req, session, res) {
  if (!verifyCsrfToken(session, req.headers['x-csrf-token'])) {
    sendJson(res, 403, { error: 'Missing or invalid CSRF token.' });
    return false;
  }
  return true;
}

// --- Accounts ----------------------------------------------------------------

export async function register(req, res) {
  const body = await readBodyOr400(req, res);
  if (body === undefined) return;

  const { valid, errors, value } = validateCredentials(body);
  if (!valid) return sendJson(res, 400, { error: 'Invalid registration', details: errors });

  if (findUserByUsername(value.username)) {
    return sendJson(res, 409, { error: 'That username is already taken.' });
  }

  const user = insertUser({ username: value.username, passwordHash: await hashSecret(value.password) });
  sendJson(res, 201, { account: publicUser(user) });
}

export async function login(req, res) {
  const body = await readBodyOr400(req, res);
  if (body === undefined) return;

  const username = typeof body.username === 'string' ? body.username.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  const rateLimitKey = `login:${username}`;

  if (isRateLimited(rateLimitKey)) {
    return sendJson(res, 429, { error: 'Too many attempts. Wait a while before trying again.' });
  }

  const user = findUserByUsername(username);
  const passwordOk = user ? await verifySecret(password, user.passwordHash) : false;

  if (!user || !passwordOk) {
    recordFailedAttempt(rateLimitKey);
    return sendJson(res, 401, { error: 'Invalid username or password.' });
  }
  clearAttempts(rateLimitKey);

  const { sessionId, csrfToken } = createSession(user.id);
  setSessionCookie(res, req, sessionId);
  sendJson(res, 200, { account: publicUser(user), csrfToken });
}

export function logout(req, res, auth) {
  if (!requireCsrf(req, auth.session, res)) return;
  destroySession(req.cookies.sid);
  clearSessionCookie(res);
  sendNoContent(res);
}

export function me(req, res, auth) {
  sendJson(res, 200, { account: publicUser(auth.user), csrfToken: auth.session.csrfToken });
}

// --- Scenes ------------------------------------------------------------------

export async function createScene(req, res, auth) {
  if (!requireCsrf(req, auth.session, res)) return;
  const body = await readBodyOr400(req, res);
  if (body === undefined) return;

  const { valid, errors, value } = validateSceneInput(body);
  if (!valid) return sendJson(res, 400, { error: 'Invalid scene', details: errors });

  // FIXED (TODO 7): a location, if given, is rounded to about 11 km before
  // it is ever written to the database -- this project never needs more
  // precision than "roughly where", so more precision is never even
  // requested to be kept. See sanitize.js's roundLocation and the README's
  // "Data minimisation" section.
  const rounded = value.location ? roundLocation(value.location) : null;
  const scene = insertScene({
    ownerId: auth.user.id,
    name: value.name,
    isPublic: value.isPublic,
    locationLat: rounded?.lat,
    locationLng: rounded?.lng,
  });
  sendJson(res, 201, { scene });
}

export function listMyScenes(req, res, auth) {
  sendJson(res, 200, { scenes: listScenesForOwner(auth.user.id) });
}

function canView(scene, userId) {
  return scene.ownerId === userId || scene.isPublic;
}

// FIXED (TODO 5): checks, on every request, that the caller is either the
// scene's owner or the scene is public -- never trusting that a caller
// only ever asks for scenes they are meant to see. A scene that exists but
// is not visible to this caller answers exactly the same 404 as a scene
// that does not exist at all, on purpose: telling the two apart would let
// an attacker enumerate which private scene ids exist, one guess at a
// time, even without ever reading one. See the OWASP Access Control Cheat
// Sheet and the README's "IDOR" section.
export function getScene(req, res, auth, sceneId) {
  const scene = findSceneById(sceneId);
  if (!scene || !canView(scene, auth.user.id)) return sendJson(res, 404, { error: 'Scene not found.' });
  sendJson(res, 200, { scene, annotations: listAnnotationsForScene(scene.id) });
}

// --- Annotations ---------------------------------------------------------

export async function createAnnotation(req, res, auth, sceneId) {
  if (!requireCsrf(req, auth.session, res)) return;
  const scene = findSceneById(sceneId);
  if (!scene || !canView(scene, auth.user.id)) return sendJson(res, 404, { error: 'Scene not found.' });

  const body = await readBodyOr400(req, res);
  if (body === undefined) return;

  const { valid, errors, value } = validateAnnotationText(body);
  if (!valid) return sendJson(res, 400, { error: 'Invalid annotation', details: errors });

  // FIXED (TODO 1): sanitizeText runs before this text is ever stored, so
  // every later reader -- this lesson's client, a future client, an export
  // tool -- gets the same already-cleaned value. js/main.js's matching fix
  // renders the result with textContent, never innerHTML: two independent
  // layers, see the README's "Key code explained".
  const text = sanitizeText(value.text);
  // Matches realtime.js's chat handler: a message that was nothing but a
  // tag (which sanitizeText strips entirely) leaves nothing worth saving.
  if (text.length === 0) return sendJson(res, 400, { error: 'Invalid annotation', details: ['text must be 1-280 characters.'] });
  const annotation = insertAnnotation({ sceneId: scene.id, authorId: auth.user.id, text });
  sendJson(res, 201, { annotation });
}

// --- AI description drafts (this capstone's own addition) --------------------
// Reuses getScene's exact ownership/visibility check (canView): a draft is
// never offered for, and a description is never saved to, a scene this
// caller could not already open. See the README's "AI description drafts,
// with review" section.

// TODO 9: handle POST /api/scenes/:id/describe. Look the scene up
// (findSceneById), return 404 with { error: 'Scene not found.' } unless
// canView(scene, auth.user.id) is true -- exactly the same check getScene
// uses above, because a draft must never be offered for a scene this caller
// could not already open. Then call buildDescriptionDraft(scene,
// listAnnotationsForScene(scene.id)), wrapped in try/catch, and send its
// result with sendJson(res, 200, draft); on a thrown error, send 502 with
// { error: `Could not build a description draft: ${error.message}` }.
export async function describeScene(req, res, auth, sceneId) {
  sendJson(res, 501, { error: 'TODO 9: implement describeScene in server/routes.js' });
}

// TODO 10: handle PUT /api/scenes/:id/description. Call requireCsrf first
// (return if it fails). Look the scene up and return 404 unless
// scene.ownerId === auth.user.id -- stricter than describeScene above: a
// public scene may be *viewed* by anyone, but only its owner may ever
// *save* a description to it (see the README's "AI description drafts,
// with review" section). Read the body, validate it with
// validateDescription, then run the result through sanitizeText exactly
// like createAnnotation does above -- a person approved this text, but it
// is still user-controlled text. If sanitizing leaves nothing, return 400.
// Otherwise call updateSceneDescription(scene.id, description) and send
// { scene: updated } with sendJson(res, 200, ...).
export async function saveDescription(req, res, auth, sceneId) {
  sendJson(res, 501, { error: 'TODO 10: implement saveDescription in server/routes.js' });
}

// --- Admin (secret-gated) -----------------------------------------------
// A tiny debug endpoint, gated by one shared secret instead of a signed-in
// account -- a common shortcut for an internal tool. It is only as safe as
// config.js's APP_SECRET, which now comes from the environment (see
// config.js and TODO 4).

export function adminStats(req, res) {
  if (req.headers['x-admin-token'] !== APP_SECRET) {
    return sendJson(res, 401, { error: 'Invalid admin token.' });
  }
  sendJson(res, 200, {
    userCount: countUsers(), sceneCount: countScenes(), annotationCount: countAnnotations(),
  });
}

// FIXED (TODO 6): a fixed, generic message, regardless of what the error
// actually was -- server.js's catch block still logs the real error (with
// its stack trace) to the terminal with console.error, for whoever is
// running the server to see; this function controls only what a client
// receives.
export function formatServerError(_error) {
  return { error: 'Internal server error' };
}
