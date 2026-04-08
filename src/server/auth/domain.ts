import { env } from "@/env";

/**
 * Parses ALLOWED_DOMAINS env var into a Set of lowercase domain strings.
 * e.g. "jecrc.ac.in,jecrcfoundation.com" → Set { "jecrc.ac.in", "jecrcfoundation.com" }
 *
 * Using a Set for O(1) lookup vs Array.includes which is O(n).
 */
const allowedDomains = new Set(
  env.ALLOWED_DOMAINS.split(",").map((d) => d.trim().toLowerCase()),
);

/**
 * Returns true if the given email belongs to an allowed university domain.
 *
 * Uses .pop() on the split result so multi-@ addresses (e.g. "a@b@jecrc.ac.in")
 * are correctly evaluated on their trailing domain segment rather than the
 * first segment after @.
 */
export function isAllowedDomain(email: string): boolean {
  const parts = email.split("@");
  // Need at least two parts; the last part is the domain.
  if (parts.length < 2) return false;
  const domain = parts[parts.length - 1]?.toLowerCase();
  return !!domain && domain.length > 0 && allowedDomains.has(domain);
}
