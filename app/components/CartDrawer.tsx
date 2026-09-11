"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { products } from "@/lib/products";

function XIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, totalPrice, addToCart } =
    useCart();

  const suggestions = products.filter((p) => !items.some((i) => i.slug === p.slug)).slice(0, 5);

  return (
    <>
      {/* Backdrop — fades in/out */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ease-out ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Panel — slides in from the right with a soft spring overshoot */}
      <div
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-offwhite shadow-2xl transition-transform duration-500 [transition-timing-function:cubic-bezier(0.32,1.25,0.4,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-all duration-300 hover:rotate-90 hover:bg-zinc-100"
          >
            <XIcon />
          </button>
          <h2 className="font-serif text-lg font-bold text-navy">Your Cart</h2>
          <div className="w-8" />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-zinc-500">Your cart is empty.</p>
              <button
                type="button"
                onClick={closeCart}
                className="mt-4 rounded-full bg-orange px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-orange-hover"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart items */}
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <div
                    key={item.slug}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200/60 bg-white p-3 shadow-sm"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-b from-[#E2EDF7] to-[#F8FBFE]">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-1.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/wheelchairs/${item.slug}`}
                        onClick={closeCart}
                        className="line-clamp-2 text-sm font-semibold text-navy hover:text-orange transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 text-sm font-bold text-navy">{item.price}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.slug)}
                        aria-label="Remove item"
                        className="text-zinc-400 hover:text-red-500 transition-colors"
                      >
                        <XIcon className="h-4 w-4" />
                      </button>
                      <div className="flex items-center rounded-full border border-slate-300 bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                          className="flex h-6 w-6 items-center justify-center text-sm font-bold text-navy"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                          className="flex h-6 w-6 items-center justify-center text-sm font-bold text-navy"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cross-sell */}
              {suggestions.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 text-sm font-bold text-navy">You Might Also Like</h3>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {suggestions.map((p) => (
                      <div
                        key={p.slug}
                        className="flex w-32 flex-shrink-0 flex-col rounded-2xl border border-slate-200/60 bg-white p-2.5 shadow-sm"
                      >
                        <div className="relative h-20 w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#E2EDF7] to-[#F8FBFE]">
                          <Image
                            src={p.images && p.images.length > 0 ? p.images[0] : p.image}
                            alt={p.alt}
                            fill
                            className="object-contain p-1.5"
                          />
                        </div>
                        <p className="mt-2 line-clamp-2 text-[11px] font-semibold leading-tight text-navy">
                          {p.name}
                        </p>
                        <p className="mt-1 text-xs font-bold text-navy">{p.price}</p>
                        <button
                          type="button"
                          onClick={() => addToCart(p, 1)}
                          className="mt-2 rounded-full bg-orange py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-orange-hover"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer / checkout */}
        {items.length > 0 && (
          <div className="border-t border-slate-200 bg-white px-5 py-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-zinc-500">Subtotal</span>
              <span className="text-lg font-bold text-navy">
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                alert(
                  "Razorpay checkout is being connected next — this button will process real payment shortly."
                )
              }
              className="w-full rounded-full bg-orange py-3.5 text-sm font-bold text-white shadow-md shadow-orange/20 transition-colors hover:bg-orange-hover"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
