import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

export type TicketPayload = {
  studentId: string;
  eventTicketId: string;
  issuedAt: number;
};

const TOKEN_VERSION = "v2";
const IV_BYTES = 12;

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

function getCipherKey(secret: string): Buffer {
  return createHash("sha256").update(secret, "utf8").digest();
}

function validatePayloadShape(payload: unknown): payload is TicketPayload {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const parsed = payload as Partial<TicketPayload>;
  return (
    typeof parsed.studentId === "string" &&
    typeof parsed.eventTicketId === "string" &&
    typeof parsed.issuedAt === "number"
  );
}

export function getTicketPayloadSecret(): string {
  const secret = process.env.TICKET_PAYLOAD_SECRET ?? process.env.AUTH_SECRET;

  if (!secret || secret.length < 16) {
    throw new Error("Ticket payload secret is missing or too short.");
  }

  return secret;
}

export function createTicketPayloadToken(payload: TicketPayload, secret: string): string {
  const key = getCipherKey(secret);
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv("aes-256-gcm", key, iv);

  const plaintext = Buffer.from(JSON.stringify(payload), "utf8");
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return `${TOKEN_VERSION}.${toBase64Url(iv)}.${toBase64Url(encrypted)}.${toBase64Url(authTag)}`;
}

export function decodeTicketPayloadToken(token: string, secret?: string): TicketPayload {
  const parts = token.split(".");
  if (parts.length !== 4) {
    throw new Error("Invalid ticket token");
  }

  const [version, ivPart, dataPart, tagPart] = parts;
  if (version !== TOKEN_VERSION || !ivPart || !dataPart || !tagPart) {
    throw new Error("Invalid ticket token");
  }

  const iv = fromBase64Url(ivPart);
  const encrypted = fromBase64Url(dataPart);
  const authTag = fromBase64Url(tagPart);
  const key = getCipherKey(secret ?? getTicketPayloadSecret());

  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
  const payload = JSON.parse(decrypted) as unknown;

  if (!validatePayloadShape(payload)) {
    throw new Error("Invalid ticket payload shape");
  }

  return payload;
}

export function verifyTicketPayloadToken(token: string, secret: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 4) {
    return false;
  }

  const [version, ivPart, dataPart, tagPart] = parts;
  if (version !== TOKEN_VERSION || !ivPart || !dataPart || !tagPart) {
    return false;
  }

  try {
    const key = getCipherKey(secret);
    const iv = fromBase64Url(ivPart);
    const encrypted = fromBase64Url(dataPart);
    const authTag = fromBase64Url(tagPart);

    const decipher = createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
    const payload = JSON.parse(decrypted) as unknown;

    return validatePayloadShape(payload);
  } catch {
    return false;
  }
}
