import { createClient } from "@/lib/supabase/server";
import { Package } from "lucide-react";

export default async function OrderHistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  const STATUS_STYLES: Record<string, string> = {
    created: "bg-gray-100 text-gray-600",
    paid: "bg-blue-50 text-blue-700",
    shipped: "bg-amber-50 text-amber-700",
    delivered: "bg-green-50 text-green-700",
    cancelled: "bg-red-50 text-red-700",
    failed: "bg-red-50 text-red-700",
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1
          className="text-2xl font-semibold text-[#1B355E] mb-6"
          style={{ fontFamily: "var(--font-fraunces, serif)" }}
        >
          Your Orders
        </h1>

        {!orders || orders.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#E4E7EC] p-10 text-center">
            <Package className="w-10 h-10 text-[#98A2B3] mx-auto mb-3" />
            <p className="text-[#667085]">You haven&apos;t placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-[#E4E7EC] p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-[#98A2B3]">
                      Order #{order.id.slice(0, 8)}
                    </p>
                    <p className="text-sm text-[#667085]">
                      {new Date(order.created_at).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                      STATUS_STYLES[order.status] ?? "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="border-t border-[#E4E7EC] pt-3 space-y-1.5">
                  {order.order_items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm text-[#344054]"
                    >
                      <span>
                        {item.product_name} × {item.quantity}
                      </span>
                      <span>₹{item.subtotal?.toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#E4E7EC] mt-3 pt-3 flex justify-between font-semibold text-[#1B355E]">
                  <span>Total</span>
                  <span>₹{order.total?.toLocaleString("en-IN")}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
