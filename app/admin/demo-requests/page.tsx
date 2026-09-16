import { createClient } from "@/lib/supabase/server";
import DemoRequestsManager from "./DemoRequestsManager";

export default async function DemoRequestsPage() {
  const supabase = await createClient();

  const { data: demoRequests } = await supabase
    .from("enquiries")
    .select("*")
    .eq("source", "schedule_demo")
    .order("created_at", { ascending: false });

  return <DemoRequestsManager initialRequests={demoRequests ?? []} />;
}
