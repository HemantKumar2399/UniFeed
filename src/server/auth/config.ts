import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "@/server/db";

import { isAllowedDomain } from "./domain";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
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
        const email = credentials?.email;
        const password = credentials?.password;

        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }

        // AC-1: Reject emails outside allowed university domains.
        // Throwing "AccessDenied" maps to /error?error=AccessDenied via NextAuth's
        // error routing — returning null would incorrectly fire "CredentialsSignin".
        if (!isAllowedDomain(email)) {
          throw new Error("AccessDenied");
        }

        // Look up the user by email.
        const user = await db.user.findUnique({ where: { email } });
        if (!user?.password) {
          return null;
        }

        // Verify the password against the stored hash.
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return null;
        }

        // AC-2: Session will be created for valid, allowed-domain users.
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      // On first sign-in, `user` is populated — persist id into the JWT.
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (typeof token.id === "string") {
        session.user.id = token.id;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
