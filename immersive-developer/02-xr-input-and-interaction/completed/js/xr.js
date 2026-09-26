// xr.js: entering and leaving an immersive-vr session. Carried over from 4.1
// (WebXR Foundations) almost unchanged: this lesson does not touch how a VR
// session starts, ends, or reports itself, only what you can do with your
// hands once you are inside one (controllers.js), what you can point at
// (menu.js), and a second, separate kind of session, immersive-ar with
// hit-test placement (ar.js). The one addition, `onSessionChange`, exists
// because a device can only run one WebXR session at a time: main.js uses it
// to disable the "Enter AR" button for as long as a VR session is active,
// and ar.js's own `onSessionChange` does the same to "Enter VR".

const SESSION_MODE = 'immersive-vr';

// From 4.1: `navigator.xr` only exists in browsers that implement the WebXR
// Device API at all; even then, `isSessionSupported` can resolve false (the
// API exists, but no immersive-vr device or runtime is available) or reject
// (some browsers throw rather than resolve false for a disallowed or
// unimplemented mode). All three outcomes count as "not supported", so the
// rest of the page has one clear question to answer, not three.
export async function supportsImmersiveVR() {
  if (!('xr' in navigator)) return false;
  try {
    return await navigator.xr.isSessionSupported(SESSION_MODE);
  } catch {
    return false;
  }
}

// From 4.1: wires one button to a full WebXR session. `requestSession` must
// run inside the button's own click handler, with no `await` ahead of it,
// because the WebXR Device API only allows `requestSession('immersive-vr', ...)`
// from inside a genuine, still-active user gesture (a "transient activation").
export function initXR({ renderer, app, button, status, onSessionChange }) {
  let session = null;

  async function enterVR() {
    // Puts the camera back at its known, comfortable starting pose before
    // every session: whatever pose the camera holds the instant a
    // local-floor session starts becomes that session's floor-level origin.
    app.resetView();
    try {
      session = await navigator.xr.requestSession(SESSION_MODE, {
        optionalFeatures: ['local-floor', 'bounded-floor'],
      });
      // No listener on the session's own 'end' event here: renderer.xr's
      // 'sessionend' below already fires for it however the session ends
      // (this button, or the headset's own system menu), so that is the one
      // place that clears `session` (see the guard there and in
      // 'sessionstart': this file must ignore ar.js's session ending too).
      await renderer.xr.setSession(session);
    } catch (error) {
      status.textContent = `Could not start a VR session: ${error.message}`;
    }
  }

  // renderer.xr's own 'sessionstart'/'sessionend' events, not the raw
  // XRSession's (which has only 'end'). They keep the engine, the button,
  // and the live status region all agreeing about which mode the page is in.
  renderer.xr.addEventListener('sessionstart', () => {
    if (!session) return; // this "sessionstart" belongs to ar.js's session, not this one
    app.setPresenting(true);
    button.textContent = 'Exit VR';
    status.textContent = 'You are viewing the lab in VR. Point at the floating menu and press your controller’s trigger, or pinch with a tracked hand, to use it. Take off your headset, or use its own system menu, to return to the desktop view.';
    onSessionChange?.(true);
  });

  renderer.xr.addEventListener('sessionend', () => {
    if (!session) return; // this "sessionend" belongs to ar.js's session, not this one
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

// From 4.1: one clear sentence explaining why WebXR is unavailable, instead
// of leaving a button that would do nothing.
export function describeUnsupported() {
  if (!('xr' in navigator)) {
    return window.isSecureContext
      ? 'This browser does not support WebXR. The lab above still works fully without it.'
      : 'WebXR needs a secure connection (HTTPS, or localhost while testing). The lab above still works fully without it.';
  }
  return 'No VR headset or WebXR runtime was found. The lab above still works fully without one.';
}
