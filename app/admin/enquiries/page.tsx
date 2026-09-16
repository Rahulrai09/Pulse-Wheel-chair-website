import { createClient } from "@/lib/supabase/server";
import EnquiriesManager from "./EnquiriesManager";

export default async function EnquiriesPage() {
  const supabase = await createClient();

  const { data: enquiries } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  return <EnquiriesManager initialEnquiries={enquiries ?? []} />;
}
