-- 002_create_scenes.sql: one saved scene per row. is_public decides who may
-- read it besides its owner (see db.js's getSceneForViewer / routes.js's
-- IDOR discussion in the README). location_lat/location_lng are OPTIONAL
-- and, in completed/, rounded to about 11 km before they are ever written
-- here (see validation.js's roundLocation) -- this table's column type
-- (REAL) cannot enforce that on its own, which is exactly why data
-- minimisation has to happen in application code, not just in the schema.
CREATE TABLE scenes (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  is_public INTEGER NOT NULL DEFAULT 0,
  location_lat REAL,
  location_lng REAL,
  created_at TEXT NOT NULL
);
