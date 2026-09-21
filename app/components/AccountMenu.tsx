"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { LogOut, Package, Heart } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuthModal } from "@/lib/auth-modal-context";
import { useSupabaseUser } from "@/lib/use-supabase-user";

function AccountIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function AccountMenu() {
  const { user } = useSupabaseUser();
  const { openLogin } = useAuthModal();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setOpen(false);
  }

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        type="button"
        aria-label="Account"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/5 hover:text-orange"
      >
        <AccountIcon />
      </button>

      <div
        className={`absolute right-0 top-full z-50 w-72 max-w-[85vw] pt-2 transition-all duration-200 ease-out ${
          open ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          {user ? (
            <>
              <div className="px-5 pb-3 pt-4">
                <p className="text-sm font-semibold text-navy">
                  {user.user_metadata?.full_name || "Your account"}
                </p>
                <p className="truncate text-xs text-warm-gray">{user.email}</p>
              </div>
              <div className="border-t border-slate-100 py-1">
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-5 py-2.5 text-sm text-navy transition hover:bg-offwhite"
                >
                  <Package className="h-4 w-4" />
                  Order history
                </Link>
                <Link
                  href="/account#wishlist"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-5 py-2.5 text-sm text-navy transition hover:bg-offwhite"
                >
                  <Heart className="h-4 w-4" />
                  Wishlist
                </Link>
              </div>
              <div className="border-t border-slate-100 py-1">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 px-5 py-2.5 text-left text-sm text-navy transition hover:bg-offwhite"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="px-5 pt-4">
                <p className="text-sm font-semibold text-navy">Welcome</p>
                <p className="text-xs text-warm-gray">To access account and manage orders</p>
              </div>
              <div className="px-5 py-4">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openLogin();
                  }}
                  className="w-full rounded-full border-2 border-orange py-2.5 text-sm font-bold text-orange transition hover:bg-orange hover:text-white"
                >
                  Login / Signup
                </button>
              </div>
              <div className="border-t border-slate-100 py-1">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openLogin();
                  }}
                  className="flex w-full items-center gap-3 px-5 py-2.5 text-left text-sm text-navy transition hover:bg-offwhite"
                >
                  <Package className="h-4 w-4" />
                  Orders
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openLogin();
                  }}
                  className="flex w-full items-center gap-3 px-5 py-2.5 text-left text-sm text-navy transition hover:bg-offwhite"
                >
                  <Heart className="h-4 w-4" />
                  Wishlist
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
