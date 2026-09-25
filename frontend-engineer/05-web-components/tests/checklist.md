# Project check

Work through this list before you submit.

## The component
- [ ] `<lesson-card>` is defined once, with a name that contains a hyphen.
- [ ] Its structure and styles live in a shadow root, copied from a `<template>`.
- [ ] The `description` slot and the default slot both work, and the fallback text shows when the description slot is empty.
- [ ] Changing `lesson-title`, `minutes`, `status`, `done`, or `heading-level` in the Elements panel updates the card at once.
- [ ] `heading-level` from 2 to 6 gives the right heading; anything else gives an `<h3>`.
- [ ] Pressing Done fires `lesson-toggle`, which bubbles and is composed, with `{ lessonId, title, done }`.
- [ ] Setting `card.done` from code does not fire the event.
- [ ] The page styles the card only through custom properties and `::part()`. It never reaches into `shadowRoot`.
- [ ] All text is set with `textContent`.

## The page
- [ ] The card written in HTML shows its title and description with JavaScript off.
- [ ] Every lesson in the chosen phase appears as a card.
- [ ] One listener handles `lesson-toggle` for every card.
- [ ] Done is remembered after a reload, and the Course 2.2 dashboard's goals are not lost.
- [ ] The console shows no errors.

## Accessibility
- [ ] Every card's title is a heading, at the right level for the page.
- [ ] Every Done button can be reached with Tab, and pressed with Enter and Space.
- [ ] Every Done button's name starts with "Done" and includes the lesson: "Done: Web Components".
- [ ] Its pressed state is announced.
- [ ] Focus is clearly visible on every button, inside and outside the cards.
- [ ] Status is written in words, not shown by colour alone.
- [ ] Every change is announced by the page's live region.
- [ ] The page works at 390 pixels wide, with no sideways scrolling.

## Documentation
- [ ] `components.md` lists every attribute, property, slot, event, and part, with an example.
- [ ] Someone else could use the card by reading only `components.md`.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] The description paragraph (`id="scene-description"`) says what the scene shows, and is visible without the 3D scene.
- [ ] The scene has a name (`label`), and points to the description with `aria-describedby`.
- [ ] With reduced motion on, the model does not turn until you press Pause animation to start it.
- [ ] Pause animation stops and restarts turning, from the keyboard, and shows its state with `aria-pressed`.
- [ ] Turn left and Turn right work from the keyboard, and each turn is announced.
- [ ] Nothing flashes, and the camera never moves on its own.
- [ ] You can explain, in one sentence, why `<model-stage>` has no shadow root.
