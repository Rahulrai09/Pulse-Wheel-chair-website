"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Self-contained Supabase client for this component.
// If you already have a shared client (e.g. lib/supabase/client.ts),
// you can delete this block and import your existing client instead —
// just make sure it uses the same env vars below.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  preferredDate: string;
};

const emptyForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  preferredDate: "",
};

export default function BookDemoModal({ isOpen, onClose }: BookDemoModalProps) {
  // Controls whether the modal is in the DOM at all
  const [mounted, setMounted] = useState(false);
  // Controls the animated (visible) state — toggled a tick after mount
  // so the CSS transition actually runs, and turned off before unmount
  // so the close animation plays.
  const [visible, setVisible] = useState(false);

  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      // Let the element mount at opacity/translate "closed" state first,
      // then flip to "open" on the next frame so the transition animates.
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
      const timeout = setTimeout(() => {
        setMounted(false);
        setForm(emptyForm);
        setSubmitted(false);
        setError(null);
      }, 250); // matches transition duration below
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!mounted) return null;

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Please fill in your name, email, and phone number.");
      return;
    }

    setSubmitting(true);
    const { error: insertError } = await supabase.from("demo_bookings").insert({
      full_name: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      city: form.city.trim() || null,
      preferred_demo_date: form.preferredDate || null,
    });
    setSubmitting(false);

    if (insertError) {
      setError("Something went wrong. Please try again in a moment.");
      return;
    }

    setSubmitted(true);
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-250 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionDuration: "250ms" }}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60"
        onClick={onClose}
      />

      {/* Modal card */}
      <div
        className={`relative w-full max-w-lg rounded-2xl bg-white shadow-2xl transition-all ease-out ${
          visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
        }`}
        style={{ transitionDuration: "250ms" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <h2 className="text-xl font-bold text-slate-900">Book a Free Demo</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="#16a34a"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Request received</h3>
            <p className="text-sm text-slate-500">
              Thanks, {form.fullName.split(" ")[0] || "there"} — our team will reach out to
              confirm your demo shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-2 rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-800">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-800">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-800">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-800">City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-semibold text-slate-800">
                  Preferred Demo Date
                </label>
                <input
                  type="date"
                  value={form.preferredDate}
                  onChange={(e) => handleChange("preferredDate", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {error && <p className="mt-4 text-sm font-medium text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Booking..." : "Book My Demo"}
              {!submitting && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
