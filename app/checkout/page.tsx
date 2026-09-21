"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useCart } from "@/lib/cart-context";
import { createClient } from "@/lib/supabase/client";
import { createRazorpayOrder, verifyAndSaveOrder } from "@/app/actions/checkout";
import { Loader2 } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9]/g, "")) || 0;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, removeFromCart } = useCart();

  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [prefill, setPrefill] = useState({ name: "", email: "", contact: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setPrefill({
          name: user.user_metadata?.full_name ?? "",
          email: user.email ?? "",
          contact: user.user_metadata?.phone ?? "",
        });
      }
    });
  }, []);

  async function handlePayment(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);

    const serverItems = items.map((i) => ({
      slug: i.slug,
      name: i.name,
      price: parsePrice(i.price),
      quantity: i.quantity,
    }));

    const orderRes = await createRazorpayOrder(serverItems);

    if (orderRes?.error) {
      setLoading(false);
      setError(orderRes.error);
      return;
    }

    if (typeof window.Razorpay === "undefined") {
      setLoading(false);
      setError("Payment gateway failed to load. Please refresh and try again.");
      return;
    }

    const razorpay = new window.Razorpay({
      key: orderRes!.keyId,
      amount: orderRes!.amount,
      currency: orderRes!.currency,
      name: "Pulse Mobility & Care",
      description: "Wheelchair order",
      order_id: orderRes!.razorpayOrderId,
      prefill,
      theme: { color: "#1B355E" },
      handler: async (response: any) => {
        const verifyRes = await verifyAndSaveOrder({
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
          items: serverItems,
          shipping: { addressLine1, addressLine2, city, state, pincode },
        });

        setLoading(false);

        if (verifyRes?.error) {
          setError(verifyRes.error);
          return;
        }

        items.forEach((i) => removeFromCart(i.slug));
        router.push(`/order-confirmation/${verifyRes!.orderId}`);
      },
      modal: {
        ondismiss: () => setLoading(false),
      },
    });

    razorpay.on("payment.failed", () => {
      setLoading(false);
      setError("Payment failed. Please try again.");
    });

    razorpay.open();
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div className="min-h-screen bg-[#F7F8FA] px-4 py-10">
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h1
              className="text-2xl font-semibold text-[#1B355E] mb-6"
              style={{ fontFamily: "var(--font-fraunces, serif)" }}
            >
              Checkout
            </h1>

            <form onSubmit={handlePayment} className="bg-white rounded-xl border border-[#E4E7EC] p-6 space-y-4">
              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#1B355E] mb-1">
                  Address Line 1
                </label>
                <input
                  required
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className="w-full rounded-lg border border-[#E4E7EC] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/20 focus:border-[#1B355E]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B355E] mb-1">
                  Address Line 2 (optional)
                </label>
                <input
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  className="w-full rounded-lg border border-[#E4E7EC] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/20 focus:border-[#1B355E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1B355E] mb-1">
                    City
                  </label>
                  <input
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-lg border border-[#E4E7EC] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/20 focus:border-[#1B355E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B355E] mb-1">
                    State
                  </label>
                  <input
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full rounded-lg border border-[#E4E7EC] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/20 focus:border-[#1B355E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B355E] mb-1">
                  Pincode
                </label>
                <input
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full rounded-lg border border-[#E4E7EC] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/20 focus:border-[#1B355E]"
                />
              </div>

              <button
                type="submit"
                disabled={loading || items.length === 0}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#EE8B1B] text-white text-sm font-bold py-3 hover:bg-[#d97e12] transition-colors disabled:opacity-60"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Processing..." : `Pay ₹${totalPrice.toLocaleString("en-IN")}`}
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#1B355E] mb-4">Order Summary</h2>
            <div className="bg-white rounded-xl border border-[#E4E7EC] p-6 space-y-3">
              {items.length === 0 ? (
                <p className="text-sm text-[#98A2B3]">Your cart is empty.</p>
              ) : (
                <>
                  {items.map((item) => (
                    <div key={item.slug} className="flex justify-between text-sm text-[#344054]">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>
                        ₹{(parsePrice(item.price) * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-[#E4E7EC] pt-3 flex justify-between font-semibold text-[#1B355E]">
                    <span>Total</span>
                    <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
