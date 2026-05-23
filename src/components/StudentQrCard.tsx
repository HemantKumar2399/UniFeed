"use client";

import { useEffect, useState } from "react";
import { Check, Copy, QrCode, ShieldCheck } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

type StudentQrCardProps = {
  collegeName: string;
  qrId: string;
  studentName: string;
  token: string;
};

type WakeLockSentinelLike = {
  release: () => Promise<void>;
};

type WakeLockNavigator = Navigator & {
  wakeLock?: {
    request: (type: "screen") => Promise<WakeLockSentinelLike>;
  };
};

export function StudentQrCard({ collegeName, qrId, studentName, token }: StudentQrCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [wakeLockReady, setWakeLockReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const isDevelopment = process.env.NODE_ENV === "development";

  useEffect(() => {
    if (!expanded) {
      return;
    }

    let sentinel: WakeLockSentinelLike | undefined;
    const wakeLockNavigator = navigator as WakeLockNavigator;

    const enableWakeLock = async () => {
      if (!wakeLockNavigator.wakeLock) {
        setWakeLockReady(false);
        return;
      }

      try {
        sentinel = await wakeLockNavigator.wakeLock.request("screen");
        setWakeLockReady(true);
      } catch {
        setWakeLockReady(false);
      }
    };

    void enableWakeLock();

    return () => {
      if (sentinel) {
        void sentinel.release();
      }
    };
  }, [expanded]);

  return (
    <article className="w-full rounded-[24px] border border-black/5 bg-[#0075de] p-6 text-white shadow-[0_23px_52px_rgba(0,0,0,0.1)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-wider text-white/80">Permanent Student QR</p>
          <h3 className="mt-2 text-[24px] font-bold leading-tight tracking-tight md:text-[30px]">{studentName}</h3>
          <p className="mt-2 text-[14px] font-medium text-white/85">{collegeName}</p>
          <p className="text-[14px] font-medium text-white/85">One QR for every approved event you register for.</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-[10px] border border-white/20 bg-white/15 px-3 py-1 text-[12px] font-semibold">
          <ShieldCheck className="h-4 w-4" />
          Verified
        </span>
      </div>

      <div className="mt-5">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-white/25 bg-white/10 px-4 py-2 text-[13px] font-semibold transition-colors active:scale-95 hover:bg-white/20"
          >
            <QrCode className="h-4 w-4" />
            {expanded ? "Hide Passport QR" : "Show Passport QR"}
          </button>

          {isDevelopment ? (
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(token);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1800);
                } catch {
                  setCopied(false);
                }
              }}
              className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-white/25 bg-white px-4 py-2 text-[13px] font-semibold text-[#0075de] transition-colors active:scale-95 hover:bg-white/90"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied Passport Token" : "Copy Passport Token"}
            </button>
          ) : null}
        </div>
        {isDevelopment ? (
          <p aria-live="polite" className="mt-2 text-[12px] font-medium text-white/80">
            Dev only: copy this token to test Manual Passport Fallback on the organizer scan page.
          </p>
        ) : null}
      </div>

      {expanded ? (
        <div className="mt-5 rounded-[16px] border border-white/20 bg-white p-4 text-black/90">
          <div className="mx-auto w-fit rounded-[12px] border border-[#ebebeb] bg-white p-3">
            <QRCodeSVG value={token} size={220} includeMargin level="M" />
          </div>
          <p className="mt-3 text-center text-[12px] font-semibold text-[#615d59]">Passport QR ID: {qrId}</p>
          <p className="mt-1 text-center text-[12px] text-[#8a847d]">
            {wakeLockReady
              ? "Screen wake lock enabled for faster scanning."
              : "Wake lock unavailable. Keep brightness high for best scan quality."}
          </p>
        </div>
      ) : null}
    </article>
  );
}
