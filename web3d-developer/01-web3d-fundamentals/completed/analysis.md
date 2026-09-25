# Comparing Web3D technologies: Ana's analysis

I built the same small exhibit (a table, a clay pot, and a stone) four ways,
then read about three more technologies. Sizes are what the browser downloads,
compressed, measured in the Network panel.

## What I built

| | Raw WebGL | three.js | A-Frame | X3D (X3DOM) |
| --- | --- | --- | --- | --- |
| **Style** | Low-level JavaScript API | JavaScript library | HTML elements (built on three.js) | Declarative ISO standard, shown by a JavaScript player |
| **My exhibit** | One triangle only | The whole exhibit | The whole exhibit | The whole exhibit (the stone is a sphere) |
| **Lines of scene code** | About 40, for one triangle | About 30 | About 10 | About 20 |
| **Library download** | None: built into the browser | About 190 KB | About 350 KB (includes its own three.js) | About 190 KB |
| **Camera and lights** | I would have to write the maths | I create them myself | Added for me unless I set them | A headlight is added for me |
| **VR and AR** | Through the WebXR API, by hand | Built in (WebXR) | Built in: one button | I did not try it |
| **Who looks after it** | The Khronos Group (the standard) and browser makers | Open-source community, MIT licence | Open-source community, MIT licence | Web3D Consortium (the standard); X3DOM is an open-source project |

## What I read about

| | What it is | When I would choose it |
| --- | --- | --- |
| **Babylon.js** | A complete JavaScript engine, open source, backed by Microsoft | A bigger project that needs physics, an editor, and many tools built in |
| **PlayCanvas** | An open-source engine with an online visual editor | Working in a team with designers who prefer an editor to code |
| **WebGPU** | The newer low-level graphics API, after WebGL, from the W3C | Heavy graphics or computing on the GPU; three.js and Babylon.js can already use it |

## What I learned

- Every engine does the same things underneath: a scene graph, a camera,
  lights, materials, and triangles drawn by WebGL (or WebGPU).
- Raw WebGL taught me why engines exist: forty lines for one flat triangle.
- A-Frame was the quickest to write, and the biggest to download.
- three.js gives me the most control for its size, but I write more code.
- X3D is the oldest and is an ISO standard, which matters for long-term
  archives, like museum collections.

## My choice for the virtual exhibit

**A-Frame first, then three.js.** A-Frame lets me build the exhibit quickly,
in HTML I already know, with VR included. When I need more control or a
smaller download, I will move parts to three.js, which is what A-Frame is
built on.
