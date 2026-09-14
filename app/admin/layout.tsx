import { createClient } from "@/lib/supabase/server";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // The /admin/login page renders its own full-screen layout with no
  // sidebar/topbar, so we skip the shell there.
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#F7F8FA]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar userEmail={user.email ?? ""} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
