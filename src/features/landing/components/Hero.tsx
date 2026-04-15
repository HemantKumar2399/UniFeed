import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center p-12 card-surface-featured w-full text-center">
      <h1 className="text-display mb-4">
        Welcome to UniFeed
      </h1>
      <p className="text-body-lg text-warm-gray mb-8 max-w-sm">
        The functional social platform for your campus life. Connect, share,
        and stay organized.
      </p>

      <Button asChild size="lg" className="w-full sm:w-auto">
        <Link href="/login">Connect University Email</Link>
      </Button>
    </div>
  );
}
