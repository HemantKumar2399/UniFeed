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

      <div className="flex flex-col gap-1.5">
        <label htmlFor="capacity" className="text-sm font-medium text-notion-black">Waitlist / Max Capacity</label>
        <input
          id="capacity"
          type="number"
          className="rounded-[var(--radius-micro)] border border-[var(--border-input)] bg-pure-white px-4 py-2 text-base text-notion-black min-h-[44px] shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-blue)] focus-visible:border-[var(--color-focus-blue)]"
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
