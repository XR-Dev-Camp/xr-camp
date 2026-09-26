// db.js: the only file that touches the database. Adapted from Course 5.3's
// db.js — the migration runner and the user functions are unchanged in
// shape, trimmed to what this lesson needs (no recovery codes: this lesson
// is not about accounts). New here: the `reports` functions, for the one
// piece of moderation state (Step 10) that must survive a restart.
//
// This uses node:sqlite (DatabaseSync), built into Node itself since Node
// 22.5 and still labelled experimental in Node 24 LTS — starting this file
// prints a one-line ExperimentalWarning to the terminal. That is expected;
// see the README's Troubleshooting section. No package is installed for
// this: `node --version` and `node server/server.js` are the only
// requirements. (The one dependency this lesson does install, `ws`, is for
// WebSockets — see package.json and server.js — not for the database.)

import { DatabaseSync } from 'node:sqlite';
import { randomUUID } from 'node:crypto';
import { mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = join(HERE, 'migrations');

const DB_FILE = process.env.DB_FILE
  ? resolve(HERE, process.env.DB_FILE)
  : join(HERE, 'data', 'room.sqlite');
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

// --- Reports -------------------------------------------------------------
// Written once, by insertReport, and never updated or deleted from this
// lesson's own code — a report is a record of what a reporter saw, at the
// moment they saw it, and moderation review (out of this lesson's scope)
// reads it later. reporterId always comes from the reporting connection's
// own authenticated session (see realtime.js) — never from the message
// body — so a report can never be filed "as" someone else.

function rowToReport(row) {
  if (!row) return null;
  return {
    id: row.id,
    roomId: row.room_id,
    reporterId: row.reporter_id,
    reportedUsername: row.reported_username,
    reason: row.reason,
    messageExcerpt: row.message_excerpt,
    createdAt: row.created_at,
  };
}

export function insertReport({
  roomId, reporterId, reportedUsername, reason, messageExcerpt,
}) {
  const report = {
    id: randomUUID(),
    roomId,
    reporterId,
    reportedUsername,
    reason,
    messageExcerpt: messageExcerpt || null,
    createdAt: new Date().toISOString(),
  };
  db.prepare(`
    INSERT INTO reports (id, room_id, reporter_id, reported_username, reason, message_excerpt, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    report.id, report.roomId, report.reporterId, report.reportedUsername,
    report.reason, report.messageExcerpt, report.createdAt,
  );
  return report;
}

// Exposed for server.test.js and for a moderator reviewing reports later
// (out of this lesson's scope, but the query is the same one they would use).
export function listReportsForRoom(roomId) {
  return db.prepare('SELECT * FROM reports WHERE room_id = ? ORDER BY created_at').all(roomId).map(rowToReport);
}

export { DB_FILE };
