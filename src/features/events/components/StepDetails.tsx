"use client";

import { useFormContext } from "react-hook-form";
import type { CreateEventInput } from "./CreateEventSchema";

export function StepDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateEventInput>();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Event Details</h2>
      <p className="text-sm text-gray-500">Provide the foundational details for your event here.</p>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-sm font-medium text-notion-black">Title</label>
        <input
          id="title"
          className="rounded-[var(--radius-micro)] border border-[var(--border-input)] bg-pure-white px-4 py-2 text-base text-notion-black min-h-[44px] shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-blue)] focus-visible:border-[var(--color-focus-blue)]"
          placeholder="e.g. Intro to Quantum Computing"
          {...register("title")}
        />
        {errors.title?.message && (
          <p className="text-xs font-semibold text-rose-600">{errors.title.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium text-notion-black">Description</label>
        <textarea
          id="description"
          rows={3}
          className="rounded-[var(--radius-micro)] border border-[var(--border-input)] bg-pure-white px-4 py-2 text-base text-notion-black shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-blue)] focus-visible:border-[var(--color-focus-blue)]"
          placeholder="Describe what your event is about..."
          {...register("description")}
        />
        {errors.description?.message && (
          <p className="text-xs font-semibold text-rose-600">{errors.description.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="date" className="text-sm font-medium text-notion-black">Date & Time</label>
        <input
          id="date"
          type="datetime-local"
          className="rounded-[var(--radius-micro)] border border-[var(--border-input)] bg-pure-white px-4 py-2 text-base text-notion-black min-h-[44px] shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-blue)] focus-visible:border-[var(--color-focus-blue)]"
          {...register("date")}
        />
        {errors.date?.message && (
          <p className="text-xs font-semibold text-rose-600">{errors.date.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="location" className="text-sm font-medium text-notion-black">Location</label>
        <input
          id="location"
          className="rounded-[var(--radius-micro)] border border-[var(--border-input)] bg-pure-white px-4 py-2 text-base text-notion-black min-h-[44px] shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-blue)] focus-visible:border-[var(--color-focus-blue)]"
          placeholder="e.g. Building 4, Room 101"
          {...register("location")}
        />
        {errors.location?.message && (
          <p className="text-xs font-semibold text-rose-600">{errors.location.message}</p>
        )}
      </div>
    </div>
  );
}
