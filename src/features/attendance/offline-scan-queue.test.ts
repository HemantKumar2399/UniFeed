import assert from "node:assert/strict";
import { test } from "node:test";
import { reconcileOfflineScans } from "./offline-scan-queue";

const scans = ["valid", "invalid", "unregistered"].map((token) => ({
  token,
  scannedAt: "2026-10-21T10:00:00Z",
}));

void test("offline reconciliation retains rejected scans and reports their reasons", async () => {
  const result = await reconcileOfflineScans(scans, async (item) => ({
    outcome: item.token === "valid" ? "CHECKED_IN" : "INVALID_QR",
    message: "Cannot verify passport",
  }));
  assert.equal(result.confirmed, 1);
  assert.deepEqual(
    result.remaining.map((item) => item.token),
    ["invalid", "unregistered"],
  );
  assert.equal(result.issues.length, 2);
  assert.equal(result.issues[0], "Cannot verify passport");
});

void test("a failed request retains that scan and all unprocessed scans", async () => {
  const result = await reconcileOfflineScans(scans, async (item) => {
    if (item.token !== "valid") throw new Error("Service unavailable");
    return { outcome: "ALREADY_CHECKED_IN", message: "Already present" };
  });
  assert.equal(result.confirmed, 1);
  assert.deepEqual(result.remaining, scans.slice(1));
  assert.deepEqual(result.issues, ["Service unavailable"]);
});

void test("all accepted scans leave no unresolved entries", async () => {
  const result = await reconcileOfflineScans(scans, async () => ({
    outcome: "CHECKED_IN",
    message: "Checked in",
  }));
  assert.equal(result.confirmed, 3);
  assert.deepEqual(result.remaining, []);
  assert.deepEqual(result.issues, []);
});
