"use client";

import Link from "next/link";
import Image from "next/image";

import { useState, useRef, useEffect } from "react";
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
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { ContentfulArticle, ContentfulCategory } from "@/types/contentful";

interface HeaderProps {
  quranArticles?: ContentfulArticle[];
  navbarCategories?: (ContentfulCategory & { articles: ContentfulArticle[] })[];
}

export default function Header({
  quranArticles = [],
  navbarCategories = [],
}: HeaderProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileQuranOpen, setMobileQuranOpen] = useState(false);
  const [openMobileCategories, setOpenMobileCategories] = useState<string[]>(
    [],
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileButtonRef.current &&
        !mobileButtonRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const toggleMobileCategory = (id: string) => {
    setOpenMobileCategories((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
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

  const headerClasses = cn(
    "w-full fixed top-0 z-50 transition-all duration-300",
    isHomePage
      ? isScrolled
        ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm py-2"
        : "bg-transparent border-transparent py-4"
      : "bg-white border-b border-gray-200 py-4",
  );

  const textClasses = cn(
    "transition-colors duration-300 font-medium",
    isHomePage && !isScrolled ? "text-white hover:text-teal-200" : "text-gray-800 hover:text-teal-600",
  );

  const iconClasses = cn(
    "transition-colors duration-300",
    isHomePage && !isScrolled ? "text-white" : "text-gray-800",
  );

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative transition-all duration-300">
              <Image
                src="/belize-logo.png"
                alt="Islamic Dawah Center of Belize Logo"
                width={isHomePage && !isScrolled ? 200 : 180}
                height={isHomePage && !isScrolled ? 200 : 180}
                className={cn(
                  "object-contain transition-all duration-300",
                )}
              />
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/" className={textClasses}>
              Home
            </NavLink>
            <NavLink href="/about" className={textClasses}>
              About
            </NavLink>
            <NavLink href="/donate" className={textClasses}>
              Donate
            </NavLink>
            <NavLink href="/articles" className={textClasses}>
News and Resources
            </NavLink>
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center gap-1 text-base font-medium transition-colors outline-none cursor-pointer uppercase h-auto p-0 hover:bg-transparent",
                      textClasses,
                      isHomePage && !isScrolled
                        ? "hover:text-teal-200"
                        : "hover:text-teal-600",
                    )}
                  >
                    Quran <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-[300px] border-t-4 border-teal-600 rounded-none p-0"
                >
                  <DropdownMenuItem
                    asChild
                    className="border-b border-gray-100 rounded-none py-3 px-4 focus:bg-teal-50 focus:text-teal-600 cursor-pointer"
                  >
                    <Link href="https://www.clearquran.com/">
                      Read the Quran
                    </Link>
                  </DropdownMenuItem>
                  {quranArticles.map((article) => (
                    <DropdownMenuItem
                      key={article.sys.id}
                      asChild
                      className="border-b border-gray-100 rounded-none py-3 px-4 focus:bg-teal-50 focus:text-teal-600 cursor-pointer"
                    >
                      <Link
                        href={`/articles/${article.fields.slug}`}
                        className="w-full h-full block"
                      >
                        {article.fields.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <NavLink href="/contact" className={textClasses}>
              Contact
            </NavLink>
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
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    isHomePage && !isScrolled
                      ? "hover:bg-white/10"
                      : "hover:bg-gray-100",
                  )}
                >
                  <X className={cn("w-5 h-5", iconClasses)} />
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  isHomePage && !isScrolled
                    ? "hover:bg-white/10"
                    : "hover:bg-gray-100",
                )}
              >
                <Search className={cn("w-5 h-5", iconClasses)} />
              </Button>
            )}

            {/* Social Icons */}
            <div className="flex items-center space-x-3">
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Facebook className={cn("w-5 h-5", iconClasses)} />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Twitter className={cn("w-5 h-5", iconClasses)} />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Instagram className={cn("w-5 h-5", iconClasses)} />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Youtube className={cn("w-5 h-5", iconClasses)} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            ref={mobileButtonRef}
            variant="ghost"
            size="icon"
            className={cn("md:hidden p-2", iconClasses)}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Secondary Desktop Navbar - Categories */}
        <div
          className={cn(
            "hidden md:flex items-center justify-center py-2 border-t mt-4 space-x-8 transition-colors duration-300",
            isHomePage && !isScrolled
              ? "border-white/10"
              : "border-gray-100",
          )}
        >
          {navbarCategories.map((cat) => (
            <div key={cat.sys.id} className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center gap-1 text-sm font-semibold transition-colors outline-none cursor-pointer uppercase tracking-wider h-auto p-0 hover:bg-transparent",
                      isHomePage && !isScrolled
                        ? "text-teal-100 hover:text-white"
                        : "text-gray-600 hover:text-teal-600",
                    )}
                  >
                    {cat.fields.title} <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-[300px] border-t-4 border-teal-600 rounded-none p-0"
                >
                  {cat.articles.length > 0 ? (
                    cat.articles.map((article) => (
                      <DropdownMenuItem
                        key={article.sys.id}
                        asChild
                        className="border-b border-gray-100 rounded-none py-3 px-4 focus:bg-teal-50 focus:text-teal-600 cursor-pointer"
                      >
                        <Link
                          href={`/articles/${article.fields.slug}`}
                          className="w-full h-full block"
                        >
                          {article.fields.title}
                        </Link>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem className="py-3 px-4 text-gray-500">
                      No articles found
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden border-t border-gray-200 py-4 max-h-[calc(100vh-80px)] overflow-y-auto bg-white shadow-xl animate-in slide-in-from-top duration-300"
          >
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
               News and Resources
              </MobileNavLink>

              {navbarCategories.map((cat) => (
                <div key={cat.sys.id}>
                  <Button
                    variant="ghost"
                    onClick={() => toggleMobileCategory(cat.sys.id)}
                    className="flex items-center justify-between px-4 py-2 text-base font-medium text-gray-800 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors w-full text-left uppercase h-auto justify-between"
                  >
                    {cat.fields.title}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openMobileCategories.includes(cat.sys.id)
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </Button>
                  {openMobileCategories.includes(cat.sys.id) && (
                    <div className="pl-6 flex flex-col space-y-1 mt-1 border-l-2 border-gray-100 ml-4">
                      {cat.articles && cat.articles.length > 0 ? (
                        cat.articles.map((article) => (
                          <MobileNavLink
                            key={article.sys.id}
                            href={`/articles/${article.fields.slug}`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {article.fields.title}
                          </MobileNavLink>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">
                          No articles found
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <Button
                variant="ghost"
                onClick={() => setMobileQuranOpen(!mobileQuranOpen)}
                className="flex items-center justify-between px-4 py-2 text-base font-medium text-gray-800 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors w-full text-left uppercase h-auto justify-between"
              >
                Quran
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileQuranOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>

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
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "text-base font-medium transition-colors",
        className ? className : "text-gray-800 hover:text-teal-600",
      )}
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
