import Image from "next/image";

interface StoryAvatarProps {
  id: string;
  name: string;
  imageUrl: string;
  isWatched: boolean;
}

export function StoryAvatar({ name, imageUrl, isWatched }: Omit<StoryAvatarProps, 'id'>) {
  return (
    <div className={`min-w-fit snap-center flex flex-col items-center cursor-pointer p-[2px] rounded-circle ring-2 ring-offset-2 ring-offset-[var(--color-pure-white)] ${isWatched ? 'ring-[var(--color-warm-gray-300)]' : 'ring-[var(--color-notion-blue)]'}`}>
      <div className="relative w-16 h-16 rounded-circle overflow-hidden flex-shrink-0 bg-warm-white">
        <Image src={imageUrl} alt={name} fill className="object-cover" />
      </div>
    </div>
  );
}