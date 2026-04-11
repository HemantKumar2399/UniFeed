export function FeedSkeleton() {
  return (
    <div className="mx-auto flex w-full flex-col gap-8 py-6">
      {/* Story Bar Skeleton */}
      <div className="w-full">
        <div className="flex overflow-x-hidden gap-4 px-4 py-2">
          {[1, 2, 3, 4, 5, 6].map((key) => (
            <div
              key={key}
              className="min-w-fit snap-center flex flex-col items-center p-0.5"
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 animate-pulse bg-neutral-800 ring-2 ring-offset-2 ring-offset-black ring-neutral-800" />
            </div>
          ))}
        </div>
      </div>

      {/* Event Cards Skeleton */}
      <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-2">
        {[1, 2, 3].map((key) => (
          <div
            key={key}
            className="w-full max-w-md overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-[0_8px_24px_rgba(0,0,0,0.45)] animate-pulse"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-800" />
          </div>
        ))}
      </div>
    </div>
  );
}