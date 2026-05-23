import Link from "next/link";
import { Compass, Filter, Search } from "lucide-react";

import {
  buildDiscoverHref,
  DISCOVERY_COLLECTION_OPTIONS,
  normalizeDiscoveryFilters,
} from "@/features/discovery/discovery";
import { DiscoverResults } from "@/features/discovery/components/DiscoverResults";
import { EVENT_CATEGORY_OPTIONS } from "@/features/events/event-metadata";

type DiscoverPageProps = {
  searchParams: Promise<{
    category?: string;
    collection?: string;
  }>;
};

const collectionLabels: Record<(typeof DISCOVERY_COLLECTION_OPTIONS)[number], string> = {
  all: "All",
  happening_this_week: "Happening This Week",
  free_food: "Free Food",
  workshops: "Workshops",
  cultural: "Cultural",
  communities: "Communities",
};

export default async function DiscoverPage({ searchParams }: DiscoverPageProps) {
  const params = await searchParams;
  const filters = normalizeDiscoveryFilters(params);

  return (
    <div className="flex flex-col gap-8 pb-32 md:pb-12">
      <header className="space-y-4 px-1 md:px-0">
        <div className="inline-flex items-center gap-2 rounded-full bg-warm-white px-3 py-1 text-xs font-semibold uppercase tracking-badge text-warm-gray-500">
          <Compass className="h-3.5 w-3.5" />
          Browse without typing
        </div>

        <div>
          <h1 className="mb-2 text-[40px] font-bold leading-[1.1] tracking-[-1.5px] text-notion-black md:text-[48px]">
            Discover
          </h1>
          <p className="max-w-2xl text-sm text-warm-gray-500">
            Explore published events and active student communities for your college using real categories and curated collections.
          </p>
        </div>

        <form action="/search" method="get" className="relative group">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className="h-[18px] w-[18px] text-warm-gray-500 transition-colors group-focus-within:text-notion-blue" />
          </div>
          <input
            type="search"
            name="q"
            className="block w-full rounded-xl border border-input bg-pure-white py-4 pl-11 pr-4 text-[16px] font-medium text-notion-black shadow-sm transition-all placeholder:text-warm-gray-muted focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-blue)]"
            placeholder="Search events and communities"
          />
        </form>
      </header>

      <section className="space-y-4 px-1 md:px-0">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-badge text-warm-gray-500">
          <Filter className="h-4 w-4" />
          Curated collections
        </div>
        <div className="flex flex-wrap gap-2">
          {DISCOVERY_COLLECTION_OPTIONS.map((collection) => {
            const isActive = filters.collection === collection;

            return (
              <Link
                key={collection}
                href={buildDiscoverHref({
                  category: filters.category,
                  collection,
                })}
                className={`inline-flex min-h-[44px] items-center justify-center rounded-pill border px-4 py-2 text-sm font-semibold transition-colors active:scale-95 ${
                  isActive
                    ? "border-notion-black bg-notion-black text-pure-white"
                    : "border-input bg-pure-white text-notion-black hover:bg-warm-white"
                }`}
              >
                {collectionLabels[collection]}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="space-y-4 px-1 md:px-0">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-badge text-warm-gray-500">
          <Compass className="h-4 w-4" />
          Browse by category
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={buildDiscoverHref({
              category: "ALL",
              collection: filters.collection,
            })}
            className={`inline-flex min-h-[44px] items-center justify-center rounded-pill border px-4 py-2 text-sm font-semibold transition-colors active:scale-95 ${
              filters.category === "ALL"
                ? "border-notion-black bg-notion-black text-pure-white"
                : "border-input bg-pure-white text-notion-black hover:bg-warm-white"
            }`}
          >
            All Categories
          </Link>
          {EVENT_CATEGORY_OPTIONS.map((category) => {
            const isActive = filters.category === category;

            return (
              <Link
                key={category}
                href={buildDiscoverHref({
                  category,
                  collection: filters.collection,
                })}
                className={`inline-flex min-h-[44px] items-center justify-center rounded-pill border px-4 py-2 text-sm font-semibold transition-colors active:scale-95 ${
                  isActive
                    ? "border-notion-black bg-notion-black text-pure-white"
                    : "border-input bg-pure-white text-notion-black hover:bg-warm-white"
                }`}
              >
                {category}
              </Link>
            );
          })}
        </div>
      </section>

      <DiscoverResults category={filters.category} collection={filters.collection} />
    </div>
  );
}
