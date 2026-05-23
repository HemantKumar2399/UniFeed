import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export type StudentQrPayload = {
  studentQrId: string;
  studentQrSecretVersion: number;
  issuedAt: number;
};

const TOKEN_VERSION = "v1";

function toBase64Url(value: Buffer | string): string {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string): Buffer {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  return Buffer.from(padded, "base64");
}

function validatePayloadShape(payload: unknown): payload is StudentQrPayload {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const parsed = payload as Partial<StudentQrPayload>;
  return (
    typeof parsed.studentQrId === "string" &&
    parsed.studentQrId.length >= 8 &&
    Number.isInteger(parsed.studentQrSecretVersion) &&
    (parsed.studentQrSecretVersion ?? 0) > 0 &&
    typeof parsed.issuedAt === "number" &&
    Number.isFinite(parsed.issuedAt)
  );
}

function createSignature(payloadSegment: string, secret: string): string {
  return toBase64Url(createHmac("sha256", secret).update(`${TOKEN_VERSION}.${payloadSegment}`, "utf8").digest());
}

export function createStudentQrId(): string {
  return `sqr_${randomBytes(18).toString("base64url")}`;
}

export function getStudentQrSecret(): string {
  const secret = process.env.STUDENT_QR_SECRET;

  if (!secret || secret.length < 16) {
    throw new Error("Student QR secret is missing or too short.");
  }

  return secret;
}

export function createStudentQrToken(payload: StudentQrPayload, secret: string): string {
  const payloadSegment = toBase64Url(JSON.stringify(payload));
  const signature = createSignature(payloadSegment, secret);
  return `${TOKEN_VERSION}.${payloadSegment}.${signature}`;
}

export function verifyStudentQrToken(token: string, secret: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 3) {
    return false;
  }

  const [version, payloadSegment, signature] = parts;
  if (version !== TOKEN_VERSION || !payloadSegment || !signature) {
    return false;
  }

  try {
    const expectedSignature = createSignature(payloadSegment, secret);
    const providedBuffer = Buffer.from(signature, "utf8");
    const expectedBuffer = Buffer.from(expectedSignature, "utf8");

    if (providedBuffer.length !== expectedBuffer.length) {
      return false;
    }

    if (!timingSafeEqual(providedBuffer, expectedBuffer)) {
      return false;
    }

    const payload = JSON.parse(fromBase64Url(payloadSegment).toString("utf8")) as unknown;
    return validatePayloadShape(payload);
  } catch {
    return false;
  }
}

export function decodeStudentQrToken(token: string, secret?: string): StudentQrPayload {
  const verificationSecret = secret ?? getStudentQrSecret();

  if (!verifyStudentQrToken(token, verificationSecret)) {
    throw new Error("Invalid student QR token");
  }

  const [, payloadSegment] = token.split(".");
  const payload = JSON.parse(fromBase64Url(payloadSegment!).toString("utf8")) as unknown;

  if (!validatePayloadShape(payload)) {
    throw new Error("Invalid student QR payload shape");
  }

  return payload;
}
