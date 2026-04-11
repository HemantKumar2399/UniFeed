"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface LongPressButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onComplete: () => void;
  duration?: number;
  progressClassName?: string;
}

export function LongPressButton({
  onComplete,
  duration = 1500,
  className,
  progressClassName,
  children,
  ...props
}: LongPressButtonProps) {
  const [isPressing, setIsPressing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startPress = (e: React.PointerEvent<HTMLButtonElement>) => {
    // Prevent default touch behaviors like magnifying glass on iOS
    e.preventDefault();

    if (e.pointerType === "mouse" && e.button !== 0) return;

    setIsPressing(true);
    timerRef.current = setTimeout(() => {
      setIsPressing(false);
      onComplete();
    }, duration);
  };

  const cancelPress = () => {
    setIsPressing(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <button
      {...props}
      onPointerDown={startPress}
      onPointerUp={cancelPress}
      onPointerLeave={cancelPress}
      onPointerCancel={cancelPress}
      onContextMenu={(e) => e.preventDefault()}
      className={cn(
        "relative overflow-hidden select-none touch-none group",
        "transition-transform active:scale-95",
        "-webkit-touch-callout-none", 
        className
      )}
      style={{
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
      aria-pressed={isPressing}
    >
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 bg-rose-600/30 opacity-0 pointer-events-none will-change-[width]",
          progressClassName
        )}
        style={{
          width: isPressing ? "100%" : "0%",
          transition: isPressing
            ? `width ${duration}ms linear, opacity 100ms ease-in`
            : "width 0ms, opacity 200ms ease-out",
          opacity: isPressing ? 1 : 0,
        }}
      />
      <span className="relative z-10 pointer-events-none">{children}</span>
    </button>
  );
}
