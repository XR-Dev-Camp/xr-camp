# Starter — Authentication and User Accounts

Begin here.

- `index.html`, `styles.css`, and `js/scene.js` are finished (the 3D view is unchanged from Course 5.1).
- 21 TODOs are numbered across `server/` and `js/main.js`, in the order the README's Walkthrough uses them:
  - `server/auth.js`: TODOs 1, 2
  - `server/validation.js`: TODO 3
  - `server/sessions.js`: TODOs 4, 5
  - `server/rateLimit.js`: TODO 6
  - `server/store.js`: TODO 7
  - `server/routes.js`: TODOs 8, 9, 10, 11, 12, 13, 14, 15
  - `server/server.js`: TODO 16
  - `js/main.js`: TODOs 17, 18, 19, 20
  - `server/server.test.js`: TODO 21
- Before TODO 16, `node server/server.js` already starts a server that answers every request with `{ "ok": true }` — that is deliberate, so you have something to test with `curl` as you build up the pieces underneath it.
- Before TODO 17, the page loads and shows the exhibit with its default settings, but the account and settings sections stay in their signed-out state — that is expected.
- Before TODO 21, `node --test` passes trivially (the test bodies make requests but assert nothing yet): adding each assertion is the point of that step, and it will tell you exactly what your server sent instead of what the README says it should.

Open everything through a local server (`http://`), never `file://`: `js/main.js` uses ES modules, which browsers refuse to load from the filesystem directly.

Full instructions: [`../README.md`](../README.md).
