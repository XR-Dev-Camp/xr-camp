-- 002_create_reports.sql: the one piece of this lesson's moderation story
-- that must survive a server restart and be seen by a human later. Blocking
-- and muting (see realtime.js and js/main.js) only change what one browser
-- shows or relays right now; a report is evidence, so it goes in the
-- database, not in memory.
--
-- reporter_id is a real foreign key to the signed-in account that filed the
-- report — never a value the client sends, since a client could claim to be
-- anyone. reported_username is stored as plain text, not a foreign key: the
-- reported account might be deleted before anyone reviews the report, and
-- the report should still say who it was about.
CREATE TABLE reports (
  id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL,
  reporter_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reported_username TEXT NOT NULL,
  reason TEXT NOT NULL,
  message_excerpt TEXT,
  created_at TEXT NOT NULL
);
