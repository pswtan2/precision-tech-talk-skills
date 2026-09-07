import React from "react";
import {AbsoluteFill} from "remotion";
import {ComparisonBars, ProcessFlow, SectionEyebrow, TimedScene} from "../components/EditorialKit";

// 每期根据 SEMANTIC-PLAN.md 重写。本例只展示通用构图，不代表真实数据。
export const SemanticOverlays: React.FC = () => <AbsoluteFill style={{pointerEvents: "none"}}>
  <TimedScene from={4} to={12} side="right">
    <SectionEyebrow en="SYSTEM SIGNAL" zh="数据变化要在说到时出现" meta="CONTENT-SYNCED" />
    <div style={{position: "absolute", right: 100, top: 255, width: 720}}><ComparisonBars items={[
      {label: "旧状态", value: 38, note: "基线", delay: 11},
      {label: "新状态", value: 76, note: "变化", delay: 17},
    ]} /></div>
  </TimedScene>
  <TimedScene from={12} to={20} side="right">
    <SectionEyebrow en="CAUSE AND EFFECT" zh="因果关系逐节点展开" meta="ONE IDEA AT A TIME" />
    <div style={{position: "absolute", right: 90, top: 390}}><ProcessFlow items={[
      {title: "原因", subtitle: "先出现", delay: 11},
      {title: "机制", subtitle: "再解释", delay: 17},
      {title: "结果", subtitle: "最后落点", delay: 23},
    ]} /></div>
  </TimedScene>
</AbsoluteFill>;

