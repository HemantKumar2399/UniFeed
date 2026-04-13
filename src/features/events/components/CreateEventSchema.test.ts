import assert from "node:assert/strict";
import test from "node:test";
import { CreateEventSchema } from "./CreateEventSchema";

void test("Zod schema rejects short title", () => {
  const result = CreateEventSchema.safeParse({
    title: "ab",
    description: "Valid description",
    location: "Valid setup",
    capacity: 10,
    imageUrl: "",
    date: new Date(Date.now() + 100000000000)
  });
  assert.equal(result.success, false);
});
