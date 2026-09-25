# 挑战 3：探索

**选做。** 约 45 分钟。

遵循读者的系统设置：深色模式和减少动态效果。

## 任务

1. 添加一个媒体查询，当读者的设备处于深色模式时，把你的设计变量切换为深色的值：

   ```css
   @media (prefers-color-scheme: dark) {
     :root {
       --color-text: #f1edf7;
       --color-bg: #16121f;
       /* ...your other dark values... */
     }
   }
   ```

   （注释的意思是：你的其他深色值。）

2. 给你的按钮添加一个悬停过渡效果，然后为希望减少动态效果的人关闭它：

   ```css
   button { transition: background-color 0.2s; }

   @media (prefers-reduced-motion: reduce) {
     * { transition: none !important; animation: none !important; }
   }
   ```

3. 把你的设备在浅色模式和深色模式之间切换，并在设置中打开「减少动态效果」（reduce motion），以测试这两项。

## 为什么这很重要

人们选择这些设置是有充分理由的：对光敏感、偏头痛、前庭功能障碍、节省电量。尊重这些设置，每一项只需要一行 CSS，而且这和你的 3D 场景所遵循的是同一个 `prefers-reduced-motion` 设置。

## 完成标准

- [ ] 当设备处于深色模式时，你的网站会切换为深色，并且对比度达标。
- [ ] 打开减少动态效果后，过渡效果会停止。
