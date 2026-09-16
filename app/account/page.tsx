import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AccountManager from "./AccountManager";

export type OrderRecord = {
  id: string;
  status: string;
  total: number | null;
  currency: string | null;
  created_at: string;
  order_items: {
    id: string;
    product_name: string | null;
    quantity: number;
    unit_price: number | null;
  }[];
};

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/account/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const { data: orders } = await supabase
    .from("orders")
    .select("id, status, total, currency, created_at, order_items(id, product_name, quantity, unit_price)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <AccountManager
      email={user.email ?? ""}
      fullName={profile?.full_name ?? ""}
      orders={(orders as OrderRecord[]) ?? []}
    />
  );
}
