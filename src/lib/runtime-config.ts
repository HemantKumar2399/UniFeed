type ResolveAppBaseUrlOptions = {
  windowOrigin?: string;
  appUrl?: string;
  vercelUrl?: string;
  port?: string | number;
};

type ResolveUploadPublicUrlOptions = {
  key: string;
  presignedUrl: string;
  publicBaseUrl?: string;
};

function normalizeBaseUrl(value?: string): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  return withProtocol.replace(/\/+$/, "");
}

export function resolveAppBaseUrl(options: ResolveAppBaseUrlOptions): string {
  if (options.windowOrigin) {
    return options.windowOrigin;
  }

  const explicitAppUrl = normalizeBaseUrl(options.appUrl);
  if (explicitAppUrl) {
    return explicitAppUrl;
  }

  const vercelAppUrl = normalizeBaseUrl(options.vercelUrl);
  if (vercelAppUrl) {
    return vercelAppUrl;
  }

  return `http://localhost:${options.port ?? 3000}`;
}

export function resolveUploadPublicUrl(
  options: ResolveUploadPublicUrlOptions,
): string {
  const explicitBaseUrl = normalizeBaseUrl(options.publicBaseUrl);
  if (explicitBaseUrl) {
    const trimmedKey = options.key.replace(/^\/+/, "");
    return `${explicitBaseUrl}/${trimmedKey}`;
  }

  const signedUrl = new URL(options.presignedUrl);
  signedUrl.search = "";
  signedUrl.hash = "";
  return signedUrl.toString();
}

export function getPrimaryAllowedDomain(
  rawDomains: string | undefined,
  fallback = "campus.edu",
): string {
  return (
    rawDomains
      ?.split(",")
      .map((domain) => domain.trim().toLowerCase())
      .find(Boolean) ?? fallback
  );
}

export function buildSeedEmail(
  localPart: string,
  rawDomains: string | undefined,
): string {
  return `${localPart}@${getPrimaryAllowedDomain(rawDomains)}`;
}
