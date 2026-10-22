import { formatPlatformDate } from "@/lib/platform-date";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HostedImage as Image } from "@/components/HostedImage";
import { CalendarDays, MapPin, Users, Building2 } from "lucide-react";

import { HubBlocksRenderer } from "@/features/hubs/components/HubBlocksRenderer";
import { db } from "@/server/db";
import { auth } from "@/server/auth";
import { HubFollowButton } from "@/features/hubs/components/HubFollowButton";

function formatEventDate(value: Date): string {
  return formatPlatformDate(value, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
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
        (await db.clubMembership
          .findUnique({
            where: {
              userId_clubId: {
                userId: session.user.id,
                clubId: hub.id,
              },
            },
          })
          .then((m) => !!m))
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
    <div className="bg-app-bg text-foreground min-h-screen px-4 py-8 transition-colors duration-300 md:px-8 md:py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header className="border-whisper bg-card-bg flex flex-col gap-5 rounded-[20px] px-6 py-6 transition-colors duration-300 sm:flex-row sm:items-center">
          {hub.logoUrl ? (
            <Image
              src={hub.logoUrl}
              alt={`${hub.name} Logo`}
              width={80}
              height={80}
              className="border-whisper h-16 w-16 shrink-0 rounded-2xl border object-cover shadow-sm sm:h-20 sm:w-20"
            />
          ) : (
            <div className="bg-muted text-muted-foreground border-whisper flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border transition-colors sm:h-20 sm:w-20">
              <Building2
                className="h-8 w-8 sm:h-10 sm:w-10"
                strokeWidth={1.5}
              />
            </div>
          )}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-muted-foreground/80 text-[12px] font-semibold tracking-[0.14em] uppercase">
                Campus Hub
              </span>
              <span className="text-muted-foreground bg-muted inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[12px] font-medium transition-colors">
                <Users className="h-3.5 w-3.5" />
                {hub._count.followers}{" "}
                {hub._count.followers === 1 ? "follower" : "followers"}
              </span>
            </div>
            <h1 className="text-foreground mt-1 text-[28px] leading-tight font-bold tracking-[-0.02em] sm:text-[34px]">
              {hub.name}
            </h1>
            <p className="text-muted-foreground mt-1 text-[14px]">
              Community resources, links, and FAQs curated by the organizing
              team.
            </p>
          </div>
          {session?.user && (
            <div className="shrink-0 self-start sm:self-center">
              <HubFollowButton clubId={hub.id} initialIsFollowed={isFollowed} />
            </div>
          )}
        </header>

        <section className="border-whisper bg-card-bg rounded-[20px] p-4 transition-colors duration-300 md:p-5">
          <h2 className="text-foreground mb-4 text-[21px] font-bold tracking-[-0.02em]">
            Resources & FAQ
          </h2>
          <HubBlocksRenderer blocks={hub.blocks} />
        </section>

        <section className="border-whisper bg-card-bg rounded-[20px] p-4 transition-colors duration-300 md:p-5">
          <h2 className="text-foreground mb-4 text-[21px] font-bold tracking-[-0.02em]">
            Upcoming Events
          </h2>

          {hub.events.length === 0 ? (
            <p className="text-muted-foreground text-[14px]">
              No upcoming events yet.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {hub.events.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="group border-whisper bg-app-bg hover:bg-muted block rounded-[14px] px-4 py-3 transition-colors"
                >
                  <h3 className="text-foreground group-hover:text-notion-blue text-[16px] font-semibold tracking-tight transition-colors">
                    {event.title}
                  </h3>
                  <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-3 text-[13px]">
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

        <Link
          href="/discover"
          className="text-[14px] font-semibold text-[#0075de] hover:text-[#005cab]"
        >
          Back to Discover
        </Link>
      </div>
    </div>
  );
}
