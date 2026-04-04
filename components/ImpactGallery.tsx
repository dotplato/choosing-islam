"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Plus } from "lucide-react";

const GALLERY_IMAGES = [
  "/impact/i1.jpeg",
  "/impact/i2.jpeg",
  "/impact/i3.jpeg",
  "/impact/i4.jpeg",
  "/impact/i5.jpeg",
  "/impact/i6.jpeg",
  "/impact/i7.jpeg",
  "/impact/i8.jpeg",
  "/impact/i9.jpeg",
];

// How many images to show in the grid (the rest are only in the lightbox)
const GRID_VISIBLE = 9;

export default function ImpactGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  }, []);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % GALLERY_IMAGES.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, prev, next]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  const isLastVisible = (index: number) => index === GRID_VISIBLE - 1;

  return (
    <>
      {/* ─── 3×3 Grid ─────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {GALLERY_IMAGES.slice(0, GRID_VISIBLE).map((src, i) => (
          <Button
            key={i}
            variant="ghost"
            onClick={() => openLightbox(i)}
            className="aspect-square rounded-2xl overflow-hidden shadow-2xl group relative focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60 p-0 h-auto"
            aria-label={`Open gallery image ${i + 1}`}
          >
            <Image
              src={src}
              alt={`Gallery image ${i + 1}`}
              fill
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            {/* Default teal overlay */}
            <div className="absolute inset-0 bg-teal-900/20 group-hover:bg-transparent transition-colors duration-300" />

            {/* "+" overlay on the last tile */}
            {isLastVisible(i) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/55 backdrop-blur-[2px] transition-colors duration-300 group-hover:bg-black/65">
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-white text-sm font-semibold tracking-wide drop-shadow">
                  View Gallery
                </span>
              </div>
            )}
          </Button>
        ))}
      </div>

      {/* ─── Lightbox ─────────────────────────────────────── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
            aria-label="Close gallery"
          >
            <X className="w-5 h-5 text-white" />
          </Button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm">
            {activeIndex + 1} / {GALLERY_IMAGES.length}
          </div>

          {/* Prev arrow */}
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 sm:left-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </Button>

          {/* Main image */}
          <div
            className="relative max-w-5xl w-full mx-16 px-4 aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={activeIndex}
              src={GALLERY_IMAGES[activeIndex]}
              alt={`Gallery image ${activeIndex + 1}`}
              fill
              className="w-full h-full object-contain rounded-2xl shadow-2xl animate-fadeIn"
              priority
            />
          </div>

          {/* Next arrow */}
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 sm:right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </Button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto">
            {GALLERY_IMAGES.map((src, i) => (
              <Button
                key={i}
                variant="ghost"
                onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 p-0 h-auto ${
                  i === activeIndex
                    ? "border-teal-400 scale-110 shadow-lg"
                    : "border-white/20 opacity-60 hover:opacity-100"
                }`}
                aria-label={`Go to image ${i + 1}`}
              >
                <Image src={src} alt="" fill className="w-full h-full object-cover" />
              </Button>
            ))}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
