"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { calculateNextStep, calculatePrevStep } from "./wizard-state.utils";
import { StepDetails } from "./StepDetails";
import { StepMedia } from "./StepMedia";
import { StepReview } from "./StepReview";
import { CreateEventSchema, type CreateEventInput } from "./CreateEventSchema";

export function CreateEventWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const utils = api.useUtils();

  const createEvent = api.event.create.useMutation({
    onSuccess: () => {
      toast.success("Event created successfully!");
      void utils.event.getOrganizerDrafts.invalidate();
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(`Failed to create event: ${error.message}`);
    },
  });

  const methods = useForm<CreateEventInput>({
    resolver: zodResolver(CreateEventSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      location: "",
      imageUrl: "",
      capacity: 100,
    },
  });

  const handleNext = async () => {
    // Determine which fields to validate depending on the step
    let fieldsToValidate: (keyof CreateEventInput)[] = [];
    if (currentStep === 1) fieldsToValidate = ["title", "description", "date", "location"];
    if (currentStep === 2) fieldsToValidate = ["imageUrl"];

    const isStepValid = await methods.trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => calculateNextStep(prev, 3));
    }
  };

  const handlePrev = () => setCurrentStep((prev) => calculatePrevStep(prev, 1));

  const handleKeyDown = async (e: KeyboardEvent<HTMLFormElement>) => {
    // Check if the target is NOT a textarea. If it is a textarea, let the user put newlines.
    if (e.key === "Enter" && (e.target as HTMLElement).tagName !== "TEXTAREA") {
      e.preventDefault();
      // Only advance if we are not on the last step
      if (currentStep < 3) {
        await handleNext();
      } else {
        // We're on the last step, so we deliberately execute react-hook-form's submit handler natively
        void methods.handleSubmit(onSubmit)();
      }
    }
  };

  const onSubmit = (data: CreateEventInput) => {
    createEvent.mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form 
        onSubmit={methods.handleSubmit(onSubmit)} 
        onKeyDown={handleKeyDown}
        className="flex w-full flex-col gap-6"
      >
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className={currentStep === 1 ? "font-bold text-gray-900 dark:text-white" : ""}>Details</span>
          &gt;
          <span className={currentStep === 2 ? "font-bold text-gray-900 dark:text-white" : ""}>Media</span>
          &gt;
          <span className={currentStep === 3 ? "font-bold text-gray-900 dark:text-white" : ""}>Capacity/Review</span>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-black">
          <div className={currentStep === 1 ? "block" : "hidden"}><StepDetails /></div>
          <div className={currentStep === 2 ? "block" : "hidden"}><StepMedia /></div>
          <div className={currentStep === 3 ? "block" : "hidden"}><StepReview /></div>
        </div>

        <div className="flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
            >
              Prev
            </button>
          ) : (
            <div />
          )}

          <button
            type={currentStep === 3 ? "submit" : "button"}
            onClick={currentStep < 3 ? handleNext : undefined}
            disabled={createEvent.isPending}
            className="rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 disabled:opacity-50"
          >
            {createEvent.isPending ? "Submitting..." : currentStep === 3 ? "Submit" : "Next"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
