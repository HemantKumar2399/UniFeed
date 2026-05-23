import assert from "node:assert/strict";
import test from "node:test";
import { CreateEventSchema } from "./CreateEventSchema";

void test("Zod schema rejects short title", () => {
  const result = CreateEventSchema.safeParse({
    clubId: 1,
    title: "ab",
    description: "Valid description",
    location: "Valid setup",
    capacity: 10,
    imageUrl: "https://example.com/image.png",
    date: new Date(Date.now() + 100000000000)
  });
  assert.equal(result.success, false);
});
