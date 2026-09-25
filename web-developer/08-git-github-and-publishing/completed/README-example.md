# Ana's web projects

The websites and 3D world I built in Phase 1 of XR Camp, a free school for web, 3D, and XR development.

<!-- In your own README, write your real GitHub Pages address here. -->
**See it live:** <https://your-username.github.io/web-projects/>

<!-- The picture is in a screenshots folder in the repository. Its alt text
     says what the picture shows, for people who cannot see it. -->
![The collection's home page on a phone: a heading, "Ana's web projects", and cards for five projects.](screenshots/home-phone.png)

## What is in this repository

- [`index.html`](index.html): the home page, which links to every project.
- [My first 3D world](my-first-world/): a small garden in 3D, with a pink sky and a moon that rises and sinks. Course 0.1.
- [Riverside Community Centre website](riverside/): a website for a community centre, built in plain HTML, then styled, then made responsive. Courses 1.1, 1.3, and 1.4.
  - [Join a programme](riverside/join.html): an accessible sign-up form. Course 1.2.
  - [Accessibility audit](riverside/audit.html): the problems I found on an events page, and how I fixed them. Course 1.5.
  - [Programme explorer](riverside/explorer/): search, filter, and save programmes. Course 1.6.

## How to view it on your own computer

1. Choose **Code → Download ZIP** on this page, and unzip the file.
2. Open `index.html` in any modern browser.

That is all: there is nothing to install. The 3D world needs an internet connection the first time, to download A-Frame.

## How it was built

- HTML, CSS, and JavaScript, written by hand in VS Code.
- [A-Frame](https://aframe.io/) 1.8.0 for the 3D world.
- No frameworks and no build step: every file you see is the file the browser loads.

## Accessibility

- Every page has a language, a descriptive title, headings in order, and a skip link.
- Everything works with a keyboard, and focus is always visible.
- Text colours meet WCAG 2.2 AA contrast.
- The 3D world has a written description of the scene, and a button to pause its animation. The animation stops on its own when the device asks for reduced motion.
- **Known issue:** the 3D scene itself cannot be explored with a screen reader; the written description is the alternative.

## Credits

| What | Made by | Where from | Licence |
| --- | --- | --- | --- |
| Lessons and starter files | XR Camp | XR Camp projects repository | Code: see its `LICENSE-CODE`. Content: CC BY-NC-SA 4.0 |
| A-Frame 1.8.0 | The A-Frame authors | <https://aframe.io/> | MIT |
| Riverside Community Centre | An imaginary centre from XR Camp's lessons | | |

## Licence

- **Code** (HTML, CSS, JavaScript): the MIT Licence. See [LICENSE](LICENSE).
- **Words and pictures:** © 2026 Ana. All rights reserved.
