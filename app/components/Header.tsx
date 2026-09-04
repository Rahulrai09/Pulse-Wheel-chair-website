"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TrustTicker from "./TrustTicker";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { totalCount } = useCart();

  const results =
    query.trim() === ""
      ? []
      : products
          .filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))
          .slice(0, 6);

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <header className="relative bg-offwhite text-navy border-b border-slate-200/80">
      {/* Utility strip */}
      <TrustTicker />

      {/* Main nav */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo — image */}
        <Link href="/" className="flex items-center">
          <Image
            src="/pulse-logo.png"
            alt="Pulse Mobility & Care"
            width={160}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Right — icon buttons */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/5 hover:text-orange"
          >
            <SearchIcon />
          </button>

          {/* Account */}
          <button
            type="button"
            aria-label="Account"
            className="flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/5 hover:text-orange"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {/* Cart — now a real link with a live item-count badge */}
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/5 hover:text-orange"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange text-[10px] font-bold text-white">
                {totalCount > 9 ? "9+" : totalCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={closeSearch}
            aria-hidden="true"
          />
          <div className="absolute left-0 right-0 top-full z-50 border-t border-slate-200 bg-white shadow-lg">
            <div className="mx-auto max-w-7xl px-6 py-4">
              <div className="flex items-center gap-3 rounded-full border border-slate-300 bg-offwhite px-4 py-2.5">
                <SearchIcon />
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search wheelchairs..."
                  className="flex-1 bg-transparent text-sm text-navy placeholder:text-zinc-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={closeSearch}
                  aria-label="Close search"
                  className="text-zinc-400 hover:text-navy"
                >
                  <XIcon />
                </button>
              </div>

              {query.trim() !== "" && (
                <div className="mt-4 max-h-80 overflow-y-auto">
                  {results.length > 0 ? (
                    <ul className="divide-y divide-slate-100">
                      {results.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/wheelchairs/${p.slug}`}
                            onClick={closeSearch}
                            className="flex items-center gap-4 rounded-xl px-2 py-3 transition-colors hover:bg-offwhite"
                          >
                            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-b from-[#E2EDF7] to-[#F8FBFE]">
                              <Image
                                src={p.images && p.images.length > 0 ? p.images[0] : p.image}
                                alt={p.alt}
                                fill
                                className="object-contain p-1"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold text-navy">{p.name}</p>
                              <p className="text-xs text-zinc-500">{p.price}</p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="py-6 text-center text-sm text-zinc-400">
                      No wheelchairs found for &ldquo;{query}&rdquo;
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
