import { api } from "@/trpc/server";
import Link from "next/link";
import { EventActions } from "./EventActions";

export default async function EventsPage() {
  const events = await api.event.getOrganizerDrafts();

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Events Management</h1>
        <Link
          href="/dashboard/events/new"
          className="rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
        >
          Create Event
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-black">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Capacity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-black">
            {events.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                  No events found. Start by creating one!
                </td>
              </tr>
            ) : (
              events.map((event) => {
                const isPast = new Date(event.date) < new Date();
                const status = isPast ? "Past" : "Active";
                
                return (
                  <tr key={event.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-1">
                        {event.title}
                        {event.status === "DRAFT" && (
                          <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Draft</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">{event.location}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {event._count?.rsvps ?? 0} / {event.capacity}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${isPast ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'}`}>
                        {status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <EventActions eventId={event.id} status={event.status as "DRAFT" | "PUBLISHED"} />
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