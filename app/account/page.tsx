import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProductBySlug } from "@/lib/products";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import AccountManager, { type WishlistProduct } from "./AccountManager";

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

  const [{ data: profile }, { data: orders }, { data: wishlistRows }] = await Promise.all([
    supabase.from("profiles").select("full_name").eq("id", user.id).single(),
    supabase
      .from("orders")
      .select("id, status, total, currency, created_at, order_items(id, product_name, quantity, unit_price)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("wishlist_items")
      .select("product_slug")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
  ]);

  const wishlist: WishlistProduct[] = (wishlistRows ?? [])
    .map((row) => getProductBySlug(row.product_slug))
    .filter((p): p is NonNullable<typeof p> => !!p)
    .map((p) => ({ slug: p.slug, name: p.name, image: p.image, price: p.price }));

  return (
    <>
      <Header />
      <AccountManager
        email={user.email ?? ""}
        fullName={profile?.full_name ?? ""}
        orders={(orders as OrderRecord[]) ?? []}
        wishlist={wishlist}
      />
      <Footer />
    </>
  );
}
