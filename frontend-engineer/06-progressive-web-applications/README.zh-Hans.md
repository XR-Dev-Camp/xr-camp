# 渐进式 Web 应用

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `frontend-engineer` · **课时：** `progressive-web-applications-06` · **时长：** 约 12 小时 · 16 次学习，每次 45 分钟 · 每周 4 次，约 4 周

---

> 把之前的一个应用改造成一个可安装、支持离线的 PWA。

---

## 学习目标

完成本项目后，你将能够：

1. 解释是什么让一个网站成为**渐进式 Web 应用**（PWA）：一个清单文件（manifest）、一个 Service Worker，以及一个安全上下文。
2. 编写一份 **Web 应用清单**，包含名称、颜色、启动地址和图标，其中包括一个**可遮罩（maskable）**图标。
3. 注册一个 **Service Worker**，并遵循它的生命周期：安装（install）、等待（waiting）、激活（activate）。
4. 把应用外壳（app shell）**预缓存**到一个带版本号的缓存中，并**优先从缓存**中响应请求。
5. 为实时数据选择一种缓存策略（**带超时的网络优先**），并解释原因。
6. 显示一个**离线页面**，而不是浏览器自带的错误页；并在新版本激活时删除旧的缓存。
7. 礼貌地提供更新：「有新版本可用」，附带一个**刷新**按钮，绝不擅自刷新页面。
8. 用**低流量模式**来照顾网络慢或流量贵的用户。
9. 诚实地解释一个 PWA 目前在哪些地方**可以安装**，在哪些地方还不行。

## 先决条件

- **课程 2.4：API、JSON 与异步应用**（你将要改造成应用的天气仪表盘；`fetch`、`async` 和缓存）。
- **课程 2.3：应用架构**（一个文件一个职责）。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 一个基于 Chromium 的浏览器：Chrome 或 Microsoft Edge（两者在中国大陆均可使用） | **Application** 面板能显示清单文件、Service Worker 和每一个缓存 | 免费 |
| Firefox（可选） | 提供第二种视角：它的 **Application** 面板也能显示清单和 Service Worker，`about:debugging` 会列出每个 worker | 免费 |
| VS Code 和本地服务器 | Service Worker 只能在 `https://` 页面上运行，或者在 `http://localhost` 和 `http://127.0.0.1` 上运行 | 免费 |
| 一部手机（可选） | 在真实设备上测试安装和离线功能 | 免费 |
| [Open-Meteo](https://open-meteo.com/) | 天气预报：无需密钥，无需账号 | 非商业用途免费 |

**如果 Open-Meteo 在你所在地区较慢或被屏蔽**，像课程 2.4 一样勾选**使用示例数据**。本课的一切（清单、Service Worker、缓存、更新流程）都能配合示例数据正常工作。

## 你将构建什么

**My XR Camp** 的第六部分：把课程 2.4 中的**学习周天气仪表盘**变成一个**应用**。它可以在没有网络的公交车上、Wi-Fi 很差的图书馆里，或者这个月流量已经用完的情况下打开。它可以带着自己的图标停留在手机的主屏幕上。它对旧数据如实相告，提供更新时不会让人措手不及，还有一个**低流量模式**，可以跳过 1.3 MB 的 3D 库。

天气预报本身没有任何变化。这正是「渐进式（progressive）」这个词的含义：同一个网页，在支持更多功能的浏览器中变得更好，在不支持的浏览器中依然照常运行。

参考答案在 [`completed/`](completed/) 中。起始代码是完成好的课程 2.4 仪表盘，外加已完成的图标、一个离线页面，以及带有十五个 TODO 的新文件。

## 文件夹说明

```text
06-progressive-web-applications/
├── README.md            # 本指南
├── README.es.md         # 西班牙语
├── README.zh-Hans.md    # 简体中文
├── project.json         # 课时元数据
├── starter/
│   ├── index.html       # 仪表盘：TODO 1–2 在 <head> 中
│   ├── manifest.webmanifest   # 几乎是空的：TODO 1–2 负责填充
│   ├── icons/           # 已完成：SVG 和 PNG 图标，其中一个是可遮罩的
│   ├── sw.js            # Service Worker：TODO 4–8, 10–11, 15
│   ├── offline.html     # 已完成：用于显示未被保存的页面
│   ├── js/pwa.js        # TODO 3, 12–13
│   ├── js/api.js        # TODO 9
│   ├── js/low-data.js   # TODO 14
│   ├── js/main.js, config.js, cache.js, forecast.js, view.js   # 已完成
│   ├── data/sample-forecast.json, styles.css                   # 已完成
│   └── 3d-moment.html   # 以 3D 柱状图呈现的预报，仅在需要时才加载
├── completed/           # 参考答案：最后再打开
├── challenges/          # 三个拓展挑战：基础挑战为必做
├── tests/checklist.md   # 提交前的自查清单
├── assets/
└── screenshots/
```

## 环境配置

1. 把起始代码复制到一个新文件夹 `weather-app` 中，并用 Git 提交它。（它就是你的课程 2.4 仪表盘，外加一些新文件。如果你愿意，也可以只把新文件复制进你自己的 `weather` 文件夹中。）
2. 启动本地服务器，并通过 `http://localhost` 或 `http://127.0.0.1` 打开 `index.html`。**不要**双击打开文件，也不要用你电脑的网络地址（比如 `http://192.168.1.20`）：Service Worker 需要一个**安全上下文**，而这两种方式都不是。
3. 打开开发者工具，找到 **Application** 面板（Chrome 和 Edge 都叫这个名字；在 Firefox 中也叫 **Application**，缓存在 **Storage** 里）。这节课你会一直待在这个面板里。
4. 仪表盘的表现和课程 2.4 中完全一样。这是预期中的：目前它还不是一个应用。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 环境配置；第 1 步：PWA 由什么构成 | 你已经找到了 Application 面板 |
| 2 | 第 2 步：清单文件（TODO 1） | 在 Manifest 区域看到你应用的名称和颜色 |
| 3 | 第 3 步：图标，以及可遮罩图标（TODO 2） | Manifest 区域中出现四个图标，没有任何警告 |
| 4 | 第 4 步：注册 Service Worker（TODO 3–4） | Service workers 中出现「activated and is running」 |
| 5 | 第 5 步：预缓存应用外壳（TODO 5） | Cache storage 中出现二十个文件 |
| 6 | 第 6 步：缓存优先（TODO 6） | 勾选 **Offline** 后页面依然能重新加载 |
| 7 | 第 7 步：离线页面（TODO 7） | 显示你的离线页面，而不是浏览器自带的错误 |
| 8 | 第 8 步：天气数据的网络优先策略（TODO 8） | 一份能在离线状态下、通过 Service Worker 加载出来的预报 |
| 9 | 第 9 步：如实告知数据的新旧（TODO 9） | 离线时显示「Saved by this app at 14:05」 |
| 10 | 第 10 步：版本与清理（TODO 10） | 修改 `VERSION` 后只剩一个外壳缓存 |
| 11 | 第 11 步：更新流程（TODO 11–12） | 「有新版本可用」，以及一个能正常工作的**刷新**按钮 |
| 12 | 第 12 步：安装（TODO 13） | 应用出现在你的电脑或手机上，或者为你的浏览器写下具体步骤 |
| 13 | 第 13 步：低流量模式（TODO 14） | 一个能隐藏 3D 时刻的开关 |
| 14 | **3D 时刻**（TODO 15） | 3D 柱状图能在离线状态下打开 |
| 15 | 第 14 步：在手机上测试，然后是 [`tests/checklist.md`](tests/checklist.md) | 一个经过测试的应用 |
| 16 | 一个拓展挑战，然后是**提交作业** | My XR Camp 的第一个可安装应用 |

### 第 1 步：PWA 由什么构成

**渐进式 Web 应用**就是一个普通网站外加三样东西：

| 部分 | 作用 |
| --- | --- |
| 一份 **Web 应用清单** | 一个很小的 JSON 文件：应用的名称、图标、颜色，以及它如何打开。正是它让浏览器能够提供安装选项。 |
| 一个 **Service Worker** | 一个独立于你页面运行的脚本，可以响应页面的请求：来自缓存、来自网络，或者用你写的一个页面来响应。正是它让应用能够离线运行。 |
| 一个**安全上下文** | 开发时是 `https://`，或者 `localhost` 和 `127.0.0.1`。Service Worker 能力很强，所以浏览器只允许它们运行在传输途中不会被篡改的页面上。 |

这里没有应用商店，没有需要批准的下载，也没有第二套代码库。同一个地址既能在浏览器标签页中打开，也能作为已安装的应用打开。

在 Application 面板中，看看 **Manifest**（「No manifest detected」）、**Service workers**（空的）和 **Cache storage**（空的）。到第 14 节课时，这三者都会被填满。

### 第 2 步：清单文件（TODO 1）

从 `index.html` 中链接这份清单，并把它填写完整：

```json
{
  "name": "Study-week weather - My XR Camp",
  "short_name": "Weather",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "theme_color": "#5b2a86",
  "background_color": "#fdfcf8"
}
```

- **`name`** 会在安装时出现；**`short_name`** 会显示在主屏幕图标下方那个空间很小的地方。
- **`start_url`** 是应用打开时显示的页面。**`scope`** 是属于这个应用的那部分网站：打开范围之外的页面，浏览器会用自己的工具栏来显示它。`"./"` 表示「这个文件夹」，以清单文件自身所在的地址为基准。
- **`"display": "standalone"`** 会让应用在自己的窗口中打开，不显示地址栏。
- **`theme_color`** 为标题栏上色；**`background_color`** 会在应用启动时填满屏幕。使用你样式表中的颜色，让启动过程感觉像是应用的一部分。

重新加载页面，打开 **Application > Manifest**。Chrome 会列出它读取到的内容，以及任何问题。

### 第 3 步：图标，以及可遮罩图标（TODO 2）

图标位于 `icons/` 中，用 SVG 绘制，并转换成了 PNG（参见 `ATTRIBUTION.md`）。基于 Chromium 的浏览器在提供安装选项之前，至少需要一个 192 像素和一个 512 像素的图标。

Android 会用自己的形状来绘制主屏幕图标：圆形、方圆形（squircle）、圆角矩形。普通图标会被缩小到一个白色的形状里。**可遮罩**图标会用颜色填满整个正方形，并把所有重要内容都保留在一个中心圆形内，这个圆形的半径是图标宽度的 40%：这就是**安全区域**。手机会裁掉其余的部分。

```json
{ "src": "icons/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
```

比较一下 `icon.svg` 和 `icon-maskable.svg`：除了注释之外，唯一的区别就是背景方块。可以在免费的 [Maskable.app editor](https://maskable.app/editor) 中试一试你自己的图标。

iPhone 和 iPad 使用页面中的 `<link rel="apple-touch-icon">` 来支持「添加到主屏幕」，所以也要把它加上。

### 第 4 步：注册 Service Worker（TODO 3–4）

在 `js/pwa.js` 中，先检查这项功能是否存在，再注册它：

```js
if (!('serviceWorker' in navigator)) return null;
const registration = await navigator.serviceWorker.register('sw.js');
```

`sw.js` 和 `index.html` 放在一起，所以它只能控制这个文件夹，而不能控制它上层的内容。然后，在 `sw.js` 中，记录 worker 自己的事件（TODO 4）。重新加载页面，观察 **Application > Service workers**：这个 worker 会先**安装**，然后**激活**。它的 `console.log` 消息会出现在它自己的控制台中：点击它旁边的 **inspect**（Firefox 中是 `about:debugging`，然后是 **This Firefox**）。

Service Worker 没有页面。它无法接触 DOM 或 `localStorage`。它通过**事件**与页面通信：`install`、`activate`、`fetch` 和 `message`。

### 第 5 步：预缓存应用外壳（TODO 5）

**应用外壳（app shell）**是应用打开时所需要的每一个文件：页面、样式、脚本、示例数据、图标。在 `install` 期间，把它们全部保存下来：

```js
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);   // "weather-shell-v1"
    await cache.addAll(SHELL);
  })());
});
```

`waitUntil` 的意思是「在这件事完成之前，不算安装完成」。哪怕只有一个文件失败，`addAll` 就会失败，安装本身也会失败：你永远不会得到一个只装了一半的应用。所以要仔细检查这个列表，并去 **Cache storage** 里看一看。

### 第 6 步：缓存优先（TODO 6）

现在来响应请求。对于应用外壳，使用**缓存优先**策略：先在缓存中查找；如果找到了，就使用它（立即返回，完全不经过网络）；如果没找到，就向网络请求。

```js
const saved = await caches.match(request);
return saved ?? fetch(request);
```

测试一下：在 **Application > Service workers** 中勾选 **Offline**（或者在 Network 面板中选择 **Offline**），然后重新加载页面。仪表盘打开了。天气预报来自课程 2.4 中的 `localStorage` 缓存。

**在开发过程中，要勾选 Update on reload。** 缓存优先意味着你对 `styles.css` 的修改不会生效：你看到的是已保存的旧副本。「Update on reload」会在每次重新加载时安装最新的 `sw.js`。

### 第 7 步：离线页面（TODO 7）

在离线状态下，打开一个没有被保存的页面，比如 `notes.html`。如果没有额外处理，浏览器会显示自己的错误页面，学习者会被卡住。对于**导航请求**（打开一个页面），要用已保存的页面、网络，或者 `offline.html` 来响应：

```js
if (request.mode === 'navigate') event.respondWith(pageOrOffline(request));
```

`offline.html` 用简明的语言说明发生了什么，并链接到那些确实能在离线状态下工作的页面。它包含在应用外壳中，不需要任何网络请求。

### 第 8 步：天气数据的网络优先策略（TODO 8）

天气预报和 `styles.css` 不一样：它每小时都会变化。所以针对 `api.open-meteo.com` 的请求要使用不同的策略——**带超时的网络优先**：

1. 先向网络请求。得到响应后，在 `weather-data` 缓存中保存一份副本，并使用它。
2. 如果网络请求失败，或者耗时超过 4 秒，就使用已保存的副本。
3. 如果没有已保存的副本，就等待网络响应，或者把错误继续向上传递，让页面显示自己的错误状态。

| 策略 | 适合什么场景 | 为什么这里不用 |
| --- | --- | --- |
| **缓存优先** | 只有在新版本发布时才会变化的文件 | 天气预报永远不会更新 |
| **过期重验证（stale-while-revalidate）**：先从缓存响应，再在后台更新缓存 | 稍微旧一点也没关系的内容：头像、新闻列表 | 第一次的响应永远是旧的，即使在联网状态下也是如此 |
| **带超时的网络优先** | 应该保持新鲜、但有旧数据总比什么都没有好的实时数据 | ✓ 尽可能新鲜；无法获取新数据时使用已保存的数据；绝不会无限期等待 |

超时机制在网速较慢时很重要：没有它的话，网络优先策略在放弃之前可能要等待很长时间。这里的四秒比页面自身从课程 2.4 中带来的八秒超时更短，这样 Service Worker 就总有机会帮上忙。

**首次访问是不受控制的。** 在 Service Worker 激活之前加载的页面，会把请求直接发送给网络。`clients.claim()`（第 10 步）能让 worker 立即接管，但已经开始的请求已经无法挽回。联网时重新加载一次，再测试离线状态。

### 第 9 步：如实告知数据的新旧（TODO 9）

一份已保存的预报可能是一天前的数据。如果 Service Worker 在不作声明的情况下把它直接交出去，仪表盘就会说「Live data… updated at 14:05」，而这并不是事实。所以，当它保存一个响应时，`stamp()` 会添加一个带有时间的响应头：`X-Saved-At`。在 `api.js` 中读取它：

```js
const savedAt = Number(response.headers.get('X-Saved-At')) || null;
```

`main.js`（已完成）会据此显示「Could not update. Saved by this app at 09:12.」。测试一下：在 Application 面板中清除 **Local Storage**，断开网络，再重新加载。老数据，只要说明自己是老数据，就是有用的。老数据假装是新数据，就没用了。

### 第 10 步：版本与清理（TODO 10）

当你修改应用外壳中的任何文件时，要修改 `sw.js` 中的 `VERSION`（比如从 `'v1'` 改成 `'v2'`）。每当有页面打开时，浏览器都会逐字节比较 `sw.js`；只要文件不同，就是一个**新版本**。它会在旧版本旁边安装，并填充 `weather-shell-v2`。

当新版本**激活**时，删除所有其他的外壳缓存：

```js
for (const name of await caches.keys()) {
  if (name.startsWith('weather-shell-') && name !== SHELL_CACHE) await caches.delete(name);
}
```

不要动 `weather-data`：已保存的预报在更新之后依然有效。如果没有这一步，学习者手机上会永远堆积着每一个版本的数据。

### 第 11 步：更新流程（TODO 11–12）

在取消勾选 **Update on reload** 的情况下修改 `VERSION`，然后重新加载。新的 worker 会安装，然后**等待**：旧的 worker 依然控制着已打开的页面，在一个正在运行的页面下面替换文件可能会导致问题。Chrome 会在 Service workers 区域显示「waiting to activate」。

一个好的应用会通知学习者，并让*学习者自己*决定什么时候更新：

1. 在 `pwa.js` 中，检测一个处于 `waiting` 状态的 worker，或者一个在已经存在控制者的情况下达到 `installed` 状态的 worker（TODO 12）。
2. 在预报上方那个 `role="status"` 的元素中写入「A new version of this app is ready.」，并显示一个真正的 `<button>`：**刷新**。
3. 点击后，向正在等待的 worker 发送一条消息；它会调用 `self.skipWaiting()`（TODO 11）并激活。
4. 页面监听 `controllerchange` 事件，重新加载一次，此时就已经是新版本了。

这条消息会被屏幕阅读器朗读出来，而不会移动焦点（WCAG 4.1.3），并且在学习者主动要求之前，页面不会重新加载（3.2.5，一条值得遵循的 AAA 级标准）。一个正读到表格中间的学习者，绝不会因此丢失自己的位置。

### 第 12 步：安装（TODO 13）

安装会把应用放到主屏幕或应用列表中，并让它在自己的窗口中打开。具体的操作方式取决于浏览器，而且经常发生变化，所以要检查你自己使用的浏览器，不要承诺超出以下内容的事情：

| 位置 | 如何安装 |
| --- | --- |
| Android 上基于 Chromium 的浏览器（Chrome、Edge、三星浏览器等） | 浏览器菜单中的**安装应用**或**添加到主屏幕**。浏览器也可能会主动提供这个选项。 |
| 电脑上的 Chrome 和 Edge | 地址栏中的安装图标，或者浏览器菜单中的**安装** |
| iPhone 和 iPad | **分享**，然后**添加到主屏幕**。没有安装提示，也没有 `beforeinstallprompt`。 |
| 电脑上的 Firefox | 它不会根据清单文件安装 PWA。Windows 上较新的版本可以把一个网站作为「网页应用」固定到任务栏，这项功能仍在变化中。 |

只有基于 Chromium 的浏览器会触发 `beforeinstallprompt`，而且它还不属于一个已经完成的标准。所以安装按钮是一个**额外功能**：只有在这个事件到达时才会出现。而写好的操作步骤则始终显示在页面上，这样每个人都有办法安装。

```js
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();       // keep it for our own button
  deferred = event;
  button.hidden = false;
});
```

**在中国大陆**，许多 Android 手机没有 Google 服务，一些内置浏览器对 PWA 的支持也很有限：它们可能只会添加一个快捷方式，甚至根本不提供安装选项。但离线功能在任何支持 Service Worker 的浏览器中都能正常工作，而这正是在网络较弱时最重要的那部分。

### 第 13 步：低流量模式（TODO 14）

整个仪表盘，加上它的图标，体积不到 100 KB。3D 时刻用到的 A-Frame 库大约有 1.3 MB。对于用预付费套餐的用户来说，这不是一笔小数目。

1. **尊重设备的设置。** 一些浏览器，主要是基于 Chromium 的浏览器，会告诉你学习者是否要求节省流量：`navigator.connection?.saveData`。许多浏览器根本没有 `navigator.connection`，所以这里的 `?.` 是必不可少的。
2. **让学习者自己选择。** 一个复选框，**低流量模式**，保存在 `localStorage` 中。她的选择永远优先于设备的设置。

当它打开时，指向 3D 时刻的链接会被替换成一句说明原因的文字，3D 页面会在不下载 A-Frame 的情况下显示描述文字和表格，并附带一个按钮，允许用户仍然手动加载它。

### 第 14 步：在手机上测试

手机同样需要一个安全上下文，而 `http://192.168.…` 并不是。有两种免费的方式：

- **发布它**：用 GitHub Pages（课程 1.8），它使用的是 `https://`。GitHub 在中国大陆可能较慢或不太稳定；下一个选项完全不需要任何托管。
- **Android 和 Chrome**：用 USB 连接手机，在电脑上打开 `chrome://inspect`，使用 **Port forwarding（端口转发）**，让手机上的 `localhost:8080` 能连接到你的服务器。Edge 有同样的页面，地址是 `edge://inspect`。

在手机上：加载应用，然后打开飞行模式，再次打开它。安装它，并从主屏幕打开它。

## 关键代码解析

**`event.waitUntil(promise)`** 会让 worker 保持存活，同时让这一步保持未完成状态，直到这个 Promise 完成为止。没有它，浏览器可能会在缓存填充到一半时就停止这个 worker。

**`event.respondWith(promise)`** 表示「我要自己回应这个请求」。这个 Promise 给出的任何 `Response`，都会成为页面得到的响应。如果你从不调用它，浏览器就会照常处理这个请求。

**`response.clone()`。** 一个响应的正文只能被读取一次。要想既把它交给页面、又把它保存进缓存，就必须先克隆它。

**`caches.match(request)`** 会在这个源的所有缓存中查找。而 `cache.match` 只会在某一个缓存中查找。

**Service Worker 中的 `self`** 指的就是 worker 本身（这里没有 `window`）。`self.clients.claim()` 会立即接管已打开的页面；`self.skipWaiting()` 会停止等待。

**`Promise.race([network, timeout])`** 会以先完成的那一个作为结果。超时的 Promise 会以 `undefined` 完成，所以 `if (first)` 可以区分「网络已经响应」和「时间已经耗尽」这两种情况。

**`network.catch(() => {})`。** 如果超时先完成、我们已经从缓存中给出了响应，那么网络请求的 Promise 之后可能会在没有人监听的情况下失败。这个空的 `catch` 表示「没关系，我们已经处理过了」，这样控制台里就不会出现错误。

**`script.crossOrigin = 'anonymous'`** 把对 A-Frame 的请求变成一个 CORS 请求。`aframe.io` 会用 `Access-Control-Allow-Origin: *` 来响应，因此 Service Worker 会得到一个可以检查和保存的正常响应。如果没有这个设置，一个跨站的 `<script>` 请求会得到一个**不透明（opaque）**的响应：状态码是 `0`，正文不可读，也没有办法知道它是否失败了。不透明的响应是可以被缓存的，但你可能因此保存了一个错误页面，而且 Chromium 在计算你的存储占用时，会把每一个不透明响应算得比它的实际大小大得多。

## 3D 时刻

打开 [`completed/3d-moment.html`](completed/3d-moment.html)，然后断开网络再打开一次：同样的七根 3D 柱子，没有互联网也能显示。

有三件事让这一切成为可能：

1. **页面本身**和 `index.html` 一样，也在应用外壳中。
2. **库文件**：`sw.js` 会在安装期间预缓存 `https://aframe.io/releases/1.8.0/aframe.min.js`，除非设备要求节省流量。而 `cacheFirst` 会在页面第一次加载它时把它保存下来，所以只要在联网状态下打开过一次 3D 时刻，就永远够用了（TODO 15）。这个地址必须和 `config.js` 中的 `AFRAME_URL` 完全一致：对缓存来说，`1.8.0` 和 `1.8.1` 是两个不同的文件。
3. **数据**：预报数据是通过 Service Worker 的网络优先规则获取的，而示例数据也在应用外壳中，所以场景始终有内容可以显示。

这个页面加载 A-Frame 的方式也和课程 2.4 不同。`<head>` 中没有 `<script src>`：场景先存放在一个 `<template>` 中，只有当低流量模式关闭、或者学习者按下**加载 3D 场景**按钮时，脚本才会加载 A-Frame。之后，焦点会移动到场景描述上，这样就不会有人停留在一个已经消失的按钮上。

其余的一切都延续自课程 2.4：由同一份数据生成的场景描述、固定的摄像机、没有任何动效，以及作为 2D 孪生体的表格。在之后的课程中，一个 3D 模型（一个 `.glb` 文件）也会以同样的方式被缓存：预缓存列表中再多一个地址，占用你的体积预算中的一部分。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 「有新版本可用」被写入一个 `role="status"` 元素中 | 4.1.3 | 屏幕阅读器会朗读它，而不移动焦点。 |
| 只有当学习者按下**刷新**时，页面才会重新加载 | 3.2.5（AAA） | 不会出现意外的上下文变化。 |
| **刷新**、**安装**和**加载 3D 场景**都是真正的按钮 | 2.1.1, 4.1.2 | 键盘和屏幕阅读器都能使用它们。 |
| 更新提示位于页面内部，绝不会覆盖在页面之上 | 2.4.11 | 它不会遮挡住当前拥有焦点的控件。 |
| 按下**加载 3D 场景**后，焦点会移动到场景描述上 | 2.4.3 | 按钮消失时，焦点不会因此丢失。 |
| 离线状态和旧数据都用文字说明，并被朗读出来 | 4.1.3 | 「Could not update. Saved by this app at 09:12.」 |
| 3D 柱状图有文字描述，也有对应的表格，低流量模式下也是如此 | 1.1.1 | 信息绝不会只存在于 3D 场景中。 |

## 性能注意事项

Service Worker 让第二次访问几乎不需要任何成本：应用外壳中的每一个文件都来自缓存，完全不经过网络。只有天气预报数据（不到 1 KB）会真正传输。

预缓存也是有代价的：第一次访问需要下载整个应用外壳，即使其中有些页面学习者可能永远不会打开。要让应用外壳保持精简。这里的外壳在不包含 A-Frame 的情况下不到 100 KB，这也是为什么在设备要求节省流量时要把 A-Frame 排除在外的原因。查看 **Application > Storage**，了解你的应用占用了多少空间。

缓存优先策略只有在配合带版本号的缓存时才是安全的。每次修改应用外壳中的文件时都要修改 `VERSION`，否则学习者会永远运行着旧代码。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 以文件方式打开页面，或者用网络地址打开 | `navigator.serviceWorker` 不存在，或者注册失败 | 使用 `http://localhost` 或 `http://127.0.0.1`；在手机上使用 `https://` |
| 忘记修改 `VERSION` | 你的改动永远无法送达学习者 | 每次修改应用外壳时都要修改它 |
| `SHELL` 列表中的拼写错误 | `addAll` 失败，worker 永远无法安装 | 检查 worker 的控制台，修正路径 |
| 对实时数据使用缓存优先策略 | 天气预报永远不会更新 | 使用带超时的网络优先策略 |
| 网络优先策略没有设置超时 | 在网络较弱时会长时间显示「Loading…」 | 让网络请求和一个计时器进行竞速 |
| 在每次安装时都调用 `skipWaiting()` | 页面同时运行着新旧混杂的文件 | 等待学习者按下**刷新** |
| 在 `activate` 中删除所有缓存 | 每次更新都会导致已保存的预报数据消失 | 只删除旧的应用外壳缓存 |
| 未经思考就缓存一个 `no-cors` 响应 | 你可能保存了一个错误页面，而且占用大量空间 | 在服务器允许的情况下使用 CORS（`crossOrigin`） |
| 承诺在每一部手机上都能「安装」 | iPhone 或 Firefox 用户会觉得哪里出了问题 | 为每种浏览器提供书面的操作步骤；安装按钮只是额外功能 |

## 故障排查

**我对 `styles.css` 或某个脚本的修改没有生效。** Service Worker 正在从缓存中响应。工作时在 **Application > Service workers** 中勾选 **Update on reload**，或者修改 `VERSION`。

**worker 一直显示「waiting to activate」。** 某个已打开的标签页仍在使用旧版本。关闭该应用的其他标签页，在 Application 面板中按下 **skipWaiting**，或者完成 TODO 11–12 并按下**刷新**。

**报错 `Failed to register a ServiceWorker` / `SecurityError`。** 这个页面不是一个安全上下文。请使用 `localhost` 或 `127.0.0.1`。

**报错 `Failed to execute 'addAll' on 'Cache'` / `Request failed`。** `SHELL` 中的某个文件不存在。错误信息中的路径就是需要修正的地方。

**离线状态下，天气预报显示错误。** 页面在预报加载时还没有被 Service Worker 控制（参见第 8 步），也没有任何已保存的数据。联网状态下重新加载一次，再试一遍。

**没有出现安装按钮。** 它只会出现在基于 Chromium 的浏览器中，而且当应用已经安装时也不会出现。Chrome 还会先检查清单文件：打开 **Application > Manifest**，阅读其中的 **Installability** 消息。

**在隐私窗口中什么都不起作用。** 一些浏览器会在隐私窗口中限制 Service Worker 或存储功能。请使用普通窗口。

**我想完全从头再来一次。** **Application > Storage**（Chrome）中有 **Clear site data**，它会注销这个 worker，并删除所有缓存。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：一个「离线」徽章，以及一行版本信息，让你随时知道正在运行的是哪个版本。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：让这个应用成为你自己的：你自己的图标、颜色、名称，以及用你的语言写的离线页面。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：把另一个 My XR Camp 应用（课程地图、学习仪表盘，或计划器）也改造成 PWA，并比较各自的策略。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项。
2. 截图内容包括：带有你图标的 Manifest 区域、Cache storage、离线状态下的仪表盘显示数据有多旧、更新提示，以及离线状态下的 3D 时刻。如果你安装了这个应用，再截一张它在你主屏幕或应用列表中的图标。
3. 把它们保存在你的学习日志和作品集中。也可以和其他开发者分享：参见[在哪里分享你的作品和寻求帮助](../../docs/en/community.md)（英文）。
4. 在你的学习日志中回答：你认识的人当中，有谁会在网络较弱或流量昂贵的情况下使用这个应用？他们接下来还会需要什么？

## 延伸阅读

- [MDN: Progressive web apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)（英文）
- [MDN: Using Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)（英文）
- [MDN: Web app manifests](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest)（英文）
- [MDN: Making PWAs installable](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)（英文）
- [web.dev: Adaptive icon support in PWAs with maskable icons](https://web.dev/articles/maskable-icon)（英文）
- [web.dev: The offline cookbook](https://web.dev/articles/offline-cookbook)（英文）（更多缓存策略）
- [Chrome DevTools: Debug progressive web apps](https://developer.chrome.com/docs/devtools/progressive-web-apps)（英文）

## 值得认识的女性

**Frances Berriman** 是一位来自英国康沃尔、现居旧金山的设计师兼前端开发者。2015 年，她和 Alex Russell 一起为「渐进式 Web 应用」命名：她最初提出的是「Progressive Open Web Apps」，两人后来把它简化为「Progressive Apps」。更早之前，她是英国政府数字服务部门 GOV.UK 项目非常早期的前端与服务设计协作者。她后来在 Code for America 工作，并曾担任 Netlify 的产品负责人。

你在整节课中一直在使用的这个名字，来自一位设计师之手。给一个想法起一个好名字，正是它能够传播开来的原因：「渐进式」这个词说明了一个网站可以一步一步地变成一个应用，而不会把任何浏览器的用户抛在后面。

_资料来自公开来源，于 2026 年核实。发现错误？[告诉我们](https://github.com/XR-Dev-Camp/xr-camp/issues)。_

## 标准聚焦

这份清单文件遵循的是 W3C 的 **Web Application Manifest** 规范。Service Worker，以及它所使用的 **Cache API**（`caches`、`cache.addAll`、`cache.match`），都定义在 W3C 的 **Service Workers** 规范中。本课中并非所有内容都已经是标准：`beforeinstallprompt` 来自 WICG 的 *Manifest Incubations*，`navigator.connection.saveData` 来自 WICG 的 *Network Information API*，这些都是只有部分浏览器实现了的社区草案。这正是这个应用在使用每一项功能之前都要先检查它是否存在、并且在没有它们的情况下依然能正常工作的原因。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
