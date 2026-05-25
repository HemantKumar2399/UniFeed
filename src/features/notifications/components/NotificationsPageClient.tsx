"use client";

import { api } from "@/trpc/react";

import { Bell, Check, CheckCheck, Inbox, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NotificationsPageClient() {
  const utils = api.useUtils();
  const { data: notifications, isLoading } = api.notification.getAll.useQuery();
  
  const markAsReadMutation = api.notification.markAsRead.useMutation({
    onSuccess: async () => {
      await utils.notification.getAll.invalidate();
      await utils.notification.getUnreadCount.invalidate();
    },
  });

  const markAllAsReadMutation = api.notification.markAllAsRead.useMutation({
    onSuccess: async () => {
      await utils.notification.getAll.invalidate();
      await utils.notification.getUnreadCount.invalidate();
    },
  });

  const handleMarkAsRead = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await markAsReadMutation.mutateAsync({ id });
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsReadMutation.mutateAsync();
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
        return <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">✓</div>;
      case "EVENT_REJECTED":
      case "EVENT_CANCELLED":
        return <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold">✕</div>;
      default:
        return <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center"><Bell className="w-4 h-4" /></div>;
    }
  };

  const hasUnread = notifications?.some((n) => !n.isRead);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Notifications</h1>
          <p className="text-[14px] text-muted-foreground mt-1">Stay updated on event status changes, RSVP confirmations, and waitlist activities.</p>
        </div>
        {hasUnread && (
          <button
            onClick={handleMarkAllAsRead}
            disabled={markAllAsReadMutation.isPending}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-notion-blue hover:bg-notion-blue/5 rounded-lg transition-colors border border-notion-blue/20 disabled:opacity-50"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all read
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-muted/40 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : !notifications || notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-input rounded-2xl bg-card-bg p-8 transition-colors">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-4">
            <Inbox className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-foreground">All caught up!</h3>
          <p className="text-[14px] text-muted-foreground mt-1">You don&apos;t have any notifications at the moment.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => {
            const cardContent = (
              <div
                className={`group flex items-start gap-4 p-4 rounded-xl border transition-all text-left ${
                  notification.isRead
                    ? "bg-card-bg border-whisper hover:border-input"
                    : "bg-blue-500/5 dark:bg-blue-500/10 border-blue-200/50 dark:border-blue-500/20 hover:border-blue-300 dark:hover:border-blue-500/40 shadow-sm"
                }`}
              >
                {getNotificationIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-[14px] leading-tight truncate ${notification.isRead ? "text-foreground/90 font-medium" : "text-foreground font-bold"}`}>
                      {notification.title}
                    </h4>
                    <span className="text-[11px] text-muted-foreground shrink-0">{formatTimeAgo(notification.createdAt)}</span>
                  </div>
                  <p className="text-[13px] text-muted-foreground mt-1 leading-relaxed">
                    {notification.message}
                  </p>
                  {notification.linkUrl && (
                    <div className="flex items-center gap-1 text-[12px] font-semibold text-notion-blue mt-2 group-hover:translate-x-0.5 transition-transform">
                      View details <ArrowRight className="w-3 h-3" />
                    </div>
                  )}
                </div>
                {!notification.isRead && (
                  <button
                    onClick={(e) => handleMarkAsRead(notification.id, e)}
                    disabled={markAsReadMutation.isPending}
                    className="w-6 h-6 rounded-full border border-whisper flex items-center justify-center hover:bg-muted hover:text-foreground text-muted-foreground transition-colors shrink-0"
                    title="Mark as read"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );

            if (notification.linkUrl) {
              // Automatically mark as read when clicking the link, wait, we can let user click the card to navigate
              return (
                <Link
                  key={notification.id}
                  href={notification.linkUrl}
                  onClick={() => {
                    if (!notification.isRead) {
                      markAsReadMutation.mutate({ id: notification.id });
                    }
                  }}
                  className="block outline-none"
                >
                  {cardContent}
                </Link>
              );
            }

            return <div key={notification.id}>{cardContent}</div>;
          })}
        </div>
      )}
    </div>
  );
}
