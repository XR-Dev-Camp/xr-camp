// db.js: the only file that touches the database. Adapted from Course 5.3's
// db.js -- the migration runner and the user functions are unchanged in
// shape. New here: scenes and annotations, this lesson's two review
// targets (an IDOR on a scene endpoint, and stored XSS in an annotation).
//
// This uses node:sqlite (DatabaseSync), built into Node itself since Node
// 22.5 and still labelled experimental in Node 24 LTS -- starting this
// file prints a one-line ExperimentalWarning to the terminal. That is
// expected; see the README's Troubleshooting section.
//
// Every query here is a *prepared statement*: db.prepare(sql)'s `?`
// placeholders are filled in separately from the SQL text, with
// .run()/.get()/.all(). A value never becomes part of the SQL string
// itself, so nothing a user types can change what statement runs -- this
// file has no SQL-injection bug for the same reason none of Courses
// 5.1-5.4 did: every value only ever enters through a placeholder.

import { DatabaseSync } from 'node:sqlite';
import { randomUUID } from 'node:crypto';
import { mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = join(HERE, 'migrations');

const DB_FILE = process.env.DB_FILE
  ? resolve(HERE, process.env.DB_FILE)
  : join(HERE, 'data', 'spatial.sqlite');
mkdirSync(dirname(DB_FILE), { recursive: true });

export const db = new DatabaseSync(DB_FILE);
db.exec('PRAGMA foreign_keys = ON');

function runMigrations() {
  db.exec('CREATE TABLE IF NOT EXISTS _migrations (name TEXT PRIMARY KEY, applied_at TEXT NOT NULL)');
  const alreadyApplied = new Set(
    db.prepare('SELECT name FROM _migrations').all().map((row) => row.name),
  );
  const files = readdirSync(MIGRATIONS_DIR).filter((name) => name.endsWith('.sql')).sort();

  for (const file of files) {
    if (alreadyApplied.has(file)) continue;
    const sql = readFileSync(join(MIGRATIONS_DIR, file), 'utf8');
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

function rowToUser(row) {
  if (!row) return null;
  return {
    id: row.id, username: row.username, passwordHash: row.password_hash, createdAt: row.created_at,
  };
}

export function insertUser({ username, passwordHash }) {
  const user = {
    id: randomUUID(), username, passwordHash, createdAt: new Date().toISOString(),
  };
  db.prepare('INSERT INTO users (id, username, password_hash, created_at) VALUES (?, ?, ?, ?)')
    .run(user.id, user.username, user.passwordHash, user.createdAt);
  return user;
}

export function findUserByUsername(username) {
  return rowToUser(db.prepare('SELECT * FROM users WHERE username = ?').get(username));
}

export function findUserById(id) {
  return rowToUser(db.prepare('SELECT * FROM users WHERE id = ?').get(id));
}

// --- Scenes --------------------------------------------------------------

function rowToScene(row) {
  if (!row) return null;
  return {
    id: row.id,
    ownerId: row.owner_id,
    name: row.name,
    isPublic: row.is_public === 1,
    locationLat: row.location_lat,
    locationLng: row.location_lng,
    description: row.description ?? null,
    createdAt: row.created_at,
  };
}

// Stores exactly the location it is given -- callers decide, before this
// point, whether that value has already been minimised (see validation.js's
// roundLocation and the README's "Data minimisation" section). This
// function itself has no opinion about precision.
export function insertScene({
  ownerId, name, isPublic, locationLat, locationLng,
}) {
  const scene = {
    id: randomUUID(),
    ownerId,
    name,
    isPublic: isPublic ? 1 : 0,
    locationLat: locationLat ?? null,
    locationLng: locationLng ?? null,
    createdAt: new Date().toISOString(),
  };
  db.prepare(`
    INSERT INTO scenes (id, owner_id, name, is_public, location_lat, location_lng, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    scene.id, scene.ownerId, scene.name, scene.isPublic, scene.locationLat, scene.locationLng, scene.createdAt,
  );
  return rowToScene({
    id: scene.id,
    owner_id: scene.ownerId,
    name: scene.name,
    is_public: scene.isPublic,
    location_lat: scene.locationLat,
    location_lng: scene.locationLng,
    created_at: scene.createdAt,
  });
}

// A plain lookup by id -- no permission check. Deliberately named
// differently from a "for viewer" function so that any file calling this
// one directly is a flag to a reviewer: "who checked this was allowed?"
// (see routes.js and the README's "Key code explained").
export function findSceneById(id) {
  return rowToScene(db.prepare('SELECT * FROM scenes WHERE id = ?').get(id));
}

export function listScenesForOwner(ownerId) {
  return db.prepare('SELECT * FROM scenes WHERE owner_id = ? ORDER BY created_at DESC').all(ownerId).map(rowToScene);
}

// FIXED (TODO 4): a prepared statement, the same pattern every other write
// in this file uses -- `description` only ever enters through the `?`
// placeholder, never concatenated into the SQL text. Called only from
// routes.js's saveDescription, after a person has reviewed an AI draft
// (see ai.js and the README's "AI description drafts, with review"
// section); this function has no way to know, or care, where its argument
// came from.
export function updateSceneDescription(id, description) {
  db.prepare('UPDATE scenes SET description = ? WHERE id = ?').run(description, id);
  return findSceneById(id);
}

// --- Annotations -----------------------------------------------------------

function rowToAnnotation(row) {
  if (!row) return null;
  return {
    id: row.id, sceneId: row.scene_id, authorId: row.author_id, text: row.text, createdAt: row.created_at,
  };
}

// Stores `text` exactly as given -- see sanitize.js's sanitizeText for what
// must already have happened to it before it reaches this function.
export function insertAnnotation({ sceneId, authorId, text }) {
  const annotation = {
    id: randomUUID(), sceneId, authorId, text, createdAt: new Date().toISOString(),
  };
  db.prepare('INSERT INTO annotations (id, scene_id, author_id, text, created_at) VALUES (?, ?, ?, ?, ?)')
    .run(annotation.id, annotation.sceneId, annotation.authorId, annotation.text, annotation.createdAt);
  return annotation;
}

export function listAnnotationsForScene(sceneId) {
  return db.prepare('SELECT * FROM annotations WHERE scene_id = ? ORDER BY created_at').all(sceneId).map(rowToAnnotation);
}

// --- Counts (for /api/admin/stats) ------------------------------------------

export function countUsers() {
  return db.prepare('SELECT COUNT(*) AS n FROM users').get().n;
}

export function countScenes() {
  return db.prepare('SELECT COUNT(*) AS n FROM scenes').get().n;
}

export function countAnnotations() {
  return db.prepare('SELECT COUNT(*) AS n FROM annotations').get().n;
}

export { DB_FILE };
