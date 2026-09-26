// server.js: one node:http server, the same shape Courses 5.1-5.4 used --
// requests to /api/... go to routes.js, everything else is served as a
// static file from the client folder next door, and an `upgrade` event
// turns a /ws request into the chat WebSocket from Course 5.4, after
// wsAuth.js confirms a valid session cookie. This server only ever binds to
// 127.0.0.1: it is built to be run and reviewed on your own machine, never
// exposed to a network.
//
// FIXED (TODO 3): every response carries a Content-Security-Policy header
// with no 'unsafe-inline' in script-src -- the directive that matters most,
// because it is the one that would otherwise let an injected <script> run
// even after TODO 1 and TODO 2's stored-XSS fixes. style-src still allows
// 'unsafe-inline' because A-Frame sets element styles directly at runtime,
// a widely known limitation of most WebGL/3D libraries; that is an
// acceptable trade here because a CSS-only injection cannot execute
// JavaScript or read cookies, and nothing in this app builds inline styles
// from user text. See MDN's Content-Security-Policy article and the
// README's "Content Security Policy" section.
//
// FIXED (TODO 6): the catch-all handler at the bottom of this file logs the
// full error on the server (console.error) but sends the client only a
// fixed, generic message -- never error.message or error.stack. See the
// README's "Verbose error messages" section.

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

// No 'unsafe-inline' anywhere in script-src: this page's own scripts are
// all external files (js/main.js, js/net.js, js/scene.js, A-Frame's own
// aframe.min.js), so nothing here needs it. connect-src 'self' also covers
// this same-origin page's ws:// upgrade (WHATWG Fetch's "same origin"
// check applies the same way to ws/wss as to http/https). cdn.aframe.io is
// allowed in connect-src and img-src only because A-Frame's text component
// fetches its default font (a small JSON descriptor plus a texture atlas)
// from there, by default, on every page that uses <a-entity text="...">
// -- a real asset this library needs to render text at all, not a
// tracker or a third-party script.
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' https://aframe.io",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://cdn.aframe.io",
  "connect-src 'self' https://cdn.aframe.io",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

function setSecurityHeaders(res) {
  res.setHeader('Content-Security-Policy', CONTENT_SECURITY_POLICY);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
}

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
    setSecurityHeaders(res);
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
    // FIXED (TODO 6): the full error, with its stack trace, is logged here
    // -- for you, reading this terminal -- and never put in the response
    // body a browser (or an attacker) can read.
    console.error(error);
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
