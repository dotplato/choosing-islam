"use client";

import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  MapPin,
  Heart,
  ShieldCheck,
  FileText,
  MessageCircle,
} from "lucide-react";

const STATS = [
  { icon: BookOpen, value: 1000, label: "Quran Distribution" },
  { icon: MapPin, value: 100, label: "Mosque Tours" },
  { icon: ShieldCheck, value: 500, label: "Rehabilitated Prisoners" },
  { icon: Heart, value: 100, label: "Community Support" },
  { icon: FileText, value: 960000, label: "Books Distributed" },
  { icon: MessageCircle, value: 3454, label: "Live Chat Sessions" },
 

];

// Format numbers with commas
function formatNumber(num: number): string {
  return num.toLocaleString();
}

// Scroll-triggered CountUp
function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * end);

      setCount(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration]);

  return (
    <div
      ref={ref}
      className="text-4xl md:text-5xl font-bold text-teal-600 tabular-nums"
    >
      {formatNumber(count)}+
    </div>
  );
}

export function ImpactStats() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-teal-50/30 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Our Impact by the Numbers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Together, we&apos;re making a real difference in spreading knowledge
            and building community
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-teal-100 rounded-full">
                    <Icon className="w-8 h-8 text-teal-600" />
                  </div>
                  <CountUp end={stat.value} />
                  <p className="text-gray-600 font-medium text-lg">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
