// server.js: starts one HTTP server with two jobs, the same split Course
// 5.1 used. Requests to /api/... go to routes.js; every other GET request
// serves a file from the client folder next door (../), so the same page
// works whether or not this server is running — see completed/js/main.js
// for what the page shows when it is not.
//
// New in this lesson: req.cookies (a plain object this file parses from
// the "cookie" header, before any route sees the request) and a CORS setup
// that allows credentials. Course 5.1's API used
// Access-Control-Allow-Origin: "*", which is fine for a no-login API — it
// stops being fine the moment a cookie is involved, because a browser
// refuses to expose a credentialed (cookie-carrying) response to a page
// whose origin was answered with "*". This server names one exact origin
// instead.

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  exportAccount, getCuratorNote, getSettings, listSharedAccounts, login, logout, me,
  putCuratorNote, putSettings, recover, register, removeAccount, requireAuth,
  resetSettings, sendJson, updatePrivacy,
} from './routes.js';

const HERE = dirname(fileURLToPath(import.meta.url));
try {
  process.loadEnvFile(join(HERE, '.env'));
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const PORT = Number(process.env.PORT) || 8878;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://127.0.0.1:8878';
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
// { name: 'value', name2: 'value2' }. decodeURIComponent undoes the
// encoding a browser applies to a cookie value that contains characters
// like "=" or ";" (none of this project's values do, but a general parser
// should not assume that).
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
    // the curator's note, which is public.
    if (pathname === '/api/auth/register' && req.method === 'POST') return await register(req, res);
    if (pathname === '/api/auth/login' && req.method === 'POST') return await login(req, res);
    if (pathname === '/api/auth/recover' && req.method === 'POST') return await recover(req, res);
    if (pathname === '/api/curator/note' && req.method === 'GET') return await getCuratorNote(req, res);

    if (pathname === '/api/auth/logout' && req.method === 'POST') {
      const auth = await requireAuth(req);
      if (!auth) { res.writeHead(204); res.end(); return; }
      return logout(req, res, auth);
    }

    // Everything else under /api/ needs a valid, unexpired session.
    if (pathname.startsWith('/api/')) {
      const auth = await requireAuth(req);
      if (!auth) return sendJson(res, 401, { error: 'Sign in required.' });

      if (pathname === '/api/auth/me' && req.method === 'GET') return me(req, res, auth);

      if (pathname === '/api/settings') {
        if (req.method === 'GET') return await getSettings(req, res, auth);
        if (req.method === 'PUT') return await putSettings(req, res, auth);
        if (req.method === 'DELETE') return await resetSettings(req, res, auth);
        res.setHeader('Allow', 'GET, PUT, DELETE, OPTIONS');
        return sendJson(res, 405, { error: 'Method not allowed' });
      }

      if (pathname === '/api/curator/note' && req.method === 'PUT') return await putCuratorNote(req, res, auth);
      if (pathname === '/api/curator/accounts' && req.method === 'GET') return await listSharedAccounts(req, res, auth);
      if (pathname === '/api/account/export' && req.method === 'GET') return await exportAccount(req, res, auth);
      if (pathname === '/api/account/privacy' && req.method === 'PUT') return await updatePrivacy(req, res, auth);
      if (pathname === '/api/account' && req.method === 'DELETE') return await removeAccount(req, res, auth);

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
    console.log(`Account server listening on http://127.0.0.1:${PORT}`);
  });
}

export { server };
