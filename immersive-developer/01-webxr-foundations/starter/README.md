# Starter - WebXR Foundations

Begin here.

- `index.html` and `styles.css` are finished: the page, its controls, and the Enter VR panel are already built and styled.
- `js/exhibit.js` is finished too: the exhibit's three objects, carried over unchanged from 3.4.
- You write the rest, in `js/`, across eight numbered TODOs: TODO 1 in `xr.js`, TODO 2 and TODO 3 in `app.js`, TODO 4 and TODO 5 in `xr.js`, TODO 6 in `main.js`, TODO 7 in `describe.js`, and TODO 8 in `main.js`.
- Before TODO 1, the page loads and the desktop exhibit already works exactly as it did at the end of 3.4. The "Enter VR" section will say "Checking whether this browser and device support VR…" and go no further until TODO 6 and TODO 8 are done.

Open everything through a local server (http://). WebXR itself also requires what the specification calls a secure context: `http://localhost` and `http://127.0.0.1` count as secure for local testing, but a plain network address such as `http://192.168.x.x` will not let `navigator.xr` do anything.

Full instructions: [`../README.md`](../README.md).
