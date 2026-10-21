import { db } from "@/server/db";

/**
 * Looks up a College in the database that matches the domain of the given email.
 * Returns the College record if found, or null otherwise.
 *
 * Uses the split result to extract the domain part.
 */
export async function getCollegeForEmail(email: string) {
  const parts = email.trim().split("@");
  if (parts.length !== 2 || !parts[0] || /\s/.test(email.trim())) return null;
  const domain = parts[parts.length - 1]?.toLowerCase();
  if (!domain) return null;

  // 1. Exact match
  const exactMatch = await db.college.findFirst({
    where: {
      emailDomains: {
        has: domain,
      },
    },
  });
  if (exactMatch) return exactMatch;

  // 2. Subdomain / Suffix match or fallback
  const colleges = await db.college.findMany();

  // Find a college where the email domain ends with one of the allowed domains (subdomain support)
  for (const college of colleges) {
    for (const allowedDomain of college.emailDomains) {
      const normalizedAllowed = allowedDomain.toLowerCase();
      if (
        domain === normalizedAllowed ||
        domain.endsWith("." + normalizedAllowed)
      ) {
        return college;
      }
    }
  }

  return null;
}
