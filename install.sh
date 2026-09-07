#!/usr/bin/env bash
set -euo pipefail

package_root="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
skill_root="${CODEX_HOME:-${HOME}/.codex}/skills"
skill_names=("precision-tech-talk-video" "precision-tech-talk-audio")

mkdir -p "${skill_root}"

for skill_name in "${skill_names[@]}"; do
  source_path="${package_root}/${skill_name}"
  destination_path="${skill_root}/${skill_name}"

  if [[ ! -d "${source_path}" ]]; then
    echo "Missing skill folder: ${source_path}" >&2
    exit 1
  fi
  if [[ -e "${destination_path}" ]]; then
    echo "Refusing to overwrite installed skill: ${destination_path}" >&2
    exit 1
  fi

  cp -R "${source_path}" "${destination_path}"
  echo "Installed: ${skill_name}"
done

echo "Restart Codex or start a new task to refresh the skill list."
