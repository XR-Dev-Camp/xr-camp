# Advanced PWA and Offline Spatial Delivery

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `full-stack-spatial` · **课时：** `advanced-pwa-and-offline-spatial-delivery-07` · **时长：** 约 10 小时 · 14 次学习，每次 45 分钟 · 每周 4 次，约 4 周

---

> 让一个空间应用可以安装，并在网络时断时续的情况下依然能够使用。

---

## 学习目标

完成本项目后，你将能够：

1. 构建一个可下载的「场景包」（scene bundle），以一个清单 JSON 文件的形式列出它需要的每一个文件及其大小，并用这份清单在下载之前、期间和之后展示真实的进度。
2. 在支持的地方，用源私有文件系统（Origin Private File System，OPFS）存储大型二进制文件，在不支持的地方回退到 Cache API，同时不改变应用其余部分读取一个已保存文件的方式。
3. 用 `navigator.storage.estimate()` 读取一个页面自己的存储用量和配额，并用 `navigator.storage.persist()` 请求浏览器保护这份存储、不被自动清除。
4. 用 `AbortController` 干净地取消一次正在进行的下载，并在不重新下载已保存文件的情况下恢复一次被中断的下载。
5. 在支持的地方使用后台同步 API（Background Sync API），在其他任何地方都回退到窗口的 `online` 事件，让一次被暂停的下载在连接恢复后能够完成。
6. 添加一个在大文件下载前请求确认的低数据模式，以及一个可配置的资源基础 URL，让一所学校或一个社区能够托管一个项目文件的自己的区域镜像。
7. 对本课使用的每一个存储或网络 API，解释（依据 MDN）当前哪些浏览器支持它，以及在某个浏览器不支持时，应用会转而做什么。

## 先决条件

- **课程 4.6：渐进式 Web 应用**——本课复用它的 service worker 安装/激活模式，以及它的低数据模式理念。
- **课程 3.5：three.js 交互、资源与动画**——本课直接复用它的展品、它的两个 glTF 模型，以及它们的版权说明。
- 来自课程 4.4 的、对 `async`/`await`、`fetch` 和 `Promise.allSettled` 的熟悉程度。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 一个现代浏览器（推荐 Chrome 或 Edge，以看到每一项功能正常工作；Firefox 和 Safari 也能用，有相应的回退方案） | 测试下载、存储和离线行为 | 免费 |
| 一个文本编辑器（例如 VS Code） | 编写代码 | 免费 |
| 一个本地静态文件服务器（例如 Python 内置的 `python3 -m http.server`，本课程其他地方已经用过） | Service worker、OPFS 和后台同步都需要一个安全上下文；`http://localhost` 和 `http://127.0.0.1` 都算作满足这个条件 | 免费 |

这个项目不会调用任何外部服务，也不需要任何账户、API 密钥或 npm 包：它下载的每一个文件，都由和页面本身相同的静态服务器提供，除非你自己配置了一个不同的资源基础 URL（见「你将构建什么」）。这里的任何东西都不会受到中国大陆网络状况的影响，因为没有任何东西离开过你自己的机器。

## 你将构建什么

课程 4.6 给了学习周天气面板一个 service worker 和一个低数据模式。课程 3.5 给了这个展品两个真实的 glTF 模型，用 `GLTFLoader` 加载。本课把这两个想法结合成了一个单独一个都做不到的东西：一个小型的**离线场景包**库——一份说明一个场景的文件及其大小的清单，一个带有真实进度和能正常工作的**取消**按钮的**下载以供离线使用**按钮，以及一个**存储面板**，它显示这个项目正在使用多少空间，并让你能够请求浏览器保留它。一旦一个包下载完成，它的场景页面（`scene.html`）就能在完全没有网络连接的情况下工作，方式是从源私有文件系统（OPFS）中把它的模型读回来——或者，在一个没有 OPFS 的浏览器上，改为从 Cache API 中读取。

两个更小的、相关的功能让本课更加完整：一个**低数据模式**，在一次大文件下载开始前先询问；以及一个**可配置的资源基础 URL**，让一所网络缓慢或被屏蔽、无法访问更广阔互联网的学校或社区，能够托管一份这个项目 `assets/` 文件夹的自己的副本（一个「区域镜像」），并让这个页面指向它，而不需要对代码做任何其他改动。

参考答案在 [`completed/`](completed/) 中；起始代码有 **18 个编号的 TODO**，分布在十个小型的、单一职责的模块中（`js/mirror.js`、`js/manifest-loader.js`、`js/bundle-store.js`、`js/storage-panel.js`、`js/download-manager.js`、`js/low-data.js`、`js/background-sync.js`、`js/bundles-ui.js`、`js/main.js`、`sw.js`），再加上 `js/scene-main.js` 中的一个，离线的故事就在那里被串联起来。`js/scene-loader.js`、`js/scene-exhibit.js`、`js/scene-describe.js` 和 `js/scene-app.js` 都延续自课程 3.5，已经完成，好让本课能专注于交付方式，而不是 3D 视图本身。

## 文件夹说明

```text
07-advanced-pwa-and-offline-spatial-delivery/
├── README.md
├── starter/                  # begin here
│   ├── index.html, scene.html, offline.html, styles.css, manifest.webmanifest
│   ├── sw.js                  # TODO 17
│   ├── data/
│   │   ├── bundles.json        # the bundle catalogue — finished
│   │   └── bundles/history-exhibit.manifest.json  # finished
│   └── js/
│       ├── mirror.js            # TODO 1
│       ├── manifest-loader.js    # TODO 2
│       ├── bundle-store.js        # TODO 3, 4, 5
│       ├── storage-panel.js        # TODO 6, 7
│       ├── download-manager.js      # TODO 8, 9
│       ├── low-data.js               # TODO 10
│       ├── background-sync.js         # TODO 11, 12
│       ├── bundles-ui.js               # TODO 13
│       ├── main.js                      # TODO 14, 15, 16
│       ├── scene-loader.js, scene-exhibit.js, scene-describe.js, scene-app.js  # finished, from 3.5
│       └── scene-main.js                 # TODO 18
├── completed/                # reference solution
├── assets/                    # Fox.glb, CesiumMilkTruck.glb — copied from 3.5
├── challenges/                # Three challenges: Foundation is required
├── tests/                     # self-review checklist
└── screenshots/
```

## 环境配置

1. 从仓库根目录，如果还没有静态服务器在运行，就启动一个：`python3 -m http.server 8766 --bind 127.0.0.1`。
2. 打开 `http://127.0.0.1:8766/full-stack-spatial/07-advanced-pwa-and-offline-spatial-delivery/starter/index.html`。
3. 打开开发者工具 > Application > Service Workers，在你工作的时候勾选**Update on reload**，这样一个旧的 service worker 就永远不会遮住你的改动。
4. 包列表、存储面板和设置都会立即出现；在 TODO 1 完成之前，下载一个包会失败（它的文件解析到了错误的地址）——这是预期之内的，也正是你应该从哪里开始的地图。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 阅读这份分步讲解；运行上面的环境配置步骤；把起始代码中的每个文件都打开看一遍。 | 一个正在运行的页面，它的包列表和存储面板已经显示出了一些内容，以及前方每一个 TODO 的一份清单。 |
| 2 | TODO 1：`js/mirror.js` 的 `getAssetBaseUrl`、`setAssetBaseUrl` 和 `resolveAssetUrl`。 | 在「Asset base URL」中输入一个 URL 并点击 Save，然后重新加载，会显示回同一个值。 |
| 3 | TODO 2：`js/manifest-loader.js` 的 `fetchCatalog` 和 `fetchBundleManifest`。 | 「History exhibit」卡片会带着它真实的文件数量和总大小出现。 |
| 4 | TODO 3：`js/bundle-store.js` 的 `supportsOPFS` 和 `saveFile`。 | 点击 Download 会保存真实的文件；开发者工具 > Application > Storage（或 Cache Storage）中能看到它们出现。 |
| 5 | TODO 4：`js/bundle-store.js` 的 `readFileUrl`；TODO 5：`deleteBundle`。 | 「Delete bundle」会移除已保存的文件，再次下载会从零重新获取它们。 |
| 6 | TODO 6：`js/storage-panel.js` 的 `readStorageEstimate`；TODO 7：`requestPersistence`。 | 存储面板会显示一个真实的用量数字，它会在一次下载之后增长，持久化按钮也会报告一个真实的结果。 |
| 7 | TODO 8：`js/download-manager.js` 的 `readWithProgress` 和 `downloadBundle`。 | 进度条会在一个模型下载时平滑移动，而不是从 0% 直接跳到 100%。 |
| 8 | TODO 9：`js/download-manager.js` 的恢复队列（`queueForResume`、`readQueue`、`clearFromQueue`）。 | 在下载中途断网（开发者工具 > Network > Offline）再重新联网，会恢复下载，而不会重启已经完成的文件。 |
| 9 | TODO 10：`js/low-data.js`。 | 开启低数据模式开关后，下载（超过 300 KB 的）历史展览包会先请求确认。 |
| 10 | TODO 11：`js/background-sync.js` 的 `supportsBackgroundSync` 和 `registerResume`；TODO 12：`watchForResume`。 | 「How offline downloads keep going」部分会正确说明你的浏览器是否支持后台同步。 |
| 11 | TODO 13：`js/bundles-ui.js` 的 `updateBundleCard`。 | 每一种状态（未下载、下载中、已下载、已暂停）都会显示各自正确的文字和按钮。 |
| 12 | TODO 14：`js/main.js` 的 `startDownload`。 | 从点击按钮开始，一次完整的下载、一次取消，以及一次断网后的恢复，全部端到端正常工作。 |
| 13 | TODO 15 和 TODO 16：`js/main.js` 的存储面板和镜像设置接线；TODO 17：`sw.js` 的 `sync` 处理函数；TODO 18：`js/scene-main.js` 的 `resolveModelUrl`。 | `scene.html` 会优先从你离线下载的包中加载它的模型，完全不发出任何网络请求——用开发者工具 > Network > Offline 来确认这一点。 |
| 14 | 从头到尾完成 [`tests/checklist.md`](tests/checklist.md)；完成必做的[基础挑战](challenges/challenge-1.zh-Hans.md)；再完成一个拓展挑战，然后**提交作业**。 | 检查清单中的每一项都已勾选，你自己的一个小拓展，以及一个可以展示的项目。 |

### 第 1 步：阅读清单的形状（暂时没有 TODO）

在写任何东西之前，先打开 `data/bundles/history-exhibit.manifest.json`。注意它只列出了两个文件，每一个都有一个 `path` 和一个真实的 `bytes` 数量——没有 URL，没有源。这是刻意的：一份清单描述的是一个包包含*什么*，绝不是从*哪里*获取它。「哪里」是 `js/mirror.js`（第 2 步）唯一的职责，这正是让一个区域镜像之后能够存在、而不需要触碰任何一份清单的原因。

### 第 2 步：资源基础 URL（TODO 1）

`js/mirror.js` 会把一个像 `"Fox.glb"` 这样的裸文件名，解析成相对于当前所配置的基础 URL——默认是这个项目自己的 `../assets/` 文件夹，或者，如果设置了一个镜像，就是 `localStorage` 中保存的一个 URL。按照文件中的注释，完成 `getAssetBaseUrl`、`setAssetBaseUrl` 和 `resolveAssetUrl`。一个镜像是一个不同的源，因此它必须发送 CORS 响应头，`fetch()` 才能读取它的响应——这和课程 5.1 为任何 API 讲解过的同一条跨源规则。

### 第 3 步：加载目录（TODO 2）

`js/manifest-loader.js` 的 `fetchCatalog` 读取 `data/bundles.json`（永远来自这个项目自己的服务器，绝不通过一个镜像——只有一个包自己的*文件*才可以被镜像）；`fetchBundleManifest` 读取一个包自己的清单。两者都是普通的 `fetch()` 调用，各自只有一项职责：获取、检查 `.ok`、解析 JSON、返回它。

### 第 4 步：把一个文件保存到 OPFS 或 Cache API 中（TODO 3）

`js/bundle-store.js` 的 `supportsOPFS()` 会在任何东西尝试使用它之前，先检查 `navigator.storage.getDirectory` 是否存在——绝不要凭浏览器的名称或版本就假设它拥有某项功能。`saveFile` 接着会选择一个存储方式：在可用时使用 OPFS 的 `createWritable()` 流，在不可用时改为在一个命名的 `Cache` 中使用一对 `Request`/`Response`。这个函数之上的一切——下载逻辑、界面——都完全不需要知道实际发生的是哪一种。

### 第 5 步：读回一个文件，并删除一个包（TODO 4、TODO 5）

`readFileUrl` 是 `saveFile` 的逆过程：给定一个包的 id 和一个路径，它会返回一个可以交给任何想要这个文件的东西（一次 `fetch`、一个 `<img>`，或者——在 `scene-main.js` 中——`GLTFLoader`）的 `blob:` URL，先尝试 OPFS，再尝试缓存。`deleteBundle` 会无条件地从两种存储中都移除一个包的文件，因为一个在浏览器更新改变了 OPFS 支持情况之前下载的包，可能会分散在两者之中。

### 第 6 步：存储面板（TODO 6、TODO 7）

`js/storage-panel.js` 封装了 `navigator.storage` 上的两个方法：`estimate()`，它报告这个源正在使用多少字节，以及它大致的配额；`persist()`，它请求浏览器不要在磁盘压力下自动清除这份存储。两者都先经过功能检测——`estimate()` 得到广泛支持，Safari 从 15.2 版本（2021 年 12 月）起支持 `persist()`，而且无论如何浏览器都可以拒绝这个请求，因此 `requestPersistence()` 总是报告实际发生的情况，而不是假设成功。

### 第 7 步：带进度的下载（TODO 8）

`readWithProgress` 用 `getReader()` 读取一次 `fetch` 响应的响应体，而不是直接调用 `.blob()`，这样它就能在字节真正到达时报告真实的进度；`downloadBundle` 对每个文件调用它一次，把每个文件的字节数累加到一个总数中，并在一个文件完成后调用 `saveFile`（第 4 步）。有一个细节值得读两遍：在获取每一个文件*之前*，它会先检查 `readFileUrl`（第 5 步）是否已经保存了一份副本，如果是，就直接跳过它。

### 第 8 步：恢复队列（TODO 9）

第 7 步中那个「如果已保存就跳过」的检查，同时也是恢复一次被中断的下载的全部机制：`queueForResume` 只是在一次下载因为不是刻意取消的原因而失败时，把这个包的 id 记在 `localStorage` 中；之后恢复它（第 12 步，以及 `background-sync.js`）不过是再次调用 `downloadBundle`——每一个已经保存的文件都会被自动跳过，只有缺失的那些才会被重新获取。

### 第 9 步：低数据模式（TODO 10）

在概念上延续自课程 4.6，在那里它会完全隐藏 3D 时刻。而在这里，3D 内容*就是*那次下载本身，因此 `lowDataPreferred()` 改为在 `main.js`（第 12 步）中触发一次确认：一个选择了节省流量的学习者，依然可以逐个文件地决定某一次具体的下载是否值得。

### 第 10 步：后台同步，及其回退方案（TODO 11、TODO 12）

`supportsBackgroundSync()` 检查 `'serviceWorker' in navigator && 'SyncManager' in window`——根据 MDN 目前的浏览器支持表，这只在基于 Chromium 的浏览器中实现。`registerResume()` 会请求 service worker 在浏览器判断连接已经恢复时触发一个 `sync` 事件，即使那时这个应用的每一个标签页都已经关闭；`watchForResume()` 会监听那个事件所发送的消息（见第 13 步），并且——在每一个浏览器上，包括完全没有后台同步的浏览器——也会直接监听窗口的 `online` 事件，它只需要有一个标签页打开着。

### 第 11 步：展示包的真实状态（TODO 13）

`updateBundleCard` 是纯粹的 DOM 操作：给定一个状态对象（`idle`、`downloading`、`downloaded` 或 `error`），它会显示正确的按钮，写出正确的文字，包括那条移动中的进度条的值，以及一个准确的字节数。它从不调用 `fetch`、存储，或者 service worker 本身——正是这种分离，让第 12 步的 `startDownload` 能够改变*发生了什么*，而这个函数永远不需要改变*它是如何被展示的*。

### 第 12 步：接通下载按钮（TODO 14）

`main.js` 的 `startDownload` 把第 2-11 步串联起来：检查低数据模式，创建一个 `AbortController`，调用 `downloadBundle`，把 `onProgress` 接到 `updateBundleCard` 上，并处理一次失败的两种不同结果——`error.name === 'AbortError'`（一次刻意的取消：重置卡片，不把任何东西加入队列），对比任何其他错误（一次真正的失败：把这个包加入恢复队列，并在后台同步可用时请求它帮忙）。

### 第 13 步：完成设置、唤醒调用和离线场景（TODO 15、TODO 16、TODO 17、TODO 18）

四个小而独立的部分收尾了本课：`main.js` 的 `renderStoragePanel` 及其镜像设置按钮的处理函数（第 6 步和第 2 步，现在显示在屏幕上）；`sw.js` 的 `sync` 事件监听器，它会告诉每一个打开的页面再次尝试 `resumeQueuedDownloads()`；以及 `scene-main.js` 的 `resolveModelUrl`，它会在回退到 `resolveAssetUrl`（第 2 步）之前先尝试 `readFileUrl`（第 5 步）。最后这个函数，正是之前每一步真正开花结果的地方：它就是「已下载」和「在完全没有网络的情况下也能工作」之间的那唯一一行代码。

## 关键代码解析

- **一份清单描述文件；`mirror.js` 决定它们存在哪里。** `data/bundles/*.manifest.json` 中的任何内容都不会指名一个服务器。正是这种分离，让一个区域镜像得以存在：改变一个保存的 URL，每一个包的文件就都会解析到一个不同的源，不需要触碰任何清单、下载代码或存储代码。
- **「如果已保存就跳过」就是整个恢复机制。** `downloadBundle` 在获取每一个文件之前都会检查 `readFileUrl`。这个项目中的任何地方都没有一条独立的「恢复」代码路径——一次全新的下载调用和一次被恢复的下载调用是同一个函数调用，唯一的区别在于它发现了多少个文件已经被保存过。
- **两种存储，一个接口。** `bundle-store.js` 是唯一一个知道某个具体浏览器是否拥有 OPFS 的文件。其他一切——下载逻辑、界面、`scene-main.js`——都调用 `saveFile` 和 `readFileUrl`，从不询问是哪一种存储做出了回应。
- **特性检测，而不是浏览器检测。** 本课中每一个可选的 API（`navigator.storage.getDirectory`、`navigator.storage.persist`、`'SyncManager' in window`）都被直接检测，并配有一个能正常工作的回退方案，而不是根据一个浏览器的名称或版本去猜测——这是唯一一种能在浏览器随时间推移不断增加支持的过程中始终保持正确的做法。
- **进度需要响应体本身，而不是 `.blob()`。** `readWithProgress` 一块一块地读取一次 fetch 响应的流，专门是为了让 `onProgress` 能在一个大文件仍在到达途中时报告真实的数字；一次单纯的 `.blob()` 调用，在整个文件已经全部进入内存之前，完全不会给出任何进度。
- **对 `GLTFLoader` 来说，一个 `blob:` URL 和一个网络 URL 是无法区分的。** `scene-main.js` 中的 `resolveModelUrl` 可以返回这两种中的任意一种，`GLTFLoader.load()` 从来不需要知道是哪一种——「这个东西能不能离线工作」这整个问题，最终都归结为那一个函数返回了哪一个 URL。

## 3D 与 XR 无障碍

- **场景描述。** `#scene-description`（`scene-describe.js` 的 `describeExhibit`）由 3D 视图所渲染的同一个 `items` 数组构建而成，并且每当一个模型完成加载、失败，或者连接状态改变时都会更新（WCAG 1.1.1、1.3.1）。
- **每一种交互都有键盘路径。** 「Turn left」「Turn right」和「Reset view」不需要鼠标就能到达这个场景提供的每一种相机移动；拖拽画布只是环顾四周的一种方式，绝不是唯一的方式。
- **3D 视图的一个 2D 孪生体。** `#exhibit-list` 用普通文字说明每一个物件及其当前状态（加载中、已加载或已失败），始终存在，而不仅仅是在 WebGL 不可用时才存在。
- **减少动态效果与一个暂停控件。** 当设置了 `prefers-reduced-motion: reduce` 时，玉石的旋转以及每一个已加载模型自己的动画都会以暂停状态开始；**暂停动画**按钮（带有 `aria-pressed`）无论这个偏好设置如何都能正常工作。
- **舒适度。** 相机只会响应一次拖拽、一次按键，或者 Turn/Reset 按钮才会移动——绝不会自行移动，也绝不会因为一次下载完成或失败而移动。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 每一次下载的状态和进度都以文字形式、在一个 `role="status"` 元素中播报 | 1.4.1、4.1.3 | 一个看不到一条移动中的进度条的学习者，依然需要知道一次下载正在发生，以及它进行到了多远。 |
| 一次被暂停并加入队列的下载会用文字说明这一点，而不只是隐藏它的进度条 | 1.4.1 | 「Paused: will resume automatically」和「Not downloaded yet」绝不能只靠颜色或形状来区分。 |
| 每个用 `list-style: none` 设置样式的 `<ul>` 都保留 `role="list"` | 良好实践 | 否则 Safari 会从一个被去掉列表样式的 `<ul>` 中丢失列表语义。 |
| 每一个重复出现的按钮（每个包的「Download」「Cancel」「Delete」）都有一个可见的、作为其无障碍名称开头的标签 | 2.5.3 | 一个没有 `aria-label`、像「Download for offline: History exhibit」这样的 `textContent`，意味着可见的文字和被播报的文字是同一段文字。 |
| 动画尊重 `prefers-reduced-motion`，并提供一个暂停按钮 | 2.2.2 | 学习者没有要求的自行启动的动态效果，必须能够被停止。 |
| 每一种交互（设置、下载、取消、删除、环顾四周）都有一条键盘路径 | 2.1.1 | 本课中没有任何东西依赖鼠标或触摸。 |

## 性能注意事项

- **在获取任何东西之前，先报告清单自己的大小。** 包卡片会在它的清单一加载完成时，就显示一个真实的总大小——学习者能在真实文件的任何一个字节被移动*之前*，就决定是否要下载。
- **「如果已保存就跳过」避免的不只是浪费时间，还有浪费传输流量。** 每一次恢复或重复的下载调用，都会针对每个文件重新检查 `readFileUrl`，因此一条缓慢或按流量计费的连接绝不会被要求获取同一个文件两次。
- **`Content-Length` 驱动进度条，但没有它下载依然能正常工作。** 如果一个服务器（或一个镜像）没有发送它，`readWithProgress` 的 `total` 就是 `0`，进度条就干脆保持隐藏——一个缺失的响应头只会降低显示效果，绝不会影响下载本身。
- **OPFS 为了自身的好处，避免了一个大文件在内存中的第二份副本。** `createWritable()` 会把一个文件以流的方式写入磁盘；本课中没有任何东西会同时在内存中保留一个 370 KB 模型的两份完整副本，而一个大得多的真实世界模型在这里的影响会大得多。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 检查 `navigator.userAgent`（或者一个浏览器的名字）来决定 OPFS 或后台同步是否可用 | 一旦一个浏览器添加或移除支持，或者在一个你没想到要测试的浏览器上，就会立刻失效 | 每次都对实际的方法或接口做特性检测（`navigator.storage?.getDirectory`、`'SyncManager' in window`） |
| 调用 `response.blob()` 来下载一个带进度条的文件 | 在整个文件已经到达之前，进度条根本无法移动，完全违背了展示进度的初衷 | 用 `getReader()` 读取响应体，并在每一块数据到达时报告字节数 |
| 把 `AbortError`（一次刻意的取消）当作和一次网络失败一样处理 | 一个点击了取消的学习者，会看到自己的下载被「暂停」，并在之后被悄悄重试，而不是真正停止 | 检查 `error.name === 'AbortError'`，并对这种情况跳过恢复队列 |
| 手动构建一个包的文件 URL，把镜像的源混进清单或下载代码中 | 之后修改资源基础 URL，就意味着要找到并修复每一个构建过 URL 的地方 | 让每一个文件 URL 都只通过 `mirror.js` 的 `resolveAssetUrl` 解析，不在任何其他地方解析 |
| 假设一个没有 OPFS 的浏览器完全没有离线存储 | 在 111 之前的 Firefox 版本，或者在 Safari 上，一整项功能被不必要地禁用 | 回退到 Cache API，它在任何有 service worker 的地方都得到支持 |

## 故障排查

**一个包的模型立刻显示「failed to load」。** 在 TODO 1 完成之前，`resolveAssetUrl` 还没有被实现，因此文件会解析到错误的地址。这在第 2 步之前是预期之内的。

**下载全程都显示 0%，然后突然跳到 100%。** `readWithProgress`（TODO 8）还没有完成，或者服务器响应缺少一个 `Content-Length` 响应头——检查网络面板中那个文件的响应头。

**「This browser does not support requesting persistent storage.」** Safari 从 15.2 版本起才实现 `persist()`；浏览器也可能根据自己的启发式规则拒绝这个请求。这并不是出了问题；只是这份存储没有像在其他地方那样，得到不被自动清除的保护。

**一次被取消的下载依然出现在恢复队列中。** 检查 `startDownload` 的 `catch` 代码块是否把 `error.name === 'AbortError'` 和其他任何错误区分开——只有一次真正的失败才应该调用 `queueForResume`。

**断网之后重新打开 `scene.html` 依然尝试联网。** 确认 `resolveModelUrl`（TODO 18）是在 `resolveAssetUrl`*之前*、而不是之后检查 `readFileUrl`，并且确认这个包确实已经完成了下载（检查存储面板的用量数字，或者开发者工具 > Application）。

**Service worker 的改动似乎没有生效。** 在开发者工具 > Application > Service Workers 中勾选**Update on reload**（Firefox：`about:debugging#/runtime/this-firefox`；Safari：Develop 菜单下的 Service Workers 子菜单），或者手动注销旧的 worker。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：在一个包的下载完成、甚至在它开始之前，就展示出它各个独立文件中哪些已经被保存过。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：围绕来自你自己社区的某件东西，用你自己的语言，构建你自己的一个小型场景包。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：用 HTTP 范围请求恢复单个被中断的文件，而不只是跳过整个已经完成的文件。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md)。
2. 拍摄截图：包列表在下载中途、其进度条可见的样子，一次成功下载之后的存储面板，以及在开发者工具设置为 Offline 的情况下运行的历史展览场景。
3. 把它们保存在你的学习日志和作品集中。也可以和其他开发者分享：参见[在哪里分享你的作品和寻求帮助](../../docs/en/community.md)（英文）。
4. 学习日志问题：本课总是先尝试一个离线保存的文件，然后才尝试网络（`resolveModelUrl`）。在一个你经常使用的真实应用中（一个地图、一个消息应用、一个音乐播放器）找出另一个地方，你认为同样的「先用已保存的副本，再用网络」的顺序，会让它在一条糟糕的网络连接下明显更好用。那个应用需要存储什么，它又会如何知道自己保存的副本已经过时了？

## 延伸阅读

- [MDN: Origin private file system](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system)（英文）
- [MDN: Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache)（英文）
- [MDN: Background Synchronization API](https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API)（英文）
- [MDN: StorageManager](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager)（英文）
- [MDN: Using readable streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams)（英文）

## 值得认识的女性

**Africa Flores-Anderson**（África Flores）是一位危地马拉遥感科学家。她曾为 SERVIR（NASA 与 USAID 联合开展的地球观测项目）工作，并领导了一个由微软和《国家地理》的「AI for Earth」资助的项目，利用卫星数据和机器学习来监测和预测阿蒂特兰湖的藻华。2020 年，她被 Geospatial World 评为年度地理空间女性冠军（Geospatial Woman Champion of the Year）。

卫星数据只有在到达真正需要它的人手中时才有帮助，而这些人往往身处缓慢或不可靠的网络连接之下。像你在本课中所做的那样，把大型空间数据打包成可以一次下载、离线使用的形式，正是同一份工作的一部分。

_资料来自公开来源，于 2026 年核实。发现错误？[告诉我们](https://github.com/XR-Dev-Camp/xr-camp/issues)。_

## 标准聚焦

Cache API 以及依赖它的 Service Workers 规范，由 W3C Web Applications 工作组维护，遵循 W3C 通常的推荐标准（Recommendation）流程。源私有文件系统（本课使用的 File System API 的那一部分）和后台同步 API 走了一条不同的路：两者都最初是 WICG（Web 孵化社区组，Web Incubator Community Group）内部的提案，这是一个更轻量级的场所，浏览器厂商用它来在一项功能——如果真的会发生的话——进入正式标准轨道之前先开发和测试它。这种流程上的差异，是本课的支持说明对 OPFS 和后台同步比对 Cache API 谨慎得多的一个真实、实际的原因（尽管不是唯一的原因）：一项功能的标准状态和它跨浏览器的支持情况往往是同步推进的，这正是为什么本课会去查阅 MDN 当前的兼容性表格，而不是仅仅相信一个 API 的名字听起来有多「正式」。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
