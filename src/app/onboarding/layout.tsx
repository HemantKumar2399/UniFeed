import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Your Profile — UniFeed",
  description:
    "Set up your student passport to access events, clubs, and verified campus experiences.",
};

/**
 * Onboarding Layout
 *
 * Scoped to /onboarding. Sets html + body to h-full overflow-hidden so that
 * the split-screen page fills the viewport precisely with zero page-level scroll.
 * The right panel handles its own internal overflow independently.
 */
export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Inline style injection to lock the viewport only on this route */}
      <style>{`
        html, body { height: 100%; overflow: hidden; }
      `}</style>
      {children}
    </>
  );
}
