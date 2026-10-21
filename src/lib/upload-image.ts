import sharp from "sharp";

export async function encodeUploadImage(bytes: Buffer): Promise<Buffer> {
  if (!bytes.length || bytes.length > 5 * 1024 * 1024)
    throw new Error("Invalid image size");
  const image = sharp(bytes, { limitInputPixels: 16_000_000 });
  const metadata = await image.metadata();
  if (
    !metadata.format ||
    !["jpeg", "png", "webp", "gif"].includes(metadata.format)
  )
    throw new Error("Unsupported raster image");
  return image.rotate().webp({ quality: 85 }).toBuffer();
}
