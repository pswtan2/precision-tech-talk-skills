import React from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from "remotion";
import {CAPTIONS} from "../captions";
import {ENGLISH_CAPTIONS} from "../english-captions";
import {FONT} from "../theme";

const clean = (text: string) => text.replace(/[【】]/g, "");

export const BilingualCaptions: React.FC<{minStart?: number}> = ({minStart = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const timeMs = (frame / fps) * 1000;
  const index = CAPTIONS.findIndex((caption) =>
    timeMs >= caption.startMs && timeMs < caption.endMs && caption.startMs >= minStart * 1000,
  );
  if (index < 0) return null;

  return <AbsoluteFill style={{pointerEvents: "none"}}><div style={{position: "absolute", left: "50%", bottom: 52, width: "max-content", maxWidth: "calc(100% - 220px)", padding: "14px 28px 16px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", transform: "translateX(-50%)", background: "rgba(0,0,0,.58)", color: "white", fontFamily: FONT, textShadow: "0 3px 12px rgba(0,0,0,.9)"}}>
    <div style={{fontSize: 43, lineHeight: 1.12, fontWeight: 800}}>{clean(CAPTIONS[index].text)}</div>
    <div style={{fontSize: 27, lineHeight: 1.18, fontWeight: 500, marginTop: 10}}>{ENGLISH_CAPTIONS[index] ?? ""}</div>
  </div></AbsoluteFill>;
};

