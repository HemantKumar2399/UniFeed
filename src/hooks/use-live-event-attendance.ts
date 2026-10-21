"use client";

import type { RSVPStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

import {
  getAttendeeCounts,
  type AttendeeCounts,
  type AttendeeRow,
} from "@/features/attendance/attendee-management";
import {
  type AttendanceLatestActivity,
  normalizeLiveViewerRsvpStatus,
} from "@/features/attendance/realtime-attendance";
import { api } from "@/trpc/react";

type LiveEventAttendanceOptions = {
  eventId: number;
  totalCapacity: number;
  initialActiveCount: number;
  initialViewerRsvpStatus?: RSVPStatus | null;
  initialAttendees?: AttendeeRow[];
  initialCounts?: AttendeeCounts;
  enabled?: boolean;
};

type LiveEventAttendanceState = {
  activeCount: number;
  totalCapacity: number;
  remainingCapacity: number;
  goingCount: number;
  attendedCount: number;
  waitlistedCount: number;
  cancelledCount: number;
  viewerRsvpStatus: RSVPStatus | null;
  attendees: AttendeeRow[];
  counts: AttendeeCounts;
  latestActivity: AttendanceLatestActivity | null;
};

function buildInitialState(
  options: LiveEventAttendanceOptions,
): LiveEventAttendanceState {
  const initialCounts =
    options.initialCounts ??
    (options.initialAttendees
      ? getAttendeeCounts(options.initialAttendees)
      : null);

  return {
    activeCount: options.initialActiveCount,
    totalCapacity: options.totalCapacity,
    remainingCapacity: Math.max(
      0,
      options.totalCapacity - options.initialActiveCount,
    ),
    goingCount: initialCounts?.going ?? options.initialActiveCount,
    attendedCount: initialCounts?.attended ?? 0,
    waitlistedCount: initialCounts?.waitlisted ?? 0,
    cancelledCount: initialCounts?.cancelled ?? 0,
    viewerRsvpStatus: normalizeLiveViewerRsvpStatus(
      options.initialViewerRsvpStatus,
    ),
    attendees: options.initialAttendees ?? [],
    counts: initialCounts ?? {
      all: 0,
      going: options.initialActiveCount,
      attended: 0,
      cancelled: 0,
      waitlisted: 0,
    },
    latestActivity: null,
  };
}

export function useLiveEventAttendance(options: LiveEventAttendanceOptions) {
  const { data: session } = useSession();
  const viewerUserId = session?.user?.id ?? null;
  const isManager =
    session?.user?.role === "ORGANIZER" || session?.user?.role === "ADMIN";
  const {
    eventId,
    totalCapacity,
    initialActiveCount,
    initialViewerRsvpStatus,
    initialAttendees,
    initialCounts,
  } = options;
  const attendeesSerialized = useMemo(
    () => JSON.stringify(initialAttendees),
    [initialAttendees],
  );
  const countsSerialized = useMemo(
    () => JSON.stringify(initialCounts),
    [initialCounts],
  );

  const initialState = useMemo(
    () =>
      buildInitialState({
        eventId,
        totalCapacity,
        initialActiveCount,
        initialViewerRsvpStatus,
        initialAttendees,
        initialCounts,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      eventId,
      totalCapacity,
      initialActiveCount,
      initialViewerRsvpStatus,
      attendeesSerialized,
      countsSerialized,
    ],
  );
  const [state, setState] = useState<LiveEventAttendanceState>(initialState);

  useEffect(() => {
    setState(initialState);
  }, [initialState]);

  api.event.onAttendanceChange.useSubscription(
    { eventId: options.eventId },
    {
      enabled: (options.enabled ?? true) && isManager,
      onData: (payload) => {
        const counts = getAttendeeCounts(payload.attendees);

        setState((current) => ({
          ...current,
          activeCount: payload.activeCount,
          totalCapacity: payload.totalCapacity,
          remainingCapacity: payload.remainingCapacity,
          goingCount: payload.goingCount,
          attendedCount: payload.attendedCount,
          waitlistedCount: payload.waitlistedCount,
          cancelledCount: payload.cancelledCount,
          attendees: payload.attendees,
          counts,
          latestActivity: payload.latestActivity,
          viewerRsvpStatus:
            payload.latestActivity?.userId === viewerUserId
              ? normalizeLiveViewerRsvpStatus(payload.latestActivity.status)
              : current.viewerRsvpStatus,
        }));
      },
    },
  );

  api.rsvp.onCapacityChange.useSubscription(
    { eventId: options.eventId },
    {
      enabled: (options.enabled ?? true) && session?.user?.role === "STUDENT",
      onData: (payload) =>
        setState((current) => ({
          ...current,
          remainingCapacity: payload.newCapacity,
          activeCount: Math.max(0, current.totalCapacity - payload.newCapacity),
          viewerRsvpStatus: normalizeLiveViewerRsvpStatus(
            payload.viewerRsvpStatus,
          ),
        })),
    },
  );

  const hasReachedCapacity = useMemo(
    () => state.activeCount >= state.totalCapacity,
    [state.activeCount, state.totalCapacity],
  );

  return {
    ...state,
    hasReachedCapacity,
    setViewerRsvpStatus: (status: RSVPStatus | null) => {
      setState((current) => ({
        ...current,
        viewerRsvpStatus: normalizeLiveViewerRsvpStatus(status),
      }));
    },
  };
}
