"use client";

import { api } from "@/trpc/react";
import { EventCard } from "@/features/feed/components/EventCard";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

export default function ProfilePage() {
  const { data: events, isLoading, isError } = api.event.getMyCalendar.useQuery();
  const { data: session } = useSession();

  return (
    <div className="flex h-full min-h-[calc(100vh-80px)] flex-col items-center p-4">
      <div className="w-full max-w-md text-center py-6">
        <h1 className="text-2xl font-bold">My Calendar</h1>
        <p className="mt-2 text-muted-foreground">Manage your settings and view your upcoming registered events.</p>
        
        {session?.user?.role === "ORGANIZER" && (
          <div className="mt-6 flex justify-center">
            <Link 
              href="/dashboard" 
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary/10 px-6 py-2.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              Go to Organizer Dashboard
            </Link>
          </div>
        )}
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-6 pb-24">
        {isLoading && (
          <div className="flex animate-pulse flex-col items-center gap-4 text-zinc-500">
            <svg
              className="h-8 w-8 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p>Loading events...</p>
          </div>
        )}

        {isError && (
          <div className="rounded-xl border border-red-800/30 bg-red-900/10 p-4 text-center">
            <p className="text-red-400">Failed to load calendar events. Please try again later.</p>
          </div>
        )}

        {events?.length === 0 && (
          <div className="mt-8 flex flex-col items-center text-center text-zinc-400">
            <p className="mb-2 text-lg">No events yet.</p>
            <p className="text-sm">Register for an event from the feed to see it here.</p>
          </div>
        )}

        {events?.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
