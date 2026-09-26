// routes.js: one function per route. The scene CRUD routes (createScene
// through removeAnnotation) follow Course 5.3's shape, minus the account and
// permission checks it used — this lesson has no accounts (see db.js). The
// three AI routes at the bottom (describeScene, saveDescription,
// searchScenes) are this lesson's actual subject.

import {
  deleteAnnotation, deleteScene, getAnnotationById, getSceneById, insertAnnotation, insertScene,
  listAnnotationsForScene, listScenes, listSceneObjects, saveDescription as saveDescriptionToDb, updateScene,
} from './db.js';
import {
  AiConfigError, AiRequestError, AiResponseError, checkAiRateLimit, describeScene as describeSceneWithAi,
  providerInfo, searchScenes as searchScenesWithAi,
} from './ai.js';
import {
  validateAnnotation, validateDescriptionSave, validateSceneMeta, validateSceneObjects, validateSearchQuery,
} from './validation.js';

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

export function readJsonBody(req, { maxBytes = 200_000 } = {}) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > maxBytes) { reject(new Error('Request body too large')); req.destroy(); return; }
      chunks.push(chunk);
    });
    req.on('end', () => {
      const text = Buffer.concat(chunks).toString('utf8') || '{}';
      try { resolve(JSON.parse(text)); } catch { reject(new Error('Request body is not valid JSON')); }
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

function sceneDetail(scene) {
  return {
    ...scene, objects: listSceneObjects(scene.id), annotations: listAnnotationsForScene(scene.id),
  };
}

function loadSceneOr404(res, id) {
  const scene = getSceneById(id);
  if (!scene) { sendJson(res, 404, { error: 'Scene not found.' }); return null; }
  return scene;
}

// Every ai.js error becomes an HTTP response here, and only here — the same
// "one place decides the status code" rule Course 5.1 used for validation
// errors. A malformed or unreachable AI reply is never partially used: the
// scene is returned exactly as it already was, and nothing is saved.
function sendAiError(res, error) {
  if (error instanceof AiConfigError) return sendJson(res, 500, { error: `AI provider not configured: ${error.message}` });
  if (error instanceof AiRequestError) return sendJson(res, 502, { error: `AI provider request failed: ${error.message}` });
  if (error instanceof AiResponseError) return sendJson(res, 502, { error: `AI reply was invalid and was rejected: ${error.message}` });
  throw error;
}

// --- Scenes ------------------------------------------------------------------

export function listMyScenes(req, res) {
  sendJson(res, 200, listScenes());
}

export async function createScene(req, res) {
  const body = await readBodyOr400(req, res);
  if (body === undefined) return;
  const meta = validateSceneMeta(body);
  if (!meta.valid) return sendJson(res, 400, { error: 'Invalid scene', details: meta.errors });
  const objects = validateSceneObjects(body.objects);
  if (!objects.valid) return sendJson(res, 400, { error: 'Invalid scene objects', details: objects.errors });
  const scene = insertScene({ name: meta.value.name, isPublic: meta.value.isPublic, objects: objects.value });
  sendJson(res, 201, sceneDetail(scene));
}

export function getScene(req, res, id) {
  const scene = loadSceneOr404(res, id);
  if (!scene) return;
  sendJson(res, 200, sceneDetail(scene));
}

export async function updateSceneRoute(req, res, id) {
  const scene = loadSceneOr404(res, id);
  if (!scene) return;
  const body = await readBodyOr400(req, res);
  if (body === undefined) return;
  const meta = validateSceneMeta(body);
  if (!meta.valid) return sendJson(res, 400, { error: 'Invalid scene', details: meta.errors });
  const objects = validateSceneObjects(body.objects);
  if (!objects.valid) return sendJson(res, 400, { error: 'Invalid scene objects', details: objects.errors });
  const updated = updateScene(id, { name: meta.value.name, isPublic: meta.value.isPublic, objects: objects.value });
  sendJson(res, 200, sceneDetail(updated));
}

export function removeScene(req, res, id) {
  const scene = loadSceneOr404(res, id);
  if (!scene) return;
  deleteScene(id); // cascades to this scene's objects, annotations, and any saved description
  sendNoContent(res);
}

// --- Annotations -----------------------------------------------------------

export async function addAnnotation(req, res, sceneId) {
  const scene = loadSceneOr404(res, sceneId);
  if (!scene) return;
  const body = await readBodyOr400(req, res);
  if (body === undefined) return;
  const { valid, errors, value } = validateAnnotation(body);
  if (!valid) return sendJson(res, 400, { error: 'Invalid annotation', details: errors });
  const annotation = insertAnnotation({ sceneId, exhibitId: value.exhibitId, text: value.text });
  sendJson(res, 201, annotation);
}

export function removeAnnotation(req, res, sceneId, annotationId) {
  const scene = loadSceneOr404(res, sceneId);
  if (!scene) return;
  const annotation = getAnnotationById(annotationId);
  if (!annotation || annotation.sceneId !== sceneId) return sendJson(res, 404, { error: 'Annotation not found.' });
  deleteAnnotation(annotationId);
  sendNoContent(res);
}

// --- AI: description drafts and human review ---------------------------------

// Generates a draft only. Nothing is written to the database here — see
// saveDescriptionRoute below, the only route that calls db.js's
// saveDescription, always after a person has read (and, if they chose,
// edited) the text this route returned.
export async function generateDescription(req, res, sceneId) {
  const scene = loadSceneOr404(res, sceneId);
  if (!scene) return;
  if (!checkAiRateLimit()) return sendJson(res, 429, { error: 'Too many AI requests. Wait a while before trying again.' });
  try {
    const result = await describeSceneWithAi(sceneDetail(scene));
    sendJson(res, 200, {
      description: result.description,
      warnings: result.warnings,
      provider: result.provider,
      dataSent: result.dataSent,
      savedDescription: scene.description,
    });
  } catch (error) {
    sendAiError(res, error);
  }
}

export async function saveDescriptionRoute(req, res, sceneId) {
  const scene = loadSceneOr404(res, sceneId);
  if (!scene) return;
  const body = await readBodyOr400(req, res);
  if (body === undefined) return;
  const { valid, errors, value } = validateDescriptionSave(body);
  if (!valid) return sendJson(res, 400, { error: 'Invalid description', details: errors });
  const updated = saveDescriptionToDb(sceneId, value.description);
  sendJson(res, 200, updated);
}

// --- AI: natural-language search ----------------------------------------------

export async function searchScenesRoute(req, res) {
  const body = await readBodyOr400(req, res);
  if (body === undefined) return;
  const { valid, errors, value } = validateSearchQuery(body);
  if (!valid) return sendJson(res, 400, { error: 'Invalid search', details: errors });
  if (!checkAiRateLimit()) return sendJson(res, 429, { error: 'Too many AI requests. Wait a while before trying again.' });

  const scenes = listScenes().map((scene) => sceneDetail(scene));
  try {
    const result = await searchScenesWithAi(value.query, scenes);
    const matches = result.matches.map((match) => ({
      scene: scenes.find((scene) => scene.id === match.sceneId),
      reason: match.reason,
    }));
    sendJson(res, 200, {
      query: value.query,
      matches,
      explanation: result.explanation,
      dropped: result.dropped,
      provider: result.provider,
    });
  } catch (error) {
    sendAiError(res, error);
  }
}

export function aiStatus(req, res) {
  sendJson(res, 200, {
    ...providerInfo(),
    disclosure: 'Scene descriptions and search results on this page are drafted by an AI language model from this project\'s own scene data (never from an image). Every description is shown as a draft you must review and save yourself; it is never saved automatically.',
  });
}
