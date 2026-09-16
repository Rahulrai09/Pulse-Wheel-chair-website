import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

const AUTH_PAGES = ["/admin/login", "/admin/forgot-password", "/admin/reset-password"];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";

  // Login, forgot-password, and reset-password render full-screen with
  // no sidebar/topbar — including during a password-recovery session,
  // where a "user" technically exists but shouldn't see the dashboard shell.
  if (AUTH_PAGES.includes(pathname)) {
    return <>{children}</>;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
