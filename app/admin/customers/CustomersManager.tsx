"use client";

import { useMemo, useState } from "react";
import { Search, ChevronDown, ChevronUp, Mail, Phone, ShoppingBag, MessageSquare } from "lucide-react";
import type { CustomerRecord } from "./page";

const SOURCE_LABELS: Record<string, string> = {
  product_enquiry: "Product Enquiry",
  schedule_demo: "Schedule Demo",
  download_catalog: "Download Catalog",
  contact: "Contact Form",
  whatsapp_click: "WhatsApp",
};

export default function CustomersManager({
  customers,
}: {
  customers: CustomerRecord[];
}) {
  const [search, setSearch] = useState("");
  const [expandedEmail, setExpandedEmail] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      customers.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.email.toLowerCase().includes(search.toLowerCase()) ||
          c.phone.includes(search)
      ),
    [customers, search]
  );

  return (
    <div>
      <div className="mb-6">
        <h1
          className="text-2xl font-semibold text-[#1B355E] mb-1"
          style={{ fontFamily: "var(--font-fraunces, serif)" }}
        >
          Customers
        </h1>
        <p className="text-sm text-[#667085]">
          Everyone who has enquired or bought — enquiries and orders combined
          per person.
        </p>
      </div>

      <div className="relative w-full max-w-xs mb-4">
        <Search className="w-4 h-4 text-[#98A2B3] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email, phone..."
          className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#E4E7EC] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/10"
        />
      </div>

      <div className="bg-white rounded-xl border border-[#E4E7EC] overflow-hidden">
        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center text-[#98A2B3]">
            No customers yet.
          </div>
        )}
        {filtered.map((customer) => {
          const isExpanded = expandedEmail === customer.email;
          return (
            <div
              key={customer.email}
              className="border-b border-[#E4E7EC] last:border-0"
            >
              <button
                onClick={() =>
                  setExpandedEmail(isExpanded ? null : customer.email)
                }
                className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-[#F7F8FA] text-left"
              >
                <div className="w-9 h-9 rounded-full bg-[#1B355E] text-white flex items-center justify-center text-sm font-medium shrink-0">
                  {customer.name[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#1B355E] truncate">
                    {customer.name}
                  </p>
                  <p className="text-xs text-[#98A2B3] truncate">
                    {customer.email} · {customer.phone}
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-xs text-[#667085] shrink-0">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {customer.enquiries.length}
                  </span>
                  <span className="flex items-center gap-1">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    {customer.orders.length}
                  </span>
                </div>
                {customer.totalSpent > 0 && (
                  <span className="text-sm font-medium text-[#1B355E] shrink-0">
                    ₹{customer.totalSpent.toLocaleString("en-IN")}
                  </span>
                )}
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-[#667085] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#667085] shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="px-5 pb-4 pl-[68px] space-y-3">
                  <div className="flex flex-wrap gap-4 text-sm text-[#344054]">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#98A2B3]" />
                      {customer.email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#98A2B3]" />
                      {customer.phone}
                    </span>
                  </div>

                  {customer.enquiries.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-[#98A2B3] uppercase tracking-wide mb-1.5">
                        Enquiries
                      </p>
                      <div className="space-y-1.5">
                        {customer.enquiries.map((e) => (
                          <div
                            key={e.id}
                            className="text-sm text-[#344054] bg-[#F7F8FA] rounded-lg px-3 py-2 flex items-center justify-between"
                          >
                            <span>
                              {SOURCE_LABELS[e.source] ?? e.source}
                              {e.product_slug && ` · ${e.product_slug}`}
                            </span>
                            <span className="text-xs text-[#98A2B3]">
                              {new Date(e.created_at).toLocaleDateString(
                                "en-IN"
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {customer.orders.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-[#98A2B3] uppercase tracking-wide mb-1.5">
                        Orders
                      </p>
                      <div className="space-y-1.5">
                        {customer.orders.map((o) => (
                          <div
                            key={o.id}
                            className="text-sm text-[#344054] bg-[#F7F8FA] rounded-lg px-3 py-2 flex items-center justify-between"
                          >
                            <span className="capitalize">{o.status}</span>
                            <span>
                              {o.total ? `₹${o.total.toLocaleString("en-IN")}` : "—"}
                            </span>
                            <span className="text-xs text-[#98A2B3]">
                              {new Date(o.created_at).toLocaleDateString(
                                "en-IN"
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
