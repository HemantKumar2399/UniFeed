import { Ticket, Calendar, PlayCircle } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10 lg:gap-16 pb-32 md:pb-12">
      {/* Dynamic Header */}
      <header className="px-1 md:px-0 flex justify-between items-end">
        <div>
          <p className="text-[14px] font-semibold text-[#a39e98] uppercase tracking-wider mb-1">Thursday, April 16</p>
          <h1 className="text-[40px] md:text-[48px] font-bold text-black/95 leading-[1.1] tracking-[-1.5px]">
            For You
          </h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-black/5 flex justify-center items-center cursor-pointer active:scale-95 transition-transform">
          <Calendar className="w-5 h-5 text-black/80" />
        </div>
      </header>

      {/* Hero Featured Event (Edge to Edge) */}
      <section className="relative w-full aspect-[4/5] md:aspect-[21/9] rounded-[24px] overflow-hidden group cursor-pointer border border-black/10 shadow-[0_14px_28px_rgba(0,0,0,0.04)] active:scale-[0.98] transition-all">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        {/* Placeholder for real hero image */}
        <div className="absolute inset-0 w-full h-full bg-[#31302e]">
           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent blur-3xl animate-pulse" />
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 md:pr-48 z-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-[#f2f9ff] text-[#097fe8] px-3 py-1 rounded-full text-[12px] font-semibold tracking-[0.125px]">
              Happening Now
            </span>
            <span className="text-white/80 text-[12px] font-medium backdrop-blur-md bg-black/20 px-3 py-1 rounded-full border border-white/10">
              Tech Hub
            </span>
          </div>
          <h2 className="text-white text-[32px] md:text-[40px] font-bold leading-tight tracking-[-1px] mb-2">
            Spring Hackathon 2026
          </h2>
          <p className="text-white/80 text-[15px] font-medium max-w-md line-clamp-2">
            The biggest builder event of the semester. Free food, hardware labs, and midnight pizza.
          </p>
        </div>
      </section>

      {/* Curated Carousel: Trending */}
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-1 md:px-0">
          <h2 className="text-[26px] font-bold text-black/95 tracking-[-0.625px]">Trending This Week</h2>
          <button className="text-[14px] font-semibold text-[#0075de] hover:underline">See all</button>
        </div>
        
        {/* Horizontal Scroll Area */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="min-w-[280px] md:min-w-[320px] snap-center cursor-pointer group active:scale-[0.98] transition-transform">
              <div className="w-full aspect-[4/3] rounded-[16px] mb-4 relative overflow-hidden bg-black/5 border border-black/5">
                {/* Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f6f5f4] to-[#eaeaea]" />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm">
                  <PlayCircle className="w-4 h-4 text-black/60" />
                </div>
              </div>
              <div>
                <p className="text-[#dd5b00] text-[12px] font-semibold mb-1 tracking-wide uppercase">Tomorrow • 8 PM</p>
                <h3 className="text-[18px] font-bold text-black/95 tracking-tight leading-tight mb-1 group-hover:text-[#0075de] transition-colors">
                  Design Systems Workshop
                </h3>
                <p className="text-[14px] text-[#615d59]">UI/UX Club • Student Union</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
