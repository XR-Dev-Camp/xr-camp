// progress.js: which lessons are done, kept in this browser.
//
// It uses the same key and the same shape as the learning dashboard from
// Course 2.2, so a lesson ticked on one page is done on the other too (when
// both are served from the same address). It keeps anything else saved
// under the key, such as the dashboard's goals.

const KEY = 'my-xr-camp-progress';

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}');
  } catch {
    return {};
  }
}

export function doneLessons() {
  return new Set(read().done ?? []);
}

export function setDone(lessonId, isDone) {
  const saved = read();
  const done = new Set(saved.done ?? []);
  if (isDone) done.add(lessonId);
  else done.delete(lessonId);
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...saved, done: [...done] }));
  } catch (error) {
    console.warn('Progress could not be saved in this browser:', error);
  }
}
