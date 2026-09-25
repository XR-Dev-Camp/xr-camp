// forecast.js: pure functions that turn the API's JSON into what we show.

// TODO 3: Export toDays(json). The API sends parallel arrays: daily.time[0]
// goes with daily.temperature_2m_max[0], and so on. Return one object per
// day: { date, max, min, rain } (rain is precipitation_probability_max).
// If json.daily or json.daily.time is missing, return [] (the empty state).
// Tip: json?.daily is undefined instead of an error when json is null.
export function toDays(json) {
  return [];
}

// TODO 4: Make driestDay(days) return the day with the lowest rain chance.
// Use reduce, starting from days[0]. (For now it returns the first day.)
export function driestDay(days) {
  return days[0];
}

// Finished: "Monday 28 September", in the page's language. The date string
// has no time, so noon stops time zones moving it to the day before.
export function dayName(date, locale = document.documentElement.lang) {
  return new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long' })
    .format(new Date(`${date}T12:00:00`));
}
