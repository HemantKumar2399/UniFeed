"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, AlertCircle } from "lucide-react";

type ScannerProps = {
  onDetected: (token: string) => void;
  isBusy?: boolean;
};

type DetectedBarcode = {
  rawValue?: string;
};

type BarcodeDetectorLike = {
  detect: (source: ImageBitmapSource) => Promise<DetectedBarcode[]>;
};

type BarcodeDetectorCtor = new (options?: { formats?: string[] }) => BarcodeDetectorLike;

export function Scanner({ onDetected, isBusy = false }: ScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastTokenRef = useRef("");
  const lastDetectedAtRef = useRef(0);

  const [cameraReady, setCameraReady] = useState(false);
  const [unsupported, setUnsupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualToken, setManualToken] = useState("");

  useEffect(() => {
    let stream: MediaStream | null = null;
    let intervalId: number | null = null;
    let cancelled = false;
    let detecting = false;

    const start = async () => {
      const detectorApi = (window as unknown as { BarcodeDetector?: BarcodeDetectorCtor }).BarcodeDetector;
      if (!detectorApi) {
        setUnsupported(true);
        return;
      }

      if (!navigator.mediaDevices?.getUserMedia) {
        setUnsupported(true);
        return;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });

        if (!videoRef.current) {
          return;
        }

        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraReady(true);

        const detector = new detectorApi({ formats: ["qr_code"] });

        const scanFrame = async () => {
          if (cancelled || !videoRef.current || isBusy || detecting) {
            return;
          }

          detecting = true;
          try {
            const detected = await detector.detect(videoRef.current);
            const token = detected[0]?.rawValue?.trim();
            if (!token) {
              return;
            }

            const now = Date.now();
            const duplicatedRapidScan = token === lastTokenRef.current && now - lastDetectedAtRef.current < 1200;
            if (duplicatedRapidScan) {
              return;
            }

            lastTokenRef.current = token;
            lastDetectedAtRef.current = now;
            onDetected(token);
          } catch {
            // Scanner frames can fail intermittently while camera warms up; keep looping.
          } finally {
            detecting = false;
          }
        };

        intervalId = window.setInterval(() => {
          void scanFrame();
        }, 320);
      } catch {
        setError("Camera permission is required for scan mode.");
      }
    };

    void start();

    return () => {
      cancelled = true;
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isBusy, onDetected]);

  return (
    <section className="rounded-[20px] border border-[var(--border-whisper)] bg-pure-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-notion-black">Camera Scanner</h2>
        <span className={`rounded-pill px-3 py-1 text-xs font-semibold ${cameraReady ? "bg-green-50 text-green-700" : "bg-warm-white text-warm-gray-500"}`}>
          {cameraReady ? "Live" : "Booting"}
        </span>
      </div>

      {error ? (
        <div className="mb-4 flex items-center gap-2 rounded-[12px] border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      ) : null}

      {unsupported ? (
        <div className="mb-4 rounded-[12px] border border-yellow-200 bg-yellow-50 px-3 py-2 text-sm font-medium text-yellow-800">
          Native QR scanning is unavailable in this browser. Use manual token fallback below.
        </div>
      ) : null}

      <div className="relative overflow-hidden rounded-[16px] border border-[var(--border-input)] bg-[#0f172a]">
        <video
          ref={videoRef}
          className="aspect-video w-full object-cover"
          muted
          playsInline
          autoPlay
        />
        <div className="pointer-events-none absolute inset-0 border-[3px] border-emerald-400/50" />
        <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1 rounded-[8px] bg-black/40 px-2 py-1 text-xs font-semibold text-white">
          <Camera className="h-3.5 w-3.5" />
          Align QR in frame
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <label htmlFor="manual-token" className="text-xs font-semibold uppercase tracking-badge text-warm-gray-500">
          Manual Token Fallback
        </label>
        <div className="flex gap-2">
          <input
            id="manual-token"
            value={manualToken}
            onChange={(event) => setManualToken(event.target.value)}
            placeholder="Paste ticket token"
            className="h-10 w-full rounded-[12px] border border-[var(--border-input)] px-3 text-sm outline-none focus-visible:border-[var(--color-focus-blue)]"
          />
          <button
            type="button"
            onClick={() => {
              const token = manualToken.trim();
              if (!token) {
                return;
              }
              onDetected(token);
              setManualToken("");
            }}
            disabled={isBusy}
            className="h-10 rounded-[12px] bg-notion-black px-4 text-sm font-semibold text-pure-white transition-colors hover:bg-notion-black/90 disabled:opacity-60"
          >
            Redeem
          </button>
        </div>
      </div>
    </section>
  );
}
