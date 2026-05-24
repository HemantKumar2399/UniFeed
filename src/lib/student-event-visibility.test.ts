import assert from "node:assert/strict";
import test from "node:test";

import { resolveStudentEventAccess } from "./student-event-visibility";

void test("student event visibility hides draft events from student detail views", () => {
  assert.equal(
    resolveStudentEventAccess({
      eventStatus: "DRAFT",
      eventCollegeId: "college-1",
      userCollegeId: "college-1",
    }),
    "hidden",
  );
});

void test("student event visibility hides submitted and rejected events from student detail views", () => {
  assert.equal(
    resolveStudentEventAccess({
      eventStatus: "SUBMITTED",
      eventCollegeId: "college-1",
      userCollegeId: "college-1",
    }),
    "hidden",
  );
  assert.equal(
    resolveStudentEventAccess({
      eventStatus: "REJECTED",
      eventCollegeId: "college-1",
      userCollegeId: "college-1",
    }),
    "hidden",
  );
});

void test("student event visibility allows published events inside the same college", () => {
  assert.equal(
    resolveStudentEventAccess({
      eventStatus: "PUBLISHED",
      eventCollegeId: "college-1",
      userCollegeId: "college-1",
    }),
    "visible",
  );
});

void test("student event visibility blocks published events from other colleges", () => {
  assert.equal(
    resolveStudentEventAccess({
      eventStatus: "PUBLISHED",
      eventCollegeId: "college-2",
      userCollegeId: "college-1",
    }),
    "wrong_college",
  );
});
