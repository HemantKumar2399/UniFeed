export function FeedSkeleton() {
  return (
    <div className="w-full">
      <div className="w-full">
        {/* Event Cards Skeleton Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((key) => (
            <div
              key={key}
              className="border-whisper bg-card-bg w-full overflow-hidden rounded-2xl border shadow-sm"
            >
              <div className="bg-muted relative aspect-[16/10] w-full animate-pulse overflow-hidden" />
              <div className="flex flex-col gap-4 p-5">
                <div className="bg-muted h-6 w-3/4 animate-pulse rounded" />
                <div className="flex flex-col gap-2">
                  <div className="bg-muted h-4 w-1/2 animate-pulse rounded" />
                  <div className="bg-muted h-4 w-1/3 animate-pulse rounded" />
                </div>
                <div className="bg-muted mt-2 h-4 w-full animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
