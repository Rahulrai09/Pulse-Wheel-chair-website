"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <div className="flex min-h-screen flex-col bg-offwhite text-navy">
      <Header />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-8 font-serif text-3xl font-bold">Your Cart</h1>

        {items.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-slate-200/60">
            <p className="text-zinc-500">Your cart is empty.</p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-full bg-orange px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-hover"
            >
              Browse Wheelchairs
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Items list */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.slug}
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm border border-slate-200/60"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-b from-[#E2EDF7] to-[#F8FBFE]">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/wheelchairs/${item.slug}`}
                      className="text-sm font-semibold text-navy hover:text-orange transition-colors line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-sm font-bold text-navy">{item.price}</p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center rounded-full border border-slate-300 bg-white p-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-navy hover:bg-zinc-100 font-bold"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-navy hover:bg-zinc-100 font-bold"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.slug)}
                    aria-label="Remove item"
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/60 h-fit">
              <h2 className="mb-4 font-serif text-lg font-bold">Order Summary</h2>
              <div className="flex items-center justify-between text-sm text-zinc-600">
                <span>Subtotal</span>
                <span className="font-semibold text-navy">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-400">Shipping and taxes calculated at checkout.</p>

              <button
                type="button"
                onClick={() =>
                  alert(
                    "Checkout and payment are being set up next — this button will connect to real payment shortly."
                  )
                }
                className="mt-6 w-full rounded-full bg-orange py-3.5 text-sm font-bold text-white shadow-md shadow-orange/20 transition-colors hover:bg-orange-hover"
              >
                Proceed to Checkout
              </button>

              <Link
                href="/"
                className="mt-3 block text-center text-xs font-medium text-zinc-500 hover:text-orange transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
