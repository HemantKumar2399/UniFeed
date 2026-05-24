"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";
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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const getPresignedUrl = api.upload.getPresignedUrl.useMutation();

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
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
          const errBody = await localResponse.json().catch(() => ({})) as { error?: string };
          throw new Error(errBody.error ?? "Local upload failed.");
        }

        const { url } = await localResponse.json() as { url: string };
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
      const message = error instanceof Error ? error.message : "Image upload failed.";
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
        <label htmlFor="imageFile" className="text-sm font-semibold text-black/95">
          {label}
        </label>
        <div className="relative">
          <input
            id="imageFile"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={disabled || isUploading}
            className="w-full rounded-[14px] border border-[rgba(0,0,0,0.1)] bg-white px-4 py-3 text-sm text-black/90 file:mr-3 file:rounded-[10px] file:border-0 file:bg-[#f6f5f4] file:px-3 file:py-2 file:font-semibold disabled:cursor-not-allowed disabled:bg-black/5"
          />
          {isUploading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="h-4 w-4 animate-spin text-black/40" />
            </div>
          )}
        </div>
        <p className="text-xs text-[#8a847d]">Upload a JPG, PNG, or WebP file up to {maxSizeMB} MB.</p>
        {uploadError ? <p className="text-sm font-medium text-red-600">{uploadError}</p> : null}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="imageUrl" className="text-sm font-semibold text-black/95">
          Hosted image URL
        </label>
        <input
          id="imageUrl"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled || isUploading}
          type="url"
          placeholder="https://cdn.example.com/logo.jpg"
          className="h-12 rounded-[14px] border border-[rgba(0,0,0,0.1)] bg-white px-4 text-[15px] font-medium text-black/90 outline-none placeholder:text-[#a39e98] transition-colors focus-visible:border-[#097fe8] disabled:cursor-not-allowed disabled:bg-black/5"
        />
        <p className="text-xs text-[#8a847d]">
          If upload storage is not configured, paste a hosted URL manually.
        </p>
      </div>
    </div>
  );
}
