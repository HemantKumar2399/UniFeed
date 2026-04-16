export function FeedSkeleton() {
  return (
    <div className="mx-auto flex w-full flex-col gap-6 py-6 pb-24 md:pb-8">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        {/* Discovery Pills Skeleton */}
        <div className="flex w-full gap-3 overflow-x-hidden pb-4">
          {[1, 2, 3, 4].map((key) => (
            <div
              key={`pill-${key}`}
              className="h-10 w-24 shrink-0 rounded-full bg-black/[0.04] animate-pulse"
            />
          ))}
        </div>

        {/* Event Cards Skeleton Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((key) => (
            <div
              key={key}
              className="w-full overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-sm"
            >
              <div className="relative aspect-[21/9] w-full overflow-hidden bg-black/[0.04] animate-pulse" />
              <div className="p-5 flex flex-col gap-4">
                <div className="h-6 w-3/4 bg-black/[0.04] rounded animate-pulse" />
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-1/2 bg-black/[0.04] rounded animate-pulse" />
                  <div className="h-4 w-1/3 bg-black/[0.04] rounded animate-pulse" />
                </div>
                <div className="mt-2 h-4 w-full bg-black/[0.04] rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}