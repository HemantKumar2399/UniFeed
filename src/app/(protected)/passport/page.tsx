import { ShieldAlert, ShieldCheck, Ticket } from "lucide-react";

import { StudentQrCard } from "@/components/StudentQrCard";
import { RsvpStatusBadge } from "@/features/rsvp/RsvpStatusBadge";
import { createStudentQrToken, getStudentQrSecret } from "@/lib/student-qr";
import { auth } from "@/server/auth";
import { db } from "@/server/db";

export default async function PassportPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const [studentProfile, activeRegistrations] = await Promise.all([
    db.studentProfile.findUnique({
      where: { userId: session.user.id },
      include: {
        college: true,
      },
    }),
    db.rSVP.findMany({
      where: {
        userId: session.user.id,
        status: {
          in: ["GOING", "WAITLISTED"],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            date: true,
            location: true,
            status: true,
            club: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    }),
  ]);

  let qrPayload: string | null = null;
  let tokenUnavailable = false;
  const qrRevoked = Boolean(studentProfile?.qrRevokedAt);

  if (studentProfile?.isVerified && studentProfile.studentQrId && !qrRevoked) {
    try {
      qrPayload = createStudentQrToken(
        {
          studentQrId: studentProfile.studentQrId,
          studentQrSecretVersion: studentProfile.studentQrSecretVersion,
          issuedAt: Date.now(),
        },
        getStudentQrSecret(),
      );
    } catch {
      tokenUnavailable = true;
    }
  }

  return (
    <div className="flex flex-col gap-8 pb-32 md:pb-12">
      <header className="px-1 md:px-0">
        <h1 className="text-page-title text-foreground mb-2">
          Student Passport
        </h1>
        <p className="text-page-lead text-muted-foreground">
          Your persistent campus identity and secured event access.
        </p>
      </header>

      <section className="px-1 md:px-0">
        <article className="card-surface-brand w-full p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-eyebrow mb-2 text-white/80">
                Verified Identity
              </p>
              <h2 className="text-entity-title">
                {session.user.name ?? session.user.email ?? "Student"}
              </h2>
              <p className="text-caption mt-2 text-white/80">
                {session.user.email ?? "No email on file"}
              </p>
            </div>
            <div className="rounded-[12px] border border-white/20 bg-white/15 p-3">
              {studentProfile?.isVerified ? (
                <ShieldCheck className="h-6 w-6" />
              ) : (
                <ShieldAlert className="h-6 w-6" />
              )}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-[14px] border border-white/20 bg-white/10 px-4 py-3">
              <p className="text-[11px] tracking-wider text-white/75 uppercase">
                College
              </p>
              <p className="mt-1 text-[15px] font-semibold">
                {studentProfile?.college.name ?? "College pending"}
              </p>
            </div>
            <div className="rounded-[14px] border border-white/20 bg-white/10 px-4 py-3">
              <p className="text-[11px] tracking-wider text-white/75 uppercase">
                PRN
              </p>
              <p className="mt-1 text-[15px] font-semibold">
                {studentProfile?.prn ?? "Profile incomplete"}
              </p>
            </div>
            <div className="rounded-[14px] border border-white/20 bg-white/10 px-4 py-3">
              <p className="text-[11px] tracking-wider text-white/75 uppercase">
                Verification
              </p>
              <p className="mt-1 text-[15px] font-semibold">
                {studentProfile?.isVerified ? "Verified" : "Pending review"}
              </p>
            </div>
            <div className="rounded-[14px] border border-white/20 bg-white/10 px-4 py-3">
              <p className="text-[11px] tracking-wider text-white/75 uppercase">
                Branch
              </p>
              <p className="mt-1 text-[15px] font-semibold">
                {studentProfile?.branch ?? "Not available"}
              </p>
            </div>
            <div className="rounded-[14px] border border-white/20 bg-white/10 px-4 py-3">
              <p className="text-[11px] tracking-wider text-white/75 uppercase">
                Course
              </p>
              <p className="mt-1 text-[15px] font-semibold">
                {studentProfile?.course ?? "Not available"}
              </p>
            </div>
            <div className="rounded-[14px] border border-white/20 bg-white/10 px-4 py-3">
              <p className="text-[11px] tracking-wider text-white/75 uppercase">
                Graduation Year
              </p>
              <p className="mt-1 text-[15px] font-semibold">
                {studentProfile?.graduationYear ?? "Not available"}
              </p>
            </div>
            <div className="rounded-[14px] border border-white/20 bg-white/10 px-4 py-3">
              <p className="text-[11px] tracking-wider text-white/75 uppercase">
                Section
              </p>
              <p className="mt-1 text-[15px] font-semibold">
                {studentProfile?.section ?? "Not set"}
              </p>
            </div>
            <div className="rounded-[14px] border border-white/20 bg-white/10 px-4 py-3">
              <p className="text-[11px] tracking-wider text-white/75 uppercase">
                Phone
              </p>
              <p className="mt-1 text-[15px] font-semibold">
                {studentProfile?.phone ?? "Not set"}
              </p>
            </div>
            <div className="rounded-[14px] border border-white/20 bg-white/10 px-4 py-3">
              <p className="text-[11px] tracking-wider text-white/75 uppercase">
                Active Registrations
              </p>
              <p className="mt-1 text-[15px] font-semibold">
                {activeRegistrations.length}
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="px-1 md:px-0">
        {!studentProfile ? (
          <div className="alert-panel surface-status-caution shadow-card p-5">
            <h3 className="text-section-title">
              Complete your student profile first
            </h3>
            <p className="text-caption mt-1">
              Your permanent passport QR appears once your profile details are
              available.
            </p>
          </div>
        ) : qrPayload ? (
          <StudentQrCard
            collegeName={studentProfile.college.name}
            qrId={studentProfile.studentQrId ?? "Unavailable"}
            studentName={session.user.name ?? session.user.email ?? "Student"}
            token={qrPayload}
          />
        ) : qrRevoked ? (
          <div className="alert-panel surface-status-warning shadow-card p-5">
            <h3 className="text-section-title">Passport QR revoked</h3>
            <p className="text-caption mt-1">
              An administrator needs to regenerate your permanent QR before it
              can be scanned again.
            </p>
          </div>
        ) : tokenUnavailable ? (
          <div className="alert-panel surface-status-danger shadow-card p-5">
            <h3 className="text-section-title">
              Passport QR is temporarily unavailable
            </h3>
            <p className="text-caption mt-1">
              Passport QR generation is disabled until a secure student QR
              secret is configured.
            </p>
          </div>
        ) : (
          <div className="border-whisper bg-card-bg shadow-card rounded-[20px] border p-5 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="bg-app-bg border-whisper flex h-10 w-10 items-center justify-center rounded-[10px] border transition-colors duration-300">
                <Ticket className="text-muted-foreground h-5 w-5" />
              </div>
              <div>
                <h3 className="text-section-title text-foreground">
                  Passport QR not ready yet
                </h3>
                <p className="text-caption text-muted-foreground">
                  Your profile exists, but an active student passport QR has not
                  been issued yet.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="px-1 md:px-0">
        <div className="border-whisper bg-card-bg shadow-card rounded-[24px] border p-5 transition-colors duration-300">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-muted-foreground/60 text-[12px] font-semibold tracking-[0.18em] uppercase">
                My Registrations
              </p>
              <h3 className="text-section-title text-foreground mt-2">
                Active event access
              </h3>
              <p className="text-caption text-muted-foreground mt-1">
                These registrations use your permanent passport QR at the venue.
              </p>
            </div>
            <div className="bg-app-bg rounded-[14px] px-4 py-3 text-right transition-colors duration-300">
              <p className="text-muted-foreground/60 text-[11px] font-semibold tracking-[0.18em] uppercase">
                Count
              </p>
              <p className="text-foreground mt-1 text-[22px] font-bold tracking-tight">
                {activeRegistrations.length}
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {activeRegistrations.length === 0 ? (
              <div className="border-whisper bg-app-bg text-muted-foreground rounded-[18px] border px-4 py-5 text-sm font-medium transition-colors duration-300">
                Your passport is ready. RSVP to an event to see active
                registrations here.
              </div>
            ) : (
              activeRegistrations.map((registration) => (
                <article
                  key={registration.id}
                  className="border-whisper bg-app-bg flex flex-col gap-4 rounded-[20px] border px-4 py-4 transition-colors duration-300 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="text-foreground text-[17px] font-semibold">
                      {registration.event.title}
                    </p>
                    <p className="text-muted-foreground mt-1 text-[13px] font-medium">
                      {registration.event.club.name} •{" "}
                      {registration.event.location}
                    </p>
                    <p className="text-muted-foreground mt-1 text-[13px] font-medium">
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(registration.event.date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <RsvpStatusBadge
                      className="gap-1 uppercase"
                      status={registration.status}
                    />
                    <span className="border-whisper bg-card-bg text-muted-foreground inline-flex rounded-full border px-3 py-1 text-[12px] font-semibold tracking-[0.16em] uppercase">
                      {registration.event.status}
                    </span>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
