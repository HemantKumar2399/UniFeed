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
        <h1 className="text-3xl font-bold tracking-tight">Edit Event</h1>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500 shadow-sm dark:border-gray-800 dark:bg-black">
        Editing events is coming soon in the next epic!
      </div>
    </div>
  );
}
