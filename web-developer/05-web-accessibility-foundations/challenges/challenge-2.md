# Challenge 2: Creative

**Optional.** Roughly 60 minutes.

Captions and a transcript for a short video about your community.

## Task

1. Record a video of 30 to 60 seconds about a place or activity in your community, on your phone. Ask permission from anyone who appears.
2. Write a captions file in WebVTT format, `captions.vtt`, with timings:

   ```text
   WEBVTT

   00:00:00.000 --> 00:00:04.000
   Welcome to the Saturday market in our neighbourhood.

   00:00:04.000 --> 00:00:09.000
   Every week, more than forty families sell food and crafts here.
   ```

3. Add the video to a page with `<video controls>` and `<track kind="captions" src="captions.vtt" srclang="en" label="English" default>`. Use your own language in the captions and `srclang` if you prefer.
4. Below the video, add the full **transcript** as text, including important sounds and anything shown but not said.

## Why this matters

Captions serve Deaf and hard-of-hearing people, and anyone in a noisy bus or a quiet library. A transcript serves people who cannot play video at all, including on slow connections, and it can be searched and translated.

## Done when

- [ ] The captions appear in time with the speech.
- [ ] The page has a full transcript below the video.
