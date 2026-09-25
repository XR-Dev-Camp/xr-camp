// utils.js: small pure functions. No DOM, no localStorage.
// Open check.html to test them: every line should say PASS.

import { DAYS } from './config.js';

// TODO 4: Export plural(count, one, many = `${one}s`), which returns
// "1 session" or "3 sessions"; and describeMinutes(total), which returns
// "45 minutes", "3 hours", "1 hour 30 minutes", or "0 minutes".
// Use plural() inside describeMinutes().

// TODO 5: Export bySchedule(a, b) for Array.prototype.sort: by day, using
// DAYS.indexOf, then by time with localeCompare. And sessionLabel(session),
// which returns "Tuesday at 19:00: CSS grid".
