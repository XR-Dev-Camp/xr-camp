# Bonus challenge: compressing glTF models

**Optional.** Not required for this lesson or for submission. Roughly 45–60 minutes. Needs [Node.js](https://nodejs.org/) (for `npx`) and a glTF/GLB model of your own — this repository does not ship one for this challenge.

Measure what geometry and texture compression actually save, on a model of your own, instead of taking it on faith.

## Task

1. Find or export a `.glb` file of your own — something with more detail than this lesson's simple shapes, so compression has something real to do. A free option: export any model from [Sketchfab](https://sketchfab.com/) that is licensed for reuse (check its licence and credit it), or export one from Blender.
2. Record its size: `ls -lh yourmodel.glb`.
3. Compress it with `gltf-transform` (the pinned version, exact): `npx @gltf-transform/cli@4.5.0 optimize yourmodel.glb yourmodel.compressed.glb --compress draco --texture-compress ktx2`. Read the tool's own console output — it reports what it changed.
4. Record the compressed size the same way, and calculate the percentage reduction.
5. Load both the original and the compressed file in a scratch three.js page (see ["Going further: compressing glTF models"](../README.md#going-further-compressing-gltf-models) for the `DRACOLoader`/`MeshoptDecoder` setup) and confirm the compressed one still looks right — check it against the original from the same camera angle.
6. Optional stretch: repeat the compression with `gltfpack` instead (`npx gltfpack@1.3.0 -i yourmodel.glb -o yourmodel.gltfpack.glb -cc`) and compare its file size and load time against `gltf-transform`'s result.

## Why this matters

"Compress the model" is easy to say and easy to skip, because an uncompressed glTF often still loads fine on a fast connection and a powerful laptop. The size budgets in this course exist because not every learner has either. Measuring your own before-and-after numbers — the same discipline the main lesson applies to draw calls and triangles — is what turns "compression helps" from something you were told into something you checked.

## Done when

- [ ] You compressed a real `.glb` file and recorded its size before and after.
- [ ] You loaded the compressed file in three.js with `DRACOLoader` and/or `MeshoptDecoder` set up, and it rendered correctly.
- [ ] You credited the model's source (and licence) if it was not one you made yourself.
- [ ] Nothing you added for this challenge exceeds this course's 5 MB model budget, and it lives outside `completed/`, in a scratch copy or a clearly separated experiment.
