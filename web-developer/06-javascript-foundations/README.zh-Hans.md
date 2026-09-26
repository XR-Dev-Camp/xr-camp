# JavaScript 基础

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程:** `web-developer` · **课时:** `javascript-foundations-06` · **时长:** 约 16 小时 · 22 次学习，每次 45 分钟 · 每周 4 次，约 6 周

---

> 构建一个交互式仪表板或信息浏览器。

---

## 学习目标

完成本项目后，你将能够：

1. 把 JavaScript 文件连接到页面，并使用浏览器控制台进行测试和调试。
2. 把信息存放在变量中，并选择正确的类型：文本、数字、真或假、数组或对象。
3. 编写接收输入并返回结果的函数。
4. 用 `if` 和比较来做判断，用循环来重复工作。
5. 找到页面上的元素，创建新元素，并修改它们的文字。
6. 响应事件：输入、选择、点击和提交。
7. 用 `localStorage` 在浏览器中保存少量信息。
8. 读懂错误信息，并找到引起错误的那一行。

## 先决条件

- **课程 1.1–1.5。** 你已经有了一个无障碍、带样式、自适应的网站。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 现代浏览器及其控制台 | 运行和调试 JavaScript | 免费 |
| 文本编辑器（推荐 VS Code） | 编写 JavaScript | 免费 |
| 本地服务器，例如 VS Code 的 Live Server 扩展（可选） | 有些浏览器会限制直接打开的文件使用 `localStorage` | 免费 |

## 你将构建什么

为你的社区网站做一个**项目浏览器**：访客可以边输入边搜索各个项目，按面向的人群以及是否免费来筛选，还能把喜欢的项目保存到一个列表里，下次访问时它还在。结果数量会被朗读给屏幕阅读器用户，而且一切都能用键盘操作。

参考解决方案在 [`completed/`](completed/) 中。起始文件包含已经完成的 HTML 页面，以及一个带有十二个 TODO 的 JavaScript 文件，你一次完成一个概念。

## 文件夹说明

```text
06-javascript-foundations/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── explorer.js      # Begin here: a script with 12 TODOs
│   ├── index.html       # The explorer page (finished)
│   ├── styles.css       # The site's stylesheet, with explorer styles added
│   └── 3d-moment.html   # This lesson's 3D moment
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## 环境配置

1. 把本课的 `starter` 文件夹复制到你的网站文件夹中，命名为 `explorer`；或者把其中的三个文件复制到你的网站中。
2. 在网站的导航中添加一个指向浏览器页面的链接。
3. 在浏览器中打开 `index.html`，然后打开**控制台**：按 **F12**（在 Mac 上，Chrome 按 **⌘ + Option + J**，Firefox 按 **⌘ + Option + K**），然后选择 **Console**（控制台）。在整节课中都让它保持打开。

## 分步讲解

### 规划你的学习时间

| 次数 | 学习内容 | 完成成果 |
| --- | --- | --- |
| 1 | 环境配置；第 1 步（TODO 1） | 控制台里的第一条消息 |
| 2 | 第 2 步：值和变量 | 你能存放和修改信息 |
| 3 | 第 3 步：数组和对象（TODO 2） | 用数据表示的项目 |
| 4 | 第 3 步（续）：在控制台中读取数据 | 你能找到任何一个值 |
| 5 | 第 4 步：查找元素（TODO 3） | 存放在变量中的页面控件 |
| 6 | 第 5 步：函数 | 你能编写和调用函数 |
| 7 | 第 6 步：创建元素（TODO 4） | 一个生成卡片的函数 |
| 8 | 第 6 步（续） | 页面上的一张卡片 |
| 9 | 第 7 步：循环（TODO 5） | 页面上显示所有项目 |
| 10 | 第 8 步：模板字面量（TODO 6） | 结果数量 |
| 11 | 第 9 步：判断（TODO 7） | 一个判断是否匹配的函数 |
| 12 | 第 9 步（续）：`filter` | 结果会跟随筛选条件变化 |
| 13 | 第 10 步：事件（TODO 8） | 结果会随输入即时更新 |
| 14 | 第 10 步（续）：提交按钮和焦点 | 一个方便键盘操作的表单 |
| 15 | 第 11 步：空状态（TODO 9） | 没有匹配结果时给出有用的提示 |
| 16 | 第 12 步：带状态的按钮（TODO 10） | 能记住状态的保存按钮 |
| 17 | 第 13 步：localStorage（TODO 11） | 刷新页面后仍然保留的保存 |
| 18 | 第 13 步（续）：`try...catch` | 即使存储不可用，页面也能正常工作 |
| 19 | 第 14 步：已保存列表（TODO 12） | 一个完成的浏览器 |
| 20 | 第 15 步：调试，以及 **3D 时刻** | 你的第一个 3D 事件 |
| 21 | [`tests/checklist.md`](tests/checklist.md) | 一个经过测试的浏览器 |
| 22 | 一项拓展挑战，然后**提交作业** | 作品集中的项目浏览器 |

### 第 1 步：连接脚本（TODO 1）

页面用下面这行代码加载脚本：

```html
<script src="explorer.js" defer></script>
```

`defer` 的意思是「等页面的 HTML 读完之后再运行它」，这样脚本要找的每个元素都已经存在了。

在 `explorer.js` 中写：

```js
console.log('The explorer is connected.');
```

保存，刷新，然后看看控制台。`console.log` 是你手中最有用的调试工具：随时可以用它来查看任何一个值是什么。

### 第 2 步：值和变量

**变量**是一个值的名字：

```js
const centreName = 'Riverside';   // text: a string, in quotes
const programmesCount = 8;        // a number
let isOpenToday = true;           // true or false: a boolean
isOpenToday = false;              // let can change; const cannot
```

除非这个值需要改变，否则都用 `const`；需要改变时就用 `let`。在控制台中输入这些代码，按 Enter，看看每一个的结果。

（代码中的注释意思是：文本，也就是字符串，要放在引号里；数字；真或假，也就是布尔值；`let` 可以改变，`const` 不能。）

### 第 3 步：数组和对象（TODO 2）

**数组**是一个列表，写在方括号里。**对象**把有名字的值组合在一起，写在花括号里。项目浏览器的数据是一个由对象组成的数组：

```js
const programmes = [
  { id: 'homework', name: 'Homework club', audience: 'children', free: true },
  { id: 'english', name: 'English conversation practice', audience: 'adults', free: true },
];

programmes.length;       // 2: how many
programmes[0];           // the first one (counting starts at 0)
programmes[0].name;      // 'Homework club'
```

用完全相同的结构添加你自己的项目。结构很重要：每个对象都必须有相同的属性名。

（`length` 表示有多少个；`[0]` 是第一个，因为计数从 0 开始。）

### 第 4 步：查找元素（TODO 3）

```js
const results = document.querySelector('#results');
```

`document` 就是页面。`querySelector` 接收一个 **CSS 选择器**，就是你在课程 1.3 中写过的那种，并返回第一个匹配的元素。找出你需要的每一个控件，把它存放在一个 `const` 中。

### 第 5 步：函数

**函数**是一段有名字的工作，你可以反复运行它。它可以接收输入（参数），并返回一个结果（`return`）：

```js
function describe(programme) {
  return `${programme.name} is on ${programme.day}.`;
}

describe(programmes[0]);   // 'Homework club is on Weekdays.'
```

### 第 6 步：创建元素（TODO 4）

```js
function createCard(programme) {
  const card = document.createElement('li');
  card.className = 'card';

  const heading = document.createElement('h3');
  heading.textContent = programme.name;

  card.append(heading);
  return card;
}
```

设置文字时用 `textContent`，永远不要用 `innerHTML`。`textContent` 始终把文字当作文字处理；`innerHTML` 则把它当作 HTML 处理。在第 5 阶段，你会看到攻击者如何借此注入代码。

测试一下：在控制台中输入 `results.append(createCard(programmes[0]))`。

### 第 7 步：循环（TODO 5）

`for...of` 循环会对数组中的每一项运行同样的代码：

```js
for (const programme of programmes) {
  results.append(createCard(programme));
}
```

把它放进一个名为 `showResults()` 的函数中，并在函数开头调用 `results.replaceChildren()` 来清空列表，这样卡片就永远不会被画两次。

### 第 8 步：模板字面量（TODO 6）

反引号让你可以用 `${ }` 把值放进文字中：

```js
count.textContent = `Showing ${found.length} of ${programmes.length} programmes.`;
```

`#count` 带有 `role="status"`，所以每当它的文字改变时，屏幕阅读器都会朗读新的文字。

### 第 9 步：判断（TODO 7）

`if` 只在某件事为真时才运行代码。比较会得出真或假：`===`（等于）、`!==`（不等于）、`>`、`<`。可以用 `&&`（并且）、`||`（或者）和 `!`（不是）把它们组合起来。

```js
function matches(programme) {
  if (freeCheckbox.checked && !programme.free) return false;
  if (audienceSelect.value !== 'all' && programme.audience !== audienceSelect.value) return false;
  return true;
}

const found = programmes.filter(matches);
```

`filter` 会对每一项运行你的函数，并保留那些返回 `true` 的项。

对于搜索框，把搜索词和项目的文字都转成小写（`toLowerCase()`），再用 `includes()` 检查，这样「English」和「english」都能匹配。

### 第 10 步：事件（TODO 8）

**事件**就是发生了的某件事：按下一个键、勾选一个框、点击一个按钮。`addEventListener` 会在事件发生时运行你的函数：

```js
filters.addEventListener('input', showResults);
```

在整个表单上放一个监听器，就能捕捉到其中每个控件的变化。然后处理 **Show results**（显示结果）按钮：`submit` 事件通常会重新加载页面，所以要调用 `event.preventDefault()`，显示结果，并把焦点移到结果数量上，让键盘用户能听到结果。

### 第 11 步：空状态（TODO 9）

没有任何匹配时，一个空白的页面会让人困惑。要明确说出来，并建议可以怎么做：「No programmes match. Try fewer words, or a different audience.」（没有匹配的项目。试试少用几个词，或者换一个人群。）

### 第 12 步：带状态的按钮（TODO 10）

每张卡片都有一个 **Save**（保存）按钮。它是一个切换按钮，所以和课程 0.1 中一样，使用 `aria-pressed`：

```js
button.setAttribute('aria-pressed', 'false');
button.dataset.id = programme.id;     // becomes data-id="homework"
```

点击它时，把该项目的 `id` 加入 `savedIds` 数组；如果它已经在里面，就把它移除。然后更新 `aria-pressed`。样式表会在已按下的按钮上显示一个对勾：不只是靠颜色。

### 第 13 步：在浏览器中保存（TODO 11）

`localStorage` 会把文字保存在这个浏览器中，即使页面关闭后也还在。数组不是文字，所以要用 `JSON.stringify` 把它转成文字，再用 `JSON.parse` 转回来：

```js
try {
  localStorage.setItem('riverside-saved-programmes', JSON.stringify(savedIds));
} catch (error) {
  console.warn('Could not save programmes:', error);
}
```

存储可能被关闭、被隐私设置阻止，或者已经满了。`try...catch` 意味着即使保存失败，浏览器页面也照样能用，只是记不住而已。永远要为可能失败的事情做好准备。

`localStorage` 只存在于这个设备上的这个浏览器中，而且对使用同一个浏览器的其他人来说并不私密。永远不要在里面存放密码或个人信息。页面上写着「Saved in this browser only」（只保存在这个浏览器中）：既诚实，又属实。

### 第 14 步：已保存列表（TODO 12）

编写 `showSaved()`，它会列出已保存的项目；如果一个都没有，就显示「Nothing saved yet」（还没有保存任何项目）。在页面加载时调用它，并在每次保存之后再调用一次。

### 第 15 步：读懂错误

每个开发者的代码都会出错。出错时，控制台会显示一条红色消息，并附上**文件名和行号**。慢慢读：

| 错误 | 通常意味着 |
| --- | --- |
| `Uncaught SyntaxError: Unexpected token` | 在那一行附近缺少了括号、逗号或引号 |
| `Uncaught TypeError: Cannot read properties of null`（Firefox：`... is null`） | `querySelector` 什么也没找到：检查选择器和 `id` |
| `Uncaught ReferenceError: x is not defined` | 拼写错误，或者这个变量从来没有被创建，或在当前位置无法访问 |

在控制台中点击文件名，就能跳到那一行。然后在它前面加一个 `console.log`，看看这些值实际上是什么。

## 关键代码解析

**`programmes.filter(matches)`。** 传入的是函数本身，不带 `()`，这样 `filter` 就能对每个项目调用它一次。

**`results.replaceChildren()`。** 一步清除一个元素内部的所有内容。

**`button.dataset.id`。** 读取和写入 `data-id`。自定义数据属性让你可以把脚本需要的信息直接存放在元素上。

**`role="status"` 加上 `tabindex="-1"`。** 结果数量改变时会被朗读出来，而且表单提交后，脚本可以把焦点移到它上面。

## 3D 时刻

打开 [`starter/3d-moment.html`](starter/3d-moment.html)。一盏纸灯笼挂在夜空中。点击它，或者按下按钮（**Change the lantern's colour**，改变灯笼的颜色），它就会改变颜色，屏幕阅读器也会朗读新的颜色。

读一读这段脚本：它就是你今天写过的事件监听器，只不过用在了一个 3D 物体上。`cursor="rayOrigin: mouse"` 让鼠标点击能够到达 3D 场景；同一个函数 `changeColour` 既由点击调用，也由按钮调用，所以键盘和鼠标能做完全一样的事。**每一个 3D 交互都要有键盘操作路径**，这条规则你会在整个 XR Camp 中一直遵守。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| 每个控件都有标签 | 1.3.1、3.3.2 | 搜索框、筛选器和复选框都说明了自己是什么。 |
| 结果和「没有找到」都会被朗读 | 4.1.3 | 屏幕阅读器用户知道筛选已经生效。 |
| 保存按钮是带有 `aria-pressed` 的真正按钮 | 4.1.2 | 它们的状态会被朗读出来：「已按下」或「未按下」。 |
| 已保存状态不只靠颜色来显示 | 1.4.1 | 用一个对勾，而不只是改变颜色。 |
| 一切都能用键盘操作 | 2.1.1 | 包括 Show results 按钮和每一个 Save 按钮。 |
| 输入时不改变上下文 | 3.2.2 | 结果在原地更新；焦点不会跳走。 |

## 性能注意事项

项目浏览器最多只画几十张卡片，所以每按一次键就全部重画一次，也是瞬间完成的。如果有成千上万个项目，你就要等用户停止输入之后再重画，这种技术叫作防抖（debouncing），你会在第 2 阶段学到。这个脚本只有几 KB，不需要下载任何库。

## 常见错误

| 错误做法 | 会发生什么 | 正确做法 |
| --- | --- | --- |
| 把脚本放在 `<head>` 中却没有 `defer` | `querySelector` 返回 `null` | 使用 `defer`，或把脚本放在 `<body>` 末尾 |
| 在 `if` 中用 `=` 代替 `===` | 它会修改值，而不是进行比较 | 比较时用 `===` |
| 用 `innerHTML` 设置文字 | 处理真实数据时有安全风险 | 用 `textContent` |
| 忘记 `replaceChildren()` | 卡片出现两次 | 先清空列表 |
| 使用 `localStorage` 时不加 `try...catch` | 存储被阻止或已满时页面会出错 | 始终把它包起来 |
| 每按一次键就移动焦点 | 屏幕阅读器会找不到当前位置 | 用实时区域来朗读；只在提交时移动焦点 |

## 故障排查

**什么都没发生，控制台也是空的。** 检查 `<script>` 标签的 `src` 是否与文件名完全一致，以及你是否保存了文件。

**`Cannot read properties of null`。** 某个选择器什么也没找到。把脚本中的 `#id` 和 HTML 中的 `id` 逐个字母对照。

**刷新后保存的内容消失了。** 打开控制台：如果有警告，说明存储被阻止了。有些浏览器会限制直接打开的文件使用存储；试试本地服务器。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)** —— 一个「Clear filters」（清除筛选）按钮。
2. **[创意](challenges/challenge-2.zh-Hans.md)** —— 用你自己的语言写标签和消息。
3. **[探索](challenges/challenge-3.zh-Hans.md)** —— 按日期或名称对结果排序。

## 提交作业

1. 完成 [`tests/checklist.md`](tests/checklist.md) 中的每一项。
2. 给打开了筛选条件的项目浏览器截一张图，再给没有任何错误的控制台截一张图。
3. 把它们保存在你的学习日志和作品集中。也可以和其他开发者分享：参见[在哪里分享你的作品和寻求帮助](../../docs/en/community.md)（英文）。
4. 在学习日志中回答：你遇到的第一个错误是什么？你是怎样修复它的？

## 延伸阅读

- [MDN —— JavaScript 第一步](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting)（英文）
- [MDN —— 事件介绍](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events)（英文）
- [MDN —— Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)（英文）
- [MDN —— Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)（英文）

## 值得认识的女性

**Loiane Groner** 是一位巴西软件工程师和教育者，来自圣埃斯皮里图州（Espírito Santo），现居美国佛罗里达州。她写了《Learning JavaScript Data Structures and Algorithms》（学习 JavaScript 数据结构与算法）一书，并用葡萄牙语制作了很受欢迎的免费编程课程。她是 Google 开发者专家（Web 技术方向）、Microsoft MVP 和 Java Champion。

用你自己的语言讲授的免费课程，来自一位和你从同一个起点出发的人：拉丁美洲的许多开发者就是这样学会编程的。本课中的数组、对象和循环，正是她那本书所依托的基础。

> **编辑说明 —— 发布前须核实。** 「值得认识的女性」栏目中的生平陈述必须与原始资料核对，并在可行时于本课上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

JavaScript 的正式名称是 **ECMAScript**，由 Ecma International 的 TC39 委员会维护，每年发布一个新版本。`querySelector`、`createElement` 和事件并不属于 ECMAScript：它们来自 **DOM 标准**（WHATWG），而 `localStorage` 来自 HTML Living Standard。JavaScript 是语言；浏览器的各项标准让它能够操作页面。

## 许可协议

代码：[`LICENSE-CODE`](../../LICENSE-CODE) · 内容：[`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
