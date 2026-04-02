#!/bin/bash

echo "Linking issues to milestones..."

# Fetch all issues, loop over them
gh issue list -L 100 --json number,title --jq '.[] | "\(.number)|\(.title)"' | while IFS="|" read -r num title; do
  
  # Extract the epic number from the "Story: 1-2-..." string
  epic_num=$(echo "$title" | grep -oE "Story: [0-9]+" | awk '{print $2}')
  
  if [ ! -z "$epic_num" ]; then
    echo "Updating Issue #$num -> Linking to Milestone $epic_num"
    gh issue edit "$num" -m "$epic_num"
  fi

done

echo "Done!"
