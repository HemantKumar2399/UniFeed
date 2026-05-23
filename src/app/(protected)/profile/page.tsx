import { Heart, LogOut, Settings, User } from "lucide-react";
import { auth } from "@/server/auth";
import { SignOutForm } from "@/components/SignOutForm";

export default async function ProfilePage() {
  const session = await auth();
  const userName = session?.user?.name ?? "Student";
  const userInitial = userName.charAt(0) || "U";
  
  return (
    <div className="flex flex-col gap-8 pb-32 md:pb-12">
      <header className="px-1 md:px-0">
        <h1 className="text-[40px] md:text-[48px] font-bold text-black/95 leading-[1.1] tracking-[-1.5px] mb-8">
          Profile
        </h1>
        
        {/* User Hero Card */}
        <div className="w-full bg-[#f6f5f4] rounded-[24px] p-6 border border-black/5 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-[28px] font-bold shadow-[0_4px_18px_rgba(0,0,0,0.1)]">
            {userInitial}
          </div>
          <div>
            <h2 className="text-[24px] font-bold text-black/95 tracking-tight">{userName}</h2>
            <p className="text-[15px] font-medium text-[#615d59] mt-1">{session?.user?.email}</p>
          </div>
        </div>
      </header>

      {/* Account Settings List */}
      <section className="px-1 md:px-0 flex flex-col gap-2">
        <h3 className="text-[14px] font-bold uppercase tracking-wider text-[#a39e98] px-2 mb-2">Account</h3>
        
        <div className="flex flex-col bg-white rounded-[16px] border border-[#dddddd] shadow-sm overflow-hidden">
          <div className="flex items-center gap-4 p-4 border-b border-[#dddddd] cursor-pointer hover:bg-[#f6f5f4] active:bg-[#eaeaea] transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#f2f9ff] flex items-center justify-center">
              <User className="w-4 h-4 text-[#097fe8]" />
            </div>
            <span className="text-[16px] font-medium text-black/90">Personal Information</span>
          </div>
          
          <div className="flex items-center gap-4 p-4 border-b border-[#dddddd] cursor-pointer hover:bg-[#f6f5f4] active:bg-[#eaeaea] transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#f2f9ff] flex items-center justify-center">
              <Heart className="w-4 h-4 text-[#097fe8]" />
            </div>
            <span className="text-[16px] font-medium text-black/90">Saved Events</span>
          </div>

          <div className="flex items-center gap-4 p-4 border-b border-[#dddddd] cursor-pointer hover:bg-[#f6f5f4] active:bg-[#eaeaea] transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#f2f9ff] flex items-center justify-center">
              <Settings className="w-4 h-4 text-[#097fe8]" />
            </div>
            <span className="text-[16px] font-medium text-black/90">Preferences</span>
          </div>
        </div>
      </section>
      
      {/* Sign Out */}
      <div className="px-1 md:px-0 mt-4">
        <SignOutForm className="w-full flex justify-center items-center gap-2 py-4 rounded-[12px] bg-[rgba(0,0,0,0.05)] text-black/90 font-semibold active:scale-[0.98] transition-all">
          <LogOut className="w-[18px] h-[18px]" />
          Sign Out
        </SignOutForm>
      </div>

    </div>
  );
}
