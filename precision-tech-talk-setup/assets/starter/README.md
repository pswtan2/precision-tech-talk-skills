# 科技口播 Remotion 通用底座

这是 `$precision-tech-talk-video` 每期创建工程时复制的干净底座。

## 每期替换

1. 把音画同步的无字幕成片命名为 `public/master.mp4`。
2. 把对应字幕放到 `public/video.srt`，运行 `py -3 tools/srt_to_captions.py public/video.srt tools/keywords.json`。
3. 逐条生成 `src/english-captions.ts`，条数必须与中文字幕一致。
4. 复制 `SEMANTIC-PLAN.template.md` 为 `SEMANTIC-PLAN.md`，按口播时间规划画面。
5. 根据计划重写 `src/scenes/SemanticOverlays.tsx`，事实素材放 `public/evidence/`。
6. 在 `src/theme.ts` 设置总时长，并将 `USE_PLACEHOLDER_MEDIA` 改为 `false`。

## 命令

```powershell
npm install
npm run studio
npx tsc --noEmit
npm run render
```

字幕、滤镜和动效规范由 Skill 的 `references/` 文件维护，不把某一期的品牌和数据写回本底座。
