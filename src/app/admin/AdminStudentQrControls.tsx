"use client";

import { useState } from "react";
import {
  AlertCircle,
  RefreshCcw,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

import { api } from "@/trpc/react";

type StudentQrAdminRecord = {
  userId: string;
  name: string | null;
  email: string | null;
  isVerified: boolean;
  studentQrId: string | null;
  studentQrSecretVersion: number;
  qrRevokedAt: string | null;
};

type AdminStudentQrControlsProps = {
  initialRecords: StudentQrAdminRecord[];
};

function mapRecordFromPayload(payload: {
  userId: string;
  user: { name: string | null; email: string | null };
  isVerified: boolean;
  studentQrId: string | null;
  studentQrSecretVersion: number;
  qrRevokedAt: Date | null;
}): StudentQrAdminRecord {
  return {
    userId: payload.userId,
    name: payload.user.name,
    email: payload.user.email,
    isVerified: payload.isVerified,
    studentQrId: payload.studentQrId,
    studentQrSecretVersion: payload.studentQrSecretVersion,
    qrRevokedAt: payload.qrRevokedAt ? payload.qrRevokedAt.toISOString() : null,
  };
}

export function AdminStudentQrControls({
  initialRecords,
}: AdminStudentQrControlsProps) {
  const [records, setRecords] = useState(initialRecords);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const [flashTone, setFlashTone] = useState<"success" | "error">("success");

  const verification = api.admin.setStudentVerification.useMutation({
    onSuccess: (payload) => {
      setRecords((current) =>
        current.map((record) =>
          record.userId === payload.userId
            ? mapRecordFromPayload(payload)
            : record,
        ),
      );
      setFlashTone("success");
      setFlashMessage(
        payload.isVerified
          ? "Student identity verified."
          : "Student identity marked pending review.",
      );
    },
    onError: (error) => {
      setFlashTone("error");
      setFlashMessage(error.message);
    },
  });

  const revokeStudentQr = api.admin.revokeStudentQr.useMutation({
    onSuccess: (payload) => {
      const nextRecord = mapRecordFromPayload(payload);
      setRecords((current) =>
        current.map((record) =>
          record.userId === payload.userId ? nextRecord : record,
        ),
      );
      setFlashTone("success");
      setFlashMessage(
        `Revoked the active QR for ${payload.user.name ?? payload.user.email ?? "student"}.`,
      );
    },
    onError: (error) => {
      setFlashTone("error");
      setFlashMessage(error.message);
    },
  });

  const regenerateStudentQr = api.admin.regenerateStudentQr.useMutation({
    onSuccess: (payload) => {
      const nextRecord = mapRecordFromPayload(payload);
      setRecords((current) =>
        current.map((record) =>
          record.userId === payload.userId ? nextRecord : record,
        ),
      );
      setFlashTone("success");
      setFlashMessage(
        `Generated a fresh QR for ${payload.user.name ?? payload.user.email ?? "student"}.`,
      );
    },
    onError: (error) => {
      setFlashTone("error");
      setFlashMessage(error.message);
    },
  });

  return (
    <section className="rounded-[32px] border border-black/10 bg-white p-6 shadow-[0_18px_44px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.18em] text-[#a39e98] uppercase">
            Epic 8 Student Passport
          </p>
          <h2 className="mt-2 text-[24px] font-bold tracking-tight text-black/95">
            Student QR controls
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed font-medium text-[#615d59]">
            Revoke a compromised passport QR or rotate a fresh one without
            changing the student&apos;s profile.
          </p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-[#f6f5f4] px-4 py-3 text-right">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#a39e98] uppercase">
            Profiles In Scope
          </p>
          <p className="mt-2 text-[24px] font-bold tracking-tight text-black/95">
            {records.length}
          </p>
        </div>
      </div>

      <div aria-live="polite" className="mt-4 min-h-6">
        {flashMessage ? (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
              flashTone === "success"
                ? "border-emerald-100 bg-emerald-50 text-emerald-800"
                : "border-red-100 bg-red-50 text-red-800"
            }`}
          >
            {flashMessage}
          </div>
        ) : null}
      </div>

      <div className="mt-4 space-y-3">
        {records.map((record) => {
          const isRevoked = Boolean(record.qrRevokedAt);
          const isBusy =
            verification.isPending ||
            (revokeStudentQr.isPending &&
              revokeStudentQr.variables?.userId === record.userId) ||
            (regenerateStudentQr.isPending &&
              regenerateStudentQr.variables?.userId === record.userId);

          return (
            <article
              key={record.userId}
              className="rounded-[24px] border border-black/10 bg-[#fcfbfa] px-4 py-4 shadow-[0_8px_20px_rgba(0,0,0,0.03)]"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[16px] font-semibold text-black/95">
                      {record.name ?? record.email ?? "Unknown student"}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase ${
                        isRevoked
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {isRevoked ? (
                        <ShieldAlert className="h-3.5 w-3.5" />
                      ) : (
                        <ShieldCheck className="h-3.5 w-3.5" />
                      )}
                      {isRevoked ? "Revoked" : "Active"}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] font-medium text-[#615d59]">
                    {record.email ?? "No email on file"}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[12px] font-medium text-[#615d59]">
                    <span className="rounded-full border border-black/10 bg-white px-3 py-1">
                      Version {record.studentQrSecretVersion}
                    </span>
                    <span className="rounded-full border border-black/10 bg-white px-3 py-1">
                      {record.isVerified
                        ? "Verified profile"
                        : "Verification pending"}
                    </span>
                    <span className="rounded-full border border-black/10 bg-white px-3 py-1 font-mono">
                      {record.studentQrId ?? "No QR issued"}
                    </span>
                  </div>
                  {record.qrRevokedAt ? (
                    <p className="mt-2 text-[12px] font-medium text-amber-700">
                      Revoked on{" "}
                      {new Date(record.qrRevokedAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() =>
                      verification.mutate({
                        userId: record.userId,
                        verified: !record.isVerified,
                      })
                    }
                    className="border-input min-h-11 rounded-xl border px-4 text-sm font-semibold disabled:opacity-50"
                  >
                    {record.isVerified ? "Mark pending" : "Verify identity"}
                  </button>
                  <button
                    type="button"
                    disabled={isBusy || isRevoked || !record.studentQrId}
                    onClick={() => {
                      revokeStudentQr.mutate({ userId: record.userId });
                    }}
                    className="inline-flex min-h-11 items-center justify-center rounded-[12px] border border-[#f0b7ad] bg-[#fff6f4] px-4 py-2 text-sm font-semibold text-[#a53a28] transition-colors hover:bg-[#ffe9e3] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Revoke QR
                  </button>
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => {
                      regenerateStudentQr.mutate({ userId: record.userId });
                    }}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] bg-[#097fe8] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0568c2] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <RefreshCcw className="h-4 w-4" />
                    Regenerate QR
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {records.length === 0 ? (
        <div className="mt-4 flex items-start gap-2 rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-medium text-yellow-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          No student profiles are available in this college yet.
        </div>
      ) : null}
    </section>
  );
}
