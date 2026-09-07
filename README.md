# Precision Tech Talk Skills

[![Agent Skills](https://img.shields.io/badge/Agent%20Skills-compatible-28D7FF)](https://github.com/pswtan2/precision-tech-talk-skills)
[![Remotion](https://img.shields.io/badge/Remotion-4.x-7C5CFF)](https://www.remotion.dev/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

一套可分享、可安装的科技口播生产线：先通过问卷建立个人风格，再制作视频包装和声音后期。

## 包含内容

### `$precision-tech-talk-setup`

首次使用入口。通过一次一个问题的访谈确定平台、画幅、字幕、视觉方向、动效密度、证据来源、声音和品牌元素；随后制作 2–3 版效果图供选择，确认后生成个人风格档案、通用提示词和 Remotion 底座。

### `$precision-tech-talk-video`

负责原始口播清剪、音画同步、暗色紫青科技滤镜、中英双语字幕、按文案触发的信息动效、官方网页证据、外部 B-roll 接入和 Remotion 渲染验收。

### `$precision-tech-talk-audio`

负责锁定成片后的情绪与动作分析、原创 BGM、去重音效资产、对白优先混音和响度验收。

## 一键安装

使用 Skills CLI：

```bash
npx skills add pswtan2/precision-tech-talk-skills
```

或者克隆仓库：

```bash
git clone https://github.com/pswtan2/precision-tech-talk-skills.git
cd precision-tech-talk-skills
```

Windows PowerShell：

Windows PowerShell：

```powershell
.\install.ps1
```

macOS / Linux：

```bash
./install.sh
```

安装脚本默认复制到当前用户的 `.codex/skills/`，目标已存在时会停止，不会覆盖。也可以手动把两个 Skill 文件夹复制到任何兼容 Agent 的 skills 目录。

## 视频制作调用示例

第一次建立个人模板：

```text
使用 $precision-tech-talk-setup，通过一步一步的问卷和效果图，帮我建立自己的科技口播模板。不要直接套默认风格，等我确认最终效果后再生成工程。
```

模板建立完成后，每期制作视频：

```text
使用 $precision-tech-talk-video，把这期科技口播制作成统一的精密科技风成片。

口播视频：【路径】
SRT/文案：【路径】
本期主题：【主题】

先理解每句话并生成语义时间线，让数据、网页证据、流程图或信息卡在说到时弹出；先交付关键帧与短预览，确认后再渲染全片。
```

## 声音后期调用示例

```text
使用 $precision-tech-talk-audio，为这条已经锁定画面的科技口播分析情绪和动作，设计原创 BGM 与去重音效，并在确认素材后完成对白优先混音。视频在【路径】。
```

## 风格基线

- 画幅、配色、字体、滤镜和字幕由首次问卷与效果图共同确定
- 预置 starter 提供暗色紫青科技风作为可修改起点，不强制用户采用
- 字幕仅在有文字时显示局部背景，可选择单语或中英双语
- 眉题、主证据、关键数字、解释项和来源按语义错峰弹出
- 网页证据优先官方一手来源，核心数据必须裁切或放大到可读
- 所有口播裁剪同时处理画面和原音频，禁止分别删除造成音画漂移

## 授权

本项目以 MIT License 分享。部分 Remotion 底座结构基于 MIT 授权项目修改，原版权声明见 `THIRD_PARTY_NOTICES.md`。
