# Attribution - Phase 4 Capstone - Immersive Web Experience

There is no third-party audio, video, image, or model in this project. The three pedestal sounds and the caption file are reused unchanged from [immersive-developer/05-spatial-audio-media-and-presence](../05-spatial-audio-media-and-presence/), where they were generated procedurally for XR Camp with a small Python script (the `wave` and `numpy` libraries), not recorded, sampled, or downloaded from anywhere.

| Asset | Source | Author | License | Notes |
| --- | --- | --- | --- | --- |
| `assets/pedestal-clay.wav` | Made for XR Camp (reused from 4.5) | XR Camp | CC0 | A short looping tone (sine waves), generated with Python's `wave` and `numpy` libraries. No recording equipment or sound library used. |
| `assets/pedestal-basket.wav` | Made for XR Camp (reused from 4.5) | XR Camp | CC0 | A short looping filtered-noise texture, generated the same way. |
| `assets/pedestal-jade.wav` | Made for XR Camp (reused from 4.5) | XR Camp | CC0 | A short looping decaying tone, generated the same way. |
| `assets/captions.vtt` | Made for XR Camp (reused from 4.5) | XR Camp | CC0 | A WebVTT file kept for reference; this capstone's own captions are written directly into `js/exhibit.js` from the same facts. |

Every asset stays well within the budgets in [`docs/en/3d-assets-and-versions.md`](../../docs/en/3d-assets-and-versions.md) (audio: 2 MB per file): the three pedestal sounds are each about 100 KB.
