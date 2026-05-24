"use client";

import { CalendarClock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  formatRegistrationDeadline,
  getRegistrationAvailability,
  getRegistrationAvailabilityBadgeVariant,
  getRegistrationAvailabilityLabel,
} from "@/lib/event-registration";
import { api } from "@/trpc/react";

import { formatHappeningDay, formatHappeningTime } from "./happening-this-week.utils";

export function HappeningThisWeekCarousel() {
  const { data, isLoading } = api.event.getHappeningThisWeek.useQuery();

  if (isLoading) {
    return (
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-[#dd5b00]" />
          <h2 className="text-[22px] font-bold tracking-[-0.25px] text-black/95">Happening This Week</h2>
        </div>
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-[132px] min-w-[260px] animate-pulse rounded-2xl border border-black/10 bg-[#f6f5f4]"
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
        <CalendarClock className="h-5 w-5 text-[#dd5b00]" />
        <h2 className="text-[22px] font-bold tracking-[-0.25px] text-black/95">Happening This Week</h2>
      </div>

      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0 hide-scrollbar">
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
            <article
              key={event.id}
              className="min-w-[260px] snap-start rounded-2xl border border-[#f0c9ac] bg-gradient-to-br from-[#fff8f3] to-[#ffeede] p-4 shadow-[0_10px_24px_rgba(0,0,0,0.04)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#a14a13]">{formatHappeningDay(event.date)}</p>
              <p className="mt-1 text-[24px] font-bold leading-none tracking-tight text-[#7c2d12]">{formatHappeningTime(event.date)}</p>
              <h3 className="mt-4 line-clamp-2 text-[16px] font-bold leading-tight text-black/90">{event.title}</h3>
              <p className="mt-1 text-[13px] font-medium text-[#615d59]">{event.club.name} • {event.location}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant={getRegistrationAvailabilityBadgeVariant(availability)}>
                  {getRegistrationAvailabilityLabel(availability)}
                </Badge>
                <span className="text-[12px] font-medium text-[#7a5a49]">
                  Register by: {formatRegistrationDeadline(event.registrationClosesAt)}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
