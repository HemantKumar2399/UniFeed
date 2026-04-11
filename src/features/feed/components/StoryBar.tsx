import { useState } from "react";
import { StoryAvatar } from "./StoryAvatar";
import { StoryTeaserModal } from "./StoryTeaserModal";

interface StoryBarProps {
  clubs: any[]; // replace with actual type later
}

export function StoryBar({ clubs }: StoryBarProps) {
  const [activeStory, setActiveStory] = useState<any | null>(null);

  if (!clubs || clubs.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 py-2 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {clubs.map((club) => (
          <button key={club.id} type="button" className="outline-none focus:ring-2 focus:ring-zinc-400 rounded-full" onClick={() => setActiveStory(club)}>
            <StoryAvatar
              id={club.id}
              name={club.name}
              imageUrl={club.imageUrl || "https://placehold.co/400/png"}
              isWatched={club.isWatched}
            />
          </button>
        ))}
      </div>
      {activeStory && (
        <StoryTeaserModal
          clubId={activeStory.id}
          clubName={activeStory.name}
          eventId={activeStory.eventId || activeStory.id}
          imageUrl={activeStory.imageUrl || "https://placehold.co/800x1200/png"}
          onClose={() => setActiveStory(null)}
        />
      )}
    </div>
  );
}