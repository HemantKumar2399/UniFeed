"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "All Events" },
  { id: "sports", label: "Sports" },
  { id: "arts", label: "Arts & Culture" },
  { id: "career", label: "Career & Tech" },
  { id: "social", label: "Social & Parties" },
  { id: "gaming", label: "Gaming" },
  { id: "academic", label: "Academic" },
];

export function DiscoveryPills() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="w-full pb-4">
      <div 
        className="flex w-full snap-x snap-mandatory gap-3 overflow-x-auto px-4 md:px-0"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style dangerouslySetInnerHTML={{ __html: `::-webkit-scrollbar { display: none; }` }} />
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "shrink-0 snap-center rounded-full px-5 py-2 text-[15px] font-semibold text-nowrap transition-all duration-300 active:scale-95",
              activeCategory === category.id 
                ? "bg-foreground text-background shadow-md" 
                : "bg-card-bg text-muted-foreground border border-whisper hover:bg-muted hover:text-foreground hover:border-input"
            )}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
