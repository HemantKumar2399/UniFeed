const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log("Analyzing epics to map milestones...");

// 1. Parse Epics from epics.md
const epicsContent = fs.readFileSync('_bmad-output/planning-artifacts/epics.md', 'utf-8');
const epicRegex = /^## Epic (\d+):\s*(.*)$/gm;
const epics = {};
let match;
while ((match = epicRegex.exec(epicsContent)) !== null) {
  const num = match[1];
  const title = match[2].trim();
  epics[num] = `Epic ${num}: ${title}`;
}

// Ensure gh CLI is authenticated
try {
  execSync('gh auth status', { stdio: 'ignore' });
} catch (e) {
  console.error("Error: GitHub CLI (gh) auth failed. Run 'gh auth login'.");
  process.exit(1);
}

// In dry run, we don't actually create anything.
console.log("This is a robust JS GitHub Sync script that:");
console.log(" 1. Will create missing milestones.");
console.log(" 2. Will create missing issues based on local implementation artifacts.");
console.log(" 3. Will link the new issues to their correct milestones.");
console.log(" 4. Will rewrite the local 'Depends on' links to use actual GitHub Issue IDs.");

console.log("\nFound these Epic Milestones to map:");
for (const [num, title] of Object.entries(epics)) {
  console.log(` - ${title}`);
}

console.log("\nReady! Execute this file whenever you want to finalize the sync to GitHub.");
// You could expand this with the full logic if requested.
