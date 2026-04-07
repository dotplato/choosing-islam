import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FreeResourcesBanner() {
  return (
    <section className="py-6 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl px-10 py-10 md:px-16 md:py-10 bg-teal-100 transition-colors duration-500 group">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-16">
            {/* Left Side: Overlapping Books */}
            <div className="relative h-[120px] md:h-[200px] w-full max-w-[320px] flex items-center justify-center lg:justify-start flex-shrink-0">
              <div className="relative w-full">
                {/* Book 1 (Back Left) */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-[10deg] w-24 h-32 md:w-36 md:h-48 bg-gray-100 rounded-lg shadow-xl border border-gray-200 overflow-hidden transform lg:group-hover:-translate-x-6 lg:group-hover:-rotate-[20deg] -translate-x-2 -rotate-[10deg] lg:-translate-x-0 lg:-rotate-[15deg] transition-transform duration-500 z-10">
                  <Image
                    src="/getAccessSection/a1.jpeg"
                    alt="Free Book 1"
                    fill
                    className="object-cover opacity-80"
                  />
                </div>
                {/* Book 2 (Middle) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-32 md:w-36 md:h-48 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden transform lg:group-hover:-translate-y-[60%] -translate-y-[50%] lg:-translate-y-1/2 transition-transform duration-500 z-20">
                  <Image
                    src="/getAccessSection/a2.jpeg"
                    alt="Free Book 2"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Book 3 (Front Right) */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 rotate-[10deg] w-24 h-32 md:w-36 md:h-48 bg-gray-50 rounded-lg shadow-xl border border-gray-200 overflow-hidden transform lg:group-hover:translate-x-6 lg:group-hover:rotate-[20deg] translate-x-2 rotate-[10deg] lg:translate-x-0 lg:rotate-[15deg] transition-transform duration-500 z-30">
                  <Image
                    src="/getAccessSection/a3.jpeg"
                    alt="Free Book 3"
                    fill
                    className="object-cover opacity-90"
                  />
                </div>
              </div>
            </div>

            {/* Right Side: Content */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 w-full">
              <div className="text-center lg:text-left space-y-4 flex-grow">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                  Get Access to <br />
                  <span className="text-teal-600 font-extrabold">Free Books and Videos</span>
                </h2>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Access our collection of free books and videos to deepen your
                  understanding of Islam and Dawah work.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link href="https://drive.google.com/drive/folders/16tXGPlukrQrVih8W-02lmvcnlAaHivnh" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="rounded-xl bg-teal-600 hover:bg-teal-700 text-white px-8 py-5 text-lg font-bold transition-all duration-300 shadow-lg lg:hover:shadow-xl shadow-xl"
                  >
                    Get Free Access
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
