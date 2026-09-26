// captions.js: reads the cues from one WebVTT file, assets/captions.vtt,
// twice over -- once so the currently active cue's text can be shown in the
// caption paragraph and drawn onto the story screen inside the 3D scene
// (see video.js), and once to build the always-present transcript list.
// Both readings come from the same <track> element and the same file, so
// the words shown in three different places (canvas, caption paragraph,
// transcript) can never disagree with each other.

// TODO 7: find the <audio> element's TextTrack and listen for cuechange --
// the event a browser fires whenever the set of currently active cues
// changes, whether the audio is playing, paused, or being seeked. A track's
// mode must be set to 'hidden' (the default is 'disabled', which loads
// nothing) for its cues to load and for cuechange to fire at all, even
// though this lesson does not use the browser's own caption rendering: it
// has its own caption paragraph and canvas text instead.
export function watchCaptions(audioEl, onChange) {
  const track = audioEl.textTracks[0];
  if (!track) return;
  track.mode = 'hidden';
  track.addEventListener('cuechange', () => {
    const [activeCue] = track.activeCues;
    onChange(activeCue ? activeCue.text : '');
  });
}

// TODO 8: build the always-present transcript from the same cues, once they
// have loaded. A <track>'s cues are not available the instant the element
// exists in the DOM: the 'load' event on the <track> element itself (not
// the <audio> element) fires once its WebVTT file has been fetched and
// parsed. Checking trackEl.readyState === 2 first covers the case where the
// file was already loaded (for example from the browser's cache) before
// this function's own listener was attached.
export function buildTranscript(audioEl, trackEl, listEl) {
  function render() {
    const track = audioEl.textTracks[0];
    const cues = track ? Array.from(track.cues || []) : [];
    listEl.replaceChildren(...cues.map((cue) => {
      const li = document.createElement('li');
      li.textContent = cue.text;
      return li;
    }));
  }
  trackEl.addEventListener('load', render);
  if (trackEl.readyState === 2) render();
}
