// ============================================================
// theme.ts —— 全项目唯一的"控制台"
// 每期视频只需要改【每期必改】区；换风格只改【配色】区。
// ============================================================

// ---------- 每期必改 ----------
export const DUR = 26; // 同步 clean master 的完整时长（秒）。每期必改。

// 初始底座默认用占位画面，不放素材也能预览。
// 每期放好 public/master.mp4 后改为 false。master 必须同时包含同步的画面与人声。
export const USE_PLACEHOLDER_MEDIA = true;

// 放好 public/logo.png 和 public/avatar.png 后改为 true。
export const USE_BRAND_ASSETS = false;

// ---------- 画幅（初始化时由生成器定制，之后不动） ----------
export const FPS = 30;
export const WIDTH = 1920; // 竖屏改为 1080
export const HEIGHT = 1080; // 竖屏改为 1920

// ---------- 配色（换色只改这一块，所有发光/描边走 accentRGB） ----------
export const theme = {
  bg: "#070914", // 全局背景
  bgPanel: "rgba(19,24,48,0.82)", // 半透明卡片底
  panelBorder: "rgba(143,126,255,0.28)",
  text: "#F7F8FF", // 主文字
  text2: "#D7DCF4", // 次级文字（亮色，可以压在视频/图片上）
  textDim: "#96A0C8", // 弱文字——只允许在暗色卡片内部用，禁止压在视频画面上
  accent: "#7C5CFF", // 主强调色
  accentSoft: "#28D7FF",
  accentRGB: "124,92,255", // 供 rgba() 发光/描边用
  good: "#4ade80",
  bad: "#ff5f6b",
};

// 字体栈：中文优先思源黑体/苹方，无需额外安装
export const FONT =
  '"Source Han Sans SC","PingFang SC","Microsoft YaHei",system-ui,sans-serif';
