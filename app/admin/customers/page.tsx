import { createClient } from "@/lib/supabase/server";
import CustomersManager from "./CustomersManager";

export type CustomerRecord = {
  email: string;
  name: string;
  phone: string;
  city: string | null;
  enquiries: {
    id: string;
    source: string;
    status: string;
    product_slug: string | null;
    created_at: string;
  }[];
  orders: {
    id: string;
    total: number | null;
    status: string;
    created_at: string;
  }[];
  totalSpent: number;
  lastActivity: string;
};

export default async function CustomersPage() {
  const supabase = await createClient();

  const [{ data: enquiries }, { data: orders }] = await Promise.all([
    supabase
      .from("enquiries")
      .select("id, name, email, phone, city, source, status, product_slug, created_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("orders")
      .select("id, customer_name, email, phone, total, status, created_at")
      .order("created_at", { ascending: false }),
  ]);

  // Group both sources by email into one customer record per person.
  const byEmail = new Map<string, CustomerRecord>();

  for (const e of enquiries ?? []) {
    const key = e.email.toLowerCase();
    if (!byEmail.has(key)) {
      byEmail.set(key, {
        email: e.email,
        name: e.name,
        phone: e.phone,
        city: e.city,
        enquiries: [],
        orders: [],
        totalSpent: 0,
        lastActivity: e.created_at,
      });
    }
    byEmail.get(key)!.enquiries.push({
      id: e.id,
      source: e.source,
      status: e.status,
      product_slug: e.product_slug,
      created_at: e.created_at,
    });
  }

  for (const o of orders ?? []) {
    if (!o.email) continue;
    const key = o.email.toLowerCase();
    if (!byEmail.has(key)) {
      byEmail.set(key, {
        email: o.email,
        name: o.customer_name ?? o.email,
        phone: o.phone ?? "",
        city: null,
        enquiries: [],
        orders: [],
        totalSpent: 0,
        lastActivity: o.created_at,
      });
    }
    const record = byEmail.get(key)!;
    record.orders.push({
      id: o.id,
      total: o.total,
      status: o.status,
      created_at: o.created_at,
    });
    if (o.status === "paid" || o.status === "shipped" || o.status === "delivered") {
      record.totalSpent += o.total ?? 0;
    }
    if (new Date(o.created_at) > new Date(record.lastActivity)) {
      record.lastActivity = o.created_at;
    }
  }

  const customers = Array.from(byEmail.values()).sort(
    (a, b) =>
      new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
  );

  return <CustomersManager customers={customers} />;
}
