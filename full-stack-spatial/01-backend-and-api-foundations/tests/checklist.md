# Project check

Work through this list before you submit.

## The API

- [ ] `GET /api/settings` returns 200 and the saved settings, or the defaults if none are saved yet.
- [ ] `PUT /api/settings` with a valid body returns 200 and the settings you sent.
- [ ] `PUT /api/settings` with an unknown exhibit id, a bad camera preset, or a missing field returns 400, with a `details` array naming every problem.
- [ ] `PUT /api/settings` with the wrong `Content-Type` returns 415.
- [ ] `DELETE /api/settings` returns 204, and a `GET` afterwards shows the defaults again.
- [ ] A request to `/api/not-a-real-route` returns a JSON 404, not a crash or a hang.
- [ ] Restarting the server keeps your last saved settings (the `data/settings.json` file persists them).
- [ ] `node --test` (or `npm test`) passes every test, with no dependency installed.

## Environment variables and CORS

- [ ] Changing `PORT` in `.env` changes which port the server listens on.
- [ ] `.env` is not committed; only `.env.example` is.
- [ ] Opening the client from a different local origin than the API does not show a CORS error in the console.

## The client

- [ ] With the server running, opening `http://127.0.0.1:8877/` shows the settings panel and the 3D exhibit together.
- [ ] Ticking or unticking an exhibit and pressing **Save settings** changes both the 2D list and the 3D view.
- [ ] **Reset to defaults** restores all three exhibits, the front camera, English, and motion allowed.
- [ ] With no server running (or on a plain static server), the page still loads, shows "Server not running: settings are saved in this browser only.", and Save/Reset still work, using this browser's storage.

## Accessibility

- [ ] Every field in the settings form has a visible label.
- [ ] Field errors from a 400 response appear as readable text, not only as a colour change.
- [ ] The status banner announces changes to screen-reader users (it is a `role="status"` live region).
- [ ] The keyboard alone can reach and use every control: every checkbox, radio button, the language `<select>`, and every button.
- [ ] Focus is visible at all times.
- [ ] Colour contrast meets WCAG 2.2 AA.
- [ ] With your device set to reduce motion, the jade stone starts paused, and the Pause button's label matches what is actually happening.

## Responsiveness

- [ ] The page works at 390px and at 1280px wide, with no horizontal scrolling.

## Quality

- [ ] The browser console has no errors on the completed page, with the server running.
- [ ] Code is formatted consistently and meaningfully named.
- [ ] Comments explain intent, not syntax.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] The scene description in `#scene-description` names every exhibit that is actually shown, matches the camera preset in effect, and matches whether the jade stone is turning.
- [ ] The always-present exhibit list and the 3D view never disagree about which exhibits are shown.
- [ ] No interaction in the 3D view has a mouse-only route: every setting that changes it (which exhibits, the camera preset, reduced motion, pause) is an ordinary keyboard-accessible form control.
- [ ] The camera never moves except to a preset you chose; nothing zooms, tilts, or shakes on its own.
