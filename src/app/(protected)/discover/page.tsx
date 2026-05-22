import { Search, Compass, MapPin } from "lucide-react";
import { HubsDirectorySection } from "@/features/hubs/components/HubsDirectorySection";

export default function DiscoverPage() {
  return (
    <div className="flex flex-col gap-8 pb-32 md:pb-12">
      <header className="px-1 md:px-0">
        <h1 className="text-[40px] md:text-[48px] font-bold text-black/95 leading-[1.1] tracking-[-1.5px] mb-4">
          Discover
        </h1>
        
        {/* Search Bar matching Tactile Inputs */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-[18px] w-[18px] text-[#a39e98] group-focus-within:text-[#097fe8] transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 md:py-3 bg-white border border-[#dddddd] rounded-xl text-[16px] text-black/90 font-medium placeholder-[#a39e98] focus:outline-none focus:ring-2 focus:ring-[#097fe8] focus:border-transparent transition-all shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
            placeholder="Search events, clubs, or friends..."
          />
        </div>
      </header>

      <HubsDirectorySection />

      {/* Categories Grid (Bento) */}
      <section className="px-1 md:px-0">
        <h2 className="text-[22px] font-bold text-black/95 tracking-[-0.25px] mb-4">Explore by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {["Academic", "Parties", "Sports", "Arts", "Career", "Wellness"].map((cat) => (
            <div 
              key={cat}
              className="relative aspect-square rounded-[16px] p-4 flex flex-col justify-end overflow-hidden cursor-pointer active:scale-95 transition-transform border border-black/10 shadow-[rgba(0,0,0,0.01)_0px_1px_3px] group"
            >
              <div className="absolute inset-0 bg-[#f6f5f4] group-hover:bg-[#f2f9ff] transition-colors" />
              <Compass className="absolute top-4 right-4 w-6 h-6 text-black/10 group-hover:text-[#097fe8]/20 transition-colors" />
              <h3 className="relative z-10 text-[18px] font-bold text-black/95 tracking-tight">{cat}</h3>
            </div>
          ))}
        </div>
      </section>
      
      {/* Map Module (Tactile Box) */}
      <section className="px-1 md:px-0">
         <div className="w-full bg-[#31302e] rounded-[20px] p-6 relative overflow-hidden flex flex-col items-start justify-between min-h-[220px] cursor-pointer active:scale-[0.98] transition-transform shadow-[0_23px_52px_rgba(0,0,0,0.05)] border border-black/10">
           <div className="absolute opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent inset-0" />
           <div className="relative z-10">
             <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 mb-4">
               <MapPin className="w-5 h-5 text-white" />
             </div>
             <h3 className="text-white text-[26px] font-bold tracking-tight mb-2">Campus Map</h3>
             <p className="text-white/80 font-medium text-[15px]">See what&apos;s happening around you right now.</p>
           </div>
         </div>
      </section>
    </div>
  );
}
