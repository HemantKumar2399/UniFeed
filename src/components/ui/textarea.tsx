import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(
        "min-h-[88px] w-full rounded-[12px] border border-whisper bg-pure-white px-3 py-2 text-sm text-notion-black",
        "placeholder:text-warm-gray-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-blue)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
