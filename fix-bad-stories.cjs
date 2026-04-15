// @ts-nocheck
const fs = require('fs');
const path = require('path');

const dir = '_bmad-output/implementation-artifacts';
const badStories = [
  '7-1','7-2','7-3','7-4','7-5','7-6','7-7',
  '13-1','13-2','14-1','14-2','15-1','15-2'
];

const depsMap = {
  '7-1': '[Cards, Containers, & Semantic Shadows](6-5-cards-containers-and-semantic-shadows.md)',
  '7-2': '[The 3-Tier Dashboard Expansion Layout](7-1-the-3-tier-dashboard-expansion-layout.md)',
  '7-3': '[Cards, Containers, & Semantic Shadows](6-5-cards-containers-and-semantic-shadows.md)',
  '7-4': '[The 3-Tier Dashboard Expansion Layout](7-1-the-3-tier-dashboard-expansion-layout.md)',
  '7-5': '[Campus Pulse Event Card Design Refactor](7-3-campus-pulse-event-card-design-refactor.md)',
  '7-6': '[Contextual Capacity Bar Visual Rewrite](7-5-contextual-capacity-bar-visual-rewrite.md)',
  '7-7': '[Cards, Containers, & Semantic Shadows](6-5-cards-containers-and-semantic-shadows.md)',
  '13-1': '[University Domain Authentication](8-1-university-domain-authentication.md)',
  '13-2': '[Club Public Profiles & Follow Mechanism](13-1-club-public-profiles-and-follow-mechanism.md)',
  '14-1': '[Bottom-Sheet Event Details](9-3-bottom-sheet-event-details.md), [University Domain Authentication](8-1-university-domain-authentication.md)',
  '14-2': '[Event Q&A Board Implementation](14-1-event-qa-board-implementation.md)',
  '15-1': '[Campus Pulse Mobile Feed](9-1-campus-pulse-mobile-feed.md)',
  '15-2': '[Database Scoring Weight Adjustments](15-1-database-scoring-weight-adjustments.md), [Static Resource & FAQ Blocks](13-2-static-resource-and-faq-blocks.md)'
};

const allFiles = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

for (const prefix of badStories) {
  const filename = allFiles.find(f => f.startsWith(prefix));
  if (!filename) continue;
  
  const filepath = path.join(dir, filename);
  let content = fs.readFileSync(filepath, 'utf8');

  // Add frontmatter if missing
  if (!content.includes('Status:')) {
    content = content.replace(/^#\s+(.+)$/m, `# $1\n\nStatus: ready-for-dev\nDepends on: ${depsMap[prefix]}\n`);
  }

  // Rewrite "## Epic X..." and "## User Story" or "## Story Description" to just "## Story"
  content = content.replace(/^##\s+Epic.+?\n.*?\n/gm, ''); // remove Epic headers
  content = content.replace(/^##\s+(?:User )?Story(?:\s+Description)?/gm, '## Story');
  
  // Add generic Tasks section at the end if missing
  if (!content.includes('## Tasks')) {
    content += `\n\n## Tasks / Subtasks\n\n- [ ] Analyze acceptance criteria\n- [ ] Implement core functionality\n- [ ] Write unit/integration tests\n- [ ] Review against Tactile Utility guidelines and existing components\n`;
  }
  
  fs.writeFileSync(filepath, content);
  console.log(`Fixed ${filename}`);
}

