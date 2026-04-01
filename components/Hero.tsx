import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroCarousel from "@/components/HeroCarousel";

export default function Hero() {
  return (
    <section className="relative text-white py-20 lg:py-32 overflow-hidden flex items-center justify-center min-h-[80vh]">
      <HeroCarousel />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
            Islamic Mission Belize – A Legacy of Dawah
          </h1>
          <p className="text-xl sm:text-2xl mb-10 text-teal-50 leading-relaxed max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000">
            From its beginnings in 1972 to becoming a fully grounded Sunni community, the Islamic Mission Belize stands as a center of faith, education, and outreach dedicated to spreading authentic Islam across Belize.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            
            <Link href="/donate">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                   <Heart className="mr-2 w-6 h-6 fill-white" />
                Donate Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
