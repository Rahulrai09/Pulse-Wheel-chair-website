import { createClient } from "@/lib/supabase/server";
import ProductsManager from "./ProductsManager";

export default async function ProductsPage() {
  const supabase = await createClient();

  const [{ data: products }, { data: categories }, { data: images }] =
    await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("categories").select("id, name").order("display_order"),
      supabase
        .from("product_images")
        .select("id, product_id, image_url, is_primary, display_order")
        .order("display_order"),
    ]);

  return (
    <ProductsManager
      initialProducts={products ?? []}
      categories={categories ?? []}
      images={images ?? []}
    />
  );
}
