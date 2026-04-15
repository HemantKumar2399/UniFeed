import { api } from "@/trpc/server";
import Link from "next/link";

export default async function DashboardPage() {
  const events = await api.event.getOrganizerDrafts();

  // Calculate simple metrics for the dashboard
  const totalEvents = events.length;
  const totalRSVPs = events.reduce((acc, event) => acc + (event._count?.rsvps ?? 0), 0);
  const activeEvents = events.filter(e => new Date(e.date) >= new Date()).length;

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-notion-black">Overview</h1>
        <Link
          href="/dashboard/events/new"
          className="rounded-[var(--radius-micro)] bg-notion-blue px-4 py-2 text-sm font-medium text-pure-white hover:bg-focus-blue transition-colors duration-haptic active:scale-95"
        >
          Create Event
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <div className="rounded-[var(--radius-comfortable)] border border-[var(--border-whisper)] bg-pure-white p-6">
          <div className="text-[2.5rem] font-bold leading-none tracking-[-0.02em] text-notion-black mb-1">{totalEvents}</div>
          <div className="text-sm font-medium text-warm-gray-500">Total Events</div>
        </div>
        <div className="rounded-[var(--radius-comfortable)] border border-[var(--border-whisper)] bg-pure-white p-6">
          <div className="text-[2.5rem] font-bold leading-none tracking-[-0.02em] text-notion-black mb-1">{totalRSVPs}</div>
          <div className="text-sm font-medium text-warm-gray-500">Total RSVPs</div>
        </div>
        <div className="rounded-[var(--radius-comfortable)] border border-[var(--border-whisper)] bg-pure-white p-6">
          <div className="text-[2.5rem] font-bold leading-none tracking-[-0.02em] text-notion-black mb-1">{activeEvents}</div>
          <div className="text-sm font-medium text-warm-gray-500">Active Events</div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[var(--radius-comfortable)] border border-[var(--border-whisper)] bg-pure-white">
        <table className="min-w-full divide-y divide-[var(--border-whisper)]">
          <thead className="bg-warm-white">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-badge text-warm-gray-500">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-badge text-warm-gray-500">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-badge text-warm-gray-500">
                Capacity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-badge text-warm-gray-500">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-whisper)] bg-pure-white">
            {events.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-warm-gray-500">
                  No events found. Start by creating one!
                </td>
              </tr>
            ) : (
              events.map((event) => {
                const isPast = new Date(event.date) < new Date();
                const status = isPast ? "Past" : "Active";
                
                return (
                  <tr key={event.id} className="transition-colors hover:bg-warm-white/50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-notion-black">{event.title}</div>
                      <div className="text-sm text-warm-gray-500">{event.location}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-warm-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-warm-gray-500">
                      <span className="font-semibold text-notion-black">{event._count?.rsvps ?? 0}</span> / {event.capacity}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[0.6875rem] font-semibold leading-5 uppercase tracking-badge ${isPast ? 'bg-warm-gray-200 text-warm-gray-700' : 'bg-green-100 text-green-800'}`}>
                        {status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <Link href={`/dashboard/events/${event.id}/edit`} className="text-notion-blue hover:text-focus-blue transition-colors">
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
