import React, { type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";

import { EventMediaGallery } from "./EventMediaGallery";
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
    <header className="flex items-start gap-5 sm:gap-7">
      <div className="border-primary/20 hidden w-20 shrink-0 overflow-hidden rounded-2xl border text-center sm:block lg:hidden">
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
        <h1 className="font-display text-foreground text-3xl leading-tight font-bold tracking-tight [overflow-wrap:anywhere] sm:text-4xl">
          {event.title}
        </h1>
        <div className="mt-5 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-x-7">
          <div className="text-meta-strong text-muted-foreground flex items-center gap-3">
            <Calendar className="text-link-accent h-5 w-5" />
            <span>{formatEventDateMeta(event.date)}</span>
          </div>
          <div className="text-meta-strong text-muted-foreground flex items-center gap-3">
            <MapPin className="text-muted-foreground h-5 w-5" />
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
    <div className="space-y-7">
      <Link
        href="/home"
        className="text-muted-foreground hover:text-primary inline-flex min-h-11 items-center gap-2 text-sm font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to events
      </Link>

      <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        <EventMediaGallery
          title={event.title}
          imageUrl={event.imageUrl}
          galleryImages={event.galleryImages}
        />
        <div className="py-2">
          <EventDetailHeadingBlock event={event} />
        </div>
      </div>
      {children}
    </div>
  );
}
