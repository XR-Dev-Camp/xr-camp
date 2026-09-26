// zh-Hans.js: Simplified Chinese strings — DRAFT.
//
// `draft: true` marks this as a first-pass translation, made without a
// native Chinese speaker's review. Every key that would ship to learners
// must pass the "Translation QA checklist" in the README, including a
// native-speaker read-through, before this flag is removed.

export const draft = true;

export default {
  'skip.toContent': '跳到内容',
  'page.title': '展览，用你的语言',
  'page.intro': '与 Web3D 毕业项目相同的三件展品，重新搭建后，标签、描述和数字里的每一个字都可以换成另一种语言，而不需要改动任何 3D 代码。',

  'lang.heading': '1. 选择语言',
  'lang.label': '选择语言',
  'lang.draftNotice': '此翻译是简短的初稿，尚未经过母语者审校。详见 README。',

  'select.heading': '2. 选择一件展品',
  'select.hint': '在 3D 视图中点击或轻触一件展品，也可以在这里选择。这是键盘的操作路径：效果和用指针点击完全一样。',
  'select.buttonLabel': '选择：{name}',

  'info.heading': '3. 信息面板',
  'info.empty': '还没有选择任何展品。请在上方选择一件展品以查看详情。',
  'info.made': '材质：{made}。',

  'motion.heading': '4. 动画',
  'motion.pause': '暂停动画',
  'motion.hint': '玉石会自己缓慢转动。其他物体都不会动，摄像机也只会在你操作时移动。',

  'pseudo.heading': '5. 伪本地化（测试用）',
  'pseudo.label': '开启伪本地化',
  'pseudo.hint': '在不真正翻译的情况下，把页面上的每段文字都包起来并拉长，方便在翻译之前先检查布局能否承受更长的文字。详见 README 中的“伪本地化”。',

  'scene.heading': '展览',
  'twin.heading': '2D 对照版',
  'twin.hint': '这份列表包含和图片完全相同的信息，用文字表达，因此无论 WebGL 是否可用，它都始终存在（WCAG 1.3.1）。',

  'stats.heading': '关于这场展览',
  'stats.visitors': '目前共有 {count} 位访客。',
  'stats.opened': '开放日期：{date}。',
  'stats.openedRelative': '那是{relative}。',
  'stats.count': { other: '本展厅共有 {count} 件展品。' },

  'item.clay-pot.name': '陶罐',
  'item.clay-pot.made': '未上釉的赤陶土',
  'item.clay-pot.note': '像这样手工塑形、窑烧而成的储物罐，表面不带任何釉料。',

  'item.basket-ring.name': '编织篮环',
  'item.basket-ring.made': '编织的植物纤维',
  'item.basket-ring.note': '一只卷编篮子的边沿，用晒干的草或芦苇编成。',

  'item.jade-stone.name': '玉石',
  'item.jade-stone.made': '抛光玉石',
  'item.jade-stone.note': '经过雕琢和抛光后变得光滑，转动时能反射光线。',

  'desc.intro': '三个展台排成一行：从左到右依次是陶罐、编织篮环和玉石。',
  'desc.selected': '当前选中的是：{name}；详情见上方的信息面板。',
  'desc.noneSelected': '目前没有选中任何展品。点击一件展品，或使用“选择”按钮，即可在信息面板中查看详情。',
  'desc.animating': '玉石正在缓慢转动。',
  'desc.paused': '动画已暂停：目前没有任何转动。',
  'desc.orbitHint': '拖动视图，或先聚焦再按方向键，即可环视四周。摄像机只会在你操作时移动。',
};
