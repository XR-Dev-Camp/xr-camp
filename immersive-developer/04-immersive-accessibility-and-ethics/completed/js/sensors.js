// sensors.js: "personalization" - looking at the camera feed to adjust the
// talk for whoever is watching. This is a common real feature, and the
// starter's version of it (running silently on page load) was a common real
// mistake.
//
// Fix for TODO 7: nothing here ever touches the camera until the learner
// clicks a real button, after reading what it does. `requestCamera` runs
// only from that click's own event handler - the same rule WebXR itself
// enforces for entering a session (see xr.js) - and the learner can decline
// and use the whole talk without it. XAUR does not number a consent user
// need (it is scoped to disability access, not privacy), so this is
// documented in completed/audit.md as a general ethical-design requirement,
// not a numbered XAUR fix.
//
// Fix for TODO 8: `PRIVACY_NOTICE` says, in plain language, what a camera
// frame could reveal - not only "your face", but who else is in the room,
// what the room looks like, and, over many frames, things like tiredness or
// mood - before the learner is asked to decide.

export const PRIVACY_NOTICE = 'Camera personalization looks at frames from your camera to guess things like where you are looking. It could also show who else is in the room, what your room looks like, and, over time, things like how tired you seem. XR Camp does not store or send this anywhere: it stays on your device and stops the moment you close this tab or click "Turn off camera".';

export function requestCamera(onGranted, onDenied) {
  if (!navigator.mediaDevices?.getUserMedia) { onDenied?.('not supported'); return; }
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      onGranted?.(stream);
    })
    .catch((error) => {
      onDenied?.(error.message ?? 'permission refused');
    });
}

export function stopCamera(stream) {
  for (const track of stream?.getTracks() ?? []) track.stop();
}
