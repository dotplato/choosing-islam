"use client";

import Link from "next/link";
import Image from "next/image";

import { useState, useRef } from "react";
import {
  Menu,
  X,
  Search,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ContentfulArticle } from "@/types/contentful";

interface HeaderProps {
  quranArticles?: ContentfulArticle[];
}

export default function Header({ quranArticles = [] }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileQuranOpen, setMobileQuranOpen] = useState(false);
  const [desktopQuranOpen, setDesktopQuranOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setDesktopQuranOpen(true);
  };

  const handleMouseLeave = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => {
      setDesktopQuranOpen(false);
    }, 200);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // You can implement your search logic here
      console.log("Searching for:", searchQuery);
      // For now, we'll just close the search
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="w-full bg-white border-b-2 border-gray-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative ">
              <Image
                src="/belize-logo.png" // Replace with your actual logo path
                alt="Islamic Dawah Center of Belize Logo"
                width={200} // set your desired width
                height={200} // set your desired height
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/donate">Donate</NavLink>
            <NavLink href="/articles">Articles</NavLink>
            <div
              onPointerEnter={handleMouseEnter}
              onPointerLeave={handleMouseLeave}
              className="relative"
            >
              <DropdownMenu
                open={desktopQuranOpen}
                onOpenChange={setDesktopQuranOpen}
              >
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 text-base font-medium text-gray-800 hover:text-teal-600 transition-colors outline-none cursor-pointer">
                    Quran <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-[300px] border-t-4 border-[#1B8AB2] rounded-none p-0"
                  onPointerEnter={handleMouseEnter}
                  onPointerLeave={handleMouseLeave}
                >
                  <DropdownMenuItem
                    asChild
                    className="border-b border-gray-100 rounded-none py-3 px-4 focus:bg-[#EBF7FB] focus:text-[#1B8AB2] cursor-pointer"
                  >
                    <Link href="https://www.clearquran.com/">
                      Read the Quran
                    </Link>
                  </DropdownMenuItem>
                  {quranArticles.map((article) => (
                    <DropdownMenuItem
                      key={article.sys.id}
                      asChild
                      className="border-b border-gray-100 rounded-none py-3 px-4 focus:bg-[#EBF7FB] focus:text-[#1B8AB2] cursor-pointer"
                    >
                      <Link href={`/articles/${article.fields.slug}`}>
                        {article.fields.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          {/* Right Side - Search & Social Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search - Toggle between icon and input */}
            {searchOpen ? (
              <form
                onSubmit={handleSearch}
                className="flex items-center space-x-2"
              >
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <X className="w-5 h-5 text-gray-800" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Search className="w-5 h-5 text-gray-800" />
              </button>
            )}

            {/* Social Icons */}
            <div className="flex items-center space-x-3">
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Facebook className="w-5 h-5 text-gray-800" />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Twitter className="w-5 h-5 text-gray-800" />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Instagram className="w-5 h-5 text-gray-800" />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Youtube className="w-5 h-5 text-gray-800" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 max-h-[calc(100vh-80px)] overflow-y-auto">
            <nav className="flex flex-col space-y-3">
              <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </MobileNavLink>
              <MobileNavLink
                href="/donate"
                onClick={() => setMobileMenuOpen(false)}
              >
                Donate
              </MobileNavLink>
              <MobileNavLink
                href="/articles"
                onClick={() => setMobileMenuOpen(false)}
              >
                Articles
              </MobileNavLink>
              <button
                onClick={() => setMobileQuranOpen(!mobileQuranOpen)}
                className="flex items-center justify-between px-4 py-2 text-base font-medium text-gray-800 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors w-full text-left"
              >
                Quran
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileQuranOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileQuranOpen && (
                <div className="pl-6 flex flex-col space-y-1 mt-1 border-l-2 border-gray-100 ml-4">
                  <MobileNavLink
                    href="https://www.clearquran.com/"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Read the Quran
                  </MobileNavLink>
                  {quranArticles.map((article) => (
                    <MobileNavLink
                      key={article.sys.id}
                      href={`/articles/${article.fields.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {article.fields.title}
                    </MobileNavLink>
                  ))}
                </div>
              )}
              <MobileNavLink
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </MobileNavLink>

              {/* Mobile Social Icons */}
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                <a href="#" className="hover:opacity-70 transition-opacity">
                  <Facebook className="w-5 h-5 text-gray-800" />
                </a>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  <Twitter className="w-5 h-5 text-gray-800" />
                </a>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  <Instagram className="w-5 h-5 text-gray-800" />
                </a>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  <Youtube className="w-5 h-5 text-gray-800" />
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-base font-medium text-gray-800 hover:text-teal-600 transition-colors"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-base font-medium text-gray-800 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
