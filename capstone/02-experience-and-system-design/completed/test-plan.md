# Test plan

## Accessibility checks

- [ ] Every 3D interaction has a working keyboard or button equivalent.
- [ ] The scene description and 2D object list match what the 3D view shows.
- [ ] `prefers-reduced-motion` pauses the jade stone's rotation automatically, and the Pause button works either way.
- [ ] The prototype passes a screen reader walkthrough (NVDA or VoiceOver) without confusing announcements.

## Performance budget

Target draw calls: 15
Target triangles: 8,000 (three simple primitive-built objects; well under the Phase 3 capstone's 25,000 budget, since this is a smaller single-room scene)

## Localisation readiness

Languages to check: English (now), Spanish and Simplified Chinese (later, per XR Camp's translation process)

What "ready for translation" means for this project: every visible string comes from the data model's `title.en` / `description.en` style fields, never hard-coded in the page's JavaScript, so adding `title.es` and `title.zh-Hans` later needs no code changes to the display logic.
