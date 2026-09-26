// xr.js: entering and leaving a WebXR session. Carried over from 4.1
// unchanged in its shape — feature detection, requesting the session inside
// a real click, and reacting to sessionstart/sessionend were already taught
// there. The one addition is calling app.setPresenting(), which is what
// moves the movement rig into place for VR (see app.js).

const SESSION_MODE = 'immersive-vr';

export async function supportsImmersiveVR() {
  if (!('xr' in navigator)) return false;
  try {
    return await navigator.xr.isSessionSupported(SESSION_MODE);
  } catch {
    return false;
  }
}

export function initXR({ renderer, app, button, status }) {
  let session = null;

  async function enterVR() {
    try {
      session = await navigator.xr.requestSession(SESSION_MODE, {
        optionalFeatures: ['local-floor', 'bounded-floor'],
      });
      session.addEventListener('end', () => { session = null; });
      await renderer.xr.setSession(session);
    } catch (error) {
      status.textContent = `Could not start a VR session: ${error.message}`;
    }
  }

  renderer.xr.addEventListener('sessionstart', () => {
    app.setPresenting(true);
    button.textContent = 'Exit VR';
    status.textContent = 'You are viewing the dashboard in VR, seated. Take off your headset, or use its own system menu, to return to the desktop view.';
  });

  renderer.xr.addEventListener('sessionend', () => {
    app.setPresenting(false);
    button.textContent = 'Enter VR';
    status.textContent = 'Back to the desktop view.';
  });

  button.addEventListener('click', () => {
    if (session) session.end();
    else enterVR();
  });
}

export function describeUnsupported() {
  if (!('xr' in navigator)) {
    return window.isSecureContext
      ? 'This browser does not support WebXR. The dashboard above still works fully without it.'
      : 'WebXR needs a secure connection (HTTPS, or localhost while testing). The dashboard above still works fully without it.';
  }
  return 'No VR headset or WebXR runtime was found. The dashboard above still works fully without one.';
}
