# Starter — Backend and API Foundations

Begin here.

- `index.html`, `styles.css`, and the wiring inside `js/main.js` (loading, saving, the form, the 2D exhibit list) are finished. `js/scene.js`'s setup is finished too.
- 13 TODOs are numbered across `server/` and `js/`, in the order the README's Walkthrough uses them:
  - `server/server.js`: TODOs 1, 7, 8, 9
  - `server/validation.js`: TODO 2
  - `server/routes.js`: TODOs 3, 5, 6
  - `server/store.js`: TODO 4
  - `js/main.js`: TODOs 10, 11
  - `js/scene.js`: TODO 12
  - `server/server.test.js`: TODO 13
- Before TODO 1, `node server/server.js` already starts a server that answers every request with `{ "ok": true }` — that is deliberate, so you have something to test with `curl` from session 2 onward.
- Before TODO 12, ticking a checkbox in the form updates the always-present exhibit list correctly, but not the 3D view — that is expected until you finish `applySettings()`.
- Before TODO 13, `node --test` passes trivially (the test bodies are empty): finishing each assertion is the point of that step.

Open everything through a local server (`http://`), never `file://`: `js/main.js` uses ES modules, which browsers refuse to load from the filesystem directly.

Full instructions: [`../README.md`](../README.md).
