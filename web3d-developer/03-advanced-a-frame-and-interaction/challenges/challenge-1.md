# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Add a fourth interactive exhibit, using the same component and the same shared code path as the other three.

## Task

1. In `completed/index.html` (or your own working copy of the starter), add a new entity: any primitive you like (`a-box`, `a-cylinder`, `a-torus`, and others all work), with its own `id`.
2. Give it `class="interactive"` and `interactive-exhibit="exhibitId: <your-id>; action: turn"` (or `lift`, or `none` if you would rather it just highlights).
3. Add a matching object to `exhibitData` in `main.js`: `id`, `label`, `description`, `action`, and `hasAudio: false`.
4. Reload the page. Confirm your new exhibit appears in the 2D list, gets its own "Select" button automatically, and reacts the same way to a click, a tap, its button, and (if you can test it) a VR controller's trigger.

## Why this matters

A component and a shared `selectExhibit()` function exist so that adding a fourth exhibit is a data change and one HTML entity, not new code. If you found yourself writing a new function for your fourth exhibit, something is still hard-coded to "three exhibits" somewhere: find it and generalise it.

## Done when

- [ ] The new exhibit appears in the room, the 2D list, and the "Select" buttons, all built from the same `exhibitData` entry.
- [ ] Selecting it (by any input) plays its action and updates the info panel and `#status`, with no new function written beyond the `exhibitData` entry and the HTML attributes.
