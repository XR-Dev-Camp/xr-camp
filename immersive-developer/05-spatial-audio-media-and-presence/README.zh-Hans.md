# 空间音频、媒体与临场感

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `immersive-developer` · **课时：** `spatial-audio-media-and-presence-05` · **时长：** 约 10 小时 · 14 次学习，每次 45 分钟 · 每周 4 次，约 4 周

---

> 搭建一个沉浸式媒体或叙事场景。

---

## 学习目标

完成本项目后，你将能够：

1. 创建并配置一个 **`THREE.PositionalAudio`**，并解释 `setRefDistance()`、`setRolloffFactor()`、`setMaxDistance()`，以及三种 Web Audio 距离模型：`'linear'`、`'inverse'` 和 `'exponential'`。
2. 把一个 `PositionalAudio` 挂载到任意 `Object3D` 上，让它每一帧都继承该物体的位置，并把一个 **`THREE.AudioListener`** 放在相机上，让声像始终从观看者的角度测量。
3. 解释为什么一个 `AudioContext` 会以**挂起（suspended）**状态启动，并从一次真实的用户手势中恢复它，同时配合 three.js 自身的 `play()` 和 `pause()`。
4. 用 **`THREE.CanvasTexture`** 搭建一个随时间变化的贴图：每一帧重绘一次画布，并设置 `texture.needsUpdate` 让 three.js 重新上传它。
5. 解释 `CanvasTexture` 和 **`THREE.VideoTexture`** 之间的区别，以及分别在什么情况下选用它们。
6. 撰写一份 **WebVTT** 字幕文件，并用 **`TextTrack`** API 在 JavaScript 中读取它的提示（cue）：`track.mode`、`cuechange` 事件，以及 `track.activeCues`。
7. 从字幕轨道所用的同一组提示，搭建一份始终存在的**逐字稿（transcript）**，让这些信息不会只存在于一个地方。
8. 在一个既有声音又有画面动效的场景中，同时应用「音频只能由用户启动」的规则和减少动态效果的规则。

## 先决条件

- **WebXR 基础（4.1）**：本课的起始代码是 4.1 完成后的展览，包括它的「Enter VR」按钮。你应该已经熟悉 `renderer.xr`、`OrbitControls` 和 `renderer.setAnimationLoop`。
- **XR 输入与交互（4.2）**、**空间 UX 设计（4.3）**和**沉浸式无障碍与伦理（4.4）**，如果已经完成，会是有帮助的背景知识，但不是必需的。
- **My XR Camp**，第二阶段自己的小应用：跨越多节课持续构建同一样东西的思路在这里延续下去——只不过这一次，虚拟展览获得了自己的声音。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 一个基于 Chromium 的桌面浏览器（Chrome 或 Edge） | WebGL 2、Web Audio API 和开发者工具 | 免费 |
| 一个本地服务器 | 模块、导入映射和媒体文件都需要 `http://` | 免费 |
| 带 `numpy` 的 Python 3（可选） | 只有当你想重新生成或添加自己的程序化声音时才需要，本课自己的 `assets/*.wav` 文件就是这样制作的 | 免费 |

`three` 库从 `cdn.jsdelivr.net` 加载；如果这个地址在你所在的地方访问缓慢或被屏蔽，可以先在能访问的地方下载一份固定版本的文件，再把导入映射指向你自己的副本。本课的任何内容都不需要付费账号、API 密钥，或文字转语音服务。

## 你将构建什么

来自 4.1 的展览获得了自己的声音。三个展台现在各自用 `THREE.PositionalAudio` 播放一段轻柔的循环声音，因此当你在展览中走动时，它们之间的音量平衡会随之变化——这正是一份真实的语音导览、或你自己的双耳所依赖的同一个原理。展览上方一块小屏幕，由一块被反复重绘的 `<canvas>`（而不是一个视频文件）搭建而成，会显示一段带字幕的简短语音导览；同样的字幕和一份完整的逐字稿始终可以在页面上阅读，无论你是否按下过播放。

本项目中的所有音频都是程序化生成的（参见 [`ATTRIBUTION.md`](./ATTRIBUTION.md)）：没有使用、也不需要任何录音设备、授权音效库，或文字转语音工具。在你主动要求之前，任何东西都不会播放。

参考答案在 [`completed/`](completed/) 中。起始代码是 4.1 完成后的展览，外加三个新文件（`js/audio.js`、`js/video.js`、`js/captions.js`），以及对另外三个文件的小幅增补：一共十个 TODO。

## 文件夹说明

```text
05-spatial-audio-media-and-presence/
├── README.md            # 本指南
├── README.es.md         # 西班牙语
├── README.zh-Hans.md    # 简体中文
├── project.json         # 课时元数据
├── starter/
│   ├── index.html, styles.css    # 页面、语音导览播放器、字幕和逐字稿（已完成）
│   └── js/
│       ├── app.js                # 引擎，来自 4.1：TODO 3、9
│       ├── exhibit.js            # 展品，来自 4.1（已完成）
│       ├── xr.js                 # 进入和退出 VR，来自 4.1（已完成）
│       ├── audio.js              # 新增：展台空间音效。TODO 1-2
│       ├── video.js              # 新增：由画布驱动的故事屏幕。TODO 6
│       ├── captions.js           # 新增：读取 WebVTT 提示。TODO 7-8
│       ├── describe.js           # 场景描述：TODO 10
│       └── main.js               # 把页面连起来：TODO 4-5
├── completed/            # 参考答案：最后再打开
├── challenges/           # 三个拓展挑战：基础挑战为必做
├── tests/checklist.md    # 提交前的自查清单
├── assets/               # 程序化生成的 .wav 文件和 captions.vtt
└── screenshots/
```

## 环境配置

1. 把起始代码复制到你的 `virtual-exhibit` 文件夹里，与你之前的成果放在一起，并用 Git 提交。
2. 启动本地服务器，打开 `index.html`。桌面端展览和「Enter VR」面板的表现和 4.1 结束时完全一样。语音导览播放器、字幕段落和逐字稿列表都可见，但暂时还没有任何反应。
3. 在开始之前先看看 `assets/`：三段简短的展台声音、一段更长的导览音轨，以及 `captions.vtt`，都已经为你生成好了。除非你尝试创意或基础挑战，否则本课不需要用到 Python。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 环境配置：把 4.1 完成后的展览复制过来，作为本课的起始代码，阅读新增的 HTML | 未改动的展览，外加一个语音导览播放器和一份空的逐字稿 |
| 2 | 第 1 步：`THREE.PositionalAudio` 及其距离设置（TODO 1） | 每个展台的声音都已加载，并配置好了距离模型，尽管暂时还没有播放 |
| 3 | 第 2 步：把一段声音挂载到它所在展台的网格上（TODO 2） | 每段声音都继承了各自展台的位置 |
| 4 | 第 3 步：`AudioListener`，添加到相机上（TODO 3） | 声音现在会从相机实际所在的位置测量距离 |
| 5 | 第 4 步：在一次真实点击中恢复 `AudioContext`（TODO 4） | 按下「开始展台声音」，第一次真正发出了声音 |
| 6 | 第 5 步：连接距离模型的选择框（TODO 5） | 切换 `linear`、`inverse` 和 `exponential`，会实时改变衰减效果 |
| 7 | 第 6 步：在故事屏幕的画布上绘制一帧（TODO 6） | 屏幕显示出一个流动的渐变和字幕文字 |
| 8 | 第 7 步：用 `cuechange` 读取字幕（TODO 7） | 语音导览播放时，字幕段落会随之更新 |
| 9 | 第 8 步：从同一个轨道搭建逐字稿（TODO 8） | 逐字稿列表出现，并且即使没有任何东西在播放，它依然存在 |
| 10 | 第 9 步：把故事屏幕接入渲染循环（TODO 9） | 屏幕会持续每帧动画，和场景的其余部分保持同步 |
| 11 | 第 10 步：扩展场景描述（TODO 10） | 描述会报告声音是否正在播放、选中了哪种距离模型，以及当前的字幕内容 |
| 12 | 测试：减少动态效果、纯键盘操作，以及对照 [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md)（英文）的 2D/3D 后备方案 | 确认声音、字幕和逐字稿在没有 WebGL 的情况下都能工作，并且没有任何内容会自动播放 |
| 13 | [`tests/checklist.md`](tests/checklist.md) | 一个完成的、会讲故事的展览 |
| 14 | 一个拓展挑战，然后**提交作业** | 你选择的拓展，以及准备好提交的展览 |

### 第 1 步：`PositionalAudio` 及其距离设置（TODO 1）

`THREE.PositionalAudio` 是对 Web Audio API 的 `PannerNode` 的封装。`setRefDistance(1.2)` 设定了在这个场景自己的度量单位（米）下，声音以其录制音量播放的距离；`setRolloffFactor(1.5)` 控制超出这个距离之后声音衰减的速度；`setMaxDistance(10)` 限制距离计算的最远范围（这三者都已直接对照 three.js r186 版本自己的源码 `src/audio/PositionalAudio.js` 验证过）。`setDistanceModel('inverse')` 在三种模型中选择了 `'inverse'`，也就是 Web Audio API 自己的默认模型（已在 MDN 的 `PannerNode` 参考文档中验证）。

### 第 2 步：把一段声音挂载到它的展台上（TODO 2）

`THREE.Audio` 及其子类都是 `Object3D` 的实例，就像一个网格或一盏灯一样。`mesh.add(sound)` 会让这段声音成为该展台网格的子级：每一帧，three.js 都会直接从其父级的 `matrixWorld` 读取这段声音的世界位置——和一盏灯或一台相机使用的机制完全相同——并把它传给底层的 `PannerNode`。

### 第 3 步：`AudioListener`（TODO 3）

一个 `AudioListener` 代表场景中的「耳朵」：每一个 `PositionalAudio` 测量距离和方向所依据的那个点。`camera.add(listener)` 会让它始终位于观看者观看的确切位置，无论是在桌面视图中还是在 WebXR 头显里，两种模式都不需要额外的代码。

### 第 4 步：从一次真实点击启动音频（TODO 4）

浏览器会让每一个 `AudioContext` 以**挂起（suspended）**状态启动，直到一次真实的用户手势将其恢复；three.js 自身的源码不会替你调用 `resume()`（已在 r186 版本的 `src/audio/Audio.js` 中验证）。本课自己的规则——「在你主动要求之前，任何东西都不会发出声音」——恰好需要的正是同一件事：在同一个按钮的 `click` 处理函数内部，先调用 `listener.context.resume()`，再对每一段声音调用 `play()`。

### 第 5 步：比较不同的距离模型（TODO 5）

对一段已经在播放的声音再次调用 `setDistanceModel()`，会立即改变它的行为：不需要停止或重新启动任何东西。把 `<select>` 的 `change` 事件连接到对每一段展台声音都调用它，能把这三种距离模型从一段你读到的定义，变成一种你可以在展览中走动时、实时听出区别的体验。

### 第 6 步：故事屏幕的画布（TODO 6）

`THREE.CanvasTexture` 并不会自己监视它的画布：每次绘制之后，`texture.needsUpdate = true` 会告诉 three.js，在下一帧之前把像素重新上传到 GPU。没有这一行代码，最初绘制的内容就会永远停留在屏幕上。而一个真正的 `THREE.VideoTexture` 完全不需要这一行：它每一帧改为检查视频元素自己的 `readyState`（参见 r186 版本的 `src/textures/VideoTexture.js`），这也是两者之间主要的实际差异，探索挑战会进一步讨论这一点。

### 第 7 步：用 `cuechange` 读取字幕（TODO 7）

一个 `<track>` 元素的 `TextTrack` 默认是 `mode: 'disabled'`，此时什么都不会加载。把 `track.mode` 设为 `'hidden'`，会加载它的提示（cue），并在当前生效的提示集合发生变化时触发 `cuechange`，同时不会打开浏览器自身的字幕渲染——本课不需要用到那个渲染，它有自己的字幕段落和画布文字。

### 第 8 步：从同一组提示构建逐字稿（TODO 8）

一个 `<track>` 的提示，并不会在这个元素刚出现在 DOM 中时就立即可用。`<track>` 元素自身（而不是 `<audio>` 元素）的 `'load'` 事件，会在它的 WebVTT 文件真正被获取并解析完成之后触发；这正是读取 `track.cues` 并构建逐字稿列表项的时机。

### 第 9 步：把故事屏幕接入渲染循环（TODO 9）

`app.js` 的 `onFrame()` 允许任何模块注册一个函数，让它在每渲染一帧（无论桌面端还是 XR）时运行一次，而不需要持有渲染器或自己渲染循环的引用。`video.js` 的 `drawFrame()` 就是通过这种方式在 `main.js` 中注册的，这让 `app.js` 只负责一个渲染循环——正是 4.1 已经为 XR 帧循环本身建立的同一个原则。

### 第 10 步：场景描述报告这一切（TODO 10）

`describeExhibit()` 原本就会告诉屏幕阅读器用户展览里有什么。现在它还需要说明展台声音是否正在播放、当前选中了哪种距离模型，以及故事屏幕当前的字幕内容是什么，这样一位看不到画布或听不到音频的学习者，依然能确切知道这个场景处于什么状态。

## 关键代码解析

**`new THREE.PositionalAudio(listener)`** 创建一个空间声音，它必须先被赋予一个缓冲区（`setBuffer()`）才能播放，并且必须是某个 `Object3D` 的后代才能拥有有意义的位置；一个没有父级的 `PositionalAudio` 表现得就像它位于场景的原点一样。

**`listener.context.resume()`** 会恢复一个场景中每一个 `THREE.Audio` 和 `THREE.PositionalAudio` 通过它们共同的 `AudioListener` 共享的那个 Web Audio `AudioContext`；它必须从一次真实的用户手势内部调用，three.js 绝不会替你调用它。

**`texture.needsUpdate = true`** 是真正让一个 `CanvasTexture`（或任何来源持续变化的贴图）重新到达 GPU 的关键；`VideoTexture` 会在底层的 `<video>` 每有一帧新画面就绪时，自动替你设置它。

**`track.mode = 'hidden'`** 会加载一个 `<track>` 的提示并触发它的事件，同时不绘制浏览器自身的字幕叠加层；`'showing'` 也会绘制那个叠加层（对一个真正的 `<video>` 有用，本课的 `<audio>` 没有用到），而默认值 `'disabled'` 则什么都不会加载。

**`track.activeCues`** 是一份实时列表，包含此刻在音频当前时间点「正在屏幕上」的每一个 `VTTCue`；对于一个像本课这样没有重叠提示的字幕文件，它最多只会持有一个提示。

## 3D 与 XR 无障碍

- 场景描述（`#scene-description`）会报告展台声音的状态、选中的距离模型，以及故事屏幕当前的字幕，连同 4.1 已经描述过的一切。
- 没有任何声音会自动播放：展台声音和语音导览都会等待一次真实的点击，无论是点击「开始展台声音」，还是点击语音导览自身原生的播放按钮。
- 相机绝不会自行移动，空间音频不会改变这一点：`PositionalAudio` 只会改变音量和声像平衡，绝不会改变任何人的视角。
- 每一种通过声音才能获得的信息（听出哪个展台更近）都有一个功能完全对等的文字替代方式：始终存在的展品列表、字幕段落，以及逐字稿。
- 开启减少动态效果后，玉石的旋转和故事屏幕自身的动画都会以暂停状态开始；这对声音没有影响，因为减少动态效果这项偏好设置针对的是运动，而不是音频。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 没有任何音频会自动播放；始终需要先点击一次 | 良好实践 | 自动播放的声音会让人迷失方向，尤其是在使用耳机或头显时；有些学习者依赖自己的屏幕阅读器语音，与之竞争的声音会把它盖过去。 |
| 语音导览有一份与之同步的文字替代方案（字幕） | 1.2.2 | `<track kind="captions">` 元素为导览的音频内容提供了一份与之同步的文字替代方案。 |
| 存在一份完整的逐字稿，与音频是否曾经播放过无关 | 1.2.1 | `#transcript` 中的逐字稿携带着和语音导览相同的信息，供任何无法或不想播放音频的人使用。 |
| 字幕段落（`#caption-text`）是一个实时区域 | 良好实践 | 屏幕阅读器用户能在每次字幕变化时立即听到，而不需要不断重新阅读页面。 |
| 声音状态和距离模型的变化会体现在场景描述中 | 良好实践 | 一位看不到展览或控件的学习者，依然有一个地方能准确说明正在发生什么。 |
| 故事屏幕的动画遵循 `prefers-reduced-motion`，并有一个暂停按钮控制它 | 2.2.2 | 一个持续自行运动的屏幕，对某些学习者来说可能分散注意力或令人不适；自动检测和手动按钮都能把控制权交还给学习者。 |

## 性能注意事项

解码三段简短的 `.wav` 文件和一段更长的文件开销很小：加起来不到 1.5 MB，由 Web Audio API 解码一次之后，从内存中循环播放，而不是流式传输。每帧重绘一次 512×288 的画布并把它重新上传为贴图，是一笔很小、恒定的开销，一台手机级别的 GPU 完全能够在同时渲染三个简单基础网格的情况下轻松应对；如果画布尺寸大得多，或者同时更新好几张这样的贴图，这种做法的开销才会开始超过一段真正的视频。Three.js 已经会在渲染器每一帧都要做的同一次矩阵更新过程中，从每个 `PositionalAudio` 父级的 `matrixWorld` 更新它的位置，因此空间音频本身不会给场景图增加任何额外的逐帧遍历。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 在 `AudioContext` 被恢复之前调用 `sound.play()` | 调用成功且不报错，但听不到任何声音 | 先在同一个点击处理函数内部调用 `listener.context.resume()` |
| 忘记 `mesh.add(sound)` | 声音在任何地方的音量都一样，因为它是从场景的原点测量距离的 | 把每一个 `PositionalAudio` 都挂载到它听起来应该发出声音的那个物体上 |
| 让一个 `<track>` 的 `mode` 保持默认值 | `cuechange` 永远不会触发，`track.cues` 也一直是空的 | 在依赖它们之前，先设置 `track.mode = 'hidden'`（或 `'showing'`） |
| 在 `CanvasTexture` 的画布上绘制之后忘记 `texture.needsUpdate = true` | 屏幕永远只显示最初的那一帧 | 每次绘制调用改变了画布之后，都紧接着设置一次 |
| 撰写描述了音频中实际并不存在的语音内容的字幕 | 字幕会误导学习者以为自己听到了什么 | 像本项目自己的 `ATTRIBUTION.md` 那样，明确说明音频不是真实语音的地方 |
| 在创建一个 `<track>` 元素之后立即读取 `track.cues` | 列表是空的；文件还没有加载完成 | 等待 `<track>` 自身的 `'load'` 事件，或者检查 `readyState === 2` |

## 故障排查

**按下「开始展台声音」没有声音，也没有报错。** `AudioContext` 很可能仍处于挂起状态。检查 `listener.context.resume()` 是否在点击处理函数内部、`play()` 之前运行。在 Firefox 中，检查 `about:preferences#privacy` 是否为整个网站屏蔽了自动播放；无论如何，一次直接的点击都应该仍然被允许。

**声音在任何地方的音量都是满的，没有距离效果。** 检查是否对每个展台都运行了 `mesh.add(sound)`（TODO 2），以及这段声音是否仍然挂载在场景本身上。

**字幕段落始终不更新。** 检查 `track.mode` 是否被设为 `'hidden'`，而不是保持默认值；如果直接检查一个 `<track>`，开发者工具的元素面板可以显示它当前的 `readyState` 和 `mode`。

**逐字稿始终是空的。** 这个 `<track>` 的 `'load'` 事件可能在你的监听器绑定之前就已经触发了，在一个速度很快的本地服务器上尤其容易发生。检查 `buildTranscript()` 中的 `readyState === 2` 后备判断。

**故事屏幕只显示一帧，或者是空白的。** 检查 `drawFrame()` 中每次绘制之后是否都运行了 `texture.needsUpdate = true`，以及 `app.onFrame()` 是否真的在调用它（TODO 9）：一个常见的错误是正确填写了 `drawFrame()`，却完全忘了把它接入渲染循环。

**在 Safari 上，语音导览的字幕按钮没有出现。** 这是预期之内的：Safari 在 `<audio>`（相对于 `<video>`）上原生的字幕菜单是受限的。本课不依赖它：字幕段落和逐字稿直接在 JavaScript 中从同一个 `<track>` 的提示读取，在目前所有浏览器上表现一致。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：给故事屏幕加上一段属于它自己的轻柔空间音效，挂载方式和展台声音挂载到展台上一样。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：添加一份用你自己语言撰写的第二字幕轨道，并用对你有意义的参数重新生成一个展台的声音。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：用一个真正的 `THREE.VideoTexture`，替换掉由画布驱动的故事屏幕，使用一段属于你自己的短片。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项。
2. 拍摄截图：任何声音开始之前的展览、语音导览播放中及其可见的字幕、逐字稿，以及你选择的拓展挑战。
3. 把它们连同这个项目一起保存在你的学习日志和作品集中。也可以和其他开发者分享：参见[在哪里分享你的作品和寻求帮助](../../docs/en/community.md)（英文）。
4. 在你的学习日志中回答：为什么一个 `AudioContext` 会以挂起状态启动？如果一个真实项目忽略了这一点，试图在页面加载的那一刻就播放声音，学习者可能会遇到什么问题？

## 延伸阅读

- [W3C: Web Audio API](https://www.w3.org/TR/webaudio/)（英文）
- [MDN: Web Audio spatialization basics](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Web_audio_spatialization_basics)（英文）
- [MDN: `PannerNode`](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode)（英文）
- [W3C: WebVTT: The Web Video Text Tracks Format](https://www.w3.org/TR/webvtt1/)（英文）
- [three.js 文档：`PositionalAudio`](https://threejs.org/docs/#api/en/audio/PositionalAudio)（英文）

## 值得认识的女性

**Nonny de la Peña** 是一位美国记者，被广泛认为是「沉浸式新闻（immersive journalism）」的创始人。她的作品《Hunger in Los Angeles》是第一部 VR 纪录片，也是 2012 年圣丹斯电影节（Sundance）New Frontier 单元的第一部 VR 作品；此后她创立了 Emblematic Group，如今是亚利桑那州立大学叙事与新兴媒体项目的创始主任。

在本课这些工具存在的许多年之前，她的工作就已经把一个用声音和一个环绕观看者的场景讲述的真实故事，放在了「头显能用来做什么」的核心位置。你在这里搭建的字幕、逐字稿和轻柔的空间音效，是这同一个理念在当下的一些微小体现：临场感和故事协同作用，并且始终为那些无法、或不愿只依赖音频的人留出一条路。

_资料来自公开来源，于 2026 年核实。发现错误？[告诉我们](https://github.com/XR-Dev-Camp/xr-camp/issues)。_

## 标准聚焦

**Web Audio API**——支撑着每一个 `AudioContext`、`PannerNode`，以及本课的 `THREE.PositionalAudio`——由 W3C 的 Web Audio Working Group 发布；截至 2026 年年中，它在通往推荐标准的轨道上仍处于工作草案（Working Draft）阶段，还不是一份完成的推荐标准。**WebVTT**，也就是 `assets/captions.vtt` 和 `<track>` 元素背后的字幕文件格式，由 W3C 的 Timed Text Working Group 发布，进展更靠前一些：处于候选推荐草案（Candidate Recommendation Draft）阶段。Three.js 实现的是这两个底层的 Web 平台特性本身，而不是自己发明一套：`PositionalAudio` 只是对标准 `PannerNode` 的一层薄封装，而 `<track>` 的 `TextTrack` API 则在 `captions.js` 中被直接、原样使用。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
