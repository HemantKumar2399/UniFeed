"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { Shield, UserPlus, Users, Award, CheckCircle2, AlertCircle } from "lucide-react";

interface UserItem {
  id: string;
  name: string | null;
  email: string | null;
  role: "STUDENT" | "ORGANIZER" | "ADMIN" | "SUPER_ADMIN";
}

interface ClubItem {
  id: number;
  name: string;
}

interface AdminControlsProps {
  initialUsers: UserItem[];
  clubs: ClubItem[];
}

export function AdminControls({ initialUsers, clubs }: AdminControlsProps) {
  const [users, setUsers] = useState<UserItem[]>(initialUsers);

  // Form 1 State: Promote User
  const [promoteUserId, setPromoteUserId] = useState("");
  const [targetRole, setTargetRole] = useState<"STUDENT" | "ORGANIZER" | "ADMIN">("ORGANIZER");
  const [promoteError, setPromoteError] = useState<string | null>(null);
  const [promoteSuccess, setPromoteSuccess] = useState<string | null>(null);

  // Form 2 State: Assign Club Membership
  const [membershipUserId, setMembershipUserId] = useState("");
  const [membershipClubId, setMembershipClubId] = useState("");
  const [membershipRole, setMembershipRole] = useState<"OWNER" | "EDITOR">("EDITOR");
  const [membershipError, setMembershipError] = useState<string | null>(null);
  const [membershipSuccess, setMembershipSuccess] = useState<string | null>(null);

  // tRPC Mutations
  const promoteUserMutation = api.admin.promoteUser.useMutation({
    onSuccess: (updatedUser) => {
      setPromoteSuccess(`Successfully updated ${updatedUser.name || updatedUser.email}'s role to ${updatedUser.role}.`);
      setPromoteError(null);
      // Update local state
      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? { ...u, role: updatedUser.role as any } : u))
      );
      setPromoteUserId("");
    },
    onError: (err) => {
      setPromoteError(err.message || "Failed to promote user.");
      setPromoteSuccess(null);
    },
  });

  const assignMembershipMutation = api.admin.assignClubMembership.useMutation({
    onSuccess: () => {
      const selectedUser = users.find((u) => u.id === membershipUserId);
      const selectedClub = clubs.find((c) => c.id === Number(membershipClubId));
      setMembershipSuccess(
        `Successfully assigned ${selectedUser?.name || selectedUser?.email} as ${membershipRole} of "${selectedClub?.name}".`
      );
      setMembershipError(null);
      setMembershipUserId("");
      setMembershipClubId("");
    },
    onError: (err) => {
      setMembershipError(err.message || "Failed to assign club membership.");
      setMembershipSuccess(null);
    },
  });

  // Handle Role Promotion Submit
  const handlePromoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoteUserId) {
      setPromoteError("Please select a user to promote/modify.");
      return;
    }
    promoteUserMutation.mutate({
      userId: promoteUserId,
      role: targetRole,
    });
  };

  // Handle Membership Assignment Submit
  const handleMembershipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!membershipUserId) {
      setMembershipError("Please select an organizer/admin.");
      return;
    }
    if (!membershipClubId) {
      setMembershipError("Please select a club.");
      return;
    }
    assignMembershipMutation.mutate({
      userId: membershipUserId,
      clubId: Number(membershipClubId),
      role: membershipRole,
    });
  };

  // Filter users to only show Organizers or Admins for club assignments
  const organizerEligibleUsers = users.filter((u) => u.role === "ORGANIZER" || u.role === "ADMIN");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Promotion Form */}
      <div className="col-span-1 lg:col-span-2 space-y-8">
        <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-xl shadow-[0_4px_18px_rgba(0,0,0,0.02)] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#f2f9ff] text-[#097fe8] rounded-xl flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-black/95">User Role Management</h3>
              <p className="text-xs text-[#615d59]">Promote students to organizers or demote/adjust roles.</p>
            </div>
          </div>

          {promoteSuccess && (
            <div className="mb-4 p-4 bg-emerald-50 border border-emerald-100 rounded-lg flex items-start gap-2 text-emerald-800 text-sm">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{promoteSuccess}</span>
            </div>
          )}

          {promoteError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2 text-red-800 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{promoteError}</span>
            </div>
          )}

          <form onSubmit={handlePromoteSubmit} className="space-y-4">
            <div>
              <label htmlFor="promoteUser" className="block text-xs font-semibold text-[#615d59] uppercase tracking-wider mb-2">
                Select User
              </label>
              <select
                id="promoteUser"
                value={promoteUserId}
                onChange={(e) => setPromoteUserId(e.target.value)}
                className="w-full bg-white text-[rgba(0,0,0,0.9)] border border-[#dddddd] p-[8px] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#097fe8] text-sm"
              >
                <option value="">-- Choose a user in your college --</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name || "No name"} ({u.email}) [{u.role}]
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="targetRole" className="block text-xs font-semibold text-[#615d59] uppercase tracking-wider mb-2">
                Target Role
              </label>
              <select
                id="targetRole"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value as any)}
                className="w-full bg-white text-[rgba(0,0,0,0.9)] border border-[#dddddd] p-[8px] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#097fe8] text-sm"
              >
                <option value="STUDENT">STUDENT (Demote / Reset)</option>
                <option value="ORGANIZER">ORGANIZER</option>
                <option value="ADMIN">ADMIN (College Admin)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={promoteUserMutation.isPending}
              className="bg-[#0075de] hover:bg-[#005bab] text-white px-5 py-2.5 rounded-[6px] font-semibold text-[14px] active:scale-95 transition-all shadow-[0_2px_4px_rgba(0,0,0,0.05)] disabled:opacity-50"
            >
              {promoteUserMutation.isPending ? "Updating Role..." : "Update User Role"}
            </button>
          </form>
        </div>

        {/* Club Membership Assignment Form */}
        <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-xl shadow-[0_4px_18px_rgba(0,0,0,0.02)] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#f2f9ff] text-[#097fe8] rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-black/95">Club Ownership & Permissions</h3>
              <p className="text-xs text-[#615d59]">Assign Organizers or Admins to edit or own specific clubs.</p>
            </div>
          </div>

          {membershipSuccess && (
            <div className="mb-4 p-4 bg-emerald-50 border border-emerald-100 rounded-lg flex items-start gap-2 text-emerald-800 text-sm">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{membershipSuccess}</span>
            </div>
          )}

          {membershipError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2 text-red-800 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{membershipError}</span>
            </div>
          )}

          <form onSubmit={handleMembershipSubmit} className="space-y-4">
            <div>
              <label htmlFor="membershipUser" className="block text-xs font-semibold text-[#615d59] uppercase tracking-wider mb-2">
                Select Organizer / Admin
              </label>
              <select
                id="membershipUser"
                value={membershipUserId}
                onChange={(e) => setMembershipUserId(e.target.value)}
                className="w-full bg-white text-[rgba(0,0,0,0.9)] border border-[#dddddd] p-[8px] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#097fe8] text-sm"
              >
                <option value="">-- Choose an eligible user --</option>
                {organizerEligibleUsers.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name || "No name"} ({u.email}) [{u.role}]
                  </option>
                ))}
              </select>
              {organizerEligibleUsers.length === 0 && (
                <p className="text-amber-600 text-xs mt-1.5 font-medium">
                  * Note: There are no Organizers or Admins in this list. Promote a student to ORGANIZER first.
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="membershipClub" className="block text-xs font-semibold text-[#615d59] uppercase tracking-wider mb-2">
                  Select Club
                </label>
                <select
                  id="membershipClub"
                  value={membershipClubId}
                  onChange={(e) => setMembershipClubId(e.target.value)}
                  className="w-full bg-white text-[rgba(0,0,0,0.9)] border border-[#dddddd] p-[8px] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#097fe8] text-sm"
                >
                  <option value="">-- Choose a club --</option>
                  {clubs.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="membershipRole" className="block text-xs font-semibold text-[#615d59] uppercase tracking-wider mb-2">
                  Club Permission level
                </label>
                <select
                  id="membershipRole"
                  value={membershipRole}
                  onChange={(e) => setMembershipRole(e.target.value as any)}
                  className="w-full bg-white text-[rgba(0,0,0,0.9)] border border-[#dddddd] p-[8px] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#097fe8] text-sm"
                >
                  <option value="EDITOR">EDITOR (Manage and update events)</option>
                  <option value="OWNER">OWNER (Full control + manage editors)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={assignMembershipMutation.isPending}
              className="bg-[#0075de] hover:bg-[#005bab] text-white px-5 py-2.5 rounded-[6px] font-semibold text-[14px] active:scale-95 transition-all shadow-[0_2px_4px_rgba(0,0,0,0.05)] disabled:opacity-50"
            >
              {assignMembershipMutation.isPending ? "Assigning Permissions..." : "Assign Permission"}
            </button>
          </form>
        </div>
      </div>

      {/* Directory Sidebar */}
      <div className="col-span-1">
        <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-xl shadow-[0_4px_18px_rgba(0,0,0,0.02)] p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#f2f9ff] text-[#097fe8] rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-black/95">College Registry</h3>
              <p className="text-xs text-[#615d59]">Registered users summary in your scope.</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[480px]">
            {users.map((u) => {
              const badgeColors =
                u.role === "SUPER_ADMIN"
                  ? "bg-purple-50 text-purple-700 border-purple-100"
                  : u.role === "ADMIN"
                  ? "bg-red-50 text-red-700 border-red-100"
                  : u.role === "ORGANIZER"
                  ? "bg-blue-50 text-blue-700 border-blue-100"
                  : "bg-zinc-50 text-zinc-600 border-zinc-100";

              return (
                <div
                  key={u.id}
                  className="p-3 border border-black/5 rounded-lg flex items-center justify-between text-xs transition-colors hover:bg-[#f6f5f4]"
                >
                  <div className="truncate pr-2">
                    <p className="font-semibold text-black/95 truncate">{u.name || "No Name"}</p>
                    <p className="text-[10px] text-[#a39e98] truncate">{u.email}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold tracking-wide uppercase ${badgeColors}`}>
                    {u.role}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
