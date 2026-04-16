"use client";

import { useEffect, useState } from "react";
import { QrCode, ShieldCheck } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

type DigitalTicketProps = {
  eventTitle: string;
  eventMeta: string;
  location: string;
  token: string;
  ticketId: string;
};

type WakeLockSentinelLike = {
  release: () => Promise<void>;
};

type WakeLockNavigator = Navigator & {
  wakeLock?: {
    request: (type: "screen") => Promise<WakeLockSentinelLike>;
  };
};

export function DigitalTicket({ eventTitle, eventMeta, location, token, ticketId }: DigitalTicketProps) {
  const [expanded, setExpanded] = useState(false);
  const [wakeLockReady, setWakeLockReady] = useState(false);

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
          <p className="text-[12px] font-semibold uppercase tracking-wider text-white/80">Digital Ticket</p>
          <h3 className="mt-2 text-[24px] font-bold leading-tight tracking-tight md:text-[30px]">{eventTitle}</h3>
          <p className="mt-2 text-[14px] font-medium text-white/85">{eventMeta}</p>
          <p className="text-[14px] font-medium text-white/85">{location}</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-[10px] border border-white/20 bg-white/15 px-3 py-1 text-[12px] font-semibold">
          <ShieldCheck className="h-4 w-4" />
          Secured
        </span>
      </div>

      <div className="mt-5">
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="inline-flex items-center gap-2 rounded-[10px] border border-white/25 bg-white/10 px-4 py-2 text-[13px] font-semibold transition-colors hover:bg-white/20"
        >
          <QrCode className="h-4 w-4" />
          {expanded ? "Hide Entry QR" : "Show Entry QR"}
        </button>
      </div>

      {expanded ? (
        <div className="mt-5 rounded-[16px] border border-white/20 bg-white p-4 text-black/90">
          <div className="mx-auto w-fit rounded-[12px] border border-[#ebebeb] bg-white p-3">
            <QRCodeSVG value={token} size={220} includeMargin level="M" />
          </div>
          <p className="mt-3 text-center text-[12px] font-semibold text-[#615d59]">Ticket ID: {ticketId}</p>
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
