// server.js: starts one HTTP server that does two jobs. Requests to
// /api/settings go to routes.js. Every other GET request serves a file from
// the client folder next door (../), the same page whether or not this
// server is running.
//
// Everything here is Node's built-in node:http: no framework, and no
// dependencies to install (package.json lists none).

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { deleteSettings, getSettings, putSettings, sendJson } from './routes.js';

// process.loadEnvFile() (Node 21.7+) reads a .env file into process.env,
// with no package to install. It is optional: a fresh checkout has no .env
// yet (see .env.example), so a missing file is not an error. Finished:
// nothing to do here.
const HERE = dirname(fileURLToPath(import.meta.url));
try {
  process.loadEnvFile(join(HERE, '.env'));
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

// TODO 1: read the port from the PORT environment variable (Number(...)),
// falling back to 8877 if it is not set or is not a number. Then create the
// server with createServer(...), giving it an async (req, res) => { ... }
// request listener. For now, before TODOs 7-9 exist, have that listener do
// nothing but sendJson(res, 200, { ok: true }), so you have something to
// test against with curl before building the real routes.
const PORT = 8877; // replace this with the environment-variable version
const server = createServer(async (req, res) => {
  sendJson(res, 200, { ok: true }); // replace this once TODO 7 exists
});

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';
// The client's HTML, CSS and JS live one folder up from server/.
const CLIENT_DIR = join(HERE, '..');

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};

// TODO 8: finish setCorsHeaders. Set three response headers:
//   Access-Control-Allow-Origin: ALLOWED_ORIGIN
//   Access-Control-Allow-Methods: "GET, PUT, DELETE, OPTIONS"
//   Access-Control-Allow-Headers: "Content-Type"
// Then, in the request listener (TODO 7), call this for every request, and
// answer an OPTIONS request immediately with res.writeHead(204); res.end();
// — that is the CORS "preflight" request a browser sends before a PUT or
// DELETE with a JSON body, and it carries no body of its own.
function setCorsHeaders(res) {
  // not implemented yet
}

// TODO 9: finish serveStatic. It should:
//   1. Treat "/" as "/index.html".
//   2. Build filePath with normalize(join(CLIENT_DIR, requestedPath)), and
//      check filePath.startsWith(CLIENT_DIR); if it does not, sendJson(res,
//      400, { error: 'Invalid path' }) and return. (normalize() collapses
//      "..", so this check stops a request from reading files outside
//      CLIENT_DIR — Course 5.5 studies this bug, called path traversal, in
//      depth.)
//   3. Try readFile(filePath); on success, look up its Content-Type in
//      CONTENT_TYPES by extname(filePath) (default
//      'application/octet-stream'), then res.writeHead(200, { ... }) and
//      res.end(data).
//   4. On failure (the file does not exist), respond 404 with a short
//      plain-text body.
async function serveStatic(pathname, res) {
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found');
}

// TODO 7: rewrite the request listener passed to createServer above (the
// one that currently always sends { ok: true }) so it:
//   1. Calls setCorsHeaders(res) first, for every request.
//   2. If req.method is 'OPTIONS', answers 204 with an empty body and
//      returns (see TODO 8).
//   3. Parses `pathname` from req.url with
//      `new URL(req.url, \`http://${req.headers.host}\`)`.
//   4. If pathname is '/api/settings': call getSettings for GET,
//      putSettings for PUT, deleteSettings for DELETE, and otherwise
//      sendJson(res, 405, { error: 'Method not allowed' }) with an "Allow"
//      header listing the methods that do work.
//   5. If pathname starts with '/api/' but did not match above, sendJson
//      404 with { error: 'Not found' } — a clear JSON error, never a
//      crash, for a route that does not exist.
//   6. Otherwise, if req.method is 'GET', call serveStatic(pathname, res).
//   7. Otherwise, sendJson 404.
// Wrap the whole thing in try/catch, and on catch, console.error(error) and
// sendJson(res, 500, { error: 'Internal server error' }): nothing a client
// sends should ever be able to crash the process outright.

// Only start listening when this file is run directly (`node server.js`),
// not when server.test.js imports it to test its pieces without opening a
// real network port. Finished: nothing to do here.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  server.listen(PORT, () => {
    console.log(`Exhibit settings server listening on http://127.0.0.1:${PORT}`);
  });
}

export { server };
