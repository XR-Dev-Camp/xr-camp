-- 003_create_annotations.sql: a short note left on a scene. `text` is
-- stored exactly as sanitizeText() leaves it (see sanitize.js) -- this
-- table has no way to know whether that happened, which is the whole
-- reason this lesson's tests check the server code, not the schema.
CREATE TABLE annotations (
  id TEXT PRIMARY KEY,
  scene_id TEXT NOT NULL REFERENCES scenes(id) ON DELETE CASCADE,
  author_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  created_at TEXT NOT NULL
);
