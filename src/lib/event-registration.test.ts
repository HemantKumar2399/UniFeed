import assert from "node:assert/strict";
import test from "node:test";

import {
  formatRegistrationDeadline,
  getRegistrationAvailability,
  getRegistrationAvailabilityLabel,
  isRegistrationReopenable,
} from "./event-registration.js";

const now = new Date("2030-05-10T10:00:00.000Z");
const eventDate = new Date("2030-05-14T18:00:00.000Z");

void test("getRegistrationAvailability reports open and closing-soon states", () => {
  assert.equal(
    getRegistrationAvailability({
      status: "PUBLISHED",
      date: eventDate,
      registrationClosesAt: new Date("2030-05-12T10:00:00.000Z"),
      capacity: 100,
      activeCount: 25,
      waitlistEnabled: true,
      now,
    }),
    "OPEN",
  );

  assert.equal(
    getRegistrationAvailability({
      status: "PUBLISHED",
      date: eventDate,
      registrationClosesAt: new Date("2030-05-11T08:00:00.000Z"),
      capacity: 100,
      activeCount: 25,
      waitlistEnabled: true,
      now,
    }),
    "CLOSING_SOON",
  );
});

void test("getRegistrationAvailability reports closed, waitlist, and started states", () => {
  assert.equal(
    getRegistrationAvailability({
      status: "PUBLISHED",
      date: eventDate,
      registrationClosesAt: null,
      capacity: 100,
      activeCount: 25,
      waitlistEnabled: true,
      now,
    }),
    "CLOSED_BY_DEADLINE",
  );

  assert.equal(
    getRegistrationAvailability({
      status: "PUBLISHED",
      date: eventDate,
      registrationClosesAt: new Date("2030-05-12T10:00:00.000Z"),
      capacity: 100,
      activeCount: 100,
      waitlistEnabled: true,
      now,
    }),
    "WAITLIST_OPEN",
  );

  assert.equal(
    getRegistrationAvailability({
      status: "PUBLISHED",
      date: eventDate,
      registrationClosesAt: new Date("2030-05-12T10:00:00.000Z"),
      capacity: 100,
      activeCount: 100,
      waitlistEnabled: false,
      now,
    }),
    "FULL",
  );

  assert.equal(
    getRegistrationAvailability({
      status: "PUBLISHED",
      date: new Date("2030-05-09T10:00:00.000Z"),
      registrationClosesAt: new Date("2030-05-08T10:00:00.000Z"),
      capacity: 100,
      activeCount: 25,
      waitlistEnabled: true,
      now,
    }),
    "EVENT_STARTED",
  );
});

void test("getRegistrationAvailability reports cancelled and unpublished states", () => {
  assert.equal(
    getRegistrationAvailability({
      status: "CANCELLED",
      date: eventDate,
      registrationClosesAt: new Date("2030-05-12T10:00:00.000Z"),
      capacity: 100,
      activeCount: 25,
      waitlistEnabled: true,
      now,
    }),
    "EVENT_CANCELLED",
  );

  assert.equal(
    getRegistrationAvailability({
      status: "SUBMITTED",
      date: eventDate,
      registrationClosesAt: new Date("2030-05-12T10:00:00.000Z"),
      capacity: 100,
      activeCount: 25,
      waitlistEnabled: true,
      now,
    }),
    "NOT_PUBLISHED",
  );
});

void test("isRegistrationReopenable only allows approved or published future events", () => {
  assert.equal(
    isRegistrationReopenable({
      status: "PUBLISHED",
      date: eventDate,
      now,
    }),
    true,
  );

  assert.equal(
    isRegistrationReopenable({
      status: "APPROVED",
      date: eventDate,
      now,
    }),
    true,
  );

  assert.equal(
    isRegistrationReopenable({
      status: "SUBMITTED",
      date: eventDate,
      now,
    }),
    false,
  );

  assert.equal(
    isRegistrationReopenable({
      status: "PUBLISHED",
      date: new Date("2030-05-09T10:00:00.000Z"),
      now,
    }),
    false,
  );
});

void test("registration helper formatting and labels stay user-friendly", () => {
  assert.match(formatRegistrationDeadline(eventDate), /14 May 2030/i);
  assert.equal(getRegistrationAvailabilityLabel("CLOSED_BY_DEADLINE"), "Registration closed");
});
