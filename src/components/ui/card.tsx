/**
 * Card Component — Tactile Utility Surface System
 * Story 6.1: Typography & Color Token Definition
 *
 * Card anatomy:
 *   <Card>               — outer container (white, whisper border, shadow)
 *     <CardHeader>       — top section with padding
 *       <CardTitle>      — 22px / 700 / ls -0.25px (card title tier)
 *       <CardDescription>— 14px / 400 warm gray secondary text
 *     <CardContent>      — main body content area
 *     <CardFooter>       — action row at the bottom
 *
 * Two surface variants:
 *   default  — standard: 12px radius, 4-layer soft card shadow
 *   featured — hero/modal: 16px radius, 5-layer deep shadow
 */

import * as React from "react";
import { cn } from "@/lib/utils";

/* ---- Card Root ---- */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "featured" }
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Surface: pure white background
      "bg-white",
      // Whisper border: the Notion aesthetic class
      "border-whisper",
      // Radius: 12px standard, 16px featured
      variant === "featured" ? "rounded-[16px]" : "rounded-[12px]",
      // Shadow: semantic multi-layer stack mapped to globals.css utilities
      variant === "featured" ? "shadow-deep" : "shadow-card",
      // Subtle shadow intensification on hover
      "transition-shadow duration-200",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

/* ---- Card Header ---- */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/* ---- Card Title ---- */
/* Matches "Card Title" tier: 22px / 700 / lh 1.27 / ls -0.25px */
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-[1.375rem] font-bold leading-[1.27] tracking-[-0.25px]",
      "text-[rgba(0,0,0,0.95)]",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/* ---- Card Description ---- */
/* Caption Light tier: 14px / 400 / warm gray #615d59 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-[0.875rem] font-normal leading-[1.43]",
      "text-[#615d59]", // Warm Gray 500 — secondary text
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/* ---- Card Content ---- */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-0", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

/* ---- Card Footer ---- */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-6 pt-0",
      // Whisper border top divider
      "border-t-whisper mt-2 pt-4",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
