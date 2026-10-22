"use client";

import type { RSVPStatus } from "@prisma/client";
import { Bookmark, CalendarPlus, Pin, PinOff } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useLiveEventAttendance } from "@/hooks/use-live-event-attendance";
import {
  formatRegistrationDeadline,
  getRegistrationActionLabel,
  getRegistrationAvailability,
  getRegistrationAvailabilityBadgeVariant,
  getRegistrationAvailabilityLabel,
} from "@/lib/event-registration";
import { api } from "@/trpc/react";
import type { RouterOutputs } from "@/trpc/react";

import { EventInformation } from "./EventInformation";
import { CapacityBar } from "./CapacityBar";
import {
  formatDiscussionAuthorName,
  sortDiscussionThreads,
} from "./discussion-board.utils";

type EventFeedItem = RouterOutputs["event"]["getFeed"][number];
type DiscussionThread = RouterOutputs["event"]["getDiscussionThreads"][number];
type DiscussionReply = DiscussionThread["replies"][number];

function getRegisterButtonLabel(params: {
  registrationAvailability: ReturnType<typeof getRegistrationAvailability>;
  isRegistering: boolean;
  viewerRsvpStatus: RSVPStatus | null;
}) {
  if (params.isRegistering) {
    return null;
  }

  if (params.viewerRsvpStatus === "GOING") {
    return "Registered";
  }

  if (params.viewerRsvpStatus === "ATTENDED") {
    return "Attended";
  }

  if (params.viewerRsvpStatus === "WAITLISTED") {
    return "Waitlisted";
  }

  return getRegistrationActionLabel(params.registrationAvailability);
}

export function EventDetailContent({ event }: { event: EventFeedItem }) {
  const utils = api.useUtils();
  const [activeTab, setActiveTab] = useState<"overview" | "discussions">(
    "overview",
  );
  const [questionDraft, setQuestionDraft] = useState("");
  const [replyDraftByThread, setReplyDraftByThread] = useState<
    Record<number, string>
  >({});
  const { activeCount, totalCapacity, viewerRsvpStatus, setViewerRsvpStatus } =
    useLiveEventAttendance({
      eventId: event.id,
      totalCapacity: event.capacity,
      initialActiveCount: event._count.rsvps,
      initialViewerRsvpStatus: event.rsvps?.[0]?.status ?? null,
    });

  const { data: isSaved } = api.profile.checkSavedStatus.useQuery({
    eventId: event.id,
  });

  const toggleSave = api.profile.toggleSavedEvent.useMutation({
    onSuccess: async (data) => {
      await utils.profile.checkSavedStatus.invalidate({ eventId: event.id });
      await utils.profile.getSavedEvents.invalidate();
      toast.success(
        data.saved ? "Event saved!" : "Event removed from saved list.",
      );
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update save status.");
    },
  });

  const {
    data: discussionThreads,
    isLoading: isDiscussionLoading,
    isError: isDiscussionError,
    error: discussionError,
    refetch: refetchDiscussions,
  } = api.event.getDiscussionThreads.useQuery({ eventId: event.id });

  const createQuestion = api.event.createDiscussionThread.useMutation({
    onSuccess: async () => {
      setQuestionDraft("");
      await utils.event.getDiscussionThreads.invalidate({ eventId: event.id });
      toast.success("Question posted");
    },
    onError: (error) => {
      toast.error(error.message || "Could not post your question");
    },
  });

  const replyToThread = api.event.replyToDiscussionThread.useMutation({
    onSuccess: async (_, variables) => {
      setReplyDraftByThread((current) => ({
        ...current,
        [variables.threadId]: "",
      }));
      await utils.event.getDiscussionThreads.invalidate({ eventId: event.id });
      toast.success("Reply posted");
    },
    onError: (error) => {
      toast.error(error.message || "Could not post organizer reply");
    },
  });

  const togglePin = api.event.toggleDiscussionPin.useMutation({
    onMutate: async (variables) => {
      await utils.event.getDiscussionThreads.cancel({ eventId: event.id });

      const previousThreads = utils.event.getDiscussionThreads.getData({
        eventId: event.id,
      });

      utils.event.getDiscussionThreads.setData(
        { eventId: event.id },
        (current: DiscussionThread[] | undefined) => {
          if (!current) {
            return current;
          }

          return sortDiscussionThreads<DiscussionThread>(
            current.map((thread: DiscussionThread) =>
              thread.id === variables.threadId
                ? {
                    ...thread,
                    pinned: variables.pinned,
                  }
                : thread,
            ),
          );
        },
      );

      return { previousThreads };
    },
    onError: (error, _variables, context) => {
      if (context?.previousThreads) {
        utils.event.getDiscussionThreads.setData(
          { eventId: event.id },
          context.previousThreads,
        );
      }

      toast.error(error.message || "Could not update pin state");
    },
    onSettled: async () => {
      await utils.event.getDiscussionThreads.invalidate({ eventId: event.id });
    },
  });

  const orderedThreads = useMemo<DiscussionThread[]>(() => {
    return sortDiscussionThreads<DiscussionThread>(discussionThreads ?? []);
  }, [discussionThreads]);

  const { mutate: registerRsvp, isPending: isRegistering } =
    api.rsvp.register.useMutation({
      onSuccess: async (data) => {
        setViewerRsvpStatus(data.status);
        toast.success(
          data.status === "WAITLISTED"
            ? "Added to waitlist!"
            : "Successfully registered!",
        );
        await utils.event.getFeed.invalidate();
        await utils.event.getHappeningThisWeek.invalidate();
      },
      onError: (error) => {
        const errorMessageMap: Record<string, string> = {
          EVENT_FULL: "This event is full. You've been added to the waitlist.",
          ALREADY_REGISTERED: "You're already registered for this event.",
          EVENT_NOT_PUBLISHED: "This event is not accepting registrations yet.",
          EVENT_CANCELLED: "This event has been cancelled.",
          EVENT_PAST: "This event has already passed.",
          COLLEGE_MISMATCH: "You can only register for events at your college.",
          USER_NO_COLLEGE:
            "Your account is not linked to a college. Please contact support.",
          PROFILE_UNVERIFIED:
            "Please complete your student profile before registering.",
          "Registration for this event is closed.":
            "Registration for this event is closed.",
        };

        toast.error(
          errorMessageMap[error.message] ??
            error.message ??
            "Failed to register. Please try again.",
        );
      },
    });

  const { mutate: cancelRsvp, isPending: isCancelPending } =
    api.rsvp.cancel.useMutation({
      onSuccess: async () => {
        setViewerRsvpStatus(null);
        toast.success("RSVP cancelled successfully.");
        await utils.event.getFeed.invalidate();
        await utils.event.getHappeningThisWeek.invalidate();
      },
      onError: (error) => {
        toast.error(error.message || "Failed to cancel RSVP.");
      },
    });

  const handleRegister = () => {
    if (!viewerRsvpStatus) {
      registerRsvp({ eventId: event.id });
    }
  };

  const handlePostQuestion = () => {
    const question = questionDraft.trim();
    if (question.length < 8) {
      toast.error("Please write at least 8 characters");
      return;
    }

    createQuestion.mutate({
      eventId: event.id,
      question,
    });
  };

  const handlePostReply = (threadId: number) => {
    const message = (replyDraftByThread[threadId] ?? "").trim();
    if (message.length < 3) {
      toast.error("Reply should be at least 3 characters");
      return;
    }

    replyToThread.mutate({
      threadId,
      message,
    });
  };

  const discussionErrorMessage =
    discussionError?.message ??
    "Could not load discussions right now. Please retry.";
  const registrationAvailability = getRegistrationAvailability({
    status: event.status,
    date: event.date,
    registrationClosesAt: event.registrationClosesAt,
    capacity: totalCapacity,
    activeCount,
    waitlistEnabled: true,
  });
  const registerButtonLabel = getRegisterButtonLabel({
    viewerRsvpStatus,
    registrationAvailability,
    isRegistering,
  });
  const canCancel =
    viewerRsvpStatus === "GOING" ||
    viewerRsvpStatus === "ATTENDED" ||
    viewerRsvpStatus === "WAITLISTED";
  const canRegister =
    registrationAvailability === "OPEN" ||
    registrationAvailability === "CLOSING_SOON" ||
    registrationAvailability === "WAITLIST_OPEN";

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="min-w-0 space-y-6">
        <div className="flex gap-2">
          <button
            className={`min-h-11 rounded-xl px-4 py-2 text-sm font-semibold tracking-[0.125px] transition-colors ${
              activeTab === "overview"
                ? "bg-primary/10 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
            aria-pressed={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
            type="button"
          >
            Overview
          </button>
          <button
            className={`rounded-full px-3 py-1.5 text-[12px] font-semibold tracking-[0.125px] transition-colors ${
              activeTab === "discussions"
                ? "bg-primary/10 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
            aria-pressed={activeTab === "discussions"}
            onClick={() => setActiveTab("discussions")}
            type="button"
          >
            Discussions
          </button>
        </div>

        <div className="space-y-4">
          {activeTab === "overview" ? (
            <EventInformation event={event} />
          ) : (
            <>
              <Card className="border-whisper bg-card-bg shadow-none">
                <CardContent className="space-y-3 p-4">
                  <p className="text-muted-foreground text-[13px] font-semibold tracking-[0.12em] uppercase">
                    Ask a question
                  </p>
                  <Textarea
                    className="min-h-[96px]"
                    maxLength={600}
                    onChange={(currentEvent) =>
                      setQuestionDraft(currentEvent.target.value)
                    }
                    placeholder="Ask organizers anything about this event"
                    value={questionDraft}
                  />
                  <div className="flex justify-end">
                    <Button
                      disabled={
                        createQuestion.isPending ||
                        questionDraft.trim().length < 8
                      }
                      onClick={handlePostQuestion}
                      size="sm"
                      type="button"
                    >
                      {createQuestion.isPending
                        ? "Posting..."
                        : "Post question"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {isDiscussionLoading ? (
                <div className="border-whisper bg-app-bg text-muted-foreground rounded-[14px] border px-4 py-3 text-[14px]">
                  Loading discussions...
                </div>
              ) : isDiscussionError ? (
                <div className="alert-panel surface-status-danger px-4 py-3 text-[14px]">
                  <p>{discussionErrorMessage}</p>
                  <div className="mt-2">
                    <Button
                      onClick={() => void refetchDiscussions()}
                      size="sm"
                      type="button"
                      variant="outline"
                    >
                      Retry
                    </Button>
                  </div>
                </div>
              ) : orderedThreads.length === 0 ? (
                <div className="border-whisper bg-app-bg text-muted-foreground rounded-[14px] border px-4 py-3 text-[14px]">
                  No questions yet. Ask the first one.
                </div>
              ) : (
                orderedThreads.map((thread) => {
                  const draftReply = replyDraftByThread[thread.id] ?? "";
                  const isReplyPending =
                    replyToThread.isPending &&
                    replyToThread.variables?.threadId === thread.id;
                  const isPinPending =
                    togglePin.isPending &&
                    togglePin.variables?.threadId === thread.id;

                  return (
                    <Card
                      className="border-whisper bg-card-bg shadow-none"
                      key={thread.id}
                    >
                      <CardContent className="space-y-3 p-4">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-foreground/90 text-[14px] font-semibold">
                                {thread.question}
                              </p>
                              {thread.pinned ? <Badge>Pinned</Badge> : null}
                            </div>
                            <p className="text-muted-foreground text-[12px]">
                              Asked by{" "}
                              {formatDiscussionAuthorName(
                                thread.author.displayName,
                                null,
                              )}
                            </p>
                          </div>

                          {thread.canManagePin ? (
                            <Button
                              disabled={isPinPending}
                              onClick={() =>
                                togglePin.mutate({
                                  threadId: thread.id,
                                  pinned: !thread.pinned,
                                })
                              }
                              size="sm"
                              type="button"
                              variant="ghost"
                            >
                              {thread.pinned ? (
                                <span className="inline-flex items-center gap-1">
                                  <PinOff className="h-3.5 w-3.5" />
                                  Unpin
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1">
                                  <Pin className="h-3.5 w-3.5" />
                                  Pin
                                </span>
                              )}
                            </Button>
                          ) : null}
                        </div>

                        <div className="bg-app-bg space-y-2 rounded-[12px] p-3">
                          {thread.replies.length === 0 ? (
                            <p className="text-muted-foreground text-[12px]">
                              No organizer reply yet.
                            </p>
                          ) : (
                            thread.replies.map((reply: DiscussionReply) => (
                              <div
                                className="border-whisper bg-card-bg rounded-[10px] border px-3 py-2"
                                key={reply.id}
                              >
                                <div className="mb-1 flex items-center gap-2">
                                  <p className="text-foreground/90 text-[12px] font-semibold">
                                    {formatDiscussionAuthorName(
                                      reply.author.displayName,
                                      null,
                                    )}
                                  </p>
                                  {reply.author.isOrganizer ? (
                                    <Badge>Organizer</Badge>
                                  ) : null}
                                </div>
                                <p className="text-foreground/80 text-[13px] leading-relaxed">
                                  {reply.message}
                                </p>
                              </div>
                            ))
                          )}
                        </div>

                        {thread.canManagePin ? (
                          <div className="space-y-2">
                            <Textarea
                              className="min-h-[80px]"
                              maxLength={800}
                              onChange={(currentEvent) =>
                                setReplyDraftByThread((current) => ({
                                  ...current,
                                  [thread.id]: currentEvent.target.value,
                                }))
                              }
                              placeholder="Post an organizer clarification"
                              value={draftReply}
                            />
                            <div className="flex justify-end">
                              <Button
                                disabled={
                                  isReplyPending || draftReply.trim().length < 3
                                }
                                onClick={() => handlePostReply(thread.id)}
                                size="sm"
                                type="button"
                              >
                                {isReplyPending
                                  ? "Posting..."
                                  : "Post organizer reply"}
                              </Button>
                            </div>
                          </div>
                        ) : null}
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </>
          )}
        </div>
      </div>
      <aside
        aria-label="Registration"
        className="border-border bg-card-bg order-first self-start rounded-2xl border p-5 shadow-sm lg:sticky lg:top-24 lg:order-last"
      >
        <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
          Your place at this event
        </p>
        <Badge
          variant={getRegistrationAvailabilityBadgeVariant(
            registrationAvailability,
          )}
        >
          {getRegistrationAvailabilityLabel(registrationAvailability)}
        </Badge>
        <div className="my-5">
          <CapacityBar count={activeCount} totalCapacity={totalCapacity} />
        </div>
        <p className="text-muted-foreground text-xs font-medium">
          Register before
        </p>
        <p className="mt-1 text-sm leading-6 font-semibold">
          {formatRegistrationDeadline(event.registrationClosesAt)}
        </p>
        <footer className="mt-5 flex flex-col gap-3">
          <Button
            className="border-whisper hover:bg-muted flex h-12 w-full items-center justify-center rounded-xl px-0 transition-all active:scale-95"
            disabled={toggleSave.isPending}
            onClick={() => toggleSave.mutate({ eventId: event.id })}
            aria-label={isSaved ? "Remove from Saved" : "Save Event"}
            title={isSaved ? "Remove from Saved" : "Save Event"}
            type="button"
            variant="outline"
          >
            <Bookmark
              className={`h-5 w-5 ${
                isSaved
                  ? "fill-notion-blue text-notion-blue"
                  : "text-muted-foreground"
              }`}
            />
            <span className="ml-2">
              {isSaved ? "Saved event" : "Save event"}
            </span>
          </Button>

          <Button
            asChild
            className="border-whisper hover:bg-muted h-12 w-full rounded-xl px-6 text-[14px] font-semibold transition-all active:scale-95"
            variant="outline"
          >
            <Link href={`/api/events/${event.id}/calendar`}>
              <CalendarPlus className="h-4 w-4" />
              Add to Calendar
            </Link>
          </Button>

          {canCancel ? (
            <Button
              className="h-12 w-full rounded-xl px-6 text-[14px] font-semibold"
              disabled={isCancelPending}
              onClick={() => cancelRsvp({ eventId: event.id })}
              type="button"
              variant="destructive"
            >
              {isCancelPending ? "Cancelling..." : "Cancel RSVP"}
            </Button>
          ) : null}

          <Button
            className="order-first flex h-12 w-full items-center justify-center rounded-xl px-8 text-[15px] font-semibold whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isRegistering || canCancel || !canRegister}
            onClick={handleRegister}
            type="button"
          >
            {isRegistering ? (
              <span className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                  />
                </svg>
                Registering...
              </span>
            ) : (
              registerButtonLabel
            )}
          </Button>
        </footer>
      </aside>
    </div>
  );
}
