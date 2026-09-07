import React from "react";
import {Video} from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {externalBrollSlots, ExternalBrollSlot} from "../broll-plan";
import {FPS, theme} from "../theme";

const at = (seconds: number) => Math.round(seconds * FPS);
const span = (start: number, end: number) => Math.round((end - start) * FPS);

const ExternalBrollClip: React.FC<ExternalBrollSlot & {durationInFrames: number}> = ({
  file,
  durationInFrames,
  trimBeforeSeconds = 0,
  playbackRate = 1,
  fadeFrames = 10,
}) => {
  const frame = useCurrentFrame();
  const fade = Math.min(fadeFrames, Math.max(1, Math.floor(durationInFrames / 3)));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        opacity: interpolate(
          frame,
          [0, fade, Math.max(fade + 1, durationInFrames - fade - 1), durationInFrames - 1],
          [0, 1, 1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.linear,
              Easing.bezier(0.7, 0, 0.84, 0),
            ],
          },
        ),
      }}
    >
      <Video
        src={staticFile(`broll/${file}`)}
        muted
        trimBefore={Math.round(trimBeforeSeconds * FPS)}
        playbackRate={playbackRate}
        objectFit="cover"
        style={{width: "100%", height: "100%"}}
      />
    </AbsoluteFill>
  );
};

export const ExternalBrollTrack: React.FC = () => (
  <AbsoluteFill>
    {externalBrollSlots.map((slot) => {
      const durationInFrames = span(slot.start, slot.end);
      return (
        <Sequence
          key={`${slot.file}-${slot.start}`}
          from={at(slot.start)}
          durationInFrames={durationInFrames}
          premountFor={FPS}
        >
          <ExternalBrollClip {...slot} durationInFrames={durationInFrames} />
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
