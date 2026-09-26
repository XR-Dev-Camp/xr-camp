// server.js: starts one HTTP server that does two jobs. Requests to
// /api/settings go to routes.js. Every other GET request serves a file from
// the client folder next door (../), the same page whether or not this
// server is running: see completed/js/main.js for what happens when it
// is not.
//
// Everything here is Node's built-in node:http: no framework, and no
// dependencies to install (package.json lists none). That is a deliberate
// limit for this lesson, not a claim that you should always avoid
// frameworks — Course 5.8 revisits the trade-off once you have felt what a
// framework saves you from writing by hand.

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { deleteSettings, getSettings, putSettings, sendJson } from './routes.js';

// process.loadEnvFile() (Node 21.7+) reads a .env file into process.env,
// with no package to install. It is optional: a fresh checkout has no .env
// yet (see .env.example), so a missing file is not an error.
const HERE = dirname(fileURLToPath(import.meta.url));
try {
  process.loadEnvFile(join(HERE, '.env'));
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const PORT = Number(process.env.PORT) || 8877;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';
// The client's HTML, CSS and JS live one folder up from server/, so this
// server can serve the same files whether you open them directly or
// through this server's own address.
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
  // Course 5.2 explains why '*' is fine for a read-mostly, no-login API
  // like this one, and why it stops being fine once cookies or accounts
  // are involved.
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

async function serveStatic(pathname, res) {
  // A GET for "/" means "/index.html". Anything else is looked up as-is.
  const requestedPath = pathname === '/' ? '/index.html' : pathname;

  // normalize() collapses "..": without this check, a request for
  // "/../server/store.js" could read files outside CLIENT_DIR. This is the
  // same class of bug Course 5.5 studies in depth (path traversal).
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

    // The browser sends OPTIONS before a PUT or DELETE with a JSON body,
    // to ask permission first (a CORS "preflight" request). It carries no
    // body of its own, so it always gets a short, empty answer.
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const { pathname } = new URL(req.url, `http://${req.headers.host}`);

    if (pathname === '/api/settings') {
      if (req.method === 'GET') return await getSettings(req, res);
      if (req.method === 'PUT') return await putSettings(req, res);
      if (req.method === 'DELETE') return await deleteSettings(req, res);
      res.setHeader('Allow', 'GET, PUT, DELETE, OPTIONS');
      return sendJson(res, 405, { error: 'Method not allowed' });
    }

    if (pathname.startsWith('/api/')) {
      return sendJson(res, 404, { error: 'Not found' });
    }

    if (req.method === 'GET') {
      return await serveStatic(pathname, res);
    }

    sendJson(res, 404, { error: 'Not found' });
  } catch (error) {
    // A safety net, not a substitute for the specific error handling
    // above: nothing a client sends should ever be able to crash the
    // process outright.
    console.error(error);
    sendJson(res, 500, { error: 'Internal server error' });
  }
});

// Only start listening when this file is run directly (`node server.js`),
// not when server.test.js imports it to test its pieces without opening a
// real network port. pathToFileURL(), not a plain "file://" + path string:
// process.argv[1] can be a relative path (it depends on how you invoked
// node), and pathToFileURL() resolves that the same way import.meta.url
// already has been.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  server.listen(PORT, () => {
    console.log(`Exhibit settings server listening on http://127.0.0.1:${PORT}`);
  });
}

export { server };
