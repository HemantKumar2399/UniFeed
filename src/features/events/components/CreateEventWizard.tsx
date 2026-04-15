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
        <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-sm font-medium tracking-badge uppercase text-warm-gray-500 mb-2">
            <span className={currentStep === 1 ? "text-notion-black font-bold" : ""}>1. Details</span>
            <span className="text-border-whisper">—</span>
            <span className={currentStep === 2 ? "text-notion-black font-bold" : ""}>2. Media</span>
            <span className="text-border-whisper">—</span>
            <span className={currentStep === 3 ? "text-notion-black font-bold" : ""}>3. Capacity</span>
          </div>

          <div className="rounded-[var(--radius-comfortable)] border border-[var(--border-whisper)] bg-pure-white p-8 shadow-none transition-all duration-300">
            <div className={currentStep === 1 ? "block animate-in fade-in slide-in-from-bottom-2" : "hidden"}><StepDetails /></div>
            <div className={currentStep === 2 ? "block animate-in fade-in slide-in-from-bottom-2" : "hidden"}><StepMedia /></div>
            <div className={currentStep === 3 ? "block animate-in fade-in slide-in-from-bottom-2" : "hidden"}><StepReview /></div>
          </div>

          <div className="flex items-center justify-between mt-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="rounded-[var(--radius-micro)] border border-[var(--border-whisper)] bg-pure-white px-5 py-2.5 text-base font-medium text-notion-black hover:bg-warm-white transition-colors duration-haptic active:scale-95"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              type={currentStep === 3 ? "submit" : "button"}
              onClick={currentStep < 3 ? handleNext : undefined}
              disabled={createEvent.isPending}
              className="rounded-[var(--radius-micro)] bg-notion-black px-5 py-2.5 text-base font-medium text-pure-white hover:bg-notion-black/90 disabled:opacity-50 transition-colors duration-haptic active:scale-95 ml-auto"
            >
              {createEvent.isPending ? "Saving..." : currentStep === 3 ? "Publish Event" : "Continue"}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
