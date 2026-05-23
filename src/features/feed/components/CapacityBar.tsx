type CapacityBarProps = {
  count: number;
  totalCapacity: number;
};

export function CapacityBar({ count, totalCapacity }: CapacityBarProps) {
  const percentage = Math.min(100, Math.max(0, (count / totalCapacity) * 100));

  let barColorClass = "bg-[var(--color-notion-black)]";
  if (percentage >= 95) {
    barColorClass = "bg-[var(--color-critical-pink)]";
  } else if (percentage >= 75) {
    barColorClass = "bg-[var(--color-orange)]";
  }

  return (
    <div className="flex flex-col gap-1 w-full mt-2">
      <div className="flex justify-between items-center text-xs font-semibold tracking-badge text-warm-gray-500 uppercase">
        <span>Capacity</span>
        <span
          className={
            percentage >= 95
              ? "text-[var(--color-critical-pink)]"
              : percentage >= 75
              ? "text-[var(--color-orange)]"
              : "text-notion-black"
          }
        >
          {count} / {totalCapacity}
        </span>
      </div>
      <div className="w-full bg-warm-gray-200 border border-[var(--border-whisper)] rounded-full h-2.5 overflow-hidden shadow-none">
        <div
          className={`h-full ${barColorClass} transition-all duration-300 ease-in-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
