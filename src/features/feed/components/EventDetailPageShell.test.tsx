import assert from "node:assert/strict";
import { test } from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

void test("event detail shell heading block renders a single h1 heading", async () => {
  const { EventDetailHeadingBlock } = await import(
    "@/features/feed/components/EventDetailPageShell"
  );

  const markup = renderToStaticMarkup(
    <EventDetailHeadingBlock
      event={{
        title: "Robotics Summit",
        imageUrl: "/poster.jpg",
        location: "Innovation Lab",
        date: new Date("2030-06-15T10:00:00.000Z"),
        club: {
          name: "Robotics Club",
        },
      }}
    />,
  );

  assert.equal((markup.match(/<h1/g) ?? []).length, 1);
  assert.match(markup, /Robotics Summit/);
  assert.match(markup, /Robotics Club/);
});
