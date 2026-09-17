"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Package, LogOut, ArrowLeft, Heart } from "lucide-react";
import { updateProfile, signOutAction } from "./actions";
import { removeFromWishlist } from "./wishlist-actions";
import type { OrderRecord } from "./page";

export type WishlistProduct = {
  slug: string;
  name: string;
  image: string;
  price: string;
};

const STATUS_STYLES: Record<string, string> = {
  created: "bg-blue-50 text-blue-700 border-blue-200",
  paid: "bg-green-50 text-green-700 border-green-200",
  shipped: "bg-amber-50 text-amber-700 border-amber-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-gray-100 text-gray-600 border-gray-200",
};

function formatCurrency(amount: number | null, currency: string | null) {
  if (amount == null) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function AccountManager({
  email,
  fullName: initialFullName,
  orders,
  wishlist,
}: {
  email: string;
  fullName: string;
  orders: OrderRecord[];
  wishlist: WishlistProduct[];
}) {
  const [fullName, setFullName] = useState(initialFullName);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [signingOut, setSigningOut] = useState(false);
  const [wishlistItems, setWishlistItems] = useState(wishlist);

  async function handleRemoveFromWishlist(slug: string) {
    setWishlistItems((prev) => prev.filter((p) => p.slug !== slug));
    await removeFromWishlist(slug);
  }

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaved(false);
    setSaving(true);

    const res = await updateProfile(fullName);
    setSaving(false);

    if (res?.error) {
      setError(res.error);
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="min-h-screen bg-offwhite">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-warm-gray hover:text-navy"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to shopping
        </Link>

        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-navy">
            My Account{fullName ? `: ${fullName}` : ""}
          </h1>
          <form action={signOutAction}>
            <button
              type="submit"
              onClick={() => setSigningOut(true)}
              disabled={signingOut}
              className="flex items-center gap-1.5 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-navy transition hover:bg-navy/5 disabled:opacity-60"
            >
              <LogOut className="w-4 h-4" />
              {signingOut ? "Signing out..." : "Sign out"}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Profile */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-navy">Profile</h2>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                    {error}
                  </div>
                )}
                {saved && (
                  <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                    Saved.
                  </div>
                )}

                <div>
                  <label className="mb-1 block text-sm font-medium text-navy">Full name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-navy">Email</label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-warm-gray"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-orange py-2.5 text-sm font-bold text-white transition hover:bg-orange-hover disabled:opacity-60"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </form>
            </div>
          </div>

          {/* Order history */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-navy">Order history</h2>

              {orders.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-12 text-center">
                  <Package className="h-8 w-8 text-slate-300" />
                  <p className="text-sm text-warm-gray">You haven&apos;t placed any orders yet.</p>
                  <Link
                    href="/wheelchairs"
                    className="mt-2 text-sm font-medium text-navy hover:text-orange"
                  >
                    Browse wheelchairs →
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {orders.map((order) => (
                    <li key={order.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-navy">
                            Order #{order.id.slice(0, 8)}
                          </p>
                          <p className="text-xs text-warm-gray">
                            {new Date(order.created_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${
                              STATUS_STYLES[order.status] ||
                              "bg-gray-100 text-gray-600 border-gray-200"
                            }`}
                          >
                            {order.status}
                          </span>
                          <span className="text-sm font-semibold text-navy">
                            {formatCurrency(order.total, order.currency)}
                          </span>
                        </div>
                      </div>
                      {order.order_items?.length > 0 && (
                        <ul className="space-y-1 pl-1 text-sm text-warm-gray">
                          {order.order_items.map((item) => (
                            <li key={item.id}>
                              {item.quantity} × {item.product_name || "Item"}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Wishlist */}
        <div id="wishlist" className="mt-6 scroll-mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-navy">Wishlist</h2>

          {wishlistItems.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <Heart className="h-8 w-8 text-slate-300" />
              <p className="text-sm text-warm-gray">Nothing saved to your wishlist yet.</p>
              <Link href="/wheelchairs" className="mt-2 text-sm font-medium text-navy hover:text-orange">
                Browse wheelchairs →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {wishlistItems.map((p) => (
                <div
                  key={p.slug}
                  className="group relative rounded-xl border border-slate-100 p-3 transition hover:border-slate-200"
                >
                  <button
                    type="button"
                    onClick={() => handleRemoveFromWishlist(p.slug)}
                    aria-label="Remove from wishlist"
                    className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-400 shadow transition hover:text-red-500"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                  <Link href={`/wheelchairs/${p.slug}`} className="block">
                    <div className="relative mb-2 aspect-square overflow-hidden rounded-lg bg-gradient-to-b from-[#E2EDF7] to-[#F8FBFE]">
                      <Image src={p.image} alt={p.name} fill className="object-contain p-3" />
                    </div>
                    <p className="line-clamp-2 text-sm font-medium text-navy">{p.name}</p>
                    <p className="text-sm font-semibold text-orange">{p.price}</p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
