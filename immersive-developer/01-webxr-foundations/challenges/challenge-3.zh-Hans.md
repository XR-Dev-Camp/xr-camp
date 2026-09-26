# 挑战 3：探索

**进阶选做。** 约 90 分钟。

把你自己手写的会话代码，和 three.js 现成的 `VRButton` 进行对比，并尝试在 `immersive-vr` 之外也对 `immersive-ar` 做特性检测。

## 任务

1. 阅读 `three/addons/webxr/VRButton.js`（从 `https://cdn.jsdelivr.net/npm/three@0.186.1/examples/jsm/webxr/VRButton.js` 获取，或在固定版本的包内找到它）。在 `main.js` 的一个副本中导入 `{ VRButton }`，并加入 `document.body.append(VRButton.createButton(app.renderer))`，让它和你自己的按钮并存。比较一下：`VRButton` 做了哪些你的 `xr.js` 没有做的事（提示：阅读它对 `sessiongranted` 的处理）？它又有哪些地方是本课刻意选择了不同做法的，为什么（提示：看看 `stylizeElement`）？
2. 在 `xr.js` 中，仿照 `supportsImmersiveVR()`，写一个新的特性检测函数 `supportsImmersiveAR()`，用同样的方式检测 `navigator.xr.isSessionSupported('immersive-ar')`。显示一行简短的、独立的状态信息，说明 AR 是否可用，但先不要真正搭建一个 AR 会话：完整的 AR 放置是 4.2 的主题。
3. 在你的学习日志中记录：测试时，Chrome、Firefox、Safari 以及你手机自带的浏览器，各自对每种模式报告了什么结果。支持情况会随时间和设备变化，所以把你自己的结果当作某一天的一个快照，而不是永久不变的事实。

## 为什么这很重要

阅读一个库自己的源代码，而不只是它的文档，是一项能在任何一个版本的 three.js 消失之后依然管用的技能：这正是你在整个职业生涯中，回答「这真的做了我以为它做的事吗？」的方式。比较同一个想法的两种实现——一个是别人为你写好的，一个是你逐行理解的——是发现一个「捷径」在悄悄替你做了哪些决定的最快方法之一。

## 完成标准

- [ ] `VRButton` 的按钮和你自己的按钮都出现在页面上，二者中任意一个都能启动同一种会话。
- [ ] `supportsImmersiveAR()` 已经存在，并且在一个完全没有 `navigator.xr` 的浏览器上也能报告一个结果而不崩溃。
- [ ] 你的学习日志说明了你在什么设备上测试过、发现了什么，且没有把它当作放之四海而皆准的事实。
