# 挑战 1：基础

**必做。** 约 30 分钟。

在三种工具中都把盒子换成球体。

## 任务

1. 在 `examples/x3dom.html` 中，把 `<box size="1.5 1.5 1.5"></box>` 替换为 `<sphere radius="0.9"></sphere>`。
2. 在 `examples/aframe.html` 中，把开始标签和结束标签中的 `a-box` 都改成 `a-sphere`，并添加 `radius="0.8"`。
3. 在 `examples/three.html` 中，把 `new THREE.BoxGeometry(1, 1, 1)` 替换为 `new THREE.SphereGeometry(0.7, 32, 16)`。
4. 更新全部三个页面中的 `scene-description`：现在它是一个球体了。
5. 刷新实验室页面。在学习日志中记下你在每种工具中分别需要修改多少处。

## 为什么这很重要

同样的改动，三种不同的工作量。注意到这一点，你就开始能够出于充分的理由、而不是出于习惯来选择工具。

## 完成标准

- [ ] 三个示例都显示为球体。
- [ ] 三段描述都写明了「球体」。
- [ ] 你的学习日志比较了每种工具所需的工作量。
