# 挑战 3：探索

**进阶选做。** 约 90 分钟。

用 `THREE.VideoTexture`，把本课由画布驱动的故事屏幕和一段真实的视频做对比。

## 任务

1. 找到或制作一段属于你自己的简短小视频片段（几秒钟就够了），可以是自制的，也可以是 CC0 授权的，大小要远小于 [`docs/en/3d-assets-and-versions.md`](../../../docs/en/3d-assets-and-versions.md)（英文）中规定的 10 MB 视频预算。把它加入 `assets/`，如果它不完全是你自己制作的，在 `ATTRIBUTION.md` 中注明来源。
2. 在 `index.html` 中创建一个隐藏的 `<video>` 元素，带有 `muted`、`loop`、`playsinline`，以及它自己的 `<track kind="captions">`，指向一份提示与你的片段匹配的 WebVTT 文件。
3. 在 `video.js` 的一个副本中，把画布和 `THREE.CanvasTexture` 替换成 `new THREE.VideoTexture(videoEl)`，作为这块平面的贴图。先阅读 three.js 自己的 `VideoTexture` 源码（固定在 r186 版本标签下的 `src/textures/VideoTexture.js`），在注释中记录它在决定是否更新之前检查了什么，并和本课 `drawFrame()` 手动设置的 `texture.needsUpdate = true` 做对比。
4. 不做任何改动地复用 `captions.js`，让它指向你的新 `<video>` 元素，而不是 `guide-audio`，以证明同一段字幕读取代码对 `<video>` 和 `<audio>` 元素都同样有效。

## 为什么这很重要

`CanvasTexture` 和 `VideoTexture` 是近亲：两者都是把一张不断变化的图像放到一个 three.js 材质上，本课刻意自己搭建了 `drawFrame()`，就是为了让你确切了解一张贴图是如何被「告知」需要更新的。之后阅读 `VideoTexture` 自己的源码，会让你看到同一个想法在一个真实的库内部，是如何被自动完成的。

## 完成标准

- [ ] 故事屏幕上播放的是一段真实的视频，而不是生成的画布动画。
- [ ] 它自己的字幕和逐字稿通过同一套 `captions.js` 函数正常工作，没有任何改动。
- [ ] 你能用自己的话解释，`VideoTexture` 每一帧检查了什么，是 `CanvasTexture` 做不到的。
- [ ] 新的素材已经在 `ATTRIBUTION.md` 中注明来源，并且在预算之内。
