process.env.SKIP_ENV_VALIDATION = "1";

import assert from "node:assert/strict";
import test from "node:test";

import { PUBLIC_REGISTRATION_ROLE } from "@/server/auth/registration";

void test("public registration role is always STUDENT", () => {
  assert.equal(PUBLIC_REGISTRATION_ROLE, "STUDENT");
});
