// routes.js: one function per route. Each function only knows about
// requests, responses, the store, and validation — never about sockets or
// URL parsing, which server.js handles.

import { loadSettings, resetSettings, saveSettings } from './store.js';
import { validateSettings } from './validation.js';

// A small helper, shared by every route: set the usual JSON headers, encode
// the body once, and end the response. This one is finished: use it in the
// TODOs below.
export function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

// Reads a request body into a string, then parses it as JSON. Rejects if
// the body is too large (a simple denial-of-service guard) or is not valid
// JSON. This one is finished.
export function readJsonBody(req, { maxBytes = 1_000_000 } = {}) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > maxBytes) {
        reject(new Error('Request body too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      const text = Buffer.concat(chunks).toString('utf8') || '{}';
      try {
        resolve(JSON.parse(text));
      } catch {
        reject(new Error('Request body is not valid JSON'));
      }
    });
    req.on('error', reject);
  });
}

// TODO 3: finish getSettings. It should load the current settings (or the
// defaults, if none are saved yet) with loadSettings(), and send them back
// with sendJson(res, 200, settings). This route never fails: a missing
// file just means "use the defaults".
export async function getSettings(req, res) {
  throw new Error('TODO 3: getSettings is not implemented yet');
}

// TODO 5: finish putSettings. It should:
//   1. Check req.headers['content-type'] includes 'application/json'; if
//      not, sendJson(res, 415, { error: 'Content-Type must be application/json' }).
//   2. Read the body with readJsonBody(req), inside a try/catch. On
//      failure, sendJson with status 413 if the message mentions "too
//      large", otherwise 400, and { error: error.message }.
//   3. Call validateSettings(body). If it is not valid, sendJson(res, 400,
//      { error: 'Invalid settings', details: errors }).
//   4. Otherwise, save it with saveSettings(value), and sendJson(res, 200,
//      the saved settings).
export async function putSettings(req, res) {
  throw new Error('TODO 5: putSettings is not implemented yet');
}

// TODO 6: finish deleteSettings. It should call resetSettings(), then
// respond with no body: res.writeHead(204); res.end();
// 204 No Content means "it worked, and there is nothing more to say".
export async function deleteSettings(req, res) {
  throw new Error('TODO 6: deleteSettings is not implemented yet');
}
