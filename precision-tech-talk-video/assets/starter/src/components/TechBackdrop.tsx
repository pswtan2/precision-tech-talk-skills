import React from "react";
import { AbsoluteFill } from "remotion";

/** V1 克制精密背景：低对比网格 + 右上紫色环境光。 */
export const TechBackdrop: React.FC = () => (
  <AbsoluteFill style={{ background: "#070914" }}>
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "linear-gradient(rgba(124,92,255,0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(40,215,255,0.04) 1px,transparent 1px)",
        backgroundSize: "64px 64px",
        opacity: 0.78,
      }}
    />
    <div
      style={{
        position: "absolute",
        width: 680,
        height: 680,
        borderRadius: "50%",
        right: -180,
        top: -240,
        background: "rgba(87,55,214,0.23)",
        filter: "blur(120px)",
      }}
    />
  </AbsoluteFill>
);
