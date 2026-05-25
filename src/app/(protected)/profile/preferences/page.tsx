"use client";

import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { ChevronLeft, Save, Bell, Mail, Compass } from "lucide-react";
import Link from "next/link";
import { EVENT_CATEGORY_OPTIONS } from "@/features/events/event-metadata";
import { Button } from "@/components/ui/button";

export default function PreferencesPage() {
  const utils = api.useUtils();
  const { data: prefs, isLoading, isError } = api.profile.getPreferences.useQuery();

  const [marketingEmails, setMarketingEmails] = useState(true);
  const [eventReminders, setEventReminders] = useState(true);
  const [preferredCategories, setPreferredCategories] = useState<string[]>([]);

  // Sync state once data loads
  useEffect(() => {
    if (prefs) {
      setMarketingEmails(prefs.marketingEmails);
      setEventReminders(prefs.eventReminders);
      setPreferredCategories(prefs.preferredCategories);
    }
  }, [prefs]);

  const updatePrefs = api.profile.updatePreferences.useMutation({
    onSuccess: async () => {
      await utils.profile.getPreferences.invalidate();
      toast.success("Preferences updated successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update preferences.");
    },
  });

  const handleToggleCategory = (category: string) => {
    setPreferredCategories((current) =>
      current.includes(category)
        ? current.filter((c) => c !== category)
        : [...current, category],
    );
  };

  const handleSave = () => {
    updatePrefs.mutate({
      marketingEmails,
      eventReminders,
      preferredCategories,
    });
  };

  return (
    <div className="flex flex-col gap-8 pb-32 md:pb-12 max-w-2xl mx-auto px-4 md:px-0 transition-colors duration-300">
      <header>
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Profile
        </Link>
        <h1 className="text-[40px] md:text-[48px] font-bold text-foreground leading-[1.1] tracking-[-1.5px]">
          Preferences
        </h1>
        <p className="text-[15px] font-medium text-muted-foreground mt-2">
          Tailor your event suggestions and notification alerts.
        </p>
      </header>

      {isLoading ? (
        <div className="space-y-6">
          <div className="h-48 w-full animate-pulse rounded-[24px] bg-app-bg" />
          <div className="h-64 w-full animate-pulse rounded-[24px] bg-app-bg" />
        </div>
      ) : isError ? (
        <div className="rounded-[16px] border border-red-200 bg-red-50 p-4 text-[14px] text-red-700">
          Could not load your preference settings. Please refresh.
        </div>
      ) : (
        <div className="space-y-6">
          {/* Notifications Section */}
          <section className="bg-card-bg rounded-[24px] p-6 border border-input shadow-sm space-y-6 transition-colors">
            <h2 className="text-[18px] font-bold text-foreground flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#097fe8]" />
              Notifications
            </h2>
            
            <div className="space-y-5">
              {/* Event Reminders */}
              <label className="flex items-start gap-4 cursor-pointer select-none group">
                <div className="mt-1">
                  <input
                    type="checkbox"
                    checked={eventReminders}
                    onChange={(e) => setEventReminders(e.target.checked)}
                    className="sr-only peer"
                    id="eventReminders"
                  />
                  <div className="w-10 h-6 bg-muted border border-input rounded-full relative peer-checked:bg-blue-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4 shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]"></div>
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-foreground/90 group-hover:text-foreground transition-colors">Event Reminders</p>
                  <p className="text-[14px] font-medium text-muted-foreground mt-0.5">Receive alerts when events you RSVP&apos;d to are starting soon.</p>
                </div>
              </label>

              <hr className="border-whisper" />

              {/* Marketing / Recommendations */}
              <label className="flex items-start gap-4 cursor-pointer select-none group">
                <div className="mt-1">
                  <input
                    type="checkbox"
                    checked={marketingEmails}
                    onChange={(e) => setMarketingEmails(e.target.checked)}
                    className="sr-only peer"
                    id="marketingEmails"
                  />
                  <div className="w-10 h-6 bg-muted border border-input rounded-full relative peer-checked:bg-blue-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4 shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]"></div>
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-foreground/90 group-hover:text-foreground transition-colors flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-muted-foreground" /> Weekly Digest
                  </p>
                  <p className="text-[14px] font-medium text-muted-foreground mt-0.5">Stay in the loop with personalized weekly event roundups at your college.</p>
                </div>
              </label>
            </div>
          </section>

          {/* Categories Section */}
          <section className="bg-card-bg rounded-[24px] p-6 border border-input shadow-sm space-y-6 transition-colors">
            <div>
              <h2 className="text-[18px] font-bold text-foreground flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#097fe8]" />
                Event Categories of Interest
              </h2>
              <p className="text-[14px] font-medium text-muted-foreground mt-1">
                Select topics you&apos;d love to see on your personalized feed.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {EVENT_CATEGORY_OPTIONS.map((category) => {
                const isSelected = preferredCategories.includes(category);
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleToggleCategory(category)}
                    className={`rounded-full px-4 py-2 text-[14px] font-semibold transition-all duration-200 active:scale-95 border ${
                      isSelected
                        ? "bg-blue-600 border-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.2)]"
                        : "bg-card-bg border-input text-foreground/70 hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Action Button */}
          <div className="flex justify-end pt-2">
            <Button
              type="button"
              onClick={handleSave}
              disabled={updatePrefs.isPending}
              className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 text-[15px] font-semibold text-white transition-all hover:bg-blue-700 active:scale-95 disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {updatePrefs.isPending ? "Saving..." : "Save Preferences"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
