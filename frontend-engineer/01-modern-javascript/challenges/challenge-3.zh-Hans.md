# 挑战 3：探索

**进阶选做。** 约 45 分钟。

用 `Promise.all` 同时加载两个文件。

## 任务

1. 创建 `data/notes.json`：一个对象，键是课时的 id，值是你自己写的笔记，例如 `{ "web-01-html-foundations": "Loved the alt text exercise." }`。
2. 同时加载这两个文件：

   ```js
   const [catalog, notes] = await Promise.all([
     loadCatalog(),
     loadCatalog('data/notes.json'),
   ]);
   ```

3. 在有笔记的课时标题下方显示对应的笔记。
4. 如果 `notes.json` 缺失会发生什么？让地图在没有笔记的情况下依然能正常工作。

## 为什么这很重要

依次使用 `await` 会逐个等待每个文件；`Promise.all` 会同时等待两者，速度更快。判断哪些数据是必需的、哪些是可选的，本身就是一个真正的设计决策。

## 完成标准

- [ ] 两个文件一起加载完成，笔记出现在对应课时下方。
- [ ] 没有 `notes.json` 时，地图依然能正常工作。
