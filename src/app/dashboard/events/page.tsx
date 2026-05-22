import { CalendarClock, Plus } from "lucide-react";
import Link from "next/link";

import { EmptyState } from "@/components/EmptyState";

export default function DashboardEventsPage() {
  return (
    <div className="flex flex-col gap-8 pb-32 md:pb-12">
      <header className="px-1 md:px-0 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[40px] md:text-[48px] font-bold text-black/95 leading-[1.1] tracking-[-1.5px] mb-2">
            Events
          </h1>
          <p className="text-[16px] text-[#615d59] font-medium leading-relaxed">
            Manage your experiences, track RSVPs, and edit event details.
          </p>
        </div>
        <Link 
          href="/dashboard/events/new"
          className="inline-flex items-center justify-center gap-2 bg-[#0075de] hover:bg-[#005bab] text-white px-5 py-3 rounded-[8px] font-semibold text-[15px] active:scale-95 transition-all shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
        >
          <Plus className="w-5 h-5" />
          Create Event
        </Link>
      </header>

      <section className="px-1 md:px-0">
        <EmptyState
          title="The organizer event list is not wired to live data yet"
          description="TODO-MVP: Epic 5 will replace the sample cards with real events, status tabs, and RSVP counts. The demo cards were removed so this page no longer implies fake production activity."
          actionLabel="Create Event"
          actionHref="/dashboard/events/new"
          icon={<CalendarClock className="h-7 w-7" />}
        />
      </section>
    </div>
  );
}
