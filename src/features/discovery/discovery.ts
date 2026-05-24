import { EVENT_CATEGORY_OPTIONS } from "@/features/events/event-metadata";

export const DISCOVERY_COLLECTION_OPTIONS = [
  "all",
  "happening_this_week",
  "free_food",
  "workshops",
  "cultural",
  "communities",
] as const;

export const DISCOVERY_CATEGORY_OPTIONS = ["ALL", ...EVENT_CATEGORY_OPTIONS] as const;

export type DiscoveryCollection = (typeof DISCOVERY_COLLECTION_OPTIONS)[number];
export type DiscoveryCategoryFilter = (typeof DISCOVERY_CATEGORY_OPTIONS)[number];

export type DiscoveryFilters = {
  category: DiscoveryCategoryFilter;
  collection: DiscoveryCollection;
};

export type DiscoverySearchResult =
  | {
      type: "event";
      id: number;
      title: string;
      href: string;
      date: Date;
      registrationClosesAt: Date | null;
      capacity: number;
      activeCount: number;
      location: string;
      clubName: string;
      category: string | null;
      tags: string[];
    }
  | {
      type: "community";
      id: number;
      title: string;
      href: string;
      followerCount: number;
      eventCount: number;
      nextEventTitle?: string;
    };

export function normalizeDiscoveryQuery(rawQuery: string | null | undefined): string {
  return rawQuery?.trim() ?? "";
}

export function tokenizeDiscoveryQuery(rawQuery: string): string[] {
  return normalizeDiscoveryQuery(rawQuery)
    .toLowerCase()
    .split(/[^a-z0-9&]+/i)
    .map((token) => token.trim())
    .filter(Boolean);
}

export function parseDiscoveryCollection(
  rawCollection: string | null | undefined,
): DiscoveryCollection {
  return (
    DISCOVERY_COLLECTION_OPTIONS.find((collection) => collection === rawCollection) ??
    "all"
  );
}

export function parseDiscoveryCategory(
  rawCategory: string | null | undefined,
): DiscoveryCategoryFilter {
  return (
    DISCOVERY_CATEGORY_OPTIONS.find((category) => category === rawCategory) ?? "ALL"
  );
}

export function normalizeDiscoveryFilters(filters: {
  category?: string | null;
  collection?: string | null;
}): DiscoveryFilters {
  return {
    category: parseDiscoveryCategory(filters.category),
    collection: parseDiscoveryCollection(filters.collection),
  };
}

export function buildDiscoverHref(filters: {
  category?: DiscoveryCategoryFilter;
  collection?: DiscoveryCollection;
}): string {
  const normalized = normalizeDiscoveryFilters(filters);
  const searchParams = new URLSearchParams();

  if (normalized.category !== "ALL") {
    searchParams.set("category", normalized.category);
  }

  if (normalized.collection !== "all") {
    searchParams.set("collection", normalized.collection);
  }

  const query = searchParams.toString();
  return query ? `/discover?${query}` : "/discover";
}

export function buildSearchHref(query: string): string {
  const normalizedQuery = normalizeDiscoveryQuery(query);
  if (!normalizedQuery) {
    return "/search";
  }

  const searchParams = new URLSearchParams();
  searchParams.set("q", normalizedQuery);
  return `/search?${searchParams.toString()}`;
}

export function getDiscoveryMatchScore(params: {
  query: string;
  primaryText: string;
  secondaryText?: string[];
  tags?: string[];
}): number {
  const normalizedQuery = normalizeDiscoveryQuery(params.query).toLowerCase();
  const tokens = tokenizeDiscoveryQuery(normalizedQuery);
  if (!normalizedQuery || tokens.length === 0) {
    return 0;
  }

  const haystacks = [
    params.primaryText.toLowerCase(),
    ...(params.secondaryText ?? []).map((value) => value.toLowerCase()),
  ];
  const normalizedTags = (params.tags ?? []).map((tag) => tag.toLowerCase());

  let score = 0;

  if (haystacks[0]?.includes(normalizedQuery)) {
    score += 5;
  }

  for (const token of tokens) {
    if (haystacks[0]?.includes(token)) {
      score += 3;
      continue;
    }

    if (haystacks.slice(1).some((value) => value.includes(token))) {
      score += 2;
      continue;
    }

    if (normalizedTags.some((tag) => tag.includes(token))) {
      score += 2;
    }
  }

  return score;
}
