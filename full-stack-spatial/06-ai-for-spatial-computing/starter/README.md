# Starter — AI for Spatial Computing

Begin here.

- `index.html`, `styles.css`, and `js/scene.js` are finished — the 3D view is unchanged from Course 5.3.
- `server/exhibits.js` and most of `server/routes.js` (the scene and annotation CRUD routes) are finished.
- **18 TODOs** are numbered across `server/` and `js/main.js`, in the order the README's Walkthrough uses them:
  - `server/db.js`: TODOs 1, 2
  - `server/validation.js`: TODO 3
  - `server/ai.js`: TODOs 4-13 — this lesson's real subject
  - `server/routes.js`: TODOs 14, 15
  - `server/server.js`: TODO 16
  - `js/main.js`: TODOs 17, 18
- `AI_PROVIDER=mock` in `.env.example` (and so in your own `.env`, once you copy it) the whole time you work through TODOs 1-18 — every test and every Walkthrough step is written against the mock provider, which needs no network access, no key, and never changes its answer for the same input.
- Before TODO 1, the server already starts (`node server.js`), but prints a warning that seed data could not be created — expected, since seeding calls `insertScene`, which is TODO 1.
- `node --test` fails from the very first run, with a clear `TODO n: ... is not implemented yet` message naming exactly which function to write next — treat a failing test's message as your task list, not as something to work around.
- Before TODO 17 and TODO 18, the page loads and shows the exhibit with its default arrangement, and the scene manager and search box are visible but do not yet do anything when used.

Open everything through a local server (`http://`), never `file://`: `js/main.js` uses ES modules, which browsers refuse to load from the filesystem directly. Running `node server/server.js` and opening `http://127.0.0.1:8886/` serves both the page and its API from the same server — no separate static server is needed for this lesson.

Full instructions: [`../README.md`](../README.md).
