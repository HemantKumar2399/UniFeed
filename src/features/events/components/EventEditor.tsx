"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";
import type { EventStatus } from "@prisma/client";
import { ArrowLeft, ImageIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { api } from "@/trpc/react";
import { ImageUploader } from "@/components/ui/ImageUploader";

import type { CreateEventInput } from "./CreateEventSchema";
import { CreateEventSchema } from "./CreateEventSchema";
import {
  EVENT_CATEGORY_OPTIONS,
  EVENT_DOMAIN_OPTIONS,
  EVENT_TAG_SUGGESTIONS,
  TARGET_BRANCH_SUGGESTIONS,
} from "../event-metadata";
import {
  buildEventPayload,
  createEmptyEventEditorDraft,
  type EventEditorDraft,
} from "../event-editor.utils";

type EventEditorProps = {
  mode: "create" | "edit";
  eventId?: number;
  initialDraft?: EventEditorDraft;
  eventStatus?: EventStatus;
  submittedAt?: string | null;
  latestRejectionReason?: string | null;
  cancellationReason?: string | null;
};

type FieldErrors = Partial<Record<keyof CreateEventInput | "form", string>>;

function getStatusMessage(status: EventStatus | undefined) {
  switch (status) {
    case "REJECTED":
      return "Update the draft, fix the admin feedback, and resubmit when ready.";
    case "SUBMITTED":
      return "This event is locked while college admin review is in progress.";
    case "APPROVED":
      return "This event is approved. You can publish it or extend registration timing from the dashboard if needed.";
    case "PUBLISHED":
      return "Published events are read-only here. Use the dashboard to extend registration timing or cancel the event if plans change.";
    case "CANCELLED":
      return "Cancelled events remain visible as read-only history for organizers.";
    case "DRAFT":
      return "Draft changes stay private until you submit them for approval.";
    default:
      return "Draft your event with complete details before sending it for approval.";
  }
}

function mapValidationErrors(input: ReturnType<typeof CreateEventSchema.safeParse>): FieldErrors {
  if (input.success) {
    return {};
  }

  const errors: FieldErrors = {};

  for (const issue of input.error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && !(field in errors)) {
      errors[field as keyof CreateEventInput] = issue.message;
    }
  }

  return errors;
}

export function EventEditor({
  mode,
  eventId,
  initialDraft,
  eventStatus,
  submittedAt,
  latestRejectionReason,
  cancellationReason,
}: EventEditorProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const [draft, setDraft] = useState<EventEditorDraft>(initialDraft ?? createEmptyEventEditorDraft());
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isUploading, setIsUploading] = useState(false);
  const [cancelReason, setCancelReason] = useState(cancellationReason ?? "");

  const { data: managedClubs, isLoading: isLoadingManagedClubs } = api.club.getMyManagedClubs.useQuery();

  const createEvent = api.event.create.useMutation();
  const updateEvent = api.event.update.useMutation();
  const submitForReview = api.event.submitForReview.useMutation();
  const publishApproved = api.event.publishApproved.useMutation();
  const cancelEvent = api.event.cancel.useMutation();

  const activeStatus = mode === "create" ? "DRAFT" : eventStatus;
  const isEditable = mode === "create" || activeStatus === "DRAFT" || activeStatus === "REJECTED";
  const hasManagedClubs = (managedClubs?.length ?? 0) > 0;
  const isBusy =
    createEvent.isPending ||
    updateEvent.isPending ||
    submitForReview.isPending ||
    publishApproved.isPending ||
    cancelEvent.isPending ||
    isUploading;

  const clearFieldError = (field: keyof CreateEventInput | "form") => {
    setFieldErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const setDraftValue = <K extends keyof EventEditorDraft>(key: K, value: EventEditorDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const handleTextChange =
    <K extends keyof EventEditorDraft>(key: K) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      clearFieldError(key as keyof CreateEventInput);
      setDraftValue(key, event.target.value as EventEditorDraft[K]);
    };

  const handleCheckboxChange =
    (key: "isFreeFood" | "hasCertificate" | "isPaid") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setDraftValue(key, event.target.checked);
    };

  const invalidateViews = async () => {
    await Promise.all([
      utils.event.getOrganizerDrafts.invalidate(),
      utils.admin.getPendingEvents.invalidate(),
    ]);
  };

  const validateDraft = () => {
    const parsed = CreateEventSchema.safeParse(buildEventPayload(draft));
    const nextErrors = mapValidationErrors(parsed);
    setFieldErrors(nextErrors);

    if (!parsed.success) {
      toast.error("Fix the highlighted fields before continuing.");
      return null;
    }

    return parsed.data;
  };



  const saveDraft = async (shouldSubmitAfterSave: boolean) => {
    if (!hasManagedClubs) {
      toast.error("You need at least one managed community before creating events.");
      return;
    }

    const payload = validateDraft();
    if (!payload) {
      return;
    }

    try {
      const savedEvent =
        mode === "create"
          ? await createEvent.mutateAsync(payload)
          : await updateEvent.mutateAsync({
              id: eventId ?? 0,
              data: payload,
            });

      if (shouldSubmitAfterSave) {
        await submitForReview.mutateAsync({ id: savedEvent.id });
        toast.success(mode === "create" ? "Draft created and submitted for review." : "Changes saved and submitted for review.");
      } else {
        toast.success(mode === "create" ? "Draft saved successfully." : "Draft changes saved.");
      }

      await invalidateViews();
      router.push("/dashboard/events");
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "We could not save this event.";
      setFieldErrors((current) => ({ ...current, form: message }));
      toast.error(message);
    }
  };

  const handlePublish = async () => {
    if (!eventId) {
      return;
    }

    try {
      await publishApproved.mutateAsync({ id: eventId });
      toast.success("Approved event is now live for students.");
      await invalidateViews();
      router.push("/dashboard/events");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Publishing failed.");
    }
  };

  const handleCancel = async () => {
    if (!eventId) {
      return;
    }

    if (cancelReason.trim().length < 10) {
      toast.error("Add a cancellation reason with at least 10 characters.");
      return;
    }

    try {
      await cancelEvent.mutateAsync({
        id: eventId,
        reason: cancelReason.trim(),
      });
      toast.success("Event cancelled.");
      await invalidateViews();
      router.push("/dashboard/events");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Cancellation failed.");
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 pb-32 md:pb-12">
      <header className="px-1 md:px-0">
        <Link
          href="/dashboard/events"
          className="mb-4 inline-flex w-fit items-center gap-2 text-[14px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Link>
        <h1 className="mb-2 text-[32px] font-bold leading-[1.1] tracking-[-1.2px] text-foreground md:text-[40px]">
          {mode === "create" ? "Create New Event" : "Edit Event"}
        </h1>
        <p className="text-[16px] font-medium leading-relaxed text-muted-foreground">
          {getStatusMessage(activeStatus)}
        </p>
      </header>

      {activeStatus ? (
        <section className="rounded-[20px] border border-whisper bg-card-bg px-5 py-4 shadow-sm transition-colors duration-300">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-pill bg-app-bg px-3 py-1 text-xs font-semibold uppercase tracking-badge text-foreground transition-colors">
              {activeStatus}
            </span>
            {submittedAt ? (
              <span className="text-sm text-muted-foreground">
                Submitted on {new Date(submittedAt).toLocaleString("en-IN")}
              </span>
            ) : null}
          </div>
          {latestRejectionReason ? (
            <p className="mt-3 rounded-[14px] border border-whisper bg-app-bg px-4 py-3 text-sm text-muted-foreground transition-colors">
              <span className="font-semibold text-foreground">Admin feedback:</span> {latestRejectionReason}
            </p>
          ) : null}
          {cancellationReason ? (
            <p className="mt-3 rounded-[14px] border border-whisper bg-app-bg px-4 py-3 text-sm text-muted-foreground transition-colors">
              <span className="font-semibold text-foreground">Cancellation reason:</span> {cancellationReason}
            </p>
          ) : null}
        </section>
      ) : null}

      <div aria-live="polite" className="sr-only">
        {isUploading ? "Uploading event image." : ""}
        {createEvent.isPending || updateEvent.isPending ? "Saving event draft." : ""}
        {submitForReview.isPending ? "Submitting event for review." : ""}
        {publishApproved.isPending ? "Publishing event." : ""}
        {cancelEvent.isPending ? "Cancelling event." : ""}
      </div>

      <form className="flex flex-col gap-5 px-1 md:px-0" onSubmit={(event) => event.preventDefault()}>
        <section className="rounded-[20px] border border-input bg-card-bg px-5 py-5 shadow-sm transition-colors duration-300">
          <label htmlFor="clubId" className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/80">
            Community
          </label>
          <select
            id="clubId"
            value={draft.clubId}
            onChange={handleTextChange("clubId")}
            disabled={!isEditable || isLoadingManagedClubs || !hasManagedClubs}
            className="h-12 w-full rounded-[14px] border border-input bg-card-bg px-4 text-[15px] font-medium text-foreground outline-none transition-colors focus-visible:border-[var(--color-focus-blue)] disabled:cursor-not-allowed disabled:bg-muted"
          >
            <option value="">
              {isLoadingManagedClubs ? "Loading your communities..." : "Select a community"}
            </option>
            {(managedClubs ?? []).map((club) => (
              <option key={club.id} value={club.id}>
                {club.name} ({(club.role ?? "EDITOR").toLowerCase()})
              </option>
            ))}
          </select>
          {fieldErrors.clubId ? <p className="mt-2 text-sm font-medium text-red-600">{fieldErrors.clubId}</p> : null}
          {!isLoadingManagedClubs && !hasManagedClubs ? (
            <p className="mt-3 rounded-[14px] border border-input bg-muted px-4 py-3 text-[14px] leading-relaxed text-muted-foreground transition-colors">
              You do not manage any community yet. Ask your college admin to assign you to a club before creating events.
            </p>
          ) : null}
        </section>

        <section className="rounded-[20px] border border-input bg-card-bg px-5 py-5 shadow-sm transition-colors duration-300">
          <label htmlFor="title" className="sr-only">Event title</label>
          <input
            id="title"
            value={draft.title}
            onChange={handleTextChange("title")}
            disabled={!isEditable}
            type="text"
            placeholder="Event Title"
            className="w-full border-none bg-transparent text-[30px] font-bold tracking-[-1px] text-foreground outline-none placeholder:text-muted-foreground/50 disabled:cursor-not-allowed md:text-[38px]"
          />
          {fieldErrors.title ? <p className="mt-2 text-sm font-medium text-red-600">{fieldErrors.title}</p> : null}
          <label htmlFor="description" className="sr-only">Event description</label>
          <textarea
            id="description"
            value={draft.description}
            onChange={handleTextChange("description")}
            disabled={!isEditable}
            placeholder="Write your event description..."
            className="mt-4 min-h-[160px] w-full resize-none border-none bg-transparent text-[17px] leading-relaxed text-muted-foreground outline-none placeholder:text-muted-foreground/50 disabled:cursor-not-allowed"
          />
          {fieldErrors.description ? <p className="mt-2 text-sm font-medium text-red-600">{fieldErrors.description}</p> : null}
        </section>

        <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <label className="flex flex-col gap-2 rounded-[16px] border border-input bg-card-bg px-3 py-3 shadow-sm transition-colors">
            <span className="text-xs font-semibold uppercase tracking-badge text-muted-foreground/80">Date</span>
            <input
              value={draft.date}
              onChange={handleTextChange("date")}
              disabled={!isEditable}
              type="date"
              className="w-full bg-transparent text-[15px] font-semibold text-foreground outline-none disabled:cursor-not-allowed"
            />
          </label>

          <label className="flex flex-col gap-2 rounded-[16px] border border-input bg-card-bg px-3 py-3 shadow-sm transition-colors">
            <span className="text-xs font-semibold uppercase tracking-badge text-muted-foreground/80">Time</span>
            <input
              value={draft.time}
              onChange={handleTextChange("time")}
              disabled={!isEditable}
              type="time"
              className="w-full bg-transparent text-[15px] font-semibold text-foreground outline-none disabled:cursor-not-allowed"
            />
          </label>
          {fieldErrors.date ? <p className="md:col-span-2 text-sm font-medium text-red-600">{fieldErrors.date}</p> : null}

          <label className="flex flex-col gap-2 rounded-[16px] border border-input bg-card-bg px-3 py-3 shadow-sm transition-colors">
            <span className="text-xs font-semibold uppercase tracking-badge text-muted-foreground/80">Registration Closes On</span>
            <input
              value={draft.registrationCloseDate}
              onChange={handleTextChange("registrationCloseDate")}
              disabled={!isEditable}
              type="date"
              className="w-full bg-transparent text-[15px] font-semibold text-foreground outline-none disabled:cursor-not-allowed"
            />
          </label>

          <label className="flex flex-col gap-2 rounded-[16px] border border-input bg-card-bg px-3 py-3 shadow-sm transition-colors">
            <span className="text-xs font-semibold uppercase tracking-badge text-muted-foreground/80">Registration Close Time</span>
            <input
              value={draft.registrationCloseTime}
              onChange={handleTextChange("registrationCloseTime")}
              disabled={!isEditable}
              type="time"
              className="w-full bg-transparent text-[15px] font-semibold text-foreground outline-none disabled:cursor-not-allowed"
            />
          </label>
          <div className="md:col-span-2 rounded-[16px] border border-dashed border-input bg-app-bg px-4 py-3 text-[13px] leading-relaxed text-muted-foreground transition-colors">
            Students will only be able to register before this deadline, and it must be earlier than the event start time.
          </div>
          {fieldErrors.registrationClosesAt ? (
            <p className="md:col-span-2 text-sm font-medium text-red-600">{fieldErrors.registrationClosesAt}</p>
          ) : null}

          <label className="md:col-span-2 flex flex-col gap-2 rounded-[16px] border border-input bg-card-bg px-3 py-3 shadow-sm transition-colors">
            <span className="text-xs font-semibold uppercase tracking-badge text-muted-foreground/80">Location</span>
            <input
              value={draft.location}
              onChange={handleTextChange("location")}
              disabled={!isEditable}
              type="text"
              placeholder="Building 4, Room 101"
              className="w-full bg-transparent text-[15px] font-semibold text-foreground outline-none placeholder:text-muted-foreground/50 disabled:cursor-not-allowed"
            />
          </label>
          {fieldErrors.location ? <p className="md:col-span-2 text-sm font-medium text-red-600">{fieldErrors.location}</p> : null}

          <label className="md:col-span-2 flex flex-col gap-2 rounded-[16px] border border-input bg-card-bg px-3 py-3 shadow-sm transition-colors">
            <span className="text-xs font-semibold uppercase tracking-badge text-muted-foreground/80">Capacity</span>
            <input
              value={draft.capacity}
              onChange={handleTextChange("capacity")}
              disabled={!isEditable}
              type="number"
              min={1}
              placeholder="100"
              className="w-full bg-transparent text-[15px] font-semibold text-foreground outline-none placeholder:text-muted-foreground/50 disabled:cursor-not-allowed"
            />
          </label>
          {fieldErrors.capacity ? <p className="md:col-span-2 text-sm font-medium text-red-600">{fieldErrors.capacity}</p> : null}
        </section>

        <section className="grid grid-cols-1 gap-4 rounded-[20px] border border-input bg-card-bg px-5 py-5 shadow-sm md:grid-cols-2 transition-colors duration-300">
          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-sm font-semibold text-foreground">Category</label>
            <select
              id="category"
              value={draft.category}
              onChange={handleTextChange("category")}
              disabled={!isEditable}
              className="h-12 rounded-[14px] border border-input bg-card-bg px-4 text-[15px] font-medium text-foreground outline-none transition-colors focus-visible:border-[var(--color-focus-blue)] disabled:cursor-not-allowed disabled:bg-muted"
            >
              <option value="">Select a category</option>
              {EVENT_CATEGORY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {fieldErrors.category ? <p className="text-sm font-medium text-red-600">{fieldErrors.category}</p> : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="domain" className="text-sm font-semibold text-foreground">Audience Domain</label>
            <select
              id="domain"
              value={draft.domain}
              onChange={handleTextChange("domain")}
              disabled={!isEditable}
              className="h-12 rounded-[14px] border border-input bg-card-bg px-4 text-[15px] font-medium text-foreground outline-none transition-colors focus-visible:border-[var(--color-focus-blue)] disabled:cursor-not-allowed disabled:bg-muted"
            >
              <option value="">Select a domain</option>
              {EVENT_DOMAIN_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {fieldErrors.domain ? <p className="text-sm font-medium text-red-600">{fieldErrors.domain}</p> : null}
          </div>

          <div className="md:col-span-2 flex flex-col gap-2">
            <label htmlFor="tags" className="text-sm font-semibold text-foreground">Tags</label>
            <input
              id="tags"
              value={draft.tags}
              onChange={handleTextChange("tags")}
              disabled={!isEditable}
              type="text"
              placeholder="coding, workshop, networking"
              className="h-12 rounded-[14px] border border-input bg-card-bg px-4 text-[15px] font-medium text-foreground outline-none placeholder:text-muted-foreground/50 transition-colors focus-visible:border-[var(--color-focus-blue)] disabled:cursor-not-allowed disabled:bg-muted"
            />
            <p className="text-xs text-muted-foreground">Suggested tags: {EVENT_TAG_SUGGESTIONS.join(", ")}</p>
            {fieldErrors.tags ? <p className="text-sm font-medium text-red-600">{fieldErrors.tags}</p> : null}
          </div>

          <div className="md:col-span-2 flex flex-col gap-2">
            <label htmlFor="targetBranches" className="text-sm font-semibold text-foreground">Target Branches (Optional)</label>
            <input
              id="targetBranches"
              value={draft.targetBranches}
              onChange={handleTextChange("targetBranches")}
              disabled={!isEditable}
              type="text"
              placeholder="Computer Science, Information Technology"
              className="h-12 rounded-[14px] border border-input bg-card-bg px-4 text-[15px] font-medium text-foreground outline-none placeholder:text-muted-foreground/50 transition-colors focus-visible:border-[var(--color-focus-blue)] disabled:cursor-not-allowed disabled:bg-muted"
            />
            <p className="text-xs text-muted-foreground">Suggested branches: {TARGET_BRANCH_SUGGESTIONS.join(", ")}</p>
            {fieldErrors.targetBranches ? <p className="text-sm font-medium text-red-600">{fieldErrors.targetBranches}</p> : null}
          </div>

          <div className="md:col-span-2 grid grid-cols-1 gap-3 md:grid-cols-3">
            <label className="flex min-h-[44px] items-center gap-3 rounded-[16px] border border-input bg-app-bg px-4 py-3 text-sm font-medium text-foreground transition-colors">
              <input
                checked={draft.isFreeFood}
                onChange={handleCheckboxChange("isFreeFood")}
                disabled={!isEditable}
                type="checkbox"
                className="h-4 w-4 accent-[var(--color-notion-blue)]"
              />
              Free food available
            </label>
            <label className="flex min-h-[44px] items-center gap-3 rounded-[16px] border border-input bg-app-bg px-4 py-3 text-sm font-medium text-foreground transition-colors">
              <input
                checked={draft.hasCertificate}
                onChange={handleCheckboxChange("hasCertificate")}
                disabled={!isEditable}
                type="checkbox"
                className="h-4 w-4 accent-[var(--color-notion-blue)]"
              />
              Certificate included
            </label>
            <label className="flex min-h-[44px] items-center gap-3 rounded-[16px] border border-input bg-app-bg px-4 py-3 text-sm font-medium text-foreground transition-colors">
              <input
                checked={draft.isPaid}
                onChange={handleCheckboxChange("isPaid")}
                disabled={!isEditable}
                type="checkbox"
                className="h-4 w-4 accent-[var(--color-notion-blue)]"
              />
              Paid entry
            </label>
          </div>
        </section>

        <section className="rounded-[20px] border border-input bg-card-bg px-5 py-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <ImageIcon className="h-4 w-4" />
            Event Cover
          </div>
          <div className="mt-4">
            <ImageUploader
              value={draft.imageUrl}
              onChange={(url) => {
                setDraftValue("imageUrl", url);
                clearFieldError("imageUrl");
              }}
              onUploadStateChange={setIsUploading}
              disabled={!isEditable}
              label="Upload image"
            />
            {fieldErrors.imageUrl ? <p className="text-sm font-medium text-red-600 mt-2">{fieldErrors.imageUrl}</p> : null}
          </div>
          {draft.imageUrl ? (
            <div className="mt-4 overflow-hidden rounded-[16px] border border-whisper bg-app-bg transition-colors">
              <div
                aria-label="Event cover preview"
                role="img"
                className="h-56 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${draft.imageUrl})` }}
              />
            </div>
          ) : null}
        </section>

        {fieldErrors.form ? (
          <p className="rounded-[16px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {fieldErrors.form}
          </p>
        ) : null}

        <div className="sticky bottom-6 z-10 mt-2 flex flex-wrap items-center justify-end gap-3 rounded-[18px] border border-whisper bg-card-bg/90 p-3 backdrop-blur-xl shadow-card transition-colors duration-300">
          {isEditable ? (
            <>
              <button
                type="button"
                onClick={() => void saveDraft(false)}
                disabled={isBusy || !hasManagedClubs}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-[12px] border border-input bg-card-bg px-5 py-3 text-[15px] font-semibold text-foreground transition-all hover:bg-muted disabled:opacity-60"
              >
                {createEvent.isPending || updateEvent.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {mode === "create" ? "Save Draft" : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => void saveDraft(true)}
                disabled={isBusy || !hasManagedClubs}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-[12px] bg-notion-blue px-5 py-3 text-[15px] font-semibold text-white transition-all hover:bg-[var(--color-notion-blue-hover)] disabled:opacity-60"
              >
                {submitForReview.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {mode === "create"
                  ? "Submit for Approval"
                  : activeStatus === "REJECTED"
                    ? "Resubmit for Approval"
                    : "Submit for Approval"}
              </button>
            </>
          ) : null}

          {activeStatus === "APPROVED" && eventId ? (
            <button
              type="button"
              onClick={() => void handlePublish()}
              disabled={isBusy}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-[12px] bg-notion-blue px-5 py-3 text-[15px] font-semibold text-white transition-all hover:bg-[var(--color-notion-blue-hover)] disabled:opacity-60"
            >
              {publishApproved.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Publish Event
            </button>
          ) : null}

          {activeStatus === "PUBLISHED" && eventId ? (
            <div className="flex w-full flex-col gap-3 md:w-auto md:min-w-[360px]">
              <textarea
                value={cancelReason}
                onChange={(event) => setCancelReason(event.target.value)}
                rows={3}
                placeholder="Explain why this event is being cancelled."
                className="w-full rounded-[14px] border border-input bg-card-bg px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus-visible:border-[var(--color-focus-blue)]"
              />
              <button
                type="button"
                onClick={() => void handleCancel()}
                disabled={isBusy}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[12px] border border-red-200 bg-red-50 px-5 py-3 text-[15px] font-semibold text-red-700 transition-all hover:bg-red-100 disabled:opacity-60"
              >
                {cancelEvent.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Cancel Event
              </button>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}
