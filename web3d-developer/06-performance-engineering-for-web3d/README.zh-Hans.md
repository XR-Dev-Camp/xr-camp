# Web3D 性能工程

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `web3d-developer` · **课时：** `performance-engineering-for-web3d-06` · **时长：** 约 12 小时 · 16 次学习，每次 45 分钟 · 每周 4 次，约 4 周

---

> 为移动端使用场景，优化一个刻意做得很慢的 3D 应用。

---

## 学习目标

完成本项目后，你将能够：

1. 读取 `renderer.info` 和 Chrome 的性能面板来测量一个 three.js 场景，而不是靠猜测什么地方慢。
2. 用一个 `THREE.InstancedMesh` 替换许多重复的网格，并解释什么时候实例化有帮助，什么时候没有。
3. 用 `BufferGeometryUtils.mergeGeometries` 把许多静态几何体合并成一个，并解释这和实例化有什么不同。
4. 为生成的贴图设定一个尺寸预算，并在每个外观相同的物体之间共享同一张贴图。
5. 决定哪些物体需要阴影，并在其他地方全部关闭阴影。
6. 用 `THREE.LOD`，在一个精细物体远离相机之后，把它替换成一个便宜的替代品。
7. 根据相机与场景某部分的距离，按需搭建和释放那一部分场景（「懒加载」）。
8. 用平实的语言解释 KTX2/Basis Universal 贴图压缩是用来做什么的，即使你自己没有转换过文件。
9. 用按需渲染循环替换一个始终开启的渲染循环，并测量两者的差异。

## 先决条件

- **课程 3.4：Three.js 基础**——本课在此基础上继续搭建渲染器、相机、控件和渲染循环的模式。
- **课程 3.5：Three.js 交互、素材与动画**——射线检测、加载和动画；本课假定你已经能够熟练读懂一个由多个文件组成的小型 three.js 应用。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 支持 WebGL 2 的浏览器（Chrome、Firefox、Edge；在中国大陆，360 浏览器或 QQ 浏览器等基于 Chromium 的浏览器也可以） | 运行和测试这个大厅 | 免费 |
| Chrome 开发者工具（或 Edge 开发者工具，两者共用同一个性能面板） | 测量帧时间，并录制一次性能追踪 | 免费，浏览器自带 |
| 一个代码编辑器（例如 VS Code） | 编辑起始文件 | 免费 |
| 一个本地网络服务器 | 通过 `http://` 加载页面，ES 模块需要这个条件 | 免费——本课程已经在运行 |
| 可选：[KTX-Software](https://github.com/KhronosGroup/KTX-Software)（英文）命令行工具（`basisu`） | 如果你想真正尝试可选步骤，把一张图片转换成 KTX2/Basis Universal 贴图 | 免费，离线运行 |

## 你将构建什么

展览已经发展成了一整个大厅：还是前面课程中同样的陶罐、编织篮环和玉石，重复排列在八十个展台上，另外在四个方位点各有一件更大的「特展」展品，外加三个更远处的小侧厅。**起始代码**用最容易搭建、却最难维护的方式搭建了这个大厅：数百个各自独立的网格，几乎每一个都生成了一张全尺寸的贴图，所有物体都开启阴影，无论是否有人访问都会加载每一个侧厅，还有一个永远以每秒六十次的频率重绘整个场景的渲染循环。它能运行，但远比实际需要的沉重得多——正是那种会在中端手机上卡顿的场景。

[`completed/`](completed/) 中的**参考答案**是同一个大厅，同样的八十个展台在同样的位置，重新搭建之后，绘制它只需要十几次调用，而不是几百次：实例化的展台和物品、一个合并后的地面、共享并缩小的贴图、只在值得的地方才有的阴影、带有细节层次的特展展品，会随着你靠近自动搭建、随着你离开自动释放的侧厅，以及一个只在有变化时才重绘的渲染循环。起始代码的 `js/hall.js`、`js/textures.js` 和 `js/app.js` 中有九个编号的 TODO，准确标出了每一处改动应该放在哪里；下面的分步讲解会逐一讲解它们，并始终配有一个可以在 Stats 面板上观察其变化的数字。

## 文件夹说明

```text
06-performance-engineering-for-web3d/
├── README.md
├── starter/          # begin here — nine numbered TODOs
│   ├── index.html
│   ├── styles.css
│   └── js/
│       ├── app.js        # renderer, camera, controls, render loop (TODO 9)
│       ├── hall.js        # the hall's layout (TODOs 1-4, 6-8)
│       ├── textures.js    # procedural swatch textures (TODO 5)
│       ├── describe.js    # the scene description text
│       └── main.js        # wires the page's buttons to the app
├── completed/        # reference solution — the optimised hall
├── challenges/       # Three challenges: Foundation is required
├── tests/            # self-review checklist
├── assets/
└── screenshots/
```

## 环境配置

1. 确认本课程的本地服务器正在运行，然后通过它打开 `starter/index.html`（例如 `http://127.0.0.1:8766/web3d-developer/06-performance-engineering-for-web3d/starter/index.html`）——绝不要直接双击文件打开，因为 ES 模块的导入需要 `http://`。
2. 在编辑器中打开 `starter/js/hall.js`、`starter/js/textures.js` 和 `starter/js/app.js`。找到九个编号的 `TODO` 注释；开始之前先快速浏览一遍。
3. 打开浏览器开发者工具的控制台和性能面板（按 F12，然后点击「性能（Performance）」标签）——你会在整个过程中用到这两者。
4. 在第二个标签页中保持 [`completed/`](completed/) 打开，等你做到一半时用来对照，但每一步都先自己动手尝试。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 打开起始代码的大厅。在里面走一走，阅读 `hall.js`、`textures.js` 和 `app.js` 中的九个 TODO。 | 一份简短的书面清单，列出哪里感觉慢，以及每个问题在代码中的位置。 |
| 2 | 打开性能面板，录制几秒钟拖动相机的过程，读取加载时 Stats 面板上的数字。 | 你自己记录下来的基线数字：绘制调用、三角形数、几何体数、贴图数、帧时间。 |
| 3 | 第 1 步：添加真正的资源释放（TODO 1）。 | 点击「重建大厅」不再让 Geometries 和 Textures 计数上升。 |
| 4 | 第 2 步：实例化展台（TODO 2）。 | 展台层只需一次调用即可绘制，而不是八十次。 |
| 5 | 第 3 步：实例化物品（TODO 3）。 | 整个主展区总共只需四次调用即可绘制。 |
| 6 | 第 4 步：合并地面（TODO 4）。 | 地面变成一个网格、一次绘制调用，图案依然是同一种拼贴。 |
| 7 | 第 5 步：缩小并共享贴图（TODO 5）。 | Textures 计数从几十个降到寥寥几个。 |
| 8 | 第 6 步：只在重要的地方保留阴影（TODO 6）。 | 性能面板的阴影渲染时间下降，大厅看起来几乎没有变化。 |
| 9 | 第 7 步：为特展展品添加细节层次（TODO 7）。 | 每个特展展品在远处会明显简化成一个简单方块。 |
| 10 | 第 8 步：懒加载侧厅（TODO 8）。 | 侧厅会在你走近时出现，离开后消失。 |
| 11 | 第 9 步：按需渲染（TODO 9）。 | 在你停止移动、暂停动画之后，「每秒渲染次数」降到接近 0。 |
| 12 | 阅读 `textures.js` 中的 KTX2/Basis Universal 部分，以及下面的「关键代码解析」。这一节不需要转换任何文件——只需理解它解决了什么问题。 | 用你自己的话，对「我什么时候会用到这个？」给出一句话的答案。 |
| 13 | 重新测量一切：Stats 面板和一次全新的性能面板录制。填写你自己的前后对比表（参见「性能注意事项」）。 | 一份填写完整的测量表，用你自己的话，注明你的数字是「在我的机器上」测得的。 |
| 14 | 无障碍检查：场景描述、通过每一个移动按钮的键盘路径、减少动态效果、2D 列表。逐项完成 `tests/checklist.md`。 | 清单中的大多数项目都已勾选。 |
| 15 | 基础挑战。 | 完成 `challenges/challenge-1.zh-Hans.md`。 |
| 16 | 打磨、截图，以及**提交作业**。 | 你完成的项目、截图和学习日志条目，可以分享了。 |

### 第 1 步：真正的资源释放（TODO 1）

起始代码的「重建大厅」按钮会丢弃旧大厅的 `Group`，再搭建一个新的，但一个 `Mesh` 的几何体和材质存活在 GPU 缓冲区中，你的 JavaScript 垃圾回收器看不到它们。把一个物体从场景中移除并不会释放它们——只有调用 `.dispose()` 才会。

```js
function disposeHall(group) {
  group.traverse((object) => {
    if (object.geometry) object.geometry.dispose();
    if (object.material) object.material.dispose();
  });
}
```

在搭建替代大厅之前调用它。多次点击「重建大厅」：Stats 面板中的 Geometries 和 Textures 计数现在应该每次都回到同一个数字，而不是持续上升。

### 第 2 步和第 3 步：实例化展台和物品（TODO 2 和 3）

起始代码中的每一个展台都是各自独立的 `Mesh`，拥有各自的几何体和材质，即使每一个展台除了所在位置之外都完全相同。`THREE.InstancedMesh` 用一次绘制调用绘制同一个几何体和材质的许多副本，每个副本只使用一个小小的变换（位置、旋转、缩放），而不是一整个独立的物体：

```js
const pedestals = new THREE.InstancedMesh(pedestalGeometry, pedestalMaterial, count);
const dummy = new THREE.Object3D();
positions.forEach(({ x, z }, i) => {
  dummy.position.set(x, PEDESTAL_HEIGHT / 2, z);
  dummy.updateMatrix();
  pedestals.setMatrixAt(i, dummy.matrix);
});
pedestals.instanceMatrix.needsUpdate = true; // easy to forget, and nothing draws without it
```

对物品也做同样的事，但你需要三个各自独立的 `InstancedMesh` 对象，而不是一个——陶罐、篮环和玉石是三种不同的几何体，一个 `InstancedMesh` 只能容纳单一几何体和材质的副本。

### 第 4 步：合并地面（TODO 4）

地面的拼贴一旦放置好，就不会再独立移动，所以它们不需要实例化那种每份副本各自的变换——一个合并后的单一几何体是更简单、更廉价的选择。来自 `three/addons/utils/BufferGeometryUtils.js` 的 `BufferGeometryUtils.mergeGeometries`，会把许多已经各自放置到位的几何体合并成一个：

```js
const tileGeometries = positions.map(({ x, z }) => {
  const tile = new THREE.PlaneGeometry(SPACING * 0.95, SPACING * 0.95);
  tile.rotateX(-Math.PI / 2);
  tile.translate(x, 0, z); // bake the position in before merging
  return tile;
});
const floorGeometry = mergeGeometries(tileGeometries);
for (const tile of tileGeometries) tile.dispose(); // the originals are no longer needed once merged
```

### 第 5 步：缩小并共享贴图（TODO 5）

`textures.js` 中隐藏着两个各自独立的问题：生成的画布比一块纯色贴图实际需要的尺寸更大，而且即使颜色和已经生成的完全一样，每个网格也会生成自己的一份拷贝。先解决共享的问题——按颜色和标签缓存贴图——再解决尺寸的问题：

```js
const cache = new Map();
export function getSwatchTexture(color, label) {
  const key = `${color}:${label}`;
  if (cache.has(key)) return cache.get(key);
  // ...build the canvas as before, at a smaller size...
  cache.set(key, texture);
  return texture;
}
```

为每种物品类型共享一张贴图，也正是实例化得以实现的前提：一个 `InstancedMesh` 批次中的每一个实例，都必须使用同一个材质，也就必须使用同一张贴图。

### 第 6 步：只在重要的地方保留阴影（TODO 6）

阴影贴图是从光源视角对场景进行的第二次渲染，每一帧都要重新做一次。八十个几乎一模一样的展台，处于均匀光照下，对阴影所能揭示的信息几乎没有任何贡献，却每一帧都要付出实实在在的代价。把主展区的展台和物品的 `castShadow` 关闭（`receiveShadow` 可以保留，这样地面依然能显示落在它上面的阴影），只在地面和四个重点特展展品上保留 `castShadow`。

### 第 7 步：为特展展品添加细节层次（TODO 7）

`THREE.LOD` 保存一个物体的多个版本，只显示与相机当前距离相匹配的那一个——其他版本根本不会被绘制，不会产生任何额外的绘制调用开销：

```js
const lod = new THREE.LOD();
lod.addLevel(detailedMesh, 0);       // used from 0 units away
lod.addLevel(simpleStandIn, 9);      // used from 9 units away and beyond
scene.add(lod);
// once per frame, with the camera:
lod.update(camera);
```

给每个特展展品一个精细网格（它平常的几何体）和一个共享同一材质的廉价替代品（同一形状的低分段版本，或者一个简单的方块）。

### 第 8 步：懒加载侧厅（TODO 8）

这三个侧厅目前是在启动时就一次性搭建好的，无论有没有人会走过去。改为每隔一段时间（每秒检测几次就足够了——相机不可能在一帧之内跨越一个侧厅的整个激活半径）检测相机与每个侧厅中心的距离，在跨越两个阈值时搭建或释放对应侧厅的分组：

```js
function update(cameraPosition) {
  for (const wing of wings) {
    const distance = Math.hypot(cameraPosition.x - wing.x, cameraPosition.z - wing.z);
    if (!wing.group && distance < ACTIVATE_RADIUS) wing.group = buildWing(wing); // and scene.add it
    else if (wing.group && distance > DEACTIVATE_RADIUS) { disposeWing(wing.group); /* and scene.remove it */ }
  }
}
```

使用两个不同的阈值（一个较小的用于激活，一个较大的用于停用），而不是一个共用的阈值。一个共用的阈值意味着一个恰好停在边界上的相机，会在每次检测时反复搭建和释放同一个侧厅——这个差值（「滞后（hysteresis）」）能阻止这种情况。

### 第 9 步：按需渲染（TODO 9）

起始代码的渲染循环会在每一帧都调用 `renderer.render()`，永远如此，即使什么都没有变化。保留一个标志位，只要真的发生了变化就把它设为真（一次相机拖动会触发 OrbitControls 的 `change` 事件；一次调整大小；某一帧有东西在动画），只有在它被设置时才渲染：

```js
let needsRender = true;
controls.addEventListener('change', () => { needsRender = true; });

function tick() {
  controls.update();
  // ...update anything that animates, and set needsRender = true if it moved...
  if (needsRender) {
    renderer.render(scene, camera);
    needsRender = false;
  }
}
renderer.setAnimationLoop(tick); // still runs every frame — required for WebXR — but most frames now skip render()
```

停止移动相机并暂停动画：「每秒渲染次数」应该降到接近 0，因为已经没有任何东西需要重新绘制了。

## 关键代码解析

- **`THREE.InstancedMesh`** 用一次绘制调用绘制同一个几何体和材质的许多副本，每个副本使用各自的变换矩阵。一旦你有了几十个相同的物体，它就是正确的工具；数量再少的话，管理这些数据的开销通常会超过它省下的成本。
- **`BufferGeometryUtils.mergeGeometries`** 把若干个已经各自定位好的几何体合并成一个，适用于放置好之后永远不需要独立变换的物体——地面就是最典型的例子。和实例化不同，一个合并后的网格无法在不重建整体的情况下单独移动其中一块拼贴。
- **`THREE.LOD`** 保存一个物体的多个版本，只显示与相机当前距离相匹配的那一个。`lod.update(camera)` 必须每帧都运行；没有被显示的层级不会产生任何绘制开销，但依然占用内存。
- **`renderer.info`** 报告最近一次 `render()` 调用实际绘制了什么：`render.calls`（绘制调用）、`render.triangles`（三角形数），以及 `memory.geometries` / `memory.textures`（当前已上传到 GPU 的资源）。这正是「测量」和「猜测」之间的区别。
- **`.dispose()`** 释放一个几何体、材质或贴图在 GPU 一侧的缓冲区。JavaScript 的垃圾回收器看不到 GPU 内存，所以仅仅把一个物体从场景图中移除永远是不够的——对你用完的每一样东西都要调用 `.dispose()`。
- **按需渲染**（一个在任何真实变化时被设置的 `invalidate()` 标志，在每次 `renderer.render()` 调用之前检查）把「永远每秒重绘六十次」变成了「只在有变化时才重绘」——对于一个大部分时候都静止不动的场景来说，这往往是最大的一笔节省。

## 3D 与 XR 无障碍

本课自始至终都是 3D 的，所以没有单独的 2D 热身环节：上面的每一项优化都必须让大厅保持和优化之前完全一样的可用性。

- **场景描述。** `#scene-description` 是从大厅自身用来构建自己的同一组计数（展台数、特展展品数、侧厅数、动画是否在播放）构建而成的，无论在起始代码还是参考答案中都是如此，所以它永远不会和屏幕上的内容脱节。
- **键盘路径。** 每一个「前往……」的移动按钮、「左转」/「右转」、「重置视角」、「暂停动画」和「重建」都是普通的 `<button>` 元素，仅凭键盘就能到达和操作。一旦画布获得焦点（通过 `controls.listenToKeyEvents`），方向键就能镜像拖动视角的效果。
- **减少动态效果。** `prefers-reduced-motion: reduce` 会让特展展品的转动从一开始就是暂停状态，「前往……」按钮会让相机瞬间跳转，而不是平滑过渡——点击是一种请求，但一次平滑的滑动仍然是某些学习者要求避免的动效。
- **2D 后备方案。** 「大厅里的一切」列表始终存在，而不是只在 WebGL 失败时才显示：它列出了主展区、全部四个特展展品和全部三个侧厅，和 3D 视图携带的是同一份信息。
- **舒适度。** 除非你移动它或点击移动按钮，否则相机绝不会移动；`OrbitControls` 的距离和极角限制，防止它爬到大厅顶部之上或沉到地面之下。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 大厅有一段文字描述，列出其中的一切 | 1.1.1 | 屏幕阅读器用户，或者任何看不到画布的人，仍然需要知道那里有什么。 |
| 每一个 3D 交互（观察、移动、暂停、重建）都有键盘路径 | 2.1.1 | 除非存在键盘替代方式，否则拖动画布是一种只有指针才能完成的手势。 |
| 转动和动画在 `prefers-reduced-motion` 下会停止 | 2.2.2 | 自行启动的动效必须能够暂停；本课对要求不看到它的人，一开始就直接以暂停状态启动。 |
| 每个按钮和获得焦点的画布上，焦点都是可见的 | 2.4.7 | 让键盘用户始终知道自己在哪里。 |
| 用 `list-style: none` 设置样式的列表依然保留 `role="list"` | 良好实践 | Safari 在项目符号样式被移除后，会丢失列表的语义。 |
| 除非学习者主动要求，否则相机绝不移动 | 良好实践 | 未经请求的相机运动会让人迷失方向，还可能在部分用户中引发晕动症。 |

## 性能注意事项

- **先测量，再优化。** Nancy Hitschfeld Kahler 自己的研究领域是计算几何和 GPU 计算：她的工作提醒我们，「感觉很慢」只是一个起点问题，而不是答案。用 `renderer.info` 查看绘制调用、三角形数和内存，用 Chrome 性能面板（录制几秒钟的交互，然后读取「主线程（Main）」轨道的帧时间）查看这些毫秒究竟花在了哪里。
- **实例化的经验法则。** 相同物体数量在几十个以下时，普通的 `Mesh` 实例通常更简单，速度也够用；一旦达到几十甚至几百个，`InstancedMesh` 几乎总是更划算。这个大厅八十个展台组成的主展区就是一个明确的例子；它的四个重点特展展品则不是，这也是为什么它们保持为普通网格、外面包一层 `THREE.LOD`，而不是实例化。
- **贴图尺寸的经验法则。** 一块从几米远处观看的纯色贴图，边长很少需要超过 256 像素；把更高的分辨率留给那些观众真的会靠近、有精细细节的贴图。
- **把你的数字标注为「在我的机器上」。** 帧时间取决于运行它的设备。记录你实际测量到的结果，连同浏览器和大致日期一起，而不是一个你期望在所有地方都成立的数字。

**前后对比，2026 年 9 月，在一台 MacBook 上，使用 Chrome，无头模式（通过 SwiftShader 软件渲染器）测得：**

| 测量项 | 起始代码（加载时） | 参考答案（加载时） |
| --- | --- | --- |
| 绘制调用（`renderer.info.render.calls`） | 397 | 12 |
| 三角形数（`renderer.info.render.triangles`） | 91,964 | 46,308 |
| 内存中的几何体数（`renderer.info.memory.geometries`） | 269 | 11 |
| 内存中的贴图数（`renderer.info.memory.textures`） | 66 | 7 |
| 每秒渲染次数（相机静止，动画暂停） | 约 60 | 降到接近 0 |

真实的 GPU 会显示出和软件渲染的 Chrome 不同的绝对数字，你自己的机器测出的数字也会和这张表不同——这正是要测量自己的数字、而不是照抄这张表的意义所在。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 设置了一个实例的矩阵，却忘记 `instanceMatrix.needsUpdate = true` | 没有任何东西移动到它被分配的位置；每一个实例都绘制在原点 | 在最后一次调用 `setMatrixAt` 之后，设置一次这个标志 |
| 在某个材质的清理代码中释放一张共享的、被缓存的贴图 | 其他仍在使用这张贴图的物体全都变成空白 | 按物体逐个释放材质和几何体；只有在没有任何东西再引用一张共享贴图时才释放它 |
| 假定 `InstancedMesh` 会对每个实例分别进行相机视锥体裁剪 | 整个批次会作为一个包围体整体绘制（或整体跳过），即使只有一个实例可见 | 让批次在空间上保持靠近，或者把一个非常分散的批次拆分成几个更小的批次 |
| 每一帧都检测侧厅的距离 | 白白浪费 CPU 却没有任何好处——相机不可能在一帧之内跨越一个侧厅的激活半径 | 改为每秒检测几次 |
| 重建场景时没有先释放旧的场景 | `renderer.info.memory` 每次重建都会稍微上升一点 | 在丢弃一个引用之前，始终先释放它 |

## 故障排查

**Stats 面板在起始代码和完成版本中显示相同的数字。** 你很可能是在对照其中一个页面的缓存版本——对两个标签页都做一次强制刷新（Shift+Reload）。

**`mergeGeometries` 抛出关于属性不匹配的错误。** 你传入的每一个几何体都需要拥有相同的顶点属性（position、normal、uv）。用不同构造参数创建的 `PlaneGeometry` 依然是匹配的；缺少法线或 UV 的几何体则不匹配。

**特展展品从来不会切换到它的低细节替代品。** 检查 `lod.update(camera)` 是否真的每帧都在运行，以及你传给 `addLevel` 的距离是否和你场景的单位一致（这个大厅的单位是米）。

**当我站在某个侧厅的边缘附近时，它会快速地反复加载和卸载。** 你的激活半径和停用半径太接近，或者相等了。把它们之间的差距拉大一些。

**在同一个场景下，Firefox 或 Safari 显示的帧率比 Chrome 低得多。** 打开 Firefox 的 `about:support` 或 Safari 的 Web Inspector 中的「Timelines」（不是「Performance」，那是 Chrome 对同一个面板的叫法），检查你的机器上该浏览器是否启用了硬件加速——软件渲染在任何地方都会更慢，不仅仅是在本课中。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：给大厅添加第四个侧厅，像另外三个一样懒加载。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：为大厅换一套皮肤，体现你自己的文化或社区。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：测量一次真正的 KTX2 转换，或者把合并与实例化的权衡取舍进一步推向极致。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项，修复任何未勾选的内容。
2. 拍两张截图：从相同的相机角度，起始代码的大厅（显示其 Stats 面板数字）和完成后的大厅（显示其 Stats 面板数字）。
3. 把它们保存在你的学习日志和作品集中。等 XR Camp 社区上线后，也在那里分享它们。
4. 学习日志问题：在你的机器上，哪一项单独的改动带来的差异最大？Chrome 性能面板证实了你的预期，还是给了你一个意外？

## 延伸阅读

- [three.js manual: How to update things](https://threejs.org/manual/#en/how-to-update-things)（英文）——关于 `InstancedMesh`、资源释放和按需渲染的权威解释。
- [MDN: `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)（英文）
- [Khronos Group: KTX File Format](https://www.khronos.org/ktx/)（英文）——本课可选步骤所指向的贴图容器格式。
- [Chrome DevTools: Analyze runtime performance](https://developer.chrome.com/docs/devtools/performance/)（英文）
- [three.js documentation: `THREE.LOD`](https://threejs.org/docs/#api/en/objects/LOD)（英文）

## 值得认识的女性

Nancy Hitschfeld Kahler 是智利大学的计算机科学教授，她的研究涵盖多边形网格生成、计算几何和 GPU 计算——正是本课每次统计三角形数、或者决定什么该放到 GPU 上时所借用的那片领域。她是该校计算机科学系（DCC）聘用的第一位女性学者，后来还担任了该系的系主任。

除了自己的研究之外，Hitschfeld Kahler 还共同创立了 Adelina Gutiérrez 网络，一个致力于推动该领域性别平等的组织。在一节性能课中提到她恰如其分：她的工作所提出的问题——一个网格是如何构建的，以及如何要求 GPU 用更少的工作量得到同样的结果——正是本课一直在向一个满是展台的大厅提出的同一类问题。

> **编者注：发布前请核实。** 「值得认识的女性」中的人物信息必须以一手资料核实，并在可行时于课程上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

Khronos Group，也就是 WebGL 本身背后的行业联盟，同时也制定了 KTX 文件格式的标准，并主导着本课可选步骤所指向的开源 Basis Universal 贴图压缩工具——定义一个场景用来绘制的 API 的同一个组织，也定义了它的贴图可以以什么格式传输。另外，W3C 的媒体查询规范定义了 `prefers-reduced-motion`，这个 CSS 和 JavaScript 特性正是这个大厅（以及本课程中每一节 3D 课）在自行启动任何东西之前都会检查的依据。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
