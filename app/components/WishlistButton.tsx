"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthModal } from "@/lib/auth-modal-context";
import { useSupabaseUser } from "@/lib/use-supabase-user";

export default function WishlistButton({
  productSlug,
  className,
}: {
  productSlug: string;
  className?: string;
}) {
  const { user, loading: userLoading } = useSupabaseUser();
  const { openLogin } = useAuthModal();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (userLoading) return;

    if (!user) {
      setIsWishlisted(false);
      setChecking(false);
      return;
    }

    const supabase = createClient();
    supabase
      .from("wishlist_items")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_slug", productSlug)
      .maybeSingle()
      .then(({ data }) => {
        setIsWishlisted(!!data);
        setChecking(false);
      });
  }, [user, userLoading, productSlug]);

  async function toggle() {
    if (!user) {
      openLogin();
      return;
    }

    const supabase = createClient();
    if (isWishlisted) {
      setIsWishlisted(false);
      await supabase
        .from("wishlist_items")
        .delete()
        .eq("user_id", user.id)
        .eq("product_slug", productSlug);
    } else {
      setIsWishlisted(true);
      await supabase
        .from("wishlist_items")
        .insert({ user_id: user.id, product_slug: productSlug });
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={checking}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      className={
        className ??
        `flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
          isWishlisted
            ? "border-orange bg-orange/10 text-orange"
            : "border-slate-300 bg-white text-zinc-600 hover:border-orange hover:text-orange"
        }`
      }
    >
      <svg
        viewBox="0 0 24 24"
        fill={isWishlisted ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.8}
        className="h-5 w-5"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
