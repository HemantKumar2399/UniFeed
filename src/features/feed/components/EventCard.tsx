"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { LongPressButton } from "@/components/ui/LongPressButton";
import { CapacityBar } from "./CapacityBar";

import { api } from "@/trpc/react";
import type { RouterOutputs } from "@/trpc/react";

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
    <article id={eventId} className="w-full max-w-md overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={descriptionId}
        onClick={() => setIsExpanded((prev) => !prev)}
        className="relative block w-full cursor-pointer text-left"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 448px"
            priority={false}
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-4 pb-4 pt-12">
            <h2 className="line-clamp-2 text-lg font-semibold text-white">{event.title}</h2>
            <div className="flex justify-between items-center mt-1">
              <p className="text-sm text-zinc-100">{formatEventDateMeta(event.date)}</p>
              <p className="text-sm text-zinc-200">{event.location}</p>
            </div>
            
            <div className="mt-3">
              <CapacityBar 
                eventId={event.id} 
                initialCount={event._count.rsvps} 
                totalCapacity={event.capacity} 
              />
            </div>
          </div>
        </div>
      </button>

      <div id={descriptionId} className={getDescriptionRevealClasses(isExpanded)}>
        <div className="min-h-0 px-4 pb-4 pt-3 flex flex-col gap-4">
          <p className="text-sm leading-6 text-zinc-200">
            {event.description || "No description provided."}
          </p>

          <footer className="mt-auto flex justify-end items-center">
            <LongPressButton
              onComplete={() => handleRegister()}
              disabled={registerState === "LOCKING" || registerState === "SECURED"}
              className="w-36 h-10 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-full text-white font-medium text-sm flex items-center justify-center transition-colors whitespace-nowrap"
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
                "Secured ✅"
              )}
            </LongPressButton>
          </footer>
        </div>
      </div>
    </article>
  );
}