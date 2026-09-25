// low-data.js: the learner's low-data choice. When it is on, the dashboard
// skips the 3D moment, whose library is about 1.3 MB: more than everything
// else in the app together.

const KEY = 'my-xr-camp-weather:low-data';

// TODO 14: LOW-DATA MODE.
// - deviceSavesData() returns navigator.connection?.saveData === true.
//   Many browsers have no navigator.connection at all: ?. makes that safe.
// - lowDataPreferred(): the learner's own choice wins. Read
//   localStorage.getItem(KEY) inside try/catch: 'on' → true, 'off' → false.
//   With no saved choice, return deviceSavesData().
// - setLowData(on) saves 'on' or 'off' under KEY, inside try/catch.
// main.js (finished) already uses all three.
export function deviceSavesData() {
  return false;
}

export function lowDataPreferred() {
  return false;
}

export function setLowData(on) {}
