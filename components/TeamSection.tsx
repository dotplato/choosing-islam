"use client";

import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const TEAM_MEMBERS = [
  {
    name: "Majid khan (project manager)",
    email: "MajidKhanBelizean@gmail.com",
    phone: "+501 611 8003 ",
    image: "/team/img1.jpeg",
  },
  {
    name: "Glen Broaster-aka (Muhammad Aswad)",
    email: "mhmdxa@gmail.com",
    phone: "+501 634 8892",
    image: "/team/img2.jpeg",
  },
  {
    name: "Nuri Muhammad",
    email: "innadynamics@gmail.com",
    phone: "+501 623 0077",
    image: "/team/img3.jpeg",
  },
];

export default function TeamSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Meet Our Team
          </h2>
          <div className="w-20 h-1.5 bg-teal-600 rounded-full mx-auto" />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dedicated professionals committed to serving our community and spreading knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {TEAM_MEMBERS.map((member, index) => (
            <Card key={index} className="group border-none shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-3xl bg-white flex flex-col items-center">
              <div className="w-48 h-48 mt-8 relative overflow-hidden rounded-full border-4 border-teal-50 group-hover:border-teal-100 transition-colors duration-500">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className={cn(
                    "object-cover group-hover:scale-110 transition-transform duration-700 ease-out",
                    index === 1 && "object-top"
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <CardContent className="p-8 text-center space-y-4 w-full">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors line-clamp-2 min-h-[3.5rem] flex items-center justify-center">
                  {member.name}
                </h3>
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-2 text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm font-medium">{member.email}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-medium">{member.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
