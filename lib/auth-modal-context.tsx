"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type AuthModalMode = "login" | "signup" | null;

interface AuthModalContextType {
  mode: AuthModalMode;
  openLogin: () => void;
  openSignup: () => void;
  close: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AuthModalMode>(null);

  return (
    <AuthModalContext.Provider
      value={{
        mode,
        openLogin: () => setMode("login"),
        openSignup: () => setMode("signup"),
        close: () => setMode(null),
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used within AuthModalProvider");
  return ctx;
}
