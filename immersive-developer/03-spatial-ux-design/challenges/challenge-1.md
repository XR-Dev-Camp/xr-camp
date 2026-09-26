# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Add a fourth waypoint, and use it to test a distance this lesson does not.

## Task

1. In `js/locomotion.js`, add a fourth entry to `WAYPOINTS`: give it an `id`, a `label`, and a `distance` in metres of your own choosing (try something outside 0.6–2.5 m, such as 0.3 m or 4 m).
2. In `js/app.js`, give your new waypoint a marker colour in `MARKER_COLORS` (any hex colour not already used).
3. Reload the page. Your new waypoint should appear as a fourth button and a fourth floor marker, and clicking or tapping either one should teleport you there.
4. Read the angular-size number the scene description reports at your new distance. Is the kiosk still comfortably readable there?
5. Add one sentence to your `design-rationale.md` about what you found.

## Why this matters

A fixed set of three distances teaches the idea, but real content is never read at only three distances. Adding one more, and reading the resulting number instead of guessing, is the whole method this lesson is trying to teach: test a distance, read the result, decide.

## Done when

- [ ] A fourth waypoint button and floor marker both work, and both teleport correctly.
- [ ] The scene description correctly reports your new waypoint's label and distance.
- [ ] `design-rationale.md` mentions what you found at the new distance.
