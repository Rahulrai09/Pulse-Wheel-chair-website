"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Activity, Loader2 } from "lucide-react";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/account/orders";

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
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
      options: { data: { full_name: fullName, phone } },
    });

    if (signUpError) {
      setLoading(false);
      setError(signUpError.message);
      return;
    }

    // Create the matching profile row now that we have a session
    // (requires "Confirm email" to be off in Supabase Auth settings,
    // otherwise there's no session yet to satisfy the RLS check).
    if (data.user) {
      await supabase.from("customer_profiles").insert({
        id: data.user.id,
        full_name: fullName,
        phone,
      });
    }

    setLoading(false);
    router.push(redirectTo);
    router.refresh();
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
            Create Account
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-[#E4E7EC] shadow-sm p-6 space-y-4"
        >
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#1B355E] mb-1">
              Full Name
            </label>
            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-lg border border-[#E4E7EC] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/20 focus:border-[#1B355E]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1B355E] mb-1">
              Phone Number
            </label>
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-[#E4E7EC] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/20 focus:border-[#1B355E]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1B355E] mb-1">
              Email
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[#E4E7EC] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/20 focus:border-[#1B355E]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1B355E] mb-1">
              Password
            </label>
            <input
              required
              type="password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-[#E4E7EC] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/20 focus:border-[#1B355E]"
              placeholder="At least 8 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#EE8B1B] text-white text-sm font-bold py-2.5 hover:bg-[#d97e12] transition-colors disabled:opacity-60"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-[#667085]">
            Already have an account?{" "}
            <Link
              href={`/account/login?redirect=${encodeURIComponent(redirectTo)}`}
              className="font-medium text-[#1B355E] hover:text-[#EE8B1B]"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupForm />
    </Suspense>
  );
}
