/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/unbound-method */
import assert from "node:assert/strict";
import { test } from "node:test";
import { NextRequest } from "next/server";
import { db } from "@/server/db";
import { POST } from "./route";

void test("public registration normalizes email and ignores requested elevated roles", async (t) => {
  const collegeFind = db.college.findFirst;
  const userFind = db.user.findUnique;
  const userCreate = db.user.create;
  t.after(() => {
    db.college.findFirst = collegeFind;
    db.user.findUnique = userFind;
    db.user.create = userCreate;
  });
  db.college.findFirst = (async () => ({ id: "campus" })) as any;
  db.user.findUnique = (async () => null) as any;
  let created: any;
  db.user.create = (async (args: any) => {
    created = args.data;
    return {};
  }) as any;
  const response = await POST(
    new NextRequest("http://localhost/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: "  New@Campus.EDU  ",
        password: "strong-pass-123",
        name: "New Student",
        role: "ADMIN",
      }),
    }),
  );
  assert.equal(response.status, 201);
  assert.equal(created.role, "STUDENT");
  assert.equal(created.email, "new@campus.edu");
  assert.notEqual(created.password, "strong-pass-123");
});

void test("malformed registration JSON produces a client error", async () => {
  const response = await POST(
    new NextRequest("http://localhost/api/auth/register", {
      method: "POST",
      body: "{",
    }),
  );
  assert.equal(response.status, 400);
});
