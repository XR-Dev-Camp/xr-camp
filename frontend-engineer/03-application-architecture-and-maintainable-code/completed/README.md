# Completed — Application Architecture and Maintainable Code

The reference solution: the old planner, refactored. Open it after you have
tried the starter.

- `index.html`: the page, with the form written in HTML (progressive enhancement).
- `js/config.js`: every setting in one place.
- `js/utils.js`: pure functions, tested by `check.html`.
- `js/store.js`: the state, the only module that changes it or touches `localStorage`.
- `js/components/`: `session-item.js`, `session-list.js`, `week-summary.js`: build elements, never change state.
- `js/main.js`: wires the page's elements and events to the store and components.
- `3d-moment.html`: the tangled 3D exhibit, refactored into data and small components.

Open everything through a local server (http://).
