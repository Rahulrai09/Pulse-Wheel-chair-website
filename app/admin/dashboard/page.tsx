import { createClient } from "@/lib/supabase/server";
import { Package, Star, ShoppingCart, MessageSquare } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [
    { count: productCount },
    { count: newEnquiryCount },
    { count: reviewCount },
    { count: orderCount },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase
      .from("enquiries")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .eq("approved", false),
    supabase.from("orders").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Products", value: productCount ?? 0, icon: Package },
    { label: "New enquiries", value: newEnquiryCount ?? 0, icon: MessageSquare },
    { label: "Reviews awaiting approval", value: reviewCount ?? 0, icon: Star },
    { label: "Orders", value: orderCount ?? 0, icon: ShoppingCart },
  ];

  return (
    <div>
      <h1
        className="text-2xl font-semibold text-[#1B355E] mb-1"
        style={{ fontFamily: "var(--font-fraunces, serif)" }}
      >
        Dashboard
      </h1>
      <p className="text-sm text-[#667085] mb-6">
        Overview of your Pulse Mobility & Care store.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-[#E4E7EC] p-5 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1B355E]/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[#1B355E]" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#1B355E]">
                  {stat.value}
                </p>
                <p className="text-sm text-[#667085]">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
