// format.js: small, pure functions that turn numbers into words.

export const SESSION_MINUTES = 45;

export const plural = (count, one, many = `${one}s`) => (count === 1 ? one : many);

// 600 → "About 10 hours · 14 sessions of 45 minutes"
export function describeMinutes(minutes) {
  const hours = Math.max(1, Math.round(minutes / 60));
  const sessions = Math.ceil(minutes / SESSION_MINUTES);
  return `About ${hours} ${plural(hours, 'hour')} · ${sessions} ${plural(sessions, 'session')} of ${SESSION_MINUTES} minutes`;
}
