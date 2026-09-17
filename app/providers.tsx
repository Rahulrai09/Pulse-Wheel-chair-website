"use client";

import { CartProvider } from "@/lib/cart-context";
import { AuthModalProvider } from "@/lib/auth-modal-context";
import CartDrawer from "./components/CartDrawer";
import AuthModal from "./components/AuthModal";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthModalProvider>
      <CartProvider>
        {children}
        <CartDrawer />
        <AuthModal />
      </CartProvider>
    </AuthModalProvider>
  );
}
