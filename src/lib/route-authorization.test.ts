import assert from "node:assert/strict";
import test from "node:test";

import { resolveRouteAuthorization } from "./route-authorization";

void test("route authorization redirects unauthenticated dashboard access to login with callbackUrl", () => {
  const result = resolveRouteAuthorization({
    path: "/dashboard/events",
    user: null,
  });

  assert.deepEqual(result, {
    action: "redirect",
    destination: "/login",
    callbackUrl: "/dashboard/events",
  });
});

void test("route authorization redirects unauthenticated admin access to login with callbackUrl", () => {
  const result = resolveRouteAuthorization({
    path: "/admin/events",
    user: null,
  });

  assert.deepEqual(result, {
    action: "redirect",
    destination: "/login",
    callbackUrl: "/admin/events",
  });
});

void test("route authorization sends students away from dashboard routes", () => {
  const result = resolveRouteAuthorization({
    path: "/dashboard",
    user: { role: "STUDENT" },
  });

  assert.deepEqual(result, {
    action: "redirect",
    destination: "/unauthorized",
  });
});

void test("route authorization sends non-admin organizers away from admin routes", () => {
  const result = resolveRouteAuthorization({
    path: "/admin",
    user: { role: "ORGANIZER" },
  });

  assert.deepEqual(result, {
    action: "redirect",
    destination: "/unauthorized",
  });
});

void test("route authorization allows organizers and admins into dashboard routes", () => {
  assert.deepEqual(
    resolveRouteAuthorization({
      path: "/dashboard/metrics",
      user: { role: "ORGANIZER" },
    }),
    { action: "allow" },
  );

  assert.deepEqual(
    resolveRouteAuthorization({
      path: "/dashboard/metrics",
      user: { role: "ADMIN" },
    }),
    { action: "allow" },
  );
});

void test("route authorization redirects organizers and admins away from student-only areas", () => {
  assert.deepEqual(
    resolveRouteAuthorization({
      path: "/home",
      user: { role: "ORGANIZER" },
    }),
    {
      action: "redirect",
      destination: "/dashboard",
    },
  );

  assert.deepEqual(
    resolveRouteAuthorization({
      path: "/passport",
      user: { role: "ADMIN" },
    }),
    {
      action: "redirect",
      destination: "/dashboard",
    },
  );
});
