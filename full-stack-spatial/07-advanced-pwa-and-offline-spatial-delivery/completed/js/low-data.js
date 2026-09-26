// low-data.js: the learner's low-data choice, carried over from Course 4.6
// (frontend-engineer/06). There, it hid the whole 3D moment; here, the 3D
// moment (a scene bundle) is exactly the thing being downloaded, so low-data
// mode instead asks for a confirmation, naming the size, before a download
// that is more than LARGE_DOWNLOAD_BYTES starts — someone who has chosen to
// save data can still decide a particular download is worth it.

const KEY = 'xrcamp-scene-bundles:low-data';
export const LARGE_DOWNLOAD_BYTES = 300 * 1024; // 300 KB: bigger than either model alone, smaller than both together

// Some browsers (mostly Chromium ones) expose the Network Information API's
// saveData flag when the device or browser itself has asked to save data.
// Others do not have navigator.connection at all, so ?. keeps this safe:
// undefined reads as "no", the same as a browser that never asked.
export function deviceSavesData() {
  return navigator.connection?.saveData === true;
}

// The learner's own choice wins over the device's. With no choice saved
// yet, follow the device's own setting.
export function lowDataPreferred() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'on') return true;
    if (saved === 'off') return false;
  } catch {
    // Storage switched off: fall back to the device setting below.
  }
  return deviceSavesData();
}

export function setLowData(on) {
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off');
  } catch {
    // Storage switched off: the choice lasts until the page closes.
  }
}
