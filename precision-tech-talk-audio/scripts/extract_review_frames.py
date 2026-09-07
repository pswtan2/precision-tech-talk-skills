#!/usr/bin/env python3
"""Extract uniformly spaced review frames from a picture-locked video."""

from __future__ import annotations

import argparse
import csv
import json
import shutil
import subprocess
from pathlib import Path


def run(command: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(command, check=True, text=True, capture_output=True, encoding="utf-8")


def timecode(seconds: float) -> str:
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    rest = seconds % 60
    return f"{hours:02d}:{minutes:02d}:{rest:06.3f}"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("video", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--interval", type=float, default=5.0)
    args = parser.parse_args()

    if args.interval <= 0:
        parser.error("--interval must be greater than zero")
    if not args.video.is_file():
        parser.error(f"video not found: {args.video}")
    for executable in ("ffmpeg", "ffprobe"):
        if shutil.which(executable) is None:
            parser.error(f"{executable} is required")

    probe = run([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "json", str(args.video),
    ])
    duration = float(json.loads(probe.stdout)["format"]["duration"])
    args.output.mkdir(parents=True, exist_ok=True)

    times: list[float] = [0.1]
    current = args.interval
    while current < duration - 0.1:
        times.append(current)
        current += args.interval
    if duration > 0.6:
        # Container duration can extend slightly beyond the last decodable video
        # frame. Keep a safe margin so the ending review frame is actually emitted.
        times.append(duration - 0.5)

    manifest = args.output / "manifest.csv"
    with manifest.open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.writer(handle)
        writer.writerow(["index", "time_seconds", "timecode", "file"])
        for index, seconds in enumerate(times, start=1):
            name = f"KF{index:04d}_{seconds:010.3f}.jpg"
            target = args.output / name
            run([
                "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
                "-ss", f"{seconds:.3f}", "-i", str(args.video),
                "-frames:v", "1", "-q:v", "2", str(target),
            ])
            if not target.is_file() or target.stat().st_size == 0:
                raise RuntimeError(f"ffmpeg did not emit review frame at {seconds:.3f}s")
            writer.writerow([index, f"{seconds:.3f}", timecode(seconds), name])

    print(f"duration={duration:.3f}")
    print(f"frames={len(times)}")
    print(f"manifest={manifest}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
