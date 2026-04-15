const fs = require('fs');
const path = require('path');

const yamlPath = '_bmad-output/implementation-artifacts/sprint-status.yaml';
let yamlContent = fs.readFileSync(yamlPath, 'utf8');

const DIR = '_bmad-output/implementation-artifacts';
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.md'));

// Find Epics 6-15 stories
const epicsMap = {};
for (const file of files) {
  const basename = path.basename(file, '.md');
  const epicNumMatch = basename.match(/^(\d+)-/);
  if (!epicNumMatch) continue;
  
  const epicNum = parseInt(epicNumMatch[1], 10);
  if (epicNum < 6) continue;
  if(file.includes('retro') || file.includes('prompt')) continue;
  
  if (!epicsMap[epicNum]) {
    epicsMap[epicNum] = [];
  }
  epicsMap[epicNum].push(basename);
}

let newYaml = "\n";
const sortedEpics = Object.keys(epicsMap).map(Number).sort((a,b) => a-b);

for (const epic of sortedEpics) {
  newYaml += `  epic-${epic}: backlog\n`;
  const stories = epicsMap[epic].sort((a, b) => {
      const aMatch = a.match(/^\d+-(\d+)-/);
      const bMatch = b.match(/^\d+-(\d+)-/);
      const aSub = aMatch ? parseInt(aMatch[1]) : 0;
      const bSub = bMatch ? parseInt(bMatch[1]) : 0;
      return aSub - bSub;
  });
  
  for (const story of stories) {
    newYaml += `  ${story}: ready-for-dev\n`;
  }
  newYaml += `  epic-${epic}-retrospective: optional\n\n`;
}

// Append or update yaml
if (!yamlContent.includes('epic-6:')) {
    fs.appendFileSync(yamlPath, newYaml);
    console.log('Successfully updated sprint-status.yaml with Epics 6-15');
} else {
    console.log('Epics already exist in yaml.');
}
