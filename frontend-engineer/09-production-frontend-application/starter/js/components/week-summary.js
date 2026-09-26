// week-summary.js: the progress sentence under the planner (Course 2.3).
// It is also shown on the dashboard, under "This week".

import { SESSION_MINUTES, WEEKLY_GOAL } from '../config.js';
import { t } from '../i18n.js';

// 90 → "1 hour 30 minutes", in the current language. Course 2.3's
// describeMinutes, with its words moved to the locale files.
export function describeMinutes(total) {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  const parts = [];
  if (hours > 0) parts.push(t('time.hours', { count: hours }));
  if (minutes > 0 || hours === 0) parts.push(t('time.minutes', { count: minutes }));
  return parts.join(t('time.join'));
}

export function weekSummary(sessions) {
  const done = sessions.filter((session) => session.done).length;

  const line = document.createElement('p');
  line.textContent = t('planner.summary', {
    count: done,
    goal: WEEKLY_GOAL,
    time: describeMinutes(done * SESSION_MINUTES),
  });
  if (done < WEEKLY_GOAL) return [line];

  const reached = document.createElement('p');
  reached.className = 'goal-reached';
  reached.textContent = t('planner.goalReached');
  return [line, reached];
}
