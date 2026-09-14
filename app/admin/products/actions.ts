"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

type ProductInput = {
  name: string;
  slug: string;
  category_id: string | null;
  short_description: string;
  description: string;
  price: number | null;
  compare_at_price: number | null;
  status: "active" | "draft" | "archived";
  tags: string[];
  features: string[];
};

export async function createProduct(input: ProductInput) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .insert({
      name: input.name,
      slug: input.slug,
      category_id: input.category_id,
      short_description: input.short_description,
      description: input.description,
      price: input.price,
      compare_at_price: input.compare_at_price,
      status: input.status,
      specifications: { tags: input.tags, features: input.features, specs: [] },
    })
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath("/admin/products");
  return { data };
}

export async function updateProduct(id: string, input: ProductInput) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .update({
      name: input.name,
      slug: input.slug,
      category_id: input.category_id,
      short_description: input.short_description,
      description: input.description,
      price: input.price,
      compare_at_price: input.compare_at_price,
      status: input.status,
      specifications: { tags: input.tags, features: input.features, specs: [] },
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/products");
  return { success: true };
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/products");
  return { success: true };
}

export async function uploadProductImage(productId: string, file: FormData) {
  const supabase = await createClient();
  const rawFile = file.get("file") as File;

  if (!rawFile) return { error: "No file provided" };

  const ext = rawFile.name.split(".").pop();
  const path = `${productId}/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(path, rawFile);

  if (uploadError) return { error: uploadError.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from("product-images").getPublicUrl(path);

  const { count } = await supabase
    .from("product_images")
    .select("*", { count: "exact", head: true })
    .eq("product_id", productId);

  const isFirstImage = (count ?? 0) === 0;

  const { error: insertError } = await supabase.from("product_images").insert({
    product_id: productId,
    image_url: publicUrl,
    is_primary: isFirstImage,
    display_order: count ?? 0,
  });

  if (insertError) return { error: insertError.message };

  if (isFirstImage) {
    await supabase
      .from("products")
      .update({ featured_image: publicUrl })
      .eq("id", productId);
  }

  revalidatePath("/admin/products");
  return { success: true, url: publicUrl };
}

export async function deleteProductImage(imageId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("product_images")
    .delete()
    .eq("id", imageId);

  if (error) return { error: error.message };

  revalidatePath("/admin/products");
  return { success: true };
}

export async function setPrimaryImage(productId: string, imageId: string, url: string) {
  const supabase = await createClient();

  await supabase
    .from("product_images")
    .update({ is_primary: false })
    .eq("product_id", productId);

  const { error } = await supabase
    .from("product_images")
    .update({ is_primary: true })
    .eq("id", imageId);

  if (error) return { error: error.message };

  await supabase
    .from("products")
    .update({ featured_image: url })
    .eq("id", productId);

  revalidatePath("/admin/products");
  return { success: true };
}
