import NextAuth from "next-auth";
import { NextResponse } from "next/server";

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
  const user = req.auth?.user;
  const role = user?.role;
  const path = req.nextUrl.pathname;

  const isDashboard = path.startsWith("/dashboard");
  const isAdmin = path.startsWith("/admin");
  const isStudentArea =
    path.startsWith("/home") ||
    path.startsWith("/discover") ||
    path.startsWith("/passport") ||
    path.startsWith("/profile") ||
    path.startsWith("/search") ||
    path.startsWith("/global") ||
    path.startsWith("/tickets");

  if (isDashboard || isAdmin || isStudentArea) {
    if (!user) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(loginUrl);
    }

    if (isStudentArea) {
      if (role === "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      if (role === "ORGANIZER") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    if (isDashboard) {
      if (role !== "ORGANIZER" && role !== "ADMIN") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    if (isAdmin) {
      if (role !== "ADMIN") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }
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
    "/global",
    "/global/:path*",
    "/tickets",
    "/tickets/:path*",
  ],
};
