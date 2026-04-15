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
    <article id={eventId} className="w-full max-w-md bg-pure-white rounded-comfortable border border-[var(--border-whisper)] shadow-[var(--shadow-card)] overflow-hidden transition-all duration-transition">
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={descriptionId}
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full text-left active:scale-[0.99] transition-transform duration-haptic bg-pure-white"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-warm-white border-b border-[var(--border-whisper)]">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 448px"
            priority={false}
          />
        </div>

        <div className="p-4 bg-pure-white">
          <h2 className="text-xl font-bold tracking-card-title text-notion-black line-clamp-2">{event.title}</h2>
          
          <div className="flex flex-col gap-1.5 mt-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-warm-gray-500 font-medium">
              <Calendar className="h-4 w-4 text-notion-blue shrink-0" />
              <span>{formatEventDateMeta(event.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-warm-gray-500">
              <MapPin className="h-4 w-4 text-notion-blue shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
          
          <div className="w-full mt-1">
            <CapacityBar 
              eventId={event.id} 
              initialCount={event._count.rsvps} 
              totalCapacity={event.capacity} 
            />
          </div>
        </div>
      </button>

      <div id={descriptionId} className={getDescriptionRevealClasses(isExpanded)}>
        <div className="min-h-0 px-4 pb-4 pt-1 flex flex-col gap-4 bg-pure-white border-t border-transparent">
          <p className="text-sm leading-6 text-warm-gray-500 pt-2 border-t border-[var(--border-whisper)]">
            {event.description || "No description provided."}
          </p>

          <footer className="mt-2 flex justify-end items-center">
            <LongPressButton
              onComplete={() => handleRegister()}
              disabled={registerState === "LOCKING" || registerState === "SECURED"}
              className="w-36 h-11 bg-notion-blue hover:bg-[var(--color-notion-blue-hover)] disabled:opacity-50 disabled:cursor-not-allowed rounded-micro text-white font-semibold text-sm flex items-center justify-center transition-colors whitespace-nowrap shadow-[var(--shadow-card)]"
            >
              {registerState === "IDLE" || registerState === "ERROR" ? (
                "Reserve"
              ) : registerState === "LOCKING" ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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