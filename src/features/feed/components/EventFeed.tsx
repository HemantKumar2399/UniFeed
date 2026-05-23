"use client";

import { api } from "@/trpc/react";
import { EventCard } from "./EventCard";
import { FeedSkeleton } from "./FeedSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { Calendar } from "lucide-react";

export function EventFeed() {
  const { data, isLoading, isError, error, refetch } = api.event.getFeed.useQuery();

  if (isLoading) {
    return <FeedSkeleton />;
  }

  if (isError) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
        <div className="rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
          <p>Could not load home feed: {error?.message ?? "An unexpected error occurred."}</p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-2 text-[14px] font-semibold text-red-700 underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
        <EmptyState
          title="No upcoming events"
          description="There are no published events for your college at the moment. Check back later or discover active student communities."
          actionLabel="Discover Communities"
          actionHref="/discover"
          icon={<Calendar className="h-7 w-7" />}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 md:px-8 pb-24 md:pb-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
