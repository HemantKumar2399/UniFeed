import { BarChart3, Users, Ticket, ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";
import { auth } from "@/server/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-8 pb-32 md:pb-12">
      {/* Header */}
      <header className="px-1 md:px-0 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[14px] font-semibold text-[#a39e98] uppercase tracking-wider mb-1">Command Center</p>
          <h1 className="text-[40px] md:text-[48px] font-bold text-black/95 leading-[1.1] tracking-[-1.5px]">
            Overview
          </h1>
        </div>
        <Link 
          href="/dashboard/events/new"
          className="inline-flex items-center justify-center gap-2 bg-[#0075de] hover:bg-[#005bab] text-white px-5 py-3 rounded-[8px] font-semibold text-[15px] active:scale-95 transition-all shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
        >
          <Plus className="w-5 h-5" />
          Create Event
        </Link>
      </header>

      {/* Momentum Metrics (Bloomberg-esque but Tactile) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 px-1 md:px-0">
        
        <div className="bg-[#31302e] rounded-[16px] p-6 border border-black/5 shadow-[0_4px_18px_rgba(0,0,0,0.04)] relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-transform">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <Ticket className="w-5 h-5 text-white/60" />
            <span className="flex items-center gap-1 text-[#2a9d99] bg-[#2a9d99]/10 px-2 py-0.5 rounded-full text-[12px] font-bold">
              <ArrowUpRight className="w-3 h-3" /> +14%
            </span>
          </div>
          <p className="text-white/60 text-[14px] font-medium tracking-wide">Total RSVPs</p>
          <h3 className="text-[32px] font-bold text-white tracking-[-1px] leading-tight">1,482</h3>
        </div>

        <div className="bg-[#31302e] rounded-[16px] p-6 border border-black/5 shadow-[0_4px_18px_rgba(0,0,0,0.04)] relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-transform">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <Users className="w-5 h-5 text-white/60" />
            <span className="flex items-center gap-1 text-[#2a9d99] bg-[#2a9d99]/10 px-2 py-0.5 rounded-full text-[12px] font-bold">
              <ArrowUpRight className="w-3 h-3" /> +8%
            </span>
          </div>
          <p className="text-white/60 text-[14px] font-medium tracking-wide">Waitlisted</p>
          <h3 className="text-[32px] font-bold text-white tracking-[-1px] leading-tight">340</h3>
        </div>

        <div className="bg-[#31302e] rounded-[16px] p-6 border border-black/5 shadow-[0_4px_18px_rgba(0,0,0,0.04)] relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-transform">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <BarChart3 className="w-5 h-5 text-white/60" />
            <span className="flex items-center gap-1 text-white/40 bg-white/5 px-2 py-0.5 rounded-full text-[12px] font-bold">
              Rolling 7d
            </span>
          </div>
          <p className="text-white/60 text-[14px] font-medium tracking-wide">Page Views</p>
          <h3 className="text-[32px] font-bold text-white tracking-[-1px] leading-tight">8.2k</h3>
        </div>

      </section>

      {/* Active Events / Studio Access */}
      <section className="px-1 md:px-0 flex flex-col gap-4">
        <h2 className="text-[22px] font-bold text-black/95 tracking-[-0.25px]">Live Events</h2>
        
        <div className="w-full bg-white rounded-[20px] p-6 border border-[rgba(0,0,0,0.1)] shadow-[0_1px_3px_rgba(0,0,0,0.01)] cursor-pointer active:scale-[0.99] transition-transform flex flex-col md:flex-row md:items-center justify-between gap-6 group">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-[12px] bg-[#f6f5f4] border border-black/5 flex items-center justify-center shrink-0">
               <span className="text-[20px]">⚡</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#1aae39] animate-pulse" />
                <p className="text-[12px] font-bold text-[#1aae39] uppercase tracking-wider">Selling Fast</p>
              </div>
              <h3 className="text-[20px] font-bold text-black/95 tracking-tight group-hover:text-[#0075de] transition-colors">Tech Hub Mixer</h3>
              <p className="text-[15px] font-medium text-[#615d59]">Tomorrow • 8:00 PM</p>
            </div>
          </div>
          
          <div className="flex items-end md:items-center gap-6">
            <div className="text-right">
              <p className="text-[14px] font-medium text-[#a39e98] mb-1">Capacity</p>
              <p className="text-[16px] font-bold text-black/95">450 / 500</p>
            </div>
            <div className="w-24 h-2 bg-[#f6f5f4] rounded-full overflow-hidden">
               <div className="w-[90%] h-full bg-gradient-to-r from-[#0075de] to-[#62aef0]" />
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
