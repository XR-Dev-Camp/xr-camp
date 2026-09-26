# Three.js 基础

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `web3d-developer` · **课时：** `threejs-foundations-04` · **时长：** 约 14 小时 · 19 次学习，每次 45 分钟 · 每周 4 次，约 5 周

---

> 搭建展览的 three.js 版本：一个渲染器、一个可以环绕观察的相机，以及一个渲染循环，围绕概念实验室中同样的陶罐、编织篮环和玉石搭建，并确保没有人看着它时，不会留下任何仍在运行的东西。

---

## 学习目标

完成本项目后，你将能够：

1. 设置一个 **WebGLRenderer**：抗锯齿、色彩空间、色调映射，以及为手机设置上限的像素比。
2. 搭建一个**场景（scene）**、一个 **PerspectiveCamera**，并用 **ResizeObserver** 正确地调整两者的大小。
3. 在持续运行的**渲染循环（render loop）**（`renderer.setAnimationLoop`）和**按需渲染（rendering on demand）**之间做出选择，并解释各自适用的场景。
4. 用 **`THREE.Timer`** 让动画在任何屏幕上都以相同的可见速度播放，并解释为什么 `THREE.Clock` 已被弃用。
5. 添加 **OrbitControls**：阻尼、键盘支持，以及对距离和视角的舒适度限制。
6. **暂停**动画、遵守**减少动态效果**，并在标签页隐藏时停止渲染循环。
7. **释放（dispose）**几何体、材质和贴图，并用 `renderer.info` 证明「重建场景」按钮不会造成内存泄漏。
8. 把一个 three.js 应用拆分成职责单一的**模块**：引擎、物体、描述和页面。
9. 检测 **WebGL 2** 支持情况，并提供一个携带同样信息的 2D 后备方案。
10. 读取 `renderer.info.render.calls`，并用平实的语言解释什么是**绘制调用（draw call）**。

## 先决条件

- **Web3D 基础（3.1）**，尤其是场景图、相机、灯光、材质和按需渲染。
- **A-Frame 基础与进阶 A-Frame（3.2-3.3）**：同一个虚拟展览，用 HTML 搭建。本课用 three.js 自己的 API 再搭建一次同样的想法。
- **我的 XR Camp**，阶段 2 自己的那个小应用（课程地图、仪表盘、学习计划器）：同一种「跨越多节课搭建同一个东西」的模式在这里延续下去，只不过换成了虚拟展览。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 支持 WebGL 2 的现代浏览器 | 本课的每一个页面都需要 | 免费 |
| VS Code 和本地服务器 | 模块和导入映射需要 `http://` | 免费 |
| 浏览器的**性能（Performance）**或**渲染（Rendering）**面板 | 观察标签页隐藏或动画暂停时的帧数变化 | 免费 |

这个库从 `cdn.jsdelivr.net` 加载。如果它在你所在的地区较慢或被屏蔽，可以在能访问的地方下载一次这些固定版本的文件，把它们保存在页面旁边，再把导入映射中的地址改成本地文件。

## 你将构建什么

你在第 3.1 课开始搭建、又在第 3.2-3.3 课用 A-Frame 再次搭建的虚拟展览的 **three.js 版本**：同样的陶罐、编织篮环和玉石，各自立在自己的展台上，全部用基本几何体搭建（不使用模型文件：glTF 会在第 3.5 课出现）。这一次，你要亲自编写引擎，分成四个小模块，之后第 3.5 到 3.7 课会原样复用这个起始应用。

参考答案在 [`completed/`](completed/) 中。起始代码包含页面和它的控件；你需要编写背后的四个 JavaScript 模块：十九个 TODO。

## 文件夹说明

```text
04-threejs-foundations/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html, styles.css    # The page and its controls (finished)
│   └── js/
│       ├── app.js                # The engine: TODOs 1-11
│       ├── exhibit.js            # The objects: TODOs 12-15
│       ├── describe.js           # The description: TODO 16
│       └── main.js               # Wiring the page: TODOs 17-19
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## 环境配置

1. 把起始代码复制到你的 `virtual-exhibit` 文件夹中，和你第 3.1-3.3 课的成果放在一起，并用 Git 提交。
2. 启动本地服务器，打开 `index.html`。控件都在，但画布方框在 TODO 1 完成之前会保持空白：这是正常的。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 环境配置；第 1 步：渲染器（TODO 1） | 一个灰色画布填满了它的方框 |
| 2 | 第 1 步（续）：键盘和屏幕阅读器访问（TODO 2） | 画布能够获得键盘焦点 |
| 3 | 第 2 步：场景、相机和灯光（TODO 3） | 一个有光照的空房间出现 |
| 4 | 第 3 步：调整大小（TODO 4） | 画布调整大小时不会被拉伸 |
| 5 | 第 4 步：陶罐（TODO 12） | 陶罐立在它的展台上 |
| 6 | 第 4 步（续）：篮环与玉石（TODO 13-14） | 三个物体都立在各自的展台上 |
| 7 | 第 5 步：OrbitControls（TODO 5） | 你可以拖动来环绕相机 |
| 8 | 第 6 步：舒适度限制与键盘支持（TODO 6） | 方向键也能在限制范围内环绕 |
| 9 | 第 7 步：渲染循环，以及 `THREE.Timer`（TODO 7-8） | 玉石平滑地转动 |
| 10 | 第 8 步：启动与停止循环（TODO 9） | 你能解释 `setAnimationLoop` 和按需渲染的区别 |
| 11 | 第 9 步：重置视角（TODO 10） | 重置视角能让相机回到原位 |
| 12 | 第 10 步：场景描述（TODO 16） | `#scene-description` 与展览保持一致 |
| 13 | 第 11 步：暂停，以及减少动态效果（TODO 18） | 暂停功能可用，减少动态效果下一开始就是暂停状态 |
| 14 | 第 12 步：左转/右转，以及隐藏标签页检测（TODO 19） | 每一个交互都有键盘路径 |
| 15 | 第 13 步：WebGL 2 检测与 2D 后备方案（TODO 17） | 始终存在的物品列表，以及无 WebGL 提示信息 |
| 16 | 第 14 步：释放资源（TODO 15） | `disposeExhibit` 释放几何体和材质 |
| 17 | 第 15 步：重建，以及 Stats 面板（TODO 11） | 重建场景证明没有任何泄漏 |
| 18 | [`tests/checklist.md`](tests/checklist.md) | 一个完成的起始应用 |
| 19 | 一个拓展挑战，然后是**提交作业** | 展览的 three.js 版本，为第 3.5 课做好准备 |

### 第 1 步：渲染器（TODO 1）

`WebGLRenderer` 把一个场景变成 `<canvas>` 上的像素。除了基础设置之外，还有三项设置很重要：

- **`antialias: true`** 让锯齿状的边缘变得平滑，会带来一点性能开销，但对这样一个小场景来说是值得的。
- **`outputColorSpace`** 在这个版本的 three.js 中默认是 `THREE.SRGBColorSpace`：显示器需要以 sRGB 编码的颜色，但 three.js 自身的光照运算是在**线性（linear）**空间中进行的（光在物理上是按直线叠加和混合的；sRGB 是一种压缩编码，会在人眼不敏感的地方节省数据位）。渲染器在输出时会转换回 sRGB。即使它已经是默认值，明确设置它也能让这个转换在你自己的代码中可见，而不是隐藏在一个没人会读的默认值里。
- **`toneMapping`** 把场景中最亮的数值压缩到屏幕能够显示的范围内，就像相机的曝光一样。默认的 `NoToneMapping` 只是把任何过亮的部分直接裁切成纯白。`ACESFilmicToneMapping` 则会把明亮的高光柔和地压低，这更适合像玉石这样有光照的、基于物理的材质。

### 第 1 步（续）：画布的键盘与屏幕阅读器访问（TODO 2）

`<canvas>` 默认无法获得键盘焦点，所以 `tabIndex = 0` 给它一个焦点，第 6 步中的方向键支持也需要这一点。`role="img"` 和 `aria-label` 会告诉辅助技术这个画布是一张图片，而不是一个交互控件：真正的描述在它下方的文字元素中。

### 第 2 步：场景、相机和灯光（TODO 3）

这里没有什么是第 3.1 课中没见过的：一个 `Scene`、一个 `PerspectiveCamera`、一个 `AmbientLight` 和一个 `DirectionalLight`。不同的是你所看到的内容：一排三个展台，而不是一张桌子。

### 第 3 步：调整大小（TODO 4）

`renderer.setSize(width, height, false)` 调整绘图缓冲区的大小；第三个参数 `false` 告诉它不要动画布元素自身的 CSS 尺寸，因为样式表已经用 `.canvas-box` 控制了这一点。任何对 `camera.aspect` 的修改之后，都必须调用 `camera.updateProjectionMatrix()`，否则画面会保持拉伸状态。容器上的 `ResizeObserver` 会在容器的方框尺寸发生变化时调用它，而不仅仅是在整个窗口变化时。

### 第 4 步：展览的物体（TODO 12-14）

和第 3.1 课与第 3.2-3.3 课中同样的三个物体，全部用基本几何体搭建，不使用模型文件（glTF 会在第 3.5 课出现）：

| 物体 | 几何体 | 为什么选择这种材质 |
| --- | --- | --- |
| 陶罐 | `CylinderGeometry`，顶部比中部窄 | 高粗糙度，无金属度：未上釉的陶土是哑光的 |
| 编织篮环 | `TorusGeometry`，平放 | 高粗糙度：编织的纤维会不均匀地散射光线 |
| 玉石 | `IcosahedronGeometry` | 较低粗糙度，无金属度：抛光但不是金属 |

`exhibit.js` 把每个物体的资料（`ITEMS`）和用它们搭建出来的网格分开保存，这样 `describe.js` 就能从同一份数据构造出句子，永远不会说出场景里没有展示的内容。

### 第 5 步：OrbitControls（TODO 5）

来自 `three/addons/controls/OrbitControls.js` 的 `OrbitControls`，会在你拖动时让相机围绕一个 `target` 点环绕。`enableDamping` 让这个运动缓缓停下，而不是在你松手的瞬间戛然而止。阻尼只有在 `controls.update()` 每一帧都运行时才有效，这也是本课需要一个渲染循环、而不是按需渲染的另一个原因。

### 第 6 步：舒适度限制与键盘支持（TODO 6）

两种限制让观看这个展览保持舒适（参见 [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md)（英文））：

- **`minDistance` / `maxDistance`** 防止相机靠得太近而让人不适，或者飘得太远。
- **`minPolarAngle` / `maxPolarAngle`**，以弧度表示，防止相机翻到展览的顶部之上，或者沉到地面之下。

一旦画布获得了焦点（第 1 步续中给了它一个），`controls.listenToKeyEvents(renderer.domElement)` 就能让方向键也拥有环绕的路径。在依赖任何 three.js 方法之前，先阅读 r186 版本的源码：它接受要监听的元素，其默认的按键绑定就是方向键。

### 第 7 步：渲染循环，以及 `THREE.Timer`（TODO 7-8）

`THREE.Clock` **自 r183 起已被弃用**；请改用 `THREE.Timer`。两者都用于测量时间，但 `Timer` 把测量时间（`update()`）和读取时间（`getDelta()`、`getElapsed()`）分开，所以在同一帧内两次调用 `getDelta()`，不会悄无声息地得到两个不同的答案。`timer.connect(document)` 使用页面可见性 API（Page Visibility API），这样从一个长期隐藏的标签页返回时，就不会报告一次巨大的时间跳跃。

用 `timer.getDelta()` 而不是一个固定数字来相乘运动量，就能实现**帧率无关（frame-rate independent）**：无论屏幕是每秒绘制 30 帧还是 120 帧，玉石转动的可见速度都是一样的。

### 第 8 步：启动与停止循环（TODO 9）

`renderer.setAnimationLoop(callback)` 启动一个渲染循环；`renderer.setAnimationLoop(null)` 会彻底停止它，释放 GPU，而不仅仅是跳过回调内部的工作。应用应该始终用这种方式启动和停止它们的循环，而不是直接使用 `requestAnimationFrame`：它还会自动覆盖 WebXR 会话。

这个展览让它的循环持续运行，因为 `OrbitControls` 的阻尼在每次拖动之后都需要一帧来缓缓停下，即使玉石自身的动画已经暂停。这和第 3.1 课的概念实验室形成对比，那里是**按需渲染**的，因为那里没有任何东西会自己移动，也没有使用阻尼。「探索」挑战会要求你把两者结合起来：在相机稳定下来、动画也暂停之后，改为按需渲染。

### 第 9 步：重置视角（TODO 10）

在应用创建时，记录相机的初始位置和控件的初始目标点各一次。「重置视角」用 `Vector3.copy()` 把它们复制回去，然后调用 `controls.update()` 让变化立即生效。

### 第 10 步：场景描述（TODO 16）

和第 3.1 课同样的思路：3D 场景是由 JavaScript 绘制出来的一幅画面，屏幕阅读器无法看到它内部，所以 `#scene-description` 用文字承载同样的信息，并且从和网格所用的同一份 `ITEMS` 数据构建而成。它还需要说明玉石当前是否正在转动，以及如何环顾四周，因为这两者都可能在学习者停留在页面上时发生变化。

### 第 11 步：暂停，以及减少动态效果（TODO 18）

暂停按钮的 `aria-pressed` 状态，以及它自身可见的文字，必须始终说明当前的真实状态，以及点击它接下来会发生什么：运行中时是「暂停动画」，暂停后是「继续动画」。系统要求减少动态效果的学习者，永远不应该看到动画自行开始运动：尽早检测一次 `prefers-reduced-motion`，如果检测到，就一开始就以暂停状态启动。

### 第 12 步：左转/右转，以及隐藏标签页检测（TODO 19）

`controls.rotateLeft(angle)` 用代码环绕相机，效果和学习者拖动完全一样。在决定哪个按钮传入正角度、哪个传入负角度之前，先查阅 r186 版本源码中它的符号约定。检测 `document.hidden` 的 `document.visibilitychange` 是判断一个标签页何时不可见的标准方式：这时停止渲染循环，就不会有人的电量为一个谁也看不见的场景而消耗。

### 第 13 步：WebGL 2 检测与 2D 后备方案（TODO 17）

在这个版本中，three.js 的 `WebGLRenderer` 默认请求一个 `webgl2` 上下文。在创建渲染器**之前**检测这种支持，意味着不支持它的浏览器会看到一条清晰的提示信息，而不是一次静默的失败或控制台报错。展览的物品列表并不只在那种情况下才显示：它始终存在于页面中，所以展览的信息永远不会只存在于画面之中（WCAG 1.3.1）。

### 第 14 步：释放资源（TODO 15）

一个几何体的三角形数据和一个材质编译出的着色器程序，存放在 GPU 显存中，而不是浏览器垃圾回收器管理的 JavaScript 堆内存中。从场景图中移除一个网格，并不会释放那部分内存：你必须自己对它的几何体和材质调用 `.dispose()`（等第 3.5 课加入贴图之后，也要对材质持有的任何贴图这样做）。

### 第 15 步：重建，以及 Stats 面板（TODO 11）

「重建场景」会释放当前的展览，再搭建一个全新的。`renderer.info.memory.geometries` 和 `.textures` 统计的是当前已上传到 GPU 的数量：如果释放工作做对了，这些数字会回到点击之前的水平。如果它们每次都稍微上升一点，说明有什么东西没有被释放。

这些计数只有在一个几何体真正被绘制过之后才会更新，而不是从它被创建的那一刻起，所以 `rebuild()` 会自己先渲染一帧，再把控制权交回去：否则一个紧接着读取 `renderer.info` 的 Stats 面板，可能会短暂地显示刚刚被释放的旧数字，而不是新展览的真实数字。

即使这个展览没有加载任何图片文件，`.textures` 读数也应该是 **1**，而不是 0：three.js 在第一次渲染任何 `MeshStandardMaterial` 时，会创建一张很小的内部查找贴图，之后每一个基于物理的材质都会复用它。它不是你需要释放的东西，只要它保持为 1，就不是泄漏。判断释放是否成功的关键，在于这两个数字在反复重建后保持不变，而不是要求它们归零。

## 关键代码解析

**`THREE.Timer`** 取代了自 r183 起被弃用的 `THREE.Clock`。每帧调用一次 `timer.update(time)`，放在 `timer.getDelta()` 之前。

**`renderer.setAnimationLoop(callback)`** 启动一个在 WebXR 会话中也能正常工作的渲染循环；`setAnimationLoop(null)` 会彻底停止它。

**`controls.listenToKeyEvents(domElement)`** 在 `domElement` 获得焦点之后，给 `OrbitControls` 提供一条键盘路径，默认使用方向键。

**`controls.rotateLeft(angle)`** 和 **`controls.rotateUp(angle)`** 按给定的弧度环绕相机，效果和拖动完全一样。

**`camera.updateProjectionMatrix()`** 必须在任何对 `fov`、`aspect` 或近/远裁剪面的修改之后调用。

**`renderer.setPixelRatio(Math.min(devicePixelRatio, 2))`** 能在高密度屏幕上画出清晰的画面，同时不会要求 GPU 绘制超过屏幕实际能带来好处的两倍像素。

**`renderer.info.render.calls`** 和 **`.triangles`** 统计的是最近一次渲染的那一帧的开销；**`renderer.info.memory.geometries`** 和 **`.textures`** 统计的是当前已上传的数量，这正是证明释放是否奏效的依据。

**导入映射**把 `three` 映射到固定版本的构建文件，把 three.js 自身的 `three.core.js` 映射到它的压缩版本，并把 `three/addons/` 映射到 `OrbitControls.js` 所在的 `examples/jsm/` 文件夹（参见 [`docs/en/3d-assets-and-versions.md`](../../docs/en/3d-assets-and-versions.md)（英文））。

## 3D 与 XR 无障碍

- 场景有一段文字描述（`#scene-description`），会随每一次变化更新：有哪些物体、动画是否在运行，以及如何环顾四周。
- 每一个 3D 交互都有键盘路径：Tab 键能到达画布，方向键能环绕它，「左转」「右转」「重置视角」「暂停动画」和「重建场景」都是普通按钮。
- 减少动态效果得到遵守：当操作系统要求时，展览一开始加载就已经是暂停状态，无论如何暂停按钮始终可用。
- 展览的信息也存在于一个始终存在的 HTML 列表中，所以在 WebGL 2 不可用、设备较慢，或者屏幕阅读器用户完全跳过画布时，它依然可用。
- 除非有人主动移动，否则相机绝不会移动：没有自动路径，没有自动旋转，也没有相机抖动。只有玉石会动画，而且只在未暂停时。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 场景有随其变化更新的文字描述 | 1.1.1 | 画面所承载的信息，文字中也有。 |
| 每一个 3D 交互也都能用键盘完成 | 2.1.1 | 环绕、转动、重置、暂停和重建，都不需要鼠标就能到达。 |
| 暂停按钮用 `aria-pressed` 显示状态，文字说明接下来会发生什么 | 4.1.2 | 屏幕阅读器会朗读「已按下」或「未按下」；视力正常的学习者也能从标签中读到同样的信息。 |
| 减少动态效果得到遵守，且始终有一个可见的暂停控件 | 2.2.2, 2.3.3 | 没有人会看到自己没有要求的动效，剩下的动效人人都能停止。 |
| 展览的内容以 HTML 形式存在，而不仅仅在画布内部 | 1.3.1 | WebGL 不可用时，信息不会丢失。 |
| 页面在手机上不会出现横向滚动 | 1.4.10 | 展览会显示在控件的上方。 |

## 性能注意事项

第 3.1 课的三个想法在这里得到延续，并且更进一步。**限制像素比上限**避免让手机的 GPU 绘制人眼根本分辨不出的像素。**在标签页隐藏时停止渲染循环**（在 `visibilitychange` 时调用 `setAnimationLoop(null)`）意味着后台标签页完全不绘制任何东西，而不是每秒白白浪费 60 帧。**释放资源**在一个应用允许学习者重建或替换屏幕上的内容那一刻起就变得重要：没有它，每次重建都会让内存稍微上升一点，直到标签页最终变慢或崩溃。`renderer.info` 把这一切都变得可见，而不是隐形：Stats 面板中的绘制调用、三角形数和内存计数，正是一次真正的性能审查会从中入手的那些数字。阶段 3 的性能课（3.6）会更深入地讲解如何用合并几何体和实例化来减少绘制调用。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 修改 `camera.aspect` 却不调用 `updateProjectionMatrix()` | 调整大小之后画面看起来被拉伸了 | 修改之后始终要调用它 |
| 使用 `THREE.Clock` | 控制台出现警告，代码也无法延续下去 | 使用自 r183 起替代它的 `THREE.Timer` |
| 在渲染循环中忘记调用 `controls.update()` | 阻尼和惯性永远不会停下来，或者根本不会动 | 无条件地每帧调用一次 |
| 释放了网格的几何体，却没释放材质（或者反过来） | 每次重建内存依然会上升 | 两者都要释放，材质持有的任何贴图也是 |
| 每帧都给旋转加上一个固定数字 | 物体在高刷新率屏幕上转得更快，在低刷新率屏幕上转得更慢 | 乘以 `timer.getDelta()` |
| 对一个无法获得焦点的元素调用 `listenToKeyEvents` | 方向键完全没有反应 | 先给这个元素设置 `tabIndex = 0` |

## 故障排查

**画布方框保持空白。** TODO 1 还没完成，或者控制台中有报错。检查你是否通过 `http://` 打开了页面。

**`Failed to resolve module specifier "three"`。** 导入映射缺失，或者出现在某个模块脚本之后。它必须在 `<head>` 中排在最前面。

**拖动有效，但方向键没有任何反应。** 画布需要 `tabIndex = 0`，并且在 `listenToKeyEvents` 能听到任何按键之前，需要真正获得焦点（点击它，或者按 Tab 键）。

**玉石不见了，或者控制台显示读取 `undefined` 的 `.name` 时出错。** `exhibit.js` 中的某个 `build...()` 函数（TODO 12-14）还没有返回一个网格：在你完成它之前，起始代码中出现这个情况是正常的。

**「重建场景」之后，Geometries 或 Textures 的计数持续上升。** `disposeExhibit()` 中有什么东西没有释放每一个几何体或材质；检查它是否在这个组的 `traverse()` 访问到的每一个对象上都运行了，而不仅仅是顶层的网格。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：给展览添加第四个物体，放在它自己的展台上。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：换成来自你自己文化或社区的物体，用你自己的语言描述。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：把按需渲染重新加回来，用在动画暂停、相机也稳定下来的时候。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项。
2. 给展览的初始视角截图，再在使用「左转」或方向键之后截一张图。
3. 把它们和这个项目一起保存在你的学习日志和作品集中。等 XR Camp 社区上线后，也在那里分享它们。
4. 在你的学习日志中回答：渲染循环和按需渲染有什么区别？如果一个场景中绝对没有任何东西在移动，你会选择哪一种？

## 延伸阅读

- [three.js manual: How to update things](https://threejs.org/manual/#en/how-to-update-things)（英文）
- [three.js docs: `Timer`](https://threejs.org/docs/#examples/en/misc/Timer)（英文）
- [three.js docs: `OrbitControls`](https://threejs.org/docs/#examples/en/controls/OrbitControls)（英文）
- [MDN: Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)（英文）
- [MDN: Import maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap)（英文）

## 值得认识的女性

**苏姿丰（Lisa Su）**出生于台南，三岁时移居美国。职业生涯早期，作为一名半导体工程师，她曾参与把铜互连技术引入 IBM 的芯片。她自 2014 年 10 月起担任 AMD 首席执行官，自 2022 年起兼任董事会主席，并于 2021 年成为首位获得 IEEE Robert N. Noyce 奖章的女性。

本课渲染循环绘制的每一帧，都是由一块 GPU 绘制出来的，而她所领导的公司 AMD，正是全世界少数几家设计这类芯片的公司之一。你在本课中编写的 `renderer.setAnimationLoop` 回调，归根结底，是向像她这样的人所建造和领导的硬件发出的一次请求。

> **编者注：发布前请核实。** 「值得认识的女性」中的人物信息必须以一手资料核实，并在可行时于课程上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

**WebGL 2**，也就是本课渲染器默认使用的图形 API，是 Khronos Group 的标准，基于 OpenGL ES 3.0。**导入映射**——每一节 three.js 课程都依赖的 `<script type="importmap">` 代码块——是 WHATWG HTML 标准的一部分：它们让页面可以写像 `"three"` 这样简短的说明符，而不是一长串带版本号的 CDN 地址，并且每一个导入 `"three"` 的模块都会解析到完全相同的固定版本文件。three.js 本身和它的 `addons/` 文件夹都不是标准：它们是构建在这些标准之上的开源项目，这也是为什么 XR Camp 要固定它们的版本号。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
