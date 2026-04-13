const fs = require('fs');
const path = 'prisma/schema.prisma';
let code = fs.readFileSync(path, 'utf8');

if (!code.includes('enum Role')) {
  code = code + '\nenum Role {\n  USER\n  ORGANIZER\n}\n';
}

if (!code.includes('role Role')) {
  code = code.replace(/model User \{/, "model User {\n  role          Role      @default(USER)");
}

fs.writeFileSync(path, code);
