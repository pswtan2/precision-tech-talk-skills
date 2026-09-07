# 模板产物与验收

## 创建目录

目标目录已经存在时停止并让用户选择新名称或明确处理方式，不能静默覆盖。复制 `assets/starter/` 到目标目录的 `starter/`，不要包含 `node_modules`、成片或个人素材。

## 写入风格档案

`STYLE-PROFILE.md` 记录已确认的设计理由和制作规则；`style-profile.json` 至少包含：

```json
{
  "name": "模板名称",
  "canvas": {"width": 1920, "height": 1080, "fps": 30},
  "colors": {"background": "#000000", "panel": "rgba(0,0,0,.8)", "primary": "#00D7FF", "secondary": "#7C5CFF", "text": "#FFFFFF"},
  "type": {"headline": 96, "cardTitle": 36, "captionZh": 43, "captionEn": 27},
  "shape": {"cardRadius": 18, "captionRadius": 0},
  "motion": {"density": "medium", "staggerFrames": 4, "exitFrames": 8},
  "captions": {"mode": "bilingual", "localBackgroundOpacity": 0.58}
}
```

将这些参数真实写入 `starter/src/theme.ts` 和相关字幕/组件，不能只生成说明文档。

## 通用提示词

`PROMPT-TEMPLATE.md` 必须包含：本期主题、视频、SRT/文案、证据素材、特殊要求，以及固定的风格档案引用。明确要求先生成语义时间线和关键帧，确认后再渲染；原始口播裁剪必须音画同步。

## 验收

1. 运行 `scripts/validate_template.py <模板目录>`。
2. 在 `starter/` 安装依赖并运行 TypeScript 检查。
3. 渲染钩子、证据/数据、流程/列表和字幕关键帧。
4. 将真实渲帧与选定效果图对比：颜色、字号、圆角、人物位置、遮罩与动画层级应一致。
5. 交付时告诉用户以后分别何时使用 `$precision-tech-talk-video` 和 `$precision-tech-talk-audio`。

