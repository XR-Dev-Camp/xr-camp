# Assets

Media referenced by [`../completed/index.html`](../completed/index.html).

## Required files

| File | Referenced as | Notes |
| --- | --- | --- |
| `centre-exterior.jpg` | `<img>` in the About section | 800 x 450, under 200 KB |
| `video-poster.jpg` | `poster` on the video | 640 x 360 |
| `welcome.mp4` | `<source>` | MP4 / H.264, ten to thirty seconds |
| `welcome-captions.vtt` | `<track>` | Provided — see below |

Binary media is **not** committed to this repository. Keeping the repository
small matters: learners on metered or slow connections have to download it, and
that is exactly the audience this programme exists to serve.

## What to do

Any of these is fine:

1. **Use your own.** Record ten seconds on a phone. This is the best option —
   the project becomes yours, and you practise writing captions for speech you
   actually recorded.
2. **Use openly licensed media.** Try [Wikimedia Commons](https://commons.wikimedia.org/)
   or [Pexels](https://www.pexels.com/). Record the source, author, and license
   in [`../ATTRIBUTION.md`](../ATTRIBUTION.md) before you use it — that step is
   not optional, and it is part of the lesson.
3. **Leave them missing.** The page is deliberately built to degrade well. The
   image will show its alt text and the video will show its fallback link. That
   is worth seeing at least once: it is what your page looks like to someone
   whose connection dropped.

`welcome-captions.vtt` is included so you can read the caption format even
without the video file.
