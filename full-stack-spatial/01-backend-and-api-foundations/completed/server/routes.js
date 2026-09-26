// routes.js: one function per route. Each function only knows about
// requests, responses, the store, and validation — never about sockets or
// URL parsing, which server.js handles. That keeps the part of the code
// that changes often (routes) separate from the part that rarely does
// (the server itself).

import { loadSettings, resetSettings, saveSettings } from './store.js';
import { validateSettings } from './validation.js';

// A small helper, shared by every route: set the usual JSON headers, encode
// the body once, and end the response. Status codes are chosen deliberately
// throughout this file — see "Key code explained" in the README.
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
// JSON, so callers can turn either failure into a 400 or 413 response.
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

// GET /api/settings — always succeeds: a missing file is not an error to a
// learner opening the exhibit for the first time, it just means "defaults".
export async function getSettings(req, res) {
  const settings = await loadSettings();
  sendJson(res, 200, settings);
}

// PUT /api/settings — replaces the whole settings object. A real multi-user
// API would also check who is allowed to change it (Course 5.2).
export async function putSettings(req, res) {
  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('application/json')) {
    return sendJson(res, 415, { error: 'Content-Type must be application/json' });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch (error) {
    const status = error.message.includes('too large') ? 413 : 400;
    return sendJson(res, status, { error: error.message });
  }

  const { valid, errors, value } = validateSettings(body);
  if (!valid) {
    return sendJson(res, 400, { error: 'Invalid settings', details: errors });
  }

  const saved = await saveSettings(value);
  sendJson(res, 200, saved);
}

// DELETE /api/settings — resets to defaults. 204 No Content: the request
// succeeded, and there is nothing more useful to say than the empty body.
export async function deleteSettings(req, res) {
  await resetSettings();
  res.writeHead(204);
  res.end();
}
