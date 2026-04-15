/**
 * Input Component — Tactile Utility Form Field
 * Story 6.1: Typography & Color Token Definition
 *
 * Design spec (DESIGN.md §4 Inputs & Forms):
 *   - Background: #ffffff
 *   - Text: rgba(0,0,0,0.9)
 *   - Border: 1px solid #dddddd (slightly more visible than whisper for form fields)
 *   - Padding: 6px (16px horizontal for breathing room)
 *   - Radius: 4px (micro — functional interactive element)
 *   - Focus: blue outline ring (#097fe8) — WCAG AA focus indicator
 *   - Placeholder: warm gray #a39e98 (Warm Gray 300)
 *   - Min height: 44px (UX-DR9 touch target)
 */

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          // Layout & sizing
          "flex w-full min-h-[44px]",
          "px-4 py-1.5", // 6px vertical / 16px horizontal approx
          // Typography: body tier (16px / 400)
          "text-base font-normal leading-[1.5]",
          "text-[var(--color-notion-black)]",
          // Form-specific border (resolves to var(--border-input))
          "bg-white border-[var(--border-input)]",
          "rounded-[var(--radius-micro)]", // Micro radius — functional element
          // Placeholder: Warm Gray 300 — subdued
          "placeholder:text-[var(--color-warm-gray-300)]",
          // Focus: visible WCAG AA ring
          "focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-[var(--color-focus-blue)]",
          "focus-visible:ring-offset-1",
          "focus-visible:border-[var(--color-focus-blue)]",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          // File input reset
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
