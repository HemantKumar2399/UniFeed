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
  const {
    data: prefs,
    isLoading,
    isError,
  } = api.profile.getPreferences.useQuery();

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
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4 pb-32 transition-colors duration-300 md:px-0 md:pb-12">
      <header>
        <Link
          href="/profile"
          className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1.5 text-[14px] font-semibold transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Profile
        </Link>
        <h1 className="text-page-title text-foreground">Preferences</h1>
        <p className="text-page-lead text-muted-foreground mt-2">
          Tailor your event suggestions and save your communication preferences.
        </p>
      </header>

      {isLoading ? (
        <div className="space-y-6">
          <div className="bg-app-bg h-48 w-full animate-pulse rounded-[24px]" />
          <div className="bg-app-bg h-64 w-full animate-pulse rounded-[24px]" />
        </div>
      ) : isError ? (
        <div className="alert-panel surface-status-danger p-4 text-[14px]">
          Could not load your preference settings. Please refresh.
        </div>
      ) : (
        <div className="space-y-6">
          {/* Notifications Section */}
          <section className="bg-card-bg border-input space-y-6 rounded-[24px] border p-6 shadow-sm transition-colors">
            <h2 className="text-foreground flex items-center gap-2 text-[18px] font-bold">
              <Bell className="h-5 w-5 text-[#097fe8]" />
              Notifications
            </h2>

            <div className="space-y-5">
              {/* Event Reminders */}
              <label className="group flex cursor-pointer items-start gap-4 select-none">
                <div className="mt-1">
                  <input
                    type="checkbox"
                    checked={eventReminders}
                    onChange={(e) => setEventReminders(e.target.checked)}
                    className="peer sr-only"
                    id="eventReminders"
                  />
                  <div className="bg-muted border-input relative h-6 w-10 rounded-full border shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] transition-colors peer-checked:bg-blue-600 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-4"></div>
                </div>
                <div>
                  <p className="text-foreground/90 group-hover:text-foreground text-[16px] font-semibold transition-colors">
                    Event Reminders
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-[14px] font-medium">
                    Save your preference for future reminders. Reminder delivery
                    is not available yet.
                  </p>
                </div>
              </label>

              <hr className="border-whisper" />

              {/* Marketing / Recommendations */}
              <label className="group flex cursor-pointer items-start gap-4 select-none">
                <div className="mt-1">
                  <input
                    type="checkbox"
                    checked={marketingEmails}
                    onChange={(e) => setMarketingEmails(e.target.checked)}
                    className="peer sr-only"
                    id="marketingEmails"
                  />
                  <div className="bg-muted border-input relative h-6 w-10 rounded-full border shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] transition-colors peer-checked:bg-blue-600 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-4"></div>
                </div>
                <div>
                  <p className="text-foreground/90 group-hover:text-foreground flex items-center gap-1.5 text-[16px] font-semibold transition-colors">
                    <Mail className="text-muted-foreground h-4 w-4" /> Weekly
                    Digest
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-[14px] font-medium">
                    Save your preference for a future digest. Email delivery is
                    not available yet.
                  </p>
                </div>
              </label>
            </div>
          </section>

          {/* Categories Section */}
          <section className="bg-card-bg border-input space-y-6 rounded-[24px] border p-6 shadow-sm transition-colors">
            <div>
              <h2 className="text-foreground flex items-center gap-2 text-[18px] font-bold">
                <Compass className="h-5 w-5 text-[#097fe8]" />
                Event Categories of Interest
              </h2>
              <p className="text-muted-foreground mt-1 text-[14px] font-medium">
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
                    className={`rounded-full border px-4 py-2 text-[14px] font-semibold transition-all duration-200 active:scale-95 ${
                      isSelected
                        ? "border-blue-600 bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.2)]"
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
              className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 text-[15px] font-semibold text-white transition-all hover:bg-blue-700 active:scale-95 disabled:bg-gray-100 disabled:text-gray-400 sm:w-auto"
            >
              <Save className="h-4 w-4" />
              {updatePrefs.isPending ? "Saving..." : "Save Preferences"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
