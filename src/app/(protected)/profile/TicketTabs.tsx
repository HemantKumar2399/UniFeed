"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import Link from "next/link";
import Image from "next/image";

export function TicketTabs() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const { data: events, isLoading } = api.event.getMyCalendar.useQuery();

  if (isLoading) {
    return <div className="text-sm text-zinc-500 animate-pulse text-center py-8">Loading your tickets...</div>;
  }

  if (!events) return null;

  const now = new Date();
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const upcomingEvents = sortedEvents.filter(e => new Date(e.date) >= now);
  const pastEvents = sortedEvents.filter(e => new Date(e.date) < now).reverse();

  const displayedEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <div className="w-full mt-8">
      <div className="flex w-full mb-6 border-b border-zinc-200">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`flex-1 pb-3 text-sm font-medium transition-colors ${
            activeTab === "upcoming" 
              ? "text-zinc-900 border-b-2 border-zinc-900" 
              : "text-zinc-500 hover:text-zinc-700"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`flex-1 pb-3 text-sm font-medium transition-colors ${
            activeTab === "past" 
              ? "text-zinc-900 border-b-2 border-zinc-900" 
              : "text-zinc-500 hover:text-zinc-700"
          }`}
        >
          Past
        </button>
      </div>

      <div className="space-y-4">
        {displayedEvents.length === 0 ? (
          <div className="text-center py-8 text-sm text-zinc-500">
            No {activeTab} events found.
          </div>
        ) : (
          displayedEvents.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`} className="block">
              <div className="flex gap-4 p-3 bg-white rounded-xl border border-zinc-100 shadow-sm active:scale-[0.98] transition-transform">
                <div className="w-16 h-16 rounded-lg bg-zinc-200 overflow-hidden relative flex-shrink-0">
                  <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <h3 className="font-semibold text-zinc-900 truncate">{event.title}</h3>
                  <p className="text-xs text-zinc-500 truncate">{new Date(event.date).toLocaleDateString()}</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
