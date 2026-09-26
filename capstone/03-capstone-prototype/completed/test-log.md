# Test log

## Accessibility

| Date | What was tested | Result | Fix made (if any) |
| --- | --- | --- | --- |
| Session 10 | Keyboard-only walkthrough (mouse unplugged) | Turn left/right and Pause all reachable and operable by Tab and Enter/Space | None needed |
| Session 10 | Screen reader walkthrough (VoiceOver) | Scene description and 2D list both read correctly; Pause button announces its pressed state | Added `aria-pressed` update on every click (was only set once) |

## Performance

| Date | Draw calls (measured / budget) | Triangles (measured / budget) | Notes |
| --- | --- | --- | --- |
| Session 11 | 1 / 15 | 528 / 8000 | Well within budget with one cylinder; plenty of headroom for Stage 4's real models |

## Localisation readiness

| Date | Check | Result |
| --- | --- | --- |
| Session 12 | No visible text is hard-coded outside the data model | Pass: `STAND.name` and `STAND.description` are the single source for both the scene description and the 2D list |
