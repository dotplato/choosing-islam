"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Calendar, Clock, User, ArrowRight, Play, ExternalLink, Video, Newspaper, BookOpen, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BaseItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  type: "article" | "video" | "news";
}

interface Article extends BaseItem {
  slug: string;
  categories: string[];
  readTime: string;
  author: string;
  type: "article";
}

interface News extends BaseItem {
  slug: string;
  categories: string[];
  readTime: string;
  author: string;
  type: "news";
}

interface VideoItem extends BaseItem {
  youtubeUrl: string;
  type: "video";
}

type ContentItem = Article | VideoItem | News;

interface ArticlesClientProps {
  items: ContentItem[];
  categories: string[];
}

export default function ArticlesClient({
  items,
  categories,
}: ArticlesClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const categoryFilter = searchParams.get("category") || "All";
  const activeTab = searchParams.get("tab") || "all";
  const searchQuery = searchParams.get("search") || "";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    params.delete("category"); // Reset category when switching tabs
    router.push(`/articles?${params.toString()}`, { scroll: false });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("search", e.target.value);
    } else {
      params.delete("search");
    }
    router.push(`/articles?${params.toString()}`, { scroll: false });
  };

  const filteredItems = items.filter((item) => {
    // 1. Filter by Tab (Type)
    // Map activeTab to item.type
    const tabToTypeMap: Record<string, string> = {
      articles: "article",
      videos: "video",
      news: "news"
    };
    
    if (activeTab !== "all" && item.type !== tabToTypeMap[activeTab]) return false;

    // 2. Filter by Category (Only for Articles and News when tab is specific, or for all when in 'all' tab)
    if (categoryFilter !== "All") {
      if (item.type === "article" || item.type === "news") {
        const typedItem = item as Article | News;
        if (!typedItem.categories.includes(categoryFilter)) return false;
      } else {
        // For other types (like videos) that don't have categories yet
        return false;
      }
    }

    // 3. Filter by Search Query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const titleMatch = item.title.toLowerCase().includes(query);
      const excerptMatch = item.excerpt.toLowerCase().includes(query);
      return titleMatch || excerptMatch;
    }
    
    return true; 
  });

  const renderCard = (item: ContentItem) => {
    if (item.type === "video") {
      return (
        <a
          key={item.id}
          href={item.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden border-0 bg-white ring-1 ring-gray-200">
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center text-teal-600 transform group-hover:scale-110 transition-transform shadow-lg">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <div className="bg-black/50 backdrop-blur-md p-1.5 rounded-full">
                  <ExternalLink className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg group-hover:text-teal-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                {item.title}
              </CardTitle>
              <CardDescription className="text-sm mt-1">
                {item.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {new Date(item.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="mt-4 flex items-center text-sm text-teal-600 font-bold group-hover:gap-2 transition-all">
                WATCH ON YOUTUBE
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </a>
      );
    }

    // For articles and news
    const linkHref = `/articles/${(item as Article | News).slug}`;
    return (
      <Link key={item.id} href={linkHref}>
        <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden border-0 bg-white ring-1 ring-gray-200">
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3">
              <span className="bg-teal-600 text-white px-2.5 py-1 rounded-md text-xs font-bold shadow-lg">
                {(item as Article | News).categories[0] || (item.type === "news" ? "NEWS" : "ARTICLE")}
              </span>
            </div>
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg group-hover:text-teal-600 transition-colors line-clamp-2 min-h-[3.5rem]">
              {item.title}
            </CardTitle>
            <CardDescription className="text-sm mt-1 line-clamp-2">
              {item.excerpt}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{(item as Article | News).readTime}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 font-semibold border-t pt-3">
                <div className="w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-[10px]">
                  {(item as Article | News).author.charAt(0)}
                </div>
                <span>{(item as Article | News).author}</span>
              </div>
              <div className="mt-2 flex items-center text-sm text-teal-600 font-bold group-hover:gap-2 transition-all">
                {item.type === "news" ? "READ NEWS" : "READ MORE"}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  };

  return (
    <>
      {/* Tabs and Filters Section */}
      <section className="bg-white border-b py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8">
            <Tabs
              value={activeTab}
              className="w-full max-w-xl"
              onValueChange={handleTabChange}
            >
              <TabsList className="grid w-full grid-cols-4 p-1 bg-gray-100 rounded-xl">
                <TabsTrigger
                  value="all"
                  className="rounded-lg py-2.5 data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow-md flex items-center gap-2 transition-all"
                >
                  <Search className="w-4 h-4" />
                  <span className="font-semibold">All</span>
                </TabsTrigger>
                <TabsTrigger
                  value="articles"
                  className="rounded-lg py-2.5 data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow-md flex items-center gap-2 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="font-semibold">Articles</span>
                </TabsTrigger>
                <TabsTrigger
                  value="videos"
                  className="rounded-lg py-2.5 data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow-md flex items-center gap-2 transition-all"
                >
                  <Video className="w-4 h-4" />
                  <span className="font-semibold">Videos</span>
                </TabsTrigger>
                <TabsTrigger
                  value="news"
                  className="rounded-lg py-2.5 data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow-md flex items-center gap-2 transition-all"
                >
                  <Newspaper className="w-4 h-4" />
                  <span className="font-semibold">News</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Category Filter - Only show for articles and news */}
            {(activeTab === "articles" || activeTab === "news") && (
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => {
                  const isActive = category === categoryFilter;
                  const href = category === "All" 
                    ? `/articles?tab=${activeTab}` 
                    : `/articles?tab=${activeTab}&category=${encodeURIComponent(category)}`;
                  
                  return (
                    <Link key={category} href={href} scroll={false}>
                      <Button
                        variant={isActive ? "default" : "outline"}
                        size="sm"
                        className={
                          isActive
                            ? "bg-teal-600 hover:bg-teal-700 font-bold rounded-full px-5"
                            : "hover:text-teal-600 hover:border-teal-600 rounded-full px-5 font-medium text-gray-600"
                        }
                      >
                        {category}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Grid Content */}
      <section className="py-16 bg-gray-50 min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => renderCard(item))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
              <Search className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We couldn't find any {activeTab} matching your current filters or search query.
              </p>
              <Button 
                variant="outline" 
                className="mt-6 text-teal-600 border-teal-600 hover:bg-teal-50"
                onClick={() => router.push("/articles")}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
