"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Activity, Loader2 } from "lucide-react";

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

    // Supabase's client automatically parses the recovery token from the
    // URL and creates a temporary session for it. We just need to confirm
    // that session actually exists before showing the form.
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
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      setSaving(false);
      setError(updateError.message);
      return;
    }

    // Sign out of the temporary recovery session so the person logs in
    // fresh with their new password — cleaner than leaving them
    // half-authenticated on an unfamiliar session.
    await supabase.auth.signOut();
    router.push("/admin/login?reset=success");
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
          {checkingLink ? (
            <div className="flex items-center justify-center py-6 text-[#667085]">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Checking link...
            </div>
          ) : !linkValid ? (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-3 text-center">
              This reset link is invalid or has expired. Go back to{" "}
              <a href="/admin/forgot-password" className="underline font-medium">
                request a new one
              </a>
              .
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-[#667085]">
                Choose a new password for your admin account.
              </p>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#1B355E] mb-1">
                  New password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-[#E4E7EC] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/20 focus:border-[#1B355E]"
                  placeholder="At least 8 characters"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B355E] mb-1">
                  Confirm new password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border border-[#E4E7EC] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/20 focus:border-[#1B355E]"
                  placeholder="Re-enter password"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#1B355E] text-white text-sm font-medium py-2.5 hover:bg-[#152a4d] transition-colors disabled:opacity-60"
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
