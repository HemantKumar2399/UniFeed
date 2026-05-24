import { z } from "zod";
import { EVENT_CATEGORY_OPTIONS, EVENT_DOMAIN_OPTIONS } from "../event-metadata";

const listItemSchema = z.string().trim().min(1).max(40);

export const CreateEventSchema = z
  .object({
    clubId: z.coerce.number().int("Select a valid community").positive("Select a community before creating the event"),
    title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title is too long"),
    description: z.string().min(10, "Description must be at least 10 characters").max(2000, "Description is too long"),
    date: z.coerce.date({
      required_error: "Please enter a valid date and time",
      invalid_type_error: "Please enter a valid date and time",
    }).refine((val) => val > new Date(), {
      message: "Event date must be in the future",
    }),
    registrationClosesAt: z.coerce.date({
      required_error: "Please enter a registration deadline",
      invalid_type_error: "Please enter a valid registration deadline",
    }),
    location: z.string().min(2, "Location must be at least 2 characters").max(200, "Location is too long"),
    imageUrl: z
      .string()
      .min(1, "An event image is required")
      .refine(
        (val) => {
          if (/^https?:\/\//i.test(val)) return true;
          if (val.startsWith("/uploads/")) return true;
          return false;
        },
        { message: "Must be a valid image URL or an uploaded image" },
      ),
    capacity: z.coerce.number().int("Capacity must be an integer").min(1, "Capacity must be at least 1").max(100000, "Capacity cannot exceed 100000"),
    category: z.enum(EVENT_CATEGORY_OPTIONS, {
      errorMap: () => ({ message: "Select an event category" }),
    }),
    tags: z
      .array(listItemSchema)
      .min(1, "Add at least one tag")
      .max(10, "Add at most 10 tags"),
    domain: z.enum(EVENT_DOMAIN_OPTIONS, {
      errorMap: () => ({ message: "Select an audience domain" }),
    }),
    isFreeFood: z.boolean(),
    hasCertificate: z.boolean(),
    isPaid: z.boolean(),
    targetBranches: z.array(listItemSchema).max(8, "Add at most 8 target branches").default([]),
  })
  .superRefine((value, ctx) => {
    if (!(value.registrationClosesAt > new Date())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Registration deadline must be in the future",
        path: ["registrationClosesAt"],
      });
    }

    if (!(value.registrationClosesAt < value.date)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Registration deadline must be before the event starts",
        path: ["registrationClosesAt"],
      });
    }
  });

export type CreateEventInput = z.infer<typeof CreateEventSchema>;
