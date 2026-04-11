import { useState } from "react";
import { api } from "@/trpc/react";

export function CapacityBar({ eventId, initialCount, totalCapacity }: { eventId: number, initialCount: number, totalCapacity: number }) {
  const [currentCount, setCurrentCount] = useState(initialCount);

  // Subscribe to capacity changes
  api.rsvp.onCapacityChange.useSubscription(
    { eventId },
    {
      onData: (data: { eventId: number; newCapacity: number }) => {
        // data.newCapacity is the remaining capacity
        setCurrentCount(totalCapacity - data.newCapacity);
      },
    }
  );

  const percentage = Math.min(100, Math.max(0, (currentCount / totalCapacity) * 100));

  let barColorClass = "bg-zinc-300";
  if (percentage >= 95) {
    barColorClass = "bg-rose-600";
  } else if (percentage >= 75) {
    barColorClass = "bg-amber-500";
  }

  return (
    <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-2 overflow-hidden">
      <div
        className={`h-full ${barColorClass} transition-all duration-300 ease-out`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
