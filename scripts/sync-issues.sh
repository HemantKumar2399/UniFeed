#!/bin/bash

# Ensure gh cli is installed
if ! command -v gh &> /dev/null
then
    echo "GitHub CLI (gh) could not be found. Please install it first: https://cli.github.com/"
    exit 1
fi

# Ensure we are authenticated
gh auth status || exit 1

# Directory where BMad stories live
STORIES_DIR="_bmad-output/implementation-artifacts"

if [ ! -d "$STORIES_DIR" ]; then
  echo "Error: Directory $STORIES_DIR does not exist."
  exit 1
fi

echo "Syncing stories to GitHub Issues..."

# Loop through all markdown files in the directory
for FILE in "$STORIES_DIR"/*.md; do
  # Exclude non-story files like sprint-status.yaml or readiness reports if they ended up here
  if [[ "$FILE" == *"readiness"* ]]; then
    continue
  fi

  # Extract the filename without the path and extension
  BASENAME=$(basename "$FILE" .md)

  # Use the filename as the initial title (can be improved to extract first H1)
  TITLE="Story: $BASENAME"

  echo "Creating issue for: $TITLE"
  gh issue create --title "$TITLE" --body-file "$FILE" --label "story"
  
  # small delay to prevent rate-limiting from GH API
  sleep 1
done

echo "✅ All stories successfully pushed to GitHub Issues."
