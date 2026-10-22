import { readdirSync, mkdirSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const integration = process.argv.includes("--integration");
if (integration) {
  const url = new URL(process.env.TEST_DATABASE_URL ?? "postgresql://invalid/");
  if (
    !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) ||
    !/test/i.test(url.pathname)
  ) {
    throw new Error(
      "TEST_DATABASE_URL must name a dedicated local test database.",
    );
  }
}
const files = readdirSync("src", { recursive: true })
  .filter(
    (path) =>
      /\.test\.tsx?$/.test(path) &&
      /\.integration\.test\./.test(path) === integration,
  )
  .map((path) => `src/${path}`);
// Exact import URLs avoid Node treating Next's [id] route filenames as globs.
mkdirSync("test-results/unit-entrypoints", { recursive: true });
const entries = files.map((file, index) => {
  const entry = `test-results/unit-entrypoints/${integration ? "integration" : "unit"}-${index}.mjs`;
  writeFileSync(
    entry,
    `await import(${JSON.stringify(pathToFileURL(resolve(file)).href)});\n`,
  );
  return entry;
});
const result = spawnSync(
  process.execPath,
  [
    "--import",
    new URL("./test-runtime.mjs", import.meta.url).href,
    "--test",
    "--test-concurrency=4",
    ...entries,
  ],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_ENV: "test",
      NEXT_PUBLIC_LOCALE: "en",
      NEXT_PUBLIC_TIME_ZONE: "UTC",
      DATABASE_URL: integration
        ? process.env.TEST_DATABASE_URL
        : "postgresql://unit:unit@127.0.0.1:1/unifeed_unit",
      AUTH_SECRET: "isolated-test-auth-secret",
      ALLOWED_DOMAINS: "students.example.edu",
      STUDENT_QR_SECRET: "isolated-test-qr-secret",
    },
  },
);
if (result.error) throw result.error;
process.exit(result.status ?? 1);
