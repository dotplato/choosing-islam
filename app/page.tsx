import {
  ArrowRight,
  Search,
  Globe,
  MessageCircle,
  Users,
  Book,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Hero from "@/components/Hero";
import { StatsGrid } from "@/components/StatsGrid";
import DonateForm from "@/components/donate/DonateForm";
import ValuesSection from "@/components/ValuesSection";
import TeamSection from "@/components/TeamSection";
import {
  getCategories,
  getTopicCategories,
  getRecentArticles,
  getHistoryArticles,
} from "@/lib/contentful";

export default async function Home() {
  // Fetch categories and articles from Contentful
  const topicCategories = await getTopicCategories();
  const recentArticles = await getRecentArticles(7);
  const historyArticles = await getHistoryArticles(); // Fetch articles marked for History section

  // Map Contentful categories to topics format (fallback to placeholder if empty)
  const topics =
    topicCategories.length > 0
      ? topicCategories.map((cat) => ({
        title: cat.fields.title,
        description: cat.fields.description || "Explore this category",
        image: cat.fields.catimage?.fields.file.url
          ? `https:${cat.fields.catimage.fields.file.url}`
          : "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=800",
      }))
      : [
        {
          title: "Core Beliefs",
          description:
            "Understanding the fundamental principles and teachings",
          image:
            "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
          title: "Daily Practice",
          description:
            "Practical guidance for incorporating faith into everyday life",
          image:
            "https://images.pexels.com/photos/1001897/pexels-photo-1001897.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
          title: "Community & Service",
          description: "Building connections and serving humanity together",
          image:
            "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
          title: "Spiritual Development",
          description: "Growing in wisdom, compassion, and understanding",
          image:
            "https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
      ];

  return (
    <>
      <Hero />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Explore Topics
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dive deep into various subjects and find answers to your questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics.slice(0, 4).map((topic, index) => (
              <Link
                key={index}
                href={`/articles?category=${encodeURIComponent(topic.title)}`}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer block"
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src={topic.image}
                    alt={topic.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
                  <p className="text-sm text-gray-200 line-clamp-3">
                    {topic.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {topics.length > 4 && (
            <div className="text-center mt-12">
              <Link href="/articles">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  View All Topics
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

     

      {/* Impact & Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-cyan-700 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side: 3x3 Image Grid */}
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {[
                  "/impact/i1.jpeg",
                  "/impact/i2.jpeg",
                  "/impact/i3.jpeg",
                  "/impact/i4.jpeg",
                 "/impact/i5.jpeg",
                  "/impact/i6.jpeg",
                  "/impact/i7.jpeg",
                  "/impact/i8.jpeg",
                  "/impact/i9.jpeg",
                ].map((src, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-2xl group relative">
                    <img 
                      src={src} 
                      alt={`Gallery image ${i + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-teal-900/20 group-hover:bg-transparent transition-colors duration-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Impact Stats */}
            <div className="order-1 lg:order-2 space-y-10">
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                  Our Global Impact
                </h2>
                <div className="w-20 h-1.5 bg-teal-300 rounded-full" />
                <p className="text-xl text-teal-50 leading-relaxed max-w-lg">
                  Through the grace of Allah and your generous support, we are making a real difference across Belize and the world.
                </p>
              </div>
              
              <StatsGrid />

              <div className="pt-6">
                <Link href="/donate">
                  <Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50 px-8 py-6 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                    Support Our Mission
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Donation Form Content */}
          <div className="mt-32 pt-32 border-t border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left side: Text Content */}
              <div className="space-y-8 lg:sticky lg:top-24">
                <div className="space-y-6">
                  <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                    Invest in Your <span className="text-teal-200">Sadaqah Jariyah</span>
                  </h2>
                  <div className="w-24 h-2 bg-teal-300 rounded-full" />
                  
                  <div className="space-y-6 text-xl text-teal-50 leading-relaxed font-medium">
                    <p>
                      Your donation is more than just a contribution—it is an investment in guidance, knowledge, and lasting الخير (goodness).
                    </p>
                    <p>
                      Every book placed on a shelf, every conversation held, and every prayer performed in this center will be part of your ongoing reward (Sadaqah Jariyah), insha’Allah.
                    </p>
                    <p className="pt-4 text-white font-bold">
                      Together, we can build a center that inspires hearts, spreads truth, and strengthens our community for generations to come.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-8">
                  {[
                    "Transparent Usage",
                    "Direct Impact",
                    "Verified Mission",
                    "Secure Process"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-teal-100">
                      <div className="w-2 h-2 bg-teal-300 rounded-full" />
                      <span className="text-sm font-semibold uppercase tracking-wider">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side: Donation Form */}
              <div className="w-full max-w-xl mx-auto lg:mx-0">
                <DonateForm />
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* History of Belize Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              History of Belize
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the rich Islamic history and heritage of Belize
            </p>
          </div>

          {historyArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {historyArticles.map((article) => {
                const thumbnailUrl = article.fields.thumbnail?.fields.file.url
                  ? `https:${article.fields.thumbnail.fields.file.url}`
                  : "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=800";

                const categoryName =
                  article.fields.category?.[0]?.fields.title || "General";

                return (
                  <Link
                    key={article.sys.id}
                    href={`/articles/${article.fields.slug}`}
                    className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-teal-500"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={thumbnailUrl}
                        alt={article.fields.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                          {categoryName}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                        {article.fields.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {article.fields.excerpt}
                      </p>
                      <div className="flex items-center text-teal-600 font-medium text-sm group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No history articles available yet. Mark articles with "Show in
                History Section" in Contentful.
              </p>
            </div>
          )}
        </div>
      </section>

      <ValuesSection />

      {/* Recent Articles Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Recent Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our latest insights and knowledge
            </p>
          </div>

          {recentArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentArticles.slice(0, 6).map((article) => {
                const thumbnailUrl = article.fields.thumbnail?.fields.file.url
                  ? `https:${article.fields.thumbnail.fields.file.url}`
                  : "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=800";

                const categoryName =
                  article.fields.category?.[0]?.fields.title || "General";
                const publishDate = new Date(
                  article.fields.publishDate,
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });

                return (
                  <Link
                    key={article.sys.id}
                    href={`/articles/${article.fields.slug}`}
                    className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <img
                        src={thumbnailUrl}
                        alt={article.fields.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {categoryName}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-gray-500 mb-2">
                        {publishDate}
                      </p>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                        {article.fields.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {article.fields.excerpt}
                      </p>
                      <div className="flex items-center text-teal-600 font-medium group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No articles available yet. Check back soon!
              </p>
            </div>
          )}

          {recentArticles.length > 6 && (
            <div className="text-center mt-12">
              <Link href="/articles">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  View All Articles
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <TeamSection />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of others who have found knowledge, community, and
            spiritual growth through Islamic Dawah Center of Belize.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about">
              <Button
                size="lg"
 className="bg-teal-600 hover:bg-teal-700 text-white"              >
                Learn About Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-1 border-white text-teal-700 hover:bg-white/10"
            >
              Browse Resources
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
