import assert from "node:assert/strict";
import { test } from "node:test";

// Exercises the actual guard used by the existing destructive seed entry point.
void test("seed refuses to run without the explicit demo reset flag", async () => {
  const { spawnSync } = await import("node:child_process");
  const run = spawnSync(
    process.execPath,
    ["--import", "tsx", "prisma/seed.ts"],
    {
      encoding: "utf8",
      env: {
        ...process.env,
        DATABASE_URL: "postgresql://unit:unit@127.0.0.1:1/unifeed_test",
        NODE_ENV: "test",
      },
    },
  );
  assert.notEqual(run.status, 0);
  assert.match(run.stderr, /--reset-demo/);
});

void test("seed refuses a remote hostname even when localhost occurs in the password", async () => {
  const { spawnSync } = await import("node:child_process");
  const run = spawnSync(
    process.execPath,
    ["--import", "tsx", "prisma/seed.ts", "--reset-demo"],
    {
      encoding: "utf8",
      env: {
        ...process.env,
        DATABASE_URL: "postgresql://unit:localhost@remote.invalid/unifeed_test",
        NODE_ENV: "test",
      },
    },
  );
  assert.notEqual(run.status, 0);
  assert.match(run.stderr, /Refusing.*local/);
});
