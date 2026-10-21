"use client";

import { api } from "@/trpc/react";

import { Bell, Check, CheckCheck, Inbox, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function NotificationsPageClient() {
  const utils = api.useUtils();
  const {
    data: notifications,
    isLoading,
    error,
    refetch,
  } = api.notification.getAll.useQuery(undefined, { retry: false });

  const markAsReadMutation = api.notification.markAsRead.useMutation({
    onError: (error) => toast.error(error.message),
    onSuccess: async () => {
      await utils.notification.getAll.invalidate();
      await utils.notification.getUnreadCount.invalidate();
    },
  });

  const markAllAsReadMutation = api.notification.markAllAsRead.useMutation({
    onError: (error) => toast.error(error.message),
    onSuccess: async () => {
      await utils.notification.getAll.invalidate();
      await utils.notification.getUnreadCount.invalidate();
    },
  });

  const handleMarkAsRead = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    markAsReadMutation.mutate({ id });
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const formatTimeAgo = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "EVENT_APPROVED":
      case "RSVP_CONFIRMED":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 font-bold text-emerald-600">
            ✓
          </div>
        );
      case "EVENT_REJECTED":
      case "EVENT_CANCELLED":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/10 font-bold text-rose-600">
            ✕
          </div>
        );
      default:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-600">
            <Bell className="h-4 w-4" />
          </div>
        );
    }
  };

  const hasUnread = notifications?.some((n) => !n.isRead);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-bold tracking-tight">
            Notifications
          </h1>
          <p className="text-muted-foreground mt-1 text-[14px]">
            Stay updated on event status changes, RSVP confirmations, and
            waitlist activities.
          </p>
        </div>
        {hasUnread && (
          <button
            onClick={handleMarkAllAsRead}
            disabled={markAllAsReadMutation.isPending}
            className="text-notion-blue hover:bg-notion-blue/5 border-notion-blue/20 flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors disabled:opacity-50"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Mark all read
          </button>
        )}
      </div>

      {error ? (
        <div role="alert" className="border-input rounded-xl border p-5">
          <p>Unable to load notifications.</p>
          <button
            onClick={() => void refetch()}
            className="mt-2 min-h-11 underline"
          >
            Retry
          </button>
        </div>
      ) : isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-muted/40 h-20 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : !notifications || notifications.length === 0 ? (
        <div className="border-input bg-card-bg flex flex-col items-center justify-center rounded-2xl border border-dashed p-8 py-16 text-center transition-colors">
          <div className="bg-muted text-muted-foreground mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <Inbox className="h-6 w-6" />
          </div>
          <h3 className="text-foreground text-base font-bold">
            All caught up!
          </h3>
          <p className="text-muted-foreground mt-1 text-[14px]">
            You don&apos;t have any notifications at the moment.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => {
            const cardContent = (
              <div
                className={`group flex items-start gap-4 rounded-xl border p-4 text-left transition-all ${
                  notification.isRead
                    ? "bg-card-bg border-whisper hover:border-input"
                    : "border-blue-200/50 bg-blue-500/5 shadow-sm hover:border-blue-300 dark:border-blue-500/20 dark:bg-blue-500/10 dark:hover:border-blue-500/40"
                }`}
              >
                {getNotificationIcon(notification.type)}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`truncate text-[14px] leading-tight ${notification.isRead ? "text-foreground/90 font-medium" : "text-foreground font-bold"}`}
                    >
                      {notification.title}
                    </h4>
                    <span className="text-muted-foreground shrink-0 text-[11px]">
                      {formatTimeAgo(notification.createdAt)}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-1 text-[13px] leading-relaxed">
                    {notification.message}
                  </p>
                  {notification.linkUrl && (
                    <Link
                      href={notification.linkUrl}
                      onClick={() => {
                        if (!notification.isRead)
                          markAsReadMutation.mutate({ id: notification.id });
                      }}
                      className="text-notion-blue mt-2 flex min-h-11 items-center gap-1 text-[12px] font-semibold focus-visible:outline focus-visible:outline-2"
                    >
                      View details <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
                {!notification.isRead && (
                  <button
                    onClick={(e) => handleMarkAsRead(notification.id, e)}
                    disabled={markAsReadMutation.isPending}
                    className="border-whisper hover:bg-muted hover:text-foreground text-muted-foreground flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors"
                    title="Mark as read"
                  >
                    <Check className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            );

            return <div key={notification.id}>{cardContent}</div>;
          })}
        </div>
      )}
    </div>
  );
}
