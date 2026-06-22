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

  if (studentProfile?.studentQrId && !qrRevoked) {
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
        <h1 className="text-page-title mb-2 text-foreground">
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
              <p className="text-eyebrow text-white/80 mb-2">
                Verified Identity
              </p>
              <h2 className="text-entity-title">
                {session.user.name ?? session.user.email ?? "Student"}
              </h2>
              <p className="text-caption mt-2 text-white/80">
                {session.user.email ?? "No email on file"}
              </p>
            </div>
            <div className="rounded-[12px] bg-white/15 p-3 border border-white/20">
              {studentProfile?.isVerified ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-[14px] bg-white/10 border border-white/20 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wider text-white/75">College</p>
              <p className="text-[15px] font-semibold mt-1">{studentProfile?.college.name ?? "College pending"}</p>
            </div>
            <div className="rounded-[14px] bg-white/10 border border-white/20 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wider text-white/75">PRN</p>
              <p className="text-[15px] font-semibold mt-1">{studentProfile?.prn ?? "Profile incomplete"}</p>
            </div>
            <div className="rounded-[14px] bg-white/10 border border-white/20 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wider text-white/75">Verification</p>
              <p className="text-[15px] font-semibold mt-1">{studentProfile?.isVerified ? "Verified" : "Pending review"}</p>
            </div>
            <div className="rounded-[14px] bg-white/10 border border-white/20 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wider text-white/75">Branch</p>
              <p className="text-[15px] font-semibold mt-1">{studentProfile?.branch ?? "Not available"}</p>
            </div>
            <div className="rounded-[14px] bg-white/10 border border-white/20 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wider text-white/75">Course</p>
              <p className="text-[15px] font-semibold mt-1">{studentProfile?.course ?? "Not available"}</p>
            </div>
            <div className="rounded-[14px] bg-white/10 border border-white/20 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wider text-white/75">Graduation Year</p>
              <p className="text-[15px] font-semibold mt-1">{studentProfile?.graduationYear ?? "Not available"}</p>
            </div>
            <div className="rounded-[14px] bg-white/10 border border-white/20 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wider text-white/75">Section</p>
              <p className="text-[15px] font-semibold mt-1">{studentProfile?.section ?? "Not set"}</p>
            </div>
            <div className="rounded-[14px] bg-white/10 border border-white/20 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wider text-white/75">Phone</p>
              <p className="text-[15px] font-semibold mt-1">{studentProfile?.phone ?? "Not set"}</p>
            </div>
            <div className="rounded-[14px] bg-white/10 border border-white/20 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wider text-white/75">Active Registrations</p>
              <p className="text-[15px] font-semibold mt-1">{activeRegistrations.length}</p>
            </div>
          </div>
        </article>
      </section>

      <section className="px-1 md:px-0">
        {!studentProfile ? (
          <div className="alert-panel surface-status-caution p-5 shadow-card">
            <h3 className="text-section-title">Complete your student profile first</h3>
            <p className="text-caption mt-1">
              Your permanent passport QR appears once your profile details are available.
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
          <div className="alert-panel surface-status-warning p-5 shadow-card">
            <h3 className="text-section-title">Passport QR revoked</h3>
            <p className="text-caption mt-1">
              An administrator needs to regenerate your permanent QR before it can be scanned again.
            </p>
          </div>
        ) : tokenUnavailable ? (
          <div className="alert-panel surface-status-danger p-5 shadow-card">
            <h3 className="text-section-title">Passport QR is temporarily unavailable</h3>
            <p className="text-caption mt-1">
              Passport QR generation is disabled until a secure student QR secret is configured.
            </p>
          </div>
        ) : (
          <div className="rounded-[20px] border border-whisper bg-card-bg p-5 shadow-card transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-app-bg border border-whisper flex items-center justify-center transition-colors duration-300">
                <Ticket className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-section-title text-foreground">Passport QR not ready yet</h3>
                <p className="text-caption text-muted-foreground">
                  Your profile exists, but an active student passport QR has not been issued yet.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="px-1 md:px-0">
        <div className="rounded-[24px] border border-whisper bg-card-bg p-5 shadow-card transition-colors duration-300">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/60">My Registrations</p>
              <h3 className="text-section-title mt-2 text-foreground">Active event access</h3>
              <p className="text-caption mt-1 text-muted-foreground">
                These registrations use your permanent passport QR at the venue.
              </p>
            </div>
            <div className="rounded-[14px] bg-app-bg px-4 py-3 text-right transition-colors duration-300">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/60">Count</p>
              <p className="mt-1 text-[22px] font-bold tracking-tight text-foreground">{activeRegistrations.length}</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {activeRegistrations.length === 0 ? (
              <div className="rounded-[18px] border border-whisper bg-app-bg px-4 py-5 text-sm font-medium text-muted-foreground transition-colors duration-300">
                Your passport is ready. RSVP to an event to see active registrations here.
              </div>
            ) : (
              activeRegistrations.map((registration) => (
                <article
                  key={registration.id}
                  className="flex flex-col gap-4 rounded-[20px] border border-whisper bg-app-bg px-4 py-4 md:flex-row md:items-center md:justify-between transition-colors duration-300"
                >
                  <div>
                    <p className="text-[17px] font-semibold text-foreground">{registration.event.title}</p>
                    <p className="mt-1 text-[13px] font-medium text-muted-foreground">
                      {registration.event.club.name} • {registration.event.location}
                    </p>
                    <p className="mt-1 text-[13px] font-medium text-muted-foreground">
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
                    <span className="inline-flex rounded-full border border-whisper bg-card-bg px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
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
