# 挑战 2：创意

**选做。** 约 60 分钟。

为一段关于你的社区的短视频加上字幕和文字稿。

## 任务

1. 用手机录一段 30 到 60 秒的视频，内容是你社区中的一个地方或一项活动。请征得视频中每个人的同意。
2. 用 WebVTT 格式写一个带时间码的字幕文件 `captions.vtt`：

   ```text
   WEBVTT

   00:00:00.000 --> 00:00:04.000
   Welcome to the Saturday market in our neighbourhood.

   00:00:04.000 --> 00:00:09.000
   Every week, more than forty families sell food and crafts here.
   ```

3. 用 `<video controls>` 和 `<track kind="captions" src="captions.vtt" srclang="en" label="English" default>` 把视频加到页面上。如果你愿意，可以在字幕和 `srclang` 中使用你自己的语言（中文用 `zh-Hans`）。
4. 在视频下方，以文字形式加上完整的**文字稿**，包括重要的声音，以及画面中出现但没有说出来的内容。

## 为什么这很重要

字幕服务于聋人和听力障碍者，也服务于身处嘈杂公交车或安静图书馆里的任何人。文字稿服务于完全无法播放视频的人，包括网络很慢的人，而且文字稿可以被搜索和翻译。

## 完成标准

- [ ] 字幕与说话的时间同步出现。
- [ ] 页面在视频下方有完整的文字稿。
