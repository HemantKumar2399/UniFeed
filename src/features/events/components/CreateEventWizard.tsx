"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculateNextStep, calculatePrevStep } from "./wizard-state.utils";
import { StepDetails } from "./StepDetails";
import { StepMedia } from "./StepMedia";
import { StepReview } from "./StepReview";
import { CreateEventSchema, type CreateEventInput } from "./CreateEventSchema";

export function CreateEventWizard() {
  const [currentStep, setCurrentStep] = useState(1);

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

  const onSubmit = (data: CreateEventInput) => {
    console.log("Submitting Event:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
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
            className="rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 disabled:opacity-50"
          >
            {currentStep === 3 ? "Submit" : "Next"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
