"use client";

import { useEffect, useState } from "react";

const phrases = [
  "Explore Pulse advance wheelchairs",
  "Best Seller",
  "Lowest Price",
];

export default function TrustTicker() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setFade(true);
      }, 300);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mx-auto mt-16 w-full max-w-7xl px-6">
      <div className="flex min-h-16 items-center justify-center rounded-2xl bg-navy px-6 py-4 text-center text-white shadow-sm">
        <span
          className={`text-base font-medium tracking-wide transition-opacity duration-300 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {phrases[index]}
        </span>
      </div>
    </section>
  );
}
