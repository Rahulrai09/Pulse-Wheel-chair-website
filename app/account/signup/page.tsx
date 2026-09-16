"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
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
      options: {
        data: { full_name: fullName },
      },
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

    // If email confirmation is off, Supabase returns a session immediately
    // and we can send them straight to their account. Otherwise send them
    // to sign in (or to check their inbox) once confirmation is required.
    if (data.session) {
      router.push("/account");
      router.refresh();
    } else {
      router.push("/account/login?signup=success");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-offwhite px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="mb-4">
            <span className="text-lg font-bold text-navy">Pulse Mobility &amp; Care</span>
          </Link>
          <h1 className="text-2xl font-semibold text-navy">Create your account</h1>
          <p className="mt-1 text-sm text-warm-gray">Track orders and manage your details</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4"
        >
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-navy mb-1">Full name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-navy mb-1">Password</label>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-orange text-white text-sm font-bold py-3 hover:bg-orange-hover transition-colors disabled:opacity-60"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="text-center text-sm text-warm-gray pt-1">
            Already have an account?{" "}
            <Link href="/account/login" className="font-medium text-navy hover:text-orange">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
