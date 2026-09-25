# Challenge 3: Explorer

**Optional.** Roughly 45 minutes.

Two columns for the join form on wide screens, without changing its reading order.

## Task

1. On wide screens only, show the "About you" fieldset and the programme choice side by side, with the rest of the form below.
2. Use CSS grid on the `<form>` inside a `@media (min-width: 60rem)` query.
3. Do **not** move anything in the HTML.
4. Press Tab through the form: focus must still move in a sensible order, top to bottom and left to right.

## Why this matters

CSS grid can place things anywhere on the screen, which makes it easy to show things in one order and read them in another. Keyboard and screen-reader users follow the HTML order, so the visual order and the reading order must match.

## Done when

- [ ] On wide screens, the two groups sit side by side.
- [ ] The HTML order is unchanged.
- [ ] Tab moves through the form in the order it looks.
