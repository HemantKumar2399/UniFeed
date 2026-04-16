import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[300px] w-full flex-col items-center justify-center rounded-comfortable border border-[var(--border-whisper)] bg-pure-white p-8 text-center shadow-sm",
        className
      )}
    >
      {icon && (
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-circle bg-warm-white text-notion-blue">
          {icon}
        </div>
      )}
      <h3 className="mb-2 text-xl font-bold tracking-card-title text-notion-black">
        {title}
      </h3>
      <p className="mb-8 max-w-sm text-sm leading-relaxed text-warm-gray-500">
        {description}
      </p>
      {actionLabel && actionHref && (
        <Button asChild variant="default">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
}
