import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "@/server/db";

import { getCollegeForEmail } from "./domain";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: "STUDENT" | "ORGANIZER" | "ADMIN";
      collegeId: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: "STUDENT" | "ORGANIZER" | "ADMIN";
    collegeId?: string;
  }
}

export const authConfig = {
  // JWT strategy is required when using CredentialsProvider.
  // The Prisma adapter is still used for user persistence but NOT session storage.
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  providers: [
    CredentialsProvider({
      name: "University Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const rawEmail = credentials?.email;
        const password = credentials?.password;

        if (typeof rawEmail !== "string" || typeof password !== "string") {
          return null;
        }
        const email = rawEmail.trim().toLowerCase();

        // AC-1: Reject emails outside allowed university domains.
        // Throwing "AccessDenied" maps to /error?error=AccessDenied via NextAuth's
        // error routing — returning null would incorrectly fire "CredentialsSignin".
        const college = await getCollegeForEmail(email);
        if (!college) {
          throw new Error("AccessDenied");
        }

        // Look up the user by exact email first.
        const user = await db.user.findUnique({ where: { email } });

        if (!user?.password || user.collegeId !== college.id) {
          return null;
        }

        // Verify the password against the stored hash.
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return null;
        }

        // AC-2: Session will be created for valid, allowed-domain users.
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          collegeId: user.collegeId,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // On first sign-in, `user` is populated — persist id into the JWT.
      if (user) {
        token.id = user.id;
      }
      if (typeof token.id !== "string") return null;
      // Refresh authorization on every server session read so demotions and
      // deleted accounts take effect without waiting for the JWT to expire.
      const currentUser = await db.user.findUnique({
        where: { id: token.id },
        select: { role: true, collegeId: true },
      });
      if (!currentUser) return null;
      token.role = currentUser.role;
      token.collegeId = currentUser.collegeId;
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
  },
} satisfies NextAuthConfig;
