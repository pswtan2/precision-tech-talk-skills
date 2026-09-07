# 制作、渲染与验收

## 输入分流

- 已剪无字幕视频 + SRT：直接进入字幕校验和语义规划。
- 原始视频 + 文案：先逐词转录和同步粗剪，输出单一 clean master，再制作包装。
- 只有视频无 SRT：转录后人工抽查专有名词、数字与时间码。
- 多段原片：先按叙事顺序合成/剪切，同一剪切表同时处理画面和原音轨。

## 工程流程

1. 运行 `python scripts/new_project.py <目标目录>` 创建新工程。
2. 把同步成片放到 `public/master.mp4`，SRT 放到 `public/video.srt`。
3. 用 starter 的字幕脚本生成 `src/captions.ts`，再生成同索引的 `src/english-captions.ts`。
4. 修改 `src/theme.ts` 的时长；把每期语义时间线保存为 `SEMANTIC-PLAN.md`。
5. 每期只新增/修改 `src/scenes/SemanticOverlays.tsx`，复用 `EditorialKit.tsx`，证据素材放在 `public/evidence/`。
6. 需要外部动画时，把素材放在 `public/broll/`，填写 `src/broll-plan.ts`；按 [外部动画与转场连续性](external-broll-and-continuity.md) 检查槽位、变速、图层互斥和转场。
7. 先用 still 和短区间视频检查，再渲染全片。用户已明确确认全片渲染时无需再次追问。

## 关键帧验收

至少覆盖钩子、主数据、真实网页、流程/因果、建议、结论、片尾。所有动效和 B-roll 场景都额外检查进入前 0.2 秒、核心信息稳定帧、退出过程、退出后 0.3–0.5 秒，以及与下一个场景接触处。

检查内容匹配、是否提前泄露、字体可读性、来源直观性、人物遮挡、字幕黑底、网页裁切和上一动效残留。

## 技术验收

- TypeScript 检查与 Remotion bundle 成功。
- 输出默认 H.264 + AAC、1920×1080、30fps、48kHz 双声道。
- 用 `ffprobe` 核对分辨率、fps、时长、音轨与文件大小。
- 人声建议约 `-15` 到 `-16 LUFS`，真峰值不高于 `-1.5 dBFS`；BGM 不盖过人声。
- 抽查口型：开头、中段、结尾和所有剪切边界。发现漂移时回到 clean master 修正，不在视觉工程里单独挪音频补偿。
- 发生音频修复时，按 [音频修复与统一母带](audio-repair-and-mastering.md) 检查问题区间来源、处理边界、全片音色一致性、完整解码、LUFS 与真峰值。

## 版本规则

每次全片输出使用新文件名，如 `主题_V2_语义动效版.mp4`。保留上一版，除非用户明确要求覆盖。交付时列出本版变化、验证结果和已知限制。
