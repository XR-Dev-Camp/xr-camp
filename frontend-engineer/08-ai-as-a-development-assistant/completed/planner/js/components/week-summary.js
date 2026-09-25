// week-summary.js: the progress sentence under the lists.

import { SESSION_MINUTES, WEEKLY_GOAL } from '../config.js';
import { describeMinutes } from '../utils.js';

export function weekSummary(sessions) {
  const done = sessions.filter((session) => session.done).length;
  const time = describeMinutes(done * SESSION_MINUTES);

  const line = document.createElement('p');
  line.textContent = `${done} of ${WEEKLY_GOAL} sessions done this week (${time}).`;

  if (done < WEEKLY_GOAL) return [line];

  const reached = document.createElement('p');
  reached.className = 'goal-reached';
  reached.textContent = 'Weekly goal reached. Well done!';
  return [line, reached];
}
