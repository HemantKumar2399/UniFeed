import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Ticket, Rss, QrCode, GraduationCap } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--color-warm-white)] text-[var(--color-foreground)]">
      {/* Navigation Bar inside Home to keep it clean */}
      <nav className="fixed top-0 inset-x-0 h-16 border-b border-whisper bg-card-bg/80 backdrop-blur-md z-50 flex items-center justify-between px-6 lg:px-12 transition-colors duration-300">
        <div className="font-semibold text-lg tracking-tight">Campus Platform</div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link href="/login" scroll={false}>Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/login" scroll={false}>Get Started</Link>
          </Button>
        </div>
      </nav>

      <div className="pt-32 pb-16 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="mb-4 inline-flex items-center rounded-full border border-whisper bg-card-bg px-3 py-1 text-sm font-medium text-muted-foreground shadow-card">
            <span className="w-2 h-2 rounded-full bg-[var(--color-notion-blue)] mr-2 animate-pulse" />
            The Modern College Experience
          </div>
          
          <h1 className="text-display text-balance leading-[1.1] md:text-6xl lg:text-[72px]">
            Your Campus, Simplified.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto text-balance leading-relaxed">
            Discover events, skip the lines, and connect with your campus in one tap. Everything you need, beautifully designed.
          </p>
          
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 w-full px-8 text-base font-semibold shadow-card sm:w-auto" asChild>
              <Link href="/login" scroll={false}>
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" className="w-full sm:w-auto h-14 px-8 text-base font-semibold" asChild>
              <Link href="#features">Explore Campus</Link>
            </Button>
          </div>
        </div>

        {/* Bento Grid Features */}
        <div id="features" className="w-full mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1 */}
          <div className="card-surface col-span-1 rounded-3xl p-8 text-left relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-deep group md:col-span-2 lg:p-12 flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
              <Rss className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center mb-6">
                <Rss className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="mb-3 text-panel-title lg:text-3xl">The Campus Pulse</h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                Never miss out. Real-time updates on what&apos;s happening right now, curated specifically for you.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card-surface col-span-1 rounded-3xl p-8 text-left relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-deep group lg:p-12 flex flex-col justify-between">
            <div className="absolute bottom-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
              <Ticket className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center mb-6">
                <Ticket className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-panel-title mb-2">1-Tap RSVP</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Say goodbye to forms. Secure your spot instantly.
              </p>
            </div>
          </div>

          {/* Card 3 - Digital Profile (New) */}
          <div className="card-surface-brand col-span-1 rounded-3xl p-8 text-left relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-deep group lg:p-12 flex flex-col justify-between">
            <div className="absolute -bottom-8 -right-8 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500">
              <GraduationCap className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-panel-title mb-2">Digital Profile</h3>
              <p className="text-inverse-muted text-lg leading-relaxed">
                Showcase your skills. Build a verified portfolio of your involvement and achievements to stand out to employers.
              </p>
            </div>
          </div>

          {/* Card 4 - Digital Passport */}
          <div className="card-surface-inverse col-span-1 rounded-3xl p-8 text-left relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-deep group md:col-span-2 lg:p-12 flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 pr-12 hidden md:block">
              <QrCode className="w-56 h-56" />
            </div>
            <div className="relative z-10 max-w-xl">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-display-secondary mb-3 text-3xl">Digital Passport</h3>
              <p className="text-inverse-muted text-xl leading-relaxed">
                Your ticket. Your identity. Fast QR entry for all events. All securely stored on your device.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="w-full border-t border-whisper bg-card-bg/50 mt-24 py-12 px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground transition-colors duration-300">
        <div>&copy; 2026 Campus Platform Inc. All rights reserved.</div>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="#" className="hover:text-foreground transition-colors">About</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
        </div>
      </footer>
    </main>
  );
}
