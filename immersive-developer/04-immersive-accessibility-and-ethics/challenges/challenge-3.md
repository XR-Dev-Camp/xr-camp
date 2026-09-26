# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Go further than a fixed transcript: try live, real captions, or a real second participant.

## Task

Pick one:

- **Live captions.** Use the Web Speech API's `SpeechRecognition` (where your browser supports it - it is not universal, so feature-detect it and keep the fixed transcript as the fallback) to caption a learner's own spoken "question" instead of only the presenter's fixed lines. Show the recognised text in the same `#captions` element this lesson already built.
- **A real second participant.** Using only free tools (for example, a WebRTC data channel through a free signalling approach, or a shared browser tab via the [BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel) between two tabs on the same device, for testing), replace the simulated visitor with a second, real connection, keeping the personal-space radius, mute, and block controls this lesson already built.

## Why this matters

This lesson's visitor and captions are deliberately simplified stand-ins, clearly explained as such in `audit.md`, because XR Camp has no paid multiplayer backend to build on. Real shared XR experiences need everything this lesson built - personal space, mute, block, informed consent - to work against a real, possibly unpredictable, other person. This challenge is a first, small step towards that harder problem.

## Done when

- [ ] One of the two options above works, end to end, using only free tools.
- [ ] The personal-space radius, mute, and block controls (if you chose the second option) still work against the real connection.
- [ ] A comment in your code explains which free tool you used and any limits it has (for example, that `BroadcastChannel` only works between tabs on the same device, not across the internet).
