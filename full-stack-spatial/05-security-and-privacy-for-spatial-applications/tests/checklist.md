# Project check

Work through this list before you submit.

## Server and tests

- [ ] `npm install` (from `server/`) succeeds and creates `server/node_modules/` (never committed — check `.gitignore`).
- [ ] `node server.js` starts without error, printing the listening message and the one expected `ExperimentalWarning`.
- [ ] `npm test` (from `server/`) passes in full — all eight tests green.
- [ ] `npm audit` (from `server/`, after `npm install`) runs, and you can explain in your own words what it does and does not check.
- [ ] The server, once running, is reachable at `http://127.0.0.1:8890` and nowhere else on your network.

## The seven fixes, tried by hand

- [ ] An annotation containing `<script>` or `<img onerror=...>` shows up as plain, harmless text — never an alert box, never a broken layout.
- [ ] A chat message containing the same shows up as plain text in every open tab.
- [ ] Opening your browser's developer tools, under Network, shows a `Content-Security-Policy` response header with no `unsafe-inline` in its `script-src`.
- [ ] `server/config.js` contains no real secret — `APP_SECRET` is read from `process.env`, and `server/.env` (not `.env.example`) is the only place a real value lives.
- [ ] Signed in as one account, opening a second account's *private* scene by pasting its ID fails (404) — but a second account's *public* scene opens normally.
- [ ] A deliberately broken request (for example, a malformed request that reaches the server's catch-all handler) returns a generic message, never a file path or a stack trace.
- [ ] A scene saved with a precise location shows a visibly rounded value when you read it back — not the exact number you typed.

## Accessibility

- [ ] `#scene-description` accurately describes whichever scene is open, and updates when you open a different one.
- [ ] The chat log announces new messages without moving keyboard focus.
- [ ] Every control — creating a scene, opening one by ID, adding an annotation, sending chat — is reachable and operable with the keyboard alone.
- [ ] `prefers-reduced-motion: reduce` starts the scene marker's rotation paused, and the Pause/Resume button works regardless of that setting.
- [ ] Colour contrast meets WCAG 2.2 AA throughout.

## Responsiveness

- [ ] The page works at mobile width (390px) with no horizontal overflow.
- [ ] The page works at a wide desktop width (1280px).

## Quality

- [ ] The browser console has no errors on the completed page, tested as a static file with the server not running.
- [ ] Code is formatted consistently and meaningfully named.
- [ ] Comments explain intent, not syntax — especially anywhere this project chooses not to trust a value a client sent.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] The scene marker's colour (public/private) matches the 2D scene detail list next to it.
- [ ] The scene marker's idle rotation is smooth and never distracting, and stops completely (not just slows) when paused.
- [ ] Nothing in the 3D view moves the camera itself without you asking for it.
- [ ] The 3D view is never the only place a piece of information (a scene's name, visibility, or annotation count) appears.
