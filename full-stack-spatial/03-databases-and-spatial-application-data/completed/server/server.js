// server.js: starts one HTTP server with two jobs, the same split Courses
// 5.1 and 5.2 used. Requests to /api/... go to routes.js; every other GET
// request serves a file from the client folder next door (../), so the
// same page works whether or not this server is running.
//
// New in this lesson: two routes carry an id in their path
// (/api/scenes/<id> and /api/scenes/<id>/annotations/<id>). This server has
// no router package to match them for it — the same "no dependencies"
// choice Courses 5.1 and 5.2 made — so it matches them with two small
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

const server = createServer(async (req, res) => {
  try {
    setCorsHeaders(res);

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    req.cookies = parseCookies(req.headers.cookie);
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);

    // Routes that work without a session: creating one (register), starting
    // one (login), replacing a forgotten password (recover), and reading
    // the public scene gallery.
    if (pathname === '/api/auth/register' && req.method === 'POST') return await register(req, res);
    if (pathname === '/api/auth/login' && req.method === 'POST') return await login(req, res);
    if (pathname === '/api/auth/recover' && req.method === 'POST') return await recover(req, res);
    if (pathname === '/api/scenes/public' && req.method === 'GET') return listPublicSceneGallery(req, res);

    if (pathname === '/api/auth/logout' && req.method === 'POST') {
      const auth = await requireAuth(req);
      if (!auth) { res.writeHead(204); res.end(); return; }
      return logout(req, res, auth);
    }

    // Everything else under /api/ needs a valid, unexpired session — reading
    // one specific scene included, even a public one: this course keeps
    // "who is asking" answered the same way everywhere, rather than only
    // some routes checking for a cookie.
    if (pathname.startsWith('/api/')) {
      const auth = await requireAuth(req);
      if (!auth) return sendJson(res, 401, { error: 'Sign in required.' });

      if (pathname === '/api/auth/me' && req.method === 'GET') return me(req, res, auth);
      if (pathname === '/api/account' && req.method === 'DELETE') return await removeAccount(req, res, auth);

      if (pathname === '/api/scenes' && req.method === 'GET') return listMyScenes(req, res, auth);
      if (pathname === '/api/scenes' && req.method === 'POST') return await createScene(req, res, auth);

      const annotationMatch = pathname.match(ANNOTATION_PATH);
      if (annotationMatch) {
        const [, sceneId, annotationId] = annotationMatch;
        if (req.method === 'DELETE') return removeAnnotation(req, res, auth, sceneId, annotationId);
        res.setHeader('Allow', 'DELETE, OPTIONS');
        return sendJson(res, 405, { error: 'Method not allowed' });
      }

      const annotationsMatch = pathname.match(ANNOTATIONS_PATH);
      if (annotationsMatch) {
        const [, sceneId] = annotationsMatch;
        if (req.method === 'POST') return await addAnnotation(req, res, auth, sceneId);
        res.setHeader('Allow', 'POST, OPTIONS');
        return sendJson(res, 405, { error: 'Method not allowed' });
      }

      const sceneMatch = pathname.match(SCENE_PATH);
      if (sceneMatch) {
        const [, sceneId] = sceneMatch;
        if (req.method === 'GET') return getScene(req, res, auth, sceneId);
        if (req.method === 'PUT') return await updateScene(req, res, auth, sceneId);
        if (req.method === 'DELETE') return removeScene(req, res, auth, sceneId);
        res.setHeader('Allow', 'GET, PUT, DELETE, OPTIONS');
        return sendJson(res, 405, { error: 'Method not allowed' });
      }

      return sendJson(res, 404, { error: 'Not found' });
    }

    if (req.method === 'GET') {
      return await serveStatic(pathname, res);
    }

    sendJson(res, 404, { error: 'Not found' });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: 'Internal server error' });
  }
});

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  server.listen(PORT, () => {
    console.log(`Scenes and annotations server listening on http://127.0.0.1:${PORT}`);
  });
}

export { server };
