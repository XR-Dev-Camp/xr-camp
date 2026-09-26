# 挑战 1：基础

**必做。** 约 45 分钟。

用一次新的迁移给 `scenes` 添加第四个列，并把它用起来：一个每次有非所有者的人加载一个公开场景时都会增加的浏览次数计数器。

## 任务

1. 编写一个新的迁移文件 `server/migrations/005_add_view_count.sql`：
   ```sql
   ALTER TABLE scenes ADD COLUMN view_count INTEGER NOT NULL DEFAULT 0;
   ```
   给一张已有的表添加一列，依然是一次迁移，按顺序只运行一次，就和创建一张表完全一样——这正是为什么迁移执行器要给文件编号，而不是只列出表名。
2. 在 `db.js` 中添加 `incrementViewCount(id)`（一条预处理的 `UPDATE scenes SET view_count = view_count + 1 WHERE id = ?`），并在 `rowToScene` 中加入 `view_count`（转换成 `viewCount`，方式和其他每一列已经使用的相同）。
3. 在 `routes.js` 的 `getScene` 中，只有当查看者**不是**所有者时才调用 `incrementViewCount(sceneId)`——所有者在编辑自己的场景时打开它，不应该让计数增加。
4. 在客户端中显示这个计数：在 `js/main.js` 的 `#current-scene-owner` 附近添加一行「已浏览 N 次」，使用 API 现在会返回的 `viewCount` 字段。
5. 运行 `node --test`，并添加一条断言：用另一个账户查看一个公开场景会让 `view_count` 恰好增加一，而所有者再次查看它则完全不会改变这个数字。

## 为什么重要

真实的应用给已经有数据的表添加列，要比创建全新的表频繁得多。一次只会运行 `CREATE TABLE` 的迁移是一个很容易掉进去的陷阱；这个挑战强迫你面对更常见的情况——针对一个已经存在的模式（如果你一直在手动测试，还有真实的数据行）运行 `ALTER TABLE`。

## 完成标准

- [ ] `005_add_view_count.sql` 能在一个已经有场景的数据库上干净地运行（可以先在添加这个迁移之前运行一次服务器，再在添加之后运行一次来测试）。
- [ ] 一个不是所有者的人查看一个公开场景会让 `view_count` 增加；所有者查看它则永远不会。
- [ ] 这个计数在展品的界面中可见。
- [ ] `node --test` 通过，包括你新增的断言。
