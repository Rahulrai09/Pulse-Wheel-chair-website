"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, Download, Filter, MoreVertical } from "lucide-react";
import { updateDemoStatus, deleteDemoRequest } from "./actions";

type DemoRequest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string | null;
  product_slug: string | null;
  preferred_date: string | null;
  status: "pending" | "scheduled" | "completed" | "cancelled";
  created_at: string;
};

const STATUS_TABS: { key: "all" | DemoRequest["status"]; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "scheduled", label: "Scheduled" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  scheduled: "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-gray-100 text-gray-600 border-gray-200",
};

export default function DemoRequestsManager({
  initialRequests,
}: {
  initialRequests: DemoRequest[];
}) {
  const [requests, setRequests] = useState(initialRequests);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | DemoRequest["status"]>("all");
  const [sortAsc, setSortAsc] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: requests.length };
    for (const tab of STATUS_TABS) {
      if (tab.key === "all") continue;
      c[tab.key] = requests.filter((r) => r.status === tab.key).length;
    }
    return c;
  }, [requests]);

  const filtered = useMemo(() => {
    let list =
      activeTab === "all"
        ? requests
        : requests.filter((r) => r.status === activeTab);

    list = list.filter(
      (r) =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.email.toLowerCase().includes(search.toLowerCase()) ||
        r.phone.includes(search)
    );

    return [...list].sort((a, b) =>
      sortAsc
        ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [requests, activeTab, search, sortAsc]);

  async function handleStatusChange(id: string, status: DemoRequest["status"]) {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    await updateDemoStatus(id, status);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this demo request?")) return;
    setRequests((prev) => prev.filter((r) => r.id !== id));
    setOpenMenuId(null);
    await deleteDemoRequest(id);
  }

  function handleExportCsv() {
    const header = ["Name", "Email", "Phone", "City", "Preferred Date", "Status"];
    const rows = filtered.map((r) => [
      r.name,
      r.email,
      r.phone,
      r.city ?? "",
      r.preferred_date ?? "",
      r.status,
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "demo-requests.csv";
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
          Demo Requests
        </h1>
        <p className="text-sm text-[#667085]">
          Submissions from the &quot;Schedule Demo&quot; form on the website.
        </p>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
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
          <button className="flex items-center gap-1.5 text-sm text-[#344054] border border-[#E4E7EC] px-3 py-2 rounded-lg hover:bg-[#F7F8FA]">
            <Filter className="w-3.5 h-3.5" />
            Filter
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

      <div className="bg-white rounded-xl border border-[#E4E7EC] overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E4E7EC] text-left text-[#667085]">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Contact</th>
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-5 py-3 font-medium">City</th>
              <th className="px-5 py-3 font-medium">Preferred date</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-[#98A2B3]">
                  No demo requests in this view.
                </td>
              </tr>
            )}
            {filtered.map((r) => (
              <tr
                key={r.id}
                className="border-b border-[#E4E7EC] last:border-0 hover:bg-[#F7F8FA]"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1B355E] text-white flex items-center justify-center text-xs font-medium shrink-0">
                      {r.name[0]?.toUpperCase()}
                    </div>
                    <span className="font-medium text-[#1B355E]">{r.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-[#344054]">
                  <div>{r.email}</div>
                  <div className="text-xs text-[#98A2B3]">{r.phone}</div>
                </td>
                <td className="px-5 py-3 text-[#344054]">
                  {r.product_slug ?? "—"}
                </td>
                <td className="px-5 py-3 text-[#344054]">{r.city ?? "—"}</td>
                <td className="px-5 py-3 text-[#344054]">
                  {r.preferred_date
                    ? new Date(r.preferred_date).toLocaleDateString("en-IN")
                    : "—"}
                </td>
                <td className="px-5 py-3">
                  <select
                    value={r.status}
                    onChange={(e) =>
                      handleStatusChange(
                        r.id,
                        e.target.value as DemoRequest["status"]
                      )
                    }
                    className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize cursor-pointer ${
                      STATUS_STYLES[r.status]
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-5 py-3 relative">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === r.id ? null : r.id)
                      }
                      className="text-[#667085] hover:text-[#1B355E]"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
