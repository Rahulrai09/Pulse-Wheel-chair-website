"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuthModal } from "@/lib/auth-modal-context";

export default function AuthModal() {
  const { mode, close, openLogin, openSignup } = useAuthModal();

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupDone, setSignupDone] = useState(false);

  const isOpen = mode !== null;

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
      const timeout = setTimeout(() => {
        setMounted(false);
        setEmail("");
        setPassword("");
        setFullName("");
        setError("");
        setSignupDone(false);
      }, 220);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  if (!mounted) return null;

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (signInError) {
      setError("Invalid email or password.");
      return;
    }

    close();
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    setLoading(false);

    if (signUpError) {
      setError(
        signUpError.message.includes("already registered")
          ? "An account with this email already exists."
          : "Something went wrong. Please try again."
      );
      return;
    }

    if (data.session) {
      close();
    } else {
      // Email confirmation required — let them know, then flip to the login view.
      setSignupDone(true);
    }
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-250 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop — blur fades in smoothly alongside the dim */}
      <div
        className={`absolute inset-0 bg-slate-900/40 transition-all duration-250 ease-out ${
          visible ? "backdrop-blur-sm" : "backdrop-blur-0"
        }`}
        onClick={close}
      />

      {/* Card */}
      <div
        className={`relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl transition-all duration-250 ease-out ${
          visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
        }`}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="mb-5 text-center">
          <span className="text-base font-bold text-navy">Pulse Mobility &amp; Care</span>
          <h2 className="mt-2 text-xl font-semibold text-navy">
            {mode === "signup" ? "Create your account" : "Sign in"}
          </h2>
        </div>

        {signupDone ? (
          <div className="space-y-4 text-center">
            <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-3 text-sm text-green-700">
              Check <strong>{email}</strong> to confirm your account, then sign in.
            </div>
            <button
              onClick={openLogin}
              className="w-full rounded-full bg-orange py-3 text-sm font-bold text-white transition hover:bg-orange-hover"
            >
              Go to sign in
            </button>
          </div>
        ) : (
          <form onSubmit={mode === "signup" ? handleSignup : handleLogin} className="space-y-4">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </div>
            )}

            {mode === "signup" && (
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">Full name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20"
                />
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium text-navy">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="block text-sm font-medium text-navy">Password</label>
                {mode === "login" && (
                  <Link
                    href="/account/forgot-password"
                    onClick={close}
                    className="text-xs font-medium text-navy hover:text-orange"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <input
                type="password"
                required
                minLength={mode === "signup" ? 8 : undefined}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20"
                placeholder={mode === "signup" ? "At least 8 characters" : "••••••••"}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-orange py-3 text-sm font-bold text-white transition hover:bg-orange-hover disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading
                ? mode === "signup"
                  ? "Creating account..."
                  : "Signing in..."
                : mode === "signup"
                ? "Create account"
                : "Sign in"}
            </button>

            <p className="pt-1 text-center text-sm text-warm-gray">
              {mode === "signup" ? (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={openLogin}
                    className="font-medium text-navy hover:text-orange"
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  New here?{" "}
                  <button
                    type="button"
                    onClick={openSignup}
                    className="font-medium text-navy hover:text-orange"
                  >
                    Create an account
                  </button>
                </>
              )}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
