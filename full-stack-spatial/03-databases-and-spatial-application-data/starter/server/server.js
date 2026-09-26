// server.js: starts one HTTP server with two jobs, the same split Courses
// 5.1 and 5.2 used. Requests to /api/... go to routes.js; every other GET
// request serves a file from the client folder next door (../), so the
// same page works whether or not this server is running.
//
// New in this lesson: two routes carry an id in their path
// (/api/scenes/<id> and /api/scenes/<id>/annotations/<id>). This server has
// no router package to match them for it — the same "no dependencies"
// choice Courses 5.1 and 5.2 made — so TODO 11 matches them with two small
// regular expressions instead.

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  addAnnotation, createScene, getScene, listMyScenes, listPublicSceneGallery, login, logout, me,
  recover, register, removeAccount, removeAnnotation, removeScene, requireAuth, sendJson,
  updateScene,
} from './routes.js';

const HERE = dirname(fileURLToPath(import.meta.url));
try {
  process.loadEnvFile(join(HERE, '.env'));
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const PORT = Number(process.env.PORT) || 8879;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://127.0.0.1:8879';
const CLIENT_DIR = join(HERE, '..');

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};

// A small, hand-written cookie parser: "name=value; name2=value2" becomes
// { name: 'value', name2: 'value2' }.
function parseCookies(header) {
  const cookies = {};
  if (!header) return cookies;
  for (const pair of header.split(';')) {
    const index = pair.indexOf('=');
    if (index === -1) continue;
    cookies[pair.slice(0, index).trim()] = decodeURIComponent(pair.slice(index + 1).trim());
  }
  return cookies;
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token');
}

async function serveStatic(pathname, res) {
  const requestedPath = pathname === '/' ? '/index.html' : pathname;
  const filePath = normalize(join(CLIENT_DIR, requestedPath));
  if (!filePath.startsWith(CLIENT_DIR)) {
    return sendJson(res, 400, { error: 'Invalid path' });
  }
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

// Matches "/api/scenes/<id>" (and captures <id>), but not
// "/api/scenes/<id>/annotations/...", which the next pattern owns instead.
const SCENE_PATH = /^\/api\/scenes\/([^/]+)$/;
const ANNOTATIONS_PATH = /^\/api\/scenes\/([^/]+)\/annotations$/;
const ANNOTATION_PATH = /^\/api\/scenes\/([^/]+)\/annotations\/([^/]+)$/;

// TODO 11: finish parseCookies (above; it is already done for you this
// time), setCorsHeaders (also already done), and the request listener
// passed to createServer below.
//
// The request listener (replacing the placeholder below) should:
//   1. Call setCorsHeaders(res). Answer an OPTIONS request immediately with
//      res.writeHead(204); res.end(); and return.
//   2. Set req.cookies = parseCookies(req.headers.cookie), and read
//      pathname from `new URL(req.url, \`http://${req.headers.host}\`)`.
//   3. Handle the routes that need no session first: POST
//      /api/auth/register, POST /api/auth/login, POST /api/auth/recover,
//      and GET /api/scenes/public (the gallery is public).
//   4. Handle POST /api/auth/logout: call requireAuth(req) — if it finds no
//      session, just res.writeHead(204); res.end(); otherwise call
//      logout(req, res, auth).
//   5. For every other pathname starting with '/api/': call
//      const auth = await requireAuth(req); if there is none, sendJson(res,
//      401, { error: 'Sign in required.' }). Otherwise route to:
//        - GET /api/auth/me -> me
//        - DELETE /api/account -> removeAccount
//        - GET /api/scenes -> listMyScenes
//        - POST /api/scenes -> createScene
//        - pathname.match(ANNOTATION_PATH) -> [sceneId, annotationId];
//          DELETE -> removeAnnotation(req, res, auth, sceneId, annotationId)
//          (405 with an Allow header for any other method)
//        - pathname.match(ANNOTATIONS_PATH) -> [sceneId]; POST ->
//          addAnnotation(req, res, auth, sceneId) (405 otherwise)
//        - pathname.match(SCENE_PATH) -> [sceneId]; GET -> getScene, PUT ->
//          updateScene, DELETE -> removeScene (405 otherwise)
//      Anything else under '/api/' that matches nothing: sendJson 404.
//   6. Otherwise, a GET request: await serveStatic(pathname, res).
//   7. Otherwise: sendJson 404.
// Wrap the whole thing in try/catch: on catch, console.error(error) and
// sendJson(res, 500, { error: 'Internal server error' }).
const server = createServer(async (req, res) => {
  sendJson(res, 200, { ok: true }); // replace this once TODO 11 is done
});

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  server.listen(PORT, () => {
    console.log(`Scenes and annotations server listening on http://127.0.0.1:${PORT}`);
  });
}

export { server };
