// utils.js: small pure functions, collected from Courses 2.1 to 2.4.
// Pure: the same input always gives the same output, and nothing else
// changes. No DOM, no storage, no language. That makes them easy to test:
// open check.html.
//
// None of them returns a sentence. Words belong to the locale files, and
// numbers are formatted by i18n.js, so these work in every language.

import { DAYS } from './config.js';

// --- Course progress (Courses 2.1 and 2.2) -----------------------------------

// Totals for a list of lessons (Course 2.1).
export function totals(lessons) {
  return lessons.reduce(
    (sum, { minutes, status }) => ({
      minutes: sum.minutes + minutes,
      ready: sum.ready + (status === 'ready' ? 1 : 0),
    }),
    { minutes: 0, ready: 0 },
  );
}

// One row per phase: { phase, title, done, total }. The dashboard's table,
// its 3D columns, and the scene description all come from these rows, so
// they can never disagree.
export function phaseProgress(catalog, done) {
  return catalog.phases.map(({ phase, title }) => {
    const lessons = catalog.lessons.filter((lesson) => lesson.phase === phase);
    return {
      phase,
      title,
      done: lessons.filter((lesson) => done.has(lesson.id)).length,
      total: lessons.length,
    };
  });
}

// A fraction from 0 to 1, for Intl's percent style: 0.25 → "25%".
// (Course 2.2 returned a rounded whole number. Intl now does the rounding.)
export function fraction(part, whole) {
  return whole === 0 ? 0 : part / whole;
}

// The first ready lesson that is not done yet, or undefined.
export function nextLesson(lessons, done) {
  return lessons.find((lesson) => lesson.status === 'ready' && !done.has(lesson.id));
}

// --- Session planner (Course 2.3) ------------------------------------------

// For Array.prototype.sort: by day of the week, then by time.
export function bySchedule(a, b) {
  return DAYS.indexOf(a.day) - DAYS.indexOf(b.day) || a.time.localeCompare(b.time);
}

// --- Weather (Course 2.4) --------------------------------------------------

// The API sends parallel arrays; turn them into one object per day.
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

// --- Release (Course 2.7) --------------------------------------------------

// MAJOR.MINOR.PATCH, with an optional pre-release ("-beta.1") or build part.
// A simplified form of the pattern suggested on semver.org.
export function isSemver(version) {
  return /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-[0-9A-Za-z.-]+)?(\+[0-9A-Za-z.-]+)?$/.test(version);
}
