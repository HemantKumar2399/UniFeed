#!/bin/bash

echo "Linking issues to milestones..."

# Fetch all issues, loop over them
gh issue list -L 100 --json number,title --jq '.[] | "\(.number)|\(.title)"' | while IFS="|" read -r num title; do
  
  # Extract the epic number from the "Story: 1-2-..." string
  epic_num=$(echo "$title" | grep -oE "Story: [0-9]+" | awk '{print $2}')
  
  if [ ! -z "$epic_num" ]; then
    # Map the extracted number to the exact milestone title required by 'gh'
    milestone_title=""
    case $epic_num in
      1) milestone_title="Epic 1: Landing Page, App Shell & Base Identity" ;;
      2) milestone_title="Epic 2: The Core Student Feed (Seeded Data)" ;;
      3) milestone_title="Epic 3: High-Concurrency 1-Tap RSVP Engine" ;;
      4) milestone_title="Epic 4: Organizer Dashboard & Content Engine" ;;
      5) milestone_title="Epic 5: Digital Passport & Venue Fulfillment" ;;
    esac

    if [ ! -z "$milestone_title" ]; then
      echo "Updating Issue #$num -> Linking to Milestone: $milestone_title"
      gh issue edit "$num" -m "$milestone_title"
    fi
  fi

done

echo "Done!"
