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
// Every query in this file should be a *prepared statement*: db.prepare(sql)
// returns a statement whose `?` placeholders are filled in separately from
// the SQL text, with .run()/.get()/.all(). A value must never become part
// of the SQL string itself (never build a query with string concatenation
// or a template literal) — see "Key code explained" in the README for what
// goes wrong the moment it is. Prepare each statement fresh, inside the
// function that uses it, the way the finished examples elsewhere in this
// file do — that keeps every function self-contained, and it is why
// migrations can finish running before anything here ever asks the
// database for a table that might not exist yet.

import { DatabaseSync } from 'node:sqlite';
import { randomUUID } from 'node:crypto';
import { mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = join(HERE, 'migrations');

const DB_FILE = process.env.DB_FILE
  ? resolve(HERE, process.env.DB_FILE)
  : join(HERE, 'data', 'exhibit.sqlite');
mkdirSync(dirname(DB_FILE), { recursive: true });

export const db = new DatabaseSync(DB_FILE);

// Off by default in SQLite, for backward compatibility with databases older
// than the feature — every connection has to turn it on for itself, every
// time it opens the file, or "ON DELETE CASCADE" in the migrations is
// silently ignored and rows are left behind.
db.exec('PRAGMA foreign_keys = ON');

// --- TODO 2: a simple numbered-migration runner -----------------------------
//
// migrations/001_create_users.sql, 002_..., 003_..., 004_... should run once
// each, in filename order, the first time this file opens a database that
// has not seen them yet. Finish runMigrations() so it:
//   1. Runs `CREATE TABLE IF NOT EXISTS _migrations (name TEXT PRIMARY KEY,
//      applied_at TEXT NOT NULL)` — this table remembers which migrations
//      already ran.
//   2. Reads that table to build a Set of names already applied.
//   3. Lists migrations/*.sql with readdirSync + a filter on ".sql", sorted
//      (filenames are numbered so alphabetical order is run order).
//   4. For each file not already applied: read its text with readFileSync,
//      run db.exec('BEGIN'), then db.exec(sql), then record it with an
//      INSERT INTO _migrations, then db.exec('COMMIT'). If anything in that
//      try throws, db.exec('ROLLBACK') and re-throw a clear error naming the
//      file — an interrupted migration must never look "half applied".
//
// Once runMigrations() is finished, uncomment the guarded call below it.
// Leaving it commented out is deliberate for now: without it, importing
// this file (which every route needs) would crash the whole server before
// you have written a single migration to run.
function runMigrations() {
  throw new Error('TODO 2: runMigrations is not implemented yet');
}
// try {
//   runMigrations();
// } catch (error) {
//   console.error(`Database migrations did not run: ${error.message}`);
// }

// --- Users -------------------------------------------------------------------
// SQLite has no separate boolean or camelCase-column type, so every row
// coming out of the database is a plain object with the column's own name
// (snake_case). rowToUser converts that into the camelCase shape the rest
// of the server (carried over from Course 5.2) already expects — it is
// finished for you; TODO 3 is the functions below it.

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

// TODO 3: finish insertUser, findUserByUsername, findUserById,
// updateUserPassword, and deleteUser, using prepared statements — see the
// INSERT in insertScene (further down this file, already finished) for the
// exact shape: db.prepare('...sql with ? placeholders...').run(value1,
// value2, ...). Every value from a caller must be passed as a `?`
// parameter, never written into the SQL string itself.
export function insertUser({ username, passwordHash, recoveryCodeHash }) {
  throw new Error('TODO 3: insertUser is not implemented yet');
}

export function findUserByUsername(username) {
  throw new Error('TODO 3: findUserByUsername is not implemented yet');
}

export function findUserById(id) {
  throw new Error('TODO 3: findUserById is not implemented yet');
}

export function updateUserPassword(id, { passwordHash, recoveryCodeHash }) {
  throw new Error('TODO 3: updateUserPassword is not implemented yet');
}

// Deleting the row should be the entire function: once TODO 1's migrations
// declare owner_id and created_by as ON DELETE CASCADE foreign keys, every
// scene this user owns, every scene_object belonging to one of those
// scenes, and every annotation this user wrote disappear on their own — no
// other function in this file needs to know that scenes exist for this
// promise to hold.
export function deleteUser(id) {
  throw new Error('TODO 3: deleteUser is not implemented yet');
}

// --- Scenes --------------------------------------------------------------
// Finished for you: read insertScene and getSceneById as the pattern TODO 4
// (below) and TODO 3 (above) should follow.

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

// TODO 4: finish listScenesByOwner, listPublicScenes, updateSceneMeta, and
// deleteScene. listPublicScenes and getSceneById (given, just below) both
// join scenes to users so a scene comes with its owner's username, not just
// their id — copy that JOIN's shape for listPublicScenes.
export function listScenesByOwner(ownerId) {
  throw new Error('TODO 4: listScenesByOwner is not implemented yet');
}

export function listPublicScenes() {
  throw new Error('TODO 4: listPublicScenes is not implemented yet');
}

export function getSceneById(id) {
  return rowToScene(db.prepare(`
    SELECT scenes.*, users.username AS owner_username
    FROM scenes JOIN users ON users.id = scenes.owner_id
    WHERE scenes.id = ?
  `).get(id));
}

export function updateSceneMeta(id, { name, isPublic }) {
  throw new Error('TODO 4: updateSceneMeta is not implemented yet');
}

export function deleteScene(id) {
  throw new Error('TODO 4: deleteScene is not implemented yet');
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

// TODO 5: finish listSceneObjects and replaceSceneObjects.
// replaceSceneObjects(sceneId, objects) should replace every object in a
// scene with a new list, as one transaction: db.exec('BEGIN'), then DELETE
// FROM scene_objects WHERE scene_id = ?, then one INSERT per object in the
// `objects` array (each with its own exhibit_id, position_x/y/z, and
// rotation_y), then db.exec('COMMIT') — with a try/catch that runs
// db.exec('ROLLBACK') and re-throws on failure, the same shape TODO 2's
// runMigrations uses. Without the transaction, a validation error partway
// through the inserts could leave a scene with only some of its objects
// saved. Finish by returning listSceneObjects(sceneId).
export function listSceneObjects(sceneId) {
  throw new Error('TODO 5: listSceneObjects is not implemented yet');
}

export function replaceSceneObjects(sceneId, objects) {
  throw new Error('TODO 5: replaceSceneObjects is not implemented yet');
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

// TODO 6: finish insertAnnotation, listAnnotationsForScene,
// getAnnotationById, and deleteAnnotation — the same prepared-statement
// pattern as every function above.
export function insertAnnotation({
  sceneId, exhibitId, text, createdBy,
}) {
  throw new Error('TODO 6: insertAnnotation is not implemented yet');
}

export function listAnnotationsForScene(sceneId) {
  throw new Error('TODO 6: listAnnotationsForScene is not implemented yet');
}

export function getAnnotationById(id) {
  throw new Error('TODO 6: getAnnotationById is not implemented yet');
}

export function deleteAnnotation(id) {
  throw new Error('TODO 6: deleteAnnotation is not implemented yet');
}

export { DB_FILE };
