"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
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

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Executive Director",
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "15+ years of experience in interfaith dialogue and community development.",
    },
    {
      name: "Ahmed Hassan",
      role: "Education Director",
      image:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Specialized in curriculum development and educational outreach programs.",
    },
    {
      name: "Maria Rodriguez",
      role: "Community Relations",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Expert in building bridges between diverse communities and fostering dialogue.",
    },
    {
      name: "David Chen",
      role: "Program Coordinator",
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Manages volunteer programs and coordinates community events nationwide.",
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
      <section className="relative text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Community gathering"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-teal-600/80 via-cyan-600/80 to-blue-600/80"></div>
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
                Islamic Dawah Center of Belize is dedicated to fostering
                understanding, education, and dialogue about faith and
                spirituality. We provide accessible, accurate, and comprehensive
                resources to help individuals explore their spiritual journey
                while building bridges between diverse communities.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through our programs, resources, and community initiatives, we
                strive to create a world where knowledge dispels misconceptions,
                compassion replaces prejudice, and unity transcends differences.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Community gathering"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Vision"
                className="rounded-2xl shadow-2xl"
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
                We envision a world where people of all backgrounds can engage
                in meaningful dialogue about faith, spirituality, and values
                without fear or prejudice. A world where education and
                understanding form the foundation for peace and harmony.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through our work, we aspire to be a leading resource for
                spiritual education and interfaith understanding, empowering
                individuals to make informed decisions about their spiritual
                journey while respecting the diversity of human experience.
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4`}
                  >
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-black bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-black mb-8 leading-relaxed">
            Whether you're seeking knowledge, looking to volunteer, or wanting
            to support our mission, there are many ways to get involved with
            Islamic Dawah Center of Belize.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <Link href="/volunteer">
              <Button
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                Become a Volunteer
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>

            <Link href="/donate">
              <Button
                size="lg"
                variant="outline"
                className="border-1 border-white text-teal-700 hover:bg-white/10"
              >
                Support Our Work
              </Button>
            </Link>

          </div>
        </div>
      </section>
    </>
  );
}
