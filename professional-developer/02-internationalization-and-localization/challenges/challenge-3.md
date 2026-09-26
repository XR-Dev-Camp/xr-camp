# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Detect and warn about text that is too long for its container, automatically.

## Task

1. Write a small function, `checkOverflow(root = document)`, that walks every
   element in `root` carrying `data-i18n` and checks whether
   `element.scrollWidth > element.clientWidth` or `element.scrollHeight >
   element.clientHeight` (a real overflow, not just wrapped text).
2. Call it after every `renderAll()` in `main.js`, and `console.warn` the
   element's key and current language for anything that overflows.
3. Turn on pseudo-localization and switch through all three real languages
   with it on. Fix any overflow your new check finds — usually a `min-width`
   that should be a `flex-basis`, or a `white-space: nowrap` that should not
   be there (see "Text-expansion-safe layout" in the README).
4. Optional further stretch: instead of only warning, add a small on-page
   panel (hidden unless pseudo-localization is on) listing every overflowing
   key, so a translator's own review does not need the browser console.

## Why this matters

Nobody manually clicks through every string in every language before every
release. An automated overflow check, run as part of your test suite or CI
(a job for Course 6.1's pipeline, not this lesson), is what catches a
translator's longer sentence breaking a button before a learner ever sees it.

## Done when

- [ ] `checkOverflow` correctly flags at least one deliberately-broken
      element (temporarily shrink a `.hint`'s `max-width` to prove it works).
- [ ] It reports nothing once real overflows are fixed.
- [ ] Pseudo-localization plus this check finds problems that pseudo-localization alone does not make obvious by eye.
