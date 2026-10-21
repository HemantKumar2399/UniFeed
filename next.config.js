/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

function getUploadRemotePattern() {
  if (!process.env.UPLOAD_PUBLIC_BASE_URL) {
    return null;
  }

  try {
    const url = new URL(process.env.UPLOAD_PUBLIC_BASE_URL);

    return {
      protocol: url.protocol.replace(":", ""),
      hostname: url.hostname,
      port: url.port,
      pathname: `${url.pathname.replace(/\/+$/, "") || ""}/**`,
    };
  } catch {
    return null;
  }
}

const uploadRemotePattern = getUploadRemotePattern();

/** @type {import("next").NextConfig} */
const config = {
  devIndicators: false,
  images: {
    remotePatterns: [
      ...(uploadRemotePattern ? [uploadRemotePattern] : []),
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default config;
