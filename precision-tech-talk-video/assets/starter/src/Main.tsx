import React from "react";
import {Video} from "@remotion/media";
import {AbsoluteFill, staticFile, useCurrentFrame} from "remotion";
import {isExternalBrollActive} from "./broll-plan";
import {BilingualCaptions} from "./components/BilingualCaptions";
import {ExternalBrollTrack} from "./components/ExternalBrollTrack";
import {TechBackdrop} from "./components/TechBackdrop";
import {SemanticOverlays} from "./scenes/SemanticOverlays";
import {FPS, theme, USE_PLACEHOLDER_MEDIA} from "./theme";

export const Main: React.FC = () => {
  const frame = useCurrentFrame();
  const brollActive = isExternalBrollActive(frame, FPS);

  return (
    <AbsoluteFill style={{background: theme.bg}}>
      {USE_PLACEHOLDER_MEDIA ? (
        <TechBackdrop />
      ) : (
        <Video
          src={staticFile("master.mp4")}
          objectFit="cover"
          style={{
            width: "100%",
            height: "100%",
            filter: "brightness(0.92) contrast(1.06) saturate(0.90) hue-rotate(3deg)",
          }}
        />
      )}
      <AbsoluteFill
        style={{
          background: "linear-gradient(120deg,rgba(7,18,38,.14),rgba(10,32,55,.07))",
          mixBlendMode: "multiply",
          pointerEvents: "none",
        }}
      />
      {!brollActive && <SemanticOverlays />}
      <ExternalBrollTrack />
      <BilingualCaptions />
    </AbsoluteFill>
  );
};
