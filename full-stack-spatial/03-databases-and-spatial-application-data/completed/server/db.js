// db.js: the only file that touches the database. Every other server file
// asks this module for a user, a scene, a scene object or an annotation, or
// hands it new data to save — the same split store.js used in Course 5.2,
// now backed by SQLite instead of two JSON files.
//
// This uses node:sqlite (DatabaseSync), built into Node itself since Node
// 22.5 and still labelled experimental in Node 24 LTS — starting this file
// prints a one-line ExperimentalWarning to the terminal. That is expected;
// see the README's Troubleshooting section. No package is installed for
// this: `node --version` and `node server/server.js` are the only
// requirements.
//
// Every query in this file is a *prepared statement*: db.prepare(sql)
// returns a statement whose `?` placeholders are filled in separately from
// the SQL text, with .run()/.get()/.all(). A value never becomes part of
// the SQL string itself — see "Key code explained" in the README for what
// goes wrong the moment a query is built with string concatenation or a
// template literal instead. Each function below prepares its statement
// fresh, on every call, rather than once at the top of the file: that keeps
// every exported function self-contained and easy to read top to bottom,
// and it is the reason migrations can finish running (see below) before
// anything here ever asks the database for a table that might not exist
// yet.

import { DatabaseSync } from 'node:sqlite';
import { randomUUID } from 'node:crypto';
import { mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = join(HERE, 'migrations');

// Environment variable, so tests (and the backup script) can point this at
// a throwaway file instead of the real one. See .env.example.
const DB_FILE = process.env.DB_FILE
  ? resolve(HERE, process.env.DB_FILE)
  : join(HERE, 'data', 'exhibit.sqlite');
mkdirSync(dirname(DB_FILE), { recursive: true });

export const db = new DatabaseSync(DB_FILE);

// Off by default in SQLite, for backward compatibility with databases older
// than the feature — every connection has to turn it on for itself, every
// time it opens the file, or "ON DELETE CASCADE" in the migrations below is
// silently ignored and rows are left behind. This is the first thing this
// module does, before any migration or query runs.
db.exec('PRAGMA foreign_keys = ON');

// --- A simple numbered-migration runner -------------------------------------
//
// migrations/001_create_users.sql, 002_..., 003_..., 004_... run once each,
// in filename order, the first time this file opens a database that has
// not seen them yet. `_migrations` remembers which ones already ran, so
// starting the server a second time — or running the test suite, against
// its own temporary database — never tries to CREATE TABLE a table that is
// already there.
function runMigrations() {
  db.exec('CREATE TABLE IF NOT EXISTS _migrations (name TEXT PRIMARY KEY, applied_at TEXT NOT NULL)');

  const alreadyApplied = new Set(
    db.prepare('SELECT name FROM _migrations').all().map((row) => row.name),
  );
  const files = readdirSync(MIGRATIONS_DIR).filter((name) => name.endsWith('.sql')).sort();

  for (const file of files) {
    if (alreadyApplied.has(file)) continue;
    const sql = readFileSync(join(MIGRATIONS_DIR, file), 'utf8');
    // Each migration runs inside its own transaction: either every
    // statement in the file takes effect and is recorded, or (if one
    // statement fails) none of it does. Without this, a migration that
    // fails halfway through could leave a table half-created with no
    // record of having tried, so the next run would try it again and fail
    // on "table already exists" instead of the real error.
    db.exec('BEGIN');
    try {
      db.exec(sql);
      db.prepare('INSERT INTO _migrations (name, applied_at) VALUES (?, ?)').run(file, new Date().toISOString());
      db.exec('COMMIT');
    } catch (error) {
      db.exec('ROLLBACK');
      throw new Error(`Migration ${file} failed and was rolled back: ${error.message}`);
    }
  }
}
runMigrations();

// --- Users -------------------------------------------------------------------
// SQLite has no separate boolean or camelCase-column type, so every row
// coming out of the database is a plain object with the column's own name
// (snake_case). Each function below converts that into the camelCase shape
// the rest of the server (and Course 5.2's routes) already expects.

function rowToUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    username: row.username,
    passwordHash: row.password_hash,
    recoveryCodeHash: row.recovery_code_hash,
    createdAt: row.created_at,
  };
}

export function insertUser({ username, passwordHash, recoveryCodeHash }) {
  const user = {
    id: randomUUID(), username, passwordHash, recoveryCodeHash, createdAt: new Date().toISOString(),
  };
  db.prepare(`
    INSERT INTO users (id, username, password_hash, recovery_code_hash, created_at)
    VALUES (?, ?, ?, ?, ?)
  `).run(user.id, user.username, user.passwordHash, user.recoveryCodeHash, user.createdAt);
  return user;
}

export function findUserByUsername(username) {
  return rowToUser(db.prepare('SELECT * FROM users WHERE username = ?').get(username));
}

export function findUserById(id) {
  return rowToUser(db.prepare('SELECT * FROM users WHERE id = ?').get(id));
}

export function updateUserPassword(id, { passwordHash, recoveryCodeHash }) {
  db.prepare('UPDATE users SET password_hash = ?, recovery_code_hash = ? WHERE id = ?')
    .run(passwordHash, recoveryCodeHash, id);
  return findUserById(id);
}

// Deleting the row is the entire function: every scene this user owns, every
// scene_object belonging to one of those scenes, and every annotation this
// user wrote (on their own scenes, in this schema) disappear too, because
// the migrations declared those foreign keys ON DELETE CASCADE. No other
// function in this file has to know that scenes exist for this promise to
// hold — that is the point of putting the rule in the schema instead of in
// application code that something could forget to call.
export function deleteUser(id) {
  return db.prepare('DELETE FROM users WHERE id = ?').run(id).changes > 0;
}

// --- Scenes --------------------------------------------------------------

function rowToScene(row) {
  if (!row) return null;
  return {
    id: row.id,
    ownerId: row.owner_id,
    ownerUsername: row.owner_username, // only present on rows joined with users
    name: row.name,
    isPublic: row.is_public === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function insertScene({ ownerId, name, isPublic }) {
  const now = new Date().toISOString();
  const scene = {
    id: randomUUID(), ownerId, name, isPublic: Boolean(isPublic), createdAt: now, updatedAt: now,
  };
  db.prepare(`
    INSERT INTO scenes (id, owner_id, name, is_public, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(scene.id, scene.ownerId, scene.name, scene.isPublic ? 1 : 0, scene.createdAt, scene.updatedAt);
  return scene;
}

export function listScenesByOwner(ownerId) {
  return db.prepare('SELECT * FROM scenes WHERE owner_id = ? ORDER BY updated_at DESC')
    .all(ownerId).map(rowToScene);
}

// A join, not a second query per row: scenes.owner_id names the owner, but a
// public gallery is more useful with the owner's username than their id, so
// this reads it from users in the same query rather than asking the client
// to look each one up itself.
export function listPublicScenes() {
  return db.prepare(`
    SELECT scenes.*, users.username AS owner_username
    FROM scenes JOIN users ON users.id = scenes.owner_id
    WHERE scenes.is_public = 1
    ORDER BY scenes.updated_at DESC
  `).all().map(rowToScene);
}

export function getSceneById(id) {
  return rowToScene(db.prepare(`
    SELECT scenes.*, users.username AS owner_username
    FROM scenes JOIN users ON users.id = scenes.owner_id
    WHERE scenes.id = ?
  `).get(id));
}

export function updateSceneMeta(id, { name, isPublic }) {
  db.prepare('UPDATE scenes SET name = ?, is_public = ?, updated_at = ? WHERE id = ?')
    .run(name, isPublic ? 1 : 0, new Date().toISOString(), id);
  return getSceneById(id);
}

export function deleteScene(id) {
  return db.prepare('DELETE FROM scenes WHERE id = ?').run(id).changes > 0;
}

// --- Scene objects ---------------------------------------------------------

function rowToSceneObject(row) {
  return {
    id: row.id,
    sceneId: row.scene_id,
    exhibitId: row.exhibit_id,
    position: { x: row.position_x, y: row.position_y, z: row.position_z },
    rotationY: row.rotation_y,
  };
}

export function listSceneObjects(sceneId) {
  return db.prepare('SELECT * FROM scene_objects WHERE scene_id = ? ORDER BY exhibit_id')
    .all(sceneId).map(rowToSceneObject);
}

// Replaces every object in a scene with a new list, as one transaction: the
// delete and every insert either all happen or none do. Without a
// transaction, a crash or a thrown validation error between the delete and
// the last insert could leave a scene with only some of its objects saved —
// silently wrong, and easy to miss in testing because it only shows up when
// the timing is unlucky.
export function replaceSceneObjects(sceneId, objects) {
  db.exec('BEGIN');
  try {
    db.prepare('DELETE FROM scene_objects WHERE scene_id = ?').run(sceneId);
    const insert = db.prepare(`
      INSERT INTO scene_objects (id, scene_id, exhibit_id, position_x, position_y, position_z, rotation_y)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    for (const object of objects) {
      insert.run(
        randomUUID(), sceneId, object.exhibitId,
        object.position.x, object.position.y, object.position.z, object.rotationY,
      );
    }
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
  return listSceneObjects(sceneId);
}

// --- Annotations -----------------------------------------------------------

function rowToAnnotation(row) {
  if (!row) return null;
  return {
    id: row.id,
    sceneId: row.scene_id,
    exhibitId: row.exhibit_id,
    text: row.text,
    createdBy: row.created_by,
    createdAt: row.created_at,
  };
}

export function insertAnnotation({
  sceneId, exhibitId, text, createdBy,
}) {
  const annotation = {
    id: randomUUID(), sceneId, exhibitId, text, createdBy, createdAt: new Date().toISOString(),
  };
  db.prepare(`
    INSERT INTO annotations (id, scene_id, exhibit_id, text, created_by, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    annotation.id, annotation.sceneId, annotation.exhibitId,
    annotation.text, annotation.createdBy, annotation.createdAt,
  );
  return annotation;
}

export function listAnnotationsForScene(sceneId) {
  return db.prepare('SELECT * FROM annotations WHERE scene_id = ? ORDER BY created_at')
    .all(sceneId).map(rowToAnnotation);
}

export function getAnnotationById(id) {
  return rowToAnnotation(db.prepare('SELECT * FROM annotations WHERE id = ?').get(id));
}

export function deleteAnnotation(id) {
  return db.prepare('DELETE FROM annotations WHERE id = ?').run(id).changes > 0;
}

export { DB_FILE };
