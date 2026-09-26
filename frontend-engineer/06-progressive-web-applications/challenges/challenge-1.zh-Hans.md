# 挑战 1：基础

**必做。** 约 45 分钟。

始终知道自己是否在线，以及正在运行的是哪个版本。

## 任务

1. 在标题旁边添加一个**离线**徽章：文字「Offline」，配上边框（绝不能只靠颜色）。当 `navigator.onLine` 为 `false` 时显示它，并根据窗口的 `online` 和 `offline` 事件来更新它。
2. 在已有的状态朗读区域中通知这个变化：「You are offline. Saved forecasts still work.」和「Back online.」。
3. 在页面底部用小字显示当前运行的版本：「Version v1」。页面无法读取 `sw.js` 中的变量，所以要向 worker 发消息询问：发送一条 `{ type: 'GET_VERSION' }` 消息，在 `sw.js` 中用 `event.source.postMessage({ type: 'VERSION', version: VERSION })` 来回应。用 `navigator.serviceWorker.addEventListener('message', …)` 监听。
4. 把 `VERSION` 改成 `v2`，在收到提示时按下**刷新**，检查这一行是否发生了变化。

`navigator.onLine` 只是一个提示：`true` 只表示「已连接到某个网络」，而不代表「互联网可用」。这正是为什么天气预报依然保留自己的错误状态。

## 为什么这很重要

人们会信任一个能如实告知当前状况的应用。而当一位学习者报告 bug 时，「你运行的是哪个版本？」是每个团队都会问的第一个问题。

## 完成标准

- [ ] 勾选和取消勾选**离线**时，徽章会相应地出现和消失，每次变化都会被朗读。
- [ ] 徽章用文字显示「Offline」。
- [ ] 版本信息来自 Service Worker，并在更新后发生变化。
