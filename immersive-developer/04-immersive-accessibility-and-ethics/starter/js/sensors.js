// sensors.js: "personalization" - looking at the camera feed to adjust the
// talk for whoever is watching. This is a common real feature (and a common
// real mistake).
//
// TODO 7: this runs the moment the page loads, with no button, no
// explanation, and no way to say no. Consent has to come *before* a sensor
// is turned on, from a real click, with the learner knowing what they are
// agreeing to and able to decline and still use the whole talk. XAUR does
// not number a "consent" user need (it is scoped to disability access, not
// privacy), so treat this one as a general ethical-design requirement -
// see completed/audit.md.
//
// TODO 8: nothing on the page ever tells the learner what a camera frame
// could reveal: not just "your face", but who else is in the room, what the
// room looks like, and (with enough frames) things like tiredness or mood.
// Add a plain-language notice that says this before the button that turns
// the camera on.

export function initSensors() {
  if (!navigator.mediaDevices?.getUserMedia) return;
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      // Pretend to "personalize" the talk, then immediately let the stream
      // go. Nothing is shown to the learner either way.
      for (const track of stream.getTracks()) track.stop();
    })
    .catch(() => {
      // No camera, or permission refused - either way, silently give up.
      // The learner is never told this was attempted at all.
    });
}
