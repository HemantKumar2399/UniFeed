export type BlockEditorDraft = {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: string;
};

export type CreateEventPayload = {
  title: string;
  description: string;
  date: Date;
  location: string;
  imageUrl: string;
  capacity: number;
};

function toLocalDateTime(dateValue: string, timeValue: string): Date {
  const [year = Number.NaN, month = Number.NaN, day = Number.NaN] = dateValue.split("-").map(Number);
  const [hours = Number.NaN, minutes = Number.NaN] = timeValue.split(":").map(Number);

  if (
    !Number.isFinite(year) ||
    !Number.isFinite(month) ||
    !Number.isFinite(day) ||
    !Number.isFinite(hours) ||
    !Number.isFinite(minutes)
  ) {
    return new Date(Number.NaN);
  }

  // HTML date/time controls are local-user intent; preserve local wall-clock values.
  return new Date(year, month - 1, day, hours, minutes, 0);
}

export function buildCreateEventPayload(draft: BlockEditorDraft): CreateEventPayload {
  return {
    title: draft.title.trim(),
    description: draft.description.trim(),
    date: toLocalDateTime(draft.date, draft.time),
    location: draft.location.trim(),
    imageUrl: "",
    capacity: Number.parseInt(draft.capacity, 10),
  };
}