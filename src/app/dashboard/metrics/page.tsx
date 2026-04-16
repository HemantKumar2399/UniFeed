import { BarChart3, TrendingUp, ArrowUpRight, Activity } from "lucide-react";

export default function MetricsPage() {
  return (
    <div className="flex flex-col gap-8 pb-32 md:pb-12">
      {/* Header */}
      <header className="px-1 md:px-0 flex flex-col gap-2">
        <h1 className="text-[40px] md:text-[48px] font-bold text-black/95 leading-[1.1] tracking-[-1.5px]">
          Metrics
        </h1>
        <p className="text-[16px] text-[#615d59] font-medium leading-relaxed">
          Analyze your event performance and attendee engagement.
        </p>
      </header>

      {/* High-Level Overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-1 md:px-0">
        
        <div className="bg-white rounded-[20px] p-6 border border-[#dddddd] shadow-sm relative overflow-hidden group cursor-pointer active:scale-[0.99] transition-transform">
          <div className="flex items-center justify-between mb-8">
            <div className="w-12 h-12 rounded-full bg-[#f2f9ff] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#0075de]" />
            </div>
            <span className="flex items-center gap-1 text-[#1aae39] bg-[#1aae39]/10 px-2.5 py-1 rounded-full text-[13px] font-bold">
              <ArrowUpRight className="w-3.5 h-3.5" /> +24%
            </span>
          </div>
          <p className="text-[#a39e98] text-[15px] font-semibold tracking-wide mb-1">Total Attendance</p>
          <h3 className="text-[40px] font-bold text-black/95 tracking-[-1.5px] leading-tight">4,892</h3>
        </div>

        <div className="bg-white rounded-[20px] p-6 border border-[#dddddd] shadow-sm relative overflow-hidden group cursor-pointer active:scale-[0.99] transition-transform">
          <div className="flex items-center justify-between mb-8">
            <div className="w-12 h-12 rounded-full bg-[#fff4f2] flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#e8503a]" />
            </div>
            <span className="flex items-center gap-1 text-[#1aae39] bg-[#1aae39]/10 px-2.5 py-1 rounded-full text-[13px] font-bold">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12%
            </span>
          </div>
          <p className="text-[#a39e98] text-[15px] font-semibold tracking-wide mb-1">Conversion Rate</p>
          <h3 className="text-[40px] font-bold text-black/95 tracking-[-1.5px] leading-tight">68.4%</h3>
        </div>

      </section>

      {/* Charts Placeholder */}
      <section className="px-1 md:px-0 flex flex-col gap-4">
        <h2 className="text-[22px] font-bold text-black/95 tracking-[-0.25px]">Engagement Over Time</h2>
        <div className="w-full h-[300px] bg-[#f6f5f4] rounded-[24px] border border-black/5 flex flex-col items-center justify-center gap-3">
           <BarChart3 className="w-8 h-8 text-[#a39e98] opacity-50" />
           <p className="text-[14px] font-semibold text-[#a39e98]">Detailed charts unlocking soon</p>
        </div>
      </section>

    </div>
  );
}