const fs = require('fs');
let content = fs.readFileSync('_bmad-output/implementation-artifacts/FD-1-premium-front-door-journey.md', 'utf8');

content = content.replace(/- \[ \] Create adaptive hero\/landing/g, '- [x] Create adaptive hero/landing');
content = content.replace(/- \[ \] Implement Vercel\/Linear style/g, '- [x] Implement Vercel/Linear style');
content = content.replace(/- \[ \] Refactor `\/login`/g, '- [x] Refactor `/login`');
content = content.replace(/- \[ \] Apply standard semantic/g, '- [x] Apply standard semantic');

content = content.replace('status: ready-for-dev', 'status: review');

fs.writeFileSync('_bmad-output/implementation-artifacts/FD-1-premium-front-door-journey.md', content);
console.log('Checked off tasks and changed status to review.');
