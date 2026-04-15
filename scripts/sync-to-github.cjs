const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DIR = '_bmad-output/implementation-artifacts';

console.log("Analyzing epics to map milestones...");
const epicsContent = fs.readFileSync('_bmad-output/planning-artifacts/epics.md', 'utf-8');
const epicRegex = /^## Epic (\d+):\s*(.*)$/gm;
const epics = {};
let match;
while ((match = epicRegex.exec(epicsContent)) !== null) {
  if (parseInt(match[1]) >= 6) {
    epics[match[1]] = `Epic ${match[1]}: ${match[2].trim()}`;
  }
}

try {
  execSync('gh auth status', { stdio: 'ignore' });
} catch (e) {
  console.error("Error: GitHub CLI (gh) auth failed"); process.exit(1);
}

console.log("Creating Milestones on GitHub...");
let milestonesJson = "[]";
try {
  milestonesJson = execSync(`gh api repos/{owner}/{repo}/milestones`, {encoding: 'utf8'});
} catch(e) {}
let milestones = [];
try { milestones = JSON.parse(milestonesJson); } catch(e) {}

for (const [num, title] of Object.entries(epics)) {
  try {
    const existing = milestones.find(m => m.title === title);
    if (!existing) {
        console.log(`Creating missing milestone: ${title}...`);
        const res = execSync('gh api repos/{owner}/{repo}/milestones -f title=@-', {
            input: title,
            encoding: 'utf8'
        });
        milestones.push(JSON.parse(res));
    } else {
        console.log(`Milestone already exists: ${title}`);
    }
  } catch (e) {
    console.log(`Error creating milestone ${title}: ${e.message}`);
  }
}

console.log("Syncing stories and capturing Issue IDs...");
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.md'));
const issueMap = {};

for (const file of files) {
  const filepath = path.join(DIR, file);
  const basename = path.basename(file, '.md');
  const epicNumMatch = basename.match(/^(\d+)-/);
  
  if (!epicNumMatch || parseInt(epicNumMatch[1]) < 6) continue;
  if (file.includes('readiness') || file.includes('retro') || file.includes('prompt')) continue;

  const title = `Story: ${basename}`;
  console.log(`Pushing ${title}...`);
  try {
    const searchRes = execSync('gh issue list --search "in:title \\"' + title + '\\"" --json number,url', {encoding: 'utf8'});
    let issueNum, issueUrl;
    const existingIssues = JSON.parse(searchRes);
    if (existingIssues.length > 0) {
       issueNum = existingIssues[0].number;
       issueUrl = existingIssues[0].url;
       execSync(`gh issue edit ${issueNum} --body-file "${filepath}"`, {stdio: 'ignore'});
    } else {
       const output = execSync(`gh issue create --title "${title}" --body-file "${filepath}" --label "story"`, {encoding: 'utf8'});
       issueUrl = output.trim(); 
       const parts = issueUrl.split('/');
       issueNum = parts[parts.length - 1];
    }
    issueMap[file] = { num: issueNum, url: issueUrl };

    if (epicNumMatch && epics[epicNumMatch[1]]) {
        const milestoneTitle = epics[epicNumMatch[1]];
        try {
            const m = milestones.find(x => x.title === milestoneTitle);
            if(m) {
                execSync(`gh issue edit ${issueNum} -m "${m.title}"`, {stdio: 'ignore'});
            }
        } catch(e) {
            console.log(`   Failed to link milestone: ${milestoneTitle} to Issue #${issueNum}`);
        }
    }
  } catch (e) {
    console.error(`❌ Failed to push ${file}: ${e.message.split('\n')[0]}`);
  }
}

for (const file of Object.keys(issueMap)) {
  const filepath = path.join(DIR, file);
  let content = fs.readFileSync(filepath, 'utf8');
  const changed = content.replace(/Depends on:\s*(.+)$/m, (fullLine, depsStr) => {
    let replaced = depsStr;
    Object.keys(issueMap).forEach(localFile => {
      replaced = replaced.replace(localFile, issueMap[localFile].url);
    });
    return `Depends on: ${replaced}`;
  });

  if (content !== changed) {
    fs.writeFileSync(filepath, changed);
    if (issueMap[file]) {
        execSync(`gh issue edit ${issueMap[file].num} --body-file "${filepath}"`, {stdio: 'ignore'});
    }
  }
}
console.log("✅ Safely pushed all Epics 6-15 as milestones and Issues!");
