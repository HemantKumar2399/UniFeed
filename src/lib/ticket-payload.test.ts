import assert from "node:assert/strict";
import test from "node:test";

import {
  createTicketPayloadToken,
  decodeTicketPayloadToken,
  verifyTicketPayloadToken,
} from "./ticket-payload";

void test("creates encrypted token and verifies payload authenticity", () => {
  const secret = "unit-test-secret";
  const token = createTicketPayloadToken(
    {
      studentId: "user_42",
      eventTicketId: "rsvp_99",
      issuedAt: 1735689600000,
    },
    secret,
  );

  assert.equal(verifyTicketPayloadToken(token, secret), true);
  assert.equal(token.includes("user_42"), false);
  assert.equal(token.includes("rsvp_99"), false);

  const decoded = decodeTicketPayloadToken(token, secret);
  assert.equal(decoded.studentId, "user_42");
  assert.equal(decoded.eventTicketId, "rsvp_99");
  assert.equal(decoded.issuedAt, 1735689600000);
});

void test("rejects tampered ticket payload", () => {
  const token = createTicketPayloadToken(
    {
      studentId: "student_abc",
      eventTicketId: "ticket_123",
      issuedAt: 1735689600000,
    },
    "unit-test-secret",
  );

  const [version, iv, encryptedData, authTag] = token.split(".");
  if (!version || !iv || !encryptedData || !authTag) {
    throw new Error("Token did not include expected segments");
  }
  const tamperedEncryptedData = `${encryptedData.slice(0, -1)}${encryptedData.endsWith("A") ? "B" : "A"}`;
  const tamperedToken = [version, iv, tamperedEncryptedData, authTag].join(".");

  assert.equal(verifyTicketPayloadToken(tamperedToken, "unit-test-secret"), false);
});
