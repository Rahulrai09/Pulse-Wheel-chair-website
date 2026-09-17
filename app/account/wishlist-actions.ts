"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function removeFromWishlist(productSlug: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in." };
  }

  const { error } = await supabase
    .from("wishlist_items")
    .delete()
    .eq("user_id", user.id)
    .eq("product_slug", productSlug);

  if (error) {
    return { error: "Something went wrong. Please try again." };
  }

  revalidatePath("/account");
  return { success: true };
}
