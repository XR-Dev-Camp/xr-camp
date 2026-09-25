// main.js: the starting point.

// TODO 1: Check modules work. Write console.log('main.js loaded'), open the
// page through a local server (http://...), and find the message in the console.

// TODO 7: import what you need from './data.js', './render.js', and './format.js'.
// Then, to test your functions, try in this file:
//   console.log(hours(125), plural(2, 'lesson'));

// TODO 12: Write an async function start() that shows "Loading the course
// map…" in #summary, awaits loadCatalog(), and draws one renderPhase for every
// phase into #map. Call start() at the bottom of the file.

// TODO 13 (continued): Wrap the loading in try...catch. On an error, show renderError with
// the error's message, and pass start itself as the retry function.

// TODO 14: When #ready-only changes, draw again with only the lessons whose
// status is 'ready'. Use filter. Hide phases with nothing to show.
