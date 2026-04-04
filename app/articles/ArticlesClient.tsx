"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Calendar, Clock, User, ArrowRight, Play, ExternalLink, Video, Newspaper, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
  const activeTab = searchParams.get("tab") || "articles";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    params.delete("category"); // Reset category when switching tabs
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
    
    if (item.type !== tabToTypeMap[activeTab]) return false;

    // 2. Filter by Category (Only for Articles and News)
    if (activeTab === "articles" || activeTab === "news") {
      if (categoryFilter === "All") return true;
      const typedItem = item as Article | News;
      return typedItem.categories.includes(categoryFilter);
    }
    
    return true; // Videos don't have category filter currently
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
      <section className="bg-white border-b py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6">
            <Tabs
              value={activeTab}
              className="w-full max-w-lg"
              onValueChange={handleTabChange}
            >
              <TabsList className="grid w-full grid-cols-3 p-1 bg-gray-100 rounded-xl">
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
            <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-6">
                {activeTab === "videos" ? (
                  <Video className="w-10 h-10 text-gray-300" />
                ) : activeTab === "news" ? (
                  <Newspaper className="w-10 h-10 text-gray-300" />
                ) : (
                  <BookOpen className="w-10 h-10 text-gray-300" />
                )}
              </div>
              <p className="text-2xl font-bold text-gray-900">
                No {activeTab} found
              </p>
              <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                {categoryFilter !== "All" 
                  ? `We couldn't find any ${activeTab} in the "${categoryFilter}" category.`
                  : `There are currently no ${activeTab} available.`}
              </p>
              {categoryFilter !== "All" && (
                <Link href={`/articles?tab=${activeTab}`}>
                  <Button variant="link" className="text-teal-600 mt-4 font-bold text-lg">
                    Clear all filters
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
