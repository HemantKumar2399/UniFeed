import { notFound } from "next/navigation";
import Link from "next/link";

import { auth } from "@/server/auth";
import { Button } from "@/components/ui/button";
import { EventDetailPageShell } from "@/features/feed/components/EventDetailPageShell";
import { db } from "@/server/db";
import { EventDetailContent } from "@/features/feed/components/EventDetailContent";
import { resolveStudentEventAccess } from "@/lib/student-event-visibility";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventDetailPage({ params }: PageProps) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return notFound();
  }

  const { id } = await params;
  const eventId = Number.parseInt(id, 10);

  if (Number.isNaN(eventId) || eventId <= 0) {
    return notFound();
  }

  // Fetch event with club, rsvps count, and current user's RSVP status
  const event = await db.event.findUnique({
    where: { id: eventId },
    include: {
      club: {
        select: {
          id: true,
          name: true,
          logoUrl: true,
        },
      },
      _count: {
        select: {
          rsvps: {
            where: {
              status: {
                in: ["GOING", "ATTENDED"] as ("GOING" | "ATTENDED")[],
              },
            },
          },
        },
      },
      rsvps: {
        where: {
          userId: user.id,
        },
        select: {
          status: true,
        },
      },
    },
  });

  const accessDecision = resolveStudentEventAccess({
    eventStatus: event?.status,
    eventCollegeId: event?.collegeId,
    userCollegeId: user.collegeId,
  });

  // Verify event existence and visibility constraints
  if (!event || accessDecision === "hidden") {
    return notFound();
  }

  // Enforce college scope security: students can only access same-college events
  if (accessDecision === "wrong_college") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-subheading mb-2 text-foreground">
          Access Denied
        </h1>
        <p className="text-page-lead mb-6 text-muted-foreground">
          This event belongs to another university scope and cannot be accessed.
        </p>
        <Button asChild size="lg">
          <Link href="/home">Return Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <EventDetailPageShell event={event}>
      <EventDetailContent event={event} />
    </EventDetailPageShell>
  );
}
