// routes.js: one function per route. The account routes (register through
// removeAccount) are carried over from Course 5.2 with one change — they
// call db.js instead of store.js — so signing up, signing in, CSRF, and
// account deletion all still work exactly as they did there. Everything
// from "Scenes" onward is new: this lesson's actual subject.

import { generateRecoveryCode, hashSecret, verifySecret } from './auth.js';
import {
  createSession, destroyAllSessionsForUser, destroySession, getSession, verifyCsrfToken,
} from './sessions.js';
import { clearAttempts, isRateLimited, recordFailedAttempt } from './rateLimit.js';
import {
  deleteAnnotation, deleteScene, deleteUser, findUserById, findUserByUsername, getAnnotationById,
  getSceneById, insertAnnotation, insertScene, insertUser, listAnnotationsForScene,
  listPublicScenes, listScenesByOwner, listSceneObjects, replaceSceneObjects, updateSceneMeta,
  updateUserPassword,
} from './db.js';
import {
  validateAnnotation, validateCredentials, validateSceneMeta, validateSceneObjects,
} from './validation.js';

const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60; // matches sessions.js's absolute timeout

// --- Small shared helpers (carried over from Course 5.2) --------------------

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

export function readJsonBody(req, { maxBytes = 1_000_000 } = {}) {
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

function setSessionCookie(res, req, sessionId) {
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

// --- Registration, login, logout, recovery (carried over from 5.2) ---------

export async function register(req, res) {
  const body = await readBodyOr400(req, res);
  if (body === undefined) return;

  const { valid, errors, value } = validateCredentials(body);
  if (!valid) return sendJson(res, 400, { error: 'Invalid registration', details: errors });

  if (findUserByUsername(value.username)) {
    return sendJson(res, 409, { error: 'That username is already taken.' });
  }

  const recoveryCode = generateRecoveryCode();
  const user = insertUser({
    username: value.username,
    passwordHash: await hashSecret(value.password),
    recoveryCodeHash: await hashSecret(recoveryCode),
  });

  sendJson(res, 201, { account: publicUser(user), recoveryCode });
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

export async function recover(req, res) {
  const body = await readBodyOr400(req, res);
  if (body === undefined) return;

  const username = typeof body.username === 'string' ? body.username.trim().toLowerCase() : '';
  const recoveryCode = typeof body.recoveryCode === 'string' ? body.recoveryCode.trim() : '';
  const { valid: passwordValid, errors: passwordErrors, value } = validateCredentials({
    username, password: body.newPassword,
  });

  const rateLimitKey = `recover:${username}`;
  if (isRateLimited(rateLimitKey)) {
    return sendJson(res, 429, { error: 'Too many attempts. Wait a while before trying again.' });
  }

  const user = findUserByUsername(username);
  const codeOk = user ? await verifySecret(recoveryCode, user.recoveryCodeHash) : false;

  if (!user || !codeOk || !passwordValid) {
    recordFailedAttempt(rateLimitKey);
    return sendJson(res, 400, {
      error: 'Invalid username, recovery code, or new password.',
      details: passwordValid ? undefined : passwordErrors,
    });
  }
  clearAttempts(rateLimitKey);

  const newRecoveryCode = generateRecoveryCode();
  updateUserPassword(user.id, {
    passwordHash: await hashSecret(value.password),
    recoveryCodeHash: await hashSecret(newRecoveryCode),
  });
  destroyAllSessionsForUser(user.id);

  sendJson(res, 200, {
    message: 'Password changed. Save your new recovery code below; it will not be shown again.',
    recoveryCode: newRecoveryCode,
  });
}

// Account deletion asks for the current password again, the same rule
// Course 5.2 used. deleteUser(id) alone is enough to also remove every scene
// this account owns and every annotation it wrote — see the comment above
// deleteUser in db.js.
export async function removeAccount(req, res, auth) {
  if (!requireCsrf(req, auth.session, res)) return;

  const body = await readBodyOr400(req, res);
  if (body === undefined) return;

  const password = typeof body.password === 'string' ? body.password : '';
  if (!(await verifySecret(password, auth.user.passwordHash))) {
    return sendJson(res, 401, { error: 'Incorrect password.' });
  }

  deleteUser(auth.user.id);
  destroyAllSessionsForUser(auth.user.id);
  clearSessionCookie(res);
  sendNoContent(res);
}

// --- Scenes ------------------------------------------------------------------
// Row-level permissions, enforced the same way every time: an owner may read
// and write their own row; anyone signed in may read a row someone else
// owns only if is_public is true; nobody else may write it at all. Every
// function below checks scene.ownerId against auth.user.id itself — none of
// them trust a client-sent id to say who the caller is.

function sceneSummary(scene) {
  return {
    id: scene.id,
    name: scene.name,
    isPublic: scene.isPublic,
    ownerId: scene.ownerId,
    ownerUsername: scene.ownerUsername,
    createdAt: scene.createdAt,
    updatedAt: scene.updatedAt,
  };
}

function sceneDetail(scene) {
  return {
    ...sceneSummary(scene),
    objects: listSceneObjects(scene.id),
    annotations: listAnnotationsForScene(scene.id),
  };
}

export async function createScene(req, res, auth) {
  if (!requireCsrf(req, auth.session, res)) return;

  const body = await readBodyOr400(req, res);
  if (body === undefined) return;

  const meta = validateSceneMeta(body);
  if (!meta.valid) return sendJson(res, 400, { error: 'Invalid scene', details: meta.errors });

  const objects = validateSceneObjects(body.objects);
  if (!objects.valid) return sendJson(res, 400, { error: 'Invalid scene objects', details: objects.errors });

  const scene = insertScene({ ownerId: auth.user.id, name: meta.value.name, isPublic: meta.value.isPublic });
  replaceSceneObjects(scene.id, objects.value);

  sendJson(res, 201, sceneDetail({ ...scene, ownerUsername: auth.user.username }));
}

export function listMyScenes(req, res, auth) {
  sendJson(res, 200, listScenesByOwner(auth.user.id).map(sceneSummary));
}

export function listPublicSceneGallery(req, res) {
  sendJson(res, 200, listPublicScenes().map(sceneSummary));
}

// Shared by every route below that needs one scene: looks it up once, and
// answers with the right status code for the two ways "no" can happen. A
// private scene that is not yours answers 404, not 403 — the same choice
// Course 5.2 made for "wrong username or wrong password" — so a client
// cannot use the status code to learn that a scene id exists at all.
function loadSceneOr404(res, sceneId) {
  const scene = getSceneById(sceneId);
  if (!scene) {
    sendJson(res, 404, { error: 'Scene not found.' });
    return null;
  }
  return scene;
}

export function getScene(req, res, auth, sceneId) {
  const scene = loadSceneOr404(res, sceneId);
  if (!scene) return;
  if (scene.ownerId !== auth.user.id && !scene.isPublic) {
    return sendJson(res, 404, { error: 'Scene not found.' });
  }
  sendJson(res, 200, sceneDetail(scene));
}

export async function updateScene(req, res, auth, sceneId) {
  const scene = loadSceneOr404(res, sceneId);
  if (!scene) return;
  if (scene.ownerId !== auth.user.id) {
    // Confirms the scene exists but is not this caller's to change — a
    // reasonable trade-off for an edit endpoint, unlike getScene above,
    // since reaching this branch already required a valid, unexpired
    // session.
    return sendJson(res, 403, { error: 'Only the owner can edit this scene.' });
  }
  if (!requireCsrf(req, auth.session, res)) return;

  const body = await readBodyOr400(req, res);
  if (body === undefined) return;

  const meta = validateSceneMeta(body);
  if (!meta.valid) return sendJson(res, 400, { error: 'Invalid scene', details: meta.errors });

  const objects = validateSceneObjects(body.objects);
  if (!objects.valid) return sendJson(res, 400, { error: 'Invalid scene objects', details: objects.errors });

  updateSceneMeta(sceneId, meta.value);
  replaceSceneObjects(sceneId, objects.value);

  sendJson(res, 200, sceneDetail({ ...getSceneById(sceneId) }));
}

export function removeScene(req, res, auth, sceneId) {
  const scene = loadSceneOr404(res, sceneId);
  if (!scene) return;
  if (scene.ownerId !== auth.user.id) {
    return sendJson(res, 403, { error: 'Only the owner can delete this scene.' });
  }
  if (!requireCsrf(req, auth.session, res)) return;

  deleteScene(sceneId); // cascades to this scene's objects and annotations
  sendNoContent(res);
}

// --- Annotations -----------------------------------------------------------
// Only a scene's owner may add or remove an annotation on it in this
// lesson's schema (see 004_create_annotations.sql for why created_by is
// still its own column, ready for a looser rule later).

export async function addAnnotation(req, res, auth, sceneId) {
  const scene = loadSceneOr404(res, sceneId);
  if (!scene) return;
  if (scene.ownerId !== auth.user.id) {
    return sendJson(res, 403, { error: 'Only the owner can annotate this scene.' });
  }
  if (!requireCsrf(req, auth.session, res)) return;

  const body = await readBodyOr400(req, res);
  if (body === undefined) return;

  const { valid, errors, value } = validateAnnotation(body);
  if (!valid) return sendJson(res, 400, { error: 'Invalid annotation', details: errors });

  const annotation = insertAnnotation({
    sceneId, exhibitId: value.exhibitId, text: value.text, createdBy: auth.user.id,
  });
  sendJson(res, 201, annotation);
}

export function removeAnnotation(req, res, auth, sceneId, annotationId) {
  const scene = loadSceneOr404(res, sceneId);
  if (!scene) return;
  const annotation = getAnnotationById(annotationId);
  if (!annotation || annotation.sceneId !== sceneId) {
    return sendJson(res, 404, { error: 'Annotation not found.' });
  }
  if (scene.ownerId !== auth.user.id) {
    return sendJson(res, 403, { error: 'Only the owner can remove this annotation.' });
  }
  if (!requireCsrf(req, auth.session, res)) return;

  deleteAnnotation(annotationId);
  sendNoContent(res);
}
