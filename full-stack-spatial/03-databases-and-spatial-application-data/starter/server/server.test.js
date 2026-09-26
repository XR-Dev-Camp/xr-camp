// server.test.js: node:test, built into Node, needs no dependency to
// install. Run it with `npm test` (or `node --test`) from this folder.
//
// TODO 13: every test below already makes its request(s); add the
// assert.equal / assert.deepEqual / assert.ok call(s) each one needs (see
// the comment inside each test for exactly what to check). Node's
// assert/strict module is imported for you below. Filling these in is the
// fastest way to find a bug in TODOs 1-11: a wrong status code or a leaked
// password hash shows up here long before it would in the browser.
//
// Every test run gets its own temporary SQLite file (DB_FILE, set below,
// before server.js — and so db.js — is ever imported), so tests never read
// or write your real data, and never depend on each other's rows.

import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const tempDir = await mkdtemp(join(tmpdir(), 'xrcamp-fss-03-'));
process.env.DB_FILE = join(tempDir, 'exhibit.test.sqlite');

const { server } = await import('./server.js');
const { db } = await import('./db.js');

let baseUrl;
let nextUsername = 0;

before(async () => {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await rm(tempDir, { recursive: true, force: true });
});

function freshUsername(prefix = 'learner') {
  nextUsername += 1;
  return `${prefix}-${nextUsername}`;
}

function sessionCookieFrom(res) {
  const setCookie = res.headers.get('set-cookie');
  return setCookie ? setCookie.split(';')[0] : null;
}

async function registerAndLogIn(username, password = 'a-very-good-password') {
  await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const res = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const cookie = sessionCookieFrom(res);
  const body = await res.json();
  return { cookie, csrfToken: body.csrfToken, account: body.account };
}

const SAMPLE_OBJECTS = [
  { exhibitId: 'clay-pot', position: { x: -1.3, y: 0, z: 0 }, rotationY: 0 },
  { exhibitId: 'basket-ring', position: { x: 0, y: 0, z: 0 }, rotationY: 90 },
  { exhibitId: 'jade-stone', position: { x: 1.3, y: 0, z: 0 }, rotationY: 0 },
];

async function createScene(owner, overrides = {}) {
  const res = await fetch(`${baseUrl}/api/scenes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: owner.cookie, 'X-CSRF-Token': owner.csrfToken },
    body: JSON.stringify({ name: 'My arrangement', isPublic: false, objects: SAMPLE_OBJECTS, ...overrides }),
  });
  return res;
}

// --- Migrations --------------------------------------------------------------

test('every migration ran exactly once, and the expected tables and foreign keys exist', () => {
  const tableNames = db.prepare(`
    SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name
  `).all().map((row) => row.name);
  // TODO 13: assert.deepEqual(tableNames, the five table names you expect,
  // in alphabetical order — including "_migrations").

  const appliedNames = db.prepare('SELECT name FROM _migrations ORDER BY name').all().map((row) => row.name);
  // TODO 13: assert.deepEqual(appliedNames, the four migration filenames,
  // in order.

  const sceneForeignKeys = db.prepare('PRAGMA foreign_key_list(scenes)').all();
  // TODO 13: assert.equal(sceneForeignKeys.length, 1), and
  // assert.equal(sceneForeignKeys[0].on_delete, 'CASCADE').
});

// --- Accounts (carried over behaviour from Course 5.2) ----------------------

test('POST /api/auth/register creates an account and returns a one-time recovery code', async () => {
  const username = freshUsername();
  const res = await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'a-very-good-password' }),
  });
  // TODO 13: assert.equal(res.status, 201); read the body with await
  // res.json(); assert the account's username matches, and that
  // body.account.passwordHash is undefined (never sent to a client).
});

test('a wrong password and an unknown username get the exact same status and message', async () => {
  const username = freshUsername();
  await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'a-very-good-password' }),
  });
  const wrongPassword = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'totally-the-wrong-one' }),
  });
  const noSuchUser = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'no-such-learner-at-all', password: 'totally-the-wrong-one' }),
  });
  // TODO 13: assert both are status 401, and assert.deepEqual their JSON
  // bodies — they must be indistinguishable.
});

// --- Scenes: creation, validation, and ownership ----------------------------

test('GET /api/scenes without a session returns 401', async () => {
  const res = await fetch(`${baseUrl}/api/scenes`);
  // TODO 13: assert.equal(res.status, 401).
});

test('a signed-in account can create a scene with its objects, then read it back', async () => {
  const owner = await registerAndLogIn(freshUsername());
  const created = await createScene(owner);
  // TODO 13: assert.equal(created.status, 201); read the scene with await
  // created.json(); assert its name and that scene.objects.length is 3.
  const scene = await created.json();

  const fetched = await fetch(`${baseUrl}/api/scenes/${scene.id}`, { headers: { Cookie: owner.cookie } });
  // TODO 13: assert.equal(fetched.status, 200), and assert.deepEqual the
  // fetched scene's objects against scene.objects.
});

test('POST /api/scenes rejects a non-numeric position', async () => {
  const owner = await registerAndLogIn(freshUsername());
  const res = await createScene(owner, {
    objects: [{ exhibitId: 'clay-pot', position: { x: 'far', y: 0, z: 0 }, rotationY: 0 }],
  });
  // TODO 13: assert.equal(res.status, 400); read the body and assert
  // Array.isArray(body.details) && body.details.length > 0.
});

test('PUT /api/scenes/:id without a valid CSRF token is rejected with 403', async () => {
  const owner = await registerAndLogIn(freshUsername());
  const scene = await (await createScene(owner)).json();
  const res = await fetch(`${baseUrl}/api/scenes/${scene.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: owner.cookie, 'X-CSRF-Token': 'not-the-real-token' },
    body: JSON.stringify({ name: 'Renamed', isPublic: false, objects: SAMPLE_OBJECTS }),
  });
  // TODO 13: assert.equal(res.status, 403).
});

// --- Row-level permissions ---------------------------------------------------

test('a private scene is invisible to everyone but its owner', async () => {
  const owner = await registerAndLogIn(freshUsername('owner'));
  const other = await registerAndLogIn(freshUsername('other'));
  const scene = await (await createScene(owner, { isPublic: false })).json();

  const asOther = await fetch(`${baseUrl}/api/scenes/${scene.id}`, { headers: { Cookie: other.cookie } });
  // TODO 13: assert.equal(asOther.status, 404) — not 403; see loadSceneOr404
  // in routes.js for why.
});

test('a public scene can be read, but not edited or deleted, by another account', async () => {
  const owner = await registerAndLogIn(freshUsername('owner'));
  const other = await registerAndLogIn(freshUsername('other'));
  const scene = await (await createScene(owner, { isPublic: true })).json();

  const readByOther = await fetch(`${baseUrl}/api/scenes/${scene.id}`, { headers: { Cookie: other.cookie } });
  // TODO 13: assert.equal(readByOther.status, 200).

  const editByOther = await fetch(`${baseUrl}/api/scenes/${scene.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: other.cookie, 'X-CSRF-Token': other.csrfToken },
    body: JSON.stringify({ name: 'Hijacked', isPublic: true, objects: SAMPLE_OBJECTS }),
  });
  // TODO 13: assert.equal(editByOther.status, 403).

  const deleteByOther = await fetch(`${baseUrl}/api/scenes/${scene.id}`, {
    method: 'DELETE',
    headers: { Cookie: other.cookie, 'X-CSRF-Token': other.csrfToken },
  });
  // TODO 13: assert.equal(deleteByOther.status, 403).
});

test('the public gallery lists only public scenes, from every account', async () => {
  const owner = await registerAndLogIn(freshUsername('owner'));
  const publicScene = await (await createScene(owner, { name: 'Shown to all', isPublic: true })).json();
  await createScene(owner, { name: 'Kept private', isPublic: false });

  const gallery = await fetch(`${baseUrl}/api/scenes/public`);
  const scenes = await gallery.json();
  // TODO 13: assert the public scene's id is present in `scenes`, and that
  // no scene named "Kept private" is.
});

test('only a scene\'s owner can add or remove its annotations', async () => {
  const owner = await registerAndLogIn(freshUsername('owner'));
  const other = await registerAndLogIn(freshUsername('other'));
  const scene = await (await createScene(owner, { isPublic: true })).json();

  const byOther = await fetch(`${baseUrl}/api/scenes/${scene.id}/annotations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: other.cookie, 'X-CSRF-Token': other.csrfToken },
    body: JSON.stringify({ exhibitId: 'jade-stone', text: 'Not mine to add.' }),
  });
  // TODO 13: assert.equal(byOther.status, 403).

  const byOwner = await fetch(`${baseUrl}/api/scenes/${scene.id}/annotations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: owner.cookie, 'X-CSRF-Token': owner.csrfToken },
    body: JSON.stringify({ exhibitId: 'jade-stone', text: 'Look at the polish here.' }),
  });
  // TODO 13: assert.equal(byOwner.status, 201).
  const annotation = await byOwner.json();

  const removedByOther = await fetch(`${baseUrl}/api/scenes/${scene.id}/annotations/${annotation.id}`, {
    method: 'DELETE',
    headers: { Cookie: other.cookie, 'X-CSRF-Token': other.csrfToken },
  });
  // TODO 13: assert.equal(removedByOther.status, 403).

  const removedByOwner = await fetch(`${baseUrl}/api/scenes/${scene.id}/annotations/${annotation.id}`, {
    method: 'DELETE',
    headers: { Cookie: owner.cookie, 'X-CSRF-Token': owner.csrfToken },
  });
  // TODO 13: assert.equal(removedByOwner.status, 204).
});

// --- Data lifecycle: deleting an account deletes its scenes -----------------

test('DELETE /api/account removes the account and, through ON DELETE CASCADE, every scene it owned', async () => {
  const username = freshUsername();
  const owner = await registerAndLogIn(username, 'a-very-good-password');
  const scene = await (await createScene(owner)).json();

  const before = db.prepare('SELECT COUNT(*) AS count FROM scenes WHERE owner_id = ?').get(owner.account.id);
  // TODO 13: assert.equal(before.count, 1).

  const deleted = await fetch(`${baseUrl}/api/account`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Cookie: owner.cookie, 'X-CSRF-Token': owner.csrfToken },
    body: JSON.stringify({ password: 'a-very-good-password' }),
  });
  // TODO 13: assert.equal(deleted.status, 204).

  const after_ = db.prepare('SELECT COUNT(*) AS count FROM scenes WHERE owner_id = ?').get(owner.account.id);
  // TODO 13: assert.equal(after_.count, 0) — the cascade removed it without
  // this route ever calling deleteScene itself.
});

// --- Backups -----------------------------------------------------------------

test('backupNow() writes a VACUUM INTO copy that contains the same rows', async () => {
  const { backupNow } = await import('./backup.js');
  const owner = await registerAndLogIn(freshUsername());
  await createScene(owner);

  const backupPath = backupNow();
  const { DatabaseSync } = await import('node:sqlite');
  const copy = new DatabaseSync(backupPath, { readOnly: true });
  try {
    const { count } = copy.prepare('SELECT COUNT(*) AS count FROM scenes').get();
    // TODO 13: assert.ok(count >= 1).
  } finally {
    copy.close();
  }
});
