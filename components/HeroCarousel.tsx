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

const slides = [
  {
    tagline: "",
    title: "Islamic Mission Belize – A Legacy of Dawah",
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
    title: "Islamic Mission Belize – A Legacy of Faith and Education",
    description: " From its beginnings in 1972, standing as a center of faith dedicated to spreading authentic Islam across Belize.",
    image: "/belize3.jpg",
    floatingImage: "/impact/i1.jpeg",
    stats: {
      number: "50+",
      label: "Islamic Resources",
      avatars: [
        "https://images.pexels.com/photos/1001897/pexels-photo-1001897.jpeg?auto=compress&cs=tinysrgb&w=100",
        "https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&w=100",
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
    <section className="relative w-full h-screen bg-[#033f39] overflow-hidden">
      <Carousel
        setApi={setApi}
        className="w-full h-full"
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent className="-ml-0 h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0 h-full w-full basis-full">
              <div className="relative w-full h-full flex items-center">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#033f39] via-[#033f39]/90 to-transparent z-10" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-24 lg:pt-20">
                  {/* Left Content */}
                  <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
                    
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                      {slide.title.split('at a time').map((part, i) => (
                        <React.Fragment key={i}>
                          {part}
                          {i === 0 && <span className="text-white/90"></span>}
                        </React.Fragment>
                      ))}
                    </h1>
                    <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
                      {slide.description}
                    </p>
                    
                    {/* Donation Request Style CTA */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center justify-between w-full max-w-xl bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center relative overflow-hidden">
                            <Play className="w-5 h-5 text-[#1a1f2e] fill-current z-10" />
                            <div className="absolute inset-0 bg-white/20 animate-pulse" />
                          </div>
                          <div>
                            <h3 className="text-white font-bold">Donate to Cause</h3>
                            <p className="text-gray-500 text-xs">Give them a chance. Believe in The Better Future of Others.</p>
                          </div>
                        </div>
                        <Link href="/donate">
                          <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6 whitespace-nowrap">
                            Donate Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Right Content - Circle Images & Metric Card */}
                  <div className="relative flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-8 duration-1000">
                    <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px]">
                      {/* Main Circle Image */}
                      <div className="absolute inset-0 rounded-full overflow-hidden border-[8px] lg:border-[12px] border-white/5 shadow-2xl">
                        <Image
                          src={slide.image}
                          alt="Impact"
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      {/* Floating Circle Image */}
                      <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden border-[6px] lg:border-[8px] border-[#033f39] shadow-2xl z-30">
                        <Image
                          src={slide.floatingImage}
                          alt="Secondary"
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Metric Card */}
                      <div className="absolute -bottom-4 -left-4 sm:left-0 bg-white p-5 rounded-3xl shadow-2xl z-40 w-56 animate-bounce-slow">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                          </div>
                          <div>
                            <div className="text-xl font-bold text-gray-900">{slide.stats.number}</div>
                            <div className="text-xs text-gray-500 font-medium">{slide.stats.label}</div>
                          </div>
                        </div>
                        <div className="flex -space-x-3">
                          {slide.stats.avatars.map((avatar, i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                              <Image src={avatar} alt="Avatar" width={32} height={32} />
                            </div>
                          ))}
                          <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">
                            +
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Background Image (Lower Opacity) */}
                <div className="absolute inset-0 -z-10 opacity-20">
                  <Image
                    src={slide.image}
                    alt="Background"
                    fill
                    className="object-cover"
                  />
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
