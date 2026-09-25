// render.js: turning data into page elements. No fetching, no storing.

// TODO 9: import describeTime, hours, and plural from './format.js'.

// A small helper: create an element with text in one line.
function el(tag, text, className) {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  if (className) element.className = className;
  return element;
}

// TODO 10: Export renderLesson, which DESTRUCTURES { title, minutes, sessions,
// status } and returns an <li class="lesson"> with three spans: the title,
// the time (describeTime), and a badge saying "Ready" or "Coming soon" with
// the class "badge ready" or "badge coming-soon".

// TODO 11: Export renderPhase(phase, lessons, totals), which returns a
// <section class="phase"> with an <h2> ("Phase 0: Welcome to the Future"),
// a summary paragraph, and an <ol> of lessons. Use lessons.map(renderLesson).
// Link the section to its heading with aria-labelledby.

// TODO 13: Export renderError(message, onRetry), which returns a box with
// role="alert", the message, and a "Try again" button that calls onRetry.
