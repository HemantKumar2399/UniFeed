"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, ImageIcon, Loader2, MapPin, Users } from "lucide-react";
import { toast } from "sonner";

import { api } from "@/trpc/react";
import { buildCreateEventPayload, type BlockEditorDraft } from "./block-editor.utils";

const initialDraft: BlockEditorDraft = {
  clubId: "",
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  imageUrl: "",
  capacity: "100",
};

export function BlockEditor() {
  const [draft, setDraft] = useState<BlockEditorDraft>(initialDraft);
  const router = useRouter();
  const utils = api.useUtils();
  const { data: managedClubs, isLoading: isLoadingManagedClubs } = api.club.getMyManagedClubs.useQuery();

  const createEvent = api.event.create.useMutation({
    onSuccess: () => {
      toast.success("Draft saved successfully");
      setDraft(initialDraft);
      void utils.event.getOrganizerDrafts.invalidate();
      void utils.club.getMyManagedClubs.invalidate();
      router.push("/dashboard/events");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDraftChange =
    (key: keyof BlockEditorDraft) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setDraft((previous) => ({ ...previous, [key]: event.target.value }));
    };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!draft.clubId) {
      toast.error("Select the community that should own this event.");
      return;
    }

    createEvent.mutate(buildCreateEventPayload(draft));
  };

  const hasManagedClubs = (managedClubs?.length ?? 0) > 0;
  const isSubmitDisabled = createEvent.isPending || !hasManagedClubs;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 pb-32 md:pb-12">
      <header className="px-1 md:px-0">
        <Link
          href="/dashboard/events"
          className="mb-4 inline-flex w-fit items-center gap-2 text-[14px] font-semibold text-warm-gray-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Link>
        <h1 className="mb-2 text-[32px] font-bold leading-[1.1] tracking-[-1.2px] text-black/95 md:text-[40px]">
          Create New Event
        </h1>
        <p className="text-[16px] font-medium leading-relaxed text-warm-gray">
          Draft your event as a single focused document.
        </p>
      </header>

      <form onSubmit={onSubmit} className="flex flex-col gap-5 px-1 md:px-0">
        <section className="rounded-[20px] border border-input bg-white px-5 py-5 shadow-sm">
          <label className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.12em] text-warm-gray-muted">
            Community
          </label>
          <select
            value={draft.clubId}
            onChange={(event) => setDraft((previous) => ({ ...previous, clubId: event.target.value }))}
            disabled={isLoadingManagedClubs || !hasManagedClubs}
            className="h-12 w-full rounded-[14px] border border-input bg-white px-4 text-[15px] font-medium text-foreground outline-none transition-colors focus-visible:border-[var(--color-focus-blue)] disabled:cursor-not-allowed disabled:bg-muted"
          >
            <option value="">
              {isLoadingManagedClubs ? "Loading your communities..." : "Select a community"}
            </option>
            {(managedClubs ?? []).map((club) => (
              <option key={club.id} value={club.id}>
                {club.name} ({(club.role ?? "EDITOR").toLowerCase()})
              </option>
            ))}
          </select>
          {!isLoadingManagedClubs && !hasManagedClubs ? (
            <p className="mt-3 rounded-[14px] border border-input bg-muted px-4 py-3 text-[14px] leading-relaxed text-warm-gray">
              You do not manage any community yet. Ask your college admin to create a club and assign you as an owner or editor before creating events.
            </p>
          ) : null}
        </section>

        <section className="rounded-[20px] border border-input bg-white px-5 py-5 shadow-sm">
          <input
            value={draft.title}
            onChange={onDraftChange("title")}
            type="text"
            placeholder="Event Title"
            className="w-full border-none bg-transparent text-[30px] font-bold tracking-[-1px] text-foreground outline-none placeholder:text-warm-gray-muted md:text-[38px]"
          />
          <textarea
            value={draft.description}
            onChange={onDraftChange("description")}
            placeholder="Write your event description..."
            className="mt-4 min-h-[160px] w-full resize-none border-none bg-transparent text-[17px] leading-relaxed text-warm-gray outline-none placeholder:text-warm-gray-muted"
          />
        </section>

        <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <label className="flex items-center gap-3 rounded-[16px] border border-input bg-white px-3 py-2 shadow-sm focus-within:border-[var(--color-notion-blue)]">
            <Calendar className="h-5 w-5 text-warm-gray" />
            <input
              value={draft.date}
              onChange={onDraftChange("date")}
              type="date"
              className="w-full bg-transparent py-1 text-[15px] font-semibold text-foreground outline-none"
            />
          </label>

          <label className="flex items-center gap-3 rounded-[16px] border border-input bg-white px-3 py-2 shadow-sm focus-within:border-[var(--color-notion-blue)]">
            <Clock className="h-5 w-5 text-warm-gray" />
            <input
              value={draft.time}
              onChange={onDraftChange("time")}
              type="time"
              className="w-full bg-transparent py-1 text-[15px] font-semibold text-foreground outline-none"
            />
          </label>

          <label className="md:col-span-2 flex items-center gap-3 rounded-[16px] border border-input bg-white px-3 py-2 shadow-sm focus-within:border-[var(--color-notion-blue)]">
            <MapPin className="h-5 w-5 text-warm-gray" />
            <input
              value={draft.location}
              onChange={onDraftChange("location")}
              type="text"
              placeholder="Location"
              className="w-full bg-transparent py-1 text-[15px] font-semibold text-foreground outline-none placeholder:text-warm-gray-muted"
            />
          </label>

          <label className="md:col-span-2 flex items-center gap-3 rounded-[16px] border border-input bg-white px-3 py-2 shadow-sm focus-within:border-[var(--color-notion-blue)]">
            <Users className="h-5 w-5 text-warm-gray" />
            <input
              value={draft.capacity}
              onChange={onDraftChange("capacity")}
              type="number"
              min={1}
              placeholder="Max Capacity"
              className="w-full bg-transparent py-1 text-[15px] font-semibold text-foreground outline-none placeholder:text-warm-gray-muted"
            />
          </label>

          <label className="md:col-span-2 flex items-center gap-3 rounded-[16px] border border-input bg-white px-3 py-2 shadow-sm focus-within:border-[var(--color-notion-blue)]">
            <ImageIcon className="h-5 w-5 text-warm-gray" />
            <input
              value={draft.imageUrl}
              onChange={onDraftChange("imageUrl")}
              type="url"
              placeholder="Poster image URL"
              className="w-full bg-transparent py-1 text-[15px] font-semibold text-foreground outline-none placeholder:text-warm-gray-muted"
            />
          </label>
        </section>

        <div className="sticky bottom-6 z-10 mt-2 flex items-center justify-end rounded-[18px] border border-[rgba(0,0,0,0.08)] bg-white/85 p-2 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="inline-flex items-center gap-2 rounded-[12px] bg-notion-blue px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-[var(--color-notion-blue-hover)] disabled:opacity-60"
          >
            {createEvent.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {createEvent.isPending ? "Saving..." : "Save Draft"}
          </button>
        </div>
      </form>
    </div>
  );
}
