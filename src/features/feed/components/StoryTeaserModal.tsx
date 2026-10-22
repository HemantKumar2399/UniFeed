import { useEffect } from "react";
import { HostedImage as Image } from "@/components/HostedImage";
import { useRouter } from "next/navigation";

interface StoryTeaserModalProps {
  clubId: string;
  clubName: string;
  eventId: string;
  imageUrl: string;
  onClose: () => void;
}

export function StoryTeaserModal({ clubName, eventId, imageUrl, onClose }: Omit<StoryTeaserModalProps, 'clubId'>) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 15000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const handleDeepLink = () => {
    onClose();
    router.push(`/home#event-${eventId}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/95">
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes storyProgress {
            from { width: 0%; }
            to { width: 100%; }
          }
          .animate-story-progress {
            animation: storyProgress 15s linear forwards;
          }
        `
      }} />
      <div className="absolute top-0 left-0 w-full h-1 bg-white/20 z-50">
        <div className="h-full bg-white animate-story-progress"></div>
      </div>
      
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-50">
        <h2 className="text-white text-shadow-md font-bold">{clubName}</h2>
        <button onClick={onClose} className="text-white bg-black/50 p-2 rounded-full w-8 h-8 flex items-center justify-center font-bold">×</button>
      </div>

      <div className="relative flex-1 w-full h-full">
        <Image src={imageUrl} alt={clubName} fill className="object-cover" />
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <button onClick={handleDeepLink} className="bg-white text-black px-6 py-3 rounded-full font-bold shadow-lg">
            View Event
          </button>
        </div>
      </div>
    </div>
  );
}