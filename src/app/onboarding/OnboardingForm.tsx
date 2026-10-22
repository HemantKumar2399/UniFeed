"use client";

import { useState } from "react";
import { api } from "@/trpc/react";

interface OnboardingFormProps {
  userName: string | null;
  collegeName: string;
}

export function OnboardingForm({ userName, collegeName }: OnboardingFormProps) {
  const [prn, setPrn] = useState("");
  const [branch, setBranch] = useState("");
  const [course, setCourse] = useState("");
  const [graduationYear, setGraduationYear] = useState<number>(
    new Date().getFullYear() + 3,
  );
  const [section, setSection] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const createProfile = api.student.createProfile.useMutation({
    onSuccess: () => {
      window.location.href = "/home";
    },
    onError: (err) => {
      if (err.message === "PRN_ALREADY_REGISTERED") {
        setErrorMessage("This PRN is already registered in your college.");
      } else {
        setErrorMessage(
          err.message ?? "An unexpected error occurred. Please try again.",
        );
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!prn.trim()) {
      setErrorMessage("PRN is required");
      return;
    }
    if (!branch.trim()) {
      setErrorMessage("Branch is required");
      return;
    }
    if (!course.trim()) {
      setErrorMessage("Course is required");
      return;
    }
    createProfile.mutate({
      prn: prn.trim(),
      branch: branch.trim(),
      course: course.trim(),
      graduationYear,
      section: section.trim() || undefined,
      phone: phone.trim() || undefined,
    });
  };

  const years = Array.from(
    { length: 11 },
    (_, i) => new Date().getFullYear() - 3 + i,
  );
  const isPending = createProfile.isPending;

  /*
   * Input style — mirrors the landing page's clean card surface aesthetic:
   * warm-white bg (#f6f5f4 = var(--color-warm-white)), black/8 border,
   * no heavy shadow, gentle focus ring in Notion Blue
   */
  const inputCls = [
    "w-full rounded-xl px-4 py-3 text-[14px] font-medium",
    "bg-muted text-foreground",
    "border border-input",
    "placeholder:text-muted-foreground/50",
    "focus:outline-none focus:bg-card-bg focus:border-focus-blue/50",
    "focus:ring-2 focus:ring-focus-blue/20",
    "transition-all duration-150",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ].join(" ");

  /* Label — same small-caps pattern as landing page card sub-labels */
  const labelCls =
    "block text-[11px] font-semibold uppercase tracking-[0.08em] mb-1.5 select-none text-muted-foreground";

  return (
    <div className="w-full">
      {/* ── Header ──────────────────────────────────────────────
          Matches landing page card structure:
          icon block (w-12 h-12 bg-black/5 rounded-2xl) + bold title
      ─────────────────────────────────────────────────────────── */}
      <div className="mb-7">
        {/* Icon — identical pattern to landing page feature cards */}
        <div className="bg-muted mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl">
          🎓
        </div>

        <h1
          className="text-foreground mb-2 leading-tight font-bold"
          style={{
            fontSize: "clamp(22px, 3vw, 28px)",
            letterSpacing: "-0.5px",
          }}
        >
          Complete your profile
        </h1>
        <p
          className="text-muted-foreground"
          style={{ fontSize: "15px", lineHeight: "1.55" }}
        >
          Welcome{userName ? `, ${userName}` : ""}! Set up your student passport
          at{" "}
          <span className="text-foreground font-semibold">{collegeName}</span>.
        </p>
      </div>

      {/* ── Error banner ─────────────────────────────────────── */}
      {errorMessage && (
        <div
          className="mb-5 rounded-xl px-4 py-3 text-[13px] font-medium"
          style={{
            backgroundColor: "rgba(220,38,38,0.05)",
            border: "1px solid rgba(220,38,38,0.15)",
            color: "#b91c1c",
          }}
        >
          {errorMessage}
        </div>
      )}

      {/* ── Form ─────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* PRN */}
        <div>
          <label htmlFor="prn" className={labelCls}>
            PRN / Enrollment Number <span style={{ color: "#dd5b00" }}>*</span>
          </label>
          <input
            id="prn"
            type="text"
            placeholder="Your college enrollment number"
            value={prn}
            onChange={(e) => setPrn(e.target.value)}
            className={inputCls}
            disabled={isPending}
            required
          />
        </div>

        {/* Course + Grad Year */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="course" className={labelCls}>
              Course / Degree <span style={{ color: "#dd5b00" }}>*</span>
            </label>
            <input
              id="course"
              type="text"
              placeholder="e.g. B.Tech"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className={inputCls}
              disabled={isPending}
              required
            />
          </div>
          <div>
            <label htmlFor="graduationYear" className={labelCls}>
              Grad Year <span style={{ color: "#dd5b00" }}>*</span>
            </label>
            <div className="relative">
              <select
                id="graduationYear"
                value={graduationYear}
                onChange={(e) => setGraduationYear(Number(e.target.value))}
                className={`appearance-none pr-8 ${inputCls}`}
                disabled={isPending}
                required
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <div className="text-muted-foreground/60 pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Branch */}
        <div>
          <label htmlFor="branch" className={labelCls}>
            Branch / Major <span style={{ color: "#dd5b00" }}>*</span>
          </label>
          <input
            id="branch"
            type="text"
            placeholder="e.g. Computer Science"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className={inputCls}
            disabled={isPending}
            required
          />
        </div>

        {/* Section + Phone */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="section" className={labelCls}>
              Section{" "}
              <span className="text-muted-foreground/45 font-normal normal-case">
                (optional)
              </span>
            </label>
            <input
              id="section"
              type="text"
              placeholder="e.g. A"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className={inputCls}
              disabled={isPending}
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelCls}>
              Phone{" "}
              <span className="text-muted-foreground/45 font-normal normal-case">
                (optional)
              </span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Include your country code"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputCls}
              disabled={isPending}
            />
          </div>
        </div>

        {/* ── CTA — matches landing page primary Button:
            solid filled bg-blue-600, h-14 px-8, shadow-blue-500/20 ── */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              backgroundColor: "#0075de",
              color: "#ffffff",
              padding: "13px 24px",
              fontSize: "15px",
              letterSpacing: "-0.15px",
              boxShadow:
                "0 4px 14px rgba(0,117,222,0.25), 0 1px 3px rgba(0,117,222,0.15)",
            }}
            onMouseEnter={(e) => {
              if (!isPending)
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#005bab";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#0075de";
            }}
          >
            {isPending ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Creating Profile…
              </>
            ) : (
              <>
                Create Student Profile
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>

      {/* ── Security note — thin separator, subtle body text ── */}
      <div className="border-whisper mt-5 flex items-center gap-2 border-t pt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground/40 shrink-0"
        >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <p className="text-muted-foreground/50 text-[12px] font-medium">
          Onboarding is required to access events securely.
        </p>
      </div>
    </div>
  );
}
