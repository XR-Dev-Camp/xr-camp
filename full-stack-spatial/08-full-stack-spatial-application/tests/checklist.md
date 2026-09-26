# Project check

Work through this list before you submit.

## Server and tests

- [ ] `npm install` (from `server/`) succeeds and creates `server/node_modules/` (never committed — check `.gitignore`).
- [ ] `node server.js` starts without error, printing the listening message and the one expected `ExperimentalWarning`.
- [ ] `npm test` (from `server/`) passes in full — all ten tests green.
- [ ] The server, once running, is reachable at `http://127.0.0.1:8891` and nowhere else on your network.

## Inherited from Course 5.5 (still holds)

- [ ] An annotation or chat message containing `<script>` or `<img onerror=...>` shows up as plain, harmless text.
- [ ] The response headers include a `Content-Security-Policy` with no `unsafe-inline` in `script-src`.
- [ ] `server/config.js` reads `APP_SECRET` from the environment; `server/.env` (not `.env.example`) is the only place a real value lives.
- [ ] Opening a second account's private scene by pasting its ID fails (404); its public scene opens normally.
- [ ] A scene saved with a precise location shows a visibly rounded value when read back.

## This capstone's AI description draft

- [ ] Opening a scene and choosing "Draft description" shows text mentioning that scene's own name and its annotations, with no delay and no network request visible in DevTools.
- [ ] The draft appears in an editable textarea before it is saved anywhere.
- [ ] Choosing "Save description" stores the text, and it is still there after reopening the scene.
- [ ] Signed in as an account that can view but does not own a public scene, drafting a description succeeds but saving one fails (404).
- [ ] A description containing `<script>` is stored and shown as plain text, never markup.

## Accessibility

- [ ] `#scene-description` accurately describes whichever scene is open, and updates when you open a different one.
- [ ] The description panel's textarea has a visible, associated label.
- [ ] Every control — creating a scene, opening one by ID, adding an annotation, drafting and saving a description, sending chat — is reachable and operable with the keyboard alone.
- [ ] `prefers-reduced-motion: reduce` starts the scene marker's rotation paused, and the Pause/Resume button works regardless of that setting.
- [ ] Colour contrast meets WCAG 2.2 AA throughout.

## Responsiveness

- [ ] The page works at mobile width (390px) with no horizontal overflow.
- [ ] The page works at a wide desktop width (1280px).

## Documentation

- [ ] `deployment-notes.md` accurately describes how you actually ran this project.
- [ ] `CHANGELOG.md`'s `1.0.0` entry describes what your build actually ships.
- [ ] `SECURITY.md` still describes this project accurately.

## Quality

- [ ] The browser console has no errors on the completed page, tested as a static file with the server not running.
- [ ] Code is formatted consistently and meaningfully named.
- [ ] Comments explain intent, not syntax — especially anywhere this project chooses to trust, or not trust, a value.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] The scene marker's idle rotation is smooth and never distracting, and stops completely (not just slows) when paused.
- [ ] Nothing in the 3D view moves the camera itself without you asking for it.
- [ ] The 3D view is never the only place a piece of information (a scene's name, visibility, annotation count, or saved description) appears.
- [ ] The description panel reads naturally alongside the 3D view and the 2D scene-detail list, not as a disconnected extra section.
