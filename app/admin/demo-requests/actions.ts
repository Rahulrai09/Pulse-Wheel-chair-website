"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateDemoStatus(
  id: string,
  status: "pending" | "scheduled" | "completed" | "cancelled"
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("enquiries")
    .update({ status })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/demo-requests");
  return { success: true };
}

export async function deleteDemoRequest(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("enquiries").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/demo-requests");
  return { success: true };
}
