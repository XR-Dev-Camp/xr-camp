// WebXR entry, reused from 4.1: feature detection, requesting an
// "immersive-vr" session from a real click, comfort (pausing OrbitControls
// while presenting, since the headset now owns the camera), and reporting
// the play-space boundary the 4.4 accessibility pass asked for, so nobody
// steps out of a bounded space they were never told about.
const SESSION_MODE = 'immersive-vr';

export async function isVRSupported() {
  if (!('xr' in navigator)) return false;
  try {
    return await navigator.xr.isSessionSupported(SESSION_MODE);
  } catch {
    return false;
  }
}

// Requesting a session must run inside the click handler itself (a user
// activation), so this function is called directly from a button's click
// listener, never from a promise chain started earlier.
export async function enterVR(app, { onStart, onEnd, onBoundary } = {}) {
  const session = await navigator.xr.requestSession(SESSION_MODE, {
    optionalFeatures: ['bounded-floor', 'local-floor'],
  });

  app.controls.enabled = false; // comfort: the headset moves the camera now, not the mouse
  await app.renderer.xr.setSession(session);

  session.addEventListener('end', () => {
    app.controls.enabled = true;
    onEnd?.();
  });

  const referenceSpace = app.renderer.xr.getReferenceSpace();
  const bounds = referenceSpace?.boundsGeometry ?? null;
  onBoundary?.(bounds);
  onStart?.(session);
  return session;
}
