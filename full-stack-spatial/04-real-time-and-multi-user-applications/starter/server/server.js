// server.js: one node:http server with three jobs. Requests to /api/...
// go to routes.js, exactly as in Courses 5.1-5.3. Every other GET request
// serves a file from the client folder next door (../), so the same page
// works whether or not this server is running. New in this lesson: an
// `upgrade` event turns a plain HTTP request whose path is /ws into a
// long-lived WebSocket connection — but only after wsAuth.js has confirmed
// the request carries a valid session cookie. A browser cannot be stopped
// from *attempting* the upgrade without one; this server can, and does,
// refuse to complete it.
//
// Everything except the `upgrade` handler (TODO 10) is finished for you.

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { WebSocketServer } from 'ws';
import {
  login, logout, me, register, requireAuth, sendJson,
} from './routes.js';
import { parseCookies } from './cookies.js';
import { authenticateUpgrade } from './wsAuth.js';
import { handleConnection, heartbeat } from './realtime.js';
import { KNOWN_ROOMS, membersOf } from './rooms.js';

const HERE = dirname(fileURLToPath(import.meta.url));
try {
  process.loadEnvFile(join(HERE, '.env'));
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const PORT = Number(process.env.PORT) || 8880;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://127.0.0.1:8880';
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

    if (pathname.startsWith('/api/')) return sendJson(res, 404, { error: 'Not found' });

    if (req.method === 'GET') return await serveStatic(pathname, res);

    sendJson(res, 404, { error: 'Not found' });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: 'Internal server error' });
  }
});

// `noServer: true` — the standard way to combine a WebSocket server with an
// existing node:http server: `wss` never listens on its own port, and never
// gets to see a request until this file's own `upgrade` handler below has
// decided the request is allowed to proceed at all.
const wss = new WebSocketServer({ noServer: true });

// TODO 10: handle the http server's 'upgrade' event.
//
// server.on('upgrade', (req, socket, head) => { ... }) fires for every
// request that asks to switch protocols — before ws has touched anything.
// Inside it:
//   1. Parse `req.url` the same way the request handler above does
//      (`new URL(req.url, \`http://${req.headers.host}\`)`), and read
//      pathname and searchParams from it.
//   2. If pathname is not '/ws', call socket.destroy() and return — this
//      server has nothing else to upgrade.
//   3. Call authenticateUpgrade(req) (TODO 4). If it returns null, this
//      request has no valid session: write a plain HTTP response directly
//      to the socket (a WebSocket handshake never started, so routes.js's
//      JSON helpers do not apply) —
//      socket.write('HTTP/1.1 401 Unauthorized\r\nConnection: close\r\n\r\n')
//      — then socket.destroy() and return.
//   4. Otherwise, read roomId from searchParams.get('room'), defaulting to
//      'main-hall' if absent, and call
//      wss.handleUpgrade(req, socket, head, (ws) => {
//        handleConnection(ws, { user: auth.user, roomId });
//      });
//
// Without this handler, every WebSocket connection attempt from js/net.js
// will simply hang until the browser times it out — there is nothing here
// yet to answer the upgrade request at all.

// Every 30 seconds, ping every member of every known room and terminate any
// connection that did not answer the previous ping — see realtime.js's
// heartbeat() and its comment on why a closed laptop lid needs this.
const heartbeatInterval = setInterval(() => {
  for (const roomId of KNOWN_ROOMS) {
    for (const member of membersOf(roomId)) heartbeat(member);
  }
}, 30_000);
heartbeatInterval.unref?.(); // never keeps the process alive by itself (matters for server.test.js)

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  server.listen(PORT, () => {
    console.log(`Real-time room server listening on http://127.0.0.1:${PORT}`);
  });
}

export { server };
