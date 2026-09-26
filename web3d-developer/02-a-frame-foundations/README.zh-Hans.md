# A-Frame 基础

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `web3d-developer` · **课时：** `a-frame-foundations-02` · **时长：** 约 12 小时 · 16 次学习，每次 45 分钟 · 每周 4 次，约 4 周

---

> 搭建一个基于浏览器的 3D「Hello World」环境。

---

## 学习目标

完成本项目后，你将能够：

1. 解释 A-Frame 的**实体－组件系统（entity-component system）**：每个物体都是一个**实体（entity）**（一个 `<a-entity>`），它能做什么、显示什么，完全来自附加在它身上的**组件（components）**，每个组件都有自己的**属性（properties）**。
2. 使用**基本元素标签（primitives）**（`<a-box>`、`<a-plane>`、`<a-sky>`、`<a-text>` 等）作为快捷方式，为你一次性设置好多个组件。
3. 用 `<a-assets>` **预加载**图片和音频，并选择一个合理的 `timeout`。
4. 用 `material` 组件给一个基本元素标签应用**图片贴图（image texture）**。
5. 用 `text` 组件显示**文字**，并准确说明它默认字体能显示和不能显示哪些字符。
6. 为默认字体无法显示的语言绘制一张**基于 canvas 的文字贴图**，并解释什么时候该用它。
7. 添加**音频**，它绝不会自行播放，而是配有一个可见的、带标签的控件来启动和停止它。
8. 解释 **`<a-video>`** 的工作原理，即使没有视频文件也能说明白。
9. 为场景打光，添加一个**天空（sky）**和一个**地面（floor）**。
10. 用 `look-controls` 设置一个**相机**，刻意关闭 `wasd-controls`，并从舒适度的角度解释为什么这样做。
11. 解释 **WebXR「进入 VR」按钮**什么时候会出现，并用一个免费的模拟器进行测试。
12. 构建一个始终存在的 **2D 后备方案（fallback）**和一条**无 WebGL 提示信息**，让房间的信息不会只存在于画面之中。

## 先决条件

- **Web3D 基础（3.1）**，尤其是场景图、相机、灯光和材质，以及你在 `analysis.md` 中为虚拟展览选择 A-Frame 的那部分。
- **我的 XR Camp**，阶段 2 自己的那个小应用（课程地图、仪表盘、学习计划器）：同一种「跨越多节课搭建同一个东西」的模式在这里延续下去，只不过换成了虚拟展览。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 支持 WebGL 的现代浏览器 | 房间及其 2D 控件 | 免费 |
| VS Code 和本地服务器 | A-Frame 的资源需要 `http://`，而不是 `file://` | 免费 |
| [Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik)（一个免费的浏览器扩展）（英文） | 在没有头显设备的情况下体验 VR 模式 | 免费 |

A-Frame 从 `aframe.io` 加载，它的默认字体则**每次场景启动时**都单独从 `cdn.aframe.io` 加载。如果其中任何一个在你所在的地区较慢或被屏蔽（在中国大陆会出现这种情况），房间本身依然会加载，但它的英文和西班牙文文字面板要等字体到达之后才会出现，如果字体一直无法到达，它们就完全不会出现。本课中的中文面板没有这个问题，因为它是画在 `<canvas>` 上的：这也是值得学习「用 canvas 绘制文字」这项技能的另一个理由。

## 你将构建什么

虚拟展览的**第一个房间**：一个完全由 A-Frame 基本元素标签搭建的 3D「Hello World」环境。第 3.1 课 `analysis.md` 中的学习者安娜（Ana）正是出于这个原因选择了「先用 A-Frame，再用 three.js」：A-Frame 让她能用已经熟悉的 HTML，快速搭建出这样一个房间。

这个房间有天空、地面、一个展台、三块分别用英文、西班牙文和中文写成的欢迎面板，以及一个声音标记，带有一段只有在被要求时才会播放的舒缓循环音乐。它旁边有一个 2D 面板，用文字列出房间里的一切，并为每一个点位提供一个「查看（Look at）」按钮，这样整个房间无需触碰 3D 视图也能被完全访问。

参考答案在 [`completed/`](completed/) 中。起始代码包含页面、样式和控件；你需要编写房间本身以及把它们连接起来的逻辑：十五个 TODO，分布在 `index.html`（实体）和 `main.js`（交互）中。

## 文件夹说明

```text
02-a-frame-foundations/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html        # The room: TODOs 1–9
│   ├── main.js            # The interaction: TODOs 10–15
│   └── styles.css         # Finished
├── completed/            # Reference solution: open this last
├── challenges/            # Three challenges: Foundation is required
├── tests/checklist.md     # Self-review before you submit
├── assets/                # The woven-pattern texture and the calm-loop audio
└── screenshots/
```

## 环境配置

1. 在你的 `virtual-exhibit` 文件夹（在第 3.1 课中创建）里，新建一个 `02-a-frame-foundations` 子文件夹，把本课的起始文件——`index.html`、`main.js` 和 `styles.css`——添加进去，并放入本项目 `assets/` 的一份拷贝。
2. 启动本地服务器，打开 `index.html`。在你完成 TODO 1–3 之前，房间的天空和地面都会缺失：这是正常的。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 环境配置；第 1 步：实体、组件与基本元素标签（概念） | 能说出每个 A-Frame 标签背后的三个概念 |
| 2 | 第 2 步：用 `<a-assets>` 预加载（TODO 1） | 在场景需要资源之前，资源已经就绪 |
| 3 | 第 3 步：天空、灯光与地面（TODO 2） | 一个有地面和光照的房间 |
| 4 | 第 4 步：地面的贴图，以及带贴图的基本元素标签（TODO 3–4） | 你的第一个图片贴图，只用一个标签实现 |
| 5 | 第 5 步：英文和西班牙文的文字面板（TODO 5–6） | 两块欢迎面板，两种语言 |
| 6 | 第 6 步：多语言文字，默认字体无法显示的内容 | 你清楚地知道默认字体会丢掉哪些字符 |
| 7 | 第 6 步（续）：canvas 绘制的文字贴图（TODO 7、11） | 一块真正能显示出来的中文欢迎面板 |
| 8 | 第 7 步：绝不自动播放的音频（TODO 8） | 一个声音标记，在被要求之前保持静默 |
| 9 | 第 7 步（续）：播放声音按钮（TODO 14） | 一个可用的、无障碍的声音开关 |
| 10 | 第 8 步：视频，可选步骤 | 你知道以后该如何添加自己的视频片段 |
| 11 | 第 9 步：相机，以及一条舒适度提示（TODO 9） | 你可以环顾房间四周 |
| 12 | 第 10 步：把房间变成数据（TODO 10） | `exhibitData` 驱动着列表和按钮 |
| 13 | 第 10 步（续）：列表与按钮（TODO 12） | 房间的一个无障碍的 2D 版本 |
| 14 | 第 11 步：进入 3D 的键盘路径（TODO 13） | 每个点位都能用键盘到达，在「减少动态效果」下会瞬间完成 |
| 15 | 第 12 步：XR 模式，以及无 WebGL 的情况（TODO 15） | 用 Immersive Web Emulator 测试过；WebGL 缺失时会显示提示信息 |
| 16 | [`tests/checklist.md`](tests/checklist.md)；一个拓展挑战；**提交作业** | 展览的第一个房间，完成 |

### 第 1 步：实体、组件与基本元素标签

A-Frame 场景中的一切都是一个**实体（entity）**：一个 `<a-entity>`，本身什么都不是。一个实体能做什么、显示什么，完全来自它的**组件（components）**，每个组件都有自己的**属性（properties）**，写法是 `component="property: value; property: value"`：

```html
<a-entity geometry="primitive: box; width: 1; height: 1; depth: 1"
          material="color: #5b2a86"
          position="0 0.5 -2"></a-entity>
```

这和下面这个实体完全等价：

```html
<a-box color="#5b2a86" position="0 0.5 -2"></a-box>
```

`<a-box>` 是一个**基本元素标签（primitive）**：一个快捷标签，替你设置好 `geometry` 和 `material` 组件，并给出合理的默认值。`<a-sky>`、`<a-plane>`、`<a-text>`、`<a-camera>` 和 `<a-sound>` 也是同样的道理。基本元素标签并不是与实体和组件不同的另一套技术：它们是同一个系统，只是写法更简洁。本课中两者你都会用到：用基本元素标签搭建房间里的简单形状，用带有明确组件的 `<a-entity>` 搭建 A-Frame 没有对应基本元素标签的两块面板（声音标记，以及使用 canvas 贴图的中文面板）。

### 第 2 步：用 `<a-assets>` 预加载（TODO 1）

`<a-assets>` 也是一个基本元素标签：一个用来通过 `id` 一次性声明图片、音频和视频的地方，这样 A-Frame 就能在场景需要它们**之前**把它们加载好，而不是让贴图在画到一半时才突然出现，或者让声音延迟开始：

```html
<a-assets timeout="10000">
  <img id="woven" src="../assets/woven-pattern.png">
  <audio id="calm-loop" src="../assets/calm-loop.wav"></audio>
</a-assets>
```

场景中的其他任何地方都可以引用 `#woven` 或 `#calm-loop`，而不用再写一遍文件路径。`timeout` 是 A-Frame 在放弃等待、无论如何都显示场景之前，愿意为每个资源等待多久（默认是 3 秒）：在网速较慢的情况下，3 秒往往不够，所以本课把它设为 10 秒。

### 第 3 步：天空、灯光与地面（TODO 2）

`<a-sky>` 是包裹整个场景的一个巨大球体，从内侧上色（或贴图）。对于第一个房间来说，一个单一的浅色就足够了。用第 3.1 课中同样的两种光源来打光：一个**环境光**，让阴影面不至于纯黑；一个**平行光**，让表面显示出形状。

### 第 4 步：地面和展台上的贴图（TODO 3–4）

`material` 组件的 `src` 属性接受一个资源引用，把它当作贴图使用，思路和材质的颜色一样，只是数据来自一张图片，而不是一个单一的数值：

```html
<a-plane rotation="-90 0 0" width="6" height="6" material="src: #woven; repeat: 4 4"></a-plane>
```

`repeat: 4 4` 把这张图片横向平铺 4 次、纵向平铺 4 次，这样一张小而简单的贴图（本课这张是 512 × 512 像素，只有几 KB）就能铺满一大块地面，而不会显得被拉伸。TODO 4 中的展台在一个 `<a-box>` 上使用了同样的贴图，由于尺寸较小，不需要 `repeat`。

这张贴图本身，`assets/woven-pattern.png`，是一个为 XR Camp 制作的小型 SVG 图案，通过无头浏览器截图转换成 PNG（参见 [`ATTRIBUTION.md`](ATTRIBUTION.md)）。你用作贴图的任何图片，都必须遵守 [`docs/en/3d-assets-and-versions.md`](../../docs/en/3d-assets-and-versions.md)（英文）中 1 MB 的预算：这一张大约只有 2.5 KB。

### 第 5 步：英文和西班牙文的文字面板（TODO 5–6）

`<a-text>` 是建立在 `text` 组件之上的基本元素标签：

```html
<a-text value="Welcome to the exhibit" align="center" width="2.4" color="#3f1d5e"></a-text>
```

`width` 控制的是文字渲染出来的大小（以及在哪里换行），而不是围住文字的一个方框。先写好英文面板，暂时只用普通字母写西班牙文面板：下一步会解释原因。

### 第 6 步：多语言文字：默认字体能显示什么、不能显示什么

**A-Frame 的 `text` 组件使用一份内置的字体图集（font atlas）**绘制文字（Roboto，MSDF 格式，在运行时从 `cdn.aframe.io` 加载）：一张贴图，里面只包含固定的一小部分字形，这样是为了让这张贴图保持较小的体积。本课直接对它进行了测试：在一个真实的 A-Frame 场景中渲染出字符串，再逐像素读取结果：

| 字符 | 能显示吗？ |
| --- | --- |
| 普通拉丁字母（`a`–`z`、`A`–`Z`）、数字、基本标点 | 能 |
| 西班牙文带重音的元音字母：`á é í ó ú Á É Í Ó Ú` | **不能。**每一个都会被悄无声息地丢弃：这个字母直接消失，没有方框，也没有占位符。 |
| `ñ Ñ ü Ü ¿ ¡` | **不能，**以同样的方式被丢弃。 |
| 中文汉字（例如「你好」） | **不能。**整段 CJK 字符都会被丢弃。 |

这意味着像「sesión」这样的西班牙文标签会渲染成「sesin」，「diseño」会渲染成「diseo」——这比单纯显示不出来更糟糕，因为它看起来像是打字错误，而不是一个缺失的功能。**绝不要把带重音符号或「ñ」的西班牙文文字直接写进 `<a-text value="...">`。**要么避开这些字符（就像本课的西班牙文面板刻意做的那样），要么像下一步处理中文一样，把它画成一张贴图。

### 第 6 步（续）：canvas 绘制的文字贴图（TODO 7、11）

`<canvas>` 没有这样的限制：`CanvasRenderingContext2D.fillText()` 使用的是浏览器自身的字体引擎，也就是绘制每一个网页所用的那一个，因此它可以绘制操作系统装有对应字体的任何语言，包括中文，以及带有任何重音符号的西班牙文。TODO 11 用这种方式绘制中文标签：

```js
const canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 256;
const ctx = canvas.getContext('2d');
ctx.font = '600 72px "PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif';
ctx.fillText('欢迎光临', canvas.width / 2, canvas.height / 2);
```

然后它会变成一张贴图，应用到一个普通实体的材质上，方式和使用图片贴图一样：

```js
const texture = new AFRAME.THREE.CanvasTexture(canvas);
entity.getObject3D('mesh').material.map = texture;
```

本课用测试默认字体同样的方式验证了这个结果：在真实浏览器中渲染出这块完成的面板，再把它读回来检查。结果显示正确。使用 canvas 贴图还能完全绕开对 `cdn.aframe.io` 的依赖，因为它使用的是设备上已经安装好的字体，而不需要下载任何东西：这是它在这里成为正确工具的另一个理由，而不仅仅是因为它能绘制哪些字符。

### 第 7 步：绝不自动播放的音频（TODO 8），以及播放声音按钮（TODO 14）

`sound` 组件负责播放附加在一个实体上的音频：

```html
<a-entity sound="src: #calm-loop; autoplay: false; loop: true; volume: 0.7"></a-entity>
```

**`autoplay` 必须始终保持 `false`。**未经请求就开始播放的声音是一项 WCAG 违规（1.4.2，音频控制），而且可能会让人受到惊吓，对使用屏幕阅读器的人来说尤其如此，因为它会和屏幕阅读器自身的语音互相干扰。TODO 14 提供了唯一能启动它的方式：一个真正的 `<button>`，用 `aria-pressed` 反映它是否正在播放，这样屏幕阅读器会朗读「已按下」或「未按下」，标签也始终与实际状态一致。

这段循环音乐本身（`assets/calm-loop.wav`）是生成出来的，而不是录制的：一段简短、轻柔的双音色垫音，用 Python 的 `wave` 和 `numpy` 制作，做了淡入淡出处理以避免循环时出现爆音，采用单声道、22 050 Hz 采样率以保持文件体积小巧（约 345 KB，远低于 2 MB 的音频预算）。

### 第 8 步：视频，可选步骤

A-Frame 的视频基本元素标签是 `<a-video>`，它的工作方式和第 4 步中的图片贴图完全一样，只不过来源是 `<a-assets>` 中的一个 `<video>` 元素：

```html
<a-assets>
  <video id="my-clip" src="my-clip.mp4" muted playsinline></video>
</a-assets>
<a-video src="#my-clip" width="1.6" height="0.9" position="0 1.2 -2"></a-video>
```

这个房间**没有附带任何视频文件**，所以不存在会在你的机器上损坏的东西。等你有了自己的一小段视频片段，[挑战 3](challenges/challenge-3.zh-Hans.md) 会带你一步步添加它，包括在 2D 后备方案中用 `<track kind="captions">` 添加字幕，因为 `<a-video>` 本身并不支持字幕：视频的 2D 版本才是字幕应该出现的地方。

### 第 9 步：相机，以及一条舒适度提示（TODO 9）

```html
<a-camera position="0 1.6 1.6" look-controls wasd-controls="enabled: false"></a-camera>
```

`look-controls` 让学习者可以用鼠标、手指，或者头显自身的追踪功能环顾四周。`wasd-controls` 是 A-Frame 内置的、用键盘在场景中走动的组件，这个房间刻意把它关闭了。

**舒适度提示：**当视角在场景中移动，而身体保持静止时，可能会引发**视动性眩晕（vection）**——眼睛看到的和内耳感受到的不一致，这是 VR 晕动症的常见原因之一。一个学习者只会转身环顾、从不在其中行走的房间，完全不会引发这个问题。阶段 3 后面的课程会在有必要的时候，谨慎地引入移动；这第一个房间还不需要它。

### 第 10 步：把房间变成数据（TODO 10），列表与按钮（TODO 12）

一个数组，`exhibitData`，描述了房间里的每一个点位：它的 `id`、一段简短的 `label`，以及一段 `description`。2D 列表和「查看」按钮都是从这同一个数组生成的，所以它们永远不会像分别手写的 HTML 那样彼此脱节。

### 第 11 步：进入 3D 的键盘路径（TODO 13）

一个只能靠拖动鼠标来交互的 3D 视图，根本没有任何键盘路径。这个房间的路径就是「查看」按钮：真正的 `<button>` 元素，可以用 Tab 键到达，用回车键或空格键激活，和网页上任何其他按钮完全一样。

用代码转动相机是本课真正棘手的部分：直接设置一个实体的 `rotation` 属性不起作用，因为 `look-controls` 每一帧都会根据它自己内部的 `yawObject` 和 `pitchObject` 重新计算相机的旋转，用来追踪鼠标或头显。TODO 13 转而写入这两个对象，用 `THREE.Matrix4().lookAt()` 和 `THREE.Euler().setFromRotationMatrix(matrix, 'YXZ')` 计算，这和 `look-controls` 本身处理鼠标移动的方式完全一样，只是这次目标是指向某个物体。

**当学习者要求减少动态效果时**，转动会在一帧之内瞬间完成：这里的一切都不是装饰性的，所以也就不需要任何动画。否则，转动会平滑地进行大约三分之一秒，这样房间的布局始终容易理解，而不会突然跳变。

### 第 12 步：XR 模式，以及无 WebGL 的情况（TODO 15）

A-Frame 会自动为场景添加一个「进入 VR」按钮，但**仅当浏览器报告 WebXR 可用时**：在没有连接头显的手机或笔记本电脑上，它根本不会出现，页面的其他部分也无需为此做任何改动。用免费的 [Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik)（英文）浏览器扩展来测试它，它能在任何 WebXR 页面上添加一个虚拟头显和控制器，而无需真实硬件。

在另一端，有些浏览器完全没有 WebGL。TODO 15 直接对此进行检测，如果缺失，就隐藏 3D 方框，显示一条简单的提示信息，而上方的 2D 列表依然和之前一样正常工作：这个房间的信息完全不依赖 3D 是否成功运行。

## 关键代码解析

**`<a-assets timeout="10000">`** 会为每个声明的资源最多等待 10 秒，然后无论如何都会显示场景；默认值是 3 秒。

**`material="src: #woven; repeat: 4 4"`** 把一个资源作为贴图应用，并在每个方向上平铺 4 次。

**`AFRAME.THREE`** 是一个普通的 `<script>`（而不是模块）访问 A-Frame 自带的确切 three.js 版本的方式，无需再添加第二个导入映射。

**`entity.getObject3D('mesh')`** 返回一个基本元素标签或 `geometry` + `material` 实体底层的 three.js `Mesh`，canvas 贴图正是附加到这个对象上的。

**`lookControls.yawObject.rotation.y` 与 `.pitchObject.rotation.x`** 是 `look-controls` 每一帧真正读取的两个旋转值；直接设置一个实体的 `rotation` 属性，会在下一帧被覆盖。

**`marker.components.sound.playSound()` / `.stopSound()`** 从代码中启动和停止一个 `sound` 组件，效果和「播放」按钮完全一样。

## 3D 与 XR 无障碍

整节课都是关于 3D 的，所以它的无障碍性是内建的，而不是一个单独的环节：

- 房间有一份**场景描述**，以及一个始终存在的 2D 列表，它和「查看」按钮基于同一份数据构建。
- 每一个 3D 交互（查看某个点位、播放声音）都对应一个真正的、带标签的 `<button>`。
- **除非学习者主动要求，否则没有任何东西会移动。**相机永远不会自己走动，在「减少动态效果」下，「查看」会瞬间完成。
- **声音绝不会自行播放**，它的按钮始终用 `aria-pressed` 显示当前状态。
- **一条无 WebGL 提示信息**让房间的信息在 3D 视图无法运行时依然可用。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 房间有一段文字描述，以及一份完整的 2D 内容列表 | 1.1.1, 1.3.1 | 画面所承载的信息，文字中始终也有，而不仅仅在 3D 失败时才有。 |
| 每一个 3D 交互都有一个真正的、带标签的按钮 | 2.1.1, 4.1.2 | 键盘能到达鼠标能到达的一切地方。 |
| 「查看」按钮用 `aria-pressed` 显示哪个点位处于激活状态 | 4.1.2 | 屏幕阅读器会朗读当前状态，而不只是标签文字。 |
| 声音绝不自动播放，其按钮会显示状态 | 1.4.2, 4.1.2 | 不会有任何东西未经邀请就开始盖过屏幕阅读器说话。 |
| 除非学习者主动移动，相机绝不移动；在「减少动态效果」下「查看」瞬间完成 | 2.2.2, 2.3.3 | 没有需要停止的动效，也不会引起晕动症。 |
| 页面在手机上不会出现横向滚动 | 1.4.10 | 在窄屏幕上，房间会显示在控件的上方。 |

## 性能注意事项

这张编织图案贴图大约 2.5 KB，舒缓循环音频大约 345 KB：两者都足够小，第 3.1 课「下载成本」的教训在这里几乎用不上，而这正是使用小型自制素材、而不是找来的照片或录制音频的意义所在。即使文件很小，`<a-assets>` 依然重要：没有它，地面的贴图可能会在地面本身出现之后一两帧才突然冒出来。

canvas 绘制的中文标签只需要一个小小的 `<canvas>` 元素和一次贴图上传，只在场景加载完成时创建一次，而不是每一帧都创建：像本课代码那样，绘制一次并重复使用这份贴图。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 在 `<a-text value="...">` 中写带重音的西班牙文或中文 | 这些字符会悄无声息地消失 | 改用 canvas 贴图绘制它们 |
| `sound="autoplay: true"` | 声音未经请求就开始播放（违反 WCAG 1.4.2） | 始终使用 `autoplay: false`，配合一个按钮 |
| 设置实体的 `rotation` 来「查看」某个物体 | 下一帧就会弹回原状 | 改为写入 `look-controls` 的 `yawObject`/`pitchObject` |
| 忘记设置 `wasd-controls="enabled: false"` | 键盘会在不知不觉中让相机在房间里走动 | 在房间没有理由被「走过」时把它关闭 |
| 一个没有 `<a-assets>` 条目的贴图 | 它可能在形状已经出现之后才突然冒出来 | 预先加载它，并给它一个 id |
| 假定 `cdn.aframe.io` 总能加载成功 | 在该 CDN 较慢或被屏蔽的地方，文字面板会是空白的 | 对于必须始终显示的文字，优先使用 canvas 贴图 |

## 故障排查

**房间是空白的，但天空显示出来了。** 很可能是 TODO 3–4（地面和展台）还没完成，或者它们 `material="src: ..."` 引用的资源 id 和 `<a-assets>` 中的不一致。

**英文或西班牙文文字有时完全不显示，只在某些网络下如此。** 承载默认字体的 `cdn.aframe.io` 在那里较慢或被屏蔽。在某些网络条件下这是预期行为；参见上文的「所需工具」。

**中文面板是一块纯白或灰色的矩形。** `applyLabelTexture` 在场景的实体存在之前就运行了。请等待场景的 `loaded` 事件，就像起始代码的 `init()` 已经做的那样。

**「查看」转动了视角一次，之后又漂移或弹回原状。** 有什么地方（可能是之前的某次尝试）仍在直接写入实体的 `rotation` 属性，而不是写入 `look-controls` 的内部对象。

**VR 按钮始终不出现。** 在没有 WebXR 支持的浏览器或设备上，这是正确的行为。安装 Immersive Web Emulator 就能在没有头显的情况下测试它。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：添加你自己的第四个「查看」点位，用一个基本元素标签搭建。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：用一个来自你自己文化的贴图图案，替换编织图案，并添加一种你自己选择的语言的欢迎面板。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：用 `<a-video>` 添加一段你自己的短视频片段，并在其 2D 后备方案中提供字幕。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项。
2. 给房间截图，给按下状态的「查看」按钮截一张图，再给无 WebGL 提示信息截一张图（你可以临时禁用硬件加速来触发它）。
3. 把它们和第 3.1 课的截图一起保存在你的学习日志和作品集中：这个房间是同一个展览的下一页。
4. 在你的学习日志中回答：你会用来自你自己文化或语言的什么内容，替换展览中的哪一个点位？为什么？

## 延伸阅读

- [A-Frame: Introduction](https://aframe.io/docs/1.8.0/introduction/)（英文）
- [A-Frame: text component](https://aframe.io/docs/1.8.0/components/text.html)（英文）
- [A-Frame: sound component](https://aframe.io/docs/1.8.0/components/sound.html)（英文）
- [A-Frame: a-assets](https://aframe.io/docs/1.8.0/core/asset-management-system.html)（英文）
- [MDN: WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)（英文）
- [W3C: XR Accessibility User Requirements](https://www.w3.org/TR/xaur/)（英文）

## 值得认识的女性

**Liv Erickson** 曾是 **Mozilla Hubs** 的产品经理，这是一个开源的、基于浏览器的社交 VR 平台，用 A-Frame 和 three.js 在 WebGL 上构建，可以在 VR 头显、手机和桌面设备上运行。（Mozilla 后来终止了 Hubs 项目。）她现在是 Mozilla 的生态系统发展负责人（Ecosystem Development Lead）。

你刚刚搭建的这个房间，使用的正是 Hubs 所依赖的同样两项技术：用 HTML 写成的 A-Frame，构建在 three.js 之上。Hubs 采用了同样的思路——一个由基本元素标签和组件组成的房间——让人们无需头显，就能从浏览器一起走进这个房间。

> **编者注：发布前请核实。** 「值得认识的女性」中的人物信息必须以一手资料核实，并在可行时于课程上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

**WebXR Device API** 正是让浏览器能够以 VR 方式呈现这个房间的关键：它由 **W3C 的 Immersive Web 工作组**制定，A-Frame 自动出现的「进入 VR」按钮正是建立在它之上。它定义了网页如何请求一个 XR 会话、获取头显和控制器的位置，并渲染出立体视图，无论学习者使用哪种头显或浏览器，方式都是一样的。和第 3.1 课中的 WebGL、WebGPU 一样，它是一项标准，而不是一个库：A-Frame 是构建在它之上的开源项目，这也是为什么 XR Camp 固定的是 A-Frame 的版本号，而不是这个 API 本身。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
