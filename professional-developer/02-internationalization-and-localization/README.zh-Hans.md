# 国际化与本地化

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**课程：** `professional-developer` · **课时：** `internationalization-and-localization-02` · **时长：** 约 10 小时 · 14 次学习，每次 45 分钟 · 每周 4 次，约 4 周

---

> 用英语、西班牙语和简体中文发布一个应用。

## 学习目标

完成本项目后，你将能够：

1. 解释国际化（i18n：让应用*具备*切换语言的能力）和本地化（l10n：为某一种具体语言完成实际翻译工作）之间的区别。
2. 用 `Intl.Locale` 和脚本最大化（script maximization），从一份 BCP 47 标签列表中，为学习者选出他们能用的最佳语言。
3. 用 `Intl.NumberFormat`、`Intl.DateTimeFormat` 和 `Intl.RelativeTimeFormat`，为某种语言正确格式化数字、日期和相对时间，而不是自己编写格式化规则。
4. 用 `Intl.PluralRules` 为某种语言选出正确的复数形式，包括像简体中文这样只有一种形式的语言。
5. 在 `<canvas>` 上绘制一个 3D 文字标签，让它能显示浏览器能渲染的任何文字系统，并解释为什么 A-Frame 和 three.js 内置的文字做不到这一点。
6. 搭建一套字体栈、`lang` 属性和断行规则，让中文文本获得正确的字体和正确的换行位置，同时不伪造它本不该有的斜体。
7. 构建一个能承受文本膨胀的布局，并在任何一个字符串被专业翻译之前，先用伪本地化（pseudo-localization）模式测试它。
8. 完成一份翻译质量检查清单，并正确地把一份初稿、非母语的翻译标记为草稿。

## 先决条件

- **课程 2.9：生产级前端应用**，它搭建了本课延续并扩展的语言选择机制（`pickLocale`、`setLocale`、`t()`）。
- **课程 3.7：交互式 Web3D 体验**，本课这个精简的三件展品版本，正是从那节课的虚拟文化展览改造而来。
- 熟悉 ES 模块、`async`/`await`，以及第三阶段的 three.js 基础知识（场景、相机、渲染器）。

## 所需工具

| 工具 | 用途 | 费用 |
| --- | --- | --- |
| 一个现代浏览器（Chrome、Firefox、Safari 或 Edge） | 运行展览及其 `Intl` 调用 | 免费 |
| 一个代码编辑器（例如 VS Code） | 编写 JavaScript、CSS 和语言包文件 | 免费 |
| 一个本地静态服务器（例如 `python3 -m http.server`） | 通过 `http://` 提供页面，ES 模块需要它 | 免费 |
| Google Chrome 开发者工具，或 Firefox/Safari 的同类工具 | 检查每种语言下渲染出的字体和控制台警告 | 免费，内置 |

不需要任何付费账号、API 密钥，也不需要安装语言包：下面每一套字体栈都会回退到系统字体，而中国大陆常见的 Chrome、Firefox，以及 Microsoft Edge 和 UC 浏览器，都支持本课用到的这些 `Intl` API。

## 你将构建什么

一个精简的、只有三件展品的第三阶段压轴展览版本（陶罐、编织篮环和玉石，来自 `web3d-developer/07`），重新构建，让展览里的每一个字——3D 标签、信息面板、场景描述和一个小型统计面板——都能在英语、（拉丁美洲）西班牙语和简体中文之间切换，而完全不用改动任何 3D 代码。参考答案在 [`completed/`](completed/) 中，起始代码在七个文件中一共有 12 个编号的 TODO。

在这个过程中，你会扩展课程 2.9 中的语言切换方案，加上单语言应用从来不需要的部分：`Intl.NumberFormat`、`Intl.DateTimeFormat` 和 `Intl.RelativeTimeFormat`；能渲染中文字符和带重音符号的西班牙语的、用 canvas 绘制的 3D 标签；一套用于中文排版的字体栈和断行规则；以及一个能在译者打开项目之前，就先给你的布局做压力测试的伪本地化模式。

你在本课中写下的西班牙语和简体中文字符串都是初稿，会在每一个语言包文件——包括参考答案——中被标记为 `draft: true`。在把它们当作可以发布的定稿之前，请先看下面的「翻译质量检查清单」。

## 文件夹说明

```text
02-internationalization-and-localization/
├── README.md
├── starter/        # begin here
├── completed/      # reference solution
├── challenges/     # Three challenges: Foundation is required
├── tests/          # self-review checklist
├── assets/
└── screenshots/
```

## 环境配置

1. 克隆或下载本仓库。
2. 用本地服务器提供本仓库的根目录，例如 `python3 -m http.server 8766`。
3. 通过该服务器打开 `starter/index.html`（要用 `http://` 地址，而不是 `file://`：ES 模块需要它）。
4. 打开浏览器开发者工具的控制台。在完成 TODO 之前，你会看到「Missing string」警告，展台上也不会出现标签——这是正常现象。

## 分步讲解

### 规划你的学习节奏

| 节次 | 你要做的事 | 完成后你将拥有 |
| --- | --- | --- |
| 1 | 阅读起始代码，把简体中文的条目加入 `LOCALES`（TODO 1） | 页面上出现三个语言按钮 |
| 2 | 阅读 `i18n.js` 中来自课程 2.9 的 `pickLocale`/`setLocale`；编写 `formatVisitorCount`（TODO 2） | 一个正确分组的访客数字 |
| 3 | 编写 `formatOpenedDate`（TODO 3） | 一个已本地化、拼写完整的开馆日期 |
| 4 | 用 `Intl.RelativeTimeFormat` 编写 `formatOpenedRelative`（TODO 4） | 一句实时的「X 年前」说法 |
| 5 | 翻译 `es.js` 和 `zh-Hans.js` 中缺失的两个键（TODO 5） | 三种语言的每一条界面文字都已填好 |
| 6 | 在 `exhibit.js` 中编写 `buildJadeStone()`（TODO 6） | 第三个展台上出现了对应的物体 |
| 7 | 在 `labels.js` 中编写 canvas 绘制代码（TODO 7） | 每个展台上方出现一个可读的名称标签 |
| 8 | 阅读并确认 `app.js` 中关于始终朝向相机（billboarding）的说明（TODO 8），测试环绕视角 | 标签在任何角度都保持可读 |
| 9 | 在 `main.js` 中接入选择功能和信息面板（TODO 9） | 点击展台会填充信息面板 |
| 10 | 在 `main.js` 中标记当前激活的语言按钮（TODO 10） | 一个在视觉和程序层面都能识别的当前语言按钮 |
| 11 | 在 `pseudo.js` 中编写 `pseudoLocalize()`（TODO 11） | 按需生成的、带括号且被拉长的文字 |
| 12 | 接入伪本地化复选框（TODO 12） | 切换复选框能明显地对布局做压力测试 |
| 13 | 在打开和关闭伪本地化的情况下，用三种语言分别完成 `tests/checklist.md` | 一个干净的控制台，以及一份勾选完毕的清单 |
| 14 | 一个拓展挑战（基础挑战为必做），然后是**提交作业** | 第四个已本地化的事实，以及你的作业提交 |

### 第 1 步：添加第三种语言（TODO 1）

`config.js` 列出了应用提供的每一种语言。每一条都需要一个 BCP 47 代码——和 `<html lang>`、`Accept-Language` 请求头所用的是同一类标签——以及一个用该语言自身书写的名称，这样读者不需要先读懂英语，就能找到自己的语言。

```js
{ code: 'zh-Hans', name: '简体中文' },
```

`Hans` 子标签是一个*文字*子标签：它表示「简体汉字」，与之相对的是 `Hant`（繁体汉字）。`pickLocale()`（从课程 2.9 复制而来）使用 `Intl.Locale(...).maximize()` 把这一部分补全，即便某位学习者的浏览器只报告 `zh-CN`，也能让他落在正确的文字系统上，而无需你逐一列出每个地区变体。

### 第 2 步：格式化访客人数（TODO 2）

```js
export function formatVisitorCount(count, locale = current) {
  return new Intl.NumberFormat(locale).format(count);
}
```

`Intl.NumberFormat` 已经知道英语用逗号分隔千位，西班牙语用句点，而中文在 `Intl.NumberFormat` 的默认模式下同样是每三位一组（它按「万」分组的传统方式，是本课不需要用到的一个 `notation` 选项）。这里没有在任何地方写死分隔符列表。

### 第 3 步：格式化开馆日期（TODO 3）

```js
export function formatOpenedDate(isoDate, locale = current) {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long' })
    .format(new Date(`${isoDate}T12:00:00`));
}
```

在解析之前加上 `T12:00:00`，能防止日期在 UTC 以西或以东的时区里被提前或推后一天——如果省略这一步，这会是一个真实存在的 bug，只在某些读者、某些时间点才会显现出来。

### 第 4 步：格式化「多久之前」（TODO 4）

```js
const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
rtf.format(-days, 'day');
```

`Intl.RelativeTimeFormat` 把一个带符号的数字和一个单位转换成正确的措辞：`-3, 'day'` 在英语中会变成「3 days ago」，在西班牙语中是「hace 3 días」，在中文中是「3天前」。`numeric: 'auto'` 还能让它在某种语言有专门词汇时，说出「昨天」而不是「1 天前」这样的话。

### 第 5 步：补全缺失的两处翻译（TODO 5）

`es.js` 和 `zh-Hans.js` 都特意缺少 `motion.hint` 和 `stats.openedRelative` 这两个键。请从 `en.js` 翻译过来。在你完成之前，`t()` 会正确地为这两个键回退到英文文本——正是这种回退机制，而不是崩溃或空白文字，才让一个 `draft: true` 的语言包能够安全地以不完整状态先行发布。

### 第 6 步：构建玉石（TODO 6）

```js
function buildJadeStone() {
  const geometry = new THREE.IcosahedronGeometry(0.22, 0);
  const material = new THREE.MeshStandardMaterial({ color: '#2f7d5b', roughness: 0.35, metalness: 0 });
  return new THREE.Mesh(geometry, material);
}
```

低粗糙度加零金属度，正是让一块打磨过的非金属石头在转动时呈现出高光的关键——这和本展览承袭自第三阶段压轴项目的基于物理的材质选择是同一种思路。

### 第 7 步：在 canvas 上绘制 3D 标签（TODO 7）

A-Frame 默认的文字和 three.js 的 `TextGeometry`，都是从一个预先烘焙好的字体图集（font atlas）中绘制的，这个图集只包含少量拉丁字形——没有重音符号，更没有任何中文。`<canvas>` 没有这种限制：浏览器自己的文字渲染器会绘制当前字体所支持的任何内容，就和它在任何一个普通网页上做的一样。

```js
const ctx = canvas.getContext('2d');
ctx.font = `600 56px ${fontFamily}`;
ctx.fillText(text, canvas.width / 2, canvas.height / 2);
const texture = new THREE.CanvasTexture(canvas);
texture.colorSpace = THREE.SRGBColorSpace;
```

把 canvas 的尺寸设置为文字*实际测量到*的宽度（而不是一个固定尺寸），才能既不让一个简短的英文单词浪费纹理内存，也不让一句较长的中文被裁切掉。

### 第 8 步：让标签始终朝向相机（TODO 8）

`THREE.Sprite` 无论你朝哪个方向环绕，都会始终朝向相机——这种「始终朝向相机」的效果是免费获得的，这正是本课把每个标签的 `CanvasTexture` 包在 `Sprite` 里、而不是一个平面 `Mesh` 里的原因；如果用平面网格，就需要每一帧手动从相机复制旋转角度。

### 第 9 步：接入选择功能和信息面板（TODO 9）

```js
infoPanel.textContent = `${t(`item.${id}.name`)} — ${t('info.made', { made: t(`item.${id}.made`) })} ${t(`item.${id}.note`)}`;
```

这里每一个用户可见的字，都来自 `t()`，以展览数据里纯数据性质的 `id` 作为键——绝不会是一句写死的英文句子，中间插入一个翻译过的词。这种拼接方式，会在那些形容词、动词或数字位置与英语不同的语言里破坏语序。

### 第 10 步：标记当前语言（TODO 10）

```js
button.setAttribute('aria-pressed', String(button.dataset.locale === currentLocale()));
```

在这组按钮的每一个上都设置 `aria-pressed`，而不只是给当前激活的那个加一个视觉高亮，这才能让屏幕阅读器正确地把这一组按钮播报为一组切换按钮。

### 第 11 步：编写伪本地化转换函数（TODO 11）

```js
export function pseudoLocalize(text) {
  // accent vowels, stretch words, wrap the result in brackets
}
```

关于这项测试的内容和原因，见下文「伪本地化」部分。参考答案中的这个转换函数会给元音加上重音符号，通过重复每个长单词的尾部让长度增加约 30%，并把整段文字包在 `[⟦…⟧]` 里，这样一段伪字符串就一目了然——同样，一段被漏掉、本该被替换的真实字符串也会一目了然。

### 第 12 步：接入伪本地化开关（TODO 12）

```js
pseudoToggle.addEventListener('change', () => setPseudo(pseudoToggle.checked));
```

`setPseudo()`（已经在 `i18n.js` 中写好）会保存这个选择，并派发和语言切换器相同的 `'localechange'` 事件，这样已经存在的那一个 `renderAll()` 监听器就会重新绘制所有内容——不需要新的事件，也不需要新的渲染路径。

## 关键代码解析

- **`Intl.Locale(...).maximize()`**：把 `'zh-CN'` 这样的短标签，转换成它的完整形式 `'zh-Hans-CN'`，补上一个人类读者会默认存在、但短标签本身没有写明的文字系统。`pickLocale()` 用它来按语言和文字系统（忽略地区）匹配学习者浏览器语言和应用可用的语言包。
- **`Intl.PluralRules`**：为给定的数量，按语言选出一条消息里合适的复数形式（`{ one: '…', other: '…' }`）。英语和西班牙语需要 `one`/`other`；简体中文没有语法意义上的复数，所以它的消息永远只需要 `other`——为中文只写一个 `other` 对象，而不是猜测一个根本不存在的 `one` 形式，这是正确做法，不是没写完。
- **canvas 绘制的标签（`labels.js`）**：一张由浏览器自身文字渲染器绘制的 `CanvasTexture`，包在 `THREE.Sprite` 里。在本课工具箱里的三种文字渲染方式（A-Frame 文字、three.js 的 `TextGeometry`，或 canvas）中，只有这一种能在不自定义字体图集的情况下，同时显示带重音符号的西班牙语和中文。
- **`pseudoLocalize()`**：一种可逆的、保留原意的压力测试，而不是翻译。在译者看到项目之前，先让每一个真实字符串都经过它处理一遍，就能免费捕获文本膨胀问题和遗漏的 `t()` 调用。
- **`styles.css` 中的 `:lang(zh-Hans)`**：一个 CSS 选择器，匹配任何语言（继承自 `<html lang>` 或元素自身的 `lang` 属性）为简体中文的元素，本课用它来应用一套以 CJK 字体优先的字体栈、关闭伪造斜体，并开启严格的中文断行规则——这三点都在下文「3D 与 XR 无障碍」中解释。
- **`draft: true`**：一个语言包模块上的标志，由 `isDraft()` 读取，会显示一条可见的提示，并在一节课被标记为 `published` 之前，由 `scripts/validate-projects.mjs` 检查。它的存在，是为了让一份初稿、非母语的翻译能够诚实地带着标签发布给学习者，而不是被隐藏起来，也不是被谎称已经完成。

## 3D 与 XR 无障碍

每一件展品的标签都是在 canvas 上绘制的（见第 7 步），因为 A-Frame 自带的字体和 three.js 的 `TextGeometry` 都是从一个固定的 MSDF（多通道有符号距离场）字形图集中渲染的。XR Camp 在整个第三阶段中使用的这个图集，只包含不带重音符号的拉丁字母：`á` 和 `ñ` 会渲染成空白方框，而中文——数以万计的可能字符——根本无法预先烘焙进一个小图集里。构建一个包含特定 CJK 字符的自定义 MSDF 图集是可行的，但这意味着要提前选定每一个字符，并发布一个更大的字体文件；而 canvas 绘制的标签两者都不需要，代价是它是一个扁平的、始终朝向相机的精灵（sprite），而不是一个真正带挤出效果的 3D 字形。

`id="scene-description"` 保存着一段用普通语言写成的描述，它由和其他一切相同的数据和相同的 `t()` 调用构建而成，所以它绝不会是一份独立、容易被遗忘的翻译。玉石的转动在加载时遵循 `prefers-reduced-motion`，并且随时都可以用一个带标签、带 `aria-pressed` 的按钮暂停（WCAG 2.2.2）：场景中没有任何其他东西会自行移动，相机也绝不会移动，除非学习者主动移动它。2D 对照列表和信息面板，会用每一种语言重复 3D 视图所展示的每一项事实，所以 WebGL 或缓慢的模型加载，永远不会是触及内容的唯一方式（WCAG 1.3.1）。场景中的每一项 3D 交互——选择物品、暂停动画、环绕视角——都有一条完整的键盘路径：选择和暂停使用真正的 `<button>` 元素，环绕视角则通过 `OrbitControls.listenToKeyEvents()` 支持原生方向键。

## 无障碍要求

| 要求 | WCAG 2.2 | 原因 |
| --- | --- | --- |
| `<html lang>` 与所选语言一致 | 3.1.1 页面语言 | 屏幕阅读器根据这个属性选择发音和语音，浏览器也据此选择后备字体 |
| 每个 3D 标签、信息面板条目和描述都会随语言切换而更新 | 1.1.1 非文本内容 | 一个 3D 标签不是屏幕阅读器能读出的文字；信息面板和描述正是它始终存在的文字替代方案 |
| 2D 对照列表重复 3D 视图所展示的一切 | 1.3.1 信息与关系 | 同样的信息不应该依赖于 WebGL 是否渲染成功 |
| 可见的按钮文字构成无障碍名称的开头（例如「Select: Jade stone」） | 2.5.3 名称中的标签 | 在标签被翻译之后尤其重要，一个不匹配的 `aria-label` 很容易被无意中引入 |
| 玉石的自动旋转可以被暂停，并且在 `prefers-reduced-motion` 下默认就是暂停状态 | 2.2.2 暂停、停止、隐藏 | 这是一种自行开始的动态效果，而不是响应用户操作而产生的 |
| 每个控件都只用键盘就能到达和操作 | 2.1.1 键盘 | 选择、暂停和语言切换器都是真实的、可获得焦点的元素 |
| 焦点始终可见 | 2.4.7 焦点可见 | 由共享样式表中的 `:focus-visible` 规则保证，在每种语言下都一致 |
| 每种语言下的颜色对比度都达到 AA 级 | 1.4.3 对比度（最低要求） | 更长的西班牙语或更小的中文文字，不应迫使字体为了适应空间而变细、降低对比度 |
| 草稿翻译提示会被播报出来 | 4.1.3 状态消息 | 草稿提示上有 `role="status"`，这样切换到一种草稿语言时，就能在不移动焦点的情况下被播报出来 |

## 性能注意事项

相比加载一套自定义字体，canvas 绘制的标签成本很低：三个小型 canvas（每个展台一个），只有在语言切换时才会重新绘制，而不是每一帧都绘制。在创建下一个 `CanvasTexture` 和 `SpriteMaterial` 之前先释放上一个（在 `setLabel()` 中完成），能防止反复切换语言导致 GPU 内存泄漏——这和 `web3d-developer/06` 中模型替换时的释放纪律是同一种做法。用 `Intl` 对象格式化并非没有成本：`i18n.js` 每次调用都会重新创建一个 `Intl.NumberFormat`/`Intl.DateTimeFormat`/`Intl.RelativeTimeFormat`，而不是为每种语言缓存一个实例，在这个应用的规模下没有问题（重绘只发生在语言切换或选中时，而不是每一帧），但如果一个应用每秒要格式化成百上千个值，就值得把它们缓存起来。

## 常见错误

| 错误 | 会发生什么 | 应该怎么做 |
| --- | --- | --- |
| 通过拼接翻译好的单词来组成一句话（`t('the') + ' ' + t('item')`） | 在任何语序与英语不同的语言里，语序都会出错 | 翻译整句话，用 `{占位符}` 表示会变化的部分 |
| 用 `if (count === 1)` 代替 `Intl.PluralRules` | 对于复数类别比英语更多的语言是错的，对于没有复数的中文则会悄无声息地出错（看起来并不像坏了） | 使用 `Intl.PluralRules(locale).select(count)`，以及一个包含该语言实际需要的形式的消息对象 |
| 给翻译文字用固定宽度的按钮或标签 | 西班牙语或德语长度的文字会被裁切或重叠 | 使用灵活宽度、`flex-wrap`，翻译文字上不要用 `white-space: nowrap` |
| 假定一套拉丁字体栈也能覆盖中文 | 中文会用后备字体渲染，或者变成方块（tofu），还可能被套上伪造的斜体倾斜 | 在 `:lang(zh-Hans)` 下使用以 CJK 优先的字体栈，并加上 `font-style: normal !important` |
| 把机器翻译或初稿翻译标记为已完成 | 语气不对、正式程度不对，或者干脆出现错误，都会直接发布给真实的学习者 | 在一位母语者结合上下文审核之前，保持 `draft: true` 和可见的提示 |

## 故障排查

**中文文字显示为方块，或者字体不对。** 你的操作系统可能没有安装中文字体。Windows 默认自带微软雅黑；在 Linux 上，安装 `fonts-noto-cjk`（免费），或者如果必须在没有任何系统字体的情况下也能正常工作，就把 Google 的免费 Noto Sans SC 作为网络字体加进来。

**切换语言之后，刷新页面就不再保留选择。** 一些浏览器会在隐私/无痕窗口中屏蔽 `localStorage`；`i18n.js` 已经捕获了这种情况，会每次都回退到检测浏览器语言，这是预期行为，不是 bug。

**对于 `:lang(zh-Hans)`，Firefox 显示的默认等宽/衬线后备字体和 Chrome 不一样。** 本课只设置了无衬线字体栈，所以这通常不影响什么；如果你自己添加了衬线中文文字，请在 Firefox 的字体设置面板（`about:preferences#general` → Fonts）中测试，因为它按文字系统选择字体的位置和 Chrome 不一样。

**在 Safari 中，`Intl.RelativeTimeFormat` 对很大的天数输出显得很奇怪。** 这是预期行为：参考答案会在固定的阈值之后，把单位从天切换到月再切换到年，正是为了避免出现「412 天前」这样的说法；如果你自己的数字看起来不对劲，检查一下 `formatOpenedRelative` 的阈值设置。

## 拓展挑战

三个拓展挑战，位于 [`challenges/`](challenges/)。基础挑战为必做，另外两个为选做：

1. **[基础](challenges/challenge-1.zh-Hans.md)**：为统计面板添加第四个用 `Intl` 格式化的事实（开馆时间），并覆盖全部三种语言。
2. **[创意](challenges/challenge-2.zh-Hans.md)**：把某件展品替换成来自你自己文化的物品，或者添加一门你自己的第四种语言。
3. **[探索](challenges/challenge-3.zh-Hans.md)**：编写一个自动化的溢出检查，捕获伪本地化暴露出来的文本膨胀问题。

## 提交作业

1. 在打开和关闭伪本地化的情况下，用三种语言分别完成 [`tests/checklist.md`](tests/checklist.md)。
2. 拍摄截图：展览在三种语言下各自的样子，以及一张开启伪本地化时的截图。
3. 把它们保存在你的学习日志和作品集中。等 XR Camp 社区上线后，也在那里分享它们。
4. 学习日志问题：当你打开伪本地化时，是哪一个字符串、哪一件展品或哪一个布局选择最先出问题的——这告诉了你什么，关于在还没考虑翻译之前就先写界面文字这件事？

## 延伸阅读

- [MDN：Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)（英文）——`NumberFormat`、`DateTimeFormat`、`RelativeTimeFormat`、`PluralRules` 和 `Locale` 的完整参考。
- [W3C 国际化：本地化与国际化](https://www.w3.org/International/questions/qa-i18n)（英文）——本课第一条学习目标所依据的定义。
- [Unicode CLDR](https://cldr.unicode.org/)（英文）——`Intl` 实现所依据的语言包数据（数字格式、复数规则、日期模式）。
- [MDN：CSS :lang() 伪类](https://developer.mozilla.org/en-US/docs/Web/CSS/:lang)（英文）——语言感知的 CSS 选择器是如何工作的。
- [IETF BCP 47 / RFC 5646](https://www.rfc-editor.org/info/bcp47)（英文）——本课全程使用的语言标签（`en`、`es`、`zh-Hans`）背后的规范。

## 值得认识的女性

Irma Alvarez Ccoscco 是一位来自秘鲁阿普里马克（Apurímac）大区哈基拉（Haquira）的克丘亚语（Quechua）诗人、教育者和数字语言活动家，她的工作核心是把软件带入她的母语。2010 年，她把 Chamilo 电子学习平台大约 3.5 万词的界面翻译成了库斯科克丘亚语，随后又把 TuxMath 和 TuxType 这两款儿童学习游戏本地化，并为它们的 KunturMat 和 KunturQillqa 版本绘制了原创的安第斯艺术作品。2013 年，她组织了一支由八名志愿者组成的团队，与秘鲁 Mozilla 社区合作，开始把 Firefox 翻译成库斯科克丘亚语。

她的工作提醒我们，本地化不只关乎一个项目最初面向的那些大语种。本课在西班牙语和中文上练习的这些 `Intl` API、字体栈思路和翻译质量把控纪律，同样适用于一门只有几百万人使用的语言，就像适用于一门有十亿人使用的语言一样——而一门现有软件本地化程度远远不够的语言，反而更需要这份细心。

> **编者注：发布前请核实。** 「值得认识的女性」中的人物信息必须以一手资料核实，并在可行时于课程上线前与本人确认。参见 [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md)。

## 标准聚焦

本课的一切都建立在三个不同机构的工作之上：IETF 的 BCP 47（RFC 5646）定义了语言标签的语法（`en`、`es-419`、`zh-Hans`），`<html lang>`、`Intl` 以及本课自己的 `LOCALES` 列表都在用它；Unicode 联盟既发布了 Unicode 标准本身（正是这个字符集，让浏览器能在同一份文档里渲染克丘亚语、西班牙语重音符号和中文字符），也发布了 CLDR——`Intl` 的浏览器实现所依据的语言包数据：复数规则、日期格式、数字分组；而 W3C 的国际化活动小组（Internationalization Activity）发布了针对 Web 的具体最佳实践，包括本课 CSS 所遵循的关于 `:lang()`、断行和 CJK 排版的指引。

## 许可协议

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
