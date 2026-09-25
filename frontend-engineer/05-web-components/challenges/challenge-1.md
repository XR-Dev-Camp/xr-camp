# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Grow the card without breaking anyone who already uses it.

## Task

1. Add a `lesson-number` attribute, for example `lesson-number="2.5"`. When it is set, show it before the title, inside the heading: "2.5 Web Components". When it is missing, show only the title.
2. Add it to `observedAttributes`, and check that changing it in the Elements panel updates the card at once.
3. Show the number in its own `<span part="number">`, so pages can style it with `lesson-card::part(number)`. Style it on your page.
4. Should the button's name change too? Decide, and write down why. ("Done: 2.5 Web Components", or "Done: Web Components"?)
5. In `main.js`, set `lesson-number` for every catalog card, and remove the "Course 2.5 of XR Camp." sentence if it now repeats the number.
6. Update `components.md`: the attributes table, the parts table, and the example.

## Why this matters

Once other pages use your component, its attributes, events, and parts are a promise. A new, optional attribute keeps the promise: every card written before still works exactly as it did. Removing or renaming something breaks it.

## Done when

- [ ] Cards with and without `lesson-number` both look right.
- [ ] The number changes live when the attribute changes.
- [ ] The page styles the number with `::part(number)`.
- [ ] The heading still reads well in a screen reader's headings list.
- [ ] `components.md` documents the new attribute and part.
