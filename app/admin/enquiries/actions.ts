"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateEnquiryStatus(
  id: string,
  status: "new" | "contacted" | "converted" | "lost"
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("enquiries")
    .update({ status })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/enquiries");
  return { success: true };
}
