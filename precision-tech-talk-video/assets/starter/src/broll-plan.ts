export type ExternalBrollSlot = {
  file: string;
  start: number;
  end: number;
  trimBeforeSeconds?: number;
  playbackRate?: number;
  fadeFrames?: number;
};

// Fill this from SEMANTIC-PLAN.md. Files live under public/broll/.
// Keep this list empty when the episode does not need full-screen B-roll.
export const externalBrollSlots: readonly ExternalBrollSlot[] = [];

export const isExternalBrollActive = (frame: number, fps: number) =>
  externalBrollSlots.some(({start, end}) =>
    frame >= Math.round(start * fps) && frame < Math.round(end * fps),
  );
