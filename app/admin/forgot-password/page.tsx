"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Activity, Loader2, ArrowLeft } from "lucide-react";

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
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      }
    );

    setLoading(false);

    // Always show the same success message, whether or not the email
    // exists — this prevents anyone from using this form to check which
    // emails have admin accounts.
    if (resetError) {
      setError("Something went wrong. Please try again.");
      return;
    }

    setSent(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F2F4] px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#1B355E] flex items-center justify-center mb-3">
            <Activity className="w-6 h-6 text-[#EE8B1B]" strokeWidth={2.5} />
          </div>
          <h1
            className="text-2xl font-semibold text-[#1B355E] tracking-wide"
            style={{ fontFamily: "var(--font-fraunces, serif)" }}
          >
            PULSE ADMIN
          </h1>
        </div>

        <div className="bg-white rounded-xl border border-[#E4E7EC] shadow-sm p-6">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-3">
                If an account exists for <strong>{email}</strong>, a password
                reset link has been sent. Check your inbox.
              </div>
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1B355E] hover:text-[#EE8B1B]"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-[#667085]">
                Enter your admin email and we&apos;ll send you a link to reset
                your password.
              </p>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#1B355E] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-[#E4E7EC] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/20 focus:border-[#1B355E]"
                  placeholder="you@pulseio.in"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#1B355E] text-white text-sm font-medium py-2.5 hover:bg-[#152a4d] transition-colors disabled:opacity-60"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Sending..." : "Send reset link"}
              </button>

              <Link
                href="/admin/login"
                className="flex items-center justify-center gap-1.5 text-sm font-medium text-[#667085] hover:text-[#1B355E] pt-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
