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

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium">Title</label>
        <input
          id="title"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
          placeholder="e.g. Intro to Quantum Computing"
          {...register("title")}
        />
        {errors.title?.message && (
          <p className="text-xs font-semibold text-rose-600">{errors.title.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium">Description</label>
        <textarea
          id="description"
          rows={3}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
          placeholder="Describe what your event is about..."
          {...register("description")}
        />
        {errors.description?.message && (
          <p className="text-xs font-semibold text-rose-600">{errors.description.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="date" className="text-sm font-medium">Date & Time</label>
        <input
          id="date"
          type="datetime-local"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
          {...register("date")}
        />
        {errors.date?.message && (
          <p className="text-xs font-semibold text-rose-600">{errors.date.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="location" className="text-sm font-medium">Location</label>
        <input
          id="location"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
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
