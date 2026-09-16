import { createClient } from "@/lib/supabase/server";
import EnquiriesManager from "./EnquiriesManager";

export default async function EnquiriesPage() {
  const supabase = await createClient();

  // Demo requests have their own dedicated page/workflow now, so exclude
  // them here to avoid showing the same lead in two places.
  const { data: enquiries } = await supabase
    .from("enquiries")
    .select("*")
    .neq("source", "schedule_demo")
    .order("created_at", { ascending: false });

  return <EnquiriesManager initialEnquiries={enquiries ?? []} />;
}
