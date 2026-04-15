import { notFound, redirect } from "next/navigation";
import { auth } from "@/server/auth";

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }

  const id = parseInt(params.id);
  if (isNaN(id)) {
    notFound();
  }

  /* Since edit logic isn't fully built into the wizard yet, we'll just redirect back or show a placeholder */
  /* In a real scenario, we'd pass initialData to CreateEventWizard */
  
  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-notion-black">Edit Event</h1>
      </div>
      <div className="rounded-[var(--radius-comfortable)] border border-[var(--border-whisper)] bg-pure-white p-8 text-center font-medium text-warm-gray-500 shadow-none">
        Editing events is coming soon in the next epic!
      </div>
    </div>
  );
}
