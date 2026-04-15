"use client";

/**
 * useAsyncState — Aria-Live Accessible Async State Hook
 * Story 6.2: Tactile Utility Component Variations
 *
 * Manages loading/success/error UI states for async actions (e.g., RSVP mutation).
 * Pairs with an aria-live="polite" region to announce state changes to screen readers.
 *
 * Architecture ref: "Success Feedback: Inline state changes. Toast is NOT used
 * for primary success loops (like RSVPs)." — architecture.md
 *
 * @example
 * const { state, message, trigger } = useAsyncState();
 *
 * <button
 *   onClick={() => trigger(async () => { await rsvpMutation.mutateAsync(id); })}
 *   disabled={state === "loading"}
 * >
 *   {state === "idle" && "RSVP Now"}
 *   {state === "loading" && "Locking..."}
 *   {state === "success" && "✓ Secured"}
 * </button>
 * <span aria-live="polite" aria-atomic="true" className="sr-only">
 *   {message}
 * </span>
 */

import { useState, useCallback } from "react";

export type AsyncStateStatus = "idle" | "loading" | "success" | "error";

interface AsyncState {
  /** Current state of the async operation */
  status: AsyncStateStatus;
  /** Accessible message for aria-live regions */
  message: string;
  /** Trigger an async operation and manage its state */
  trigger: (fn: () => Promise<void>) => Promise<void>;
  /** Manually reset state back to idle */
  reset: () => void;
}

interface UseAsyncStateOptions {
  /** Message announced to screen readers when loading starts */
  loadingMessage?: string;
  /** Message announced to screen readers on success */
  successMessage?: string;
  /** Message announced to screen readers on error */
  errorMessage?: string;
  /** Auto-reset back to idle after success (ms). 0 = no auto-reset */
  autoResetMs?: number;
}

export function useAsyncState(options: UseAsyncStateOptions = {}): AsyncState {
  const {
    loadingMessage = "Processing...",
    successMessage = "Done",
    errorMessage = "Something went wrong. Please try again.",
    autoResetMs = 3000,
  } = options;

  const [status, setStatus] = useState<AsyncStateStatus>("idle");
  const [message, setMessage] = useState<string>("");

  const trigger = useCallback(
    async (fn: () => Promise<void>) => {
      if (status === "loading") return; // Prevent double-fire

      setStatus("loading");
      setMessage(loadingMessage);

      try {
        await fn();
        setStatus("success");
        setMessage(successMessage);

        if (autoResetMs > 0) {
          setTimeout(() => {
            setStatus("idle");
            setMessage("");
          }, autoResetMs);
        }
      } catch {
        setStatus("error");
        setMessage(errorMessage);

        if (autoResetMs > 0) {
          setTimeout(() => {
            setStatus("idle");
            setMessage("");
          }, autoResetMs);
        }
      }
    },
    [status, loadingMessage, successMessage, errorMessage, autoResetMs]
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setMessage("");
  }, []);

  return { status, message, trigger, reset };
}
