"use client";

import { api } from "@/trpc/react";
import { EventCard } from "./EventCard";
import { FeedSkeleton } from "./FeedSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { Calendar } from "lucide-react";

export function EventFeed() {
  const { data, isLoading, isError, error, refetch } =
    api.event.getFeed.useQuery();

  if (isLoading) {
    return <FeedSkeleton />;
  }

  if (isError) {
    return (
      <div className="w-full py-8">
        <div className="alert-panel surface-status-danger px-4 py-3 text-[14px]">
          <p>
            Could not load home feed:{" "}
            {error?.message ?? "An unexpected error occurred."}
          </p>
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
      <div className="w-full py-8">
        <EmptyState
          title="No upcoming events"
          description="There are no published events for your college at the moment. Check back later or discover active student communities."
          actionLabel="Discover Communities"
          actionHref="/hubs"
          icon={<Calendar className="h-7 w-7" />}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {data.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
