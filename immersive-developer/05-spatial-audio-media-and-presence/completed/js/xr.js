// xr.js: everything specific to entering and leaving a WebXR session. Kept
// apart from app.js (the engine) and main.js (the page's own buttons) so
// that a future lesson could swap in immersive-ar, or drop WebXR entirely,
// by changing only this file.
//
// This lesson builds its own accessible Enter VR button rather than using
// three.js's ready-made VRButton (three/addons/webxr/VRButton.js). VRButton
// is a good, tested shortcut for a real project (see "Key code explained"
// and the Explorer challenge), but it renders itself as a fixed, absolutely
// positioned element outside this page's own layout, styled inline. Writing
// the session handling by hand instead means the button can live inside
// this page's own control panel, in its own visible language, and keeps the
// WebXR Device API itself in view rather than hidden behind a helper.

const SESSION_MODE = 'immersive-vr';

// TODO 1: feature-detect WebXR before assuming anything about it.
// `navigator.xr` only exists in browsers that implement the WebXR Device
// API at all; even then, `isSessionSupported` can resolve false (the API
// exists, but no immersive-vr device or runtime is available) or reject
// (some browsers throw rather than resolve false for a disallowed or
// unimplemented mode). Treat all three outcomes as "not supported" so the
// desktop and phone fallback always has a clear, calm reason.
export async function supportsImmersiveVR() {
  if (!('xr' in navigator)) return false;
  try {
    return await navigator.xr.isSessionSupported(SESSION_MODE);
  } catch {
    return false;
  }
}

// TODO 4 and TODO 5: wires one button to a full WebXR session: requesting
// it, resetting the view first, handing it to the renderer, and reacting
// when it starts or ends. Call this only after supportsImmersiveVR() has
// resolved true (see main.js): requestSession still needs to run inside the
// button's own click handler, with no `await` ahead of it, because the
// WebXR Device API only allows `requestSession('immersive-vr', ...)` from
// inside a genuine, still-active user gesture (a "transient activation"),
// the same rule that stops pop-ups opening from background code.
export function initXR({ renderer, app, button, status }) {
  let session = null;

  async function enterVR() {
    // TODO 4: put the camera back at its known, comfortable starting pose
    // before every session. Whatever the camera's position and rotation are
    // at the moment a local-floor session starts becomes that session's
    // floor-level origin (see app.js). Without this line, a learner who had
    // dragged the desktop view around first would put on the headset facing
    // some arbitrary, possibly disorienting direction; resetView() (from
    // app.js) guarantees the same seated-safe start every time.
    app.resetView();
    try {
      session = await navigator.xr.requestSession(SESSION_MODE, {
        // Requested as optional, not required: the session must still work
        // if a headset offers neither a floor-level origin nor a tracked
        // play area. `local-floor` is what this lesson relies on (set on
        // the renderer in app.js); `bounded-floor` is offered too, for
        // headsets that can report a room-scale boundary, though this
        // lesson does not use that boundary itself.
        optionalFeatures: ['local-floor', 'bounded-floor'],
      });
      session.addEventListener('end', () => { session = null; });
      await renderer.xr.setSession(session);
    } catch (error) {
      status.textContent = `Could not start a VR session: ${error.message}`;
    }
  }

  // TODO 5: renderer.xr.addEventListener('sessionstart' / 'sessionend', ...)
  // These two events are three.js's own, dispatched by renderer.xr once a
  // session actually starts or ends; the raw WebXR XRSession object itself
  // has no "start" event to listen for, only 'end' (used above). Use them to
  // keep the engine, the button, and the live status region all agreeing
  // about which mode the page is in.
  renderer.xr.addEventListener('sessionstart', () => {
    app.setPresenting(true);
    button.textContent = 'Exit VR';
    status.textContent = 'You are viewing the exhibit in VR. Take off your headset, or use its own system menu, to return to the desktop view.';
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

// TODO 6 (see main.js): when WebXR is unavailable, main.js calls this to
// build one clear sentence explaining why, instead of leaving a button that
// does nothing. window.isSecureContext distinguishes two very different
// reasons: the WebXR Device API requires a secure context (HTTPS, or
// http://localhost and http://127.0.0.1 during local testing, which count
// as secure for this purpose), so a plain http:// page fails for that
// reason alone, before the device is even considered.
export function describeUnsupported() {
  if (!('xr' in navigator)) {
    return window.isSecureContext
      ? 'This browser does not support WebXR. The exhibit above still works fully without it.'
      : 'WebXR needs a secure connection (HTTPS, or localhost while testing). The exhibit above still works fully without it.';
  }
  return 'No VR headset or WebXR runtime was found. The exhibit above still works fully without one.';
}
