"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

import { api } from "@/trpc/react";

import type { CreateEventInput } from "./CreateEventSchema";

export function StepMedia() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CreateEventInput>();
  const [isUploading, setIsUploading] = useState(false);

  const getPresignedUrl = api.upload.getPresignedUrl.useMutation();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const { url, finalUrl } = await getPresignedUrl.mutateAsync({
        filename: file.name,
        contentType: file.type,
        size: file.size,
      });

      const activeFinalUrl = finalUrl;

      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image to storage");
      }

      setValue("imageUrl", activeFinalUrl, { shouldValidate: true });
      toast.success("Image uploaded successfully.");
    } catch (err) {
      console.error("Image upload failed", err);
      toast.error("Image upload failed. Paste a valid image URL to continue.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Media & Styling</h2>
      <p className="text-sm text-gray-500">Upload images and set the card styling here.</p>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="imageFile" className="text-sm font-medium text-notion-black">Upload Cover Image</label>
        <input
          id="imageFile"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="rounded-[var(--radius-micro)] border border-[var(--border-input)] bg-pure-white px-4 py-2 text-base text-notion-black min-h-[44px] shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-blue)] focus-visible:border-[var(--color-focus-blue)]"
        />
        {isUploading && <p className="text-xs text-notion-blue">Uploading...</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="imageUrl" className="text-sm font-medium text-notion-black">Cover Image URL</label>
        <input
          id="imageUrl"
          className="rounded-[var(--radius-micro)] border border-[var(--border-input)] bg-pure-white px-4 py-2 text-base text-notion-black min-h-[44px] shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-blue)] focus-visible:border-[var(--color-focus-blue)]"
          placeholder="https://example.com/image.jpg"
          {...register("imageUrl")}
        />
        <p className="text-xs text-warm-gray-500">
          Use a successful upload or paste a hosted image URL manually.
        </p>
        {errors.imageUrl?.message && (
          <p className="text-xs font-semibold text-rose-600">{errors.imageUrl.message}</p>
        )}
      </div>
    </div>
  );
}
