# 第四阶段结业项目：沉浸式 Web 体验

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `immersive-developer` · **课时：** `immersive-web-experience-06` · **时长：** 约 22 小时 · 30 次学习，每次 45 分钟 · 每周 4 次，约 8 周

> **这是一节较长的课程（30 次学习）。** 一步一步来：每次学习仍然会以一个你亲手完成的成果结束，步骤之间休息一下也完全没问题。

---

> 发布一个完整的 XR 体验，无论有没有头显都能使用。

---

## 学习目标

完成本项目后，你将能够：

1. 把四个已经搭建好的 WebXR 子系统——VR 进入、输入、无障碍与伦理修复，以及空间音频——整合到一个可运行的页面中，做的是整合，而不是重写。
2. 从一次真实点击请求一个 `immersive-vr` 会话，在演示期间应用舒适度处理，并诚实地报告一个活动空间边界，包括没有任何边界被报告的情况。
3. 为每一种 XR 交互——选择、抓取、放置——都提供一个键盘可达的、屏幕上对等的方式，因此这里的任何内容都不需要拥有头显才能尝试。
4. 应用一项伦理修复：在请求权限之前先解释清楚一个使用传感器的功能是做什么的，并且绝不存储或显示它感知到的内容。
5. 把一段字幕锚定在观看者身上，而不是 3D 世界中的某个点上，无论是在一个平面页面中，还是在一个 VR 会话内部。
6. 从同一个共享的状态对象搭建出一段场景描述和一个 2D 对照版本，让两者永远不会互相脱节。
7. 在动手搭建之前先阅读一份任务说明和一份评分标准，并按照给定的矩阵进行测试：桌面端、手机、一个模拟器，以及如果有条件的话，一台头显。
8. 撰写发布说明，准确描述一个发布版本实际包含了什么，包括哪些内容没有经过测试。

## 先决条件

- **课程 4.1：WebXR 基础**到**课程 4.5：空间音频、媒体与临场感**（本结业项目的参考答案直接复用了 4.1、4.2、4.4 和 4.5 的思路，以起始代码中已完成的形式存在；4.3 中世界锁定和身体锁定的放置思路则被假定你已经掌握，本课不再单独演示）。
- 能够自如地阅读和扩展分布在多个文件中的现有 JavaScript 模块，而不是从零开始编写一个 3D 场景。
- 一个你能通过本地服务器运行的 three.js 项目，就像目前为止的每一节课一样。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 一个现代浏览器（Chrome、Firefox、Edge 或 Safari） | 运行展览及其 WebGL 2 画布。 | 免费 |
| 一个本地静态文件服务器（例如 `python3 -m http.server`，或 VS Code 的 Live Server） | 通过 `http://` 提供页面，ES 模块需要这个条件。 | 免费 |
| 一个代码编辑器（例如 VS Code） | 编辑 HTML、CSS 和 JavaScript。 | 免费 |
| 浏览器开发者工具（上面每种浏览器都自带） | 控制台，用于查看报错；设备模拟，用于测试矩阵。 | 免费 |
| 一个 WebXR 模拟器浏览器扩展（可选；例如「Immersive Web Emulator」） | 让你在没有头显的情况下测试 Enter VR。 | 免费 |
| 一台 VR 头显（可选） | 让你测试真实的 Enter VR 路径及其活动空间边界。 | 非必需 |

本课的任何地方都不使用付费账号、API 密钥，或在中国大陆被屏蔽的服务。

## 你将构建什么

第四阶段的结业项目：一个页面，整合了 4.1 到 4.5 所教的一切，延续的是自 web3d-developer/04-threejs-foundations 以来同一个 three.js 展览（一个陶罐、一个篮环，以及一块玉石）。Enter VR（4.1）会请求一个真实的会话，附带舒适度处理和活动空间边界报告。选择、抓取和放置一个标记（4.2）都能通过控制器、squeeze 手势，以及一个屏幕上、键盘可达的按钮来完成。4.4 中的无障碍和伦理修复继续有效：字幕锚定在观看者身上、完整的键盘路径，以及一个基于摄像头的「个性化」功能——它会在请求权限之前先解释清楚自己是做什么的。空间音频和字幕（4.5）为每个展台提供了自己的声音、一条字幕条，以及一份在任何人按下播放之前就已经完整的逐字稿。

参考答案在 [`completed/`](completed/) 中。它在 `starter/index.html` 和 `starter/js/main.js` 中一共有 8 个编号的 TODO——起始代码中的其他一切（`js/app.js`、`js/exhibit.js`、`js/describe.js`、`js/xr.js`、`js/interact.js`、`js/presenter.js`、`js/audio-captions.js`）都已经能正常工作，因为这个结业项目的重点是整合，而不是从零搭建一个 3D 场景。开始之前请先阅读 [`starter/brief.md`](starter/brief.md) 和 [`starter/rubric.md`](starter/rubric.md)。

之后，一旦「My XR Camp」（2.1-2.3）有了放置它的地方，这个结业展览就是一份学习日志或作品集条目会链接到的那种项目——把你的截图和 `CHANGELOG.md` 保存在你以后还能找到的地方。

## 文件夹说明

```text
06-immersive-web-experience/
├── README.md
├── ATTRIBUTION.md
├── starter/                 # 从这里开始：brief.md、rubric.md，以及 8 个编号的 TODO
│   ├── brief.md
│   ├── rubric.md
│   ├── index.html
│   ├── CHANGELOG.md
│   ├── styles.css
│   └── js/
├── completed/               # 参考答案
│   ├── index.html
│   ├── CHANGELOG.md
│   ├── styles.css
│   └── js/
├── challenges/          # 三个拓展挑战：基础挑战为必做
├── tests/                    # 自查清单
├── assets/                   # 三段展台声音和一份字幕文件，复用自 4.5
└── screenshots/
```

## 环境配置

1. 在编辑器中打开本文件夹。
2. 在仓库根目录启动一个本地服务器（例如 `python3 -m http.server 8766`），让页面通过 `http://` 提供，而不是以 `file://` 路径打开。
3. 通过那个服务器打开 `starter/index.html`。
4. 在写任何代码之前，完整阅读 [`starter/brief.md`](starter/brief.md) 和 [`starter/rubric.md`](starter/rubric.md)。
5. 确认起始代码已经能正常运行：三个展台和一个静止的虚拟形象会加载出来，展品列表中每个展品都有一个选择按钮，选择、暂停和重新加载都能正常工作。这就是 4.1-4.5 完成后的引擎；在你开始之前，这里的一切都没有损坏。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 阅读 `brief.md` 和 `rubric.md`；浏览 4.1、4.2、4.4 和 4.5 完成后的文件夹，了解本结业项目复用了什么。 | 清楚知道每个已完成文件各自负责什么工作。 |
| 2 | 搭建起始代码，确认引擎未经改动就能运行。 | 在浏览器中看到三个展台和一个虚拟形象加载出来，选择功能正常。 |
| 3 | 完整阅读 `js/xr.js`、`js/interact.js`、`js/presenter.js` 和 `js/audio-captions.js`。 | 笔记，记录每个文件各自负责什么，以便你做整合而不是重写。 |
| 4 | 第 3 步：添加 `#boundary-status` 标记（TODO 1）。 | Enter VR 下方出现一个空的、但已经存在的边界段落。 |
| 5 | 第 4 步：连接 `isVRSupported()` 和 `enterVR()`（TODO 2）。 | 一个可用的 Enter VR 按钮、它的支持情况提示，以及一份边界报告。 |
| 6 | 用 WebXR 模拟器测试 Enter VR 路径，或者在不支持的设备上阅读禁用按钮的提示文字。 | 证明这个按钮在两种情况下的表现都正确。 |
| 7 | 第 5 步：添加 `#place-marker` 按钮（TODO 3）。 | 控件部分出现一个可见的「放置标记」按钮。 |
| 8 | 第 6 步，第一部分：为每个展品的列表项扩展抓取和播放讲解按钮（TODO 4，第一部分）。 | 三个展品，每个都有三个按钮。 |
| 9 | 第 6 步，第二部分：连接抓取、播放和放置标记的点击事件（TODO 4，第二部分）。 | 抓取会转动一个展品；放置标记会添加一个标记；两者都会播报发生了什么。 |
| 10 | 纯键盘检查：用 Tab 键依次到达目前为止添加的每一个按钮，确认每一个都能正常工作。 | 证明每一个新控件都有完整的键盘路径（4.2）。 |
| 11 | 第 7 步：添加个性化部分的说明、同意按钮，以及结果段落（TODO 5）。 | 一个会自我说明的个性化部分，但按钮暂时还不能用。 |
| 12 | 第 8 步：把同意按钮的点击连接到 `requestPersonalize()`（TODO 6）。 | 一个只会在那次点击之后才请求摄像头的个性化按钮。 |
| 13 | 用三种方式测试个性化功能：允许它、拒绝它，以及（在浏览器开发者工具的 flag 中）模拟没有摄像头支持的情况。 | 三条诚实的结果信息，没有一个会导致崩溃。 |
| 14 | 第 9 步：添加字幕条和逐字稿标记（TODO 7）。 | 一个空的字幕条和一份空的逐字稿列表，两者都可见。 |
| 15 | 第 10 步，第一部分：从 `transcriptLines()` 构建逐字稿（TODO 8，第一部分）。 | 在任何讲解播放之前，全部三条字幕就已经列出。 |
| 16 | 第 10 步，第二部分：编写 `setCaption()`，并在播放讲解的分支中调用它（TODO 8，第二部分）。 | 按下「播放讲解」会更新字幕条，并播放对应的声音。 |
| 17 | 第 10 步，第三部分：在 VR 开始和结束时，挂载和分离字幕 HUD 网格（TODO 8，第三部分）。 | 字幕从页面移动到头显的视野中，再移动回来。 |
| 18 | 确认 `#scene-description` 对每一种状态都能正确更新：选择、抓取、标记，以及 VR 状态。 | 一段描述，永远不会说出页面上没有显示的内容。 |
| 19 | 一次减少动态效果的检查：确认当操作系统要求时，被抓取展品的转动会以暂停状态开始，并且暂停按钮始终说明它接下来会做什么。 | 减少动态效果在你浏览器的模拟环境中表现正确。 |
| 20 | 在 390 像素和 1280 像素宽度下测试；修复任何横向溢出。 | 一个在两种宽度下都能正常工作的页面。 |
| 21 | 测试无 WebGL 的后备路径（禁用 WebGL，或用开发者工具模拟它）。 | 确认展品列表和逐字稿依然携带每一项事实。 |
| 22 | 根据你实际测试过的内容，填写本 README 的测试矩阵（见下文）。 | 一份完成的、诚实的测试矩阵。 |
| 23 | 第 11 步：撰写 `CHANGELOG.md` 的 `1.0.0` 条目。 | 一份准确描述你的结业项目实际发布了什么的发布说明。 |
| 24 | 重新审阅你自己的代码和注释，关注意图，而不只是正确性。 | 解释「为什么」、而不只是「做了什么」的注释。 |
| 25 | 从头到尾完成 `tests/checklist.md`。 | 每一项都已勾选，或者对每一项未勾选的都做了修复。 |
| 26 | 对照你自己的成果，逐行检查 `starter/rubric.md` 的八行内容。 | 基础挑战（八个 TODO）完全完成。 |
| 27 | 选择创意或探索挑战，并开始动手。 | 你所选拓展的第一个可用版本。 |
| 28 | 完成你选择的挑战；如果你做了任何改动，更新 `CHANGELOG.md`。 | 拓展内容完成并有文档记录。 |
| 29 | 再做一次对页面上每一个控件的完整纯键盘检查。 | 确认每一种交互都能在没有鼠标的情况下到达和使用。 |
| 30 | 最终提交：截图、重新检查清单，并回答你的学习日志问题。 | 一个准备好提交的结业项目。 |

### 第 1 步：阅读任务说明和评分标准

打开 [`starter/brief.md`](starter/brief.md) 和 [`starter/rubric.md`](starter/rubric.md)。就像 web3d-developer/07 的结业项目一样，这一个也是从一份任务说明和一份评分标准开始的，而不是一张空白页——在写任何代码之前先阅读这两者，本身就是本课想要教会你的技能的一部分。

### 第 2 步：浏览起始代码已完成的引擎

打开 `starter/js/app.js`、`js/exhibit.js` 和 `js/describe.js`（展台、展品数据，以及场景描述构建器——自更早的课程以来一直未变），然后是 `js/xr.js`（4.1）、`js/interact.js`（4.2）、`js/presenter.js`（4.4），以及 `js/audio-captions.js`（4.5）。这七个文件全部都已完成。你在这个结业项目中的工作，只存在于 `starter/index.html` 和 `starter/js/main.js` 中。

### 第 3 步：边界状态标记（TODO 1）

在 `starter/index.html` 中，找到 Enter VR 部分内的 TODO 1，添加一个 `id="boundary-status"`、`class="scene-text"` 的段落，起始为空。`js/xr.js` 的 `enterVR()` 已经通过一个 `onBoundary` 回调报告了活动空间边界；第 4 步会把这份报告写入这里。

### 第 4 步：连接 Enter VR（TODO 2）

在 `starter/js/main.js` 中，找到 TODO 2。在加载时调用一次 `isVRSupported()`，来启用 Enter VR 按钮，或者在 `#vr-support-note` 中解释它为什么保持禁用。点击时，调用 `enterVR(app, { onStart, onEnd, onBoundary })`：`onStart` 会把 `state.xrActive` 设为 `true`，并调用 `updateDescription()`；`onBoundary` 会向 `#boundary-status` 写入一句平实的话，说明报告了多少个点，或者根本没有任何点被报告。把点击处理函数的主体包在 `try`/`catch` 中，因为 `requestSession()` 可能会被拒绝。

### 第 5 步：放置标记按钮（TODO 3）

在 `starter/index.html` 的控件部分，找到 TODO 3，添加一个 `id="place-marker"`、标签为「Place marker」的按钮——这是 4.2 中 AR hit-test 放置功能的 2D/键盘对等版本，供任何没有支持它的手机或头显的人使用。

### 第 6 步：抓取、播放讲解，以及把它们连接起来（TODO 4）

在 `starter/js/main.js` 中，找到出现在两处的 TODO 4：首先，在每个展品的列表项模板中（紧挨着已有的「选择」按钮），扩展一个抓取按钮（`data-grab`、`aria-pressed="false"`）和一个播放讲解按钮（`data-play`）。其次，在下面的点击处理函数中，添加一个调用 `setGrabbed(app, ...)` 的 `else if (btn.dataset.grab)` 分支，以及一个调用 `playNarration(sounds, ...)` 的 `else if (btn.dataset.play)` 分支。同时把第 5 步的放置标记按钮连接到 `placeMarker(app)`。

### 第 7 步：个性化部分的标记（TODO 5）

在 `starter/index.html` 中，找到 TODO 5，添加：一段准确说明这个功能对摄像头做什么、不做什么的段落；一个 `id="personalize-consent"` 的按钮；以及一个 `id="personalize-result"`、`role="status"` 的段落。这是 4.4 针对一个曾经未经询问就拍照的起始代码所做的修复——先解释，再询问，顺序不能颠倒。

### 第 8 步：连接个性化功能（TODO 6）

在 `starter/js/main.js` 中，找到 TODO 6。在第 7 步的按钮上添加一个点击监听器，调用 `await requestPersonalize()`，并根据访问是被允许、被拒绝、不受支持，还是因其他原因失败，向 `#personalize-result` 写入四条平实信息中的一条。`requestPersonalize()` 在检查完摄像头之后会立即停止它；除了这次点击之外，绝不要从其他任何地方调用它。

### 第 9 步：字幕条和逐字稿标记（TODO 7）

在 `starter/index.html` 中，找到 TODO 7，添加字幕条部分（一个视觉隐藏的标题，外加 `#caption-text`、`role="status"`）和逐字稿部分（一个标题，外加一份空的 `#transcript` 列表）。这是 4.5 的字幕，锚定在观看者身上，而不是世界中的某个点——正是 4.4 审查所要求的那处修复。

### 第 10 步：连接字幕和逐字稿（TODO 8）

在 `starter/js/main.js` 中，找到出现在三处的 TODO 8：从 `transcriptLines()` 构建逐字稿，让它在任何东西播放之前就已经完整；编写一个 `setCaption(text)` 辅助函数，更新 `#caption-text` 并调用 `captionHud.setText(text)`，从第 6 步的播放讲解分支中调用它；以及，在 `enterVR()` 的 `onStart`/`onEnd` 回调内部，把 `captionHud.mesh` 挂载到 `app.camera` 上并分离它，同时相应地隐藏和显示 `#caption-bar`。

### 第 11 步：测试矩阵

用你实际测试这个结业项目所依据的设备，填写下方「性能注意事项」表格：你的桌面浏览器、一部手机（即使没有 WebXR，也用来确认 2D 路径）、如果用过的话一个 WebXR 模拟器，以及如果有条件的话一台真实头显。在适用的地方诚实地写「未测试」——一个诚实的空白，比一个猜测对下一个人来说更有用。

### 第 12 步：发布说明和最后一次无障碍检查

撰写 `CHANGELOG.md` 的 `1.0.0` 条目：发布了什么，以及任何已知的局限性（例如，你无法测试的硬件）。然后大声朗读 `#scene-description` 的文字，确认每一个实时区域（`role="status"`）在每次变化时都只播报一次，并确认标题层级顺序没有被打破。结业项目正是四门更早的课程中，每一个无障碍习惯必须同时都成立的地方。

## 关键代码解析

- **`js/xr.js` 的 `enterVR()`** 只从一个真实的点击处理函数（一次用户激活）内部请求会话，因为 WebXR Device API 会悄悄拒绝以任何其他方式发起的 `requestSession()` 调用。它还会为了舒适度禁用 `OrbitControls`：一旦头显接管了相机，一次鼠标拖动视角就会和它冲突。
- **`js/interact.js` 的控制器射线和 squeeze 事件**是进入 `selectExhibit()` 和 `setGrabbed()` 的一条路径——和屏幕上「选择」及「抓取」按钮调用的是同一批函数。这两条路径谁都不是对方的后备方案；它们是通往同一个状态的两条同样真实的路径。
- **`js/presenter.js` 的 `requestPersonalize()`** 只从一次明确的点击中调用 `getUserMedia()`，并在权限提示得到响应之后立即停止每一个轨道。它从不渲染预览画面，因为这个演示只需要知道访问是否被授予，而不需要知道摄像头看到了什么。
- **`js/audio-captions.js` 的 `createCaptionHud()`** 把字幕绘制到一个由 `<canvas>` 支撑的 `CanvasTexture` 上，画在一个作为相机（而不是场景）子级添加的平面上——因此无论观看者如何转动头部，它始终停留在观看者视野中同一个位置、正前方。
- **`buildSceneDescription()`** 读取的是每个按钮处理函数已经在更新的同一组 `app` 和 `state` 对象，因此这段描述永远不可能描述一个并非当前实际状态的选择、抓取，或 VR 会话。
- **八个编号的 TODO 全部都在 `index.html` 和 `main.js` 中**，从不出现在 `app.js`、`xr.js`、`interact.js`、`presenter.js` 或 `audio-captions.js` 中。整合已经能工作的代码，是比每次从零开始更贴近现实的一项技能。

## 3D 与 XR 无障碍

这个结业项目自始至终都是 3D 的，延续着 4.1-4.5 的展览，因此它的无障碍工作不是一个 2D 页面里的一瞬间——而是整个页面。下面的每一项要求，都已经在更早的 Immersive Developer 课程中教过；本结业项目的任务，是确保当所有子系统被组合在一起之后，它们依然全部成立。

- 场景描述会针对选择、抓取、标记放置，以及 VR/边界状态更新（`js/describe.js`）。
- 展品列表和逐字稿携带的信息，和 3D 视图与字幕条一致，因此没有任何事实只存在于画布内部。
- 每一种交互都有一条键盘路径：选择、抓取、播放讲解、放置标记、暂停、重新加载、Enter VR，以及个性化，没有一个需要指针或控制器。
- 减少动态效果得到了尊重：当操作系统要求时，被抓取展品的转动会以暂停状态开始，暂停按钮也始终说明它接下来会做什么。
- 字幕锚定在观看者身上（在屏幕上是一个 DOM 字幕条，在 VR 中是一个挂载在相机上的 HUD 平面），从不锚定在 3D 世界中的一个固定点上。
- 相机绝不会自行移动；只有学习者的拖动，或头显自身的追踪，才能移动它。
- 个性化功能在请求摄像头访问之前会先自我说明，并且绝不存储或显示摄像头看到的内容。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| `#status`、`#boundary-status`、`#caption-text` 和 `#personalize-result` 在播报变化时使用 `role="status"` | 4.1.3（状态信息） | 屏幕阅读器用户能听到刚刚发生了什么，不需要移动焦点去查找。 |
| 每个按钮的无障碍名称都以它可见的文字开头（「Select: Jade stone」） | 2.5.3（名称中包含标签） | 语音控制或屏幕阅读器用户能凭他们看到的文字激活一个按钮。 |
| 个性化功能在请求摄像头访问之前先征求同意，并先解释自己要做什么 | 良好实践（XR 无障碍用户需求：知情同意） | 一位访客绝不应该对一个使用传感器的功能对其摄像头做了什么感到意外。 |
| 每个控件的焦点都是可见的 | 2.4.7（焦点可见） | 本项目的 `:focus-visible` 轮廓必须在每一个按钮上显示，无论新旧。 |
| 减少动态效果会停止被抓取展品的转动 | 2.2.2（暂停、停止、隐藏） | 当操作系统要求减少动态效果时，展品自身的动画会以暂停状态开始，正如 4.4 修复的那样。 |
| 每一个用 `list-style: none` 设置样式的列表都保留 `role="list"` | 良好实践（否则 Safari 会丢失列表语义） | 展品列表和逐字稿都会继续被播报为列表。 |

## 性能注意事项

这个结业项目的测试矩阵，根据这份参考答案实际测试过的内容填写：

| 测试目标 | 是否测试过？ | 结果 |
| --- | --- | --- |
| 桌面浏览器（Chrome，集成显卡） | 是 | 以 60 fps 运行；控制台无报错；在没有头显的情况下，Enter VR 正确报告「不支持」。 |
| 桌面浏览器，无 WebGL 2（模拟） | 是 | 展品列表和逐字稿依然完全可读；3D 面板及其控件干净地隐藏起来。 |
| 手机浏览器（无 WebXR） | 是 | 2D 路径（选择、抓取、播放讲解、放置标记、个性化）通过触摸完全可用。 |
| WebXR 模拟器扩展 | 本次发布未测试 | 参见 `CHANGELOG.md` 的已知局限性。 |
| 真实 VR 头显 | 本次发布未测试 | 参见 `CHANGELOG.md` 的已知局限性。 |

完成第 11 步之后，请用你自己的测试结果替换这张表——一个诚实的「未测试」，比对你没有的硬件做出的猜测更有用。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 在一个 Promise 链中调用 `requestSession()`，而不是直接在点击处理函数内部调用 | 浏览器会悄悄拒绝它，不给出任何有用的报错 | 把 `enterVR()` 作为点击处理函数主体的第一行调用 |
| 只在点击处理函数的 `if (btn.dataset.select)` 分支内部连接抓取和播放讲解 | 即使按钮存在，抓取和播放讲解也永远不会起作用 | 为 `btn.dataset.grab` 和 `btn.dataset.play` 添加各自独立的 `else if` 分支 |
| 在页面加载时就调用 `requestPersonalize()`，「为了提前检查支持情况」 | 浏览器会在访客读到这个功能是做什么之前，就弹出摄像头访问提示 | 只从同意按钮的点击处理函数中调用它，每次点击恰好一次 |
| 把字幕 HUD 网格加入场景，而不是相机 | 字幕会固定在 3D 世界中，最终可能停留在访客的身后 | 使用 `app.camera.add(captionHud.mesh)`，而不是 `app.scene.add(...)` |
| 凭记忆填写测试矩阵，而不是真正测试每一行 | README 声称覆盖了实际上没有人检查过的内容 | 测试每一行，或者像本课自己的表格那样，诚实地标注「未测试」 |

## 故障排查

**即使在我确定支持 WebXR 的设备上，Enter VR 依然保持禁用。** 在除 `localhost` 或 `127.0.0.1` 之外的 `http://` 来源上，`isVRSupported()` 可能会解析为 `false`——有些浏览器要求安全上下文。确认你使用的正是任务说明中指定的那个地址来提供服务。

**点击抓取没有任何反应。** 检查 TODO 4 的点击处理函数分支是否被添加为一个**独立**的 `else if`，而不是附加在已有的 `if (btn.dataset.select)` 块内部——这是一个常见的复制粘贴错误。

**字幕在 VR 中从不出现，只出现在页面上。** 确认 TODO 8 的 `onStart` 回调是否调用了 `app.camera.add(captionHud.mesh)`——没有它，`setText()` 更新的是一个场景中没有任何东西在显示的贴图。

**Firefox：** WebXR 支持因构建版本而异；如果 `isVRSupported()` 出乎意料地解析为 `false`，检查 `about:config` 中的 `dom.vr.webxr.enabled`。

**Safari：** 在大多数平台上尚不支持 WebXR Device API；`#vr-support-note` 会正确地说明这一点，其他每一个控件依然能正常工作。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：完成八个编号的 TODO，让全部四个被整合的子系统协同工作。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：用来自你自己文化、社区或语言的东西，替换掉一件展品。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：搭建一个真正的 `immersive-ar` hit-test 会话，同时保留 2D 的「放置标记」按钮作为它的对等方式。

## 提交作业

1. 从头到尾完成 [`tests/checklist.md`](tests/checklist.md)，包括「3D 与 XR（人工）」部分。
2. 拍两到三张截图：展览中某个展品被选中并握持的样子，以及 Enter VR 面板显示它的支持情况提示或边界报告。
3. 把它们保存在你的学习日志和作品集中。也可以和其他开发者分享：参见[在哪里分享你的作品和寻求帮助](../../docs/en/community.md)（英文）。
4. 学习日志问题：在这四节被整合的课程（4.1、4.2、4.4、4.5）中，哪一个需要你格外小心才能正确接通？过程中差一点出了什么问题？

## 延伸阅读

- [MDN: WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)（英文）
- [W3C: WebXR Hit Test Module](https://www.w3.org/TR/webxr-hit-test-1/)（英文）
- [W3C: XR Accessibility User Requirements (XAUR)](https://www.w3.org/TR/xaur/)（英文）
- [MDN: ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)（英文）
- [Keep a Changelog](https://keepachangelog.com/)（英文）

## 值得认识的女性

Ayşegül Yönet 是一位 W3C 受邀专家，也是 W3C Immersive Web Working Group 的联合主席之一（与 Ada Rose Cannon 和 Chris Wilson 共同担任），这个工作组正是开发本结业项目所依托的 WebXR Device API 的团队——`js/xr.js` 使用的正是同一个 `navigator.xr.requestSession()` 调用。她曾在微软担任高级云开发者布道师，专注于空间计算和 WebXR，是 Web 技术领域的 Google 开发者专家，共同主持旧金山 WebXR 聚会，并教授 Frontend Masters 的课程「3D on the Web & WebXR」。

一个把 Enter VR、控制器输入和 hit-test 放置整合到一个页面中的结业项目，完全依赖于 WebXR Device API 始终是一个稳定的、跨浏览器的标准，而不是一堆互不兼容的厂商专属 API——这正是 Yönet 所在工作组所做的工作。在使用一个 API 之前先阅读它的规范——就像 `js/xr.js` 的注释回指 WebXR Device API 自身关于用户激活的规则那样——是一个微小的日常习惯，让这类标准工作保持可见。

> **编者注：发布前请核实。** 「值得认识的女性」中的人物信息必须以一手资料核实，并在可行时于课程上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

本结业项目整合的每一个子系统，都建立在同一份 W3C 标准之上：WebXR Device API（`navigator.xr`），由 Immersive Web Working Group 开发，并由 WebXR Hit Test 和 Augmented Reality 模块对其进行扩展，以支持表面放置。该工作组将这些和其他 WebXR 模块——包括 Hand Input 和 Depth Sensing 模块——作为推荐标准轨道上的工作草案发布。一个在手机、头显和普通屏幕上「就是能用」的结业项目，其背后悄悄依赖的，正是这同一份 API 在它运行的每一个地方都保持一致。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
