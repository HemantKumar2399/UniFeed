"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Constants
const AUTH_ERRORS: Record<string, string> = {
  CredentialsSignin: "Invalid email or password.",
  AccessDenied:
    "Your email domain is not allowed. Please use your university email.",
  default: "Something went wrong. Please try again.",
};

/** Prevents open-redirect attacks by ensuring callbackUrl is always a relative internal path. */
function sanitizeCallbackUrl(raw: string | null): string {
  if (!raw) return "/home";
  if (raw === "/feed") return "/home";
  // Must start with "/" and must not start with "//" (protocol-relative URL)
  return raw.startsWith("/") && !raw.startsWith("//") ? raw : "/home";
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = sanitizeCallbackUrl(searchParams.get("callbackUrl"));

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"USER" | "ORGANIZER">("USER");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const errorParam = searchParams.get("error");
  const urlError = errorParam
    ? (AUTH_ERRORS[errorParam] ?? AUTH_ERRORS.default)
    : null;

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (result?.error) {
      setError(AUTH_ERRORS[result.error] ?? AUTH_ERRORS.default ?? null);
      return;
    }

    if (result?.ok) {
      if (callbackUrl === "/home") {
        try {
          const sessionRes = await fetch("/api/auth/session");
          const sessionData = (await sessionRes.json()) as { user?: { role?: string } };
          if (sessionData?.user?.role === "ORGANIZER") {
            router.push("/dashboard");
            return;
          }
        } catch {}
      }
      router.push(callbackUrl);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, role }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? AUTH_ERRORS.default ?? null);
        setLoading(false);
        return;
      }

      // Auto-login after successful registration.
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      setLoading(false);

      if (result?.ok) {
        if (callbackUrl === "/home") {
          try {
            const sessionRes = await fetch("/api/auth/session");
            const sessionData = (await sessionRes.json()) as { user?: { role?: string } };
            if (sessionData?.user?.role === "ORGANIZER") {
              router.push("/dashboard");
              return;
            }
          } catch {}
        }
        router.push(callbackUrl);
        return;
      }

      // Auto-login failed — tell the user to sign in manually rather than silently failing.
      setError(
        result?.error
          ? (AUTH_ERRORS[result.error] ?? AUTH_ERRORS.default ?? null)
          : "Account created! Please sign in.",
      );
    } catch {
      setError(AUTH_ERRORS.default ?? null);
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md card-surface p-8 shadow-deep">
      <h1 className="text-subheading mb-1">
        {mode === "login" ? "Welcome back" : "Create account"}
      </h1>
      <p className="text-body text-warm-gray mb-6">
        {mode === "login"
          ? "Sign in with your university email."
          : "Register with your university email."}
      </p>

      {(error ?? urlError) && (
        <div
          role="alert"
          className="mb-4 rounded-[4px] bg-[#ff64c8]/10 border border-[#ff64c8]/20 px-4 py-3 text-body-medium text-[#ff64c8]"
        >
          {error ?? urlError}
        </div>
      )}

      <form
        onSubmit={mode === "login" ? handleLogin : handleRegister}
        className="flex flex-col gap-4"
      >
        {mode === "register" && (
          <>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="role"
                className="text-badge text-warm-gray uppercase tracking-wider mb-2"
              >
                I am a...
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-body">
                  <input
                    type="radio"
                    name="role"
                    value="USER"
                    checked={role === "USER"}
                    onChange={() => setRole("USER")}
                    className="text-notion-blue focus:ring-focus-blue"
                  />
                  Student
                </label>
                <label className="flex items-center gap-2 text-body">
                  <input
                    type="radio"
                    name="role"
                    value="ORGANIZER"
                    checked={role === "ORGANIZER"}
                    onChange={() => setRole("ORGANIZER")}
                    className="text-notion-blue focus:ring-focus-blue"
                  />
                  Event Organizer
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-badge text-warm-gray uppercase tracking-wider mb-2"
              >
                Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                maxLength={100}
                required
              />
            </div>
          </>
        )}

        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-badge text-warm-gray uppercase tracking-wider mb-2"
          >
            University Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@jecrc.ac.in"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-badge text-warm-gray uppercase tracking-wider mb-2"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={8}
            maxLength={72}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full mt-2">
          {loading
            ? "Please wait…"
            : mode === "login"
              ? "Sign In"
              : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-body text-warm-gray">
        {mode === "login" ? (
          <>
            No account?{" "}
            <button
              onClick={() => {
                setMode("register");
                setError(null);
              }}
              className="text-notion-blue hover:underline font-semibold"
            >
              Register
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              onClick={() => {
                setMode("login");
                setError(null);
              }}
              className="text-notion-blue hover:underline font-semibold"
            >
              Sign In
            </button>
          </>
        )}
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
