"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AUTH_ERRORS: Record<string, string> = {
  CredentialsSignin: "Invalid email or password.",
  AccessDenied:
    "Your email domain is not allowed. Please use your university email.",
  default: "Something went wrong. Please try again.",
};

function resolveDefaultRouteForRole(role: string | undefined): string {
  if (role === "ADMIN" || role === "SUPER_ADMIN") {
    return "/dashboard";
  }

  if (role === "ORGANIZER") {
    return "/dashboard";
  }

  return "/home";
}

function sanitizeCallbackUrl(raw: string | null): string {
  if (!raw) return "/home";
  if (raw === "/feed") return "/home";
  return raw.startsWith("/") && !raw.startsWith("//") ? raw : "/home";
}

function FormContent() {
  const searchParams = useSearchParams();
  const callbackUrl = sanitizeCallbackUrl(searchParams.get("callbackUrl"));

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const errorParam = searchParams.get("error");
  const urlError = errorParam
    ? (AUTH_ERRORS[errorParam] ?? AUTH_ERRORS.default)
    : null;

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === "register") {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });
        const data = (await res.json()) as { error?: string };
        if (!res.ok) {
          setError(data.error ?? AUTH_ERRORS.default ?? null);
          setLoading(false);
          return;
        }
      } catch {
        setError(AUTH_ERRORS.default ?? null);
        setLoading(false);
        return;
      }
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (result?.error) {
      setError(AUTH_ERRORS[result.error] ?? AUTH_ERRORS.default ?? null);
      if (mode === "register") {
        setError("Account created! Please sign in.");
      }
      return;
    }

    if (result?.ok) {
      try {
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = (await sessionRes.json()) as {
          user?: { role?: string };
        };
        const roleDefaultRoute = resolveDefaultRouteForRole(sessionData?.user?.role);

        if (sessionData?.user?.role === "ADMIN" || sessionData?.user?.role === "SUPER_ADMIN") {
          window.location.href = roleDefaultRoute;
          return;
        }

        if (callbackUrl === "/home") {
          window.location.href = roleDefaultRoute;
          return;
        }
      } catch {}

      window.location.href = callbackUrl;
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-md flex-col justify-center p-8 md:p-12">
        <h1 className="mb-2 text-3xl font-bold tracking-[-0.04em] text-foreground">
          {mode === "login" ? "Welcome back" : "Create account"}
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          {mode === "login"
            ? "Sign in to access your campus passport."
            : "Get started with your university email."}
        </p>

        {(error ?? urlError) && (
          <div
            role="alert"
            className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
          >
            {error ?? urlError}
          </div>
        )}

        <div className="mb-6 flex flex-col gap-3">
          <Button
            variant="outline"
            type="button"
            className="flex h-12 items-center justify-center gap-3 rounded-xl border-border bg-white text-base font-semibold transition-all hover:bg-muted active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Continue with Google
          </Button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[var(--color-warm-white)] px-2 font-semibold tracking-wider text-muted-foreground md:bg-white">
              Or continue with email
            </span>
          </div>
        </div>

        <form onSubmit={handleAuth} className="flex flex-col gap-5">
          {mode === "register" && (
            <div className="animate-in fade-in slide-in-from-top-4 flex flex-col gap-4 duration-500">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Full Name
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  required
                  className="h-12 rounded-xl border-border bg-muted px-4 text-base shadow-inner transition-all focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[var(--color-notion-blue)]"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                New accounts are created as student accounts. Organizer access
                is assigned separately.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                University Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@college.edu"
                required
                className="h-12 rounded-xl border-border bg-muted px-4 text-base shadow-inner transition-all focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[var(--color-notion-blue)]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                className="h-12 rounded-xl border-border bg-muted px-4 text-base shadow-inner transition-all focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[var(--color-notion-blue)]"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="mt-2 h-12 w-full rounded-xl text-base font-semibold shadow-lg transition-transform active:scale-95"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Sign In"
                : "Create Account"}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm font-medium text-muted-foreground">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setError(null);
                }}
                className="font-semibold text-notion-blue transition-colors hover:text-[var(--color-notion-blue-hover)]"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError(null);
                }}
                className="font-semibold text-notion-blue transition-colors hover:text-[var(--color-notion-blue-hover)]"
              >
                Sign In
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export function AuthForm() {
  return (
    <Suspense
      fallback={
        <div className="h-96 w-full max-w-md rounded-[2rem] bg-muted animate-pulse" />
      }
    >
      <FormContent />
    </Suspense>
  );
}
