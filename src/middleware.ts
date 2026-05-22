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
        session.user.role = token.role as "STUDENT" | "ORGANIZER" | "ADMIN" | "SUPER_ADMIN";
      }
      if (typeof token.collegeId === "string") {
        session.user.collegeId = token.collegeId;
      }
      return session;
    },
  }
});

export default auth((req) => {
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (req.auth?.user?.role !== "ORGANIZER") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
