"use client";

import { api } from "@/trpc/react";
import { EventCard, type EventFeedItem } from "@/features/feed/components/EventCard";
import { FeedSkeleton } from "@/features/feed/components/FeedSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { Bookmark, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function SavedEventsPage() {
  const { data, isLoading, isError, error, refetch } = api.profile.getSavedEvents.useQuery();

  return (
    <div className="flex flex-col gap-8 pb-32 md:pb-12">
      <header className="px-4 md:px-8">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Profile
        </Link>
        <h1 className="text-[40px] md:text-[48px] font-bold text-foreground leading-[1.1] tracking-[-1.5px]">
          Saved Events
        </h1>
      </header>

      {isLoading ? (
        <FeedSkeleton />
      ) : isError ? (
        <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
          <div className="rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
            <p>Could not load saved events: {error?.message ?? "An unexpected error occurred."}</p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-2 text-[14px] font-semibold text-red-700 underline"
            >
              Retry
            </button>
          </div>
        </div>
      ) : !data || data.length === 0 ? (
        <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
          <EmptyState
            title="No saved events"
            description="You haven't saved any events yet. Browse events in the home feed or search for events to save them here."
            actionLabel="Browse Events"
            actionHref="/home"
            icon={<Bookmark className="h-7 w-7" />}
          />
        </div>
      ) : (
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 pb-24 md:pb-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((event) => (
              <EventCard key={event.id} event={event as EventFeedItem} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
