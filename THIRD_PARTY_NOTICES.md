# Third-Party Notices

Third-party software distributed with, or loaded by, projects in this repository, together with the notices their licenses require.

## Status

No third-party dependencies are vendored yet. Preface and Phase 1 projects intentionally use no libraries — learners write plain HTML, CSS, and JavaScript.

## Expected additions

| Library | Introduced in | License | Purpose |
| --- | --- | --- | --- |
| A-Frame | `web3d-developer/02-a-frame-foundations` | MIT | Declarative WebXR scenes |
| Three.js | `web3d-developer/04-threejs-foundations` | MIT | Browser 3D graphics |
| X3DOM | `web3d-developer/01-web3d-fundamentals` | MIT | Declarative X3D in HTML |

Populate each row with the exact version and full license text at the time the dependency is actually added.

## Rules

1. **Vendor, do not hotlink.** Example projects must keep working offline and in regions where a given CDN is unreachable. Offline capability is a stated requirement of the programme.
2. **Record the version.** "Latest" is not a version.
3. **Reproduce the license text**, not merely its name — most licenses require this.
4. **Prefer permissively licensed, actively maintained libraries** with a genuine accessibility story.
5. **Every dependency is a teaching decision.** A learner will ask why it is there. Be able to answer.

## Format for each entry

```text
### <name> <version>
Source:  <url>
License: <SPDX identifier>
Used in: <project paths>
Why:     <one sentence: what it does and why nothing simpler suffices>

<full license text>
```
