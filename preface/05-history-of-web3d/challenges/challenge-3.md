# Challenge 3: Explorer

**Optional.** Roughly 30 minutes.

Load a real glTF model in A-Frame.

## Task

1. Copy `examples/aframe.html` and name the copy `examples/gltf.html`.
2. Replace the `<a-box ...></a-box>` line with:

   ```html
   <a-gltf-model src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Duck/glTF-Binary/Duck.glb"
                 position="0 1 -3" scale="1 1 1"></a-gltf-model>
   ```

   This duck is a sample model the Khronos Group publishes for testing glTF. It is © Sony Computer Entertainment Inc., shared under the SCEA Shared Source License 1.0. Credit it in your page if you publish it.
3. Open `examples/gltf.html` in your browser. If the duck is too big or too small, change `scale`.
4. Rewrite its `scene-description`.
5. Add it to your lab as a fourth `<figure>`.

## Why this matters

Almost every real 3D project loads models someone made in another program, such as Blender. glTF is how they get onto the web, in every engine you will use.

## Done when

- [ ] The duck appears, at a sensible size.
- [ ] The description matches what you see.
- [ ] You noted in your journal the model's file size: about 120 KB. Compare it with a photo from your phone.
