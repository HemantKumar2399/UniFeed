import Link from "next/link";
import { User, Settings, CreditCard, Users, LogOut, ShieldCheck, ArrowUpRight } from "lucide-react";
import { auth } from "@/server/auth";
import { SignOutForm } from "@/components/SignOutForm";

export default async function DashboardSettingsPage() {
  const session = await auth();
  const userName = session?.user?.name ?? "Organizer";
  const userInitial = userName.charAt(0) || "O";
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <div className="flex flex-col gap-8 pb-32 md:pb-12 max-w-4xl">
      <header className="px-1 md:px-0">
        <h1 className="text-[40px] md:text-[48px] font-bold text-black/95 leading-[1.1] tracking-[-1.5px] mb-8">
          Settings
        </h1>
        
        <div className="w-full bg-[#f6f5f4] rounded-[24px] p-6 border border-black/5 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-[#0075de] text-white flex items-center justify-center text-[28px] font-bold shadow-[0_4px_18px_rgba(0,117,222,0.2)]">
            {userInitial}
          </div>
          <div>
            <h2 className="text-[24px] font-bold text-black/95 tracking-tight">{userName}</h2>
            <p className="text-[15px] font-medium text-[#615d59] mt-1">{session?.user?.email}</p>
          </div>
        </div>
      </header>

      {isAdmin && (
        <section className="px-1 md:px-0">
          <Link
            href="/admin"
            className="flex items-center justify-between gap-4 rounded-[24px] border border-black/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f2f9ff] text-[#097fe8]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">Admin Access</p>
                <h2 className="text-[18px] font-bold tracking-tight text-black/95">Open College Control Center</h2>
                <p className="mt-1 text-[13px] font-medium text-[#615d59]">
                  Jump to role management, community ownership, and route shortcuts for admin workflows.
                </p>
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-[#097fe8]" />
          </Link>
        </section>
      )}

      {/* Settings Grid */}
      <section className="px-1 md:px-0 flex flex-col gap-2">
        <h3 className="text-[14px] font-bold uppercase tracking-wider text-[#a39e98] px-2 mb-2">Organization</h3>
        
        <div className="flex flex-col bg-white rounded-[16px] border border-[#dddddd] shadow-sm overflow-hidden">
          <div className="flex items-center gap-4 p-4 border-b border-[#dddddd] cursor-pointer hover:bg-[#f6f5f4] active:bg-[#eaeaea] transition-colors">     
            <div className="w-8 h-8 rounded-full bg-[#f2f9ff] flex items-center justify-center">
              <Settings className="w-4 h-4 text-[#097fe8]" />
            </div>
            <div className="flex-1">
              <span className="text-[16px] font-semibold text-black/90 block">General Information</span>
              <span className="text-[13px] text-[#a39e98] font-medium">Update organization name and domain</span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border-b border-[#dddddd] cursor-pointer hover:bg-[#f6f5f4] active:bg-[#eaeaea] transition-colors">     
            <div className="w-8 h-8 rounded-full bg-[#f2f9ff] flex items-center justify-center">
              <Users className="w-4 h-4 text-[#097fe8]" />
            </div>
            <div className="flex-1">
              <span className="text-[16px] font-semibold text-black/90 block">Team Members</span>
              <span className="text-[13px] text-[#a39e98] font-medium">Manage admins and access controls</span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border-b border-[#dddddd] cursor-pointer hover:bg-[#f6f5f4] active:bg-[#eaeaea] transition-colors">     
            <div className="w-8 h-8 rounded-full bg-[#f2f9ff] flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-[#097fe8]" />
            </div>
            <div className="flex-1">
              <span className="text-[16px] font-semibold text-black/90 block">Billing & Payouts</span>
              <span className="text-[13px] text-[#a39e98] font-medium">Connect bank accounts and view payouts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Defaults */}
      <section className="px-1 md:px-0 flex flex-col gap-2 mt-4">
        <h3 className="text-[14px] font-bold uppercase tracking-wider text-[#a39e98] px-2 mb-2">Personal</h3>
        
        <div className="flex flex-col bg-white rounded-[16px] border border-[#dddddd] shadow-sm overflow-hidden">
          <div className="flex items-center gap-4 p-4 border-b border-[#dddddd] cursor-pointer hover:bg-[#f6f5f4] active:bg-[#eaeaea] transition-colors">     
            <div className="w-8 h-8 rounded-full bg-[#f2f9ff] flex items-center justify-center">
              <User className="w-4 h-4 text-[#097fe8]" />
            </div>
            <span className="text-[16px] font-semibold text-black/90">My Profile</span>
          </div>
        </div>
      </section>
      
      {/* Sign Out */}
      <div className="px-1 md:px-0 mt-4">
        <SignOutForm className="w-full flex justify-center items-center gap-2 py-4 rounded-[12px] text-[#e8503a] font-semibold hover:bg-[#fff4f2] active:scale-[0.98] transition-all">
          <LogOut className="w-[18px] h-[18px]" />
          Sign Out of Command Center
        </SignOutForm>
      </div>

    </div>
  );
}
