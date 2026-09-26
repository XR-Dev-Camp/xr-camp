// backup.js: a small command-line script, not a route — a backup is
// something a person (or a scheduled task) runs deliberately, never
// something a web request should be able to trigger. Run it with:
//   node server/backup.js
//
// Why not simply `cp exhibit.sqlite exhibit-backup.sqlite`? A plain file
// copy reads the file's bytes with no idea whether SQLite is in the middle
// of writing to it. Copy at the wrong instant and the copy can land
// mid-write: a file that looks present but will not open, or opens and is
// missing rows nobody deleted. `VACUUM INTO` asks SQLite itself to write a
// complete, consistent copy of the database to a new file, taking the same
// care about concurrent writers that every other SQLite operation does. It
// also rebuilds the file compactly, the way VACUUM alone does, which is a
// pleasant side effect for a backup and not the main reason to use it here.
//
// The destination path below is never built from user input — it is always
// this script's own timestamp — so writing it into the SQL text with a
// template literal is safe. Do not copy this pattern for a filename (or
// anything else) that came from a request; see validation.js and db.js for
// what this project does instead: everywhere a value comes from a client,
// it travels through a prepared statement's `?` placeholder, never through
// string interpolation.

import { DatabaseSync } from 'node:sqlite';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DB_FILE } from './db.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const BACKUPS_DIR = join(HERE, 'data', 'backups');

function timestampForFilename() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

export function backupNow() {
  if (!existsSync(DB_FILE)) {
    throw new Error(`No database file to back up yet at ${DB_FILE}. Start the server once first.`);
  }
  mkdirSync(BACKUPS_DIR, { recursive: true });
  const backupPath = join(BACKUPS_DIR, `exhibit-${timestampForFilename()}.sqlite`);

  // A second connection to the same file, open only long enough to run one
  // statement — this script does not need db.js's prepared statements or
  // its migration runner, only the file VACUUM INTO reads from.
  const source = new DatabaseSync(DB_FILE, { readOnly: true });
  try {
    // SQLite does not accept a bound parameter for the destination of
    // VACUUM INTO, so the path is escaped by hand (doubling any single
    // quote) instead — safe here only because, as the comment above
    // explains, this path never comes from a request.
    const escaped = backupPath.replaceAll("'", "''");
    source.exec(`VACUUM INTO '${escaped}'`);
  } finally {
    source.close();
  }
  return backupPath;
}

if (process.argv[1] && import.meta.url === new URL(process.argv[1], 'file:').href) {
  const path = backupNow();
  console.log(`Backup written to ${path}`);
}
