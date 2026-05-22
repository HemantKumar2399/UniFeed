"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

interface OnboardingFormProps {
  userName: string | null;
  collegeName: string;
}

export function OnboardingForm({ userName, collegeName }: OnboardingFormProps) {
  const router = useRouter();
  const [prn, setPrn] = useState("");
  const [branch, setBranch] = useState("");
  const [course, setCourse] = useState("");
  const [graduationYear, setGraduationYear] = useState<number>(new Date().getFullYear() + 3);
  const [section, setSection] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const createProfile = api.student.createProfile.useMutation({
    onSuccess: () => {
      // Force a full browser reload to clear Server Component/Layout caches
      window.location.href = "/home";
    },
    onError: (err) => {
      if (err.message === "PRN_ALREADY_REGISTERED") {
        setErrorMessage("This PRN is already registered in your college.");
      } else {
        setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
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

  const years = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 3 + i);

  return (
    <div className="w-full max-w-md bg-white border border-[var(--border-whisper)] rounded-[var(--radius-large)] shadow-[var(--shadow-deep)] overflow-hidden relative">
      <div className="p-8 lg:p-10">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-[var(--color-badge-bg)] text-[var(--color-notion-blue)] rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_4px_12px_rgba(0,0,0,0.02)]">
            🎓
          </div>
          <h1 className="text-[28px] font-bold tracking-[-0.625px] text-[var(--color-notion-black)] mb-2 leading-tight">
            Complete your profile
          </h1>
          <p className="text-[15px] font-medium text-[var(--color-warm-gray-500)] leading-relaxed">
            Welcome{userName ? `, ${userName}` : ""}! Let's set up your student passport at <span className="font-semibold text-[var(--color-notion-black)]">{collegeName}</span>.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-medium rounded-[var(--radius-standard)] animate-in fade-in slide-in-from-top-1 duration-300">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="prn" className="block text-[13px] font-bold text-[var(--color-warm-gray-500)] uppercase tracking-wider mb-2">
              PRN / Enrollment Number <span className="text-[var(--color-orange)]">*</span>
            </label>
            <input
              id="prn"
              type="text"
              placeholder="e.g. 21JECRC001"
              value={prn}
              onChange={(e) => setPrn(e.target.value)}
              className="w-full bg-white text-[var(--color-notion-black)] border border-[var(--border-input)] px-4 py-3 rounded-[var(--radius-standard)] focus:outline-none focus:border-[var(--color-notion-blue)] focus:ring-1 focus:ring-[var(--color-notion-blue)] transition-all text-[15px] font-medium shadow-sm placeholder:text-[var(--color-warm-gray-300)]"
              disabled={createProfile.isPending}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label htmlFor="course" className="block text-[13px] font-bold text-[var(--color-warm-gray-500)] uppercase tracking-wider mb-2">
                Course / Degree <span className="text-[var(--color-orange)]">*</span>
              </label>
              <input
                id="course"
                type="text"
                placeholder="e.g. B.Tech"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full bg-white text-[var(--color-notion-black)] border border-[var(--border-input)] px-4 py-3 rounded-[var(--radius-standard)] focus:outline-none focus:border-[var(--color-notion-blue)] focus:ring-1 focus:ring-[var(--color-notion-blue)] transition-all text-[15px] font-medium shadow-sm placeholder:text-[var(--color-warm-gray-300)]"
                disabled={createProfile.isPending}
                required
              />
            </div>
            <div>
              <label htmlFor="graduationYear" className="block text-[13px] font-bold text-[var(--color-warm-gray-500)] uppercase tracking-wider mb-2">
                Graduation Year <span className="text-[var(--color-orange)]">*</span>
              </label>
              <div className="relative">
                <select
                  id="graduationYear"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(Number(e.target.value))}
                  className="appearance-none w-full bg-white text-[var(--color-notion-black)] border border-[var(--border-input)] px-4 py-3 pr-10 rounded-[var(--radius-standard)] focus:outline-none focus:border-[var(--color-notion-blue)] focus:ring-1 focus:ring-[var(--color-notion-blue)] transition-all text-[15px] font-medium shadow-sm"
                  disabled={createProfile.isPending}
                  required
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[var(--color-warm-gray-500)]">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="branch" className="block text-[13px] font-bold text-[var(--color-warm-gray-500)] uppercase tracking-wider mb-2">
              Branch / Major <span className="text-[var(--color-orange)]">*</span>
            </label>
            <input
              id="branch"
              type="text"
              placeholder="e.g. Computer Science"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full bg-white text-[var(--color-notion-black)] border border-[var(--border-input)] px-4 py-3 rounded-[var(--radius-standard)] focus:outline-none focus:border-[var(--color-notion-blue)] focus:ring-1 focus:ring-[var(--color-notion-blue)] transition-all text-[15px] font-medium shadow-sm placeholder:text-[var(--color-warm-gray-300)]"
              disabled={createProfile.isPending}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label htmlFor="section" className="block text-[13px] font-bold text-[var(--color-warm-gray-500)] uppercase tracking-wider mb-2">
                Section <span className="text-[var(--color-warm-gray-300)] font-medium lowercase">(optional)</span>
              </label>
              <input
                id="section"
                type="text"
                placeholder="e.g. A"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full bg-white text-[var(--color-notion-black)] border border-[var(--border-input)] px-4 py-3 rounded-[var(--radius-standard)] focus:outline-none focus:border-[var(--color-notion-blue)] focus:ring-1 focus:ring-[var(--color-notion-blue)] transition-all text-[15px] font-medium shadow-sm placeholder:text-[var(--color-warm-gray-300)]"
                disabled={createProfile.isPending}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-[13px] font-bold text-[var(--color-warm-gray-500)] uppercase tracking-wider mb-2">
                Phone Number <span className="text-[var(--color-warm-gray-300)] font-medium lowercase">(optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="e.g. 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white text-[var(--color-notion-black)] border border-[var(--border-input)] px-4 py-3 rounded-[var(--radius-standard)] focus:outline-none focus:border-[var(--color-notion-blue)] focus:ring-1 focus:ring-[var(--color-notion-blue)] transition-all text-[15px] font-medium shadow-sm placeholder:text-[var(--color-warm-gray-300)]"
                disabled={createProfile.isPending}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[var(--color-notion-blue)] hover:bg-[var(--color-notion-blue-hover)] text-white font-semibold py-3.5 px-4 rounded-[var(--radius-standard)] transition-all duration-[var(--duration-haptic)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-blue)] focus:ring-offset-2 text-[16px] disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 shadow-[0_2px_4px_rgba(0,117,222,0.2)] flex justify-center items-center gap-2"
              disabled={createProfile.isPending}
            >
              {createProfile.isPending ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                  Creating Profile...
                </>
              ) : (
                "Verify Student Profile"
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="bg-[var(--color-warm-white)] border-t border-[var(--border-whisper)] px-8 py-5 text-center flex justify-center items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-warm-gray-300)]"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <p className="text-[13px] font-medium text-[var(--color-warm-gray-500)]">
          Onboarding is required to access events securely.
        </p>
      </div>
    </div>
  );
}
