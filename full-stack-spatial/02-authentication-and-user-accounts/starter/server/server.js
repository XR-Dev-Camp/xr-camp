// server.js: starts one HTTP server with two jobs, the same split Course
// 5.1 used. Requests to /api/... go to routes.js; every other GET request
// serves a file from the client folder next door (../).

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
// Unlike Course 5.1's read-only settings API, this one sets a cookie and
// expects it back on every request. A browser refuses to expose a
// credentialed (cookie-carrying) response to a page whose origin was
// answered with "*", so this server needs one exact origin.
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

// TODO 16: finish parseCookies, setCorsHeaders, and the request listener
// passed to createServer below.
//
// parseCookies(header) should turn a "cookie" header string like
// "a=1; b=2" into { a: '1', b: '2' }: return {} if header is falsy;
// otherwise split it on ';', and for each pair find the first '=' with
// indexOf, using everything before it (trimmed) as the key and everything
// after it (trimmed, then decodeURIComponent'd) as the value.
//
// setCorsHeaders(res) should set:
//   Access-Control-Allow-Origin: ALLOWED_ORIGIN
//   Access-Control-Allow-Credentials: 'true'
//   Access-Control-Allow-Methods: 'GET, POST, PUT, DELETE, OPTIONS'
//   Access-Control-Allow-Headers: 'Content-Type, X-CSRF-Token'
//
// The request listener (replacing the placeholder below) should:
//   1. Call setCorsHeaders(res). Answer an OPTIONS request immediately with
//      res.writeHead(204); res.end(); and return.
//   2. Set req.cookies = parseCookies(req.headers.cookie), and read
//      pathname from `new URL(req.url, \`http://${req.headers.host}\`)`.
//   3. Handle the routes that need no session first: POST
//      /api/auth/register, POST /api/auth/login, POST /api/auth/recover,
//      and GET /api/curator/note (the note is public).
//   4. Handle POST /api/auth/logout: call requireAuth(req) — if it finds no
//      session, just res.writeHead(204); res.end(); (logging out when
//      already signed out is not an error); otherwise call logout(req, res,
//      auth).
//   5. For every other pathname starting with '/api/': call
//      const auth = await requireAuth(req); if there is none, sendJson(res,
//      401, { error: 'Sign in required.' }). Otherwise route to: GET
//      /api/auth/me -> me; GET/PUT/DELETE /api/settings -> getSettings /
//      putSettings / resetSettings (405 with an Allow header for any other
//      method); PUT /api/curator/note -> putCuratorNote; GET
//      /api/curator/accounts -> listSharedAccounts; GET /api/account/export
//      -> exportAccount; PUT /api/account/privacy -> updatePrivacy; DELETE
//      /api/account -> removeAccount. Anything else under /api/ that
//      matches nothing: sendJson 404.
//   6. Otherwise, a GET request: await serveStatic(pathname, res).
//   7. Otherwise: sendJson 404.
// Wrap the whole thing in try/catch: on catch, console.error(error) and
// sendJson(res, 500, { error: 'Internal server error' }).
function parseCookies(header) {
  return {}; // replace with the real parser above
}

function setCorsHeaders(res) {
  // not implemented yet
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
  sendJson(res, 200, { ok: true }); // replace this once TODO 16 is done
});

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  server.listen(PORT, () => {
    console.log(`Account server listening on http://127.0.0.1:${PORT}`);
  });
}

export { server };
