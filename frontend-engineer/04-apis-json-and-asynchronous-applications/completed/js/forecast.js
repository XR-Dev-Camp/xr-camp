// forecast.js: pure functions that turn the API's JSON into what we show.

// The API sends parallel arrays: daily.time[0] goes with
// daily.temperature_2m_max[0], and so on. Turn them into one object per day.
export function toDays(json) {
  const daily = json?.daily;
  if (!daily || !Array.isArray(daily.time)) return [];
  return daily.time.map((date, i) => ({
    date,
    max: daily.temperature_2m_max[i],
    min: daily.temperature_2m_min[i],
    rain: daily.precipitation_probability_max[i],
  }));
}

// The best day to walk to a study session: the lowest chance of rain.
export function driestDay(days) {
  return days.reduce((best, day) => (day.rain < best.rain ? day : best), days[0]);
}

// "Monday 28 September", in the page's language. The date string has no time,
// so add noon to stop time zones moving it to the day before.
export function dayName(date, locale = document.documentElement.lang) {
  return new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long' })
    .format(new Date(`${date}T12:00:00`));
}
