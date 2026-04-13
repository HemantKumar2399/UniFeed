import { z } from "zod";

export const CreateEventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title is too long"),
  description: z.string().min(10, "Description must be at least 10 characters").max(2000, "Description is too long"),
  date: z.coerce.date({
    required_error: "Please enter a valid date and time",
    invalid_type_error: "Please enter a valid date and time",
  }).refine((val) => val > new Date(), {
    message: "Event date must be in the future",
  }),
  location: z.string().min(2, "Location must be at least 2 characters").max(200, "Location is too long"),
  imageUrl: z.string().url("Must be a valid image URL").or(z.literal("")),
  capacity: z.coerce.number().int("Capacity must be an integer").min(1, "Capacity must be at least 1").max(100000, "Capacity cannot exceed 100000"),
});

export type CreateEventInput = z.infer<typeof CreateEventSchema>;
