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
          <h1 className="text-2xl font-bold tracking-tight text-black/95">Notifications</h1>
          <p className="text-[14px] text-[#615d59] mt-1">Stay updated on event status changes, RSVP confirmations, and waitlist activities.</p>
        </div>
        {hasUnread && (
          <button
            onClick={handleMarkAllAsRead}
            disabled={markAllAsReadMutation.isPending}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0075de] hover:bg-[#0075de]/5 rounded-lg transition-colors border border-[#0075de]/10 disabled:opacity-50"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all read
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-black/5 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : !notifications || notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-black/10 rounded-2xl bg-white p-8">
          <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center text-[#a39e98] mb-4">
            <Inbox className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-black/95">All caught up!</h3>
          <p className="text-[14px] text-[#a39e98] mt-1">You don&apos;t have any notifications at the moment.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => {
            const cardContent = (
              <div
                className={`group flex items-start gap-4 p-4 rounded-xl border transition-all text-left ${
                  notification.isRead
                    ? "bg-white border-black/5 hover:border-black/10"
                    : "bg-blue-50/30 border-blue-100 hover:border-blue-200 shadow-[0_1px_3px_rgba(0,117,222,0.02)]"
                }`}
              >
                {getNotificationIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-[14px] leading-tight truncate ${notification.isRead ? "text-black/90 font-medium" : "text-black/95 font-bold"}`}>
                      {notification.title}
                    </h4>
                    <span className="text-[11px] text-[#a39e98] shrink-0">{formatTimeAgo(notification.createdAt)}</span>
                  </div>
                  <p className="text-[13px] text-[#615d59] mt-1 leading-relaxed">
                    {notification.message}
                  </p>
                  {notification.linkUrl && (
                    <div className="flex items-center gap-1 text-[12px] font-semibold text-[#0075de] mt-2 group-hover:translate-x-0.5 transition-transform">
                      View details <ArrowRight className="w-3 h-3" />
                    </div>
                  )}
                </div>
                {!notification.isRead && (
                  <button
                    onClick={(e) => handleMarkAsRead(notification.id, e)}
                    disabled={markAsReadMutation.isPending}
                    className="w-6 h-6 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 hover:text-black/95 text-[#a39e98] transition-colors shrink-0"
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
