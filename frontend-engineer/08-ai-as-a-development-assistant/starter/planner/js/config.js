// config.js: every setting in one place.
// The old app repeated these numbers and lists in several places. Now, to
// change the weekly goal, you change one line.

// In week order. Used to sort sessions. The <option> values in index.html
// must match these names exactly.
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// One XR Camp session is 45 minutes.
export const SESSION_MINUTES = 45;

// How many sessions a week the planner counts as "goal reached".
export const WEEKLY_GOAL = 4;

// Kept the same as the old app's key, so learners do not lose saved sessions.
export const STORAGE_KEY = 'xrc_s';
