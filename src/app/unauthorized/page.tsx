import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen bg-app-bg flex flex-col items-center justify-center p-4 antialiased text-foreground transition-colors duration-300">
      <div className="w-full max-w-md bg-card-bg border-whisper rounded-xl shadow-card overflow-hidden transition-colors duration-300">
        <div className="p-8 text-center">
          <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 font-semibold text-lg">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-[-0.625px] text-foreground mb-2">
            Access Denied
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            You do not have the permissions required to access this area of the platform. If you think this is a mistake, please verify your account role or contact your administrator.
          </p>
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full h-10 font-semibold">
              <Link href="/home">Go to Home</Link>
            </Button>
            <Button asChild className="w-full h-10 font-semibold" variant="ghost">
              <Link href="/login" scroll={false}>Switch Account</Link>
            </Button>
          </div>
        </div>
        <div className="bg-muted/40 border-t border-whisper px-8 py-4 text-center">
          <p className="text-xs text-muted-foreground/60">
            Enforced by Role-Based Access Control (RBAC).
          </p>
        </div>
      </div>
    </main>
  );
}
