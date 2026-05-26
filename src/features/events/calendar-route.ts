import { NextResponse } from "next/server";

import { buildEventCalendarIcs, createCalendarFilename } from "@/lib/calendar-ics";
import { resolveStudentEventAccess } from "@/lib/student-event-visibility";

export type CalendarRouteUser = {
  collegeId?: string | null;
};

export type CalendarRouteEvent = {
  id: number;
  title: string;
  description: string;
  location: string;
  date: Date;
  status: "PUBLISHED" | "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED" | "CANCELLED";
  collegeId: string;
  club: {
    name: string;
  };
};

export function buildCalendarRouteResponse(input: {
  user: CalendarRouteUser | null;
  event: CalendarRouteEvent | null;
  origin: string;
  host: string;
}) {
  const { event, host, origin, user } = input;

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const accessDecision = resolveStudentEventAccess({
    eventStatus: event?.status,
    eventCollegeId: event?.collegeId,
    userCollegeId: user.collegeId,
  });

  if (!event || accessDecision === "hidden") {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  if (accessDecision === "wrong_college") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const eventUrl = new URL(`/events/${event.id}`, origin).toString();
  const ics = buildEventCalendarIcs({
    id: event.id,
    title: event.title,
    description: `${event.description}\n\nHosted by ${event.club.name}.`,
    location: event.location,
    startAt: event.date,
    uidHost: host,
    url: eventUrl,
  });

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${createCalendarFilename(event.title, event.id)}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
