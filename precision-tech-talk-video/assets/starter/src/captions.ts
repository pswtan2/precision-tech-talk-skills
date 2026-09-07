// 本文件由 tools/srt_to_captions.py 自动生成，不要手改。
// 每期流程：把真实 SRT 放到 public/video.srt，然后运行：
//   python tools/srt_to_captions.py public/video.srt tools/keywords.json
// 文字中的【】包裹的词会在底部字幕里高亮。

import type { Caption } from "@remotion/captions";

// ↓↓↓ 演示数据（跑脚本后会被整体覆盖）↓↓↓
export const CAPTIONS: Caption[] = [
  { text: "别再用勤奋掩盖【系统问题】", startMs: 0, endMs: 4000, timestampMs: 0, confidence: 1, pageBreakAfter: true },
  { text: "复杂问题可以拆成三步", startMs: 4000, endMs: 8000, timestampMs: 4000, confidence: 1, pageBreakAfter: true },
  { text: "先找到真正的【瓶颈】", startMs: 8000, endMs: 12000, timestampMs: 8000, confidence: 1, pageBreakAfter: true },
  { text: "再把有效动作固化为流程", startMs: 12000, endMs: 16000, timestampMs: 12000, confidence: 1, pageBreakAfter: true },
  { text: "最后用真实结果持续【校正】", startMs: 16000, endMs: 20000, timestampMs: 16000, confidence: 1, pageBreakAfter: true },
  { text: "那么以上就是本期视频的全部内容了", startMs: 20000, endMs: 23000, timestampMs: 20000, confidence: 1, pageBreakAfter: true },
  { text: "欢迎大家点赞收藏关注 我们下期视频再见", startMs: 23000, endMs: 26000, timestampMs: 23000, confidence: 1, pageBreakAfter: true },
];
