import { Heart, LogOut, Settings, User } from "lucide-react";
import { auth } from "@/server/auth";
import { SignOutForm } from "@/components/SignOutForm";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();
  const userName = session?.user?.name ?? "Student";
  const userInitial = userName.charAt(0) || "U";
  
  return (
    <div className="flex flex-col gap-8 pb-32 md:pb-12 transition-colors duration-300">
      <header className="px-1 md:px-0">
        <h1 className="text-[40px] md:text-[48px] font-bold text-foreground leading-[1.1] tracking-[-1.5px] mb-8">
          Profile
        </h1>
        
        {/* User Hero Card */}
        <div className="w-full bg-app-bg rounded-[24px] p-6 border border-whisper flex items-center gap-6 transition-colors">
          <div className="w-20 h-20 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center text-[28px] font-bold shadow-[0_4px_18px_rgba(0,0,0,0.1)]">
            {userInitial}
          </div>
          <div>
            <h2 className="text-[24px] font-bold text-foreground tracking-tight">{userName}</h2>
            <p className="text-[15px] font-medium text-muted-foreground mt-1">{session?.user?.email}</p>
          </div>
        </div>
      </header>

      {/* Account Settings List */}
      <section className="px-1 md:px-0 flex flex-col gap-2">
        <h3 className="text-[14px] font-bold uppercase tracking-wider text-muted-foreground px-2 mb-2">Account</h3>
        
        <div className="flex flex-col bg-card-bg rounded-[16px] border border-input shadow-sm overflow-hidden transition-colors">
          <Link href="/profile/personal-info" className="flex items-center gap-4 p-4 border-b border-input cursor-pointer hover:bg-muted active:bg-muted/80 transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#f2f9ff] dark:bg-blue-950/40 flex items-center justify-center">
              <User className="w-4 h-4 text-[#097fe8]" />
            </div>
            <span className="text-[16px] font-medium text-foreground/90">Personal Information</span>
          </Link>
          
          <Link href="/profile/saved-events" className="flex items-center gap-4 p-4 border-b border-input cursor-pointer hover:bg-muted active:bg-muted/80 transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#f2f9ff] dark:bg-blue-950/40 flex items-center justify-center">
              <Heart className="w-4 h-4 text-[#097fe8]" />
            </div>
            <span className="text-[16px] font-medium text-foreground/90">Saved Events</span>
          </Link>
 
          <Link href="/profile/preferences" className="flex items-center gap-4 p-4 border-b border-input cursor-pointer hover:bg-muted active:bg-muted/80 transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#f2f9ff] dark:bg-blue-950/40 flex items-center justify-center">
              <Settings className="w-4 h-4 text-[#097fe8]" />
            </div>
            <span className="text-[16px] font-medium text-foreground/90">Preferences</span>
          </Link>
        </div>
      </section>
      
      {/* Sign Out */}
      <div className="px-1 md:px-0 mt-4">
        <SignOutForm className="w-full flex justify-center items-center gap-2 py-4 rounded-[12px] bg-muted text-foreground/90 font-semibold active:scale-[0.98] transition-all cursor-pointer">
          <LogOut className="w-[18px] h-[18px]" />
          Sign Out
        </SignOutForm>
      </div>

    </div>
  );
}
