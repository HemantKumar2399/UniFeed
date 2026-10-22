"use client";

import { formatPlatformDate } from "@/lib/platform-date";

import { HostedImage as Image } from "@/components/HostedImage";
import { useEffect, useState } from "react";
import { Calendar, MapPin, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";

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
  DrawerClose,
} from "@/components/ui/drawer";
import { RsvpStatusBadge } from "@/features/rsvp/RsvpStatusBadge";
import { useLiveEventAttendance } from "@/hooks/use-live-event-attendance";
import type { RouterOutputs } from "@/trpc/react";

import { CapacityBar } from "./CapacityBar";
import { EventDetailContent } from "./EventDetailContent";
import { EventMediaGallery } from "./EventMediaGallery";
import { formatEventDateMeta } from "./event-card.utils";

export type EventFeedItem = RouterOutputs["event"]["getFeed"][number];

export function EventCard({ event }: { event: EventFeedItem }) {
  const [imageFailed, setImageFailed] = useState(false);
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
        className="group border-whisper bg-card-bg w-full overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-md"
        id={eventHashId}
      >
        <DrawerTrigger asChild>
          <button
            aria-expanded={isDetailsOpen}
            className="bg-card-bg relative block w-full cursor-pointer text-left"
            type="button"
          >
            <div className="bg-muted relative aspect-[16/10] w-full overflow-hidden">
              {imageFailed ? (
                <div className="bg-brand-surface text-primary absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <Calendar className="h-10 w-10 opacity-50" />
                  <span className="text-sm font-semibold">
                    {event.category ?? "Campus event"}
                  </span>
                </div>
              ) : (
                <Image
                  onError={() => setImageFailed(true)}
                  alt={event.title}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  fill
                  priority={false}
                  sizes="(max-width: 768px) 100vw, 600px"
                  src={event.imageUrl}
                />
              )}

              <div className="border-whisper bg-card-bg absolute top-3 right-3 flex min-w-12 flex-col items-center rounded-xl border px-2.5 py-2 shadow-sm">
                <span className="text-primary text-[10px] font-bold tracking-wider uppercase">
                  {formatPlatformDate(event.date, {
                    month: "short",
                  })}
                </span>
                <span className="font-display text-foreground text-2xl leading-tight font-bold">
                  {formatPlatformDate(event.date, {
                    day: "2-digit",
                  })}
                </span>
              </div>
              {viewerRsvpStatus ? (
                <div className="absolute top-3 left-3 z-10">
                  <RsvpStatusBadge status={viewerRsvpStatus} />
                </div>
              ) : null}
            </div>

            <div className="bg-card-bg relative p-5 transition-colors duration-300">
              <p className="text-muted-foreground mb-2 truncate text-xs font-medium">
                {event.club.name}
              </p>
              <h2 className="text-foreground mb-1 line-clamp-2 text-xl leading-snug font-bold tracking-tight">
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
                <div className="text-muted-foreground flex items-center gap-2.5 text-[14px] font-medium">
                  <Calendar className="text-link-accent h-4 w-4 shrink-0" />
                  <span>{formatEventDateMeta(event.date)}</span>
                </div>
                <div className="text-muted-foreground flex items-center gap-2.5 text-[14px]">
                  <MapPin className="text-muted-foreground h-4 w-4 shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="text-muted-foreground flex items-center gap-2.5 text-[14px]">
                  <span className="text-muted-foreground font-medium">
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
        <DrawerContent className="border-border bg-app-bg mx-auto max-w-6xl rounded-t-3xl data-[vaul-drawer-direction=bottom]:max-h-[92dvh]">
          <DrawerHeader className="border-border shrink-0 border-b px-5 pb-4 text-left sm:px-7">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <DrawerTitle className="text-section-title text-foreground">
                  {event.title}
                </DrawerTitle>
                <DrawerDescription className="text-muted-foreground text-[14px] font-medium">
                  {formatEventDateMeta(event.date)} · {event.location}
                </DrawerDescription>
              </div>
              <DrawerClose asChild>
                <button
                  type="button"
                  aria-label="Close event details"
                  className="border-border bg-card-bg hover:bg-muted flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
                >
                  <X className="h-5 w-5" />
                </button>
              </DrawerClose>
            </div>
            <Link
              href={`/events/${event.id}`}
              className="text-primary mt-2 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold"
            >
              Open full event page <ArrowUpRight className="h-4 w-4" />
            </Link>
          </DrawerHeader>

          <div className="space-y-6 overflow-y-auto overscroll-contain p-5 pb-8 sm:p-7">
            <EventMediaGallery
              compact
              title={event.title}
              imageUrl={event.imageUrl}
              galleryImages={event.galleryImages}
            />
            <EventDetailContent event={event} />
          </div>
        </DrawerContent>
      ) : null}
    </Drawer>
  );
}
