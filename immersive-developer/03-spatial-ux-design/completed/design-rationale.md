# Design rationale — Spatial UX Design (reference)

An example of a filled-in rationale, for comparison after you have written your own. Yours does not need to match this one; it needs to be true of your own build and your own testing.

## Scale and distance

The default starting spot is "Comfortable" (1.2 m from the kiosk). That number is a starting point drawn from Meta Horizon OS's own design guidance (developers.meta.com/horizon/design/panels/), which suggests around 1 m for a panel meant to be read rather than touched — not a universal constant, since Android XR's own guidance suggests a further default (about 1.75 m) for its panels. At "Very close" (0.6 m) the kiosk's text spans roughly 53° of view: too wide to take in without turning your head, and uncomfortably close for something you are not reaching to touch. At "Far" (2.5 m) it drops to about 14°: still legible in this build's large print, but noticeably harder, which is the point — the same panel, unchanged, reads differently purely because of distance.

## Locking strategy

The kiosk stays world-locked always because it is shared, orienting information: like a sign in a real room, it should stay where it is so distance and legibility mean something consistent, and so it can anchor the waypoints relative to it. Letting the learner switch it too would remove the one fixed reference point the whole lesson is built around.

For the goals panel, body-locked felt best while testing: it was always reachable after teleporting, without needing to relocate it, and staying level (not tipping when looking up or down) meant it never felt like it was sliding around. View-locked was the easiest to read on demand but felt intrusive within a few seconds of leaving it on, matching Meta's caution about content glued to the view — it is a reasonable choice for a very short-lived alert, never for anything meant to stay up.

## Locomotion

Smooth movement felt noticeably more likely to cause mild disorientation, even over the short distances used here, compared to teleporting between the same three spots — consistent with why Meta's own comfort guidance favours teleporting. The vignette narrowing the view during a smooth move made it easier to tolerate, though it did not remove the effect entirely: treat that as a starting point to test with real people, not a solved problem.

## Personal space

The floor ring marks the space immediately around the learner. If a panel or object drifted inside it, it would sit uncomfortably close (well under the "Very close" waypoint's distance), and in a multi-user space it would be a place another person's tracked body could visibly intersect, which several XR comfort and safety guidelines treat as something to avoid by design.

## Sources consulted

- Meta Horizon OS design guidelines: [Panels](https://developers.meta.com/horizon/design/panels/), [Comfort](https://developers.meta.com/horizon/design/comfort/), [Typography](https://developers.meta.com/horizon/design/styles_typography/) — platform guidance, read directly, not secondhand.
- Android XR developer guide, [Scale, sizes, and visual design](https://developer.android.com/design/ui/xr/guides/visual-design) — a different platform's default panel distance, used to show that "the" comfortable distance is not one universal number.
- My own testing in this build, switching waypoints and lock modes repeatedly and reading the live angular-size number each time.
