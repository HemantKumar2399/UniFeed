import assert from "node:assert/strict";
import test from "node:test";

import {
  createStudentQrId,
  createStudentQrToken,
  decodeStudentQrToken,
  verifyStudentQrToken,
} from "./student-qr";

void test("creates signed student qr tokens and decodes their payload", () => {
  const secret = "student-qr-unit-test-secret";
  const payload = {
    studentQrId: createStudentQrId(),
    studentQrSecretVersion: 3,
    issuedAt: 1735689600000,
  };

  const token = createStudentQrToken(payload, secret);

  assert.equal(verifyStudentQrToken(token, secret), true);
  assert.deepEqual(decodeStudentQrToken(token, secret), payload);
});

void test("rejects tampered student qr tokens", () => {
  const token = createStudentQrToken(
    {
      studentQrId: createStudentQrId(),
      studentQrSecretVersion: 1,
      issuedAt: 1735689600000,
    },
    "student-qr-unit-test-secret",
  );

  const [version, payload, signature] = token.split(".");
  if (!version || !payload || !signature) {
    throw new Error("Token did not include expected segments");
  }

  const tamperedPayload = `${payload.slice(0, -1)}${payload.endsWith("A") ? "B" : "A"}`;
  const tamperedToken = [version, tamperedPayload, signature].join(".");

  assert.equal(verifyStudentQrToken(tamperedToken, "student-qr-unit-test-secret"), false);
});

void test("rejects tokens signed with the wrong secret", () => {
  const token = createStudentQrToken(
    {
      studentQrId: createStudentQrId(),
      studentQrSecretVersion: 2,
      issuedAt: 1735689600000,
    },
    "student-qr-unit-test-secret",
  );

  assert.equal(verifyStudentQrToken(token, "different-student-qr-secret"), false);
});
