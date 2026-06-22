"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, AlertCircle } from "lucide-react";
import jsQR from "jsqr";

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

interface WakeLockSentinelLike {
  release: () => Promise<void>;
  addEventListener: (type: string, listener: () => void) => void;
}

export function Scanner({ onDetected, isBusy = false }: ScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastTokenRef = useRef("");
  const lastDetectedAtRef = useRef(0);

  const [cameraReady, setCameraReady] = useState(false);
  const [unsupported, setUnsupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualToken, setManualToken] = useState("");
  const [wakeLockActive, setWakeLockActive] = useState(false);
  const [wakeLockWarning, setWakeLockWarning] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let intervalId: number | null = null;
    let cancelled = false;
    let detecting = false;
    let wakeLock: WakeLockSentinelLike | null = null;

    const requestWakeLock = async () => {
      if (typeof navigator !== "undefined" && "wakeLock" in navigator) {
        try {
          const nav = navigator as unknown as {
            wakeLock: { request: (type: string) => Promise<WakeLockSentinelLike> };
          };
          const sentinel = await nav.wakeLock.request("screen");
          wakeLock = sentinel;
          setWakeLockActive(true);
          sentinel.addEventListener("release", () => {
            setWakeLockActive(false);
          });
        } catch (err) {
          console.warn("Wake lock failed:", err);
          setWakeLockWarning(true);
        }
      }
    };

    const start = async () => {
      await requestWakeLock();

      const detectorApi = (window as unknown as { BarcodeDetector?: BarcodeDetectorCtor }).BarcodeDetector;
      let useSoftwareFallback = false;
      let detector: BarcodeDetectorLike | null = null;

      if (!detectorApi) {
        console.info("Native BarcodeDetector not found. Falling back to software QR scanner.");
        useSoftwareFallback = true;
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

        if (!useSoftwareFallback && detectorApi) {
          try {
            detector = new detectorApi({ formats: ["qr_code"] });
          } catch (e) {
            console.warn("Failed to construct native BarcodeDetector, using software fallback:", e);
            useSoftwareFallback = true;
          }
        }

        const canvas = document.createElement("canvas");

        const scanFrame = async () => {
          if (cancelled || !videoRef.current || isBusy || detecting) {
            return;
          }

          detecting = true;
          try {
            let token: string | undefined;

            if (useSoftwareFallback) {
              const video = videoRef.current;
              if (video.videoWidth > 0 && video.videoHeight > 0) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  const code = jsQR(imageData.data, imageData.width, imageData.height);
                  token = code?.data?.trim();
                }
              }
            } else if (detector) {
              const detected = await detector.detect(videoRef.current);
              token = detected[0]?.rawValue?.trim();
            }

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
            // Frame analysis error, bypass and retry
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
      if (wakeLock) {
        void wakeLock.release().catch((e) => {
          console.error("Release wake lock failed", e);
        });
      }
    };
  }, [isBusy, onDetected]);

  return (
    <section className="rounded-[20px] border border-whisper bg-pure-white p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-notion-black">Camera Scanner</h2>
        <span className={`rounded-pill px-3 py-1 text-xs font-semibold ${cameraReady ? "bg-status-success-surface text-green" : "bg-warm-white text-warm-gray-500"}`}>
          {cameraReady ? (wakeLockActive ? "Live (Wake-Locked)" : "Live") : "Booting"}
        </span>
      </div>

      {error ? (
        <div className="surface-status-danger mb-4 flex items-center gap-2 rounded-[12px] border px-3 py-2 text-sm font-medium">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      ) : null}

      {wakeLockWarning ? (
        <div className="surface-status-warning mb-4 flex items-start gap-2 rounded-[12px] border px-3 py-2 text-sm font-medium">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">Low Power Mode Notice</p>
            <p className="mt-0.5 text-xs">
              Low Power Mode blocks screen wake locks. Your screen may dim. Disable battery saver or charge your device for the best scanning experience.
            </p>
          </div>
        </div>
      ) : null}

      {unsupported ? (
        <div className="surface-status-caution mb-4 rounded-[12px] border px-3 py-2 text-sm font-medium">
          Camera scanning is unavailable in this browser. Use manual token fallback below.
        </div>
      ) : null}

      <div className="surface-scan-frame relative overflow-hidden rounded-[16px] border">
        <video
          ref={videoRef}
          className="aspect-video w-full object-cover"
          muted
          playsInline
          autoPlay
        />
        <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1 rounded-[8px] bg-[var(--color-scan-label-bg)] px-2 py-1 text-xs font-semibold text-white">
          <Camera className="h-3.5 w-3.5" />
          Align QR in frame
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <label htmlFor="manual-token" className="text-xs font-semibold uppercase tracking-badge text-warm-gray-500">
          Manual Passport Fallback
        </label>
        <div className="flex gap-2">
          <input
            id="manual-token"
            value={manualToken}
            onChange={(event) => setManualToken(event.target.value)}
            placeholder="Paste student passport token"
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
            className="h-10 rounded-[12px] bg-notion-black px-4 text-sm font-semibold text-pure-white transition-colors hover:bg-notion-black/90 disabled:opacity-60 cursor-pointer"
          >
            Verify
          </button>
        </div>
      </div>
    </section>
  );
}
