"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { LongPressButton } from "@/components/ui/LongPressButton";
import { CapacityBar } from "./CapacityBar";

import { api } from "@/trpc/react";
import type { RouterOutputs } from "@/trpc/react";
import { MapPin, Calendar } from "lucide-react";

import {
  formatEventDateMeta,
  getDescriptionRevealClasses,
} from "./event-card.utils";

type EventFeedItem = RouterOutputs["event"]["getFeed"][number];

type RegisterState = "IDLE" | "LOCKING" | "SECURED" | "ERROR";

export function EventCard({ event }: { event: EventFeedItem }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [registerState, setRegisterState] = useState<RegisterState>("IDLE");
  const descriptionId = `event-description-${event.id}`;
  const eventId = `event-${event.id}`;

  const { mutate: registerRsvp } = api.rsvp.register.useMutation({
    onMutate: () => {
      setRegisterState("LOCKING");
    },
    onSuccess: () => {
      setRegisterState("SECURED");
      toast.success("Successfully registered!");
    },
    onError: (err) => {
      setRegisterState("ERROR");
      if (err.data?.code === "PRECONDITION_FAILED" && err.message === "EVENT_FULL") {
        toast.error("Event is full!");
      } else if (err.data?.code === "CONFLICT" && err.message === "ALREADY_REGISTERED") {
        toast.error("You are already registered.");
      } else {
        toast.error(err.message || "Failed to register. Please try again.");
      }
      
      // Revert after a short delay
      setTimeout(() => setRegisterState("IDLE"), 3000);
    },
  });

  const handleRegister = () => {
    if (registerState === "IDLE" || registerState === "ERROR") {
      registerRsvp({ eventId: event.id });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === `#${eventId}`) {
        setIsExpanded(true);
      }
    };
    
    // Check initial hash
    if (window.location.hash === `#${eventId}`) {
      setIsExpanded(true);
    }
    
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [eventId]);

  return (
    <article id={eventId} className="w-full bg-white rounded-2xl border border-black/[0.08] shadow-sm overflow-hidden transition-all hover:shadow-md duration-300 group">
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={descriptionId}
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full text-left bg-white relative block"
      >
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-black/5">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 600px"
            priority={false}
          />
        </div>

        <div className="p-5 bg-white relative">
          <h2 className="text-[22px] font-bold tracking-tight text-gray-900 line-clamp-2 leading-[1.2] mb-1">{event.title}</h2>
          
          <div className="flex flex-col gap-2 mt-4 mb-5">
            <div className="flex items-center gap-2.5 text-[14px] text-gray-600 font-medium">
              <Calendar className="h-4 w-4 text-blue-600 shrink-0" />
              <span>{formatEventDateMeta(event.date)}</span>
            </div>
            <div className="flex items-center gap-2.5 text-[14px] text-gray-500">
              <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
          
          <div className="w-full mt-2">
            <CapacityBar 
              eventId={event.id} 
              initialCount={event._count.rsvps} 
              totalCapacity={event.capacity} 
            />
          </div>
        </div>
      </button>

      <div id={descriptionId} className={getDescriptionRevealClasses(isExpanded)}>
        <div className="px-5 pb-5 pt-2 flex flex-col gap-4 bg-white">
          <p className="text-[14px] leading-relaxed text-gray-600 pt-4 border-t border-black/5">
            {event.description || "No description provided."}
          </p>

          <footer className="mt-4 flex justify-end items-center">
            <LongPressButton
              onComplete={() => handleRegister()}
              disabled={registerState === "LOCKING" || registerState === "SECURED"}
              className="w-full sm:w-auto px-8 h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-400 rounded-xl text-white font-semibold text-[15px] flex items-center justify-center transition-all whitespace-nowrap shadow-sm active:scale-95"
            >
              {registerState === "IDLE" || registerState === "ERROR" ? (
                "Reserve Spot"
              ) : registerState === "LOCKING" ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Locking...
                </span>
              ) : (
                "Secured"
              )}
            </LongPressButton>
          </footer>
        </div>
      </div>
    </article>
  );
}