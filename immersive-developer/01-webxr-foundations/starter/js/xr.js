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
// this page's own control panel, in its own visible language.

const SESSION_MODE = 'immersive-vr';

// TODO 1: feature-detect WebXR before assuming anything about it.
// Return false if `'xr' in navigator` is false (this browser has no WebXR
// Device API at all). Otherwise, `await navigator.xr.isSessionSupported(SESSION_MODE)`
// and return what it resolves to, but wrap the call in try/catch and return
// false if it rejects: some browsers throw for a disallowed or
// unimplemented mode instead of resolving false. All three outcomes should
// read as "not supported" to the rest of the app.
export async function supportsImmersiveVR() {

}

// TODO 4 and TODO 5: wires one button to a full WebXR session. Call this
// only after supportsImmersiveVR() has resolved true (see main.js).
export function initXR({ renderer, app, button, status }) {
  let session = null;

  async function enterVR() {
    // TODO 4: call app.resetView() here, before requesting a session.
    // Whatever the camera's position and rotation are at the moment a
    // local-floor session starts becomes that session's floor-level origin
    // (see app.js): without resetting first, a learner who had dragged the
    // desktop view around would put on the headset facing some arbitrary,
    // possibly disorienting direction.
    //
    // Then request the session itself. The WebXR Device API only allows
    // `navigator.xr.requestSession('immersive-vr', ...)` from inside a
    // genuine, still-active user gesture (a "transient activation"), so
    // this call must happen directly inside the button's click handler,
    // with no `await` ahead of it in this function's own call chain.
    // Pass `{ optionalFeatures: ['local-floor', 'bounded-floor'] }` as the
    // second argument: requested as optional, not required, because the
    // session must still work if a headset offers neither. Store the
    // result in `session`, add an `'end'` listener on it that sets
    // `session = null`, then hand it to the renderer with
    // `await renderer.xr.setSession(session)`. Wrap the whole thing in
    // try/catch, and on failure set `status.textContent` to a short,
    // calm explanation using `error.message`.
  }

  // TODO 5: renderer.xr.addEventListener('sessionstart' / 'sessionend', ...)
  // These two events are three.js's own, dispatched by renderer.xr once a
  // session actually starts or ends; the raw WebXR XRSession object itself
  // has no "start" event, only 'end' (used above). On 'sessionstart', call
  // `app.setPresenting(true)`, set the button's text to something that
  // describes what clicking it will now do ("Exit VR"), and update
  // `status.textContent` to say the exhibit is now shown in VR. On
  // 'sessionend', do the reverse: `app.setPresenting(false)`, the button
  // back to "Enter VR", and a status message confirming the return to the
  // desktop view.

  button.addEventListener('click', () => {
    if (session) session.end();
    else enterVR();
  });
}

// TODO 6 (see main.js): when WebXR is unavailable, return one clear sentence
// explaining why, instead of leaving a button that does nothing.
// `window.isSecureContext` distinguishes two different reasons: the WebXR
// Device API requires a secure context (HTTPS, or http://localhost and
// http://127.0.0.1 while testing locally, which count as secure for this
// purpose), so a plain http:// page fails for that reason alone, before any
// device is even considered. If `'xr' in navigator` is false and the page
// is not a secure context, say so. If it is false and the context is
// secure, say this browser does not support WebXR. Otherwise (the API
// exists, but no session was available), say no headset or WebXR runtime
// was found. Every message should also reassure the learner that the
// exhibit above still works fully without VR.
export function describeUnsupported() {

}
