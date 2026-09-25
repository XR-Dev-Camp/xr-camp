// format.js: small, pure functions that turn numbers into words.
// "Pure" means: the same input always gives the same output, and nothing
// else changes. Pure functions are the easiest code to test and to trust.

export const hours = (minutes) => Math.round(minutes / 60);

export const plural = (count, one, many = `${one}s`) => (count === 1 ? one : many);

export const describeTime = ({ minutes, sessions }) =>
  `${hours(minutes)} ${plural(hours(minutes), 'hour')} · ${sessions} ${plural(sessions, 'session')}`;
