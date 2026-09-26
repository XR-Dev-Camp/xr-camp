// xr.js: entering and leaving an immersive-vr session. Carried over from
// immersive-developer/02-xr-input-and-interaction/completed/js/xr.js almost
// unchanged - this lesson does not change how a VR session starts or ends,
// only what the scene does once you are in it (talk.js, visitor.js).

const SESSION_MODE = 'immersive-vr';

export async function supportsImmersiveVR() {
  if (!('xr' in navigator)) return false;
  try {
    return await navigator.xr.isSessionSupported(SESSION_MODE);
  } catch {
    return false;
  }
}

export function initXR({ renderer, app, button, status, onSessionChange }) {
  let session = null;

  async function enterVR() {
    app.resetView();
    try {
      session = await navigator.xr.requestSession(SESSION_MODE, {
        optionalFeatures: ['local-floor', 'bounded-floor'],
      });
      await renderer.xr.setSession(session);
    } catch (error) {
      status.textContent = `Could not start a VR session: ${error.message}`;
    }
  }

  renderer.xr.addEventListener('sessionstart', () => {
    if (!session) return;
    app.setPresenting(true);
    button.textContent = 'Exit VR';
    status.textContent = 'You are viewing the talk in VR. Captions stay low in your view wherever you look. Take off your headset, or use its own system menu, to return to the desktop view.';
    onSessionChange?.(true);
  });

  renderer.xr.addEventListener('sessionend', () => {
    if (!session) return;
    session = null;
    app.setPresenting(false);
    button.textContent = 'Enter VR';
    status.textContent = 'Back to the desktop view.';
    onSessionChange?.(false);
  });

  button.addEventListener('click', () => {
    if (session) session.end();
    else enterVR();
  });
}

export function describeUnsupported() {
  if (!('xr' in navigator)) {
    return window.isSecureContext
      ? 'This browser does not support WebXR. The talk above still works fully without it.'
      : 'WebXR needs a secure connection (HTTPS, or localhost while testing). The talk above still works fully without it.';
  }
  return 'No VR headset or WebXR runtime was found. The talk above still works fully without one.';
}
