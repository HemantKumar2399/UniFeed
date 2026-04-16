"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Loader2, MapPin, Users } from "lucide-react";
import { toast } from "sonner";

import { api } from "@/trpc/react";
import { buildCreateEventPayload, type BlockEditorDraft } from "./block-editor.utils";

const initialDraft: BlockEditorDraft = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  capacity: "100",
};

export function BlockEditor() {
  const [draft, setDraft] = useState<BlockEditorDraft>(initialDraft);

  const createEvent = api.event.create.useMutation({
    onSuccess: () => {
      toast.success("Event created successfully");
      setDraft(initialDraft);
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
    createEvent.mutate(buildCreateEventPayload(draft));
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 pb-32 md:pb-12">
      <header className="px-1 md:px-0">
        <Link
          href="/dashboard/events"
          className="mb-4 inline-flex w-fit items-center gap-2 text-[14px] font-semibold text-[#a39e98] transition-colors hover:text-black/80"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Link>
        <h1 className="mb-2 text-[32px] font-bold leading-[1.1] tracking-[-1.2px] text-black/95 md:text-[40px]">
          Create New Event
        </h1>
        <p className="text-[16px] font-medium leading-relaxed text-[#615d59]">
          Draft your event as a single focused document.
        </p>
      </header>

      <form onSubmit={onSubmit} className="flex flex-col gap-5 px-1 md:px-0">
        <section className="rounded-[20px] border border-[#dddddd] bg-white px-5 py-5 shadow-sm">
          <input
            value={draft.title}
            onChange={onDraftChange("title")}
            type="text"
            placeholder="Event Title"
            className="w-full border-none bg-transparent text-[30px] font-bold tracking-[-1px] text-black/95 outline-none placeholder:text-[#d4d0cb] md:text-[38px]"
          />
          <textarea
            value={draft.description}
            onChange={onDraftChange("description")}
            placeholder="Write your event description..."
            className="mt-4 min-h-[160px] w-full resize-none border-none bg-transparent text-[17px] leading-relaxed text-[#443f3a] outline-none placeholder:text-[#a39e98]"
          />
        </section>

        <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <label className="flex items-center gap-3 rounded-[16px] border border-[#dddddd] bg-white px-3 py-2 shadow-sm focus-within:border-[#0075de]">
            <Calendar className="h-5 w-5 text-[#8a847d]" />
            <input
              value={draft.date}
              onChange={onDraftChange("date")}
              type="date"
              className="w-full bg-transparent py-1 text-[15px] font-semibold text-black/90 outline-none"
            />
          </label>

          <label className="flex items-center gap-3 rounded-[16px] border border-[#dddddd] bg-white px-3 py-2 shadow-sm focus-within:border-[#0075de]">
            <Clock className="h-5 w-5 text-[#8a847d]" />
            <input
              value={draft.time}
              onChange={onDraftChange("time")}
              type="time"
              className="w-full bg-transparent py-1 text-[15px] font-semibold text-black/90 outline-none"
            />
          </label>

          <label className="md:col-span-2 flex items-center gap-3 rounded-[16px] border border-[#dddddd] bg-white px-3 py-2 shadow-sm focus-within:border-[#0075de]">
            <MapPin className="h-5 w-5 text-[#8a847d]" />
            <input
              value={draft.location}
              onChange={onDraftChange("location")}
              type="text"
              placeholder="Location"
              className="w-full bg-transparent py-1 text-[15px] font-semibold text-black/90 outline-none placeholder:text-[#a39e98]"
            />
          </label>

          <label className="md:col-span-2 flex items-center gap-3 rounded-[16px] border border-[#dddddd] bg-white px-3 py-2 shadow-sm focus-within:border-[#0075de]">
            <Users className="h-5 w-5 text-[#8a847d]" />
            <input
              value={draft.capacity}
              onChange={onDraftChange("capacity")}
              type="number"
              min={1}
              placeholder="Max Capacity"
              className="w-full bg-transparent py-1 text-[15px] font-semibold text-black/90 outline-none placeholder:text-[#a39e98]"
            />
          </label>
        </section>

        <div className="sticky bottom-6 z-10 mt-2 flex items-center justify-end rounded-[18px] border border-[rgba(0,0,0,0.08)] bg-white/85 p-2 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
          <button
            type="submit"
            disabled={createEvent.isPending}
            className="inline-flex items-center gap-2 rounded-[12px] bg-[#0075de] px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-[#005bab] disabled:opacity-60"
          >
            {createEvent.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {createEvent.isPending ? "Publishing..." : "Publish Event"}
          </button>
        </div>
      </form>
    </div>
  );
}
