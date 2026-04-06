"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Plus } from "lucide-react";

interface ImpactGalleryProps {
  images?: string[];
}

export default function ImpactGallery({ images = [] }: ImpactGalleryProps) {
  // Use provided images or fallback to local defaults if none provided
  const displayImages = images.length > 0 ? images : [
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

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // How many images to show in the grid (the rest are only in the lightbox)
  const GRID_VISIBLE = Math.min(9, displayImages.length);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + displayImages.length) % displayImages.length);
  }, [displayImages.length]);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % displayImages.length);
  }, [displayImages.length]);

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
        {displayImages.slice(0, GRID_VISIBLE).map((src, i) => (
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
                  {displayImages.length > GRID_VISIBLE
                    ? `View ${displayImages.length - GRID_VISIBLE + 1}+ More`
                    : "View Gallery"}
                </span>
              </div>
            )}
          </Button>
        ))}
      </div>

      {/* ─── Lightbox ─────────────────────────────────────── */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300">
          <Button
            variant="ghost"
            size="icon"
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white hover:bg-white/10 z-[1000] rounded-full"
          >
            <X className="w-8 h-8" />
          </Button>

          {/* Nav Buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prev}
            className="absolute left-4 md:left-8 text-white/50 hover:text-white hover:bg-white/5 z-[1000] rounded-full p-2 h-auto w-auto"
          >
            <ChevronLeft className="w-10 h-10 md:w-12 md:h-12" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={next}
            className="absolute right-4 md:right-8 text-white/50 hover:text-white hover:bg-white/5 z-[1000] rounded-full p-2 h-auto w-auto"
          >
            <ChevronRight className="w-10 h-10 md:w-12 md:h-12" />
          </Button>

          {/* Main Image Container */}
          <div className="relative w-full h-full max-w-6xl max-h-[85vh] mx-4 flex items-center justify-center select-none">
            <div className="relative w-full h-full">
              <Image
                src={displayImages[activeIndex]}
                alt={`Gallery detail ${activeIndex + 1}`}
                fill
                className="object-contain pointer-events-none"
                quality={100}
                priority
              />
            </div>

            {/* Counter */}
            <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-white/60 font-medium">
              {activeIndex + 1} / {displayImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
