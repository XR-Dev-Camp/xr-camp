// low-data.js: the learner's low-data choice. When it is on, the dashboard
// skips the 3D moment, whose library is about 1.3 MB: more than everything
// else in the app together.

const KEY = 'my-xr-camp-weather:low-data';

// Some browsers (mostly Chromium ones) tell us when the learner has asked
// their device or browser to save data. Others do not have
// navigator.connection at all, so ?. keeps this safe: undefined means "no".
export function deviceSavesData() {
  return navigator.connection?.saveData === true;
}

// The learner's own choice wins. With no choice saved, follow the device.
export function lowDataPreferred() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'on') return true;
    if (saved === 'off') return false;
  } catch {
    // Storage switched off: fall back to the device setting.
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
