// data.js: loading the course data.

// async functions can wait for slow work, like downloading a file, without
// freezing the page. They always return a Promise.
export async function loadCatalog(url = 'data/catalog.json') {
  const response = await fetch(url);

  // fetch only fails on network errors. A missing file still "succeeds" with
  // a 404 status, so we check, and throw our own error with a clear message.
  if (!response.ok) {
    throw new Error(`Could not load the course data (${response.status}).`);
  }
  return response.json();
}

// Groups lessons by phase number: { 0: [...], 1: [...], ... }
export function groupByPhase(lessons) {
  return lessons.reduce((groups, lesson) => {
    groups[lesson.phase] ??= [];          // create the list the first time
    groups[lesson.phase].push(lesson);
    return groups;
  }, {});
}

// Totals for a list of lessons, calculated with reduce.
export function totals(lessons) {
  return lessons.reduce(
    (sum, { minutes, sessions, status }) => ({
      minutes: sum.minutes + minutes,
      sessions: sum.sessions + sessions,
      ready: sum.ready + (status === 'ready' ? 1 : 0),
    }),
    { minutes: 0, sessions: 0, ready: 0 },
  );
}
