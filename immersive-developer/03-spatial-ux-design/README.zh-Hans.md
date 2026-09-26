# 空间 UX 设计

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `immersive-developer` · **课时：** `spatial-ux-design-03` · **时长：** 约 12 小时 · 16 次学习，每次 45 分钟 · 每周 4 次，约 4 周

---

> 把 My XR Camp 学习仪表盘重新设计成一个空间界面，包含世界锁定、身体锁定和视野锁定的面板，以及传送式移动。

---

## 学习目标

完成本项目后，你将能够：

1. 解释**世界锁定（world-locked）**、**身体锁定（body-locked）**和**视野锁定（view-locked）**这三种放置方式之间的区别，并为一段特定内容在它们之间做出选择。
2. 在 three.js 中搭建一个**画布贴图面板（canvas-texture panel）**——用 `CanvasTexture`、`MeshBasicMaterial` 和 `PlaneGeometry` 绘制的一块 `<canvas>`——并让它在不同观看距离下都保持清晰可读。
3. 根据一个面板的物理尺寸和距离计算它的**视角大小（angular size）**，并用这个数字来判断文字是否可读，而不是靠猜测。
4. 把已发布的舒适距离和文字大小建议，当作一个**需要测试的起点**，而不是一条固定规则，并说明这个数字的出处。
5. 在固定点之间实现**传送式移动（teleport locomotion）**，包括这如何要求以不同于桌面视图的方式移动一个 WebXR 会话。
6. 添加一个带有舒适度晕影（vignette）的**平滑移动（smooth-movement）**选项，并解释为什么传送通常是更安全的默认选择。
7. 标出一个简单的**个人空间边界（personal-space boundary）**，并解释它的作用。
8. 撰写一份简短的**设计说明（design rationale）**，为空间设计上的选择提供理由，并引用来源。

## 先决条件

- **Immersive Developer，WebXR 基础（4.1）**：本课复用了它的渲染器搭建、会话处理和「Enter VR」按钮模式，不再重新讲解。
- **Frontend Engineer，文档对象模型与动态界面（2.2）**：本课重新设计的正是那节课自己的学习仪表盘，并读取浏览器中保存的同一份学习进度。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 一个基于 Chromium 的桌面浏览器（Chrome 或 Edge） | WebXR 支持和开发者工具 | 免费 |
| [Immersive Web Emulator](https://github.com/meta-quest/immersive-web-emulator)（英文）浏览器扩展 | 在没有头显的情况下测试 VR 会话 | 免费 |
| 一款屏幕阅读器 | 测试场景描述和实时区域 | 免费 |
| 一台 VR 头显（可选） | 如果你有条件，可在真实设备上测试 | 视情况而定；非必需 |

## 你将构建什么

一个基于课程 2.2 的 My XR Camp 仪表盘的**空间化重新设计**：不再是一整页平面的进度条，而是一个小房间，里面有一个**进度信息台**（世界锁定，始终固定在同一个位置）和一个**目标面板**——运行时你可以在世界锁定、身体锁定和视野锁定之间切换它，因此你能亲身感受到区别，而不只是读到它。三个地面标记让你可以在距离信息台不同远近的三个位置之间传送——很近、舒适、以及很远——同时一段实时读数会报告信息台在每个位置的**视角大小**（单位为度）。一个地面圆环标出了你自己的个人空间。这一切在 VR 中坐姿下也同样可用，使用的是 4.1 中同一套「Enter VR」模式。

参考答案在 [`completed/`](completed/) 中。起始代码的 `index.html`、`styles.css`、`data/catalog.json`，以及 `js/app.js`、`js/data.js` 和 `js/xr.js` 都已完成。`js/panels.js`、`js/layout.js`、`js/locomotion.js`、`js/describe.js` 和 `js/main.js` 之间一共有十个 TODO；在 TODO 1 之前，这个房间已经可以运行，只是面板都是简单的占位内容，传送也是瞬间完成、没有淡入淡出效果，所以你可以在动手之前先看到整体的样子。

## 文件夹说明

```text
03-spatial-ux-design/
├── README.md
├── README.es.md
├── README.zh-Hans.md
├── project.json
├── starter/
│   ├── index.html, styles.css, data/catalog.json   # 已完成
│   ├── js/app.js, js/data.js, js/xr.js             # 已完成
│   ├── js/panels.js     # TODO 1-3：画布贴图面板
│   ├── js/layout.js     # TODO 4-6：世界/身体/视野锁定
│   ├── js/locomotion.js # TODO 7-8：传送和平滑移动
│   ├── js/describe.js   # TODO 9：场景描述
│   ├── js/main.js       # TODO 10：连接锁定模式和移动控件
│   └── design-rationale.md  # 边搭建边填写
├── completed/           # 参考答案：最后再打开
├── challenges/          # 三个拓展挑战：基础挑战为必做
├── tests/checklist.md   # 提交前的自查清单
├── assets/
└── screenshots/
```

## 环境配置

1. 复制 `starter/` 文件夹，在其中操作，或者直接打开它。
2. 启动本地服务器，通过它打开 `starter/index.html`。
3. 打开浏览器开发者工具的控制台和元素面板；如果你有屏幕阅读器，为后面的步骤打开它。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 环境配置；浏览起始代码和课程 2.2 的平面仪表盘 | 你能说出这里哪些已经能工作，哪些还只是占位内容 |
| 2 | 讨论：阅读「延伸阅读」中关于距离和文字大小的资料来源 | 你能说出一个舒适的面板距离，并准确说明这个数字的出处 |
| 3 | 第 1 步：搭建一个面板（TODO 1） | 两块简单的牌匾以正确的物理尺寸出现 |
| 4 | 第 2 步：绘制清晰可读的文字（TODO 2） | 信息台面板显示出真实的进度数字 |
| 5 | 第 2 步，续：目标面板的文字 | 两个面板都显示出真实、可读的文字 |
| 6 | 第 3 步：视角大小（TODO 3） | 移动状态一行会在每个路点报告一个真实的角度数值 |
| 7 | 第 4 步：世界锁定放置（TODO 4） | 信息台被正确定位，并朝向房间 |
| 8 | 第 5 步：身体锁定放置（TODO 5） | 目标面板会跟随你，并在你环顾四周时保持水平 |
| 9 | 第 6 步：切换锁定模式（TODO 6） | 全部三个锁定模式单选按钮都能明显改变目标面板的行为 |
| 10 | 讨论：个人空间和多用户边界 | 你能解释地面圆环的作用 |
| 11 | 第 7 步：用指针选取一个路点（TODO 7） | 点击或点按一个地面标记会把你传送过去 |
| 12 | 第 8 步：传送和平滑移动（TODO 8） | 两种移动方式都能工作，晕影效果和减少动态效果都得到尊重 |
| 13 | 第 9 步：场景描述（TODO 9） | 屏幕阅读器能听到房间当前完整的状态 |
| 14 | 第 10 步：连接最后的控件（TODO 10） | 复选框和单选按钮能端到端地改变行为 |
| 15 | 测试：键盘、减少动态效果，如果条件允许还有 VR | 逐项完成 `tests/checklist.md` |
| 16 | 一个拓展挑战，然后提交作业 | 你的截图和 `design-rationale.md` 都已就绪 |

### 第 1 步：搭建一个面板（TODO 1）

一个空间面板起初就是一块普通的 HTML `<canvas>`，用和任何网页画布一样的 2D 绘图 API 在上面绘制，然后包装成一个 `THREE.CanvasTexture`，这样 three.js 就能把它画到一个 `PlaneGeometry` 上。这里面没有任何 XR 专属的东西：这和任何 three.js 场景里，用来做仪表盘、标签和标牌的技术完全一样。

```js
const texture = new THREE.CanvasTexture(canvas);
texture.colorSpace = THREE.SRGBColorSpace;
const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
```

### 第 2 步：绘制清晰可读的文字（TODO 2）

用画布普通的 2D 上下文（`fillText`、`fillRect`）绘制，尺寸相对于画布自身的像素宽度设定，这样面板在任何物理尺寸下都能合理缩放。每次重绘之后都要调用 `texture.needsUpdate = true`，否则 GPU 会一直显示旧的像素内容。

### 第 3 步：视角大小（TODO 3）

两个像素分辨率相同的面板，可读性依然可能大不相同，因为真正重要的是它们从你所站的位置看起来有多大：也就是它们的**视角大小**，单位为度。`2 * atan((height / 2) / distance)` 根据一个物理高度和一个观看距离给出这个角度——同一个面板在 2.5 米处所张的角度，会比在 0.6 米处小得多，即使它的贴图内容一个像素都没有改变。

### 第 4 步：世界锁定放置（TODO 4）

世界锁定的内容固定在房间中的一个点上，就像本课的进度信息台始终所做的那样。不需要每一帧都更新它，因为按照定义，它根本不会移动。

### 第 5 步：身体锁定放置（TODO 5）

身体锁定的内容会跟随学习者，但只跟随他们左右的朝向（**偏航角，yaw**），绝不跟随俯仰或翻滚——所以抬头或低头不会让一个身体锁定的面板跟着倾斜。`camera.getWorldDirection()` 和 `Math.atan2(direction.x, direction.z)` 会给出这个朝向，无论此刻是否有 WebXR 会话正在覆盖相机自身的变换。

### 第 6 步：切换锁定模式（TODO 6）

一个 `Object3D` 只能有一个父级，所以切换模式意味着必须先分离。视野锁定的内容会成为相机本身的子级（`camera.add(object)`）；另外两种模式则把它挂载到场景上。在目标面板上依次尝试每一种模式，并阅读下面「关键代码解析」中关于它们之间舒适度权衡的说明。

### 第 7 步：用指针选取一个路点（TODO 7）

每个路点已经有了一个真正的 `<button>`（在 `main.js` 中搭建），单凭这一点就足以支持键盘和屏幕阅读器使用。TODO 7 添加了到达同样三个位置的第二种直接方式：点击或点按它们的地面标记，使用一个由指针位置和相机构建出的 `THREE.Raycaster`。

### 第 8 步：传送和平滑移动（TODO 8）

传送是瞬间跳转，被一次短暂的淡入淡出所遮盖；平滑移动则在大约 700 毫秒内持续插值，整个过程都会显示一个舒适度晕影。减少动态效果会完全跳过这两种效果，直接切到目的地。

### 第 9 步：场景描述（TODO 9）

从搭建这个房间所依据的同一组数字，构建出一段文字，涵盖房间里有什么、当前的路点及其视角大小、目标面板当前是哪种锁定方式，以及头显目前是否处于激活状态。

### 第 10 步：连接最后的控件（TODO 10）

把「平滑移动」复选框和三个锁定模式单选按钮，连接到 `app.setSmooth()` 和 `app.setGoalsLockMode()`。这是最后一块拼图：完成之后，页面上的每一个控件都会产生实际效果。

## 关键代码解析

- **`CanvasTexture` 和 `needsUpdate`**：一个从一块实时画布（而不是一份静态文件）构建出来的贴图，所以重绘画布并设置 `texture.needsUpdate = true`，就足以更新 3D 中显示的内容——不需要新的几何体，也不需要重新加载。
- **视角大小**：`2 * atan((height / 2) / distance)`。这是本课用来衡量可读性的、真正考虑了距离的方式，而不是一个单一固定的「最小字号」，因为同一个面板的可读性会随你所站的位置改变，而不仅仅取决于它是怎么绘制的。
- **移动装置（rig）**：阅读 three.js r186 版本的 `WebXRManager` 源码可以发现，一旦一个会话处于激活状态，`camera.position` 每一帧都会被头显被追踪到的姿态、结合 `camera.parent.matrixWorld` 重新写入。直接设置 `camera.position`（这在会话开始之前有效）在演示期间不会产生任何效果。本课的解决办法是把相机作为一个 `Group`（一个「rig」或「dolly」）的子级，在演示期间的传送过程中移动的是这个 *rig* 的位置——这才是真正会被叠乘进变换里的部分。
- **`camera.getWorldPosition()` / `getWorldDirection()`**：之所以用它们，而不是直接读取 `camera.position` 和 `camera.rotation`，是因为后者返回的是相对于相机父级（也就是 rig）的值，一旦 rig 移动过，这就不再等同于世界空间。而 `getWorld…` 系列方法，无论是否处于会话中，始终返回真实的世界空间数值。
- **锁定模式的重新挂载**：在挂载到任何新的父级之前，先调用 `object.parent.remove(object)`。如果你跳过这一步，three.js 不会发出任何警告；这个物体只会悄悄留在原来的位置，这是一种事后很难排查的令人困惑的 bug。

## 3D 与 XR 无障碍

本课自始至终都是 3D 的，所以没有单独的「3D 时刻」：下面的每一项要求，每一个面板、每一次传送、每一种锁定模式必须始终满足，而不只是页面的某一节。

- 每个面板的信息也以纯 HTML 文字的形式存在（阶段列表、目标列表、场景描述）：没有任何内容只存在于空间中。
- 每一次传送和锁定模式切换，也都是一个真正的 `<button>`、`<input type="radio">` 或 `<input type="checkbox">`，单凭键盘就能到达和操作。
- 减少动态效果会完全关闭淡入淡出和晕影效果，无论是传送还是平滑移动，都会瞬间完成。
- 相机只会因为学习者拖动了它、使用了方向键，或选择了一个路点而移动——绝不会自动移动。
- 无论是否在 VR 中演示，传送的工作方式都相同，都经过同样的按钮（参见「关键代码解析」）。
- 每个路点和面板都保持在坐姿、面朝前方、舒适可及的范围内；没有任何内容要求站立或完全转身。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 | 本课如何满足 |
| --- | --- | --- | --- |
| 为 3D 场景提供文字替代方案 | 1.1.1 | 一块画布对辅助技术来说是不可见的 | `#scene-description`，从和房间相同的数据重新构建而成 |
| 完整信息也以文字形式提供 | 1.3.1 | 图像绝不是事实的唯一副本 | 阶段列表和目标列表复述了信息台和目标面板的内容 |
| 键盘可操作性 | 2.1.1 | 不是每个人都使用鼠标、触摸或 VR 控制器 | 每个操作都有一个真实的、可获得焦点的 HTML 控件 |
| 可见焦点 | 2.4.7 | 键盘用户需要看到自己在哪里 | 继承自本仓库的全局 `:focus-visible` 样式 |
| 没有未经请求的运动 | 2.3.3、2.2.2 | 前庭功能障碍和晕动症 | 相机和玩家只在被请求时移动；减少动态效果会移除淡入淡出和晕影 |
| 无障碍名称以可见标签开头 | 2.5.3 | 语音控制用户会说出可见的文字 | 按钮和标签使用平实、一致的措辞 |
| 实时状态更新 | 良好实践 | 屏幕阅读器用户应该能听到结果而不丢失当前位置 | `#move-status` 和 `#xr-status` 使用 `role="status"` |

## 性能注意事项

- 两个面板意味着两块画布和两张贴图：相比 Web3D Developer 中加载的 glTF 模型，这个开销很小，但只在数据真正变化时才重绘它们（`redrawGoalsPanel` 在每次添加/移除后被调用，而不是每一帧都调用）。
- `applyBodyLock` 只在目标面板处于身体锁定模式时，每帧运行一次；在世界锁定和视野锁定模式下则完全跳过，因为这两种模式都不需要逐帧更新。
- `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`，沿用自 4.1，限制了高密度手机和平板屏幕上不必要的 GPU 开销。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 忘记设置 `texture.needsUpdate = true` | 画布的内容变了，但面板依然显示旧文字 | 在每个重绘函数的末尾都设置一次 |
| 在 XR 会话期间读取 `camera.position` | 得到的是相对于 rig 的值，而不是真实的世界坐标 | 使用 `camera.getWorldPosition()` |
| 没有先分离，就把一个物体挂载到新的父级上 | 它会悄悄地无法移动，或者最终出现在两个地方 | 始终先调用 `parent.remove(object)` |
| 因为最容易读，就把一切都做成视野锁定 | 几秒钟之内就会感觉很干扰、很累人 | 把视野锁定只保留给短暂存在、紧急的内容 |
| 一次忽略减少动态效果的传送或平滑移动动画 | 无法满足舒适度要求，还可能引发真实的不适 | 每次选择效果之前，都检查 `window.__reducedMotion` |

## 故障排查

**面板是没有文字的纯灰色矩形。** TODO 1/2 还没有填写完成，或者绘制之后从未把 `texture.needsUpdate` 设为 `true`。

**我转身时，目标面板会旋转或抖动。** 检查 TODO 5 是否只用 `atan2(direction.x, direction.z)` 计算偏航角——如果改用完整的 `camera.quaternion`，就会连俯仰和翻滚也一起复制过去。

**传送在桌面端有效，但在 VR 中演示时无效。** 确认 `app.setPresenting(true)` 确实在运行（检查 `xr.js` 的 `sessionstart` 监听器），并确认演示期间传送代码移动的是 rig，而不是 `camera.position`。

**Firefox 或 Safari：** Firefox 把元素面板称为「检查器（Inspector）」。Safari 需要先在「偏好设置 → 高级」中启用「开发」菜单，才能使用它自己的 Web 检查器。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：添加第四个路点，距离是本课没有测试过的，并阅读会发生什么。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：让房间里的内容成为你自己的。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：添加第四种、手部相对的锁定模式，与 4.2 的控制器和手部追踪知识联系起来。

## 提交作业

1. 逐项完成 [`tests/checklist.md`](tests/checklist.md)。
2. 从三个路点各拍一张房间的截图，以及目标面板在三种锁定模式下各拍一张截图。
3. 把它们保存在你的学习日志和作品集中。也可以和其他开发者分享：参见[在哪里分享你的作品和寻求帮助](../../docs/en/community.md)（英文）。
4. 学习日志问题：在这三种锁定模式中，你个人觉得哪一种用超过几秒钟就会最不舒服？你认为原因是什么？

## 延伸阅读

- [Meta Horizon OS: Panels](https://developers.meta.com/horizon/design/panels/)（英文）——一个实际平台关于面板尺寸的建议，请把它当作一个数据点谨慎看待，而不是一条普适规则。
- [Meta Horizon OS: Comfort](https://developers.meta.com/horizon/design/comfort/)（英文）——关于移动方式和运动不适的建议，包括为什么倾向于用传送而不是连续移动。
- [Android XR: Scale, sizes, and visual design](https://developer.android.com/design/ui/xr/guides/visual-design)（英文）——另一个平台自己默认的面板距离，有助于看清这些数字确实因平台而异。
- [W3C: XR Accessibility User Requirements (XAUR)](https://www.w3.org/TR/xaur/)（英文）——本仓库人工 XR 无障碍检查所依据的标准文档。
- [MDN: `CanvasRenderingContext2D`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)（英文）——本课面板所使用的 2D 绘图 API。

## 值得认识的女性

**Clarisse Sieckenius de Souza** 是一位巴西人机交互（HCI）研究者，现为里约天主教大学（PUC-Rio）荣休教授，她共同创立了符号工程学（Semiotic Engineering）——第一个源自计算机科学领域的人机交互符号学理论。她创建了 PUC-Rio 的符号工程研究小组，并在 2013 年入选 ACM SIGCHI 的 CHI 学院（CHI Academy）。

本课中的每一个选择——一个面板放在哪里、它如何被标注、它通过固定不动还是跟随你，悄悄传达了什么——正是她所在领域研究的那类问题：不仅是一个界面是否能用，还有它对使用者说了什么，以及对方是如何在没有被直接告知的情况下理解这一点的。

> **编者注：发布前请核实。** 「值得认识的女性」中的人物信息必须以一手资料核实，并在可行时于课程上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

本课「Enter VR」按钮背后的 **WebXR Device API**，由 W3C 的 Immersive Web Working Group 发布，和 4.1 中使用的是同一份规范。空间 UX 布局本身并没有一份单一的 W3C 标准：**W3C XR Accessibility User Requirements (XAUR)** 是一份工作组说明（Group Note），而不是一份推荐标准，它为空间界面设定了无障碍方面的期望，但并不规定具体的设计系统——这也是为什么本课转而参考各个平台自己发布的设计指南（Meta Horizon OS、Android XR），并明确说明应该把这些数字当作一个起点，而不是一条标准。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
