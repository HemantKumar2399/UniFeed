import Image from "next/image";

interface StoryAvatarProps {
  id: string;
  name: string;
  imageUrl: string;
  isWatched: boolean;
}

export function StoryAvatar({ id, name, imageUrl, isWatched }: StoryAvatarProps) {
  return (
    <div className={`min-w-fit snap-center flex flex-col items-center cursor-pointer p-0.5 rounded-full ring-2 ring-offset-2 ring-offset-black ${isWatched ? 'ring-neutral-800' : 'ring-rose-600'}`}>
      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
        <Image src={imageUrl} alt={name} fill className="object-cover" />
      </div>
    </div>
  );
}