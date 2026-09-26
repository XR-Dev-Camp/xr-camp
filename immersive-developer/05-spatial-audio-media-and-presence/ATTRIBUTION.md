# Attribution - Spatial Audio, Media, and Presence

All audio in this project was generated procedurally for XR Camp with a small Python script (the `wave` and `numpy` libraries), not recorded, sampled, or downloaded from anywhere. There is no third-party audio, video, image, or model in this project.

| Asset | Source | Author | License | Notes |
| --- | --- | --- | --- | --- |
| `assets/pedestal-clay.wav` | Made for XR Camp | XR Camp | CC0 | A short looping tone (sine waves), generated with Python's `wave` and `numpy` libraries. No recording equipment or sound library used. |
| `assets/pedestal-basket.wav` | Made for XR Camp | XR Camp | CC0 | A short looping filtered-noise texture, generated the same way. |
| `assets/pedestal-jade.wav` | Made for XR Camp | XR Camp | CC0 | A short looping decaying tone, generated the same way. |
| `assets/guide-track.wav` | Made for XR Camp | XR Camp | CC0 | A sequence of generated tones standing in for a spoken audio guide (see the README's "Media optimisation" section: this project has no text-to-speech or recording tool available, so the guide track is not real speech). |
| `assets/captions.vtt` | Made for XR Camp | XR Camp | CC0 | A WebVTT caption file, written to describe the exhibit; it does not transcribe real speech, because `guide-track.wav` is not real speech. |

Every asset stays well within the budgets in [`docs/en/3d-assets-and-versions.md`](../../docs/en/3d-assets-and-versions.md) (audio: 2 MB per file): the three pedestal sounds are each about 100 KB, and the guide track is about 0.9 MB.
