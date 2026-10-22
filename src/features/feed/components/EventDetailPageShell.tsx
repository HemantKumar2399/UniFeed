import React, { type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";

import { formatPlatformDate } from "@/lib/platform-date";

import { formatEventDateMeta } from "./event-card.utils";

type EventDetailPageShellProps = {
  children: ReactNode;
  event: EventDetailPageShellEvent;
};

type EventDetailPageShellEvent = {
  title: string;
  imageUrl: string;
  galleryImages?: string[];
  category?: string | null;
  location: string;
  date: Date;
  club: {
    name: string;
  };
};

export function EventDetailHeadingBlock({
  event,
}: {
  event: EventDetailPageShellEvent;
}) {
  return (
    <header className="flex items-start gap-4 sm:gap-7">
      <div
        aria-hidden="true"
        className="border-primary/20 hidden w-20 shrink-0 overflow-hidden rounded-2xl border text-center sm:block"
      >
        <p className="bg-brand-surface text-primary py-2 text-xs font-bold tracking-wider uppercase">
          {formatPlatformDate(event.date, { month: "short" })}
        </p>
        <p className="font-display py-3 text-4xl leading-none font-bold">
          {formatPlatformDate(event.date, { day: "2-digit" })}
        </p>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-primary mb-3 text-sm font-semibold">
          {event.club.name}
          {event.category ? ` · ${event.category}` : ""}
        </p>
        <h1 className="font-display text-foreground max-w-3xl text-3xl leading-[1.1] font-bold tracking-tight [overflow-wrap:anywhere] sm:text-4xl xl:text-5xl">
          {event.title}
        </h1>
        <div className="mt-5 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-x-7">
          <div className="text-muted-foreground flex items-center gap-3">
            <Calendar
              aria-hidden="true"
              className="text-primary h-5 w-5 shrink-0"
            />
            <span>{formatEventDateMeta(event.date)}</span>
          </div>
          <div className="text-muted-foreground flex items-center gap-3">
            <MapPin
              aria-hidden="true"
              className="text-primary h-5 w-5 shrink-0"
            />
            <span className="[overflow-wrap:anywhere]">{event.location}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export function EventDetailPageShell({
  children,
  event,
}: EventDetailPageShellProps) {
  return (
    <div className="space-y-6 pb-8 sm:space-y-8">
      <Link
        href="/home"
        className="text-muted-foreground hover:text-primary inline-flex min-h-11 items-center gap-2 text-sm font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to events
      </Link>

      <div className="border-border border-b pb-7 sm:pb-8">
        <EventDetailHeadingBlock event={event} />
      </div>
      {children}
    </div>
  );
}
