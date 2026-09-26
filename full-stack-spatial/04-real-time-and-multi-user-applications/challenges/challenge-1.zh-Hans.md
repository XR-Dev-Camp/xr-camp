# 挑战 1：基础

**必做。** 约 45 分钟。

添加第四种消息类型——一个「挥手」手势——并以位置更新被转发的相同方式转发它。

## 任务

1. 在服务器上，添加一个类似 `MAX_WAVES_PER_MINUTE` 的小型速率限制（复用 `realtime.js` 中 `isChatRateLimited` 的滑动窗口思路，速率设成任何你觉得合理的值），并在 `handleConnection` 的消息路由中添加一个新分支：`if (message.type === 'wave') return handleWave(roomId, member, message);`。
2. 编写 `handleWave(roomId, member, message)`：检查速率限制，然后向房间 `broadcast()` `{ type: 'wave', userId: member.userId, username: member.username, serverTime: Date.now() }`——完全不需要从传入的消息中取任何字段，因为一次挥手除了「谁，以及何时」之外不携带任何数据。
3. 在客户端，在 `index.html` 的移动控件旁边添加一个「Wave」按钮，在 `net.js` 中添加一个 `sendWave()` 方法（一行 `send({ type: 'wave' })`，不需要节流对象，因为服务器已经做了速率限制），并在 `main.js` 中添加一个 `onWave` 处理函数来显示一些内容——在聊天记录中出现一行临时的「alice waved!」就足够了。
4. 至少给 `server.test.js` 添加一个测试，证明一次挥手会被转发给另一个成员，并且超出你的速率限制会得到一个错误，而不是一连串泛滥的挥手消息。

## 为什么重要

本课中的每一种消息类型——位置、聊天、屏蔽、举报——都遵循同一种形状：验证需要验证的东西，对可能被滥用的东西做速率限制，从服务器自己的记录中解析身份，并通过那唯一一个共享函数进行广播。一个完全没有载荷的手势，是这种形状最简单的情形，从零开始构建一个，是证明你真正理解了这个模式、而不只是本课为你写好的那四种具体消息类型的最快方式。

## 完成标准

- [ ] 一个「Wave」按钮会发送一条 `wave` 消息，房间里其他每一个标签页都能看到它。
- [ ] 挥手速度超过你自己的速率限制会产生一个错误，而不是无限泛滥的消息。
- [ ] `server.test.js` 中至少有一个新测试覆盖了挥手消息类型，并且 `node --test` 通过。
