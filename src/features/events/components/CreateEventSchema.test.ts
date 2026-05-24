import assert from "node:assert/strict";
import test from "node:test";
import { CreateEventSchema } from "./CreateEventSchema";

const validPayload = {
  clubId: 1,
  title: "Campus Hack Night",
  description: "Build projects with your club mentors and classmates.",
  location: "Innovation Lab",
  capacity: 10,
  imageUrl: "https://example.com/image.png",
  date: new Date(Date.now() + 100000000000),
  registrationClosesAt: new Date(Date.now() + 99900000000),
  category: "Technical" as const,
  tags: ["coding", "workshop"],
  domain: "Engineering" as const,
  isFreeFood: true,
  hasCertificate: true,
  isPaid: false,
  targetBranches: ["Computer Science"],
};

void test("Zod schema rejects short title", () => {
  const result = CreateEventSchema.safeParse({
    ...validPayload,
    title: "ab",
  });
  assert.equal(result.success, false);
});

void test("Zod schema rejects empty tags", () => {
  const result = CreateEventSchema.safeParse({
    ...validPayload,
    tags: [],
  });

  assert.equal(result.success, false);
});

void test("Zod schema accepts full metadata payload", () => {
  const result = CreateEventSchema.safeParse(validPayload);

  assert.equal(result.success, true);
});

void test("Zod schema rejects a registration deadline after the event starts", () => {
  const eventDate = new Date(Date.now() + 100000000000);
  const result = CreateEventSchema.safeParse({
    ...validPayload,
    date: eventDate,
    registrationClosesAt: new Date(eventDate.getTime() + 60 * 60 * 1000),
  });

  assert.equal(result.success, false);
});
