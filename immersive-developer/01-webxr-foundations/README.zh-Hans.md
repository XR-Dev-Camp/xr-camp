# WebXR 基础

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `immersive-developer` · **课时：** `webxr-foundations-01` · **时长：** 约 14 小时 · 19 次学习，每次 45 分钟 · 每周 4 次，约 5 周

---

> 构建一个支持 WebXR 的体验，并带有桌面端和移动端后备方案。

---

## 学习目标

完成本项目后，你将能够：

1. 用 **`navigator.xr.isSessionSupported()`** 对 WebXR 进行特性检测，并把「不支持」「不允许」和「没有这个 API」都当作同一种平静的后备处理。
2. 解释什么是**安全上下文（secure context）**，以及为什么 WebXR 需要它。
3. 用 **`renderer.xr.enabled`** 在 three.js 中开启 WebXR 支持，并通过 `renderer.xr.setReferenceSpaceType()` 选择一个**参考空间（reference space）**。
4. 用 `navigator.xr.requestSession()` 和 `session.end()` 请求并结束一个 **immersive-vr 会话**，并解释为什么这个请求必须发生在一次用户手势内部。
5. 响应 **`sessionstart`** 和 **`sessionend`**——这是 three.js 自己的 `renderer.xr` 派发的事件——并让你的引擎、按钮和一个实时区域（live region）对页面当前处于哪种模式始终保持一致。
6. 用 `renderer.setAnimationLoop` 让同一个渲染循环同时服务于桌面视图和 WebXR。
7. 搭建一个优雅的后备方案：无论有没有头显、有没有 WebXR 支持、连接是否安全，展览的 2D 和 3D 视图都能完整工作。
8. 为**坐姿模式（seated mode）**设计：把可交互物体保持在舒适、可及、面朝前方的视野内，不强制学习者站立或转身。
9. 用免费的 **Immersive Web Emulator** 浏览器扩展，在没有头显的情况下测试 WebXR 功能，并了解在普通手机上应该期待什么。
10. 阅读一个库自己的源代码（three.js 的 `VRButton.js`），以核实某个 API 调用到底做了什么，而不是靠猜测。

## 先决条件

- **Web3D Developer，Three.js 基础（3.4）**：本课的起始代码就是 3.4 完成后的展览。你应该已经熟悉 `WebGLRenderer`、`OrbitControls` 和 `renderer.setAnimationLoop`。
- **A-Frame 基础与进阶 A-Frame（3.2-3.3）**以及 **Web3D 性能工程（3.6）**，如果已经完成，会是有帮助的背景知识，但不是必需的。
- **My XR Camp**，第二阶段自己的小应用（课程地图、仪表盘、学习计划器）：跨越多节课持续构建同一样东西的思路在这里延续下去，只不过这一次，虚拟展览要进入 VR 了。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 一个基于 Chromium 的桌面浏览器（Chrome 或 Edge） | WebXR 支持和开发者工具 | 免费 |
| [Immersive Web Emulator](https://github.com/meta-quest/immersive-web-emulator)（英文）浏览器扩展 | 在没有头显的情况下测试 VR 会话 | 免费 |
| 一台 VR 头显（可选） | 如果你有条件，可在真实设备上测试 | 视情况而定；非必需 |
| 一个本地服务器 | 模块、导入映射和 WebXR 本身都需要 `http://` | 免费 |

Immersive Web Emulator 是开源的（MIT 许可），可以从 Chrome 网上应用店或 Microsoft Edge 加载项商店安装，两者用法相同。如果这两个商店在你所在的地方都无法访问，该项目的 GitHub 页面（`meta-quest/immersive-web-emulator`）也说明了如何从解压后的发行版安装。`three` 库从 `cdn.jsdelivr.net` 加载；如果这个地址访问缓慢或被屏蔽，可以先在能访问的地方下载一份固定版本的文件，再把导入映射指向你自己的副本。

## 你将构建什么

你在 3.4 用 three.js 搭建的展览，将获得 **WebXR 能力**：只要浏览器和设备支持，就会出现一个「进入 VR（Enter VR）」按钮，点击后你就能以真实大小走进展览、戴上头显体验；而对其他所有人来说，一切照旧完整可用。这是展览迈入第四阶段的第一步——从屏幕上的一幅画面，变成一个你可以站进去、或坐进去的空间。

参考答案在 [`completed/`](completed/) 中。起始代码是 3.4 的完成版展览，外加一个新文件 `js/xr.js`，以及对另外三个文件的小幅增补：一共八个 TODO。

## 文件夹说明

```text
01-webxr-foundations/
├── README.md            # 本指南
├── README.es.md         # 西班牙语
├── README.zh-Hans.md    # 简体中文
├── project.json         # 课时元数据
├── starter/
│   ├── index.html, styles.css    # 页面、控件和 Enter VR 面板（已完成）
│   └── js/
│       ├── app.js                # 引擎，来自 3.4：TODO 2-3
│       ├── exhibit.js            # 展品，来自 3.4（已完成）
│       ├── describe.js           # 场景描述：TODO 7
│       ├── xr.js                 # 新增：进入和退出 VR。TODO 1、4-5
│       └── main.js               # 把页面连起来：TODO 6、TODO 8
├── completed/            # 参考答案：最后再打开
├── challenges/           # 三个拓展挑战：基础挑战为必做
├── tests/checklist.md    # 提交前的自查清单
├── assets/
└── screenshots/
```

## 环境配置

1. 把起始代码复制到你的 `virtual-exhibit` 文件夹里，与你 3.1-3.4 的成果放在一起，并用 Git 提交。
2. 启动本地服务器，打开 `index.html`。桌面端展览的表现和 3.4 结束时完全一样。「Enter VR」面板会显示「正在检测该浏览器和设备是否支持 VR……」，在你完成 TODO 之前不会继续。
3. 现在就安装 Immersive Web Emulator 浏览器扩展，以便测试环节到来时它已经就绪。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 环境配置：把 3.4 完成后的展览复制过来，作为本课的起始代码 | 未改动的桌面端展览，外加一个空的「Enter VR」面板 |
| 2 | 第 1 步：`'xr' in navigator`（TODO 1，第一部分） | 在没有 WebXR API 的浏览器上，`supportsImmersiveVR()` 返回 `false` |
| 3 | 第 1 步，续：`isSessionSupported('immersive-vr')`（TODO 1，第二部分） | 在拥有该 API 的浏览器上，能正确报告 `true` 或 `false` |
| 4 | 第 2 步：`renderer.xr.enabled`（TODO 2，第一部分） | WebXR 已开启（暂时没有可见变化） |
| 5 | 第 2 步，续：`renderer.xr.setReferenceSpaceType('local-floor')`（TODO 2，第二部分） | 你能解释什么是参考空间 |
| 6 | 第 3 步：在演示期间暂停 `OrbitControls`（TODO 3） | `setPresenting(true)` 会禁用拖动和方向键 |
| 7 | 第 4 步：每次会话开始前重置视角（TODO 4，第一部分） | 你能解释这为什么关乎舒适度 |
| 8 | 第 4 步，续：`requestSession` 和 `session.end()`（TODO 4，第二部分） | 点击按钮（一旦显示）会请求一个真实的会话 |
| 9 | 第 5 步：`sessionstart`（TODO 5，第一部分） | 会话一开始，按钮文字和 `#xr-status` 就会立刻更新 |
| 10 | 第 5 步，续：`sessionend`（TODO 5，第二部分） | 结束会话会恢复按钮文字和状态信息 |
| 11 | 第 6 步：显示按钮，或给出后备提示（TODO 6） | Enter VR 按钮终于出现了，或者出现了一句清楚说明原因的话 |
| 12 | 第 7 步：VR 中的场景描述（TODO 7） | 进入 VR 后，`#scene-description` 会改变措辞 |
| 13 | 第 8 步：把一切连接到 `main.js`（TODO 8） | 一个完整可用的 Enter VR 面板 |
| 14 | 用 Immersive Web Emulator 测试 | 在开发者工具中看到一次真实（模拟）的 VR 会话 |
| 15 | 在手机上测试，以及「不支持」应有的样子 | 确认 2D/3D 后备方案在任何地方都能工作 |
| 16 | 对照 [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md)（英文）做一次坐姿舒适度复查 | 你能指出让这个展览保持坐姿安全的确切代码行 |
| 17 | [`tests/checklist.md`](tests/checklist.md) | 一个完成的、支持 WebXR 的展览 |
| 18 | 一个拓展挑战 | 你选择的拓展 |
| 19 | **提交作业** | 展览的第一个 WebXR 版本，为 4.2 做好准备 |

### 第 1 步：特性检测（TODO 1）

`navigator.xr` 只存在于实现了 WebXR Device API 的浏览器中。即使如此，`navigator.xr.isSessionSupported('immersive-vr')` 返回的 Promise 也可能解析为 `false`（API 存在，但目前没有可用的 immersive-vr 设备或运行时），或者在某些浏览器上，对不被允许或未实现的模式直接拒绝（reject）。`supportsImmersiveVR()` 把这三种结果都当作同一件事处理：不支持——这样页面的其余部分只需要回答一个明确的问题，而不是三个。

### 第 2 步：开启 WebXR，并选择参考空间（TODO 2）

`renderer.xr.enabled` 默认是 `false`。如果不把它设为 `true`，即便之后把一个会话交给 `renderer.xr.setSession()`，头显里也不会画出任何东西。**参考空间**是头显的追踪数据所依据的坐标系：`local-floor` 把原点放在地板高度，位于会话开始那一刻相机所在的位置正下方，这正是一个坐姿体验想要的效果（参见 [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md)（英文））。在这个版本中，three.js 的 `WebXRManager` 内部其实已经默认使用 `local-floor`；显式地设置它，是把这个默认行为写进代码里让阅读者能看到，而不是依赖一个没有人写下来的默认值。这个调用只在会话开始之前有效：如果在演示期间调用，three.js 只会打印一条警告并忽略它。

### 第 3 步：舒适度——在演示期间暂停 `OrbitControls`（TODO 3）

`OrbitControls` 并不知道头显的存在。如果它在头显根据佩戴者自己的头部动作驱动相机的同时，仍然在监听拖动和方向键，两者就会互相争夺相机的朝向。`setPresenting(true)` 会禁用 `controls.enabled`；`setPresenting(false)` 会在会话结束后把它重新打开。任何时刻都只有一个东西在驱动相机。

### 第 4 步：先重置视角，再请求会话（TODO 4）

`local-floor` 会话开始那一刻，相机的位置和朝向是什么，就会成为该会话地板高度原点的依据。如果一位学习者在点击「Enter VR」之前已经拖动过桌面视图，戴上头显后就可能面朝一个随意、甚至令人迷失方向的方位。先调用 `app.resetView()`，能保证每一次都是同样的坐姿安全起始姿态。

`navigator.xr.requestSession('immersive-vr', options)` 必须直接在一次真实、仍然有效的用户手势内部调用，比如按钮自身的 `click` 处理函数，并且在这条调用链中，之前不能有任何 `await`：这是 WebXR Device API 的**瞬时激活（transient activation）**规则，和阻止后台代码弹出弹窗的规则是同一个思路。`optionalFeatures: ['local-floor', 'bounded-floor']` 同时请求了这两者，但都不是必需的：即使某台头显既没有地板高度原点、也没有可追踪的活动区域，这个会话也必须照常工作。

### 第 5 步：`sessionstart` 和 `sessionend`（TODO 5）

这两个事件是 three.js 自己的：`renderer.xr` 会在一个会话真正开始或结束时派发它们。原始的 WebXR `XRSession` 对象本身根本没有「开始」事件，只有 `'end'`（`xr.js` 中用它来清空本地的 `session` 变量）。监听 `renderer.xr` 而不是监听 session 对象，能让一个地方统一负责告诉引擎、按钮和实时区域：模式已经变了。

### 第 6 步：显示按钮，或解释为什么不显示（TODO 6）

在页面加载时就检测一次 `supportsImmersiveVR()`，而不是等按钮被点击才做出反应，意味着没有头显的学习者永远不会看到一个点了也没用的按钮。`xr.js` 中的 `describeUnsupported()` 区分了「不支持」的两种不同原因：连接不安全（`window.isSecureContext` 为 `false`，此时无论设备如何，WebXR 都不可用），以及单纯没有兼容的浏览器或头显。每一条消息也都会说明，上面的展览在没有 VR 的情况下依然完全可用——因为事实确实如此。

### 第 7 步：VR 中的场景描述（TODO 7）

`describeExhibit()` 原本就会告诉屏幕阅读器用户展览里有什么、如何环顾四周。现在它还需要说明：当「环顾四周」意味着转动头部，而不是拖动或按方向键时该怎么说——因为头显改变了那些说明的含义。从 `app.isPresenting()` 读取的 `presenting` 标志，决定该添加哪一句话。

### 第 8 步：在 `main.js` 中把它们连接起来（TODO 8）

`main.js` 调用 `supportsImmersiveVR()`，根据结果显示或隐藏 `#xr-button`，在支持时调用 `initXR()`，并在 `sessionstart` 和 `sessionend` 时都更新 `#scene-description`，让它永不过时。`main.js` 本身不出现任何 three.js API 或 WebXR API：它只读取 `xr.js` 和 `app.js` 的结果，并更新页面。

## 关键代码解析

**`navigator.xr.isSessionSupported(mode)`** 返回一个 Promise，解析为 `true` 或 `false`，表示当前是否能创建该模式（`'immersive-vr'`、`'immersive-ar'` 或 `'inline'`）的会话；它要求安全上下文，并且在某些浏览器上可能直接拒绝（reject），而不是解析为 `false`。

**`renderer.xr.enabled`** 和 **`renderer.xr.setReferenceSpaceType(type)`** 都必须在会话开始之前设置；在演示期间修改参考空间类型只会打印一条警告。

**`renderer.xr.addEventListener('sessionstart' | 'sessionend', handler)`** 是 three.js 自己合成的事件，不属于原始的 WebXR `XRSession` 对象——它只有 `'end'`。

**`navigator.xr.requestSession('immersive-vr', { optionalFeatures })`** 必须在一次用户手势内部同步调用；`session.end()` 可以从你自己的代码里结束会话，头显自身的系统菜单也可以结束它，两种方式触发的都是同一个 `'end'` 事件。

**`renderer.setAnimationLoop(callback)`**——3.4 中已经用于桌面渲染循环——完全不需要为 WebXR 做任何改动：一旦某个会话被交给 `renderer.xr.setSession()`，three.js 就会开始按每个 XR 帧调用一次这个回调，而不是按每个浏览器帧调用一次。

## 3D 与 XR 无障碍

- 场景描述（`#scene-description`）会反映当前生效的视图，无论是桌面还是 VR，并在会话开始或结束的瞬间更新。
- 相机绝不会自行移动，无论是在屏幕上还是头显里：只有学习者自己的手、方向键或头部动作才能移动它。
- `local-floor`，加上 3.4 中已经选定的 1.6 米视线高度和 4.2 米观看距离，让整个 VR 体验在坐姿下也完全可用，头顶和身后都没有任何东西。
- VR 中的每一个可用操作（环顾四周）都有一个功能完全对等的替代方式：拖动、方向键，以及「Turn left」/「Turn right」按钮。
- 展览的信息同样存在于一份始终可见的 HTML 列表和一段始终可见的文字描述中，与 3.4 完全一样，无论 WebGL、WebXR 或头显是否可用。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| Enter VR 按钮的可见文字始终与它当前的功能一致 | 2.5.3、4.1.2 | 「Enter VR」和「Exit VR」都准确说明了接下来会发生什么，无论对视力正常的用户还是屏幕阅读器用户都是如此。 |
| `#xr-status` 是一个会播报会话变化的实时区域 | 良好实践 | 一位看不到头显画面的学习者，依然能听到发生了变化。 |
| 每一个 XR 操作都有非 XR 的替代方式 | 2.1.1 | 整个展览用鼠标、手指或键盘都能完全使用；VR 始终是可选的。 |
| 体验在坐姿下也能正常工作，没有任何东西超出舒适的触及范围或高于头部高度 | 良好实践 | 不是每个人都能站立、够到高处或自由转身。 |
| 相机绝不会移动，除非学习者移动它，无论是在屏幕上还是头显里 | 2.2.2 | 未经请求的运动会让人迷失方向，在 VR 中还可能引起真实的身体不适。 |
| 展览的内容以 HTML 的形式存在，而不仅仅存在于画布或头显内部 | 1.3.1 | 无论 WebGL、WebXR 或设备是否可用，这些信息都不会丢失。 |

## 性能注意事项

three.js 的 `WebXRManager` 已经替你处理了演示过程中对性能敏感的部分：会话激活期间，它会把渲染器的像素比设为 `1`，并按头显自身的帧缓冲区尺寸调整大小，会话一结束就恢复你页面自己的像素比和尺寸（已在 r186 源码中验证：本课没有任何代码需要做这两件事）。它不会替你处理的，是场景本身的一切：这个展览足够轻量（三个基础网格，没有贴图），立体渲染——渲染两个视图而不是一个——在这里代价不大。一个更重的场景就需要用到第三阶段性能课（3.6）中的全部内容，而且因为现在每帧要渲染两次而不是一次，代价还会加倍。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 忘记设置 `renderer.xr.enabled = true` | 会话能开始，但头显里什么都不会画出来 | 在任何会话可能开始之前，在 `app.js` 中设置一次 |
| 在点击处理函数中一次更早的 `await` 之后调用 `requestSession()` | 浏览器会拒绝它：瞬时激活已经过期 | 把它作为处理函数要做的第一件事 |
| 在原始 `XRSession` 对象上监听 `'start'` 事件 | 什么都不会发生；这个事件根本不存在于原始会话上 | 改为在 `renderer.xr` 上监听 `'sessionstart'` |
| 在演示期间保持 `OrbitControls` 处于启用状态 | 意外的拖动或按键会和头显自身的追踪互相干扰 | `setPresenting(false)` 的反面：在 `'sessionstart'` 时禁用它 |
| 在请求会话之前没有重置视角 | 学习者进入 VR 时可能面朝一个随意、令人迷失方向的方位 | 在 `requestSession()` 之前立刻调用 `app.resetView()` |
| 假定 `isSessionSupported` 解析为 `true` 就保证现在有头显接入 | `requestSession()` 仍然可能失败 | 始终用 try/catch 包裹 `requestSession()`，并显示其 `error.message` |

## 故障排查

**Enter VR 按钮始终不出现，即使在 Chrome 中也是如此。** 检查你是否在 `http://localhost` 或 `http://127.0.0.1` 上，而不是一个普通的网络 IP 地址：WebXR 需要安全上下文，在没有 HTTPS 的情况下，只有这两者算作安全。检查控制台里是否有一个来自 `isSessionSupported` 的被拒绝的 Promise。

**点击 Enter VR 没有任何反应，也没有报错。** `renderer.xr.enabled` 很可能从未被设为 `true`。检查 `app.js`。

**会话开始时，状态文字始终不更新。** 检查监听器是否绑定在 `renderer.xr` 上，而不是绑定在 `session` 对象上：只有 `renderer.xr` 会派发 `'sessionstart'`。

**`requestSession` 因安全相关的错误而被拒绝。** 这次调用发生得太晚了，是在点击处理函数自己的这一轮事件循环之外、经过一次 `await` 之后才发生的。把它移到 `enterVR()` 内部的第一行。

**Immersive Web Emulator 的面板是空的，或者页面忽略了它。** 在打开扩展的开发者工具面板并选择一个设备之后，重新加载页面：被模拟的 `navigator.xr` 是在每次页面加载时重新注入的。在 Firefox 中，这个扩展完全不可用；请为这个测试环节使用 Chrome 或 Edge。

**在我的手机上，按钮始终不出现。** 这通常是正确的，而不是一个 bug：大多数手机浏览器不会实现 `immersive-vr`，除非手机与一台兼容的头显配对（例如，通过一体机头显自带的浏览器）。页面的其余部分应该仍然作为普通的 2D/3D 展览正常工作。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：添加第二个 Enter VR 按钮，并与第一个保持同步。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：为你自己的语言或社区重新撰写 Enter VR 面板的文字，并可以选择性地替换成一件来自你自己文化的物品。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：把你自己的代码和 three.js 的 `VRButton` 进行对比，并在 `immersive-vr` 之外为 `immersive-ar` 做特性检测。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项。
2. 拍摄截图：桌面端展览、检测到 WebXR 支持前后的 Enter VR 面板，以及如果你用 Immersive Web Emulator 或头显测试过，还有模拟器自己的设备视图。
3. 把它们连同这个项目一起保存在你的学习日志和作品集中。等 XR Camp 社区上线后，也在那里分享它们。
4. 在你的学习日志中回答：为什么在请求会话之前重置视角对舒适度很重要？如果一节课跳过了这一步，学习者可能会遇到什么问题？

## 延伸阅读

- [W3C: WebXR Device API](https://www.w3.org/TR/webxr/)（英文）
- [MDN: WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)（英文）
- [MDN: `XRReferenceSpace`](https://developer.mozilla.org/en-US/docs/Web/API/XRReferenceSpace)（英文）
- [three.js 文档：`WebXRManager`](https://threejs.org/docs/#api/en/renderers/webxr/WebXRManager)（英文）
- [Immersive Web Emulator（GitHub）](https://github.com/meta-quest/immersive-web-emulator)（英文）

## 值得认识的女性

**Luciana Nedel** 是巴西 UFRGS 大学的正教授，自 2002 年以来一直在研究虚拟现实、沉浸式可视化和三维交互。她曾担任 IEEE VR 2025 的项目主席（Program Chair），并是 IEEE VR 2026 项目委员会的成员。

参考空间、会话事件和重置视角这些内容可能感觉像是水管一样的底层配管工作，但它们的存在，正是为了让像她研究的那类体验成为可能：人们如何在虚拟的、被追踪的空间中感知、移动和交互。本课在坐姿舒适度上做出的这些选择,只是她所研究的这个更宏大领域中一个微小而实际的片段。

> **编者注：发布前请核实。** 「值得认识的女性」中的人物信息必须以一手资料核实，并在可行时于课程上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

**WebXR Device API**——本课中 `navigator.xr` 背后的一切——由 W3C 的 Immersive Web Working Group 发布；截至 2026 年年中，它在通往「推荐标准（Recommendation）」的轨道上仍处于「候选推荐草案（Candidate Recommendation Draft）」阶段，还不是一份成熟的推荐标准，这也是本课选择做特性检测、而不是假定支持存在的原因之一。**安全上下文（secure context）**——WebXR 所依赖的「HTTPS 或 localhost」规则——是它自己的一份 W3C 规范，被许多浏览器 API 共用。Three.js 和它的 `WebXRManager` 本身并不是一个标准：它们是一个开源项目，在底层实现了这同一个 W3C API，这也是为什么像 `renderer.xr.setSession()` 这样的调用，能和 `navigator.xr.requestSession()` 如此直接地对应起来。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
