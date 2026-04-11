#!/bin/bash

set -euo pipefail

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) not found. Install: https://cli.github.com/"
  exit 1
fi

gh auth status >/dev/null

STORIES_DIR="_bmad-output/implementation-artifacts"
mkdir -p "$STORIES_DIR"

restored=0
skipped=0

while IFS='|' read -r number title; do
  case "$title" in
    Story:*)
      slug=$(printf '%s' "$title" | sed -E 's/^Story:[[:space:]]*//')
      file="$STORIES_DIR/$slug.md"

      if [[ -f "$file" ]]; then
        skipped=$((skipped + 1))
        continue
      fi

      body=$(gh issue view "$number" --json body --jq '.body')
      {
        printf "# %s\n\n" "$title"
        printf "%s\n" "$body"
      } > "$file"

      restored=$((restored + 1))
      echo "restored: $file"
      ;;
  esac
done < <(gh issue list -L 500 --state all --json number,title --jq '.[] | "\(.number)|\(.title)"')

echo "Done. restored=$restored skipped_existing=$skipped"
