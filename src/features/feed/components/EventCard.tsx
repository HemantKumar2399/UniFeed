"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { LongPressButton } from "@/components/ui/LongPressButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { CapacityBar } from "./CapacityBar";

import { api } from "@/trpc/react";
import type { RouterOutputs } from "@/trpc/react";
import { Calendar, MapPin, Pin, PinOff } from "lucide-react";

import { formatEventDateMeta } from "./event-card.utils";
import {
  formatDiscussionAuthorName,
  sortDiscussionThreads,
} from "./discussion-board.utils";

type EventFeedItem = RouterOutputs["event"]["getFeed"][number];

type RegisterState = "IDLE" | "LOCKING" | "SECURED" | "ERROR";

export function EventCard({ event }: { event: EventFeedItem }) {
  const utils = api.useUtils();

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "discussions">("overview");
  const [questionDraft, setQuestionDraft] = useState("");
  const [replyDraftByThread, setReplyDraftByThread] = useState<Record<number, string>>({});
  const [registerState, setRegisterState] = useState<RegisterState>("IDLE");
  const eventHashId = `event-${event.id}`;

  const {
    data: discussionThreads,
    isLoading: isDiscussionLoading,
    isError: isDiscussionError,
    error: discussionError,
    refetch: refetchDiscussions,
  } = api.event.getDiscussionThreads.useQuery(
    { eventId: event.id },
    { enabled: isDetailsOpen },
  );

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

      utils.event.getDiscussionThreads.setData({ eventId: event.id }, (current) => {
        if (!current) {
          return current;
        }

        return sortDiscussionThreads(
          current.map((thread) =>
            thread.id === variables.threadId
              ? {
                  ...thread,
                  pinned: variables.pinned,
                }
              : thread,
          ),
        );
      });

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

  const orderedThreads = useMemo(() => {
    return sortDiscussionThreads(discussionThreads ?? []);
  }, [discussionThreads]);

  const { mutate: registerRsvp } = api.rsvp.register.useMutation({
    onMutate: () => {
      setRegisterState("LOCKING");
    },
    onSuccess: () => {
      setRegisterState("SECURED");
      toast.success("Successfully registered!");
    },
    onError: (err) => {
      setRegisterState("ERROR");
      if (err.data?.code === "PRECONDITION_FAILED" && err.message === "EVENT_FULL") {
        toast.error("Event is full!");
      } else if (err.data?.code === "CONFLICT" && err.message === "ALREADY_REGISTERED") {
        toast.error("You are already registered.");
      } else {
        toast.error(err.message || "Failed to register. Please try again.");
      }
      
      // Revert after a short delay
      setTimeout(() => setRegisterState("IDLE"), 3000);
    },
  });

  const handleRegister = () => {
    if (registerState === "IDLE" || registerState === "ERROR") {
      registerRsvp({ eventId: event.id });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === `#${eventHashId}`) {
        setIsDetailsOpen(true);
      }
    };
    
    // Check initial hash
    if (window.location.hash === `#${eventHashId}`) {
      setIsDetailsOpen(true);
    }
    
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [eventHashId]);

  const handleDrawerOpenChange = (open: boolean) => {
    setIsDetailsOpen(open);

    if (
      !open &&
      typeof window !== "undefined" &&
      window.location.hash === `#${eventHashId}`
    ) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
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

  return (
    <Drawer open={isDetailsOpen} onOpenChange={handleDrawerOpenChange}>
      <article id={eventHashId} className="w-full overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-sm transition-all duration-300 group hover:shadow-md">
        <DrawerTrigger asChild>
          <button
            type="button"
            aria-expanded={isDetailsOpen}
            className="relative block w-full bg-white text-left"
          >
            <div className="relative aspect-[21/9] w-full overflow-hidden bg-black/5">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 600px"
                priority={false}
              />
            </div>

            <div className="relative bg-white p-5">
              <h2 className="mb-1 line-clamp-2 text-[22px] font-bold leading-[1.2] tracking-tight text-gray-900">
                {event.title}
              </h2>

              <div className="mb-5 mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2.5 text-[14px] font-medium text-gray-600">
                  <Calendar className="h-4 w-4 shrink-0 text-blue-600" />
                  <span>{formatEventDateMeta(event.date)}</span>
                </div>
                <div className="flex items-center gap-2.5 text-[14px] text-gray-500">
                  <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>

              <div className="mt-2 w-full">
                <CapacityBar
                  eventId={event.id}
                  initialCount={event._count.rsvps}
                  totalCapacity={event.capacity}
                />
              </div>
            </div>
          </button>
        </DrawerTrigger>
      </article>

      <DrawerContent className="max-h-[88vh] rounded-t-[24px] border-[rgba(0,0,0,0.1)] bg-white">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-[22px] font-bold tracking-tight text-black/95">
            {event.title}
          </DrawerTitle>
          <DrawerDescription className="text-[14px] font-medium text-[#615d59]">
            {formatEventDateMeta(event.date)} · {event.location}
          </DrawerDescription>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`rounded-full px-3 py-1.5 text-[12px] font-semibold tracking-[0.125px] transition-colors ${
                activeTab === "overview"
                  ? "bg-[#f2f9ff] text-[#097fe8]"
                  : "bg-black/5 text-[#615d59]"
              }`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("discussions")}
              className={`rounded-full px-3 py-1.5 text-[12px] font-semibold tracking-[0.125px] transition-colors ${
                activeTab === "discussions"
                  ? "bg-[#f2f9ff] text-[#097fe8]"
                  : "bg-black/5 text-[#615d59]"
              }`}
            >
              Discussions
            </button>
          </div>
        </DrawerHeader>

        <div className="space-y-4 overflow-y-auto px-4 pb-6">
          {activeTab === "overview" ? (
            <>
              <p className="rounded-[14px] border border-black/5 bg-[#f6f5f4] px-4 py-3 text-[14px] leading-relaxed text-[#4f4a45]">
                {event.description || "No description provided."}
              </p>

              <footer className="mt-3 flex items-center justify-end">
                <LongPressButton
                  onComplete={() => handleRegister()}
                  disabled={registerState === "LOCKING" || registerState === "SECURED"}
                  className="flex h-12 w-full items-center justify-center whitespace-nowrap rounded-xl bg-blue-600 px-8 text-[15px] font-semibold text-white transition-all hover:bg-blue-700 active:scale-95 disabled:bg-gray-100 disabled:text-gray-400 sm:w-auto"
                >
                  {registerState === "IDLE" || registerState === "ERROR" ? (
                    "Reserve Spot"
                  ) : registerState === "LOCKING" ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Locking...
                    </span>
                  ) : (
                    "Secured"
                  )}
                </LongPressButton>
              </footer>
            </>
          ) : (
            <>
              <Card className="border-[rgba(0,0,0,0.08)] shadow-none">
                <CardContent className="space-y-3 p-4">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#8a847d]">
                    Ask a question
                  </p>
                  <Textarea
                    value={questionDraft}
                    onChange={(event) => setQuestionDraft(event.target.value)}
                    placeholder="Ask organizers anything about this event"
                    className="min-h-[96px]"
                    maxLength={600}
                  />
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      size="sm"
                      onClick={handlePostQuestion}
                      disabled={createQuestion.isPending || questionDraft.trim().length < 8}
                    >
                      {createQuestion.isPending ? "Posting..." : "Post question"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {isDiscussionLoading ? (
                <div className="rounded-[14px] border border-black/10 bg-[#f6f5f4] px-4 py-3 text-[14px] text-[#615d59]">
                  Loading discussions...
                </div>
              ) : isDiscussionError ? (
                <div className="rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
                  <p>{discussionErrorMessage}</p>
                  <div className="mt-2">
                    <Button type="button" size="sm" variant="outline" onClick={() => void refetchDiscussions()}>
                      Retry
                    </Button>
                  </div>
                </div>
              ) : orderedThreads.length === 0 ? (
                <div className="rounded-[14px] border border-black/10 bg-[#f6f5f4] px-4 py-3 text-[14px] text-[#615d59]">
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
                    <Card key={thread.id} className="border-[rgba(0,0,0,0.1)] shadow-none">
                      <CardContent className="space-y-3 p-4">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-[14px] font-semibold text-black/90">
                                {thread.question}
                              </p>
                              {thread.pinned ? <Badge>Pinned</Badge> : null}
                            </div>
                            <p className="text-[12px] text-[#7a746d]">
                              Asked by {formatDiscussionAuthorName(thread.author.displayName, null)}
                            </p>
                          </div>

                          {thread.canManagePin ? (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              disabled={isPinPending}
                              onClick={() =>
                                togglePin.mutate({
                                  threadId: thread.id,
                                  pinned: !thread.pinned,
                                })
                              }
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

                        <div className="space-y-2 rounded-[12px] bg-[#f6f5f4] p-3">
                          {thread.replies.length === 0 ? (
                            <p className="text-[12px] text-[#8a847d]">No organizer reply yet.</p>
                          ) : (
                            thread.replies.map((reply) => (
                              <div
                                key={reply.id}
                                className="rounded-[10px] border border-black/10 bg-white px-3 py-2"
                              >
                                <div className="mb-1 flex items-center gap-2">
                                  <p className="text-[12px] font-semibold text-black/90">
                                    {formatDiscussionAuthorName(reply.author.displayName, null)}
                                  </p>
                                  {reply.author.isOrganizer ? (
                                    <Badge>Organizer</Badge>
                                  ) : null}
                                </div>
                                <p className="text-[13px] leading-relaxed text-[#4f4a45]">
                                  {reply.message}
                                </p>
                              </div>
                            ))
                          )}
                        </div>

                        {thread.canManagePin ? (
                          <div className="space-y-2">
                            <Textarea
                              value={draftReply}
                              onChange={(event) =>
                                setReplyDraftByThread((current) => ({
                                  ...current,
                                  [thread.id]: event.target.value,
                                }))
                              }
                              placeholder="Post an organizer clarification"
                              className="min-h-[80px]"
                              maxLength={800}
                            />
                            <div className="flex justify-end">
                              <Button
                                type="button"
                                size="sm"
                                onClick={() => handlePostReply(thread.id)}
                                disabled={isReplyPending || draftReply.trim().length < 3}
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
      </DrawerContent>
    </Drawer>
  );
}