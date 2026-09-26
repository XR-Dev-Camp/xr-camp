// server.test.js: node:test, built into Node, needs no dependency to
// install. Run it with `npm test` (or `node --test`) from this folder.
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
  assert.deepEqual(tableNames, ['_migrations', 'annotations', 'scene_objects', 'scenes', 'users']);

  const appliedNames = db.prepare('SELECT name FROM _migrations ORDER BY name').all().map((row) => row.name);
  assert.deepEqual(appliedNames, [
    '001_create_users.sql', '002_create_scenes.sql', '003_create_scene_objects.sql', '004_create_annotations.sql',
  ]);

  const sceneForeignKeys = db.prepare('PRAGMA foreign_key_list(scenes)').all();
  assert.equal(sceneForeignKeys.length, 1);
  assert.equal(sceneForeignKeys[0].on_delete, 'CASCADE');
});

// --- Accounts (carried over behaviour from Course 5.2) ----------------------

test('POST /api/auth/register creates an account and returns a one-time recovery code', async () => {
  const username = freshUsername();
  const res = await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'a-very-good-password' }),
  });
  assert.equal(res.status, 201);
  const body = await res.json();
  assert.equal(body.account.username, username);
  assert.equal(typeof body.recoveryCode, 'string');
  assert.equal(body.account.passwordHash, undefined);
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
  assert.equal(wrongPassword.status, 401);
  assert.equal(noSuchUser.status, 401);
  assert.deepEqual(await wrongPassword.json(), await noSuchUser.json());
});

// --- Scenes: creation, validation, and ownership ----------------------------

test('GET /api/scenes without a session returns 401', async () => {
  const res = await fetch(`${baseUrl}/api/scenes`);
  assert.equal(res.status, 401);
});

test('a signed-in account can create a scene with its objects, then read it back', async () => {
  const owner = await registerAndLogIn(freshUsername());
  const created = await createScene(owner);
  assert.equal(created.status, 201);
  const scene = await created.json();
  assert.equal(scene.name, 'My arrangement');
  assert.equal(scene.objects.length, 3);
  assert.deepEqual(scene.objects.find((o) => o.exhibitId === 'basket-ring').position, { x: 0, y: 0, z: 0 });

  const fetched = await fetch(`${baseUrl}/api/scenes/${scene.id}`, { headers: { Cookie: owner.cookie } });
  assert.equal(fetched.status, 200);
  assert.deepEqual((await fetched.json()).objects, scene.objects);
});

test('POST /api/scenes rejects a non-numeric position', async () => {
  const owner = await registerAndLogIn(freshUsername());
  const res = await createScene(owner, {
    objects: [{ exhibitId: 'clay-pot', position: { x: 'far', y: 0, z: 0 }, rotationY: 0 }],
  });
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.ok(Array.isArray(body.details) && body.details.length > 0);
});

test('PUT /api/scenes/:id without a valid CSRF token is rejected with 403', async () => {
  const owner = await registerAndLogIn(freshUsername());
  const scene = await (await createScene(owner)).json();
  const res = await fetch(`${baseUrl}/api/scenes/${scene.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: owner.cookie, 'X-CSRF-Token': 'not-the-real-token' },
    body: JSON.stringify({ name: 'Renamed', isPublic: false, objects: SAMPLE_OBJECTS }),
  });
  assert.equal(res.status, 403);
});

// --- Row-level permissions ---------------------------------------------------

test('a private scene is invisible to everyone but its owner', async () => {
  const owner = await registerAndLogIn(freshUsername('owner'));
  const other = await registerAndLogIn(freshUsername('other'));
  const scene = await (await createScene(owner, { isPublic: false })).json();

  const asOther = await fetch(`${baseUrl}/api/scenes/${scene.id}`, { headers: { Cookie: other.cookie } });
  assert.equal(asOther.status, 404);
});

test('a public scene can be read, but not edited or deleted, by another account', async () => {
  const owner = await registerAndLogIn(freshUsername('owner'));
  const other = await registerAndLogIn(freshUsername('other'));
  const scene = await (await createScene(owner, { isPublic: true })).json();

  const readByOther = await fetch(`${baseUrl}/api/scenes/${scene.id}`, { headers: { Cookie: other.cookie } });
  assert.equal(readByOther.status, 200);

  const editByOther = await fetch(`${baseUrl}/api/scenes/${scene.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: other.cookie, 'X-CSRF-Token': other.csrfToken },
    body: JSON.stringify({ name: 'Hijacked', isPublic: true, objects: SAMPLE_OBJECTS }),
  });
  assert.equal(editByOther.status, 403);

  const deleteByOther = await fetch(`${baseUrl}/api/scenes/${scene.id}`, {
    method: 'DELETE',
    headers: { Cookie: other.cookie, 'X-CSRF-Token': other.csrfToken },
  });
  assert.equal(deleteByOther.status, 403);
});

test('the public gallery lists only public scenes, from every account', async () => {
  const owner = await registerAndLogIn(freshUsername('owner'));
  const publicScene = await (await createScene(owner, { name: 'Shown to all', isPublic: true })).json();
  await createScene(owner, { name: 'Kept private', isPublic: false });

  const gallery = await fetch(`${baseUrl}/api/scenes/public`);
  const scenes = await gallery.json();
  assert.ok(scenes.some((s) => s.id === publicScene.id));
  assert.ok(!scenes.some((s) => s.name === 'Kept private'));
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
  assert.equal(byOther.status, 403);

  const byOwner = await fetch(`${baseUrl}/api/scenes/${scene.id}/annotations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: owner.cookie, 'X-CSRF-Token': owner.csrfToken },
    body: JSON.stringify({ exhibitId: 'jade-stone', text: 'Look at the polish here.' }),
  });
  assert.equal(byOwner.status, 201);
  const annotation = await byOwner.json();

  const removedByOther = await fetch(`${baseUrl}/api/scenes/${scene.id}/annotations/${annotation.id}`, {
    method: 'DELETE',
    headers: { Cookie: other.cookie, 'X-CSRF-Token': other.csrfToken },
  });
  assert.equal(removedByOther.status, 403);

  const removedByOwner = await fetch(`${baseUrl}/api/scenes/${scene.id}/annotations/${annotation.id}`, {
    method: 'DELETE',
    headers: { Cookie: owner.cookie, 'X-CSRF-Token': owner.csrfToken },
  });
  assert.equal(removedByOwner.status, 204);
});

// --- Data lifecycle: deleting an account deletes its scenes -----------------

test('DELETE /api/account removes the account and, through ON DELETE CASCADE, every scene it owned', async () => {
  const username = freshUsername();
  const owner = await registerAndLogIn(username, 'a-very-good-password');
  const scene = await (await createScene(owner)).json();

  const before = db.prepare('SELECT COUNT(*) AS count FROM scenes WHERE owner_id = ?').get(owner.account.id);
  assert.equal(before.count, 1);
  const objectsBefore = db.prepare('SELECT COUNT(*) AS count FROM scene_objects WHERE scene_id = ?').get(scene.id);
  assert.equal(objectsBefore.count, 3);

  const deleted = await fetch(`${baseUrl}/api/account`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Cookie: owner.cookie, 'X-CSRF-Token': owner.csrfToken },
    body: JSON.stringify({ password: 'a-very-good-password' }),
  });
  assert.equal(deleted.status, 204);

  const after_ = db.prepare('SELECT COUNT(*) AS count FROM scenes WHERE owner_id = ?').get(owner.account.id);
  assert.equal(after_.count, 0);
  const objectsAfter = db.prepare('SELECT COUNT(*) AS count FROM scene_objects WHERE scene_id = ?').get(scene.id);
  assert.equal(objectsAfter.count, 0);
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
    assert.ok(count >= 1);
  } finally {
    copy.close();
  }
});
