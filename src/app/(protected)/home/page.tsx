"use client";

import { EventCard } from "@/features/feed/components/EventCard";
import { FeedSkeleton } from "@/features/feed/components/FeedSkeleton";
import { StoryBar } from "@/features/feed/components/StoryBar";
import { api } from "@/trpc/react";

import { EmptyState } from "@/components/EmptyState";
import { FolderHeart } from "lucide-react";

export default function HomePage() {
  const { data: events, isLoading, isError } = api.event.getFeed.useQuery();

  if (isLoading) {
    return <FeedSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex h-full min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-xl font-bold tracking-card-title text-notion-black">Feed unavailable</h1>
        <p className="mt-2 text-sm text-warm-gray-500">
          We could not load events right now. Please try again in a moment.
        </p>
      </div>
    );
  }

  if (!events?.length) {
    return (
      <div className="flex h-full min-h-[calc(100vh-120px)] w-full flex-col items-center justify-center p-4">
        <EmptyState
          title="No events right now"
          description="It's quiet on campus. Organizers haven't published any public events yet."
          icon={<FolderHeart className="h-8 w-8" />}
          className="mx-auto max-w-lg"
        />
      </div>
    );
  }

  // Mock club extraction from events for the StoryBar
  const uniqueClubsMap = new Map();
  events?.forEach((e) => {
    // We'll use the event owner or organizer ID, but mock it as a club for now
    const clubId = e.id + "-club"; 
    if (!uniqueClubsMap.has(clubId)) {
      uniqueClubsMap.set(clubId, {
        id: clubId,
        name: e.title.substring(0, 10),
        imageUrl: e.imageUrl,
        isWatched: false,
        eventId: e.id,
      });
    }
  });

  const activeClubs = Array.from(uniqueClubsMap.values()).slice(0, 8);

  return (
    <div className="mx-auto flex w-full flex-col gap-8 py-6">
      <div className="w-full">
        <StoryBar clubs={activeClubs} />
      </div>
      <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-2">
        {events?.map((event) => <EventCard key={event.id} event={event} />)}
      </div>
    </div>
  );
}
