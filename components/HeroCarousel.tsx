"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";


const heroImages = [
  "/M-A.jpg",
  "/belize3.jpg",
  "/b9.jpg",

];

export default function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [api]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Carousel
        setApi={setApi}
        className="w-full h-full"
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent className="-ml-0 h-full">
          {heroImages.map((src, index) => (
            <CarouselItem key={index} className="pl-0 h-full w-full basis-full">
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={`Islamic Dawah Center Hero ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  unoptimized={src.startsWith("http")} // Disable optimization for external URLs
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
