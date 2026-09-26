# Project check

Work through this list before you submit.

## Password storage

- [ ] Registering the same password twice (two different accounts) produces two different stored hashes (different salts).
- [ ] `verifySecret()` (or the login route) correctly accepts the right password and rejects a wrong one.
- [ ] No route, log line, or test file ever prints a plain-text password or recovery code after it has been hashed.

## Sessions and cookies

- [ ] A successful login sets a cookie; `document.cookie` in the browser console never shows it (it is `HttpOnly`).
- [ ] The cookie has `SameSite=Lax` and, when served over HTTPS, `Secure`.
- [ ] Using the session cookie after logout returns `401` on every protected route.
- [ ] Restarting the server signs every account out (sessions are in-memory, and the README says so).

## CSRF and rate limiting

- [ ] A `PUT`, `POST` (past login), or `DELETE` request with a missing or wrong `X-CSRF-Token` header is rejected with `403`.
- [ ] Five failed logins for the same username return `429` on the sixth attempt; a correct login afterward still works once the window passes (or the counter is cleared).
- [ ] A wrong password and an unknown username get the exact same status code and message.

## Roles and ownership

- [ ] A visitor account can read and change only its own settings, never another account's.
- [ ] A visitor account gets `403` trying to edit the curator's note; a curator account can.
- [ ] The curator's shared-settings dashboard shows only accounts that turned sharing on.

## Recovery, export, deletion

- [ ] A registration's one-time recovery code successfully resets that account's password, and issues a new recovery code.
- [ ] Recovering a password signs out every existing session for that account.
- [ ] `GET /api/account/export` returns the account's own data, with no password hash or recovery-code hash in it.
- [ ] `DELETE /api/account` requires the correct current password, and actually removes the account afterward.

## Automated tests

- [ ] `node --test` (or `npm test`) passes every test, with no dependency installed.

## The client

- [ ] Registration shows the one-time recovery code clearly, and it is not shown again after the page reloads.
- [ ] Signing in and signing out both update the account panel and the settings panel correctly.
- [ ] With no server running (or on a plain static server), the page still loads with no console errors, and says clearly that accounts need the server.

## Accessibility

- [ ] Every field in every form (account, settings, curator's note, delete confirmation) has a visible label.
- [ ] Field errors from the server appear as readable text, not only as a colour change.
- [ ] The status banner announces changes to screen-reader users (it is a `role="status"` live region).
- [ ] The "Forgotten your password?" button's `aria-expanded` state always matches whether the recovery form is shown.
- [ ] The keyboard alone can reach and use every control, including the recovery disclosure button.
- [ ] Focus is visible at all times.
- [ ] Colour contrast meets WCAG 2.2 AA.
- [ ] With your device set to reduce motion, the jade stone starts paused, and the Pause button's label matches what is actually happening.

## Responsiveness

- [ ] The page works at 390px and at 1280px wide, with no horizontal scrolling.

## Quality

- [ ] The browser console has no errors on the completed page, with the server running.
- [ ] Code is formatted consistently and meaningfully named.
- [ ] Comments explain intent, not syntax.
- [ ] `.env` is not committed; only `.env.example` is.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] The scene description in `#scene-description` matches whichever settings are currently in effect: the shared defaults when signed out, or the signed-in account's own saved settings.
- [ ] The always-present exhibit list and the 3D view never disagree about which exhibits are shown.
- [ ] No interaction in the 3D view has a mouse-only route: every setting that changes it is an ordinary keyboard-accessible form control.
- [ ] The camera never moves except to a preset you chose; nothing zooms, tilts, or shakes on its own.
