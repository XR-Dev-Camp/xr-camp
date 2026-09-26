# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Add a second, distinct interaction to the `interactive-exhibit` component: a dedicated "examine" action, separate from selecting.

## Task

1. Add a new schema property to `interactive-exhibit`: something like `examinable` (boolean, default `false`).
2. For exhibits with `examinable: true`, listen for a second event distinct from `click`, for example the raycaster's own `raycaster-intersected-cleared` or a long-press you implement yourself with `mousedown`/`mouseup` timing (at least 600 ms counts as a long press).
3. On that second interaction, do something selecting does not: for example, temporarily double the exhibit's scale, or swap its material to a highlighted variant, for two seconds, then revert. Use `tick()` or `setTimeout` (cleared safely in `remove()`) to time the revert.
4. Give this new interaction its own keyboard route: a second button per examinable exhibit ("Examine: <label>"), so nothing here depends on a mouse gesture that a keyboard cannot reproduce.
5. Document the new interaction in the info panel or `#scene-description`, so it is discoverable, not a hidden feature.

## Why this matters

Real exhibits often need more than one kind of interaction (select, then look closer). This challenge tests whether your component design generalises: adding a second interaction should extend `interactive-exhibit`, not require a second, parallel component with its own copy of the selection logic.

## Done when

- [ ] At least one exhibit supports both selecting and examining, as two distinct, documented interactions.
- [ ] The examine interaction has a working keyboard route.
- [ ] Any timer the examine interaction starts is cleared in `remove()`, so removing the exhibit mid-animation leaves nothing running.
