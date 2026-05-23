import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Tag } from "lucide-react";

import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { EventDetailContent } from "@/features/feed/components/EventDetailContent";
import { formatEventDateMeta } from "@/features/feed/components/event-card.utils";
import { CapacityBar } from "@/features/feed/components/CapacityBar";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventDetailPage({ params }: PageProps) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return notFound();
  }

  const { id } = await params;
  const eventId = Number.parseInt(id, 10);

  if (Number.isNaN(eventId) || eventId <= 0) {
    return notFound();
  }

  // Fetch event with club, rsvps count, and current user's RSVP status
  const event = await db.event.findUnique({
    where: { id: eventId },
    include: {
      club: {
        select: {
          id: true,
          name: true,
          logoUrl: true,
        },
      },
      _count: {
        select: {
          rsvps: true,
        },
      },
      rsvps: {
        where: {
          userId: user.id,
        },
        select: {
          status: true,
        },
      },
    },
  });

  // Verify event existence and visibility constraints
  if (event?.status !== "PUBLISHED") {
    return notFound();
  }

  // Enforce college scope security: students can only access same-college events
  if (event.collegeId !== user.collegeId) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-[26px] font-bold text-black/95 tracking-tight mb-2">
          Access Denied
        </h1>
        <p className="text-[#615d59] mb-6">
          This event belongs to another university scope and cannot be accessed.
        </p>
        <Link
          href="/home"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-[15px] font-semibold text-white transition-all hover:bg-blue-700 active:scale-95"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-8 pb-32">
      {/* Back Navigation */}
      <Link
        href="/home"
        className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#0075de] hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Feed
      </Link>

      <article className="overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-sm">
        {/* Banner Image */}
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-black/5">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>

        {/* Content Block */}
        <div className="p-6 md:p-8">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#097fe8] bg-[#f2f9ff] px-2.5 py-1 rounded-full">
              <Tag className="h-3.5 w-3.5" />
              {event.club.name}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            {event.title}
          </h1>

          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-black/5 py-4">
            <div className="flex items-center gap-3 text-[14px] font-medium text-gray-600">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>{formatEventDateMeta(event.date)}</span>
            </div>
            <div className="flex items-center gap-3 text-[14px] text-gray-500">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          <div className="mb-8 max-w-md">
            <CapacityBar
              count={event._count.rsvps}
              totalCapacity={event.capacity}
            />
          </div>

          {/* Interactive Details & Discussions tab component */}
          <EventDetailContent event={event} />
        </div>
      </article>
    </div>
  );
}
