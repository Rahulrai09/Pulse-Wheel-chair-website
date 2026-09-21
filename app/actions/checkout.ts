"use server";

import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  quantity: number;
};

export type ShippingDetails = {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
};

/**
 * Step 1 of checkout: ask Razorpay to create an order for this amount.
 * Requires RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in environment variables
 * (server-only — never exposed to the browser).
 */
export async function createRazorpayOrder(items: CartItem[]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to check out." };
  }

  if (!items.length) {
    return { error: "Your cart is empty." };
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const amountInPaise = Math.round(total * 100);

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return {
      error:
        "Payments aren't configured yet. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to continue.",
    };
  }

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    return { error: `Payment gateway error: ${body}` };
  }

  const razorpayOrder = await res.json();

  return {
    success: true,
    razorpayOrderId: razorpayOrder.id,
    amount: amountInPaise,
    currency: "INR",
    keyId,
  };
}

/**
 * Step 2 of checkout: after Razorpay's popup completes, verify the
 * payment signature server-side (never trust the client's claim that
 * payment succeeded) and save the order + line items.
 */
export async function verifyAndSaveOrder(params: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  items: CartItem[];
  shipping: ShippingDetails;
}) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return { error: "Payments aren't configured." };
  }

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${params.razorpayOrderId}|${params.razorpayPaymentId}`)
    .digest("hex");

  if (expectedSignature !== params.razorpaySignature) {
    return { error: "Payment verification failed. Please contact support." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Session expired. Please sign in again." };
  }

  const subtotal = params.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      razorpay_order_id: params.razorpayOrderId,
      razorpay_payment_id: params.razorpayPaymentId,
      customer_name: user.user_metadata?.full_name ?? user.email,
      email: user.email,
      phone: user.user_metadata?.phone ?? "",
      address_line1: params.shipping.addressLine1,
      address_line2: params.shipping.addressLine2 || null,
      city: params.shipping.city,
      state: params.shipping.state,
      pincode: params.shipping.pincode,
      subtotal,
      shipping: 0,
      total: subtotal,
      status: "paid",
    })
    .select()
    .single();

  if (orderError || !order) {
    return { error: "Payment succeeded but saving your order failed. Contact support with your payment ID: " + params.razorpayPaymentId };
  }

  const orderItems = params.items.map((item) => ({
    order_id: order.id,
    product_slug: item.slug,
    product_name: item.name,
    quantity: item.quantity,
    unit_price: item.price,
    subtotal: item.price * item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    return { error: "Payment succeeded but saving order items failed. Contact support with your payment ID: " + params.razorpayPaymentId };
  }

  return { success: true, orderId: order.id };
}
