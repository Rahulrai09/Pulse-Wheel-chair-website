"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Activity, Loader2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/account/orders";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError("Invalid email or password.");
      return;
    }

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
            Sign In
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-[#E4E7EC] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/20 focus:border-[#1B355E]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#EE8B1B] text-white text-sm font-bold py-2.5 hover:bg-[#d97e12] transition-colors disabled:opacity-60"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-[#667085]">
            New here?{" "}
            <Link
              href={`/account/signup?redirect=${encodeURIComponent(redirectTo)}`}
              className="font-medium text-[#1B355E] hover:text-[#EE8B1B]"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
