"use client";

import { useFormContext } from "react-hook-form";
import type { CreateEventInput } from "./CreateEventSchema";

export function StepReview() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateEventInput>();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Capacity & Review</h2>
      <p className="text-sm text-gray-500">Set your attendee limit and review details before confirming.</p>

      <div className="flex flex-col gap-1">
        <label htmlFor="capacity" className="text-sm font-medium">Waitlist / Max Capacity</label>
        <input
          id="capacity"
          type="number"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
          placeholder="100"
          {...register("capacity")}
        />
        {errors.capacity?.message && (
          <p className="text-xs font-semibold text-rose-600">{errors.capacity.message}</p>
        )}
      </div>
    </div>
  );
}
