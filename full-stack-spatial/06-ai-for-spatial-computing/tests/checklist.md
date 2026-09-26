# Project check

Work through this list before you submit.

## Structure
- [ ] The page has a valid document structure and one clear main heading.
- [ ] The page language is identified (`<html lang="en">`).
- [ ] `node scripts/validate-projects.mjs` passes from the repository root.

## AI features
- [ ] `GET /api/ai/status` reports `"mock"` with a default `.env`, and never includes a key of any kind.
- [ ] Generating a description never saves it: reloading the scene right after shows the same "Saved description" as before.
- [ ] Saving a description only happens after clicking "Save this description", and only that click calls `PUT /api/scenes/:id/description`.
- [ ] A search result never lists a scene that does not exist — check `body.dropped` is empty for an ordinary search, and confirm in `server/ai.js`'s tests that an invented id is filtered out.
- [ ] The "Data sent to the AI provider" details element, for both a description and a search, shows only scene data (names, exhibits, positions, annotations) — never a request header, an internal id format you did not expect, or anything else.
- [ ] Sending more than `AI_MAX_CALLS_PER_WINDOW` AI requests in a row returns `429`, not a silent success.
- [ ] `node --test` (from `starter/server` or `completed/server`) passes, entirely against the mock provider — no network access is required.
- [ ] No query anywhere in `server/` builds SQL with string concatenation or a template literal — every value travels through a `?` placeholder.
- [ ] No real API key exists anywhere in the committed project — only `server/.env.example` with placeholders.

## Accessibility
- [ ] Every position and rotation can be changed with the keyboard alone.
- [ ] The scene description and the position/rotation table always match the 3D view.
- [ ] The AI-use disclosure section is visible on page load, without any action needed to reveal it.
- [ ] A draft description and warnings appear as real, readable text, not only as colour.
- [ ] The keyboard can reach every interactive control, including "Generate a draft description" and "Search", in a sensible order.
- [ ] Focus is visible at all times.
- [ ] Colour contrast meets WCAG 2.2 AA.
- [ ] The exhibit respects `prefers-reduced-motion`, and the Pause button works regardless of that preference.

## Responsiveness
- [ ] The page works at mobile width (390px) and no wider layout (1280px) overflows horizontally.

## Quality
- [ ] The browser console has no errors on the completed page while the server is running.
- [ ] Code is formatted consistently and meaningfully named.
- [ ] Comments explain intent, not syntax.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] Every exhibit's position and rotation in the 3D view matches the numbers shown in the table beneath it.
- [ ] Turning an object with the rotation input turns the correct exhibit, by the correct amount, in the correct direction.
- [ ] An annotation marker appears near the exhibit it is attached to, and disappears when the marker's exhibit is not currently visible from the camera.
- [ ] With `prefers-reduced-motion: reduce` set at the operating-system level, the jade stone does not turn on page load.
- [ ] The Pause/Resume animation button's label and `aria-pressed` state always match what the scene is actually doing.
