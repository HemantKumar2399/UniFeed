import React, { type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Tag } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { formatEventDateMeta } from "./event-card.utils";

type EventDetailPageShellProps = {
  children: ReactNode;
  event: EventDetailPageShellEvent;
};

type EventDetailPageShellEvent = {
  title: string;
  imageUrl: string;
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
    <>
      <div className="mb-2 flex items-center gap-2">
        <Badge className="gap-1">
          <Tag className="h-3.5 w-3.5" />
          {event.club.name}
        </Badge>
      </div>

      <h1 className="text-page-title mb-4 text-notion-black">{event.title}</h1>

      <div className="mb-6 grid grid-cols-1 gap-4 border-y border-whisper py-4 sm:grid-cols-2">
        <div className="text-meta-strong flex items-center gap-3 text-muted-foreground">
          <Calendar className="text-link-accent h-5 w-5" />
          <span>{formatEventDateMeta(event.date)}</span>
        </div>
        <div className="text-meta-strong flex items-center gap-3 text-muted-foreground">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <span className="truncate">{event.location}</span>
        </div>
      </div>
    </>
  );
}

export function EventDetailPageShell({
  children,
  event,
}: EventDetailPageShellProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-32 md:px-8">
      <Link
        href="/home"
        className="text-link-accent mb-6 inline-flex items-center gap-2 text-[14px] font-semibold hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Feed
      </Link>

      <article className="card-surface overflow-hidden rounded-3xl">
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-muted">
          <Image
            alt={event.title}
            className="object-cover"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            src={event.imageUrl}
          />
        </div>

        <div className="p-6 md:p-8">
          <EventDetailHeadingBlock event={event} />
          {children}
        </div>
      </article>
    </div>
  );
}
