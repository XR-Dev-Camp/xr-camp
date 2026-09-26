// low-data.js: the learner's low-data choice, carried over from Course 4.6
// (frontend-engineer/06). There, it hid the whole 3D moment; here, the 3D
// moment (a scene bundle) is exactly the thing being downloaded, so low-data
// mode instead asks for a confirmation, naming the size, before a download
// that is more than LARGE_DOWNLOAD_BYTES starts — someone who has chosen to
// save data can still decide a particular download is worth it.

const KEY = 'xrcamp-scene-bundles:low-data';
export const LARGE_DOWNLOAD_BYTES = 300 * 1024; // 300 KB: bigger than either model alone, smaller than both together

// TODO 10: LOW-DATA MODE.
// - deviceSavesData(): return `navigator.connection?.saveData === true`.
//   Many browsers have no navigator.connection at all: `?.` makes that
//   safe (undefined reads as "no", same as a browser that never asked).
// - lowDataPreferred(): the learner's own choice wins over the device's.
//   Inside try/catch, read `localStorage.getItem(KEY)`: 'on' → return true,
//   'off' → return false. With no saved choice (or if storage throws),
//   return `deviceSavesData()`.
// - setLowData(on): `localStorage.setItem(KEY, on ? 'on' : 'off')`, inside
//   try/catch.
// main.js already reads and writes all three.
export function deviceSavesData() {
  return false;
}

export function lowDataPreferred() {
  return false;
}

export function setLowData(on) {}
