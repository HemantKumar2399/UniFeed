"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useDeferredValue, useEffect, useMemo, useState } from "react";
import { Building2, Search, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buildSearchHref, normalizeDiscoveryQuery } from "@/features/discovery/discovery";
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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalizeDiscoveryQuery(deferredQuery);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const currentQuery = searchParams.get("q") ?? "";
      if (normalizeDiscoveryQuery(currentQuery) === normalizedQuery) {
        return;
      }

      startTransition(() => {
        router.replace(
          normalizedQuery ? buildSearchHref(normalizedQuery) : pathname,
          { scroll: false },
        );
      });
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [normalizedQuery, pathname, router, searchParams]);

  const { data, isLoading, error } = api.discovery.search.useQuery(
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
        <div className="inline-flex items-center gap-2 rounded-full bg-warm-white px-3 py-1 text-xs font-semibold uppercase tracking-badge text-warm-gray-500">
          <Sparkles className="h-3.5 w-3.5" />
          College-scoped discovery
        </div>
        <div>
          <h1 className="text-page-title text-notion-black">Search</h1>
          <p className="text-caption mt-2 text-warm-gray-500">
            Find upcoming events and active communities for your college.
          </p>
        </div>
      </header>

      <label className="flex min-h-[52px] items-center rounded-[18px] border border-input bg-pure-white px-4 shadow-sm">
        <Search className="h-4 w-4 text-warm-gray-500" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title, club, category, location, or tag"
          className="w-full bg-transparent px-3 py-2 text-sm text-notion-black outline-none placeholder:text-warm-gray-muted"
        />
      </label>

      {normalizedQuery.length < 2 ? (
        <div className="rounded-[18px] border border-[var(--border-whisper)] bg-warm-white p-6 text-sm text-warm-gray-500">
          Type at least 2 characters to search events and communities.
        </div>
      ) : null}

      {normalizedQuery.length >= 2 && isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`search-skeleton-${index}`}
              className="h-24 animate-pulse rounded-[18px] border border-[var(--border-whisper)] bg-muted/20"
            />
          ))}
        </div>
      ) : null}

      {error ? (
        <div className="alert-panel surface-status-danger rounded-[18px] p-4 text-sm">
          Could not load search results: {error.message}
        </div>
      ) : null}

      {normalizedQuery.length >= 2 && !isLoading && !error ? (
        <div className="space-y-8">
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-notion-black">Events</h2>
              <span className="text-xs font-semibold uppercase tracking-badge text-warm-gray-500">
                {groupedResults.events.length} found
              </span>
            </div>

            {groupedResults.events.length === 0 ? (
              <div className="rounded-[18px] border border-[var(--border-whisper)] bg-pure-white p-5 text-sm text-warm-gray-500">
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
                      className="rounded-[18px] border border-[var(--border-whisper)] bg-pure-white p-4 shadow-sm transition-colors hover:bg-warm-white active:scale-[0.99]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-lg font-bold text-notion-black">{result.title}</p>
                          <p className="mt-1 text-sm text-warm-gray-500">
                            {result.clubName} • {formatEventDateMeta(result.date)}
                          </p>
                          <p className="mt-2 text-sm text-warm-gray-500">{result.location}</p>
                          <p className="mt-2 text-sm text-warm-gray-500">
                            Register by: {formatRegistrationDeadline(result.registrationClosesAt)}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="rounded-full bg-warm-white px-3 py-1 text-xs font-semibold uppercase tracking-badge text-warm-gray-500">
                            {result.category ?? "General"}
                          </div>
                          <Badge variant={getRegistrationAvailabilityBadgeVariant(availability)}>
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
              <h2 className="text-lg font-bold text-notion-black">Communities</h2>
              <span className="text-xs font-semibold uppercase tracking-badge text-warm-gray-500">
                {groupedResults.communities.length} found
              </span>
            </div>

            {groupedResults.communities.length === 0 ? (
              <div className="rounded-[18px] border border-[var(--border-whisper)] bg-pure-white p-5 text-sm text-warm-gray-500">
                No communities match this search yet.
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {groupedResults.communities.map((result) => (
                  <Link
                    key={`community-${result.id}`}
                    href={result.href}
                    className="rounded-[18px] border border-[var(--border-whisper)] bg-pure-white p-4 shadow-sm transition-colors hover:bg-warm-white active:scale-[0.99]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-warm-white text-notion-black">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-notion-black">{result.title}</p>
                        <p className="mt-1 text-sm text-warm-gray-500">
                          {result.followerCount} followers • {result.eventCount} events
                        </p>
                        <p className="mt-2 text-sm text-warm-gray-500">
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
