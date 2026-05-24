import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import { resolveRouteAuthorization } from "@/lib/route-authorization";

const { auth } = NextAuth({
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.collegeId = user.collegeId;
      }
      return token;
    },
    session({ session, token }) {
      if (typeof token.id === "string") {
        session.user.id = token.id;
      }
      if (typeof token.role === "string") {
        session.user.role = token.role as "STUDENT" | "ORGANIZER" | "ADMIN";
      }
      if (typeof token.collegeId === "string") {
        session.user.collegeId = token.collegeId;
      }
      return session;
    },
  }
});

export default auth((req) => {
  const decision = resolveRouteAuthorization({
    path: req.nextUrl.pathname,
    user: req.auth?.user,
  });

  if (decision.action === "redirect") {
    const destination = new URL(decision.destination, req.url);
    if (decision.destination === "/login" && decision.callbackUrl) {
      destination.searchParams.set("callbackUrl", decision.callbackUrl);
    }

    return NextResponse.redirect(destination);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin",
    "/admin/:path*",
    "/home",
    "/home/:path*",
    "/discover",
    "/discover/:path*",
    "/passport",
    "/passport/:path*",
    "/profile",
    "/profile/:path*",
    "/search",
    "/search/:path*",
    "/notifications",
    "/notifications/:path*",
    "/tickets",
    "/tickets/:path*",
  ],
};
