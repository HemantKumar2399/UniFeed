import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen bg-[#f6f5f4] flex flex-col items-center justify-center p-4 antialiased">
      <div className="w-full max-w-md bg-white border border-[rgba(0,0,0,0.1)] rounded-xl shadow-[rgba(0,0,0,0.04)_0px_4px_18px,rgba(0,0,0,0.027)_0px_2.025px_7.85px,rgba(0,0,0,0.02)_0px_0.8px_2.93px,rgba(0,0,0,0.01)_0px_0.175px_1.04px] overflow-hidden">
        <div className="p-8 text-center">
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 font-semibold text-lg">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-[-0.625px] text-[rgba(0,0,0,0.95)] mb-2">
            Access Denied
          </h1>
          <p className="text-sm text-[#615d59] leading-relaxed mb-6">
            You do not have the permissions required to access this area of the platform. If you think this is a mistake, please verify your account role or contact your administrator.
          </p>
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full h-10 font-semibold">
              <Link href="/home">Go to Home</Link>
            </Button>
            <Button asChild className="w-full h-10 font-semibold" variant="ghost">
              <Link href="/login">Switch Account</Link>
            </Button>
          </div>
        </div>
        <div className="bg-[#f6f5f4] border-t border-[rgba(0,0,0,0.1)] px-8 py-4 text-center">
          <p className="text-xs text-[#a39e98]">
            Enforced by Role-Based Access Control (RBAC).
          </p>
        </div>
      </div>
    </main>
  );
}
