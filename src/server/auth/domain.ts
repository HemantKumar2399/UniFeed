import { db } from "@/server/db";

/**
 * Looks up a College in the database that matches the domain of the given email.
 * Returns the College record if found, or null otherwise.
 *
 * Uses the split result to extract the domain part.
 */
export async function getCollegeForEmail(email: string) {
  const parts = email.split("@");
  if (parts.length < 2) return null;
  const domain = parts[parts.length - 1]?.toLowerCase();
  if (!domain) return null;

  return db.college.findFirst({
    where: {
      emailDomains: {
        has: domain,
      },
    },
  });
}
