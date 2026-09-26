// DELIBERATELY VULNERABLE -- for learning on localhost only; never deploy.
//
// routes.js: account routes adapted unchanged from Course 5.4 (register,
// login, logout, me), plus this lesson's own review targets: scenes,
// annotations, and one secret-gated debug endpoint. Two TODOs live here --
// TODO 5 (an IDOR on getScene) and TODO 4's other half (the admin endpoint
// trusting a hardcoded secret from config.js).

import { hashSecret, verifySecret } from './auth.js';
import { createSession, destroySession, getSession, verifyCsrfToken } from './sessions.js';
import { clearAttempts, isRateLimited, recordFailedAttempt } from './rateLimit.js';
import {
  countAnnotations, countScenes, countUsers, findSceneById, findUserById, findUserByUsername,
  insertAnnotation, insertScene, insertUser, listAnnotationsForScene, listScenesForOwner,
} from './db.js';
import { validateAnnotationText, validateCredentials, validateSceneInput } from './validation.js';
import { APP_SECRET } from './config.js';

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

  // TODO 7: value.location, if given, is stored exactly as sent -- full
  // GPS precision, forever, even though nothing in this project ever reads
  // a scene's location back for any purpose more precise than "roughly
  // where". See sanitize.js's roundLocation and the README's "Data
  // minimisation" section for why that is a real privacy exposure, not a
  // hypothetical one, and what to store instead.
  const scene = insertScene({
    ownerId: auth.user.id,
    name: value.name,
    isPublic: value.isPublic,
    locationLat: value.location?.lat,
    locationLng: value.location?.lng,
  });
  sendJson(res, 201, { scene });
}

export function listMyScenes(req, res, auth) {
  sendJson(res, 200, { scenes: listScenesForOwner(auth.user.id) });
}

// TODO 5: this reads a scene by id and returns it to *any signed-in user*,
// with no check at all that the caller owns it or that it is public. Two
// different accounts can tell their scene ids apart only by asking this
// endpoint -- and scene ids are UUIDs printed right back to their own
// owner in createScene's response and in listMyScenes, so anyone who has
// ever seen one (a shared screenshot, a support ticket, a browser history
// entry) can read it forever after. See the README's "IDOR" section and
// the OWASP guidance it links for what a fix must check on every request,
// not just remember to check once.
export function getScene(req, res, auth, sceneId) {
  const scene = findSceneById(sceneId);
  if (!scene) return sendJson(res, 404, { error: 'Scene not found.' });
  sendJson(res, 200, { scene, annotations: listAnnotationsForScene(scene.id) });
}

// --- Annotations ---------------------------------------------------------

function canView(scene, userId) {
  return scene.ownerId === userId || scene.isPublic;
}

export async function createAnnotation(req, res, auth, sceneId) {
  if (!requireCsrf(req, auth.session, res)) return;
  const scene = findSceneById(sceneId);
  if (!scene || !canView(scene, auth.user.id)) return sendJson(res, 404, { error: 'Scene not found.' });

  const body = await readBodyOr400(req, res);
  if (body === undefined) return;

  const { valid, errors, value } = validateAnnotationText(body);
  if (!valid) return sendJson(res, 400, { error: 'Invalid annotation', details: errors });

  // TODO 1: value.text is stored exactly as submitted -- sanitize.js's
  // sanitizeText is never called. js/main.js's matching bug (TODO 1 there)
  // renders every annotation with innerHTML, so a note containing
  // "<img src=x onerror=alert(document.cookie)>" runs as script for every
  // later viewer of this scene, including the scene's own owner. See the
  // README's "What went wrong" table and MDN's Cross-Site Scripting
  // article.
  const annotation = insertAnnotation({ sceneId: scene.id, authorId: auth.user.id, text: value.text });
  sendJson(res, 201, { annotation });
}

// --- Admin (secret-gated) -----------------------------------------------
// A tiny debug endpoint, gated by one shared secret instead of a signed-in
// account -- a common shortcut for an internal tool. It is only as safe as
// config.js's APP_SECRET, which is exactly this lesson's TODO 4.

export function adminStats(req, res) {
  if (req.headers['x-admin-token'] !== APP_SECRET) {
    return sendJson(res, 401, { error: 'Invalid admin token.' });
  }
  sendJson(res, 200, {
    userCount: countUsers(), sceneCount: countScenes(), annotationCount: countAnnotations(),
  });
}

// TODO 6: this hands the client the exact error message and stack trace of
// whatever went wrong -- file paths, package internals, sometimes a
// fragment of the query that caused it. A normal learner using this app
// only ever needs "something went wrong"; an attacker probing it for
// weaknesses learns much more than that. See the README's "Verbose error
// messages" section.
export function formatServerError(error) {
  return { error: error.message, stack: error.stack };
}
