"use server";

import { createClient } from "@/lib/supabase/server";

export type EnquirySource =
  | "product_enquiry"
  | "schedule_demo"
  | "download_catalog"
  | "contact"
  | "whatsapp_click";

type EnquiryInput = {
  name: string;
  email: string;
  phone: string;
  city?: string;
  message?: string;
  preferredDate?: string;
  productSlug?: string;
  source: EnquirySource;
};

export async function submitEnquiry(input: EnquiryInput) {
  // Basic server-side validation — never trust the client alone.
  if (!input.name?.trim() || !input.email?.trim() || !input.phone?.trim()) {
    return { error: "Name, email, and phone are required." };
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(input.email)) {
    return { error: "Please enter a valid email." };
  }

  const supabase = await createClient();

  // Demo requests get their own status lifecycle (pending -> scheduled ->
  // completed/cancelled); everything else uses new -> contacted -> converted/lost.
  const initialStatus = input.source === "schedule_demo" ? "pending" : "new";

  const { error } = await supabase.from("enquiries").insert({
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    city: input.city?.trim() || null,
    message: input.message?.trim() || null,
    preferred_date: input.preferredDate || null,
    product_slug: input.productSlug || null,
    source: input.source,
    status: initialStatus,
  });

  if (error) {
    return { error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
