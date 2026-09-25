# Completed — APIs, JSON, and Asynchronous Applications

The reference solution: a 7-day weather dashboard for planning study
sessions. Open it after you have tried the starter.

- `js/config.js`: the API address, cities, cache time, and timeout.
- `js/api.js`: builds the URL, fetches with a timeout, and checks `response.ok`.
- `js/forecast.js`: pure functions that turn the API's parallel arrays into days.
- `js/cache.js`: saves each city's last answer in `localStorage`, with its time.
- `js/view.js`: the four states: loading, error (with Try again), empty, and ready (a table).
- `js/main.js`: cache first, then the network; ignores late answers; sample data and the `online` event.
- `data/sample-forecast.json`: sample data with the API's exact shape.
- `3d-moment.html`: the same forecast as 3D bars, with the table as its 2D twin.

Weather data by [Open-Meteo.com](https://open-meteo.com/), under CC BY 4.0.
Open everything through a local server (http://).
