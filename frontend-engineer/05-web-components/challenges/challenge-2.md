# Challenge 2: Creative

**Optional.** Roughly 45–60 minutes.

Make a card that speaks your language, about something from your community.

## Task

1. Write a new card, straight into `index.html`, for something you would like to learn or teach: a workshop in your town, a craft from your family, a project with friends. Use the slots: a description, and anything else you want in the default slot (a list, a link, a note).
2. Make the card's own words follow the page's language. Find the nearest `lang` with `this.closest('[lang]')?.lang`, and keep the words in a small table:

   ```js
   const WORDS = {
     en: { ready: 'Ready', 'coming-soon': 'Coming soon', done: 'Done' },
     es: { ready: 'Disponible', 'coming-soon': 'Próximamente', done: 'Hecho' },
   };
   ```

   Add your own language if it is not there. Fall back to English for any language you have not written.
3. Show the time with the browser's `Intl` API, so numbers follow your language too: `new Intl.NumberFormat('es').format(10)`.
4. Set `lang` on one card only (`<lesson-card lang="es">`), and check that only that card changes. Does the button's accessible name change language too?

## Why this matters

A component is used in many places, by many people. When its words come from the page's language, one component serves every community, and XR Camp's lessons are written in English, Spanish, and Chinese for exactly that reason.

## Done when

- [ ] A card about something from your own community, with both slots used.
- [ ] The badge, the button, and the time appear in the page's language.
- [ ] An unknown language falls back to English, with no errors.
- [ ] The button's name still starts with its visible word.
