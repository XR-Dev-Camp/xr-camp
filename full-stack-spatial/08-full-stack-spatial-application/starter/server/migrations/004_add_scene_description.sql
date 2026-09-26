-- 004_add_scene_description.sql: one optional column for a scene's
-- description. Written only through routes.js's saveDescription (see
-- ai.js and the README's "AI description drafts, with review" section) --
-- never directly from a draft, and never by this migration itself.
ALTER TABLE scenes ADD COLUMN description TEXT;
