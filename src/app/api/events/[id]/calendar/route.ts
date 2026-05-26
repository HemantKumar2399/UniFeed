import { NextResponse, type NextRequest } from "next/server";

import { buildCalendarRouteResponse } from "@/features/events/calendar-route";
import { auth } from "@/server/auth";
import { db } from "@/server/db";

type CalendarRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(req: NextRequest, { params }: CalendarRouteContext) {
  const session = await auth();
  const user = session?.user ?? null;
  const { id } = await params;
  const eventId = Number.parseInt(id, 10);

  if (!Number.isInteger(eventId) || eventId <= 0) {
    return NextResponse.json({ error: "Invalid event id" }, { status: 400 });
  }

  const event = await db.event.findUnique({
    where: {
      id: eventId,
      deletedAt: null,
    },
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      date: true,
      status: true,
      collegeId: true,
      club: {
        select: {
          name: true,
        },
      },
    },
  });

  return buildCalendarRouteResponse({
    user,
    event,
    origin: req.nextUrl.origin,
    host: req.nextUrl.host,
  });
}
