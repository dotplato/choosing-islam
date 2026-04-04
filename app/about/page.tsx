"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  Globe,
  Lightbulb,
  Handshake,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ValuesSection from "@/components/ValuesSection";

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description:
        "We approach every interaction with empathy, understanding, and genuine care for others.",
      color: "from-rose-500 to-pink-600",
    },
    {
      icon: Lightbulb,
      title: "Knowledge",
      description:
        "We believe in the power of education and the pursuit of truth through continuous learning.",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: Handshake,
      title: "Unity",
      description:
        "We foster connections that transcend differences and bring people together in understanding.",
      color: "from-teal-500 to-cyan-600",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for the highest standards in our services, resources, and community engagement.",
      color: "from-blue-500 to-indigo-600",
    },
  ];



  const stats = [
    { number: "15+", label: "Years of Service" },
    { number: "50+", label: "Countries Reached" },
    { number: "100K+", label: "Lives Impacted" },
    { number: "1000+", label: "Educational Resources" },
  ];

  return (
    <>
      <section className="relative text-white pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero/bg-hero-about.jpeg"
            alt="Community gathering"
            fill
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            About Islamic Dawah Center of Belize
          </h1>
          <p className="text-xl sm:text-2xl text-teal-50 max-w-3xl mx-auto leading-relaxed">
            Building bridges of understanding through education, dialogue, and
            community service
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Our Mission
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                To create a welcoming and inclusive environment where individuals
                from all backgrounds—youth and adults, men and women—can explore
                the teachings of Islam in a supportive setting. The center is dedicated
                to encouraging meaningful dialogue, intellectual growth, and moral development
                while strengthening

                faith, inspiring learning, and building a compassionate and united community.
              </p>

            </div>
            <div className="relative aspect-square">
              <Image
                src="/mission.jpeg"
                alt="Community gathering"
                fill
                className="rounded-2xl shadow-2xl object-cover"
              />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative aspect-square">
              <Image
                src="/vision.jpeg"
                alt="Vision"
                fill
                className="rounded-2xl shadow-2xl object-cover"
              />
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl -z-10"></div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                To establish a vibrant and dynamic Islamic Dawah Center that
                becomes a leading source of authentic Islamic knowledge, cultural awareness,
                and personal development. The center aims to serve all Belizeans by fostering
                a deeper understanding of Islam, promoting harmony,
                and nurturing a community grounded in faith, learning, and mutual respect.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide our work and define who we are
            </p>
          </div>
        </div>
      </section>

      <ValuesSection />

      <section className="py-16 text-black bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 text-teal-600" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Donate to Cause
          </h2>
          <p className="text-xl text-black mb-8 leading-relaxed">
            Whether you're seeking knowledge, looking to volunteer, or wanting
            to support our mission, there are many ways to get involved with
            Islamic Dawah Center of Belize.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <Link href="/donate">
              <Button
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                Donate Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>

            <Link href="/articles">
              <Button
                size="lg"
                variant="outline"
                className="border-teal-600 text-teal-700 hover:bg-teal-50"
              >
                Read about Islam
              </Button>
            </Link>

          </div>
        </div>
      </section>
    </>
  );
}
