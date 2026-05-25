import React from "react";
import { 
  FileEdit, 
  Clock, 
  CheckCircle, 
  Globe, 
  AlertTriangle, 
  XCircle,
  Unlock,
  AlertCircle,
  Lock,
  Users,
  Play
} from "lucide-react";
import { 
  EVENT_STATUS_META, 
  REGISTRATION_STATUS_META, 
  type EventStatusType, 
  type RegistrationStatus 
} from "@/lib/event-status";

interface EventStatusBadgeProps {
  status: EventStatusType;
  className?: string;
}

export function EventStatusBadge({ status, className = "" }: EventStatusBadgeProps) {
  const meta = EVENT_STATUS_META[status];
  if (!meta) return null;

  const IconMap = {
    DRAFT: FileEdit,
    SUBMITTED: Clock,
    APPROVED: CheckCircle,
    PUBLISHED: Globe,
    REJECTED: AlertTriangle,
    CANCELLED: XCircle,
  };

  const IconComponent = IconMap[status] || Clock;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold shadow-xs transition-colors ${meta.colorClass} ${className}`}
      title={meta.description}
    >
      <IconComponent className="h-3.5 w-3.5 shrink-0" />
      <span>{meta.label}</span>
    </span>
  );
}

interface RegistrationStatusBadgeProps {
  status: RegistrationStatus;
  className?: string;
}

export function RegistrationStatusBadge({ status, className = "" }: RegistrationStatusBadgeProps) {
  const meta = REGISTRATION_STATUS_META[status];
  if (!meta) return null;

  const IconMap = {
    OPEN: Unlock,
    CLOSING_SOON: AlertCircle,
    CLOSED_BY_DEADLINE: Lock,
    FULL: Users,
    EVENT_STARTED: Play,
  };

  const IconComponent = IconMap[status] || Unlock;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold shadow-xs transition-colors ${meta.colorClass} ${className}`}
    >
      <IconComponent className="h-3.5 w-3.5 shrink-0" />
      <span>{meta.label}</span>
    </span>
  );
}
