"use client";

import { useState } from "react";
import { ImageIcon, ExternalLink } from "lucide-react";
import { HostedImage } from "@/components/HostedImage";

export function EventMediaGallery({
  title,
  imageUrl,
  galleryImages = [],
  compact = false,
}: {
  title: string;
  imageUrl: string;
  galleryImages?: string[];
  compact?: boolean;
}) {
  const images = [...new Set([imageUrl, ...galleryImages].filter(Boolean))];
  const [selected, setSelected] = useState("");
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const active = images.includes(selected) ? selected : images[0];
  const failed = active ? failedImages.includes(active) : true;

  return (
    <section
      aria-label="Event images"
      className="border-border bg-card-bg overflow-hidden rounded-2xl border"
    >
      <div
        className={`bg-muted/60 relative flex aspect-[16/9] w-full items-center justify-center ${compact ? "max-h-[180px] min-h-36 sm:max-h-[300px] sm:min-h-48" : "max-h-[520px] min-h-48"}`}
      >
        {active && !failed ? (
          <HostedImage
            src={active}
            alt={title}
            fill
            priority
            className="object-contain p-2 sm:p-3"
            sizes="(max-width: 1023px) 100vw, 760px"
            onError={() => setFailedImages((current) => [...current, active])}
          />
        ) : (
          <div
            role="status"
            className="text-muted-foreground flex flex-col items-center gap-3 p-8 text-center"
          >
            <ImageIcon className="h-9 w-9 opacity-50" />
            <p className="text-sm">
              {active
                ? "This image is unavailable. Try another image below."
                : "Event details are below."}
            </p>
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="border-border flex items-center gap-3 border-t p-3 sm:px-5">
          <div
            className="flex min-w-0 flex-1 gap-2 overflow-x-auto py-1"
            aria-label="Choose an event image"
          >
            {images.map((url, index) => (
              <button
                key={url}
                type="button"
                onClick={() => setSelected(url)}
                aria-label={`View image ${index + 1} of ${images.length}`}
                aria-pressed={active === url}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${active === url ? "border-primary ring-primary/15 ring-2" : "bg-muted hover:border-border border-transparent"}`}
              >
                {failedImages.includes(url) ? (
                  <ImageIcon className="text-muted-foreground mx-auto h-5 w-5" />
                ) : (
                  <HostedImage
                    src={url}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                )}
              </button>
            ))}
          </div>
          <span
            aria-live="polite"
            className="text-muted-foreground shrink-0 text-xs tabular-nums"
          >
            {images.indexOf(active ?? "") + 1} / {images.length}
          </span>
        </div>
      )}
      {active &&
        !failed &&
        (/^https?:\/\//i.test(active) || active.startsWith("/uploads/")) && (
          <div className="border-border border-t px-3 sm:px-5">
            <a
              href={active}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary inline-flex min-h-11 items-center gap-2 text-xs font-semibold hover:underline"
            >
              Open full-size image <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
    </section>
  );
}
