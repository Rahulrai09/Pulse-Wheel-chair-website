"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import FeatureIcon from "@/app/components/FeatureIcon";
import { getProductBySlug, products } from "@/lib/products";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // Client state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specifications">("description");
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Thumbnails placeholder array (4 slots)
  const thumbnails = [product.image, product.image, product.image, product.image];

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? thumbnails.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === thumbnails.length - 1 ? 0 : prev + 1));
  };

  const handleQuantityDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleQuantityIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-offwhite text-navy">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center text-xs text-zinc-500 gap-2">
          <Link href="/" className="hover:text-orange transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/" className="hover:text-orange transition-colors">
            Wheelchairs
          </Link>
          <span>/</span>
          <span className="font-semibold text-navy truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Product Hero Section */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
          {/* Left Column: Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image Container */}
            <div className="relative h-80 sm:h-96 w-full rounded-[32px] bg-gradient-to-b from-[#E2EDF7] via-[#EEF5FC] to-[#F8FBFE] flex items-center justify-center p-6 border border-slate-200/60 overflow-hidden shadow-sm">
              {/* Chevron Prev */}
              <button
                type="button"
                onClick={handlePrevImage}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-700 shadow-md transition-transform hover:scale-105 active:scale-95"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Image */}
              <div className="relative h-full w-full">
                <Image
                  src={thumbnails[activeImageIndex]}
                  alt={product.alt}
                  fill
                  priority
                  className="object-contain p-2 transition-opacity duration-300"
                />
              </div>

              {/* Chevron Next */}
              <button
                type="button"
                onClick={handleNextImage}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-700 shadow-md transition-transform hover:scale-105 active:scale-95"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Thumbnail Row */}
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              {thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-20 w-20 rounded-2xl bg-gradient-to-b from-[#E2EDF7] to-[#F8FBFE] p-2 border transition-all overflow-hidden ${
                    activeImageIndex === idx
                      ? "border-orange ring-2 ring-orange/30 shadow-md"
                      : "border-slate-200/80 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={thumb}
                    alt={`${product.name} view ${idx + 1}`}
                    fill
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Details & CTA */}
          <div className="flex flex-col">
            {/* Category tag */}
            <span className="text-xs font-bold tracking-widest text-orange uppercase mb-2">
              {product.category || "ELECTRIC WHEELCHAIR"}
            </span>

            {/* Product Title */}
            <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-navy mb-3">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-6 flex items-baseline gap-3">
              <span className="font-sans text-3xl sm:text-4xl font-extrabold text-navy">
                {product.price}
              </span>
              <span className="text-xs text-zinc-500 font-medium">
                Inclusive of all taxes
              </span>
            </div>

            {/* Short Description */}
            <p className="text-sm text-zinc-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* 4 Feature Badges Grid */}
            <div className="mb-8 grid grid-cols-4 gap-3 rounded-2xl bg-white p-4 shadow-sm border border-slate-200/60">
              {product.features.map((f, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="mb-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-orange/10 text-orange">
                    <FeatureIcon iconKey={f.iconKey} />
                  </div>
                  <span className="text-xs font-medium text-zinc-700 leading-tight">
                    {f.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Quantity & Wishlist Row */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center rounded-full border border-slate-300 bg-white p-1 shadow-sm">
                <button
                  type="button"
                  onClick={handleQuantityDecrease}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-navy hover:bg-zinc-100 transition-colors font-bold text-lg"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-navy text-sm">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleQuantityIncrease}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-navy hover:bg-zinc-100 transition-colors font-bold text-lg"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Wishlist Heart Button */}
              <button
                type="button"
                onClick={() => setIsWishlisted(!isWishlisted)}
                aria-label="Add to wishlist"
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
                  isWishlisted
                    ? "border-orange bg-orange/10 text-orange"
                    : "border-slate-300 bg-white text-zinc-600 hover:border-orange hover:text-orange"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill={isWishlisted ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth={1.8}
                  className="h-5 w-5"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* CTA Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                className="flex-1 rounded-full border-2 border-orange bg-orange/10 py-3.5 px-6 font-bold text-orange shadow-sm transition-colors hover:bg-orange/20 text-center"
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="flex-1 rounded-full bg-orange py-3.5 px-8 font-bold text-white shadow-md shadow-orange/20 transition-colors hover:bg-orange-hover text-center"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section: Description & Specifications */}
        <div className="mt-16 rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-slate-200/60">
          {/* Tab buttons */}
          <div className="flex border-b border-slate-200 mb-6 gap-8">
            <button
              type="button"
              onClick={() => setActiveTab("description")}
              className={`pb-3 text-base sm:text-lg font-bold transition-all relative ${
                activeTab === "description"
                  ? "text-navy"
                  : "text-zinc-400 hover:text-navy"
              }`}
            >
              Description
              {activeTab === "description" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange rounded-full" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("specifications")}
              className={`pb-3 text-base sm:text-lg font-bold transition-all relative ${
                activeTab === "specifications"
                  ? "text-navy"
                  : "text-zinc-400 hover:text-navy"
              }`}
            >
              Specifications
              {activeTab === "specifications" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange rounded-full" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "description" ? (
            <div className="space-y-4 text-sm sm:text-base text-zinc-600 leading-relaxed">
              <p>
                The <strong className="text-navy">{product.name}</strong> represents the pinnacle of modern mobility engineering, designed to deliver exceptional freedom, safety, and comfort for everyday use.
              </p>
              <p>
                {product.description} Built with precision craftsmanship and certified safety standards, it combines smooth maneuvering, ergonomic seating, and intuitive controls for indoor and outdoor environments.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-600 mt-2">
                <li>Certified medical-grade durability and safety features.</li>
                <li>Compact foldable frame for effortless car boot storage and travel.</li>
                <li>Responsive controls engineered for total user confidence.</li>
              </ul>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-zinc-700 border-collapse">
                <tbody>
                  {product.specifications ? (
                    Object.entries(product.specifications).map(([key, val], idx) => (
                      <tr
                        key={key}
                        className={idx % 2 === 0 ? "bg-slate-50/70" : "bg-white"}
                      >
                        <td className="py-3 px-4 font-semibold text-navy w-1/3 border-b border-slate-100">
                          {key}
                        </td>
                        <td className="py-3 px-4 text-zinc-600 border-b border-slate-100">
                          {val}
                        </td>
                      </tr>
                    ))
                  ) : (
                    product.features.map((f, idx) => (
                      <tr
                        key={f.label}
                        className={idx % 2 === 0 ? "bg-slate-50/70" : "bg-white"}
                      >
                        <td className="py-3 px-4 font-semibold text-navy w-1/3 border-b border-slate-100">
                          Feature {idx + 1}
                        </td>
                        <td className="py-3 px-4 text-zinc-600 border-b border-slate-100">
                          {f.label}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
