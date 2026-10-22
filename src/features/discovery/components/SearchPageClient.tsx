"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { Building2, Search, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  buildSearchHref,
  normalizeDiscoveryQuery,
} from "@/features/discovery/discovery";
import { formatEventDateMeta } from "@/features/feed/components/event-card.utils";
import {
  formatRegistrationDeadline,
  getRegistrationAvailability,
  getRegistrationAvailabilityBadgeVariant,
  getRegistrationAvailabilityLabel,
} from "@/lib/event-registration";
import { api } from "@/trpc/react";

type SearchPageClientProps = {
  initialQuery: string;
};

export function SearchPageClient({ initialQuery }: SearchPageClientProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalizeDiscoveryQuery(deferredQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const { data, isLoading, error, refetch } = api.discovery.search.useQuery(
    { query: normalizedQuery },
    {
      enabled: normalizedQuery.length >= 2,
      retry: false,
    },
  );

  const groupedResults = useMemo(() => {
    const results = data ?? [];

    return {
      events: results.filter((result) => result.type === "event"),
      communities: results.filter((result) => result.type === "community"),
    };
  }, [data]);

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <div className="bg-warm-white tracking-badge text-warm-gray-500 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase">
          <Sparkles className="h-3.5 w-3.5" />
          College-scoped discovery
        </div>
        <div>
          <h1 className="text-page-title text-notion-black">Search</h1>
          <p className="text-caption text-warm-gray-500 mt-2">
            Find upcoming events and active communities for your college.
          </p>
        </div>
      </header>

      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          router.push(buildSearchHref(normalizeDiscoveryQuery(query)), {
            scroll: false,
          });
        }}
        className="border-input bg-pure-white flex min-h-[52px] items-center rounded-[18px] border px-4 shadow-sm"
      >
        <Search className="text-warm-gray-500 h-4 w-4" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search events and communities"
          placeholder="Search by title, club, category, location, or tag"
          className="text-notion-black placeholder:text-warm-gray-muted min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none"
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground min-h-11 rounded-xl px-4 text-sm font-semibold"
        >
          Search
        </button>
      </form>

      {normalizedQuery.length < 2 ? (
        <div className="bg-warm-white text-warm-gray-500 rounded-[18px] border border-[var(--border-whisper)] p-6 text-sm">
          Type at least 2 characters to search events and communities.
        </div>
      ) : null}

      {normalizedQuery.length >= 2 && isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`search-skeleton-${index}`}
              className="bg-muted/20 h-24 animate-pulse rounded-[18px] border border-[var(--border-whisper)]"
            />
          ))}
        </div>
      ) : null}

      {error ? (
        <div className="alert-panel surface-status-danger rounded-[18px] p-4 text-sm">
          Could not load search results: {error.message}
          <button
            type="button"
            className="ml-2 min-h-11 underline"
            onClick={() => void refetch()}
          >
            Retry
          </button>
        </div>
      ) : null}

      {normalizedQuery.length >= 2 && !isLoading && !error ? (
        <div className="space-y-8">
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-notion-black text-lg font-bold">Events</h2>
              <span className="tracking-badge text-warm-gray-500 text-xs font-semibold uppercase">
                {groupedResults.events.length} found
              </span>
            </div>

            {groupedResults.events.length === 0 ? (
              <div className="bg-pure-white text-warm-gray-500 rounded-[18px] border border-[var(--border-whisper)] p-5 text-sm">
                No upcoming published events match this search.
              </div>
            ) : (
              <div className="grid gap-3">
                {groupedResults.events.map((result) => {
                  const availability = getRegistrationAvailability({
                    status: "PUBLISHED",
                    date: result.date,
                    registrationClosesAt: result.registrationClosesAt,
                    capacity: result.capacity,
                    activeCount: result.activeCount,
                    waitlistEnabled: true,
                  });

                  return (
                    <Link
                      key={`event-${result.id}`}
                      href={result.href}
                      className="bg-pure-white hover:bg-warm-white rounded-[18px] border border-[var(--border-whisper)] p-4 shadow-sm transition-colors active:scale-[0.99]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-notion-black text-lg font-bold">
                            {result.title}
                          </p>
                          <p className="text-warm-gray-500 mt-1 text-sm">
                            {result.clubName} •{" "}
                            {formatEventDateMeta(result.date)}
                          </p>
                          <p className="text-warm-gray-500 mt-2 text-sm">
                            {result.location}
                          </p>
                          <p className="text-warm-gray-500 mt-2 text-sm">
                            Register by:{" "}
                            {formatRegistrationDeadline(
                              result.registrationClosesAt,
                            )}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="bg-warm-white tracking-badge text-warm-gray-500 rounded-full px-3 py-1 text-xs font-semibold uppercase">
                            {result.category ?? "General"}
                          </div>
                          <Badge
                            variant={getRegistrationAvailabilityBadgeVariant(
                              availability,
                            )}
                          >
                            {getRegistrationAvailabilityLabel(availability)}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-notion-black text-lg font-bold">
                Communities
              </h2>
              <span className="tracking-badge text-warm-gray-500 text-xs font-semibold uppercase">
                {groupedResults.communities.length} found
              </span>
            </div>

            {groupedResults.communities.length === 0 ? (
              <div className="bg-pure-white text-warm-gray-500 rounded-[18px] border border-[var(--border-whisper)] p-5 text-sm">
                No communities match this search yet.
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {groupedResults.communities.map((result) => (
                  <Link
                    key={`community-${result.id}`}
                    href={result.href}
                    className="bg-pure-white hover:bg-warm-white rounded-[18px] border border-[var(--border-whisper)] p-4 shadow-sm transition-colors active:scale-[0.99]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-warm-white text-notion-black flex h-10 w-10 items-center justify-center rounded-[12px]">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-notion-black font-bold">
                          {result.title}
                        </p>
                        <p className="text-warm-gray-500 mt-1 text-sm">
                          {result.followerCount} followers • {result.eventCount}{" "}
                          events
                        </p>
                        <p className="text-warm-gray-500 mt-2 text-sm">
                          {result.nextEventTitle ?? "Active student community"}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      ) : null}
    </div>
  );
}
