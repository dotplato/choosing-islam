import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative text-white bg-gradient-to-br from-cyan-800 via-blue-800 to-blue-500">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 opacity-20"
        style={{
          backgroundImage: "url('/pngwing.com (1).png')",
        }}
      />

      {/* Decorative Top Border Image Placeholder */}
      <div className="absolute -top-20 left-0 right-0 h-20 flex items-end justify-center pointer-events-none z-20">
        <div className="w-full h-20 bg-gradient-to-b from-transparent to-black/20 flex items-center justify-center">
          <div className="text-center text-sm text-gray-400 opacity-50"></div>
        </div>
      </div>

      {/* FOOTER CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
             
               <Image
                              src="/belize-logo.png" // Replace with your actual logo path
                              alt="Choosing Islam Logo"
                              width={200} // set your desired width
                              height={200} // set your desired height
                              className="object-contain"
                            />
            </div>
            <p className="text-sm mb-4">
              Connecting people with knowledge, understanding, and community
              through education and dialogue.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-teal-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-teal-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-teal-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-teal-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-teal-400 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-teal-400 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-teal-400 transition-colors text-sm"
                >
                  Resources
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-teal-400 transition-colors text-sm"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-teal-400 transition-colors text-sm"
                >
                  Volunteer
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-teal-400 transition-colors text-sm"
                >
                  Donate
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-teal-400 transition-colors text-sm"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-teal-400 transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">1-800-123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">info@faithconnect.org</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  123 Faith Street, Suite 100
                  <br />
                  New York, NY 10001
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} FaithConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
