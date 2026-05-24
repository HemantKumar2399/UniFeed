"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { Building2, ExternalLink, Flame, Sparkles, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useHubFollowStore } from "@/features/hubs/state/follow-store";

function formatHubEventDate(value: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function formatUpdatedAt(value: Date | string): string {
  const updatedAt = new Date(value).getTime();
  const now = Date.now();
  const diffHours = Math.max(1, Math.round((now - updatedAt) / (1000 * 60 * 60)));

  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d ago`;
}

type HubItem = {
  id: number;
  name: string;
  isFollowed: boolean;
  followerCount: number;
  eventCount: number;
  blockCount: number;
  updatedAt: Date | string;
  nextEvent: {
    id: number;
    title: string;
    date: Date | string;
    location: string;
  } | null;
};

function getFollowHook(club: HubItem): string {
  if (club.nextEvent) {
    return `Upcoming: ${club.nextEvent.title}`;
  }

  if (club.blockCount > 0) {
    return `${club.blockCount} evergreen resources and FAQs`;
  }

  return "Active student community";
}

export function HubsDirectorySection() {
  const utils = api.useUtils();
  const { data: clubs, isLoading, isError } = api.hub.getDirectory.useQuery();

  const {
    followByClubId,
    hapticByClubId,
    seedFromServer,
    toggleFollowOptimistic,
    rollbackFollow,
    clearHaptic,
  } = useHubFollowStore();

  const followHub = api.hub.follow.useMutation({
    onMutate: ({ clubId }) => {
      toggleFollowOptimistic(clubId);
      window.setTimeout(() => clearHaptic(clubId), 200);
    },
    onError: (_error, variables) => {
      rollbackFollow(variables.clubId);
    },
    onSettled: async () => {
      await utils.hub.getDirectory.invalidate();
      await utils.event.getFeed.invalidate();
    },
  });

  useEffect(() => {
    if (!clubs) {
      return;
    }

    seedFromServer(
      clubs.map((club) => ({
        clubId: club.id,
        isFollowed: club.isFollowed,
      })),
    );
  }, [clubs, seedFromServer]);

  const featuredClubs = useMemo(() => {
    if (!clubs?.length) {
      return [];
    }

    return [...clubs]
      .sort((a, b) => b.followerCount - a.followerCount)
      .slice(0, 2);
  }, [clubs]);

  const recentlyUpdatedClubs = useMemo(() => {
    if (!clubs?.length) {
      return [];
    }

    return [...clubs]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 3);
  }, [clubs]);

  return (
    <section className="px-1 md:px-0">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[22px] font-bold text-black/95 tracking-[-0.25px]">Hubs Directory</h2>
        <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#a39e98]">Campus Hubs</span>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`hub-skeleton-${index}`}
              className="h-[164px] animate-pulse rounded-[16px] border border-[rgba(0,0,0,0.1)] bg-[#f6f5f4]"
            />
          ))}
        </div>
      ) : null}

      {!isLoading && isError ? (
        <div className="rounded-[16px] border border-[rgba(0,0,0,0.1)] bg-[#f6f5f4] p-6 text-center">
          <p className="text-[14px] font-medium text-[#615d59]">We could not load hubs right now. Please refresh.</p>
        </div>
      ) : null}

      {!isLoading && !isError && featuredClubs.length ? (
        <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          {featuredClubs.map((club) => (
            <article
              key={`featured-${club.id}`}
              className="rounded-[16px] border border-[rgba(0,0,0,0.1)] bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.04)]"
            >
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#fff4e5] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#a85a00]">
                <Flame className="h-3.5 w-3.5" />
                Featured Hub
              </div>
              <h3 className="text-[18px] font-bold tracking-tight text-black/95">{club.name}</h3>
              <p className="mt-1 text-[13px] font-medium text-[#615d59]">{club.followerCount} followers · {club.eventCount} events</p>
              <p className="mt-2 text-[13px] text-[#4f4a45]">{getFollowHook(club as HubItem)}</p>
            </article>
          ))}
        </div>
      ) : null}

      {!isLoading && !isError && recentlyUpdatedClubs.length ? (
        <div className="mb-4 rounded-[16px] border border-[rgba(0,0,0,0.1)] bg-[#f6f5f4] p-4">
          <div className="mb-3 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8a847d]">
            <Sparkles className="h-3.5 w-3.5" />
            Recently Updated
          </div>
          <div className="flex flex-wrap gap-2">
            {recentlyUpdatedClubs.map((club) => (
              <span
                key={`updated-${club.id}`}
                className="rounded-full border border-[rgba(0,0,0,0.1)] bg-white px-3 py-1.5 text-[12px] font-medium text-[#4f4a45]"
              >
                {club.name} · {formatUpdatedAt(club.updatedAt)}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {!isLoading && !isError && clubs?.length ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {clubs.map((club) => {
            const isFollowed = followByClubId[club.id] ?? club.isFollowed;
            const isHaptic = hapticByClubId[club.id] ?? false;

            return (
              <article
                key={club.id}
                className="rounded-[16px] border border-[rgba(0,0,0,0.1)] bg-[#f6f5f4] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-white text-[#1f1f1f]">
                      <Building2 className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="text-[17px] font-bold tracking-tight text-black/95">{club.name}</h3>
                      <p className="mt-1 text-[13px] font-medium text-[#615d59]">
                        {club.eventCount} events · {club.followerCount} followers · {club.blockCount} resources
                      </p>
                    </div>
                  </div>

                  <Button
                    type="button"
                    size="sm"
                    variant={isFollowed ? "secondary" : "default"}
                    disabled={followHub.isPending}
                    onClick={() => followHub.mutate({ clubId: club.id })}
                    className={cn(
                      "min-w-[110px] border border-transparent transition-transform duration-haptic",
                      isFollowed && "border-[rgba(0,0,0,0.08)] bg-white text-[#615d59] hover:bg-black/5 hover:text-black",
                      isHaptic && "scale-95",
                    )}
                  >
                    {isFollowed ? "Following" : "Follow"}
                  </Button>
                </div>

                <div className="mb-4 rounded-[12px] border border-[rgba(0,0,0,0.08)] bg-white/90 px-3 py-2">
                  {club.nextEvent ? (
                    <p className="text-[13px] font-medium text-[#4f4a45]">
                      Next: <span className="font-semibold text-black/90">{club.nextEvent.title}</span> · {formatHubEventDate(club.nextEvent.date)}
                    </p>
                  ) : (
                    <p className="text-[13px] font-medium text-[#7a746d]">No upcoming event yet.</p>
                  )}
                  <p className="mt-2 text-[12px] text-[#8a847d]">Updated {formatUpdatedAt(club.updatedAt)} · {getFollowHook(club as HubItem)}</p>
                </div>

                <Link
                  href={`/hubs/${club.id}`}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0075de] transition-colors hover:text-[#005cab]"
                >
                  View public hub
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </article>
            );
          })}
        </div>
      ) : null}

      {!isLoading && !isError && !clubs?.length ? (
        <div className="rounded-[16px] border border-[rgba(0,0,0,0.1)] bg-[#f6f5f4] p-6 text-center">
          <Users className="mx-auto mb-3 h-5 w-5 text-[#8a847d]" />
          <p className="text-[14px] font-medium text-[#615d59]">No hubs available yet.</p>
        </div>
      ) : null}
    </section>
  );
}