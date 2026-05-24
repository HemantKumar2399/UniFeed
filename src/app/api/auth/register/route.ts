import bcrypt from "bcryptjs";
import { type NextRequest, NextResponse } from "next/server";

import { db } from "@/server/db";

import { getCollegeForEmail } from "@/server/auth/domain";
import { PUBLIC_REGISTRATION_ROLE } from "@/server/auth/registration";

const SALT_ROUNDS = 12;
/** bcrypt silently truncates beyond 72 bytes — reject early to prevent two passwords matching. */
const BCRYPT_MAX_BYTES = 72;
const NAME_MAX_LENGTH = 100;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      email?: string;
      password?: string;
      name?: string;
    };

    const { email, password, name } = body;

    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 },
      );
    }

    // Guard against bcrypt's 72-byte silent truncation.
    if (Buffer.byteLength(password, "utf8") > BCRYPT_MAX_BYTES) {
      return NextResponse.json(
        { error: "Password must not exceed 72 characters." },
        { status: 400 },
      );
    }

    // AC-1: Domain check — reject non-university emails at registration too.
    const college = await getCollegeForEmail(email);
    if (!college) {
      return NextResponse.json(
        {
          error:
            "Your email domain is not allowed. Please use your university email.",
        },
        { status: 403 },
      );
    }

    // Prevent duplicate accounts.
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }

    const trimmedName =
      typeof name === "string" && name.trim()
        ? name.trim().slice(0, NAME_MAX_LENGTH)
        : null;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await db.user.create({
      data: {
        email,
        name: trimmedName,
        password: hashedPassword,
        role: PUBLIC_REGISTRATION_ROLE,
        collegeId: college.id,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    // P2002 = Unique constraint violation — race condition where two concurrent
    // requests both passed the findUnique check before either create ran.
    if (
      error instanceof Error &&
      "code" in error &&
      (error as { code: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }

    console.error("[register]", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
