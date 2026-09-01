import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 bg-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand + newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex flex-col items-start leading-none gap-1">
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
            </Link>
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
  );
}
