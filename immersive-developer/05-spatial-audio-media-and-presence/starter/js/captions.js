// captions.js: reads the cues from one WebVTT file, assets/captions.vtt,
// twice over -- once so the currently active cue's text can be shown in the
// caption paragraph and drawn onto the story screen inside the 3D scene
// (see video.js), and once to build the always-present transcript list.
// Both readings come from the same <track> element and the same file, so
// the words shown in three different places (canvas, caption paragraph,
// transcript) can never disagree with each other.

// TODO 7: find the <audio> element's TextTrack and call `onChange` with the
// active cue's text whenever it changes.
// 1. `const track = audioEl.textTracks[0];` then `if (!track) return;`.
// 2. Set `track.mode = 'hidden'`. A track's mode defaults to 'disabled',
//    which never loads its cues or fires any events at all; 'hidden' loads
//    them and fires 'cuechange' without also turning on the browser's own
//    caption rendering (which this lesson does not use: it has its own
//    caption paragraph and canvas text instead).
// 3. Add a 'cuechange' listener on the track: this event fires whenever the
//    set of currently active cues changes, whether the audio is playing,
//    paused, or being seeked. Read `track.activeCues[0]` (there is at most
//    one active cue in this file's captions) and call
//    `onChange(cue ? cue.text : '')`.
export function watchCaptions(audioEl, onChange) {

}

// TODO 8: build the always-present transcript from the same cues, once they
// have loaded.
// 1. Write a `render()` function that reads `audioEl.textTracks[0]`, turns
//    its `.cues` (a TextTrackCueList, not a plain array: use
//    `Array.from(track.cues || [])`) into an array of `<li>` elements (one
//    per cue, `li.textContent = cue.text`), and replaces `listEl`'s children
//    with them (`listEl.replaceChildren(...)`).
// 2. A <track>'s cues are not available the instant the element exists in
//    the DOM: listen for the 'load' event on `trackEl` (the <track> element
//    itself, not the <audio> element), which fires once its WebVTT file has
//    been fetched and parsed, and call `render()` from that listener.
// 3. Also call `render()` immediately if `trackEl.readyState === 2`: this
//    covers the file already being loaded (for example from the browser's
//    cache) before this function's own listener was attached.
export function buildTranscript(audioEl, trackEl, listEl) {

}
