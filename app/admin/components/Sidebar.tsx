"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  LayoutDashboard,
  Package,
  FolderTree,
  Star,
  ShoppingCart,
  Users,
  MessageSquare,
  ClipboardList,
} from "lucide-react";

type NavItem = {
  label: string;
  href?: string;
  icon: React.ElementType;
  soon?: boolean;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    title: "Overview",
    items: [{ label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Catalog",
    items: [
      { label: "Products", href: "/admin/products", icon: Package },
      { label: "Categories", href: "/admin/categories", icon: FolderTree, soon: true },
    ],
  },
  {
    title: "Leads",
    items: [
      { label: "Demo Requests", href: "/admin/demo-requests", icon: ClipboardList },
      { label: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
      { label: "Customers", href: "/admin/customers", icon: Users },
    ],
  },
  {
    title: "Sales",
    items: [
      { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
      { label: "Reviews", href: "/admin/reviews", icon: Star, soon: true },
    ],
  },
  {
    title: "Access",
    items: [{ label: "Admin Users", href: "/admin/users", icon: Users, soon: true }],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-[#E4E7EC] h-screen sticky top-0 flex flex-col">
      <div className="flex items-center gap-2 px-5 h-16 border-b border-[#E4E7EC]">
        <div className="w-8 h-8 rounded-full bg-[#1B355E] flex items-center justify-center shrink-0">
          <Activity className="w-4 h-4 text-[#EE8B1B]" strokeWidth={2.5} />
        </div>
        <span
          className="text-lg font-semibold text-[#1B355E] tracking-wide"
          style={{ fontFamily: "var(--font-fraunces, serif)" }}
        >
          PULSE
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#667085] mb-1.5">
              {group.title}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = item.href && pathname?.startsWith(item.href);

                if (item.soon || !item.href) {
                  return (
                    <div
                      key={item.label}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#98A2B3] cursor-not-allowed"
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </span>
                      <span className="text-[10px] font-medium uppercase tracking-wide bg-[#F1F2F4] text-[#98A2B3] px-1.5 py-0.5 rounded">
                        Soon
                      </span>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#1B355E] text-white"
                        : "text-[#344054] hover:bg-[#F1F2F4]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
