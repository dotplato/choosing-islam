"use client";

import Image from "next/image";

export default function ValuesSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-32">
          {/* Point 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="relative">
                <span 
                  className="text-9xl font-black text-teal-600/5 absolute -top-20 -left-4 select-none"
                  style={{ WebkitTextStroke: '2px rgba(15, 118, 110, 0.3)' }}
                >
                  1
                </span>
                <h3 className="text-4xl sm:text-5xl font-extrabold text-gray-900 relative z-10 pt-8">
                  Dawah
                </h3>
              </div>
              <div className="w-16 h-1.5 bg-teal-600 rounded-full" />
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Spreading the message of Islam with wisdom, compassion, and understanding. We aim to create meaningful conversations, invite others to learn about Islam, and build bridges of respect within the community.
              </p>
            </div>
            <div className="flex-1 relative group animate-in fade-in slide-in-from-right-8 duration-1000">
              <div className="absolute -inset-4 bg-teal-50 rounded-3xl -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src="/values/dawah1.jpeg"
                  alt="Respect"
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Point 2 - Alternating Layout */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="flex-1 space-y-6 animate-in fade-in slide-in-from-right-8 duration-1000">
              <div className="relative">
                <span 
                  className="text-9xl font-black text-teal-600/5 absolute -top-20 -left-4 select-none"
                  style={{ WebkitTextStroke: '2px rgba(15, 118, 110, 0.3)' }}
                >
                  2
                </span>
                <h3 className="text-4xl sm:text-5xl font-extrabold text-gray-900 relative z-10 pt-8">
                  Community & Support
                </h3>
              </div>
              <div className="w-16 h-1.5 bg-teal-600 rounded-full" />
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Building a united and welcoming community for everyone. Through gatherings, prayer space, and social initiatives, we foster connection, mutual respect, and care for one another.
              </p>
            </div>
            <div className="flex-1 relative group animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="absolute -inset-4 bg-teal-50 rounded-3xl rotate-2 group-hover:rotate-0 transition-transform duration-500" />
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src="/values/img4.jpeg"
                  alt="Care"
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Point 3 */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="relative">
                <span 
                  className="text-9xl font-black text-teal-600/5 absolute -top-20 -left-4 select-none"
                  style={{ WebkitTextStroke: '2px rgba(15, 118, 110, 0.3)' }}
                >
                  3
                </span>
                <h3 className="text-4xl sm:text-5xl font-extrabold text-gray-900 relative z-10 pt-8">
                  Islamic Education
                </h3>
              </div>
              <div className="w-16 h-1.5 bg-teal-600 rounded-full" />
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Providing authentic Islamic knowledge through books, 
                study circles, and discussions. Our center serves as a place where individuals 
                can grow intellectually and spiritually in a supportive environment.
              </p>
            </div>
            <div className="flex-1 relative group animate-in fade-in slide-in-from-right-8 duration-1000">
              <div className="absolute -inset-4 bg-teal-50 rounded-3xl -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src="/values/edu.jpeg"
                  alt="Success"
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
