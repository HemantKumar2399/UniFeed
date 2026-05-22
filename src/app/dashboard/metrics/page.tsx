import { BarChart3 } from "lucide-react";

import { EmptyState } from "@/components/EmptyState";

export default function MetricsPage() {
  return (
    <div className="flex flex-col gap-8 pb-32 md:pb-12">
      <header className="px-1 md:px-0 flex flex-col gap-2">
        <h1 className="text-[40px] md:text-[48px] font-bold text-black/95 leading-[1.1] tracking-[-1.5px]">
          Metrics
        </h1>
        <p className="text-[16px] text-[#615d59] font-medium leading-relaxed">
          Analyze your event performance and attendee engagement.
        </p>
      </header>

      <section className="px-1 md:px-0">
        <EmptyState
          title="Organizer metrics are waiting on real reporting pipelines"
          description="TODO-MVP: Epic 11 will wire this page to actual attendance, conversion, and event performance queries. Static KPI cards were removed so the screen no longer presents fabricated data."
          icon={<BarChart3 className="h-7 w-7" />}
        />
      </section>
    </div>
  );
}
