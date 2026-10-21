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
  if (role === "ADMIN") {
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
        const roleDefaultRoute = resolveDefaultRouteForRole(
          sessionData?.user?.role,
        );

        if (sessionData?.user?.role === "ADMIN") {
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
        <h1 className="text-foreground mb-2 text-3xl font-bold tracking-[-0.04em]">
          {mode === "login" ? "Welcome back" : "Create account"}
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
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

        <form onSubmit={handleAuth} className="flex flex-col gap-5">
          {mode === "register" && (
            <div className="animate-in fade-in slide-in-from-top-4 flex flex-col gap-4 duration-500">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="auth-name"
                  className="text-muted-foreground text-[11px] font-semibold tracking-wider uppercase"
                >
                  Full Name
                </label>
                <Input
                  id="auth-name"
                  autoComplete="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  required
                  className="border-border bg-muted h-12 rounded-xl px-4 text-base shadow-inner transition-all focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[var(--color-notion-blue)]"
                />
              </div>
              <p className="text-muted-foreground text-sm">
                New accounts are created as student accounts. Organizer access
                is assigned separately.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="auth-email"
                className="text-muted-foreground text-[11px] font-semibold tracking-wider uppercase"
              >
                University Email
              </label>
              <Input
                id="auth-email"
                autoComplete="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@college.edu"
                required
                className="border-border bg-muted h-12 rounded-xl px-4 text-base shadow-inner transition-all focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[var(--color-notion-blue)]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="auth-password"
                className="text-muted-foreground text-[11px] font-semibold tracking-wider uppercase"
              >
                Password
              </label>
              <Input
                id="auth-password"
                autoComplete={
                  mode === "register" ? "new-password" : "current-password"
                }
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                className="border-border bg-muted h-12 rounded-xl px-4 text-base shadow-inner transition-all focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[var(--color-notion-blue)]"
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

        <p className="text-muted-foreground mt-8 text-center text-sm font-medium">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setError(null);
                }}
                className="text-notion-blue font-semibold transition-colors hover:text-[var(--color-notion-blue-hover)]"
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
                className="text-notion-blue font-semibold transition-colors hover:text-[var(--color-notion-blue-hover)]"
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
        <div className="bg-muted h-96 w-full max-w-md animate-pulse rounded-[2rem]" />
      }
    >
      <FormContent />
    </Suspense>
  );
}
