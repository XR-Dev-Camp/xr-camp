# Completed — Web Components

The reference solution. Open it after you have tried the starter.

- `index.html`: the lesson cards page. One card is written in HTML; the rest come from the catalog.
- `js/lesson-card.js`: the `<lesson-card>` custom element: template, shadow DOM, slots, parts, attributes, and the `lesson-toggle` event.
- `js/main.js`: the page. It creates cards, sets attributes, and listens for `lesson-toggle`.
- `js/progress.js`: saves which lessons are done, with the same key as the Course 2.2 dashboard.
- `js/data.js`, `js/format.js`: loading the catalog, and turning minutes into words.
- `data/catalog.json`: the same course data as Course 2.2.
- `components.md`: the documentation for both elements.
- `3d-moment.html` and `js/model-stage.js`: `<model-stage>`, a 3D viewer in your own element, built in the light DOM.

Open everything through a local server (http://).
