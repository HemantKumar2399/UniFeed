import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/server/auth";
import { randomUUID } from "node:crypto";
import { encodeUploadImage } from "@/lib/upload-image";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

/**
 * Local-dev upload endpoint.
 * Saves images to public/uploads/ and returns a served URL.
 * This is only used when real S3/R2 credentials are not configured.
 *
 * POST /api/upload
 * Body: multipart/form-data with a "file" field
 */
export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      {
        error:
          "Local uploads are only available in development. Configure object storage.",
      },
      { status: 404 },
    );
  }
  // Require authentication
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = session.user.role;
  if (role !== "ORGANIZER" && role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file field" }, { status: 400 });
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, WebP, and GIF images are allowed." },
      { status: 400 },
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "Image must be less than 5 MB." },
      { status: 400 },
    );
  }

  const bytes = await file.arrayBuffer();
  let buffer: Buffer;
  try {
    buffer = await encodeUploadImage(Buffer.from(bytes));
  } catch {
    return NextResponse.json(
      { error: "Invalid or unsupported image content." },
      { status: 400 },
    );
  }

  // Build a safe, unique filename
  const safeFilename = `${randomUUID()}.webp`;
  const uploadDir = join(process.cwd(), "public", "uploads");

  try {
    await mkdir(uploadDir, { recursive: true });
    await writeFile(join(uploadDir, safeFilename), buffer);
  } catch (err) {
    console.error("[upload] Failed to write file:", err);
    return NextResponse.json(
      { error: "Failed to save the uploaded file." },
      { status: 500 },
    );
  }

  const publicUrl = `/uploads/${safeFilename}`;
  return NextResponse.json({ url: publicUrl }, { status: 200 });
}
