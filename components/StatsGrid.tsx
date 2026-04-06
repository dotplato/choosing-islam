"use client";

import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Users,
  MapPin,
  Heart,
  ShieldCheck,
  FileText,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STATS = [
  { icon: BookOpen, value: 1000, label: "Quran Distribution" },
  { icon: MapPin, value: 100, label: "Mosque Tours" },
  { icon: ShieldCheck, value: 500, label: "Rehabilitated Prisoners" },
  { icon: Heart, value: 100, label: "Community Support" },
  { icon: FileText, value: 2000, label: "Books Distributed" },
  { icon: MessageCircle, value: 3454, label: "Live Sessions" },
];

function formatNumber(num: number): string {
  return num.toLocaleString();
}

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
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * end);

      setCount(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="text-2xl sm:text-3xl font-bold tabular-nums">
      {formatNumber(count)}+
    </div>
  );
}

export function StatsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {STATS.map((stat, index) => (
        <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white overflow-hidden hover:bg-white/20 transition-all duration-300 group">
          <CardHeader className="p-4 pb-0 flex flex-row items-center space-y-0 gap-3">
            <stat.icon className="w-8 h-8 text-teal-300 group-hover:scale-110 transition-transform" />
            <CardTitle className="text-white text-sm font-medium leading-tight">
              {stat.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <CountUp end={stat.value} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
