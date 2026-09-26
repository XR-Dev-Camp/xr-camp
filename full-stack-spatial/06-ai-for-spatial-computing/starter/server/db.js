// db.js: the only file that touches the database. This lesson has no
// accounts (Course 5.2 already teaches those, and Course 5.5 hardens them) —
// every scene here is shared, single-tenant, local data, the same as a
// note-taking app with one user. That keeps this lesson's code small enough
// to leave room for its real subject: ai.js, next door.
//
// Schema (two tables, one foreign key):
//   scenes ──< scene_objects
//   scenes ──< annotations
// Deleting a scene cascades to its objects and annotations, the same
// ON DELETE CASCADE choice Course 5.3 made, and for the same reason: no
// other function in this file has to remember to clean those up itself.
//
// This uses node:sqlite (DatabaseSync), built into Node itself since Node
// 22.5 and still labelled experimental in Node 24 LTS — importing this file
// prints a one-line ExperimentalWarning. That is expected; see the README's
// Troubleshooting section.

import { DatabaseSync } from 'node:sqlite';
import { randomUUID } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EXHIBITS } from './exhibits.js';

const HERE = dirname(fileURLToPath(import.meta.url));

const DB_FILE = process.env.DB_FILE
  ? resolve(HERE, process.env.DB_FILE)
  : join(HERE, 'data', 'scenes.sqlite');
mkdirSync(dirname(DB_FILE), { recursive: true });

export const db = new DatabaseSync(DB_FILE);
db.exec('PRAGMA foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS scenes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    is_public INTEGER NOT NULL DEFAULT 0,
    description TEXT,
    description_reviewed_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS scene_objects (
    id TEXT PRIMARY KEY,
    scene_id TEXT NOT NULL REFERENCES scenes(id) ON DELETE CASCADE,
    exhibit_id TEXT NOT NULL,
    position_x REAL NOT NULL,
    position_y REAL NOT NULL,
    position_z REAL NOT NULL,
    rotation_y REAL NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_scene_objects_scene_id ON scene_objects(scene_id);
  CREATE TABLE IF NOT EXISTS annotations (
    id TEXT PRIMARY KEY,
    scene_id TEXT NOT NULL REFERENCES scenes(id) ON DELETE CASCADE,
    exhibit_id TEXT NOT NULL,
    text TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_annotations_scene_id ON annotations(scene_id);
`);

// --- Scenes ------------------------------------------------------------------

function rowToScene(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    isPublic: row.is_public === 1,
    description: row.description,
    descriptionReviewedAt: row.description_reviewed_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function rowToObject(row) {
  return {
    id: row.id,
    exhibitId: row.exhibit_id,
    position: { x: row.position_x, y: row.position_y, z: row.position_z },
    rotationY: row.rotation_y,
  };
}

function rowToAnnotation(row) {
  return {
    id: row.id, exhibitId: row.exhibit_id, text: row.text, createdAt: row.created_at,
  };
}

export function listScenes() {
  return db.prepare('SELECT * FROM scenes ORDER BY updated_at DESC').all().map(rowToScene);
}

export function getSceneById(id) {
  return rowToScene(db.prepare('SELECT * FROM scenes WHERE id = ?').get(id));
}

export function listSceneObjects(sceneId) {
  return db.prepare('SELECT * FROM scene_objects WHERE scene_id = ? ORDER BY exhibit_id').all(sceneId).map(rowToObject);
}

export function listAnnotationsForScene(sceneId) {
  return db.prepare('SELECT * FROM annotations WHERE scene_id = ? ORDER BY created_at').all(sceneId).map(rowToAnnotation);
}

export function getAnnotationById(id) {
  const row = db.prepare('SELECT * FROM annotations WHERE id = ?').get(id);
  if (!row) return null;
  return { ...rowToAnnotation(row), sceneId: row.scene_id };
}

// --- TODO 1: insertScene and insertObjects ----------------------------------
// insertScene(...) should:
//   1. Build a `scene` object: { id: randomUUID(), name, isPublic: Boolean(isPublic),
//      createdAt: now, updatedAt: now } (use `const now = new Date().toISOString()`).
//   2. Run the INSERT and the objects insert inside one transaction
//      (db.exec('BEGIN') / db.exec('COMMIT'), with db.exec('ROLLBACK') on
//      failure) — the same shape Course 5.3's replaceSceneObjects used, and
//      for the same reason: a scene should never end up saved with only
//      some of its objects.
//   3. Insert the scene row:
//      db.prepare(`INSERT INTO scenes (id, name, is_public, created_at, updated_at)
//                  VALUES (?, ?, ?, ?, ?)`)
//        .run(scene.id, scene.name, scene.isPublic ? 1 : 0, scene.createdAt, scene.updatedAt)
//   4. Call insertObjects(scene.id, objects) (write this helper too: prepare
//      one INSERT INTO scene_objects statement, and .run() it once per
//      object in the array, each with a fresh randomUUID()).
//   5. Return getSceneById(scene.id).
export function insertScene({ name, isPublic, objects }) {
  throw new Error('TODO 1: insertScene is not implemented yet');
}

function insertObjects(sceneId, objects) {
  throw new Error('TODO 1: insertObjects is not implemented yet');
}

// --- TODO 2: updateScene and saveDescription --------------------------------
// updateScene(id, { name, isPublic, objects }) should, inside one transaction:
//   1. UPDATE scenes SET name = ?, is_public = ?, updated_at = ? WHERE id = ?
//   2. DELETE FROM scene_objects WHERE scene_id = ?
//   3. insertObjects(id, objects)
// Then return getSceneById(id). This is the same "replace everything" shape
// TODO 1's insertScene used for a brand-new scene.
export function updateScene(id, { name, isPublic, objects }) {
  throw new Error('TODO 2: updateScene is not implemented yet');
}

export function deleteScene(id) {
  return db.prepare('DELETE FROM scenes WHERE id = ?').run(id).changes > 0;
}

// saveDescription(id, description) should UPDATE scenes SET description = ?,
// description_reviewed_at = ? WHERE id = ? (use new Date().toISOString() for
// the timestamp), then return getSceneById(id). This is the *only* function
// in this whole project that is allowed to write a description to the
// database — see ai.js and routes.js for why a draft never reaches here on
// its own.
export function saveDescription(id, description) {
  throw new Error('TODO 2: saveDescription is not implemented yet');
}

// --- Annotations -----------------------------------------------------------

export function insertAnnotation({ sceneId, exhibitId, text }) {
  const annotation = {
    id: randomUUID(), sceneId, exhibitId, text, createdAt: new Date().toISOString(),
  };
  db.prepare(`
    INSERT INTO annotations (id, scene_id, exhibit_id, text, created_at)
    VALUES (?, ?, ?, ?, ?)
  `).run(annotation.id, annotation.sceneId, annotation.exhibitId, annotation.text, annotation.createdAt);
  return annotation;
}

export function deleteAnnotation(id) {
  return db.prepare('DELETE FROM annotations WHERE id = ?').run(id).changes > 0;
}

// --- Seed data ---------------------------------------------------------------
// A natural-language search or a description tool has nothing to search or
// describe on a database's very first run, and this lesson has no accounts
// to sign up and build scenes by hand before trying either feature. This
// seeds three small, varied scenes once, only if the table is empty, so
// both features have real, inspectable data from the first run onward — it
// is also exactly what server.test.js resets and rebuilds its own copy of,
// so finishing TODO 1 is what makes this function (already finished for
// you) actually able to insert anything.
export function seedIfEmpty() {
  if (db.prepare('SELECT COUNT(*) AS n FROM scenes').get().n > 0) return;

  const [clayPot, basketRing, jadeStone] = EXHIBITS.map((exhibit) => exhibit.id);
  const seeds = [
    {
      name: 'Close together, jade in front',
      isPublic: true,
      objects: [
        { exhibitId: clayPot, position: { x: -1.3, y: 0, z: 0 }, rotationY: 0 },
        { exhibitId: basketRing, position: { x: 0, y: 0, z: 0 }, rotationY: 0 },
        { exhibitId: jadeStone, position: { x: 0.6, y: 0, z: 0.8 }, rotationY: 45 },
      ],
      annotations: [
        { exhibitId: jadeStone, text: 'Polished by hand; the surface should catch the light from most angles.' },
      ],
    },
    {
      name: 'Wide circle, pot turned to face the basket',
      isPublic: true,
      objects: [
        { exhibitId: clayPot, position: { x: -2, y: 0, z: 0 }, rotationY: 90 },
        { exhibitId: basketRing, position: { x: 0, y: 0, z: -1.5 }, rotationY: 0 },
        { exhibitId: jadeStone, position: { x: 2, y: 0, z: 0 }, rotationY: 0 },
      ],
      annotations: [
        { exhibitId: clayPot, text: 'Unglazed terracotta; the coil-building marks are still visible near the rim.' },
        { exhibitId: basketRing, text: 'Woven from plant fibre in a single continuous coil.' },
      ],
    },
    {
      name: 'Private draft: pot and basket only',
      isPublic: false,
      objects: [
        { exhibitId: clayPot, position: { x: -0.6, y: 0, z: 0 }, rotationY: 0 },
        { exhibitId: basketRing, position: { x: 0.6, y: 0, z: 0 }, rotationY: 0 },
        { exhibitId: jadeStone, position: { x: 0, y: 0, z: -3 }, rotationY: 0 },
      ],
      annotations: [],
    },
  ];

  for (const seed of seeds) {
    const scene = insertScene({ name: seed.name, isPublic: seed.isPublic, objects: seed.objects });
    for (const annotation of seed.annotations) {
      insertAnnotation({ sceneId: scene.id, exhibitId: annotation.exhibitId, text: annotation.text });
    }
  }
}

export { DB_FILE };
