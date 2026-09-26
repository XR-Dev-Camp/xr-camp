# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Add a health-check route, and a fifth setting.

## Task

1. Add `GET /api/health` to `routes.js` and `server.js`. It should respond `200` with `{ "status": "ok" }`, and it needs no validation and no saved state.
2. Add a fifth field to the settings object: `showLabels` (a boolean, true by default), which will show or hide the exhibit names as on-screen labels in a later lesson. Add it to `DEFAULT_SETTINGS` and to `validateSettings()` in `validation.js`, using `checkBooleanField`.
3. Add a checkbox for it in `index.html`, and read and apply it in `js/main.js` (you do not need to actually draw labels in `js/scene.js` — just save and load the setting correctly).
4. Add a test for `GET /api/health` and at least one for the new field to `server.test.js`.

## Why this matters

A real API grows one small, careful field at a time. This challenge is the smallest possible version of that: touching the same four files (`validation.js`, `store.js` needs no change, `routes.js`, and the client) every future field will touch, without anything new to design.

## Done when

- [ ] `curl http://127.0.0.1:8877/api/health` returns `{ "status": "ok" }` with status 200.
- [ ] `showLabels` round-trips through `PUT` and `GET` like the other four fields.
- [ ] Sending `"showLabels": "yes"` (a string, not a boolean) is rejected with a 400 and a clear message.
- [ ] `node --test` still passes, including your new tests.
