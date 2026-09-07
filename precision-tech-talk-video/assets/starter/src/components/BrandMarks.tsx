import React from "react";
import { Img, staticFile } from "remotion";
import { FONT, theme, USE_BRAND_ASSETS } from "../theme";

/** Logo 左上、头像右上；未提供素材时显示可预览的占位标识。 */
export const BrandMarks: React.FC = () => (
  <div
    style={{
      position: "absolute",
      left: 92,
      right: 92,
      top: 48,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      pointerEvents: "none",
      fontFamily: FONT,
    }}
  >
    {USE_BRAND_ASSETS ? (
      <Img src={staticFile("logo.png")} style={{ width: 190, height: 64, objectFit: "contain", objectPosition: "left center" }} />
    ) : (
      <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: 5, color: theme.text }}>
        <span style={{ color: theme.accentSoft }}>TECH</span> TALK
      </div>
    )}
    {USE_BRAND_ASSETS ? (
      <Img src={staticFile("avatar.png")} style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: `2px solid rgba(${theme.accentRGB},0.7)` }} />
    ) : (
      <div style={{ width: 58, height: 58, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: theme.accentSoft, border: `1px solid rgba(${theme.accentRGB},0.55)`, background: theme.bgPanel, fontSize: 16, letterSpacing: 2 }}>
        AV
      </div>
    )}
  </div>
);
