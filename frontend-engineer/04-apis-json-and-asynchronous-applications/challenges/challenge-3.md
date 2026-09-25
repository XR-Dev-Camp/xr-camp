# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Add a second API: recent earthquakes near the chosen city.

## Task

1. The US Geological Survey (USGS) publishes free earthquake feeds as GeoJSON, with no key and with CORS allowed. Start with the past week's earthquakes of magnitude 2.5 and above: `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson`. Read its answer in the browser first (Step 1 of the lesson).
2. Each earthquake is a `feature` with `properties.mag`, `properties.place`, `properties.time`, and `geometry.coordinates` (longitude, latitude, depth: note the order).
3. Write a pure function `nearby(features, city, km)` that keeps earthquakes within `km` of the city. Look up the **haversine formula** for the distance between two points on a globe.
4. Show them with the same four states: loading, error, empty ("No earthquakes above 2.5 within 500 km this week": good news, said calmly), and ready.
5. Make a sample file with the same shape, for working offline. If the USGS feed is slow or blocked where you are, build with the sample first.
6. The two requests are independent: start both at once with `Promise.allSettled`, so one failing does not hide the other.

## Why this matters

Real dashboards combine several sources, and each can fail on its own. `Promise.allSettled`, one set of states per source, and a sample file per source are how professional apps stay useful when part of the internet is not.

## Done when

- [ ] Earthquakes near the chosen city appear in an accessible table or list.
- [ ] Each source has its own loading, error, empty, and ready states.
- [ ] One source failing does not stop the other.
- [ ] Both work offline with sample data.
