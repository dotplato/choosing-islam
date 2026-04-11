"use client";

import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const TEAM_MEMBERS = [
  {
    name: "Majid khan",
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
  {
    name: "Kerby Bennett",
    email: "kerbybennett@gmail.com",
    phone: "+501 000 0000",
    image: "/team/member.jpeg",
  },
  {
    name: "Henry Pucket",
    email: "hpuckett619@gmail.com",
    phone: "+1 (213) 801-6773",
    image: "/team/member4.jpeg",
  },
];

interface TeamSectionProps {
  title?: string;
}

export default function TeamSection({ title = "Meet Our Team" }: TeamSectionProps) {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {title}
          </h2>
          <div className="w-20 h-1.5 bg-teal-600 rounded-full mx-auto" />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dedicated professionals committed to serving our community and spreading knowledge.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-12 gap-y-16 max-w-7xl mx-auto">
          {TEAM_MEMBERS.map((member, index) => (
            <div key={index} className="relative group w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] max-w-sm">
              {/* Tilted Background Effect (from ValuesSection) */}
              <div className={cn(
                "absolute -inset-4 bg-teal-50 rounded-[3rem] transition-transform duration-500 group-hover:rotate-0 z-0",
                index % 2 === 0 ? "-rotate-3 shadow-sm" : "rotate-3 shadow-sm"
              )} />
              
              <Card className="relative z-10 border-8 border-white shadow-xl group-hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-[2.5rem] bg-white flex flex-col items-center h-full">
                <div className="relative mt-8">
                  {/* Image */}
                  <div className="w-48 h-48 relative overflow-hidden rounded-full border-4 border-white shadow-md">
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
                </div>

                <CardContent className="p-8 text-center space-y-4 w-full flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors line-clamp-2 min-h-[3.5rem] flex items-center justify-center">
                    {member.name}
                  </h3>
                  <div className="space-y-2 pt-4 border-t border-gray-100 relative z-30">
                    <Link
                      href={`mailto:${member.email}`}
                      className="flex items-center justify-center gap-2 text-gray-600 hover:text-teal-600 transition-colors py-1 group/item"
                    >
                      <Mail className="w-4 h-4 text-teal-600/60 group-hover/item:text-teal-600" />
                      <span className="text-sm font-medium">{member.email}</span>
                    </Link>
                    <Link
                      href={`tel:${member.phone.replace(/\s+/g, "")}`}
                      className="flex items-center justify-center gap-2 text-gray-600 hover:text-teal-600 transition-colors py-1 group/item"
                    >
                      <Phone className="w-4 h-4 text-teal-600/60 group-hover/item:text-teal-600" />
                      <span className="text-sm font-medium">{member.phone}</span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
