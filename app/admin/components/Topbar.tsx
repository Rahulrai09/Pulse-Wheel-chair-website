"use client";

import { useRouter } from "next/navigation";
import { Search, Settings, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function Topbar({ userEmail }: { userEmail: string }) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const initial = userEmail?.[0]?.toUpperCase() ?? "A";

  return (
    <header className="h-16 border-b border-[#E4E7EC] bg-white flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="relative w-full max-w-sm">
        <Search className="w-4 h-4 text-[#98A2B3] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#F7F8FA] border border-[#E4E7EC] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/10"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          className="text-[#667085] hover:text-[#1B355E] transition-colors"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 pl-4 border-l border-[#E4E7EC]">
          <div className="w-8 h-8 rounded-full bg-[#1B355E] text-white flex items-center justify-center text-sm font-medium">
            {initial}
          </div>
          <span className="text-sm text-[#344054] max-w-[140px] truncate hidden sm:block">
            {userEmail}
          </span>
          <button
            onClick={handleSignOut}
            title="Sign out"
            className="text-[#667085] hover:text-red-600 transition-colors ml-1"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
