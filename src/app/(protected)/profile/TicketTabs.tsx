"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Archive, Award, CheckCircle2 } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { Badge } from "@/components/ui/badge";

export function TicketTabs() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const { data: events, isLoading } = api.event.getMyCalendar.useQuery();

  if (isLoading) {
    return <div className="text-sm text-warm-gray-500 animate-pulse text-center py-8">Loading your tickets...</div>;
  }

  if (!events) return null;

  const now = new Date();
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const upcomingEvents = sortedEvents.filter(e => new Date(e.date) >= now);
  const pastEvents = sortedEvents.filter(e => new Date(e.date) < now).reverse();

  const displayedEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <div className="w-full mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex w-full mb-6 border-b border-[var(--border-whisper)]">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`flex-1 pb-3 text-sm font-semibold transition-colors duration-transition ${
            activeTab === "upcoming" 
              ? "text-notion-black border-b-2 border-notion-black" 
              : "text-warm-gray-500 hover:text-notion-black"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`flex-1 pb-3 text-sm font-semibold transition-colors duration-transition ${
            activeTab === "past" 
              ? "text-notion-black border-b-2 border-notion-black" 
              : "text-warm-gray-500 hover:text-notion-black"
          }`}
        >
          Past / Certificates
        </button>
      </div>

      <div className="space-y-4">
        {displayedEvents.length === 0 ? (
          <EmptyState
            title={activeTab === "upcoming" ? "No upcoming tickets" : "No past tickets or certificates"}
            description={
              activeTab === "upcoming"
                ? "You haven't RSVP'd to any upcoming events yet. Discover what's happening on campus."
                : "You don't have any past event history. When you attend an event, your digital certificate will appear here."
            }
            actionLabel="Browse Campus Pulse"
            actionHref="/home"
            icon={activeTab === "upcoming" ? <CalendarDays className="h-8 w-8" /> : <Archive className="h-8 w-8" />}
          />
        ) : (
          displayedEvents.map((event) => {
            const userRsvp = event.rsvps?.[0];
            const isAttended = userRsvp?.status === "ATTENDED";
            const isPast = new Date(event.date) < now;

            return (
              <Link key={event.id} href={`/events/${event.id}`} className="block group">
                <div className={`relative overflow-hidden flex gap-4 p-4 bg-pure-white rounded-[var(--radius-comfortable)] border shadow-none transition-all duration-haptic active:scale-[0.98] ${isAttended ? 'border-orange/30 group-hover:border-orange/60' : 'border-[var(--border-whisper)] group-hover:border-notion-black/20'}`}>
                  
                  {isAttended && (
                    <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4">
                      <div className="bg-orange/10 w-24 h-24 rounded-full blur-2xl" />
                    </div>
                  )}

                  <div className={`w-16 h-16 rounded-[var(--radius-subtle)] relative flex-shrink-0 overflow-hidden ring-1 ${isAttended ? 'ring-orange/20' : 'ring-[var(--border-whisper)]'}`}>
                    <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
                  </div>
                  
                  <div className="flex flex-col justify-center flex-1 min-w-0 z-10">
                    <div className="flex items-start justify-between gap-2">
                       <h3 className="font-bold text-notion-black truncate tracking-[--tracking-card-title] text-base leading-tight mb-1">{event.title}</h3>
                       {isAttended && (
                         <div className="flex-shrink-0">
                           <Badge variant="outline" className="bg-orange/10 text-orange-800 border-orange/20 pl-1.5 pr-2 py-0 h-5 text-[10px] uppercase font-bold tracking-badge flex items-center gap-1">
                             <Award className="w-3 h-3" />
                             Verified
                           </Badge>
                         </div>
                       )}
                    </div>
                    
                    <p className="text-xs text-warm-gray-500 truncate flex items-center gap-1">
                      {isAttended ? (
                         <span className="text-notion-black/70 flex items-center gap-1">
                           <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                           Attended on {new Date(event.date).toLocaleDateString()}
                         </span>
                      ) : (
                        new Date(event.date).toLocaleDateString()
                      )}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
