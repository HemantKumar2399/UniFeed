"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { Shield, UserPlus, Users, Award, CheckCircle2, AlertCircle, Search } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface UserItem {
  id: string;
  name: string | null;
  email: string | null;
  role: "STUDENT" | "ORGANIZER" | "ADMIN";
}

interface ClubItem {
  id: number;
  name: string;
  memberCount?: number;
  eventCount?: number;
  isActive?: boolean;
}

interface AdminControlsProps {
  initialUsers: UserItem[];
  clubs: ClubItem[];
}

export function AdminControls({ initialUsers, clubs }: AdminControlsProps) {
  const [users, setUsers] = useState<UserItem[]>(initialUsers);
  const [clubOptions, setClubOptions] = useState<ClubItem[]>(clubs);
  const [activeTab, setActiveTab] = useState<"users" | "communities">("users");
  const [hubSearchQuery, setHubSearchQuery] = useState("");

  const filteredClubs = clubOptions.filter((c) =>
    c.name.toLowerCase().includes(hubSearchQuery.toLowerCase())
  );

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

  // Form 3 State: Create Club
  const [clubName, setClubName] = useState("");
  const [clubLogoUrl, setClubLogoUrl] = useState("");
  const [clubCreateError, setClubCreateError] = useState<string | null>(null);
  const [clubCreateSuccess, setClubCreateSuccess] = useState<string | null>(null);

  // tRPC Mutations
  const promoteUserMutation = api.admin.promoteUser.useMutation({
    onSuccess: (updatedUser) => {
      setPromoteSuccess(`Successfully updated ${updatedUser.name ?? updatedUser.email}'s role to ${updatedUser.role}.`);
      setPromoteError(null);
      // Update local state
      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? { ...u, role: updatedUser.role as UserItem["role"] } : u))
      );
      setPromoteUserId("");
    },
    onError: (err) => {
      setPromoteError(err.message ?? "Failed to promote user.");
      setPromoteSuccess(null);
    },
  });

  const assignMembershipMutation = api.admin.assignClubMembership.useMutation({
    onSuccess: () => {
      const selectedUser = users.find((u) => u.id === membershipUserId);
      const selectedClub = clubOptions.find((c) => c.id === Number(membershipClubId));
      setMembershipSuccess(
        `Successfully assigned ${selectedUser?.name ?? selectedUser?.email} as ${membershipRole} of "${selectedClub?.name}".`
      );
      setMembershipError(null);
      setMembershipUserId("");
      setMembershipClubId("");
    },
    onError: (err) => {
      setMembershipError(err.message ?? "Failed to assign club membership.");
      setMembershipSuccess(null);
    },
  });

  const createClubMutation = api.club.create.useMutation({
    onSuccess: (createdClub) => {
      setClubCreateSuccess(`Successfully created "${createdClub.name}".`);
      setClubCreateError(null);
      setClubName("");
      setClubLogoUrl("");
      setClubOptions((previous) =>
        [...previous, { id: createdClub.id, name: createdClub.name, isActive: true }].sort((a, b) =>
          a.name.localeCompare(b.name),
        ),
      );
    },
    onError: (err) => {
      setClubCreateError(err.message ?? "Failed to create club.");
      setClubCreateSuccess(null);
    },
  });

  const toggleClubStatusMutation = api.club.toggleClubStatus.useMutation({
    onSuccess: (updatedClub) => {
      const statusClub = updatedClub as unknown as { id: number; isActive: boolean };
      setClubOptions((prev) =>
        prev.map((c) => (c.id === statusClub.id ? { ...c, isActive: statusClub.isActive } : c))
      );
      toast.success(`Community status updated successfully.`);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to toggle community status.");
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

  const handleCreateClubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createClubMutation.mutate({
      name: clubName,
      logoUrl: clubLogoUrl,
    });
  };

  // Filter users to only show Organizers or Admins for club assignments
  const organizerEligibleUsers = users.filter(
    (u) => u.role === "ORGANIZER" || u.role === "ADMIN",
  );

  return (
    <div className="space-y-8">
      {/* Tabs Navigation */}
      <div className="flex border-b border-black/10 gap-6">
        <button
          type="button"
          onClick={() => setActiveTab("users")}
          className={cn(
            "pb-3 text-[15px] font-bold border-b-2 transition-all relative",
            activeTab === "users"
              ? "border-[#dd5b00] text-[#dd5b00]"
              : "border-transparent text-[#6c655f] hover:text-black"
          )}
        >
          Users & Permissions
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("communities")}
          className={cn(
            "pb-3 text-[15px] font-bold border-b-2 transition-all relative",
            activeTab === "communities"
              ? "border-[#dd5b00] text-[#dd5b00]"
              : "border-transparent text-[#6c655f] hover:text-black"
          )}
        >
          Community Hubs Moderation
        </button>
      </div>

      {activeTab === "users" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Promotion Form */}
          <div className="col-span-1 lg:col-span-2 space-y-8">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-black/10 bg-[#f6f5f4] px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">Users In Scope</p>
                <p className="mt-2 text-[24px] font-bold tracking-tight text-black/95">{users.length}</p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-[#f6f5f4] px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">Assignable People</p>
                <p className="mt-2 text-[24px] font-bold tracking-tight text-black/95">{organizerEligibleUsers.length}</p>
              </div>
            </div>

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
                        {u.name ?? "No name"} ({u.email}) [{u.role}]
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
                    onChange={(e) => setTargetRole(e.target.value as "STUDENT" | "ORGANIZER" | "ADMIN")}
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
                        {u.name ?? "No name"} ({u.email}) [{u.role}]
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
                      {clubOptions.map((c) => (
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
                      onChange={(e) => setMembershipRole(e.target.value as "OWNER" | "EDITOR")}
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
            <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-xl shadow-[0_4px_18px_rgba(0,0,0,0.02)] p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#f2f9ff] text-[#097fe8] rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-black/95">College Registry</h3>
                  <p className="text-xs text-[#615d59]">Registered users summary in your scope.</p>
                </div>
              </div>

              <div className="space-y-3">
                {users.map((u) => {
                  const badgeColors =
                    u.role === "ADMIN"
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
                        <p className="font-semibold text-black/95 truncate">{u.name ?? "No Name"}</p>
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
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Community Registry & Moderation panel */}
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-xl shadow-[0_4px_18px_rgba(0,0,0,0.02)] p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#f2f9ff] text-[#097fe8] rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-black/95">Community Hubs Registry</h3>
                    <p className="text-xs text-[#615d59]">Enable, disable, or moderate hubs visible to students.</p>
                  </div>
                </div>

                <div className="relative w-full sm:w-64">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-400">
                    <Search className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    value={hubSearchQuery}
                    onChange={(e) => setHubSearchQuery(e.target.value)}
                    placeholder="Search communities by name..."
                    className="w-full bg-white text-[rgba(0,0,0,0.9)] border border-[#dddddd] pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#097fe8] text-xs transition-shadow"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredClubs.map((club) => {
                  const isActive = club.isActive !== false;
                  return (
                    <div key={club.id} className="rounded-xl border border-black/10 bg-[#f6f5f4] p-4 flex flex-col justify-between gap-4 hover:border-black/20 transition-all">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[15px] font-bold text-black/95 flex items-center gap-2">
                            {club.name}
                            <span className={`inline-block w-2.5 h-2.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-rose-500"}`} />
                          </p>
                          <p className="mt-1 text-[12px] font-medium text-[#615d59]">
                            {club.memberCount ?? 0} members mapped
                          </p>
                        </div>
                        <span className="rounded-full border border-black/10 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8a847d]">
                          {club.eventCount ?? 0} events
                        </span>
                      </div>

                      <div className="flex justify-between items-center border-t border-black/5 pt-3">
                        <span className="text-[12px] font-medium text-[#615d59]">
                          Status: <span className={isActive ? "text-emerald-700 font-bold" : "text-rose-700 font-bold"}>{isActive ? "Active" : "Disabled"}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            toggleClubStatusMutation.mutate({
                              clubId: club.id,
                              isActive: !isActive,
                            });
                          }}
                          disabled={toggleClubStatusMutation.isPending}
                          className={`text-[12px] font-bold px-4 py-1.5 rounded-lg border transition-all active:scale-95 hover:shadow-sm disabled:opacity-50 ${isActive
                              ? "bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100"
                              : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                            }`}
                        >
                          {isActive ? "Disable Hub" : "Enable Hub"}
                        </button>
                      </div>
                    </div>
                  );
                })}
                {filteredClubs.length === 0 && (
                  <div className="col-span-2 rounded-xl border border-dashed border-black/15 bg-[#f6f5f4] py-8 text-center text-[13px] font-medium text-[#615d59]">
                    No communities found matching your search.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Create Community */}
          <div className="col-span-1">
            <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-xl shadow-[0_4px_18px_rgba(0,0,0,0.02)] p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#f2f9ff] text-[#097fe8] rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-black/95">Create Community</h3>
                  <p className="text-xs text-[#615d59]">Create a new club for this college.</p>
                </div>
              </div>

              {clubCreateSuccess && (
                <div className="mb-4 p-4 bg-emerald-50 border border-emerald-100 rounded-lg flex items-start gap-2 text-emerald-800 text-sm">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{clubCreateSuccess}</span>
                </div>
              )}

              {clubCreateError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2 text-red-800 text-sm">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{clubCreateError}</span>
                </div>
              )}

              <form onSubmit={handleCreateClubSubmit} className="space-y-4">
                <div>
                  <label htmlFor="clubName" className="block text-xs font-semibold text-[#615d59] uppercase tracking-wider mb-2">
                    Club Name
                  </label>
                  <input
                    id="clubName"
                    type="text"
                    value={clubName}
                    onChange={(e) => setClubName(e.target.value)}
                    className="w-full bg-white text-[rgba(0,0,0,0.9)] border border-[#dddddd] p-[8px] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#097fe8] text-sm"
                    placeholder="Example: Design Collective"
                  />
                </div>

                <div>
                  <label htmlFor="clubLogoUrl" className="block text-xs font-semibold text-[#615d59] uppercase tracking-wider mb-2">
                    Logo URL
                  </label>
                  <input
                    id="clubLogoUrl"
                    type="url"
                    value={clubLogoUrl}
                    onChange={(e) => setClubLogoUrl(e.target.value)}
                    className="w-full bg-white text-[rgba(0,0,0,0.9)] border border-[#dddddd] p-[8px] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#097fe8] text-sm"
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                <button
                  type="submit"
                  disabled={createClubMutation.isPending}
                  className="bg-[#0075de] hover:bg-[#005bab] text-white px-5 py-2.5 rounded-[6px] font-semibold text-[14px] active:scale-95 transition-all shadow-[0_2px_4px_rgba(0,0,0,0.05)] disabled:opacity-50 w-full"
                >
                  {createClubMutation.isPending ? "Creating Club..." : "Create Club"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
