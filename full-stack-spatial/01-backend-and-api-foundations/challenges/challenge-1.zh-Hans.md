# 挑战 1：基础

**必做。** 约 45 分钟。

添加一个健康检查路由，以及第五个设置项。

## 任务

1. 在 `routes.js` 和 `server.js` 中添加 `GET /api/health`。它应该以 `200` 响应 `{ "status": "ok" }`，不需要验证，也不需要保存任何状态。
2. 给设置对象添加第五个字段：`showLabels`（一个布尔值，默认为 `true`），它会在之后的一节课中，以屏幕标签的形式显示或隐藏展品名称。把它添加到 `DEFAULT_SETTINGS`，并在 `validation.js` 的 `validateSettings()` 中用 `checkBooleanField` 处理它。
3. 在 `index.html` 中为它添加一个复选框，并在 `js/main.js` 中读取和应用它（你不需要真的在 `js/scene.js` 中画出标签——只需要正确地保存和加载这个设置）。
4. 在 `server.test.js` 中为 `GET /api/health` 添加一个测试，并至少为这个新字段添加一个测试。

## 为什么重要

一个真正的 API 是一次一个小心翼翼的小字段地成长起来的。这个挑战是这个过程最小的一个版本：它会触及未来每一个新字段都会触及的同样四个地方（`validation.js`、不需要改动的 `store.js`、`routes.js`，以及客户端），却不需要设计任何全新的东西。

## 完成标准

- [ ] `curl http://127.0.0.1:8877/api/health` 返回状态码 200 和 `{ "status": "ok" }`。
- [ ] `showLabels` 能像其他四个字段一样，通过 `PUT` 和 `GET` 正确地往返。
- [ ] 发送 `"showLabels": "yes"`（一个字符串，而不是布尔值）会被拒绝，返回 400 和一条清晰的消息。
- [ ] `node --test` 依然全部通过，包括你新增的测试。
