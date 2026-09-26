# Vendored third-party libraries

This directory mirrors, byte-for-byte, every pinned CDN library file that a
lesson in this repository loads (see `versions.json` and
`docs/en/3d-assets-and-versions.md`). Lessons load the CDN copy by default —
it is fast and already cached in most browsers — but every file the CDN
serves also lives here, so a lesson keeps working offline or where a CDN is
blocked. `scripts/validate-projects.mjs` fails CI if a pinned library URL a
lesson loads has no matching file here.

Each file below keeps its original license header. Do not edit these files;
upgrading a library is a deliberate change to `versions.json` (see its
`$comment`), not a vendor-directory edit.

## A-Frame 1.8.0

- Source: https://aframe.io/releases/1.8.0/aframe.min.js
- License: MIT (see `aframe/1.8.0/LICENSE`)
- Files:

| File | sha256 |
| --- | --- |
| `aframe/1.8.0/aframe.min.js` | `27a49c530c18c0710f5d0b9492934d5ba6670fe492be37a5e5ea890f26a9864f` |

## three.js 0.186.1

- Source: https://cdn.jsdelivr.net/npm/three@0.186.1/
- License: MIT (see `three/0.186.1/LICENSE`)
- Files (core build, plus every `examples/jsm` addon a lesson imports,
  followed to their own relative imports):

| File | sha256 |
| --- | --- |
| `three/0.186.1/build/three.module.min.js` | `3bc833fceb6577bd1a380388f832ae61cd6e2f78ad02b0bf0d5adf5a4a9334fe` |
| `three/0.186.1/build/three.core.js` | `9edde002b066a9a05676a6127f67735b62baf399bdea529f2f7e31657da769e6` |
| `three/0.186.1/build/three.core.min.js` | `3b346151f65ffdfca3e4c002bd58966b78c423087fb48a873f83200de1bffc48` |
| `three/0.186.1/examples/jsm/controls/OrbitControls.js` | `3d79d07ecb686b4e5d93232eedab255331c1beef711e13164eaa1f68655a5f2b` |
| `three/0.186.1/examples/jsm/webxr/VRButton.js` | `35a7621bbbe776203dad04cddc79c8e1b166dc3b6757d8b907f97df86d8a9d48` |
| `three/0.186.1/examples/jsm/webxr/XRControllerModelFactory.js` | `401dcb638ca3de94dd0a7744dd7a1c0d20374c73695b3d4e890eac6100e56877` |
| `three/0.186.1/examples/jsm/webxr/XRHandModelFactory.js` | `eb850592ebc60acd01b5d40f9151bd1404c6479ad1167da7914d370707c3205e` |
| `three/0.186.1/examples/jsm/webxr/XRHandPrimitiveModel.js` | `401ec6836ba4ca82f709e07329d6df4f687c91062b532a1e30415fb689ffdb97` |
| `three/0.186.1/examples/jsm/webxr/XRHandMeshModel.js` | `9bcb2e3f36fcc17c952589f9c40d2e6abe33af1a0bf797bd4b50d5dd311781ae` |
| `three/0.186.1/examples/jsm/libs/motion-controllers.module.js` | `4bf534b98dbb0f3e90b1332ac4d49c7d7747253768970abc7e4133b7700b75b1` |
| `three/0.186.1/examples/jsm/loaders/GLTFLoader.js` | `131c0f78c01d19368ae495caa65b3adaa10487810a36a05bb5901b769a35ac16` |
| `three/0.186.1/examples/jsm/utils/BufferGeometryUtils.js` | `9fb63427ce6641fa14fd0baff9cc4d1b5f9c3d85fd084bf2e90e803c44ec1797` |
| `three/0.186.1/examples/jsm/utils/SkeletonUtils.js` | `b1632a703206c3d830de9fcbe515696770d04b71a15ee6b50afa6d2c3298c86f` |

`XRControllerModelFactory.js` and `XRHandModelFactory.js` are only pulled in
by lessons that use hand/controller models (`immersive-developer/02-xr-input-and-interaction`);
their own relative imports (`XRHandPrimitiveModel.js`, `XRHandMeshModel.js`,
`libs/motion-controllers.module.js`, and `GLTFLoader.js`/`SkeletonUtils.js`/
`BufferGeometryUtils.js`) are vendored here too so the mirror is complete.
`XRControllerModelFactory.js` also fetches optional controller-model assets
at runtime from `https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles`;
that is a runtime data fetch (3D controller models), not a script import, and
is out of scope for this mirror — no lesson here fails without it, it only
changes the on-screen controller model.

`KTX2Loader.js` and `examples/jsm/libs/basis/` are referenced only inside a
code comment in `web3d-developer/06-performance-engineering-for-web3d`
(shown, not executed — no lesson actually imports or runs them), so they are
not vendored. Vendor them if a future lesson starts importing KTX2Loader.

## X3DOM 1.8.3

- Source: https://www.x3dom.org/download/1.8.3/
- License: dual MIT / GPL-3.0 (see `x3dom/1.8.3/LICENSE.md`); this repository
  uses the MIT terms.
- Files:

| File | sha256 |
| --- | --- |
| `x3dom/1.8.3/x3dom.js` | `0d336683d039d19c94a4b748299a13270db3a9e71edfccbf6ad6a58133e1b3fb` |
| `x3dom/1.8.3/x3dom.css` | `0e1bcdc0c236eafb1aabc501a49e51ab5d3d8d644010d8a9af3485bef6034182` |

## Verifying a file

```sh
shasum -a 256 vendor/three/0.186.1/build/three.module.min.js
```

Compare the output against the table above.
