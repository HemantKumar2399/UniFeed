"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface HubFollowButtonProps {
  clubId: number;
  initialIsFollowed: boolean;
  className?: string;
}

export function HubFollowButton({ clubId, initialIsFollowed, className }: HubFollowButtonProps) {
  const [isFollowed, setIsFollowed] = useState(initialIsFollowed);
  const utils = api.useUtils();

  const toggleFollow = api.hub.follow.useMutation({
    onMutate: () => {
      // Optimistic update
      setIsFollowed((prev) => !prev);
    },
    onError: (err) => {
      // Rollback
      setIsFollowed((prev) => !prev);
      toast.error(err.message || "Failed to update follow status.");
    },
    onSettled: async () => {
      await utils.hub.getDirectory.invalidate();
    },
  });

  return (
    <Button
      type="button"
      size="sm"
      variant={isFollowed ? "secondary" : "default"}
      disabled={toggleFollow.isPending}
      onClick={() => toggleFollow.mutate({ clubId })}
      className={cn(
        "min-w-[100px] border border-transparent transition-all",
        isFollowed && "border-whisper bg-card-bg text-muted-foreground hover:bg-muted hover:text-foreground",
        className
      )}
    >
      {isFollowed ? "Following" : "Follow"}
    </Button>
  );
}
