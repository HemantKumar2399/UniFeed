import Link from "next/link";

const ERROR_MESSAGES: Record<string, string> = {
  AccessDenied:
    "Your email domain is not authorised. Please sign in with your university email address.",
  Configuration:
    "There is a configuration problem with the authentication setup. Please contact support.",
  Verification: "The verification link has expired or has already been used.",
  default: "An unexpected authentication error occurred. Please try again.",
};

const ERROR_HEADINGS: Record<string, string> = {
  AccessDenied: "Access Denied",
  Configuration: "Configuration Error",
  Verification: "Verification Failed",
  default: "Authentication Error",
};

interface ErrorPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function ErrorPage({ searchParams }: ErrorPageProps) {
  const params = await searchParams;
  const errorCode = params.error ?? "default";
  const message = ERROR_MESSAGES[errorCode] ?? ERROR_MESSAGES.default;
  const heading = ERROR_HEADINGS[errorCode] ?? ERROR_HEADINGS.default;

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 border border-zinc-800 p-8 shadow-xl text-center">
        <div className="mb-4 text-4xl">🚫</div>
        <h1 className="text-2xl font-extrabold text-white mb-2">{heading}</h1>
        <p className="text-zinc-400 text-sm mb-6">{message}</p>
        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-xl font-bold bg-brand-rose text-white px-6 py-3 transition-transform hover:scale-[1.02] active:scale-95"
        >
          Back to Login
        </Link>
      </div>
    </main>
  );
}
