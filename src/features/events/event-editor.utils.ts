import {
  toLocalDateTime,
  toDateInputValue,
  toTimeInputValue,
} from "@/lib/platform-date";
import type { CreateEventInput } from "./components/CreateEventSchema";

type EventEditorDraftSource = Omit<CreateEventInput, "registrationClosesAt"> & {
  registrationClosesAt: Date | null;
};

export type EventEditorDraft = {
  clubId: string;
  title: string;
  description: string;
  date: string;
  time: string;
  registrationCloseDate: string;
  registrationCloseTime: string;
  location: string;
  imageUrl: string;
  capacity: string;
  category: CreateEventInput["category"] | "";
  tags: string;
  domain: CreateEventInput["domain"] | "";
  isFreeFood: boolean;
  hasCertificate: boolean;
  isPaid: boolean;
  targetBranches: string;
};

export function createEmptyEventEditorDraft(): EventEditorDraft {
  return {
    clubId: "",
    title: "",
    description: "",
    date: "",
    time: "",
    registrationCloseDate: "",
    registrationCloseTime: "",
    location: "",
    imageUrl: "",
    capacity: "100",
    category: "",
    tags: "",
    domain: "",
    isFreeFood: false,
    hasCertificate: false,
    isPaid: false,
    targetBranches: "",
  };
}

function normalizeCommaSeparatedList(value: string): string[] {
  return [
    ...new Set(
      value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ];
}

export function buildEventPayload(draft: EventEditorDraft): CreateEventInput {
  return {
    clubId: Number.parseInt(draft.clubId, 10),
    title: draft.title.trim(),
    description: draft.description.trim(),
    date: toLocalDateTime(draft.date, draft.time),
    registrationClosesAt: toLocalDateTime(
      draft.registrationCloseDate,
      draft.registrationCloseTime,
    ),
    location: draft.location.trim(),
    imageUrl: draft.imageUrl.trim(),
    capacity: Number.parseInt(draft.capacity, 10),
    category: draft.category as CreateEventInput["category"],
    tags: normalizeCommaSeparatedList(draft.tags),
    domain: draft.domain as CreateEventInput["domain"],
    isFreeFood: draft.isFreeFood,
    hasCertificate: draft.hasCertificate,
    isPaid: draft.isPaid,
    targetBranches: normalizeCommaSeparatedList(draft.targetBranches),
  };
}

export function buildEventEditorDraft(
  input: EventEditorDraftSource,
): EventEditorDraft {
  return {
    clubId: String(input.clubId),
    title: input.title,
    description: input.description,
    date: toDateInputValue(input.date),
    time: toTimeInputValue(input.date),
    registrationCloseDate: input.registrationClosesAt
      ? toDateInputValue(input.registrationClosesAt)
      : "",
    registrationCloseTime: input.registrationClosesAt
      ? toTimeInputValue(input.registrationClosesAt)
      : "",
    location: input.location,
    imageUrl: input.imageUrl,
    capacity: String(input.capacity),
    category: input.category,
    tags: input.tags.join(", "),
    domain: input.domain,
    isFreeFood: input.isFreeFood,
    hasCertificate: input.hasCertificate,
    isPaid: input.isPaid,
    targetBranches: input.targetBranches.join(", "),
  };
}
