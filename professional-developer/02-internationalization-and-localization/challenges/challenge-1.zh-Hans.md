# 挑战 1：基础

**必做。** 约 45 分钟。

为统计面板添加第四个用 Intl 格式化的事实，并覆盖全部三种语言。

## 任务

1. 在 `js/config.js` 中添加一个新常量 `OPENING_HOUR = 9`（展览在当地时间上午 9 点「开馆」）。
2. 在 `js/i18n.js` 中编写 `formatOpeningTime(hour, locale)`：构建 `new Date(2024, 0, 1, hour)`，并用 `new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' })` 格式化它。
3. 在全部三个语言包文件中添加一个新键 `stats.opensAt`：英语中是 `'Opens daily at {time}.'`，以及它对应的西班牙语和简体中文版本（和 `es.js`、`zh-Hans.js` 里其他内容一样，标记为草稿）。
4. 在 `main.js` 的 `renderStats()` 中，往 `lines` 数组里添加一行，使用 `t('stats.opensAt', { time: formatOpeningTime(OPENING_HOUR) })`。
5. 检查全部三种语言：时间在英语中应显示为「9:00 AM」，在西班牙语和中文中应显示为符合各自语言习惯的 24 小时制或 12 小时制形式，而这一切都不需要你自己写任何格式。

## 为什么这很重要

每一个真实的应用迟早都会需要一种 `Intl` 没有现成命名选项的格式。用 `Intl.DateTimeFormat` 的 hour/minute 选项来构建它，而不是手写 `"${hour}:00"`，才能让它在这个应用未来发布的每一种语言里都保持正确，包括你现在还没添加的语言。

## 完成标准

- [ ] `formatOpeningTime` 已存在，并使用了 `Intl.DateTimeFormat`。
- [ ] 全部三种语言都显示出格式正确的开馆时间。
- [ ] 没有任何一种语言显示出 `stats.opensAt`（缺失键的回退文字）本身，而不是真正的文字。
