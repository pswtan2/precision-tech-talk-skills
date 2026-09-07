#!/usr/bin/env python3
"""Create a tech-talk Remotion project from the bundled starter."""

from __future__ import annotations

import shutil
import sys
from pathlib import Path


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: python new_project.py <target-directory>", file=sys.stderr)
        return 2

    target = Path(sys.argv[1]).expanduser().resolve()
    starter = (Path(__file__).resolve().parent.parent / "assets" / "starter").resolve()

    if not starter.is_dir():
        print(f"Starter not found: {starter}", file=sys.stderr)
        return 1
    if target.exists():
        print(f"Refusing to overwrite existing path: {target}", file=sys.stderr)
        return 1

    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copytree(starter, target)
    print(f"Created: {target}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
