import assert from "node:assert/strict";
import test from "node:test";
import { ErrorBoundary } from "./ErrorBoundary";

void test("ErrorBoundary.getDerivedStateFromError updates state on error", () => {
  const testError = new Error("Hydration failed");
  const stateUpdate = ErrorBoundary.getDerivedStateFromError(testError);
  
  assert.deepEqual(stateUpdate, {
    hasError: true,
    error: testError,
  });
});
