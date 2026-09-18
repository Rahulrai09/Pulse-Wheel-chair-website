"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDES = [
  { src: "/hero-banner.webp", alt: "Pulse Electric Reclining Wheelchair" },
  { src: "/hero-banner-2.webp", alt: "Pulse Premium Dual Motors Electric Wheelchair" },
];

const INTERVAL_MS = 6000;
const FADE_MS = 1000;

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  // Bumped on every rotation so the active slide's zoom animation restarts
  // from scratch each time, instead of only playing once.
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
      setCycle((c) => c + 1);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden" style={{ aspectRatio: "1800/720" }}>
      {SLIDES.map((slide, idx) => {
        const isActive = idx === activeIndex;
        return (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity ease-in-out"
            style={{
              opacity: isActive ? 1 : 0,
              transitionDuration: `${FADE_MS}ms`,
              zIndex: isActive ? 1 : 0,
            }}
          >
            {/* Remounting this wrapper (via the cycle-based key) restarts the
                slow zoom animation fresh every time the slide becomes active. */}
            <div
              key={isActive ? `${idx}-${cycle}` : idx}
              className="absolute inset-0"
              style={isActive ? { animation: `hero-kenburns ${INTERVAL_MS + FADE_MS}ms ease-out forwards` } : undefined}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        );
      })}

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => {
              setActiveIndex(idx);
              setCycle((c) => c + 1);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === activeIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
