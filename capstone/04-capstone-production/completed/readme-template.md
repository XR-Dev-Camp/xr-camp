# Aurora Community Museum: virtual exhibit

A free, accessible virtual exhibit for a fictional community museum, built as an XR Camp capstone project.

## Setup

1. Clone or download this project's folder.
2. Start a local web server in the project's root (for example, `python3 -m http.server 8000`).
3. Open `http://localhost:8000/` in a modern browser.

## Running it locally

No build step, no dependencies to install, and no accounts or API keys are needed. Everything runs from the pinned CDN copy of three.js declared in the page's import map.

## Technologies used

- **three.js 0.186.1** (pinned, via the exact import map in `versions.json`) for the 3D scene, chosen because it needs no build tooling and runs directly in the browser.
- **Plain HTML, CSS, and JavaScript modules** for everything else, to keep the project free of paid tools or accounts.
- **A local JSON data file** for exhibit content, so text is never hard-coded and is ready for translation later.
