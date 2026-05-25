"use client";

import type { RSVPStatus } from "@prisma/client";
import { Bookmark, Pin, PinOff } from "lucide-react";
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

export function EventDetailContent({
  event,
  renderCapacityBar = false,
}: {
  event: EventFeedItem;
  renderCapacityBar?: boolean;
}) {
  const utils = api.useUtils();
  const [activeTab, setActiveTab] = useState<"overview" | "discussions">("overview");
  const [questionDraft, setQuestionDraft] = useState("");
  const [replyDraftByThread, setReplyDraftByThread] = useState<Record<number, string>>({});
  const {
    activeCount,
    totalCapacity,
    viewerRsvpStatus,
    setViewerRsvpStatus,
  } = useLiveEventAttendance({
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
      toast.success(data.saved ? "Event saved!" : "Event removed from saved list.");
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

  const { mutate: registerRsvp, isPending: isRegistering } = api.rsvp.register.useMutation({
    onSuccess: async (data) => {
      setViewerRsvpStatus(data.status);
      toast.success(data.status === "WAITLISTED" ? "Added to waitlist!" : "Successfully registered!");
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
        USER_NO_COLLEGE: "Your account is not linked to a college. Please contact support.",
        PROFILE_UNVERIFIED: "Please complete your student profile before registering.",
        "Registration for this event is closed.": "Registration for this event is closed.",
      };

      toast.error(errorMessageMap[error.message] ?? error.message ?? "Failed to register. Please try again.");
    },
  });

  const { mutate: cancelRsvp, isPending: isCancelPending } = api.rsvp.cancel.useMutation({
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
    discussionError?.message ?? "Could not load discussions right now. Please retry.";
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
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          className={`rounded-full px-3 py-1.5 text-[12px] font-semibold tracking-[0.125px] transition-colors ${
            activeTab === "overview"
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground"
          }`}
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
          onClick={() => setActiveTab("discussions")}
          type="button"
        >
          Discussions
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === "overview" ? (
          <>
            {renderCapacityBar ? (
              <div className="max-w-md">
                <CapacityBar count={activeCount} totalCapacity={totalCapacity} />
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={getRegistrationAvailabilityBadgeVariant(registrationAvailability)}>
                {getRegistrationAvailabilityLabel(registrationAvailability)}
              </Badge>
              <span className="text-[13px] font-medium text-muted-foreground">
                Registration closes: {formatRegistrationDeadline(event.registrationClosesAt)}
              </span>
            </div>

            <p className="rounded-[14px] border border-whisper bg-app-bg px-4 py-3 text-[14px] leading-relaxed text-foreground/80">
              {event.description || "No description provided."}
            </p>

            <footer className="mt-3 flex flex-col items-center justify-end gap-2 sm:flex-row">
              <Button
                className="flex h-12 w-full items-center justify-center rounded-xl border-whisper px-0 transition-all hover:bg-muted active:scale-95 sm:mr-auto sm:w-12"
                disabled={toggleSave.isPending}
                onClick={() => toggleSave.mutate({ eventId: event.id })}
                title={isSaved ? "Remove from Saved" : "Save Event"}
                type="button"
                variant="outline"
              >
                <Bookmark
                  className={`h-5 w-5 ${
                    isSaved ? "fill-blue-600 text-blue-600" : "text-muted-foreground"
                  }`}
                />
              </Button>

              {canCancel ? (
                <Button
                  className="h-12 w-full rounded-xl border-red-200 px-6 text-[14px] font-semibold text-red-600 transition-all hover:bg-red-50 hover:text-red-700 active:scale-95 sm:w-auto"
                  disabled={isCancelPending}
                  onClick={() => cancelRsvp({ eventId: event.id })}
                  type="button"
                  variant="outline"
                >
                  {isCancelPending ? "Cancelling..." : "Cancel RSVP"}
                </Button>
              ) : null}

              <Button
                className="flex h-12 w-full items-center justify-center whitespace-nowrap rounded-xl bg-blue-600 px-8 text-[15px] font-semibold text-white transition-all hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 sm:w-auto"
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
          </>
        ) : (
          <>
            <Card className="border-whisper bg-card-bg shadow-none">
              <CardContent className="space-y-3 p-4">
                <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Ask a question
                </p>
                <Textarea
                  className="min-h-[96px]"
                  maxLength={600}
                  onChange={(currentEvent) => setQuestionDraft(currentEvent.target.value)}
                  placeholder="Ask organizers anything about this event"
                  value={questionDraft}
                />
                <div className="flex justify-end">
                  <Button
                    disabled={createQuestion.isPending || questionDraft.trim().length < 8}
                    onClick={handlePostQuestion}
                    size="sm"
                    type="button"
                  >
                    {createQuestion.isPending ? "Posting..." : "Post question"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {isDiscussionLoading ? (
              <div className="rounded-[14px] border border-whisper bg-app-bg px-4 py-3 text-[14px] text-muted-foreground">
                Loading discussions...
              </div>
            ) : isDiscussionError ? (
              <div className="rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
                <p>{discussionErrorMessage}</p>
                <div className="mt-2">
                  <Button onClick={() => void refetchDiscussions()} size="sm" type="button" variant="outline">
                    Retry
                  </Button>
                </div>
              </div>
            ) : orderedThreads.length === 0 ? (
              <div className="rounded-[14px] border border-whisper bg-app-bg px-4 py-3 text-[14px] text-muted-foreground">
                No questions yet. Ask the first one.
              </div>
            ) : (
              orderedThreads.map((thread) => {
                const draftReply = replyDraftByThread[thread.id] ?? "";
                const isReplyPending =
                  replyToThread.isPending && replyToThread.variables?.threadId === thread.id;
                const isPinPending =
                  togglePin.isPending && togglePin.variables?.threadId === thread.id;

                return (
                  <Card className="border-whisper bg-card-bg shadow-none" key={thread.id}>
                    <CardContent className="space-y-3 p-4">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-[14px] font-semibold text-foreground/90">
                              {thread.question}
                            </p>
                            {thread.pinned ? <Badge>Pinned</Badge> : null}
                          </div>
                          <p className="text-[12px] text-muted-foreground">
                            Asked by {formatDiscussionAuthorName(thread.author.displayName, null)}
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

                      <div className="space-y-2 rounded-[12px] bg-app-bg p-3">
                        {thread.replies.length === 0 ? (
                          <p className="text-[12px] text-muted-foreground">No organizer reply yet.</p>
                        ) : (
                          thread.replies.map((reply: DiscussionReply) => (
                            <div
                              className="rounded-[10px] border border-whisper bg-card-bg px-3 py-2"
                              key={reply.id}
                            >
                              <div className="mb-1 flex items-center gap-2">
                                <p className="text-[12px] font-semibold text-foreground/90">
                                  {formatDiscussionAuthorName(reply.author.displayName, null)}
                                </p>
                                {reply.author.isOrganizer ? <Badge>Organizer</Badge> : null}
                              </div>
                              <p className="text-[13px] leading-relaxed text-foreground/80">
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
                              disabled={isReplyPending || draftReply.trim().length < 3}
                              onClick={() => handlePostReply(thread.id)}
                              size="sm"
                              type="button"
                            >
                              {isReplyPending ? "Posting..." : "Post organizer reply"}
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
  );
}
