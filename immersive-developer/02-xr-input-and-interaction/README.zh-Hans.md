# XR 输入与交互

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `immersive-developer` · **课时：** `xr-input-and-interaction-02` · **时长：** 约 12 小时 · 16 次学习，每次 45 分钟 · 每周 4 次，约 4 周

---

> 搭建一个 XR 交互实验室。

---

## 学习目标

完成本项目后，你将能够：

1. 读取 WebXR 的 **`select`**/`selectstart`/`selectend` 和 **`squeeze`**/`squeezestart`/`squeezeend` 事件，以及描述是谁触发了这些事件的 **`XRInputSource`** 属性（`targetRayMode`、`handedness`、`hand`、`gamepad`）。
2. 用 `renderer.xr.getControllerGrip()` 和 **`XRControllerModelFactory`** 显示一个真实的控制器模型，用 `renderer.xr.getHand()` 和 **`XRHandModelFactory`** 显示一只被追踪的手。
3. 解释 **gaze（凝视）**和 **transient-pointer（瞬时指针）**作为不同于 `tracked-pointer` 的 `targetRayMode` 取值，以及页面在什么情况下会遇到它们各自。
4. 搭建一种基于射线的（「远距离」）交互——一个你可以指向并选择的世界内菜单——以及一种基于距离的**直接抓取**，并解释每种交互方式各自适合什么任务。
5. 为一次选择提供视觉反馈，以及在受支持的情况下提供**触觉（haptic）**反馈，但绝不只依赖触觉。
6. 用一个必需的 `'hit-test'` 特性请求一个 **immersive-ar** 会话，并用 `XRHitTestSource` 和 `frame.getHitTestResults()` 把一个物体放置到真实表面上。
7. 解释为什么一台设备一次只能运行一个 WebXR 会话，并围绕这个限制设计页面的按钮。
8. 为这个实验室在 VR 或 AR 中提供的每一种交互，都配上完整的非 XR 键盘或 2D 替代方式。
9. 负责任地测试那些在不同设备之间支持差异很大的 WebXR 功能（手部追踪、hit-test），并在某些内容无法确认时坦率地说明。

## 先决条件

- **Immersive Developer，WebXR 基础（4.1）**：本课的起始代码是 4.1 完成后、已经支持 WebXR 的展览。你应该已经熟悉 `renderer.xr.enabled`、请求和结束一个会话，以及 `renderer.xr` 自己的 `sessionstart`/`sessionend` 事件。
- **Web3D Developer，Three.js 基础（3.4）**：`WebGLRenderer`、`THREE.Group`，以及释放几何体和材质。
- **My XR Camp**，第二阶段自己的小应用：本课不会直接扩展它，但跨越多节课持续构建同一样东西的思路在这里延续下去——只不过这一次，展览获得了自己的手和一个悬浮菜单。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 一个基于 Chromium 的桌面浏览器（Chrome 或 Edge） | WebXR 支持和开发者工具 | 免费 |
| [Immersive Web Emulator](https://github.com/meta-quest/immersive-web-emulator)（英文）浏览器扩展 | 在没有头显的情况下测试控制器会话 | 免费 |
| 一台带控制器或手部追踪功能的 VR 头显（可选） | 对控制器、手和触觉进行真实设备测试 | 视情况而定；非必需 |
| 一台支持 AR 的手机或头显（可选） | 对 hit-test 放置进行真实设备测试 | 视情况而定；非必需 |
| 一个本地服务器 | 模块、导入映射和 WebXR 本身都需要 `http://` | 免费 |

Immersive Web Emulator 能够可靠地模拟一个控制器会话；它对模拟一只被追踪的手或一个 AR hit-test 表面的支持则因版本和平台而异，所以把它无法展示的内容当作「未经测试」而不是「坏了」，并在条件允许时用真实设备确认。`three` 库从 `cdn.jsdelivr.net` 加载；如果这个地址访问缓慢或被屏蔽，可以先在能访问的地方下载一份固定版本的文件，再把导入映射指向你自己的副本。

## 你将构建什么

4.1 中支持 WebXR 的展览，将变成一个**交互实验室**：一个悬浮的小菜单，你可以用控制器、被追踪的手，或屏幕点按来指向它；一块可以直接伸手拿起的玉石；以及第二种、独立的 WebXR 会话类型——immersive AR——让你把一块虚拟玉石放置到自己房间里的真实表面上。这里的每一项都配有完整的 2D 或键盘替代方式，因此本课的任何内容都不需要拥有头显才能尝试。

参考答案在 [`completed/`](completed/) 中。起始代码是 4.1 完成后、已经支持 WebXR 的展览，外加三个新文件（`controllers.js`、`menu.js`、`ar.js`），以及对另外两个文件的小幅增补：一共十个 TODO，编号从 2 到 11。第 1 步不需要写代码。

## 文件夹说明

```text
02-xr-input-and-interaction/
├── README.md            # 本指南
├── README.es.md         # 西班牙语
├── README.zh-Hans.md    # 简体中文
├── project.json         # 课时元数据
├── starter/
│   ├── index.html, styles.css    # 页面、控件和每一个新面板（已完成）
│   └── js/
│       ├── app.js                # 引擎，来自 4.1，外加 onXRFrame()（已完成）
│       ├── exhibit.js            # 展品，来自 4.1（已完成）
│       ├── xr.js                 # 进入/退出 VR，来自 4.1（已完成）
│       ├── menu.js               # 世界内菜单的几何体和标签（已完成）
│       ├── describe.js           # 场景描述：TODO 7
│       ├── controllers.js        # 新增：控制器、手、射线、抓取。TODO 2-6
│       ├── ar.js                 # 新增：AR 会话和 hit-test 放置。TODO 8-10
│       └── main.js               # 把页面连起来：TODO 11
├── completed/            # 参考答案：最后再打开
├── challenges/           # 三个拓展挑战：基础挑战为必做
├── tests/checklist.md    # 提交前的自查清单
├── assets/
└── screenshots/
```

## 环境配置

1. 把起始代码复制到你的 `virtual-exhibit` 文件夹里，与你之前的成果放在一起，并用 Git 提交。
2. 启动本地服务器，打开 `index.html`。展览的表现和 4.1 结束时完全一样：「Enter VR」面板能正常工作，但世界内菜单、直接抓取、「Enter AR」，以及新的 2D 替代方式暂时都还没有反应。
3. 如果还没有安装，现在安装 Immersive Web Emulator 浏览器扩展。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 环境配置：把 4.1 完成后的展览复制过来，阅读三个新文件 | 未改动的桌面端展览，外加空的新面板 |
| 2 | 第 1 步：控制器抓握（grip）及其模型（TODO 2） | 在有控制器的设备上，VR 中会出现一个控制器模型 |
| 3 | 第 2 步：被追踪的手部模型（TODO 3） | 在支持手部追踪的设备上，会渲染出一只被追踪的手 |
| 4 | 第 3 步：指向射线（TODO 4，第一部分） | 从一个已连接的输入源延伸出一条射线 |
| 5 | 第 3 步，续：`'connected'`/`'disconnected'`（TODO 4，第二部分） | 只有在真的存在一个输入源时，射线才会出现 |
| 6 | 第 4 步：用射线选择世界内菜单（TODO 5） | 指向一个按钮并选择，会高亮并触发它 |
| 7 | 第 4 步，续：触觉反馈 | 一个受支持的控制器会在选择时短暂震动 |
| 8 | 第 5 步：用 squeeze 直接抓取（TODO 6，第一部分） | 在玉石附近按住抓握按钮，就能把它拿起来 |
| 9 | 第 5 步，续：松开，以及用手做捏取抓握（TODO 6，第二部分） | 松开会把玉石放回原处；一只被追踪的手也能抓取它 |
| 10 | 第 6 步：能感知交互状态的场景描述（TODO 7） | 描述会说出当前连接的输入方式和玉石的状态 |
| 11 | 第 7 步：请求一个带 hit-test 的 AR 会话（TODO 8） | 「Enter AR」会请求一个要求 `hit-test` 特性的会话 |
| 12 | 第 7 步，续：hit-test 源和瞄准环（TODO 9） | 一个瞄准环每帧都会追踪一个真实的平面 |
| 13 | 第 8 步：在选择时放置一个物体（TODO 10） | 在 AR 中选择，会把玉石放置在瞄准环所在的姿态上 |
| 14 | 第 9 步：把一切连接起来，以及 2D 替代方式（TODO 11） | 一个完整的交互实验室，每个 XR 操作都有一个 2D 或键盘的对应版本 |
| 15 | 用 Immersive Web Emulator 测试，如果有的话也用真实头显或手机测试 | 确认哪些内容可用，并诚实地记录哪些内容无法测试 |
| 16 | [`tests/checklist.md`](tests/checklist.md)，一个拓展挑战，然后**提交作业** | 一个完成的交互实验室 |

### 第 1 步：控制器抓握及其模型（TODO 2）

`renderer.xr.getControllerGrip(index)` 返回一个 `THREE.Group`，three.js 会持续更新它以匹配输入源的**抓握姿态（grip pose）**——如果一个虚拟物体被握在用户手中，它应该处在的位置。一个空的 group 什么都不会画出来：`XRControllerModelFactory.createControllerModel(grip)` 才是让它变得可见的部分，它通过读取已连接输入源自身的 `profiles` 数组（一组用来标识具体设备的字符串），在运行时获取一个匹配的 3D 模型，而不是为每一种控制器都画同一个通用形状。

### 第 2 步：被追踪的手部模型（TODO 3）

`renderer.xr.getHand(index)` 是同样的思路，只不过用于一只被追踪的手，而 `XRHandModelFactory.createHandModel(hand, 'mesh')` 会搭建一个蒙皮网格，跟随 WebXR 手部输入模块报告的全部 25 个关节：手腕、拇指的四个关节，以及另外四根手指各五个关节。传入 `'boxes'` 或 `'spheres'` 而不是 `'mesh'`，会在每个关节处改为画出简单的占位形状，这在不需要下载模型的情况下做测试很有用（参见探索挑战）。

### 第 3 步：指向射线（TODO 4）

`renderer.xr.getController(index)` 返回第三个 group，对应输入源的**目标射线空间（target ray space）**：这和抓握的姿态并不相同，因为一个控制器的射线会相对于它被握持的实际方式略微倾斜，而一只被追踪的手的射线跟随的是食指，而不是手掌。沿着这个 group 自身的本地 -Z 轴画一条 `THREE.Line`，按照定义，它指向的方向正是 WebXR 所报告的输入源瞄准的方向。`'connected'` 和 `'disconnected'` 会在一个会话真正开始或停止提供匹配的输入源时，在这个 group 上触发，这也是为什么射线只在真的存在一个输入源时才出现，而不是为两个整场会话都可能空着的席位都画出来。

### 第 4 步：用射线选择世界内菜单（TODO 5）

选择菜单属于「远距离」交互：这件事本身和输入源离按钮有多近没有关系，只取决于它指向哪里。`selectstart` 触发时不会自带任何有用的几何信息，因此这一步用普通的 `THREE.Raycaster`，从控制器自身的世界坐标位置和朝前方向，对 `menu.js` 中的三个按钮网格做射线检测。命中后会运行该按钮携带的 `action` 字符串对应的操作，并给出两种反馈：`setButtonHighlight()`（视觉反馈，来自 `menu.js`），以及只在输入源真的具备触觉设备时才会尝试的、来自 `GamepadHapticActuator.pulse()` 的一次短促脉冲。

### 第 5 步：直接抓取（TODO 6）

抓取玉石和第 4 步正好相反：这是「直接」或「近距离」交互，只有和物体的实际距离才重要，指向哪里无关紧要。`squeezestart`/`squeezeend` 对应控制器物理抓握按钮的触发；被追踪的手没有标准化的 squeeze 手势，所以只要手离玉石足够近、而不是指向菜单，它的捏取手势（和控制器的扳机一样，被报告为 `select`）就会完成同样的工作。`Object3D.attach()` 会把玉石重新挂载到抓取它的那个输入源上，同时保持它当前确切的位置和旋转，因此抓取的瞬间不会有任何跳动；松开则会反向操作，瞬间恢复玉石原本的父级、位置和旋转。

### 第 6 步：能感知交互状态的场景描述（TODO 7）

这段描述在 4.1 中已经变化过一次，用来说明头显是否处于激活状态。现在它还会说出当前连接的是哪种输入方式（一只手、一个控制器，还是暂时都没有），以及该输入方式的手势能做什么，还有玉石当前是否被握住。一位依赖这段文字的屏幕阅读器用户，应该被准确地告知和视力正常的学习者所看到的一样多的信息，不多也不少。

### 第 7 步：请求一个带 hit-test 的 AR 会话（TODO 8）

`immersive-ar` 的请求方式和 4.1 中 `immersive-vr` 一样，只有一处不同：`requiredFeatures: ['hit-test']`。没有办法像 `isSessionSupported()` 检测某种会话模式那样，提前对 `'hit-test'` 本身做特性检测；如果某个运行时无法提供一个必需的特性，`requestSession()` 这次调用整体就会被拒绝，这也是为什么 `enterAR()` 会用 try/catch 包裹它，并报告 `error.message`，而不是假定它一定会成功。

### 第 8 步：hit-test 源和瞄准环，然后放置一个物体（TODO 9-10）

一个 hit-test 源是针对 **`'viewer'`** 参考空间请求的——它以设备本身面朝的方向为根——因此每个 XR 帧调用一次的 `frame.getHitTestResults(source)`（通过 `app.onXRFrame()` 调用）会报告此刻正前方存在哪个真实表面。每一条结果的 `getPose()` 都会返回一个完整的变换矩阵，瞄准环直接复制它；选择时，会把这同一个矩阵分解成被放置的玉石所需的位置和旋转，因为一个 `Matrix4` 不能直接赋值给 `Object3D` 的 `position` 或 `quaternion` 属性。

### 第 9 步：把它们连接起来（TODO 11）

最后一步把一切连接起来：世界内菜单只搭建一次并加入场景；不论这个浏览器最终拥有怎样的 WebXR 支持，`initInteraction()` 都会被无害地调用一次；`initXR()` 和 `initAR()` 各自会在对方的会话激活期间禁用对方的按钮，因为一台设备一次只能运行一个 WebXR 会话；而「Lift jade stone」和「Place object (2D)」把抓取和放置这两个想法，用一种完全不需要头显、控制器或手的形式重新表达了一遍。

## 关键代码解析

**`XRInputSource.targetRayMode`** 的取值可以是 `'gaze'`（一个基于头部或眼动追踪的方向，不涉及控制器）、`'tracked-pointer'`（一个被物理追踪的控制器或手）、`'screen'`（在手机屏幕上的一次点按，包括在 inline 或 AR 会话中），或者 `'transient-pointer'`（一个由操作系统生成的指针，来自无法直接暴露的敏感信息，比如基于凝视的意图，或者来自 webdriver 合成的输入或辅助技术的输入）——这和 `'gaze'` 并不是一回事，尽管两者都可以充当「没有硬件控制器」的替代。

**`renderer.xr.getController(i)`**、**`getControllerGrip(i)`** 和 **`getHand(i)`** 针对同一个输入源，各自返回不同的 `THREE.Group`：分别对应目标射线空间、抓握空间，以及手部的整体姿态。把错误的模型挂载到错误的 group 上，是一个常见但不易察觉的错误（参见「常见错误」）。

**`XRControllerModelFactory`** 和 **`XRHandModelFactory`** 的构造函数都接受一个可选的 `GLTFLoader`，默认会自己创建一个；它们的 `createControllerModel(grip)`/`createHandModel(hand, profile)` 方法会在运行时从 [WebXR input profiles](https://github.com/immersive-web/webxr-input-profiles)（英文）注册表中获取与已连接设备匹配的模型，这也是为什么本项目没有自带任何控制器或手部模型文件。

**`session.requestHitTestSource({ space })`** 和 **`frame.getHitTestResults(source)`** 是这里用到的 WebXR Hit Test 模块的全部内容：前者请求「告诉我这条射线不断发现了哪些真实表面」，后者每帧询问「它刚刚发现了什么」。

**`GamepadHapticActuator.pulse(intensity, duration)`**，通过 `inputSource.gamepad.hapticActuators[0]` 访问，是 WebXR 暴露出的最简单的触觉调用；由于支持情况参差不齐，这里的每一次调用都被包裹起来，确保缺失的震动不会破坏一次选择。

## 3D 与 XR 无障碍

- 场景描述会说出当前连接的是哪种输入方式，并在这一情况发生变化、玉石被抓取或释放、以及任何东西被放置的那一刻立即更新。
- 每一种基于射线和基于直接接触的交互，都有完整的 2D 或键盘等效方式：菜单的三个操作同时也是普通的页面按钮，「Lift jade stone」对应直接抓取，「Place object (2D)」对应 AR 放置。
- 在任何模式下，包括 AR，相机都不会自行移动——在 AR 中，是设备自身的透视追踪（而不是这个页面）移动了视角。
- 触觉反馈总是与一个可见的高亮配对出现，绝不是确认一次选择成功的唯一信号。
- 进入 VR 或 AR 会保持 4.1 建立的同一套坐姿、舒适可及的布局：菜单和玉石都位于坐姿起始位置容易够到的范围内。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 场景描述会说出当前的输入方式和交互状态 | 1.1.1、4.1.2 | 屏幕阅读器用户能获得和视力正常的学习者一样的「我现在能做什么」的信息。 |
| 每一个 XR 操作（菜单、抓取、AR 放置）都有非 XR 的替代方式 | 2.1.1 | 整个实验室用鼠标、手指或键盘都能完全使用；VR 和 AR 始终是可选的。 |
| 触觉反馈绝不是一个操作唯一的反馈方式 | 良好实践 | 不是每个输入源都能震动，也不是每个学习者都能感觉到它。 |
| 按钮的可见文字始终与它当前的功能一致 | 2.5.3、4.1.2 | 「Enter VR」/「Exit VR」和「Place object (2D)」/「Remove placed object」都准确说明了接下来会发生什么。 |
| 相机绝不会移动，除非学习者（或在 AR 中，他们自己的设备）移动它 | 2.2.2 | 未经请求的运动会让人迷失方向，还可能引起真实的身体不适。 |
| 抓取和放置一个物体绝不会随时间做动画过渡 | 2.3.3 | 瞬间的位置变化没有引发晕动症的风险，而一个渐变过渡会有。 |

## 性能注意事项

两个控制器 group 和两个手部 group 会预先创建好，无论会话最终是否真的提供了匹配的输入源：在空置状态下，它们的开销几乎为零，因为 `XRControllerModelFactory` 和 `XRHandModelFactory` 只会在一个 `'connected'` 事件真正到达之后，才去获取并搭建模型。对菜单三个按钮的射线检测只在 `selectstart` 时运行一次，而不是每一帧都运行，因此不会增加逐帧的开销；`ar.js` 中的 hit-test 循环确实每个 XR 帧都会运行，但 `frame.getHitTestResults()` 正是为此设计的，它不会像 `THREE.Raycaster` 那样自行遍历场景。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 把一个控制器模型挂载到 `getController()` 而不是 `getControllerGrip()` 上 | 模型的角度不对，会沿着目标射线倾斜，而不是沿着抓握姿态 | 模型使用 `getControllerGrip()`，射线使用 `getController()` |
| 在一只被追踪的手上读取 `squeeze` 事件 | 什么都不会发生；手部输入源没有标准化的 squeeze 手势 | 手的抓取用 `select`（捏取），控制器的抓取用 `squeeze` |
| 假定 `isSessionSupported('immersive-ar')` 就能保证 hit-test 一定可用 | 带有 `requiredFeatures: ['hit-test']` 的 `requestSession()` 仍然可能被拒绝 | 和任何 `requestSession()` 调用一样，始终用 try/catch 包裹它 |
| 同时让「Enter VR」和「Enter AR」都保持启用 | 第二次 `requestSession()` 调用会失败，因为已经有一个会话在运行 | 在另一个会话激活期间，禁用对应的按钮（TODO 11） |
| 给玉石回到展台的过程加上动画 | 增加了一位偏好减少动态效果的学习者并未要求的运动，却没有真正的好处 | 像本课这样，瞬间把它的位置恢复原状 |
| 依赖触觉脉冲来确认一次选择 | 使用手部输入，或没有触觉功能的控制器的学习者，完全得不到任何确认 | 始终把它和 `setButtonHighlight()` 或其他可见变化配对使用 |

## 故障排查

**VR 中没有出现任何控制器或手部模型。** 检查 `'connected'` 监听器是否真的触发了：打印 `event.data.profiles` 来确认是否真的有输入源到达。如果确实到达了，检查模型是否被挂载到了*抓握（grip）*group 上，而不是控制器（目标射线）group 上。

**菜单按钮始终不会高亮或触发。** 打印射线检测的命中结果；一个常见原因是从错误 group 的 `matrixWorld` 发出射线，或者在调用 `applyMatrix4()` 之后忘记归一化射线的方向。

**用控制器能抓取，但用被追踪的手不行。** 手没有 `squeeze` 事件；检查针对手的抓取调用是否发生在 `selectstart` 上，并以 `controller.userData.inputSource?.hand` 为真作为判断条件。

**「Enter AR」立即因某个与特性相关的错误而被拒绝。** 该设备或浏览器不支持 `hit-test`，即使它总体上支持 `immersive-ar`。这在很多手机和头显上是预期之内的；状态信息应该说明这一点，「Place object (2D)」应该依然可用。

**瞄准环在 AR 中始终不出现。** 把设备对准一个平坦、光照良好、有纹理的表面（一块屏幕或空白墙壁对很多设备的表面检测来说可能过于「无特征」），并保持稳定一会儿；`frame.getHitTestResults()` 现阶段合理地返回空结果也是可能的。

**触觉始终不会震动。** 很多控制器，以及几乎所有被追踪的手，都不会暴露 `hapticActuators`。用 `console.log(inputSource.gamepad?.hapticActuators)` 确认一下；结果为空或未定义，意味着这台设备无法震动，而不是代码有问题。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：给世界内菜单添加第四个按钮，接线方式和另外三个一样。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：用你自己的语言或社区的表达方式重新撰写菜单和每一条状态信息，并更换哪一件展品可以被抓取和放置。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：为没有按钮的头显添加停留时间凝视选择功能，并比较 `XRHandModelFactory` 的占位模型（`'boxes'`/`'spheres'`）和它真实的手部网格。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项。
2. 拍摄截图：桌面端实验室、世界内菜单、VR（或模拟器）中的控制器或手部模型，以及 AR 瞄准环或「Place object (2D)」的结果。
3. 把它们连同这个项目一起保存在你的学习日志和作品集中。也可以和其他开发者分享：参见[在哪里分享你的作品和寻求帮助](../../docs/en/community.md)（英文）。
4. 在你的学习日志中回答：为什么控制器的抓取用 `squeeze`，而被追踪的手用 `select`？如果一节课悄悄假定所有输入源的工作方式都一样，学习者会遇到什么问题？

## 延伸阅读

- [W3C: WebXR Device API](https://www.w3.org/TR/webxr/)（英文）
- [W3C: WebXR Hand Input Module](https://www.w3.org/TR/webxr-hand-input-1/)（英文）
- [W3C: WebXR Hit Test Module](https://www.w3.org/TR/webxr-hit-test-1/)（英文）
- [MDN: Inputs and input sources](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API/Inputs)（英文）
- [three.js 文档：`XRControllerModelFactory`](https://threejs.org/docs/#examples/en/webxr/XRControllerModelFactory)（英文）

## 值得认识的女性

**Ming C. Lin（林明）**出生于台湾，是马里兰大学的杰出大学教授（Distinguished University Professor），是碰撞检测领域的先驱之一——包括 Lin-Canny 最近特征算法——同时也是基于物理的仿真、触觉和声音渲染领域的先驱。她在 2010 年获得 IEEE VGTC 虚拟现实技术成就奖，2022 年入选 IEEE VR 学院（IEEE VR Academy），并联合创立了 Impulsonic 公司，其音频技术后来被 Valve 收购，并以 Steam Audio 的形式发布。

本课中的「直接抓取」，其底层其实是两个物体之间的一次距离检测：这是碰撞检测问题里一个微小、日常的片段，而她的研究正是让这类计算快到足以用于实时图形。这里的触觉脉冲，也属于她职业生涯中投入了大量精力的同一个更广阔领域——为虚拟的触感和声音赋予物理基础。

_资料来自公开来源，于 2026 年核实。发现错误？[告诉我们](https://github.com/XR-Dev-Camp/xr-camp/issues)。_

## 标准聚焦

本课用到的 API 来自三份相关的规范，均由 W3C 的 **Immersive Web Working Group** 发布：核心的 **WebXR Device API**（会话、输入源、`select`/`squeeze` 事件）；**WebXR Hand Input Module**，它加入了 `XRHand` 及其 25 个被追踪的关节；以及 **WebXR Hit Test Module**，它加入了用于 AR 表面检测的 `XRHitTestSource`。这三份规范都仍然是通往「推荐标准（Recommendation）」轨道上不断演进的草案，而不是已经完成的推荐标准，这也是本课把手部追踪和 hit-test 支持当作需要检测的事项、而不是默认成立的假设的原因之一。Three.js 的 `XRControllerModelFactory` 和 `XRHandModelFactory` 本身并不是标准：它们是构建在 [WebXR input profiles](https://github.com/immersive-web/webxr-input-profiles)（英文）社区项目之上的开源便利工具，在底层实现了这些同样的 W3C API。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
