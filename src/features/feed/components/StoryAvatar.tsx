import { HostedImage as Image } from "@/components/HostedImage";

interface StoryAvatarProps {
  id: string;
  name: string;
  imageUrl: string;
  isWatched: boolean;
}

export function StoryAvatar({
  name,
  imageUrl,
  isWatched,
}: Omit<StoryAvatarProps, "id">) {
  return (
    <div
      className={`rounded-circle flex min-w-fit cursor-pointer snap-center flex-col items-center p-[2px] ring-2 ring-offset-2 ring-offset-[var(--color-pure-white)] ${isWatched ? "ring-[var(--color-warm-gray-300)]" : "ring-[var(--color-notion-blue)]"}`}
    >
      <div className="rounded-circle bg-warm-white relative h-16 w-16 flex-shrink-0 overflow-hidden">
        <Image src={imageUrl} alt={name} fill className="object-cover" />
      </div>
    </div>
  );
}
