"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Mail, Phone, MapPin } from "lucide-react";
import { updateEnquiryStatus } from "./actions";

type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string | null;
  message: string | null;
  product_slug: string | null;
  preferred_date: string | null;
  source: string;
  status: "new" | "contacted" | "converted" | "lost";
  created_at: string;
};

const STATUS_TABS: { key: "all" | Enquiry["status"]; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "converted", label: "Converted" },
  { key: "lost", label: "Lost" },
];

const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-amber-50 text-amber-700 border-amber-200",
  converted: "bg-green-50 text-green-700 border-green-200",
  lost: "bg-gray-100 text-gray-600 border-gray-200",
};

const SOURCE_LABELS: Record<string, string> = {
  product_enquiry: "Product Enquiry",
  schedule_demo: "Schedule Demo",
  download_catalog: "Download Catalog",
  contact: "Contact Form",
  whatsapp_click: "WhatsApp",
};

export default function EnquiriesManager({
  initialEnquiries,
}: {
  initialEnquiries: Enquiry[];
}) {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [activeTab, setActiveTab] = useState<"all" | Enquiry["status"]>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: enquiries.length };
    for (const tab of STATUS_TABS) {
      if (tab.key === "all") continue;
      c[tab.key] = enquiries.filter((e) => e.status === tab.key).length;
    }
    return c;
  }, [enquiries]);

  const filtered = useMemo(
    () =>
      activeTab === "all"
        ? enquiries
        : enquiries.filter((e) => e.status === activeTab),
    [enquiries, activeTab]
  );

  async function handleStatusChange(id: string, status: Enquiry["status"]) {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
    await updateEnquiryStatus(id, status);
  }

  return (
    <div>
      <div className="mb-6">
        <h1
          className="text-2xl font-semibold text-[#1B355E] mb-1"
          style={{ fontFamily: "var(--font-fraunces, serif)" }}
        >
          Enquiries
        </h1>
        <p className="text-sm text-[#667085]">
          Leads from demo requests, catalog downloads, and product enquiries.
        </p>
      </div>

      <div className="flex items-center gap-1 mb-4 border-b border-[#E4E7EC]">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === tab.key
                ? "border-[#1B355E] text-[#1B355E]"
                : "border-transparent text-[#667085] hover:text-[#1B355E]"
            }`}
          >
            {tab.label} ({counts[tab.key] ?? 0})
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#E4E7EC] overflow-hidden">
        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center text-[#98A2B3]">
            No enquiries in this view.
          </div>
        )}
        {filtered.map((enquiry) => {
          const isExpanded = expandedId === enquiry.id;
          return (
            <div key={enquiry.id} className="border-b border-[#E4E7EC] last:border-0">
              <button
                onClick={() =>
                  setExpandedId(isExpanded ? null : enquiry.id)
                }
                className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-[#F7F8FA] text-left"
              >
                <div className="w-9 h-9 rounded-full bg-[#1B355E] text-white flex items-center justify-center text-sm font-medium shrink-0">
                  {enquiry.name[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#1B355E] truncate">
                    {enquiry.name}
                  </p>
                  <p className="text-xs text-[#98A2B3] truncate">
                    {enquiry.email} · {enquiry.phone}
                  </p>
                </div>
                <span className="text-xs text-[#667085] hidden sm:block shrink-0">
                  {SOURCE_LABELS[enquiry.source] ?? enquiry.source}
                </span>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full border capitalize shrink-0 ${
                    STATUS_STYLES[enquiry.status]
                  }`}
                >
                  {enquiry.status}
                </span>
                <span className="text-xs text-[#98A2B3] shrink-0 w-20 text-right hidden md:block">
                  {new Date(enquiry.created_at).toLocaleDateString("en-IN")}
                </span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-[#667085] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#667085] shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="px-5 pb-4 pl-[68px] space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-1.5 text-[#344054]">
                      <Mail className="w-3.5 h-3.5 text-[#98A2B3]" />
                      {enquiry.email}
                    </div>
                    <div className="flex items-center gap-1.5 text-[#344054]">
                      <Phone className="w-3.5 h-3.5 text-[#98A2B3]" />
                      {enquiry.phone}
                    </div>
                    {enquiry.city && (
                      <div className="flex items-center gap-1.5 text-[#344054]">
                        <MapPin className="w-3.5 h-3.5 text-[#98A2B3]" />
                        {enquiry.city}
                      </div>
                    )}
                  </div>
                  {enquiry.product_slug && (
                    <p className="text-sm text-[#344054]">
                      <span className="text-[#98A2B3]">Product: </span>
                      {enquiry.product_slug}
                    </p>
                  )}
                  {enquiry.preferred_date && (
                    <p className="text-sm text-[#344054]">
                      <span className="text-[#98A2B3]">Preferred date: </span>
                      {new Date(enquiry.preferred_date).toLocaleDateString("en-IN")}
                    </p>
                  )}
                  {enquiry.message && (
                    <p className="text-sm text-[#344054] bg-[#F7F8FA] rounded-lg p-3">
                      {enquiry.message}
                    </p>
                  )}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs text-[#98A2B3]">Status:</span>
                    <select
                      value={enquiry.status}
                      onChange={(e) =>
                        handleStatusChange(
                          enquiry.id,
                          e.target.value as Enquiry["status"]
                        )
                      }
                      className={`text-xs font-medium px-2 py-1 rounded-full border capitalize cursor-pointer ${
                        STATUS_STYLES[enquiry.status]
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="lost">Lost</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
