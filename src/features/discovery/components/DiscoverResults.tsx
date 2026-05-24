"use client";

import Link from "next/link";
import { Building2, Calendar, Gift, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  type DiscoveryCategoryFilter,
  type DiscoveryCollection,
} from "@/features/discovery/discovery";
import { formatEventDateMeta } from "@/features/feed/components/event-card.utils";
import {
  formatRegistrationDeadline,
  getRegistrationAvailability,
  getRegistrationAvailabilityBadgeVariant,
  getRegistrationAvailabilityLabel,
} from "@/lib/event-registration";
import { api } from "@/trpc/react";

type DiscoverResultsProps = {
  category: DiscoveryCategoryFilter;
  collection: DiscoveryCollection;
};

export function DiscoverResults({ category, collection }: DiscoverResultsProps) {
  const { data, isLoading, error } = api.discovery.getDiscover.useQuery(
    {
      category,
      collection,
    },
    {
      retry: false,
    },
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`discover-skeleton-${index}`}
              className="h-40 animate-pulse rounded-[20px] border border-[var(--border-whisper)] bg-muted/20"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[20px] border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        Could not load discover results: {error.message}
      </div>
    );
  }

  const events = data?.events ?? [];
  const communities = data?.communities ?? [];

  return (
    <div className="space-y-8">
      {collection !== "communities" ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[22px] font-bold tracking-tight text-notion-black">
              Events to explore
            </h2>
            <span className="text-xs font-semibold uppercase tracking-badge text-warm-gray-500">
              {events.length} results
            </span>
          </div>

          {events.length === 0 ? (
            <div className="rounded-[20px] border border-[var(--border-whisper)] bg-pure-white p-6 text-sm text-warm-gray-500">
              No published upcoming events match this discover view yet.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {events.map((event) => (
                <Link
                  key={event.id}
                  href={event.href}
                  className="rounded-[20px] border border-[var(--border-whisper)] bg-pure-white p-5 shadow-sm transition-colors hover:bg-warm-white active:scale-[0.99]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-warm-white px-3 py-1 text-xs font-semibold uppercase tracking-badge text-warm-gray-500">
                      {event.category ?? "General"}
                    </span>
                    {event.isFreeFood ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-badge text-amber-700">
                        <Gift className="h-3.5 w-3.5" />
                        Free food
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-4 text-xl font-bold tracking-tight text-notion-black">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-warm-gray-500">{event.clubName}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge
                      variant={getRegistrationAvailabilityBadgeVariant(
                        getRegistrationAvailability({
                          status: "PUBLISHED",
                          date: event.date,
                          registrationClosesAt: event.registrationClosesAt,
                          capacity: event.capacity,
                          activeCount: event.activeCount,
                          waitlistEnabled: true,
                        }),
                      )}
                    >
                      {getRegistrationAvailabilityLabel(
                        getRegistrationAvailability({
                          status: "PUBLISHED",
                          date: event.date,
                          registrationClosesAt: event.registrationClosesAt,
                          capacity: event.capacity,
                          activeCount: event.activeCount,
                          waitlistEnabled: true,
                        }),
                      )}
                    </Badge>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-warm-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatEventDateMeta(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-notion-black">Register by:</span>
                      <span>{formatRegistrationDeadline(event.registrationClosesAt)}</span>
                    </div>
                  </div>
                  {event.tags.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {event.tags.slice(0, 3).map((tag) => (
                        <span
                          key={`${event.id}-${tag}`}
                          className="rounded-full border border-[var(--border-whisper)] bg-warm-white px-2.5 py-1 text-xs font-medium text-warm-gray-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </Link>
              ))}
            </div>
          )}
        </section>
      ) : null}

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] font-bold tracking-tight text-notion-black">
            Communities
          </h2>
          <span className="text-xs font-semibold uppercase tracking-badge text-warm-gray-500">
            {communities.length} results
          </span>
        </div>

        {communities.length === 0 ? (
          <div className="rounded-[20px] border border-[var(--border-whisper)] bg-pure-white p-6 text-sm text-warm-gray-500">
            No active communities are available for this college yet.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {communities.map((community) => (
              <Link
                key={community.id}
                href={community.href}
                className="rounded-[20px] border border-[var(--border-whisper)] bg-pure-white p-5 shadow-sm transition-colors hover:bg-warm-white active:scale-[0.99]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-warm-white text-notion-black">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-notion-black">{community.title}</h3>
                    <p className="mt-1 text-sm text-warm-gray-500">
                      {community.followerCount} followers • {community.eventCount} events • {community.blockCount} resources
                    </p>
                  </div>
                </div>
                <div className="mt-4 rounded-[14px] border border-[var(--border-whisper)] bg-warm-white px-3 py-2 text-sm text-warm-gray-500">
                  {community.nextEvent ? (
                    <>
                      <p className="font-medium text-notion-black">{community.nextEvent.title}</p>
                      <p className="mt-1">{formatEventDateMeta(community.nextEvent.date)}</p>
                    </>
                  ) : (
                    <p>No upcoming event yet.</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
