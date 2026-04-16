const fs = require('fs');
let content = fs.readFileSync('_bmad-output/implementation-artifacts/FD-1-premium-front-door-journey.md', 'utf8');

const additionalSections = `
## Tasks / Subtasks
- [ ] Create adaptive hero/landing components utilizing standard spacing tokens and NotionInter typography.
- [ ] Implement Vercel/Linear style Bento-box grids for value props with whisper borders.
- [ ] Refactor \`/login\` page and registration flow to an integrated modern split-pane side-sheet/card structure to prevent full reloads.
- [ ] Apply standard semantic colors, tactile \`active:scale-95\` bounds, and robust \`md:\`, \`lg:\` responsiveness.

## Dev Agent Record
### Debug Log
- N/A

### Completion Notes
- N/A

## File List
- N/A

## Change Log
- N/A
`;

if (!content.includes('## Tasks / Subtasks')) {
    content = content.replace('##  Pre-Flight Checklist', additionalSections + '\n##  Pre-Flight Checklist');
    fs.writeFileSync('_bmad-output/implementation-artifacts/FD-1-premium-front-door-journey.md', content);
    console.log('Added missing Dev Sections');
} else {
    console.log('Already had Dev Sections');
}
