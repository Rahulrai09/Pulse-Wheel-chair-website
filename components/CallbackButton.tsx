"use client";

import { useState } from "react";
import { X, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { submitEnquiry, type EnquirySource } from "@/app/actions/enquiries";

type CallbackButtonProps = {
  label: string;
  source: EnquirySource;
  productSlug?: string;
  className?: string;
};

/**
 * Drop-in replacement for a plain <a href="#"> button. Renders exactly
 * like a normal button, but opens a lead-capture modal on click and
 * saves the submission to the `enquiries` table.
 *
 * Usage: <CallbackButton label="Schedule Demo" source="schedule_demo" className="..." />
 */
export default function CallbackButton({
  label,
  source,
  productSlug,
  className,
}: CallbackButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
      </button>
      {open && (
        <CallbackModal
          source={source}
          productSlug={productSlug}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

const SOURCE_HEADLINES: Record<EnquirySource, string> = {
  schedule_demo: "Book a Free Demo",
  download_catalog: "Get Our Product Catalog",
  product_enquiry: "Ask About This Product",
  contact: "Talk to Our Team",
  whatsapp_click: "Talk to Our Team",
};

const SUBMIT_LABELS: Record<EnquirySource, string> = {
  schedule_demo: "Book My Demo",
  download_catalog: "Get Catalog",
  product_enquiry: "Submit",
  contact: "Submit",
  whatsapp_click: "Submit",
};

function CallbackModal({
  source,
  productSlug,
  onClose,
}: {
  source: EnquirySource;
  productSlug?: string;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const showDateField = source === "schedule_demo";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const res = await submitEnquiry({
      name,
      email,
      phone,
      city,
      preferredDate: showDateField ? preferredDate : undefined,
      productSlug,
      source,
    });

    setSubmitting(false);

    if (res?.error) {
      setError(res.error);
      return;
    }

    setDone(true);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg relative shadow-2xl">
        <div className="flex items-center justify-between px-8 pt-7 pb-5 border-b border-[#E4E7EC]">
          <h3
            className="text-xl font-semibold text-[#1B355E]"
            style={{ fontFamily: "var(--font-fraunces, serif)" }}
          >
            {SOURCE_HEADLINES[source]}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 pt-6">
          {done ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-12 h-12 text-[#EE8B1B] mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-[#1B355E] mb-1">
                Thank you!
              </h3>
              <p className="text-sm text-gray-600">
                Our team will get in touch with you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#1B355E] mb-1.5">
                    Full Name <span className="text-[#EE8B1B]">*</span>
                  </label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/20 focus:border-[#1B355E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1B355E] mb-1.5">
                    Email <span className="text-[#EE8B1B]">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/20 focus:border-[#1B355E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1B355E] mb-1.5">
                    Phone Number <span className="text-[#EE8B1B]">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/20 focus:border-[#1B355E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1B355E] mb-1.5">
                    City
                  </label>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/20 focus:border-[#1B355E]"
                  />
                </div>

                {showDateField && (
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-[#1B355E] mb-1.5">
                      Preferred Demo Date
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/20 focus:border-[#1B355E]"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#EE8B1B] text-white text-sm font-bold py-3.5 hover:bg-[#d97e12] transition-colors disabled:opacity-60 mt-2"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {SUBMIT_LABELS[source]}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
