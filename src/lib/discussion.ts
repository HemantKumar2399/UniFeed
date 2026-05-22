export type SortableDiscussionThread = {
  pinned: boolean;
  createdAt: Date | string;
};

function toTimestamp(value: Date | string): number {
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export function sortDiscussionThreads<T extends SortableDiscussionThread>(threads: readonly T[]): T[] {
  return [...threads].sort((a, b) => {
    if (a.pinned !== b.pinned) {
      return a.pinned ? -1 : 1;
    }

    return toTimestamp(b.createdAt) - toTimestamp(a.createdAt);
  });
}

export function resolveDiscussionDisplayName(name: string | null, email: string | null): string {
  return name ?? email ?? "Community member";
}

export function canManageDiscussionThread(params: {
  viewerRole: string | undefined;
  viewerId: string;
  eventAuthorId: string;
}): boolean {
  return params.viewerRole === "ORGANIZER" && params.viewerId === params.eventAuthorId;
}