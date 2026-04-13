"use client";

import { useFormContext } from "react-hook-form";
import type { CreateEventInput } from "./CreateEventSchema";
import { api } from "@/trpc/react";
import { useState } from "react";

export function StepMedia() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CreateEventInput>();
  const [isUploading, setIsUploading] = useState(false);

  const getPresignedUrl = api.upload.getPresignedUrl.useMutation();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const { url, finalUrl } = await getPresignedUrl.mutateAsync({
        filename: file.name,
        contentType: file.type,
        size: file.size,
      });

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

      setValue("imageUrl", finalUrl, { shouldValidate: true });
    } catch (err) {
      console.error(err);
      alert("Image upload failed. See console for details.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Media & Styling</h2>
      <p className="text-sm text-gray-500">Upload images and set the card styling here.</p>

      <div className="flex flex-col gap-1">
        <label htmlFor="imageFile" className="text-sm font-medium">Upload Cover Image</label>
        <input
          id="imageFile"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
        />
        {isUploading && <p className="text-xs text-blue-600">Uploading...</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="imageUrl" className="text-sm font-medium">Cover Image URL</label>
        <input
          id="imageUrl"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
          placeholder="https://example.com/image.jpg"
          readOnly
          {...register("imageUrl")}
        />
        {errors.imageUrl?.message && (
          <p className="text-xs font-semibold text-rose-600">{errors.imageUrl.message}</p>
        )}
      </div>
    </div>
  );
}
