// utils.js: small pure functions.
// "Pure" means: the same input always gives the same output, and nothing
// else changes. No DOM, no localStorage. That makes them easy to test
// (open check.html).

import { DAYS } from './config.js';

// plural(1, 'session') → "1 session"; plural(3, 'session') → "3 sessions"
export function plural(count, one, many = `${one}s`) {
  return `${count} ${count === 1 ? one : many}`;
}

// describeMinutes(90) → "1 hour 30 minutes"; describeMinutes(0) → "0 minutes"
export function describeMinutes(total) {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  const parts = [];
  if (hours > 0) parts.push(plural(hours, 'hour'));
  if (minutes > 0 || hours === 0) parts.push(plural(minutes, 'minute'));
  return parts.join(' ');
}

// For Array.prototype.sort: by day of the week, then by time ("09:00" < "19:00").
export function bySchedule(a, b) {
  return DAYS.indexOf(a.day) - DAYS.indexOf(b.day) || a.time.localeCompare(b.time);
}

// "Tuesday at 19:00: CSS grid"
export function sessionLabel(session) {
  return `${session.day} at ${session.time}: ${session.topic}`;
}
