import { Plus, Search, Calendar, MapPin, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export default function DashboardEventsPage() {
  return (
    <div className="flex flex-col gap-8 pb-32 md:pb-12">
      {/* Header */}
      <header className="px-1 md:px-0 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[40px] md:text-[48px] font-bold text-black/95 leading-[1.1] tracking-[-1.5px] mb-2">
            Events
          </h1>
          <p className="text-[16px] text-[#615d59] font-medium leading-relaxed">
            Manage your experiences, track RSVPs, and edit event details.
          </p>
        </div>
        <Link 
          href="/dashboard/events/new"
          className="inline-flex items-center justify-center gap-2 bg-[#0075de] hover:bg-[#005bab] text-white px-5 py-3 rounded-[8px] font-semibold text-[15px] active:scale-95 transition-all shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
        >
          <Plus className="w-5 h-5" />
          Create Event
        </Link>
      </header>

      {/* Controls */}
      <section className="px-1 md:px-0 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a39e98]" />
          <input 
            type="text" 
            placeholder="Search events..." 
            className="w-full bg-[#f6f5f4] text-black/95 placeholder-[#a39e98] px-10 py-3 rounded-[12px] border border-transparent focus:border-[#0075de] focus:bg-white outline-none transition-all text-[15px] font-medium"
          />
        </div>
        <div className="flex bg-[#f6f5f4] p-1 rounded-[12px] border border-black/5">
          <button className="px-4 py-1.5 rounded-[8px] bg-white shadow-sm font-semibold text-[14px]">Active</button>
          <button className="px-4 py-1.5 rounded-[8px] text-[#a39e98] font-medium text-[14px] hover:text-black/80 transition-colors">Drafts</button>
          <button className="px-4 py-1.5 rounded-[8px] text-[#a39e98] font-medium text-[14px] hover:text-black/80 transition-colors">Past</button>
        </div>
      </section>

      {/* Event List */}
      <section className="px-1 md:px-0 flex flex-col gap-3">
        
        {/* Sample Event Card */}
        <div className="bg-white rounded-[16px] p-5 border border-[#dddddd] shadow-sm hover:border-black/20 transition-colors group cursor-pointer active:scale-[0.99]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-[10px] bg-[#f6f5f4] border border-black/5 flex items-center justify-center shrink-0">
                <span className="text-[20px]">✨</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#1aae39]" />
                  <p className="text-[12px] font-bold text-[#1aae39] uppercase tracking-wider">Published</p>
                </div>
                <h3 className="text-[18px] font-bold text-black/95 tracking-tight group-hover:text-[#0075de] transition-colors">Tech Hub Mixer</h3>
                <div className="flex items-center gap-4 mt-1.5 text-[14px] text-[#615d59] font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#a39e98]" />
                    Tomorrow, 8:00 PM
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#a39e98]" />
                    Student Union
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6 self-end md:self-auto">
              <div className="text-right">
                <p className="text-[13px] font-semibold text-[#a39e98] mb-0.5">RSVPs</p>
                <p className="text-[16px] font-bold text-black/95">450 <span className="text-[14px] font-medium text-[#a39e98] font-normal">/ 500</span></p>
              </div>
              <button className="p-2 -mr-2 text-[#a39e98] hover:text-black/80 hover:bg-[#f6f5f4] rounded-full transition-colors hidden md:block">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Sample Event Card 2 */}
        <div className="bg-white rounded-[16px] p-5 border border-[#dddddd] shadow-sm hover:border-black/20 transition-colors group cursor-pointer active:scale-[0.99]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-[10px] bg-[#f6f5f4] border border-black/5 flex items-center justify-center shrink-0">
                <span className="text-[20px]">💡</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#1aae39]" />
                  <p className="text-[12px] font-bold text-[#1aae39] uppercase tracking-wider">Published</p>
                </div>
                <h3 className="text-[18px] font-bold text-black/95 tracking-tight group-hover:text-[#0075de] transition-colors">Design Systems Workshop</h3>
                <div className="flex items-center gap-4 mt-1.5 text-[14px] text-[#615d59] font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#a39e98]" />
                    Fri, Oct 24, 2:00 PM
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#a39e98]" />
                    Design Studio 2
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6 self-end md:self-auto">
              <div className="text-right">
                <p className="text-[13px] font-semibold text-[#a39e98] mb-0.5">RSVPs</p>
                <p className="text-[16px] font-bold text-black/95">112 <span className="text-[14px] font-medium text-[#a39e98] font-normal">/ 150</span></p>
              </div>
              <button className="p-2 -mr-2 text-[#a39e98] hover:text-black/80 hover:bg-[#f6f5f4] rounded-full transition-colors hidden md:block">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
