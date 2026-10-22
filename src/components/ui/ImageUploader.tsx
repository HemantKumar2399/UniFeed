"use client";

import type { ChangeEvent } from "react";
import { useId, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/trpc/react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  disabled?: boolean;
  maxSizeMB?: number;
  onUploadStateChange?: (uploading: boolean) => void;
}

export function ImageUploader({
  value,
  onChange,
  label = "Upload image",
  disabled = false,
  maxSizeMB = 5,
  onUploadStateChange,
}: ImageUploaderProps) {
  const inputId = useId();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const getPresignedUrl = api.upload.getPresignedUrl.useMutation();

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // File inputs suppress change for the same selection unless cleared.
    event.target.value = "";
    if (!file) {
      return;
    }

    if (
      !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
        file.type,
      )
    ) {
      const message = "Choose a JPG, PNG, WebP, or GIF image.";
      setUploadError(message);
      toast.error(message);
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      const errorMsg = `File size exceeds the limit of ${maxSizeMB} MB.`;
      setUploadError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    try {
      setIsUploading(true);
      onUploadStateChange?.(true);
      setUploadError(null);

      const presignResult = await getPresignedUrl.mutateAsync({
        filename: file.name,
        contentType: file.type,
        size: file.size,
      });

      let publicUrl: string;

      if (presignResult.useLocalUpload) {
        const formData = new FormData();
        formData.append("file", file);

        const localResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!localResponse.ok) {
          const errBody = (await localResponse.json().catch(() => ({}))) as {
            error?: string;
          };
          throw new Error(errBody.error ?? "Local upload failed.");
        }

        const { url } = (await localResponse.json()) as { url: string };
        publicUrl = url;
      } else {
        const uploadResponse = await fetch(presignResult.url, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image to storage.");
        }

        publicUrl = presignResult.finalUrl;
      }

      onChange(publicUrl);
      toast.success("Image uploaded successfully.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Image upload failed.";
      setUploadError(message);
      toast.error(message);
    } finally {
      setIsUploading(false);
      onUploadStateChange?.(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
      <div className="flex flex-col gap-2">
        <label
          htmlFor={`${inputId}-file`}
          className="text-foreground text-sm font-semibold"
        >
          {label}
        </label>
        <div className="relative">
          <input
            id={`${inputId}-file`}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileUpload}
            disabled={disabled || isUploading}
            className="border-whisper bg-card-bg text-foreground file:bg-app-bg file:text-foreground w-full rounded-[14px] border px-4 py-3 text-sm transition-colors duration-200 file:mr-3 file:rounded-[10px] file:border-0 file:px-3 file:py-2 file:font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          />
          {isUploading && (
            <div className="absolute top-1/2 right-3 -translate-y-1/2">
              <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
            </div>
          )}
        </div>
        <p className="text-muted-foreground text-xs">
          Upload a JPG, PNG, WebP, or GIF file up to {maxSizeMB} MB.
        </p>
        {uploadError ? (
          <p role="alert" className="text-sm font-medium text-red-600">
            {uploadError}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor={`${inputId}-url`}
          className="text-foreground text-sm font-semibold"
        >
          Hosted image URL
        </label>
        <input
          id={`${inputId}-url`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled || isUploading}
          type="url"
          placeholder="https://cdn.example.com/logo.jpg"
          className="border-whisper bg-card-bg text-foreground placeholder:text-muted-foreground/60 focus-visible:border-primary h-12 rounded-[14px] border px-4 text-[15px] font-medium transition-colors duration-200 outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <p className="text-muted-foreground text-xs">
          If upload storage is not configured, paste a hosted URL manually.
        </p>
      </div>
    </div>
  );
}
