"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [checkingLink, setCheckingLink] = useState(true);
  const [linkValid, setLinkValid] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    // Supabase's client auto-parses the recovery token from the URL and
    // creates a temporary session for it — just confirm it exists first.
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLinkValid(!!session);
      setCheckingLink(false);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setSaving(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setSaving(false);
      setError(updateError.message);
      return;
    }

    // Sign out of the temporary recovery session so they log in fresh.
    await supabase.auth.signOut();
    router.push("/account/login?reset=success");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-offwhite px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="mb-4">
            <span className="text-lg font-bold text-navy">Pulse Mobility &amp; Care</span>
          </Link>
          <h1 className="text-2xl font-semibold text-navy">Set a new password</h1>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          {checkingLink ? (
            <div className="flex items-center justify-center py-6 text-warm-gray">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Checking link...
            </div>
          ) : !linkValid ? (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-3 text-center">
              This reset link is invalid or has expired. Go back to{" "}
              <a href="/account/forgot-password" className="underline font-medium">
                request a new one
              </a>
              .
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-warm-gray">Choose a new password for your account.</p>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-navy mb-1">New password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="At least 8 characters"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-1">
                  Confirm new password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="Re-enter password"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-orange text-white text-sm font-bold py-3 hover:bg-orange-hover transition-colors disabled:opacity-60"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving ? "Saving..." : "Update password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
