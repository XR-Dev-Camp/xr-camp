# Design review

Reviewer name and role: Priya, XR Camp volunteer mentor (fictional, for illustration only)
Date: Session 13

What they saw and said: "The prototype proves the pattern works, but the Pause button's label didn't change fast enough for me to notice it had worked — I clicked twice before I trusted it had paused."

## Changes made (or not made, and why)

| Feedback | Change made | Why (if not changed) |
| --- | --- | --- |
| Pause button feedback felt slow to confirm | Changed the button's visible text ("Pause animation" / "Play animation") at the same moment as `aria-pressed`, instead of only changing the ARIA state | Makes the change obvious to sighted and screen-reader users at the same time |
| Suggested adding a second object to stress-test the budget | Not made in this stage | Logged as Challenge 3 and as a Stage 4 planning note instead, to keep this prototype's scope small per `prototype-plan.md` |
