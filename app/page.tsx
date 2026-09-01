import Image from "next/image";
import TrustTicker from "./components/TrustTicker";

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

function WheelchairIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <circle cx="9" cy="20" r="2.5" />
      <circle cx="18" cy="20" r="2.5" />
      <path d="M9 17.5V8h6l3 9.5" />
      <circle cx="9" cy="5" r="2" />
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
      <path d="M2 10h20" />
    </svg>
  );
}

function CertifiedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );
}

function TrialIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function FoldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
      <path d="M4 19h16M4 5h16M12 5v14M8 9l4-4 4 4M8 15l4 4 4-4" />
    </svg>
  );
}

function FeatherIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
      <path d="M16 8L2 22" />
      <path d="M17.5 15H9" />
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

function BatteryFeatureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <rect x="2" y="7" width="16" height="10" rx="2" />
      <path d="M22 11v2" />
      <path d="M6 11v2M10 10v4" />
    </svg>
  );
}

function ShieldFeatureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function WheelsFeatureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v6M12 15v6" />
    </svg>
  );
}

function FoldFeatureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <path d="M4 19h16M4 5h16M12 5v14M8 9l4-4 4 4M8 15l4 4 4-4" />
    </svg>
  );
}

function FeatherFeatureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
      <path d="M16 8L2 22" />
    </svg>
  );
}

function SuitcaseFeatureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function SpeedFeatureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <path d="M12 14l3-5" />
      <path d="M3.34 17a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

function HeartFeatureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function CushionFeatureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <rect x="3" y="8" width="18" height="10" rx="3" />
      <path d="M3 13h18" />
    </svg>
  );
}

function SettingsFeatureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function HandFeatureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8" />
      <path d="M18 11a2 2 0 0 1 4 0v5a7 7 0 0 1-7 7h-2a7 7 0 0 1-7-7v-3.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-5 w-5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

/* ─── Product data ───────────────────────────────────────────────────────────── */

const products = [
  {
    name: "Pulse Innovax",
    description:
      "Model 6016A electric wheelchair with innovative design for enhanced comfort.",
    image: "/products/innovax-01.webp",
    price: "₹58,999",
    features: [
      { icon: <SettingsFeatureIcon />, label: "360° Joystick" },
      { icon: <ShieldFeatureIcon />, label: "Shock Absorb" },
      { icon: <FoldFeatureIcon />, label: "Foldable Frame" },
      { icon: <HeartFeatureIcon />, label: "Extra Comfort" },
    ],
  },
  {
    name: "Pulse Joylite 1",
    description:
      "Ultra-lightweight electric wheelchair, foldable frame, extended battery.",
    image: "/products/joylite-1-01.webp",
    price: "₹68,999",
    features: [
      { icon: <FeatherFeatureIcon />, label: "21kg Light" },
      { icon: <FoldFeatureIcon />, label: "Foldable" },
      { icon: <BatteryFeatureIcon />, label: "Long Battery" },
      { icon: <WheelsFeatureIcon />, label: "Dual Motors" },
    ],
  },
  {
    name: "Pulse Joylite 2",
    description:
      "Upgraded battery capacity, improved seat comfort, intuitive joystick.",
    image: "/products/joylite-2-01.webp",
    price: "₹55,999",
    features: [
      { icon: <BatteryFeatureIcon />, label: "Plus Battery" },
      { icon: <CushionFeatureIcon />, label: "Plush Seat" },
      { icon: <SettingsFeatureIcon />, label: "Smart Control" },
      { icon: <ShieldFeatureIcon />, label: "Safe Brakes" },
    ],
  },
  {
    name: "Pulse Aerodrive 1",
    description:
      "Lightweight aluminium frame, dual motors, smart joystick.",
    image: "/products/aerodrive-1-01.webp",
    price: "₹61,999",
    features: [
      { icon: <FeatherFeatureIcon />, label: "Alloy Frame" },
      { icon: <WheelsFeatureIcon />, label: "Dual 250W" },
      { icon: <SettingsFeatureIcon />, label: "Smart Control" },
      { icon: <ShieldFeatureIcon />, label: "Electro Brake" },
    ],
  },
  {
    name: "Pulse Aerodrive 2",
    description:
      "36kg lightweight build, 24V 10Ah battery, 15-20km range.",
    image: "/products/aerodrive-2-01.webp",
    price: "₹64,999",
    features: [
      { icon: <FeatherFeatureIcon />, label: "36kg Light" },
      { icon: <BatteryFeatureIcon />, label: "24V 10Ah" },
      { icon: <SpeedFeatureIcon />, label: "15-20km Range" },
      { icon: <FoldFeatureIcon />, label: "Foldable" },
    ],
  },
  {
    name: "Pulse Cruza",
    description:
      "Electric recline to 160°, one-hand 360° joystick control.",
    image: "/products/cruza-01.webp",
    price: "₹74,999",
    features: [
      { icon: <SettingsFeatureIcon />, label: "160° Recline" },
      { icon: <HandFeatureIcon />, label: "One Hand 360°" },
      { icon: <ShieldFeatureIcon />, label: "Heavy Iron" },
      { icon: <CushionFeatureIcon />, label: "Rest Support" },
    ],
  },
  {
    name: "Pulse Xtrion",
    description:
      "Heavy-duty electric wheelchair for all-terrain mobility.",
    image: "/products/xtrion-01.webp",
    price: "₹57,999",
    features: [
      { icon: <ShieldFeatureIcon />, label: "Heavy Duty" },
      { icon: <WheelsFeatureIcon />, label: "All Terrain" },
      { icon: <SpeedFeatureIcon />, label: "High Torque" },
      { icon: <BatteryFeatureIcon />, label: "Long Range" },
    ],
  },
  {
    name: "Pulse Motion Pro 1",
    description:
      "Heavy-duty foldable, long-range battery, all-terrain control.",
    image: "/products/motion-pro-1-01.webp",
    price: "₹59,999",
    features: [
      { icon: <FoldFeatureIcon />, label: "Heavy Fold" },
      { icon: <BatteryFeatureIcon />, label: "Long Range" },
      { icon: <WheelsFeatureIcon />, label: "All Terrain" },
      { icon: <ShieldFeatureIcon />, label: "Rugged Build" },
    ],
  },
  {
    name: "Pulse Motion Pro 2",
    description:
      "24V 20Ah battery, 15-20km range, 24-inch alloy rear wheel.",
    image: "/products/motion-pro-2-01.webp",
    price: "₹56,999",
    features: [
      { icon: <BatteryFeatureIcon />, label: "24V 20Ah" },
      { icon: <WheelsFeatureIcon />, label: "24\" Rear Wheel" },
      { icon: <SpeedFeatureIcon />, label: "15-20km Range" },
      { icon: <ShieldFeatureIcon />, label: "Alloy Drive" },
    ],
  },
  {
    name: "Pulse Smartride 1",
    description:
      "26kg carbon fiber, autofold, 24V 10Ah battery, 15-20km range.",
    image: "/products/smartride-1-01.webp",
    price: "₹62,999",
    features: [
      { icon: <FeatherFeatureIcon />, label: "Carbon Fiber" },
      { icon: <FoldFeatureIcon />, label: "Autofold" },
      { icon: <BatteryFeatureIcon />, label: "24V 10Ah" },
      { icon: <SpeedFeatureIcon />, label: "15-20km Range" },
    ],
  },
  {
    name: "Pulse Smartride 2",
    description:
      "One-touch fold mechanism, travel-friendly compact design.",
    image: "/products/smartride-2-01.webp",
    price: "₹82,999",
    features: [
      { icon: <FoldFeatureIcon />, label: "One-Touch" },
      { icon: <SuitcaseFeatureIcon />, label: "Compact Travel" },
      { icon: <FeatherFeatureIcon />, label: "Lightweight" },
      { icon: <SettingsFeatureIcon />, label: "Smart Control" },
    ],
  },
];

/* ─── Category data ──────────────────────────────────────────────────────────── */

const categories = [
  { icon: <BoltIcon />, label: "Power Wheelchair" },
  { icon: <WheelIcon />, label: "Manual Wheelchair" },
  { icon: <FeatherIconLarge />, label: "Lightweight Wheelchair" },
  { icon: <SuitcaseIcon />, label: "Travel Wheelchair" },
  { icon: <SpeedometerIcon />, label: "Speed Wheelchair" },
  { icon: <HeartIcon />, label: "Comfortable Wheelchair" },
];

/* ═════════════════════════════════════════════════════════════════════════════ */
/*  Page Component                                                              */
/* ═════════════════════════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-offwhite text-navy">
      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <header className="bg-offwhite text-navy">
        {/* Utility strip */}
        <TrustTicker />

        {/* Main nav */}
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo — image */}
          <a href="/" className="flex items-center">
            <Image
              src="/pulse-logo.png"
              alt="Pulse Mobility & Care"
              width={160}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </a>

          {/* Nav links */}
          <ul className="hidden gap-8 text-sm font-medium md:flex">
            <li><a href="#" className="text-navy hover:text-orange transition-colors">Wheelchairs</a></li>
            <li><a href="#" className="text-navy hover:text-orange transition-colors">Electric</a></li>
            <li><a href="#" className="text-navy hover:text-orange transition-colors">Accessories</a></li>
            <li><a href="#" className="text-navy hover:text-orange transition-colors">About</a></li>
          </ul>

          {/* Right — icon buttons */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              type="button"
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/5 hover:text-orange"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Account */}
            <button
              type="button"
              aria-label="Account"
              className="flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/5 hover:text-orange"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            {/* Cart */}
            <button
              type="button"
              aria-label="Cart"
              className="flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/5 hover:text-orange"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

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
            <div
              key={p.name}
              className="group flex flex-col overflow-hidden rounded-[26px] bg-[#EEF4F8]/80 p-2.5 shadow-sm transition-shadow hover:shadow-md border border-slate-200/60"
            >
              {/* Top Image area with soft gradient */}
              <div className="relative z-10 h-52 sm:h-56 w-full rounded-[20px] bg-gradient-to-b from-[#E2EDF7] via-[#EEF5FC] to-[#F8FBFE] flex items-center justify-center p-3 pb-6">
                {/* Chevron buttons */}
                <button
                  type="button"
                  aria-label="Previous image"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-zinc-700 shadow-sm transition-transform hover:scale-105 active:scale-95 [&>svg]:h-3.5 [&>svg]:w-3.5 z-20"
                >
                  <ChevronLeftIcon />
                </button>

                <div className="relative h-full w-full flex items-center justify-center">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-contain p-1 scale-105 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <button
                  type="button"
                  aria-label="Next image"
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
                  <h3 className="font-serif text-lg sm:text-xl font-semibold leading-tight text-navy mb-2">
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
                          {f.icon}
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
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-orange/10 text-orange transition-colors hover:bg-orange/20 [&>svg]:h-4 [&>svg]:w-4"
                      >
                        <PhoneIcon />
                      </button>
                      <button
                        type="button"
                        aria-label="Add to cart"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-orange/10 text-orange transition-colors hover:bg-orange/20 [&>svg]:h-4 [&>svg]:w-4"
                      >
                        <CartIcon />
                      </button>
                    </div>
                  </div>

                  {/* Buy Now Button */}
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-orange py-2.5 px-4 text-xs sm:text-sm font-bold text-white shadow-md shadow-orange/20 transition-colors hover:bg-orange-hover [&>svg]:h-4 [&>svg]:w-4"
                  >
                    <span>Buy Now</span>
                    <ArrowRightIcon />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Promo panels ────────────────────────────────────────────────────── */}
      <section className="mx-auto mt-20 grid w-full max-w-7xl gap-6 px-6 md:grid-cols-2">
        {/* Panel 1 — Quiz / Finder */}
        <div className="flex flex-col justify-between rounded-2xl bg-navy p-10 text-white">
          <div>
            <h3 className="text-2xl font-bold leading-snug">
              Find the right wheelchair<br />for your needs
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
              Answer a few quick questions and we&apos;ll recommend the best match based on
              lifestyle, terrain, and medical requirements.
            </p>
          </div>
          <a
            href="#"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-orange-hover"
          >
            Take the quiz
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Panel 2 — Care team */}
        <div className="flex flex-col justify-between rounded-2xl border border-navy/10 bg-white p-10">
          <div>
            <h3 className="text-2xl font-bold leading-snug text-navy">
              Talk to our care team<br />before you order
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-warm-gray">
              Not sure which model fits best? Our trained mobility specialists will
              help you choose — free of charge, no pressure.
            </p>
          </div>
          <a
            href="#"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border-2 border-navy bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-wide text-navy transition-colors hover:bg-navy hover:text-white"
          >
            Schedule a call
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── Trust badges row ────────────────────────────────────────────────── */}
      <section className="mx-auto mt-20 w-full max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-6 rounded-2xl bg-white p-8 shadow-sm lg:grid-cols-4">
          {[
            { icon: <DeliveryIcon />, title: "Free delivery", desc: "On all orders above ₹5,000" },
            { icon: <EmiIcon />, title: "Easy EMI", desc: "0% interest available" },
            { icon: <CertifiedIcon />, title: "ISO certified", desc: "Medical-grade quality" },
            { icon: <TrialIcon />, title: "7-day trial", desc: "Easy returns, no questions" },
          ].map((b) => (
            <div key={b.title} className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-offwhite text-orange">
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

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="mt-12 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Brand + newsletter */}
            <div className="lg:col-span-2">
              <a href="/" className="flex flex-col items-start leading-none gap-1">
                <Image
                  src="/pulse-logo-white.png"
                  alt="Pulse Mobility & Care"
                  width={160}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
                <span className="text-[0.55rem] font-medium uppercase tracking-[0.25em] text-white/50">
                  Mobility &amp; Care
                </span>
              </a>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
                Mobility solutions engineered for everyday independence. Certified,
                lightweight, and foldable — because freedom should never weigh you down.
              </p>

              {/* Newsletter */}
              <div className="mt-5">
                <p className="text-sm font-semibold">Join our newsletter</p>
                <p className="mt-0.5 text-xs text-white/50">
                  Tips, new arrivals, and exclusive deals — straight to your inbox.
                </p>
                <form className="mt-3 flex max-w-md gap-2">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="h-10 flex-1 rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/30 focus:border-orange focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="h-10 rounded-full bg-orange px-5 text-sm font-bold text-white transition-colors hover:bg-orange-hover"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Links col 1: Company */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white/80">Company</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-orange transition-colors">About us</a></li>
                <li><a href="#" className="hover:text-orange transition-colors">Warranty policy</a></li>
                <li><a href="#" className="hover:text-orange transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-orange transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Links col 2: Support */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white/80">Support</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-orange transition-colors">Track your order</a></li>
                <li><a href="#" className="hover:text-orange transition-colors">Returns &amp; service</a></li>
                <li><a href="#" className="hover:text-orange transition-colors">Size &amp; fit guide</a></li>
                <li><a href="#" className="hover:text-orange transition-colors">FAQs</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col items-center justify-between border-t border-white/10 pt-5 text-xs text-white/40 sm:flex-row">
            <p>&copy; {new Date().getFullYear()} Pulse Wheelchairs. All rights reserved.</p>
            <div className="mt-3 flex gap-5 sm:mt-0">
              <a href="#" className="hover:text-orange transition-colors">Facebook</a>
              <a href="#" className="hover:text-orange transition-colors">Instagram</a>
              <a href="#" className="hover:text-orange transition-colors">YouTube</a>
              <a href="#" className="hover:text-orange transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
