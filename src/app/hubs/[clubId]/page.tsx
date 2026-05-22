import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin } from "lucide-react";

import { HubBlocksRenderer } from "@/features/hubs/components/HubBlocksRenderer";
import { db } from "@/server/db";

function formatEventDate(value: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(value);
}

type PageProps = {
  params: Promise<{ clubId: string }>;
};

export default async function HubPublicPage({ params }: PageProps) {
  const resolvedParams = await params;
  const clubId = Number.parseInt(resolvedParams.clubId, 10);

  if (!Number.isInteger(clubId) || clubId <= 0) {
    notFound();
  }

  const hub = await db.club.findUnique({
    where: { id: clubId },
    select: {
      id: true,
      name: true,
      logoUrl: true,
      blocks: {
        orderBy: { position: "asc" },
        select: {
          id: true,
          type: true,
          title: true,
          content: true,
          linkUrl: true,
        },
      },
      events: {
        where: { status: "PUBLISHED" },
        orderBy: { date: "asc" },
        take: 6,
        select: {
          id: true,
          title: true,
          date: true,
          location: true,
        },
      },
    },
  });

  if (!hub) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f6f5f4] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header className="rounded-[20px] border border-[rgba(0,0,0,0.1)] bg-white px-6 py-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8a847d]">Campus Hub</p>
          <h1 className="mt-2 text-[34px] font-bold tracking-[-0.02em] text-black/95">{hub.name}</h1>
          <p className="mt-2 text-[14px] text-[#615d59]">
            Community resources, links, and FAQs curated by the organizing team.
          </p>
        </header>

        <section className="rounded-[20px] border border-[rgba(0,0,0,0.1)] bg-white p-4 md:p-5">
          <h2 className="mb-4 text-[21px] font-bold tracking-[-0.02em] text-black/95">Resources & FAQ</h2>
          <HubBlocksRenderer blocks={hub.blocks} />
        </section>

        <section className="rounded-[20px] border border-[rgba(0,0,0,0.1)] bg-white p-4 md:p-5">
          <h2 className="mb-4 text-[21px] font-bold tracking-[-0.02em] text-black/95">Upcoming Events</h2>

          {hub.events.length === 0 ? (
            <p className="text-[14px] text-[#615d59]">No upcoming events yet.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {hub.events.map((event) => (
                <article
                  key={event.id}
                  className="rounded-[14px] border border-[rgba(0,0,0,0.1)] bg-[#f6f5f4] px-4 py-3"
                >
                  <h3 className="text-[16px] font-semibold tracking-tight text-black/95">{event.title}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-[13px] text-[#615d59]">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatEventDate(event.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.location}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <Link href="/discover" className="text-[14px] font-semibold text-[#0075de] hover:text-[#005cab]">
          Back to Discover
        </Link>
      </div>
    </div>
  );
}