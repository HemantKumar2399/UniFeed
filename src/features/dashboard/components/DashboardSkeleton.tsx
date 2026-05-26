import React from "react";

export function DashboardSkeleton() {
  const metricSkeletonKeys = [0, 1, 2, 3];
  const activitySkeletonKeys = [0, 1, 2];
  const rsvpSkeletonKeys = [0, 1, 2, 3];
  const statusLaneSkeletonKeys = [0, 1, 2, 3, 4];

  return (
    <div className="flex flex-col gap-8 animate-pulse">
      {/* Metrics Cards Grid Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricSkeletonKeys.map((key) => (
          <div
            key={key}
            className="rounded-[24px] border border-whisper bg-card-bg p-5 shadow-card h-[146px] flex flex-col justify-between"
          >
            <div className="h-4 bg-muted rounded-full w-24"></div>
            <div className="h-8 bg-muted rounded-full w-16 my-2"></div>
            <div className="h-3 bg-muted rounded-full w-full"></div>
          </div>
        ))}
      </div>

      {/* Main Content Grid Skeleton */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        {/* Left Column: Recent Activity */}
        <div className="rounded-[28px] border border-whisper bg-card-bg p-6 shadow-card h-[500px] flex flex-col gap-4">
          <div className="flex justify-between items-center pb-2">
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded-full w-32"></div>
              <div className="h-6 bg-muted rounded-full w-48"></div>
            </div>
            <div className="h-5 w-5 bg-muted rounded-full"></div>
          </div>
          <div className="space-y-3 mt-4">
            {activitySkeletonKeys.map((key) => (
              <div key={key} className="rounded-[20px] border border-whisper bg-app-bg px-4 py-4 h-[94px] flex flex-col gap-2">
                <div className="h-4 bg-muted rounded-full w-1/3"></div>
                <div className="h-3 bg-muted rounded-full w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Aside */}
        <div className="space-y-5">
          {/* RSVP States Skeleton */}
          <div className="rounded-[28px] border border-whisper bg-card-bg p-6 shadow-card flex flex-col gap-3">
            <div className="h-4 bg-muted rounded-full w-24 mb-2"></div>
            {rsvpSkeletonKeys.map((key) => (
              <div key={key} className="rounded-2xl border border-whisper bg-app-bg px-4 py-3 h-[58px] flex justify-between items-center">
                <div className="h-4 bg-muted rounded-full w-16"></div>
                <div className="h-4 bg-muted rounded-full w-8"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Lanes Skeleton */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="h-6 bg-muted rounded-full w-36"></div>
          <div className="h-3 bg-muted rounded-full w-64"></div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {statusLaneSkeletonKeys.map((key) => (
            <div
              key={key}
              className="rounded-[24px] border border-whisper bg-card-bg p-5 shadow-card h-[134px] flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2 w-1/2">
                  <div className="h-3 bg-muted rounded-full w-16"></div>
                  <div className="h-6 bg-muted rounded-full w-10"></div>
                </div>
                <div className="h-6 bg-muted rounded-full w-12"></div>
              </div>
              <div className="h-3 bg-muted rounded-full w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default DashboardSkeleton;
