# Explainer: Structured Scene Descriptions

This follows the real [W3C TAG explainer template](https://w3ctag.github.io/explainer-explainer/). This is Ana's own practice idea, written to learn the format: writing it does not file it anywhere, and it does not claim the feature exists in any browser or spec today.

**Authors:** Ana · **Participate:** planned issue on `immersive-web/webxr` (see [`standards-plan.md`](standards-plan.md), section 4)

## Introduction

Every 3D lesson in this course pairs its scene with a plain-text description, in an element with `id="scene-description"`, so a screen reader user gets the same information a sighted user gets from looking at the canvas. This works, but every project invents the pairing itself: nothing in HTML says "this text describes that canvas." This explainer proposes a small, optional attribute that makes that link explicit and machine-readable, so tools other than screen readers, such as search engines or translation software, could use it too.

## Goals

- Let a page mark which element is the text alternative for a given 3D canvas or `<a-scene>`, in a way a tool can query without guessing at `id` naming conventions.
- Stay backward compatible: a page that already uses `id="scene-description"` (as every XR Camp lesson does) should keep working unchanged.
- Work the same way for A-Frame, Three.js, and plain WebGL: the description lives in ordinary HTML, not inside the 3D library.

## Non-goals

- This does not try to generate a description automatically. Automatic 3D-scene captioning is a much larger, separate problem, and a wrong automatic caption is worse than none.
- This does not replace ARIA live regions for things that change during the scene (see `role="status"` elsewhere in this course); it is for the scene's standing description, not its running commentary.

## User research

XR Camp itself is the research: every 3D lesson since Phase 1 has had to solve this exact problem, and every one solved it the same way by convention (an `id="scene-description"` element) rather than by anything the platform understands. That repeated, independent convergence on one pattern, across dozens of learners' projects, is itself a signal that the pattern is common enough to be worth standardising.

## Proposed approach

A new boolean-ish relationship, expressed with an ordinary attribute rather than a new element:

```html
<a-scene aria-describedby="scene-description"></a-scene>
<p id="scene-description">A red cube on a blue floor.</p>
```

This already works today, because `aria-describedby` is a normal global attribute; the explainer's real proposal is narrower: a short non-normative note in the WebXR and A-Frame documentation recommending this exact pattern by name, so learners and tool authors converge on one attribute instead of nine different `id` conventions.

## Considered alternatives

A brand-new `scenedescription` attribute was considered, but rejected: it would duplicate `aria-describedby`, which already does this job and is already understood by every screen reader. Recommending an existing attribute, rather than inventing one, is simpler to ship and to teach.

## Accessibility, Internationalization, Privacy, and Security Considerations

**Accessibility:** this is entirely an accessibility proposal; its purpose is a clearer text alternative for non-visual access to 3D content. **Internationalization:** the description text follows the page's own `lang` attribute, so no new translation mechanism is needed. **Privacy:** none; no new data is collected. **Security:** none; this only recommends a pattern using existing attributes.

## Stakeholder Feedback / Opposition

Feedback would be asked for first from the Immersive Web Community Group, since they maintain the WebXR spec this note would attach to. The expected objection: that documentation-only recommendations are easy to ignore, and that real adoption needs a linter or an automated check, not just a paragraph in a spec. (`scene-description-lint`, described in [`standards-plan.md`](standards-plan.md), section 7, exists partly to answer that objection.)

## References & acknowledgements

- [W3C Immersive Web Community Group](https://www.w3.org/community/immersive-web/)
- [WAI-ARIA `aria-describedby`](https://www.w3.org/TR/wai-aria-1.2/#aria-describedby)
- This course's own [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md), whose pattern this explainer is built from
