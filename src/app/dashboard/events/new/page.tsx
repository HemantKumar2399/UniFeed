import { CreateEventWizard } from "@/features/events/components/CreateEventWizard";

export default function CreateEventPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Create Event</h1>
      </div>
      <CreateEventWizard />
    </div>
  );
}