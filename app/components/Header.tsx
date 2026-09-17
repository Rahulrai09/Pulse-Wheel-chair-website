"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TrustTicker from "./TrustTicker";
import AccountMenu from "./AccountMenu";
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
  const { totalCount, openCart } = useCart();

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

  const toggleSearch = () => setSearchOpen((prev) => !prev);

  return (
    <header className="relative bg-offwhite text-navy border-b border-slate-200/80">
      {/* Utility strip */}
      <TrustTicker />

      {/* Main nav */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1">
        {/* Logo — image */}
        <Link href="/" className="flex items-center">
          <Image
            src="/pulse-logo.png"
            alt="Pulse Mobility & Care"
            width={160}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        {/* Right — icon buttons */}
        <div className="flex items-center gap-3">
          {/* Search — expands inline to the left of the icon, doesn't push the layout */}
          <div className="relative flex items-center">
            <div
              className={`absolute right-full top-1/2 mr-2 -translate-y-1/2 overflow-hidden transition-all duration-300 ease-out ${
                searchOpen ? "w-64 max-w-[70vw] opacity-100" : "w-0 opacity-0"
              }`}
            >
              <div className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-2 shadow-sm">
                <SearchIcon />
                <input
                  autoFocus={searchOpen}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search wheelchairs..."
                  className="w-full bg-transparent text-sm text-navy placeholder:text-zinc-400 focus:outline-none"
                />
              </div>

              {query.trim() !== "" && (
                <div className="absolute left-0 right-0 top-full mt-2 max-h-80 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                  {results.length > 0 ? (
                    <ul className="divide-y divide-slate-100">
                      {results.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/wheelchairs/${p.slug}`}
                            onClick={closeSearch}
                            className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-offwhite"
                          >
                            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-b from-[#E2EDF7] to-[#F8FBFE]">
                              <Image
                                src={p.images && p.images.length > 0 ? p.images[0] : p.image}
                                alt={p.alt}
                                fill
                                className="object-contain p-1"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-xs font-semibold text-navy">{p.name}</p>
                              <p className="text-[11px] text-zinc-500">{p.price}</p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="py-4 text-center text-xs text-zinc-400">
                      No wheelchairs found for &ldquo;{query}&rdquo;
                    </p>
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              aria-label={searchOpen ? "Close search" : "Search"}
              onClick={toggleSearch}
              className="flex h-9 w-9 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/5 hover:text-orange"
            >
              {searchOpen ? <XIcon /> : <SearchIcon />}
            </button>
          </div>

          {/* Account — Myntra-style hover dropdown; login/signup opens as a modal, no navigation */}
          <AccountMenu />

          {/* Cart — opens the slide-in drawer with a live item-count badge */}
          <button
            type="button"
            onClick={openCart}
            aria-label="Cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/5 hover:text-orange"
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
          </button>
        </div>
      </nav>
    </header>
  );
}
