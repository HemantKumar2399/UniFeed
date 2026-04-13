import { useState } from "react";
import { StoryAvatar } from "./StoryAvatar";
import { StoryTeaserModal } from "./StoryTeaserModal";

interface StoryBarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clubs: any[]; // replace with actual type later
}

export function StoryBar({ clubs }: StoryBarProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  const [activeStory, setActiveStory] = useState<any>(null);

  if (!clubs || clubs.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 py-2 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {clubs.map((club) => (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          <button key={club.id} type="button" className="outline-none focus:ring-2 focus:ring-zinc-400 rounded-full" onClick={() => setActiveStory(club)}>
            <StoryAvatar
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              name={club.name}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              imageUrl={club.imageUrl ?? "https://placehold.co/400/png"}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              isWatched={club.isWatched}
            />
          </button>
        ))}
      </div>
      {activeStory && (
        <StoryTeaserModal
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          clubName={activeStory.name}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          eventId={activeStory.eventId ?? activeStory.id}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          imageUrl={activeStory.imageUrl ?? "https://placehold.co/800x1200/png"}
          onClose={() => setActiveStory(null)}
        />
      )}
    </div>
  );
}