import Image from "next/image";
import Link from "next/link";
import TrustTicker from "./TrustTicker";

export default function Header() {
  return (
    <header className="bg-offwhite text-navy border-b border-slate-200/80">
      {/* Utility strip */}
      <TrustTicker />

      {/* Main nav */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo — image */}
        <Link href="/" className="flex items-center">
          <Image
            src="/pulse-logo.png"
            alt="Pulse Mobility & Care"
            width={160}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Nav links */}
        <ul className="hidden gap-8 text-sm font-medium md:flex">
          <li>
            <Link href="/" className="text-navy hover:text-orange transition-colors">
              Wheelchairs
            </Link>
          </li>
          <li>
            <Link href="/" className="text-navy hover:text-orange transition-colors">
              Electric
            </Link>
          </li>
          <li>
            <Link href="/" className="text-navy hover:text-orange transition-colors">
              Accessories
            </Link>
          </li>
          <li>
            <Link href="/" className="text-navy hover:text-orange transition-colors">
              About
            </Link>
          </li>
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
  );
}
