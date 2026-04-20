"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSlide {
  tagline: string;
  title: string;
  description: string;
  image: string;
  floatingImage: string;
  floatingImagePosition?: "top-right" | "bottom-right";
  stats: {
    number: string;
    label: string;
    avatars: string[];
  };
}

const slides: HeroSlide[] = [
  {
    tagline: "",
    title: "Islamic Dawah Center of Belize – A Legacy of Faith and Education",
    description: " From its beginnings in 1972, standing as a center of faith dedicated to spreading authentic Islam across Belize.",
    image: "/impact/i7.jpeg",
    floatingImage: "/impact/i6.jpeg",
    floatingImagePosition: "bottom-right",
    stats: {
      number: "50+",
      label: "Islamic Resources",
      avatars: [
        "https://images.pexels.com/photos/1001897/pexels-photo-1001897.jpeg?auto=compress&cs=tinysrgb&w=100",
        "https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&w=100",
      ]
    }
  },
  {
    tagline: "",
    title: "Islamic Dawah Center of Belize – A Legacy of Dawah",
    description: "Alone, I can do a little — but together, we can build a brighter future and make a lasting difference.",
    image: "/hero/h1.jpeg",
    floatingImage: "/impact/i4.jpeg",
    stats: {
      number: "120+",
      label: "Happy Volunteer",
      avatars: [
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
      ]
    }
  },
  
  {
    tagline: "",
    title: "Hope and Reform Behind Bars",
    description: "Through our dedicated prison outreach program, we have helped over 500 individuals find peace and a path toward a better future.",
    image: "/donateGallery/imp1.jpeg", // Replace with your image
    floatingImage: "/impact/i4.jpeg", // Replace with your image
    stats: {
      number: "500+",
      label: "Rehabilitated",
      avatars: [
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
      ]
    }
  },
  {
    tagline: "",
    title: "Illuminating Minds through Education",
    description: "Spreading authentic knowledge across Belize with over 960,000 books distributed and countless resources for spiritual growth.",
    image: "/values/edu.jpeg", // Replace with your image
    floatingImage: "/hero/edu2.jpeg", // Replace with your image
    stats: {
      number: "960k+",
      label: "Books Distributed",
      avatars: [
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
      ]
    }
  }
];

export default function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 6000);
    return () => clearInterval(intervalId);
  }, [api]);

  return (
    <section className="relative w-full min-h-[100dvh] lg:h-[100dvh] bg-[#033f39] overflow-hidden flex flex-col">
      {/* Background Image (Lower Opacity) - Fixed behind everything */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src={slides[1].image}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <Carousel
        setApi={setApi}
        className="flex-grow z-10"
        opts={{
          loop: true,
          align: "start",
          skipSnaps: true,
        }}
      >
        <CarouselContent className="-ml-0 h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0 h-full w-full basis-full">
              <div className="relative w-full h-full flex items-center py-8 lg:py-0">
                {/* Background Gradient - Responsive direction */}
                <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#033f39] via-[#033f39]/95 lg:via-[#033f39]/90 to-[#033f39]/80 lg:to-transparent z-10" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 flex flex-col lg:grid lg:grid-cols-2 gap-2 lg:gap-8 items-center pt-20 lg:pt-32">
                  {/* 1. Heading (Mobile: 1st, Desktop: 1st) */}
                  <div className={cn(
                    "order-1 lg:col-start-1 lg:row-start-1 transition-all duration-1000 text-center lg:text-left w-full",
                    current === index ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                  )}>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                      {slide.title}
                    </h1>
                  </div>

                  {/* 2. Paragraph (Mobile: 2nd, Desktop: 2nd) */}
                  <div className={cn(
                    "order-2 lg:col-start-1 lg:row-start-2 transition-all duration-1000 text-center lg:text-left mt-1 lg:mt-0 w-full",
                    current === index ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                  )}>
                    <p className="text-gray-300 lg:text-gray-400 text-xs sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed line-clamp-2 lg:line-clamp-none">
                      {slide.description}
                    </p>
                  </div>

                  {/* 3. Right Content - Circle Images & Metric Card (Mobile: 3rd, Desktop: Right column) */}
                  <div className={cn(
                    "relative flex justify-center lg:justify-end transition-all duration-1000 mt-4 lg:mt-0 scale-[0.95] xs:scale-100 sm:scale-110 lg:scale-100 order-3 lg:col-start-2 lg:row-start-1 lg:row-span-3",
                    current === index ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                  )}>
                    <div className="relative w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[420px] lg:h-[420px]">
                      {/* Main Circle Image */}
                      <div className="absolute inset-0 rounded-full overflow-hidden border-[4px] sm:border-[8px] lg:border-[12px] border-white/5 shadow-2xl">
                        <Image
                          src={slide.image}
                          alt="Impact"
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                      </div>
                      
                      {/* Floating Circle Image */}
                      <div className={cn(
                        "absolute w-16 h-16 sm:w-28 sm:h-28 lg:w-44 lg:h-44 rounded-full overflow-hidden border-[3px] sm:border-[6px] lg:border-[8px] border-[#033f39] shadow-2xl z-30",
                        slide.floatingImagePosition === "bottom-right" 
                          ? "-bottom-1 -right-1 sm:-bottom-4 sm:-right-4" 
                          : "-top-1 -right-1 sm:-top-4 sm:-right-4"
                      )}>
                        <Image
                          src={slide.floatingImage}
                          alt="Secondary"
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Metric Card */}
                      <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-white p-3 sm:p-5 rounded-xl sm:rounded-3xl shadow-2xl z-40 w-40 sm:w-56 animate-bounce-slow">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4 text-left">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 fill-red-500" />
                          </div>
                          <div>
                            <div className="text-base sm:text-xl font-bold text-gray-900 leading-none">{slide.stats.number}</div>
                            <div className="text-[9px] sm:text-xs text-gray-500 font-medium">{slide.stats.label}</div>
                          </div>
                        </div>
                        <div className="flex -space-x-2 sm:-space-x-3">
                          {slide.stats.avatars.map((avatar, i) => (
                            <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white overflow-hidden">
                              <Image src={avatar} alt="Avatar" width={32} height={32} />
                            </div>
                          ))}
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] sm:text-[10px] font-bold text-gray-600">
                            +
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4. Left Content - CTA (Mobile: 4th, Desktop: Bottom of Left column) */}
                  <div className={cn(
                    "order-4 lg:col-start-1 lg:row-start-3 transition-all duration-1000 text-center lg:text-left mt-1 lg:mt-0 w-full",
                    current === index ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                  )}>
                    {/* Donation Request Style CTA */}
                    <div className="flex items-center justify-center lg:justify-start gap-2">
                      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-xl bg-white/5 p-2 sm:p-4 rounded-xl border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-all gap-2">
                        <div className="flex items-center gap-2 text-left w-full sm:w-auto">
                          <div className="shrink-0 w-8 h-8 sm:w-12 sm:h-12 bg-yellow-500 rounded-lg flex items-center justify-center relative overflow-hidden">
                            <Play className="w-3 h-3 sm:w-5 sm:h-5 text-[#1a1f2e] fill-current z-10" />
                            <div className="absolute inset-0 bg-white/20 animate-pulse" />
                          </div>
                          <div>
                            <h3 className="text-white font-bold text-[10px] sm:text-base leading-tight">Donate to Cause</h3>
                            <p className="text-gray-500 text-[8px] sm:text-xs">Give them a chance. Believe in The Better Future.</p>
                          </div>
                        </div>
                        <Link href="/donate" className="w-full sm:w-auto">
                          <Button size="sm" className="w-full h-8 sm:h-10 bg-teal-600 hover:bg-teal-700 text-white rounded-full px-4 whitespace-nowrap text-[10px] sm:text-sm">
                            Donate Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              current === i ? "w-8 bg-teal-500" : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
