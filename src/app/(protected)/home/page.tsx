"use client";

import { EventCard } from "@/features/feed/components/EventCard";
import { api } from "@/trpc/react";

export default function HomePage() {
  const { data: events, isLoading, isError } = api.event.getFeed.useQuery();

  if (isLoading) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-2 py-6">
        {[1, 2, 3].map((key) => (
          <div
            key={key}
            className="h-[560px] w-full animate-pulse rounded-3xl border border-zinc-800 bg-zinc-900"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-xl font-semibold">Feed unavailable</h1>
        <p className="mt-2 text-sm text-zinc-400">
          We could not load events right now. Please try again in a moment.
        </p>
      </div>
    );
  }

  if (!events?.length) {
    return (
      <div className="flex h-full min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-xl font-semibold">No events yet</h1>
        <p className="mt-2 text-sm text-zinc-400">
          New campus events will appear here as soon as they are published.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-2 py-6">
      {events?.map((event) => <EventCard key={event.id} event={event} />)}
    </div>
  );
}
