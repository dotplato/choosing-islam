"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const GALLERY_IMAGES = [
  {
    src: "/donateGallery/imp1.jpeg",
    alt: "Reflective person",
    title: "",
    gridClass: "col-span-1 row-span-1",
  },
  {
    src: "/donateGallery/imp7.jpeg",
    alt: "Interview",
    title: "",
    gridClass: "col-span-1 row-span-1",
  },
  {
    src: "/donateGallery/imp3.jpeg",
    alt: "Interview",
    title: "",
    gridClass: "col-span-1 row-span-1",
  },
  {
    src: "/donateGallery/imp4.jpeg",
    alt: "Dawah Booth",
    title: "",
    gridClass: "col-span-1 row-span-2",
  },
  {
    src: "/donateGallery/imp5.jpeg",
    alt: "Mosque",
    title: "",
    gridClass: "col-span-1 row-span-1",
  },
  {
    src: "/donateGallery/imp6.jpeg",
    alt: "Mosque",
    title: "",
    gridClass: "col-span-1 row-span-1",
  },
  {
    src: "/donateGallery/imp2.jpeg",
    alt: "Volunteers",
    title: "",
    gridClass: "col-span-2 row-span-1",
  },
  
];

interface DonateGalleryProps {
  images?: string[];
}

export function DonateGallery({ images = [] }: DonateGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Use provided images or fallback to local defaults if none provided
  const displayImages = images.length > 0 ? images.map((src, i) => ({
    src,
    alt: `Impact image ${i + 1}`,
    title: "",
    gridClass: (i === 8 && images.length === 9) 
      ? "col-span-2 row-span-1" 
      : i % 7 === 3 ? "col-span-1 row-span-2" : i % 7 === 6 ? "col-span-2 row-span-1" : "col-span-1 row-span-1"
  })) : GALLERY_IMAGES;

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);

  const showNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % displayImages.length);
  }, [displayImages.length]);

  const showPrev = useCallback(() => {
    setSelectedIndex(
      (prev) => (prev - 1 + displayImages.length) % displayImages.length
    );
  }, [displayImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, showNext, showPrev]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-4 px-4">
             <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                 Our Impact in Action 
                 </h2> 
                 <div className="w-24 h-1 bg-teal-600 mx-auto rounded-full" /> 
                 <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed "> 
                    See how your contributions are making a difference in the community 
                    and helping people find their path. 
                    </p> 
                    </div>
      {/* Masonry Grid Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-0 auto-rows-[200px] mt-8">
        {displayImages.map((img, index) => (
          <div
            key={index}
            className={`relative overflow-hidden cursor-pointer group ${img.gridClass}`}
            onClick={() => openLightbox(index)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-sm font-semibold drop-shadow-lg">
                {img.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
          onClick={closeLightbox}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 text-white hover:bg-white/10 rounded-full transition-colors z-10 h-auto w-auto hover:text-white"
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-2 md:left-6 p-3 md:p-4 text-white hover:bg-white/10 rounded-full transition-colors h-auto w-auto hover:text-white"
          >
            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-2 md:right-6 p-3 md:p-4 text-white hover:bg-white/10 rounded-full transition-colors h-auto w-auto hover:text-white"
          >
            <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
          </Button>

          <div
            className="relative w-full h-full max-w-6xl max-h-[85vh] mx-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={displayImages[selectedIndex].src}
                alt={displayImages[selectedIndex].alt}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="absolute bottom-0 md:bottom-4 left-0 right-0 text-center text-white bg-black/50 md:bg-transparent py-3 md:py-0 space-y-1">
              <h3 className="text-lg md:text-2xl font-bold">
                {displayImages[selectedIndex].title}
              </h3>
              <p className="text-xs md:text-sm opacity-70">
                Image {selectedIndex + 1} of {displayImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
