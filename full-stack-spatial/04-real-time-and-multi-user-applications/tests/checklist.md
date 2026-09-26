# Project check

Work through this list before you submit.

## Server

- [ ] `npm install` (from `server/`) succeeds and creates `server/node_modules/` (never committed — check `.gitignore`).
- [ ] `node server.js` starts without error, printing the listening message and the one expected `ExperimentalWarning`.
- [ ] `node --test` (from `server/`) passes in full, including all four TODO 11 tests.
- [ ] A WebSocket connection attempt with no session cookie is rejected before it opens.
- [ ] A position, chat, block, or report message sent faster than its rate limit is dropped or refused, not silently accepted.

## Real-time behaviour (two browser tabs, two accounts)

- [ ] Signing in as two different accounts, in two tabs, shows each account's avatar and roster row to the other.
- [ ] Moving in one tab updates the other tab's 3D view and roster table within a fraction of a second, with smooth (not jumpy) motion.
- [ ] A chat message sent in one tab appears in both tabs, in the order it was sent.
- [ ] Stopping the server (Ctrl+C) shows a reconnecting status in both tabs; restarting the server reconnects both automatically, without reloading the page.
- [ ] Blocking a member in one tab stops that member's position and chat from appearing there, in both directions of the block relationship if you test it both ways.
- [ ] Muting a member hides their chat only in the muting tab; the muted member's messages still appear normally elsewhere.
- [ ] Reporting a member shows a confirmation, and the report can be found in the database afterwards (see the README's Troubleshooting).

## Accessibility

- [ ] Every roster action button's accessible name says which member it acts on (not just "Mute" or "Block" with no name attached).
- [ ] The chat log announces new messages without moving keyboard focus.
- [ ] Every movement and turn control is reachable and operable with the keyboard alone.
- [ ] `prefers-reduced-motion: reduce` starts animation paused, and the Pause/Resume button works regardless of that setting.
- [ ] Colour contrast meets WCAG 2.2 AA throughout, including the roster table and chat log.

## Responsiveness

- [ ] The page works at mobile width (390px) with no horizontal overflow.
- [ ] The page works at a wide desktop width (1280px) with the 3D view and controls laid out sensibly side by side.

## Quality

- [ ] The browser console has no errors on the completed page, tested as a static file with the server not running.
- [ ] Code is formatted consistently and meaningfully named.
- [ ] Comments explain intent, not syntax — especially anywhere the server chooses not to trust a value the client sent.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] The scene description text accurately describes your position, facing, and who else is present, and updates as those change.
- [ ] Every learner's avatar is visually distinguishable from every other's (not relying on colour alone — check with a colour-blindness simulator if you have one).
- [ ] A remote avatar's motion looks smooth, not jumpy, on an ordinary connection.
- [ ] Your own avatar never idle-animates on its own; it only ever moves when you move it.
- [ ] Nothing in the 3D view moves the camera itself without the learner asking for it.
