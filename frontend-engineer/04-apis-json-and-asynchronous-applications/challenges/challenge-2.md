# Challenge 2: Creative

**Optional.** Roughly 60 minutes.

A dashboard of public data for **your** community.

## Task

1. Add your own town to `CITIES` in `config.js`: find its latitude and longitude on any map.
2. Add one more daily value that matters where you live. The Open-Meteo documentation lists them: for example `uv_index_max` (sun), `wind_speed_10m_max`, or `precipitation_sum` (how much rain, not just the chance). Add it to the URL, `toDays`, the table, and the sample file.
3. Change the summary sentence to something useful for your community: the best day for a market, for drying laundry, for a walk to the library.
4. Show days and numbers in your language: set `<html lang>` to `es` or `zh-Hans`, and let `Intl` do the rest. Translate the labels.
5. Credit the data source on the page, as the licence asks.

## Why this matters

The same four states, cache, and race protection work for any public data: bus times, air quality, library opening hours. Once you have built one data dashboard properly, you can build them for anything your community needs.

## Done when

- [ ] Your town is in the list, with a new daily value in the table and the sample file.
- [ ] The summary says something useful for your community.
- [ ] Days and labels appear in your language.
- [ ] The data source is credited.
