-- 003_create_scene_objects.sql: where each exhibit sits inside one saved
-- scene. A scene normally has three rows here (clay pot, basket ring, jade
-- stone), one per exhibit_id — but nothing in this schema requires exactly
-- three, on purpose: a future lesson could add more exhibits without a
-- migration touching this table.
--
-- Position and rotation are stored as plain numbers, one column per axis,
-- not as a single JSON blob: that is what lets a later lesson ask the
-- database itself questions like "which scenes place anything to the left
-- of x = 0", and what lets validation.js reject a non-numeric value field by
-- field. Rotation is degrees around the vertical (y) axis only — the same
-- one control this lesson's UI exposes — not a full 3D orientation.
CREATE TABLE scene_objects (
  id TEXT PRIMARY KEY,
  scene_id TEXT NOT NULL REFERENCES scenes(id) ON DELETE CASCADE,
  exhibit_id TEXT NOT NULL,
  position_x REAL NOT NULL,
  position_y REAL NOT NULL,
  position_z REAL NOT NULL,
  rotation_y REAL NOT NULL
);

CREATE INDEX idx_scene_objects_scene ON scene_objects(scene_id);
