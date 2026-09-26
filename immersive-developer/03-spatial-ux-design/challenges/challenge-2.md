# Challenge 2: Creative

**Optional.** Roughly 45–60 minutes.

Customize the project so it reflects your own interests, community, or language.

## Task

1. Replace the kiosk's title and the goals panel's title (in `js/main.js`, the strings passed to `app.setKioskText` and `redrawGoalsPanel`) with wording in your own voice, or a second panel of your own: a personal reading list, a list of local meetups, a countdown to something that matters to you.
2. If you add a genuinely new panel, build it with `createPanel` and `drawPanelText` from `js/panels.js` exactly as the kiosk and goals panel are built, and give it its own lock mode using `setLockMode`.
3. If your text uses accents or non-Latin characters (á, ñ, 中文, and so on), test that they draw correctly on the canvas. Unlike A-Frame's built-in font, an HTML5 Canvas `fillText()` call uses the browser's own font stack, so most scripts your system can display should work — but check for yourself rather than assuming.
4. Update the scene description in `js/describe.js` so it still accurately describes whatever you added.

## Why this matters

Spatial UX design choices — distance, locking, legibility — apply to any content, not only a progress dashboard. Building something that matters to you is a better test of whether you actually understood *why* each choice was made, not just how to copy it.

## Done when

- [ ] The room shows content that is meaningfully yours, not only the original wording.
- [ ] Any new panel is legible at every waypoint and has a working lock mode.
- [ ] The scene description still matches what is actually in the room.
