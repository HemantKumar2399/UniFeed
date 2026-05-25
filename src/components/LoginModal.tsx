"use client";

import { AuthForm } from "@/components/AuthForm";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface LoginModalProps {
  onDismiss: () => void;
}

export function LoginModal({ onDismiss }: LoginModalProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Small delay to trigger animation on mount
    const t = setTimeout(() => setOpen(true), 10);
    // Lock body scroll
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  function handleDismiss() {
    setOpen(false);
    setTimeout(() => {
      onDismiss();
    }, 300); // Wait for exit animation
  }

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Dimmer backdrop */}
      <div
        onClick={handleDismiss}
        className={`absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Side Sheet Panel Container */}
      <div
        className={`relative z-10 w-full max-w-md md:max-w-lg lg:max-w-[480px] h-full bg-card-bg md:rounded-l-[2rem] md:border-l md:border-whisper shadow-card flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${  
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={handleDismiss}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors z-20"
        >
          <X className="w-5 h-5 text-foreground/70" />
        </button>

        <div className="flex-1 w-full overflow-y-auto px-4 md:px-8 py-16 flex items-center justify-center">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}