#!/bin/bash

# Ensure gh cli is installed
if ! command -v gh &> /dev/null
then
    echo "GitHub CLI (gh) could not be found. Please install it first: https://cli.github.com/"
    exit 1
fi

# Ensure we are authenticated
gh auth status || exit 1

STORIES_DIR="_bmad-output/implementation-artifacts"
if [ ! -d "$STORIES_DIR" ]; then
  echo "Error: Directory $STORIES_DIR does not exist."
  exit 1
fi

# Fallback basic logic if not using the robust node script
echo "We recommend using scripts/sync.cjs for a safer, dependency-aware sync with milestones!"
echo "If you want to just push basic issues, uncomment the lines below."

# for FILE in "$STORIES_DIR"/*.md; do
#   if [[ "$FILE" == *"readiness"* ]]; then continue; fi
#   BASENAME=$(basename "$FILE" .md)
#   TITLE="Story: $BASENAME"
#   echo "Creating issue for: $TITLE"
#   gh issue create --title "$TITLE" --body-file "$FILE" --label "story"
#   sleep 1
# done
# echo "✅ All stories successfully pushed to GitHub Issues."
