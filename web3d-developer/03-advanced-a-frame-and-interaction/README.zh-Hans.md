# 进阶 A-Frame 与交互

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `web3d-developer` · **课时：** `advanced-a-frame-and-interaction-03` · **时长：** 约 14 小时 · 19 次学习，每次 45 分钟 · 每周 4 次，约 5 周

---

> 搭建一个交互式的虚拟博物馆、文化展览或学习体验。

---

## 学习目标

完成本项目后，你将能够：

1. 编写一个自定义的 **A-Frame 组件**，拥有自己的 `schema`，以及 `init()`、`update()`、`tick()` 和 `remove()` 生命周期方法。
2. 用 **`el.emit()`** 和 **`el.addEventListener()`** 让一个组件和页面的其他部分互相通信，包括冒泡的自定义事件。
3. 为鼠标和触摸输入配置 **`cursor`** 组件（`rayOrigin: mouse`），并解释什么时候**注视/凝视选择光标（gaze/fuse cursor）**是更好的选择，以及它在无障碍方面的代价。
4. 配置一个 **`raycaster`**，让它只检测一组指定的实体，使用 `objects: .interactive`。
5. 添加 **`laser-controls`**，让 VR 控制器可以选中同样的展品，无需额外的代码，并用 Immersive Web Emulator 测试它。
6. 用事件驱动 **`animation`** 组件，让一个展品只在被选中时才转动或抬起，绝不会自行运动。
7. 搭建一个 HTML **信息面板**，用一个共用函数处理每一种输入方式，让它始终与 3D 场景保持同步。
8. 用 `sound` 组件（`positional: true`）添加**位置音频（positional audio）**，只能通过按钮启动，绝不自动播放。
9. 解释本课遵循的**舒适度**规则：没有强制的相机移动，「减少动态效果」下的转场是瞬间完成的。

## 先决条件

- **A-Frame 基础（3.2）**：实体－组件系统、基本元素标签、`<a-assets>`、`sound` 和 `text` 组件，以及你已经完成的 `completed/` 房间，本课会直接在此基础上继续。
- **我的 XR Camp**，阶段 2 自己的那个小应用（课程地图、仪表盘、学习计划器）：同一种「跨越多节课搭建同一个东西」的模式在这里延续下去，只不过换成了虚拟展览。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 支持 WebGL 的现代浏览器 | 房间及其 2D 控件 | 免费 |
| VS Code 和本地服务器 | A-Frame 的资源需要 `http://`，而不是 `file://` | 免费 |
| [Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik) 浏览器扩展（英文） | 在没有头显设备的情况下测试 `laser-controls` 和 VR 模式 | 免费 |

## 你将构建什么

你在第 3.2 课搭建的展览的第一个房间，会新增第二个点位，更重要的是，会有了「点击房间里任何东西」的理由。你会编写一个自定义的 A-Frame 组件 `interactive-exhibit`，把它附加到每一个展品点位上；编写一个共用函数 `selectExhibit()`，鼠标点击、手指点按、VR 控制器的扳机键和键盘按钮都会调用它；并搭建一个能对其中任何一种触发做出反应的信息面板。

参考答案在 [`completed/`](completed/) 中。`starter/main.js` 中有 18 个编号的 TODO；其中三个（TODO 4、10 和 15）是 `starter/index.html` 中的小型 HTML 改动，用对应的注释标出。

## 文件夹说明

```text
03-advanced-a-frame-and-interaction/
├── README.md
├── starter/        # begin here
├── completed/      # reference solution
├── challenges/          # Three challenges: Foundation is required
├── tests/          # self-review checklist
├── assets/
└── screenshots/
```

## 环境配置

1. 在 VS Code 中打开这个文件夹。
2. 在仓库根目录启动一个本地服务器（例如 Live Server 扩展，或 `python3 -m http.server 8766`），因为 A-Frame 的 `<a-assets>` 和 ES 模块都需要 `http://`。
3. 通过这个服务器打开 `starter/index.html`。你应该能看到第 3.2 课的房间，「选择」按钮、待机动画和输入模式控件都已经出现，只是还没有任何反应。
4. 在第二个标签页中保持 `completed/index.html` 打开作为参考，并打开浏览器控制台，方便及早发现错误。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 环境配置；第 1 步：从 3.2 的房间到本课的房间（概念） | 能指出本课 HTML 中新增了什么 |
| 2 | 第 2 步：你的第一个自定义组件：schema（TODO 2） | 一个能接受属性的 `interactive-exhibit` 组件 |
| 3 | 第 3 步：`init()`，以及用 `el.addEventListener` 处理事件（TODO 3） | 悬停在展品上会高亮它 |
| 4 | 第 4 步：`cursor` 和 `raycaster` 组件（TODO 4） | 点击一个展品会触发组件的 `onClick` |
| 5 | 第 5 步：`update()`，以及对属性变化做出反应（TODO 5） | 选中一个展品会切换它的 `selected` 状态 |
| 6 | 第 6 步：一个函数应对所有输入：`selectExhibit()`（TODO 6） | 一条共用的「选择这个展品」代码路径 |
| 7 | 第 6 步（续）：键盘路径（TODO 7） | 每个展品都能用真正的、带标签的按钮到达 |
| 8 | 第 7 步：用 `el.emit` 处理事件，以及场景级别的监听器（TODO 8） | 信息面板开始对选择做出反应 |
| 9 | 第 8 步：由事件驱动的 `animation` 组件（TODO 9） | 展台在被选中时会转动 |
| 10 | 第 8 步（续）：第二个展品与第二种动作（TODO 10–11） | 一盏在被选中时会升起的故事灯笼 |
| 11 | 第 9 步：舒适度与减少动态效果（概念，在 TODO 9 中一并回顾） | 能解释为什么减少动态效果会完全跳过 animation 组件 |
| 12 | 第 10 步：信息面板与状态区域（TODO 12） | `#scene-description` 和 `#status` 会在选择时更新 |
| 13 | 第 11 步：用 `sound` 实现位置音频（TODO 13） | 一声只在被要求时、从铃铛自身位置播放的钟声 |
| 14 | 第 12 步：注视/凝视选择光标，及其取舍（TODO 14） | 一个可用的输入模式开关，以及一句解释其代价的说明 |
| 15 | 第 13 步：为 VR 配置 `laser-controls`（TODO 15） | 用 Immersive Web Emulator 测试过 |
| 16 | 第 14 步：`tick()`，一个自行运行的生命周期方法（TODO 16） | 被选中的展品上有一个细微的待机脉动效果 |
| 17 | 第 15 步：`remove()`，以及善后清理（TODO 17） | 移除一个展品的组件后，不会留下任何仍在运行的东西 |
| 18 | 第 16 步：暂停按钮（TODO 18） | 一种可用的、无障碍的手动停止待机脉动的方式 |
| 19 | [`tests/checklist.md`](tests/checklist.md)；基础挑战；**提交作业** | 一个完成的交互式展览 |

### 第 1 步：从 3.2 的房间到本课的房间

把 `starter/index.html` 和你自己第 3.2 课的 `completed/index.html` 放在一起打开。天空、灯光、地面、编织图案的展台和英文欢迎面板都没有变化。新增的是：一个钟铃（用第 3.2 课的声音标记搭建）、第二个展品的位置、一个信息面板，以及输入模式和待机动画的控件。目前它们都还没有任何反应——这正是本课要添加的全部内容。

### 第 2 步：你的第一个自定义组件：schema（TODO 2）

```js
AFRAME.registerComponent('interactive-exhibit', {
  schema: {
    exhibitId: { type: 'string' },
    action: { type: 'string', default: 'turn', oneOf: ['turn', 'lift', 'none'] },
    selected: { type: 'boolean', default: false },
  },
  // ...
});
```

`AFRAME.registerComponent(name, definition)` 让 A-Frame 认识一个新的属性：调用这个函数之后，任何实体都可以写 `interactive-exhibit="exhibitId: woven-panel; action: turn"`，A-Frame 会按照 `schema` 声明的类型和默认值，把这个字符串解析进组件内部的 `this.data`。这和内置的 `sound`、`light` 组件使用的机制完全一样；你写的是同一类东西，而不是什么独立于它们之外的东西。

### 第 3 步：`init()`，以及用 `el.addEventListener` 处理事件（TODO 3）

```js
init() {
  this.onClick = this.onClick.bind(this);
  this.el.addEventListener('click', this.onClick);
},
onClick() {
  selectExhibit(this.data.exhibitId);
},
```

`init()` 只会运行一次，在组件第一次附加到一个实体上时：这里是设置那些应该在实体整个生命周期中都存在的东西（比如事件监听器）的地方。`this.el` 是组件所附加的那个实体，一个真正的 DOM 元素，和其他元素一样拥有 `addEventListener`。这里的 `'click'` 并不是一个只针对鼠标的事件：下一步会解释它究竟是从哪里来的。

### 第 4 步：`cursor` 和 `raycaster` 组件（TODO 4）

```html
<a-camera id="camera" cursor="rayOrigin: mouse; fuse: false"
          raycaster="objects: .interactive; far: 20"></a-camera>
```

`raycaster` 从相机发出一条不可见的射线，报告它经过了哪些实体；`objects: .interactive` 让它只检测带有这个 CSS 类的实体，所以天空、地面和文字面板永远不会被算作候选，这也让射线检测的开销保持很小。附加在同一个实体上的 `cursor`，把这些射线检测的命中结果转换成熟悉的 DOM 风格事件：在相交的实体上触发 `mouseenter`、`mouseleave` 和 `click`。`rayOrigin: mouse` 意味着射线跟随鼠标指针（在触摸设备上则跟随手指）；`fuse: false` 意味着选择需要一次明确的点击或点按，而不是停留一段时间。这就是为什么 TODO 3 中的 `'click'` 监听器无需任何额外代码，就能同时适用于鼠标和触屏：`cursor` 已经把它们统一起来了。

### 第 5 步：`update()`，以及对属性变化做出反应（TODO 5）

```js
update(oldData) {
  if (this.data.selected === oldData.selected) return;
  this.el.classList.toggle('is-selected', this.data.selected);
  if (this.data.selected) {
    this.el.emit('exhibit-selected', { id: this.data.exhibitId }, true);
    this.playAction();
  }
},
```

`update(oldData)` 会在 `init()` 之后立即运行一次，此后每当任何一个 schema 属性发生变化时都会再次运行，无论这个变化来自点击、键盘按钮，还是浏览器的开发者工具。`oldData` 是上一次的 `this.data`，比较这两者就能准确知道发生了什么变化，而不必在每次调用时都重新运行所有效果。用 `this.data.selected === oldData.selected` 做守卫，意味着转动或抬起只会在展品真正变为「已选中」的那一帧播放，而不是每次 `update()` 因为无关原因运行时都播放。

### 第 6 步：一个函数应对所有输入：`selectExhibit()`（TODO 6）

```js
function selectExhibit(id) {
  for (const item of exhibitData) {
    const el = document.querySelector(`#${item.id}`);
    if (el) el.setAttribute('interactive-exhibit', 'selected', item.id === id);
  }
}
```

这五行代码就是本课的核心思想。`setAttribute('interactive-exhibit', 'selected', true)` 只设置一个已附加组件的某个属性，不影响其他属性（`exhibitId` 和 `action` 保持不变），而正是这个调用真正触发了 TODO 5 中的 `update()`。无论 `selectExhibit()` 是从一次射线检测点击、一次 VR 控制器的扳机触发，还是一次键盘按键调用的，它运行的都是完全相同的代码：不是两份碰巧一致的实现，而是一个实现，多个入口。

### 第 7 步：键盘路径（TODO 7）

```js
button.addEventListener('click', () => selectExhibit(item.id));
```

每个展品的「选择」按钮都直接调用 `selectExhibit()`。这正是「每一个 3D 交互也都能通过 2D 面板和键盘完成，走的是同一条 `select-exhibit` 代码路径」的具体含义：这不是一个碰巧产生相似结果的第二功能，而是同一个函数，只是这次是被一个 `<button>` 调用，而不是一个光标事件。

### 第 8 步：用 `el.emit` 处理事件，以及场景级别的监听器（TODO 8）

```js
this.el.emit('exhibit-selected', { id: this.data.exhibitId }, true);
```

```js
scene.addEventListener('exhibit-selected', (evt) => {
  const item = exhibitData.find((entry) => entry.id === evt.detail.id);
  if (item) updateInfoPanel(item);
});
```

`el.emit(name, detail, bubbles)` 在该实体上触发一个自定义 DOM 事件，携带 `detail` 作为它的数据负载。第三个参数 `true` 让它冒泡：这个事件会沿着实体树一路向上传播到 `<a-scene>`，就像一次对嵌套 `<span>` 的点击会一路冒泡到 `document` 一样。因为它会冒泡，`main.js` 只需要在场景上放一个监听器，就能听到「某个展品被选中了」，无论是哪一个，而不需要为每个展品各放一个监听器。

### 第 9 步：由事件驱动的 `animation` 组件（TODO 9、11）

```js
this.el.setAttribute('animation__turn', {
  property: 'rotation',
  to: `${x} ${y + 180} ${z}`,
  dur: 700,
  easing: 'easeOutQuad',
});
```

A-Frame 的 `animation` 组件会在 `dur` 毫秒内，把某个属性从当前值渐变到 `to`。在 `playAction()` 内部，在一个展品刚被选中时用 JavaScript 设置它，正是这里「由事件驱动」的含义：这个动画不是声明一次就永远循环播放，而是响应 `exhibit-selected` 才创建，播放一次就结束。`animation__turn` 和 `animation__lift`（第二个，用于故事灯笼）是同一个内置组件在同一个实体上两个各自独立命名的实例，这也是为什么它们可以同时存在而不冲突。

**舒适度与减少动态效果：**当 `window.__reducedMotion` 为 `true` 时，`playAction()` 会完全跳过 `animation` 组件，在一帧之内直接把最终的旋转或位置写入 `this.el.object3D`。这次转动或抬起没有任何装饰性的成分：它存在的意义是确认一次选择，减少动态效果让学习者得到同样的确认，却不必经历这个动作本身。

### 第 10 步：信息面板与状态区域（TODO 12）

```html
<p id="scene-description">…</p>
<p id="status" role="status"></p>
```

`updateInfoPanel(item)` 会同时写入这两处。`#scene-description` 是一段始终存在、可阅读的描述，说明当前选中的是什么——和视力正常的学习者在房间里看到的是同一份信息。带有 `role="status"` 的 `#status` 是一个**实时区域**：屏幕阅读器会自动朗读它的新内容，学习者无需把焦点移动到那里。从处理 `exhibit-selected` 的同一个地方写入这两处，能确保它们永远不会互相矛盾。

### 第 11 步：用 `sound` 实现位置音频（TODO 13）

```html
<a-sphere id="chime-bell"
          sound="src: #chime-sound; positional: true; autoplay: false; loop: false; volume: 0.9; maxDistance: 6"></a-sphere>
```

`positional: true` 通过 Web Audio API 的空间声像器（spatial panner），把这段声音的感知方向和音量与这个实体在房间中的位置绑定：相机远离时它会变轻（在立体声输出下），听起来像是从铃铛所在的那一侧传来，而不是无处不在。`autoplay` 和第 3.2 课一样保持 `false`：TODO 13 中的「播放钟声」按钮，只有在铃铛被选中后才会出现，是启动它的唯一方式。

### 第 12 步：注视/凝视选择光标，及其取舍（TODO 14）

```js
camera.setAttribute('cursor', {
  rayOrigin: gazeOn ? 'entity' : 'mouse',
  fuse: gazeOn,
  fuseTimeout: 1200,
});
```

`rayOrigin: 'entity'` 让射线从相机自身的正前方发出，所以只需要看向一个展品，就相当于瞄准了它：这就是**注视光标（gaze cursor）**。`fuse: true` 让选择在保持这个注视 `fuseTimeout` 毫秒之后自动发生，完全不需要点击——这就是**凝视选择光标（fuse cursor）**，得名于它经过一段延迟后「融合（fuse）」出一次选择。这对于没有手持控制器的头显，或者无法操作扳机键或鼠标按钮的学习者来说很重要。**取舍在于：**强制的停留时间对每个人来说都是一段固定的、不可协商的等待，这对于精细运动控制受限的学习者（很难把视线完全保持稳定）或者只是单纯想要更长时间来做决定的人来说，可能会很困难。本课把点击/点按选择保留为默认方式，把注视选择作为一个明确的、可见的、可选择启用的选项，而绝不是唯一的输入方式。

### 第 13 步：为 VR 配置 `laser-controls`（TODO 15）

```html
<a-entity laser-controls="hand: right" raycaster="objects: .interactive; far: 20"></a-entity>
```

`laser-controls` 把 A-Frame 的 `tracked-controls`（读取 VR 控制器的位置和按钮）、一条可见的激光线，以及和第 4 步一样的 cursor/raycaster 机制组合在一起，只不过这次射线是从控制器而不是相机发出的。扣动扳机会在激光当前指向的实体上，触发和鼠标点击或点按完全相同的 `'click'` 事件——这就是为什么 TODO 3 中为鼠标编写的监听器，无需任何修改就已经能应对 VR 控制器。用免费的 [Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik)（英文）测试它：它会为任何 WebXR 页面添加一个虚拟头显和两个虚拟控制器，让你无需真实硬件就能试用 `laser-controls`。

### 第 14 步：`tick()`，一个自行运行的生命周期方法（TODO 16）

```js
tick(time) {
  if (!this.data.selected || window.__reducedMotion) return;
  const scale = 1 + Math.sin(time / 260) * 0.04;
  this.el.object3D.scale.set(scale, scale, scale);
},
```

`tick(time)` 在每一个渲染帧都会运行，大约每秒 60 次，是 A-Frame 组件实现 `animation` 组件无法胜任的效果的方式，比如一种依赖经过时间、而不是一个起点和终点数值的持续振荡效果。这条守卫语句有双重意义：对于两个未被选中的展品来说，它几乎不产生任何开销；而减少动态效果会把它完全关闭，因为一次轻柔的脉动正是这项设置存在的目的所要阻止的那种自行运动。

### 第 15 步：`remove()`，以及善后清理（TODO 17）

```js
remove() {
  this.el.removeEventListener('click', this.onClick);
  this.el.removeAttribute('animation__turn');
},
```

`remove()` 会在组件（或它所属的整个实体）从场景中被移除时运行。`init()` 添加的每一个监听器，都必须在这里用完全相同的绑定函数引用移除，否则这个实体在「已经消失」之后仍然会响应点击；这个组件启动过的每一个 `animation` 属性也都应该被清除，否则它会继续对着一个已经脱离场景的对象运行。这正是为什么 `init()` 要把 `this.onClick = this.onClick.bind(this)` 存起来，而不是直接给 `addEventListener` 传一个内联的箭头函数：你无法移除一个从未保存过引用的监听器。

### 第 16 步：暂停按钮（TODO 18）

第 14 步中的待机脉动，是这个房间里唯一一个会在学习者没有要求的情况下自行运动的东西。`wirePauseButton()` 给它配上一个明确的、带标签的、使用 `aria-pressed` 的开关，独立于自动的减少动态效果检测：即使某人没有在系统层面设置减少动态效果的偏好，仍然可以随时手动选择停止它。

## 关键代码解析

**`this.el.setAttribute(componentName, property, value)`** 更新一个实体上已有组件的某一个属性，触发该组件的 `update(oldData)`，而不影响它的其他属性。

**`el.emit(name, detail, bubbles)`** 在一个实体上触发一个自定义事件；`bubbles: true` 让树上层的一个监听器（这里是 `<a-scene>` 上的监听器）能听到来自任何触发它的实体的事件。

**`raycaster="objects: .interactive"`** 限制了一个射线检测器测试哪些实体，既是为了正确性（天空永远不会被「点击」），也是为了性能。

**`cursor="rayOrigin: mouse"` 与 `rayOrigin: 'entity'`** 决定射线跟随指针/手指，还是跟随相机自身的注视方向；`fuse` 则在两者之上增加了一种计时的、免手操作的选择方式。

**`laser-controls="hand: left"`** 是一个现成的组合包，包含 `tracked-controls`、一个射线检测器、一条激光线，以及 cursor 风格的点击事件，只不过瞄准的起点是 VR 控制器，而不是相机。

**`animation__turn` / `animation__lift`** 是内置 `animation` 组件在同一个实体上两个各自独立命名的实例：双下划线后面的后缀是任意的，这样设计是为了让两者可以共存。

## 3D 与 XR 无障碍

整节课都是关于 3D 的，所以它的无障碍性是内建的，而不是一个单独的环节：

- 每个展品的信息都只在 `exhibitData` 中存在一份，驱动着 2D 列表、「选择」按钮和信息面板，所以它们不可能出现不一致（WCAG 1.3.1）。
- **每一个 3D 交互都有一个真正的、带标签的 `<button>`**，调用的是与点击、点按或 VR 控制器扳机相同的 `selectExhibit()` 函数。
- **`#status` 是一个实时区域**，会在不移动焦点的情况下宣布新选中的展品。
- **除非学习者主动要求，否则没有任何东西会移动。**相机永远不会自己走动；转动和抬起只会响应一次选择才发生；减少动态效果会用一次瞬间的变化替代它们；待机脉动有自己的暂停按钮。
- **钟声绝不会自行播放**，它的按钮始终通过 `aria-pressed` 显示是否正在播放。
- **注视/凝视选择是可选启用的**，它的停留时间代价会在学习者打开它的地方加以说明，而不是被藏起来当作唯一的输入方式。
- **一条无 WebGL 提示信息**让房间的信息在 3D 视图无法运行时依然可用。
- **每个展品都能坐着完成。**三个展品都位于站立视线高度或更低，并且都在相机初始位置的伸手可及范围内，因此无论是在 VR 中还是其他情况下，都不需要站起来或走动才能触及。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 每个展品的信息都出现在 2D 列表和信息面板中，而不仅仅在 3D 场景里 | 1.1.1, 1.3.1 | 画面所承载的信息，文字中始终也有。 |
| 每一个 3D 交互都有一个真正的、能到达同一个函数的带标签按钮 | 2.1.1, 4.1.2 | 键盘能到达鼠标、点按或 VR 扳机能到达的一切地方。 |
| `#status` 会宣布被选中的展品 | 4.1.3 | 使用屏幕阅读器的人无需四处寻找，就能知道发生了什么变化。 |
| 转动和抬起在减少动态效果下瞬间完成；待机脉动有暂停按钮，并在减少动态效果下停止 | 2.2.2, 2.3.3 | 没有学习者无法停止的自行运动，也不会触发晕动症。 |
| 钟声绝不自动播放；它的按钮会显示状态 | 1.4.2, 4.1.2 | 不会有任何东西未经邀请就开始盖过屏幕阅读器说话。 |
| 除非学习者主动移动，相机绝不移动 | 良好实践 | 舒适度：没有视动性眩晕，也没有强制的视角变化。 |
| 页面在手机上不会出现横向滚动 | 1.4.10 | 在窄屏幕上，房间会显示在控件的上方。 |

## 性能注意事项

三个 `interactive-exhibit` 组件，每个都有一个 `tick()`，听起来比实际开销更大：`tick()` 开头的守卫语句会为当前未被选中的展品立即返回，所以在任何一帧，三个展品中最多只有一个会真正执行 `Math.sin()` 和缩放设置的运算。`raycaster="objects: .interactive"` 让每次射线检测都只针对三个实体，而不是包括地面和天空在内的整个场景图。复用的钟声素材（约 345 KB）不会给这个房间在第 3.2 课基础上增加任何新的下载量。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 在 `init()` 中给 `addEventListener` 传一个内联箭头函数 | `remove()` 无法移除它（没有匹配的引用） | 在 `init()` 中把绑定后的函数存到 `this` 上，两次调用都传这同一个引用 |
| 忘记给 `el.emit()` 传第三个参数 | 事件永远到达不了场景级别的监听器 | 传入 `true` 让它冒泡 |
| 在非减少动态效果情况下，直接写入 `this.el.object3D.rotation` 来完成转动 | 没有缓动效果，没有持续时间，TODO 17 也无事可清理 | 用 `setAttribute('animation__turn', {...})`，让 `animation` 组件来负责它 |
| 对整个场景做射线检测（没有 `objects` 过滤） | 天空、地面和文字面板都变得可点击，射线检测的开销也更大 | 使用 `raycaster="objects: .interactive"` |
| 使用 `sound="positional: true"` 却没考虑 `maxDistance` | 钟声在房间的任何地方都能听到，违背了位置音频的初衷 | 设置一个符合房间实际尺度的 `maxDistance` |
| 把注视/凝视选择当作唯一的输入方式 | 任何无法在凝视超时时间内保持稳定注视的人都会被排除在外 | 把点击/点按保留为默认方式；让注视选择成为一个明确的、可逆的开关 |

## 故障排查

**点击一个展品没有反应，但悬停时会高亮。** `onMouseEnter`/`onMouseLeave`（来自 `cursor` 的 `mouseenter`/`mouseleave`）已经接好了，但 `'click'` 监听器，或者 `selectExhibit()` 本身，仍然只是一个占位实现。

**键盘的「选择」按钮能用，但点击 3D 展品不行（或者相反）。** 确认这两条路径调用的是完全相同的 `selectExhibit(id)`；如果两者各自有独立的逻辑，它们会随着时间推移逐渐产生分歧。

**页面一加载，钟声就立刻播放。** 检查 `sound` 属性上的 `autoplay` 是否为 `false`；从别处复制粘贴时不小心留下的 `autoplay: true` 会完全绕过按钮。

**注视光标瞬间就选中了东西，没有任何停留。** 把 `rayOrigin` 切换成 `'entity'` 时，`fuse` 仍然是 `false`；两者需要一起改变。

**模拟器中 `laser-controls` 没有显示任何激光。** 确认 `<a-scene>` 上设置了 `xr-mode-ui="enabled: true"`（Firefox 和 Safari 目前对 WebXR 模拟器的支持有限或完全没有；这一步请使用 Chrome），并且你先按下了「进入 VR」——激光只会在一个正在进行中的 XR 会话里渲染出来。

**一个展品在你以为已经移除它之后，仍然对点击有反应。** `remove()` 缺少对应的 `removeEventListener` 调用，或者调用时使用了和 `init()` 添加时不同的函数引用。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：添加第四个交互式展品，使用同一个组件和同一条共用代码路径。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：用一件来自你自己文化、社区或语言的东西，替换某一个展品。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：给 `interactive-exhibit` 添加第二种交互类型（「细看」），并配有自己的键盘路径。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项。
2. 给选中某个展品的房间截图，给显示该展品描述的信息面板截图，再给打开注视光标开关的状态截图。
3. 把它们保存在你的学习日志和作品集中。等 XR Camp 社区上线后，也在那里分享它们。
4. 在你的学习日志中回答：如果你无法使用鼠标或触屏，你会依赖哪种输入方式？本课的注视光标和 `laser-controls` 是否真正给了你这个选项？

## 延伸阅读

- [A-Frame: Component](https://aframe.io/docs/1.8.0/core/component.html)（英文）
- [A-Frame: cursor component](https://aframe.io/docs/1.8.0/components/cursor.html)（英文）
- [A-Frame: laser-controls component](https://aframe.io/docs/1.8.0/components/laser-controls.html)（英文）
- [A-Frame: animation component](https://aframe.io/docs/1.8.0/components/animation.html)（英文）
- [W3C: WebXR Device API, Input](https://www.w3.org/TR/webxr/#input)（英文）

## 值得认识的女性

**Karina Acuña** 是一位常驻波哥大的数字设计师和 XR 创作者，她共同创立了创意技术工作室 Shift Active，并担任其首席执行官。据她本人介绍，她创建了「Mujer Aumentada」（增强的女性）项目，教女性和年轻人制作增强现实滤镜，该项目于 2020 年在哥伦比亚巴兰基亚举办的第一届 Women in Games 活动上启动。

本课的展览规模不大，但它背后的想法——让更多人参与构建和塑造沉浸式体验，而不仅仅是观看它们——正是 Acuña 的项目自 2020 年以来在哥伦比亚一直在教授的：交互设计与创作是一项任何人都可以学习的技能，而不是专家的专属领域。

> **编者注：发布前请核实。** 「值得认识的女性」中的人物信息必须以一手资料核实，并在可行时于课程上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

由 **W3C 的 Immersive Web 工作组**发布的 **WebXR Device API**，定义了本课所依赖的输入模型。每一个连接的控制器、手部追踪或仅有注视功能的输入方式，都会作为一个 `XRInputSource` 暴露给页面，它会报告一个 `targetRayMode`（手持控制器为 `tracked-pointer`，没有控制器的头显为 `gaze`，基于手机的会话为 `screen`）、一个 `handedness`，以及在相关的情况下，一个用于其按钮的 `gamepad`。这个 API 在 `XRSession` 上定义了 `selectstart`、`select` 和 `selectend` 事件，用来表示一次单一的、主要的操作，无论它来自扣动扳机、点按触屏，还是一次计时的注视；本课直接使用的 A-Frame 的 `laser-controls` 和 `cursor` 组件，正是建立在这同一个模型之上的，这也是为什么同一个 `'click'` 事件能在它们之间通用。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
