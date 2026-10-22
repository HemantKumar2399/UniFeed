import React from "react";
import { Mail, ExternalLink, Utensils, Award, Ticket } from "lucide-react";

export type EventInformationData = {
  description: string;
  agenda?: string | null;
  requirements?: string | null;
  contactEmail?: string | null;
  venueUrl?: string | null;
  tags?: string[];
  domain?: string | null;
  targetBranches?: string[];
  isFreeFood?: boolean;
  hasCertificate?: boolean;
  isPaid?: boolean;
  club?: { name: string };
};

export function EventInformation({
  event,
  includeDescription = true,
}: {
  event: EventInformationData;
  includeDescription?: boolean;
}) {
  const venueUrl =
    event.venueUrl && /^https?:\/\//i.test(event.venueUrl)
      ? event.venueUrl
      : null;
  return (
    <div className="min-w-0 space-y-8 [overflow-wrap:anywhere]">
      {includeDescription && (
        <section aria-label="About this event" className="space-y-4">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            About this event
          </h2>
          <p className="text-foreground/85 text-[15px] leading-7 whitespace-pre-wrap">
            {event.description ||
              "The organizer has not added a description yet."}
          </p>
          {Boolean(event.tags?.length) && (
            <div className="flex flex-wrap gap-2">
              {event.tags?.map((tag) => (
                <span
                  key={tag}
                  className="bg-muted text-muted-foreground rounded-lg px-2.5 py-1 text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </section>
      )}
      {event.agenda && (
        <section
          aria-label="Event schedule"
          className="border-border space-y-3 border-t pt-6"
        >
          <h2 className="font-display text-xl font-bold">What’s happening</h2>
          <p className="text-foreground/85 text-sm leading-7 whitespace-pre-wrap">
            {event.agenda}
          </p>
        </section>
      )}
      {event.requirements && (
        <section
          aria-label="Preparation"
          className="border-border space-y-3 border-t pt-6"
        >
          <h2 className="font-display text-xl font-bold">Before you arrive</h2>
          <p className="text-foreground/85 text-sm leading-7 whitespace-pre-wrap">
            {event.requirements}
          </p>
        </section>
      )}
      {(Boolean(event.domain) || Boolean(event.targetBranches?.length)) && (
        <section className="border-border space-y-3 border-t pt-6">
          <h2 className="font-display text-xl font-bold">Who it’s for</h2>
          <p className="text-muted-foreground text-sm leading-6">
            {[event.domain, ...(event.targetBranches ?? [])]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </section>
      )}
      <section aria-label="Event extras" className="flex flex-wrap gap-3">
        <span className="border-border inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm">
          <Ticket className="text-primary h-4 w-4" />
          {event.isPaid
            ? "Paid entry · Contact the host for details"
            : "Free entry"}
        </span>
        {event.isFreeFood && (
          <span className="border-border inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm">
            <Utensils className="text-primary h-4 w-4" />
            Food included
          </span>
        )}
        {event.hasCertificate && (
          <span className="border-border inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm">
            <Award className="text-primary h-4 w-4" />
            Certificate available
          </span>
        )}
      </section>
      {(Boolean(event.club) ||
        Boolean(event.contactEmail) ||
        Boolean(venueUrl)) && (
        <section className="bg-brand-surface space-y-4 rounded-2xl p-5">
          <div>
            <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
              Your host
            </p>
            <h2 className="font-display text-lg font-bold">
              {event.club?.name ?? "Event organizer"}
            </h2>
          </div>
          <div className="flex flex-col items-start gap-3">
            {event.contactEmail && (
              <a
                href={`mailto:${event.contactEmail}`}
                className="text-primary inline-flex min-h-11 items-center gap-2 text-sm font-medium hover:underline"
              >
                <Mail className="h-4 w-4" />
                {event.contactEmail}
              </a>
            )}
            {venueUrl && (
              <a
                href={venueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary inline-flex min-h-11 items-center gap-2 text-sm font-medium hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                Open venue directions
              </a>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
