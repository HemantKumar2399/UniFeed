"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import type { RouterOutputs } from "@/trpc/react";

import {
  formatEventDateMeta,
  getDescriptionRevealClasses,
} from "./event-card.utils";

type EventFeedItem = RouterOutputs["event"]["getFeed"][number];

export function EventCard({ event }: { event: EventFeedItem }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionId = `event-description-${event.id}`;
  const eventId = `event-${event.id}`;

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === `#${eventId}`) {
        setIsExpanded(true);
      }
    };
    
    // Check initial hash
    if (window.location.hash === `#${eventId}`) {
      setIsExpanded(true);
    }
    
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [eventId]);

  return (
    <article id={eventId} className="w-full max-w-md overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={descriptionId}
        onClick={() => setIsExpanded((prev) => !prev)}
        className="relative block w-full cursor-pointer text-left"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 448px"
            priority={false}
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-4 pb-4 pt-12">
            <h2 className="line-clamp-2 text-lg font-semibold text-white">{event.title}</h2>
            <p className="mt-1 text-sm text-zinc-100">{formatEventDateMeta(event.date)}</p>
            <p className="text-sm text-zinc-200">{event.location}</p>
          </div>
        </div>
      </button>

      <div id={descriptionId} className={getDescriptionRevealClasses(isExpanded)}>
        <div className="min-h-0 px-4 pb-4 pt-3">
          <p className="text-sm leading-6 text-zinc-200">
            {event.description || "No description provided."}
          </p>
        </div>
      </div>
    </article>
  );
}