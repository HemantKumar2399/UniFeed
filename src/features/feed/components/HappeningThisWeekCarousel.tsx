"use client";

import Link from "next/link";
import { CalendarClock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  formatRegistrationDeadline,
  getRegistrationAvailability,
  getRegistrationAvailabilityBadgeVariant,
  getRegistrationAvailabilityLabel,
} from "@/lib/event-registration";
import { api } from "@/trpc/react";

import {
  formatHappeningDay,
  formatHappeningTime,
} from "./happening-this-week.utils";

export function HappeningThisWeekCarousel() {
  const { data, isLoading } = api.event.getHappeningThisWeek.useQuery();

  if (isLoading) {
    return (
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <CalendarClock className="text-orange h-5 w-5" />
          <h2 className="text-section-title text-foreground">
            Happening This Week
          </h2>
        </div>
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="border-whisper bg-app-bg h-[132px] min-w-[260px] animate-pulse rounded-2xl border"
            />
          ))}
        </div>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2 px-1 md:px-0">
        <CalendarClock className="text-orange h-5 w-5" />
        <h2 className="text-section-title text-foreground">
          Happening This Week
        </h2>
      </div>

      <div className="hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
        {data.map((event) => {
          const availability = getRegistrationAvailability({
            status: event.status,
            date: event.date,
            registrationClosesAt: event.registrationClosesAt,
            capacity: event.capacity,
            activeCount: event._count.rsvps,
            waitlistEnabled: true,
          });

          return (
            <Link
              href={`/events/${event.id}`}
              key={event.id}
              className="border-status-warning-border bg-card-bg hover:border-primary min-w-[260px] snap-start rounded-2xl border p-4 transition-colors"
            >
              <p className="text-eyebrow text-orange">
                {formatHappeningDay(event.date)}
              </p>
              <p className="text-panel-title text-brown mt-1 leading-none">
                {formatHappeningTime(event.date)}
              </p>
              <h3 className="text-foreground/90 mt-4 line-clamp-2 text-[16px] leading-tight font-bold">
                {event.title}
              </h3>
              <p className="text-muted-foreground mt-1 text-[13px] font-medium">
                {event.club.name} • {event.location}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge
                  variant={getRegistrationAvailabilityBadgeVariant(
                    availability,
                  )}
                >
                  {getRegistrationAvailabilityLabel(availability)}
                </Badge>
                <span className="text-badge text-brown/80 dark:text-orange">
                  Register by:{" "}
                  {formatRegistrationDeadline(event.registrationClosesAt)}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
