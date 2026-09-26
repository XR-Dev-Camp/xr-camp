// DELIBERATELY VULNERABLE -- for learning on localhost only; never deploy.
//
// server.js: one node:http server, the same shape Courses 5.1-5.4 used --
// requests to /api/... go to routes.js, everything else is served as a
// static file from the client folder next door, and an `upgrade` event
// turns a /ws request into the chat WebSocket from Course 5.4, after
// wsAuth.js confirms a valid session cookie. This server only ever binds to
// 127.0.0.1: it is built to be run and reviewed on your own machine, never
// exposed to a network.
//
// TODO 3: no response here ever sets a Content-Security-Policy header. A
// browser with no CSP applies none of the restrictions CSP can add on top
// of the rest of this app's defences -- so if TODO 1 or TODO 2's stored-XSS
// bugs are not yet fixed, an injected `<script>` runs with no extra layer
// stopping it. See MDN's Content-Security-Policy article and the README's
// "Content Security Policy" section for what a strict policy adds even
// after the stored-XSS bugs above are fixed.
//
// TODO 6: the catch-all handler at the bottom of this file sends
// `error.message` and `error.stack` straight to the client on every
// unhandled exception. See the README's "Verbose error messages" section
// for why a stack trace is a gift to an attacker (file paths, package
// versions, sometimes a query fragment) and worth nothing to a normal
// learner using this app, who only needs to know something went wrong.

import './env.js'; // must be the first import: see env.js's own comment
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { WebSocketServer } from 'ws';
import {
  adminStats, createAnnotation, createScene, formatServerError, getScene, listMyScenes,
  login, logout, me, register, requireAuth, sendJson,
} from './routes.js';
import { parseCookies } from './cookies.js';
import { authenticateUpgrade } from './wsAuth.js';
import { handleConnection, heartbeat } from './realtime.js';
import { KNOWN_ROOMS, membersOf } from './rooms.js';

const HERE = dirname(fileURLToPath(import.meta.url));

const PORT = Number(process.env.PORT) || 8890;
const HOST = '127.0.0.1'; // never 0.0.0.0: this server is for localhost review only
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
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token, X-Admin-Token');
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
    const sceneMatch = pathname.match(/^\/api\/scenes\/([^/]+)(\/annotations)?$/);

    if (pathname === '/api/auth/register' && req.method === 'POST') return await register(req, res);
    if (pathname === '/api/auth/login' && req.method === 'POST') return await login(req, res);

    if (pathname === '/api/auth/logout' && req.method === 'POST') {
      const auth = await requireAuth(req);
      if (!auth) { res.writeHead(204); res.end(); return; }
      return logout(req, res, auth);
    }

    if (pathname === '/api/auth/me' && req.method === 'GET') {
      const auth = await requireAuth(req);
      if (!auth) return sendJson(res, 401, { error: 'Sign in required.' });
      return me(req, res, auth);
    }

    if (pathname === '/api/admin/stats' && req.method === 'GET') return adminStats(req, res);

    if (pathname === '/api/scenes' && req.method === 'POST') {
      const auth = await requireAuth(req);
      if (!auth) return sendJson(res, 401, { error: 'Sign in required.' });
      return await createScene(req, res, auth);
    }

    if (pathname === '/api/scenes' && req.method === 'GET') {
      const auth = await requireAuth(req);
      if (!auth) return sendJson(res, 401, { error: 'Sign in required.' });
      return listMyScenes(req, res, auth);
    }

    if (sceneMatch && !sceneMatch[2] && req.method === 'GET') {
      const auth = await requireAuth(req);
      if (!auth) return sendJson(res, 401, { error: 'Sign in required.' });
      return getScene(req, res, auth, sceneMatch[1]);
    }

    if (sceneMatch && sceneMatch[2] && req.method === 'POST') {
      const auth = await requireAuth(req);
      if (!auth) return sendJson(res, 401, { error: 'Sign in required.' });
      return await createAnnotation(req, res, auth, sceneMatch[1]);
    }

    if (pathname.startsWith('/api/')) return sendJson(res, 404, { error: 'Not found' });

    if (req.method === 'GET') return await serveStatic(pathname, res);

    sendJson(res, 404, { error: 'Not found' });
  } catch (error) {
    console.error(error);
    // TODO 6: see the file comment above.
    sendJson(res, 500, formatServerError(error));
  }
});

const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (req, socket, head) => {
  const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
  if (pathname !== '/ws') {
    socket.destroy();
    return;
  }

  const auth = authenticateUpgrade(req);
  if (!auth) {
    socket.write('HTTP/1.1 401 Unauthorized\r\nConnection: close\r\n\r\n');
    socket.destroy();
    return;
  }

  const roomId = searchParams.get('room') || 'review-room';
  wss.handleUpgrade(req, socket, head, (ws) => {
    handleConnection(ws, { user: auth.user, roomId });
  });
});

const heartbeatInterval = setInterval(() => {
  for (const roomId of KNOWN_ROOMS) {
    for (const member of membersOf(roomId)) heartbeat(member);
  }
}, 30_000);
heartbeatInterval.unref?.();

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  server.listen(PORT, HOST, () => {
    console.log(`Security and privacy lab listening on http://${HOST}:${PORT}`);
  });
}

export { server };
