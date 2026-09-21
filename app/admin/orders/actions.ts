"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(
  id: string,
  status: "created" | "paid" | "failed" | "shipped" | "delivered" | "cancelled"
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/orders");
  return { success: true };
}
