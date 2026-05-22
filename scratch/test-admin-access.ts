function parseSetCookies(headerValue: string | null): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!headerValue) return cookies;

  const parts = headerValue.split(/,(?=[^;]*=)/);
  for (const part of parts) {
    const main = part.trim().split(";")[0];
    if (main) {
      const eqIdx = main.indexOf("=");
      if (eqIdx !== -1) {
        const key = main.slice(0, eqIdx).trim();
        const val = main.slice(eqIdx + 1).trim();
        cookies[key] = val;
      }
    }
  }
  return cookies;
}

function stringifyCookies(cookies: Record<string, string>): string {
  return Object.entries(cookies)
    .map(([k, v]) => `${k}=${v}`)
    .join("; ");
}

async function testAccess() {
  console.log("=== Manual Redirect Auth Diagnostic ===");

  // 1. Get CSRF token
  const csrfRes = await fetch("http://localhost:3000/api/auth/csrf");
  const csrfData = await csrfRes.json() as { csrfToken: string };
  const csrfToken = csrfData.csrfToken;
  const initialCookiesRaw = csrfRes.headers.get("set-cookie");
  const cookies = parseSetCookies(initialCookiesRaw);

  // 2. Perform sign in request
  const formData = new URLSearchParams();
  formData.append("email", "admin.jecrc@students.college.edu");
  formData.append("password", "Test@1234");
  formData.append("csrfToken", csrfToken);
  formData.append("redirect", "false");

  const cookieStr = stringifyCookies(cookies);
  const loginRes = await fetch("http://localhost:3000/api/auth/callback/credentials", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": cookieStr,
    },
    body: formData.toString(),
    redirect: "manual",
  });

  const loginCookiesRaw = loginRes.headers.get("set-cookie");
  const loginCookies = parseSetCookies(loginCookiesRaw);

  // Merge cookies
  const mergedCookies = { ...cookies, ...loginCookies };
  const finalCookieStr = stringifyCookies(mergedCookies);

  // 3. Fetch /admin/test (matches middleware "/admin/:path*")
  console.log("Fetching /admin/test (should trigger middleware)...");
  const subRes = await fetch("http://localhost:3000/admin/test", {
    headers: {
      "Cookie": finalCookieStr,
    },
    redirect: "manual",
  });

  console.log("Fetch /admin/test Status:", subRes.status);
  console.log("Fetch /admin/test Location:", subRes.headers.get("location"));
}

testAccess().catch(console.error);
