"use client";

import { useEffect, useState } from "react";

const phrases = [
  "Explore Pulse advance wheelchairs",
  "Best Seller",
  "Lowest Price",
];

export default function TopUtilityTicker() {
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
    <div className="bg-navy text-white text-xs py-1.5 px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-center text-center">
        <span
          className={`font-medium tracking-wide transition-opacity duration-300 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {phrases[index]}
        </span>
      </div>
    </div>
  );
}
