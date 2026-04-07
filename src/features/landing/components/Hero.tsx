"use client";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl w-full text-center">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 text-white">
        Welcome to UniFeed
      </h1>
      <p className="text-zinc-400 text-lg mb-8 max-w-sm">
        The functional social platform for your campus life. Connect, share, and stay organized.
      </p>
      
      <Button 
        onClick={() => console.log("Auth coming in Story 1.3")}
        className="w-full text-lg py-4"
      >
        Connect University Email
      </Button>
    </div>
  );
}
