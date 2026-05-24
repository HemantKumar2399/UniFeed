"use client";

import { api } from "@/trpc/react";
import { ChevronLeft, User, Mail, School, Hash, BookOpen, GraduationCap, Phone } from "lucide-react";
import Link from "next/link";

export default function PersonalInfoPage() {
  const { data: profile, isLoading, isError } = api.student.getProfile.useQuery();

  return (
    <div className="flex flex-col gap-8 pb-32 md:pb-12 max-w-2xl mx-auto px-4 md:px-0">
      <header>
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#8a847d] hover:text-black transition-colors mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Profile
        </Link>
        <h1 className="text-[40px] md:text-[48px] font-bold text-black/95 leading-[1.1] tracking-[-1.5px]">
          Personal Info
        </h1>
        <p className="text-[15px] font-medium text-[#615d59] mt-2">
          Your verified student identity details.
        </p>
      </header>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-16 w-full animate-pulse rounded-[16px] bg-[#f6f5f4]" />
          ))}
        </div>
      ) : isError || !profile ? (
        <div className="rounded-[16px] border border-red-200 bg-red-50 p-4 text-[14px] text-red-700">
          Could not load your student profile details. Please complete onboarding.
        </div>
      ) : (
        <section className="bg-white rounded-[20px] border border-[#dddddd] shadow-sm overflow-hidden flex flex-col divide-y divide-[#dddddd]">
          {/* User Name */}
          <div className="flex items-center gap-4 p-5">
            <div className="w-10 h-10 rounded-full bg-[#f2f9ff] flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-[#097fe8]" />
            </div>
            <div>
              <p className="text-[13px] font-bold uppercase tracking-wider text-[#a39e98]">Full Name</p>
              <p className="text-[16px] font-semibold text-black/90 mt-0.5">{profile.user?.name ?? "N/A"}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 p-5">
            <div className="w-10 h-10 rounded-full bg-[#f2f9ff] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-[#097fe8]" />
            </div>
            <div>
              <p className="text-[13px] font-bold uppercase tracking-wider text-[#a39e98]">College Email</p>
              <p className="text-[16px] font-semibold text-black/90 mt-0.5">{profile.user?.email ?? "N/A"}</p>
            </div>
          </div>

          {/* College */}
          <div className="flex items-center gap-4 p-5">
            <div className="w-10 h-10 rounded-full bg-[#f2f9ff] flex items-center justify-center shrink-0">
              <School className="w-5 h-5 text-[#097fe8]" />
            </div>
            <div>
              <p className="text-[13px] font-bold uppercase tracking-wider text-[#a39e98]">College / Institution</p>
              <p className="text-[16px] font-semibold text-black/90 mt-0.5">{profile.college?.name ?? "N/A"}</p>
            </div>
          </div>

          {/* PRN */}
          <div className="flex items-center gap-4 p-5">
            <div className="w-10 h-10 rounded-full bg-[#f2f9ff] flex items-center justify-center shrink-0">
              <Hash className="w-5 h-5 text-[#097fe8]" />
            </div>
            <div>
              <p className="text-[13px] font-bold uppercase tracking-wider text-[#a39e98]">Permanent Register Number (PRN)</p>
              <p className="text-[16px] font-semibold text-black/90 mt-0.5 font-mono">{profile.prn}</p>
            </div>
          </div>

          {/* Branch / Course */}
          <div className="flex items-center gap-4 p-5">
            <div className="w-10 h-10 rounded-full bg-[#f2f9ff] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-[#097fe8]" />
            </div>
            <div>
              <p className="text-[13px] font-bold uppercase tracking-wider text-[#a39e98]">Course & Branch</p>
              <p className="text-[16px] font-semibold text-black/90 mt-0.5">
                {profile.course} - {profile.branch} {profile.section ? `(Section ${profile.section})` : ""}
              </p>
            </div>
          </div>

          {/* Graduation Year */}
          <div className="flex items-center gap-4 p-5">
            <div className="w-10 h-10 rounded-full bg-[#f2f9ff] flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-[#097fe8]" />
            </div>
            <div>
              <p className="text-[13px] font-bold uppercase tracking-wider text-[#a39e98]">Graduation Year</p>
              <p className="text-[16px] font-semibold text-black/90 mt-0.5">{profile.graduationYear}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4 p-5">
            <div className="w-10 h-10 rounded-full bg-[#f2f9ff] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-[#097fe8]" />
            </div>
            <div>
              <p className="text-[13px] font-bold uppercase tracking-wider text-[#a39e98]">Phone Number</p>
              <p className="text-[16px] font-semibold text-black/90 mt-0.5">{profile.phone ?? "Not Provided"}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
