// server.js: starts one HTTP server with two jobs, the same split every
// full-stack-spatial lesson has used. Requests to /api/... go to routes.js;
// every other GET request serves a file from the client folder next door
// (../), so the same page works whether or not this server is running (with
// AI features simply unavailable — see js/main.js's offline handling).

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { seedIfEmpty } from './db.js';
import {
  addAnnotation, aiStatus, createScene, generateDescription, getScene, listMyScenes, removeAnnotation,
  removeScene, saveDescriptionRoute, searchScenesRoute, sendJson, updateSceneRoute,
} from './routes.js';

const HERE = dirname(fileURLToPath(import.meta.url));
try {
  process.loadEnvFile(join(HERE, '.env'));
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

// Wrapped in a try/catch here (unlike the finished completed/server.js):
// seedIfEmpty() calls db.js's insertScene, which is TODO 1, so this would
// otherwise crash the server before you had written a single line — a
// server that starts, but with no seed data yet, is far more useful to test
// TODOs 3 onward against.
try {
  seedIfEmpty();
} catch (error) {
  console.warn(`Seed data was not created (expected until TODO 1 is done): ${error.message}`);
}

const PORT = Number(process.env.PORT) || 8886;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || `http://127.0.0.1:${PORT}`;
const CLIENT_DIR = join(HERE, '..');

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

async function serveStatic(pathname, res) {
  const requestedPath = pathname === '/' ? '/index.html' : pathname;
  const filePath = normalize(join(CLIENT_DIR, requestedPath));
  if (!filePath.startsWith(CLIENT_DIR)) return sendJson(res, 400, { error: 'Invalid path' });
  try {
    const data = await readFile(filePath);
    const type = CONTENT_TYPES[extname(filePath)] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'Content-Length': data.length });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
}

// Path-parameter routes, matched with small regular expressions — the same
// no-router-package choice every lesson in this course has made.
const SCENE_PATH = /^\/api\/scenes\/([^/]+)$/;
const ANNOTATIONS_PATH = /^\/api\/scenes\/([^/]+)\/annotations$/;
const ANNOTATION_PATH = /^\/api\/scenes\/([^/]+)\/annotations\/([^/]+)$/;
// TODO 16: two more path-parameter routes, matching the same style as the
// three above:
//   DESCRIBE_PATH    matches "/api/scenes/<id>/describe"     (captures <id>)
//   DESCRIPTION_PATH matches "/api/scenes/<id>/description"  (captures <id>)

const server = createServer(async (req, res) => {
  try {
    setCorsHeaders(res);
    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

    const { pathname } = new URL(req.url, `http://${req.headers.host}`);

    if (pathname === '/api/ai/status' && req.method === 'GET') return aiStatus(req, res);
    if (pathname === '/api/search' && req.method === 'POST') return await searchScenesRoute(req, res);
    if (pathname === '/api/scenes' && req.method === 'GET') return listMyScenes(req, res);
    if (pathname === '/api/scenes' && req.method === 'POST') return await createScene(req, res);

    // TODO 16: wire the two new routes here, above the existing
    // annotation/scene matching below (so a more specific path like
    // "/api/scenes/<id>/describe" is never mistakenly matched by the more
    // general SCENE_PATH pattern further down):
    //   - POST on DESCRIBE_PATH    -> await generateDescription(req, res, <id>)
    //   - PUT  on DESCRIPTION_PATH -> await saveDescriptionRoute(req, res, <id>)
    // Follow the `const match = pathname.match(SOME_PATH); if (match) { ... }`
    // shape used by annotationMatch and annotationsMatch just below.

    const annotationMatch = pathname.match(ANNOTATION_PATH);
    if (annotationMatch) {
      if (req.method === 'DELETE') return removeAnnotation(req, res, annotationMatch[1], annotationMatch[2]);
      res.setHeader('Allow', 'DELETE, OPTIONS');
      return sendJson(res, 405, { error: 'Method not allowed' });
    }

    const annotationsMatch = pathname.match(ANNOTATIONS_PATH);
    if (annotationsMatch) {
      if (req.method === 'POST') return await addAnnotation(req, res, annotationsMatch[1]);
      res.setHeader('Allow', 'POST, OPTIONS');
      return sendJson(res, 405, { error: 'Method not allowed' });
    }

    const sceneMatch = pathname.match(SCENE_PATH);
    if (sceneMatch) {
      const [, id] = sceneMatch;
      if (req.method === 'GET') return getScene(req, res, id);
      if (req.method === 'PUT') return await updateSceneRoute(req, res, id);
      if (req.method === 'DELETE') return removeScene(req, res, id);
      res.setHeader('Allow', 'GET, PUT, DELETE, OPTIONS');
      return sendJson(res, 405, { error: 'Method not allowed' });
    }

    if (pathname.startsWith('/api/')) return sendJson(res, 404, { error: 'Not found' });

    if (req.method === 'GET') return await serveStatic(pathname, res);

    sendJson(res, 404, { error: 'Not found' });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: 'Internal server error' });
  }
});

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  server.listen(PORT, () => {
    console.log(`AI-assisted scene tool listening on http://127.0.0.1:${PORT} (AI_PROVIDER=${process.env.AI_PROVIDER || 'mock'})`);
  });
}

export { server };
