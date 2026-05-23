import { Calendar } from "lucide-react";
import { HappeningThisWeekCarousel } from "@/features/feed/components/HappeningThisWeekCarousel";
import { EventFeed } from "@/features/feed/components/EventFeed";

export default function HomePage() {
  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="flex flex-col gap-10 lg:gap-16 pb-32 md:pb-12">
      {/* Curation Carousel at top */}
      <HappeningThisWeekCarousel />

      {/* Dynamic Header */}
      <header className="px-4 md:px-8 flex justify-between items-end">
        <div>
          <p className="text-[14px] font-semibold text-[#a39e98] uppercase tracking-wider mb-1">
            {formattedDate}
          </p>
          <h1 className="text-[40px] md:text-[48px] font-bold text-black/95 leading-[1.1] tracking-[-1.5px]">
            For You
          </h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-black/5 flex justify-center items-center cursor-pointer active:scale-95 transition-transform">
          <Calendar className="w-5 h-5 text-black/80" />
        </div>
      </header>

      {/* Live Event Feed Grid */}
      <EventFeed />
    </div>
  );
}
