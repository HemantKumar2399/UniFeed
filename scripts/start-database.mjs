import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { createConnection } from "node:net";

if (existsSync(".env")) process.loadEnvFile(".env");
const url = new URL(process.env.DATABASE_URL ?? "postgresql://invalid/");
if (!["localhost", "127.0.0.1", "[::1]"].includes(url.hostname))
  throw new Error("Database starter only supports local hosts.");
const database = decodeURIComponent(url.pathname.slice(1));
if (!/^[a-zA-Z0-9_-]+$/.test(database))
  throw new Error("Use a simple local database name.");
const port = Number(url.port || 5432);
const runtime = ["docker", "podman"].find(
  (name) => spawnSync(name, ["info"], { stdio: "ignore" }).status === 0,
);
const name = `${database}-postgres`;
function run(args) {
  const result = spawnSync(runtime, args, { encoding: "utf8" });
  if (result.error || result.status !== 0)
    throw new Error(
      `${runtime} ${args[0]} failed. Check the container runtime and local database configuration.`,
    );
  return result.stdout.trim();
}
async function reachable() {
  return new Promise((resolve) => {
    const socket = createConnection({
      host: url.hostname.replace(/^\[|\]$/g, ""),
      port,
    });
    const finish = (ok) => {
      socket.destroy();
      resolve(ok);
    };
    socket.setTimeout(1000, () => finish(false));
    socket.once("connect", () => finish(true));
    socket.once("error", () => finish(false));
  });
}
if (runtime) {
  const existing = run(["ps", "-aq", "--filter", `name=^${name}$`]);
  if (existing) {
    if (!run(["ps", "-q", "--filter", `name=^${name}$`])) run(["start", name]);
  } else if (await reachable()) {
    console.log(
      "Using the existing PostgreSQL listener; migrations will verify the connection.",
    );
    process.exit(0);
  } else {
    run([
      "run",
      "-d",
      "--name",
      name,
      "-e",
      `POSTGRES_USER=${decodeURIComponent(url.username || "postgres")}`,
      "-e",
      `POSTGRES_PASSWORD=${decodeURIComponent(url.password)}`,
      "-e",
      `POSTGRES_DB=${database}`,
      "-p",
      `127.0.0.1:${port}:5432`,
      "-v",
      `${name}-data:/var/lib/postgresql/data`,
      "postgres:17",
    ]);
  }
  for (let attempt = 0; attempt < 30; attempt++) {
    const ready = spawnSync(
      runtime,
      [
        "exec",
        name,
        "pg_isready",
        "-U",
        decodeURIComponent(url.username || "postgres"),
        "-d",
        database,
      ],
      { stdio: "ignore" },
    );
    if (ready.status === 0) {
      console.log("Local PostgreSQL is ready.");
      process.exit(0);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error("PostgreSQL did not become ready within 30 seconds.");
}
if (await reachable())
  console.log(
    "Using an existing local database listener; migrations will verify the connection.",
  );
else
  throw new Error(
    "Start local PostgreSQL or install/start Docker Desktop or Podman, then retry.",
  );
