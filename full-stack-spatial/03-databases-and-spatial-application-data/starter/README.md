# Starter — Databases and Spatial Application Data

Begin here.

- `index.html`, `styles.css`, and `js/scene.js` are finished (the 3D view and its keyboard-only transform inputs work the same way they will in `completed/`).
- `server/auth.js`, `server/sessions.js`, and `server/rateLimit.js` are finished, carried over unchanged from Course 5.2.
- 13 TODOs are numbered across `server/` and `js/main.js`, in the order the README's Walkthrough uses them:
  - `server/migrations/002_create_scenes.sql`, `003_create_scene_objects.sql`, `004_create_annotations.sql`: TODO 1
  - `server/db.js`: TODOs 2, 3, 4, 5, 6
  - `server/validation.js`: TODO 7
  - `server/routes.js`: TODOs 8, 9, 10
  - `server/server.js`: TODO 11
  - `js/main.js`: TODO 12
  - `server/server.test.js`: TODO 13
- Before TODO 1, `server/migrations/001_create_users.sql` already exists (also carried over from Course 5.2) — the other three migration files contain only instructions in a comment.
- Before TODO 2, running anything that imports `server/db.js` (the server, `node --test`, or `node server/inspect-db.js`) does nothing with your migrations yet — `runMigrations()`'s call is commented out on purpose, so an unfinished migration runner cannot crash every other TODO you have not reached yet.
- Before TODO 11, `node server/server.js` already starts a server that answers every request with `{ "ok": true }` — that is deliberate, so you have something to test with `curl` as you build up the pieces underneath it.
- Before TODO 12, the page loads and shows the exhibit with its default arrangement, but "Your account" is the only working panel — that is expected.
- Before TODO 13, `node --test` passes trivially (the test bodies make requests but assert nothing yet): adding each assertion is the point of that step, and it will tell you exactly what your server sent instead of what the README says it should.

Open everything through a local server (`http://`), never `file://`: `js/main.js` uses ES modules, which browsers refuse to load from the filesystem directly.

Full instructions: [`../README.md`](../README.md).
