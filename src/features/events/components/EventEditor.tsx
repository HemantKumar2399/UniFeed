"use client";
import { formatPlatformDate, PLATFORM_TIME_ZONE } from "@/lib/platform-date";

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

function mapValidationErrors(
  input: ReturnType<typeof CreateEventSchema.safeParse>,
): FieldErrors {
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
  const [draft, setDraft] = useState<EventEditorDraft>(
    initialDraft ?? createEmptyEventEditorDraft(),
  );
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isUploading, setIsUploading] = useState(false);
  const [cancelReason, setCancelReason] = useState(cancellationReason ?? "");

  const { data: managedClubs, isLoading: isLoadingManagedClubs } =
    api.club.getMyManagedClubs.useQuery();

  const createEvent = api.event.create.useMutation();
  const updateEvent = api.event.update.useMutation();
  const submitForReview = api.event.submitForReview.useMutation();
  const publishApproved = api.event.publishApproved.useMutation();
  const cancelEvent = api.event.cancel.useMutation();

  const activeStatus = mode === "create" ? "DRAFT" : eventStatus;
  const isEditable =
    mode === "create" ||
    activeStatus === "DRAFT" ||
    activeStatus === "REJECTED";
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

  const setDraftValue = <K extends keyof EventEditorDraft>(
    key: K,
    value: EventEditorDraft[K],
  ) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const handleTextChange =
    <K extends keyof EventEditorDraft>(key: K) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
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
    const payload = buildEventPayload(draft);
    const parsed = CreateEventSchema.safeParse(payload);
    const nextErrors = mapValidationErrors(parsed);
    if (Number.isNaN(payload.date.getTime())) {
      nextErrors.date = `Choose a valid, unambiguous date and time in ${PLATFORM_TIME_ZONE}. Avoid daylight-saving clock changes.`;
    }
    if (Number.isNaN(payload.registrationClosesAt.getTime())) {
      nextErrors.registrationClosesAt = `Choose a valid, unambiguous deadline in ${PLATFORM_TIME_ZONE}. Avoid daylight-saving clock changes.`;
    }
    setFieldErrors(nextErrors);

    if (!parsed.success) {
      toast.error("Fix the highlighted fields before continuing.");
      return null;
    }

    return parsed.data;
  };

  const saveDraft = async (shouldSubmitAfterSave: boolean) => {
    if (!hasManagedClubs) {
      toast.error(
        "You need at least one managed community before creating events.",
      );
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
        toast.success(
          mode === "create"
            ? "Draft created and submitted for review."
            : "Changes saved and submitted for review.",
        );
      } else {
        toast.success(
          mode === "create"
            ? "Draft saved successfully."
            : "Draft changes saved.",
        );
      }

      await invalidateViews();
      router.push("/dashboard/events");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "We could not save this event.";
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
      toast.error(
        error instanceof Error ? error.message : "Publishing failed.",
      );
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
      toast.error(
        error instanceof Error ? error.message : "Cancellation failed.",
      );
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 pb-32 md:pb-12">
      <header className="px-1 md:px-0">
        <Link
          href="/dashboard/events"
          className="text-muted-foreground hover:text-foreground mb-4 inline-flex w-fit items-center gap-2 text-[14px] font-semibold transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Link>
        <h1 className="text-foreground mb-2 text-[32px] leading-[1.1] font-bold tracking-[-1.2px] md:text-[40px]">
          {mode === "create" ? "Create New Event" : "Edit Event"}
        </h1>
        <p className="text-muted-foreground text-[16px] leading-relaxed font-medium">
          {getStatusMessage(activeStatus)} All times in {PLATFORM_TIME_ZONE}.
        </p>
      </header>

      {activeStatus ? (
        <section className="border-whisper bg-card-bg rounded-[20px] border px-5 py-4 shadow-sm transition-colors duration-300">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-pill bg-app-bg tracking-badge text-foreground px-3 py-1 text-xs font-semibold uppercase transition-colors">
              {activeStatus}
            </span>
            {submittedAt ? (
              <span className="text-muted-foreground text-sm">
                Submitted on{" "}
                {formatPlatformDate(submittedAt, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            ) : null}
          </div>
          {latestRejectionReason ? (
            <p className="border-whisper bg-app-bg text-muted-foreground mt-3 rounded-[14px] border px-4 py-3 text-sm transition-colors">
              <span className="text-foreground font-semibold">
                Admin feedback:
              </span>{" "}
              {latestRejectionReason}
            </p>
          ) : null}
          {cancellationReason ? (
            <p className="border-whisper bg-app-bg text-muted-foreground mt-3 rounded-[14px] border px-4 py-3 text-sm transition-colors">
              <span className="text-foreground font-semibold">
                Cancellation reason:
              </span>{" "}
              {cancellationReason}
            </p>
          ) : null}
        </section>
      ) : null}

      <div aria-live="polite" className="sr-only">
        {isUploading ? "Uploading event image." : ""}
        {createEvent.isPending || updateEvent.isPending
          ? "Saving event draft."
          : ""}
        {submitForReview.isPending ? "Submitting event for review." : ""}
        {publishApproved.isPending ? "Publishing event." : ""}
        {cancelEvent.isPending ? "Cancelling event." : ""}
      </div>

      <form
        className="flex flex-col gap-5 px-1 md:px-0"
        onSubmit={(event) => event.preventDefault()}
      >
        <section className="border-input bg-card-bg rounded-[20px] border px-5 py-5 shadow-sm transition-colors duration-300">
          <label
            htmlFor="clubId"
            className="text-muted-foreground/80 mb-2 block text-[13px] font-semibold tracking-[0.12em] uppercase"
          >
            Community
          </label>
          <select
            id="clubId"
            value={draft.clubId}
            onChange={handleTextChange("clubId")}
            disabled={!isEditable || isLoadingManagedClubs || !hasManagedClubs}
            className="border-input bg-card-bg text-foreground disabled:bg-muted h-12 w-full rounded-[14px] border px-4 text-[15px] font-medium transition-colors outline-none focus-visible:border-[var(--color-focus-blue)] disabled:cursor-not-allowed"
          >
            <option value="">
              {isLoadingManagedClubs
                ? "Loading your communities..."
                : "Select a community"}
            </option>
            {(managedClubs ?? []).map((club) => (
              <option key={club.id} value={club.id}>
                {club.name} ({(club.role ?? "EDITOR").toLowerCase()})
              </option>
            ))}
          </select>
          {fieldErrors.clubId ? (
            <p className="mt-2 text-sm font-medium text-red-600">
              {fieldErrors.clubId}
            </p>
          ) : null}
          {!isLoadingManagedClubs && !hasManagedClubs ? (
            <p className="border-input bg-muted text-muted-foreground mt-3 rounded-[14px] border px-4 py-3 text-[14px] leading-relaxed transition-colors">
              You do not manage any community yet. Ask your college admin to
              assign you to a club before creating events.
            </p>
          ) : null}
        </section>

        <section className="border-input bg-card-bg rounded-[20px] border px-5 py-5 shadow-sm transition-colors duration-300">
          <label htmlFor="title" className="sr-only">
            Event title
          </label>
          <input
            id="title"
            value={draft.title}
            onChange={handleTextChange("title")}
            disabled={!isEditable}
            type="text"
            placeholder="Event Title"
            className="text-foreground placeholder:text-muted-foreground/50 w-full border-none bg-transparent text-[30px] font-bold tracking-[-1px] outline-none disabled:cursor-not-allowed md:text-[38px]"
          />
          {fieldErrors.title ? (
            <p className="mt-2 text-sm font-medium text-red-600">
              {fieldErrors.title}
            </p>
          ) : null}
          <label htmlFor="description" className="sr-only">
            Event description
          </label>
          <textarea
            id="description"
            value={draft.description}
            onChange={handleTextChange("description")}
            disabled={!isEditable}
            placeholder="Write your event description..."
            className="text-muted-foreground placeholder:text-muted-foreground/50 mt-4 min-h-[160px] w-full resize-none border-none bg-transparent text-[17px] leading-relaxed outline-none disabled:cursor-not-allowed"
          />
          {fieldErrors.description ? (
            <p className="mt-2 text-sm font-medium text-red-600">
              {fieldErrors.description}
            </p>
          ) : null}
        </section>

        <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <label className="border-input bg-card-bg flex flex-col gap-2 rounded-[16px] border px-3 py-3 shadow-sm transition-colors">
            <span className="tracking-badge text-muted-foreground/80 text-xs font-semibold uppercase">
              Date
            </span>
            <input
              value={draft.date}
              onChange={handleTextChange("date")}
              disabled={!isEditable}
              type="date"
              className="text-foreground w-full bg-transparent text-[15px] font-semibold outline-none disabled:cursor-not-allowed"
            />
          </label>

          <label className="border-input bg-card-bg flex flex-col gap-2 rounded-[16px] border px-3 py-3 shadow-sm transition-colors">
            <span className="tracking-badge text-muted-foreground/80 text-xs font-semibold uppercase">
              Time
            </span>
            <input
              value={draft.time}
              onChange={handleTextChange("time")}
              disabled={!isEditable}
              type="time"
              className="text-foreground w-full bg-transparent text-[15px] font-semibold outline-none disabled:cursor-not-allowed"
            />
          </label>
          {fieldErrors.date ? (
            <p className="text-sm font-medium text-red-600 md:col-span-2">
              {fieldErrors.date}
            </p>
          ) : null}

          <label className="border-input bg-card-bg flex flex-col gap-2 rounded-[16px] border px-3 py-3 shadow-sm transition-colors">
            <span className="tracking-badge text-muted-foreground/80 text-xs font-semibold uppercase">
              Registration Closes On
            </span>
            <input
              value={draft.registrationCloseDate}
              onChange={handleTextChange("registrationCloseDate")}
              disabled={!isEditable}
              type="date"
              className="text-foreground w-full bg-transparent text-[15px] font-semibold outline-none disabled:cursor-not-allowed"
            />
          </label>

          <label className="border-input bg-card-bg flex flex-col gap-2 rounded-[16px] border px-3 py-3 shadow-sm transition-colors">
            <span className="tracking-badge text-muted-foreground/80 text-xs font-semibold uppercase">
              Registration Close Time
            </span>
            <input
              value={draft.registrationCloseTime}
              onChange={handleTextChange("registrationCloseTime")}
              disabled={!isEditable}
              type="time"
              className="text-foreground w-full bg-transparent text-[15px] font-semibold outline-none disabled:cursor-not-allowed"
            />
          </label>
          <div className="border-input bg-app-bg text-muted-foreground rounded-[16px] border border-dashed px-4 py-3 text-[13px] leading-relaxed transition-colors md:col-span-2">
            Students will only be able to register before this deadline, and it
            must be earlier than the event start time.
          </div>
          {fieldErrors.registrationClosesAt ? (
            <p className="text-sm font-medium text-red-600 md:col-span-2">
              {fieldErrors.registrationClosesAt}
            </p>
          ) : null}

          <label className="border-input bg-card-bg flex flex-col gap-2 rounded-[16px] border px-3 py-3 shadow-sm transition-colors md:col-span-2">
            <span className="tracking-badge text-muted-foreground/80 text-xs font-semibold uppercase">
              Location
            </span>
            <input
              value={draft.location}
              onChange={handleTextChange("location")}
              disabled={!isEditable}
              type="text"
              placeholder="Building 4, Room 101"
              className="text-foreground placeholder:text-muted-foreground/50 w-full bg-transparent text-[15px] font-semibold outline-none disabled:cursor-not-allowed"
            />
          </label>
          {fieldErrors.location ? (
            <p className="text-sm font-medium text-red-600 md:col-span-2">
              {fieldErrors.location}
            </p>
          ) : null}

          <label className="border-input bg-card-bg flex flex-col gap-2 rounded-[16px] border px-3 py-3 shadow-sm transition-colors md:col-span-2">
            <span className="tracking-badge text-muted-foreground/80 text-xs font-semibold uppercase">
              Capacity
            </span>
            <input
              value={draft.capacity}
              onChange={handleTextChange("capacity")}
              disabled={!isEditable}
              type="number"
              min={1}
              placeholder="100"
              className="text-foreground placeholder:text-muted-foreground/50 w-full bg-transparent text-[15px] font-semibold outline-none disabled:cursor-not-allowed"
            />
          </label>
          {fieldErrors.capacity ? (
            <p className="text-sm font-medium text-red-600 md:col-span-2">
              {fieldErrors.capacity}
            </p>
          ) : null}
        </section>

        <section className="border-input bg-card-bg grid grid-cols-1 gap-4 rounded-[20px] border px-5 py-5 shadow-sm transition-colors duration-300 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="category"
              className="text-foreground text-sm font-semibold"
            >
              Category
            </label>
            <select
              id="category"
              value={draft.category}
              onChange={handleTextChange("category")}
              disabled={!isEditable}
              className="border-input bg-card-bg text-foreground disabled:bg-muted h-12 rounded-[14px] border px-4 text-[15px] font-medium transition-colors outline-none focus-visible:border-[var(--color-focus-blue)] disabled:cursor-not-allowed"
            >
              <option value="">Select a category</option>
              {EVENT_CATEGORY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {fieldErrors.category ? (
              <p className="text-sm font-medium text-red-600">
                {fieldErrors.category}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="domain"
              className="text-foreground text-sm font-semibold"
            >
              Audience Domain
            </label>
            <select
              id="domain"
              value={draft.domain}
              onChange={handleTextChange("domain")}
              disabled={!isEditable}
              className="border-input bg-card-bg text-foreground disabled:bg-muted h-12 rounded-[14px] border px-4 text-[15px] font-medium transition-colors outline-none focus-visible:border-[var(--color-focus-blue)] disabled:cursor-not-allowed"
            >
              <option value="">Select a domain</option>
              {EVENT_DOMAIN_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {fieldErrors.domain ? (
              <p className="text-sm font-medium text-red-600">
                {fieldErrors.domain}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label
              htmlFor="tags"
              className="text-foreground text-sm font-semibold"
            >
              Tags
            </label>
            <input
              id="tags"
              value={draft.tags}
              onChange={handleTextChange("tags")}
              disabled={!isEditable}
              type="text"
              placeholder="coding, workshop, networking"
              className="border-input bg-card-bg text-foreground placeholder:text-muted-foreground/50 disabled:bg-muted h-12 rounded-[14px] border px-4 text-[15px] font-medium transition-colors outline-none focus-visible:border-[var(--color-focus-blue)] disabled:cursor-not-allowed"
            />
            <p className="text-muted-foreground text-xs">
              Suggested tags: {EVENT_TAG_SUGGESTIONS.join(", ")}
            </p>
            {fieldErrors.tags ? (
              <p className="text-sm font-medium text-red-600">
                {fieldErrors.tags}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label
              htmlFor="targetBranches"
              className="text-foreground text-sm font-semibold"
            >
              Target Branches (Optional)
            </label>
            <input
              id="targetBranches"
              value={draft.targetBranches}
              onChange={handleTextChange("targetBranches")}
              disabled={!isEditable}
              type="text"
              placeholder="Computer Science, Information Technology"
              className="border-input bg-card-bg text-foreground placeholder:text-muted-foreground/50 disabled:bg-muted h-12 rounded-[14px] border px-4 text-[15px] font-medium transition-colors outline-none focus-visible:border-[var(--color-focus-blue)] disabled:cursor-not-allowed"
            />
            <p className="text-muted-foreground text-xs">
              Suggested branches: {TARGET_BRANCH_SUGGESTIONS.join(", ")}
            </p>
            {fieldErrors.targetBranches ? (
              <p className="text-sm font-medium text-red-600">
                {fieldErrors.targetBranches}
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-3 md:col-span-2 md:grid-cols-3">
            <label className="border-input bg-app-bg text-foreground flex min-h-[44px] items-center gap-3 rounded-[16px] border px-4 py-3 text-sm font-medium transition-colors">
              <input
                checked={draft.isFreeFood}
                onChange={handleCheckboxChange("isFreeFood")}
                disabled={!isEditable}
                type="checkbox"
                className="h-4 w-4 accent-[var(--color-notion-blue)]"
              />
              Free food available
            </label>
            <label className="border-input bg-app-bg text-foreground flex min-h-[44px] items-center gap-3 rounded-[16px] border px-4 py-3 text-sm font-medium transition-colors">
              <input
                checked={draft.hasCertificate}
                onChange={handleCheckboxChange("hasCertificate")}
                disabled={!isEditable}
                type="checkbox"
                className="h-4 w-4 accent-[var(--color-notion-blue)]"
              />
              Certificate included
            </label>
            <label className="border-input bg-app-bg text-foreground flex min-h-[44px] items-center gap-3 rounded-[16px] border px-4 py-3 text-sm font-medium transition-colors">
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

        <section className="border-input bg-card-bg rounded-[20px] border px-5 py-5 shadow-sm transition-colors duration-300">
          <div className="text-foreground flex items-center gap-2 text-sm font-semibold">
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
            {fieldErrors.imageUrl ? (
              <p className="mt-2 text-sm font-medium text-red-600">
                {fieldErrors.imageUrl}
              </p>
            ) : null}
          </div>
          {draft.imageUrl ? (
            <div className="border-whisper bg-app-bg mt-4 overflow-hidden rounded-[16px] border transition-colors">
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

        <div className="border-whisper bg-card-bg/90 shadow-card sticky bottom-24 z-10 mt-2 flex flex-wrap items-center justify-end gap-3 rounded-[18px] border p-3 backdrop-blur-xl transition-colors duration-300 lg:bottom-6">
          {isEditable ? (
            <>
              <button
                type="button"
                onClick={() => void saveDraft(false)}
                disabled={isBusy || !hasManagedClubs}
                className="border-input bg-card-bg text-foreground hover:bg-muted inline-flex min-h-[44px] items-center gap-2 rounded-[12px] border px-5 py-3 text-[15px] font-semibold transition-all disabled:opacity-60"
              >
                {createEvent.isPending || updateEvent.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : null}
                {mode === "create" ? "Save Draft" : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => void saveDraft(true)}
                disabled={isBusy || !hasManagedClubs}
                className="bg-notion-blue inline-flex min-h-[44px] items-center gap-2 rounded-[12px] px-5 py-3 text-[15px] font-semibold text-white transition-all hover:bg-[var(--color-notion-blue-hover)] disabled:opacity-60"
              >
                {submitForReview.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : null}
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
              className="bg-notion-blue inline-flex min-h-[44px] items-center gap-2 rounded-[12px] px-5 py-3 text-[15px] font-semibold text-white transition-all hover:bg-[var(--color-notion-blue-hover)] disabled:opacity-60"
            >
              {publishApproved.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : null}
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
                className="border-input bg-card-bg text-foreground placeholder:text-muted-foreground/50 w-full rounded-[14px] border px-4 py-3 text-sm outline-none focus-visible:border-[var(--color-focus-blue)]"
              />
              <button
                type="button"
                onClick={() => void handleCancel()}
                disabled={isBusy}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[12px] border border-red-200 bg-red-50 px-5 py-3 text-[15px] font-semibold text-red-700 transition-all hover:bg-red-100 disabled:opacity-60"
              >
                {cancelEvent.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : null}
                Cancel Event
              </button>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}
