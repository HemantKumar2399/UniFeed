import {
  buildEventAttendanceRealtimePayload,
  type AttendanceLatestActivity,
  type EventAttendanceRealtimePayload,
} from "@/features/attendance/realtime-attendance";
import { mapAttendeeRow } from "@/features/attendance/attendee-management";
import { ee } from "@/server/events";
import type { db as prismaDb } from "@/server/db";

type AttendanceDb = typeof prismaDb;

// Realtime delivery must never turn an already committed check-in into a failed
// response. A reconnect/refetch recovers the durable database state.
export async function publishAttendanceUpdate(
  db: AttendanceDb,
  eventId: number,
  rsvpId: number,
) {
  try {
    const activity = await getAttendanceLatestActivity(db, rsvpId);
    await emitAttendanceChange(db, eventId, activity);
  } catch (error) {
    console.error("[attendance] Live update failed after commit", error);
  }
}

export async function getAttendanceLatestActivity(
  db: AttendanceDb,
  rsvpId: number,
  registeredAt = new Date(),
): Promise<AttendanceLatestActivity | null> {
  const rsvp = await db.rSVP.findUnique({
    where: { id: rsvpId },
    select: {
      id: true,
      userId: true,
      status: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      event: {
        select: {
          id: true,
          title: true,
          date: true,
        },
      },
    },
  });

  if (!rsvp) {
    return null;
  }

  if (!rsvp.user || !rsvp.event) {
    return null;
  }

  return {
    rsvpId: rsvp.id,
    userId: rsvp.userId,
    attendeeName: rsvp.user.name ?? rsvp.user.email ?? "Student",
    attendeeEmail: rsvp.user.email,
    eventId: rsvp.event.id,
    eventTitle: rsvp.event.title,
    eventDate: rsvp.event.date,
    status: rsvp.status,
    registeredAt,
  };
}

export async function getEventAttendanceRealtimePayload(
  db: AttendanceDb,
  eventId: number,
  latestActivity?: AttendanceLatestActivity | null,
): Promise<EventAttendanceRealtimePayload | null> {
  const event = await db.event.findUnique({
    where: { id: eventId },
    select: {
      id: true,
      capacity: true,
      clubId: true,
      collegeId: true,
      rsvps: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          userId: true,
          status: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              studentProfile: {
                select: {
                  prn: true,
                  branch: true,
                  course: true,
                  graduationYear: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!event) {
    return null;
  }

  if (!event.rsvps) {
    return null;
  }

  return buildEventAttendanceRealtimePayload({
    eventId: event.id,
    collegeId: event.collegeId,
    clubId: event.clubId,
    totalCapacity: event.capacity,
    attendees: event.rsvps.map(mapAttendeeRow),
    latestActivity,
  });
}

export async function emitAttendanceChange(
  db: AttendanceDb,
  eventId: number,
  latestActivity?: AttendanceLatestActivity | null,
): Promise<EventAttendanceRealtimePayload | null> {
  const payload = await getEventAttendanceRealtimePayload(
    db,
    eventId,
    latestActivity,
  );

  if (!payload) {
    return null;
  }

  ee.emit("attendanceChange", payload);
  ee.emit("capacityChange", {
    eventId: payload.eventId,
    newCapacity: payload.remainingCapacity,
  });

  return payload;
}
