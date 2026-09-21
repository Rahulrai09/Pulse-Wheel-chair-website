"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, Download, ChevronDown, ChevronUp } from "lucide-react";
import { updateOrderStatus } from "./actions";

type OrderItem = {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: number | null;
  subtotal: number | null;
};

type Order = {
  id: string;
  customer_name: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  total: number | null;
  status: "created" | "paid" | "failed" | "shipped" | "delivered" | "cancelled";
  created_at: string;
  order_items: OrderItem[];
};

const STATUS_TABS: { key: "all" | Order["status"]; label: string }[] = [
  { key: "all", label: "All" },
  { key: "paid", label: "Paid" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
  { key: "cancelled", label: "Cancelled" },
];

const STATUS_STYLES: Record<string, string> = {
  created: "bg-gray-100 text-gray-600 border-gray-200",
  paid: "bg-blue-50 text-blue-700 border-blue-200",
  failed: "bg-red-50 text-red-700 border-red-200",
  shipped: "bg-amber-50 text-amber-700 border-amber-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-gray-100 text-gray-500 border-gray-200",
};

export default function OrdersManager({
  initialOrders,
}: {
  initialOrders: Order[];
}) {
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState<"all" | Order["status"]>("all");
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: orders.length };
    for (const tab of STATUS_TABS) {
      if (tab.key === "all") continue;
      c[tab.key] = orders.filter((o) => o.status === tab.key).length;
    }
    return c;
  }, [orders]);

  const filtered = useMemo(() => {
    let list =
      activeTab === "all" ? orders : orders.filter((o) => o.status === activeTab);

    list = list.filter(
      (o) =>
        (o.customer_name ?? "").toLowerCase().includes(search.toLowerCase()) ||
        (o.email ?? "").toLowerCase().includes(search.toLowerCase())
    );

    return [...list].sort((a, b) =>
      sortAsc
        ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [orders, activeTab, search, sortAsc]);

  async function handleStatusChange(id: string, status: Order["status"]) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    await updateOrderStatus(id, status);
  }

  function handleExportCsv() {
    const header = ["Order ID", "Customer", "Email", "Phone", "Total", "Status", "Date"];
    const rows = filtered.map((o) => [
      o.id,
      o.customer_name ?? "",
      o.email ?? "",
      o.phone ?? "",
      o.total?.toString() ?? "",
      o.status,
      new Date(o.created_at).toLocaleDateString("en-IN"),
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((c) => `"${c.replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="mb-6">
        <h1
          className="text-2xl font-semibold text-[#1B355E] mb-1"
          style={{ fontFamily: "var(--font-fraunces, serif)" }}
        >
          Orders
        </h1>
        <p className="text-sm text-[#667085]">
          Orders placed through checkout, with customer and product details.
        </p>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by customer name or email..."
        className="w-full mb-4 px-4 py-2.5 rounded-lg border border-[#E4E7EC] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/10"
      />

      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                activeTab === tab.key
                  ? "bg-[#1B355E] text-white border-[#1B355E]"
                  : "bg-white text-[#344054] border-[#E4E7EC] hover:bg-[#F7F8FA]"
              }`}
            >
              {tab.label} ({counts[tab.key] ?? 0})
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSortAsc((s) => !s)}
            className="flex items-center gap-1.5 text-sm text-[#344054] border border-[#E4E7EC] px-3 py-2 rounded-lg hover:bg-[#F7F8FA]"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sort
          </button>
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 text-sm text-[#344054] border border-[#E4E7EC] px-3 py-2 rounded-lg hover:bg-[#F7F8FA]"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E4E7EC] overflow-hidden">
        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center text-[#98A2B3]">
            No orders in this view.
          </div>
        )}
        {filtered.map((order) => {
          const isExpanded = expandedId === order.id;
          return (
            <div key={order.id} className="border-b border-[#E4E7EC] last:border-0">
              <button
                onClick={() => setExpandedId(isExpanded ? null : order.id)}
                className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-[#F7F8FA] text-left"
              >
                <div className="w-9 h-9 rounded-full bg-[#1B355E] text-white flex items-center justify-center text-sm font-medium shrink-0">
                  {order.customer_name?.[0]?.toUpperCase() ?? "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#1B355E] truncate">
                    {order.customer_name ?? "—"}
                  </p>
                  <p className="text-xs text-[#98A2B3] truncate">
                    {order.email} · #{order.id.slice(0, 8)}
                  </p>
                </div>
                <span className="text-sm font-medium text-[#1B355E] shrink-0">
                  ₹{order.total?.toLocaleString("en-IN") ?? "0"}
                </span>
                <select
                  value={order.status}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value as Order["status"])
                  }
                  className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize cursor-pointer shrink-0 ${
                    STATUS_STYLES[order.status]
                  }`}
                >
                  <option value="created">Created</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <span className="text-xs text-[#98A2B3] shrink-0 w-20 text-right hidden md:block">
                  {new Date(order.created_at).toLocaleDateString("en-IN")}
                </span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-[#667085] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#667085] shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="px-5 pb-4 pl-[68px] space-y-2">
                  <p className="text-xs text-[#98A2B3]">
                    {order.phone} · {order.city}, {order.state}
                  </p>
                  {order.order_items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm text-[#344054] bg-[#F7F8FA] rounded-lg px-3 py-2"
                    >
                      <span>
                        {item.product_name} × {item.quantity}
                      </span>
                      <span>₹{item.subtotal?.toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
