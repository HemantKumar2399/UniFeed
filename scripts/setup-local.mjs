import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { spawnSync } from "node:child_process";

if (!existsSync(".env")) copyFileSync(".env.example", ".env");
let contents = readFileSync(".env", "utf8");
for (const key of ["AUTH_SECRET", "STUDENT_QR_SECRET"]) {
  contents = contents.replace(
    new RegExp(`^${key}=""\\s*$`, "m"),
    `${key}="${randomBytes(32).toString("base64url")}"`,
  );
}
writeFileSync(".env", contents);
function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: command === "npm" && process.platform === "win32",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
run("npm", ["ci", "--no-audit", "--no-fund"]);
run(process.execPath, ["scripts/start-database.mjs"]);
run("npm", ["run", "db:migrate"]);
console.log(
  "Setup complete. Start with npm run dev. Existing data was preserved.",
);
console.log("Optional destructive demo reset: npm run db:seed -- --reset-demo");
