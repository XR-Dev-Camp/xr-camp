-- 004_create_annotations.sql: a short learner-written note attached to one
-- exhibit inside one scene ("this pot's shape tells us..."). Two foreign
-- keys, two different reasons to cascade:
--   - scene_id: if the scene is deleted, its annotations are meaningless on
--     their own, so they go with it.
--   - created_by: if the account that wrote a note is deleted, Course 5.2's
--     account-deletion promise ("this removes your data") should hold even
--     for a note left on a scene you do not own. This version of the schema
--     always has created_by equal to the scene's own owner_id (only an
--     owner may annotate their own scene — see the README's permissions
--     table), but the column is kept separate from scenes.owner_id on
--     purpose: a later lesson that lets curators or visitors comment on a
--     public scene only has to relax a permission check in routes.js, not
--     redesign this table.
CREATE TABLE annotations (
  id TEXT PRIMARY KEY,
  scene_id TEXT NOT NULL REFERENCES scenes(id) ON DELETE CASCADE,
  exhibit_id TEXT NOT NULL,
  text TEXT NOT NULL,
  created_by TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL
);

CREATE INDEX idx_annotations_scene ON annotations(scene_id);
