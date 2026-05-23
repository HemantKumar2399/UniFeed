"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CapacityBar } from "./CapacityBar";
import type { RouterOutputs } from "@/trpc/react";
import { Calendar, MapPin } from "lucide-react";
import { formatEventDateMeta } from "./event-card.utils";
import { EventDetailContent } from "./EventDetailContent";

type EventFeedItem = RouterOutputs["event"]["getFeed"][number];

export function EventCard({ event }: { event: EventFeedItem }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const eventHashId = `event-${event.id}`;

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

  const userRsvp = event.rsvps?.[0];

  return (
    <Drawer open={isDetailsOpen} onOpenChange={handleDrawerOpenChange}>
      <article id={eventHashId} className="w-full overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-sm transition-all duration-300 group hover:shadow-md">
        <DrawerTrigger asChild>
          <button
            type="button"
            aria-expanded={isDetailsOpen}
            className="relative block w-full bg-white text-left"
          >
            <div className="relative aspect-[21/9] w-full overflow-hidden bg-black/5">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 600px"
                priority={false}
              />

              {/* RSVP Status Overlay Badge */}
              {userRsvp && (
                <div className="absolute top-3 left-3 z-10">
                  <Badge
                    variant={
                      userRsvp.status === "GOING" || userRsvp.status === "ATTENDED"
                        ? "success"
                        : userRsvp.status === "WAITLISTED"
                        ? "warning"
                        : "neutral"
                    }
                  >
                    {userRsvp.status === "GOING"
                      ? "✓ Secured"
                      : userRsvp.status === "ATTENDED"
                      ? "✓ Attended"
                      : userRsvp.status === "WAITLISTED"
                      ? "Waitlisted"
                      : userRsvp.status === "CANCELLED"
                      ? "Cancelled"
                      : userRsvp.status}
                  </Badge>
                </div>
              )}
            </div>

            <div className="relative bg-white p-5">
              <h2 className="mb-1 line-clamp-2 text-[22px] font-bold leading-[1.2] tracking-tight text-gray-900">
                {event.title}
              </h2>

              <div className="mb-5 mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2.5 text-[14px] font-medium text-gray-600">
                  <Calendar className="h-4 w-4 shrink-0 text-blue-600" />
                  <span>{formatEventDateMeta(event.date)}</span>
                </div>
                <div className="flex items-center gap-2.5 text-[14px] text-gray-500">
                  <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>

              <div className="mt-2 w-full">
                <CapacityBar
                  count={event._count.rsvps}
                  totalCapacity={event.capacity}
                />
              </div>
            </div>
          </button>
        </DrawerTrigger>
      </article>

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
    </Drawer>
  );
}