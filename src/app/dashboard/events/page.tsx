import { api } from "@/trpc/server";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { EventActions } from "./EventActions";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";

export default async function EventsPage() {
  const events = await api.event.getOrganizerDrafts();

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-notion-black">Events Management</h1>
        <Button asChild variant="primary">
          <Link href="/dashboard/events/new">
            Create Event
          </Link>
        </Button>
      </div>

      {events.length === 0 ? (
        <EmptyState
          title="No events yet"
          description="You haven't created any events. Set up your first event to start engaging with the campus community."
          actionLabel="Create Event"
          actionHref="/dashboard/events/new"
          icon={<PlusCircle className="h-8 w-8" />}
          className="mt-4"
        />
      ) : (
      <div className="overflow-hidden rounded-comfortable border border-[var(--border-whisper)] bg-pure-white shadow-[var(--shadow-card)]">
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
            {events.map((event) => {
              const isPast = new Date(event.date) < new Date();
              const status = isPast ? "Past" : "Active";
              
              return (
                <tr key={event.id} className="transition-colors duration-transition hover:bg-warm-white/50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-semibold text-notion-black flex items-center gap-2 mb-1">
                      {event.title}
                      {event.status === "DRAFT" && (
                        <span className="inline-flex items-center rounded-pill bg-orange-50 px-2 py-1 text-xs font-medium text-orange-800 ring-1 ring-inset ring-orange-600/20 tracking-badge">Draft</span>
                      )}
                    </div>
                    <div className="text-sm text-warm-gray-500">{event.location}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-warm-gray-500">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-warm-gray-500">
                    {event._count?.rsvps ?? 0} / {event.capacity}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`inline-flex rounded-pill px-2.5 py-0.5 text-xs font-semibold tracking-badge ${isPast ? 'bg-warm-white text-warm-gray-500' : 'bg-teal-50 text-teal-700'}`}>
                      {status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <EventActions eventId={event.id} status={event.status as "DRAFT" | "PUBLISHED"} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}