// inspect-db.js: a tiny read-only script for looking inside the database
// without installing anything — no sqlite3 command-line tool required, only
// node:sqlite, which is already part of Node. Run it with:
//   node server/inspect-db.js
// Useful right after writing a migration (Step 2 onward in the README): it
// shows every table SQLite currently knows about, how many rows are in
// each, and — with PRAGMA foreign_key_list — the foreign keys this project's
// migrations declared, so you can check a new one landed correctly before
// building anything on top of it.

import { db } from './db.js';

// The table names interpolated below never come from a request — they come
// back from sqlite_master, SQLite's own list of the tables this project's
// migrations created — so this is not the string-built SQL the rest of this
// project avoids. SQLite also has no way to bind a table name as a `?`
// parameter (parameters stand in for values, not identifiers), which is why
// even a request-driven query never interpolates one; every real query in
// db.js takes a fixed table name and only binds values.
const tables = db.prepare(`
  SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name
`).all();

console.log(`Database file: ${process.env.DB_FILE ?? 'server/data/exhibit.sqlite'}\n`);

for (const { name } of tables) {
  const { count } = db.prepare(`SELECT COUNT(*) AS count FROM "${name}"`).get();
  console.log(`${name} (${count} row${count === 1 ? '' : 's'})`);
  for (const fk of db.prepare(`PRAGMA foreign_key_list("${name}")`).all()) {
    console.log(`  -> ${fk.from} references ${fk.table}(${fk.to}) ON DELETE ${fk.on_delete}`);
  }
}

console.log(`\nApplied migrations:`);
for (const row of db.prepare('SELECT name, applied_at FROM _migrations ORDER BY name').all()) {
  console.log(`  ${row.name} (${row.applied_at})`);
}
