import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HappeningThisWeekCarousel } from "@/features/feed/components/HappeningThisWeekCarousel";
import { EventFeed } from "@/features/feed/components/EventFeed";

export default function HomePage() {
  const date = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date());
  return (
    <div className="space-y-9">
      <header className="border-border flex flex-wrap items-end justify-between gap-5 border-b pb-7">
        <div>
          <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
            {date}
          </p>
          <h1 className="font-display text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
            For You
          </h1>
          <p className="text-muted-foreground mt-3 max-w-lg text-base leading-relaxed">
            A good reason to step outside your routine. Find your next campus
            event.
          </p>
        </div>
        <Link
          href="/discover"
          className="bg-primary text-primary-foreground inline-flex min-h-11 items-center gap-3 rounded-xl px-5 text-sm font-semibold"
        >
          Explore events <ArrowUpRight className="h-4 w-4" />
        </Link>
      </header>
      <HappeningThisWeekCarousel />
      <section aria-labelledby="upcoming-heading">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 id="upcoming-heading" className="font-display text-xl font-bold">
            Worth showing up for
          </h2>
          <span className="text-muted-foreground text-xs">
            From your campus
          </span>
        </div>
        <EventFeed />
      </section>
    </div>
  );
}
