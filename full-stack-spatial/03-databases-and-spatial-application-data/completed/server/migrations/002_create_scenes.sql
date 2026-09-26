-- 002_create_scenes.sql: one row per saved arrangement of the exhibit. Every
-- scene has exactly one owner, named with a foreign key. "ON DELETE CASCADE"
-- is the data-lifecycle rule from the README: deleting a user deletes every
-- scene that user owns, without this API having to remember to do it by
-- hand. is_public is stored as 0/1 (SQLite has no boolean type) and decides
-- whether anyone other than the owner may read this row at all — see
-- routes.js's getScene for where that rule is enforced.
CREATE TABLE scenes (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  is_public INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Every scene list this API serves is filtered by owner_id (yours) or by
-- is_public (everyone's public scenes): an index on each keeps both lookups
-- fast as the table grows, instead of scanning every row.
CREATE INDEX idx_scenes_owner ON scenes(owner_id);
CREATE INDEX idx_scenes_public ON scenes(is_public);
