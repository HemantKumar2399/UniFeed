import { ShieldCheck, Ticket } from "lucide-react";

import { DigitalTicket } from "@/components/DigitalTicket";
import { createTicketPayloadToken, getTicketPayloadSecret } from "@/lib/ticket-payload";
import { auth } from "@/server/auth";
import { db } from "@/server/db";

export default async function PassportPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const securedTicketCount = await db.rSVP.count({
    where: {
      userId: session.user.id,
      status: "GOING",
    },
  });

  const latestTicket = await db.rSVP.findFirst({
    where: {
      userId: session.user.id,
      status: "GOING",
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      event: {
        select: {
          title: true,
          date: true,
          location: true,
        },
      },
    },
  });

  let qrPayload: string | null = null;
  let tokenUnavailable = false;

  if (latestTicket) {
    try {
      qrPayload = createTicketPayloadToken(
        {
          studentId: session.user.id,
          eventTicketId: String(latestTicket.id),
          issuedAt: Date.now(),
        },
        getTicketPayloadSecret(),
      );
    } catch {
      tokenUnavailable = true;
    }
  }

  const formattedMeta = latestTicket
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(latestTicket.event.date)
    : null;

  return (
    <div className="flex flex-col gap-8 pb-32 md:pb-12">
      <header className="px-1 md:px-0">
        <h1 className="text-[40px] md:text-[48px] font-bold text-black/95 leading-[1.1] tracking-[-1.5px] mb-2">
          Student Passport
        </h1>
        <p className="text-[16px] text-[#615d59] font-medium leading-relaxed">
          Your persistent campus identity and secured event access.
        </p>
      </header>

      <section className="px-1 md:px-0">
        <article className="w-full rounded-[24px] border border-black/5 bg-[#0075de] p-6 text-white shadow-[0_23px_52px_rgba(0,0,0,0.1)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-white/80 text-[13px] font-semibold uppercase tracking-wider mb-2">
                Verified Identity
              </p>
              <h2 className="text-[28px] md:text-[34px] font-bold leading-[1.1] tracking-tight">
                {session.user.name ?? session.user.email ?? "Student"}
              </h2>
              <p className="text-[14px] text-white/80 mt-2">
                {session.user.email ?? "No email on file"}
              </p>
            </div>
            <div className="rounded-[12px] bg-white/15 p-3 border border-white/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-[14px] bg-white/10 border border-white/20 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wider text-white/75">Role</p>
              <p className="text-[15px] font-semibold mt-1">{session.user.role}</p>
            </div>
            <div className="rounded-[14px] bg-white/10 border border-white/20 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wider text-white/75">Secured Tickets</p>
              <p className="text-[15px] font-semibold mt-1">{securedTicketCount}</p>
            </div>
          </div>
        </article>
      </section>

      <section className="px-1 md:px-0">
        {latestTicket && qrPayload && formattedMeta ? (
          <DigitalTicket
            eventTitle={latestTicket.event.title}
            eventMeta={formattedMeta}
            location={latestTicket.event.location}
            ticketId={String(latestTicket.id)}
            token={qrPayload}
          />
        ) : tokenUnavailable ? (
          <div className="rounded-[20px] border border-red-200 bg-red-50 p-5 shadow-sm">
            <h3 className="text-[17px] font-bold tracking-tight text-red-800">Ticket security is temporarily unavailable</h3>
            <p className="mt-1 text-[14px] font-medium text-red-700">
              Scan token generation is disabled until a secure ticket payload secret is configured.
            </p>
          </div>
        ) : (
          <div className="rounded-[20px] border border-[#dddddd] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-[#f6f5f4] border border-black/5 flex items-center justify-center">
                <Ticket className="w-5 h-5 text-[#615d59]" />
              </div>
              <div>
                <h3 className="text-[17px] font-bold tracking-tight text-black/95">No secured tickets yet</h3>
                <p className="text-[14px] text-[#615d59] font-medium">
                  RSVP to an event to generate your secure QR entry token.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
