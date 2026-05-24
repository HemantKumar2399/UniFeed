import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, Users, Building2 } from "lucide-react";

import { HubBlocksRenderer } from "@/features/hubs/components/HubBlocksRenderer";
import { db } from "@/server/db";
import { auth } from "@/server/auth";
import { HubFollowButton } from "@/features/hubs/components/HubFollowButton";

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

  const session = await auth();

  const hub = await db.club.findUnique({
    where: { id: clubId },
    select: {
      id: true,
      name: true,
      logoUrl: true,
      isActive: true,
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
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });

  if (!hub) {
    notFound();
  }

  // Check community moderation status visibility
  if (!hub.isActive) {
    const canManage = session?.user
      ? session.user.role === "ADMIN" ||
        (await db.clubMembership.findUnique({
          where: {
            userId_clubId: {
              userId: session.user.id,
              clubId: hub.id,
            },
          },
        }).then((m) => !!m))
      : false;

    if (!canManage) {
      notFound();
    }
  }

  let isFollowed = false;
  if (session?.user?.id) {
    const follow = await db.hubFollow.findUnique({
      where: {
        userId_clubId: {
          userId: session.user.id,
          clubId,
        },
      },
    });
    isFollowed = !!follow;
  }

  return (
    <div className="min-h-screen bg-[#f6f5f4] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header className="rounded-[20px] border border-[rgba(0,0,0,0.1)] bg-white px-6 py-6 flex flex-col sm:flex-row sm:items-center gap-5">
          {hub.logoUrl ? (
            <img
              src={hub.logoUrl}
              alt={`${hub.name} Logo`}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-black/10 shadow-sm shrink-0"
            />
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black/5 flex items-center justify-center text-[#615d59] border border-black/10 shrink-0">
              <Building2 className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8a847d]">Campus Hub</span>
              <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#615d59] bg-black/5 px-2.5 py-0.5 rounded-full">
                <Users className="w-3.5 h-3.5" />
                {hub._count.followers} {hub._count.followers === 1 ? "follower" : "followers"}
              </span>
            </div>
            <h1 className="mt-1 text-[28px] sm:text-[34px] font-bold tracking-[-0.02em] text-black/95 leading-tight">{hub.name}</h1>
            <p className="mt-1 text-[14px] text-[#615d59]">
              Community resources, links, and FAQs curated by the organizing team.
            </p>
          </div>
          {session?.user && (
            <div className="shrink-0 self-start sm:self-center">
              <HubFollowButton clubId={hub.id} initialIsFollowed={isFollowed} />
            </div>
          )}
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
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="group block rounded-[14px] border border-[rgba(0,0,0,0.1)] bg-[#f6f5f4] px-4 py-3 hover:bg-[#eae9e8] transition-colors"
                >
                  <h3 className="text-[16px] font-semibold tracking-tight text-black/95 group-hover:text-[#0075de] transition-colors">{event.title}</h3>
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
                </Link>
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