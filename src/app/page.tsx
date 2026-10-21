import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Ticket, Rss, QrCode, GraduationCap } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--color-warm-white)] text-[var(--color-foreground)]">
      {/* Navigation Bar inside Home to keep it clean */}
      <nav className="border-whisper bg-card-bg/80 fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b px-6 backdrop-blur-md transition-colors duration-300 lg:px-12">
        <div className="text-lg font-semibold tracking-tight">UniFeed</div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link href="/login" scroll={false}>
              Log In
            </Link>
          </Button>
          <Button asChild>
            <Link href="/login" scroll={false}>
              Get Started
            </Link>
          </Button>
        </div>
      </nav>

      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 pt-32 pb-16 text-center lg:px-12">
        {/* Hero Section */}
        <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-4xl space-y-6 duration-700">
          <div className="border-whisper bg-card-bg text-muted-foreground shadow-card mb-4 inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium">
            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-[var(--color-notion-blue)]" />
            The Modern College Experience
          </div>

          <h1 className="text-display leading-[1.1] text-balance md:text-6xl lg:text-[72px]">
            Your Campus, Simplified.
          </h1>

          <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed font-medium text-balance md:text-xl">
            Discover events, skip the lines, and connect with your campus in one
            tap. Everything you need, beautifully designed.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
            <Button
              size="lg"
              className="shadow-card h-14 w-full px-8 text-base font-semibold sm:w-auto"
              asChild
            >
              <Link href="/login" scroll={false}>
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-14 w-full px-8 text-base font-semibold sm:w-auto"
              asChild
            >
              <Link href="#features">Explore Campus</Link>
            </Button>
          </div>
        </div>

        {/* Bento Grid Features */}
        <div
          id="features"
          className="mt-32 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {/* Card 1 */}
          <div className="card-surface hover:shadow-deep group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-3xl p-8 text-left transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:p-12">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] transition-all duration-500 group-hover:scale-110 group-hover:opacity-10">
              <Rss className="h-48 w-48" />
            </div>
            <div className="relative z-10">
              <div className="bg-muted mb-6 flex h-12 w-12 items-center justify-center rounded-2xl">
                <Rss className="text-foreground h-6 w-6" />
              </div>
              <h3 className="text-panel-title mb-3 lg:text-3xl">
                The Campus Pulse
              </h3>
              <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
                Never miss out. Real-time updates on what&apos;s happening right
                now, curated specifically for you.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card-surface hover:shadow-deep group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-3xl p-8 text-left transition-all duration-300 hover:-translate-y-1 lg:p-12">
            <div className="absolute right-0 bottom-0 p-4 opacity-[0.03] transition-all duration-500 group-hover:scale-110 group-hover:opacity-10">
              <Ticket className="h-32 w-32" />
            </div>
            <div className="relative z-10">
              <div className="bg-muted mb-6 flex h-12 w-12 items-center justify-center rounded-2xl">
                <Ticket className="text-foreground h-6 w-6" />
              </div>
              <h3 className="text-panel-title mb-2">1-Tap RSVP</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Say goodbye to forms. Secure your spot instantly.
              </p>
            </div>
          </div>

          {/* Card 3 - Digital Profile (New) */}
          <div className="card-surface-brand hover:shadow-deep group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-3xl p-8 text-left transition-transform duration-300 hover:-translate-y-1 lg:p-12">
            <div className="absolute -right-8 -bottom-8 opacity-20 transition-all duration-500 group-hover:scale-110 group-hover:opacity-40">
              <GraduationCap className="h-48 w-48" />
            </div>
            <div className="relative z-10">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-panel-title mb-2">Digital Profile</h3>
              <p className="text-inverse-muted text-lg leading-relaxed">
                Keep your campus profile, saved events, and participation
                details together.
              </p>
            </div>
          </div>

          {/* Card 4 - Digital Passport */}
          <div className="card-surface-inverse hover:shadow-deep group relative col-span-1 flex flex-col items-start justify-between overflow-hidden rounded-3xl p-8 text-left transition-transform duration-300 hover:-translate-y-1 md:col-span-2 md:flex-row md:items-center lg:p-12">
            <div className="absolute top-1/2 right-0 hidden -translate-y-1/2 pr-12 opacity-[0.03] transition-all duration-500 group-hover:scale-110 group-hover:opacity-10 md:block">
              <QrCode className="h-56 w-56" />
            </div>
            <div className="relative z-10 max-w-xl">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <QrCode className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-display-secondary mb-3 text-3xl">
                Digital Passport
              </h3>
              <p className="text-inverse-muted text-xl leading-relaxed">
                Your ticket. Your identity. Fast QR entry for all events. Access
                your signed passport from your account.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-whisper bg-card-bg/50 text-muted-foreground mt-24 flex w-full flex-col items-center justify-between border-t px-6 py-12 text-sm transition-colors duration-300 md:flex-row lg:px-12">
        <div>&copy; 2026 UniFeed</div>
        <div className="mt-4 flex gap-6 md:mt-0">
          <Link
            href="/login"
            className="hover:text-foreground transition-colors"
          >
            Sign in to UniFeed
          </Link>
        </div>
      </footer>
    </main>
  );
}
