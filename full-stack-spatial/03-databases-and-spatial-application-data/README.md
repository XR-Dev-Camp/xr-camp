# Databases and Spatial Application Data

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `full-stack-spatial` · **Lesson:** `databases-and-spatial-application-data-03` · **Time:** about 12 hours · 16 sessions of 45 minutes · about 4 weeks at 4 sessions a week

---

> Save and load user-created scenes or annotations.

## Learning objectives

By the end of this project you will be able to:

1. Design a small relational schema (tables, columns, and the relationships between them) for spatial data: positions, rotations, and the notes a learner attaches to an object.
2. Explain why a foreign key needs `ON DELETE CASCADE`, and turn cascading deletes on with `PRAGMA foreign_keys = ON`.
3. Read and write a SQLite database from Node.js with the built-in `node:sqlite` module, using prepared statements instead of building SQL out of strings.
4. Wrap a multi-step write (replacing every object in a scene) in a transaction, so it either fully succeeds or leaves nothing behind.
5. Enforce row-level permissions in server code: an owner may read and change their own row; anyone else may only read a row marked public.
6. Write and run a small, numbered set of database migrations, and explain what happens if a server starts against a database that has not run them yet.
7. Describe a database's data lifecycle (what should happen to related rows when an account is deleted) and back up a SQLite file safely with `VACUUM INTO`.
8. Extend Course 5.2's authentication server without weakening it: accounts, sessions, and CSRF protection keep working exactly as they did.

## Prerequisites

- **Course 5.2: Authentication and User Accounts** — this lesson starts from its finished server and keeps its accounts, sessions, and CSRF protection working.
- **Course 5.1: Backend and API Foundations** — routes, JSON bodies, validation, and status codes.
- Comfort with `async`/`await` and reading a stack trace, from **Course 4 (Frontend Engineer)**.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| Node.js 22.5 or later (LTS "24 Krypton" recommended) | Runs the server, including the built-in `node:sqlite` module this lesson uses | Free |
| A text editor (e.g. VS Code) | Writing the server and client code | Free |
| A modern browser (Chrome, Firefox, Safari, or Edge) | Running the exhibit and testing your work | Free |
| DB Browser for SQLite (optional) | A free, offline graphical way to look inside the `.sqlite` file this lesson creates — this course never requires it, since `node server/inspect-db.js` does the same job from the terminal | Free |

Node.js can be downloaded from [nodejs.org](https://nodejs.org/); learners in mainland China can also use the [npmmirror Node.js mirror](https://registry.npmmirror.com/binary.html?path=node/) if the official site is slow. Nothing in this lesson needs an npm package or an internet connection once Node.js is installed: `node:sqlite`, `node:http`, and `node:test` all ship inside Node itself.

## What you will build

Course 5.2 gave every learner a signed-in account. This lesson gives every account somewhere real to keep its own work: a small SQLite database, storing **scenes** (a saved arrangement of the clay pot, basket ring, and jade stone — the same three exhibits from the Web3D Developer courses) and **annotations** (a short note a learner attaches to one exhibit inside a scene). You will design the schema, write the migrations that create it, and build the API and permission checks that let an owner arrange and save a scene, mark it public or keep it private, and see it load back exactly as they left it — while another signed-in learner can only ever look at a public scene, never change it.

This is the third step of the ongoing **virtual cultural exhibit** that runs through Phase 5: 5.1 gave it an API, 5.2 gave it accounts, and this lesson gives it real, structured, multi-row data with the relationships and permissions a growing application needs. Course 5.4 picks this database back up to add real-time, multi-user rooms.

The reference solution is in [`completed/`](completed/); the starter has **13 numbered TODOs**, mostly in `server/`, with three finished files (`js/scene.js`, `server/auth.js`, `server/sessions.js`, and `server/rateLimit.js`) carried over so this lesson can focus on the database.

## Folder guide

```text
03-databases-and-spatial-application-data/
├── README.md
├── starter/                # begin here
│   ├── index.html, styles.css, js/
│   └── server/
│       ├── migrations/     # numbered .sql files, run in order
│       ├── db.js           # the only file that touches SQLite
│       ├── validation.js, routes.js, server.js
│       ├── auth.js, sessions.js, rateLimit.js   # carried over from 5.2
│       ├── inspect-db.js, backup.js             # small command-line tools
│       └── server.test.js
├── completed/               # reference solution
├── challenges/               # Three challenges: Foundation is required
├── tests/                    # self-review checklist
├── assets/
└── screenshots/
```

## Setup

1. Open a terminal and run `node --version`. You need 22.5 or later; this course is written and tested against Node 24 (the current LTS).
2. `cd` into `starter/server` and copy `.env.example` to `.env` (adjust `PORT` only if 8879 is already used by something else on your machine).
3. Serve the whole repository from its root with any static file server (for example `python3 -m http.server 8766`, or the one this course's own tooling already runs), so `starter/index.html` opens over `http://`, not `file://`.
4. In a second terminal, from `starter/server`, run `node server.js`. You should see `Scenes and annotations server listening on http://127.0.0.1:8879` — and, once, a one-line `ExperimentalWarning: SQLite is an experimental feature`. Both are expected; see Troubleshooting.
5. Open the served `starter/index.html` in your browser. You will see the exhibit and its default arrangement; "Your account" is the only working panel until Step 12.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Read this Walkthrough and the starter files; run `node server/server.js` and confirm it answers `{ "ok": true }`. | The starter running, and a plan for the 13 TODOs ahead. |
| 2 | Design the `scenes`, `scene_objects`, and `annotations` tables on paper first (columns, types, which foreign key points where); write TODO 1's three `CREATE TABLE` migrations. | Three finished migration files, not yet run. |
| 3 | TODO 2: finish and switch on `runMigrations()`. | `node server/inspect-db.js` prints all five tables, their foreign keys, and four applied migrations. |
| 4 | TODO 3: user functions in `db.js` (`insertUser` through `deleteUser`), with prepared statements. | `node --test` gets past registration and login without throwing (assertions come in Step 13). |
| 5 | TODO 4: scene functions (`insertScene` through `deleteScene`). | A scene you insert by hand (in a scratch script, or the debugger) comes back from `getSceneById` with the right owner. |
| 6 | TODO 5: `scene_objects` functions, including a transaction in `replaceSceneObjects`. | Three objects saved for one scene come back in the same positions you gave them. |
| 7 | TODO 6: annotation functions. | An annotation you insert comes back from `listAnnotationsForScene`. |
| 8 | TODO 7: validation for scene metadata, scene objects, and annotations. | A scene with a non-numeric position is rejected before it ever reaches `db.js`. |
| 9 | TODO 8: `createScene`, `listMyScenes`, `listPublicSceneGallery`, `getScene` in `routes.js`. | These functions return the right shape when called directly; wiring them to HTTP is Step 11. |
| 10 | TODO 9: `updateScene` and `removeScene`, with the owner check in front of every write. | Renaming or deleting a scene you do not own is refused before Step 11 even exists to test it over HTTP. |
| 11 | TODO 10 (annotation routes) and TODO 11 (`server.js`'s routing, including the two path-parameter patterns). | Every route works over `curl` or the browser's network tab: create, list, view, edit, delete a scene; add and remove an annotation. |
| 12 | TODO 12: wire up `js/main.js` — loading "My scenes" and "Public scenes", saving the arrangement you built, loading a saved one back into the 3D view. | Save a scene, reload the page, load it back: the exhibit reappears exactly where you left it. |
| 13 | TODO 13: finish `server.test.js`'s assertions; run `node --test` to a full pass; run `node server/backup.js` and confirm a new file appears under `server/data/backups/`. | A green test suite, and a real backup file you can open with `node server/inspect-db.js` (point `DB_FILE` at it). |
| 14 | Work through [`tests/checklist.md`](tests/checklist.md) end to end, on both a real keyboard and a screen reader if you have one. | Every item checked, or a note about what you could not test and why. |
| 15 | Complete the required [Foundation challenge](challenges/challenge-1.md). | Your own small, deliberate extension to the schema or the permission rules. |
| 16 | One challenge extension (Creative or Explorer), then **Submitting your work**. | Screenshots, your journal entry, and a project you are ready to show. |

### Step 1: Read the schema you are about to build (no TODO yet)

Before writing SQL, sketch the shape of the data on paper. This lesson has four tables:

```text
users ──< scenes ──< scene_objects
              └────< annotations >── users
```

A `scenes` row belongs to exactly one `users` row (its owner). A `scene_objects` row belongs to exactly one `scenes` row (a placed exhibit). An `annotations` row belongs to exactly one `scenes` row *and* names the `users` row that wrote it. Draw the arrows before you write a single `CREATE TABLE` — a wrong foreign key is far more expensive to fix once real rows depend on it.

### Step 2: Design the tables (TODO 1)

Open `server/migrations/002_create_scenes.sql`, `003_create_scene_objects.sql`, and `004_create_annotations.sql`. Each has a comment describing exactly which columns to add and which foreign keys need `ON DELETE CASCADE`. `001_create_users.sql` (already finished, carried over from Course 5.2's account row) shows the style: one statement per file, plain column types, no cleverness.

```sql
-- from 001_create_users.sql, already finished:
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  recovery_code_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);
```

Position and rotation are stored as separate numeric columns (`position_x`, `position_y`, `position_z`, `rotation_y`), not as one JSON blob. That is a deliberate trade-off: it makes every value type-checkable by SQLite itself, and it is what lets `validation.js` (Step 8) reject a non-numeric position field by field, but it does mean adding a new per-object property later needs a new migration, not just a new key in a blob.

### Step 3: Write a migration runner (TODO 2)

`db.js` already opens the database and turns on `PRAGMA foreign_keys = ON` — SQLite ignores every `ON DELETE CASCADE` in your migrations unless this runs first, on every connection, every time. Finish `runMigrations()`: it should read `migrations/*.sql` in filename order, skip any file already recorded in a `_migrations` table, and run each new one inside its own transaction, so a failure partway through never leaves a table half-created with no record of the attempt.

```js
db.exec('BEGIN');
try {
  db.exec(sql);
  db.prepare('INSERT INTO _migrations (name, applied_at) VALUES (?, ?)').run(file, new Date().toISOString());
  db.exec('COMMIT');
} catch (error) {
  db.exec('ROLLBACK');
  throw new Error(`Migration ${file} failed and was rolled back: ${error.message}`);
}
```

Once it is finished, uncomment the guarded call beneath it. Run `node server/inspect-db.js` — no dependency to install, just `node:sqlite` reading `sqlite_master` and `_migrations` — and you should see all four tables, their foreign keys, and four applied migration names.

### Step 4: User functions with prepared statements (TODO 3)

Every function in `db.js` follows the same shape: `db.prepare('... ? ...').run(value)` or `.get(value)` or `.all(value)`. The `?` is filled in separately from the SQL text — a value never becomes part of the SQL string itself:

```js
export function findUserByUsername(username) {
  return rowToUser(db.prepare('SELECT * FROM users WHERE username = ?').get(username));
}
```

Finish `insertUser`, `findUserByUsername`, `findUserById`, `updateUserPassword`, and `deleteUser` this way. `deleteUser` is the shortest function in the whole file — one `DELETE FROM users WHERE id = ?` — because the cascade you designed in Step 2 does the rest.

### Step 5: Scene functions (TODO 4)

`insertScene` and `getSceneById` are already finished as examples — `getSceneById` joins `scenes` to `users` so a scene comes back with its owner's username, not just an opaque id:

```js
export function getSceneById(id) {
  return rowToScene(db.prepare(`
    SELECT scenes.*, users.username AS owner_username
    FROM scenes JOIN users ON users.id = scenes.owner_id
    WHERE scenes.id = ?
  `).get(id));
}
```

Finish `listScenesByOwner`, `listPublicScenes` (the same join, filtered by `is_public = 1`), `updateSceneMeta`, and `deleteScene`.

### Step 6: Scene objects and a transaction (TODO 5)

`replaceSceneObjects(sceneId, objects)` is the one function in this project that writes more than one row at a time: it deletes every existing object for a scene, then inserts the new list. Both steps happen inside `db.exec('BEGIN')` / `db.exec('COMMIT')`, with `db.exec('ROLLBACK')` on failure — the same shape Step 3's migration runner uses. Without the transaction, a validation error thrown between the delete and the last insert would leave a scene with only some of its objects saved, and nothing in the database would say so.

### Step 7: Annotations (TODO 6)

The last set of `db.js` functions: `insertAnnotation`, `listAnnotationsForScene`, `getAnnotationById`, `deleteAnnotation`. Same prepared-statement pattern as every function before it.

### Step 8: Validate scenes, objects, and annotations (TODO 7)

`server/validation.js` already has `validateCredentials` finished (carried over from 5.2). Finish `validateSceneMeta`, `validateSceneObjects`, and `validateAnnotation`. The most important check is on every number a client sends:

```js
function isFiniteNumberWithin(value, max) {
  return typeof value === 'number' && Number.isFinite(value) && Math.abs(value) <= max;
}
```

This is not a defence against SQL injection — parameter binding (Steps 4-7) already closed that door. It stops a scene from silently saving `NaN`, or a value from a form field that forgot `type="number"`, long before it reaches a `REAL` column that would accept it without complaint.

### Step 9: Read routes: create, list, get (TODO 8)

`routes.js` carries `register`, `login`, `logout`, `me`, `recover`, and `removeAccount` over from Course 5.2 unchanged, except that they call `db.js` instead of Course 5.2's JSON file. Finish `createScene`, `listMyScenes`, `listPublicSceneGallery`, and `getScene`. `getScene`'s permission check is the one to read carefully:

```js
if (scene.ownerId !== auth.user.id && !scene.isPublic) {
  return sendJson(res, 404, { error: 'Scene not found.' });
}
```

A private scene that is not yours answers `404`, the same "not found", not `403` "forbidden" — so a client can never use the status code alone to learn that a given scene id exists at all.

### Step 10: Write routes: update and delete (TODO 9)

`updateScene` and `removeScene` add one more check in front of the same CSRF check Course 5.2 introduced: ownership.

```js
if (scene.ownerId !== auth.user.id) {
  return sendJson(res, 403, { error: 'Only the owner can edit this scene.' });
}
```

Here, unlike `getScene`, `403` is the right answer: reaching this line already required a valid session, so confirming the scene exists costs nothing extra.

### Step 11: Annotation routes and server.js routing (TODO 10, TODO 11)

Finish `addAnnotation` and `removeAnnotation` — owner-only, the same shape as Step 10. Then finish `server.js`'s request listener. Two routes carry an id inside the path (`/api/scenes/<id>` and `/api/scenes/<id>/annotations/<id>`); with no router package, two small regular expressions match them:

```js
const SCENE_PATH = /^\/api\/scenes\/([^/]+)$/;
const ANNOTATION_PATH = /^\/api\/scenes\/([^/]+)\/annotations\/([^/]+)$/;
```

Once this is done, every route in the project is reachable over HTTP for the first time. Test with `curl` before moving to the browser — a wrong status code is far easier to spot in a terminal than in a UI.

### Step 12: Wire up the client (TODO 12)

`js/scene.js` already exposes `applyObjects(objects)`, `setAnnotationMarkers(annotations)`, and `getObjects()` — this step never touches three.js directly. Finish the functions in `js/main.js` that call `fetch()`: `loadSceneIntoView`, `loadDefaultView`, `refreshSceneLists`, `renderSceneList`, `openScene`, `saveScene`, `deleteCurrentScene`, `addAnnotation`, and `removeAnnotation`. Every one of them follows Course 5.2's pattern: `credentials: 'include'` on every request, and an `X-CSRF-Token` header on every request that changes something.

### Step 13: Finish the tests (TODO 13)

`server.test.js` already makes every request each test needs; add the `assert.equal` / `assert.deepEqual` / `assert.ok` call each comment describes. Run `node --test` from `server/` until every test passes, then run `node server/backup.js` once by hand and confirm a new `.sqlite` file appears under `server/data/backups/`.

## Key code explained

- **Prepared statements (`db.prepare(sql).run(...)`).** SQL text and the values that fill it in travel to SQLite separately — a `?` placeholder is never replaced by string concatenation. This is what stops SQL injection: a username of `'; DROP TABLE users; --` is stored (and compared) as a literal, harmless string, never executed as SQL.
- **`PRAGMA foreign_keys = ON`.** SQLite ships with foreign-key enforcement off, for backward compatibility with databases written before the feature existed. `db.js` turns it on for every connection, every time the file opens — without it, `ON DELETE CASCADE` in the migrations is silently ignored, and a deleted user's scenes would sit in the database forever.
- **Transactions (`db.exec('BEGIN')` … `db.exec('COMMIT')`, with `db.exec('ROLLBACK')` on failure).** Every write in this project that touches more than one row — running a migration, replacing a scene's objects — is wrapped this way, so it either fully happens or leaves no trace, never something in between.
- **404 for "not yours and not public", 403 for "yours to see but not to change".** `getScene` answers a private scene that is not yours with the same `404` it would give a scene id that never existed, so the status code alone never confirms a private scene's existence. `updateScene` and `removeScene` answer `403` instead, because reaching them already proves the scene exists (you could read its public copy or you own it).
- **`VACUUM INTO`, not a plain file copy.** `server/backup.js` asks SQLite itself to write a complete, consistent copy of the database to a new file. A plain `cp` of the `.sqlite` file has no way to know whether SQLite is mid-write when the copy starts; catching it at the wrong instant can produce a copy that will not open, or opens with rows silently missing.

## 3D and XR accessibility

- **Scene description.** `#scene-description` is built from the same `objects` array the 3D view renders, every time a scene loads or changes, so the two can never disagree (WCAG 1.1.1, 1.3.1).
- **Keyboard-only editing.** Every position and rotation is a `<input type="number">`, changed with the keyboard or a spinner button — this project never asks a learner to drag anything in 3D to arrange a scene.
- **A 2D twin of the 3D view.** The position/rotation table under the canvas holds the same numbers the 3D view shows, always, whether or not WebGL is available.
- **Annotations exist as real text, not only as markers.** The floating "📝" markers `scene.js` draws over the canvas are decorative; the `#annotation-list` under the canvas is the accessible, always-present copy of the same information.
- **Reduced motion and a Pause control.** The jade stone's slow turn starts paused when `prefers-reduced-motion: reduce` is set, and the **Pause animation** button (with `aria-pressed`) works regardless of that preference.
- **Comfort.** The camera never moves except once, to its fixed starting position — nothing in this lesson moves the viewpoint the learner did not ask for.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why | 
| --- | --- | --- |
| Every form field has a visible, associated `<label>` | 2.5.3 | The accessible name must start with the visible label text. |
| Field errors from a 400 response appear as text, in a list, next to the form | 1.4.1, 3.3.1 | A rejected scene or annotation must not be signalled by colour alone. |
| `role="list"` on every `<ul>` styled with `list-style: none` | Good practice | Safari otherwise drops list semantics from a list-styled-away `<ul>`. |
| The position/rotation table has a `<caption>` and `<th scope="col">`/`<th scope="row">` | 1.3.1 | A screen reader announces which exhibit and which axis each number belongs to. |
| Animation respects `prefers-reduced-motion` and offers a Pause button | 2.2.2 | Self-starting motion the learner did not ask for must be stoppable. |
| Every 3D interaction has a keyboard route | 2.1.1 | Arranging a scene works entirely with `Tab` and number input steppers. |

## Performance considerations

- **Index every column a query filters by.** `scenes.owner_id` and `scenes.is_public` both have an index (see `002_create_scenes.sql`); without one, "my scenes" or "public scenes" would scan every row in the table as it grows.
- **One join beats one query per row.** `listPublicScenes` joins `scenes` to `users` in a single query, instead of asking `findUserById` once per scene — the classic "N+1 queries" mistake, invisible with three scenes and painful with three thousand.
- **A transaction batches writes.** Wrapping `replaceSceneObjects`'s delete-then-insert in one transaction is not only about correctness (Step 6): SQLite also has less bookkeeping to do for one committed transaction than for several separate ones.
- **`VACUUM` (and `VACUUM INTO`) reclaim space.** SQLite does not automatically shrink a file after deleting many rows; a backup made with `VACUUM INTO` is also a compacted copy, as a useful side effect.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Building SQL with a template literal (`` `SELECT * FROM users WHERE username = '${username}'` ``) | Works in every manual test, then breaks or leaks data the moment a username contains a quote — or is deliberately crafted to | Always use a prepared statement with `?` placeholders |
| Forgetting `PRAGMA foreign_keys = ON` | `ON DELETE CASCADE` is silently ignored; deleted users leave orphaned scenes behind forever | Set the pragma once, in `db.js`, before any query runs |
| Deleting a scene's objects without a transaction | A crash or thrown error between the delete and the inserts can leave a scene with no objects at all | Wrap the delete and every insert in one `BEGIN`/`COMMIT` |
| Checking `if (req.body.ownerId === auth.user.id)` | A client can put any `ownerId` it likes in a request body; that line trusts the attacker to tell the truth | Always compare the **session's** account id against the row already stored in the database |
| Copying the `.sqlite` file with `cp` while the server is running | A backup that will not open, or opens with rows silently missing | Use `VACUUM INTO`, as `server/backup.js` does |

## Troubleshooting

**`ExperimentalWarning: SQLite is an experimental feature and might change at any time`.** Expected, every time `node:sqlite` is imported, on every Node 22-24 release. It is a warning, not an error — the server keeps running. It will disappear once Node marks the module stable in a future release.

**`Error: Cannot open database because the directory does not exist`, or a similar `ENOENT`.** `db.js` creates `server/data/` for you with `mkdirSync(..., { recursive: true })`; if you moved or renamed that folder, delete `server/data` entirely and restart the server so it can recreate it.

**`SqliteError: FOREIGN KEY constraint failed`.** You tried to insert a `scene_objects` or `annotations` row whose `scene_id` (or a user's `owner_id`) does not exist yet. Check that the scene was actually created — and committed — before you tried to attach objects or annotations to it.

**A deleted account's scenes are still in the database.** Almost always means `PRAGMA foreign_keys = ON` did not run before the delete — check that `db.js` sets it immediately after opening the connection, and that nothing else opened the same file first, bypassing it.

**`node server/inspect-db.js` (or the server) throws `TODO 2: runMigrations is not implemented yet`, even though you already wrote it.** Check that you uncommented the guarded call beneath `runMigrations()` — the function can be finished and still never run if nothing calls it.

**Safari or Firefox: the recovery code will not select with one click.** Triple-click (or use `Cmd/Ctrl+A` after clicking inside it) — `user-select: all` selects the element's whole text on the first click in Chrome and Edge, but some Safari and Firefox versions still need the extra step.

**Port 8879 is already in use.** Set a different `PORT` in `server/.env`, and update `ALLOWED_ORIGIN` to match, or stop whatever else is using it.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add a fourth, read-only column to `scenes` and put it to use.
2. **[Creative](challenges/challenge-2.md)**: make the exhibit reflect your own language, culture, or community.
3. **[Explorer](challenges/challenge-3.md)**: a harder, open-ended stretch with migrations and permissions.

## Submitting your work

1. Work through [`tests/checklist.md`](tests/checklist.md).
2. Take screenshots: the exhibit with a saved scene loaded, the position/rotation table, and `node server/inspect-db.js`'s terminal output.
3. Keep them in your learner journal and portfolio. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
4. Journal question: your database now enforces a rule ("only the owner may edit a scene") in server code, not only in the UI. Find one place in this project where the UI *also* hides a control a rejected request would still block — and one place where it does not. What would go wrong if the server-side check were removed but the UI check stayed?

## Further reading

- [Node.js docs: `node:sqlite`](https://nodejs.org/api/sqlite.html)
- [SQLite documentation: Foreign Key Support](https://www.sqlite.org/foreignkeys.html)
- [SQLite documentation: The `VACUUM` command (including `VACUUM INTO`)](https://www.sqlite.org/lang_vacuum.html)
- [Node.js docs: `node:test`](https://nodejs.org/api/test.html)
- [OWASP Cheat Sheet Series: SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)

## Women to Know

**Claudia Bauzer Medeiros** is a full professor of databases at Unicamp (the University of Campinas) in Brazil, where her research has covered geographic information systems and the management of large scientific datasets, including agro-environmental and biodiversity data projects. In 2003 she became the first woman elected president of the Brazilian Computer Society (SBC), serving until 2007.

Her career connects directly to this lesson's subject: designing databases that hold real, structured, spatial information — and enforcing the rules around who may read or change it — is exactly the kind of database engineering her research has spent decades advancing, applied here to the exhibit's saved scenes and annotations.

_Facts from public sources, checked 2026. Spotted an error? [Tell us](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Standards spotlight

SQL itself is a standard: ISO/IEC 9075, maintained by ISO/IEC JTC 1/SC 32, defines the language most relational databases (including PostgreSQL and MySQL) implement, each with its own extensions. SQLite — the database this lesson uses — implements most of that standard plus its own extensions (including `VACUUM INTO`, used in this lesson's backup script), and documents every difference from the standard in its own reference documentation, which this lesson links to directly rather than the paywalled ISO standard itself.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
