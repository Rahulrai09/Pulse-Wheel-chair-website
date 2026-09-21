import { createClient } from "@/lib/supabase/server";
import OrdersManager from "./OrdersManager";

export default async function AdminOrdersPage() {
  const supabase = await createClient();

  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  return <OrdersManager initialOrders={orders ?? []} />;
}
