import assert from "node:assert/strict";
import { test } from "node:test";

void test("calendar route rejects unauthenticated requests", async () => {
  const { buildCalendarRouteResponse } = await import("@/features/events/calendar-route");
  const response = buildCalendarRouteResponse({
    user: null,
    event: null,
    origin: "http://localhost:3000",
    host: "localhost:3000",
  });

  assert.equal(response.status, 401);
});

void test("calendar route blocks events from another college", async () => {
  const { buildCalendarRouteResponse } = await import("@/features/events/calendar-route");
  const response = buildCalendarRouteResponse({
    user: {
      collegeId: "college-1",
    },
    event: {
      id: 88,
      title: "Campus Fest",
      description: "Annual showcase",
      location: "Hall A",
      date: new Date("2030-05-14T18:45:00.000Z"),
      status: "PUBLISHED",
      collegeId: "college-2",
      club: {
        name: "Coding Club",
      },
    },
    origin: "http://localhost:3000",
    host: "localhost:3000",
  });

  assert.equal(response.status, 403);
});

void test("calendar route returns not found for unpublished events", async () => {
  const { buildCalendarRouteResponse } = await import("@/features/events/calendar-route");
  const response = buildCalendarRouteResponse({
    user: {
      collegeId: "college-1",
    },
    event: {
      id: 88,
      title: "Campus Fest",
      description: "Annual showcase",
      location: "Hall A",
      date: new Date("2030-05-14T18:45:00.000Z"),
      status: "DRAFT",
      collegeId: "college-1",
      club: {
        name: "Coding Club",
      },
    },
    origin: "http://localhost:3000",
    host: "localhost:3000",
  });

  assert.equal(response.status, 404);
});

void test("calendar route returns a calendar attachment for same-college published events", async () => {
  const { buildCalendarRouteResponse } = await import("@/features/events/calendar-route");
  const response = buildCalendarRouteResponse({
    user: {
      collegeId: "college-1",
    },
    event: {
      id: 88,
      title: "Campus Fest",
      description: "Annual showcase",
      location: "Hall A",
      date: new Date("2030-05-14T18:45:00.000Z"),
      status: "PUBLISHED",
      collegeId: "college-1",
      club: {
        name: "Coding Club",
      },
    },
    origin: "http://localhost:3000",
    host: "localhost:3000",
  });
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Content-Type"), "text/calendar; charset=utf-8");
  assert.match(response.headers.get("Content-Disposition") ?? "", /filename="campus-fest\.ics"/);
  assert.match(body, /BEGIN:VEVENT/);
  assert.match(body, /SUMMARY:Campus Fest/);
  assert.match(body, /Hosted by Coding Club\./);
});
