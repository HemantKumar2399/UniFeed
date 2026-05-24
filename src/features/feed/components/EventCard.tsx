"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Calendar, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  formatRegistrationDeadline,
  getRegistrationAvailability,
  getRegistrationAvailabilityBadgeVariant,
  getRegistrationAvailabilityLabel,
} from "@/lib/event-registration";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useLiveEventAttendance } from "@/hooks/use-live-event-attendance";
import type { RouterOutputs } from "@/trpc/react";

import { CapacityBar } from "./CapacityBar";
import { EventDetailContent } from "./EventDetailContent";
import { formatEventDateMeta } from "./event-card.utils";

export type EventFeedItem = RouterOutputs["event"]["getFeed"][number];

export function EventCard({ event }: { event: EventFeedItem }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const eventHashId = `event-${event.id}`;
  const { activeCount, totalCapacity, viewerRsvpStatus } =
    useLiveEventAttendance({
      eventId: event.id,
      totalCapacity: event.capacity,
      initialActiveCount: event._count.rsvps,
      initialViewerRsvpStatus: event.rsvps?.[0]?.status ?? null,
      enabled: isDetailsOpen,
    });
  const registrationAvailability = getRegistrationAvailability({
    status: event.status,
    date: event.date,
    registrationClosesAt: event.registrationClosesAt,
    capacity: totalCapacity,
    activeCount,
    waitlistEnabled: true,
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === `#${eventHashId}`) {
        setIsDetailsOpen(true);
      }
    };

    if (window.location.hash === `#${eventHashId}`) {
      setIsDetailsOpen(true);
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [eventHashId]);

  const handleDrawerOpenChange = (open: boolean) => {
    setIsDetailsOpen(open);

    if (
      !open &&
      typeof window !== "undefined" &&
      window.location.hash === `#${eventHashId}`
    ) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }
  };

  return (
    <Drawer open={isDetailsOpen} onOpenChange={handleDrawerOpenChange}>
      <article
        className="group w-full overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-sm transition-all duration-300 hover:shadow-md"
        id={eventHashId}
      >
        <DrawerTrigger asChild>
          <button
            aria-expanded={isDetailsOpen}
            className="relative block w-full bg-white text-left"
            type="button"
          >
            <div className="relative aspect-[21/9] w-full overflow-hidden bg-black/5">
              <Image
                alt={event.title}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                fill
                priority={false}
                sizes="(max-width: 768px) 100vw, 600px"
                src={event.imageUrl}
              />

              {viewerRsvpStatus ? (
                <div className="absolute top-3 left-3 z-10">
                  <Badge
                    variant={
                      viewerRsvpStatus === "GOING" ||
                      viewerRsvpStatus === "ATTENDED"
                        ? "success"
                        : viewerRsvpStatus === "WAITLISTED"
                          ? "warning"
                          : "neutral"
                    }
                  >
                    {viewerRsvpStatus === "GOING"
                      ? "Secured"
                      : viewerRsvpStatus === "ATTENDED"
                        ? "Attended"
                        : viewerRsvpStatus === "WAITLISTED"
                          ? "Waitlisted"
                          : viewerRsvpStatus}
                  </Badge>
                </div>
              ) : null}
            </div>

            <div className="relative bg-white p-5">
              <h2 className="mb-1 line-clamp-2 text-[22px] leading-[1.2] font-bold tracking-tight text-gray-900">
                {event.title}
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge
                  variant={getRegistrationAvailabilityBadgeVariant(
                    registrationAvailability,
                  )}
                >
                  {getRegistrationAvailabilityLabel(registrationAvailability)}
                </Badge>
              </div>

              <div className="mt-4 mb-5 flex flex-col gap-2">
                <div className="flex items-center gap-2.5 text-[14px] font-medium text-gray-600">
                  <Calendar className="h-4 w-4 shrink-0 text-blue-600" />
                  <span>{formatEventDateMeta(event.date)}</span>
                </div>
                <div className="flex items-center gap-2.5 text-[14px] text-gray-500">
                  <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center gap-2.5 text-[14px] text-gray-500">
                  <span className="font-medium text-gray-600">
                    Register by:
                  </span>
                  <span>
                    {formatRegistrationDeadline(event.registrationClosesAt)}
                  </span>
                </div>
              </div>

              <div className="mt-2 w-full">
                <CapacityBar
                  count={activeCount}
                  totalCapacity={totalCapacity}
                />
              </div>
            </div>
          </button>
        </DrawerTrigger>
      </article>

      {isDetailsOpen ? (
        <DrawerContent className="max-h-[88vh] rounded-t-[24px] border-[rgba(0,0,0,0.1)] bg-white">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-[22px] font-bold tracking-tight text-black/95">
              {event.title}
            </DrawerTitle>
            <DrawerDescription className="text-[14px] font-medium text-[#615d59]">
              {formatEventDateMeta(event.date)} · {event.location}
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-4 overflow-y-auto px-4 pb-6">
            <EventDetailContent event={event} />
          </div>
        </DrawerContent>
      ) : null}
    </Drawer>
  );
}
