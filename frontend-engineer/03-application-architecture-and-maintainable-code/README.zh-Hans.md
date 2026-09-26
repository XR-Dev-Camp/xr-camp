# 应用架构与可维护代码

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `frontend-engineer` · **课时：** `application-architecture-and-maintainable-code-03` · **时长：** 约 12 小时 · 16 次学习，每次 45 分钟 · 每周 4 次，约 4 周

---

> 重构一个故意写得结构糟糕的应用。

---

## 学习目标

完成本项目后，你将能够：

1. 识别常见的**代码异味（code smell）**：含义不清的命名、魔法数字、全局变量、重复的代码，以及做了太多事情的函数。
2. **重构（refactor）**：在不改变代码行为的前提下，一小步一小步地改变代码的组织方式。
3. 把一个应用拆分成职责清晰的多层：**配置**、**工具函数**、**状态**（一个 store）、**组件**，以及一个把它们**连接**起来的文件。
4. 编写**纯函数**，并用一个简单的检查页面来测试它们。
5. 把状态集中保存在一处，只通过具名的动作（action）来修改它，并在状态变化时更新页面（**订阅，subscribe**）。
6. 解释为什么对用户输入的文本使用 `innerHTML` 是危险的，并改用安全的方式来构建元素。
7. 使用**渐进增强**：页面首先是有用的 HTML，JavaScript 再为其添加可交互的部分。

## 先决条件

- **课程 2.1：现代 JavaScript**（模块、`import` 和 `export`）。
- **课程 2.2：DOM 与动态界面**（构建元素、事件委托、焦点管理、实时区域）。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 一个现代浏览器，带开发者工具 | 并排测试新旧两个计划器 | 免费 |
| VS Code 和本地服务器 | 模块需要 `http://` | 免费 |
| Git（来自课程 1.8） | 每完成一个重构步骤就提交一次，这样可以随时回退 | 免费 |

## 你将构建什么

**My XR Camp** 的第三部分：一个**学习计划器（session planner）**。为一周安排学习时段，把它们标记为完成，并查看你距离每周 4 个时段的目标还有多远。

反转之处在于：这个计划器已经能用了。它位于 [`starter/old/`](starter/old/)，而且是故意写得很糟糕的——就像很多真实代码那样：单字母命名、没有名字的数字、一切都是全局的、HTML 拼接在字符串里，还藏着一个安全问题。你的任务是把它**重构**成一个干净、经过测试的结构，让它做的事情完全一样，但更容易阅读、修改和扩展。

参考答案在 [`completed/`](completed/) 中。起始代码包含旧的应用（不要修改它）、一份待填写的 `behaviour.md`（TODO 1-2），以及带有 TODO 3-13 的新文件。

## 文件夹说明

```text
03-application-architecture-and-maintainable-code/
├── README.md            # 本指南
├── README.es.md         # 西班牙语
├── README.zh-Hans.md    # 简体中文
├── project.json         # 课时元数据
├── starter/
│   ├── old/index.html, old/app.js   # 混乱的旧计划器：用来对照
│   ├── behaviour.md     # 旧应用做了什么，以及它的代码异味：TODO 1–2
│   ├── index.html       # 新页面：TODO 11
│   ├── styles.css       # 已完成
│   ├── check.html       # utils.js 的测试（已完成）
│   ├── js/config.js     # TODO 3
│   ├── js/utils.js      # TODO 4–5
│   ├── js/store.js      # TODO 6–8
│   ├── js/components/   # TODO 9–10
│   ├── js/main.js       # TODO 12–13
│   └── 3d-moment.html   # 一个待重构的混乱 3D 场景
├── completed/           # 参考答案：最后再打开
├── challenges/          # 三个拓展挑战：基础挑战为必做
├── tests/checklist.md   # 提交前的自查清单
├── assets/
└── screenshots/
```

## 环境配置

1. 在你的 `my-xr-camp` 文件夹旁新建一个 `planner` 文件夹，把起始代码复制进去。
2. 把它变成一个 Git 仓库，并提交未经改动的起始代码：先 `git init`，再 `git add .` 和 `git commit -m "Starter"`。从现在起，每完成一步都提交一次。如果某一步出了问题，你可以回退。
3. 启动本地服务器。在一个标签页中打开 `old/index.html`，在另一个标签页中打开 `index.html`，两边都打开各自的**控制台（Console）**。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 环境配置；使用旧计划器，并列出它做的事情（TODO 1） | 一份行为清单 |
| 2 | 第 1 步：代码异味（TODO 2） | 八种异味，附带行号 |
| 3 | 第 2 步：规划架构 | 一张五层结构的示意图 |
| 4 | 第 3 步：配置（TODO 3） | 把每个设置都放进一个文件 |
| 5 | 第 4 步：纯函数（TODO 4） | 写出 `plural` 和 `describeMinutes`；控制台现在会指出下一个缺失的导出 |
| 6 | 第 4 步（续）（TODO 5） | 每项检查都通过 |
| 7 | 第 5 步：store（TODO 6） | 已保存的时段能加载出来，包括旧数据 |
| 8 | 第 5 步（续）（TODO 7–8） | 动作和订阅 |
| 9 | 第 6 步：组件（TODO 9–10） | 安全的元素，不使用 `innerHTML` |
| 10 | 第 7 步：渐进增强（TODO 11） | 用 HTML 写成的表单 |
| 11 | 第 8 步：把一切连接起来（TODO 12） | 添加时段可以正常工作 |
| 12 | 第 8 步（续）（TODO 13） | 完成和删除都能正常工作，焦点也在正确的位置 |
| 13 | 第 9 步：与行为清单对照 | 一次可以信赖的重构 |
| 14 | **3D 时刻** | 一个整洁的 3D 展览 |
| 15 | [`tests/checklist.md`](tests/checklist.md) | 一个完成的计划器 |
| 16 | 一个拓展挑战，然后是**提交作业** | My XR Camp 的第三部分 |

### 第 1 步：先弄清它做了什么，再找出异味（TODO 1–2）

**重构**指的是在不改变代码行为的前提下改变代码的结构。所以在改动任何东西之前，你需要准确知道它的行为是什么。花十分钟使用旧计划器，把你发现的每一种行为写进 `behaviour.md`：添加一个时段、把它标记为完成、删除它、重新加载页面、添加一个空的主题、达到 4 个时段时，各自会发生什么。

然后阅读 `old/app.js`，找出**代码异味**：那些预示代码将来难以修改的信号。此时还不需要修复任何东西。找找看：

| 异味 | 在旧计划器中的体现 |
| --- | --- |
| 毫无意义的命名 | `a`、`x`、`fn2`、`h`、`n`、`dn` |
| **魔法数字**：没有名字的数值 | `45`、`4`，以及键名 `'xrc_s'` |
| 谁都能修改的全局变量 | `a` 和 `x`，被每个函数使用 |
| 一个函数做了很多事 | `fn2` 又排序、又构建 HTML、又计数、又计算、又保存 |
| 重复的代码 | `fn2` 中的两个循环；日期列表 |
| 死代码 | `x` 被赋值，却从未被读取 |
| 只是复述代码的注释 | `// this function renders` |
| 用字符串拼出的 HTML | 页面的每一部分都拼接在 `innerHTML` 里 |
| 用位置当作身份标识 | `tog(i)` 和 `del(i)` 使用数组位置，而列表排序后位置会变 |

还有一种异味同时也是一个 **bug**：试着添加一个主题为 `<b>Hello</b>` 的时段。旧应用不会显示你输入的文字：它会把它变成加粗的 HTML。这正是跨站脚本攻击（cross-site scripting）的原理，课程 5.5 会再回顾这一点。

### 第 2 步：规划架构

**架构（architecture）**指的是如何把一个程序拆分成多个部分，以及这些部分之间如何通信。一条好规则是：每个文件只有**一个职责**，并且你能用一句话说清楚它是什么。

```text
config.js          设置：日期、45 分钟、目标 4、存储键名
utils.js           纯函数：plural、describeMinutes、bySchedule、sessionLabel
store.js           状态，以及唯一能修改或保存它的代码
components/        根据数据构建元素；从不修改状态
main.js            把页面的元素和事件与 store 连接起来
```

箭头只朝一个方向走。`main.js` 使用 store 和组件；组件使用工具函数；所有部分都可以读取 config。没有任何东西反过来指向 `main.js`。当你想知道「这件事发生在哪里？」时，这个结构本身就会告诉你答案。

把这个结构画在纸上，带上箭头，工作时放在手边。

### 第 3 步：配置（TODO 3）

把每一个魔法数字都放进一个文件，并给它一个名字：

```js
export const SESSION_MINUTES = 45;
export const WEEKLY_GOAL = 4;
```

现在「把每周目标改成 5」只需要改一行代码，而且这个名字本身就说明了原来的 4 是什么意思。存储键名要和旧应用保持一致：使用旧计划器的人，他们的时段就保存在这个键名下。

### 第 4 步：纯函数与检查页面（TODO 4–5）

**纯函数**对相同的输入总是给出相同的输出，并且不改变其他任何东西：不涉及 DOM、不涉及存储、不涉及全局变量。纯函数是最容易测试的代码，因为一个测试就是「给它这个，期望得到那个」。

`check.html` 是一个很小的测试页面。它会调用你的函数并比较结果：

```js
check('1 hour 30 minutes', describeMinutes(90), '1 hour 30 minutes');
```

在写 TODO 4 之前先打开它：控制台会说 `utils.js` 没有这样的导出。写出 `plural` 和 `describeMinutes`，重新加载，观察错误信息如何变化：现在它会指出 `bySchedule`。等 TODO 5 也完成后，每一行都会出现，并且应该显示 PASS。这正是专业团队的工作方式：小函数，自动检查，这样之后如果有改动破坏了某个函数，会立刻被发现。

注意 `describeMinutes(0)` 给出的是「0 minutes」，而旧应用说的是「0 hours 0 minutes」。这是一次**刻意的改动**，不是意外：把它写进 `behaviour.md` 的「Deliberate changes」部分。

### 第 5 步：store（TODO 6–8）

**store** 保存状态，也是唯一被允许修改它的代码。其他一切都只是在询问：

- `getSessions()` 返回一份排序好的**副本**。旧应用是在它的绘制函数内部对真实数组排序的，所以按钮的位置能对上纯属巧合：任何在不重新绘制的情况下重新排序数组的改动，都会让 `tog(i)` 改到错误的时段。
- 三个**动作（action）**——`addSession`、`toggleSession` 和 `removeSession`——是修改它的唯一方式。每一个都以 `commit()` 结束：先保存，再通知所有人。
- `subscribe(listener)` 让其他代码可以说「有任何变化时通知我」。

每个时段都会通过 `crypto.randomUUID()` 获得一个 **id**。动作使用的是 id，而不是位置，因此排序或删除都绝不会让你改到错误的时段。

**数据比代码活得更久。** 旧应用保存的是 `{ d, t, w, done }`。你的 `upgrade` 函数会同时读取旧的和新的结构，这样学习者已保存的计划就能在重构后继续保留：

```js
day: saved.day ?? saved.d,
```

### 第 6 步：组件（TODO 9–10）

这里的**组件（component）**指的是一个接收数据、返回元素的函数。它从不修改状态，也从不添加监听器：它只负责构建。

```js
const text = document.createElement('span');
text.textContent = sessionLabel(session);   // 文本始终保持为文本
```

`textContent` 把一切都当作纯文本处理，所以 `<b>Hello</b>` 会原样显示。这修复了第 1 步中提到的安全 bug。把它写进「Deliberate changes」。

每个按钮都带有 `data-action="toggle"` 或 `data-action="delete"`，列表项则带有 `data-id`。这些就是 `main.js` 需要知道的全部信息：哪个按钮被按下了，对应哪个时段。

### 第 7 步：渐进增强（TODO 11）

旧应用把整个表单都从一个 JavaScript 字符串中构建出来。一旦脚本出错，页面就会一片空白。**渐进增强**意味着先从简洁、有意义的 HTML 开始，再让 JavaScript 在此基础上添加功能：

- 标题、说明文字，以及两个列表的标题都写在 `index.html` 里。
- 表单也用 HTML 写成，带有真正的 `<label>`，但带有 `hidden` 属性。当一切都加载完成后，`main.js` 会移除这个属性，所以表单绝不会在还不能用的时候就出现。
- 一段 `<noscript>` 消息说明了在 JavaScript 关闭时会缺失什么。

用 HTML 写成的表单，也比藏在字符串里的同一份表单更容易阅读，也更容易做无障碍检查。

### 第 8 步：把一切连接起来（TODO 12–13）

`main.js` 是唯一了解这个页面元素的文件。它做三件事：

1. **绘制：** `render(sessions)` 填充两个列表和摘要。`subscribe(render)` 意味着它会在每次动作之后自动运行。
2. **监听：** 一个用于表单的 `submit` 监听器，以及一个用于两个列表中所有按钮的委托型 `click` 监听器（就像课程 2.2 中那样）。
3. **照顾用户：** 移动焦点、显示错误、朗读变化。

`alert('Error!')` 已经不存在了。现在，一个空的主题会在字段旁边显示一条消息，把该字段标记为 `aria-invalid="true"`，并把焦点放回其中（课程 1.2）。

在课程 2.2 中，你只更新变化的部分。在这里，整个列表会在每次动作之后重新绘制，这样更简单，但会摧毁原本拥有焦点的按钮。所以 `main.js` 会有意识地把焦点放回去：按下**完成**后，焦点回到该时段在新列表中的按钮上，通过 id 找到它；按下**删除**后，焦点移到下一个删除按钮、上一个删除按钮，或者主题输入框。这两种做法都是有效的；对于一个较短的列表，用更简单的那种方式也没问题，只要你妥善管理焦点。

### 第 9 步：与行为清单对照

回到 `behaviour.md`，把每一行都在两个计划器中并排测试一遍。除了你列出的刻意改动之外，所有行为都应该一致。除了「0 minutes」这个措辞和安全修复之外，`completed/` 中还包含一些你可能会注意到的、刻意做出的小改动：它会拒绝只包含空格的主题，达成目标的消息措辞不同，空列表会显示「Nothing here yet.」，按钮和状态朗读也增加了无障碍标签。这些是改进，不是错误，所以请把它们加入你自己的「Deliberate changes」清单，而不要当作不一致来处理。这正是一次重构变得可信赖的时刻。

然后像一个陌生人一样阅读你的新代码。有没有人能在十秒内找到每周目标是在哪里设置的？时段保存在哪里？按下删除会发生什么？

## 关键代码解析

**`subscribe` 返回一个函数。** `const stop = subscribe(render)` 开始监听；之后调用 `stop()` 就会停止监听。这种「观察者」模式正是大多数前端框架用来告诉页面「状态变了」的方式。

**`[...sessions].sort(bySchedule)`。** `sort` 会改变它所调用的那个数组本身。先复制一份（`[...sessions]`）能让保存的顺序保持不变。

**`bySchedule` 内部的 `a || b`。** 如果日期不同，它们的差值就不是零，于是就使用这个差值。如果差值是零（同一天），`||` 就会接着比较时间。

**`try { … } catch { … }`** 不带 `(error)`：现代 JavaScript 允许你在不需要它时省略。

**`data-action` 和 `closest('button[data-action]')`。** HTML 说明了每个按钮该做什么；一个监听器负责读取它。添加一种新的按钮不需要新增监听器。

## 3D 时刻

打开 [`starter/3d-moment.html`](starter/3d-moment.html)：三个物体立在展台上，缓缓旋转。它能正常运行，但脚本很混乱：同样的六行代码被复制了三遍，位置是手动输入的，命名都是单字母，还有一个 `setInterval` 要求每 16 毫秒执行一次，即使标签页被隐藏时也一直运行（浏览器只是把它调慢了）。

现在打开 [`completed/3d-moment.html`](completed/3d-moment.html)。同一个场景，经过了重构：

- **配置：** `EXHIBITS` 是一个数据数组（名称、形状、颜色）。添加第四个物体只需要一行代码，它的位置、展台和描述都会随之自动生成。
- **组件：** `pedestal` 构建一个底座和一个物体；`turntable` 让某个东西旋转。每一个都是只有一个职责的 A-Frame 组件。你会在第 3 阶段写更多这样的组件。
- **动效集中在一处：** 如果学习者要求设备减少动态效果，`motion` 对象就会以暂停状态开始，**Pause animation（暂停动画）**按钮会改变它。`turntable` 每一帧都会检查这个状态。
- **场景描述由同一份数据构建而成**，因此它和场景永远不会互相矛盾。

A-Frame 每一帧只调用一次 `tick`，并且只在场景运行时才调用，所以不会有计时器在隐藏的标签页里持续运行。试着给两个版本各添加第四个展品，比较一下你分别需要修改多少行代码。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 表单有可见的标签，写在 HTML 里 | 1.3.1, 3.3.2 | 每个字段都有名称。 |
| 错误以文字形式显示在字段旁边，而不是用 `alert()` | 3.3.1 | 学习者修正错误时，消息始终可见。 |
| 按下完成和删除后，焦点会落在合理的位置 | 2.4.3 | 重新绘制列表不能让学习者迷失位置。 |
| 每个按钮的名称都包含对应的时段 | 2.4.6, 4.1.2 | 「Delete: CSS grid」，而不是十个都叫「Delete」的按钮。 |
| 每个按钮的名称以可见的文字开头 | 2.5.3 | 使用语音控制的人可以说「click Delete」。 |
| 变化会被朗读 | 4.1.3 | 状态消息能传达给使用屏幕阅读器的人。 |
| 3D 场景可以暂停，并遵循减少动态效果的设置 | 2.2.2 | 动效绝不会被强加给任何人。（遵循减少动态效果是超出 WCAG 之外的良好实践。） |

## 性能注意事项

旧的 3D 脚本每秒大约运行 60 次计时器，并且永远不停止，即使标签页被隐藏时也是如此（浏览器只是把它调慢，从不真正停止），而且每次都以文字形式修改三个属性。重构后的 `turntable` 直接在 A-Frame 自身的帧循环中修改一个数字（`object3D.rotation.y`），浏览器会在标签页隐藏时把它调慢或停止。整洁的结构和良好的性能常常是同时出现的：当每个职责都有唯一的归属时，更容易看清哪里在浪费资源。

对于几十个元素的列表，整体重新绘制没有问题。如果一个列表可能增长到成千上万个元素，你就应该回到「只更新变化的部分」这种做法（课程 2.2）。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 一边重构一边添加新功能 | 一旦出错，你分不清是哪个改动导致的 | 先重构，提交，再改动行为 |
| 步子迈得太大，中间不提交 | 一旦出错就得从头再来 | 每完成一个 TODO 就提交一次 |
| 修改存储键名或数据结构 | 学习者会丢失已保存的时段 | 保留原来的键名；加载时升级旧数据 |
| 组件修改了状态 | 两个地方修改同一份数据，最终互相矛盾 | 组件只负责构建；动作负责修改 |
| 用数组位置当作身份标识 | 排序后会删除错误的时段 | 使用 id |
| 对用户输入的任何内容使用 `innerHTML` | 用户的文本会变成 HTML，甚至脚本 | 使用 `textContent` 和 `createElement` |

## 故障排查

**报错 `does not provide an export named`。** 该文件中的某个 TODO 还没完成，或者你忘记写 `export` 了。

**报错 `Cannot read properties of null (reading 'addEventListener')`**（Firefox 会说 `form is null`）。`main.js` 在寻找一个 `index.html` 中还不存在的元素。完成 TODO 11，并检查 id 是否完全一致。

**我的旧时段不见了。** 检查 `STORAGE_KEY` 是否是 `'xrc_s'`，以及 `upgrade` 是否读取了 `saved.d`、`saved.t` 和 `saved.w`。

**报错 `crypto.randomUUID is not a function`。** 它只在安全页面上可用：`https://`，或者 `http://localhost` 和 `http://127.0.0.1`。如果你是通过网络地址（比如 `http://192.168.1.5`）打开计划器的，请改用 `localhost`。

**表单一直不出现。** `main.js` 在执行到最后一行之前就停止了。去控制台里找到第一个错误。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：给整洁版本添加一个功能（编辑某个时段的主题），并数一数你改动了多少个文件。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：让这个计划器成为你自己的：用你自己的设置，以及用你自己的语言显示日期和时间。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：利用 store 的动作，给它添加撤销（undo）功能。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项。
2. 为你的计划器截图，再截一张 `check.html` 全部检查通过的截图。
3. 把这些截图和你填写好的 `behaviour.md` 保存在你的学习日志和作品集中。也可以和其他开发者分享：参见[在哪里分享你的作品和寻求帮助](../../docs/en/community.md)（英文）。
4. 在你的学习日志中回答：旧应用里哪一种异味最让你意外，你会怎么向朋友解释它？

## 延伸阅读

- [MDN: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)（英文）
- [MDN: Progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement)（英文）
- [Wikipedia: Pure function](https://en.wikipedia.org/wiki/Pure_function)（英文）
- [MDN: innerHTML, security considerations](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations)（英文）
- [A-Frame: Writing a component](https://aframe.io/docs/1.8.0/introduction/writing-a-component.html)（英文）

## 值得认识的女性

**Estefany Aguilar** 是一位资深前端开发者兼讲师，居住在哥伦比亚的麦德林。她在 Platzi 上用西班牙语讲授过约 20 门课程，包括 CSS 架构、设计系统和一场专业技术测试，她还曾担任 CSS Conf Colombia 的组织者，并为 MedellínCSS 社区举办过工作坊。

架构和设计系统，正是团队在代码规模不断增长时保持整洁的方法——和本课中的配置、store、组件是同一个道理。用你自己的语言、向来自你所在地区的人学习这些内容，会让你更容易想象自己也能做到。

_资料来自公开来源，于 2026 年核实。发现错误？[告诉我们](https://github.com/XR-Dev-Camp/xr-camp/issues)。_

## 标准聚焦

你把计划器拆分成的这些模块，使用的是 Ecma International 的 TC39 委员会发布的 **ECMAScript** 标准：`import`、`export` 和 `const` 都是在其中定义的。`crypto.randomUUID()` 来自 W3C 的 **Web Cryptography API**，而 `textContent` 和 `replaceChildren` 来自 WHATWG 的 **DOM Standard**。正因为它们是标准，同样整洁的结构才能在每一个现代浏览器中运行，无需安装任何框架。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
