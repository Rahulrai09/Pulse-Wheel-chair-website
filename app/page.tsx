"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FeatureIcon from "./components/FeatureIcon";
import { products } from "@/lib/products";

/* ──────────────────────────────────────────────
   Pulse Wheelchair — Homepage
   Next.js 16 · Tailwind CSS v4 · Server Component
   ────────────────────────────────────────────── */

// ─── Inline SVG icon components (no external deps) ────────────────────────────

/** Reusable wrapper so every category icon is the same size / color */
function CategoryIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-offwhite text-navy">
      {children}
    </div>
  );
}

/* ─── Small SVG icons ────────────────────────────────────────────────────────── */

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function WheelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.636 5.636l4.243 4.243M14.121 14.121l4.243 4.243M5.636 18.364l4.243-4.243M14.121 9.879l4.243-4.243" />
    </svg>
  );
}

function FeatherIconLarge() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
      <path d="M16 8L2 22" />
      <path d="M17.5 15H9" />
    </svg>
  );
}

function SuitcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M10 11v4M14 11v4" />
    </svg>
  );
}

function SpeedometerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <path d="M12 14l3-5" />
      <path d="M3.34 17a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function DeliveryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 5v5h-7V8z" />
      <circle cx="5.5" cy="19.5" r="2.5" />
      <circle cx="18.5" cy="19.5" r="2.5" />
    </svg>
  );
}

function EmiIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

function IsoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function TrialIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

/* ─── Category data ──────────────────────────────────────────────────────────── */

const categories = [
  { icon: <BoltIcon />, label: "Power Wheelchair" },
  { icon: <WheelIcon />, label: "Manual Wheelchair" },
  { icon: <FeatherIconLarge />, label: "Lightweight Wheelchair" },
  { icon: <SuitcaseIcon />, label: "Travel Wheelchair" },
  { icon: <SpeedometerIcon />, label: "Speed Wheelchair" },
  { icon: <HeartIcon />, label: "Comfortable Wheelchair" },
];

/* ─── Trust Badges data ──────────────────────────────────────────────────────── */

const trustBadges = [
  { icon: <DeliveryIcon />, title: "Free Delivery", desc: "Across 18,000+ pin codes in India" },
  { icon: <EmiIcon />, title: "Easy EMI Options", desc: "Starting at ₹999/mo — zero cost" },
  { icon: <IsoIcon />, title: "ISO 13485 Certified", desc: "Medical-grade quality assurance" },
  { icon: <TrialIcon />, title: "7-Day Home Trial", desc: "Love it or return with full refund" },
];

/* ═════════════════════════════════════════════════════════════════════════════ */
/*  Page Component                                                              */
/* ═════════════════════════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-offwhite text-navy">
      {/* Header */}
      <Header />

      {/* ── Hero banner ─────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ aspectRatio: "1800/720" }}>
        <Image
          src="/hero-banner.jpg"
          alt="Pulse Wheelchair Hero Banner"
          fill
          priority
          className="object-cover"
        />
      </section>

      {/* ── Category cards ─────────────────────────────────────────────────── */}
      <section className="mt-14 mx-auto w-full max-w-6xl px-6">
        <div className="rounded-2xl bg-white p-8 shadow-xl shadow-navy/5">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((c) => (
              <a
                key={c.label}
                href="#"
                className="group flex flex-col items-center text-center transition-transform hover:-translate-y-1"
              >
                <CategoryIcon>{c.icon}</CategoryIcon>
                <span className="text-sm font-medium text-navy group-hover:text-orange transition-colors">
                  {c.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Best Wheelchairs ────────────────────────────────────────────────── */}
      <section className="mx-auto mt-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Best Wheelchairs</h2>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/wheelchairs/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-[26px] bg-[#EEF4F8]/80 p-2.5 shadow-sm transition-shadow hover:shadow-md border border-slate-200/60"
            >
              {/* Top Image area with soft gradient */}
              <div className="relative z-10 h-52 sm:h-56 w-full rounded-[20px] bg-gradient-to-b from-[#E2EDF7] via-[#EEF5FC] to-[#F8FBFE] flex items-center justify-center p-3 pb-6">
                {/* Chevron buttons */}
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-zinc-700 shadow-sm transition-transform hover:scale-105 active:scale-95 [&>svg]:h-3.5 [&>svg]:w-3.5 z-20"
                >
                  <ChevronLeftIcon />
                </button>

                <div className="relative h-full w-full flex items-center justify-center">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-contain p-1 scale-105 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <button
                  type="button"
                  aria-label="Next image"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-zinc-700 shadow-sm transition-transform hover:scale-105 active:scale-95 [&>svg]:h-3.5 [&>svg]:w-3.5 z-20"
                >
                  <ChevronRightIcon />
                </button>
              </div>

              {/* White rounded panel overlapping the top image */}
              <div className="relative z-20 -mt-8 flex flex-1 flex-col justify-between rounded-[22px] bg-white p-4 sm:p-5 shadow-sm">
                {/* Pagination Dots */}
                <div className="mb-3 flex items-center justify-center gap-1.5">
                  <span className="h-1.5 w-5 rounded-full bg-orange" />
                  <span className="h-1.5 w-1.5 rounded-full bg-orange/20" />
                  <span className="h-1.5 w-1.5 rounded-full bg-orange/20" />
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-semibold leading-tight text-navy mb-2 group-hover:text-orange transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-zinc-500 leading-relaxed mb-4">
                    {p.description}
                  </p>

                  {/* 4 Feature Icons Row */}
                  <div className="mb-4 grid grid-cols-4 gap-1 text-center">
                    {p.features.map((f, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className="mb-1 flex h-7.5 w-7.5 items-center justify-center rounded-full bg-orange/10 text-orange [&>svg]:h-3.5 [&>svg]:w-3.5">
                          <FeatureIcon iconKey={f.iconKey} />
                        </div>
                        <span className="text-[9px] sm:text-[9.5px] font-medium leading-tight text-zinc-600 text-center break-words min-h-[1.75rem] flex items-center justify-center">
                          {f.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Actions Row */}
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-sans text-lg sm:text-xl font-extrabold text-navy">
                      {p.price}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Call specialist"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-orange/10 text-orange transition-colors hover:bg-orange/20 [&>svg]:h-4 [&>svg]:w-4"
                      >
                        <PhoneIcon />
                      </button>
                      <button
                        type="button"
                        aria-label="Add to cart"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-orange/10 text-orange transition-colors hover:bg-orange/20 [&>svg]:h-4 [&>svg]:w-4"
                      >
                        <CartIcon />
                      </button>
                    </div>
                  </div>

                  {/* Buy Now Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-orange py-2.5 px-4 text-xs sm:text-sm font-bold text-white shadow-md shadow-orange/20 transition-colors hover:bg-orange-hover [&>svg]:h-4 [&>svg]:w-4"
                  >
                    <span>Buy Now</span>
                    <ArrowRightIcon />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Promo Panels (Why Choose Pulse & Range Highlights) ──────────────── */}
      <section className="mx-auto mt-20 w-full max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Panel 1 */}
          <div className="flex flex-col justify-between rounded-3xl bg-navy p-8 text-white shadow-xl">
            <div>
              <span className="text-xs font-semibold tracking-wider text-orange uppercase">
                WHY PULSE
              </span>
              <h3 className="mt-2 font-serif text-2xl font-bold sm:text-3xl">
                Engineered for Mobility, Crafted for Comfort
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Every Pulse wheelchair undergoes rigorous testing to guarantee lightweight strength, smooth terrain navigation, and all-day ergonomic support for complete peace of mind.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange text-white">
                <IsoIcon />
              </div>
              <div>
                <p className="text-sm font-bold">Medical-Grade Quality</p>
                <p className="text-xs text-white/60">ISO 13485 &amp; CE Certified manufacturing</p>
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="flex flex-col justify-between rounded-3xl bg-white p-8 text-navy shadow-xl shadow-navy/5 border border-navy/5">
            <div>
              <span className="text-xs font-semibold tracking-wider text-orange uppercase">
                SERVICE &amp; SUPPORT
              </span>
              <h3 className="mt-2 font-serif text-2xl font-bold sm:text-3xl">
                Hassle-Free Ownership Experience
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-warm-gray">
                From doorstep delivery to 1-year comprehensive warranty and dedicated home service across India, Pulse ensures your independence is backed every step of the way.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#"
                className="rounded-full bg-orange px-6 py-3 text-xs font-bold text-white transition-colors hover:bg-orange-hover"
              >
                Schedule Demo
              </a>
              <a
                href="#"
                className="rounded-full border border-navy/20 px-6 py-3 text-xs font-bold text-navy transition-colors hover:bg-navy/5"
              >
                Download Catalog
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Badges Strip ───────────────────────────────────────────────── */}
      <section className="mx-auto mt-20 w-full max-w-7xl px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustBadges.map((b) => (
            <div
              key={b.title}
              className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-md shadow-navy/5 transition-transform hover:-translate-y-0.5"
            >
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
                {b.icon}
              </span>
              <div>
                <p className="text-sm font-bold text-navy">{b.title}</p>
                <p className="mt-0.5 text-xs text-warm-gray">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
