#!/usr/bin/env python3
from __future__ import annotations

import json
import sys
from pathlib import Path


REQUIRED = [
    "STYLE-PROFILE.md",
    "style-profile.json",
    "PROMPT-TEMPLATE.md",
    "starter/package.json",
    "starter/src/theme.ts",
    "starter/src/Main.tsx",
]


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: validate_template.py <template-directory>", file=sys.stderr)
        return 2

    root = Path(sys.argv[1]).expanduser().resolve()
    errors: list[str] = []

    for relative in REQUIRED:
        if not (root / relative).is_file():
            errors.append(f"Missing: {relative}")

    profile_path = root / "style-profile.json"
    if profile_path.is_file():
        try:
            profile = json.loads(profile_path.read_text(encoding="utf-8"))
            for key in ("name", "canvas", "colors", "type", "motion", "captions"):
                if key not in profile:
                    errors.append(f"style-profile.json missing key: {key}")
        except (OSError, json.JSONDecodeError) as exc:
            errors.append(f"Invalid style-profile.json: {exc}")

    for path in root.rglob("*"):
        if path.is_dir() and path.name == "node_modules":
            errors.append(f"Bundled node_modules: {path}")
        if path.is_file() and path.suffix.lower() in {".mp4", ".mov", ".wav", ".mp3"}:
            errors.append(f"Bundled media file: {path}")

    if errors:
        print("Validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Template validation passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
