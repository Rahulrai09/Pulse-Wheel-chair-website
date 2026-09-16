"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Loader2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/account/reset-password`,
    });

    setLoading(false);

    // Always show the same success message whether or not the email is
    // registered — avoids leaking which emails have accounts.
    if (resetError) {
      setError("Something went wrong. Please try again.");
      return;
    }

    setSent(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-offwhite px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="mb-4">
            <span className="text-lg font-bold text-navy">Pulse Mobility &amp; Care</span>
          </Link>
          <h1 className="text-2xl font-semibold text-navy">Reset your password</h1>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-3">
                If an account exists for <strong>{email}</strong>, a password reset link has
                been sent. Check your inbox.
              </div>
              <Link
                href="/account/login"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-orange"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-warm-gray">
                Enter your email and we&apos;ll send you a link to reset your password.
              </p>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-navy mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="you@example.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-orange text-white text-sm font-bold py-3 hover:bg-orange-hover transition-colors disabled:opacity-60"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Sending..." : "Send reset link"}
              </button>

              <Link
                href="/account/login"
                className="flex items-center justify-center gap-1.5 text-sm font-medium text-warm-gray hover:text-navy pt-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to sign in
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
